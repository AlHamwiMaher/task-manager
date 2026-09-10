# MERN Stack Learning Roadmap — Task Manager Project

## How to use this file
1. After each session, update the "Current Status" section below.
2. At the start of a NEW chat with Claude, paste the "Current Status" block + mention which Phase you're starting. Upload your current code files (or key files) if relevant.
3. Tick off phases as you complete them.
4. Items marked `— go deeper (don't skip)` are gap flags: named on purpose, but not explained here. When we reach one, dig into it for real — don't just read a definition and move on. Items marked `✅ Closed` were resolved in a real coding session (noted for tracking only).

---

## Project: Task Manager with Authentication
- Frontend: React (deploy on Vercel)
- Backend: Express (deploy on Render)
- Database: MongoDB Atlas
- JS level: knows basics (variables, functions, loops) — explain intermediate JS concepts (arrow functions, destructuring, async/await, etc.) as they come up
- CSS level: beginner — keep styling simple

---

## Phases

- [x] **Phase 0 — Setup**: VS Code, Node.js, Git, MongoDB Atlas account, Postman/Thunder Client
    - `.gitignore` setup — go deeper (don't skip)
    - Folder structure conventions — go deeper (don't skip)

---

- [x] **Phase 1 — Project structure & first Express server**
  - Created `backend/` folder, `git init`, `npm init -y`
  - Installed `express`, `nodemon`
  - Built first server (`index.js`) with a single `GET /` route
  - Status: server runs successfully with `npx nodemon index.js`, returns "Hello from Express!"
    - `package.json` fields — go deeper (don't skip)
    - `node_modules` — go deeper (don't skip)
    - `dependencies` vs `devDependencies` — go deeper (don't skip)

---

- [x] **Phase 2 — REST API basics (mock data, no DB yet)**
  - Build full CRUD routes for "tasks" (GET, POST, PUT, DELETE) using an in-memory array
  - Learn: route params, request body, JSON, status codes, middleware (`express.json()`)
  - Also covers: error handling basics (e.g. task not found → 404), returning correct status codes
    - REST principles — go deeper (don't skip)
    - Query params vs route params vs request body — go deeper (don't skip)
  - ✅ Closed:
    - Backend input validation (type/length checks) — PUT /tasks/:id session

---

- [x] **Phase 3 — Connect MongoDB Atlas + Mongoose**
  - Fix MongoDB Atlas setup issue
  - Connect Express to MongoDB using Mongoose
  - Replace mock array with real Task model/schema
  - Covers: environment variables, `.env` files, `dotenv` package (never hardcode secrets)
    - Separation of concerns (routes → controllers → models → config) — go deeper (don't skip)
  - ✅ Closed:
    - Mongoose schema enforcement (strict mode, type casting) — gap-closing session
    - Mongoose validation (`required`, `minlength`, `maxlength`, `match`, custom `validate`, regex basics) — gap-closing session
    - DB connection failure handling (refactored into `config/db.js`, `async/await` + `try/catch` + `process.exit(1)` before `app.listen()`) — gap-closing session
    - ObjectId validation methods — PUT /tasks/:id session

---

- [x] **Phase 4 — Authentication**
  - User model, password hashing (bcrypt)
  - Register/Login routes, JWT tokens
  - Protect task routes (only logged-in users see their own tasks)
  - Covers: custom `authMiddleware` function to protect routes using JWT
  - ✅ Closed:
    - JWT structure (header.payload.signature, base64 not encryption, signature prevents tampering) — gap-closing session
    - bcrypt salt rounds and one-way hashing mechanics — gap-closing session
    - Refresh tokens (awareness level) — gap-closing session
    - Rate limiting (awareness level) — gap-closing session
    - Ownership enforcement in queries (`findOneAndUpdate({ _id: taskId, owner: userId })`, unified 404 security) — PUT /tasks/:id session
    - Global Express error handler (error-handling middleware) — go deeper (don't skip)

---

- [x] **Phase 5 — React basics**
  - Create React app (Vite), JSX, components, props
  - ✅ Closed:
    - Passing functions as props — gap-closing session
    - Conditional rendering (`&&`, ternary) — gap-closing session
    - `.map()` for list rendering — already practiced in session
    - Component lifecycle (mount/update/unmount, awareness level) — go deeper (don't skip)

---

- [x] **Phase 6 — React state & hooks**
  - useState, useEffect, forms, controlled inputs
  - ✅ Closed:
    - Re-render triggers — gap-closing session
    - State mutation rules (never mutate directly, always new references via spread) — gap-closing session
    - `useRef` (awareness level) — gap-closing session

---

- [x] **Phase 7 — React Router**
  - Multiple pages: Login, Register, Dashboard
  - `BrowserRouter`/`Routes`/`Route` setup, `useNavigate`, `useParams`
  - `ProtectedRoute` component using the `children` prop pattern and `localStorage.getItem('token')`
  - ✅ Closed:
    - `useNavigate` — Phase 7 session
    - `useParams` — Phase 7 session
    - Protected routes — Phase 7 session
    - 404 page handling — Phase 7 session
    - Client-side vs server-side routing — Phase 7 session
    - `Link`/`NavLink` vs plain `<a>` tag — go deeper (don't skip)
    - Query params (`useSearchParams`) vs route params (`useParams`) — go deeper (don't skip)
    - Redirect-if-already-logged-in (guarding Login/Register routes from already-authenticated users) — go deeper (don't skip)
    - Redirect-back-after-login (send user to the page they originally wanted, not just a hardcoded `/dashboard`) — go deeper (don't skip)
    - `navigate('/x', { replace: true })` vs default push (why login/logout should replace history) — go deeper (don't skip)

---

- [ ] **Phase 8 — Connect Frontend to Backend**
  - fetch calls, storing & sending JWT token, protected pages
  - ✅ Closed:
    - `VITE_API_URL` / `src/config.js` env setup (Vite only reads `.env` at startup, needs restart on change) — Phase 8 session
    - `useEffect` + async inner function pattern for data fetching — Phase 8 session
    - Rendering task lists from real backend data — Phase 8 session
    - Running frontend + backend simultaneously (two terminals/two ports) — Phase 8 session
    - Debugging via browser Network tab (not just console) — Phase 8 session
    - CORS — what an origin is, why browsers block cross-origin reads by default, `app.use(cors())` open-for-all-origins in dev vs restricted origin in production — Phase 8 session (unplanned gap, discovered connecting real browser frontend to backend; Thunder Client never triggers CORS since it's not a browser-origin JS request)
  - 🔴 Current blocker: `Dashboard.jsx`'s `fetchTasks` call does not attach the JWT from `localStorage` to the request (no `Authorization` header), so the protected `/tasks` route correctly returns 401 "no token provided"
  - ⚠️ Missing / still to cover (old + audit pass, merged, reordered into logical build order):
    1. JWT in request headers (`Authorization: Bearer <token>`) — **next immediate topic** — go deeper (don't skip)
    2. JWT storage in localStorage (how/when it's read, not just that it's used by `ProtectedRoute`) — go deeper (don't skip)
    3. `fetch` does NOT reject on 401/404/500 — only on network failure; must check `response.ok` manually, `try/catch` alone won't catch a bad HTTP status — go deeper (don't skip)
    4. Reusable `fetch` wrapper function (fetch's equivalent to an axios interceptor — auto-attach JWT to every request) — go deeper (don't skip)
    5. Central API layer (`api.js` / `fetchClient.js`) so all requests share the same fetch logic — go deeper (don't skip)
    6. Decoding the JWT payload client-side to read user info (e.g. username) without a backend call — go deeper (don't skip)
    7. How you actually detect "token expired" (decode `exp` locally vs waiting for a 401) — go deeper (don't skip)
    8. Auto-redirect on token expiry — go deeper (don't skip)
    9. Backend error handling in UI (401/403/404/500 → user-facing messages) — go deeper (don't skip)
    10. Logout flow — go deeper (don't skip)
    11. Request lifecycle (loading → success → error) and why every request should follow the same flow — go deeper (don't skip)
    12. Loading states — go deeper (don't skip)
    13. Empty states — go deeper (don't skip)
    14. Frontend input validation — go deeper (don't skip)
    15. Cleaning up in-flight fetch on unmount (`AbortController` in `useEffect`) — go deeper (don't skip)
    16. CORS in production (restricted origin, deployment-phase follow-up) — go deeper (don't skip)

---

- [ ] **Phase 9 — Basic styling**
  - Simple, clean CSS (beginner-friendly)
  - ⚠️ Missing / still to cover (old + audit pass, merged):
    - Responsive layout basics — go deeper (don't skip)
    - UI feedback (success/error messages) — go deeper (don't skip)
    - Disabled button state during requests — go deeper (don't skip)
    - Basic accessibility (labels tied to inputs, focus states, alt text) — go deeper (don't skip)
    - CSS organization — global vs component-scoped/CSS Modules in Vite — go deeper (don't skip)
    - Basic UX principles (consistent spacing, button states, visual hierarchy, readable forms) — go deeper (don't skip)

---

# Phase 10 — Deployment

**Goal:** Deploy the MERN Task Manager to production and understand the essential concepts behind deploying a full-stack application.

### Deployment Stack

* **Frontend → Vercel**
* **Backend → Render**
* **Database → MongoDB Atlas**

---

## 10.1 — Understand Production vs Development

Understand the basic difference between:

```text
Development

React → localhost:3000/5173
Express → localhost
MongoDB Atlas
```

and:

```text
Production

Vercel → Render → MongoDB Atlas
```

Understand that production uses different URLs, environment variables, and hosting infrastructure.

---

## 10.2 — Production Build

Learn what a production build is.

Practice:

```bash
npm run build
```

Understand:

* What the build does
* What the `dist/` folder is
* Why we build before deploying
* Difference between development and production builds
* How to recognize a build failure

Don't go deeply into optimization yet.

---

## 10.3 — Environment Variables

Learn the basics of production environment variables.

Understand:

* `.env`
* `.gitignore`
* Vercel environment variables
* Render environment variables
* Why secrets should never be committed to GitHub

For this project, understand the difference between:

```text
Frontend:
VITE_API_URL
```

and backend secrets such as:

```text
MONGO_URI
JWT_SECRET
```

---

## 10.4 — `VITE_` Variables

Learn this important rule:

> **Anything beginning with `VITE_` is public.**

Understand why:

```text
VITE_API_URL
```

is okay in the frontend, while:

```text
MONGO_URI
JWT_SECRET
```

must remain on the backend.

No advanced frontend security yet.

---

## 10.5 — MongoDB Atlas Network Access

Prepare MongoDB Atlas for Render.

Learn:

* Why Render needs access to Atlas
* Atlas Network Access
* `0.0.0.0/0`
* Why the backend may fail to connect if Atlas blocks Render
* Basic security consideration of allowing access from anywhere

---

## 10.6 — Production CORS

Update CORS so that:

```text
Vercel frontend
       ↓
Render backend
```

can communicate.

Understand:

* What CORS is
* Why localhost worked during development
* Why the Vercel domain is different
* How to allow the production frontend origin

Keep this basic for now.

---

## 10.7 — Monorepo Deployment Configuration

Our project contains the frontend and backend separately.

Understand that the hosting platforms need to know **which folder they are deploying**.

### Vercel

Deploy:

```text
client/
```

### Render

Deploy the backend.

Learn the basics of:

* Root directory
* Build command
* Start command
* Output directory

---

## 10.8 — Deploy the Backend to Render

Deploy the Express backend.

Learn:

* Connect GitHub repository
* Select the correct directory
* Configure build/start commands
* Add environment variables
* Deploy
* Verify that the server starts successfully

---

## 10.9 — Health Check Endpoint

Add a simple:

```http
GET /health
```

endpoint.

Use it to answer:

> “Is my deployed backend actually running?”

Test the endpoint after deployment.

This gives us a simple way to separate:

```text
Backend problem
```

from:

```text
Frontend problem
```

---

## 10.10 — Basic Render Logs

Learn how to:

* Open Render logs
* Recognize a deployment/build error
* Recognize a backend startup error
* Recognize a basic runtime error
* Find useful error messages

We don't need advanced monitoring yet.

---

## 10.11 — Render Cold Starts

Understand the basic concept:

> The free Render backend may sleep when inactive.

Therefore:

* The first request may be slow
* Later requests may be faster
* A slow first request does not automatically mean the application is broken

That's enough for this project.

---

## 10.12 — Deploy the Frontend to Vercel

Deploy the React/Vite frontend.

Learn:

* Connect GitHub
* Select `client/`
* Configure the production build
* Add `VITE_API_URL`
* Deploy
* Open the public application

---

## 10.13 — End-to-End Testing

After both deployments are complete, test the **real production application**.

Verify:

### Authentication

* Register
* Login
* Logout

### Dashboard

* Load tasks
* Add task
* Complete/uncomplete task
* Delete task

### Profile

* Load profile
* Change password
* Delete account

### Password reset

* Forgot password
* Reset password

The important thing is confirming:

```text
Browser
   ↓
Vercel
   ↓
Render
   ↓
MongoDB Atlas
```

works as one complete application.

---

## 10.14 — Basic Production Debugging

Learn one simple debugging workflow:

```text
Something doesn't work
        ↓
Browser DevTools
        ↓
Network tab
        ↓
Check request + response
        ↓
Check Render logs
        ↓
Check MongoDB Atlas if necessary
```

Learn to identify whether the problem is likely:

* Frontend
* API URL
* CORS
* Backend
* Environment variable
* MongoDB connection

---

## 10.15 — Basic Deployment Security Check

Before finishing, verify:

* `.env` is not committed to GitHub
* MongoDB credentials are only on Render
* JWT secret is only on Render
* No secrets use `VITE_`
* Production CORS is configured
* MongoDB Atlas is accessible from Render
* Application works over HTTPS

No advanced security audit yet.

---

# Phase 10 Completion Criteria

Phase 10 is complete when:

* [ ] Production build works
* [ ] Backend is deployed to Render
* [ ] Frontend is deployed to Vercel
* [ ] MongoDB Atlas connects successfully
* [ ] Environment variables are configured correctly
* [ ] Production CORS works
* [ ] `/health` works
* [ ] Basic Render logs are understood
* [ ] Render cold starts are understood
* [ ] Full application works end-to-end
* [ ] Basic production debugging is understood
* [ ] Basic deployment security has been checked

### What we intentionally DON'T cover deeply yet

We will save these for **Project 2 — Shoe Outlet E-commerce**:

* Advanced performance optimization
* CDN and caching strategies
* Advanced DNS/domain configuration
* CI/CD pipelines
* Docker
* VPS/server administration
* Advanced security
* Production monitoring
* Logging infrastructure
* Database performance optimization
* Image optimization
* SEO
* Scaling
* Load balancing
* Advanced deployment architecture
* Advanced Hostinger deployment
* Production cost optimization

**Phase 10 is about getting your first real application online and understanding the fundamentals.**

**Project 2 is where we go professional.**


---

## Current Status (update this before starting a new chat)
Last completed: Phase 7 — React Router (full)
In progress: Phase 8 — Connect Frontend to Backend (env vars, data fetching, CORS closed; JWT Authorization header attachment is the current blocker)
Next step: Phase 8 — attach JWT Authorization header to `fetch` calls so protected routes work end-to-end
Recently closed gaps: VITE_API_URL/config.js env setup, useEffect + async fetch pattern, CORS (Phase 8); useNavigate, useParams, protected routes, 404 handling, client vs server routing (Phase 7)
Known issues: `Dashboard.jsx` `fetchTasks` gets 401 — no `Authorization` header attached yet

---

## Template to paste at the start of a new chat
```
I'm learning MERN stack by building a Task Manager project with you.
Here's my current status from ROADMAP.md:
Last completed: Phase 7 — React Router (full)
In progress: Phase 8 — Connect Frontend to Backend
Next step: attach JWT Authorization header to fetch calls for protected routes
Known issues: Dashboard.jsx fetchTasks gets 401 (no Authorization header yet)
Please continue from here, same teaching style as before:
explain concepts as we hit them, I know JS basics but not Node/Express/React yet,
CSS beginner level, English only.
```
