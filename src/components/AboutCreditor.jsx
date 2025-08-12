import React from "react";
import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";

const AboutSection = () => {
  return (
    <section className="relative overflow-hidden flex items-center justify-between py-20 px-[5%] bg-white font-[Poppins] flex-wrap md:flex-nowrap">
      {/* Optimized Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Fewer and lighter animations */}
        <motion.div
          className="absolute top-[20%] right-[25%] w-48 h-48 backdrop-blur-sm"
          style={{
            background: "rgba(79, 179, 232, 0.2)",
            border: "1px solid rgba(79, 179, 232, 0.3)",
            borderRadius: "40%",
            boxShadow: "0 0 20px rgba(79, 179, 232, 0.25)",
          }}
          animate={{ y: [0, 30, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[5%] right-[8%] w-32 h-32"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            background: "linear-gradient(135deg, rgba(31, 120, 193, 0.2), rgba(31, 120, 193, 0.1))",
            border: "1px solid rgba(31, 120, 193, 0.25)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-[8%] left-[8%] w-32 h-32"
          style={{
            clipPath: "polygon(50% 100%, 0 0, 100% 0)",
            background: "linear-gradient(45deg, rgba(21, 67, 96, 0.2), rgba(21, 67, 96, 0.1))",
            border: "1px solid rgba(21, 67, 96, 0.25)",
          }}
          animate={{ rotate: [0, -360] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Left: Video */}
      <motion.div
        className="w-full md:w-[45%] mb-8 md:mb-0 z-10"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
          <iframe
            width="100%"
            height="400"
            src="https://drive.google.com/file/d/1jUjnrebq_Z6jy64RWnIZqAHjD6JEfW9Y/preview"
            allow="autoplay"
            title="Creditor Academy Video"
            className="rounded-2xl"
          />
        </div>
      </motion.div>

      {/* Right: Text */}
      <motion.div
        className="w-full md:w-[50%] text-left text-black z-10"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative">
          <motion.h2
            className="text-5xl font-bold mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1f618d] to-[#154360]">
              <AnimatedTitle
                title="ABO<b>U</b>T CREDIT<b>O</b>R <b>A</b>CADEM<b>Y</b>"
                containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
              />
              {/* About Creditor Academy */}
            </span>
            {/* <motion.span
              className="block w-28 h-1.5 bg-gradient-to-r from-[#1f618d] to-[#154360] mt-2 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            /> */}
          </motion.h2>

          <motion.div
            className="bg-white/85 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg leading-relaxed text-gray-700">
              At{" "}
              <span className="font-semibold text-[#1f618d]">
                Creditor Academy
              </span>
              , we equip individuals and entrepreneurs with the knowledge to
              unlock the full power of the "Private" operating outside the
              public system.
            </p>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#1f618d] to-transparent" />

            <p className="text-lg leading-relaxed text-gray-700">
              Our educational platform &amp; instructors empower you to
              structure your life and business for maximum privacy, asset
              protection, and true independence. This is where knowledge becomes
              sovereignty, because real freedom begins in the Private.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
