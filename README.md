# Karyra

**Karyra** is a mobile-first Web3 learning and quest platform designed to help beginners and local communities understand Web3 through structured lessons, guided quests, XP rewards, badges, and offline community onboarding.


---

## Project Overview

Karyra aims to make Web3 education more approachable for beginners by combining:

- beginner-friendly Web3 learning content
- interactive lessons and quizzes
- quest-based learning progression
- XP and badge rewards
- admin-reviewed quest submissions
- offline workshop registration
- public transparency pages
- an internal admin console for managing content and community activity

The project is built with a mobile-first approach, but also provides a desktop-friendly experience for reviewers, educators, grant evaluators, and community partners.

---

## Problem

Many beginners struggle to enter Web3 because the onboarding experience is often too technical, fragmented, and intimidating.

Common problems include:

- wallet confusion and fear of making mistakes
- difficult technical terminology
- poor localization for non-English communities
- lack of structured beginner learning paths
- weak connection between online learning and offline community support
- limited visibility into learner progress and real onboarding impact

Karyra addresses these problems by providing a simpler, localized, and community-centered learning experience.

---

## Solution

Karyra provides a guided learning system where users can:

1. start from beginner-friendly Web3 lessons,
2. complete quizzes and learning activities,
3. submit quests as proof of participation,
4. receive XP and badge rewards after review,
5. join offline workshops for community onboarding,
6. track progress through a learner dashboard.

Admins can manage the ecosystem through the Karyra Admin Console.

---

## Current MVP Features

### Learning

- Public homepage
- Course list
- Course detail page
- Lesson detail page
- Quiz display
- Enroll course action
- Start lesson action
- Complete lesson action
- XP reward for completed lessons
- Learner dashboard with progress display

### Quest & Reward

- Public quest page
- Quest task display
- Quest submission form
- Admin submission review
- Approve/reject submission flow
- XP reward approval
- RewardLedger tracking
- Dashboard and impact metrics update after approval

### Community Onboarding

- Public workshop page
- Workshop registration
- Cancel workshop registration
- Capacity counter
- Dashboard workshop registration display
- Admin workshop management
- Workshop status management

### Admin Console

- Karyra Admin Console overview
- Course management
- Course creation
- Publish/archive course
- Quest submission review
- Workshop management
- Workshop creation
- Public proof navigation

### Transparency

- Public project status page
- Public changelog
- Public impact report
- Grant reviewer guide
- Platform metrics
- Roadmap overview
- Grant readiness signals

---

## Main Routes

### Public App

```txt
/                   Homepage
/courses            Public course list
/courses/[slug]     Course detail
/lessons/[slug]     Lesson detail
/quests             Quest page
/workshops          Public workshop page
/dashboard          Demo learner dashboard
/status             Public project status
/changelog          Public changelog
/impact             Public impact report
/reviewer-guide     Grant reviewer guide
```

### Karyra Admin Console

```txt
/admin                    Admin console overview
/admin/courses            Manage courses
/admin/courses/new        Create new course
/admin/submissions        Review quest submissions
/admin/workshops          Manage workshops
/admin/workshops/new      Create new workshop
```

---

## Demo Accounts

The current MVP uses demo identities to validate product flows.

```txt
Learner demo:
username: demo

Admin demo:
username: admin
```

Full authentication and role-based access control are planned for later development.

---

## Product Flow

### Learner Flow

```txt
Learner
→ enroll course
→ start lesson
→ complete lesson
→ earn XP
→ submit quest
→ admin review
→ reward approval
→ dashboard update
```

### Community Flow

```txt
Workshop published
→ learner registers
→ dashboard reflects registration
→ public impact metrics update
```

### Admin Flow

```txt
Karyra Admin Console
→ manage courses
→ create lessons
→ review quest submissions
→ approve/reject rewards
→ manage workshops
→ monitor status and impact
```

---

## Tech Stack

```txt
Framework: Next.js App Router
Language: TypeScript
Database: PostgreSQL
ORM: Prisma 7.8.0
Prisma Adapter: @prisma/adapter-pg
Runtime: Node.js
Styling: Tailwind CSS
Architecture: VPS-first / self-hosted direction
Localization: Internal ID/EN toggle
Preview Mode: Auto / Mobile / Desktop
```

---

## Database & ORM

Karyra uses PostgreSQL with Prisma 7.8.0.

Important project decisions:

```txt
Prisma version: 7.8.0
Generated client path: src/generated/prisma
Module system: ESM
Database: PostgreSQL
Deployment direction: self-hosted VPS-first
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NODE_ENV="development"
```

If the PostgreSQL server requires SSL:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public&sslmode=require"
NODE_ENV="development"
```

Never commit `.env`.

---

## Installation

```bash
npm install
```

---

## Prisma Commands

```bash
npm run db:format
npm run db:migrate -- --name init_karyra_core
npm run db:generate
npm run db:seed
npm run db:seed:demo
npm run db:smoke
```

---

## Development

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Verification

Run route and structure audit:

```bash
npm run app:audit
```

Run audit and database smoke test:

```bash
npm run app:verify
```

---

## Reviewer Flow

Recommended review path:

```txt
1. /reviewer-guide
2. /
3. /courses
4. /courses/dasar-web3-untuk-pemula
5. /lessons/apa-itu-web3
6. /dashboard
7. /quests
8. /admin/submissions
9. /workshops
10. /status
11. /impact
12. /changelog
13. /admin
```

---

## MVP Limitations

The current MVP intentionally keeps several areas simple:

- full authentication is not enabled yet
- role-based permission system is planned later
- wallet integration is not connected to a live chain yet
- quest verification is currently based on manual/admin review
- workshop attendance/check-in is planned for later
- AI-assistant is planned but not active yet
- production deployment and public demo packaging are still in progress

---

## Roadmap Direction

### Phase 1 — Core Foundation

- database foundation
- Prisma schema
- course and lesson model
- quest and reward model
- public learning pages
- learner dashboard
- admin console foundation

### Phase 2 — Learning & Quest Expansion

- richer course structure
- detailed lesson progress
- quest review improvements
- badge rules
- reward logic refinement
- learner history

### Phase 3 — Community Onboarding

- workshop registration improvements
- workshop attendance/check-in
- community dashboard
- offline onboarding flow
- local community reporting

### Phase 4 — Grant-Ready Pilot

- public deployment
- demo video and screenshots
- pilot workshop
- impact report
- grant application package
- public documentation polish

---

## Project Direction

Karyra is designed for:

- Web3 beginners
- local Indonesian communities
- offline learning workshops
- beginner-friendly wallet education
- quest-based learning
- community onboarding
- future chain-agnostic learning identity

The project is being prepared as a grant-ready MVP with a strong focus on practical education, transparency, and community impact.

---

## License

MVP development version. License to be finalized.
