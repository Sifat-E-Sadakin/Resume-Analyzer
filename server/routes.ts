import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { parseDocument } from "./lib/documentParser";
import { analyzeResume, analyzeResumeWithJob, generateImprovedResume } from "./lib/openai";
import { insertResumeSchema, insertAnalysisSchema, insertPortfolioSchema, insertJobApplicationSchema } from "@shared/schema";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload and analyze resume (with optional job description)
  app.post("/api/resumes/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { buffer, originalname } = req.file;
      const { jobDescription, targetRole } = req.body;
      
      // Parse document
      const content = await parseDocument(buffer, originalname);
      
      // Store resume
      const resume = await storage.createResume({
        filename: originalname,
        content,
      });

      // Analyze with AI
      const analysisResult = await analyzeResume(content);
      
      // Store analysis
      const analysis = await storage.createAnalysis({
        resumeId: resume.id,
        overallScore: String(analysisResult.overallScore),
        scores: analysisResult.scores,
        feedback: analysisResult.feedback,
        skills: analysisResult.skills,
      });

      // If job description provided, do job-targeted analysis
      let jobTargetedAnalysis = null;
      let jobApplication = null;

      if (jobDescription) {
        jobTargetedAnalysis = await analyzeResumeWithJob(content, jobDescription, targetRole);
        
        // Store job application
        jobApplication = await storage.createJobApplication({
          resumeId: resume.id,
          analysisId: analysis.id,
          jobDescription,
          targetRole: targetRole || null,
          matchScore: String(jobTargetedAnalysis.matchScore),
          recommendedChanges: jobTargetedAnalysis.recommendedChanges,
          improvedResumeContent: null,
        });
      }

      res.json({
        resumeId: resume.id,
        analysisId: analysis.id,
        jobApplicationId: jobApplication?.id,
        analysis: {
          overallScore: analysisResult.overallScore,
          scores: analysisResult.scores,
          feedback: analysisResult.feedback,
          skills: analysisResult.skills,
        },
        extractedData: analysisResult.extractedData,
        jobTargetedAnalysis,
      });
    } catch (error) {
      console.error("Resume upload error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to process resume" 
      });
    }
  });

  // Get analysis by resume ID
  app.get("/api/resumes/:resumeId/analysis", async (req, res) => {
    try {
      const { resumeId } = req.params;
      const analysis = await storage.getAnalysisByResumeId(resumeId);
      
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ error: "Failed to retrieve analysis" });
    }
  });

  // Create portfolio
  app.post("/api/portfolios", async (req, res) => {
    try {
      const validatedData = insertPortfolioSchema.parse(req.body);
      const portfolio = await storage.createPortfolio(validatedData);
      res.json(portfolio);
    } catch (error) {
      console.error("Create portfolio error:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Failed to create portfolio" 
      });
    }
  });

  // Get portfolio by resume ID
  app.get("/api/resumes/:resumeId/portfolio", async (req, res) => {
    try {
      const { resumeId } = req.params;
      const portfolio = await storage.getPortfolioByResumeId(resumeId);
      
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }

      res.json(portfolio);
    } catch (error) {
      console.error("Get portfolio error:", error);
      res.status(500).json({ error: "Failed to retrieve portfolio" });
    }
  });

  // Get job application by resume ID
  app.get("/api/resumes/:resumeId/job-application", async (req, res) => {
    try {
      const { resumeId } = req.params;
      const jobApplication = await storage.getJobApplicationByResumeId(resumeId);
      
      if (!jobApplication) {
        return res.status(404).json({ error: "Job application not found" });
      }

      res.json(jobApplication);
    } catch (error) {
      console.error("Get job application error:", error);
      res.status(500).json({ error: "Failed to retrieve job application" });
    }
  });

  // Generate improved resume
  app.post("/api/resumes/:resumeId/generate-improved", async (req, res) => {
    try {
      const { resumeId } = req.params;
      
      // Get resume content
      const resume = await storage.getResume(resumeId);
      if (!resume) {
        return res.status(404).json({ error: "Resume not found" });
      }

      // Get job application
      const jobApplication = await storage.getJobApplicationByResumeId(resumeId);
      if (!jobApplication || !jobApplication.recommendedChanges) {
        return res.status(400).json({ error: "Job analysis not found. Please upload resume with job description first." });
      }

      // Generate improved resume
      const improvedContent = await generateImprovedResume(
        resume.content,
        jobApplication.jobDescription,
        jobApplication.recommendedChanges as any,
        jobApplication.targetRole || undefined
      );

      // Update job application with improved resume
      const updated = await storage.updateJobApplication(jobApplication.id, {
        improvedResumeContent: improvedContent,
      });

      res.json({
        jobApplicationId: jobApplication.id,
        improvedResumeContent: improvedContent,
      });
    } catch (error) {
      console.error("Generate improved resume error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to generate improved resume" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
