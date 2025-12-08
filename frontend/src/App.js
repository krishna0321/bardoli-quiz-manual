import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Instagram, 
  Gift,
  ChevronDown,
  ChevronUp,
  Timer,
  Calendar,
  Brain,
  Star,
  Award,
  Zap
} from 'lucide-react';
import './App.css';

// Import policy pages
import TermsConditions from './TermsConditions';
import PrivacyPolicy from './PrivacyPolicy';
import CancellationRefund from './CancellationRefund';
import AboutUs from './AboutUs';
import InteractiveQuiz from './InteractiveQuiz';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center items-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <motion.div
          key={unit}
          className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 min-w-[80px]"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl md:text-3xl font-bold text-yellow-400">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase text-white/80 font-medium">
            {unit}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-white/20 rounded-xl overflow-hidden backdrop-blur-sm bg-white/5"
      whileHover={{ scale: 1.02 }}
    >
      <button
        className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-white text-lg">{question}</span>
        {isOpen ? (
          <ChevronUp className="text-yellow-400" />
        ) : (
          <ChevronDown className="text-yellow-400" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 text-white/80 leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

function HomePage() {
  const gameDate = new Date('2025-12-20T12:00:00').getTime();
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: "How will I get the quiz link?",
      answer: "After successful registration, you'll receive the quiz link via WhatsApp when the event starts (12:00 PM on December 20th)."
    },
    {
      question: "Can I use the internet during the quiz?",
      answer: "Yes! This is an open-book quiz. You're allowed to use the internet, search engines, and any resources you need."
    },
    {
      question: "How is the winner decided?",
      answer: "Winners are determined by the fastest correct submission. If you get all answers right, the one who submits earliest wins!"
    },
    {
      question: "What if two people get all correct answers at the same time?",
      answer: "In case of a tie in both score and submission time, we'll conduct a quick tie-breaker round with bonus questions."
    },
    {
      question: "Can I get a refund?",
      answer: "No refunds are available once registration is complete. Please ensure you can participate before registering."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 29, 86, 0.8), rgba(10, 29, 86, 0.9)), url('https://images.unsplash.com/photo-1617791160536-598cf32026fb')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black text-white leading-tight"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              BARDOLI
              <span className="block text-yellow-400 text-7xl md:text-9xl">
                BRAIN BATTLE
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Where Local Knowledge Meets Global Thinking
            </motion.p>

            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="text-yellow-400" size={24} />
                <span className="text-white font-semibold text-lg">
                  20th December 2025 • Saturday
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80">
                <Clock className="text-yellow-400" size={20} />
                <span>12:00 PM - 4:00 PM</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-6"
            >
              <CountdownTimer targetDate={gameDate} />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSffos5IwfCU2Mn5YG10ehXWjUM5dbaZk2Gf4Pz_klfz4BIGcw/viewform?usp=dialog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🚀 REGISTER NOW
                </motion.a>
                
                <motion.a
                  href="/interactive-quiz"
                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl text-lg border border-white/30 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🧠 Try Interactive Quiz
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bardoli Community Section with Ghibli Style */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 29, 86, 0.8), rgba(10, 29, 86, 0.9)), url('https://images.unsplash.com/photo-1584448062058-0d13ba997eb0')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              OUR BARDOLI FAMILY
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Where every mind matters and every question sparks curiosity
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-yellow-400 text-2xl">🏘️</span>
                  <h3 className="text-2xl font-bold text-white">A Town That Thinks Together</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  From the bustling markets to quiet evening gatherings, Bardoli has always been a place where 
                  knowledge flows freely. Our quiz celebrates this beautiful tradition of shared learning.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-yellow-400 text-2xl">🌟</span>
                  <h3 className="text-2xl font-bold text-white">Every Story Matters</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Whether you're a student, shopkeeper, teacher, or dreamer - your unique perspective adds color 
                  to our community tapestry. Join us in celebrating the wisdom that lives in every corner of Bardoli.
                </p>
              </div>

              <motion.div
                className="text-center"
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  to="/interactive-quiz"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 inline-block shadow-2xl"
                >
                  🎯 Start Your Journey Now
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-3xl p-8 backdrop-blur-md border border-yellow-400/30">
                <div className="text-center space-y-6">
                  <div className="text-4xl">🧭</div>
                  <h3 className="text-2xl font-bold text-white">Ready to Explore?</h3>
                  <p className="text-white/80">
                    Test your knowledge with our interactive quiz before the big competition day!
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-2xl font-bold text-yellow-400">🧠</div>
                      <div className="text-white/70 text-sm">Interactive Quiz</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-2xl font-bold text-yellow-400">30s</div>
                      <div className="text-white/70 text-sm">Per Question</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prize Money Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 29, 86, 0.9), rgba(10, 29, 86, 0.8)), url('https://images.pexels.com/photos/2530131/pexels-photo-2530131.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              EPIC PRIZES
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Compete for cash prizes and exclusive recognition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { place: '1st', amount: '₹8,000', icon: '🥇', color: 'from-yellow-500 to-yellow-600' },
              { place: '2nd', amount: '₹5,000', icon: '🥈', color: 'from-gray-400 to-gray-500' },
              { place: '3rd', amount: '₹2,000', icon: '🥉', color: 'from-amber-600 to-amber-700' }
            ].map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${prize.color} p-8 rounded-2xl text-center shadow-2xl transform hover:scale-105 transition-all duration-300`}
                whileHover={{ y: -5 }}
              >
                <div className="text-6xl mb-4">{prize.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{prize.place} Place</h3>
                <p className="text-4xl font-black text-white">{prize.amount}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
              🎁 BONUS REWARDS
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <Gift className="text-yellow-400" size={32} />
                <div>
                  <h4 className="text-white font-semibold">Free Interactive Quiz</h4>
                  <p className="text-white/70">For early registrants</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="text-yellow-400" size={32} />
                <div>
                  <h4 className="text-white font-semibold">Instagram Feature</h4>
                  <p className="text-white/70">Top 3 featured on  @kemchhobardoli_ (600k+ Average Reach)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Game Day Information */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.8)), url('https://images.pexels.com/photos/7662602/pexels-photo-7662602.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              GAME DAY RULES
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Everything you need to know to dominate the competition
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <BookOpen className="text-yellow-400" size={48} />,
                title: "Open-Book Format",
                description: "Internet allowed! Use any resources you need to answer questions."
              },
              {
                icon: <Timer className="text-yellow-400" size={48} />,
                title: "Fastest Wins",
                description: "Speed matters! Fastest correct submission takes the prize."
              },
              {
                icon: <Users className="text-yellow-400" size={48} />,
                title: "One Submission",
                description: "You get one shot to make it count. Choose your answers wisely."
              },
              {
                icon: <Star className="text-yellow-400" size={48} />,
                title: "Instagram Fame",
                description: "Top 3 winners get featured on @kemchhobardoli_'s Instagram reel."
              }
            ].map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-4">{rule.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{rule.title}</h3>
                <p className="text-white/80 leading-relaxed">{rule.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 max-w-2xl mx-auto">
              <Clock className="text-blue-900 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Event Timeline</h3>
              <p className="text-blue-900/80 text-lg">
               Saturday, December 20th, 2025<br/>
                12:00 PM - 4:00 PM
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Questions/Suggestions Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              GOT QUESTIONS?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We've got answers! Reach out to us for any queries or suggestions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Your Question/Suggestion</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  placeholder="What would you like to know or suggest?"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 rounded-xl text-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
            
            {/* Direct Contact Info */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">Or Contact Us Directly</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.a
                  href="tel:+919081643992"
                  className="flex items-center justify-center gap-3 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 rounded-xl p-4 text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-green-400">+91 83207 54038</div>
                  </div>
                </motion.a>
                
                <motion.a
                  href="mailto:bardolitownquiz@gmail.com"
                  className="flex items-center justify-center gap-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-xl p-4 text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-blue-400">bardolitownquiz@gmail.com</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1588665343610-04dfd562e2e7')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              FREQUENTLY ASKED
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Get all your doubts cleared before the big day
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FAQ question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white">
              READY TO BATTLE?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join the ultimate quiz competition and prove your knowledge dominance!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSffos5IwfCU2Mn5YG10ehXWjUM5dbaZk2Gf4Pz_klfz4BIGcw/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-6 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block"
              >
                🏆 REGISTER FOR BATTLE
              </a>
              
              <a
                href="/interactive-quiz"
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold py-6 px-12 rounded-xl text-xl border border-white/30 transition-all duration-300 inline-block"
              >
                🧠 Try Interactive Quiz
              </a>
            </div>

            {/* Social Media Section */}
            <div className="pt-8">
              <div className="flex justify-center items-center gap-4 mb-6">
                <span className="text-white/80 text-lg">Follow us on:</span>
                <motion.a
                  href="https://instagram.com/kemchhobardoli_
"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={24} />
                  <span className="hidden sm:inline font-semibold">@kemchhobardoli_</span>
                </motion.a>
              </div>
              
              {/* Policy Links */}
              <div className="flex flex-wrap justify-center items-center gap-4 mb-6 text-sm">
                <Link
                  to="/about-us"
                  className="text-white/60 hover:text-yellow-400 transition-colors underline"
                >
                  About Us
                </Link>
                <span className="text-white/40">•</span>
                <Link
                  to="/terms-conditions"
                  className="text-white/60 hover:text-yellow-400 transition-colors underline"
                >
                  Terms & Conditions
                </Link>
                <span className="text-white/40">•</span>
                <Link
                  to="/privacy-policy"
                  className="text-white/60 hover:text-yellow-400 transition-colors underline"
                >
                  Privacy Policy
                </Link>
                <span className="text-white/40">•</span>
                <Link
                  to="/cancellation-refund"
                  className="text-white/60 hover:text-yellow-400 transition-colors underline"
                >
                  Cancellation & Refund Policy
                </Link>
              </div>
              
              <p className="text-white/60 text-sm">
                © 2025 Bardoli Brain Battle. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Registration Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showFloatingButton ? 1 : 0,
          scale: showFloatingButton ? 1 : 0
        }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.a
          href="https://docs.google.com/forms/d/e/1FAIpQLSffos5IwfCU2Mn5YG10ehXWjUM5dbaZk2Gf4Pz_klfz4BIGcw/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Zap size={24} />
          <span className="hidden sm:inline">Register</span>
        </motion.a>
      </motion.div>
    </div>
  );
}

// Admin Component Wrapper
function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('bardoli_admin_logged_in');
    setIsLoggedIn(loggedIn === 'true');
  }, []);

  if (isLoggedIn) {
    return <AdminDashboard onLogout={setIsLoggedIn} />;
  }

  return <AdminLogin onLogin={setIsLoggedIn} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cancellation-refund" element={<CancellationRefund />} />
        <Route path="/interactive-quiz" element={<InteractiveQuiz />} />
        <Route path="/admin" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default App;