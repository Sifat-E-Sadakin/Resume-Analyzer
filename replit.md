# AI-Powered Resume Analyzer & Portfolio Builder

## Overview

This is a full-stack web application that uses AI to analyze resumes and automatically generate professional portfolio websites. The system parses uploaded resume files (PDF/DOCX), evaluates them using GPT-4, provides detailed feedback across multiple dimensions (content, skills, impact, formatting), and generates customizable portfolio websites ready for deployment.

The application targets job seekers, graduates, and professionals who need intelligent feedback on their resumes and want to establish an online presence without technical expertise.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**: React 18+ with Vite as the build tool and Wouter for client-side routing. The application follows a page-based architecture with distinct routes for home (`/`), upload (`/upload`), analysis (`/analysis`), and templates (`/templates`).

**UI Component System**: Built on shadcn/ui (Radix UI primitives) with Tailwind CSS for styling. Uses a design system inspired by modern productivity tools (Linear, Notion) with custom CSS variables for theming. Typography uses Inter for UI/body text, with JetBrains Mono for technical content display.

**State Management**: TanStack Query (React Query) for server state management with session storage for temporary analysis data persistence between page navigation. No global state management library needed due to simple data flow.

**Form Handling**: React Hook Form with Zod validation through `@hookform/resolvers` for type-safe form validation.

**Design Tokens**: Custom Tailwind configuration with HSL-based color system supporting light/dark modes. Includes elevation system using CSS variables for consistent shadow/border treatments.

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js. Single entry point at `server/index.ts` with modular route registration.

**File Upload Handling**: Multer middleware configured for in-memory storage with 10MB file size limit. Supports PDF and DOCX formats.

**Document Processing Pipeline**:
1. File upload via multipart/form-data
2. Document parsing (pdf-parse for PDFs, mammoth for DOCX)
3. Text extraction and content analysis
4. AI analysis via OpenAI API
5. Results storage and return to client

**Storage Strategy**: Currently uses in-memory storage (`MemStorage` class) implementing `IStorage` interface. Designed to be swapped with database implementation (Drizzle ORM schema already defined for PostgreSQL with Neon serverless driver).

**API Design**: RESTful endpoints under `/api` namespace. Primary endpoint: `POST /api/resumes/upload` handles file upload, parsing, AI analysis, and data persistence in a single operation.

### Data Storage

**Database Schema** (Drizzle ORM with PostgreSQL):
- `users`: User authentication (id, username, password)
- `resumes`: Uploaded resume metadata and extracted text content
- `analyses`: AI analysis results with scores, feedback, and skill assessments stored as JSONB
- `portfolios`: Generated portfolio data and configuration

**JSONB Structure**: Complex analysis data (scores, feedback arrays, skill lists) stored as PostgreSQL JSONB for flexible querying while maintaining structure.

**Migration Strategy**: Drizzle Kit configured for schema migrations in `./migrations` directory.

### AI Integration

**Model**: GPT-4 (or GPT-5 as noted in code) via OpenAI API for resume analysis. The AI analyzes multiple dimensions:
- Content quality and clarity
- Skills identification and matching
- Impact/achievement quantification
- Formatting and ATS compatibility

**Analysis Output Structure**: Returns overall score, dimension-specific scores, detailed feedback with success/warning points, skill gap analysis, and extracted structured data (name, contact, experience, education, projects).

**Error Handling**: Wrapper functions for API calls with structured error responses to client.

### Authentication & Session Management

**Planned Implementation**: Session-based authentication using `connect-pg-simple` for PostgreSQL session storage. User schema supports username/password authentication (passwords should be hashed before production).

**Session Configuration**: Express session middleware with secure cookie settings (credentials: "include" in fetch requests).

## External Dependencies

### Third-Party APIs
- **OpenAI API**: GPT-4/GPT-5 for resume analysis and content generation (requires `OPENAI_API_KEY` environment variable)

### Database
- **Neon Serverless PostgreSQL**: Cloud PostgreSQL database via `@neondatabase/serverless` driver (requires `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database queries and schema management

### Document Processing
- **pdf-parse**: PDF text extraction
- **mammoth**: Microsoft Word (DOCX) text extraction

### UI Libraries
- **Radix UI**: Unstyled, accessible component primitives (@radix-ui/react-*)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **shadcn/ui**: Pre-built component patterns on top of Radix

### Development Tools
- **Vite**: Frontend build tool with HMR
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Backend bundling for production
- **Replit Plugins**: Development banner, error overlay, and cartographer for Replit environment

### Deployment Targets (Mentioned)
- GitHub Pages
- Vercel
- Firebase

### Fonts (Google Fonts)
- Inter (UI/body text)
- JetBrains Mono (code/technical display)