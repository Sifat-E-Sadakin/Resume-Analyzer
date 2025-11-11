import OpenAI from "openai";

// Using gpt-4o which is OpenAI's latest and most capable model
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ResumeAnalysisResult {
  overallScore: number;
  scores: {
    content: number;
    skills: number;
    impact: number;
    formatting: number;
  };
  feedback: Array<{
    section: string;
    score: number;
    points: Array<{ type: "success" | "warning"; text: string }>;
    suggestions: string[];
  }>;
  skills: {
    present: string[];
    missing: string[];
  };
  extractedData: {
    name?: string;
    title?: string;
    email?: string;
    phone?: string;
    experience: Array<{
      company: string;
      role: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
    projects?: Array<{
      name: string;
      description: string;
      link?: string;
    }>;
  };
}

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysisResult> {
  try {
    console.log("Starting resume analysis with OpenAI...");
    console.log("Resume text length:", resumeText.length);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert resume analyzer and career coach. Analyze the given resume comprehensively and provide:
1. Overall score (0-100)
2. Detailed scores for: content quality, skills relevance, impact/achievements, and formatting
3. Section-by-section feedback with specific points (mark each as "success" or "warning")
4. Actionable suggestions for improvement
5. Skills analysis (present skills and recommended missing skills for modern job market)
6. Extracted structured data (name, title, contact, experience, education, projects)

Be honest, constructive, and specific. Focus on helping the candidate improve their resume to land better opportunities.

Respond with a JSON object matching this structure:
{
  "overallScore": number,
  "scores": {
    "content": number,
    "skills": number,
    "impact": number,
    "formatting": number
  },
  "feedback": [
    {
      "section": string,
      "score": number,
      "points": [{"type": "success" | "warning", "text": string}],
      "suggestions": [string]
    }
  ],
  "skills": {
    "present": [string],
    "missing": [string]
  },
  "extractedData": {
    "name": string,
    "title": string,
    "email": string,
    "phone": string,
    "experience": [{"company": string, "role": string, "duration": string, "description": string}],
    "education": [{"institution": string, "degree": string, "year": string}],
    "projects": [{"name": string, "description": string, "link": string}]
  }
}`
        },
        {
          role: "user",
          content: resumeText
        }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4096,
    });

    console.log("OpenAI API response received");
    console.log("Response status:", response.choices?.[0]?.finish_reason);
    
    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    console.log("OpenAI raw response:", JSON.stringify(result, null, 2));
    console.log("Response has data:", Object.keys(result).length > 0);
    
    // Ensure the result has all required fields with defaults
    return {
      overallScore: result.overallScore || 0,
      scores: {
        content: result.scores?.content || 0,
        skills: result.scores?.skills || 0,
        impact: result.scores?.impact || 0,
        formatting: result.scores?.formatting || 0,
      },
      feedback: result.feedback || [],
      skills: {
        present: result.skills?.present || [],
        missing: result.skills?.missing || [],
      },
      extractedData: result.extractedData || {
        experience: [],
        education: [],
        projects: [],
      },
    };
  } catch (error) {
    throw new Error(`Resume analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
