import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, XCircle, RefreshCw, AlertTriangle, Calendar } from 'lucide-react';

const CancellationRefund = () => {
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
            <h1 className="text-white font-bold text-lg">Cancellation & Refund Policy</h1>
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
              ❌ Cancellation & Refund Policy
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-yellow-400 text-xl font-semibold"
            >
              <RefreshCw size={24} />
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
              <div className="space-y-8">
                {/* No Refunds */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-red-500/10 rounded-xl p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="text-red-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">No Refunds</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed">
                    Once registration is completed and payment is made (<strong className="text-yellow-400">₹30</strong>), 
                    no refunds will be issued under any circumstances — including no-shows, late submissions, 
                    or technical difficulties on the participant's end.
                  </p>
                </motion.div>

                {/* Registration Fee Highlight */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-xl p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-yellow-400 text-2xl">💰</span>
                    <h3 className="text-2xl font-bold text-white">Registration Fee</h3>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-black text-yellow-400 mb-2">₹30</div>
                    <p className="text-white/80">
                      One-time registration fee for Bardoli Brain Battle
                    </p>
                    <div className="mt-4 text-sm text-white/60">
                      Final | Non-refundable | Non-transferable
                    </div>
                  </div>
                </motion.div>

                {/* Event Cancellation */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-blue-500/10 rounded-xl p-6 border border-blue-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-blue-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Event Cancellation</h3>
                  </div>
                  <p className="text-white/80 mb-4">
                    In the rare case that the event is canceled by organizers due to unforeseen reasons, 
                    all participants will either receive:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">💸</div>
                      <div className="text-blue-400 font-bold">Full Refund</div>
                      <div className="text-white/60 text-sm mt-1">Complete reimbursement</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">🎟️</div>
                      <div className="text-blue-400 font-bold">Rescheduled Access</div>
                      <div className="text-white/60 text-sm mt-1">At no extra cost</div>
                    </div>
                  </div>
                </motion.div>

                {/* Non-Transferable */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-orange-500/10 rounded-xl p-6 border border-orange-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="text-orange-400" size={24} />
                    <h3 className="text-2xl font-bold text-white">Non-Transferable</h3>
                  </div>
                  <p className="text-white/80">
                    The quiz registration and participation rights are non-transferable to another individual.
                  </p>
                </motion.div>

                {/* Important Notice */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-purple-500/10 rounded-xl p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-purple-400 text-2xl">⚠️</span>
                    <h3 className="text-2xl font-bold text-white">Important Notice</h3>
                  </div>
                  <div className="space-y-3 text-white/80">
                    <p>Please ensure you can participate before registering. Common scenarios where refunds are NOT provided:</p>
                    <div className="grid gap-2 ml-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>Technical issues with your device or internet connection</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>Not showing up for the quiz on the scheduled date</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>Late submission of answers after 4:00 PM deadline</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>Change of mind after registration</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-green-500/10 rounded-xl p-6 border border-green-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-green-400 text-2xl">📧</span>
                    <h3 className="text-2xl font-bold text-white">Questions or Concerns?</h3>
                  </div>
                  <p className="text-white/80">
                    For any questions regarding this policy, please contact us at{' '}
                    <a 
                      href="mailto:bardolitownquiz@gmail.com" 
                      className="text-green-400 hover:text-green-300 underline font-semibold"
                    >
                      bardolitownquiz@gmail.com
                    </a>
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

export default CancellationRefund;