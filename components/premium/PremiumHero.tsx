"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface PremiumHeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  videoSrc?: string;
  imageSrc?: string;
}

// ─── Word-by-word headline ────────────────────────────────────────────────────

function AnimatedHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.08] tracking-tight mb-6">
      <motion.span
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        className="block"
      >
        {words.map((word, i) => {
          const isHighlight = ["Clear", "Path", "ADU", "Rental", "Income"].includes(word);
          return (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block mr-[0.28em] ${
                isHighlight
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-[#e9c400] to-[#f5d840]"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </h1>
  );
}

// ─── CTA buttons ─────────────────────────────────────────────────────────────

function HeroButton({
  children,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <button className="cta-btn px-7 py-[14px] text-[15px]">
      {children}
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function PremiumHero({
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  videoSrc,
}: PremiumHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#002b38" }}
    >
      {/* Background — radial gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_55%_45%,#003d50_0%,#002b38_75%)]" />
      </div>

      {/* Floor plan geometry */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Property boundary */}
          <rect x="40" y="40" width="500" height="420" stroke="#e9c400" strokeWidth="1" strokeDasharray="8 6" opacity="0.12"/>
          {/* House footprint */}
          <rect x="80" y="100" width="320" height="240" stroke="#e9c400" strokeWidth="1.5" opacity="0.1"/>
          {/* Interior rooms */}
          <line x1="80" y1="220" x2="260" y2="220" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
          <line x1="260" y1="100" x2="260" y2="340" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
          <line x1="80" y1="300" x2="400" y2="300" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
          {/* ADU footprint */}
          <rect x="440" y="280" width="140" height="120" stroke="#e9c400" strokeWidth="1.5" opacity="0.1"/>
          {/* ADU label tick */}
          <line x1="510" y1="265" x2="510" y2="278" stroke="#e9c400" strokeWidth="1" opacity="0.1"/>
          {/* Dimension lines right side */}
          <line x1="660" y1="100" x2="680" y2="100" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
          <line x1="660" y1="340" x2="680" y2="340" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
          <line x1="670" y1="100" x2="670" y2="340" stroke="#e9c400" strokeWidth="1" strokeDasharray="4 3" opacity="0.08"/>
          {/* Right-side abstract lines */}
          <rect x="820" y="60" width="340" height="380" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <line x1="820" y1="200" x2="1160" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          <line x1="980" y1="60" x2="980" y2="440" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: bgOpacity }}
        className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-28 md:py-36"
      >
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

          {/* Left: copy */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.07] border border-white/[0.12] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#e9c400] flex-shrink-0" />
              <span className="text-[13px] font-medium text-white/80 tracking-wide">
                California&apos;s #1 ADU Specialist
              </span>
            </motion.div>

            {/* Headline */}
            <AnimatedHeadline text={title} />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-[1.0625rem] text-white/60 leading-[1.75] mb-10 max-w-[520px]"
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <HeroButton variant="primary">{ctaPrimary}</HeroButton>
              {ctaSecondary && (
                <HeroButton variant="secondary">{ctaSecondary}</HeroButton>
              )}
            </motion.div>

          </div>

          {/* Right: video */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
              <video
                autoPlay
                muted
                playsInline
                src={videoSrc ?? "/images/hero-video.mp4"}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-white/30 tracking-widest uppercase font-medium">Scroll</span>
        <motion.svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M7 1v12M1 8l6 7 6-7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
