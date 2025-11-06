# Portfolio Website Project Plan

## Project Overview

Personal portfolio website showcasing full-stack engineering expertise, AI/ML projects, and cloud-native solutions.

## Technology Stack

### Core Framework

- **Astro** - Static site generator (already chosen)
  - Great performance out of the box
  - Component islands for interactive elements
  - Built-in optimizations

### Language & Type Safety

- **TypeScript** - Type safety across the project
- **ESLint** + **Prettier** - Code quality and formatting

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
  - Fast development
  - Responsive design
  - Modern, clean aesthetics
- **CSS Variables** - For theming (light/dark mode)
- **Motion Libraries** - Smooth animations and transitions

### Content Management

- **Markdown** / **MDX** - For blog posts and project descriptions
- **Astro Collections** - Type-safe content collections

### Icons & Assets

- **Lucide Icons** - Modern icon library
- **SVG** - Scalable graphics for logos and illustrations

### Interactive Components

- **React** / **Preact** - For interactive islands (contact form, animations)
- **Framer Motion** (optional) - Advanced animations if needed

### SEO & Performance

- **Astro SEO** - Built-in SEO optimizations
- **Image Optimization** - Astro's built-in image handling
- **Sitemap** - Auto-generated

### Deployment

- **Vercel** / **Netlify** / **Cloudflare Pages** - All excellent options
- **GitHub Actions** (optional) - CI/CD pipeline

## Site Structure & Sections

### 1. **Hero Section**

- Name, title, brief tagline
- Key skills/highlights
- CTA buttons (View Projects, Contact, Resume)

### 2. **About Section**

- Professional summary
- Skills breakdown:
  - Backend Technologies
  - Frontend Technologies
  - Cloud & Infrastructure
  - AI/ML Tools
  - DevOps Tools

### 3. **Projects Section**

- Featured projects with:
  - Screenshots/visuals
  - Tech stack badges
  - Key achievements/metrics
  - Links to live demos and GitHub repos
- Filter by technology/category
- Search functionality (optional)

### 4. **Experience Section**

- Timeline or list format
- Key achievements per role
- Technologies used

### 5. **Blog/Articles Section** (Optional)

- Technical articles
- AI/ML insights
- Cloud architecture thoughts
- Built with MDX

### 6. **Contact Section**

- Contact form (with validation)
- Social links (GitHub, LinkedIn, Email)
- Location/timezone

### 7. **Footer**

- Quick links
- Copyright
- Additional resources

## Design Principles

### Visual Style

- **Modern & Clean** - Minimalist design ✅ **REDESIGNED: Clean, minimal styling**
- **Professional** - Reflects technical expertise ✅ **REDESIGNED: Professional appearance**
- **Dark Mode** - Default with light mode toggle ✅ **FIXED: Dark mode now defaults properly**
- **Responsive** - Mobile-first approach ✅ **IMPLEMENTED**
- **Performance** - Fast loading, optimized assets ✅ **IMPLEMENTED**

### Color Scheme

- Primary: Professional blue/purple or tech-focused colors
- Accent: Highlight CTA buttons and key information
- Neutral: Grays for text and backgrounds

### Typography

- **Headings**: Modern sans-serif (Inter, Poppins, or similar)
- **Body**: Readable sans-serif
- **Code**: Monospace for technical content

## Features to Implement

### Phase 1: Core Structure

- [x] Astro project setup with TypeScript
- [x] Tailwind CSS configuration
- [x] Basic layout components (Header, Footer)
- [x] Navigation component
- [x] Theme system (dark/light mode) - **FIXED: Dark mode now defaults**
- [x] Responsive design foundation

### Phase 2: Content Sections

- [ ] Hero section
- [ ] About section with skills
- [ ] Projects section (with data structure)
- [ ] Experience timeline
- [ ] Contact form with validation

### Phase 3: Enhanced Features

- [ ] Smooth scroll animations
- [ ] Project filtering/search
- [ ] Image optimization
- [ ] SEO meta tags
- [ ] Analytics integration (optional)

### Phase 4: Content & Polish

- [ ] Add real project data
- [ ] Write content for all sections
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Cross-browser testing

### Phase 5: Deployment

- [ ] Set up hosting
- [ ] Configure custom domain
- [ ] Set up CI/CD (optional)
- [ ] Monitor performance

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   ├── sections/    # Page sections
│   │   └── layout/      # Layout components
│   ├── layouts/
│   ├── pages/
│   ├── content/
│   │   ├── projects/    # Project markdown files
│   │   └── blog/        # Blog posts (optional)
│   ├── styles/
│   ├── utils/
│   └── types/
├── public/
│   ├── images/
│   └── assets/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Technical Decisions Needed

1. **Which React-like framework for islands?**

   - React (more ecosystem)
   - Preact (smaller bundle)

2. **Deployment platform preference?**

   - Vercel (easiest, great DX)
   - Netlify (good Astro support)
   - Cloudflare Pages (fast, global)

3. **Blog section?**

   - Include now or add later?

4. **Animation library?**

   - Built-in CSS animations
   - Framer Motion (more control)

5. **Analytics?**
   - Google Analytics
   - Plausible (privacy-focused)
   - None

## Next Steps

1. Review and approve this plan
2. Make technology decisions
3. Initialize Astro project
4. Set up base configuration
5. Start building components
