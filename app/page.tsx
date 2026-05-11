"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PremiumHero } from "@/components/premium/PremiumHero";
import { PremiumFAQ } from "@/components/premium/PremiumFAQ";
import { PremiumJourneySteps } from "@/components/premium/PremiumJourneySteps";

// ─── Shared animation helpers ────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerFadeUp({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeUpItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── CTA Button ──────────────────────────────────────────────────────────────

function CtaButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button className={`cta-btn ${className}`}>{children}</button>
  );
}

// ─── Material Icon ───────────────────────────────────────────────────────────

function Icon({
  name,
  className = "",
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`material-symbols-outlined ${className}`} style={style}>
      {name}
    </span>
  );
}

// ─── Decorative divider ──────────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px flex-1" style={{ backgroundColor: "#c1c7cb" }} />
      <Icon name="star" className="text-base" style={{ color: "#e9c400" }} />
      <div className="h-px flex-1" style={{ backgroundColor: "#c1c7cb" }} />
    </div>
  );
}

// ─── Animated counter hook ───────────────────────────────────────────────────

function useCounter(target: number, duration = 2000, enabled = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(progress * target);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, duration]);
  return value;
}

// ─── Nav Bar ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  ["Process", "#process"],
  ["Pre-Feasibility", "/pre-feasibility"],
  ["FAQs", "#faq"],
  ["About", "#about"],
  ["Contact Us", "#contact"],
] as const;

