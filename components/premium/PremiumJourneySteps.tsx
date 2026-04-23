"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface JourneyStep {
  num: string;
  phase: string;
  title: string;
  body: string;
  outcomeIcon: string;
  outcome: string;
  isStart?: boolean;
}

const STEPS: JourneyStep[] = [
  {
    num: "01",
    phase: "Discovery",
    title: "Start With Clarity",
    body: "We run a comprehensive analysis of your property to determine exactly what can be built based on local laws.",
    outcomeIcon: "description",
    outcome: "Property Feasibility Report",
    isStart: true,
  },
  {
    num: "02",
    phase: "Strategy",
    title: "Build The Right Strategy",
    body: "Design and financial modeling that aligns with your specific goals—whether it's rental income or family housing.",
    outcomeIcon: "draw",
    outcome: "Custom Design & Plan",
  },
  {
    num: "03",
    phase: "Build",
    title: "Permits And Construction",
    body: "From permit submittal to final inspection, we handle every step so your ADU gets built right and on time.",
    outcomeIcon: "home",
    outcome: "Your Finished ADU",
  },
];

// ─── Connector between steps (desktop only) ───────────────────────────────────

function Connector({ isInView, delay }: { isInView: boolean; delay: number }) {
  return (
    <div className="hidden md:flex items-start flex-shrink-0 w-16 pt-[5.5rem]">
      <div className="flex items-center w-full">
        <motion.div
          className="flex-1 h-px origin-left"
          style={{ backgroundColor: "#c1c7cb" }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.55, delay, ease: "easeOut" }}
        />
        <motion.svg
          width="7"
          height="11"
          viewBox="0 0 7 11"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.45 }}
        >
          <path
            d="M1 1L6 5.5L1 10"
            stroke="#c1c7cb"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    </div>
  );
}

// ─── Single step card ─────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  isInView,
}: {
  step: JourneyStep;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="relative flex-1 flex flex-col min-w-0"
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.13, ease: "easeOut" }}
    >
      {/* "Start here" label — reserves space on all cards for alignment */}
      <div className="h-8 flex items-center mb-4">
        {step.isStart && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#e9c400" }}
            />
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "#41484b" }}
            >
              Start here
            </span>
          </motion.div>
        )}
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 flex flex-col bg-white rounded-2xl p-8 border"
        style={{
          borderColor: "#e6e2d9",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
        whileHover={{
          y: -4,
          boxShadow: "0 8px 28px rgba(0,0,0,0.09)",
          borderColor: "rgba(233,196,0,0.45)",
          transition: { duration: 0.25, ease: "easeOut" },
        }}
      >
        {/* Step number */}
        <div className="mb-5">
          <span
            className="font-headline font-black leading-none block"
            style={{ fontSize: "3.5rem", color: "#e9c400", lineHeight: 1 }}
          >
            {step.num}
          </span>
          {/* Gold underline accent — draws in */}
          <motion.div
            className="h-[2px] w-7 rounded-full mt-2.5 origin-left"
            style={{ backgroundColor: "#e9c400" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.13,
              ease: "easeOut",
            }}
          />
        </div>

        {/* Phase */}
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
          style={{ color: "#72787c" }}
        >
          {step.phase}
        </p>

        {/* Title */}
        <h3 className="font-headline text-xl font-bold text-on-background mb-4 leading-snug">
          {step.title}
        </h3>

        {/* Body */}
        <p className="text-on-surface-variant leading-relaxed text-sm flex-1 mb-7">
          {step.body}
        </p>

        {/* Outcome row */}
        <div
          className="flex items-center gap-2.5 pt-5 border-t"
          style={{ borderColor: "#ece8df" }}
        >
          <span
            className="material-symbols-outlined flex-shrink-0"
            style={{ fontSize: "1rem", color: "#e9c400" }}
          >
            {step.outcomeIcon}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: "#41484b" }}
          >
            {step.outcome}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function PremiumJourneySteps() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section id="process" className="py-16 md:py-32 bg-surface scroll-mt-20">
      <div ref={ref} className="container mx-auto px-8">

        {/* Header */}
        <motion.div
          className="mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5"
            style={{ color: "#72787c" }}
          >
            Our Process
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#002b38" }}>
            A Simple 3-Step Plan To Move Forward{" "}
            <span style={{ color: "#e9c400" }}>With Confidence</span>
          </h2>
        </motion.div>

        {/* Desktop: flex row with connectors */}
        <div className="hidden md:flex items-start gap-0 w-full">
          {STEPS.map((step, i) => (
            <div key={step.num} className="contents">
              <StepCard step={step} index={i} isInView={isInView} />
              {i < STEPS.length - 1 && (
                <Connector isInView={isInView} delay={0.35 + i * 0.15} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-5">
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} isInView={isInView} />
          ))}
        </div>

      </div>
    </section>
  );
}
