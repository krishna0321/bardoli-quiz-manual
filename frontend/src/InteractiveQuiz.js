import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Trophy, Clock, CheckCircle, XCircle, Star, Zap, Home } from 'lucide-react';
import QuizStorageService from './QuizStorageService';
import AnalyticsService from './AnalyticsService';

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [storageService] = useState(new QuizStorageService());
  const [analyticsService] = useState(new AnalyticsService());
  const [sessionId, setSessionId] = useState('');
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  // Analytics tracking - Initialize session
  useEffect(() => {
    const newSessionId = analyticsService.initializeSession();
    setSessionId(newSessionId);
    
    // Track quiz start
    analyticsService.trackEvent('quiz_started', {
      sessionId: newSessionId,
      totalQuestions: questions.length
    });
  }, [analyticsService]);

  // Track when quiz actually starts (questions loaded)
  useEffect(() => {
    if (questions.length > 0 && sessionId) {
      analyticsService.trackEvent('quiz_questions_loaded', {
        questionCount: questions.length,
        sessionId
      });
      setQuestionStartTime(Date.now());
    }
  }, [questions, sessionId, analyticsService]);

  // Load questions using cloud storage service + listen for updates
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const loadedQuestions = await storageService.loadQuestions();
        // Use all questions (up to 20) instead of fixed 5
        const quizQuestions = loadedQuestions.slice(0, 20);
        setQuestions(quizQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
        // Fallback to default questions
        setQuestions(sampleQuestions);
      }
    };

    loadQuestions();

    // Listen for question updates from admin panel
    const handleQuestionsUpdate = () => {
      loadQuestions();
    };

    window.addEventListener('bardoli_questions_updated', handleQuestionsUpdate);
    
    return () => {
      window.removeEventListener('bardoli_questions_updated', handleQuestionsUpdate);
    };
  }, [storageService]);

  // Sample questions - fallback if admin hasn't added questions yet
  const sampleQuestions = [
    {
      id: 1,
      question: "Which river flows through Bardoli?",
      options: ["Mindhola River", "Narmada River", "Sabarmati River", "Mahi River"],
      correctAnswer: 0,
      image: null
    },
    {
      id: 2,
      question: "Bardoli is famous for which historical movement?",
      options: ["Salt March", "Bardoli Satyagraha", "Quit India Movement", "Dandi March"],
      correctAnswer: 1,
      image: null
    },
    {
      id: 3,
      question: "Who led the Bardoli Satyagraha?",
      options: ["Mahatma Gandhi", "Vallabhbhai Patel", "Jawaharlal Nehru", "Subash Chandra Bose"],
      correctAnswer: 1,
      image: null
    },
    {
      id: 4,
      question: "In which district is Bardoli located?",
      options: ["Bharuch", "Navsari", "Surat", "Valsad"],
      correctAnswer: 2,
      image: null
    },
    {
      id: 5,
      question: "What is the main language spoken in Bardoli?",
      options: ["Hindi", "English", "Gujarati", "Marathi"],
      correctAnswer: 2,
      image: null
    }
  ];

  useEffect(() => {
    if (!isAnswered && timeLeft > 0 && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeout();
    }
  }, [timeLeft, isAnswered, questions.length]);

  const handleTimeout = () => {
    // Track timeout
    analyticsService.trackEvent('question_timeout', {
      sessionId,
      questionNumber: currentQuestion + 1
    });
    
    setIsAnswered(true);
    setShowResult(true);
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const handleAnswerClick = (answerIndex) => {
    if (isAnswered) return;
    
    const timeSpent = 30 - timeLeft;
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowResult(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    
    // Track answer
    analyticsService.trackEvent('question_answered', {
      sessionId,
      questionNumber: currentQuestion + 1,
      isCorrect,
      timeSpent,
      selectedAnswer: answerIndex,
      correctAnswer: questions[currentQuestion].correctAnswer
    });
    
    if (isCorrect) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimeLeft(30);
    setQuestionStartTime(Date.now());

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
      
      analyticsService.trackEvent('quiz_completed', {
        sessionId,
        finalScore,
        totalQuestions: questions.length,
        completionTime: Date.now() - questionStartTime
      });
      
      setQuizComplete(true);
      
      // Show confetti based on percentage score
      const percentage = (finalScore / questions.length) * 100;
      if (percentage >= 60) { // 60% or better gets confetti
        setShowConfetti(true);
      }
    }
  };

  const resetQuiz = () => {
    // Track quiz restart
    analyticsService.trackEvent('quiz_restarted', {
      sessionId,
      previousScore: score,
      previousCompletionStatus: quizComplete
    });
    
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizComplete(false);
    setTimeLeft(30);
    setIsAnswered(false);
    setShowConfetti(false);
    setQuestionStartTime(Date.now());
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Outstanding! You're a Bardoli expert! 🏆";
    if (percentage >= 60) return "Great job! You know Bardoli well! 🌟";
    if (percentage >= 40) return "Good effort! Keep learning about Bardoli! 📚";
    return "Don't worry! There's always room to learn more! 💪";
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    if (percentage >= 40) return "text-blue-400";
    return "text-gray-400";
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">
        {showConfetti && <Confetti />}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full text-center"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="space-y-6"
          >
            <div className="text-6xl mb-4">
              {score >= 4 ? "🏆" : score >= 3 ? "🌟" : score >= 2 ? "👍" : "💪"}
            </div>
            
            <h1 className="text-4xl font-black text-white mb-4">
              Quiz Complete!
            </h1>
            
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-xl p-6 border border-yellow-400/30">
              <div className={`text-6xl font-black mb-2 ${getScoreColor()}`}>
                {score}/{questions.length}
              </div>
              <div className="text-white/60 text-sm mb-2">
                {Math.round((score / questions.length) * 100)}% Correct
              </div>
              <p className="text-white/80 text-lg">{getScoreMessage()}</p>
            </div>

            <p className="text-white/70 text-lg">
              Ready to test your knowledge in the real Bardoli Brain Battle?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLSffos5IwfCU2Mn5YG10ehXWjUM5dbaZk2Gf4Pz_klfz4BIGcw/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105"
                whileHover={{ y: -2 }}
              >
                🚀 Register for Real Competition
              </motion.a>
              
              <motion.button
                onClick={resetQuiz}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl text-lg border border-white/30"
                whileHover={{ y: -2 }}
              >
                🔄 Try Again
              </motion.button>

              <Link to="/">
                <motion.button
                  className="bg-blue-500/20 backdrop-blur-md hover:bg-blue-500/30 text-white font-bold py-4 px-8 rounded-xl text-lg border border-blue-400/30 flex items-center gap-2"
                  whileHover={{ y: -2 }}
                >
                  <Home size={20} />
                  🏠 Back to Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Show loading if questions aren't loaded yet
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading quiz questions...</div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-6">
      {showConfetti && <Confetti />}
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-lg">
              Question {currentQuestion + 1}/{questions.length}
            </div>
            <div className="flex items-center gap-2 text-white">
              <Trophy className="text-yellow-400" size={20} />
              <span>Score: {score}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-400" size={20} />
            <span className={`text-lg font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-8">
          <motion.div
            className="bg-yellow-400 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {currentQ.question}
          </h2>

          {currentQ.image && (
            <div className="mb-6">
              <img
                src={currentQ.image}
                alt="Question"
                className="max-w-full h-auto rounded-xl"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={isAnswered}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-300 text-left
                  ${isAnswered
                    ? index === currentQ.correctAnswer
                      ? 'bg-green-500/20 border-green-400 text-green-300'
                      : selectedAnswer === index
                      ? 'bg-red-500/20 border-red-400 text-red-300'
                      : 'bg-white/5 border-white/20 text-white/50'
                    : 'bg-white/5 border-white/30 text-white hover:bg-white/10 hover:border-yellow-400'
                  }
                `}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold
                    ${isAnswered && index === currentQ.correctAnswer
                      ? 'bg-green-400 text-white'
                      : isAnswered && selectedAnswer === index && index !== currentQ.correctAnswer
                      ? 'bg-red-400 text-white'
                      : 'bg-white/20 text-white'
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium">{option}</span>
                  {isAnswered && index === currentQ.correctAnswer && (
                    <CheckCircle className="text-green-400 ml-auto" size={20} />
                  )}
                  {isAnswered && selectedAnswer === index && index !== currentQ.correctAnswer && (
                    <XCircle className="text-red-400 ml-auto" size={20} />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Result Animation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {isCorrect ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-400"
                >
                  <div className="text-4xl mb-2">🎉</div>
                  <div className="text-xl font-bold">Correct!</div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-red-400"
                >
                  <div className="text-4xl mb-2">😅</div>
                  <div className="text-xl font-bold">
                    {timeLeft === 0 ? "Time's up!" : "Not quite right!"}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractiveQuiz;
