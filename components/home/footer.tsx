"use client";

import { motion } from "framer-motion";
import { Heart, Music } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-24 px-4 overflow-hidden">
      {/* Arka Plan Efekti */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a0a0f]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 41, 66, 0.2) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-12"
        >
          {/* Logo / Kalp Animasyonu */}
          <motion.div className="flex justify-center">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  className="w-20 h-20 text-[#8b2942]"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              >
                <Heart
                  className="w-20 h-20 text-[#b33752]"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* İsimler */}
          <div>
            <h3 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-br from-[#f0e6e0] via-[#d4af37] to-[#b76e79] bg-clip-text text-transparent">
                Ceyhun & Zeynep
              </span>
            </h3>
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[#8b2942] to-transparent my-6" />
            <p className="text-[#a68b82] text-lg tracking-wide italic">
              Sonsuza kadar bir arada
            </p>
          </div>

          {/* Spotify Butonu */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.a
              href="https://open.spotify.com/playlist/4mKSoA4ALrhgkyrbWe0deC?si=1e65f9a2fcd9485c"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#b33752] to-[#8b2942] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-300 group"
              aria-label="Bizim Şarkımız"
            >
              <Music
                className="w-8 h-8 text-[#f0e6e0] group-hover:text-[#d4af37] transition-colors duration-300"
                strokeWidth={1.5}
              />
              {/* Butonun etrafındaki hafif parlama */}
              <div className="absolute inset-0 rounded-2xl bg-[#d4af37]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </motion.div>

          <motion.div
            className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-[#8b2942] to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          {/* Copyright ve Mesaj */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-[#a68b82]">
              <span>Made with</span>
              <Heart
                className="w-4 h-4 text-[#8b2942]"
                fill="currentColor"
                strokeWidth={0}
              />
              <span>for Zeynep</span>
            </div>
            <p className="text-sm text-[#6b2538]">
              © {currentYear} Ceyhun. Tüm hakları saklıdır.
            </p>
          </div>

          {/* Özel Alt Mesaj */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="pt-8"
          >
            <div className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#2a1520] to-[#1a0a0f] border border-[#4a2838] shadow-inner">
              <p className="text-xl text-[#d4af37] font-light tracking-wide italic">
                "Her gün seni daha çok seviyorum..."
              </p>
              
            </div>
          </motion.div>
        </motion.div>

        {/* Dekoratif Yüzen Kalpler */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="text-[#8b2942]"
                fill="currentColor"
                strokeWidth={0}
                size={16 + Math.random() * 16}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </footer>
  );
};
