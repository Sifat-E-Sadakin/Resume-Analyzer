import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { parseDocument } from "./lib/documentParser";
import { analyzeResume } from "./lib/openai";
import { insertResumeSchema, insertAnalysisSchema, insertPortfolioSchema } from "@shared/schema";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload and analyze resume
  app.post("/api/resumes/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { buffer, originalname } = req.file;
      
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

      res.json({
        resumeId: resume.id,
        analysisId: analysis.id,
        analysis: {
          overallScore: analysisResult.overallScore,
          scores: analysisResult.scores,
          feedback: analysisResult.feedback,
          skills: analysisResult.skills,
        },
        extractedData: analysisResult.extractedData,
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

  const httpServer = createServer(app);
  return httpServer;
}
