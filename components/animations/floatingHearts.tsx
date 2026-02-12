"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface HeartProps {
  id: number;
  delay: number;
  duration: number;
  left: string;
  size: number;
  opacity: number;
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const generatedHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 8,
      left: `${Math.random() * 100}%`,
      size: 16 + Math.random() * 24,
      opacity: 0.15 + Math.random() * 0.25,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            bottom: "-60px",
          }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: -1400,
            opacity: [0, heart.opacity, heart.opacity, 0],
            rotate: [0, 180, 360],
            x: [0, 40, -40, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            className="text-[#8b2942]"
            fill="currentColor"
            strokeWidth={0}
            size={heart.size}
          />
        </motion.div>
      ))}
    </div>
  );
};
