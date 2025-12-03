// Cloud Storage Service for Quiz Questions
// This provides TRUE cross-device synchronization using REST API

class QuizStorageService {
  constructor() {
    this.localStorageKey = 'bardoli_quiz_questions';
    this.cloudEndpoint = 'https://api.jsonbin.io/v3/b/675e8b1aad19ca34f8cfdb42'; // Free JSON storage
    this.apiKey = '$2a$10$vQJ3xEd0CQxqNpQqWMl8tOHPmqz.y.SH6SYZYc8b.GF8VEF9LMo6K'; // Free API key
    
    // Default questions
    this.defaultQuestions = [
      {
        id: 1,
        question: "Which river flows through Bardoli?",
        options: ["Mindhola River", "Narmada River", "Sabarmati River", "Mahi River"],
        correctAnswer: 0,
        image: null,
        difficulty: 'easy'
      },
      {
        id: 2,
        question: "Bardoli is famous for which historical movement?",
        options: ["Salt March", "Bardoli Satyagraha", "Quit India Movement", "Dandi March"],
        correctAnswer: 1,
        image: null,
        difficulty: 'medium'
      },
      {
        id: 3,
        question: "Who led the Bardoli Satyagraha?",
        options: ["Mahatma Gandhi", "Vallabhbhai Patel", "Jawaharlal Nehru", "Subash Chandra Bose"],
        correctAnswer: 1,
        image: null,
        difficulty: 'medium'
      },
      {
        id: 4,
        question: "In which district is Bardoli located?",
        options: ["Bharuch", "Navsari", "Surat", "Valsad"],
        correctAnswer: 2,
        image: null,
        difficulty: 'easy'
      },
      {
        id: 5,
        question: "What is the main language spoken in Bardoli?",
        options: ["Hindi", "English", "Gujarati", "Marathi"],
        correctAnswer: 2,
        image: null,
        difficulty: 'easy'
      }
    ];
  }

  // Load questions with TRUE cross-device sync
  async loadQuestions() {
    try {
      // Strategy 1: Try cloud storage first (cross-device sync)
      const cloudQuestions = await this.loadFromCloud();
      if (cloudQuestions && cloudQuestions.length > 0) {
        // Update local storage as backup
        localStorage.setItem(this.localStorageKey, JSON.stringify(cloudQuestions));
        return cloudQuestions;
      }
    } catch (error) {
      console.log('Cloud storage unavailable, trying local storage');
    }

    // Strategy 2: Local storage fallback
    const localQuestions = localStorage.getItem(this.localStorageKey);
    if (localQuestions) {
      try {
        const parsed = JSON.parse(localQuestions);
        if (parsed && parsed.length > 0) {
          return parsed;
        }
      } catch (error) {
        console.error('Error parsing local questions:', error);
      }
    }

    // Strategy 3: Initialize cloud with default questions
    try {
      await this.saveToCloud(this.defaultQuestions);
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.defaultQuestions));
    } catch (error) {
      console.log('Could not initialize cloud storage');
    }

    return this.defaultQuestions;
  }

  // Save questions to cloud for cross-device sync
  async saveQuestions(questions) {
    try {
      // Save to cloud first (cross-device sync)
      await this.saveToCloud(questions);
      
      // Save to local storage as backup
      localStorage.setItem(this.localStorageKey, JSON.stringify(questions));
      
      // Add timestamp for change tracking
      localStorage.setItem(this.localStorageKey + '_updated', Date.now().toString());
      
      // Force refresh event for other components
      window.dispatchEvent(new Event('bardoli_questions_updated'));
      
      return true;
    } catch (error) {
      console.error('Error saving questions:', error);
      
      // Fallback to local only
      localStorage.setItem(this.localStorageKey, JSON.stringify(questions));
      window.dispatchEvent(new Event('bardoli_questions_updated'));
      
      return false;
    }
  }

  // Load from cloud storage (JSONBin - free tier)
  async loadFromCloud() {
    try {
      const response = await fetch(`${this.cloudEndpoint}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': this.apiKey,
          'X-Bin-Meta': 'false'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.questions || [];
      }
      throw new Error('Failed to load from cloud');
    } catch (error) {
      console.log('Cloud load failed:', error.message);
      throw error;
    }
  }

  // Save to cloud storage
  async saveToCloud(questions) {
    try {
      const response = await fetch(this.cloudEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.apiKey
        },
        body: JSON.stringify({
          questions: questions,
          lastUpdated: new Date().toISOString(),
          version: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`Cloud save failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Cloud save error:', error);
      throw error;
    }
  }

  // Test cloud connectivity
  async testConnection() {
    try {
      const response = await fetch(`${this.cloudEndpoint}/latest`, {
        method: 'HEAD',
        headers: {
          'X-Master-Key': this.apiKey
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Initialize cloud storage
  async initialize() {
    try {
      const cloudQuestions = await this.loadFromCloud();
      if (!cloudQuestions || cloudQuestions.length === 0) {
        await this.saveToCloud(this.defaultQuestions);
      }
    } catch (error) {
      console.log('Cloud initialization failed, using local storage');
    }
  }
}

export default QuizStorageService;
