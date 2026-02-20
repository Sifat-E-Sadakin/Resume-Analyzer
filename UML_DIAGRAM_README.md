# UML Diagram for Resume Portfolio Builder

This document describes the UML diagram for the AI-Powered Resume Analyzer and Portfolio Builder project.

## Diagram File

The UML diagram is stored in `UML_DIAGRAM.puml` using PlantUML syntax.

## How to View the Diagram

### Option 1: Online Viewer (Easiest)

1. Go to [PlantUML Online Server](http://www.plantuml.com/plantuml/uml/)
2. Copy the contents of `UML_DIAGRAM.puml`
3. Paste into the online editor
4. The diagram will render automatically

### Option 2: VS Code Extension

1. Install the "PlantUML" extension in VS Code
2. Open `UML_DIAGRAM.puml`
3. Press `Alt+D` (or `Cmd+D` on Mac) to preview the diagram

### Option 3: Command Line

```bash
# Install PlantUML (requires Java)
# macOS
brew install plantuml

# Then generate PNG
plantuml UML_DIAGRAM.puml

# Or generate SVG
plantuml -tsvg UML_DIAGRAM.puml
```

### Option 4: IntelliJ IDEA / WebStorm

1. Install the PlantUML plugin
2. Open `UML_DIAGRAM.puml`
3. Right-click and select "PlantUML" → "Show Diagram"

## Diagram Structure

The UML diagram is organized into the following packages:

### 1. Client Layer (React/TypeScript Frontend)

- **App**: Main application component with routing and providers
- **Router**: Handles client-side routing
- **Pages**: Home, Upload, Analysis, Templates, ImprovedResume
- **Components**: Navbar, UploadZone, AnalysisDashboard, ScoreCard, PortfolioTemplates, etc.

### 2. Server Layer (Express/Node.js Backend)

- **ExpressServer**: Main Express application setup
- **Routes**: API route handlers for all endpoints
- **DocumentParser**: Parses PDF and DOCX files
- **OpenAIService**: Handles AI-powered resume analysis and improvement

### 3. Data Layer

- **IStorage**: Interface defining storage operations
- **MemStorage**: In-memory implementation of storage (can be replaced with database)

### 4. Data Models

- **User**: User account information
- **Resume**: Uploaded resume documents
- **Analysis**: AI-generated resume analysis results
- **JobApplication**: Job-specific analysis and improvements
- **Portfolio**: Generated portfolio data
- Supporting classes: Scores, Feedback, SkillsAnalysis, RecommendedChanges, etc.

### 5. External Services

- **OpenAI**: AI service for resume analysis
- **PDFParse**: PDF parsing library
- **Mammoth**: DOCX parsing library

## Key Relationships

1. **Client → Server**: HTTP requests from React components to Express API endpoints
2. **Server → Storage**: Routes use storage interface to persist data
3. **Server → AI**: Routes use OpenAI service for analysis
4. **Storage → Models**: Storage layer manages data model instances
5. **Models**: Resume has one-to-many relationships with Analysis, JobApplication, and Portfolio

## Architecture Overview

```
┌─────────────────┐
│  Client (React) │
│  - Pages        │
│  - Components   │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│  Server (Express)│
│  - Routes        │
│  - Services      │
└────────┬─────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐  ┌──────────┐
│Storage │  │  OpenAI  │
│(Memory)│  │   API    │
└────────┘  └──────────┘
```

## Notes

- The current implementation uses in-memory storage (`MemStorage`), but the `IStorage` interface allows for easy replacement with a database implementation
- The diagram shows both the current implementation and the data model relationships
- All API endpoints are defined in the Routes class
- The client uses React Query for data fetching and state management
