import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button'; // Import the Button component

gsap.registerPlugin(ScrollTrigger);

const accentColors = ["#a78bfa", "#8b5cf6", "#6366f1"]; // violet/purple-indigo-blue palette

const MasterclassProgramDetails = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const detailsListItemsRef = useRef([]);
  const limitedSpotsTitleRef = useRef(null);
  const enrollParagraph1Ref = useRef(null);
  const enrollParagraph2Ref = useRef(null);
  const buttonRef = useRef(null);

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
      { opacity: 0, y: 50, scale: 0.9, color: "#fff" },
      { opacity: 1, y: 0, scale: 1, color: accentColors[0], duration: 1.2, ease: "elastic.out(1, 0.5)" },
      0
    );

    // Program details list items animation
    tl.fromTo(
      detailsListItemsRef.current,
      { opacity: 0, x: -50, y: 20 }, // Add y offset
      { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.1 },
      0.4
    );

    // Color flash for font-bold spans in list items
    tl.to(
      detailsListItemsRef.current.map(li => li.querySelector('.font-bold')),
      {
        color: "#ffeb3b", // Bright yellow for emphasis
        duration: 0.5,
        yoyo: true,
        repeat: 1, // Flash once
        stagger: 0.1,
        ease: "power2.inOut",
      },
      0.8 // Start after list items appear
    );

    // Limited Spots title animation
    tl.fromTo(
      limitedSpotsTitleRef.current,
      { opacity: 0, y: 30, rotationZ: 5, color: "#fff" }, // Add rotation
      { opacity: 1, y: 0, rotationZ: 0, color: accentColors[1], duration: 1, ease: "elastic.out(1, 0.5)" },
      1.2
    );

    // Enroll paragraph 1 animation
    tl.fromTo(
      enrollParagraph1Ref.current,
      { opacity: 0, y: 30, scale: 0.95 }, // Add scale
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
      1.4
    );

    // Enroll paragraph 2 animation
    tl.fromTo(
      enrollParagraph2Ref.current,
      { opacity: 0, y: 30, scale: 0.95 }, // Add scale
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
      1.6
    );

    // Button animation
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50, scale: 0.8 }, // Add y offset
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      1.8
    );

    // Color flash for font-bold spans in enroll paragraphs
    tl.to(
      enrollParagraph2Ref.current.querySelector('.font-bold'), // Only target the bold span in the second paragraph
      {
        color: "#ffeb3b", // Bright yellow for emphasis
        duration: 0.5,
        yoyo: true,
        repeat: 1, // Flash once
        ease: "power2.inOut",
      },
      1.8 // Start after paragraphs appear
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-black text-white overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <h3 ref={titleRef} className="text-3xl font-semibold mb-8">Program Details</h3>

        <ul className="list-none space-y-4 text-lg mb-12">
          {[ 
            { label: "Program Length:", value: "90 Days" },
            { label: "Price:", value: "$69/month for 3 months (Total: $207)" },
            { label: "Format:", value: "Video training + templates + live group mentorship" },
            { label: "Ideal For:", value: "Aspiring entrepreneurs, coaches, service providers, real estate investors, digital creators, and freedom-seekers" }
          ].map((item, index) => (
            <li key={index} ref={el => detailsListItemsRef.current[index] = el} className="flex items-center justify-center">
              <span className="text-green-500 mr-3 text-2xl">◆</span>
              <span><span className="font-bold">{item.label}</span> {item.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <h4 ref={limitedSpotsTitleRef} className="text-2xl font-bold mb-4">Limited Spots Open Monthly</h4>
          <p ref={enrollParagraph1Ref} className="text-lg mb-4">Enrol now and take the first step toward full private operation.</p>
          <p ref={enrollParagraph2Ref} className="text-xl mb-8"><span>Take control of your <span className="font-bold">financial future</span>.</span></p>
          <div ref={buttonRef}>
            <Button
              id="program-details-btn"
              title="Enroll Now"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterclassProgramDetails;