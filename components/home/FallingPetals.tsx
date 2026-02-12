"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  delay: string;
  duration: string;
  emoji: string;
  size: string;
}

export default function FallingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const emojis = ["🌹", "❤️", "🌸", "💖", "🌺", "💕", "🥀"];
    const generated: Petal[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${8 + Math.random() * 10}s`,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: `${0.8 + Math.random() * 1}rem`,
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="hero-bg-petals">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
