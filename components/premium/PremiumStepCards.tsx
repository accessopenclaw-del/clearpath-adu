"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

interface PremiumStepCardsProps {
  steps: Step[];
  title: string;
  subtitle?: string;
}

export function PremiumStepCards({ steps, title, subtitle }: PremiumStepCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#fdf9f0] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e9c400]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#87ceeb]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-[#002b38]/10 text-[#002b38] text-sm font-semibold mb-6"
          >
            Simple Process
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#002b38] mb-4">{title}</h2>
          {subtitle && <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#e9c400] to-transparent" />
              )}

              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-100"
              >
                {/* Number Badge */}
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-6 left-8 w-14 h-14 bg-gradient-to-br from-[#e9c400] to-[#d4b000] rounded-xl flex items-center justify-center shadow-lg"
                >
                  <span className="text-2xl font-bold text-[#002b38]">{step.number}</span>
                </motion.div>

                {/* Content */}
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-[#002b38] mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Hover Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e9c400]/10 to-transparent pointer-events-none"
                />

                {/* Bottom Accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e9c400] to-[#87ceeb] rounded-b-2xl origin-left"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
