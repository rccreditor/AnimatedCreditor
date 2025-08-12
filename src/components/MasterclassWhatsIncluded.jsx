import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const accentColors = ["#a78bfa", "#8b5cf6", "#6366f1"]; // violet/purple-indigo-blue palette

const MasterclassWhatsIncluded = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const mainListItemsRef = useRef([]); // For the first set of step divs
  const bonusTitleRef = useRef(null);
  const bonusParagraphRef = useRef(null);
  const bonusListItemsRef = useRef([]); // For the bonus set of step divs

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=100",
        toggleActions: "play none none none",
      },
    });

    // Main title animation
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, color: "#fff" },
      { opacity: 1, y: 0, color: accentColors[0], duration: 1.2, ease: "power3.out" },
      0
    );

    // Main list items (scattered animation)
    tl.fromTo(
      mainListItemsRef.current,
      { opacity: 0, x: 0, y: 0, scale: 0.1, rotation: 360 }, // Start from center, small, rotated
      {
        opacity: 1,
                x: (i) => {
          const cols = 2;
          const col = i % cols;
          const row = Math.floor(i / cols);
          const baseX = col * 360 - (cols * 360 / 2) + 180; // Center the grid
          const randomOffset = Math.random() * 50 - 25; // Small random offset
          return baseX + randomOffset;
        },
        y: (i) => {
          const cols = 2;
          const row = Math.floor(i / cols);
          const baseY = row * 120 - (Math.ceil(mainListItemsRef.current.length / cols) * 120 / 2) + 60; // Center the grid
          const randomOffset = Math.random() * 30 - 15; // Small random offset
          return baseY + randomOffset;
        },
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.1,
      },
      0.8 // Start after title
    );

    // Bonus title animation
    tl.fromTo(
      bonusTitleRef.current,
      { opacity: 0, y: 30, color: "#fff" },
      { opacity: 1, y: 0, color: accentColors[1], duration: 1, ease: "power3.out" },
      2.5 // Start after main items
    );

    // Bonus paragraph animation
    tl.fromTo(
      bonusParagraphRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      2.8
    );

    // Bonus list items (scattered animation)
    tl.fromTo(
      bonusListItemsRef.current,
      { opacity: 0, x: 0, y: 0, scale: 0.1, rotation: -360 }, // Start from center, small, rotated
      {
        opacity: 1,
        x: (i) => {
          const cols = 2;
          const col = i % cols;
          const row = Math.floor(i / cols);
          const baseX = col * 360 - (cols * 360 / 2) + 180; // Center the grid
          const randomOffset = Math.random() * 40 - 20; // Small random offset
          return baseX + randomOffset;
        },
        y: (i) => {
          const cols = 2;
          const row = Math.floor(i / cols);
          const baseY = row * 120 - (Math.ceil(bonusListItemsRef.current.length / cols) * 120 / 2) + 60; // Center the grid
          const randomOffset = Math.random() * 20 - 10; // Small random offset
          return baseY + randomOffset;
        },
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.1,
      },
      3.2 // Start after bonus paragraph
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-black text-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h3 ref={titleRef} className="text-3xl font-semibold mb-8">What's Included</h3>

        <div className="relative min-h-[600px] flex justify-center items-center overflow-visible"> {/* Increased min-h */}
          {[ "Business Trust Template", "Vendor Application Walkthrough", "Tier 1 Credit Profile Checklist", "Merchant Account Starter Pack", "Live Mentor Support via Group Calls", "Private Business Scorecard + Counseling Session"].map((item, index) => (
            <div key={index} ref={el => mainListItemsRef.current[index] = el} className="absolute w-full max-w-xs bg-gray-800 p-4 rounded-lg shadow-lg text-center"> {/* Absolute positioning */}
              <span className="text-green-500 mr-2 text-xl">✔</span>
              <p className="text-lg inline">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h4 ref={bonusTitleRef} className="text-2xl font-bold mb-4">BONUS: Get Placed in the Right Business Path</h4>
          <p ref={bonusParagraphRef} className="text-lg leading-relaxed mb-4">
            Before you begin, you'll complete your <span className="font-bold">Private Business Scorecard</span> and <span className="font-bold">1-on-1 Counseling Session</span>.
          </p>
          <div className="relative min-h-[450px] flex justify-center items-center overflow-visible"> {/* Increased min-h */}
            {[ "Our mentors will:", "Evaluate your current legal & financial readiness", "Recommend the best trust & credit path", "Match you to the most profitable business model for your skillset"].map((item, index) => (
              <div key={index} ref={el => bonusListItemsRef.current[index] = el} className="absolute w-full max-w-xs bg-gray-800 p-4 rounded-lg shadow-lg text-center"> {/* Absolute positioning */}
                <span className="text-green-500 mr-2 text-xl">✔</span>
                <p className="text-lg inline">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterclassWhatsIncluded;