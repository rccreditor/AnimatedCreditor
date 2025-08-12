import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const accentColors = ["#a78bfa", "#8b5cf6", "#6366f1"]; // violet/purple-indigo-blue palette

const MasterclassBusinesses = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featureContainerRef = useRef(null);
  const circlesContainerRef = useRef(null);
  const lineRefs = useRef([]); // Store connecting lines

  const [activeCategory, setActiveCategory] = useState(null);
  const [showFeatures, setShowFeatures] = useState(false);

  const trustFeatures = [
    "Airbnb or Short-Term Rentals",
    "Real Estate Trust Entity",
    "Credit Repair & Funding Agency",
    "Private Coaching or Mentorship",
    "Dropshipping or E-Commerce Store",
  ];

  const tier1Features = [
    "Cleaning & Maintenance Services",
    "Tax Prep & Bookkeeping",
    "Loan Signing & Mobile Notary",
    "Vending Machine Business",
    "Freelance or Virtual Assistant Work",
  ];

  const merchantFeatures = [
    "Digital Courses & Info Products",
    "Subscription Boxes or Membership Sites",
    "Funnels & Digital Ad Agencies",
    "Event Spaces & Pop-Up Shops",
    "Podcasts, Studios, or Creative Brands",
  ];

  const getFeatures = (category) => {
    switch (category) {
      case 'trust': return trustFeatures;
      case 'tier1': return tier1Features;
      case 'merchant': return merchantFeatures;
      default: return [];
    }
  };

  const handleCategoryClick = (categoryName) => {
    if (activeCategory === categoryName && showFeatures) {
      setShowFeatures(false);
      gsap.to(featureContainerRef.current.children, { opacity: 0, scale: 0.5, duration: 0.4, ease: "back.in" });
      lineRefs.current.forEach(line => gsap.to(line, { scaleX: 0, scaleY: 0, duration: 0.3, ease: "power2.in" }));
      setTimeout(() => {
        lineRefs.current.forEach(line => line.remove());
        lineRefs.current = [];
        setActiveCategory(null);
      }, 400);
    } else {
      if (showFeatures) {
        setShowFeatures(false);
        gsap.to(featureContainerRef.current.children, { opacity: 0, scale: 0.5, duration: 0.4, ease: "back.in" });
        lineRefs.current.forEach(line => gsap.to(line, { scaleX: 0, scaleY: 0, duration: 0.3, ease: "power2.in" }));
        setTimeout(() => {
          lineRefs.current.forEach(line => line.remove());
          lineRefs.current = [];
          setActiveCategory(categoryName);
          setShowFeatures(true);
        }, 400);
      } else {
        setActiveCategory(categoryName);
        setShowFeatures(true);
      }
    }
  };

  useEffect(() => {
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=100",
        toggleActions: "play none none none",
      },
    });

    mainTl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, color: "#fff" },
      { opacity: 1, y: 0, color: accentColors[0], duration: 1.2, ease: "power3.out" },
      0
    );

    mainTl.fromTo(
      ".category-circle",
      { opacity: 0, scale: 0.5, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)", stagger: 0.2 },
      0.5
    );

    return () => {
      mainTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (showFeatures && activeCategory) {
      const features = getFeatures(activeCategory);
      const numFeatures = features.length;
      const radius = 160;

      if (featureContainerRef.current) {
        const listItems = featureContainerRef.current.querySelectorAll('li');
        const containerRect = featureContainerRef.current.getBoundingClientRect();

        lineRefs.current.forEach(line => line.remove());
        lineRefs.current = [];

        gsap.fromTo(featureContainerRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" }
        );

        const centerX = containerRect.width / 2;
        const centerY = 210; // Increased vertical position further down below circles

        listItems.forEach((item, i) => {
          const angleDeg = (360 / numFeatures) * i;
          const angleRad = angleDeg * (Math.PI / 180);

          const itemWidth = item.offsetWidth;
          const itemHeight = item.offsetHeight;

          const targetX = centerX + radius * Math.cos(angleRad) - (itemWidth / 2);
          const targetY = centerY + radius * Math.sin(angleRad) - (itemHeight / 2);

          let textAlignClass = 'text-center';
          if (angleDeg > 90 && angleDeg < 270) textAlignClass = 'text-right';
          else if (angleDeg <= 90 || angleDeg >= 270) textAlignClass = 'text-left';

          item.querySelector('div').classList.add(textAlignClass);

          gsap.fromTo(item,
            {
              opacity: 0,
              x: centerX - (itemWidth / 2),
              y: centerY - (itemHeight / 2),
              scale: 0.5,
            },
            {
              opacity: 1,
              x: targetX,
              y: targetY,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              delay: 0.2 + i * 0.1,
            }
          );

          const line = document.createElement('div');
          line.className = 'absolute bg-purple-500 h-[2px] rounded connecting-line';
          featureContainerRef.current.appendChild(line);
          lineRefs.current.push(line);

          const deltaX = (targetX + itemWidth / 2) - centerX;
          const deltaY = (targetY + itemHeight / 2) - centerY;
          const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

          gsap.set(line, { transformOrigin: "left center", x: centerX, y: centerY, rotation: angle, width: length });
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out", delay: 0.3 + i * 0.1 });
        });
      }
    } else if (!showFeatures && activeCategory === null) {
      lineRefs.current.forEach(line => line.remove());
      lineRefs.current = [];
    }
  }, [showFeatures, activeCategory]);

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-black text-white overflow-visible relative" >
      <div className="max-w-4xl mx-auto text-center relative z-30">
        <h3 ref={titleRef} className="text-3xl font-semibold mb-12">
          What Businesses Can You Launch?
        </h3>

        <div
          ref={circlesContainerRef}
          className="flex justify-center items-center space-x-8 mb-20 relative z-30"
        >
          {['trust', 'tier1', 'merchant'].map(cat => (
            <div
              key={cat}
              className={`category-circle w-40 h-40 rounded-full flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all duration-300 ease-in-out
                ${activeCategory === cat ? 'bg-purple-700 scale-110 shadow-lg' : 'bg-gray-800 hover:bg-gray-700'}`}
              onClick={() => handleCategoryClick(cat)}
              data-category={cat}
              role="button"
              tabIndex={0}
              onKeyPress={e => { if (e.key === 'Enter') handleCategoryClick(cat); }}
              aria-pressed={activeCategory === cat}
            >
              <span className="text-xl font-bold capitalize">
                {cat === 'trust' && 'Trust Formation'}
                {cat === 'tier1' && 'Tier 1 Credit Setup'}
                {cat === 'merchant' && 'Private Merchant Setup'}
              </span>
            </div>
          ))}
        </div>

        <div
          ref={featureContainerRef}
          className="relative w-full min-h-[400px]"
          aria-live="polite"
          aria-atomic="true"
          aria-label="Features spider web"
        >
          {showFeatures && activeCategory && (
            <ul className="absolute top-0 left-0 w-full h-full list-none p-0 m-0">
              {getFeatures(activeCategory).map((feature, idx) => (
                <li
                  key={idx}
                  className="absolute w-40 flex items-center bg-gray-800 p-3 rounded-lg shadow-md max-w-xs"
                  style={{ pointerEvents: 'auto' }}
                >
                  <span className="text-green-400 mr-2 text-xl select-none">◆</span>
                  <div className="flex-grow text-left">{feature}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default MasterclassBusinesses;
