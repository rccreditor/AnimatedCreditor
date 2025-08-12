import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Professional accent colors palette
const accentColors = ["#a78bfa", "#8b5cf6", "#6366f1"];

const MasterclassIntro = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const whatIsRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=100",
        toggleActions: "play none none none",
      },
    });

    // Background SVG fade in
    tl.fromTo(
      svgRef.current,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 0.25,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
      },
      0
    )

      // Title
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.95, color: "#fff" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          color: accentColors[0],
          duration: 1.1,
          ease: "power3.out",
        },
        0.2
      )

      // Subtitle
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40, color: "#fff" },
        {
          opacity: 1,
          y: 0,
          color: accentColors[1],
          duration: 1,
          ease: "power2.out",
        },
        0.4
      )

      // "What is" heading
      .fromTo(
        whatIsRef.current,
        { opacity: 0, y: 40, rotationZ: 3, color: "#fff" },
        {
          opacity: 1,
          y: 0,
          rotationZ: 0,
          color: accentColors[2],
          duration: 1,
          ease: "power2.out",
        },
        0.6
      )

      // Paragraph 1
      .fromTo(
        text1Ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          color: "#a78bfa",
          duration: 0.9,
          ease: "power2.out",
        },
        0.8
      )

      // Paragraph 2
      .fromTo(
        text2Ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          color: "#8b5cf6",
          duration: 0.9,
          ease: "power2.out",
        },
        1
      );

    // Highlight important keywords — changed from yellow to blue
    tl.to(
      [
        text1Ref.current.querySelector(".font-bold"),
        ...text2Ref.current.querySelectorAll(".font-bold"),
      ],
      {
        color: "#38bdf8", // bright cyan/blue animation
        scale: 1.05,
        duration: 0.5,
        yoyo: true,
        repeat: -1, // gentle infinite pulse
        stagger: 0.2,
        ease: "sine.inOut",
      },
      1.3
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-6 md:px-12 bg-black text-white overflow-hidden"
    >
      {/* Subtle Animated SVG Background */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="20" cy="20" r="15" fill="purple" />
        <circle cx="80" cy="80" r="10" fill="indigo" />
        <rect x="10" y="70" width="15" height="15" fill="violet" />
        <polygon points="50,10 60,30 40,30" fill="blue" />
      </svg>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-extrabold mb-6 transition-colors duration-700"
        >
          Master Class Program
        </h2>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl font-medium mb-12 transition-colors duration-700 max-w-3xl mx-auto"
        >
          Build Privately. Launch Confidently. Grow Without Limits.
        </p>

        {/* Divider Line */}
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 mx-auto mb-12 rounded-full"></div>

        {/* Description */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3
            ref={whatIsRef}
            className="text-2xl md:text-3xl font-semibold transition-colors duration-700"
          >
            💡 What Is the Master Class?
          </h3>

          <p
            ref={text1Ref}
            className="text-lg md:text-xl leading-relaxed transition-colors duration-700"
          >
            The{" "}
            <span className="font-bold transition-colors duration-700">
              90-Day Master Class
            </span>{" "}
            by Creditor Academy is your all-in-one business launch system for
            the private world.
          </p>

          <p
            ref={text2Ref}
            className="text-lg md:text-xl leading-relaxed transition-colors duration-700"
          >
            Whether you're a first-time entrepreneur or ready to restructure
            your public business into a{" "}
            <span className="font-bold transition-colors duration-700">
              trust-based private entity
            </span>
            , this program equips you with everything you need to build, fund,
            and operate your business{" "}
            <span className="font-bold transition-colors duration-700">
              sovereignly
            </span>
            —without banks, gatekeepers, or liabilities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MasterclassIntro;
