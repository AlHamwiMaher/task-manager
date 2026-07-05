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
  - ⚠️ Still to cover:
    - `.gitignore` setup — go deeper (don't skip)
    - Folder structure conventions — go deeper (don't skip)

---

- [x] **Phase 1 — Project structure & first Express server**
  - Created `backend/` folder, `git init`, `npm init -y`
  - Installed `express`, `nodemon`
  - Built first server (`index.js`) with a single `GET /` route
  - Status: server runs successfully with `npx nodemon index.js`, returns "Hello from Express!"
  - ⚠️ Still to cover:
    - `package.json` fields — go deeper (don't skip)
    - `node_modules` — go deeper (don't skip)
    - `dependencies` vs `devDependencies` — go deeper (don't skip)

---

- [x] **Phase 2 — REST API basics (mock data, no DB yet)**
  - Build full CRUD routes for "tasks" (GET, POST, PUT, DELETE) using an in-memory array
  - Learn: route params, request body, JSON, status codes, middleware (`express.json()`)
  - Also covers: error handling basics (e.g. task not found → 404), returning correct status codes
  - ⚠️ Still to cover:
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
  - ⚠️ Still to cover:
    - Mongoose schema enforcement — go deeper (don't skip)
    - Mongoose validation (required fields, min/max length) — go deeper (don't skip)
    - DB connection failure handling — go deeper (don't skip)
  - ✅ Closed:
    - ObjectId validation methods — PUT /tasks/:id session

---

- [x] **Phase 4 — Authentication**
  - User model, password hashing (bcrypt)
  - Register/Login routes, JWT tokens
  - Protect task routes (only logged-in users see their own tasks)
  - Covers: custom `authMiddleware` function to protect routes using JWT
  - ⚠️ Still to cover:
    - JWT structure (header/payload/signature) — go deeper (don't skip)
    - JWT expiry (`expiresIn`) — go deeper (don't skip)
    - bcrypt salt rounds — go deeper (don't skip)
    - One-way password hashing — go deeper (don't skip)
    - Refresh tokens (awareness level) — go deeper (don't skip)
    - Rate limiting (awareness level) — go deeper (don't skip)
  - ✅ Closed:
    - Ownership enforcement in queries (combined check pattern) — PUT /tasks/:id session

---

- [x] **Phase 5 — React basics**
  - Create React app (Vite), JSX, components, props
  - ⚠️ Still to cover:
    - Passing functions as props — go deeper (don't skip)
    - Conditional rendering (`&&`, ternary) — go deeper (don't skip)
    - Component lifecycle (mount/update/unmount, awareness level) — go deeper (don't skip)
  - ✅ Closed:
    - `.map()` for list rendering — already practiced in session

---

- [x] **Phase 6 — React state & hooks**
  - useState, useEffect, forms, controlled inputs
  - ⚠️ Still to cover:
    - Re-render triggers — go deeper (don't skip)
    - State mutation rules (never mutate directly) — go deeper (don't skip)
    - `useRef` (awareness level) — go deeper (don't skip)

---

- [ ] **Phase 7 — React Router**
  - Multiple pages: Login, Register, Dashboard
  - ⚠️ To cover:
    - `useNavigate` — go deeper (don't skip)
    - `useParams` — go deeper (don't skip)
    - Protected routes — go deeper (don't skip)
    - 404 page handling — go deeper (don't skip)
    - Client-side vs server-side routing — go deeper (don't skip)

---

- [ ] **Phase 8 — Connect Frontend to Backend**
  - axios/fetch calls, storing & sending JWT token, protected pages
  - ⚠️ To cover:
    - JWT storage in `localStorage` — go deeper (don't skip)
    - JWT in request headers (`Authorization: Bearer`) — go deeper (don't skip)
    - Axios interceptors — go deeper (don't skip)
    - Backend error handling in UI (401/403/404/500) — go deeper (don't skip)
    - Auto-redirect on token expiry — go deeper (don't skip)
    - Logout flow — go deeper (don't skip)
    - Loading states — go deeper (don't skip)
    - Empty states — go deeper (don't skip)
    - Frontend input validation — go deeper (don't skip)
    - Frontend environment variables (`VITE_API_URL`) — go deeper (don't skip)
    - CORS — go deeper (don't skip)
    - try/catch with axios — go deeper (don't skip)

---

- [ ] **Phase 9 — Basic styling**
  - Simple, clean CSS (beginner-friendly)
  - ⚠️ To cover:
    - Responsive layout basics — go deeper (don't skip)
    - UI feedback (success/error messages) — go deeper (don't skip)
    - Disabled button state during requests — go deeper (don't skip)

---

- [ ] **Phase 10 — Deployment**
  - Frontend → Vercel, Backend → Render, DB → MongoDB Atlas
  - ⚠️ To cover:
    - Production builds (`npm run build`) — go deeper (don't skip)
    - Environment variables in production (Render/Vercel) — go deeper (don't skip)
    - CORS config for production domains — go deeper (don't skip)
    - Reading Render logs — go deeper (don't skip)
    - End-to-end testing after deployment — go deeper (don't skip)

---

## Current Status (update this before starting a new chat)
Last completed: Phase 6 — useState, useEffect, forms, controlled inputs
Next step: Phase 7 — React Router, multiple pages (Login, Register, Dashboard)
Recently closed gaps: backend input validation, ObjectId validation, ownership-in-query pattern (see Phases 2–4)
Known issues: none

---

## Template to paste at the start of a new chat
```
I'm learning MERN stack by building a Task Manager project with you.
Here's my current status from ROADMAP.md:
Last completed: Phase 6 — useState, useEffect, forms, controlled inputs
Next step: Phase 7 — React Router, multiple pages (Login, Register, Dashboard)
Known issues: none
Please continue from here, same teaching style as before:
explain concepts as we hit them, I know JS basics but not Node/Express/React yet,
CSS beginner level, English only.
```
