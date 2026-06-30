# Joo-Joo Messenger

<p align="center">
  <img src="./docs/images/onboarding-preview.png" alt="Joo-Joo Messenger Preview" width="100%" />
</p>

<p align="center">
  <strong>An open source, self-hosted messenger built for privacy, transparency, and community ownership.</strong>
</p>

<p align="center">
  No ads • No tracking • No vendor lock-in
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-GPL--3.0-blue" alt="GPL-3.0 License" />
  <img src="https://img.shields.io/badge/status-active_development-orange" alt="Project Status" />
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen" alt="Contributions Welcome" />
</p>

---

## Mission

Modern communication should not require sacrificing privacy, ownership, or transparency.

Joo-Joo Messenger is an open source messaging platform that anyone can inspect, modify, and self-host.

Our goal is to build a modern messenger that belongs to its users—not advertisers, cloud providers, or a single company.

---

## Why Joo-Joo Messenger?

Many messaging platforms prioritize growth, engagement, and monetization.

Joo-Joo Messenger takes a different approach.

We believe communication should be:

* Privacy-first
* Open source
* Self-hostable
* Transparent
* Community-driven
* Independent of any cloud vendor

---

## Project Principles

Every architectural and product decision is guided by these principles:

* Security First
* Privacy by Default
* Maintainable Architecture
* API First
* Self-Hosting First
* Simplicity over Complexity
* Explicit over Magic
* Community over Company

---

## Non-Goals

Joo-Joo Messenger is **not** intended to:

* Monetize user data
* Display advertisements
* Track user behavior
* Lock users into proprietary infrastructure
* Depend on a specific cloud provider

---

## Current Status

> ⚠️ **Active Development**

The project is currently under active development and **is not production ready**.

APIs, architecture, and features may change as the project evolves.

This is the best time to get involved and help shape the future of the project.

---

## Current Capabilities

### Implemented

* Open source monorepo
* Authentication
* Responsive onboarding
* Modern UI
* Contributor workflow

### In Progress

* Conversations
* Real-time messaging
* Presence
* File uploads
* User profiles

### Planned

* End-to-end encryption
* Group chats
* Push notifications
* Desktop application
* Mobile application
* Self-hosting
* Device management

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand

### Backend

- Bun
- Elysia
- PostgreSQL
- Drizzle ORM
- Redis
- WebSockets

### Development

- Biome
- Docker
- Docker Compose

### DevOps

- GitHub Actions (CI)
- Nginx (Reverse Proxy)

---

## Getting Started

### Requirements

* Bun
* Docker
* Docker Compose

### Clone the Repository

```bash
git clone https://github.com/Black-Flint/Joo-Joo-Messenger.git
cd Joo-Joo-Messenger
```

### Install Dependencies

```bash
bun install
```

### Configure Environment Variables

```bash
cp .env.example .env
```

Update the values inside `.env`.

### Start Infrastructure

```bash
docker compose -f docker-compose.dev.yml up -d
```

### Start the Backend

```bash
bun run dev:api
```

### Start the Frontend

```bash
bun run dev:web
```

---

## Project Structure

```
apps/
├── api/
└── web/

packages/

docs/

infra/
```

For more information about the project architecture, see the documentation inside the `docs/` directory.

---

## Documentation

Additional documentation is available:

* Architecture
* Security
* Getting Started
* Roadmap
* Contributing

Documentation will continue to grow alongside the project.

---

## Contributing

We welcome contributions of every size.

Whether you enjoy writing code, improving documentation, reporting bugs, reviewing pull requests, or discussing architecture, your help is appreciated.

If you're contributing for the first time, start with issues labeled:

* `good first issue`
* `help wanted`
* `documentation`

Before opening a Pull Request, please read:

**→ CONTRIBUTING.md**

---

## Looking for Contributors

We're currently looking for contributors interested in:

### Frontend

* UI improvements
* Accessibility
* Design System
* Responsive layouts

### Backend

* Messaging
* WebSockets
* Performance
* API design

### Security

* Authentication
* Session management
* Encryption
* Security reviews

### Documentation

* Setup guides
* Architecture
* API examples
* Contributor guides

---

## Roadmap

The long-term roadmap is maintained separately inside the documentation.

See:

**docs/roadmap.md**

---

## License

Joo-Joo Messenger is licensed under the GNU General Public License v3.0 (GPL-3.0).

See the LICENSE file for details.

---

## Join the Journey

Joo-Joo Messenger is still in its early stages.

If you believe messaging should be private, transparent, self-hostable, and community-owned, we'd love your help.

⭐ Star the repository to follow the project's progress.

Every contribution helps build a better messenger for everyone.
