import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface ImprovedResumeData {
  resumeId: string;
  content: string;
  targetRole?: string;
}

export default function ImprovedResume() {
  const [resumeData, setResumeData] = useState<ImprovedResumeData | null>(null);
  const [copied, setCopied] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const storedData = sessionStorage.getItem("improvedResume");
    if (storedData) {
      setResumeData(JSON.parse(storedData));
    } else {
      setLocation("/upload");
    }
  }, [setLocation]);

  const handleCopy = async () => {
    if (!resumeData) return;
    
    try {
      await navigator.clipboard.writeText(resumeData.content);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Resume content copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy content to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!resumeData) return;

    const blob = new Blob([resumeData.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `improved-resume${resumeData.targetRole ? `-${resumeData.targetRole.replace(/\s+/g, "-").toLowerCase()}` : ""}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Your improved resume has been downloaded",
    });
  };

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Button
                variant="ghost"
                onClick={() => setLocation("/analysis")}
                className="mb-4"
                data-testid="button-back-analysis"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Analysis
              </Button>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-improved-resume-heading">
                Improved Resume
                {resumeData.targetRole && (
                  <span className="text-primary ml-2">for {resumeData.targetRole}</span>
                )}
              </h1>
              <p className="text-muted-foreground">
                AI-optimized resume tailored to your target job
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCopy}
                data-testid="button-copy-resume"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="mr-2 w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 w-4 h-4" />
                    Copy Text
                  </>
                )}
              </Button>
              <Button onClick={handleDownload} data-testid="button-download-resume">
                <Download className="mr-2 w-4 h-4" />
                Download
              </Button>
            </div>
          </div>

          <Card className="p-8">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Resume Content</h2>
            </div>
            <div
              className="prose prose-sm max-w-none whitespace-pre-wrap font-mono text-sm leading-relaxed"
              data-testid="text-resume-content"
            >
              {resumeData.content}
            </div>
          </Card>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-3">Next Steps</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Copy this content into your preferred document editor (Word, Google Docs, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Apply formatting, fonts, and styling to match your personal brand</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Review and customize the content to ensure accuracy and authenticity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Save as PDF before submitting to employers</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
