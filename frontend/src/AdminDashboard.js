import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Image as ImageIcon,
  LogOut,
  Brain,
  BarChart3,
  Settings,
  Cloud,
  CloudOff,
  Loader,
  Home
} from 'lucide-react';
import QuizStorageService from './QuizStorageService';
import AnalyticsService from './AnalyticsService';

const AdminDashboard = ({ onLogout }) => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [activeTab, setActiveTab] = useState('questions');
  const [storageService] = useState(new QuizStorageService());
  const [analyticsService] = useState(new AnalyticsService());
  const [cloudStatus, setCloudStatus] = useState('checking');
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    image: null,
    difficulty: 'medium'
  });

  // Load questions using cloud storage service
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setCloudStatus('checking');
        const loadedQuestions = await storageService.loadQuestions();
        setQuestions(loadedQuestions);
        
        // Test cloud connection
        const isCloudAvailable = await storageService.testConnection();
        setCloudStatus(isCloudAvailable ? 'connected' : 'local');
      } catch (error) {
        console.error('Error loading questions:', error);
        setCloudStatus('local');
      }
    };

    loadQuestions();
  }, [storageService]);

  const saveQuestions = async (updatedQuestions) => {
    setSaving(true);
    try {
      setQuestions(updatedQuestions);
      const success = await storageService.saveQuestions(updatedQuestions);
      if (!success) {
        console.warn('Failed to save to cloud, but saved locally');
      }
    } catch (error) {
      console.error('Error saving questions:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({...formData, image: e.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingQuestion) {
      // Update existing question
      const updatedQuestions = questions.map(q => 
        q.id === editingQuestion.id ? {...formData, id: editingQuestion.id} : q
      );
      saveQuestions(updatedQuestions);
    } else {
      // Add new question
      const newQuestion = {
        ...formData,
        id: Date.now()
      };
      saveQuestions([...questions, newQuestion]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      image: null,
      difficulty: 'medium'
    });
    setShowForm(false);
    setEditingQuestion(null);
  };

  const handleEdit = (question) => {
    setFormData(question);
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const updatedQuestions = questions.filter(q => q.id !== id);
      saveQuestions(updatedQuestions);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bardoli_admin_logged_in');
    onLogout(false);
  };

  const QuestionForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">
          {editingQuestion ? 'Edit Question' : 'Add New Question'}
        </h3>
        <button
          onClick={resetForm}
          className="text-white/60 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-semibold mb-2">
            Question
          </label>
          <textarea
            value={formData.question}
            onChange={(e) => setFormData({...formData, question: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
            rows="3"
            placeholder="Enter your question..."
            required
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">
            Options
          </label>
          <div className="space-y-3">
            {formData.options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-yellow-400 text-blue-900 font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  {String.fromCharCode(65 + index)}
                </div>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...formData.options];
                    newOptions[index] = e.target.value;
                    setFormData({...formData, options: newOptions});
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  required
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={formData.correctAnswer === index}
                  onChange={() => setFormData({...formData, correctAnswer: index})}
                  className="w-5 h-5 text-yellow-400"
                />
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm mt-2">
            Select the radio button next to the correct answer
          </p>
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">
            Difficulty Level
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white focus:outline-none focus:border-yellow-400 transition-colors"
          >
            <option value="easy" className="bg-slate-800">Easy</option>
            <option value="medium" className="bg-slate-800">Medium</option>
            <option value="hard" className="bg-slate-800">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">
            Question Image (Optional)
          </label>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-white/30 hover:border-yellow-400 transition-colors cursor-pointer"
            >
              <Upload className="text-yellow-400" size={24} />
              <span className="text-white">Click to upload image</span>
            </label>
            
            {formData.image && (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Question preview"
                  className="max-w-full h-40 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, image: null})}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            type="submit"
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save size={20} />
            {editingQuestion ? 'Update Question' : 'Save Question'}
          </motion.button>
          
          <motion.button
            type="button"
            onClick={resetForm}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl border border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-400 text-blue-900 p-2 rounded-full">
                <Brain size={24} />
              </div>
              <h1 className="text-white font-bold text-xl">
                Bardoli Brain Battle - Admin Dashboard
              </h1>
              
              {/* Cloud Status Indicator */}
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                {cloudStatus === 'checking' && (
                  <>
                    <Loader className="animate-spin text-yellow-400" size={16} />
                    <span className="text-white/70 text-sm">Checking...</span>
                  </>
                )}
                {cloudStatus === 'connected' && (
                  <>
                    <Cloud className="text-green-400" size={16} />
                    <span className="text-green-400 text-sm">Cloud Sync</span>
                  </>
                )}
                {cloudStatus === 'local' && (
                  <>
                    <CloudOff className="text-yellow-400" size={16} />
                    <span className="text-yellow-400 text-sm">Local Only</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'questions', label: 'Questions', icon: Brain },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-blue-900 font-bold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-white">
                Quiz Questions ({questions.length}/20)
              </h2>
              
              {!showForm && (
                <motion.button
                  onClick={() => setShowForm(true)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={20} />
                  Add Question
                </motion.button>
              )}
            </div>

            {showForm && <QuestionForm />}

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded-full text-sm">
                          Q{index + 1}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          question.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                          question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {question.difficulty.toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="text-white font-semibold text-lg mb-3">
                        {question.question}
                      </h3>
                      
                      {question.image && (
                        <div className="mb-3">
                          <img
                            src={question.image}
                            alt="Question"
                            className="max-w-xs h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg border ${
                              optIndex === question.correctAnswer
                                ? 'bg-green-500/20 border-green-400 text-green-300'
                                : 'bg-white/5 border-white/20 text-white/70'
                            }`}
                          >
                            <span className="font-semibold">
                              {String.fromCharCode(65 + optIndex)}.
                            </span> {option}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(question)}
                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-2 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
            {/* Add Question Button with Warning */}
            {!showForm && (
              <div className="text-center">
                {questions.length === 0 ? (
                  <div className="py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Questions Yet</h3>
                    <p className="text-white/70 mb-6">Start by adding your first quiz question (up to 20 questions allowed)</p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-6 rounded-xl transition-all duration-300"
                    >
                      Add First Question
                    </button>
                  </div>
                ) : questions.length >= 20 ? (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 mb-6">
                    <div className="text-red-400 font-bold mb-2">⚠️ Maximum Questions Reached</div>
                    <div className="text-white/70">You've reached the limit of 20 questions. Delete some questions to add new ones.</div>
                  </div>
                ) : (
                  <>
                    <motion.button
                      onClick={() => setShowForm(true)}
                      className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus size={20} />
                      Add Question
                    </motion.button>
                    
                    {questions.length >= 15 && (
                      <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-3 mt-4 max-w-md mx-auto">
                        <div className="text-yellow-400 text-sm">
                          ⚠️ Approaching limit: {20 - questions.length} questions remaining
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard analyticsService={analyticsService} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Quiz Settings</h3>
            <p className="text-white/70">Quiz configuration and settings coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Analytics Dashboard Component
const AnalyticsDashboard = ({ analyticsService }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const loadAnalytics = () => {
      const data = analyticsService.getDashboardData();
      const events = analyticsService.getRecentEvents(20);
      setDashboardData(data);
      setRecentEvents(events);
    };

    loadAnalytics();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadAnalytics, 30000);
    return () => clearInterval(interval);
  }, [analyticsService]);

  const handleClearAnalytics = () => {
    if (window.confirm('Are you sure you want to clear all analytics data?')) {
      analyticsService.clearAnalytics();
      setDashboardData(analyticsService.getDashboardData());
      setRecentEvents([]);
    }
  };

  const handleExportAnalytics = () => {
    const data = analyticsService.exportAnalytics();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bardoli-quiz-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  if (!dashboardData) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-2xl font-bold text-white mb-2">Loading Analytics...</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-white">Quiz Analytics</h2>
        <div className="flex gap-4">
          <button
            onClick={handleExportAnalytics}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            📤 Export Data
          </button>
          <button
            onClick={handleClearAnalytics}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold py-2 px-4 rounded-lg transition-colors"
          >
            🗑️ Clear Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{dashboardData.totalAttempts}</div>
          <div className="text-white/80">Total Quiz Attempts</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{dashboardData.totalCompletions}</div>
          <div className="text-white/80">Quiz Completions</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{dashboardData.uniqueUsers}</div>
          <div className="text-white/80">Unique Users</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">{dashboardData.completionRate}%</div>
          <div className="text-white/80">Completion Rate</div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/70">Average Score:</span>
              <span className="text-yellow-400 font-bold">{dashboardData.averageScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Avg Time/Question:</span>
              <span className="text-blue-400 font-bold">{dashboardData.averageTimePerQuestion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Quiz Abandoned:</span>
              <span className="text-red-400 font-bold">{dashboardData.totalAbandoned}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">User Behavior</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/70">Returning Users:</span>
              <span className="text-green-400 font-bold">{dashboardData.returningUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">New vs Returning:</span>
              <span className="text-blue-400 font-bold">
                {dashboardData.uniqueUsers - dashboardData.returningUsers}:{dashboardData.returningUsers}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Last Updated</h3>
          <div className="text-white/70">
            {dashboardData.lastUpdated ? new Date(dashboardData.lastUpdated).toLocaleString() : 'Never'}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {recentEvents.length > 0 ? (
            recentEvents.map((event, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {event.eventType === 'quiz_started' && '🎯'}
                    {event.eventType === 'quiz_completed' && '🏆'}
                    {event.eventType === 'quiz_abandoned' && '❌'}
                    {event.eventType === 'question_answered' && '✅'}
                    {event.eventType === 'question_timeout' && '⏰'}
                    {event.eventType === 'quiz_restarted' && '🔄'}
                  </span>
                  <div>
                    <div className="text-white font-medium capitalize">
                      {event.eventType.replace('_', ' ')}
                    </div>
                    <div className="text-white/60 text-sm">
                      Session: {event.sessionId.slice(-8)}
                    </div>
                  </div>
                </div>
                <div className="text-white/70 text-sm">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/60">
              No activity recorded yet. Quiz interactions will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;