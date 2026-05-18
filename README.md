# Karyra

**Karyra** is a mobile-first Web3 readiness platform for local communities. It helps beginners build practical confidence before entering Web3 through structured lessons, quests, workshop participation, readiness passports, and proof records.

Karyra is not positioned as a generic learn-and-earn product. It is designed as a **local Web3 readiness infrastructure** for beginners, community educators, workshop organizers, and grant reviewers.

---

## Core Positioning

Karyra focuses on the **pre-transaction layer** of Web3 adoption:

- safety literacy before asset usage
- wallet confidence before real transactions
- proof of learning before deeper technical steps
- proof of participation before community progression
- readiness records before onchain activity
- local/offline onboarding for non-technical communities

The current long-term stack direction is:

```txt
Filecoin = Proof Archive / evidence preservation layer
Stellar  = Financial Web3 Readiness / payment-readiness learning layer
```

---

## Current MVP Highlights

### Readiness Layer

- Readiness Passport
- Readiness score and level
- Readiness timeline
- Shareable passport summary placeholder
- Badge identity
- Proof-of-Learning
- Proof-of-Participation
- Proof-of-Readiness

### Filecoin Proof Archive Demo

- Admin proof archive page
- Public proof verification page
- Demo Filecoin CID generation
- Archive manifest JSON
- SHA-256 checksum
- Archive status in Passport
- Verification links from Passport and Impact pages

### Stellar Readiness Track

- Stellar Readiness stack page
- Stellar Readiness course seed
- Stellar-focused quests
- Stellar Readiness badge
- Interactive pre-transaction checklist
- Quest filter for `stellar-readiness`
- Dashboard submission status

### Learning Engine

- Public course list
- Course detail page
- Lesson detail page
- Quiz display
- Enroll/start/complete flow
- XP reward for completed lessons
- Learner dashboard

### Quest & Reward

- Public quest page
- Quest submission form
- Client-side validation and character counter
- Admin submission review
- Approve/reject submission flow
- XP reward approval
- RewardLedger tracking
- Auto readiness sync after approval

### Community Onboarding

- Public workshop page
- Workshop registration
- Cancel workshop registration
- Capacity counter
- Dashboard workshop registration display
- Admin workshop management

### Transparency

- Public status page
- Public changelog
- Public impact report
- Grant reviewer guide
- Platform metrics
- Roadmap overview
- Development transparency narrative

---

## Main Routes

### Public App

```txt
/                                      Homepage
/courses                               Public course list
/courses/[slug]                        Course detail
/lessons/[slug]                        Lesson detail
/quests                                Quest page
/quests?track=stellar-readiness        Stellar readiness quest filter
/workshops                             Public workshop page
/dashboard                             Demo learner dashboard
/status                                Public project status
/changelog                             Public changelog
/impact                                Public impact report
/reviewer-guide                        Grant reviewer guide
```

### Readiness & Proof

```txt
/passport                              Readiness Passport
/passport/timeline                     Readiness Timeline
/passport/share                        Shareable Passport Summary
/proofs/[id]                           Public proof verification
```

### Filecoin + Stellar

```txt
/admin/proofs                          Filecoin Proof Archive admin page
/stacks/stellar-readiness              Stellar Readiness stack
/stacks/stellar-readiness/checklist    Stellar pre-transaction checklist
```

### Karyra Admin Console

```txt
/admin                                 Admin console overview
/admin/courses                         Manage courses
/admin/courses/new                     Create new course
/admin/submissions                     Review quest submissions
/admin/workshops                       Manage workshops
/admin/workshops/new                   Create new workshop
/admin/learners                        Learner readiness monitor
/admin/proofs                          Proof archive monitor
```

---

## Demo Accounts

The current MVP uses demo identities to validate product flows.

```txt
Learner demo:
username: demo or demo-learner depending on seed/demo flow

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
→ readiness sync
→ proof record
→ readiness passport
```

### Stellar Readiness Flow

```txt
Open Stellar Readiness
→ study wallet/payment readiness modules
→ complete checklist
→ submit Stellar quest
→ admin approval
→ Proof-of-Readiness
→ Passport + Timeline
```

### Filecoin Proof Flow

```txt
Proof record
→ admin archive action
→ archive manifest
→ checksum
→ demo Filecoin CID
→ public proof verification
```

### Community Flow

```txt
Workshop published
→ learner registers
→ dashboard reflects registration
→ impact/status metrics update
→ participation can become a proof layer
```

### Admin Flow

```txt
Karyra Admin Console
→ manage courses
→ create lessons
→ review quest submissions
→ approve/reject rewards
→ monitor readiness
→ archive proofs
→ review status/impact
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

## Database & ORM Notes

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
3. /status
4. /impact
5. /courses
6. /courses/stellar-readiness-for-local-communities
7. /stacks/stellar-readiness
8. /stacks/stellar-readiness/checklist
9. /quests?track=stellar-readiness
10. /dashboard
11. /passport
12. /passport/timeline
13. /passport/share
14. /admin/submissions
15. /admin/learners
16. /admin/proofs
17. /changelog
```

---

## MVP Limitations

The current MVP intentionally keeps several areas simple:

- full authentication is not enabled yet
- role-based permission system is planned later
- wallet integration is not connected to a live chain yet
- quest verification is currently based on manual/admin review
- Filecoin archive currently uses demo CIDs and manifest placeholders
- Stellar track currently focuses on readiness education, not live payments
- workshop attendance/check-in can be expanded later
- AI-assisted content generation is planned but not active yet
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

### Phase 2 — Readiness & Proof Expansion

- Readiness Passport
- Readiness Timeline
- proof records
- badge identity
- admin learner readiness monitor
- Filecoin Proof Archive demo
- Stellar Readiness course, checklist, and quests

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
- payment-readiness learning
- quest-based learning
- community onboarding
- future chain-agnostic learning identity

The project is being prepared as a grant-ready MVP with a strong focus on practical education, transparency, local impact, and readiness before transaction.

---

## License

MVP development version. License to be finalized.
