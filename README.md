# OneLens

The PR workflow is broken. We're fixing it.

OneLens automates the manual work that engineering teams shouldn't have to do — from standups to code review explanations to CI pipeline deciphering. The information exists. It just never gets used.

## The Problem

Engineering teams spend a significant part of their week not building but preparing to build, waiting to ship, and explaining what they built.

- Standups to explain what should be obvious
- Review processes that bottleneck on whoever is least busy
- CI pipelines that produce output nobody fully understands
- Context that lives in commits, tickets, and test history — but never gets used

We've accepted this. We've built entire workflows around it. We've professionalized the ceremony of shipping software.

But why?

## The Solution

OneLens connects the dots your team shouldn't have to connect manually:

- **Automated standups** — PR descriptions, test summaries, and context gathered automatically
- **Instant code review context** — No more "can you explain this?" back-and-forth
- **CI pipeline clarity** — Failures explained in plain language, not wall of logs
- **Shipped PR summaries** — Teams know what changed and why, without asking

The context is there. Your commits, tickets, test history, and codebase all have the answers. OneLens surfaces them when they matter.

## Tech Stack

Built with modern, production-grade tooling:

- **Next.js 16** — Full-stack React framework
- **TypeScript** — End-to-end type safety
- **TailwindCSS v4** — Utility-first styling
- **oRPC** — Type-safe APIs
- **Drizzle + PostgreSQL** — Database
- **Better-Auth** — Authentication
- **Turborepo** — Monorepo build system

## Getting Started

```bash
# Install dependencies
bun install

# Set up database
bun run db:push

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
onelens/
├── apps/
│   └── web/          # Next.js fullstack application
├── packages/
│   ├── ui/           # Shared UI components & design system
│   ├── api/          # API layer & business logic
│   ├── auth/         # Authentication
│   └── db/           # Database schema & queries
```

## Contributing

This is a solo project in active development. If you're interested in what we're building, reach out on [X](https://x.com/Rajdeep__ds).

## Stay Updated

- [Follow on X](https://x.com/Rajdeep__ds)
- [Star on GitHub](https://github.com/RajdeepDs/OneLens)

---

Built with conviction by [Rajdeep](https://x.com/Rajdeep__ds)
