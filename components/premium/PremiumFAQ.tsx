"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface PremiumFAQProps {
  faqs: FAQItem[];
}

// ─── Decorative gold star divider ────────────────────────────────────────────

function GoldStar({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 0 L9.2 6.2 L15.5 5 L10.8 9.5 L13.5 15.5 L8 12 L2.5 15.5 L5.2 9.5 L0.5 5 L6.8 6.2 Z"
        fill="#e9c400"
        opacity="0.8"
      />
    </svg>
  );
}

// ─── Single accordion item ────────────────────────────────────────────────────

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.07 }}
    >
      <motion.div
        animate={{
          backgroundColor: isOpen ? "#ffffff" : "var(--color-surface-container-low)",
          boxShadow: isOpen
            ? "0 12px 48px rgba(0,0,0,0.10), 0 0 0 1.5px rgba(233,196,0,0.55)"
            : "0 1px 4px rgba(0,0,0,0.05)",
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="rounded-2xl overflow-hidden"
      >
        <div className="flex">
          {/* Gold left accent bar */}
          <motion.div
            className="flex-shrink-0 w-[3px] self-stretch"
            animate={{
              background: isOpen
                ? "linear-gradient(180deg, #ffe16d, #e9c400, #b89a00)"
                : "transparent",
              opacity: isOpen ? 1 : 0,
            }}
            transition={{ duration: 0.35 }}
          />

          <div className="flex-1 px-7 py-6 md:px-9 md:py-7">
            <button
              className="flex items-start justify-between gap-5 w-full text-left cursor-pointer group"
              onClick={onToggle}
              aria-expanded={isOpen}
            >
              {/* Left: number badge + question */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Number badge */}
                <motion.div
                  className="relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mt-0.5"
                  animate={{
                    backgroundColor: isOpen ? "#e9c400" : "var(--color-surface-container)",
                    color: isOpen ? "#002b38" : "var(--color-on-surface-variant)",
                    scale: isOpen ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gold glow when open */}
                  {isOpen && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.6 }}
                      exit={{ opacity: 0 }}
                      style={{ backgroundColor: "rgba(233,196,0,0.18)" }}
                    />
                  )}
                  <span className="relative z-10">{String(index + 1).padStart(2, "0")}</span>
                </motion.div>

                {/* Question text */}
                <motion.span
                  className="font-bold text-base md:text-lg leading-snug"
                  animate={{ color: isOpen ? "#1c1c16" : "var(--color-on-background)" }}
                  transition={{ duration: 0.25 }}
                >
                  {item.q}
                </motion.span>
              </div>

              {/* Chevron toggle icon */}
              <motion.div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
                animate={{
                  backgroundColor: isOpen ? "#e9c400" : "var(--color-surface-container)",
                  rotate: isOpen ? 180 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ color: isOpen ? "#002b38" : "var(--color-on-surface-variant)" }}
                >
                  <path
                    d="M2 5L7 10L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </button>

            {/* Answer body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="pl-12 pt-4 pb-1">
                    {/* Gold shimmer line */}
                    <motion.div
                      className="h-px mb-4 rounded-full"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      style={{
                        background: "linear-gradient(90deg, #e9c400, rgba(233,196,0,0.15), transparent)",
                        transformOrigin: "left",
                      }}
                    />
                    <p className="text-on-surface-variant leading-relaxed text-[0.97rem]">
                      {item.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────

export function PremiumFAQ({ faqs }: PremiumFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="pt-16 pb-32 bg-surface scroll-mt-20" id="faq">
      <div className="container mx-auto px-8 max-w-3xl">
        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2.5 mb-6">
            <GoldStar size={12} />
            <span
              className="text-xs font-black uppercase tracking-[0.2em]"
              style={{ color: "#72787c" }}
            >
              Got Questions?
            </span>
            <GoldStar size={12} />
          </div>

          {/* Headline */}
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-background mb-5 leading-tight">
            Frequently Asked{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #b89a00, #e9c400, #ffe16d)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Questions
            </span>
          </h2>

          <p className="text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know before starting your ADU journey. Still have questions?{" "}
            <a
              href="#contact"
              className="font-semibold transition-colors"
              style={{ color: "#002b38" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#e9c400")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#002b38")}
            >
              We&apos;re here to help.
            </a>
          </p>
        </motion.div>

        {/* ── Gold divider ── */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(233,196,0,0.25)" }} />
          <GoldStar />
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(233,196,0,0.25)" }} />
        </motion.div>

        {/* ── Accordion list ── */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FAQAccordionItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* ── Bottom CTA teaser ── */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(0,43,56,0.04), rgba(233,196,0,0.06))",
              border: "1px solid rgba(233,196,0,0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(233,196,0,0.15)" }}
              >
                <span
                  className="material-symbols-outlined text-base"
                  style={{ color: "#e9c400" }}
                >
                  lightbulb
                </span>
              </div>
              <p className="text-sm font-semibold text-on-surface-variant">
                Not sure if your property qualifies?
              </p>
            </div>
            <a
              href="#pre-feasibility"
              className="text-sm font-black whitespace-nowrap px-5 py-2.5 rounded-full transition-all"
              style={{ backgroundColor: "#e9c400", color: "#002b38" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#ffe16d";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(233,196,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#e9c400";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Get Your Report
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
