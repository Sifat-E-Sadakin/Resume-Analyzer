import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScoreCard from "./ScoreCard";
import { Award, FileText, Target, Zap, TrendingUp, AlertCircle, CheckCircle2, Download, Globe } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const skills = {
  present: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
  missing: ["TypeScript", "Docker", "AWS", "GraphQL", "Redis"],
};

const feedback = [
  {
    section: "Experience Section",
    score: 75,
    points: [
      { type: "success", text: "Strong action verbs used throughout" },
      { type: "success", text: "Quantifiable achievements included" },
      { type: "warning", text: "Consider adding more metrics to recent roles" },
      { type: "warning", text: "Some bullet points could be more concise" },
    ],
    suggestions: [
      "Add percentage improvements or specific numbers to your latest position",
      "Use the STAR method (Situation, Task, Action, Result) for complex achievements",
    ],
  },
  {
    section: "Skills Section",
    score: 85,
    points: [
      { type: "success", text: "Good variety of technical and soft skills" },
      { type: "success", text: "Skills are relevant to target roles" },
      { type: "warning", text: "Missing some trending technologies" },
    ],
    suggestions: [
      "Consider adding: TypeScript, Docker, AWS to align with current market trends",
      "Group skills by category (e.g., Frontend, Backend, Tools)",
    ],
  },
  {
    section: "Formatting & ATS",
    score: 90,
    points: [
      { type: "success", text: "Clean, professional layout" },
      { type: "success", text: "ATS-friendly formatting" },
      { type: "success", text: "Consistent use of fonts and spacing" },
    ],
    suggestions: [
      "Perfect! Your resume is well-formatted for both human readers and ATS systems",
    ],
  },
];

export default function AnalysisDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-dashboard-heading">
            Resume Analysis Results
          </h1>
          <p className="text-muted-foreground">
            Comprehensive AI-powered evaluation of your resume
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" data-testid="button-download-report">
            <Download className="mr-2 w-4 h-4" />
            Download Report
          </Button>
          <Button data-testid="button-generate-portfolio">
            <Globe className="mr-2 w-4 h-4" />
            Generate Portfolio
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard title="Overall Score" score={85} icon={Award} description="Strong resume quality" />
        <ScoreCard title="Content" score={72} icon={FileText} description="Good but improvable" />
        <ScoreCard title="Skills Match" score={90} icon={Target} description="Excellent alignment" />
        <ScoreCard title="Impact" score={78} icon={Zap} description="Above average" />
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" data-testid="text-skills-gap-heading">
          <TrendingUp className="w-5 h-5 text-primary" />
          Skills Gap Analysis
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.present.map((skill, idx) => (
                <Badge key={idx} variant="secondary" data-testid={`badge-skill-present-${idx}`}>
                  <CheckCircle2 className="w-3 h-3 mr-1 text-chart-3" />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Recommended Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.missing.map((skill, idx) => (
                <Badge key={idx} variant="outline" data-testid={`badge-skill-missing-${idx}`}>
                  <TrendingUp className="w-3 h-3 mr-1 text-chart-4" />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4" data-testid="text-detailed-feedback-heading">
          Detailed Feedback
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {feedback.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-6">
              <AccordionTrigger className="hover:no-underline" data-testid={`accordion-trigger-${idx}`}>
                <div className="flex items-center gap-4 text-left">
                  <div className={`text-2xl font-bold ${
                    item.score >= 80 ? 'text-chart-3' : item.score >= 60 ? 'text-chart-4' : 'text-destructive'
                  }`}>
                    {item.score}%
                  </div>
                  <span className="font-semibold">{item.section}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  {item.points.map((point, pointIdx) => (
                    <div key={pointIdx} className="flex items-start gap-2">
                      {point.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 text-chart-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-chart-4 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-sm">{point.text}</span>
                    </div>
                  ))}
                </div>
                {item.suggestions.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-medium">💡 Suggestions</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {item.suggestions.map((suggestion, suggIdx) => (
                        <li key={suggIdx}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
