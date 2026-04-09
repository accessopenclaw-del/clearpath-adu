"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

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
      transition={{ duration: 1.2, ease: "easeOut", delay }}
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
    <motion.div variants={fadeUp} transition={{ duration: 1.2, ease: "easeOut" }} className={className}>
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
      <Icon name="star" className="text-base" style={{ color: "#ffd700" } } />
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

function NavBar() {
  return (
    <nav
      className="sticky top-0 w-full z-50 backdrop-blur-xl shadow-sm"
      style={{
        backgroundColor: "rgba(253,249,240,0.95)",
        borderBottom: "1px solid rgba(233,196,0,0.35)",
      }}
    >
      <div className="flex justify-between items-center px-8 py-2 max-w-7xl mx-auto">
        <a href="#" className="cursor-pointer" style={{ width: "25%", display: "block" }}>
          <Image
            src="/logo.png"
            alt="Clear Path ADU"
            width={200}
            height={60}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[
            ["Process", "#process"],
            ["Pre-Feasibility", "#pre-feasibility"],
            ["FAQs", "#faq"],
            ["About", "#about"],
            ["Contact Us", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-on-surface-variant hover:text-on-background font-semibold transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <CtaButton className="px-6 py-2.5">Get Started</CtaButton>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-tertiary-container overflow-hidden">
      {/* Video — right half */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-1/2 pointer-events-none"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <video
          autoPlay
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Text — left column */}
      <div className="relative z-10 py-16 pl-8 md:pl-16 pr-8 md:pr-12 w-full md:w-1/2">
        <h1
          className="font-headline font-extrabold text-surface leading-[1.1] tracking-tight"
          style={{
            fontSize: "clamp(2rem,3.5vw,3.25rem)",
            marginBottom: "1.25rem",
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          Turn Your Property Into Rental Income With a Clear Path to Building an ADU
        </h1>
        <p
          className="font-body text-secondary-fixed leading-relaxed"
          style={{
            fontSize: "clamp(1rem,1.5vw,1.15rem)",
            marginBottom: "0.75rem",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}
        >
          We help California homeowners unlock their property&apos;s full ADU potential and guide
          them from first question to finished unit.
        </p>
        <p
          className="font-medium"
          style={{
            color: "rgba(253,249,240,0.7)",
            fontSize: "0.95rem",
            marginBottom: "2rem",
            textShadow: "0 1px 6px rgba(0,0,0,0.5)",
          }}
        >
          Before you spend thousands on plans, get the clarity you need to move forward with
          confidence.
        </p>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "1rem" }}>
          <CtaButton className="px-10 py-5 text-lg">Check If My Property Qualifies</CtaButton>
          <CtaButton className="px-10 py-5 text-lg">Book a Consultation</CtaButton>
        </div>
      </div>
    </section>
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
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <span className="font-headline font-black text-lg" style={{ color: "#FFD700" }}>
            {Math.floor(adus)}+
          </span>
          <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
            ADUs Completed
          </span>
        </motion.div>

        <div className="hidden sm:block w-px h-5" style={{ backgroundColor: "rgba(255,215,0,0.35)" }} />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
          className="flex items-center gap-2"
        >
          <span className="font-headline font-black text-lg" style={{ color: "#FFD700" }}>
            {rating.toFixed(1)}★
          </span>
          <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
            Average Rating
          </span>
        </motion.div>

        <div className="hidden sm:block w-px h-5" style={{ backgroundColor: "rgba(255,215,0,0.35)" }} />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <span className="font-headline font-black text-lg" style={{ color: "#FFD700" }}>
            ${Math.floor(revenue)}M+
          </span>
          <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
            in ADU Projects Completed
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Customer Problem ─────────────────────────────────────────────────────────

function CustomerProblem() {
  return (
    <section className="py-32 bg-surface">
      <div className="container mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <FadeUp>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-background leading-tight mb-8">
                You May Be Sitting On Hidden Income and Equity — But The ADU Process Can Feel
                Confusing
              </h2>
            </FadeUp>
            <StaggerFadeUp className="space-y-6 mb-10">
              {[
                '"How much will it actually cost to build?"',
                '"What size unit does my lot legally allow?"',
                '"How do I manage contractors without getting overwhelmed?"',
              ].map((q) => (
                <FadeUpItem key={q} className="flex gap-4 items-start">
                  <Icon name="help" className="mt-1 flex-shrink-0" style={{ color: "#87ceeb" } } />
                  <p className="text-lg text-on-surface-variant font-medium italic">{q}</p>
                </FadeUpItem>
              ))}
            </StaggerFadeUp>
            <FadeUp>
              <p className="text-xl font-bold text-on-background border-l-4 border-primary-fixed pl-6">
                Building an ADU can be a smart move — but only if you start with the right strategy.
              </p>
            </FadeUp>
          </div>
          <div className="relative">
            <FadeUp>
              <Image
                src="/blueprint.jpg"
                alt="Complex zoning map"
                width={700}
                height={467}
                className="rounded-xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-surface-container-lowest p-6 rounded-xl shadow-xl max-w-xs hidden md:block border-l-4 border-primary-fixed">
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

function InternalProblem() {
  return (
    <section className="bg-surface-container-lowest" style={{ paddingTop: "5.5rem", paddingBottom: "5.5rem" }}>
      <div className="container mx-auto px-8 max-w-5xl">
        <FadeUp className="flex gap-10 items-center">
          <div
            className="flex-shrink-0 self-stretch rounded-full"
            style={{ width: "6px", backgroundColor: "#ffd700", minHeight: "100px" }}
          />
          <div>
            <h2
              className="font-headline font-extrabold text-on-background leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}
            >
              You Shouldn&apos;t Navigate This Alone
            </h2>
            <p className="text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              Your property is too valuable to risk on the wrong team. You deserve a partner who
              treats it like their own.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Guide Section ────────────────────────────────────────────────────────────

function GuideSection() {
  return (
    <section className="py-32 bg-tertiary-container text-surface">
      <div className="container mx-auto px-8">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-20 text-center">
              Clear Path ADU Is Here To Guide You
            </h2>
          </FadeUp>
          <StaggerFadeUp className="grid md:grid-cols-2 gap-16">
            {/* Card 1 */}
            <FadeUpItem className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center">
                  <Icon name="favorite" className="text-on-primary-fixed" />
                </div>
                <h3 className="text-2xl font-bold font-headline">Stress-Free Every Step</h3>
              </div>
              <p className="text-secondary-fixed text-lg leading-relaxed">
                We know the anxiety of starting a build. That&apos;s why we treat your property like
                our own, ensuring every square foot is optimized for value and your peace of mind.
              </p>
              <ul className="space-y-3 text-surface/80">
                <li className="flex items-center gap-2">
                  <Icon name="check_circle" className="text-primary-fixed text-sm" />
                  Homeowner-first approach
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check_circle" className="text-primary-fixed text-sm" />
                  Respect for your timeline and budget
                </li>
              </ul>
            </FadeUpItem>

            {/* Card 2 */}
            <FadeUpItem className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(74,222,128,0.2)" }}
                >
                  <Icon name="verified" style={{ color: "#4ade80" } } />
                </div>
                <h3 className="text-2xl font-bold font-headline">Results You Can Trust</h3>
              </div>
              <p className="text-secondary-fixed text-lg leading-relaxed">
                With years of California zoning expertise and a track record of successful
                completions, we move your project forward with technical precision.
              </p>
              <ul className="space-y-3 text-surface/80">
                <li className="flex items-center gap-2">
                  <Icon name="check_circle" className="text-sm" style={{ color: "#4ade80" } } />
                  Expert California Zoning Knowledge
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="check_circle" className="text-sm" style={{ color: "#4ade80" } } />
                  Proven Construction Oversight
                </li>
              </ul>
            </FadeUpItem>
          </StaggerFadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── 3-Step Plan ──────────────────────────────────────────────────────────────

function ThreeStepPlan() {
  const steps = [
    {
      num: "01",
      title: "Start With Clarity",
      body: "We run a comprehensive analysis of your property to determine exactly what can be built based on local laws.",
    },
    {
      num: "02",
      title: "Build The Right Strategy",
      body: "Design and financial modeling that aligns with your specific goals—whether it's rental income or family housing.",
    },
    {
      num: "03",
      title: "Permits And Construction",
      body: "From permit submittal to final inspection, we handle every step so your ADU gets built right and on time.",
    },
  ];

  return (
    <section className="py-32 bg-surface" id="process">
      <div className="container mx-auto px-8">
        <FadeUp>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-24 max-w-4xl mx-auto">
            A Simple 3-Step Plan To Move Forward With Confidence
          </h2>
        </FadeUp>
        <StaggerFadeUp className="grid md:grid-cols-3 gap-12">
          {steps.map(({ num, title, body }) => (
            <FadeUpItem key={num}>
              <div className="relative p-10 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">
                <div
                  className="text-6xl font-black absolute -top-4 left-10"
                  style={{ color: "#ffd700" }}
                >
                  {num}
                </div>
                <h3 className="text-2xl font-bold mb-6 mt-4 font-headline">{title}</h3>
                <p className="text-on-surface-variant text-lg">{body}</p>
              </div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>
      </div>
    </section>
  );
}

// ─── Pre-Feasibility Offer ────────────────────────────────────────────────────

function PreFeasibility() {
  const checkItems = [
    {
      label: "ADU Eligibility",
      detail: "Can you legally build on this lot based on your zoning?",
    },
    {
      label: "Maximum ADU Size",
      detail: "The exact square footage your city legally allows you to build",
    },
    {
      label: "Optimal Placement",
      detail: "The best yard location to maximize space and avoid restrictions",
    },
    {
      label: "Parking Requirements",
      detail: "The parking rules your city requires for ADU approval",
    },
    {
      label: "Multiple ADU Potential",
      detail: "Whether you can build both an ADU and JADU on your lot",
    },
    {
      label: "Utility & Trenching Access",
      detail: "Your utility connection points and any potential red flags",
    },
  ];

  return (
    <section className="py-32 px-8" id="pre-feasibility">
      <div className="max-w-6xl mx-auto bg-surface-container-lowest p-12 md:p-20 rounded-[3rem] border-2 border-primary-fixed shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <FadeUp className="flex flex-col py-6">
            <span
              className="inline-block text-xs font-black uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "#002b38", color: "#FFD700" }}
            >
              The ADU Pre-Feasibility Report
            </span>
            <h2 className="font-headline text-3xl md:text-5xl font-bold mb-4 text-on-background">
              Stop Guessing. Start Building With Confidence.
            </h2>
            <h3 className="text-xl font-bold text-secondary mb-8">
              Know Exactly What You Can Build Before Spending on Plans
            </h3>
            <div className="mt-auto pt-8">
              <CtaButton className="px-10 py-6 text-lg">Check If My Property Qualifies</CtaButton>
            </div>
          </FadeUp>

          {/* Right */}
          <div className="space-y-8">
            <div>
              <FadeUp>
                <h4 className="text-lg font-bold mb-4 text-on-background">What You&apos;ll Discover</h4>
              </FadeUp>
              <StaggerFadeUp>
                <ul className="space-y-3">
                  {checkItems.map(({ label, detail }) => (
                    <FadeUpItem key={label}>
                      <li className="flex items-start gap-3">
                        <Icon
                          name="check_circle"
                          className="text-sm mt-0.5 flex-shrink-0"
                          style={{ color: "#4ade80" } }
                        />
                        <p className="text-on-surface-variant">
                          <span className="font-semibold text-on-background">{label}</span> — {detail}
                        </p>
                      </li>
                    </FadeUpItem>
                  ))}
                </ul>
              </StaggerFadeUp>
            </div>
            <FadeUp>
              <div className="border-l-4 border-primary-fixed pl-5">
                <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                  Why It Matters
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  &ldquo;Most homeowners waste $10,000+ on architect plans the city rejects or
                  delays. This report gives you the rules of the game before you play — so every
                  dollar you spend moves you forward.&rdquo;
                </p>
              </div>
            </FadeUp>
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
    body: "Technical deep-dive into your site's physical and legal constraints.",
  },
  {
    icon: "account_balance_wallet",
    title: "Goal Review",
    body: "Alignment of ADU size and features with your long-term wealth strategy.",
  },
  {
    icon: "draw",
    title: "Architecture & Planning",
    body: "Designs that maximize livability and property value.",
  },
  {
    icon: "description",
    title: "Permit & Approvals",
    body: "Managing the heavy lifting of bureaucratic city submittals.",
  },
  {
    icon: "engineering",
    title: "Construction Management",
    body: "Qualified oversight to ensure build quality and schedule adherence.",
  },
  {
    icon: "trending_up",
    title: "ROI Maximization",
    body: "Strategic finishes and features that command top rental rates.",
  },
];

function Services() {
  return (
    <section className="py-32 bg-surface" id="services">
      <div className="container mx-auto px-8">
        <FadeUp>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-24 text-center text-on-background">
            A Fully Guided ADU Process Designed To Help You Maximize ROI
          </h2>
        </FadeUp>
        <StaggerFadeUp className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map(({ icon, title, body }) => (
            <FadeUpItem key={title} className="flex gap-6">
              <div className="w-14 h-14 shrink-0 bg-secondary-container rounded-xl flex items-center justify-center">
                <Icon name={icon} className="text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 font-headline">{title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{body}</p>
              </div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>

        {/* Brand statement */}
        <FadeUp className="max-w-3xl mx-auto text-center mt-24">
          <GoldDivider />
          <p
            className="font-headline font-semibold italic leading-relaxed text-on-background my-12"
            style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
          >
            &ldquo;Our process isn&apos;t just about building a unit; it&apos;s about engineering an
            asset that produces returns for decades.&rdquo;
          </p>
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
    <section className="py-32 bg-tertiary-container text-surface">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1">
            <FadeUp>
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-10">
                What Life Can Look Like After A Smart ADU Project
              </h2>
            </FadeUp>
            <StaggerFadeUp>
              <ul className="space-y-8">
                {outcomes.map(({ title, body }) => (
                  <FadeUpItem key={title}>
                    <li className="flex items-start gap-5">
                      <Icon name="check_circle" className="text-primary-fixed text-3xl flex-shrink-0" />
                      <div>
                        <h4 className="text-xl font-bold mb-1 font-headline">{title}</h4>
                        <p className="text-secondary-fixed/80">{body}</p>
                      </div>
                    </li>
                  </FadeUpItem>
                ))}
              </ul>
            </StaggerFadeUp>
          </div>
          <div className="flex-1">
            <FadeUp>
              <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-surface/10">
                <Image
                  src="/adu-exterior.jpg"
                  alt="Modern ADU exterior"
                  width={700}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeUp>
          </div>
        </div>
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
    <section className="py-32 bg-surface-container-low">
      <div className="container mx-auto px-8">
        {/* Header */}
        <FadeUp className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="warning_amber" className="text-xl" style={{ color: "#ffd700" } } />
            <p
              className="text-sm font-bold uppercase tracking-[0.15em]"
              style={{ color: "#416373" }}
            >
              Know The Risks
            </p>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-background leading-tight">
            What Happens If You
            <br />
            Start The Wrong Way
          </h2>
        </FadeUp>

        {/* Cards */}
        <StaggerFadeUp className="grid md:grid-cols-3 gap-6 mb-16">
          {risks.map(({ num, title, body }) => (
            <FadeUpItem key={num}>
              <div className="bg-white rounded-2xl p-10">
                <div className="flex items-center justify-between mb-8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255,215,0,0.15)" }}
                  >
                    <Icon name="warning_amber" style={{ color: "#ffd700" } } />
                  </div>
                  <span
                    className="font-headline text-5xl font-black"
                    style={{ color: "rgba(1,43,57,0.08)" }}
                  >
                    {num}
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4 text-on-background">{title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{body}</p>
              </div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>

        {/* Closing statement */}
        <FadeUp>
          <div
            className="rounded-xl px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            style={{ backgroundColor: "#002b38" }}
          >
            <div className="flex items-start gap-5">
              <div
                className="self-stretch rounded-full flex-shrink-0"
                style={{
                  width: "2px",
                  backgroundColor: "rgba(255,215,0,0.7)",
                  minHeight: "60px",
                }}
              />
              <p
                className="font-headline text-xl md:text-2xl font-bold leading-snug"
                style={{ color: "#fdf9f0" }}
              >
                Don&apos;t leave your property&apos;s value to chance.
                <br className="hidden md:block" />
                Get expert guidance before you commit.
              </p>
            </div>
            <CtaButton className="px-10 py-5 text-lg whitespace-nowrap flex-shrink-0">
              Check If My Property Qualifies
            </CtaButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Why Clear Path ADU ───────────────────────────────────────────────────────

const whyCards = [
  {
    icon: "shield",
    color: "#ffd700",
    bg: "rgba(255,215,0,0.12)",
    title: "Risk Reduction",
    body: "We find potential issues and red flags before you spend a dime on construction.",
  },
  {
    icon: "gavel",
    color: "#87ceeb",
    bg: "rgba(135,206,235,0.15)",
    title: "Expert Advocacy",
    body: "We speak the language of city planners and building inspectors so you don't have to.",
  },
  {
    icon: "trending_up",
    color: "#87ceeb",
    bg: "rgba(135,206,235,0.15)",
    title: "Value Maximization",
    body: "Every design decision is focused on your property's long-term bottom line.",
  },
  {
    icon: "visibility",
    color: "#ffd700",
    bg: "rgba(255,215,0,0.12)",
    title: "Full Transparency",
    body: "No hidden costs. No confusing jargon. Just a clear path to your finished ADU.",
  },
];

function WhyClearPath() {
  return (
    <section className="py-32 bg-surface-container-low">
      <div className="container mx-auto px-8">
        {/* Header */}
        <FadeUp className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="verified" className="text-xl" style={{ color: "#ffd700" } } />
            <p
              className="text-sm font-bold uppercase tracking-[0.15em]"
              style={{ color: "#416373" }}
            >
              Why Homeowners Choose Us
            </p>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-background leading-tight">
            Built on Trust.
            <br />
            Delivered With Clarity.
          </h2>
        </FadeUp>

        {/* 2×2 grid */}
        <StaggerFadeUp className="grid md:grid-cols-2 gap-6 mb-16">
          {whyCards.map(({ icon, color, bg, title, body }) => (
            <FadeUpItem key={title}>
              <div className="bg-white rounded-2xl p-10 flex gap-8 items-start hover:shadow-lg transition-shadow">
                <div
                  className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: bg }}
                >
                  <Icon
                    name={icon}
                    className="text-3xl"
                    style={{ color, fontSize: "2rem" } }
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-3 font-headline text-on-background">
                    {title}
                  </h4>
                  <p className="text-on-surface-variant leading-relaxed">{body}</p>
                </div>
              </div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>

        {/* Mission quote */}
        <FadeUp className="max-w-3xl mx-auto text-center pt-8">
          <GoldDivider />
          <p
            className="font-headline font-semibold italic leading-relaxed text-on-background my-12"
            style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}
          >
            &ldquo;We don&apos;t just build ADUs; we build financial security. Our approach combines
            legal expertise, architectural beauty, and financial responsibility.&rdquo;
          </p>
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant">
            — The Clear Path ADU Promise
          </p>
          <div className="mt-12">
            <GoldDivider />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

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
    a: "It's your starting point before spending anything on plans or permits. We analyze your property's zoning, setbacks, utility access, and size limits so you know exactly what you can build and what it will cost before committing a dollar.",
  },
  {
    q: "Will I have to manage contractors and city departments myself?",
    a: "No. Clear Path ADU handles all contractor coordination, city submissions, and inspection scheduling on your behalf. You stay informed at every milestone without having to manage the details.",
  },
  {
    q: "What if my ADU doesn't generate rental income?",
    a: "Every project starts with a financial feasibility analysis. We only move forward when the numbers make sense for your specific property and goals — so you build with confidence, not guesswork.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-surface scroll-mt-20" id="faq">
      <div className="container mx-auto px-8 max-w-3xl">
        <FadeUp>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-20 text-center text-on-background">
            Frequently Asked Questions
          </h2>
        </FadeUp>
        <StaggerFadeUp className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <FadeUpItem key={q}>
              <div
                className="bg-surface-container-low p-8 rounded-xl transition-all"
                style={
                  openIndex === i
                    ? { outline: "2px solid #ffe16d", outlineOffset: "0px" }
                    : undefined
                }
              >
                <button
                  className="flex items-center justify-between font-bold text-xl cursor-pointer w-full text-left gap-6"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span>{q}</span>
                  <Icon
                    name="expand_more"
                    className="flex-shrink-0 transition-transform"
                    style={
                      openIndex === i
                        ? { transform: "rotate(180deg)" }
                        : undefined
                    }
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={openIndex === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="mt-6 text-on-surface-variant leading-relaxed">{a}</p>
                </motion.div>
              </div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-32 bg-tertiary-container text-surface relative overflow-hidden">
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-primary-fixed opacity-5 rounded-full"
        style={{ margin: "-12rem -12rem 0 0" }}
      />
      <div className="container mx-auto px-8 text-center max-w-4xl relative z-10">
        <FadeUp>
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold mb-10 leading-tight">
            Unlock The Hidden Income Potential Of Your Property
          </h2>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="text-xl md:text-2xl mb-6 text-secondary-fixed font-medium">
            Clear Path ADU helps California homeowners build wealth through intelligent property
            development.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <CtaButton className="px-12 py-6 text-xl font-black">
              Check If My Property Qualifies
            </CtaButton>
            <CtaButton className="px-12 py-6 text-xl">Speak To An Expert</CtaButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-tertiary pt-24 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 px-8 max-w-7xl mx-auto mb-20">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="text-2xl font-black text-surface mb-8 tracking-tighter font-headline">
            CLEAR PATH ADU
          </div>
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
              ["Pre-Feasibility", "#pre-feasibility"],
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
      <Hero />
      <TrustBar />
      <CustomerProblem />
      <InternalProblem />
      <GuideSection />
      <ThreeStepPlan />
      <PreFeasibility />
      <Services />
      <SuccessOutcome />
      <FailureStakes />
      <WhyClearPath />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
