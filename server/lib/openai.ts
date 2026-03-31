import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function verifyUrl(url: string): Promise<boolean> {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ResumeAnalyzer/1.0)" },
    });

    clearTimeout(timeout);
    return res.ok;
  } catch {
    return false;
  }
}

async function filterValidResources(
  resources: LearningResource[],
): Promise<LearningResource[]> {
  const results = await Promise.allSettled(
    resources.map(async resource => {
      const valid = await verifyUrl(resource.url);
      return { resource, valid };
    }),
  );

  return results
    .filter(
      (
        r,
      ): r is PromiseFulfilledResult<{
        resource: LearningResource;
        valid: boolean;
      }> => r.status === "fulfilled" && r.value.valid,
    )
    .map(r => r.value.resource);
}

interface LearningResource {
  title: string;
  provider: string;
  type: "course" | "tutorial" | "tool" | "certification";
  url: string;
  skill: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  free: boolean;
}

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

export async function analyzeResume(
  resumeText: string,
): Promise<ResumeAnalysisResult> {
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
}`,
        },
        {
          role: "user",
          content: resumeText,
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4096,
    });

    console.log("OpenAI API response received");
    console.log("Response status:", response.choices?.[0]?.finish_reason);

    const result = JSON.parse(response.choices[0].message.content || "{}");

    console.log("OpenAI raw response:", JSON.stringify(result, null, 2));
    console.log("Response has data:", Object.keys(result).length > 0);

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
    throw new Error(
      `Resume analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

interface JobTargetedAnalysisResult {
  matchScore: number;
  recommendedChanges: {
    keywordOptimization: string[];
    experienceAlignment: string[];
    skillsHighlight: string[];
    formatSuggestions: string[];
  };
  missingSkills: string[];
  matchingSkills: string[];
}

