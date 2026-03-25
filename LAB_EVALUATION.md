# Lab Evaluation - 1

**Roll No:** _______________

**Name:** _______________

---

## 1. About the Use Case

Galactic Explorer is an interactive educational web application designed specifically for children with autism spectrum disorder (ASD). The application provides a visually engaging and sensory-friendly experience where children can explore our solar system's eight planets, galaxies, black holes, and other cosmic phenomena. Through carefully designed glass-morphism UI elements, gentle animations, and calming deep-space color palettes (blues, purples, and cyans), the app creates a predictable and non-overwhelming environment. Children can click on planet cards to view detailed information including fun facts, planetary statistics, and realistic NASA-style images. The application also includes an educational quiz system with three difficulty levels (Easy, Medium, Hard) that provides immediate feedback with explanations, helping children learn about space at their own pace while earning achievement badges that track their progress.

---

## 2. Purpose: How Will This Application Help Autism Kids?

| Benefit | How It Helps |
|---------|--------------|
| **Predictable Interface** | Consistent layouts and navigation patterns reduce anxiety and help children know what to expect |
| **Calming Visual Design** | Deep space theme with soft gradients and gentle colors avoids sensory overload |
| **Self-Paced Learning** | Children can explore content at their own speed without time pressure |
| **Clear Visual Feedback** | Quiz answers show immediate green/red feedback with explanations |
| **Special Interests** | Many autistic children have deep interests in space/astronomy - this app nurtures that |
| **Progress Tracking** | Badge system provides positive reinforcement and visible accomplishments |
| **Reduced Text Complexity** | Simple, clear language in descriptions and fun facts |
| **Touch-Friendly UI** | Large buttons (44px+ touch targets) for easy interaction |
| **Reduced Motion Options** | Respects `prefers-reduced-motion` for children sensitive to animations |

---

## 3. List of Similar Applications

| Application | Features | Comparison to Galactic Explorer |
|-------------|----------|--------------------------------|
| **NASA Kids' Club** | Space games, puzzles, NASA content | More complex interface, not autism-focused |
| **Star Walk Kids** | AR astronomy app, constellation viewing | Requires device movement, can be overwhelming |
| **Solar System Scope** | 3D solar system exploration | Heavy 3D graphics, complex controls |
| **SkyView Lite** | Identify stars/planets in sky | AR-based, requires pointing device |
| **Autism Learning Games** | Various learning activities | Not space-themed, generic approach |

**Galactic Explorer's Advantage:** Combines autism-friendly design principles (predictable, calming, simple) with engaging space content that many autistic children find fascinating, plus gamification through quizzes and badges.

---

## 4. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend Framework** | React 18 + Vite | Fast, component-based UI development |
| **Styling** | Tailwind CSS | Utility-first CSS for responsive design |
| **Animations** | Framer Motion | Smooth, accessible animations |
| **Routing** | React Router DOM | Single-page application navigation |
| **HTTP Client** | Axios | API communication with backend |
| **Backend Runtime** | Node.js | JavaScript server environment |
| **Backend Framework** | Express.js | REST API routing and middleware |
| **Database** | MongoDB + Mongoose | NoSQL database for flexible data storage |
| **Authentication** | LocalStorage-based | Client-side session management |

---

## 5. Responsiveness of the Application

| Responsive Feature | Implementation |
|--------------------|----------------|
| **Mobile-First Grid** | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` - adapts from 1 to 4 columns |
| **Breakpoint-Based Typography** | `text-4xl md:text-6xl` - scales heading sizes |
| **Flexible Containers** | `max-w-7xl mx-auto px-4` - centered with padding |
| **Responsive Padding** | `p-4 md:p-8` - larger spacing on bigger screens |
| **Touch Targets** | Minimum 44px height on interactive elements |
| **Viewport Units** | `min-h-screen` ensures full-height layouts |
| **Flex Wrapping** | `flex-wrap` for badges and tags |
| **Conditional Rendering** | `hidden sm:inline` - show/hide elements by screen size |

---

## 6. Workflow of the Application

```
┌─────────────────┐
│   Login Page    │ ← First-time users must create account
│  (Create/Login) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Home Page    │ ← Main dashboard with planets grid
│   (8 Planets)   │
└────────┬────────┘
         │
    ┌────┴────┬────────────┐
    ▼         ▼            ▼
