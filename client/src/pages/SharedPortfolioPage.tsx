import { useState, useEffect } from "react";
import { useParams } from "wouter";
import PortfolioPreview from "@/components/PortfolioPreview";
import type { PortfolioData } from "@/components/portfolio";

interface PortfolioResponse {
  id: string;
  templateId: string;
  data: PortfolioData;
}

export default function SharedPortfolioPage() {
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/portfolios/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Portfolio not found");
        return res.json();
      })
      .then(data => setPortfolio(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md px-6">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl text-destructive">!</span>
          </div>
          <h1 className="text-2xl font-bold">Portfolio Not Found</h1>
          <p className="text-muted-foreground">
            This portfolio link may have expired or doesn't exist. Ask the owner
            for a new link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto">
        <PortfolioPreview
          templateId={portfolio.templateId}
          data={portfolio.data}
        />
      </div>
    </div>
  );
}
