# ⚡ Quick Start Guide

Get your Resume Portfolio Builder up and running in minutes!

---

## 🎯 Local Development (5 minutes)

### Step 1: Clone & Install
```bash
git clone https://github.com/yourusername/ResumePortfolioBuilder.git
cd ResumePortfolioBuilder
npm install
```

### Step 2: Setup Environment
```bash
# Copy the template
cp env.template .env

# Edit .env with your values
# Required: DATABASE_URL, OPENAI_API_KEY, SESSION_SECRET
```

### Step 3: Setup Database
```bash
# Push database schema
npm run db:push
```

### Step 4: Start Development Server
```bash
npm run dev
```

🎉 Open [http://localhost:5000](http://localhost:5000)

---

## 🚀 Deploy to Vercel (3 minutes)

### Option A: Deploy via Dashboard (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your repository
   - Click "Deploy"

3. **Add Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add: `DATABASE_URL`, `OPENAI_API_KEY`, `SESSION_SECRET`, `NODE_ENV=production`

4. **Redeploy**
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment

✅ Done! Your app is live!

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add DATABASE_URL
vercel env add OPENAI_API_KEY
vercel env add SESSION_SECRET
vercel env add NODE_ENV
```

---

## 🔑 Get Your API Keys

### 1. Database (Neon - Free)
1. Go to [neon.tech](https://neon.tech)
2. Sign up for free
3. Create a new project
4. Copy the connection string (starts with `postgresql://`)
5. Add to `.env` as `DATABASE_URL`

### 2. OpenAI API Key
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Log in
3. Go to API Keys section
4. Create new secret key (starts with `sk-`)
5. Add to `.env` as `OPENAI_API_KEY`

### 3. Session Secret
```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Add the output to `.env` as `SESSION_SECRET`

---

## 📋 Checklist

Before deployment, make sure:

- [ ] `.env` file created with all required variables
- [ ] Database schema pushed (`npm run db:push`)
- [ ] TypeScript check passes (`npm run check`)
- [ ] Build succeeds (`npm run build`)
- [ ] App runs locally (`npm start`)

---

## 🆘 Common Issues

### "Cannot connect to database"
**Solution:** Check your `DATABASE_URL` format:
```
postgresql://username:password@host.region.postgres.neon.tech/dbname?sslmode=require
```

### "OpenAI API error"
**Solution:** 
- Verify your API key starts with `sk-`
- Check you have credits in your OpenAI account
- Ensure the key has correct permissions

### "Build fails on Vercel"
**Solution:**
1. Check build logs in Vercel dashboard
2. Run `npm run build` locally to see errors
3. Ensure all dependencies are in `package.json`
4. Run `npm run check` for TypeScript errors

### "Port already in use"
**Solution:**
```bash
# Change port in .env
PORT=3000

# Or kill the process using port 5000
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 📚 Need More Help?

- 📖 **Full Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- ✅ **Deployment Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- 📘 **Main README**: [README.md](./README.md)

---

## 🎉 Success!

If everything works:
- ✅ Local: Visit [http://localhost:5000](http://localhost:5000)
- ✅ Production: Visit your Vercel URL

**Next Steps:**
1. Customize the templates
2. Add your branding
3. Test all features
4. Share with users!

---

<div align="center">

**Need help? Open an issue on GitHub!**

⭐ Don't forget to star the repo if you find it useful!

</div>

