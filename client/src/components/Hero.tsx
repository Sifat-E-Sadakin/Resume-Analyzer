import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import dashboardMockup from "@assets/generated_images/Resume_analysis_dashboard_mockup_259aedf1.png";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span
                className="text-sm font-medium text-primary"
                data-testid="text-hero-badge"
              >
                Powered by GPT-4o
              </span>
            </div>

            <h1
              className="text-5xl lg:text-7xl font-bold leading-tight"
              data-testid="text-hero-heading"
            >
              Transform Your Resume with{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>

            <p
              className="text-xl text-muted-foreground leading-relaxed max-w-xl"
              data-testid="text-hero-subheading"
            >
              Get instant AI-powered feedback on your resume and automatically
              generate a professional portfolio website. Stand out in your job
              search with data-driven insights.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="px-8 py-6 text-base"
                data-testid="button-analyze-resume"
              >
                Analyze Your Resume
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base"
                data-testid="button-view-sample"
              >
                View Sample Analysis
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-3 rounded-full" />
                <span>Privacy-First</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-3 rounded-full" />
                <span>Free Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-3 rounded-full" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <img
                src={dashboardMockup}
                alt="Resume analysis dashboard preview"
                className="w-full h-auto"
                data-testid="img-hero-mockup"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-chart-2/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
