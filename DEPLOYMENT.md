# 🚀 Deployment Guide - Resume Portfolio Builder

This guide covers deploying your fullstack application to **Vercel** (Recommended) or **Netlify**.

---

## ✅ **Option 1: Vercel (RECOMMENDED)**

Vercel is the best choice for this project because it handles Node.js + React fullstack apps seamlessly.

### Prerequisites

1. [Vercel Account](https://vercel.com/signup) (Free tier available)
2. [Neon Database](https://neon.tech/) (Free tier available)
3. [OpenAI API Key](https://platform.openai.com/) (if using AI features)

### 📋 Deployment Steps

#### 1. **Prepare Your Database**

```bash
# Push your database schema to Neon (if not already done)
npm run db:push
```

#### 2. **Install Vercel CLI** (Optional but recommended)

```bash
npm install -g vercel
```

#### 3. **Deploy via Vercel Dashboard** (Easiest Method)

**A. Push to GitHub:**

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

**B. Import to Vercel:**

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **"Import Project"**
3. Select your GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
   - **Install Command:** `npm install`

**C. Add Environment Variables:**
In Vercel Dashboard → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://user:password@host/database
OPENAI_API_KEY=sk-...
NODE_ENV=production
SESSION_SECRET=your-random-secret-string
PORT=5000
```

**D. Deploy:**
Click **"Deploy"** and wait for the build to complete! 🎉

#### 4. **Deploy via CLI** (Alternative Method)

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables
vercel env add DATABASE_URL
vercel env add OPENAI_API_KEY
vercel env add SESSION_SECRET
vercel env add NODE_ENV
```

### 🔧 Post-Deployment

1. **Test your deployment:** Visit your Vercel URL (e.g., `your-app.vercel.app`)
2. **Set up custom domain** (Optional):

   - Go to Vercel Dashboard → Settings → Domains
   - Add your custom domain

3. **Enable automatic deployments:**
   - Every push to `main` branch will auto-deploy
   - Pull requests get preview deployments

### 🐛 Troubleshooting Vercel

**Build Fails:**

- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Verify TypeScript errors: `npm run check`

**Database Connection Issues:**

- Verify `DATABASE_URL` is set correctly
- Ensure Neon database allows connections from any IP
- Check Neon database is in the same region for better performance

**API Routes Not Working:**

- Verify `vercel.json` rewrites configuration
- Check server logs in Vercel Dashboard

---

## 🌐 **Option 2: Netlify** (Requires Backend Restructuring)

⚠️ **Note:** Netlify is primarily for static sites. Your Express backend needs to be converted to Netlify Functions.

### Prerequisites

1. [Netlify Account](https://app.netlify.com/signup)
2. Database hosted externally (Neon, Supabase, etc.)

### Deployment Steps

#### 1. **Restructure for Netlify Functions**

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist/public"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. **Convert Express Routes to Serverless Functions**

You'll need to create individual function files in `netlify/functions/` for each route. Example:

```typescript
// netlify/functions/analyze.ts
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  // Your route logic here
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success" }),
  };
};
```

⚠️ **This requires significant refactoring** of your current Express setup.

#### 3. **Deploy**

**A. Via Netlify Dashboard:**

1. Push code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings (should auto-detect from `netlify.toml`)
6. Add environment variables
7. Click "Deploy site"

**B. Via Netlify CLI:**

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 📊 **Platform Comparison**

| Feature                  | Vercel ✅       | Netlify                  |
| ------------------------ | --------------- | ------------------------ |
| **Node.js Backend**      | Native Support  | Requires Functions       |
| **Setup Complexity**     | Easy            | Medium-Hard              |
| **Build Speed**          | Fast            | Fast                     |
| **Auto Deployments**     | ✅ Yes          | ✅ Yes                   |
| **Serverless Functions** | ✅ Yes          | ✅ Yes                   |
| **Edge Runtime**         | ✅ Yes          | ✅ Yes                   |
| **Free Tier**            | ✅ Generous     | ✅ Generous              |
| **Best For**             | Fullstack Apps  | Static Sites + Functions |
| **Current Project**      | **RECOMMENDED** | Needs Refactoring        |

---

## 🎯 **Recommendation**

**Use Vercel** for this project because:

- ✅ Zero configuration needed for Express backend
- ✅ Seamless fullstack deployment
- ✅ Better Node.js runtime support
- ✅ Automatic HTTPS and CDN
- ✅ Preview deployments for PRs
- ✅ Excellent developer experience

---

## 🔒 **Security Checklist**

Before deploying, ensure:

- [ ] `.env` file is in `.gitignore`
- [ ] All environment variables are set in Vercel/Netlify
- [ ] Database credentials are secure
- [ ] API keys are not committed to repository
- [ ] Session secrets are randomly generated
- [ ] CORS is properly configured for production domain

---

## 📚 **Additional Resources**

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Neon Database Docs](https://neon.tech/docs)
- [Express + Vercel Guide](https://vercel.com/guides/using-express-with-vercel)

---

## 🆘 **Need Help?**

If you encounter issues:

1. Check deployment logs in dashboard
2. Verify environment variables
3. Test locally with production build: `npm run build && npm start`
4. Check database connectivity
5. Review Vercel/Netlify status pages

---

**Happy Deploying! 🚀**
