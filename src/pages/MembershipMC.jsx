import gsap from "gsap";
import { useRef } from "react";

import Button from "../components/Button";
import AnimatedTitle from "../components/AnimatedTitle";
import MasterclassIntro from "../components/MasterclassIntro";
import MasterclassWhyDifferent from "../components/MasterclassWhyDifferent";
import MasterclassWhatYoullLearn from "../components/MasterclassWhatYoullLearn";
import MasterclassBusinesses from "../components/MasterclassBusinesses";
import MasterclassWhatsIncluded from "../components/MasterclassWhatsIncluded";
import MasterclassProgramDetails from "../components/MasterclassProgramDetails";

const MembershipMC = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="membership-mc" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Master Your Craft
        </p>

        <div className="relative size-full text-center">
          <AnimatedTitle
            title="The Ultimate 90-Day Masterclass"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container mt-10">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/public/img/entrance.webp"
                  alt="masterclass.webp"
                  className="object-contain"
                />
              </div>
            </div>

            {/* for the rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="mt-10 flex w-full justify-center">
          <div className="flex h-full w-fit flex-col items-center">
            <p className="max-w-lg text-center font-circular-web text-violet-50">
              Unlock your full potential with advanced techniques and strategies.
              Master digital creation and join an exclusive community of innovators.
            </p>

            <Button
              id="masterclass-btn"
              title="Enroll Now"
              containerClass="mt-8"
            />
          </div>
        </div>
      </div>
      <MasterclassIntro />
      <MasterclassWhyDifferent />
      <MasterclassWhatYoullLearn />
      <MasterclassBusinesses />
      <MasterclassWhatsIncluded />
      <MasterclassProgramDetails />
    </div>
  );
};

export default MembershipMC;