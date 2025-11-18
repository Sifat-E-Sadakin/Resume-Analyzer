# 🎯 AI-Powered Resume Analyzer & Portfolio Builder

An intelligent platform that analyzes resumes using AI, provides actionable feedback, and helps create stunning portfolio websites.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![React](https://img.shields.io/badge/react-18.3-blue.svg)

---

## ✨ Features

- 📄 **Resume Analysis**: Upload your resume and get AI-powered insights
- 📊 **Scoring System**: Get detailed scores on different resume aspects
- 💡 **Improvement Suggestions**: Receive actionable recommendations
- 🎨 **Portfolio Templates**: Choose from beautiful, responsive templates
- 🤖 **AI-Powered**: Leverages OpenAI for intelligent analysis
- 📱 **Responsive Design**: Works seamlessly on all devices

---

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **TailwindCSS 4** - Styling
- **Shadcn/ui** - Component library
- **Radix UI** - Accessible components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **TanStack Query** - Data fetching
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database toolkit
- **PostgreSQL (Neon)** - Database
- **OpenAI API** - AI analysis
- **Passport.js** - Authentication
- **Multer** - File uploads

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **PostgreSQL database** (Neon recommended)
- **OpenAI API key**

---

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ResumePortfolioBuilder.git
cd ResumePortfolioBuilder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@host/database

# OpenAI Configuration
OPENAI_API_KEY=sk-...

# Server Configuration
NODE_ENV=development
PORT=5000

# Session Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
SESSION_SECRET=your-random-secret-here
```

### 4. Database Setup

```bash
# Push database schema
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:5000](http://localhost:5000)

---

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 🚀 Deployment

This project is optimized for deployment on **Vercel** (recommended) or **Netlify**.

### Quick Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Import your repository
   - Add environment variables
   - Click Deploy! 🎉

📚 **Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

📋 **Pre-deployment checklist**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 📁 Project Structure

```
ResumePortfolioBuilder/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ui/       # Shadcn UI components
│   │   │   └── ...       # Feature components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and helpers
│   │   └── main.tsx      # Entry point
│   └── index.html
├── server/                # Backend Express application
│   ├── routes.ts         # API routes
│   ├── lib/              # Server utilities
│   │   ├── openai.ts    # OpenAI integration
│   │   └── documentParser.ts
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema
├── vercel.json          # Vercel configuration
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind configuration
├── drizzle.config.ts    # Database configuration
└── package.json         # Dependencies and scripts
```

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run check        # TypeScript type checking
npm run db:push      # Push database schema
```

---

## 🎨 Component Library

This project uses **Shadcn/ui** components. To add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | ✅ Yes |
| `NODE_ENV` | Environment (development/production) | ✅ Yes |
| `PORT` | Server port (default: 5000) | ❌ No |
| `SESSION_SECRET` | Session encryption secret | ✅ Yes |

---

## 🧪 Testing

```bash
# Type checking
npm run check

# Build test
npm run build
```

---

## 📝 API Endpoints

### Resume Analysis
```
POST /api/analyze
Content-Type: multipart/form-data
Body: { file: <resume-file> }
```

### Portfolio Generation
```
POST /api/generate-portfolio
Content-Type: application/json
Body: { template: "minimal", data: {...} }
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [OpenAI](https://openai.com/) for AI capabilities
- [Neon](https://neon.tech/) for serverless Postgres
- [Vercel](https://vercel.com/) for hosting

---

## 📧 Contact

For questions or support, please open an issue or contact:

- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

## 🔗 Links

- **Live Demo**: [your-app.vercel.app](https://your-app.vercel.app)
- **Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Deployment Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

<div align="center">
  
**Made with ❤️ and AI**

⭐ Star this repo if you find it helpful!

</div>

# Resume-Analyzer