function NavLink({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative group font-semibold text-[15px] text-on-surface-variant hover:text-on-background transition-colors duration-200"
    >
      {label}
      {/* animated gold underline */}
      <span
        className="absolute -bottom-0.5 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out rounded-full"
        style={{ backgroundColor: "#e9c400" }}
      />
    </a>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop / main bar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(253,249,240,0.97)" : "rgba(253,249,240,0)",
          backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(160%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(233,196,0,0.3)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.07)" : "none",
        }}
      >
        <div className="flex items-center justify-between md:justify-start px-6 md:px-10 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <a href="#" className="cursor-pointer flex-shrink-0 w-[160px] md:w-[clamp(130px,18%,200px)]">
            <Image
              src="/images/logo.png"
              alt="Clear Path ADU"
              width={200}
              height={60}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </a>

          {/* Desktop links - centered with even spacing */}
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-10 flex-1 px-8">
            {NAV_LINKS.map(([label, href]) => (
              <NavLink key={label} label={label} href={href} />
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block flex-shrink-0">
            <CtaButton className="px-5 py-2.5 text-sm whitespace-nowrap">
              Check If My Property Qualifies
            </CtaButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-surface-container transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block h-0.5 w-5 rounded-full bg-on-surface"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
              className="block h-0.5 w-5 rounded-full bg-on-surface"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
              className="block h-0.5 w-5 rounded-full bg-on-surface"
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <motion.div
          initial={false}
          animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden overflow-hidden"
          style={{ backgroundColor: "rgba(253,249,240,0.98)", backdropFilter: "blur(18px)" }}
        >
          <div className="flex flex-col gap-1 px-6 pb-5 pt-2">
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-semibold text-on-surface-variant hover:text-on-background border-b border-outline-variant/30 last:border-0 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="pt-3">
              <CtaButton className="w-full py-3 text-sm">
                Check If My Property Qualifies
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer so content isn't hidden under the fixed bar */}
      <div className="h-[64px]" />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <PremiumHero
      title="Unlock Your Property's Full Potential With a Clear Path to Building an ADU"
      subtitle="California's Premier ADU Specialist"
      description="We start with your property. We end with your finished ADU. Everything in between — feasibility, design, permits, and construction — handled by one experienced California team."
      ctaPrimary="Check If My Property Qualifies"
      ctaSecondary="Speak To An Expert"
      videoSrc="/images/hero-video.mp4"
      imageSrc="/images/adu-exterior.jpg"
    />
  );
}

// ─── Trust Bar ───────────────────────────────────────────────────────────────

function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  const adus = useCounter(100, 2000, isInView);
  const rating = useCounter(4.9, 2000, isInView);
  const revenue = useCounter(10, 2000, isInView);

  return (
    <div ref={ref} style={{ backgroundColor: "#002b38" }}>
      <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <span className="font-headline font-black text-lg" style={{ color: "#e9c400" }}>
            {Math.floor(adus)}+
          </span>
          <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
            ADUs Completed
          </span>
        </motion.div>

        <span className="hidden sm:block text-[10px]" style={{ color: "rgba(233,196,0,0.5)" }}>★</span>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
          className="flex items-center gap-2"
        >
          <span className="font-headline font-black text-lg" style={{ color: "#e9c400" }}>
            {rating.toFixed(1)}★
          </span>
          <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
            Client Satisfaction
          </span>
        </motion.div>

        <span className="hidden sm:block text-[10px]" style={{ color: "rgba(233,196,0,0.5)" }}>★</span>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="font-headline font-black text-lg" style={{ color: "#e9c400" }}>
            ${Math.floor(revenue)}M+
          </span>
          <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
            In ADU Projects Completed
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Customer Problem ─────────────────────────────────────────────────────────

function CustomerProblem() {
  return (
    <section className="py-10 md:py-16 bg-surface">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <FadeUp>
              <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight mb-8" style={{ color: "#002b38" }}>
                You May Be Sitting On <span style={{ color: "#e9c400" }}>Hidden Income</span> and Equity — But The ADU Process Can Feel Confusing
              </h2>
            </FadeUp>
            <StaggerFadeUp className="space-y-6 mb-10">
              {[
                '"How much will it actually cost to build?"',
                '"What size unit does my lot legally allow?"',
                '"What should I know before paying for plans or hiring a contractor?"',
              ].map((q) => (
                <FadeUpItem key={q} className="flex gap-4 items-start">
                  <Icon name="help_outline" className="mt-1 flex-shrink-0" style={{ color: "#e9c400" }} />
                  <p className="text-lg text-on-surface-variant font-medium italic">{q}</p>
                </FadeUpItem>
              ))}
            </StaggerFadeUp>
            <FadeUp>
              <p className="text-xl font-bold text-on-background border-l-4 border-[#e9c400] pl-6">
                Building an ADU can be a smart move — but only if you start with the right strategy.
              </p>
            </FadeUp>
          </div>
          <div className="relative">
            <FadeUp>
              <Image
                src="/images/backyard-man.png"
                alt="Homeowner in backyard considering ADU"
                width={700}
                height={467}
                className="rounded-xl shadow-2xl w-full"
              />
              {/* Desktop: absolute overlap */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border-l-4 border-[#e9c400]">
                <p className="text-base font-semibold italic text-on-background font-headline leading-snug">
                  &ldquo;The hardest part was knowing where to start. Clear Path fixed that.&rdquo;
                </p>
              </div>
            </FadeUp>
            {/* Mobile: below image in flow */}
            <FadeUp>
              <div className="mt-4 bg-white p-6 rounded-xl shadow-xl border-l-4 border-[#e9c400] md:hidden">
                <p className="text-base font-semibold italic text-on-background font-headline leading-snug">
                  &ldquo;The hardest part was knowing where to start. Clear Path fixed that.&rdquo;
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Internal / Emotional Problem ────────────────────────────────────────────

// ─── Guide Section ────────────────────────────────────────────────────────────

function GuideSection() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#002b38" }}>
      {/* Abstract floor plan geometry */}
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

      <div className="relative z-10 grid lg:grid-cols-2">

        {/* Left: full-height image */}
        <FadeUp className="relative h-[280px] md:h-auto md:min-h-[520px] lg:min-h-[680px]">
          <Image
            src="/images/guide-section.jpg"
            alt="Beautiful ADU interior"
            fill
            quality={100}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain md:object-cover"
          />
          {/* Right-edge fade into section bg */}
          <div
            className="absolute inset-y-0 right-0 w-16 pointer-events-none hidden lg:block"
            style={{ background: "linear-gradient(to right, transparent, #002b38)" }}
          />
          {/* Gold ring overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 1.5px rgba(233,196,0,0.25)" }}
          />
        </FadeUp>

        {/* Right: headline + cards */}
        <div className="flex flex-col justify-center gap-12 px-10 py-8 md:py-12 lg:px-16 xl:px-20">

          <FadeUp>
            {/* Eyebrow with star accent */}
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M8 0 L9.2 6.2 L15.5 5 L10.8 9.5 L13.5 15.5 L8 12 L2.5 15.5 L5.2 9.5 L0.5 5 L6.8 6.2 Z" fill="#e9c400" opacity="0.85" />
              </svg>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(233,196,0,0.75)" }}>
                Your Trusted Guide
              </p>
            </div>
            {/* Mobile headline */}
            <h2 className="font-headline font-bold text-white leading-tight text-4xl md:hidden">
              From Feasibility To Finished ADU,
              <br />
              <span className="text-3xl" style={{ color: "#e9c400" }}>We Help Keep The Process Clear</span>
            </h2>
            {/* Desktop headline */}
            <h2 className="font-headline font-bold text-white leading-tight hidden md:block md:text-[clamp(2.2rem,3.5vw,3.25rem)]">
              From Feasibility To Finished ADU,
              <br />
              <span style={{ color: "#e9c400" }}>We Help Keep The Process Clear</span>
            </h2>
          </FadeUp>

          <StaggerFadeUp className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Card 1 */}
            <FadeUpItem className="h-full">
              <div
                className="h-full flex flex-col gap-6 rounded-2xl p-8"
                style={{
                  backgroundColor: "#001e2e",
                  border: "1px solid rgba(233,196,0,0.3)",
                }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(233,196,0,0.15)" }}>
                    <Icon name="favorite" style={{ color: "#e9c400", fontSize: "1.3rem" }} />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-white truncate">Feasibility First</h3>
                </div>
                <p className="text-white/65 text-base leading-relaxed flex-1">
                  We review zoning, setbacks, site conditions, utilities, and buildable area before
                  you commit to the expensive parts of the project.
                </p>
                <ul className="space-y-3.5">
                  <li className="flex items-center gap-3 text-white/65 text-sm">
                    <Icon name="check_circle" style={{ color: "#e9c400", fontSize: "1.1rem" }} className="flex-shrink-0" />
                    Property-specific zoning and site review
                  </li>
                  <li className="flex items-center gap-3 text-white/65 text-sm">
                    <Icon name="check_circle" style={{ color: "#e9c400", fontSize: "1.1rem" }} className="flex-shrink-0" />
                    Know what&apos;s buildable before you spend
                  </li>
                </ul>
              </div>
            </FadeUpItem>

            {/* Card 2 */}
            <FadeUpItem className="h-full">
              <div
                className="h-full flex flex-col gap-6 rounded-2xl p-8"
                style={{
                  backgroundColor: "#001e2e",
                  border: "1px solid rgba(233,196,0,0.3)",
                }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(233,196,0,0.15)" }}>
                    <Icon name="verified" style={{ color: "#e9c400", fontSize: "1.3rem" }} />
                  </div>
                  <h3 className="text-lg font-bold font-headline text-white truncate">Guidance Beyond The Report</h3>
                </div>
                <p className="text-white/65 text-base leading-relaxed flex-1">
                  If the project makes sense, we can help with design direction, permitting,
                  contractor coordination, and construction oversight.
                </p>
                <ul className="space-y-3.5">
                  <li className="flex items-center gap-3 text-white/65 text-sm">
                    <Icon name="check_circle" style={{ color: "#e9c400", fontSize: "1.1rem" }} className="flex-shrink-0" />
                    Full-service design, permits, and construction
                  </li>
                  <li className="flex items-center gap-3 text-white/65 text-sm">
                    <Icon name="check_circle" style={{ color: "#e9c400", fontSize: "1.1rem" }} className="flex-shrink-0" />
                    One experienced California team
                  </li>
                </ul>
              </div>
            </FadeUpItem>
          </StaggerFadeUp>

        </div>
      </div>
    </section>
  );
}

// ─── 3-Step Plan ──────────────────────────────────────────────────────────────

function ThreeStepPlan() {
  return <PremiumJourneySteps />;
}

// ─── Know Your Options ────────────────────────────────────────────────────────

const aduOptions = [
  {
    icon: "house",
    title: "Detached ADU",
    body: "A fully independent unit built separately from your main home. Best for maximum rental income, privacy, and long-term property value.",
    outcomeIcon: "payments",
    outcome: "Maximum Rental Income",
  },
  {
    icon: "link",
    title: "Attached ADU",
    body: "An addition connected to your existing home. Ideal for keeping family close while adding living space and equity.",
    outcomeIcon: "family_restroom",
    outcome: "Family Housing",
  },
  {
    icon: "garage",
    title: "Garage Conversion",
    body: "Transform your existing garage into a livable unit. Often the fastest and most affordable path to rental income.",
    outcomeIcon: "bolt",
    outcome: "Fastest Path To Income",
  },
  {
    icon: "home_work",
    title: "Junior ADU (JADU)",
    body: "A smaller unit within your main home up to 500 sqft. Perfect for multigenerational living or a starter rental.",
    outcomeIcon: "people",
    outcome: "Multigenerational Living",
  },
  {
    icon: "content_cut",
    title: "SB9 Lot Split",
    body: "Legally divide your lot into two properties. The most advanced strategy for homeowners looking to maximize land value.",
    outcomeIcon: "trending_up",
    outcome: "Maximum Land Value",
  },
  {
    icon: "holiday_village",
    title: "Multiple ADUs",
    body: "Many California properties can legally build both an ADU and a JADU together. The strategy most homeowners don't know about for maximum rental income.",
    outcomeIcon: "star",
    outcome: "Maximum ROI",
  },
];

function KnowYourOptions() {
  return (
    <section className="pt-10 pb-8 md:pt-16 md:pb-10 bg-white">
      <div className="container mx-auto px-8 max-w-6xl">

        {/* Header */}
        <FadeUp className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "#72787c" }}>
            Know Your Options
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "#002b38" }}>
            Which ADU Is{" "}
            <span style={{ color: "#e9c400" }}>Right For Your Property?</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            California law gives homeowners more options than most realize. Here&apos;s what might be possible on your lot.
          </p>
        </FadeUp>

        {/* Cards grid */}
        <StaggerFadeUp className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {aduOptions.map(({ icon, title, body, outcomeIcon, outcome }, index) => (
            <FadeUpItem key={title}>
              <motion.div
                className="rounded-2xl p-6 h-full flex flex-col relative overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e6e2d9",
                  borderLeft: "3px solid #e9c400",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 36px rgba(233,196,0,0.15)",
                  borderColor: "rgba(233,196,0,0.6)",
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
              >
                {/* "Most Popular" badge — Detached ADU only */}
                {title === "Detached ADU" && (
                  <span style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    background: '#e9c400',
                    color: '#002b38',
                    border: '1px solid rgba(0, 43, 56, 0.2)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap'
                  }}>
                    ★ Most Popular
                  </span>
                )}

                {/* Icon + Title inline */}
                <div className="flex flex-row items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(233,196,0,0.18)" }}
                  >
                    <Icon name={icon} style={{ color: "#e9c400", fontSize: "1.5rem" }} />
                  </div>
                  <h3 className="font-headline font-bold text-sm md:text-[1.05rem] leading-snug" style={{ color: "#002b38" }}>{title}</h3>
                </div>

                {/* Body */}
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1 mb-5">{body}</p>

                {/* Outcome chip */}
                <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: "#e8deb8" }}>
                  <Icon name={outcomeIcon} style={{ color: "#e9c400", fontSize: "1rem" }} />
                  <span className="text-xs font-semibold" style={{ color: "#41484b" }}>{outcome}</span>
                </div>
              </motion.div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>

        {/* Closing transition line */}
        <FadeUp>
          <div className="max-w-2xl mx-auto text-center">
            <div className="h-px mb-10 mx-auto w-16 rounded-full" style={{ backgroundColor: "#e9c400" }} />
            <p className="font-headline text-xl md:text-2xl font-semibold leading-snug mb-8" style={{ color: "#002b38" }}>
              Wondering which option fits your property?<br />
              <span style={{ color: "#e9c400" }}>That&apos;s exactly what your Pre-Feasibility Report will tell you.</span>
            </p>
            <CtaButton className="px-10 py-4 text-base font-bold">
              Check If My Property Qualifies
            </CtaButton>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

