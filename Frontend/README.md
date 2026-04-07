<<<<<<< HEAD
# 🐒 Monkey Dee Preschool Website

A full-featured React website for a preschool — built with React 18, React Router v6, and custom CSS.

---

## 🗂 Folder Structure

```
monkey-dee/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css
    ├── data/
    │   └── programs.js
    ├── components/
    │   ├── Navbar.jsx + Navbar.css
    │   └── Footer.jsx + Footer.css
    └── pages/
        ├── Home.jsx + Home.css
        ├── About.jsx + About.css
        ├── Programs.jsx + Programs.css
        ├── Enrollment.jsx + Enrollment.css
        └── Contact.jsx + Contact.css
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Install & Run

```bash
# 1. Navigate into the project
cd monkey-dee

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## ✅ Features Implemented

### Pages
- **Home** — Hero with animated blobs, stats bar, features grid, programs preview, photo gallery, testimonials, and CTA banner
- **About Us** — Mission statement, values grid (6 cards), curriculum overview (6 domains), teacher profiles
- **Programs** — 6 program cards with hover effects + age filter, comparison table, 4-step enrollment process
- **Enrollment Form** — 3-step wizard with full validation, program radio selection, gender radio buttons, confirmation modal, localStorage persistence
- **Contact** — Contact info, message form, map placeholder with directions, accordion FAQ

### Technical
- React 18 functional components + hooks (useState, useEffect, useRef)
- React Router v6 with `<Routes>`, `<Route>`, `<Link>`, `<NavLink>`, `useNavigate`, `useLocation`
- Controlled form inputs with real-time validation
- Intersection Observer for scroll-triggered hero animation
- Data stored in `localStorage` under key `monkey_dee_enrollments`
- Responsive navbar (hamburger menu on mobile)
- Google Fonts: Fredoka One (display) + Nunito (body)
- Mobile-first responsive layout (CSS Grid + Flexbox)
- CSS custom properties for theming

### Styling
- Bright, playful kids theme with yellow/blue/purple accent palette
- Floating blob backgrounds, bounce animations, float animations
- Hover cards with lift effects and color transitions
- Scroll-triggered fade-up animations via IntersectionObserver

---

## 🛠 Customization

- **Programs data**: Edit `src/data/programs.js` to add/change programs
- **Colors**: Modify CSS variables in `src/styles/global.css` under `:root`
- **Images**: Replace Unsplash URLs with local assets in `src/assets/`
- **Backend**: Replace `localStorage` in `Enrollment.jsx` with a real API call

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| react | 18.x | UI library |
| react-dom | 18.x | DOM rendering |
| react-router-dom | 6.x | Client-side routing |
| vite | 6.x | Build tool & dev server |

No component library required — all UI is custom CSS.

---

Made with ❤️ for Monkey Dee Preschool 🐒
=======
# Crocodile
Find another key of success because education is not working.
>>>>>>> 9fa62f11c2ce16f8bce945b557685510eafa4980
