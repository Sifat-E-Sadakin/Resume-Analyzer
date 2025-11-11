import { Card } from "@/components/ui/card";
import { Upload, Brain, Palette, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Resume",
    description: "Simply drag and drop your resume in PDF or DOCX format. Your data stays private and secure.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    description: "Our GPT-4 powered AI analyzes your resume across multiple dimensions and generates detailed feedback.",
  },
  {
    number: "03",
    icon: Palette,
    title: "Generate Portfolio",
    description: "Choose from professional templates and customize your personal portfolio website with one click.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deploy & Share",
    description: "Export your improved resume and deploy your portfolio to showcase your professional brand.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-how-it-works-heading">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your resume and build your online presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-testid={`container-step-${index}`}>
              <Card className="p-6 h-full">
                <div className="text-6xl font-bold text-muted/20 mb-4">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid={`text-step-title-${index}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
