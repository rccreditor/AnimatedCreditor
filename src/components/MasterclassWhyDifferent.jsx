import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const accentColors = ["#a78bfa", "#8b5cf6", "#38bdf8", "#facc15"];

const MasterclassWhyDifferent = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=100",
        toggleActions: "play none none none",
      },
    });

    // Title animation — slide + color shift
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, color: "#fff" },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
        color: accentColors[0],
      },
      0.2
    );

    // Paragraph animation
    tl.fromTo(
      paragraphRef.current,
      { opacity: 0, y: 30, color: "#ddd" },
      {
        opacity: 1,
        y: 0,
        color: accentColors[1],
        duration: 1,
        ease: "power3.out",
      },
      0.4
    );

    // Cards animation — 360° spin + pop in stagger
    cardRefs.current.forEach((card, i) => {
      tl.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.7, rotationY: 0 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 360, // full spin around
          duration: 1,
          ease: "back.out(1.7)",
        },
        0.6 + i * 0.15
      )
      .to(
        card.querySelector("h4"),
        {
          color: accentColors[(i + 2) % accentColors.length],
          duration: 0.5,
        },
        0.8 + i * 0.15
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  const cardData = [
    {
      title: "Form a Private Trust",
      description: "Protect your assets and stay out of state control",
    },
    {
      title: "Build a Fundable Tier 1 Credit Profile",
      description: "Access capital—no SSN required",
    },
    {
      title: "Set Up Private Merchant Accounts",
      description: "Collect payments without shutdown risks",
    },
    {
      title: "Launch Real, Income-Producing Businesses",
      description: "In both online and offline spaces",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 bg-black text-white relative overflow-hidden"
    >
      {/* Animated BG Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-indigo-800/20 to-blue-800/20 blur-3xl opacity-50"></div>

      <div className="relative max-w-5xl mx-auto z-10">
        <h3
          ref={titleRef}
          className="text-3xl font-semibold mb-8 transition-colors duration-700 text-center"
        >
          Why This Master Class Is Different
        </h3>
        <p
          ref={paragraphRef}
          className="text-lg leading-relaxed mb-12 text-center max-w-2xl mx-auto transition-colors duration-700"
        >
          Unlike traditional business programs that focus on outdated models and public filings,
          this Master Class teaches you how to:
        </p>

        {/* Cards */}
        <div className="flex flex-wrap justify-center items-start gap-8">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`bg-gray-800/80 p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer transform-gpu w-full sm:w-5/12 lg:w-1/5
                ${index === 0 ? 'mt-0' : ''}
                ${index === 1 ? 'md:mt-16' : ''}
                ${index === 2 ? 'lg:mt-0' : ''}
                ${index === 3 ? 'md:mt-16 lg:mt-32' : ''}
              `}
            >
              <h4 className="text-xl font-bold mb-2 transition-colors duration-500">
                {card.title}
              </h4>
              <p className="text-base opacity-90">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasterclassWhyDifferent;
