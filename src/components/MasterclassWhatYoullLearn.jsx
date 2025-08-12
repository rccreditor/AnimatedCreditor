import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import trustFormationImg from '../assets/trustformation.webp';
import creditOptimizationImg from '../assets/creditoptimization.webp';
import privateMerchantProcessingImg from '../assets/privatemerchnatprocessing.webp';

gsap.registerPlugin(ScrollTrigger);

const MasterclassWhatYoullLearn = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const phase1Ref = useRef(null);
  const phase2Ref = useRef(null);
  const phase3Ref = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=100",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 50, color: "#ffffff" }, 
      { opacity: 1, y: 0, color: "#a78bfa", duration: 1.5, ease: "power3.out" }
    );

    // Phase 1 Animations
    const phase1Tl = gsap.timeline({
      scrollTrigger: {
        trigger: phase1Ref.current,
        start: "top center+=100",
        toggleActions: "play none none none",
      },
    });
    phase1Tl.fromTo(phase1Ref.current, 
      { opacity: 0, x: -200 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
    phase1Tl.fromTo(phase1Ref.current.children, 
      { opacity: 0, y: 50, scale: 0.8 }, 
      { 
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)", stagger: 0.15 
      }, "<0.3"
    );

    // Phase 2 Animations
    const phase2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: phase2Ref.current,
        start: "top center+=100",
        toggleActions: "play none none none",
      },
    });
    phase2Tl.fromTo(phase2Ref.current, 
      { opacity: 0, x: 200 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
    phase2Tl.fromTo(phase2Ref.current.children, 
      { opacity: 0, y: 50, scale: 0.8 }, 
      { 
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)", stagger: 0.15 
      }, "<0.3"
    );

    // Phase 3 Animations
    const phase3Tl = gsap.timeline({
      scrollTrigger: {
        trigger: phase3Ref.current,
        start: "top center+=100",
        toggleActions: "play none none none",
      },
    });
    phase3Tl.fromTo(phase3Ref.current, 
      { opacity: 0, x: -200 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
    phase3Tl.fromTo(phase3Ref.current.children, 
      { opacity: 0, y: 50, scale: 0.8 }, 
      { 
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.7)", stagger: 0.15 
      }, "<0.3"
    );

    // Floating animations for images
    gsap.to(image1Ref.current, { y: -10, repeat: -1, yoyo: true, duration: 2, ease: "power1.inOut" });
    gsap.to(image2Ref.current, { y: -10, repeat: -1, yoyo: true, duration: 2, ease: "power1.inOut", delay: 0.5 });
    gsap.to(image3Ref.current, { y: -10, repeat: -1, yoyo: true, duration: 2, ease: "power1.inOut", delay: 1 });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 px-6 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Animated background elements */}
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <circle cx="10" cy="10" r="5" fill="#8b5cf6" />
          <circle cx="90" cy="30" r="8" fill="#c084fc" />
          <rect x="20" y="80" width="10" height="10" fill="#a78bfa" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#6d28d9" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h3 ref={titleRef} className="text-3xl font-semibold mb-8 text-center">What You'll Learn (Step-by-Step)</h3>

        <div ref={phase1Ref} className="mb-12 p-6 border border-purple-700 rounded-lg bg-gray-900 md:w-11/12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h4 className="text-2xl font-bold mb-4 text-purple-400">◆ Phase 1: Trust Formation</h4>
            <p className="text-lg leading-relaxed mb-4">Set the foundation for private wealth.</p>
            <ul className="list-none space-y-2 text-lg">
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Form your own UBOT Business Trust (template included)</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Lawfully exit public business registration systems</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Protect your assets & avoid tax and liability traps</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Understand private contracts & lawful operations</li>
            </ul>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6 flex justify-center items-center">
            <img ref={image1Ref} src={trustFormationImg} alt="Trust Formation" className="w-full h-auto max-w-xs rounded-lg shadow-lg" loading="lazy" />
          </div>
        </div>

        <div ref={phase2Ref} className="mb-12 p-6 border border-purple-700 rounded-lg bg-gray-900 md:ml-auto md:w-11/12 flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="md:w-1/2">
            <h4 className="text-2xl font-bold mb-4 text-purple-400">◆ Phase 2: Tier 1 Business Credit Optimization</h4>
            <p className="text-lg leading-relaxed mb-4">Build your fundable business profile—without using your SSN.</p>
            <ul className="list-none space-y-2 text-lg">
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Set up your business for credit (DUNS, business address, phone, etc.)</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Apply for real Tier 1 vendor accounts & revolving credit lines</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Build credit fast using strategic layering</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Fix and structure public-facing profiles without PG</li>
            </ul>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:mr-6 flex justify-center items-center">
            <img ref={image2Ref} src={creditOptimizationImg} alt="Tier 1 Business Credit Optimization" className="w-full h-auto max-w-xs rounded-lg shadow-lg" loading="lazy" />
          </div>
        </div>

        <div ref={phase3Ref} className="p-6 border border-purple-700 rounded-lg bg-gray-900 md:w-11/12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h4 className="text-2xl font-bold mb-4 text-purple-400">◆ Phase 3: Private Merchant Processing</h4>
            <p className="text-lg leading-relaxed mb-4">Accept payments without shutdown risks or banks.</p>
            <ul className="list-none space-y-2 text-lg">
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Set up private, non-KYC merchant accounts</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Sell online or in person using private payment gateways</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Build payment flows for info products, services, eCom, and more</li>
              <li className="flex items-start"><span className="text-green-400 mr-3 text-2xl">✔</span>Avoid censorship, chargebacks, and frozen funds</li>
            </ul>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6 flex justify-center items-center">
            <img ref={image3Ref} src={privateMerchantProcessingImg} alt="Private Merchant Processing" className="w-full h-auto max-w-xs rounded-lg shadow-lg" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterclassWhatYoullLearn;
