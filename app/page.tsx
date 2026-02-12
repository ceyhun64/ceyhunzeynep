"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScrollReveal } from "@/components/home/useScrollReveal";

const Cursor = dynamic(() => import("@/components/home/Cursor"), { ssr: false });
const FallingPetals = dynamic(() => import("@/components/home/FallingPetals"), {
  ssr: false,
});
const Fireworks = dynamic(() => import("@/components/home/Fireworks"), {
  ssr: false,
});

const reasons = [
  {
    icon: "✨",
    text: "Gözlerindeki o ışıltı — sanki bütün yıldızlar orada toplanmış.",
  },
  {
    icon: "🌙",
    text: "Güldüğünde odadaki her şey anlam kazanıyor. Sesi tüm dünyayı ısıtır.",
  },
  {
    icon: "🌹",
    text: "Yanımda hissettirdiğin güven ve sıcaklık — ev gibi.",
  },
  {
    icon: "💫",
    text: "Hayallerini anlattığında gözlerinin nasıl parlayacağını biliyorum.",
  },
  {
    icon: "🎵",
    text: "Birlikte sessiz kalabildiklerimiz de her konuşma kadar değerli.",
  },
  {
    icon: "💌",
    text: "Her küçük ayrıntıyı hatırlaman — içten ve özgün bir sevginin yansıması.",
  },
];

const promises = [
  "Her kötü günde yanında olmak",
  "En aptal fıkralarında gülmek",
  "Favori yemeğini hazırlamak",
  "Elini hiç bırakmamak",
  "Seninle büyümek",
  "Her sabah günaydın demek",
  "Rüyalarını desteklemek",
  "Seni her gün biraz daha sevmek",
];