// ─── Pre-Feasibility Offer ────────────────────────────────────────────────────

function PreFeasibility() {
  const checkItems = [
    {
      label: "ADU Proposal & Cost Breakdown",
      detail: "ADU type, size, layout, and preliminary project cost range.",
    },
    {
      label: "Zoning & Property Review",
      detail: "Key zoning rules, setbacks, parking requirements, and local ADU constraints for your lot.",
    },
    {
      label: "Maximum Buildable Size",
      detail: "The ADU square footage your property may legally support under current local rules.",
    },
    {
      label: "Preliminary Site Map",
      detail: "A visual concept showing where an ADU may fit and what areas need further review.",
    },
    {
      label: "Estimated Timeline",
      detail: "From planning and permits through construction and final inspection.",
    },
    {
      label: "Utility & Trenching Red Flags",
      detail: "Water, sewer, electrical, and trenching considerations affecting cost or feasibility.",
    },
    {
      label: "Income & ROI Direction",
      detail: "Potential rental income, property value impact, and whether the project is worth pursuing.",
    },
    {
      label: "Next-Step Roadmap",
      detail: "A clear recommendation on what to do next if your property is a good fit.",
    },
  ];

  return (
    <section className="pt-10 pb-10 md:pt-12 md:pb-16 bg-white" id="pre-feasibility">
      <div className="max-w-6xl mx-auto px-8">
        {/* Premium offer card */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            border: "1px solid #e6e2d9",
            boxShadow: "0 8px 56px rgba(0,0,0,0.09)",
          }}
        >
          {/* Logo watermark — top-right corner of card */}
          <div className="absolute top-5 right-6 z-20 pointer-events-none">
            <Image
              src="/images/logo.png"
              alt="Clear Path ADU"
              width={90}
              height={27}
              style={{ width: "90px", height: "auto" }}
            />
          </div>

          <div className="grid lg:grid-cols-2 min-h-[540px]">

            {/* ── Left column ── */}
            <div className="flex flex-col relative overflow-hidden" style={{ backgroundColor: "#002b38" }}>
              {/* Floor plan geometry */}
              <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
                <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="40" width="500" height="420" stroke="#e9c400" strokeWidth="1" strokeDasharray="8 6" opacity="0.12"/>
                  <rect x="80" y="100" width="320" height="240" stroke="#e9c400" strokeWidth="1.5" opacity="0.1"/>
                  <line x1="80" y1="220" x2="260" y2="220" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                  <line x1="260" y1="100" x2="260" y2="340" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                  <line x1="80" y1="300" x2="400" y2="300" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                  <rect x="440" y="280" width="140" height="120" stroke="#e9c400" strokeWidth="1.5" opacity="0.1"/>
                  <line x1="510" y1="265" x2="510" y2="278" stroke="#e9c400" strokeWidth="1" opacity="0.1"/>
                  <line x1="660" y1="100" x2="680" y2="100" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                  <line x1="660" y1="340" x2="680" y2="340" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                  <line x1="670" y1="100" x2="670" y2="340" stroke="#e9c400" strokeWidth="1" strokeDasharray="4 3" opacity="0.08"/>
                  <rect x="820" y="60" width="340" height="380" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <line x1="820" y1="200" x2="1160" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                  <line x1="980" y1="60" x2="980" y2="440" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                </svg>
              </div>
              {/* Decorative gold arc — purely visual */}
              <div
                className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(233,196,0,0.13) 0%, rgba(233,196,0,0) 70%)",
                }}
                aria-hidden="true"
              />

              <FadeUp className="relative z-10 flex flex-col justify-between h-full px-10 py-12 md:px-14 md:py-16">
                {/* Text content group */}
                <div className="flex flex-col">
                  {/* Eyebrow badge */}
                  <span
                    className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-[0.08em] md:tracking-[0.18em] px-3 md:px-4 py-2 rounded-full mb-8 w-fit max-w-[calc(100%-5rem)] md:max-w-none"
                    style={{ backgroundColor: "rgba(233,196,0,0.15)", color: "#e9c400" }}
                  >
                    The ADU Pre-Feasibility Report
                  </span>

                  {/* Headline */}
                  <h2 className="font-headline text-3xl md:text-4xl xl:text-5xl font-bold mb-5 text-white leading-tight">
                    Stop Guessing.{" "}
                    <span style={{ color: "#e9c400" }}>Start Building</span>
                    {" "}With Confidence.
                  </h2>

                  {/* Subheadline */}
                  <h3 className="text-lg font-medium text-white/60 mb-10 leading-relaxed">
                    Know What You Can Build, What It May Cost, And The Best Path Forward
                  </h3>

                  {/* Gold rule accent */}
                  <div className="w-12 h-[3px] rounded-full mb-10" style={{ backgroundColor: "#e9c400" }} />

                  {/* Why It Matters quote */}
                  <div className="border-l-2 border-[#e9c400]/40 pl-5">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">
                      Why It Matters
                    </h4>
                    <p className="text-white/55 text-sm leading-relaxed">
                      &ldquo;Most homeowners start with ideas, rough quotes, or architect plans before they know what their property can actually support. Your Pre-Feasibility Report gives you a property-specific ADU roadmap &mdash; including zoning details, placement, budget direction, timeline, and next steps &mdash; so every dollar you spend moves you forward.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Button — pinned to bottom of left column */}
                <div className="mt-6 pt-8 border-t border-[#e9c400]/20">
                  <a
                    href="#"
                    className="cta-btn w-full px-3 md:px-10 py-5 text-[11px] md:text-[1rem] text-center block"
                  >
                    Download A Sample Report
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* ── Right column ── */}
            <div
              className="flex flex-col px-10 py-12 md:px-14 md:py-16"
              style={{ backgroundColor: "#faf9f7" }}
            >
              {/* Checklist — grows to fill available space */}
              <div className="flex-1">
                <FadeUp>
                  <h4 className="text-lg font-bold mb-8 text-on-background">
                    What Your Report Includes
                  </h4>
                </FadeUp>
                <StaggerFadeUp>
                  <ul className="space-y-5">
                    {checkItems.map(({ label, detail }) => (
                      <FadeUpItem key={label}>
                        <li className="flex items-start gap-3.5">
                          <Icon
                            name="check_circle"
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: "#e9c400", fontSize: "1.15rem" }}
                          />
                          <p className="text-on-surface-variant text-sm leading-relaxed">
                            <span className="font-semibold text-on-background">{label}</span> — {detail}
                          </p>
                        </li>
                      </FadeUpItem>
                    ))}
                  </ul>
                </StaggerFadeUp>
              </div>

              {/* Framing note */}
              <FadeUp delay={0.2}>
                <p className="mt-8 text-sm text-on-surface-variant leading-relaxed">
                  This is designed to help you understand the opportunity before committing to full design, permits, financing, or construction.
                </p>
              </FadeUp>

              {/* CTA */}
              <FadeUp delay={0.3} className="mt-6 pt-8 border-t border-[#e6e2d9]">
                <CtaButton className="w-full px-3 md:px-10 py-5 text-[11px] md:text-[1rem]">
                  Get My Pre-Feasibility Report
                </CtaButton>
              </FadeUp>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services / Benefits ──────────────────────────────────────────────────────

