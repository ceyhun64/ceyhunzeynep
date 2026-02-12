"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function GorillaChaseGame() {
  const [phase, setPhase] = useState("intro"); // intro | playing | caught | gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [uiState, setUiState] = useState({
    princess: { x: 50, y: 75 },
    gorilla: { x: 50, y: 20 },
    gorillaDir: 1,
    dist: 100,
    isCaught: false,
  });

  const princessPos = useRef({ x: 50, y: 75 });
  const gorillaPos = useRef({ x: 50, y: 20 });
  const movement = useRef({ dx: 0, dy: 0 });
  const keysPressed = useRef({});
  const requestRef = useRef();
  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);
  const phaseRef = useRef("intro");
  const joystickBaseRef = useRef(null);
  const [joystick, setJoystick] = useState({ active: false, x: 0, y: 0 });
  const heartParticles = useRef([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gck_hs_v2");
      if (saved) {
        const val = parseInt(saved, 10);
        setHighScore(val);
        highScoreRef.current = val;
      }
    } catch {}
  }, []);

  const spawnHearts = useCallback((x, y) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i / 8) * Math.PI * 2,
      life: 1,
    }));
    heartParticles.current = newParticles;
    setParticles([...newParticles]);
    const interval = setInterval(() => {
      heartParticles.current = heartParticles.current
        .map((p) => ({
          ...p,
          life: p.life - 0.05,
          x: p.x + Math.cos(p.angle) * 0.3,
          y: p.y + Math.sin(p.angle) * 0.3 - 0.2,
        }))
        .filter((p) => p.life > 0);
      setParticles([...heartParticles.current]);
      if (heartParticles.current.length === 0) clearInterval(interval);
    }, 30);
  }, []);

  const update = useCallback(() => {
    if (phaseRef.current !== "playing") return;

    const speed = 1.3;
    let dx = 0;
    let dy = 0;

    if (
      keysPressed.current["ArrowUp"] ||
      keysPressed.current["w"] ||
      keysPressed.current["W"]
    )
      dy -= speed;
    if (
      keysPressed.current["ArrowDown"] ||
      keysPressed.current["s"] ||
      keysPressed.current["S"]
    )
      dy += speed;
    if (
      keysPressed.current["ArrowLeft"] ||
      keysPressed.current["a"] ||
      keysPressed.current["A"]
    )
      dx -= speed;
    if (
      keysPressed.current["ArrowRight"] ||
      keysPressed.current["d"] ||
      keysPressed.current["D"]
    )
      dx += speed;

    if (movement.current.dx !== 0 || movement.current.dy !== 0) {
      dx = movement.current.dx;
      dy = movement.current.dy;
    }

    if (dx !== 0 && dy !== 0) {
      const mag = Math.sqrt(dx * dx + dy * dy);
      dx = (dx / mag) * speed;
      dy = (dy / mag) * speed;
    }

    princessPos.current.x = Math.max(
      3,
      Math.min(97, princessPos.current.x + dx),
    );
    princessPos.current.y = Math.max(
      3,
      Math.min(97, princessPos.current.y + dy),
    );

    const gdx = princessPos.current.x - gorillaPos.current.x;
    const gdy = princessPos.current.y - gorillaPos.current.y;
    const dist = Math.sqrt(gdx * gdx + gdy * gdy);

    const gorillaSpeed = 0.48 + scoreRef.current / 7000;
    if (dist > 0) {
      gorillaPos.current.x += (gdx / dist) * gorillaSpeed;
      gorillaPos.current.y += (gdy / dist) * gorillaSpeed;
    }

    if (dist < 5) {
      gorillaPos.current = { ...princessPos.current };
      phaseRef.current = "caught";
      setPhase("caught");

      spawnHearts(princessPos.current.x, princessPos.current.y);

      const newScore = scoreRef.current;
      if (newScore > highScoreRef.current) {
        highScoreRef.current = newScore;
        setHighScore(newScore);
        try {
          localStorage.setItem("gck_hs_v2", newScore.toString());
        } catch {}
      }

      setUiState({
        princess: { ...princessPos.current },
        gorilla: { ...gorillaPos.current },
        gorillaDir: 1,
        dist: 0,
        isCaught: true,
      });

      setTimeout(() => {
        phaseRef.current = "gameover";
        setPhase("gameover");
      }, 2200);
      return;
    }

    scoreRef.current += 1;
    setScore(scoreRef.current);
    setUiState({
      princess: { ...princessPos.current },
      gorilla: { ...gorillaPos.current },
      gorillaDir: gdx > 0 ? 1 : -1,
      dist,
      isCaught: false,
    });

    requestRef.current = requestAnimationFrame(update);
  }, [spawnHearts]);

  useEffect(() => {
    if (phase === "playing") {
      requestRef.current = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [phase, update]);

  useEffect(() => {
    const down = (e) => {
      keysPressed.current[e.key] = true;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
        e.preventDefault();
    };
    const up = (e) => {
      keysPressed.current[e.key] = false;
    };
    window.addEventListener("keydown", down, { passive: false });
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault();
      if (phase !== "playing") return;
      const touch = e.touches[0];
      const el = joystickBaseRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = touch.clientX - cx;
      const dy = touch.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const limit = Math.min(rect.width / 2 - 8, 44);
      const ang = Math.atan2(dy, dx);
      const ld = Math.min(dist, limit);
      const jX = Math.cos(ang) * ld;
      const jY = Math.sin(ang) * ld;
      setJoystick({ active: true, x: jX, y: jY });
      movement.current = { dx: (jX / limit) * 1.3, dy: (jY / limit) * 1.3 };
    },
    [phase],
  );

  const handleTouchEnd = useCallback(() => {
    setJoystick({ active: false, x: 0, y: 0 });
    movement.current = { dx: 0, dy: 0 };
  }, []);

  const startGame = useCallback(() => {
    cancelAnimationFrame(requestRef.current);
    princessPos.current = { x: 50, y: 75 };
    gorillaPos.current = { x: 50, y: 20 };
    movement.current = { dx: 0, dy: 0 };
    keysPressed.current = {};
    scoreRef.current = 0;
    heartParticles.current = [];
    phaseRef.current = "playing";
    setScore(0);
    setParticles([]);
    setJoystick({ active: false, x: 0, y: 0 });
    setUiState({
      princess: { x: 50, y: 75 },
      gorilla: { x: 50, y: 20 },
      gorillaDir: 1,
      dist: 100,
      isCaught: false,
    });
    setPhase("playing");
  }, []);

  const fmt = (s) => {
    const sec = s / 60;
    if (sec < 60) return sec.toFixed(1) + "s";
    return Math.floor(sec / 60) + "m " + (sec % 60).toFixed(0) + "s";
  };

  const dangerPct = Math.max(0, Math.min(100, 100 - uiState.dist * 2.2));

  return (
    <div
      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
      className="min-h-screen bg-[#0a0005] flex flex-col items-center justify-center p-3 sm:p-4 select-none overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, #3d0020 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, #1a0030 0%, transparent 50%),
            radial-gradient(ellipse at 60% 80%, #2d0015 0%, transparent 50%)`,
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 w-full max-w-[640px] flex flex-col gap-3 sm:gap-4">
        {/* Header */}
        <header className="flex items-center justify-between gap-2">
          <div className="flex flex-col items-start">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-rose-500/70 font-sans font-semibold">
              Aşk Süresi
            </span>
            <span
              className="text-lg sm:text-2xl font-black text-white leading-none tabular-nums"
              style={{ textShadow: "0 0 20px rgba(255,50,100,0.5)" }}
            >
              {fmt(score)}
            </span>
          </div>

       

          <div className="flex flex-col items-end">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-500/70 font-sans font-semibold">
              En İyi
            </span>
            <span
              className="text-lg sm:text-2xl font-black text-amber-400 leading-none tabular-nums"
              style={{ textShadow: "0 0 20px rgba(255,180,0,0.4)" }}
            >
              {fmt(highScore)}
            </span>
          </div>
        </header>

        {/* Game Arena */}
        <div
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-rose-900/60 shadow-[0_0_60px_rgba(200,0,60,0.15),inset_0_0_40px_rgba(0,0,0,0.5)]"
          style={{
            aspectRatio: "4/5",
            background:
              "radial-gradient(ellipse at 50% 40%, #1a0010 0%, #080003 100%)",
          }}
        >
          {/* Grid decoration */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,100,150,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,100,150,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Corner ornaments */}
          {[
            "top-2 left-2",
            "top-2 right-2",
            "bottom-2 left-2",
            "bottom-2 right-2",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-6 h-6 border-rose-800/60`}
              style={{
                borderTopWidth: i < 2 ? "2px" : "0",
                borderBottomWidth: i >= 2 ? "2px" : "0",
                borderLeftWidth: i % 2 === 0 ? "2px" : "0",
                borderRightWidth: i % 2 === 1 ? "2px" : "0",
                borderRadius:
                  i === 0
                    ? "6px 0 0 0"
                    : i === 1
                      ? "0 6px 0 0"
                      : i === 2
                        ? "0 0 0 6px"
                        : "0 0 6px 0",
              }}
            />
          ))}

          {/* Danger Bar */}
          {phase === "playing" && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 sm:w-44 z-30">
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="text-[9px] uppercase tracking-widest font-sans font-bold"
                  style={{
                    color:
                      dangerPct > 60
                        ? "#ff3366"
                        : dangerPct > 30
                          ? "#ffaa00"
                          : "#44ff88",
                  }}
                >
                  {dangerPct > 70
                    ? "TEHLİKE!"
                    : dangerPct > 40
                      ? "DİKKAT"
                      : "GÜVENLİ"}
                </span>
              </div>
              <div className="h-1.5 sm:h-2 rounded-full overflow-hidden bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${dangerPct}%`,
                    background:
                      dangerPct > 60
                        ? "linear-gradient(90deg, #ff0055, #ff3366)"
                        : dangerPct > 30
                          ? "linear-gradient(90deg, #ff8800, #ffcc00)"
                          : "linear-gradient(90deg, #00cc66, #44ff88)",
                    boxShadow: `0 0 8px ${dangerPct > 60 ? "#ff0055" : dangerPct > 30 ? "#ff8800" : "#00cc66"}`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Princess */}
          {phase !== "gameover" && (
            <div
              className="absolute z-20 transition-opacity duration-500"
              style={{
                left: `${uiState.princess.x}%`,
                top: `${uiState.princess.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: uiState.isCaught ? 0 : 1,
                filter: "drop-shadow(0 4px 12px rgba(255,150,200,0.5))",
                fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                lineHeight: 1,
              }}
            >
              👸🏻
            </div>
          )}

          {/* Heart Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute pointer-events-none z-30 text-xl sm:text-2xl"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: p.life,
                transition: "none",
              }}
            >
              ❤️
            </div>
          ))}

          {/* Gorilla */}
          {phase !== "gameover" && (
            <div
              className="absolute z-10"
              style={{
                left: `${uiState.gorilla.x}%`,
                top: `${uiState.gorilla.y}%`,
                transform: `translate(-50%, -50%) scaleX(${uiState.gorillaDir})`,
                filter: "drop-shadow(0 4px 16px rgba(200,0,80,0.4))",
                fontSize: "clamp(2.5rem, 8vw, 3.5rem)",
                lineHeight: 1,
              }}
            >
              {uiState.isCaught ? (
                <span style={{ fontSize: "clamp(2rem, 7vw, 3rem)" }}>
                  🦍😘👸🏻
                </span>
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    animation: "gorillaWalk 0.35s ease-in-out infinite",
                  }}
                >
                  🦍
                </span>
              )}
            </div>
          )}

          {/* Caught kiss burst */}
          {uiState.isCaught && (
            <div
              className="absolute z-40"
              style={{
                left: `${uiState.gorilla.x}%`,
                top: `${uiState.gorilla.y - 12}%`,
                transform: "translate(-50%, -50%)",
                fontSize: "clamp(2rem, 7vw, 3rem)",
                animation: "floatUp 1.8s ease-out forwards",
              }}
            >
              💋
            </div>
          )}

          {/* INTRO SCREEN */}
          {phase === "intro" && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(30,0,15,0.97) 0%, rgba(8,0,3,0.99) 100%)",
              }}
            >
              <div className="flex flex-col items-center text-center px-6 gap-4 sm:gap-6">
                <div
                  style={{
                    fontSize: "clamp(4rem, 20vw, 6rem)",
                    lineHeight: 1,
                    animation: "floatBounce 2s ease-in-out infinite",
                    filter: "drop-shadow(0 8px 24px rgba(255,0,80,0.4))",
                  }}
                >
                  🦍
                </div>

                <div>
                  <h2
                    className="font-black italic text-white leading-none"
                    style={{
                      fontSize: "clamp(1.8rem, 7vw, 2.8rem)",
                      textShadow: "0 0 40px rgba(255,0,80,0.6)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    VAHŞİ AŞK
                  </h2>
                  <p className="text-rose-300/70 font-sans mt-2 text-sm sm:text-base leading-relaxed max-w-xs">
                    Gorilden kaç! Yön tuşları veya joystick ile prensesi kurtar.
                  </p>
                </div>

                {highScore > 0 && (
                  <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2">
                    <span className="text-amber-400 text-sm font-sans font-semibold">
                      🏆 Rekor: {fmt(highScore)}
                    </span>
                  </div>
                )}

                <button
                  onClick={startGame}
                  className="relative overflow-hidden font-sans font-black uppercase tracking-widest text-white rounded-2xl px-10 py-4 text-sm sm:text-base active:scale-95 transition-transform"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff0055 0%, #c00040 100%)",
                    boxShadow:
                      "0 0 30px rgba(255,0,85,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                    letterSpacing: "0.15em",
                  }}
                >
                  <span className="relative z-10">OYUNU BAŞLAT</span>
                </button>
              </div>
            </div>
          )}

          {/* GAME OVER SCREEN */}
          {phase === "gameover" && (
            <div
              className="absolute inset-0 z-50 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(80,0,30,0.98) 0%, rgba(8,0,3,0.99) 100%)",
                animation: "fadeIn 0.4s ease-out",
              }}
            >
              <div className="flex flex-col items-center text-center px-6 gap-4 sm:gap-5">
                <div
                  style={{
                    fontSize: "clamp(3.5rem, 15vw, 5.5rem)",
                    lineHeight: 1,
                    animation: "pulseBig 0.8s ease-in-out infinite alternate",
                  }}
                >
                  💋
                </div>

                <div>
                  <h2
                    className="font-black text-white leading-none"
                    style={{
                      fontSize: "clamp(1.6rem, 7vw, 2.5rem)",
                      textShadow: "0 0 40px rgba(255,0,80,0.7)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    YAKALANDIIIN😈!
                  </h2>
                  <p className="text-rose-200/60 font-sans text-sm mt-1.5 max-w-xs">
                    Goril seni öpücüklere boğdu 💔
                  </p>
                </div>

                <div className="flex gap-4 sm:gap-6">
                  <div className="flex flex-col items-center bg-white/5 rounded-2xl px-5 py-3 border border-white/10">
                    <span className="text-rose-300/60 text-[10px] uppercase tracking-widest font-sans font-semibold">
                      Süren
                    </span>
                    <span className="text-white text-xl sm:text-2xl font-black tabular-nums leading-none mt-1">
                      {fmt(score)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center bg-amber-500/10 rounded-2xl px-5 py-3 border border-amber-500/30">
                    <span className="text-amber-400/70 text-[10px] uppercase tracking-widest font-sans font-semibold">
                      🏆 Rekor
                    </span>
                    <span className="text-amber-300 text-xl sm:text-2xl font-black tabular-nums leading-none mt-1">
                      {fmt(highScore)}
                    </span>
                  </div>
                </div>

                {score >= highScore && score > 0 && (
                  <div className="text-amber-300 font-sans font-bold text-sm animate-pulse">
                    🎉 Yeni Rekor!
                  </div>
                )}

                <button
                  onClick={startGame}
                  className="font-sans font-black uppercase tracking-widest text-white rounded-2xl px-10 py-4 text-sm sm:text-base active:scale-95 transition-transform"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff0055 0%, #c00040 100%)",
                    boxShadow:
                      "0 0 30px rgba(255,0,85,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                    letterSpacing: "0.15em",
                  }}
                >
                  BİR DAHA KAÇ!
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Joystick + Controls Row */}
        <div className="flex items-end justify-between gap-4 px-1">
          {/* Joystick */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.2em] text-rose-500/50 font-sans font-semibold">
              Joystick
            </span>
            <div
              ref={joystickBaseRef}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchStart={(e) => e.preventDefault()}
              className="relative flex items-center justify-center rounded-full touch-none cursor-pointer"
              style={{
                width: "clamp(90px, 24vw, 120px)",
                height: "clamp(90px, 24vw, 120px)",
                background:
                  "radial-gradient(circle at 40% 35%, rgba(255,100,150,0.12), rgba(0,0,0,0.4))",
                border: "2px solid rgba(255,50,100,0.25)",
                boxShadow: joystick.active
                  ? "0 0 20px rgba(255,0,80,0.3), inset 0 0 20px rgba(0,0,0,0.5)"
                  : "inset 0 0 20px rgba(0,0,0,0.5)",
              }}
            >
              {/* Tick marks */}
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute rounded-full bg-rose-500/20"
                  style={{
                    width: 3,
                    height: 3,
                    transformOrigin: "center",
                    transform: `rotate(${deg}deg) translateX(clamp(30px, 8vw, 40px))`,
                    left: "calc(50% - 1.5px)",
                    top: "calc(50% - 1.5px)",
                  }}
                />
              ))}
              {/* Thumb */}
              <div
                className="absolute rounded-full transition-transform duration-[60ms]"
                style={{
                  width: "clamp(32px, 9vw, 44px)",
                  height: "clamp(32px, 9vw, 44px)",
                  background: joystick.active
                    ? "radial-gradient(circle at 35% 35%, #ff6b9d, #cc0044)"
                    : "radial-gradient(circle at 35% 35%, #ff3366, #990033)",
                  boxShadow: joystick.active
                    ? "0 4px 16px rgba(255,0,80,0.5)"
                    : "0 2px 8px rgba(0,0,0,0.4)",
                  border: "2px solid rgba(255,150,180,0.3)",
                  transform: `translate(calc(-50% + ${joystick.x}px), calc(-50% + ${joystick.y}px))`,
                  left: "50%",
                  top: "50%",
                }}
              />
            </div>
          </div>

          {/* Keyboard hints */}
          <div className="flex flex-col items-end gap-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-rose-500/50 font-sans font-semibold">
              Klavye
            </span>
            <div className="flex flex-col items-center gap-1">
              <Key label="▲" />
              <div className="flex gap-1">
                <Key label="◄" />
                <Key label="▼" />
                <Key label="►" />
              </div>
              <span className="text-[9px] text-rose-500/30 font-sans mt-0.5">
                veya WASD
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap');

        * { -webkit-tap-highlight-color: transparent; }

        @keyframes gorillaWalk {
          0%, 100% { transform: rotate(-10deg) translateY(0) scale(1.05); }
          50% { transform: rotate(10deg) translateY(-8px) scale(0.97); }
        }
        @keyframes floatUp {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-50%, calc(-50% - 80px)) scale(2); opacity: 0; }
        }
        @keyframes floatBounce {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-14px) rotate(5deg); }
        }
        @keyframes pulseBig {
          0% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255,50,100,0.4)); }
          100% { transform: scale(1.12); filter: drop-shadow(0 0 24px rgba(255,0,80,0.8)); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function Key({ label }) {
  return (
    <div
      className="flex items-center justify-center rounded font-sans font-bold text-rose-300/60 text-xs"
      style={{
        width: 26,
        height: 26,
        background: "rgba(255,50,100,0.08)",
        border: "1px solid rgba(255,50,100,0.2)",
        boxShadow: "0 2px 0 rgba(0,0,0,0.4)",
        fontSize: 10,
      }}
    >
      {label}
    </div>
  );
}
