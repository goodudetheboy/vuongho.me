## 🌐 Personal Website Specification: vuongho.me v1

### 🧭 Overall Concept

A minimalist, mobile-first **digital business card** that:

* Shows your **name, title, and image** on the front.
* Flips horizontally on tap to reveal the **back** side with:
  * Education history with expandable details
  * Work experience timeline with expandable details
  * Logo links to workplace, school, and contact points
* Built for high polish with animations, subtle interactivity, and a **dark mode aesthetic**

---

### 📐 Layout Overview

#### 1. **Front of Card (Default View)**

* **Background**: solid dark color (`#0a0a0a`), subtle animated texture
* **Left**: portrait image (circular, shadowed)
* **Right**:
  * Large name: `Vuong Ho` in a bold, clean sans-serif (`Space Grotesk`)
  * Subtitle: Current role and location
* **Entire card is horizontally centered and responsive**

#### 2. **Back of Card (Flip View)**

* **Flip Animation**: smooth CSS transform with spring animation
* **Background**: same dark tone
* **Content Sections**:

  ##### Education Section
  * Horizontal scrollable list of institutions
  * Each institution has an icon (e.g., 🎓 for schools)
  * Click to expand/collapse details
  * First item auto-expands on load
  * Mouse wheel scrolling enabled
  * Hidden scrollbars with maintained functionality

  ##### Experience Section
  * Horizontal scrollable list of companies/roles
  * Company-specific icons (e.g., terminal, lab, shield, rocket icons)
  * Click to expand/collapse details
  * First item auto-expands on load
  * Mouse wheel scrolling enabled
  * Hidden scrollbars
  * Scroll indicators:
    * Appear next to "Experience" title (left/right)
    * Show only when meaningful scroll space available (>20px threshold)
    * Fade in/out smoothly
    * Left indicator shows when scrolled right
    * Right indicator shows when more content available
    * Semi-transparent white icons (60% opacity)
  
  ##### Connect Section
  * Social media and contact links
  * Animated hover effects
  * Icons with labels

* **Modal View**:
  * Detailed experience view
  * Accessible via info button
  * Shows full role description
  * Smooth enter/exit animations

---

### 🎨 Visual Design

#### Fonts
* Primary: `Space Grotesk` (Google Fonts)
* Weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
* Fallback: `sans-serif`

#### Colors
```css
:root {
  --bg: #0a0a0a;
  --card-bg: #111111;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-tertiary: rgba(255, 255, 255, 0.6);
}
```

#### Animations
* Card flip: Spring animation
* Content expansion: Smooth height transitions
* Scroll indicators: Fade in/out
* Modal: Scale and fade transitions
* Hover effects: Subtle scaling

---

### 🔧 Interaction Details

#### Scrolling Behavior
* Mouse wheel scrolls horizontally
* No drag-to-scroll (removed for cleaner interaction)
* Hidden scrollbars using CSS utilities:
```css
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

#### Expandable Items
* Click to expand/collapse
* First items auto-expand on mount
* Smooth height transitions
* Maintains scroll position when expanding

#### Modal Interaction
* Click info button to open
* Click outside or close button to dismiss
* Prevents background interaction while open
* Keyboard accessible (Escape to close)

---

### ⚙️ Technologies

* **Next.js 14**: React framework
* **TailwindCSS**: Styling
* **Framer Motion**: Animations
* **React Icons**: Icon set
* **TypeScript**: Type safety
* **CSS Modules**: Component-specific styles

---

### 📱 Responsiveness

* **Mobile-first design**
* **Landscape optimization** for mobile viewing
* **Fluid typography** and spacing
* **Responsive grid** for different screen sizes
* **Touch-friendly** interaction areas

---

### 🧠 Data Structure

#### Personal Info
```typescript
interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  education: Education[];
  experience: Experience[];
  contact: Contact;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  icon: IconType;
}

interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string[];
  icon: IconType;
}

interface Contact {
  email: string;
  github: string;
  linkedin: string;
}
```

---

### 🔍 SEO & Accessibility

* **Meta tags** for social sharing
* **Semantic HTML** structure
* **ARIA labels** for interactive elements
* **Keyboard navigation** support
* **Color contrast** compliance
* **Alt text** for images

---

### 📂 Project Structure
```
/src
  /app
    globals.css
    layout.tsx
    page.tsx
  /components
    /BusinessCard
      BusinessCard.module.css
      BusinessCard.tsx
      CardBack.tsx
      CardFront.tsx
      index.ts
  /config
    personal-info.json
  /types
    personal-info.ts
/public
  /images
```
