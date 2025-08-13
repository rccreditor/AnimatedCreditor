import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { TiLocationArrow } from 'react-icons/ti';
import { useNavigate } from "react-router-dom";

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
};
const PremiumCoursesSection = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const hoverEffect = {
    scale: 1.03,
    y: -10,
    transition: { duration: 0.3, ease: "easeOut" }
  };

  const tapEffect = {
    scale: 0.98
  };

  return (
    <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Holographic Particles Background */}
      <div className="absolute inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: "#89CFF0"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                }
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 3,
                random: true,
                anim: {
                  enable: true,
                  speed: 2,
                  size_min: 0.3,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#89CFF0",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: true,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "grab"
                },
                onclick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 140,
                  line_linked: {
                    opacity: 1
                  }
                },
                push: {
                  particles_nb: 4
                }
              }
            },
            retina_detect: true
          }}
        />
      </div>

      {/* Holographic title with enhanced glow and animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16 text-center"
      >
        <motion.h2
          className="text-5xl font-bold tracking-wide text-[#89CFF0] md:text-6xl"
          animate={{
            textShadow: [
              "0 0 10px rgba(137, 207, 240, 0.6)",
              "0 0 20px rgba(137, 207, 240, 0.8)",
              "0 0 30px rgba(137, 207, 240, 1)",
              "0 0 20px rgba(137, 207, 240, 0.8)",
              "0 0 10px rgba(137, 207, 240, 0.6)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Premium Courses
        </motion.h2>
        <motion.div
          className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-[#89CFF0] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>

      {/* Enhanced grid with animations */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid h-auto w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Card 1 */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          whileTap={tapEffect}
          className="relative overflow-hidden rounded-2xl border border-[#89CFF0]/30 bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('/img/grid-pattern.png')] opacity-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#89CFF0]/20 to-transparent"
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
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
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#89CFF0] via-[#4F46E5] to-[#89CFF0]"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          whileTap={tapEffect}
          className="relative overflow-hidden rounded-2xl border border-[#89CFF0]/30 bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('/img/grid-pattern.png')] opacity-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#89CFF0]/20 to-transparent"
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          />
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
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F46E5] via-[#89CFF0] to-[#4F46E5]"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.3
            }}
          />
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={itemVariants}
          whileHover={hoverEffect}
          whileTap={tapEffect}
          className="relative overflow-hidden rounded-2xl border border-[#89CFF0]/30 bg-gradient-to-br from-gray-900/80 to-gray-800/80 shadow-2xl md:col-span-2 lg:col-span-1"
        >
          <div className="absolute inset-0 bg-[url('/img/grid-pattern.png')] opacity-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#89CFF0]/20 to-transparent"
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.8
            }}
          />
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
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#89CFF0] via-[#4F46E5] to-[#89CFF0]"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.6
            }}
          />
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            rotate: 1,
            transition: { duration: 0.3 }
          }}
          whileTap={tapEffect}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 p-6 shadow-2xl backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-[url('/img/dot-pattern.png')] opacity-20" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <motion.h1 
              className="special-font text-3xl font-bold text-white"
              animate={{
                textShadow: [
                  "0 0 5px rgba(139, 92, 246, 0.5)",
                  "0 0 10px rgba(139, 92, 246, 0.7)",
                  "0 0 15px rgba(139, 92, 246, 0.9)",
                  "0 0 10px rgba(139, 92, 246, 0.7)",
                  "0 0 5px rgba(139, 92, 246, 0.5)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </motion.h1>
            <motion.div
              animate={{
                x: [0, 10, 0],
                rotate: [0, 15, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="self-end"
            >
              <TiLocationArrow className="m-5 scale-[3] text-violet-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Video Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(137, 207, 240, 0.5)"
          }}
          className="relative overflow-hidden rounded-2xl shadow-2xl"
        >
          <motion.video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="h-full w-full object-cover object-center"
            whileHover={{
              scale: 1.05
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 text-center text-white"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
          >
            <h3 className="text-xl font-bold">Exclusive Content</h3>
            <p className="text-sm">Coming soon to premium members</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles that follow mouse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#89CFF0]"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PremiumCoursesSection;