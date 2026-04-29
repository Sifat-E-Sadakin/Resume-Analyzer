import {
  ArrowRight,
  Sparkles,
  FileText,
  BarChart3,
  Globe,
  CheckCircle2,
  Upload,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

const rotatingWords = ["a coach's eye.", "analytical precision.", "clarity.", "care."];

function useRotatingText(words: string[], intervalMs = 3000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(timer);
  }, [words.length, intervalMs]);
  return words[index];
}

const floatingCards = [
  { icon: BarChart3, label: "ATS Score · 92", color: "text-primary", delay: 0 },
  { icon: CheckCircle2, label: "Strong Keywords", color: "text-chart-3", delay: 0.8 },
  { icon: Globe, label: "Portfolio Ready", color: "text-chart-2", delay: 1.6 },
  { icon: TrendingUp, label: "Top 15%", color: "text-chart-4", delay: 2.4 },
];

const stats = [
  { value: 12000, suffix: "+", label: "Resumes Analyzed" },
  { value: 95, suffix: "%", label: "User Satisfaction" },
  { value: 30, suffix: "s", label: "Avg. Analysis Time" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const [, navigate] = useLocation();
  const currentWord = useRotatingText(rotatingWords);
  const [isHoveringCta, setIsHoveringCta] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const orbX = useTransform(mouseX, [0, 1], [-15, 15]);
  const orbY = useTransform(mouseY, [0, 1], [-15, 15]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    },
    [mouseX, mouseY]
  );

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24 px-6 bg-studio-paper"
      onMouseMove={handleMouseMove}
    >
      {/* Soft warm wash — calm, editorial */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/10 blur-[120px]"
          style={{ x: orbX, y: orbY }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-56 -right-40 w-[620px] h-[620px] rounded-full bg-chart-2/6 blur-[140px]"
          style={{ x: useTransform(orbX, (v) => -v), y: useTransform(orbY, (v) => -v) }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Paper grain: fine dot grid, low contrast */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        className="relative max-w-7xl mx-auto w-full z-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div variants={fadeUp}>
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-foreground/70" data-testid="text-hero-badge">
                  The Resume · Studio Edition
                </span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              className="font-serif font-normal tracking-tight text-foreground"
              style={{
                fontSize: "clamp(3rem, 6.4vw, 5.25rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
              data-testid="text-hero-heading"
              variants={fadeUp}
            >
              Your resume,
              <br />
              read with{" "}
              <span className="relative inline-block align-baseline">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    className="italic text-primary"
                    style={{ willChange: "opacity", display: "inline-block" }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {currentWord}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[2px] bg-primary/70"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl text-muted-foreground max-w-xl"
              style={{ lineHeight: 1.55 }}
              data-testid="text-hero-subheading"
              variants={fadeUp}
            >
              A careful, line-by-line review — then a portfolio that reads like it
              was written for you. Not a template with your name dropped in.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3 pt-2" variants={fadeUp}>
              <motion.button
                type="button"
                onHoverStart={() => setIsHoveringCta(true)}
                onHoverEnd={() => setIsHoveringCta(false)}
                onClick={() => navigate("/upload")}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -1 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 h-12 text-[15px] font-medium shadow-brand-sm hover:shadow-brand-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                data-testid="button-analyze-resume"
              >
                <Upload className="w-4 h-4" />
                <span>Analyze my resume</span>
                <motion.span
                  animate={{ x: isHoveringCta ? 4 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-flex"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -1 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent hover:bg-card text-foreground px-7 h-12 text-[15px] font-medium border border-foreground/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              >
                <Zap className="w-4 h-4" />
                <span>See how it works</span>
              </motion.button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-[13px] text-muted-foreground"
              variants={fadeUp}
            >
              {[
                { icon: Shield, text: "Private by default" },
                { icon: Zap, text: "Free analysis" },
                { icon: CheckCircle2, text: "Results in ~30s" },
              ].map(({ icon: Icon, text }, idx, arr) => (
                <div key={text} className="inline-flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span>{text}</span>
                  {idx < arr.length - 1 && <span className="text-foreground/20">·</span>}
                </div>
              ))}
            </motion.div>

            {/* Stats row — editorial rule */}
            <motion.div
              className="grid grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-16 pt-8 mt-2 border-t border-foreground/15"
              variants={fadeUp}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-left pt-6">
                  <div className="font-serif text-4xl lg:text-5xl leading-none text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground mt-3">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right interactive area */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center px-12 py-8"
            variants={fadeUp}
          >
            {/* Main card */}
            <motion.div
              className="relative w-full max-w-md"
              initial={{ rotateY: -8, rotateX: 5 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              style={{ perspective: 1000 }}
            >
              <div className="rounded-[28px] border border-foreground/15 bg-card p-7 shadow-brand-md">
                {/* Editorial header — file + live */}
                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-foreground/10">
                  <div className="w-11 h-11 rounded-full bg-primary/12 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-lg leading-tight text-foreground">Resume, reviewed</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5 font-mono">john_doe_resume.pdf</div>
                  </div>
                  <motion.div
                    className="px-2.5 py-1 rounded-full border border-primary/30 text-primary text-[10px] uppercase tracking-[0.14em] font-medium"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Live
                  </motion.div>
                </div>

                {/* Overall score — oversized serif numeral */}
                <div className="flex items-end justify-between mb-7">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Overall</div>
                    <div className="font-serif text-[64px] leading-none text-foreground mt-1">
                      92<span className="text-muted-foreground text-2xl align-top ml-1">/100</span>
                    </div>
                  </div>
                  <div className="text-right text-[12px] text-muted-foreground leading-tight max-w-[44%]">
                    Strong on impact &amp; structure.<br />
                    <span className="italic">A few keywords to tighten.</span>
                  </div>
                </div>

                {/* Dimension bars — ink rail, terracotta fill */}
                <div className="space-y-3.5">
                  {[
                    { label: "ATS compatibility", score: 88 },
                    { label: "Keyword coverage", score: 76 },
                    { label: "Impact statements", score: 95 },
                  ].map((skill, i) => (
                    <div key={skill.label}>
                      <div className="flex justify-between text-[12px] mb-1.5">
                        <span className="text-foreground/75">{skill.label}</span>
                        <span className="font-mono text-foreground">{skill.score}</span>
                      </div>
                      <div className="h-[3px] bg-foreground/10 overflow-hidden rounded-full">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${skill.score}%` }}
                          transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes — like a coach's margin comments */}
                <div className="mt-6 space-y-2.5">
                  {[
                    "Lead each bullet with measurable outcomes.",
                    "Weave in two missing terms: 'ETL', 'stakeholder'.",
                  ].map((tip, i) => (
                    <motion.div
                      key={tip}
                      className="flex items-start gap-2.5 text-[13px] text-foreground/80 pl-3 border-l-2 border-primary/40"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + i * 0.2 }}
                    >
                      <span className="italic font-serif">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating cards */}
            {floatingCards.map((card, i) => {
              const positions = [
                { top: "4%", right: "-4%", rotate: 6 },
                { bottom: "10%", right: "-6%", rotate: -4 },
                { top: "18%", left: "-6%", rotate: -6 },
                { bottom: "22%", left: "-4%", rotate: 4 },
              ];
              const pos = positions[i];
              return (
                <motion.div
                  key={card.label}
                  className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full border border-foreground/15 bg-card shadow-brand-sm text-[12px] font-medium"
                  style={{ ...pos, willChange: "transform" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0],
                  }}
                  transition={{
                    opacity: { delay: 1.5 + card.delay * 0.4, duration: 0.5 },
                    scale: { delay: 1.5 + card.delay * 0.4, duration: 0.5 },
                    y: {
                      delay: 2 + card.delay * 0.4,
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{ scale: 1.1, zIndex: 20 }}
                >
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                  <span>{card.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
