# UML User Interaction Diagrams

This document describes the UML diagrams focused on how users interact with the Resume Portfolio Builder system.

## Diagram Files

1. **`UML_USER_INTERACTION.puml`** - Use Case Diagram showing all user interactions
2. **`UML_USER_SEQUENCE.puml`** - Sequence Diagrams showing detailed interaction flows

## How to View

### Quick View (Online)
1. Go to [PlantUML Online Server](http://www.plantuml.com/plantuml/uml/)
2. Copy the contents of either `.puml` file
3. Paste into the online editor
4. The diagram will render automatically

### VS Code
1. Install the "PlantUML" extension
2. Open the `.puml` file
3. Press `Alt+D` (or `Cmd+D` on Mac) to preview

## Use Case Diagram Overview

The **Use Case Diagram** (`UML_USER_INTERACTION.puml`) shows all the ways a user can interact with the system, organized into functional packages:

### 1. Home Page Use Cases
- **View Home Page**: Landing page with hero section
- **Browse Features**: View application features
- **View How It Works**: See the process explanation
- **Navigate to Upload**: Start the resume upload process

### 2. Resume Upload Use Cases
- **Upload Resume File**: Upload PDF or DOCX file
- **Drag and Drop File**: Drag file into upload zone
- **Browse and Select File**: Use file picker
- **Enter Job Description (Optional)**: Add job description for targeted analysis
- **Enter Target Role (Optional)**: Specify target job role
- **Remove Uploaded File**: Remove file before analysis
- **Start Resume Analysis**: Initiate AI analysis

### 3. Resume Analysis Use Cases
- **View Analysis Dashboard**: See complete analysis results
- **View Overall Score**: See overall resume score (0-100)
- **View Detailed Scores**: See scores for content, skills, impact, formatting
- **View Section Feedback**: Read feedback for each resume section
- **View Skills Analysis**: See present and missing skills
- **View Recommendations**: Read improvement suggestions
- **View Job Match Score**: See how well resume matches job (if job provided)
- **View Recommended Changes**: See specific changes for job alignment

### 4. Resume Improvement Use Cases
- **Generate Improved Resume**: Request AI-generated improved version
- **View Improved Resume**: See the optimized resume content
- **Copy Improved Resume**: Copy text to clipboard
- **Download Improved Resume**: Download as text file

### 5. Portfolio Generation Use Cases
- **Browse Portfolio Templates**: View available templates
- **Select Portfolio Template**: Choose a template style
- **Generate Portfolio**: Create portfolio from resume data
- **View Generated Portfolio**: See the generated portfolio

### 6. Navigation Use Cases
- **Navigate Between Pages**: Move between different pages
- **Return to Previous Page**: Go back to previous screen

## Sequence Diagrams Overview

The **Sequence Diagrams** (`UML_USER_SEQUENCE.puml`) show detailed step-by-step interactions for key workflows:

### Sequence Diagram 1: Upload and Analyze Resume (Basic Flow)
Shows the complete flow when a user uploads a resume without a job description:
1. User navigates to upload page
2. User uploads file (drag-drop or browse)
3. User clicks "Analyze Resume"
4. Server parses document
5. Server stores resume
6. Server calls OpenAI for analysis
7. Server stores analysis
8. User views analysis results

### Sequence Diagram 2: Upload Resume with Job Description
Shows the enhanced flow when user provides job description:
1. User uploads resume
2. User enters job description and target role
3. Server performs basic analysis
4. Server performs job-targeted analysis
5. Server stores job application data
6. User views analysis with job match score

### Sequence Diagram 3: Generate Improved Resume
Shows how user generates an improved resume:
1. User views analysis with recommendations
2. User requests improved resume
3. Server retrieves resume and job application
4. Server calls OpenAI to generate improved version
5. Server updates job application
6. User views, copies, or downloads improved resume

### Sequence Diagram 4: Create Portfolio
Shows portfolio generation workflow:
1. User navigates to templates page
2. User browses and selects template
3. User generates portfolio
4. Server creates portfolio from resume data
5. User views generated portfolio

### Sequence Diagram 5: View Analysis Results
Shows how analysis data is retrieved and displayed:
1. User navigates to analysis page
2. System checks sessionStorage for cached data
3. If not cached, fetches from server
4. Displays all analysis components

## User Journey Flows

### Flow 1: Basic Resume Analysis
```
Home → Upload → [Upload File] → [Analyze] → Analysis → [View Results]
```

### Flow 2: Job-Targeted Analysis
```
Home → Upload → [Upload File + Job Description] → [Analyze] → 
Analysis → [View Job Match] → [Generate Improved] → Improved Resume
```

### Flow 3: Portfolio Creation
```
Home → Upload → Analysis → Templates → [Select Template] → 
[Generate] → Portfolio View
```

## Key User Interactions

### File Upload
- **Supported Formats**: PDF, DOCX
- **Max Size**: 10MB
- **Methods**: Drag & drop or file browser
- **Validation**: File type and size checked before upload

### Analysis Process
- **Duration**: ~30 seconds (AI processing)
- **Feedback**: Real-time loading indicators
- **Results**: Comprehensive scores and recommendations
- **Storage**: Results stored in sessionStorage and database

### Job-Targeted Features
- **Optional**: Job description not required
- **Enhanced Analysis**: Provides match score and targeted recommendations
- **Improved Resume**: Generates optimized version for specific job

### Portfolio Generation
- **Templates**: Multiple template options
- **Data Source**: Uses extracted resume data
- **Customization**: Template-specific styling

## Technical Notes

- **Session Storage**: Used to persist analysis data between page navigations
- **API Endpoints**: All interactions go through REST API endpoints
- **Error Handling**: Toast notifications for success/error states
- **Navigation**: Client-side routing with Wouter
- **State Management**: React Query for server state, local state for UI

## Diagram Relationships

The use cases show dependencies:
- **includes**: One use case includes another (e.g., Upload includes Drag & Drop)
- **requires**: One use case requires another (e.g., Generate Improved requires Recommended Changes)
- **extends**: One use case extends another (e.g., Copy extends View Improved Resume)
- **follows**: Sequential flow (e.g., View Analysis follows Analyze Resume)

These diagrams help understand:
- What users can do with the system
- How different features relate to each other
- The step-by-step flow of user interactions
- Dependencies between features
