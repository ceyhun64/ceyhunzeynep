"use client";

import { motion } from "framer-motion";

export const GlowingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large primary orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 41, 66, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary orb */}
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(179, 55, 82, 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Accent orb 1 */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
          filter: "blur(45px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Accent orb 2 */}
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(107, 37, 56, 0.1) 0%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -60, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small accent orbs */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-[250px] h-[250px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(183, 110, 121, 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
