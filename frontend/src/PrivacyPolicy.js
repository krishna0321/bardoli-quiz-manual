import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </Link>
            <div className="text-white/60">|</div>
            <h1 className="text-white font-bold text-lg">Privacy Policy</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-white mb-4"
            >
              🔒 Privacy Policy
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-yellow-400 text-xl font-semibold"
            >
              <Shield size={24} />
              <span>Bardoli Brain Battle</span>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert prose-yellow max-w-none"
          >
            <div className="text-white/90 leading-relaxed space-y-8">
              <p className="text-lg text-white/80 mb-8">
                We value your privacy and ensure your data is handled responsibly.
              </p>

              <div className="space-y-8">
                {/* Information We Collect */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="text-yellow-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Information We Collect</h3>
                  </div>
                  <div className="space-y-3 text-white/80">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Name, email, phone number</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Payment confirmation (via manual methods)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Optional feedback, question suggestions, and quiz answers</span>
                    </div>
                  </div>
                </motion.div>

                {/* Why We Collect It */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="text-yellow-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Why We Collect It</h3>
                  </div>
                  <div className="space-y-3 text-white/80">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>To confirm registration and send event updates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>To share results and process prizes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>To improve future quiz experiences</span>
                    </div>
                  </div>
                </motion.div>

                {/* How We Store It */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-blue-500/10 rounded-xl p-6 border border-blue-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="text-blue-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">How We Store It</h3>
                  </div>
                  <p className="text-white/80">
                    Your data is securely stored using <strong className="text-blue-400">Google Forms</strong>, 
                    <strong className="text-blue-400"> manual methods</strong>, and <strong className="text-blue-400">WhatsApp Business</strong>. 
                    We do not share or sell your information to third parties.
                  </p>
                </motion.div>

                {/* Your Rights */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-green-500/10 rounded-xl p-6 border border-green-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="text-green-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Your Rights</h3>
                  </div>
                  <p className="text-white/80">
                    You may request access to, or deletion of, your data by emailing{' '}
                    <a 
                      href="mailto:kemchhobardoliquiz@gmail.com" 
                      className="text-green-400 hover:text-green-300 underline font-semibold"
                    >
                      kemchhobardoliquiz@gmail.com
                    </a>
                  </p>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-xl p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="text-yellow-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Questions About Privacy?</h3>
                  </div>
                  <p className="text-white/80">
                    If you have any questions about this Privacy Policy, please contact us at{' '}
                    <a 
                      href="mailto:kemchhobardoliquiz@gmail.com" 
                      className="text-yellow-400 hover:text-yellow-300 underline font-semibold"
                    >
                      kemchhobardoliquiz@gmail.com
                    </a>
                  </p>
                </motion.div>

                {/* Security Notice */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-purple-500/10 rounded-xl p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-purple-400 text-2xl">🛡️</span>
                    <h3 className="text-2xl font-bold text-white">Security Commitment</h3>
                  </div>
                  <p className="text-white/80">
                    We implement appropriate technical and organizational measures to protect your personal data 
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-12"
          >
            <Link
              to="/"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block"
            >
              🏠 Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
