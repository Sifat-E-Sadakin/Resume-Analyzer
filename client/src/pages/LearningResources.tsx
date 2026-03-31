import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import {
  BookOpen,
  FileText,
  Wrench,
  BadgeCheck,
  ExternalLink,
  GraduationCap,
  Loader2,
  ArrowLeft,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useLocation } from "wouter";

interface LearningResource {
  title: string;
  provider: string;
  type: "course" | "tutorial" | "tool" | "certification";
  url: string;
  skill: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  free: boolean;
}

interface ResourcesContext {
  skills: {
    present: string[];
    missing: string[];
  };
}

const resourceTypeConfig = {
  course: {
    icon: BookOpen,
    label: "Course",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  tutorial: {
    icon: FileText,
    label: "Tutorial",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  tool: {
    icon: Wrench,
    label: "Tool",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  certification: {
    icon: BadgeCheck,
    label: "Certification",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
} as const;

const difficultyColor = {
  beginner:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
} as const;

export default function LearningResources() {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [context, setContext] = useState<ResourcesContext | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | LearningResource["type"]
  >("all");
  const [, setLocation] = useLocation();

  const fetchResources = async (missingSkills: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missingSkills }),
      });

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          "Server returned an unexpected response. Please restart the server and try again.",
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch resources");
      }

      setResources(data.resources || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("resourcesContext");
    if (stored) {
      const parsed: ResourcesContext = JSON.parse(stored);
      setContext(parsed);
      fetchResources(parsed.skills.missing || []);
    } else {
      setLocation("/upload");
    }
  }, [setLocation]);

  const filtered =
    activeFilter === "all"
      ? resources
      : resources.filter(r => r.type === activeFilter);

  const types = ["all", "course", "tutorial", "tool", "certification"] as const;

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="mb-3 -ml-2"
                onClick={() => setLocation("/analysis")}>
                <ArrowLeft className="mr-1.5 w-4 h-4" />
                Back to Analysis
              </Button>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-chart-2 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                Learning Resources
              </h1>
              <p className="text-muted-foreground">
                Curated courses, tutorials, tools, and certifications to help
                you level up your skills
              </p>
            </div>
            {!isLoading && resources.length > 0 && (
              <Button
                variant="outline"
                onClick={() =>
                  context && fetchResources(context.skills.missing || [])
                }>
                <RefreshCw className="mr-2 w-4 h-4" />
                Refresh
              </Button>
            )}
          </div>

          {context && context.skills.missing?.length > 0 && (
            <Card className="p-5">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Finding resources for these skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {context.skills.missing.map((skill, idx) => (
                  <Badge key={idx} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <div className="text-center">
                <p className="font-medium">
                  Finding the best resources for you...
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Verifying each URL to ensure all links are live
                </p>
              </div>
            </div>
          )}

          {error && (
            <Card className="p-8 text-center space-y-4">
              <AlertTriangle className="w-10 h-10 text-destructive mx-auto" />
              <div>
                <p className="font-medium">Failed to load resources</p>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  context && fetchResources(context.skills.missing || [])
                }>
                <RefreshCw className="mr-2 w-4 h-4" />
                Try Again
              </Button>
            </Card>
          )}

          {!isLoading && !error && resources.length === 0 && (
            <Card className="p-8 text-center space-y-4">
              <GraduationCap className="w-10 h-10 text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium">No verified resources found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  We couldn't find resources with confirmed live URLs. Try
                  refreshing.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  context && fetchResources(context.skills.missing || [])
                }>
                <RefreshCw className="mr-2 w-4 h-4" />
                Try Again
              </Button>
            </Card>
          )}

          {!isLoading && !error && resources.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2">
                {types.map(t => {
                  const count =
                    t === "all"
                      ? resources.length
                      : resources.filter(r => r.type === t).length;
                  if (t !== "all" && count === 0) return null;
                  return (
                    <Button
                      key={t}
                      variant={activeFilter === t ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(t)}
                      className="capitalize">
                      {t === "all" ? "All" : resourceTypeConfig[t].label}
                      <Badge
                        variant="secondary"
                        className="ml-1.5 text-xs px-1.5 py-0">
                        {count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((resource, idx) => {
                  const config = resourceTypeConfig[resource.type];
                  const TypeIcon = config?.icon;
                  return (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      data-testid={`resource-card-${idx}`}>
                      <Card className="h-full p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 space-y-4">
                        <div className="flex items-start justify-between gap-2">
                          <div
                            className={`flex items-center gap-2 px-2.5 py-1 rounded-full ${config.bg}`}>
                            <TypeIcon
                              className={`w-3.5 h-3.5 ${config.color}`}
                            />
                            <span
                              className={`text-xs font-medium ${config.color}`}>
                              {config.label}
                            </span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                            {resource.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1.5">
                            by {resource.provider}
                          </p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {resource.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1 border-t">
                          <Badge variant="outline" className="text-xs">
                            {resource.skill}
                          </Badge>
                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${difficultyColor[resource.difficulty]}`}>
                            {resource.difficulty}
                          </span>
                          {resource.free && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              Free
                            </span>
                          )}
                        </div>
                      </Card>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
