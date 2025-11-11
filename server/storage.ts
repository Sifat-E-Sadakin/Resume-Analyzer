import { 
  type User, 
  type InsertUser, 
  type Resume, 
  type InsertResume,
  type Analysis,
  type InsertAnalysis,
  type Portfolio,
  type InsertPortfolio
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resume operations
  createResume(resume: InsertResume): Promise<Resume>;
  getResume(id: string): Promise<Resume | undefined>;
  
  // Analysis operations
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysis(id: string): Promise<Analysis | undefined>;
  getAnalysisByResumeId(resumeId: string): Promise<Analysis | undefined>;
  
  // Portfolio operations
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  getPortfolio(id: string): Promise<Portfolio | undefined>;
  getPortfolioByResumeId(resumeId: string): Promise<Portfolio | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private resumes: Map<string, Resume>;
  private analyses: Map<string, Analysis>;
  private portfolios: Map<string, Portfolio>;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.analyses = new Map();
    this.portfolios = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = randomUUID();
    const resume: Resume = {
      ...insertResume,
      id,
      uploadedAt: new Date(),
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async getResume(id: string): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = randomUUID();
    const analysis: Analysis = {
      id,
      resumeId: insertAnalysis.resumeId,
      overallScore: insertAnalysis.overallScore,
      scores: insertAnalysis.scores as any,
      feedback: insertAnalysis.feedback as any,
      skills: insertAnalysis.skills as any,
      createdAt: new Date(),
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysis(id: string): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }

  async getAnalysisByResumeId(resumeId: string): Promise<Analysis | undefined> {
    return Array.from(this.analyses.values()).find(
      (analysis) => analysis.resumeId === resumeId,
    );
  }

  async createPortfolio(insertPortfolio: InsertPortfolio): Promise<Portfolio> {
    const id = randomUUID();
    const portfolio: Portfolio = {
      id,
      resumeId: insertPortfolio.resumeId,
      templateId: insertPortfolio.templateId,
      data: insertPortfolio.data as any,
      createdAt: new Date(),
    };
    this.portfolios.set(id, portfolio);
    return portfolio;
  }

  async getPortfolio(id: string): Promise<Portfolio | undefined> {
    return this.portfolios.get(id);
  }

  async getPortfolioByResumeId(resumeId: string): Promise<Portfolio | undefined> {
    return Array.from(this.portfolios.values()).find(
      (portfolio) => portfolio.resumeId === resumeId,
    );
  }
}

export const storage = new MemStorage();
