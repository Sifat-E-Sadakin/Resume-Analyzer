import Navbar from "@/components/Navbar";
import PortfolioTemplates from "@/components/PortfolioTemplates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Templates() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/analysis">
            <Button variant="ghost" className="mb-8" data-testid="button-back-analysis">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Analysis
            </Button>
          </Link>
          
          <PortfolioTemplates />
        </div>
      </main>
    </div>
  );
}
