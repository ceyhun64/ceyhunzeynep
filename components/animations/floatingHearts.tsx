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
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const generatedHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      left: `${Math.random() * 100}%`,
      size: 20 + Math.random() * 30,
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
            bottom: "-50px",
          }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: -1200,
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 180, 360],
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            className="text-pink-400/40"
            fill="currentColor"
            size={heart.size}
          />
        </motion.div>
      ))}
    </div>
  );
};