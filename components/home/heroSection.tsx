"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  // Client-side mount check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optimized mouse tracking with throttling
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 15,
          y: (e.clientY / window.innerHeight - 0.5) * 15,
        });
        rafId = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Memoize particles to prevent recreation
  const particles = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 110 + Math.random() * 20,
        scale: Math.random() * 0.4 + 0.6,
        rotation: Math.random() * 360,
        duration: Math.random() * 8 + 20,
        delay: Math.random() * 10,
        size: Math.random() * 16 + 12,
        direction: i % 2 === 0 ? 1 : -1,
      })),
    [],
  );

  return (
    <motion.section
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-gradient-to-b from-[#0a0505] via-[#0d0808] to-[#0a0505]"
    >
      {/* Ambient Background Layers */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            x: mousePos.x * 0.5,
            y: mousePos.y * 0.5,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 25 }}
        >
          {/* Primary glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b33752]/15 blur-[140px] rounded-full" />

          {/* Accent glows */}
          <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-[#d4af37]/8 blur-[120px] rounded-full" />
          <div className="absolute bottom-[15%] left-[10%] w-[350px] h-[350px] bg-[#b76e79]/10 blur-[100px] rounded-full" />
        </motion.div>

        {/* Subtle radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(179,55,82,0.08)_0%,transparent_60%)]" />
      </div>

      {/* Floating Heart Particles - Only render on client */}
      {isMounted &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-[#b33752]/15 pointer-events-none will-change-transform"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}vh`,
              scale: particle.scale,
              rotate: particle.rotation,
            }}
            animate={{
              y: "-15vh",
              rotate: particle.rotation + 360 * particle.direction,
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: particle.duration,
              },
            }}
          >
            <Heart fill="currentColor" size={particle.size} strokeWidth={0} />
          </motion.div>
        ))}

      {/* Film Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl z-10 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center space-y-16"
        >
          {/* Centered Heart Icon */}
          <motion.div
            className="relative inline-block"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15,
              delay: 0.2,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
              className="relative z-10"
            >
              <Heart
                className="w-20 h-20 md:w-24 md:h-24 text-[#b33752] drop-shadow-[0_0_20px_rgba(179,55,82,0.4)]"
                fill="currentColor"
                strokeWidth={0}
              />
            </motion.div>

            {/* Pulsing glow ring */}
            <motion.div
              className="absolute inset-0 bg-[#b33752] blur-2xl opacity-0 scale-150"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1.5, 2, 1.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Names */}
          <div className="space-y-6">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 1.2,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[1.1] pb-2"
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              <span className="inline-block bg-gradient-to-br from-white via-[#f5f0eb] to-[#d4af37] bg-clip-text text-transparent">
                Ceyhun
              </span>

              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mx-3 md:mx-6 text-[#b33752]"
              >
                &
              </motion.span>

              <span className="inline-block bg-gradient-to-br from-white via-[#f5f0eb] to-[#c9948f] bg-clip-text text-transparent">
                Zeynep
              </span>
            </motion.h1>

            {/* Decorative Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                delay: 1.2,
                duration: 1.4,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="h-[1px] w-48 md:w-64 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent"
            />
          </div>

          {/* Subtitle Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl mx-auto px-6 space-y-8"
          >
            {/* Tagline */}
            <p
              className="text-base md:text-lg text-[#d4af37]/90 tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
              }}
            >
              Sonsuz Bir Hikaye
            </p>

            {/* Quote */}
            <div className="space-y-4">
              <p
                className="text-lg md:text-2xl text-gray-300/90 leading-relaxed"
                style={{
                  fontFamily: "'Crimson Text', 'Georgia', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                "Evrendeki tüm yıldızlar bir araya gelse,
                <br className="hidden md:block" />
                senin tek bir gülüşün kadar aydınlatamaz kalbimi."
              </p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="text-sm md:text-base text-gray-500/70 italic"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Düğün davetiyesi gibi oldu ahahahhahaa
              </motion.p>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="pt-12 md:pt-16"
          >
            <motion.button
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
              className="group flex flex-col items-center gap-3 cursor-pointer mx-auto hover:opacity-100 transition-opacity"
              whileHover={{ y: 4 }}
            >
              <span
                className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#b33752]/50 group-hover:text-[#b33752]/80 transition-colors"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                }}
              >
                Hikayemize Kaydır
              </span>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-5 h-5 text-[#b33752]/60 group-hover:text-[#b33752] transition-colors" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0505] to-transparent pointer-events-none z-[2]" />
    </motion.section>
  );
};