export async function analyzeResumeWithJob(
  resumeText: string,
  jobDescription: string,
  targetRole?: string,
): Promise<JobTargetedAnalysisResult> {
  try {
    console.log("Starting job-targeted resume analysis with OpenAI...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert resume analyzer and career coach. Analyze the resume against the specific job description and provide:

1. Match score (0-100) indicating how well the resume aligns with the job requirements
2. Specific recommendations categorized into:
   - Keyword Optimization: Keywords and phrases from the job description to add
   - Experience Alignment: How to reframe experience to better match the role
   - Skills to Highlight: Which skills to emphasize or add based on job requirements
   - Format Suggestions: Structural improvements to better showcase relevant qualifications
3. Skills gap analysis

Be specific and actionable. Focus on helping the candidate tailor their resume to this specific role.

Respond with a JSON object matching this structure:
{
  "matchScore": number (0-100),
  "recommendedChanges": {
    "keywordOptimization": [string] (keywords and phrases to include),
    "experienceAlignment": [string] (how to reframe or emphasize experience),
    "skillsHighlight": [string] (skills to prominently feature),
    "formatSuggestions": [string] (structural improvements)
  },
  "missingSkills": [string] (skills in job description but not in resume),
  "matchingSkills": [string] (skills in both resume and job description)
}`,
        },
        {
          role: "user",
          content: `Job Description:\n${jobDescription}\n\n${targetRole ? `Target Role: ${targetRole}\n\n` : ""}Resume:\n${resumeText}`,
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4096,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    console.log("Job-targeted analysis completed");

    return {
      matchScore: result.matchScore || 0,
      recommendedChanges: {
        keywordOptimization:
          result.recommendedChanges?.keywordOptimization || [],
        experienceAlignment:
          result.recommendedChanges?.experienceAlignment || [],
        skillsHighlight: result.recommendedChanges?.skillsHighlight || [],
        formatSuggestions: result.recommendedChanges?.formatSuggestions || [],
      },
      missingSkills: result.missingSkills || [],
      matchingSkills: result.matchingSkills || [],
    };
  } catch (error) {
    throw new Error(
      `Job-targeted analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function generateImprovedResume(
  resumeText: string,
  jobDescription: string,
  recommendedChanges: {
    keywordOptimization: string[];
    experienceAlignment: string[];
    skillsHighlight: string[];
    formatSuggestions: string[];
  },
  targetRole?: string,
): Promise<string> {
  try {
    console.log("Generating improved resume with OpenAI...");

    const changesText = [
      "Keyword Optimization:",
      ...recommendedChanges.keywordOptimization.map(item => `- ${item}`),
      "",
      "Experience Alignment:",
      ...recommendedChanges.experienceAlignment.map(item => `- ${item}`),
      "",
      "Skills to Highlight:",
      ...recommendedChanges.skillsHighlight.map(item => `- ${item}`),
      "",
      "Format Suggestions:",
      ...recommendedChanges.formatSuggestions.map(item => `- ${item}`),
    ].join("\n");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert resume writer. Generate an improved version of the resume that incorporates the recommended changes while maintaining the candidate's authentic voice and actual experience.

IMPORTANT INSTRUCTIONS:
- Only make changes that are truthful and based on the candidate's actual experience
- Reframe and highlight existing accomplishments to align with the job requirements
- Add relevant keywords from the job description naturally
- Improve impact statements with quantifiable metrics where the original resume shows results
- Maintain professional formatting and structure
- Do NOT fabricate experience, skills, or achievements
- Keep the resume length appropriate (1-2 pages)

Output the complete improved resume text in a professional format.`,
        },
        {
          role: "user",
          content: `Original Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\n${targetRole ? `Target Role: ${targetRole}\n\n` : ""}Recommended Changes:\n${changesText}\n\nPlease generate the improved resume incorporating these changes while keeping all information truthful and based on the candidate's actual experience.`,
        },
      ],
      max_completion_tokens: 8192,
    });

    const improvedResume = response.choices[0].message.content || resumeText;

    console.log("Improved resume generated successfully");

    return improvedResume;
  } catch (error) {
    throw new Error(
      `Resume generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getRecommendedResources(
  missingSkills: string[],
): Promise<LearningResource[]> {
  try {
    console.log("Fetching recommended learning resources with OpenAI...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert career development advisor. Given a list of skills a candidate needs to develop, recommend real, well-known online learning resources (courses, tutorials, tools, certifications) to help them upskill.

CRITICAL URL RULES — you MUST follow these strictly:
- ONLY include a resource if you are 100% certain its URL is real, currently live, and will not return a 404.
- Use stable, permanent URLs: platform landing pages, official documentation root pages, certification program pages, and well-established course pages that have existed for years.
- GOOD URL patterns:
  • Coursera professional certificates: "https://www.coursera.org/professional-certificates/google-data-analytics"
  • Coursera specializations: "https://www.coursera.org/specializations/deep-learning"
  • Microsoft Learn paths: "https://learn.microsoft.com/en-us/training/"
  • freeCodeCamp curriculum: "https://www.freecodecamp.org/learn"
  • MDN docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
  • AWS Training: "https://aws.amazon.com/training/"
  • Codecademy catalog: "https://www.codecademy.com/catalog"
  • Official docs: "https://react.dev/", "https://docs.python.org/3/"
- BAD URL patterns (DO NOT use):
  • Made-up Udemy slugs you're not sure about
  • YouTube video IDs you're guessing
  • Course URLs with random IDs or hashes
- If you cannot confidently provide a real URL for a skill, OMIT that resource entirely. Fewer verified resources are better than broken links.
- Only recommend from these platforms: Coursera, edX, LinkedIn Learning, Google Skillshop, AWS Training, Microsoft Learn, freeCodeCamp, MDN Web Docs, Codecademy, Khan Academy, official language/framework documentation, and well-known certification bodies (Google, AWS, Microsoft, CompTIA).

Return a JSON object with this structure:
{
  "resources": [
    {
      "title": string,
      "provider": string,
      "type": "course" | "tutorial" | "tool" | "certification",
      "url": string,
      "skill": string,
      "description": string,
      "difficulty": "beginner" | "intermediate" | "advanced",
      "free": boolean
    }
  ]
}`,
        },
        {
          role: "user",
          content: `Skills to Develop:\n${missingSkills.join("\n")}\n\nPlease recommend the best learning resources for each of these skills.`,
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4096,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    const rawResources: LearningResource[] = (result.resources || [])
      .filter((r: any) => r.url && r.title)
      .map((r: any) => ({
        title: r.title || "",
        provider: r.provider || "",
        type: r.type || "course",
        url: r.url || "",
        skill: r.skill || "",
        description: r.description || "",
        difficulty: r.difficulty || "beginner",
        free: r.free ?? false,
      }));

    console.log(`Verifying ${rawResources.length} resource URLs...`);
    const verifiedResources = await filterValidResources(rawResources);
    console.log(
      `${verifiedResources.length}/${rawResources.length} resource URLs verified as live`,
    );

    return verifiedResources;
  } catch (error) {
    throw new Error(
      `Resource recommendation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
