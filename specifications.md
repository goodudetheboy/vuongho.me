## 🌐 Personal Website Specification: vuongho.me v1

### 🧭 Overall Concept

A minimalist, mobile-first **digital business card** that:

* Shows your **name, title, and image** on the front.
* Flips horizontally on tap to reveal the **back** side with:

  * Logo links to workplace, school, and contact points.
  * Each icon reveals extra text or a small modal on tap.
* Built for high polish with animations, subtle interactivity, and a **dark mode aesthetic**.

---

### 📐 Layout Overview

#### 1. **Front of Card (Default View)**

* **Background**: solid dark color (`#0a0a0a`), subtle animated texture (e.g., particles.js or pure CSS noise).
* **Left**: your portrait image (circular, shadowed, maybe light glow).
* **Right**:

  * Large name: `Vuong Ho` in a bold, clean sans-serif (e.g., `Space Grotesk`, `Inter`, or `Satoshi`).
  * Subtitle: e.g., “Software Engineer @ Bloomberg, NYC”.
* **Entire card is horizontally centered and responsive**, designed to feel like a real business card when viewed in landscape on mobile.

#### 2. **Back of Card (Tap/Flip View)**

* **Flip Animation**: smooth CSS `transform: rotateY(180deg)` (can use `react-card-flip` or hand-rolled).
* **Background**: same dark tone.
* **Content**:

  * A row or grid of logos/icons:

    * 🧠 Meta (Internship)
    * 🔍 Google (Internship)
    * 🧪 University of Rochester (HCI Lab, MSCS)
    * 🎓 University of Rochester (Alma Mater)
    * ✉️ Email
    * 🐙 GitHub
    * 🔗 LinkedIn
  * On tap/click: each icon expands or reveals a small tooltip/text like:

    * `"SWE Intern @ Meta – Summer 2023"`
    * `"MSCS, HCI Research Assistant"`
* **Animations**:

  * On hover/tap: subtle grow or glow.
  * Optional tooltip/modal effect.

---

### 📱 Responsiveness

* **Mobile-first design** (use media queries to adapt to desktops).
* **Landscape priority on phones**: suggest `orientation: landscape` for ideal experience.
* **Single-page with no scrolling**—everything fits neatly within the viewport.

---

### 🎨 Visual Design

#### Fonts

* `Space Grotesk` (Google Fonts)
* Fallback: `sans-serif`

#### Colors

```css
:root {
  --bg: #0a0a0a;
  --card-bg: #111111;
  --text-primary: #ffffff;
  --text-secondary: #aaaaaa;
  --accent: #00ffc8;
}
```

#### Theme

* **Dark Mode Only**.
* **Minimal glow, soft shadows**, rounded corners (`border-radius: 1.5rem`).
* Flat design with emphasis on typography and interaction.

---

### ⚙️ Technologies

* **React.js** (or HTML/CSS/JS if you want pure frontend)
* CSS modules or TailwindCSS (optional)
* Flip animation: `react-card-flip` or custom CSS
* Icon set: `react-icons`, SVG, or PNG
* Hosting: GitHub Pages / Vercel / Cloudflare Pages

---

### 🧠 Extra Enhancements (Optional)

| Feature            | Description                                     |
| ------------------ | ----------------------------------------------- |
| Favicon + meta     | Custom favicon and social preview image         |
| Vibration feedback | Use mobile haptics on tap (`navigator.vibrate`) |
| SEO                | Basic meta tags for Google indexing             |
| Animated name glow | Subtle text-shadow pulse for name on hover      |
| Accessibility      | Aria-labels for icons                           |

---

### 🔧 Suggested Folder Structure

```
/src
  /components
    CardFront.jsx
    CardBack.jsx
    IconLink.jsx
  /assets
    /images (your photo, logos)
  App.jsx
  index.css or tailwind.css
public/
  index.html
```
