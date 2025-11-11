import Navbar from "@/components/Navbar";
import UploadZone from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Upload() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/">
            <Button variant="ghost" className="mb-8" data-testid="button-back-home">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" data-testid="text-upload-page-heading">
              Upload Your Resume
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant AI-powered analysis and personalized improvement suggestions
            </p>
          </div>
          
          <UploadZone />
          
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">1M+</div>
                <p className="text-sm text-muted-foreground">Resumes Analyzed</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <p className="text-sm text-muted-foreground">User Rating</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">30s</div>
                <p className="text-sm text-muted-foreground">Average Analysis Time</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
