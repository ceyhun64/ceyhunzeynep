"use client";

import { motion } from "framer-motion";
import { Camera, Heart, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const photos = [
  {
    id: 1,
    gradient: "from-[#8b2942] via-[#6b2538] to-[#4a2838]",
    title: "İlk Anımız",
    location: "Başlangıç",
    image: "/gallery/1.jpeg",
  },
  {
    id: 2,
    gradient: "from-[#b33752] via-[#8b2942] to-[#6b2538]",
    title: "Birlikte",
    location: "Özel Günler",
    image: "/gallery/2.jpeg",
  },
  {
    id: 3,
    gradient: "from-[#9e3349] via-[#7d2a3e] to-[#5c2133]",
    title: "Mutluluk",
    location: "Her An",
    image: "/gallery/3.jpeg",
  },
  {
    id: 4,
    gradient: "from-[#c94a5c] via-[#b33752] to-[#8b2942]",
    title: "Maceralar",
    location: "Hatıralar",
    image: "/gallery/4.jpeg",
  },
  {
    id: 5,
    gradient: "from-[#8b2942] via-[#9e3349] to-[#b33752]",
    title: "Keşifler",
    location: "Deneyimler",
    image: "/gallery/5.jpeg",
  },
  {
    id: 6,
    gradient: "from-[#6b2538] via-[#8b2942] to-[#9e3349]",
    title: "Gelecek",
    location: "Birlikte",
    image: "/gallery/6.jpeg",
  },
 
  {
    id: 8,
    gradient: "from-[#8b2942] via-[#b33752] to-[#9e3349]",
    title: "Kahkahalar",
    location: "Mutlu Anlar",
    image: "/gallery/8.jpeg",
  },
  {
    id: 9,
    gradient: "from-[#7d2a3e] via-[#9e3349] to-[#b33752]",
    title: "Romantizm",
    location: "Aşk",
    image: "/gallery/9.jpeg",
  },
  {
    id: 10,
    gradient: "from-[#b33752] via-[#a13a4f] to-[#8b2942]",
    title: "Yolculuklar",
    location: "Keşfetmek",
    image: "/gallery/10.jpeg",
  },
  {
    id: 11,
    gradient: "from-[#9e3349] via-[#8b2942] to-[#7d2a3e]",
    title: "Anlar",
    location: "Birliktelik",
    image: "/gallery/11.jpeg",
  },
  {
    id: 12,
    gradient: "from-[#8b2942] via-[#6b2538] to-[#5c2133]",
    title: "Sevgi",
    location: "Sonsuz",
    image: "/gallery/12.jpeg",
  },
  {
    id: 13,
    gradient: "from-[#c94a5c] via-[#b33752] to-[#9e3349]",
    title: "Hayaller",
    location: "Gelecek",
    image: "/gallery/13.jpeg",
  },
  {
    id: 14,
    gradient: "from-[#6b2538] via-[#8b2942] to-[#b33752]",
    title: "Sonsuzluk",
    location: "Seninle",
    image: "/gallery/14.jpeg",
  },
];

export const PhotoGallery = () => {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>(
    {},
  );

  const handleImageError = (photoId: number) => {
    setImageErrors((prev) => ({ ...prev, [photoId]: true }));
  };

  return (
    <section className="relative py-32 px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#8b2942] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#b33752] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Camera className="w-10 h-10 text-[#d4af37]" strokeWidth={1.5} />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-br from-[#f0e6e0] via-[#d4af37] to-[#b76e79] bg-clip-text text-transparent">
              Anılarımız
            </span>
          </h2>

        
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              onHoverStart={() => setHoveredPhoto(photo.id)}
              onHoverEnd={() => setHoveredPhoto(null)}
              className="group relative cursor-pointer"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[#4a2838] group-hover:border-[#8b2942] transition-colors duration-500">
                {/* Actual Image */}
                {!imageErrors[photo.id] ? (
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                    onError={() => handleImageError(photo.id)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  // Fallback gradient when image fails to load
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={
                          hoveredPhoto === photo.id
                            ? { scale: 1.2, rotate: 10 }
                            : { scale: 1, rotate: 0 }
                        }
                        transition={{ duration: 0.4 }}
                      >
                        <ImageIcon
                          className="w-20 h-20 text-white/20"
                          strokeWidth={1}
                        />
                      </motion.div>
                    </div>

                    {/* Overlay pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
                        backgroundSize: "30px 30px",
                      }}
                    />
                  </div>
                )}

                {/* Info overlay */}
              

                {/* Number badge */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center z-20">
                  <span className="text-white/80 font-bold text-sm">
                    #{photo.id}
                  </span>
                </div>

                {/* Hover heart animation */}
                {hoveredPhoto === photo.id && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 bottom-1/2 z-30"
                        initial={{ y: 0, x: "-50%", opacity: 1 }}
                        animate={{
                          y: -80,
                          x: `calc(-50% + ${(i - 1) * 30}px)`,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.15,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      >
                        <Heart
                          className="w-4 h-4 text-[#d4af37]"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br ${photo.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                initial={false}
              />
            </motion.div>
          ))}
        </div>

        {/* Info text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-block px-6 py-3 rounded-full bg-[#2a1520] border border-[#4a2838]">
            <p className="text-[#a68b82] text-sm tracking-wide">
              {photos.length} özel anımız
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
