// BannerPage.jsx
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import AnimatedTitle from "./AnimatedTitle";

// Tilt wrapper
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

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    );
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle("")}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// Single card
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

  // Detect if src is video
  const isVideo = src?.toLowerCase().endsWith(".mp4");

  return (
    <div className="relative size-full">
      {/* Video or Image Background */}
      <div className="absolute left-0 top-0 size-full">
        {isVideo ? (
          <video
            src={src}
            loop
            muted
            autoPlay
            playsInline
            className="size-full object-cover"
          />
        ) : (
          <img src={src} alt={title} className="size-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
        <div>
          <h1 className="text-3xl font-bold special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-sm md:text-lg">{description}</p>
          )}
        </div>

        {/* Button */}
        <div
          ref={hoverButtonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHoverOpacity(1)}
          onMouseLeave={() => setHoverOpacity(0)}
          onClick={() => learnMoreLink && navigate(learnMoreLink)}
          className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/80 hover:text-white"
        >
          <div
            className="pointer-events-none absolute -inset-px transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, transparent)`,
            }}
          />
          <TiLocationArrow className="relative z-20" />
          <p className="relative z-20">Learn More</p>
        </div>
      </div>
    </div>
  );
};

// Main banner page
export default function BannerPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-5">
      <BentoTilt className="border border-gray-700 h-[80vh] w-full max-w-6xl overflow-hidden rounded-md shadow-lg">
        <BentoCard
          src="/videos/feature-1.mp4" // Or "/images/banner.jpg"
          title={
            <AnimatedTitle
                title="M<b>a</b>ste<b>r</b>cl<b>a</b>ss Membe<b>r</b>ship"
                containerClass="mt-5 !text-blue"
            />
          }
          description="Reclaim Your Legal Identity and Exit the Public System"
          learnMoreLink="/learn-more"
        />
      </BentoTilt>
    </div>
  );
}
