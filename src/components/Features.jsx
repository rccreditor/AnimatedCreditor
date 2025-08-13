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
            <div className="mt-4 bg-black/70 p-4 rounded-lg backdrop-blur-sm">
              <div className="space-y-4">
                {/* WHAT YOU'LL LEARN */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`bg-${currentContent.color}-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {currentContent.learnTitle}
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {currentContent.learnItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <item.icon className={`text-${currentContent.color}-400 mt-0.5 flex-shrink-0`} />
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
                    <div className={`bg-${currentContent.color}-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {currentContent.doTitle}
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {currentContent.doItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <item.icon className={`text-${currentContent.color}-400 mt-0.5 flex-shrink-0`} />
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
          <div className="bg-black/80 text-white px-4 py-2 rounded-full text-xs font-medium w-fit">
            Coming Soon
          </div>
        ) : (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/80 px-4 py-2 text-xs uppercase text-white hover:bg-black"
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
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32 text-center flex flex-col items-center">
        <AnimatedTitle
          title="The Roadmap Series"
          containerClass="mt-5 !text-blue"
        />
        <p className="font-circular-web text-lg text-blue-50 mt-6">
          This self-paced, results-focused training series is designed for entrepreneurs, freedom seekers, and anyone ready to take back control of their legal and financial future.
        </p>
        <p className="max-w-2xl font-circular-web text-lg text-blue-50 opacity-60 mt-5">
          The Roadmap Series is your step-by-step blueprint to exit the public system, reclaim your legal identity, and unlock powerful credit and business tools — all while building wealth through private trust structures and lawful commerce.
        </p>
      </div>

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
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
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