// Analytics Service for Bardoli Brain Battle
// Tracks user interactions and quiz performance

class AnalyticsService {
  constructor() {
    this.storageKey = 'bardoli_analytics';
    this.sessionKey = 'bardoli_session_data';
  }

  // Initialize analytics for the session
  initializeSession() {
    const sessionId = Date.now().toString();
    const sessionData = {
      sessionId,
      startTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    
    sessionStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
    return sessionId;
  }

  // Get current session data
  getSessionData() {
    const data = sessionStorage.getItem(this.sessionKey);
    return data ? JSON.parse(data) : null;
  }

  // Track analytics events
  trackEvent(eventType, eventData = {}) {
    try {
      const sessionData = this.getSessionData();
      const analyticsData = this.getAnalytics();
      
      const event = {
        eventType,
        eventData,
        sessionId: sessionData?.sessionId || 'unknown',
        timestamp: new Date().toISOString(),
        url: window.location.pathname
      };

      // Add to analytics array
      analyticsData.events.push(event);
      
      // Update analytics summary
      this.updateAnalyticsSummary(analyticsData, eventType, eventData);
      
      // Save to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(analyticsData));
      
      console.log('Analytics tracked:', eventType, eventData);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Get all analytics data
  getAnalytics() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing analytics data:', error);
      }
    }
    
    // Return default structure
    return {
      events: [],
      summary: {
        totalQuizAttempts: 0,
        totalCompletions: 0,
        totalAbandoned: 0,
        uniqueSessions: new Set(),
        returningUsers: 0,
        averageScore: 0,
        averageTimePerQuestion: 0
      },
      lastUpdated: new Date().toISOString()
    };
  }

  // Update analytics summary
  updateAnalyticsSummary(analyticsData, eventType, eventData) {
    const summary = analyticsData.summary;
    const sessionData = this.getSessionData();
    
    switch (eventType) {
      case 'quiz_started':
        summary.totalQuizAttempts++;
        if (sessionData?.sessionId) {
          if (summary.uniqueSessions.has && summary.uniqueSessions.has(sessionData.sessionId)) {
            summary.returningUsers++;
          }
          // Convert Set to Array for localStorage compatibility
          if (!Array.isArray(summary.uniqueSessions)) {
            summary.uniqueSessions = [];
          }
          if (!summary.uniqueSessions.includes(sessionData.sessionId)) {
            summary.uniqueSessions.push(sessionData.sessionId);
          }
        }
        break;
        
      case 'quiz_completed':
        summary.totalCompletions++;
        if (eventData.finalScore !== undefined && eventData.totalQuestions) {
          // Calculate percentage score for better analytics
          const scorePercentage = (eventData.finalScore / eventData.totalQuestions) * 100;
          
          // Calculate new average percentage
          const currentAvg = summary.averageScore || 0;
          const totalCompleted = summary.totalCompletions;
          summary.averageScore = ((currentAvg * (totalCompleted - 1)) + scorePercentage) / totalCompleted;
        }
        break;
        
      case 'quiz_abandoned':
        summary.totalAbandoned++;
        break;
        
      case 'question_answered':
        // Track timing data
        if (eventData.timeSpent) {
          const currentAvgTime = summary.averageTimePerQuestion || 0;
          const totalAnswers = analyticsData.events.filter(e => e.eventType === 'question_answered').length;
          summary.averageTimePerQuestion = ((currentAvgTime * (totalAnswers - 1)) + eventData.timeSpent) / totalAnswers;
        }
        break;
    }
    
    summary.lastUpdated = new Date().toISOString();
  }

  // Get analytics dashboard data
  getDashboardData() {
    const analyticsData = this.getAnalytics();
    const summary = analyticsData.summary;
    
    // Convert uniqueSessions back to Set for counting
    const uniqueSessionsCount = Array.isArray(summary.uniqueSessions) 
      ? summary.uniqueSessions.length 
      : 0;
    
    return {
      totalAttempts: summary.totalQuizAttempts || 0,
      totalCompletions: summary.totalCompletions || 0,
      totalAbandoned: summary.totalAbandoned || 0,
      uniqueUsers: uniqueSessionsCount,
      returningUsers: summary.returningUsers || 0,
      completionRate: summary.totalQuizAttempts > 0 
        ? ((summary.totalCompletions / summary.totalQuizAttempts) * 100).toFixed(1)
        : '0',
      averageScore: summary.averageScore ? summary.averageScore.toFixed(1) : '0',
      averageTimePerQuestion: summary.averageTimePerQuestion 
        ? `${Math.round(summary.averageTimePerQuestion)}s` 
        : '0s',
      lastUpdated: summary.lastUpdated
    };
  }

  // Get recent events for admin dashboard
  getRecentEvents(limit = 50) {
    const analyticsData = this.getAnalytics();
    return analyticsData.events
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  // Clear analytics data (admin function)
  clearAnalytics() {
    localStorage.removeItem(this.storageKey);
    return true;
  }

  // Export analytics data
  exportAnalytics() {
    const data = this.getAnalytics();
    const dashboardData = this.getDashboardData();
    
    return {
      summary: dashboardData,
      allEvents: data.events,
      exportedAt: new Date().toISOString()
    };
  }
}

export default AnalyticsService;