"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Fingerprint, Lock, Check } from "lucide-react";

export const InteractiveLoveCard = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Basılı tutma simülasyonu
  useEffect(() => {
    let interval: any;
    if (isHolding && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 1.5, 100));
      }, 30);
    } else if (progress >= 100 && !isUnlocked) {
      setShowSuccess(true);
      setTimeout(() => {
        setIsUnlocked(true);
      }, 800);
    } else if (!isHolding && progress > 0 && progress < 100) {
      // Smooth decay when released
      interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 3, 0));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isHolding, progress, isUnlocked]);

  return (
    <section className="relative min-h-screen flex items-center justify-center  p-6 overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#b33752] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#d4af37] rounded-full blur-[120px]"
        />
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full max-w-md z-10">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* --- LOCKED STATE --- */
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                filter: "blur(20px)",
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b2942]/20 via-[#b33752]/10 to-transparent rounded-[2.5rem] blur-3xl" />

              <div className="relative bg-gradient-to-br from-[#1a0f14] to-[#0d0608] border border-[#3d1f2a] rounded-[2.5rem] p-12 shadow-2xl backdrop-blur-sm">
                {/* Header with icon */}
                <div className="mb-10 relative">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#8b2942] via-[#b33752] to-[#c94460] flex items-center justify-center relative overflow-hidden"
                    animate={
                      showSuccess
                        ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
                        : {}
                    }
                    transition={{ duration: 0.6 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <AnimatePresence mode="wait">
                      {showSuccess ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                        >
                          <Check
                            className="w-9 h-9 text-white"
                            strokeWidth={3}
                          />
                        </motion.div>
                      ) : isHolding ? (
                        <motion.div
                          key="fingerprint"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        >
                          <Fingerprint className="w-9 h-9 text-white animate-pulse" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="lock"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        >
                          <Lock
                            className="w-9 h-9 text-white/90"
                            strokeWidth={2}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Circular progress */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="38"
                        fill="none"
                        stroke="rgba(212, 175, 55, 0.08)"
                        strokeWidth="3"
                      />
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="38"
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth="3"
                        strokeDasharray="238.76"
                        strokeDashoffset={238.76 - (238.76 * progress) / 100}
                        strokeLinecap="round"
                        style={{
                          filter:
                            "drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))",
                        }}
                      />
                      <defs>
                        <linearGradient
                          id="progressGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#d4af37" />
                          <stop offset="100%" stopColor="#f0c75e" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>

                  {/* Floating particles during hold */}
                  {isHolding && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-1/2 top-1/2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0.8],
                            x: Math.cos((i * Math.PI * 2) / 8) * 80,
                            y: Math.sin((i * Math.PI * 2) / 8) * 80,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <Heart
                            size={8}
                            className="text-[#d4af37]"
                            fill="currentColor"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-6 mb-10">
                  <motion.div
                    animate={showSuccess ? { y: -5 } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight text-center">
                      {showSuccess ? "Doğrulandı" : "Kilitli İçerik"}
                    </h2>
                    <p className="text-gray-400 text-sm text-center leading-relaxed">
                      {showSuccess
                        ? "Sevgin kabul edildi, mektubun hazırlanıyor..."
                        : "Bu özel içerik sadece senin için. Erişmek için butona basılı tut."}
                    </p>
                  </motion.div>

                  {/* Progress indicator */}
                  <div className="relative h-1.5 bg-[#1a0f14] rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#b33752] via-[#d4af37] to-[#f0c75e] rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center gap-8">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        İlerleme
                      </p>
                      <p className="text-2xl font-bold text-white tabular-nums">
                        {Math.round(progress)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <motion.button
                  onMouseDown={() => setIsHolding(true)}
                  onMouseUp={() => setIsHolding(false)}
                  onMouseLeave={() => setIsHolding(false)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    setIsHolding(true);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setIsHolding(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={showSuccess}
                  className="relative w-full py-5 rounded-2xl bg-gradient-to-r from-[#8b2942] via-[#b33752] to-[#c94460] text-white font-semibold text-sm tracking-wide transition-all select-none overflow-hidden shadow-lg shadow-[#8b2942]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {showSuccess ? (
                      <>
                        <Check className="w-5 h-5" strokeWidth={2.5} />
                        Onaylandı
                      </>
                    ) : isHolding ? (
                      <>
                        <Fingerprint className="w-5 h-5 animate-pulse" />
                        Taranıyor...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        Basılı Tut
                      </>
                    )}
                  </span>

                  {/* Animated background */}
                  {isHolding && !showSuccess && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* --- UNLOCKED STATE (LETTER) --- */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Ambient glow */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/30 via-[#b33752]/20 to-[#d4af37]/30 rounded-[3rem] blur-3xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative bg-gradient-to-br from-[#fefdfb] to-[#f8f5f0] rounded-[2.5rem] shadow-2xl overflow-hidden">
                {/* Decorative header */}
                <div className="relative h-32 bg-gradient-to-br from-[#8b2942] via-[#b33752] to-[#c94460] overflow-hidden">
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Decorative hearts */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <Heart size={60} fill="white" />
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-10">
                    <Heart size={40} fill="white" />
                  </div>

                  {/* Gold accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </div>

                {/* Letter content */}
                <div className="p-10 md:p-14">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    {/* Header info */}
                    <div className="flex justify-between items-start mb-12">
                      <div className="w-14 h-14 bg-[#b33752]/8 rounded-2xl flex items-center justify-center">
                        <Heart
                          className="text-[#b33752] w-7 h-7"
                          fill="#b33752"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1">
                          Tarih
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          14 Şubat 2026
                        </p>
                      </div>
                    </div>

                    {/* Salutation */}
                    <h3 className="text-4xl font-serif italic text-gray-900 mb-8 tracking-tight">
                      Sevgilim Zeynep,
                    </h3>

                    {/* Body */}
                    <div className="space-y-6 mb-10">
                      <p className="text-gray-700 leading-[1.8] font-serif italic text-lg mb-8">
                        Seni sevmek, bir sabah uyanıp dünyanın en güzel
                        manzarasına bakmak gibi. Parmak izin kalbimde, gülüşün
                        ruhumda... <br />
                        <br />
                        Bugün, yarın ve her zaman, iyi ki benimlesin.
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" />

                    {/* Signature */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-2">
                          Sonsuz sevgiyle
                        </p>
                        <p className="text-3xl font-serif italic text-gray-900 tracking-tight">
                          Ceyhun
                        </p>
                      </div>
                      <motion.div
                        animate={{
                          rotate: [0, 12, -12, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Sparkles className="text-[#d4af37] w-8 h-8" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Decorative footer */}
                <div className="h-4 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/40 to-[#d4af37]/20" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};
