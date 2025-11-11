import Navbar from "@/components/Navbar";
import AnalysisDashboard from "@/components/AnalysisDashboard";

export default function Analysis() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      <main className="flex-1 py-8">
        <AnalysisDashboard />
      </main>
    </div>
  );
}
