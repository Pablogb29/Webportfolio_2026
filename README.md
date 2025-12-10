# 🚀 Web Portfolio – Offensive Security

A modern, professional portfolio website for an Offensive Security Engineer, built with Next.js 14, TypeScript, and TailwindCSS.

## ✨ Features

- **Dark-tech minimalistic design** with cyber aesthetics
- **Fully responsive** layout for all devices
- **Smooth animations** using Framer Motion
- **Modern tech stack** (Next.js 14, TypeScript, TailwindCSS)
- **SEO optimized** with proper metadata
- **Performance optimized** with Next.js App Router

## 🎨 Design

- **Color Scheme:**
  - Background: `#0A0A0A`
  - Containers: `#111827` / `#1E1E2E`
  - Accent (Neon Green): `#00FF9A`
  - Cyber Blue: `#1E90FF`
  - Gray Light: `#D1D5DB`

- **Typography:**
  - UI: Inter
  - Technical elements: JetBrains Mono

## 📦 Sections

1. **Hero Section** - Introduction with CTA buttons
2. **About Me** - Professional summary and focus areas
3. **Skills Matrix** - Categorized technical skills
4. **Projects** - Featured projects with case studies
5. **HTB Labs** - HackTheBox writeups dashboard
6. **Research/Blog** - Technical articles and research
7. **Contact** - Contact form and social links

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web_portfolio_dec25
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customization

### Update Personal Information

- Edit `components/Hero.tsx` for hero section content
- Update `components/About.tsx` for about section
- Modify `components/Skills.tsx` for skills matrix
- Update project data in `app/projects/page.tsx`
- Edit HTB machines in `app/labs/page.tsx`
- Update blog posts in `app/blog/page.tsx`
- Modify contact info in `app/contact/page.tsx` and `components/Footer.tsx`

### Colors

Edit `tailwind.config.ts` to customize the color scheme.

### Fonts

Fonts are imported in `app/globals.css`. Modify as needed.

## 🏗️ Project Structure

```
web_portfolio_dec25/
├── app/
│   ├── blog/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── labs/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── FeaturedProjects.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ProjectCard.tsx
│   └── Skills.tsx
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ for the offensive security community

