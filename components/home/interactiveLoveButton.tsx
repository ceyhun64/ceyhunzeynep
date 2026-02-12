"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useState } from "react";

export const InteractiveLoveButton = () => {
  const [clicks, setClicks] = useState(0);
  const [kisses, setKisses] = useState<
    { id: number; x: number; y: number; rotation: number; scale: number }[]
  >([]);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    // Sayfanın herhangi bir yerine rastgele öpücük at
    const newKiss = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // 10% - 90% arası (kenarlardan uzak)
      y: Math.random() * 80 + 10,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.4 + 0.8, // 0.8 - 1.2 arası
    };

    setKisses((prev) => [...prev, newKiss]);

    // 10 saniye sonra öpücüğü kaldır
    setTimeout(() => {
      setKisses((prev) => prev.filter((k) => k.id !== newKiss.id));
    }, 10000);
  };

  return (
    <section className="relative py-32 px-4 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8" />

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-br from-[#f0e6e0] via-[#d4af37] to-[#b76e79] bg-clip-text text-transparent">
              Öpücük Gönder
            </span>
          </h2>

          <p className="text-xl text-[#a68b82] mb-16 tracking-wide">
            Her tıklama, bir öpücük gönderir 💋(çok tıklama kasıyo)
          </p>

          <div className="relative inline-block">
            <motion.button
              onClick={handleClick}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-48 h-48 rounded-full bg-gradient-to-br from-[#8b2942] via-[#6b2538] to-[#4a2838] flex items-center justify-center shadow-2xl relative overflow-hidden border-2 border-[#d4af37]/20"
                animate={{
                  boxShadow: [
                    "0 0 40px rgba(139, 41, 66, 0.4)",
                    "0 0 80px rgba(139, 41, 66, 0.6)",
                    "0 0 40px rgba(139, 41, 66, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#d4af37]/30"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#d4af37]/30"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />

                {/* Background pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.2) 1px, transparent 0)`,
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Öpücük emoji veya ikon */}
                <div className="text-8xl relative z-10">💋</div>
              </motion.div>
            </motion.button>
          </div>

          {/* Click counter */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-block bg-gradient-to-br from-[#2a1520] to-[#1a0a0f] rounded-2xl p-8 border border-[#4a2838]">
              <p className="text-[#a68b82] text-lg mb-3 tracking-wide">
                Gönderilen öpücükler:
              </p>
              <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#8b2942] to-transparent mb-4" />
              <motion.p
                key={clicks}
                initial={{ scale: 1.3, color: "#d4af37" }}
                animate={{ scale: 1, color: "#f0e6e0" }}
                className="text-7xl font-bold font-mono"
              >
                {clicks}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Sayfaya atılan öpücükler */}
      <AnimatePresence>
        {kisses.map((kiss) => (
          <motion.div
            key={kiss.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: `${kiss.x}%`,
              top: `${kiss.y}%`,
            }}
            initial={{
              scale: 0,
              rotate: 0,
              opacity: 0,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: kiss.scale,
              rotate: kiss.rotation,
              opacity: [0, 1, 1, 0.8],
            }}
            exit={{
              scale: 0,
              opacity: 0,
              transition: { duration: 0.5 },
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {/* Öpücük izi (dudak izi) */}
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="text-6xl">💋</div>
              </motion.div>

              {/* Ana öpücük */}
              <div className="text-6xl relative z-10 drop-shadow-lg">💋</div>

              {/* Kalp parçacıkları */}
              <motion.div
                className="absolute top-1/2 left-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    animate={{
                      x: Math.cos((i * 120 * Math.PI) / 180) * 40,
                      y: Math.sin((i * 120 * Math.PI) / 180) * 40,
                    }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  >
                    <Heart
                      className="w-4 h-4 text-[#d4af37]"
                      fill="currentColor"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};
