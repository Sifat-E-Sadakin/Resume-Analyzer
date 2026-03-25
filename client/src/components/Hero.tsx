import { Button } from "@/components/ui/button";
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

const rotatingWords = ["AI Intelligence", "Smart Insights", "Career Growth", "Portfolio Magic"];

function useRotatingText(words: string[], intervalMs = 3000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(timer);
  }, [words.length, intervalMs]);
  return words[index];
}

const floatingCards = [
  { icon: BarChart3, label: "ATS Score: 92%", color: "text-chart-1", delay: 0 },
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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-20 px-6"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px]"
          style={{ x: orbX, y: orbY }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-48 -right-32 w-[600px] h-[600px] rounded-full bg-chart-2/8 blur-[120px]"
          style={{ x: useTransform(orbX, (v) => -v), y: useTransform(orbY, (v) => -v) }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-chart-3/5 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium text-primary" data-testid="text-hero-badge">
                  Powered by GPT-4o
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chart-3 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-chart-3" />
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              data-testid="text-hero-heading"
              variants={fadeUp}
            >
              Transform Your
              <br />
              Resume with{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    className="bg-gradient-to-r from-primary via-chart-2 to-chart-5 bg-clip-text text-transparent bg-[length:200%_auto]"
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      backgroundPosition: ["0% center", "100% center"],
                    }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, backgroundPosition: { duration: 3, ease: "linear" } }}
                  >
                    {currentWord}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-chart-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl"
              data-testid="text-hero-subheading"
              variants={fadeUp}
            >
              Get instant AI-powered feedback on your resume and automatically generate a
              professional portfolio website. Stand out in your job search with data-driven insights.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" variants={fadeUp}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setIsHoveringCta(true)}
                onHoverEnd={() => setIsHoveringCta(false)}
              >
                <Button
                  size="lg"
                  className="relative px-8 py-6 text-base font-semibold overflow-hidden group"
                  data-testid="button-analyze-resume"
                  onClick={() => navigate("/upload")}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-chart-2 to-primary bg-[length:200%_100%] group-hover:animate-[shimmer_1.5s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Analyze Your Resume
                    <motion.span animate={{ x: isHoveringCta ? 4 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base font-semibold backdrop-blur-sm"
                  onClick={() => {
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground"
              variants={fadeUp}
            >
              {[
                { icon: Shield, text: "Privacy-First" },
                { icon: Zap, text: "Free Analysis" },
                { icon: CheckCircle2, text: "Instant Results" },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.08, color: "hsl(var(--primary))" }}
                >
                  <Icon className="w-4 h-4 text-chart-3" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-4 border-t border-border/50"
              variants={fadeUp}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right interactive area */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
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
              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl p-6 shadow-lg">
                {/* Mock header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Resume Analysis</div>
                    <div className="text-xs text-muted-foreground">john_doe_resume.pdf</div>
                  </div>
                  <motion.div
                    className="ml-auto px-3 py-1 rounded-full bg-chart-3/15 text-chart-3 text-xs font-semibold"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Live
                  </motion.div>
                </div>

                {/* Animated progress bar */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Overall Score</span>
                      <span className="font-semibold text-chart-3">92/100</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-chart-3 to-chart-1"
                        initial={{ width: "0%" }}
                        animate={{ width: "92%" }}
                        transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Skill bars */}
                  {[
                    { label: "ATS Compatibility", score: 88, color: "from-chart-1 to-primary" },
                    { label: "Keyword Optimization", score: 76, color: "from-chart-2 to-chart-5" },
                    { label: "Impact Statements", score: 95, color: "from-chart-3 to-chart-4" },
                  ].map((skill, i) => (
                    <div key={skill.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">{skill.label}</span>
                        <span className="font-medium">{skill.score}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${skill.score}%` }}
                          transition={{ delay: 1.6 + i * 0.3, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mock suggestions */}
                <div className="mt-5 space-y-2">
                  {[
                    "Add measurable achievements to experience",
                    "Include relevant industry keywords",
                  ].map((tip, i) => (
                    <motion.div
                      key={tip}
                      className="flex items-start gap-2 text-xs text-muted-foreground p-2 rounded-lg bg-muted/50"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.5 + i * 0.2 }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-chart-3 mt-0.5 shrink-0" />
                      <span>{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating cards */}
            {floatingCards.map((card, i) => {
              const positions = [
                { top: "2%", right: "-8%", rotate: 6 },
                { bottom: "8%", right: "-12%", rotate: -4 },
                { top: "18%", left: "-14%", rotate: -6 },
                { bottom: "22%", left: "-10%", rotate: 4 },
              ];
              const pos = positions[i];
              return (
                <motion.div
                  key={card.label}
                  className="absolute flex items-center gap-2 px-3 py-2 rounded-xl border border-border/60 bg-card/90 backdrop-blur-lg shadow-md text-xs font-medium"
                  style={pos}
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
                      duration: 3 + i * 0.5,
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
