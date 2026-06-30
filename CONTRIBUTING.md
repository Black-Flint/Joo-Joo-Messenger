# Contributing to Joo-Joo Messenger

Thank you for your interest in contributing to Joo-Joo Messenger.

Joo-Joo Messenger is an open source, privacy-focused, self-hosted messaging platform built by the community. Contributions of all sizes are welcome—from fixing bugs and improving documentation to implementing new features and reviewing pull requests.

We appreciate your time and effort in helping make the project better.

---

# Ways to Contribute

You can contribute by:

- Reporting bugs
- Suggesting new features
- Improving documentation
- Fixing existing issues
- Reviewing pull requests
- Improving accessibility and user experience
- Sharing architectural or product feedback

---

# Where to Start

If you're contributing for the first time, look for issues labeled:

- `good first issue`
- `help wanted`
- `documentation`

These issues are intended to be beginner-friendly.

If you'd like to work on an issue, please leave a comment first so maintainers know it's being worked on.

---

# Development Setup

## Requirements

- Bun
- Docker
- Docker Compose

## Clone the Repository

Fork the repository, then clone your fork:

```bash
git clone https://github.com/Black-Flint/Joo-Joo-Messenger.git
cd Joo-Joo-Messenger
```

## Install Dependencies

```bash
bun install
```

## Configure Environment Variables

```bash
cp .env.example .env
```

Update the values inside `.env` as needed for your local environment.

## Start Infrastructure

```bash
docker compose -f docker-compose.dev.yml up -d
```

## Start the Backend

```bash
bun run dev:api
```

## Start the Frontend

```bash
bun run dev:web
```

---

# Development Workflow

## 1. Sync with the Latest Changes

Before starting new work, make sure your local `develop` branch is up to date.

## 2. Create a Branch

Create a new branch from the latest `develop` branch.

Use one of the following naming conventions:

```text
feat/<issue-number>-short-description

fix/<issue-number>-short-description

docs/<issue-number>-short-description

refactor/<issue-number>-short-description

test/<issue-number>-short-description

chore/<issue-number>-short-description
```

Examples:

```text
feat/42-user-profile

fix/18-refresh-token

docs/55-update-readme

refactor/91-auth-service
```

If your contribution is not related to an issue, use a descriptive branch name.

---

## 3. Make Your Changes

Please keep your changes focused on a single concern.

Avoid mixing unrelated changes into the same pull request.

---

## 4. Commit Your Changes

This project follows a simplified Conventional Commits format.

Use one of the following commit types:

```text
feat: add password reset endpoint

fix: resolve refresh token rotation bug

docs: update contributing guide

refactor: simplify authentication service

test: add session repository tests

chore: update dependencies

ci: improve GitHub workflow

build: update Docker configuration
```

Commit messages should:

- Use the imperative mood.
- Be concise.
- Describe what changed.
- Avoid ending with a period.

---

## 5. Format and Lint

Before opening a Pull Request, run:

```bash
bun run check:fix
bun run check
```

Please ensure the project builds successfully before submitting your changes.

---

## 6. Push Your Branch

```bash
git push origin <branch-name>
```

---

## 7. Open a Pull Request

Open your Pull Request against the `develop` branch.

Your Pull Request should:

- Clearly explain the purpose of the change.
- Reference the related issue when applicable.
- Include screenshots for UI changes.
- Update documentation if behavior changes.

If your Pull Request closes an issue, include:

```text
Closes #123
```

---

# Pull Request Guidelines

Please keep Pull Requests:

- Small
- Focused
- Easy to review

Large Pull Requests are significantly harder to review and are more likely to require changes.

---

# Issue Guidelines

When opening a bug report, please include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots or logs (if applicable)

When suggesting a feature, please describe:

- The problem you're trying to solve
- Your proposed solution
- Possible alternatives (if any)

---

# Code Style

This repository uses **Biome** for formatting and linting.

Please do not manually reformat unrelated files.

Only format code that is part of your changes.

---

# Communication

Use GitHub Discussions for:

- Questions
- Ideas
- General conversations
- Architectural discussions

Use GitHub Issues for:

- Bugs
- Feature requests
- Actionable tasks

---

# Need Help?

If you're unsure how to approach an issue, feel free to ask.

Maintainers are happy to answer questions, discuss implementation ideas, and provide guidance before you start working on a contribution.

---

# Code of Conduct

By participating in this project, you agree to follow our Code of Conduct.

Please help us maintain a welcoming, respectful, and inclusive community for everyone.

---

# Thank You

Every contribution—no matter how small—helps improve Joo-Joo Messenger.

Thank you for helping build a secure, privacy-focused, and community-driven messaging platform.