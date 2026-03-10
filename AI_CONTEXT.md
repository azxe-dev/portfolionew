# Alkesh James Portfolio - AI Context File

This file is designed for future AI assistants to quickly gain full context of the project, its history, and the user's preferences without needing to reread past conversations.

## 1. Project Overview
- **Name**: Alkesh James — Personal Portfolio
- **URL**: [alkeshjames.vercel.app](https://alkeshjames.vercel.app/)
- **Vibe / Inspiration**: Premium Awwwards-winning style, heavily inspired by Dennis Snellenberg. Clean, bold typography, monochromatic with subtle color pops, and fluid scroll-based animations (scrollytelling).
- **User Background**: High school graduate now building AI automation infrastructure for SMBs in Dubai and the EU. Lead for Amalby (amalby.com) and working towards a VC-backed Fintech startup.

## 2. Tech Stack
- **Framework**: React (Vite)
- **Routing**: `react-router-dom` (Multi-page app: `/` and `/about`)
- **Animations**: GSAP & GSAP ScrollTrigger
- **Scrolling**: Lenis (Smooth scrolling, wheel + touch)
- **Styling**: Vanilla CSS (`index.css`), NO Tailwind. Heavy use of CSS variables.
- **Typography**: PP Neue Montreal (loaded via local `.otf` files).

## 3. Core Components & Interactions
- **Custom Cursor**: A magnetic custom cursor (`CustomCursor.jsx`, `Magnetic.jsx`) that snaps to buttons and links.
- **Header & NavOverlay**: Replaces a standard navbar. Uses a floating hamburger menu button that gracefully inverts color (`menuBtnLight` state) when overlapping dark sections.
- **Hero Section**: 
  - Massive, infinite marquee text. 
  - A 1080p optimized background image (no visual murkiness, `opacity: 1`).
- **Bento Grid**:
  - Highlights certifications, location (Dubai), and education.
  - **Music Card**: Features an editorial "Lady Brown" inspired layout. Includes real audio playback (`best-part.mp3` - Daniel Caesar feat. H.E.R.), dynamic timestamps, a moving progress bar, and a spinning CD showcasing the user-selected "Never enough" Daniel Caesar album art. Clicking anywhere on the card toggles playback.
- **About Page (`/about`)**:
  - Massive statement typography ("I help you save time") with staggered GSAP entrances.
  - Editorial bio split into narrative and "dark" service/experience sections.

## 4. Design System & CSS Architecture
- **Colors**: 
  - `--color-bg-light`: `#E9EAEB` (Main background)
  - `--color-bg-dark`: `#1C1D20` (Dark sections)
  - `--color-accent`: `#455CE9` (Royal blue accent)
- **Philosophy**: Avoid component-specific CSS files. Keep everything centralized in `index.css` to maintain a unified design system. Use `clamp()` for fluid, responsive typography.

## 5. Development Workflows
- **Running Locally**: `npm run dev` in `scratch/portfolionew`.
- **Deployment**: `npx vercel --prod` via Command Prompt (PowerShell has execution policies enabled).

## 6. Where We Left Off (March 2026)
- Transitioned the app from a single-page scroller to a multi-page app (`react-router-dom`).
- Created the Dennis Snellenberg-inspired About page.
- Finalized and perfected the real audio playback logic and visuals in the Bento Grid.
- Fixed global visual bugs (like the murky hero image caused by `opacity: 0.8`).
- The site is fully deployed and stable. Future work should build upon this high-end foundation.
