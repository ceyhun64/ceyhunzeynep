"use client";

import { HeroSection } from "./heroSection";
import { InteractiveLoveCard } from "./interactiveLoveCard";
import { PhotoGallery } from "./photoGallery";
import { InteractiveLoveButton } from "./interactiveLoveButton";
import { Footer } from "./footer";
import { FloatingHearts } from "@/components/animations/floatingHearts";
import { ParticleEffect } from "@/components/animations/particleEffect";
import { GlowingOrbs } from "@/components/animations/glowingOrbs";
import GorillaChaseGame from "./gorillaChaseGame";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0005] overflow-hidden">
      {/* Background animations */}
      <FloatingHearts />
      <ParticleEffect />
      <GlowingOrbs />

      {/* Main content */}
      <HeroSection />
      <PhotoGallery />

      {/* Yeni Oyun Bölümü */}
      <GorillaChaseGame />

      <InteractiveLoveCard />
      <InteractiveLoveButton />
      <Footer />
    </main>
  );
}
