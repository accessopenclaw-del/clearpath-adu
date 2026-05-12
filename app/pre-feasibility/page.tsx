"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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

function StaggerFadeUp({ children, className }: { children: React.ReactNode; className?: string }) {
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

function FadeUpItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.65, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────

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

function CtaButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <button className={`cta-btn ${className}`}>{children}</button>;
}

// ─── Floor plan SVG ───────────────────────────────────────────────────────────

function FloorPlanSVG() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="40" y="40" width="500" height="420" stroke="#e9c400" strokeWidth="1" strokeDasharray="8 6" opacity="0.12" />
        <rect x="80" y="100" width="320" height="240" stroke="#e9c400" strokeWidth="1.5" opacity="0.1" />
        <line x1="80" y1="220" x2="260" y2="220" stroke="#e9c400" strokeWidth="1" opacity="0.08" />
        <line x1="260" y1="100" x2="260" y2="340" stroke="#e9c400" strokeWidth="1" opacity="0.08" />
        <line x1="80" y1="300" x2="400" y2="300" stroke="#e9c400" strokeWidth="1" opacity="0.08" />
        <rect x="440" y="280" width="140" height="120" stroke="#e9c400" strokeWidth="1.5" opacity="0.1" />
        <line x1="510" y1="265" x2="510" y2="278" stroke="#e9c400" strokeWidth="1" opacity="0.1" />
        <line x1="660" y1="100" x2="680" y2="100" stroke="#e9c400" strokeWidth="1" opacity="0.08" />
        <line x1="660" y1="340" x2="680" y2="340" stroke="#e9c400" strokeWidth="1" opacity="0.08" />
        <line x1="670" y1="100" x2="670" y2="340" stroke="#e9c400" strokeWidth="1" strokeDasharray="4 3" opacity="0.08" />
        <rect x="820" y="60" width="340" height="380" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="820" y1="200" x2="1160" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1="980" y1="60" x2="980" y2="440" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  ["Process", "/#process"],
  ["Pre-Feasibility", "/pre-feasibility"],
  ["FAQs", "/#faq"],
  ["About", "/#about"],
  ["Contact Us", "/#contact"],
] as const;

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50"
        style={{
          backgroundColor: "rgba(253,249,240,0.97)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          borderBottom: "1px solid rgba(233,196,0,0.3)",
          boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
        }}
      >
        <div className="flex items-center justify-between md:justify-start px-6 md:px-10 py-3 max-w-7xl mx-auto">
          <a href="/" className="cursor-pointer flex-shrink-0 w-[160px] md:w-[clamp(130px,18%,200px)]">
            <Image
              src="/images/logo.png"
              alt="Clear Path ADU"
              width={200}
              height={60}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </a>
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-10 flex-1 px-8">
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="relative group font-semibold text-[15px] text-on-surface-variant hover:text-on-background transition-colors duration-200"
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out rounded-full"
                  style={{ backgroundColor: "#e9c400" }}
                />
              </a>
            ))}
          </div>
          <div className="hidden md:block flex-shrink-0">
            <CtaButton className="px-5 py-2.5 text-sm whitespace-nowrap">
              Get My Clarity Report — $495
            </CtaButton>
          </div>
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg"
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
                Get My Clarity Report — $495
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </motion.nav>
      <div className="h-[64px]" />
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-tertiary pt-8 md:pt-24 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 px-8 max-w-7xl mx-auto mb-20">
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
            Helping California homeowners navigate the complexities of ADU development to build long-term wealth.
          </p>
        </div>
        <div>
          <h5 className="text-primary-fixed font-headline font-bold mb-8 uppercase tracking-widest text-sm">
            Navigation
          </h5>
          <div className="flex flex-col gap-4 text-secondary-fixed/70 font-medium">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} className="hover:text-primary-fixed transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
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

// ─── PDF Document Mockup ──────────────────────────────────────────────────────

function PDFMockup() {
  return (
    <div className="relative mx-auto select-none w-full">
      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          border: "1px solid #e6e2d9",
        }}
      >
        <Image
          src="/images/adu-report-mockup.png"
          alt="ADU Pre-Feasibility Report"
          width={800}
          height={1040}
          className="w-full h-auto block"
        />
      </div>
    </div>
  );
}

