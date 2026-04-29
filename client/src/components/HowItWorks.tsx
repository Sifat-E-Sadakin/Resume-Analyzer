import { motion } from "framer-motion";
import { Upload, Brain, Palette, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Resume",
    description:
      "Simply drag and drop your resume in PDF or DOCX format. Your data stays private and secure.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our GPT-4 powered AI analyzes your resume across multiple dimensions and generates detailed feedback.",
  },
  {
    number: "03",
    icon: Palette,
    title: "Generate Portfolio",
    description:
      "Choose from professional templates and customize your personal portfolio website with one click.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deploy & Share",
    description:
      "Export your improved resume and deploy your portfolio to showcase your professional brand.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 px-6 bg-accent/40 border-y border-foreground/10">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl mb-20">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
            — The flow
          </div>
          <h2
            className="font-serif font-normal text-foreground"
            style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
            data-testid="text-how-it-works-heading"
          >
            Four quiet steps,
            <span className="italic text-primary"> from page to portfolio.</span>
          </h2>
        </div>

        <div className="divide-y divide-foreground/10 border-y border-foreground/10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              className="group grid grid-cols-[auto_1fr_auto] gap-6 md:gap-12 items-start py-10 md:py-14"
              data-testid={`container-step-${index}`}
            >
              <div
                className="font-serif text-foreground/20 group-hover:text-primary/80 transition-colors duration-300 leading-none"
                style={{ fontSize: "clamp(3.5rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}
              >
                {step.number}
              </div>
              <div className="pt-2 md:pt-4 max-w-xl">
                <h3
                  className="font-serif font-normal mb-3 text-foreground"
                  style={{ fontSize: "28px", lineHeight: 1.15, letterSpacing: "-0.01em" }}
                  data-testid={`text-step-title-${index}`}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-[16px]" style={{ lineHeight: 1.55 }}>
                  {step.description}
                </p>
              </div>
              <div className="hidden md:flex pt-4 w-14 h-14 rounded-full items-center justify-center border border-foreground/15 bg-background shrink-0">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
