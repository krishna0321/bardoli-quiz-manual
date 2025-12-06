import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Users, 
  BookOpen, 
  Target, 
  Instagram,
  Brain,
  Trophy,
  Globe,
  Lightbulb
} from 'lucide-react';

const AboutUs = () => {
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
            <h1 className="text-white font-bold text-lg">About Us</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section 
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 29, 86, 0.8), rgba(10, 29, 86, 0.9)), url('https://images.unsplash.com/photo-1599659847046-617ea5ebbfb7')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-black text-white leading-tight"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              ABOUT
              <span className="block text-yellow-400">
                BARDOLI BRAIN BATTLE
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Where Local Knowledge Meets Global Thinking - Building a Smarter Community Together
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our Story
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Born from a passion for learning and community building
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
                  <Heart className="text-yellow-400" size={32} />
                  <h3 className="text-2xl font-bold text-white">Our Mission</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  Bardoli Brain Battle was born from a simple belief: every community deserves a platform 
                  to celebrate knowledge, learning, and intellectual curiosity. We aim to create an inclusive 
                  space where minds of all ages can come together, compete fairly, and grow collectively.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="text-yellow-400" size={32} />
                  <h3 className="text-2xl font-bold text-white">Our Vision</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  To transform Bardoli into a recognized hub of intellectual excellence, where local wisdom 
                  meets global knowledge. We envision a community that values learning, celebrates curiosity, 
                  and inspires the next generation of thinkers and innovators.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div 
                className="rounded-2xl overflow-hidden h-96 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1507738978512-35798112892c')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-white font-bold text-xl mb-2">Knowledge is Power</h4>
                  <p className="text-white/80">Building a library of minds in our community</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1573497701175-00c200fd57f0')`,
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
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Passionate organizers dedicated to building our knowledge community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                role: "Community Coordinator",
                description: "Connecting hearts and minds across Bardoli",
                icon: <Users className="text-yellow-400" size={48} />
              },
              {
                role: "Quiz Master",
                description: "Crafting engaging questions that challenge and inspire",
                icon: <Brain className="text-yellow-400" size={48} />
              },
              {
                role: "Event Manager",
                description: "Ensuring every detail creates an amazing experience",
                icon: <Trophy className="text-yellow-400" size={48} />
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-4">{member.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{member.role}</h3>
                <p className="text-white/80">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Do This Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why We Do This
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our driving forces and core beliefs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Building Community",
                description: "We believe that shared learning experiences create stronger bonds between neighbors, friends, and families in Bardoli.",
                icon: <Users className="text-yellow-400" size={32} />,
                gradient: "from-blue-500/20 to-purple-500/20"
              },
              {
                title: "Celebrating Intelligence",
                description: "Every form of knowledge deserves recognition - from street smarts to academic excellence, local wisdom to global awareness.",
                icon: <Lightbulb className="text-yellow-400" size={32} />,
                gradient: "from-yellow-500/20 to-orange-500/20"
              },
              {
                title: "Inspiring Growth",
                description: "Competition drives us to learn more, think deeper, and reach higher. We create opportunities for intellectual growth.",
                icon: <BookOpen className="text-yellow-400" size={32} />,
                gradient: "from-green-500/20 to-blue-500/20"
              },
              {
                title: "Global Connection",
                description: "While rooted in Bardoli, our quiz connects local knowledge with global perspectives, preparing our community for the world.",
                icon: <Globe className="text-yellow-400" size={32} />,
                gradient: "from-purple-500/20 to-pink-500/20"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-8 border border-white/10 hover:border-yellow-400/30 transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  {item.icon}
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-white/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 29, 86, 0.9), rgba(10, 29, 86, 0.8)), url('https://images.pexels.com/photos/13638882/pexels-photo-13638882.jpeg')`,
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
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Making a difference in Bardoli, one mind at a time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "34K+", label: "Instagram Followers", desc: "@kemchhobardoli_ community" },
              { number: "500+", label: "Expected Participants", desc: "In our inaugural event" },
              { number: "₹15,000", label: "Prize Pool", desc: "Rewarding excellence" },
              { number: "100%", label: "Community Focus", desc: "Local pride, global thinking" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-md rounded-xl p-6"
              >
                <div className="text-4xl font-black text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-white/70 text-sm">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Connect With Us
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join our growing community of knowledge enthusiasts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a
                href="https://instagram.com/kemchhobardoli_
"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Instagram size={24} />
                Follow @kemchhobardoli_
              </motion.a>
              
              <motion.a
                href="mailto:bardolitownquiz@gmail.com"
                className="bg-blue-500/20 backdrop-blur-md hover:bg-blue-500/30 text-white font-bold py-4 px-8 rounded-xl text-lg border border-blue-400/30 transition-all duration-300 flex items-center gap-3"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                📧 Email Us
              </motion.a>

              <motion.a
                href="tel:+919081643992"
                className="bg-green-500/20 backdrop-blur-md hover:bg-green-500/30 text-white font-bold py-4 px-8 rounded-xl text-lg border border-green-400/30 transition-all duration-300 flex items-center gap-3"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                📞 Call Us
              </motion.a>
            </div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto mt-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Get in Touch</h3>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-yellow-400 font-semibold">📞 Phone</div>
                  <a href="tel:+919081643992" className="text-white hover:text-yellow-400 transition-colors">
                    +91 90816 43992
                  </a>
                </div>
                <div className="space-y-2">
                  <div className="text-yellow-400 font-semibold">📧 Email</div>
                  <a href="mailto:bardolitownquiz@gmail.com" className="text-white hover:text-yellow-400 transition-colors">
                    bardolitownquiz@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="pt-8">
              <p className="text-white/60 text-sm">
                Together, we're building a smarter, more connected Bardoli
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="text-center py-12"
      >
        <Link
          to="/"
          className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl inline-block"
        >
          🏠 Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default AboutUs;