┌───────┐ ┌───────┐  ┌──────────┐
│Planet │ │Quiz   │  │ Profile  │
│Modal  │ │Page   │  │  Page    │
│(View) │ │(Learn)│  │(Progress)│
└───────┘ └───┬───┘  └──────────┘
              │
      ┌───────┼───────┐
      ▼       ▼       ▼
   Easy    Medium   Hard
   Quiz    Quiz     Quiz
      │       │       │
      └───────┴───────┘
              │
              ▼
      Quiz Complete
      (Earn Badges)
```

**User Flow:**
1. User visits app → Redirected to Login/Signup page
2. Creates account with name, email, password
3. Logs in → Sees Home page with planet grid
4. Clicks planet card → Modal shows detailed info
5. Takes quizzes → Earns badges for completion
6. Views Profile → Sees progress, quiz history, planets explored
7. Signs out → Returns to Login page

---

## 7. List of Files with Purpose

### Frontend (`/client/src/`)

| File | Purpose |
|------|---------|
| **App.jsx** | Main component with routing and auth state management |
| **main.jsx** | React app entry point |
| **index.css** | Global styles, Tailwind imports, CSS variables |

#### Pages (`/client/src/pages/`)
| File | Purpose |
|------|---------|
| **LoginPage.jsx** | User authentication (login/signup) with validation |
| **HomePage.jsx** | Main dashboard with planet grid, tabs for galaxies/phenomena |
| **QuizPage.jsx** | Quiz level selection and question display with scoring |
| **AboutPage.jsx** | Information about solar system and accessibility statement |
| **ProfilePage.jsx** | User profile with stats, badges, quiz history |

#### Components (`/client/src/components/`)
| File | Purpose |
|------|---------|
| **Navbar.jsx** | Navigation bar with auto-hide on scroll |
| **StarField.jsx** | Animated space background with nebulae and stars |
| **StarField.css** | CSS animations for background effects |
| **GlassCard.jsx** | Planet card component with glassmorphism design |
| **PlanetModal.jsx** | Full-screen planet detail view |
| **PlanetImage.jsx** | 2D planet image display component |
| **QuizCard.jsx** | Individual quiz question with answer options |
| **ProgressBadges.jsx** | Achievement badges display |
| **SpaceObjectCard.jsx** | Card for galaxies, comets, etc. |
| **SpaceObjectModal.jsx** | Modal for space object details |

#### Data (`/client/src/data/`)
| File | Purpose |
|------|---------|
| **spaceObjects.js** | Static data for asteroids, comets, galaxies, black holes |

### Backend (`/server/`)

| File | Purpose |
|------|---------|
| **server.js** | Express server setup, middleware, route mounting |
| **.env** | Environment variables (MongoDB URI, port) |

#### Models (`/server/models/`)
| File | Purpose |
|------|---------|
| **Planet.js** | Mongoose schema for planet data |
| **Quiz.js** | Mongoose schema for quiz questions |

#### Routes (`/server/routes/`)
| File | Purpose |
|------|---------|
| **planetRoutes.js** | GET /api/planets, POST /api/planets/seed |
| **quizRoutes.js** | GET /api/quiz/:difficulty, POST /api/quiz/seed |

### Assets (`/client/public/planets/`)
| Files | Purpose |
|-------|---------|
| **planet_earth_*.png** | Realistic Earth image |
| **planet_mars_*.png** | Realistic Mars image |
| **planet_jupiter_*.png** | Realistic Jupiter image |
| **(8 total)** | NASA-style images for all planets |

---

*Document prepared for Lab Evaluation - FFS Subject - SEM 6*
