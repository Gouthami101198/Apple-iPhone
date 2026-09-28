#  Apple iPhone Showcase & Store — Web Experience

A pixel-accurate, ultra-responsive, and modern recreation of the **Apple iPhone** flagship marketing landing page and Apple Store experience. Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **React Router v7**.

Featuring genuine high-resolution Apple product photography, interactive hardware showcases (including the signature **Dynamic Island** with real-time audio and timer simulations), an e-commerce shopping bag with full **Delete Cart / Undo** capabilities, interactive device configurators, and fluid micro-animations.

---

## 📑 Table of Contents

- [Features](#-features)
  - [Apple Design System & Fluid Typography](#apple-design-system--fluid-typography)
  - [Interactive Apple Dynamic Island](#interactive-apple-dynamic-island)
  - [E-Commerce Shopping Bag & Delete Cart](#e-commerce-shopping-bag--delete-cart)
  - [Interactive iPhone Configurator](#interactive-iphone-configurator)
  - [Interactive Comparison Matrix](#interactive-comparison-matrix)
  - [Global Search & Quick Links](#global-search--quick-links)
  - [Guided Tour Film Modal](#guided-tour-film-modal)
  - [Animation & Micro-Interactions](#animation--micro-interactions)
  - [Complete Responsiveness](#complete-responsiveness)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [State Management (`src/store.jsx`)](#-state-management)
- [Application Routes](#-application-routes)
- [Getting Started](#-getting-started)
- [Design Tokens & Styling](#-design-tokens--styling)
- [Browser Support & Accessibility](#-browser-support--accessibility)

---

## ✨ Features

### Apple Design System & Fluid Typography
- **Tailwind CSS v4 Engine**: Built using modern CSS-first `@theme` configuration without legacy configuration files.
- **San Francisco Font Stack**: Native Apple font hierarchy (`-apple-system`, `BlinkMacSystemFont`, `SF Pro Display`, `SF Pro Text`).
- **Official Color Palette**: Curated tokens including Deep Purple (`#594f63`), Space Black (`#343338`), Starlight, Product(RED), Midnight, Yellow, and Apple Blue (`#0071e3`).
- **High-Fidelity Assets**: Bundled official high-resolution device photos, MagSafe ecosystem visuals, and Apple icons.
- **Adaptive Apple Favicon**: Vector SVG favicon with automatic `prefers-color-scheme` support (inverts between dark and light modes) plus Apple touch icon.

---

### 🏝 Interactive Apple Dynamic Island
Located prominently in the **iPhone 14 Pro** section, this component replicates the signature hardware/software integration of iOS 16:
- **3 Live Interactive Modes**:
  1. **♫ Music Player**:
     - Dynamic live 4-band soundwave equalizer with CSS keyframe physics (`soundwave-bar-1` through `soundwave-bar-4`).
     - Album artwork thumbnail with music glyph.
     - Song title: *Anti-Hero · Taylor Swift (Midnights)*.
     - Interactive progress bar with timestamps.
     - Media controls (Previous, Pause/Play, Next).
  2. **📞 Incoming Phone Call**:
     - Caller identity: *Tim Cook*.
     - Real-time call duration timer (`02:45`).
     - Audio waveform status with interactive Mute and Decline buttons.
  3. **⏱ Countdown Timer**:
     - Live ticking seconds countdown timer (`14:59` to `00:00`).
     - Amber timer glyph and instant Reset action.
- **Morphing Physics**: Pill smoothly expands from a compact `36px` capsule into a full `350px` card on hover or click.

---

### 🛍 E-Commerce Shopping Bag & Delete Cart
A comprehensive shopping bag system supporting additions, deletions, quantity changes, and checkout flows:
- **Delete Cart (Clear Bag)**:
  - **Header Bag Dropdown**: Prominent **"Delete Cart"** button clears all items instantly.
  - **Bag Review Page (`/bag`)**: Dedicated header action bar with a **"Delete Cart"** button and secondary delete trigger in the summary section.
  - **Apple-Styled Confirmation Modal**: Clean modal dialog (*"Delete Cart? Are you sure you want to remove all items from your shopping bag?"*) with *Keep Items* and *Delete Cart* actions.
- **Individual Item Deletion**:
  - Trash can icon buttons beside every item row in the quick-view BagPanel and on `/bag`.
- **Instant 1-Click Undo**:
  - Whenever an item is deleted or the entire cart is cleared, an interactive Toast notification appears with an **"Undo"** action that restores the previous bag state.
- **Product Page Awareness (`/buy/:id`)**:
  - If a selected phone configuration is already in the bag, the Configurator displays an *"In your Bag (Qty: X)"* banner with a direct **"Delete from Bag"** button and *"View Bag"* shortcut.
- **Store Page Awareness (`/store`)**:
  - Accessories cards show current bag quantity and an instant trash removal button.
- **Animated Empty Bag State**:
  - Floating bag icon animation (`animate-apple-float-subtle`) with quick links back to the store.

---

### ⚙️ Interactive iPhone Configurator (`/buy/:id`)
- **Model Selector**: Switch between iPhone 14 Pro, iPhone 14, iPhone 14 Plus, and iPhone SE.
- **Finish Selector**: Realistic color swatches that update the finish label.
- **Capacity Selector**: 128GB, 256GB, 512GB, and 1TB storage tiers with calculated monthly installment options.
- **Apple Trade-In Estimator**: Toggle eligible smartphone trade-in credit ($200) with instant subtotal deductions.
- **Summary Card**: Real-time total price, monthly installment at 0% APR, and instant bag additions.

---

### 📊 Interactive Comparison Matrix
- Side-by-side comparison of **iPhone 14 Pro**, **iPhone 14**, **iPhone 13**, and **iPhone SE**.
- **Model Quick-Jump Selector**: Sticky pills on mobile for single-tap navigation between columns.
- **Interactive Color Swatches**: Switch finishes directly within the comparison table.
- **Feature Breakdown**: Displays, Dynamic Island, Emergency SOS via satellite, Crash Detection, camera systems, battery life, and processors (A16 Bionic vs A15 Bionic).
- **Hover Elevation**: Devices lift smoothly (`-translate-y-2`) on desktop hover.

---

### 🔍 Global Search & Quick Links
- Search dropdown overlay triggered from the header navigation bar.
- Real-time client-side search across models, accessories, features, and trade-in topics.
- Quick links for instant navigation to popular sections.

---

### 🎬 Guided Tour Film Modal
- Feature banner with NYC backdrop showcasing the iPhone 14 and iPhone 14 Pro lineup.
- Animated "Watch the film" button with micro-scaling play indicator.
- **Dual-Mode Cinematic Player**:
  - **Guided Film Reel**: Interactive cinematic tour with animated chapters (Dynamic Island, 48MP Camera, Action Mode, Emergency SOS via Satellite), scrubbing progress bar, and play/pause controls.
  - **Keynote Broadcast**: Embedded public Apple Event keynote reveal broadcast (`zbUPe53sV-8`) on YouTube.
- Includes backdrop blur, background scroll locking, and keyboard `Escape` dismiss support.

---

### ✨ Animation & Micro-Interactions
- **`animate-apple-float`**: 6-second vertical breathing motion applied to hero product showcases.
- **`animate-badge-pop`**: Spring bounce animation triggered on the bag counter whenever items are added or deleted.
- **`animate-pulse-subtle`**: Pulsing glow on "New" tags and status pills.
- **`.apple-card-hover`**: Smooth 3D elevation and shadow depth across product cards and info tiles.
- **Scroll-Triggered Reveals**: Custom `IntersectionObserver` hook (`useReveal.js`) powering smooth fade-ups as the user scrolls.

---

### 📱 Complete Responsiveness
- **Mobile (320px – 480px)**: Compact chapter navigation with momentum touch panning, stacked cards, full-width buttons, and slide-out mobile drawer with background scroll lock.
- **Tablet (768px – 1024px)**: 2-column grids, balanced typography, and responsive sticky configurator layout.
- **Desktop (1280px+)**: Full expansive Apple layout matching standard display resolutions.

---

## 🛠 Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Core** | React 19 (`react`, `react-dom` ^19.2.8) | Modern React architecture with hooks |
| **Routing** | React Router v7 (`react-router-dom` ^7.18.4) | Declarative client-side routing & deep linking |
| **Styling** | Tailwind CSS v4 (`tailwindcss` ^4.3.3) | CSS-first `@theme` design tokens and utilities |
| **Build Tool** | Vite 8 (`vite` ^8.3.0) | Lightning-fast HMR and production bundling |
| **Vite Plugin** | `@tailwindcss/vite` | Official Tailwind v4 Vite integration |
| **Linter** | Oxlint (`oxlint` ^1.81.0) | High-performance Rust-based JavaScript/React linter |

---

## 📂 Project Architecture

```
d:/Apple B/
├── index.html                   # HTML entry point with Apple favicon, SVG icons & SEO meta
├── package.json                 # Project scripts and dependencies
├── vite.config.js               # Vite configuration with Tailwind CSS plugin
├── .vscode/settings.json        # Config to ignore false-positive @theme warnings
│
├── public/
│   ├── favicon.svg              # Adaptive dark/light SVG Apple logo favicon
│   └── apple-touch-icon.svg     # iOS home-screen touch icon
│
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main router configuration & layout frame
│   ├── index.css                # Tailwind v4 @theme, custom keyframes & utilities
│   ├── store.jsx                # Global shopping bag state, toast notifications & routing
│
│   ├── assets/
│   │   └── images.js            # Bundled asset dictionary for high-res Apple photography
│
│   ├── components/
│   │   ├── Header.jsx           # Sticky global nav, chapter nav, search panel & bag dropdown
│   │   ├── Hero.jsx             # iPhone 14, iPhone 14 Pro, and iPhone SE hero sections
│   │   ├── DynamicIsland.jsx    # Interactive iPhone 14 Pro Dynamic Island (Music, Call, Timer)
│   │   ├── GuidedTour.jsx       # Feature banner & video film modal
│   │   ├── CompareTable.jsx     # 4-model specification comparison table & mobile selectors
│   │   ├── WaysToSave.jsx       # Carrier deals (AT&T, T-Mobile, Verizon), Trade-In & Apple Card
│   │   ├── Accessories.jsx      # MagSafe, AirTag, AirPods featured ecosystem tiles
│   │   ├── WhatMakesIphone.jsx  # iOS 16 features & Switching to iPhone guide
│   │   ├── Services.jsx         # Apple One, Apple TV+, Apple Music, Arcade, Fitness+, News+
│   │   ├── ResearchApp.jsx      # Apple Research app initiative section
│   │   ├── Footer.jsx           # Apple directory links, legal footnotes & copyright
│   │   ├── Toast.jsx            # Contextual notification toast with Undo support
│   │   ├── Reveal.jsx           # Scroll-reveal wrapper component
│   │   └── ui.jsx               # Shared UI atoms (BuyButton, TextLink, Tile, CtaRow, Go)
│
│   ├── pages/
│   │   ├── StorePage.jsx        # "Shop iPhone" grid & filterable accessories catalog
│   │   ├── BuyPage.jsx          # Interactive phone configurator with in-bag detection
│   │   ├── BagPage.jsx          # Full shopping bag review, Delete Cart, & order placement
│   │   └── InfoPage.jsx         # Dedicated ecosystem pages (Mac, iPad, Watch, Support, etc.)
│
│   ├── hooks/
│   │   └── useReveal.js         # IntersectionObserver scroll animation hook
│
│   └── data/
│       ├── content.js           # Copywriting, navigation items, comparison specs & services
│       └── shop.js              # Product catalogue, color options, pricing & search index
│
└── scripts/
    ├── download_all_apple_images.js  # Asset acquisition script
    └── extract_images.js             # Asset verification script
```

---

## 🔄 State Management

Global state is cleanly managed via React Context in [`src/store.jsx`](file:///d:/Apple%20B/src/store.jsx):

```javascript
const {
  bag,             // Current array of items in shopping bag
  bagCount,        // Total quantity of all items in bag
  addToBag,        // Adds item or increments quantity (capped at 10)
  removeFromBag,   // Removes item by key and triggers toast with Undo
  clearBag,        // Empties the entire bag and triggers toast with Undo
  setQty,          // Sets explicit item quantity (removes if <= 0)
  toast,           // Current active toast notification
  dismissToast,    // Dismisses notification immediately
  navigate,        // Route navigator with section anchor support
} = useShop();
```

### Automatic Hash Navigation (`ScrollManager`)
- Handles smooth in-page jumping for chapter links (e.g. `/#compare`, `/#tour`, `/#save`).
- Auto-scrolls to page top on route transition.

---

## 🧭 Application Routes

| Path | Component | Description |
|---|---|---|
| `/` | `HomePage` | Full iPhone flagship marketing showcase |
| `/store` | `StorePage` | Apple Store all-models catalog & filterable accessories |
| `/buy/:id` | `BuyPage` | Product configurator (`iphone-14-pro`, `iphone-14`, `iphone-se`) |
| `/bag` | `BagPage` | Shopping bag review, Delete Cart, quantity adjustments, and checkout |
| `/mac` | `InfoPage` | Mac product family overview |
| `/ipad` | `InfoPage` | iPad product family overview |
| `/watch` | `InfoPage` | Apple Watch product family overview |
| `/tv-home` | `InfoPage` | Apple TV 4K & HomePod overview |
| `/entertainment`| `InfoPage` | Apple Music, TV+, Arcade, Fitness+ bundle overview |
| `/support` | `InfoPage` | Apple Support, AppleCare+, and trade-in support |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** (or `pnpm` / `yarn`)

### Installation & Run

1. Clone or open the workspace:
   ```bash
   cd "d:/Apple B"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. Check code quality with the linter:
   ```bash
   npm run lint
   ```

5. Create production build:
   ```bash
   npm run build
   ```

6. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## 🎨 Design Tokens & Styling

Defined in [`src/index.css`](file:///d:/Apple%20B/src/index.css) using Tailwind CSS v4 `@theme`:

```css
@theme {
  --font-sf: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text",
    "Helvetica Neue", Helvetica, Arial, sans-serif;
  --color-apple-black: #1d1d1f;
  --color-apple-dark: #161617;
  --color-apple-gray-dark: #333336;
  --color-apple-gray: #6e6e73;
  --color-apple-gray-light: #86868b;
  --color-apple-bg-gray: #f5f5f7;
  --color-apple-bg-card: #fbfbfd;
  --color-apple-blue: #0071e3;
  --color-apple-blue-hover: #0077ed;
  --color-apple-orange: #f56300;
  --color-apple-purple: #594f63;
  --color-apple-gold: #f4e8ce;
  --color-apple-silver: #f0f2f2;
  --color-apple-spaceblack: #343338;
}
```

---

## ♿ Browser Support & Accessibility

- **Keyboard Navigation**: Full keyboard tab navigation, `Escape` key listeners for search and bag panels, and visible focus rings.
- **Screen Reader Support**: Semantic HTML5 landmark tags (`<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`), `aria-expanded`, `aria-label`, and `role="status"` on live toasts.
- **Scroll Behavior**: Smooth scroll margins (`scroll-margin-top: 56px`) prevent content from hiding beneath the sticky global nav bar.
- **Cross-Browser Tested**: Compatible with modern Chrome, Safari, Edge, and Firefox.

---

## 📄 License
This project is an educational and design demonstration recreation of the Apple website UI experience. All Apple trademarks, product names, and imagery belong to Apple Inc.