const services = [
  {
    icon: "analytics",
    title: "Pre-Feasibility",
    body: "Understand your property's legal, zoning, utility, and site limits before spending on design.",
  },
  {
    icon: "account_balance_wallet",
    title: "Goal Review",
    body: "Match your ADU size, layout, and use case with your long-term income and property goals.",
  },
  {
    icon: "account_balance",
    title: "Budget & Financing Path",
    body: "Review project costs, soft costs, and funding options before moving into design or permits.",
  },
  {
    icon: "draw",
    title: "Architecture & Planning",
    body: "Create ADU plans that improve livability, rental potential, and long-term property value.",
  },
  {
    icon: "description",
    title: "Permit & Approvals",
    body: "We help manage city submittals, corrections, and approval steps so the process stays on track.",
  },
  {
    icon: "engineering",
    title: "Construction Management",
    body: "Oversee the build, contractors, schedule, and quality so your ADU is completed correctly.",
  },
];

const milestones = [
  { label: "Pre-Feasibility",   duration: "1–2 weeks",   icon: "search",       description: "Confirm what your property can support before spending on design or permits." },
  { label: "Design & Planning", duration: "4–6 weeks",   icon: "draw",         description: "Create the ADU layout, scope, budget direction, and permit-ready plan." },
  { label: "Permits & Approvals", duration: "8–12 weeks", icon: "description", description: "Manage city submittals, corrections, and approval steps." },
  { label: "Construction",      duration: "4–6 months",  icon: "construction", description: "Build, inspect, and complete the ADU for final use." },
];


function ProjectTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <div ref={ref} className="mb-16">
      {/* Navy panel */}
      <div className="relative rounded-2xl px-8 md:px-14 py-8 overflow-hidden" style={{ backgroundColor: "#002b38" }}>

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

        {/* Headline block */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p
            className="font-headline font-bold uppercase tracking-[0.18em] mb-3"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "#e9c400" }}
          >
            Typical Project Timeline
          </p>
          <p
            className="text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto"
            style={{ color: "rgba(253,249,240,0.6)" }}
          >
            From your first property analysis to a completed ADU, here&apos;s how the process typically unfolds.
          </p>
        </motion.div>

        {/* ── Desktop: horizontal ── */}
        <div
          className="relative hidden sm:block mt-12 md:mt-[72px]"
          style={{ maxWidth: "1180px", margin: "72px auto 0" }}
        >
          {/* Connecting line — sits behind bubbles */}
          <motion.div
            className="absolute"
            style={{
              top: "106px",
              left: "12.5%",
              right: "12.5%",
              height: "1px",
              background: "rgba(225,181,47,0.75)",
              transformOrigin: "left",
              zIndex: 1,
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {milestones.map(({ label, duration, icon, description }, i) => (
              <motion.div
                key={label}
                className="flex flex-col items-center px-4"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 + i * 0.2 }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center mb-3 flex-shrink-0"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "14px",
                    backgroundColor: "rgba(233,196,0,0.12)",
                  }}
                >
                  <Icon name={icon} style={{ color: "#e9c400", fontSize: "1.2rem" }} />
                </div>

                {/* Stage name */}
                <p
                  className="text-white text-center leading-snug mb-4"
                  style={{ fontSize: "15px", fontWeight: 600 }}
                >
                  {label}
                </p>

                {/* Bubble */}
                <div
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#E1B52F",
                    border: "3px solid rgba(255,255,255,0.85)",
                    boxShadow: "0 0 12px rgba(225,181,47,0.45)",
                    position: "relative",
                    zIndex: 2,
                  }}
                />

                {/* Typical label + date */}
                <div className="pt-4 text-center">
                  <p
                    className="uppercase tracking-widest mb-1"
                    style={{ fontSize: "10px", color: "rgba(253,249,240,0.45)", fontWeight: 600, letterSpacing: "0.12em" }}
                  >
                    Typical:
                  </p>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#E1B52F" }}>
                    {duration}
                  </p>
                </div>

                {/* Description */}
                <p
                  className="text-center mt-3 mx-auto"
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.6,
                    maxWidth: "250px",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical ── */}
        <div className="sm:hidden relative mt-12">
          {/* Vertical line behind dots */}
          <motion.div
            className="absolute origin-top"
            style={{
              left: "15px",
              top: 0,
              bottom: "20px",
              width: "1px",
              background: "rgba(225,181,47,0.75)",
              zIndex: 1,
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
          />

          <div className="space-y-10">
            {milestones.map(({ label, duration, icon, description }, i) => (
              <motion.div
                key={label}
                className="flex items-start gap-6"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.4 + i * 0.15 }}
              >
                {/* Dot */}
                <div
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#E1B52F",
                    border: "3px solid rgba(255,255,255,0.85)",
                    boxShadow: "0 0 12px rgba(225,181,47,0.45)",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={icon} style={{ color: "#e9c400", fontSize: "1rem" }} />
                    <p className="text-white leading-snug" style={{ fontSize: "15px", fontWeight: 600 }}>{label}</p>
                  </div>
                  <p className="uppercase mb-0.5" style={{ fontSize: "10px", color: "rgba(253,249,240,0.45)", fontWeight: 600, letterSpacing: "0.12em" }}>Typical:</p>
                  <p className="mb-1" style={{ fontSize: "15px", fontWeight: 600, color: "#E1B52F" }}>{duration}</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(253,249,240,0.5)" }}>{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p
          className="text-center mt-9"
          style={{ fontSize: "12px", lineHeight: 1.5, color: "rgba(253,249,240,0.75)" }}
        >
          Timelines vary by city, property conditions, utility requirements, and permit review cycles.
        </p>

      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="pt-6 pb-6 md:pt-8 md:pb-8 bg-surface" id="services">
      <div className="container mx-auto px-8">

        {/* Header */}
        <FadeUp className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "#72787c" }}>
            Our Process
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#002b38" }}>
            A <span style={{ color: "#e9c400" }}>Clear Path</span> From Property Review To Completed ADU
          </h2>
        </FadeUp>

        {/* Milestone roadmap */}
        <ProjectTimeline />

        {/* Service list — clean icon + title rows (mobile only) */}
        <div className="md:hidden mb-10">
          <StaggerFadeUp className="flex flex-col gap-5">
            {services.map(({ icon, title, body }) => (
              <FadeUpItem key={title}>
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: "#ffffff", border: "1px solid #e6e2d9", borderLeft: "3px solid #e9c400" }}>
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(233,196,0,0.12)" }}
                  >
                    <Icon name={icon} style={{ color: "#e9c400", fontSize: "1.2rem" }} />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm leading-snug mb-1" style={{ color: "#002b38" }}>{title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </StaggerFadeUp>
        </div>

        {/* Service cards grid — 3 columns (desktop only) */}
        <div className="hidden md:block mb-10">
          <StaggerFadeUp className="grid grid-cols-3 gap-5">
            {services.map(({ icon, title, body }) => (
              <FadeUpItem key={title}>
                <motion.div
                  className="rounded-2xl p-6 h-full flex flex-col relative overflow-hidden"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e6e2d9",
                    borderLeft: "3px solid #e9c400",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 36px rgba(233,196,0,0.15)",
                    borderColor: "rgba(233,196,0,0.6)",
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                >
                  {/* Icon + Title inline */}
                  <div className="flex flex-row items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: "rgba(233,196,0,0.12)" }}
                    >
                      <Icon name={icon} style={{ color: "#e9c400", fontSize: "1.5rem" }} />
                    </div>
                    <h3 className="font-headline font-bold text-[1.05rem] leading-snug" style={{ color: "#002b38" }}>{title}</h3>
                  </div>
                  {/* Body */}
                  <p className="text-on-surface-variant text-sm leading-relaxed flex-1">{body}</p>
                </motion.div>
              </FadeUpItem>
            ))}
          </StaggerFadeUp>
        </div>

        {/* Brand quote */}
        <FadeUp className="max-w-3xl mx-auto text-center py-2 md:py-0">
          <GoldDivider />
          <p
            className="font-headline font-semibold italic leading-relaxed text-on-background my-3 md:my-8"
            style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
          >
            &ldquo;Our process isn&apos;t just about building a unit; it&apos;s about engineering an
            asset that produces returns for decades.&rdquo;
          </p>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3 md:mb-6">
            — The Clear Path ADU Promise
          </p>
          <div className="flex justify-center mb-3 md:mb-8">
            <Image
              src="/images/logo.png"
              alt="Clear Path ADU"
              width={140}
              height={42}
              style={{ width: "140px", height: "auto" }}
            />
          </div>
          <GoldDivider />
        </FadeUp>

      </div>
    </section>
  );
}

