import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScoreCard from "./ScoreCard";
import {
  Award,
  FileText,
  Target,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Download,
  Globe,
  Briefcase,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

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
  jobApplication?: {
    id: string;
    targetRole?: string;
    jobDescription: string;
    matchScore: number;
    recommendedChanges: {
      keywordOptimization: string[];
      experienceAlignment: string[];
      skillsHighlight: string[];
      formatSuggestions: string[];
    };
    improvedResumeContent?: string;
  };
}

export default function AnalysisDashboard() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const storedData = sessionStorage.getItem("currentAnalysis");
    console.log("Raw sessionStorage data:", storedData);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      console.log("Parsed analysis data:", parsed);
      setAnalysisData(parsed);
    } else {
      console.log("No analysis data found in sessionStorage");
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
  
  console.log("=== ANALYSIS DASHBOARD DATA ===");
  console.log("Full analysisData:", analysisData);
  console.log("analysis object:", analysis);
  console.log("resumeId:", resumeId);
  console.log("extractedData:", extractedData);
  console.log("==============================");
  
  const handleGeneratePortfolio = () => {
    sessionStorage.setItem(
      "portfolioData",
      JSON.stringify({ resumeId, extractedData }),
    );
    setLocation("/templates");
  };

  const handleGenerateImprovedResume = async () => {
    if (!analysisData?.jobApplication) return;

    setIsGenerating(true);
    try {
      const response = await fetch(`/api/resumes/${resumeId}/generate-improved`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate improved resume");
      }

      const data = await response.json();
      
      toast({
        title: "Success!",
        description: "Your improved resume has been generated",
      });

      // Update analysis data with improved resume content
      setAnalysisData(prev => prev ? {
        ...prev,
        jobApplication: prev.jobApplication ? {
          ...prev.jobApplication,
          improvedResumeContent: data.improvedResumeContent,
        } : undefined,
      } : null);

      // Navigate to improved resume page
      sessionStorage.setItem("improvedResume", JSON.stringify({
        resumeId,
        content: data.improvedResumeContent,
        targetRole: analysisData.jobApplication.targetRole,
      }));
      setLocation("/improved-resume");
    } catch (error) {
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate improved resume",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            data-testid="text-dashboard-heading"
          >
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
          {analysisData.jobApplication && (
            <Button
              onClick={handleGenerateImprovedResume}
              disabled={isGenerating || !!analysisData.jobApplication.improvedResumeContent}
              variant="default"
              data-testid="button-generate-improved"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : analysisData.jobApplication.improvedResumeContent ? (
                <>
                  <CheckCircle2 className="mr-2 w-4 h-4" />
                  View Improved Resume
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-4 h-4" />
                  Generate Improved Resume
                </>
              )}
            </Button>
          )}
          <Button
            onClick={handleGeneratePortfolio}
            data-testid="button-generate-portfolio"
          >
            <Globe className="mr-2 w-4 h-4" />
            Generate Portfolio
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ScoreCard
          title="Overall Score"
          score={analysis.overallScore || 0}
          icon={Award}
          description="Resume quality"
        />
        <ScoreCard
          title="Content"
          score={analysis.scores?.content || 0}
          icon={FileText}
          description="Content quality"
        />
        <ScoreCard
          title="Skills Match"
          score={analysis.scores?.skills || 0}
          icon={Target}
          description="Skills alignment"
        />
        <ScoreCard
          title="Impact"
          score={analysis.scores?.impact || 0}
          icon={Zap}
          description="Impact & achievements"
        />
      </div>

      {analysisData.jobApplication && (
        <Card className="p-6 border-primary/50">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2" data-testid="text-job-match-heading">
              <Briefcase className="w-5 h-5 text-primary" />
              Job Match Analysis
              {analysisData.jobApplication.targetRole && (
                <Badge variant="outline" className="ml-2">
                  {analysisData.jobApplication.targetRole}
                </Badge>
              )}
            </h2>
            <div className="text-3xl font-bold text-primary" data-testid="text-match-score">
              {analysisData.jobApplication.matchScore}%
            </div>
          </div>

          <div className="space-y-6">
            {analysisData.jobApplication.recommendedChanges.keywordOptimization.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Keyword Optimization
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  {analysisData.jobApplication.recommendedChanges.keywordOptimization.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysisData.jobApplication.recommendedChanges.experienceAlignment.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Experience Alignment
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  {analysisData.jobApplication.recommendedChanges.experienceAlignment.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysisData.jobApplication.recommendedChanges.skillsHighlight.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Skills to Highlight
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisData.jobApplication.recommendedChanges.skillsHighlight.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" data-testid={`badge-recommended-skill-${idx}`}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {analysisData.jobApplication.recommendedChanges.formatSuggestions.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Format Suggestions
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  {analysisData.jobApplication.recommendedChanges.formatSuggestions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h2
          className="text-xl font-semibold mb-4 flex items-center gap-2"
          data-testid="text-skills-gap-heading"
        >
          <TrendingUp className="w-5 h-5 text-primary" />
          Skills Gap Analysis
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Your Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(analysis.skills?.present || []).map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  data-testid={`badge-skill-present-${idx}`}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1 text-chart-3" />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Recommended Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(analysis.skills?.missing || []).map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  data-testid={`badge-skill-missing-${idx}`}
                >
                  <TrendingUp className="w-3 h-3 mr-1 text-chart-4" />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div>
        <h2
          className="text-2xl font-semibold mb-4"
          data-testid="text-detailed-feedback-heading"
        >
          Detailed Feedback
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {(analysis.feedback || []).map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger
                className="hover:no-underline"
                data-testid={`accordion-trigger-${idx}`}
              >
                <div className="flex items-center gap-4 text-left">
                  <div
                    className={`text-2xl font-bold ${
                      item.score >= 80
                        ? "text-chart-3"
                        : item.score >= 60
                          ? "text-chart-4"
                          : "text-destructive"
                    }`}
                  >
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
