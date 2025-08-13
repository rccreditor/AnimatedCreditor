import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import {
  FaGavel,
  FaIdCard,
  FaDoorOpen,
  FaFileContract,
  FaShieldAlt,
  FaBusinessTime,
  FaUniversity,
  FaBalanceScale,
  FaHandsHelping,
  FaBriefcase,
  FaHandshake,
  FaChartLine,
  FaMoneyBillWave,
  FaUserTie,
  FaLandmark
} from "react-icons/fa";
import { motion } from "framer-motion";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, learnMoreLink, extraContent, isComingSoon, cardIndex }) => {
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

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const handleClick = () => {
    if (learnMoreLink) {
      navigate(learnMoreLink);
    }
  };

  // Content for each card
  const cardContents = [
    {
      // Card 1 content
      learnTitle: "What You'll Learn",
      learnItems: [
        { icon: FaGavel, text: "Principles of sovereignty and status correction" },
        { icon: FaIdCard, text: "What legal fictions are — and how to rebut presumption" },
        { icon: FaDoorOpen, text: "How to exit public jurisdiction lawfully" }
      ],
      doTitle: "What You Can Do",
      doItems: [
        { icon: FaHandsHelping, text: "Offer sovereignty/status correction services" },
        { icon: FaUniversity, text: "Start a private legal literacy business" }
      ],
      color: "black"
    },
    {
      // Card 2 content
      learnTitle: "What You'll Learn",
      learnItems: [
        { icon: FaBalanceScale, text: "Private vs public legal distinctions" },
        { icon: FaShieldAlt, text: "Asset protection strategies in private" },
        { icon: FaFileContract, text: "How to conduct business privately" }
      ],
      doTitle: "What You Can Do",
      doItems: [
        { icon: FaBusinessTime, text: "Operate your business in private jurisdiction" },
        { icon: FaHandshake, text: "Create private contracts and agreements" }
      ],
      color: "blue"
    },
    {
      // Card 3 content
      learnTitle: "What You'll Learn",
      learnItems: [
        { icon: FaChartLine, text: "Building business credit without personal guarantee" },
        { icon: FaMoneyBillWave, text: "Accessing $200K+ in business funding" },
        { icon: FaLandmark, text: "Private banking alternatives" }
      ],
      doTitle: "What You Can Do",
      doItems: [
        { icon: FaBriefcase, text: "Establish business credit lines" },
        { icon: FaUserTie, text: "Fund your private business ventures" }
      ],
      color: "purple"
    }
  ];

  const currentContent = cardContents[cardIndex] || cardContents[0];

  return (
    <div className="relative size-full">
      {/* Image with dark overlay */}
      <div className="absolute left-0 top-0 size-full">
        <img
          src={src}
          alt={typeof title === "string" ? title : "Bento Card Image"}
          className="size-full object-cover object-center"
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font text-white drop-shadow-lg">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-sm md:text-base text-white/90 drop-shadow-md">{description}</p>
          )}
          {extraContent && (
            <div className="mt-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-4 rounded-lg backdrop-blur-sm">
              <div className="space-y-4">
                {/* WHAT YOU'LL LEARN */}
                <motion.div
                   initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`bg-${currentContent.color}-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {currentContent.learnTitle}
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {currentContent.learnItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <item.icon className={`text-${currentContent.color}-300 mt-0.5 flex-shrink-0`} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* WHAT YOU CAN DO */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`bg-${currentContent.color}-500/90 text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {currentContent.doTitle}
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {currentContent.doItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <item.icon className={`text-${currentContent.color}-300 mt-0.5 flex-shrink-0`} />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {isComingSoon ? (
          <div className="bg-gradient-to-r from-gray-700/90 to-gray-800/90 text-white px-4 py-2 rounded-full text-xs font-medium w-fit">
            Coming Soon
          </div>
        ) : (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-gradient-to-r from-gray-700/90 to-gray-800/90 px-4 py-2 text-xs uppercase text-white hover:from-gray-600/90 hover:to-gray-700/90"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Learn More</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-gradient-to-b from-gray-100 to-gray-200 pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="relative overflow-hidden px-5 py-32 text-center flex flex-col items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#89CFF0]/20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-[#89CFF0]/15 animate-pulse delay-300"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#89CFF0]/10 animate-pulse delay-700"></div>
        </div>

        {/* Holographic title with glow effect */}
        <AnimatedTitle
          title="The Roadmap Series"
          containerClass="mt-5 !text-[#89CFF0] text-5xl font-bold tracking-wide"
          style={{
            textShadow: "0 0 10px rgba(137, 207, 240, 0.6)",
            animation: "hologram 3s ease-in-out infinite alternate"
          }}
        />

        {/* Futuristic card with advanced animations */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg rounded-xl p-8 sm:p-10 shadow-2xl border border-[#89CFF0]/30 hover:border-[#89CFF0]/60 transition-all duration-500 transform hover:scale-[1.005]">
            {/* Floating text with parallax effect */}
            <div 
              className="font-poppins text-2xl sm:text-3xl leading-relaxed sm:leading-relaxed text-gray-800 font-medium mb-8 relative"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <p>
                This self-paced, <span className="relative whitespace-nowrap">
                  <span className="absolute -inset-2 bg-blue-100/50 rounded-lg -rotate-1 animate-pulse"></span>
                  <span 
                    className="relative text-blue-600 font-bold"
                    style={{
                      background: "linear-gradient(90deg, #0077cc, #00aaff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: "0 0 8px rgba(0, 170, 255, 0.3)"
                    }}
                  >
                    results-focused training series
                  </span>
                </span> is designed for entrepreneurs, freedom seekers, and anyone ready to take back control of their legal and financial future.
              </p>
            </div>
            
            {/* Cyberpunk-style timeline with animated nodes */}
            <div 
              className="relative pl-8 border-l-4 border-[#89CFF0]/50 space-y-8"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              {/* Animated node with pulsing effect */}
              <div className="absolute -left-[21px] top-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg animate-pulse">
                <svg 
                  className="h-5 w-5 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                  }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Holographic heading */}
              <h3 
                className="font-poppins text-2xl sm:text-3xl font-bold text-gray-800"
                style={{
                  background: "linear-gradient(90deg, #0077cc, #00aaff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Roadmap Series</span> includes:
              </h3>
              
              {/* Grid with floating animation */}
              <ul className="grid sm:grid-cols-2 gap-6">
                {[
                  "Step-by-step system exit blueprint",
                  "Legal identity reclamation process",
                  "Credit & business tool activation",
                  "Private trust wealth structures",
                  "Lawful commerce frameworks",
                  "Ongoing support community"
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start space-x-4 p-4 bg-white/80 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    data-aos="zoom-in"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center mt-0.5 shadow-inner">
                      <div 
                        className="h-2.5 w-2.5 rounded-full bg-white"
                        style={{
                          boxShadow: "0 0 6px 2px rgba(137, 207, 240, 0.8)"
                        }}
                      ></div>
                    </div>
                    <span 
                      className="font-poppins text-gray-700 font-medium"
                      style={{
                        textShadow: "0 1px 2px rgba(0,0,0,0.05)"
                      }}
                    >{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* Holographic button with hover effects */}
              <div className="pt-6" data-aos="fade-up" data-aos-delay="300">
                <button className="group relative px-8 py-4 font-poppins font-bold rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Start Your Journey Today</span>
                    <svg 
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="absolute top-0 left-0 w-full h-0.5 bg-white/50 animate-beam group-hover:animate-none"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes hologram {
            0% { opacity: 0.9; text-shadow: 0 0 10px rgba(137, 207, 240, 0.6); }
            50% { opacity: 1; text-shadow: 0 0 15px rgba(137, 207, 240, 0.8), 0 0 30px rgba(137, 207, 240, 0.4); }
            100% { opacity: 0.9; text-shadow: 0 0 10px rgba(137, 207, 240, 0.6); }
          }
          @keyframes beam {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-beam {
            animation: beam 2s infinite linear;
          }
        `}</style>
      </div>

      {/* Holographic title with glow effect */}
      <AnimatedTitle
        title="Premium Courses"
        containerClass="mt-5 mb-8 !text-[#89CFF0] text-5xl font-bold tracking-wide" // Added mb-8 for bottom margin
        style={{
          textShadow: "0 0 10px rgba(137, 207, 240, 0.6)",
          animation: "hologram 3s ease-in-out infinite alternate"
        }}
      />

      {/* Updated grid with taller height and adjusted row spans */}
      <div className="grid h-[160vh] w-full grid-cols-2 grid-rows-3 gap-7">
        {/* Card 1 - Increased row span */}
        <BentoTilt className="bento-tilt_1 row-span-2 md:col-span-1">
          <BentoCard
            src="img/sophomore.webp"
            title={
              <>
                1. Bec<b>o</b>me Priv<b>a</b>te + <b>N</b>ew S<b>O</b>V 101
              </>
            }
            description="Reclaim Your Legal Identity and Exit the Public System"
            learnMoreLink="/become-private"
            extraContent
            cardIndex={0}
          />
        </BentoTilt>

        {/* Card 2 - Increased row span */}
        <BentoTilt className="bento-tilt_1 row-span-2 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="img/junior.webp"
            title={
              <>
                2. JUNI<b>O</b>R: Oper<b>a</b>te P<b>r</b>ivate
              </>
            }
            description="Protect Your Assets & Run Your Business in the Private."
            learnMoreLink="/operate-private"
            extraContent
            cardIndex={1}
          />
        </BentoTilt>

        {/* Card 3 - Increased row span */}
        <BentoTilt className="bento-tilt_1 row-span-2 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="img/senior.webp"
            title={
              <>
                3. Pri<b>v</b>ate B<b>u</b>siness C<b>r</b>edit
              </>
            }
            description="Build $200K+ in Business Credit — No SSN. No PG. No Banks."
            learnMoreLink="/business-credit"
            extraContent
            cardIndex={2}
          />
        </BentoTilt>

        {/* Bottom row cards */}
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-gradient-to-br from-violet-200 to-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-gray-800">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end text-violet-600" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;