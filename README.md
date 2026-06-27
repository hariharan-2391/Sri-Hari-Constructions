# Sri Hari Constructions

Sri Hari Constructions is a polished, responsive React landing page for a construction and interior design company in Chennai. The site highlights the company’s portfolio, process, values, and contact flow while keeping the experience fast and easy to maintain.

## Highlights

- Responsive single-page experience for mobile, tablet, and desktop
- Modular section components with centralized content and image data
- SEO-ready metadata, accessible landmarks, and clear section structure
- Optimized production build with Vite and deferred image loading
- Contact form integration for project enquiries

## Tech Stack

- React 19
- Vite 8
- ESLint for code quality

## Project Structure

- src/App.jsx — page composition and app state
- src/components/Sections.jsx — reusable section components
- src/components/LogoMark.jsx — shared logo component
- src/config/content.js — page content and portfolio data
- src/config/images.js — centralized image imports
- src/styles/global.js — global styles injected into the app

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the development server
   ```bash
   npm run dev
   ```
3. Build for production
   ```bash
   npm run build
   ```
4. Preview the production build locally
   ```bash
   npm run preview
   ```

## Performance Notes

- Images in project and interior galleries are loaded lazily to reduce initial page weight.
- The production build uses Vite’s esbuild minification and chunking to keep the bundle efficient.
- Global styles and content are separated from the main app file to improve maintainability and future updates.

## Deployment

The site is ready to deploy to any static hosting provider such as Vercel, Netlify, or GitHub Pages.
