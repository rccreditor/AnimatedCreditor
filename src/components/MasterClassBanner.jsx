// BannerPage.jsx
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaShieldAlt, FaCreditCard, FaStore, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AnimatedTitle from "./AnimatedTitle";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Tilt wrapper with spring physics
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 8; // Increased tilt effect
    const tiltY = (relativeX - 0.5) * -8;
    setTransformStyle(
      `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  return (
    <motion.div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle("")}
      style={{ transform: transformStyle }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Feature Item with floating animation
const FeatureItem = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: delay * 0.15,
        ease: "backOut"
      } 
    }}
    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    whileHover={{
      y: -5,
      transition: { duration: 0.3 }
    }}
    className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-900/20 hover:border-blue-500/30 border border-transparent transition-all duration-300"
  >
    <motion.div 
      className="p-3 bg-blue-900/50 rounded-lg border border-blue-500/50 shrink-0"
      whileHover={{ rotate: 10 }}
    >
      {icon}
    </motion.div>
    <div>
      <h3 className="text-base sm:text-lg font-bold text-white">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-300 mt-1">{description}</p>
    </div>
  </motion.div>
);

// Main Banner Page with enhanced animations
export default function BannerPage() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const hoverButtonRef = useRef(null);

  const handleButtonMouseMove = (event, ref) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const features = [
    { icon: <FaShieldAlt className="text-blue-400 text-lg sm:text-xl" />, title: "Private Trust Formation", description: "Protect assets and stay out of state control" },
    { icon: <FaCreditCard className="text-blue-400 text-lg sm:text-xl" />, title: "Tier 1 Credit Profile", description: "Access capital without SSN requirements" },
    { icon: <FaStore className="text-blue-400 text-lg sm:text-xl" />, title: "Private Merchant Accounts", description: "Collect payments without shutdown risks" },
    { icon: <FaRocket className="text-blue-400 text-lg sm:text-xl" />, title: "Business Launch System", description: "Income-producing online/offline businesses" }
  ];

  const stats = [
    { value: "90", label: "Day Program" }, 
    { value: "24/7", label: "Support Access" }
  ];

  return (
    <div className="min-h-screen bg-[#1a202c] flex items-center justify-center p-4 sm:p-5 overflow-hidden">
      <div className="w-full max-w-6xl space-y-6 sm:space-y-8" ref={containerRef}>
        
        {/* Main Card with enhanced entrance */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <BentoTilt className="border border-gray-700 h-[50vh] sm:h-[80vh] w-full overflow-hidden rounded-md shadow-lg">
            <BentoCard
              src="/videos/Banner.mp4"
              title={
                <AnimatedTitle
                  title="Private Business Launchpad"
                  containerClass="mt-3 sm:mt-8 !text-white"
                />
              }
              description="Reclaim Your Legal Identity and Exit the Public System"
              learnMoreLink="/learn-more"
            />
          </BentoTilt>
        </motion.div>

        {/* Content Section with staggered animations */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {/* Left Column - Slides in from left */}
          <motion.div 
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white special-font"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                Master Class Program
              </span>
              <br className="hidden sm:block" />
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.4 }}
                className="block"
              >
                Build Privately. Launch Confidently. Grow Without Limits.
              </motion.span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-300 text-sm sm:text-lg"
            >
              The 90-Day Master Class by Creditor Academy is your all-in-one business launch system for the private world. Whether you're a first-time entrepreneur or ready to restructure your public business, this program equips you with everything you need to operate sovereignly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="p-4 sm:p-6 bg-gray-800/50 border border-gray-700 rounded-xl"
            >
              <motion.h3 
                className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    transition: { 
                      delay: 0.7,
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    } 
                  }}
                >
                  <FaRocket className="text-blue-400 shrink-0" />
                </motion.div>
                <span>Why This Master Class Is Different</span>
              </motion.h3>
              <motion.p 
                className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.6 }}
              >
                Unlike traditional business programs that focus on outdated models, this Master Class teaches you the private approach:
              </motion.p>
              
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {features.map((feature, index) => (
                  <FeatureItem 
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    delay={index}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Slides in from right */}
          <motion.div 
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.3 }
              }}
              className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl h-full flex flex-col"
            >
              {/* Top text */}
              <div>
                <motion.h3 
                  className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                    Ready to Unlock Your Private Business Potential?
                  </span>
                </motion.h3>
                <motion.p 
                  className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.5 }}
                >
                  Tap below to explore the full Master Class breakdown, bonus tools, and the dozens of businesses you can launch after completing the program.
                </motion.p>
              </div>

              {/* Image with parallax effect */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="overflow-hidden rounded-lg border border-blue-500/30 mb-4 sm:mb-6"
              >
                <motion.img
                  src="/img/Master.jpg"
                  alt="Masterclass Preview"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Stats grid with wave animation - Modern Design */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 0.7 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      } 
                    }}
                    viewport={{ once: false, amount: 0.3 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="p-3 sm:p-4 rounded-lg relative overflow-hidden group border-2 border-blue-200 bg-white/90 backdrop-blur-sm shadow-sm"
                  >
                    {/* Subtle animated gradient background */}
                    <motion.div 
                      className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 blur-sm"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                      }}
                    />
                    
                    {/* Glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                      initial={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      style={{
                        background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.4), transparent 70%)"
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-blue-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                    
                    {/* Animated bottom accent */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-300"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      viewport={{ once: false, amount: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Button with ripple effect */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.98 }} 
                className="relative"
                ref={hoverButtonRef}
                onMouseMove={(e) => handleButtonMouseMove(e, hoverButtonRef)}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                />
                <button
                  onMouseEnter={() => setHoveredButton('explore')}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="relative w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg border border-blue-300/50 flex items-center justify-center gap-2 text-sm sm:text-lg transition-all duration-200 overflow-hidden"
                >
                  <AnimatePresence>
                    {hoveredButton === 'explore' && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        className="absolute inset-0 bg-white rounded-full"
                        style={{
                          top: cursorPosition.y - 100,
                          left: cursorPosition.x - 100,
                          width: 200,
                          height: 200,
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      transition: { 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      } 
                    }}
                  >
                    <FaRocket className="text-blue-100" />
                  </motion.div>
                  <span>Explore Now</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Enhanced BentoCard Component
export const BentoCard = ({ src, title, description, learnMoreLink }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const isVideo = src?.toLowerCase().endsWith(".mp4");

  return (
    <div className="relative size-full">
      {/* Video or Image Background with overlay */}
      <div className="absolute left-0 top-0 size-full">
        {isVideo ? (
          <motion.video 
            src={src} 
            loop 
            muted 
            autoPlay 
            playsInline 
            className="size-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
        ) : (
          <motion.img 
            src={src} 
            alt={title} 
            className="size-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
        )}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-3 sm:p-5 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-xl sm:text-3xl font-bold special-font">{title}</h1>
          {description && (
            <motion.p 
              className="mt-2 sm:mt-3 max-w-64 text-xs sm:text-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.5 }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>

        {/* Enhanced Button with floating animation */}
        <motion.div
          ref={hoverButtonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHoverOpacity(1)}
          onMouseLeave={() => setHoverOpacity(0)}
          onClick={() => learnMoreLink && navigate(learnMoreLink)}
          className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase text-white/80 hover:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.7 } 
          }}
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #3b82f688, transparent)`,
            }}
          />
          <motion.div
            animate={{ 
              x: [0, 5, 0],
              transition: { 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              } 
            }}
          >
            <TiLocationArrow className="relative z-20" />
          </motion.div>
          <motion.p className="relative z-20">Learn More</motion.p>
        </motion.div>
      </div>
    </div>
  );
};