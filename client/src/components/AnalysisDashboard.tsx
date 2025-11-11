import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScoreCard from "./ScoreCard";
import { Award, FileText, Target, Zap, TrendingUp, AlertCircle, CheckCircle2, Download, Globe } from "lucide-react";
import { useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AnalysisData {
  resumeId: string;
  analysisId: string;
  analysis: {
    overallScore: number;
    scores: {
      content: number;
      skills: number;
      impact: number;
      formatting: number;
    };
    feedback: Array<{
      section: string;
      score: number;
      points: Array<{ type: "success" | "warning"; text: string }>;
      suggestions: string[];
    }>;
    skills: {
      present: string[];
      missing: string[];
    };
  };
  extractedData: any;
}

export default function AnalysisDashboard() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const storedData = sessionStorage.getItem("currentAnalysis");
    if (storedData) {
      setAnalysisData(JSON.parse(storedData));
    } else {
      // Redirect to upload if no analysis data
      setLocation("/upload");
    }
  }, [setLocation]);

  if (!analysisData) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p className="text-muted-foreground">Loading analysis...</p>
      </div>
    );
  }

  const { analysis, resumeId, extractedData } = analysisData;
  const handleGeneratePortfolio = () => {
    sessionStorage.setItem("portfolioData", JSON.stringify({ resumeId, extractedData }));
    setLocation("/templates");
  };
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
          <Button onClick={handleGeneratePortfolio} data-testid="button-generate-portfolio">
            <Globe className="mr-2 w-4 h-4" />
            Generate Portfolio
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard title="Overall Score" score={analysis.overallScore} icon={Award} description="Resume quality" />
        <ScoreCard title="Content" score={analysis.scores.content} icon={FileText} description="Content quality" />
        <ScoreCard title="Skills Match" score={analysis.scores.skills} icon={Target} description="Skills alignment" />
        <ScoreCard title="Impact" score={analysis.scores.impact} icon={Zap} description="Impact & achievements" />
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
              {analysis.skills.present.map((skill, idx) => (
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
              {analysis.skills.missing.map((skill, idx) => (
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
          {analysis.feedback.map((item, idx) => (
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
