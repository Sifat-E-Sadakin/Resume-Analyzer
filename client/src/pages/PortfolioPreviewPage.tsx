import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Palette, Link, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import PortfolioPreview from "@/components/PortfolioPreview";

interface StoredPortfolio {
  id: string;
  templateId: string;
  data: {
    name: string;
    title: string;
    bio: string;
    skills: string[];
    experience: Array<{
      company: string;
      role: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
    projects?: Array<{
      name: string;
      description: string;
      link?: string;
    }>;
    certificates?: Array<{
      name: string;
      issuer: string;
      year?: string;
      link?: string;
    }>;
  };
}

const templateNames: Record<string, string> = {
  minimal: "Minimal Professional",
  creative: "Creative Grid",
  technical: "Technical Developer",
};

export default function PortfolioPreviewPage() {
  const [portfolio, setPortfolio] = useState<StoredPortfolio | null>(null);
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  function handlePreview() {
    const el = previewRef.current;
    if (!el) return;

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join("\n");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${portfolio?.data.name ?? "Portfolio"}</title>
${styles}
</head>
<body style="margin:0;min-height:100vh">
${el.innerHTML}
</body>
</html>`;

    const tab = window.open("", "_blank");
    if (tab) {
      tab.document.write(html);
      tab.document.close();
    }
  }

  async function handleShareLink() {
    if (!portfolio) return;
    setSharing(true);
    try {
      const shareUrl = `${window.location.origin}/portfolio/${portfolio.id}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Shareable portfolio link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSharing(false);
    }
  }

  useEffect(() => {
    const stored = sessionStorage.getItem("generatedPortfolio");
    if (stored) {
      setPortfolio(JSON.parse(stored));
    } else {
      setLocation("/templates");
    }
  }, [setLocation]);

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading portfolio...</p>
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
                onClick={() => setLocation("/templates")}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Templates
              </Button>
              <h1 className="text-3xl font-bold mb-2">Portfolio Preview</h1>
              <p className="text-muted-foreground">
                Viewing your{" "}
                <span className="text-primary font-medium">
                  {templateNames[portfolio.templateId] ?? portfolio.templateId}
                </span>{" "}
                portfolio
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setLocation("/templates")}>
                <Palette className="mr-2 w-4 h-4" />
                Change Template
              </Button>
              <Button variant="outline" onClick={handleShareLink} disabled={sharing}>
                {copied ? (
                  <Check className="mr-2 w-4 h-4 text-green-500" />
                ) : (
                  <Link className="mr-2 w-4 h-4" />
                )}
                {copied ? "Copied!" : "Get Shareable Link"}
              </Button>
              <Button onClick={handlePreview}>
                <Eye className="mr-2 w-4 h-4" />
                Preview
              </Button>
            </div>
          </div>

          <div ref={previewRef}>
            <PortfolioPreview
              templateId={portfolio.templateId}
              data={portfolio.data}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