// ─── Payment Icons ────────────────────────────────────────────────────────────

function PaymentIcons() {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {/* VISA */}
      <div
        className="flex items-center justify-center px-3 py-1.5 rounded-md"
        style={{ backgroundColor: "#1a1f71", minWidth: "52px", height: "30px" }}
      >
        <span className="font-black italic text-white tracking-tighter" style={{ fontSize: "13px" }}>
          VISA
        </span>
      </div>
      {/* Mastercard */}
      <div
        className="flex items-center justify-center px-2 rounded-md"
        style={{ backgroundColor: "#f3f4f6", height: "30px" }}
      >
        <div className="flex items-center">
          <div
            className="w-5 h-5 rounded-full"
            style={{ backgroundColor: "#EB001B" }}
          />
          <div
            className="w-5 h-5 rounded-full -ml-2.5"
            style={{ backgroundColor: "#F79E1B", opacity: 0.92 }}
          />
        </div>
      </div>
      {/* AMEX */}
      <div
        className="flex items-center justify-center px-3 py-1.5 rounded-md"
        style={{ backgroundColor: "#2E77BC", minWidth: "52px", height: "30px" }}
      >
        <span className="font-black text-white tracking-tight" style={{ fontSize: "11px" }}>
          AMEX
        </span>
      </div>
      {/* Apple Pay */}
      <div
        className="flex items-center justify-center px-3 py-1.5 rounded-md"
        style={{ backgroundColor: "#000000", minWidth: "72px", height: "30px" }}
      >
        <span className="font-semibold text-white" style={{ fontSize: "12px" }}>
           Pay
        </span>
      </div>
    </div>
  );
}

// ─── Checkout Card (right sticky column) ─────────────────────────────────────

const checklistItems = [
  "ADU eligibility assessment ($497 value)",
  "Maximum buildable size estimate",
  "Zoning & property review",
  "Parking requirement check",
  "Utility & trenching red flag review",
  "Multiple ADU potential review",
  "Preliminary site map concept",
  "15-minute expert report review call ($397 value)",
  "On-site property walkthrough ($697 value)",
  "Site-specific property analysis",
  "Custom approval strategy guidance",
  "Next-step roadmap and action plan",
  "PDF report emailed directly to your inbox",
];

function CheckoutCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: "2px solid rgba(233,196,0,0.55)",
        boxShadow: "0 12px 48px rgba(0,0,0,0.1), 0 0 0 4px rgba(233,196,0,0.07)",
      }}
    >
      {/* Gold gradient top bar */}
      <div
        className="h-1.5"
        style={{
          background: "linear-gradient(90deg, #b89a00, #e9c400, #ffe16d, #e9c400, #b89a00)",
        }}
      />

      <div className="p-6 md:p-8 bg-white">
        {/* Eyebrow */}
        <p
          className="text-[10px] font-black uppercase tracking-[0.24em] mb-3"
          style={{ color: "#72787c" }}
        >
          ADU Complete Clarity Package
        </p>

        {/* Headline */}
        <h1
          className="font-headline font-bold leading-tight mb-4"
          style={{ fontSize: "clamp(1.25rem,2.5vw,1.5rem)", color: "#002b38" }}
        >
          Get Total Clarity On Your Property&apos;s ADU Potential
        </h1>

        {/* Avatars + star rating */}
        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center gap-3">
            {/* Overlapping avatar stack */}
            <div className="flex items-center flex-shrink-0">
              {[
                "https://randomuser.me/api/portraits/women/44.jpg",
                "https://randomuser.me/api/portraits/men/32.jpg",
                "https://randomuser.me/api/portraits/women/68.jpg",
                "https://randomuser.me/api/portraits/men/75.jpg",
                "https://randomuser.me/api/portraits/women/90.jpg",
              ].map((src, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    marginLeft: i === 0 ? 0 : "-10px",
                    border: "2px solid #ffffff",
                    zIndex: i,
                    position: "relative",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="Customer" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Stars + numeric rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#e9c400", fontSize: "0.875rem" }}>
                    ★
                  </span>
                ))}
              </div>
              <span className="font-black text-sm" style={{ color: "#002b38" }}>
                4.9
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs font-medium" style={{ color: "#72787c" }}>
            Loved by California homeowners
          </p>
        </div>

        {/* Divider */}
        <div className="h-px mb-5" style={{ backgroundColor: "#f0ece3" }} />

        {/* Price */}
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: "#e9c400" }}>
            One-Time Investment
          </p>
          <div className="flex items-end gap-4 mb-2">
            <span
              className="font-headline font-black leading-none"
              style={{ fontSize: "clamp(3rem,5vw,3.75rem)", color: "#002b38" }}
            >
              $495
            </span>
            <div className="pb-1">
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span
                  className="font-bold line-through"
                  style={{ fontSize: "1.2rem", color: "#9ca3af", textDecorationColor: "#6b7280", textDecorationThickness: "2px" }}
                >
                  $1,688
                </span>
                <span className="text-sm font-medium" style={{ color: "#9ca3af" }}>
                  total value
                </span>
              </div>
              <p className="text-xs font-black" style={{ color: "#16a34a" }}>
                ✓ You save $1,193
              </p>
            </div>
          </div>
        </div>

        {/* Gold divider + checklist header */}
        <div className="h-px mb-5" style={{ background: "linear-gradient(90deg, #e9c400, rgba(233,196,0,0.2), transparent)" }} />
        <p className="font-headline font-bold text-sm mb-4" style={{ color: "#002b38" }}>
          Everything You Need To Build With Confidence
        </p>

        {/* Checklist */}
        <div className="flex flex-col gap-2 mb-6">
          {/* Core items 1–12 */}
          {checklistItems.slice(0, 11).map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <Icon
                name="check_circle"
                style={{ color: "#e9c400", fontSize: "1rem", flexShrink: 0, marginTop: "1px" }}
              />
              <span className="text-sm leading-snug" style={{ color: "#41484b" }}>
                {item}
              </span>
            </div>
          ))}

          {/* Bonus divider + badge */}
          <div className="h-px my-3" style={{ backgroundColor: "rgba(233,196,0,0.4)" }} />
          <div className="flex items-center mb-2">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.18em]"
              style={{ backgroundColor: "#e9c400", color: "#002b38" }}
            >
              ★ Also Included — Bonus
            </span>
          </div>

          {/* Bonus items 13–14 */}
          {checklistItems.slice(11).map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 rounded-lg px-3 py-2.5"
              style={{
                backgroundColor: "rgba(233,196,0,0.15)",
                borderLeft: "3px solid #e9c400",
              }}
            >
              <Icon
                name="check_circle"
                style={{ color: "#e9c400", fontSize: "1rem", flexShrink: 0, marginTop: "1px" }}
              />
              <span className="text-sm font-bold leading-snug" style={{ color: "#002b38" }}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <CtaButton className="w-full py-4 text-base font-bold mb-4">
          Get My ADU Clarity Report — $495
        </CtaButton>

        {/* Trust badges */}
        <div
          className="flex items-center justify-center gap-3 md:gap-4 text-xs flex-wrap mb-5"
          style={{ color: "#72787c" }}
        >
          <span className="flex items-center gap-1">
            <span>🔒</span> Secure Checkout
          </span>
          <span className="text-on-surface-variant/30">·</span>
          <span className="flex items-center gap-1">
            <span>✅</span> 100% Clarity Guarantee
          </span>
        </div>

        {/* Divider */}
        <div className="h-px mb-4" style={{ backgroundColor: "#f0ece3" }} />

        {/* Payment icons */}
        <PaymentIcons />
      </div>
    </div>
  );
}

// ─── Above the fold: Product Hero ─────────────────────────────────────────────

