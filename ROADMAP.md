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

- [x] **Phase 0 — Setup**: VS Code, Node.js, Git, MongoDB Atlas account (paused), Postman/Thunder Client

- [x] **Phase 1 — Project structure & first Express server**
  - Created `backend/` folder, `git init`, `npm init -y`
  - Installed `express`, `nodemon`
  - Built first server (`index.js`) with a single `GET /` route
  - Status: server runs successfully with `npx nodemon index.js`, returns "Hello from Express!"

- [x] **Phase 2 — REST API basics (mock data, no DB yet)**
  - Build full CRUD routes for "tasks" (GET, POST, PUT, DELETE) using an in-memory array
  - Learn: route params, request body, JSON, status codes, middleware (`express.json()`)
  - Also covers: error handling basics (e.g. task not found → 404), returning correct status codes

- [ ] **Phase 3 — Connect MongoDB Atlas + Mongoose**
  - Fix MongoDB Atlas setup issue
  - Connect Express to MongoDB using Mongoose
  - Replace mock array with real Task model/schema
  - Covers: environment variables, `.env` files, `dotenv` package (never hardcode secrets)

- [ ] **Phase 4 — Authentication**
  - User model, password hashing (bcrypt)
  - Register/Login routes, JWT tokens
  - Protect task routes (only logged-in users see their own tasks)
  - Covers: custom `authMiddleware` function to protect routes using JWT

- [ ] **Phase 5 — React basics**
  - Create React app (Vite), JSX, components, props

- [ ] **Phase 6 — React state & hooks**
  - useState, useEffect, forms, controlled inputs

- [ ] **Phase 7 — React Router**
  - Multiple pages: Login, Register, Dashboard

- [ ] **Phase 8 — Connect Frontend to Backend**
  - axios/fetch calls, storing & sending JWT token, protected pages

- [ ] **Phase 9 — Basic styling**
  - Simple, clean CSS (beginner-friendly)

- [ ] **Phase 10 — Deployment**
  - Frontend → Vercel, Backend → Render, DB → MongoDB Atlas

---

## Current Status (update this before starting a new chat)

Last completed: Phase 2 — full CRUD REST routes built with in-memory mock data (GET, POST, PUT, DELETE for /tasks), including route params, req.body, status codes, and express.json() middleware
Next step: Phase 3 — connect MongoDB Atlas, set up Mongoose, replace mock array with real Task model
Known issues: MongoDB Atlas setup paused — will fix and connect in Phase 3

## Template to paste at the start of a new chat

```
I'm learning MERN stack by building a Task Manager project with you.
Here's my current status from ROADMAP.md:

Last completed: Phase 2 — full CRUD REST routes built with in-memory mock data
(GET, POST, PUT, DELETE for /tasks), including route params, req.body, 
status codes, and express.json() middleware

Next step: Phase 3 — connect MongoDB Atlas, set up Mongoose, replace mock 
array with real Task model

Known issues: MongoDB Atlas setup paused — will fix and connect in Phase 3

Please continue from here, same teaching style as before:
explain concepts as we hit them, I know JS basics but not Node/Express/React yet,
CSS beginner level, English only.
```
