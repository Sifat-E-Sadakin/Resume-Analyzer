# Design Guidelines: AI-Powered Resume Analyzer & Portfolio Builder

## Design Approach
**System-Based Approach** inspired by modern productivity tools (Linear, Notion) combined with data visualization best practices for the dashboard components. The design emphasizes clarity, efficiency, and professional credibility while maintaining visual sophistication.

## Typography System

### Font Families
- **Primary (UI/Body)**: Inter (Google Fonts) - Modern, highly legible for interfaces and data
- **Display/Headings**: Cal Sans or DM Sans (Google Fonts) - Clean, professional authority
- **Code/Technical**: JetBrains Mono (for displaying extracted resume data, file names)

### Hierarchy
- Hero Headlines: text-5xl to text-7xl, font-bold
- Section Headings: text-3xl to text-4xl, font-semibold
- Subsections: text-xl to text-2xl, font-medium
- Body Text: text-base, font-normal, leading-relaxed
- Labels/Metadata: text-sm, font-medium, tracking-wide uppercase
- Scores/Metrics: text-4xl to text-6xl, font-bold (tabular-nums)

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24 (desktop), py-12 (mobile)
- Card gaps: gap-6 to gap-8
- Grid gaps: gap-4 to gap-6

**Container Strategy**:
- Landing page: Full-width sections with max-w-7xl inner containers
- Application interface: max-w-6xl centered with full-width dashboard sections
- Content width: max-w-prose for text-heavy feedback sections

## Core Components

### Landing Page Structure
1. **Hero Section** (80vh)
   - Left-aligned headline with gradient text treatment
   - Subheading explaining the dual value proposition
   - Primary CTA: "Analyze Your Resume" + Secondary: "View Sample Analysis"
   - Right side: Animated dashboard preview mockup or abstract illustration of AI analysis
   - Trust indicators below: "Powered by GPT-4 • Privacy-First • Free Analysis"

2. **Features Grid** (3 columns on desktop → 1 on mobile)
   - AI Resume Analysis card with icon
   - Instant Portfolio Generation card
   - Career Insights & Matching card
   - Each with icon, title, 2-3 line description

3. **How It Works** (Timeline/Stepped layout)
   - Numbered steps (1-2-3) with connecting line
   - Upload → Analyze → Generate → Deploy flow
   - Include screenshot mockups for each step

4. **Sample Analysis Preview**
   - Mini embedded dashboard showing score breakdown
   - Testimonial quote overlay
   - CTA to try for free

5. **Technology Trust Section** (2 columns)
   - Left: "Powered by Advanced AI" with GPT logo, tech stack badges
   - Right: Privacy commitment, security icons

6. **Footer**
   - Newsletter signup for resume tips
   - Quick links (About, Privacy, Contact)
   - Social proof counter (e.g., "1,200+ resumes analyzed")

### Application Interface

**Upload Interface**:
- Large dropzone (h-64) with dashed border treatment
- Drag-and-drop area with icon and clear instructions
- Supported formats badge (PDF, DOCX)
- Recent uploads list below (if returning user)
- File size limit indicator

**Analysis Dashboard** (Main Result View):

Layout: Sidebar navigation + Main content area

**Left Sidebar** (w-64 fixed):
- Overall score card (prominent, top)
- Section navigation links (Skills, Experience, Formatting, etc.)
- Action buttons (Download Report, Generate Portfolio)

**Main Content** (flex-1):
- **Score Overview Banner**: 4-column grid showing category scores with radial progress indicators
- **Detailed Analysis Sections**: Accordion or tabbed layout
  - Each section: Score badge + AI feedback + Bullet points + Suggestions
- **Skills Gap Visualization**: Tag cloud or horizontal bar chart comparing current vs. desired skills
- **Job Match Comparison** (if applicable): Side-by-side layout with matching percentage

### Portfolio Generation Interface

**Template Selection** (Grid of 3-4 cards):
- Preview thumbnail of each template style
- Template name and brief description
- "Use This Template" button on each

**Portfolio Editor** (Split view):
- Left (40%): Form fields for editing content (name, bio, projects, etc.)
- Right (60%): Live preview iframe showing portfolio updates in real-time
- Top toolbar: Preview device toggle (desktop/tablet/mobile), Export Code, Deploy buttons

**Generated Portfolio Templates** (Deliverables):
Design 2-3 distinct portfolio styles:
1. **Minimal Professional**: Single-page scroll, large hero with name, clean sections
2. **Creative Grid**: Masonry project showcase, bold typography
3. **Technical/Developer**: Code-inspired aesthetic, terminal-style elements

## Component Library

### Cards
- Standard card: rounded-xl, shadow-sm, p-6
- Elevated card (dashboard scores): rounded-2xl, shadow-lg, p-8
- Interactive card: hover:shadow-xl transition, cursor-pointer

### Buttons
Primary: Substantial padding (px-8 py-4), rounded-lg, font-semibold
Secondary: Outline style, same sizing
Tertiary: Text-only with icon
File upload: Large, rounded-full for dropzone CTA

### Progress Indicators
- Radial charts for scores (using Chart.js or similar)
- Horizontal bars for skill comparisons
- Circular badges for section scores

### Data Display
- Score cards with large number + label + mini sparkline/trend
- Feedback blocks: Left border accent, rounded corners, p-4
- Tag pills for skills (rounded-full, px-3 py-1, text-sm)

### Icons
Use **Heroicons** (outline for navigation, solid for status indicators)

## Animations
**Minimal, purposeful only**:
- Page transitions: Simple fade-in
- Score counting animation on dashboard load (count-up effect)
- Hover states: Subtle scale (scale-105) or shadow changes
- NO scroll-triggered animations or complex motion

## Images

### Landing Page
- **Hero Section**: Large (50% width on desktop) dashboard interface mockup showing analysis in progress or completed score view - modern, clean screenshot-style illustration
- **How It Works Section**: 3 UI screenshots showing upload → analysis → portfolio stages
- **Template Preview**: Thumbnail screenshots of generated portfolio examples

### Application
- **Empty State Illustrations**: Custom spot illustrations for "Upload your first resume" state
- **Template Thumbnails**: Actual rendered previews of portfolio templates

No decorative background images or abstract patterns - keep focus on functional imagery that demonstrates product value.