// ─── Success Outcome ──────────────────────────────────────────────────────────

function SuccessOutcome() {
  const outcomes = [
    {
      title: "Financial Freedom",
      body: "Passive rental income covering your primary mortgage payments.",
    },
    {
      title: "Equity Growth",
      body: "Significant increase in total property equity and resale value.",
    },
    {
      title: "Legacy Building",
      body: "A high-value asset for your family's future, for living or income.",
    },
  ];

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#002b38" }}>
      {/* Abstract floor plan geometry */}
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
      <div className="relative z-10 grid lg:grid-cols-2">

        {/* Left: headline + checklist */}
        <div className="flex flex-col justify-center gap-14 px-10 py-8 md:py-12 lg:px-16 xl:px-20">

          <FadeUp>
            <h2
              className="font-headline font-bold text-white leading-[1.15]"
              style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.25rem)" }}
            >
              What Life Can Look Like
              <br />
              After A{" "}
              <span style={{ color: "#e9c400" }}>Smart ADU Project</span>
            </h2>
          </FadeUp>

          <StaggerFadeUp>
            <ul className="space-y-10">
              {outcomes.map(({ title, body }) => (
                <FadeUpItem key={title}>
                  <li className="flex items-start gap-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(233,196,0,0.12)" }}
                    >
                      <Icon name="check_circle" style={{ color: "#e9c400", fontSize: "1.25rem" }} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-xl font-bold font-headline text-white leading-snug">{title}</h4>
                      <p className="text-[0.95rem] text-white/65 leading-relaxed">{body}</p>
                    </div>
                  </li>
                </FadeUpItem>
              ))}
            </ul>
          </StaggerFadeUp>

        </div>

        {/* Right: full-height image */}
        <FadeUp className="relative min-h-[520px] lg:min-h-[680px]">
          <Image
            src="/images/backyard-adu.png"
            alt="Finished backyard ADU"
            fill
            quality={100}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Left-edge fade into section bg */}
          <div
            className="absolute inset-y-0 left-0 w-16 pointer-events-none hidden lg:block"
            style={{ background: "linear-gradient(to left, transparent, #002b38)" }}
          />
          {/* Gold inset ring */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: "inset 0 0 0 1.5px rgba(233,196,0,0.25)" }}
          />
        </FadeUp>

      </div>
    </section>
  );
}

