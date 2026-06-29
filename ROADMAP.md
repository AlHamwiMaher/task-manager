# MERN Stack Learning Roadmap — Task Manager Project

## How to use this file
1. After each session, update the "Current Status" section below.
2. At the start of a NEW chat with Claude, paste the "Current Status" block + mention which Phase you're starting. Upload your current code files (or key files) if relevant.
3. Tick off phases as you complete them.

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
  - ⚠️ Missing spots to cover:
    - `.gitignore` setup (never commit `node_modules` or `.env`)
    - Understanding folder structure before starting a project

---

- [x] **Phase 1 — Project structure & first Express server**
  - Created `backend/` folder, `git init`, `npm init -y`
  - Installed `express`, `nodemon`
  - Built first server (`index.js`) with a single `GET /` route
  - Status: server runs successfully with `npx nodemon index.js`, returns "Hello from Express!"
  - ⚠️ Missing spots to cover:
    - Understanding `package.json` and what each field means
    - What `node_modules` is and why you never touch or commit it
    - Difference between `dependencies` and `devDependencies`

---

- [x] **Phase 2 — REST API basics (mock data, no DB yet)**
  - Build full CRUD routes for "tasks" (GET, POST, PUT, DELETE) using an in-memory array
  - Learn: route params, request body, JSON, status codes, middleware (`express.json()`)
  - Also covers: error handling basics (e.g. task not found → 404), returning correct status codes
  - ⚠️ Missing spots to cover:
    - What REST actually means and why we follow its conventions
    - When to use query parameters vs route params vs request body
    - Input validation on the backend (never trust what the frontend sends)

---

- [x] **Phase 3 — Connect MongoDB Atlas + Mongoose**
  - Fix MongoDB Atlas setup issue
  - Connect Express to MongoDB using Mongoose
  - Replace mock array with real Task model/schema
  - Covers: environment variables, `.env` files, `dotenv` package (never hardcode secrets)
  - ⚠️ Missing spots to cover:
    - What a Mongoose schema actually enforces and why it matters
    - Mongoose validation (required fields, min/max length, etc.)
    - What happens when the DB connection fails (error handling)

---

- [x] **Phase 4 — Authentication**
  - User model, password hashing (bcrypt)
  - Register/Login routes, JWT tokens
  - Protect task routes (only logged-in users see their own tasks)
  - Covers: custom `authMiddleware` function to protect routes using JWT
  - ⚠️ Missing spots to cover:
    - What a JWT actually contains and how to decode it (header, payload, signature)
    - Token expiry (`expiresIn`) and why it matters for security
    - What bcrypt salt rounds means and why it slows down hacking attempts
    - Why passwords are hashed one-way (you can never recover the original)
    - Refresh tokens — awareness level only (what they are, why apps use them)
    - Rate limiting awareness (preventing brute force attacks on login)

---

- [x] **Phase 5 — React basics**
  - Create React app (Vite), JSX, components, props
  - ⚠️ Missing spots to cover:
    - `.map()` for rendering lists (covered in sessions but not written down)
    - Passing functions as props (parent-child communication)
    - Conditional rendering (`&&` and ternary operator in JSX)
    - React component lifecycle concept — mount, update, unmount (awareness level)

---

- [x] **Phase 6 — React state & hooks**
  - useState, useEffect, forms, controlled inputs
  - ⚠️ Missing spots to cover:
    - What "re-render" actually means and when React triggers it
    - Why you never mutate state directly (`tasks.push()` is wrong — always use setter)
    - `useRef` — awareness level (used to access DOM elements directly without re-rendering)

---

- [ ] **Phase 7 — React Router**
  - Multiple pages: Login, Register, Dashboard
  - ⚠️ Missing spots to cover:
    - `useNavigate` — redirecting the user after login
    - `useParams` — reading URL parameters (e.g. `/tasks/:id`)
    - Protected routes — redirect to Login page if no token found
    - 404 page for unknown routes
    - Difference between client-side routing and server-side routing (concept)

---

- [ ] **Phase 8 — Connect Frontend to Backend**
  - axios/fetch calls, storing & sending JWT token, protected pages
  - ⚠️ Missing spots to cover:
    - Storing JWT in `localStorage` after login
    - Sending JWT in request headers (`Authorization: Bearer <token>`)
    - Using axios interceptors to attach token automatically to every request
    - Handling backend errors in the UI (401, 403, 404, 500 responses)
    - Auto-redirect to Login when token expires (401 handling)
    - Logout flow — clearing token from `localStorage` and redirecting
    - Loading states — showing "loading..." or a spinner while waiting for data
    - Empty states — what to show when the task list is empty
    - Input validation on the frontend (before even sending to backend)
    - Environment variables on the frontend (`VITE_API_URL` in `.env`)
    - What CORS is and why it blocks your frontend from talking to your backend
    - try/catch error handling with axios

---

- [ ] **Phase 9 — Basic styling**
  - Simple, clean CSS (beginner-friendly)
  - ⚠️ Missing spots to cover:
    - Responsive layout basics (app should work on mobile too)
    - User feedback — success and error messages shown in the UI
    - Disabled button state while a request is in progress (prevent double clicks)

---

- [ ] **Phase 10 — Deployment**
  - Frontend → Vercel, Backend → Render, DB → MongoDB Atlas
  - ⚠️ Missing spots to cover:
    - What a production build is (`npm run build`) and why you need it
    - Setting environment variables on Render and Vercel (no `.env` files in production)
    - CORS configuration for your production domain (Render must allow requests from Vercel)
    - Reading Render logs when something breaks in production
    - Testing the deployed app end-to-end after deployment

---

## Current Status (update this before starting a new chat)
Last completed: Phase 6 — useState, useEffect, forms, controlled inputs
Next step: Phase 7 — React Router, multiple pages (Login, Register, Dashboard)
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
