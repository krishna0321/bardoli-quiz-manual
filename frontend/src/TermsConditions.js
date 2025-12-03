import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Clock, Users, Shield } from 'lucide-react';

const TermsConditions = () => {
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
            <h1 className="text-white font-bold text-lg">Terms & Conditions</h1>
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
              Terms & Conditions
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-yellow-400 text-xl font-semibold"
            >
              <Trophy size={24} />
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
                By registering for the Bardoli Brain Battle ("Event"), you agree to the following terms and conditions:
              </p>

              <div className="space-y-8">
                {/* Eligibility */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-yellow-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Eligibility</h3>
                  </div>
                  <p className="text-white/80">
                    The event is open to all individuals. There is no age restriction, but basic digital access and literacy are required.
                  </p>
                </motion.div>

                {/* One Entry Per Person */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="text-yellow-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">One Entry Per Person</h3>
                  </div>
                  <p className="text-white/80">
                    Multiple registrations by the same individual will result in disqualification.
                  </p>
                </motion.div>

                {/* Use of Internet */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-yellow-400 text-2xl">🌐</span>
                    <h3 className="text-2xl font-bold text-white">Use of Internet</h3>
                  </div>
                  <p className="text-white/80">
                    This is an open-book quiz. Participants are allowed (and encouraged) to use the internet to find answers.
                  </p>
                </motion.div>

                {/* Submission Timing */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-yellow-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Submission Timing</h3>
                  </div>
                  <p className="text-white/80">
                    Submissions will be accepted only between <strong className="text-yellow-400">12:00 PM and 4:00 PM on 13th July 2025</strong>. Entries submitted after the deadline will not be considered.
                  </p>
                </motion.div>

                {/* Winner Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="text-yellow-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Winner Selection</h3>
                  </div>
                  <p className="text-white/80">
                    Winners will be selected based on accuracy and submission time. In case of a tie, the earliest timestamp will be the deciding factor.
                  </p>
                </motion.div>

                {/* Prizes */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-xl p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-yellow-400 text-2xl">🏆</span>
                    <h3 className="text-2xl font-bold text-white">Prizes</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-white/80 mb-4">Top 3 winners will receive:</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🥇</div>
                        <div className="text-yellow-400 font-bold text-xl">₹2,000</div>
                      </div>
                      <div className="text-center bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🥈</div>
                        <div className="text-yellow-400 font-bold text-xl">₹1,500</div>
                      </div>
                      <div className="text-center bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🥉</div>
                        <div className="text-yellow-400 font-bold text-xl">₹500</div>
                      </div>
                    </div>
                    <p className="text-white/80 mt-4">
                      <strong>Plus:</strong> Feature reel promotion on the Bardoli Town Instagram page and additional free coupons.
                    </p>
                  </div>
                </motion.div>

                {/* Disqualification Rights */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-red-500/10 rounded-xl p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-red-400 text-2xl">⚠️</span>
                    <h3 className="text-2xl font-bold text-white">Disqualification Rights</h3>
                  </div>
                  <p className="text-white/80">
                    Organizers reserve the right to disqualify any participant for misuse, cheating, or unethical behavior.
                  </p>
                </motion.div>

                {/* No Liability */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-yellow-400 text-2xl">🛡️</span>
                    <h3 className="text-2xl font-bold text-white">No Liability</h3>
                  </div>
                  <p className="text-white/80">
                    The organizers are not responsible for any technical issues including device errors, internet failure, or third-party platform delays.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
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

export default TermsConditions;
