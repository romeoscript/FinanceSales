
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const backgroundSvg = `data:image/svg+xml,${encodeURIComponent(`<svg width="1440" height="900" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Gradient definitions -->
  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05"/>
    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1"/>
  </linearGradient>
  
  <!-- Pattern definition -->
  <pattern id="gridPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
  </pattern>
  
  <!-- Circle pattern -->
  <pattern id="circlePattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
    <circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.05)"/>
  </pattern>
</defs>

<!-- Background fills -->
<rect width="100%" height="100%" fill="url(#gridPattern)"/>
<rect width="100%" height="100%" fill="url(#circlePattern)"/>

<!-- Abstract network lines -->
<path d="M0,300 C300,400 600,200 900,300 S1200,400 1440,300" stroke="url(#lineGradient)" fill="none" strokeWidth="1" opacity="0.2"/>
<path d="M0,600 C300,500 600,700 900,600 S1200,500 1440,600" stroke="url(#lineGradient)" fill="none" strokeWidth="1" opacity="0.2"/>

<!-- Geometric shapes -->
<circle cx="200" cy="200" r="80" fill="rgba(255,255,255,0.02)"/>
<circle cx="1200" cy="600" r="100" fill="rgba(255,255,255,0.02)"/>
<rect x="600" y="400" width="120" height="120" transform="rotate(45 660 460)" fill="rgba(255,255,255,0.02)"/>

<!-- Currency symbols with subtle appearance -->
<g opacity="0.05">
  <text x="300" y="400" font-family="Arial" font-size="24">$</text>
  <text x="800" y="300" font-family="Arial" font-size="24">€</text>
  <text x="1100" y="500" font-family="Arial" font-size="24">£</text>
  <text x="500" y="600" font-family="Arial" font-size="24">¥</text>
</g>

<!-- Additional network nodes -->
<circle cx="400" cy="300" r="2" fill="rgba(255,255,255,0.1)"/>
<circle cx="900" cy="400" r="2" fill="rgba(255,255,255,0.1)"/>
<circle cx="1200" cy="300" r="2" fill="rgba(255,255,255,0.1)"/>
<circle cx="600" cy="500" r="2" fill="rgba(255,255,255,0.1)"/>
</svg>`)}`;

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("${backgroundSvg}")`,
          opacity: 0.5
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Streamline your International Transactions with Trust and Expertise
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every High Scale Business, Bank and Institution needs secure international transfers to ensure smooth trade & finance.
          </motion.p>
          
          <motion.p 
            className="text-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            At Swift Trade Finance, we connect senders with reliable and verified receivers, leveraging banking instruments to make international money transfers seamless and secure.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="group px-6 py-3 bg-white text-blue-800 rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center">
              Book a Call Today
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all duration-300">
              Contact Us
            </button>
          </motion.div>

          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Lines */}
      <svg className="absolute inset-0 z-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M-100,250 C100,100 300,400 500,250 C700,100 900,400 1100,250"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </section>
  );
};

export default Hero;