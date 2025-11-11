import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";
import uploadIllustration from "@assets/generated_images/Upload_document_illustration_ad0b923d.png";

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setUploadedFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch("/api/resumes/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      
      // Store analysis data for the analysis page
      sessionStorage.setItem("currentAnalysis", JSON.stringify(data));
      
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully",
      });

      // Navigate to analysis page
      setLocation("/analysis");
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze resume",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card 
        className={`p-12 text-center transition-all ${
          isDragging ? "border-primary border-2 bg-primary/5" : "border-dashed"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid="card-upload-zone"
      >
        {!uploadedFile ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img 
                src={uploadIllustration} 
                alt="Upload document"
                className="w-32 h-32 object-contain opacity-80"
                data-testid="img-upload-illustration"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold" data-testid="text-upload-heading">
                Upload Your Resume
              </h3>
              <p className="text-muted-foreground">
                Drag and drop your resume here, or click to browse
              </p>
            </div>
            
            <div>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                data-testid="input-file"
              />
              <label htmlFor="file-upload">
                <Button asChild size="lg" data-testid="button-browse-files">
                  <span className="cursor-pointer">
                    <Upload className="mr-2 w-5 h-5" />
                    Browse Files
                  </span>
                </Button>
              </label>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>PDF or DOCX</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>Max 10MB</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
              <FileText className="w-8 h-8 text-primary" />
              <div className="flex-1 text-left">
                <p className="font-medium" data-testid="text-uploaded-filename">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={removeFile}
                data-testid="button-remove-file"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <Button 
              size="lg" 
              className="w-full" 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              data-testid="button-analyze"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