function RevealItem({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={`${className} ${visible ? "visible" : ""}`}
    >
      {children}
    </Tag>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <main>
      <Cursor />
      <Fireworks />

      {/* ============ HERO ============ */}
      <section className="hero">
        <FallingPetals />

        <div className="hero-content">
          <p className="hero-date">14 ŞUBAT 2025 · SEVGİLİLER GÜNÜ</p>

          <h1 className="hero-title">
            Seni
            <span>Seviyorum</span>
          </h1>

          <p className="hero-name">Zeynep Sude Yıldırım</p>

          <div className="hero-divider" />

          <p className="hero-tagline">
            &ldquo;Seninle geçen her an, en güzel şiirin dizesi&rdquo;
          </p>

          <a href="#letter" className="hero-cta">
            Sana Bir Mektup Var
          </a>

          <span className="heart-pulse">❤️</span>
        </div>
      </section>

      {/* ============ REASONS ============ */}
      <section
        style={{
          padding: "8rem 2rem",
          background: "linear-gradient(180deg, #0d0508, #1a0a12)",
        }}
      >
        <div
          className="section"
          style={{ padding: 0, maxWidth: 1000, margin: "0 auto" }}
        >
          <RevealItem as="p" className="section-label">
            Neden Seni Seviyorum
          </RevealItem>
          <RevealItem as="h2" className="section-title" delay={100}>
            Seninle Her Gün Yeniden Aşık Oluyorum
          </RevealItem>

          <div className="reasons-grid">
            {reasons.map((r, i) => (
              <RevealItem key={i} className="reason-card" delay={i * 100}>
                <div className="reason-number">0{i + 1}</div>
                <span className="reason-icon">{r.icon}</span>
                <p className="reason-text">{r.text}</p>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LOVE LETTER ============ */}
      <section id="letter" className="love-letter-section">
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem" }}>
          <RevealItem
            as="p"
            className="section-label"
            style={{ textAlign: "center" }}
          >
            Sana Özel
          </RevealItem>
          <RevealItem
            as="h2"
            className="section-title"
            delay={100}
            style={{ textAlign: "center" }}
          >
            Kalbimden Gelenler
          </RevealItem>
        </div>

        <div className="letter-wrapper">
          <RevealItem as="div" className="letter-paper">
            <div className="letter-seal">💌</div>

            <p className="letter-greeting">Sevgili Zeynep Sude&apos;m,</p>

            <div className="letter-body">
              <p>
                Bazı şeyleri anlatmak için kelimeler yetmez. Ama yine de denemek
                istiyorum — çünkü sen, en güzel şiire layık birisin.
              </p>
              <p>
                Seninle tanışalı beri dünya farklı görünüyor. Sıradan bir günün
                ortasında beni güldürebilmen, en zor anlarda sessizce yanımda
                durman... Bunu fark ettin mi? Sadece varlığınla her şeyi daha
                hafif yapıyorsun.
              </p>
              <p>
                Bugün, 14 Şubat, seninle paylaşmak istediğim bir gün — ama
                aslında her gün seni sevdiğimi, her gün bunun için şükrettiğimi
                bilmeni istiyorum.
              </p>
              <p>
                Yıldızın parlaklığı nereden geliyor derler ya — ben biliyorum.
                Soyadın şans değil, sen zaten doğduğunda bir yıldızsın.
              </p>
            </div>

            <p className="letter-closing">Sonsuz sevgiyle,</p>
            <p className="letter-signature">Seninle gurur duyuyorum 🌹</p>
          </RevealItem>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section
        style={{ padding: "8rem 2rem", maxWidth: 700, margin: "0 auto" }}
      >
        <RevealItem as="p" className="section-label">
          Birlikte
        </RevealItem>
        <RevealItem as="h2" className="section-title" delay={100}>
          Ortak Anlarımız
        </RevealItem>

        <div className="timeline">
          {[
            {
              date: "İlk Karşılaşma",
              title: "Her Şey Başlıyor",
              desc: "Seninle tanıştığım o an — benim için bir önce ve bir sonra var artık.",
            },
            {
              date: "İlk Kahkaha",
              title: "Seninle Güldüm",
              desc: "Seninle aynı şeye güldüğümüzü anlayınca, 'bu kişi benim' dedim içimden.",
            },
            {
              date: "Özel Bir Gün",
              title: "Hatırlayacağım",
              desc: "Birlikte geçirilen her küçük an — büyük bir hikayenin parçası.",
            },
            {
              date: "14 Şubat 2025",
              title: "Bugün & Ötesi",
              desc: "Seninle daha nice sevgililer günleri, sürprizler ve anlar için buradayım.",
            },
          ].map((item, i) => (
            <RevealItem key={i} className="timeline-item" delay={i * 150}>
              <div className="timeline-dot" />
              <p className="timeline-date">{item.date}</p>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-desc">{item.desc}</p>
            </RevealItem>
          ))}
        </div>
      </section>

      {/* ============ PROMISES ============ */}
      <section className="promise-section">
        <RevealItem as="p" className="section-label">
          Sözlerim
        </RevealItem>
        <RevealItem as="h2" className="section-title" delay={100}>
          Sana Söz Veriyorum
        </RevealItem>

        <div className="promise-ring">
          <svg viewBox="0 0 200 200">
            <defs>
              <path
                id="textCircle"
                d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="rgba(212, 168, 83, 0.2)"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="75"
              fill="none"
              stroke="rgba(200, 16, 46, 0.3)"
              strokeWidth="0.5"
            />
            <text
              fill="#d4a853"
              fontSize="11"
              fontFamily="Cinzel, serif"
              letterSpacing="3"
            >
              <textPath href="#textCircle">
                SENI SEVIYORUM · 14 SUBAT · HEPSI SANA ·
              </textPath>
            </text>
          </svg>
          <div className="promise-ring-inner">💍</div>
        </div>

        <div className="promise-items">
          {promises.map((p, i) => (
            <RevealItem key={i} className="promise-chip" delay={i * 80}>
              {p}
            </RevealItem>
          ))}
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="footer-hearts">❤️ 🌹 💕 🌸 💌</div>
        <p className="footer-text">
          ZEYNEP SUDE YILDIRIM · 14 ŞUBAT 2025 · SONSUZA KADAR
        </p>
      </footer>
    </main>
  );
}
