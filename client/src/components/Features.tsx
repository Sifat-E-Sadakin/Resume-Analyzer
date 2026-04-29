import { motion } from "framer-motion";
import { Brain, Globe, TrendingUp, Zap, FileCheck, Code } from "lucide-react";

const features = [
  {
    icon: Brain,
    kicker: "01 · Review",
    title: "A close read, not a score-and-go",
    description:
      "GPT-4 reads your resume line-by-line for content, tone, and structure — and returns specific edits you can actually use.",
  },
  {
    icon: Globe,
    kicker: "02 · Portfolio",
    title: "A portfolio that reads like you",
    description:
      "Your resume becomes a responsive portfolio site — typography-first, calm, ready to share.",
  },
  {
    icon: TrendingUp,
    kicker: "03 · Direction",
    title: "Where to grow next",
    description:
      "Skill gaps called out, courses matched to them, framed against live job-market signal.",
  },
  {
    icon: Zap,
    kicker: "04 · Scoring",
    title: "Scores that explain themselves",
    description:
      "Five dimensions — skills, experience, formatting, impact, keywords — each with a reason and a fix.",
  },
  {
    icon: FileCheck,
    kicker: "05 · ATS",
    title: "Quietly ATS-aware",
    description:
      "We flag formatting and keywords that trip up tracking systems before a human ever sees the file.",
  },
  {
    icon: Code,
    kicker: "06 · Templates",
    title: "Six templates, one craft",
    description:
      "Minimal, editorial, technical — pick the one that fits the work, not the trend.",
  },
];

export default function Features() {
  return (
    <section className="py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-20">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
            — What you get
          </div>
          <h2
            className="font-serif font-normal text-foreground"
            style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            data-testid="text-features-heading"
          >
            Tools that read like a coach wrote them,
            <span className="italic text-primary"> not a checklist.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-[20px] overflow-hidden">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              className="group relative bg-card p-8 transition-colors duration-200 hover:bg-accent"
              data-testid={`card-feature-${index}`}
            >
              <div className="flex items-center justify-between mb-10">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-mono">
                  {feature.kicker}
                </span>
              </div>
              <h3
                className="font-serif font-normal mb-3 text-foreground"
                style={{ fontSize: "24px", lineHeight: 1.15, letterSpacing: "-0.01em" }}
                data-testid={`text-feature-title-${index}`}
              >
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-[15px]" style={{ lineHeight: 1.55 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