// ─── Failure / Stakes ─────────────────────────────────────────────────────────

const risks = [
  {
    num: "01",
    title: "Permit Rejections",
    body: "Spending months waiting only to be told your design violates a local setback rule. Your timeline resets to zero. Your contractor moves on.",
  },
  {
    num: "02",
    title: "Wasted Capital",
    body: "Thousands in architectural fees for \"dream plans\" that are physically impossible to build on your lot. Money gone. Nothing to show for it.",
  },
  {
    num: "03",
    title: "The Construction Nightmare",
    body: "Delays and cost overruns that turn a smart investment into a financial burden. What should have been $200k becomes $350k — and counting.",
  },
];

function FailureStakes() {
  return (
    <section className="pt-6 pb-6 md:pt-8 md:pb-8 bg-white">
      <div className="container mx-auto px-8">
        {/* Header */}
        <FadeUp className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="warning_amber" className="text-xl" style={{ color: "#e9c400" }} />
            <p
              className="text-sm font-bold uppercase tracking-[0.15em]"
              style={{ color: "#72787c" }}
            >
              Know The Risks
            </p>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#002b38" }}>
            The Cost Of Starting
            <br className="hidden md:block" />
            {" "}
            <span style={{ color: "#e9c400" }}>
              Without
              <br className="block md:hidden" />
              {" "}A Clear Path
            </span>
          </h2>
        </FadeUp>

        {/* Cards */}
        <StaggerFadeUp className="grid md:grid-cols-3 gap-6 mb-8">
          {risks.map(({ num, title, body }) => (
            <FadeUpItem key={num}>
              <motion.div
                className="rounded-xl p-7 h-full flex flex-col relative overflow-hidden"
                style={{
                  backgroundColor: "#fff8f0",
                  border: "1px solid #fde8d0",
                  borderLeft: "3px solid #f59e0b",
                  boxShadow: "0 2px 16px rgba(245,158,11,0.08)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 36px rgba(245,158,11,0.18)",
                  borderColor: "rgba(245,158,11,0.6)",
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
              >
                {/* Icon + Title inline */}
                <div className="flex flex-row items-center gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
                  >
                    <Icon name="warning_amber" style={{ color: "#f59e0b", fontSize: "1.8rem" }} />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-sm md:text-[1.05rem] leading-snug mb-1" style={{ color: "#002b38" }}>{title}</h3>
                    <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
                  </div>
                </div>

                {/* Body */}
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1">{body}</p>
              </motion.div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>

        {/* Closing statement */}
        <FadeUp>
          <div
            className="relative rounded-xl px-6 py-8 md:px-10 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-6 overflow-hidden"
            style={{ backgroundColor: "#002b38" }}
          >
            {/* Floor plan geometry */}
            <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
              <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="40" width="500" height="420" stroke="#e9c400" strokeWidth="1" strokeDasharray="8 6" opacity="0.12"/>
                <rect x="80" y="100" width="320" height="240" stroke="#e9c400" strokeWidth="1.5" opacity="0.1"/>
                <line x1="80" y1="220" x2="260" y2="220" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                <line x1="260" y1="100" x2="260" y2="340" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                <line x1="80" y1="300" x2="400" y2="300" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                <rect x="440" y="280" width="140" height="120" stroke="#e9c400" strokeWidth="1.5" opacity="0.1"/>
                <line x1="510" y1="265" x2="510" y2="278" stroke="#e9c400" strokeWidth="1" opacity="0.1"/>
                <line x1="660" y1="100" x2="680" y2="100" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                <line x1="660" y1="340" x2="680" y2="340" stroke="#e9c400" strokeWidth="1" opacity="0.08"/>
                <line x1="670" y1="100" x2="670" y2="340" stroke="#e9c400" strokeWidth="1" strokeDasharray="4 3" opacity="0.08"/>
                <rect x="820" y="60" width="340" height="380" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                <line x1="820" y1="200" x2="1160" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                <line x1="980" y1="60" x2="980" y2="440" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
              </svg>
            </div>
            <div className="flex items-start gap-5">
              <div
                className="self-stretch rounded-full flex-shrink-0"
                style={{
                  width: "2px",
                  backgroundColor: "rgba(233,196,0,0.7)",
                  minHeight: "60px",
                }}
              />
              <p
                className="font-headline text-xl md:text-2xl font-bold leading-snug"
                style={{ color: "#fdf9f0" }}
              >
                Don&apos;t leave your property&apos;s value to chance.{" "}
                <br className="hidden md:block" />
                Get expert guidance before you commit.
              </p>
            </div>
            <CtaButton className="px-6 py-4 text-sm md:px-10 md:py-5 md:text-lg whitespace-nowrap flex-shrink-0 w-full md:w-auto text-center">
              Check If My Property Qualifies
            </CtaButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Why Clear Path ADU ───────────────────────────────────────────────────────

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "How much does an ADU typically cost in California?",
    a: "Costs vary widely based on location, type, and finishes. Generally, detached ADUs range from $150,000 to $350,000+. Our Pre-Feasibility Report gives you a much narrower estimate based on your specific property.",
  },
  {
    q: "Do I need a large backyard?",
    a: "Not necessarily. California laws have changed to allow ADUs even on smaller lots. Junior ADUs (JADUs) can often be converted from garage space or existing rooms with very little impact on your yard.",
  },
  {
    q: "How long does the entire process take?",
    a: "The typical timeframe spans 6–10 months: 4 weeks for design, 60–90 days for city permitting, and 4–6 months for construction.",
  },
  {
    q: "What is a Pre-Feasibility Report?",
    a: "A Pre-Feasibility Report is a property-specific ADU planning report that helps you understand what your lot may support before you spend thousands on design, permits, or construction. It can include zoning details, a custom ADU proposal, estimated buildable size, preliminary site placement, cost breakdowns, timeline, utility red flags, income potential, and recommended next steps.",
  },
  {
    q: "What type of ADU is best for my property?",
    a: "The best ADU type depends on your lot size, existing structures, setbacks, access, utilities, budget, and income goals. Our Pre-Feasibility Report helps compare your options so you can see which path makes the most sense before spending money on plans, permits, or construction.",
  },
  {
    q: "Will I have to manage contractors and city departments myself?",
    a: "No. Clear Path ADU handles all contractor coordination, city submissions, and inspection scheduling on your behalf. You stay informed at every milestone without having to manage the details.",
  },
  {
    q: "What if my ADU doesn't generate rental income?",
    a: "Every project starts with a financial feasibility analysis. We only move forward when the numbers make sense for your specific property and goals — so you build with confidence, not guesswork.",
  },
  {
    q: "Do I need all the cash upfront to build an ADU?",
    a: "No. Many homeowners explore financing options such as home equity, renovation loans, construction financing, or ADU-specific lending programs. The first step is understanding what your property can support, what the project may cost, and whether the numbers make sense for your goals. Once that is clear, budget and financing options can be reviewed with more confidence.",
  },
];

function FAQ() {
  return <PremiumFAQ faqs={faqs} />;
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-10 md:py-16 text-white relative overflow-hidden" style={{ backgroundColor: "#002b38" }}>
      {/* Abstract floor plan geometry */}
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

      <div className="container mx-auto px-8 text-center max-w-4xl relative z-10">
        <FadeUp delay={0.05}>
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo.png"
              alt="Clear Path ADU"
              width={160}
              height={48}
              style={{ width: "160px", height: "auto" }}
            />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-8" style={{ color: "rgba(233,196,0,0.7)" }}>
            Get Started Today
          </p>
          <h2 className="font-headline text-5xl md:text-6xl font-extrabold mb-8 leading-tight text-white">
            Unlock The{" "}
            <span style={{ color: "#e9c400" }}>Hidden Income</span>
            {" "}Potential Of Your Property
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="text-lg md:text-xl mb-12 text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
            Clear Path ADU helps California homeowners build wealth through intelligent property
            development.
          </p>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <CtaButton className="px-10 py-4 text-base font-bold">
              Check If My Property Qualifies
            </CtaButton>
            <CtaButton className="hidden md:inline-flex px-10 py-4 text-base font-semibold">
              Speak To An Expert
            </CtaButton>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-tertiary pt-8 md:pt-24 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 px-8 max-w-7xl mx-auto mb-20">
        {/* Brand */}
        <div className="md:col-span-1">
          <Image
            src="/images/logo.png"
            alt="Clear Path ADU"
            width={160}
            height={48}
            className="mb-8"
            style={{ width: "160px", height: "auto" }}
          />
          <p className="text-secondary-fixed/60 text-sm leading-relaxed">
            Helping California homeowners navigate the complexities of ADU development to build
            long-term wealth.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="text-primary-fixed font-headline font-bold mb-8 uppercase tracking-widest text-sm">
            Navigation
          </h5>
          <div className="flex flex-col gap-4 text-secondary-fixed/70 font-medium">
            {[
              ["Process", "#process"],
              ["Pre-Feasibility", "/pre-feasibility"],
              ["FAQs", "#faq"],
              ["About", "#about"],
              ["Contact Us", "#contact"],
            ].map(([label, href]) => (
              <a key={label} href={href} className="hover:text-primary-fixed transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-primary-fixed font-headline font-bold mb-8 uppercase tracking-widest text-sm">
            Contact
          </h5>
          <div className="text-secondary-fixed/70 font-medium space-y-4">
            <p>
              123 California Real Estate Way
              <br />
              Los Angeles, CA 90210
            </p>
            <p>hello@clearpathadu.com</p>
            <p>(555) 000-0000</p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h5 className="text-primary-fixed font-headline font-bold mb-8 uppercase tracking-widest text-sm">
            Stay Updated
          </h5>
          <div className="flex gap-4">
            {["share", "camera", "mail"].map((icon) => (
              <button
                key={icon}
                className="w-10 h-10 rounded-full border border-surface/20 flex items-center justify-center text-secondary-fixed/50 hover:border-primary-fixed hover:text-primary-fixed cursor-pointer transition-all"
              >
                <Icon name={icon} className="text-xl" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-surface/10 pt-12 text-center text-secondary-fixed/30 text-xs tracking-widest uppercase">
        © 2025 CLEAR PATH ADU. Building Legacies, One Unit at a Time.
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="-mt-16">
        <Hero />
      </div>
      <TrustBar />
      <CustomerProblem />
      <GuideSection />
      <ThreeStepPlan />
      <KnowYourOptions />
      <PreFeasibility />
      <SuccessOutcome />
      <FailureStakes />
      <Services />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
