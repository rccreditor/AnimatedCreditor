import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      }).to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "animated-title font-poppins font-normal text-center w-full leading-tight",
        containerClass
      )}
      style={{
        color: "#89CFF0",
        overflow: "visible", // prevent clipping
      }}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex flex-wrap justify-center gap-2 md:gap-3 px-2 sm:px-6"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word opacity-0 inline-block" // inline-block so transform doesn't clip
              style={{ willChange: "transform, opacity" }}
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
