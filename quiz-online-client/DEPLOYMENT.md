# Deployment Guide

## Issues Fixed ✅

### 1. **Case-Sensitive Import Path**
- **Fixed**: [NavBar.jsx](src/components/common/NavBar.jsx) was importing from `'../auth/AuthProvider'` (lowercase)
- The actual folder is `Auth` (uppercase). Linux servers are case-sensitive, causing build failures.

### 2. **Incorrect Utils Folder Structure**
- **Moved files** from root `utils/` to proper locations:
  - `QuizService.jsx` → `src/services/`
  - `AnswerOptions.jsx` → `src/components/common/`
  - `Subjects.jsx` → `src/utils/`
- **Updated all import paths** in affected components

### 3. **Hardcoded API URLs**
- **Added environment variable support** using `VITE_API_BASE_URL`
- Created `.env.production` for production configuration

---

## Vercel Deployment Steps

### Step 1: Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://your-railway-backend-url.up.railway.app/api`
   - **Environment**: Select "Production" (and optionally Preview/Development)

### Step 2: Update .env.production File

Before deploying, update [.env.production](.env.production) with your actual Railway backend URL:

```env
VITE_API_BASE_URL=https://your-railway-backend-url.up.railway.app/api
```

### Step 3: Vercel Build Settings

Ensure your Vercel project has these settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `quiz-online-client`

### Step 4: Deploy

Push your changes to GitHub and Vercel will automatically deploy:

```bash
git add .
git commit -m "Fix build errors and add environment configuration"
git push
```

---

## Railway Backend Deployment

### Step 1: Deploy to Railway

1. Go to [Railway](https://railway.app/)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Choose the `quiz-online-server` folder as the root directory

### Step 2: Configure Railway

Add these environment variables in Railway:
- `PORT`: 9192 (or Railway's default)
- `DATABASE_URL`: Your database connection string
- Any other Spring Boot configuration variables

### Step 3: Get Railway URL

After deployment, Railway will provide a URL like:
```
https://your-app-name.up.railway.app
```

Copy this URL and use it in your Vercel environment variable (add `/api` at the end).

---

## CORS Configuration (Backend)

Make sure your Spring Boot backend allows requests from your Vercel domain. Update your `SecurityConfig.java`:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList(
        "http://localhost:5173",
        "https://your-vercel-app.vercel.app"  // Add your Vercel domain
    ));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

---

## Testing Locally

Test the build locally before deploying:

```bash
# Navigate to frontend directory
cd quiz-online-client

# Install dependencies
npm install

# Test build
npm run build

# Preview production build
npm run preview
```

---

## Troubleshooting

### Build still fails?
1. Check all import paths are case-sensitive
2. Verify all file extensions are included in imports (`.jsx`, `.js`)
3. Check for any circular dependencies

### API not connecting?
1. Verify `VITE_API_BASE_URL` is set in Vercel environment variables
2. Check Railway backend is running and accessible
3. Verify CORS is configured correctly on the backend
4. Check browser console for specific error messages

### Environment variables not working?
- Environment variables must start with `VITE_` prefix in Vite
- Restart dev server after changing `.env` files
- Redeploy in Vercel after changing environment variables

---

## Next Steps

1. ✅ **Update** [.env.production](.env.production) with your Railway URL
2. ✅ **Configure** environment variables in Vercel dashboard
3. ✅ **Deploy** backend to Railway first
4. ✅ **Update** CORS settings in backend
5. ✅ **Deploy** frontend to Vercel
6. ✅ **Test** the deployed application

---

## Important Notes

- Never commit `.env` files with sensitive data to Git
- `.env.example` is provided as a template
- Use Vercel's environment variable UI for production secrets
- The build should now work without errors ✅
