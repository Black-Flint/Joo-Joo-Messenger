# Architecture

## Overview

Joo-Joo Messenger is an API-first, self-hosted, open source messaging platform designed for long-term maintainability, security, and scalability.

The architecture emphasizes simplicity, explicit boundaries, and modular design rather than premature abstraction.

The primary goal of this architecture is to enable contributors to understand, modify, and extend the project without introducing unnecessary complexity.

---

# Architectural Principles

The project follows these core principles:

* API First
* Domain-Driven Module Organization
* Layered Architecture
* Separation of Concerns
* Security by Default
* Self-Hosting First
* Simplicity over Cleverness

These principles should guide every architectural decision.

---

# High-Level Architecture

```
                 Clients
     ┌──────────┬──────────┬──────────┐
     │   Web    │  Mobile  │ Desktop  │
     └────┬─────┴────┬─────┴────┬─────┘
          │          │          │
          └──────────┴──────────┘
                     │
                  HTTP API
                     │
                Elysia Backend
                     │
        ┌────────────┴────────────┐
        │                         │
     Business Logic          Infrastructure
        │                         │
     Repositories          Database / Crypto /
        │                  Configuration / Logger
        │
     PostgreSQL
```

The backend is the core product.

Clients are consumers of the API and should not influence backend architecture.

---

# Layered Architecture

Each request flows through a strict sequence of layers.

```
Route
    ↓
Service
    ↓
Repository
    ↓
Database
```

Each layer has exactly one responsibility.

---

## Routes

Routes are responsible only for HTTP concerns.

Responsibilities:

* Parse requests
* Validate input
* Call services
* Return HTTP responses
* Set cookies and headers

Routes must never contain business logic.

---

## Services

Services contain all business logic.

Responsibilities:

* Business rules
* Authorization
* Authentication
* Transactions
* Domain orchestration
* Calling other services

Services should not know anything about HTTP.

---

## Repositories

Repositories provide persistence only.

Responsibilities:

* Query the database
* Insert data
* Update data
* Delete data

Repositories must not contain business rules.

---

## Database

The database layer stores and retrieves data.

Business logic never belongs inside database schemas or migrations.

---

# Module Organization

The project follows a Domain-First architecture.

```
modules/

    auth/

    users/

    conversations/

    messages/

    attachments/

    notifications/
```

Each module owns everything related to its domain.

Example:

```
auth/

    routes/

    services/

    repositories/

    schemas/

    types/

    dto/

    errors/

    constants/

    index.ts
```

Modules should be cohesive and self-contained.

---

# Dependency Rules

Dependencies always point downward.

```
Route
    ↓
Service
    ↓
Repository
    ↓
Database
```

Allowed:

* Route → Service
* Service → Repository
* Service → Service
* Repository → Database

Forbidden:

* Route → Repository
* Route → Database
* Repository → Service
* Repository → HTTP
* Repository → JWT
* Repository → Cookies
* Repository → Hashing

Violating these rules is considered an architectural issue.

---

# Monorepo Structure

```
apps/
    api/
    web/

packages/
    config/
    database/
    crypto/
    logger/
    validation/
    contracts/
    ui/

docs/

docker/

scripts/
```

Only reusable infrastructure belongs inside `packages`.

Business domains never belong inside `packages`.

---

# Package Philosophy

A package exists only if it provides reusable infrastructure.

Examples:

* database
* crypto
* logger
* validation
* config
* contracts

The project intentionally avoids generic packages such as:

* shared
* common
* helpers
* utils

Every package should have a single, clearly defined responsibility.

---

# API First

The backend defines the public contract.

Clients consume the API.

Client-specific behavior must not leak into backend business logic.

Adding a new client should require little or no backend changes.

---

# Domain Communication

Modules communicate through services.

Correct:

```
AuthService
      ↓
UserService
      ↓
UserRepository
```

Incorrect:

```
AuthService
      ↓
UserRepository
```

Modules should never depend on another module's persistence layer.

---

# Security Boundary

Authentication and authorization are business concerns.

Security decisions belong in the service layer.

Repositories should never perform authorization checks.

Routes should never implement security decisions.

---

# Design Philosophy

The project intentionally favors:

* Explicit code
* Small modules
* Predictable architecture
* Minimal abstractions
* Low coupling
* High cohesion

Over:

* Magic
* Hidden behavior
* Generic frameworks
* Premature optimization
* Unnecessary design patterns

---

# Future Scalability

The architecture is designed to support future features including:

* OAuth
* Social Login
* Multi-Factor Authentication
* Password Reset
* Email Verification
* WebAuthn / Passkeys
* Multiple Active Sessions
* Device Management
* Session Dashboard
* Security Notifications

These features should extend existing modules rather than require architectural changes.

---

# Architecture Decision

When faced with multiple valid solutions, the project prefers:

1. Simpler architecture
2. Fewer dependencies
3. Explicit behavior
4. Easier maintenance
5. Better contributor experience

Future possibilities alone are not sufficient justification for additional complexity.