function ProductHero() {
  return (
    <section className="pt-24 pb-12 md:pt-28 md:pb-16" style={{ backgroundColor: "#fdf9f0" }}>
      <div className="container mx-auto px-6 lg:px-10 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_460px] gap-12 xl:gap-16 items-start">

          {/* LEFT: PDF mockup + social proof */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <PDFMockup />

          </motion.div>

          {/* RIGHT: Sticky checkout card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-1 lg:order-2 lg:sticky lg:top-[84px]"
          >
            <CheckoutCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── The $50,000 Mistake ──────────────────────────────────────────────────────

const painPoints = [
  {
    icon: "money_off",
    title: "Architects Can't Save You From Bad Data",
    body: "Thousands of homeowners pay $10,000–$20,000 for architectural drawings — only to have the city reject them over a setback violation or easement they never checked.",
  },
  {
    icon: "gavel",
    title: "City Rules Change. Most Homeowners Don't Know.",
    body: "California ADU law evolves constantly. What was allowed last year may be denied today. Starting without a current, property-specific analysis is a gamble you can't afford.",
  },
  {
    icon: "warning_amber",
    title: "One Hidden Restriction Can Derail Everything",
    body: "A single utility easement, fire-access setback, or lot-coverage limit can make your entire plan unworkable — after you've already paid for it.",
  },
];

function TheProblem() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#fdf9f0" }}>
      <div className="container mx-auto px-8 max-w-5xl">
        <FadeUp className="text-center mb-14">
          <p
            className="text-[11px] font-black uppercase tracking-[0.22em] mb-5"
            style={{ color: "#72787c" }}
          >
            The $50,000 Mistake
          </p>
          <h2
            className="font-headline font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem,4vw,3rem)", color: "#002b38" }}
          >
            Most Homeowners Start The Wrong Way —{" "}
            <span style={{ color: "#e9c400" }}>And Pay For It</span>
          </h2>
          <p
            className="text-on-surface-variant leading-relaxed mx-auto text-lg max-w-2xl"
          >
            Jumping straight into design and construction without property-specific answers is the most
            expensive mistake in ADU development. Here&apos;s what goes wrong.
          </p>
        </FadeUp>

        <StaggerFadeUp className="grid md:grid-cols-3 gap-5 mb-14">
          {painPoints.map(({ icon, title, body }) => (
            <FadeUpItem key={title}>
              <motion.div
                className="rounded-2xl p-6 h-full flex flex-col"
                style={{
                  backgroundColor: "#fff8f0",
                  border: "1px solid #fde8d0",
                  borderLeft: "3px solid #f59e0b",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 10px 32px rgba(245,158,11,0.12)",
                  transition: { duration: 0.22 },
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
                >
                  <Icon name={icon} style={{ color: "#f59e0b", fontSize: "1.4rem" }} />
                </div>
                <h3 className="font-headline font-bold text-base mb-2" style={{ color: "#002b38" }}>
                  {title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1">{body}</p>
              </motion.div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>

        {/* Bridge into next section */}
        <FadeUp className="text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{
              backgroundColor: "rgba(233,196,0,0.08)",
              border: "1px solid rgba(233,196,0,0.25)",
            }}
          >
            <Icon name="arrow_downward" style={{ color: "#e9c400", fontSize: "1.2rem" }} />
            <p className="font-semibold text-sm md:text-base" style={{ color: "#002b38" }}>
              The fix is simple: know what you&apos;re working with{" "}
              <em>before</em> you spend a dollar on design.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}


// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "I was about to pay an architect $8k. This report showed me a setback issue that made my original plan impossible. It saved me a fortune in redesign fees.",
    name: "Zara Bush",
    role: "First Time Homeowner",
  },
  {
    quote:
      "I waited weeks for a call from the city. I got this report in 24–48 hours. The property-specific details were exactly what I needed to move forward.",
    name: "Ashwin Santiago",
    role: "Residential Homeowner",
  },
  {
    quote:
      "I didn't know I could build two units under the new rules. This report surfaced that opportunity. My rental potential just doubled.",
    name: "Kaden Scott",
    role: "First Time Homeowner",
  },
  {
    quote:
      "ADU rules are a nightmare. This report turned the legal jargon into a simple map of my yard. Total clarity for the first time.",
    name: "Elsie Roy",
    role: "Residential Homeowner",
  },
  {
    quote:
      "The expert review call was worth every penny. Talking to a real specialist confirmed the report and gave me the confidence to hire a builder.",
    name: "Maria Gonzalez",
    role: "Residential Homeowner",
  },
  {
    quote:
      "My builder was impressed I already had this. Design started with facts, not guesses. If you're building in California, this is the first step.",
    name: "Rebecca Lee",
    role: "Residential Homeowner",
  },
];

