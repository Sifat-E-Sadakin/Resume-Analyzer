import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const Upload = lazy(() => import("@/pages/Upload"));
const Analysis = lazy(() => import("@/pages/Analysis"));
const Templates = lazy(() => import("@/pages/Templates"));
const ImprovedResume = lazy(() => import("@/pages/ImprovedResume"));
const LearningResources = lazy(() => import("@/pages/LearningResources"));
const PortfolioPreviewPage = lazy(() => import("@/pages/PortfolioPreviewPage"));
const SharedPortfolioPage = lazy(() => import("@/pages/SharedPortfolioPage"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/upload" component={Upload} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/templates" component={Templates} />
      <Route path="/improved-resume" component={ImprovedResume} />
      <Route path="/learning-resources" component={LearningResources} />
      <Route path="/portfolio-preview" component={PortfolioPreviewPage} />
      <Route path="/portfolio/:id" component={SharedPortfolioPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <Router />
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
