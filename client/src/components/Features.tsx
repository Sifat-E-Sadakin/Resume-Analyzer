import { Card } from "@/components/ui/card";
import { Brain, Globe, TrendingUp, Zap, FileCheck, Code } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Resume Analysis",
    description: "Advanced GPT-4 powered analysis evaluates your resume's content, tone, and structure with actionable feedback.",
  },
  {
    icon: Globe,
    title: "Instant Portfolio Generation",
    description: "Automatically transform your resume into a beautiful, responsive portfolio website ready to deploy.",
  },
  {
    icon: TrendingUp,
    title: "Career Insights & Matching",
    description: "Identify skill gaps and get personalized recommendations to align with current job market trends.",
  },
  {
    icon: Zap,
    title: "Real-time Scoring",
    description: "Get instant scores across multiple dimensions including skills, experience, formatting, and impact.",
  },
  {
    icon: FileCheck,
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with formatting and keyword suggestions.",
  },
  {
    icon: Code,
    title: "Customizable Templates",
    description: "Choose from professional, creative, or technical portfolio templates that match your style.",
  },
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-features-heading">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI-driven tools to enhance your job search and professional presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover-elevate transition-all"
              data-testid={`card-feature-${index}`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2" data-testid={`text-feature-title-${index}`}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