function Testimonials() {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "#002b38" }}
    >
      <FloorPlanSVG />
      <div className="relative z-10 container mx-auto px-8 max-w-6xl">
        <FadeUp className="text-center mb-14">
          <p
            className="text-[11px] font-black uppercase tracking-[0.22em] mb-5"
            style={{ color: "rgba(233,196,0,0.7)" }}
          >
            Real Homeowners. Real Results.
          </p>
          <h2
            className="font-headline font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(1.8rem,4vw,2.75rem)", color: "#ffffff" }}
          >
            See What Happens When You{" "}
            <span style={{ color: "#e9c400" }}>Start With Clarity</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Over 100 California homeowners have used this report to move forward with confidence.
          </p>
        </FadeUp>

        <StaggerFadeUp className="grid md:grid-cols-3 gap-5 mb-14">
          {testimonials.map(({ quote, name, role }) => (
            <FadeUpItem key={name}>
              <motion.div
                className="rounded-2xl p-6 flex flex-col h-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(233,196,0,0.15)",
                }}
                whileHover={{
                  y: -3,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderColor: "rgba(233,196,0,0.3)",
                  transition: { duration: 0.22 },
                }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#e9c400", fontSize: "1rem" }}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed flex-1 mb-5 italic">
                  &ldquo;{quote}&rdquo;
                </p>
                <div
                  className="flex items-center gap-3 pt-4 border-t"
                  style={{ borderColor: "rgba(233,196,0,0.15)" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-black text-sm"
                    style={{ backgroundColor: "#e9c400", color: "#002b38" }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-white/45 text-xs">{role}</p>
                  </div>
                </div>
              </motion.div>
            </FadeUpItem>
          ))}
        </StaggerFadeUp>

        <FadeUp className="text-center">
          <p className="text-white/40 text-sm mb-5">
            Join hundreds of California homeowners who moved forward with confidence.
          </p>
          <CtaButton className="px-8 py-4 text-base font-bold">
            Get My ADU Clarity Report — $495
          </CtaButton>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Final Close ──────────────────────────────────────────────────────────────

function FinalClose() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ backgroundColor: "#fdf9f0" }}
    >
      <div className="relative z-10 container mx-auto px-8 max-w-3xl text-center">
        <FadeUp>
          {/* Urgency pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
            style={{ backgroundColor: "#e9c400" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
              style={{ backgroundColor: "#002b38" }}
            />
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: "#002b38" }}
            >
              Weekly on-site walkthrough slots are limited.
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-headline font-bold leading-tight mb-5"
            style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)", color: "#002b38" }}
          >
            Stop Guessing.
            <br />
            <span style={{ color: "#e9c400" }}>Start Building.</span>
            <br />
            Know What You Can Build{" "}
            <span style={{ color: "#e9c400" }}>Before You Spend Thousands.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#002b38" }}>
            Get complete, property-specific clarity on your lot — so you can move forward
            without fear, without surprises, and without wasted money.
          </p>

          {/* CTA */}
          <div className="flex justify-center mb-10">
            <CtaButton className="px-10 py-5 text-lg font-bold">
              Get My ADU Clarity Report — $495
            </CtaButton>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs mb-10" style={{ color: "#002b38" }}>
            {[
              { icon: "verified", label: "100% Clarity Guarantee" },
              { icon: "picture_as_pdf", label: "Professional PDF" },
              { icon: "lock", label: "No Commitment Required" },
            ].map(({ icon, label }, i, arr) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon name={icon} style={{ fontSize: "0.9rem", color: "rgba(233,196,0,0.8)" }} />
                <span>{label}</span>
                {i < arr.length - 1 && (
                  <span className="ml-6" style={{ color: "rgba(0,43,56,0.2)" }}>·</span>
                )}
              </div>
            ))}
          </div>

          {/* Guarantee reminder bar */}
          <div
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl"
            style={{
              backgroundColor: "rgba(233,196,0,0.15)",
              border: "1px solid rgba(233,196,0,0.4)",
            }}
          >
            <Icon name="verified" style={{ color: "#e9c400", fontSize: "1.2rem" }} />
            <span className="text-sm font-semibold" style={{ color: "#002b38" }}>
              100% Clarity Guarantee — We&apos;ll review again at no cost if you need more clarity.
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PreFeasibilityPage() {
  return (
    <>
      <NavBar />
      <ProductHero />
      <TheProblem />
      <Testimonials />
      <FinalClose />
      <Footer />
    </>
  );
}
