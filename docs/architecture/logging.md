# Logging Architecture

## Overview

Logging is a core infrastructure component of Joo-Joo Messenger.

Logs provide visibility into application behavior, simplify debugging, help detect security incidents, and assist operators in maintaining self-hosted deployments.

Logging should never expose sensitive user information.

---

# Goals

The logging system should:

* Help developers debug problems.
* Help administrators monitor deployments.
* Record important security events.
* Support future observability tooling.
* Work in both development and production environments.
* Remain independent from any cloud provider.

---

# Non-Goals

The logger is **not** responsible for:

* Metrics
* Tracing
* Monitoring
* Analytics
* Error reporting services

Those may integrate with the logger later.

---

# Design Principles

## Security First

Sensitive information must never be written to logs.

Never log:

* Passwords
* Password hashes
* Access tokens
* Refresh tokens
* Session secrets
* Encryption keys
* OTP codes
* Private messages
* File contents

---

## Privacy First

Logs should contain only the information required for debugging and operations.

Avoid collecting personally identifiable information whenever possible.

---

## Structured Logging

Logs should be structured instead of plain text.

Good:

```json
{
  "level": "info",
  "event": "user.login",
  "userId": "...",
  "requestId": "...",
  "timestamp": "..."
}
```

Bad:

```text
User logged in successfully.
```

Structured logs are easier to search, filter, and process.

---

## Machine Readable

Logs should be JSON in production.

This allows future integration with:

* Loki
* Grafana
* Elasticsearch
* OpenSearch
* Splunk

without changing application code.

---

# Log Levels

The project uses six log levels.

## TRACE

Very detailed diagnostic information.

Only enabled during development.

Examples:

* Function entry
* Function exit
* SQL query timings

---

## DEBUG

Useful information while developing.

Examples:

* Cache miss
* Validation result
* Repository execution

---

## INFO

Normal application events.

Examples:

* User signed in
* User signed out
* Server started
* Database connected

---

## WARN

Unexpected but recoverable situations.

Examples:

* Invalid login attempt
* Rate limit approaching
* Slow database query

---

## ERROR

An operation failed.

Examples:

* Database unavailable
* Internal exception
* Failed transaction

---

## FATAL

Application cannot continue.

Examples:

* Configuration missing
* Startup failure
* Corrupted state

---

# Log Categories

Logs should be grouped by purpose.

## Application

General application behavior.

Example:

```
Server started
```

---

## HTTP

Incoming requests.

Example:

```
POST /auth/login
```

---

## Authentication

Authentication events.

Examples:

* Login
* Logout
* Signup
* Refresh token

---

## Authorization

Permission checks.

Examples:

* Forbidden access
* Missing permission

---

## Database

Database operations.

Examples:

* Connection established
* Migration completed

---

## Security

Security-related events.

Examples:

* Refresh token reuse
* Suspicious login
* Brute-force detection

---

## Infrastructure

Infrastructure events.

Examples:

* Redis connected
* PostgreSQL unavailable
* Docker startup

---

# Required Context

Every log entry should include:

* Timestamp
* Log level
* Event name
* Request ID (if applicable)

Optional:

* User ID
* Session ID
* Duration
* Module name

Never include sensitive information.

---

# Request Correlation

Every HTTP request should receive a unique Request ID.

The same Request ID should appear in every log generated during that request.

Example:

```
Request

↓

Middleware

↓

requestId generated

↓

Controller

↓

Service

↓

Repository

↓

Response
```

This allows tracing a request across the application.

---

# Error Logging

Errors should always include:

* Error type
* Error message
* Stack trace (development only)
* Request ID

Production logs should avoid exposing implementation details.

---

# Audit Logs

Some actions are security-sensitive and should always be recorded.

Examples:

* Login
* Logout
* Password changed
* Password reset
* Email verified
* Session revoked
* Account deleted

Audit logs should never be deletable by application code.

---

# Performance Logging

Long-running operations should be logged.

Examples:

* Database query > 200ms
* HTTP request > 1 second

These logs help identify bottlenecks.

---

# Development vs Production

Development

* Human-readable logs
* Colors enabled
* Stack traces enabled
* DEBUG enabled

Production

* JSON logs
* No colors
* No stack traces by default
* INFO and above

---

# Package Structure

**Status: Implemented** — see [ADR-0002](./adr/0002-logixlysia-logging.md).

The logging implementation currently lives in:

```
apps/api/src/plugins/logger.ts
```

It exports a `logger(service)` factory. Each service instantiates its own logger by passing its name:

```ts
logger("api")
logger("worker")
logger("websocket")
```

The configuration itself (log levels, rotation, format) is centralized inside that one file, so every service stays consistent even though each calls the factory separately.

> A future extraction into a shared `packages/logger` package is possible if multiple deployable services are added (see ADR-0002's Future Considerations), but that has not happened yet — don't import from `packages/logger`, it doesn't exist.

---

# Dependency Rules

The logger package must not depend on:

* Database
* HTTP framework
* Authentication
* Business logic

Every other package may depend on the logger.

---

# Future Improvements

The logging system should be designed so future integrations require minimal changes.

Potential integrations include:

* OpenTelemetry
* Grafana Loki
* Elasticsearch
* OpenSearch
* Prometheus
* Sentry

---

# Logging Rules

Every new feature should follow these rules:

* Log meaningful events.
* Never log secrets.
* Use structured logging.
* Choose the correct log level.
* Include Request ID whenever available.
* Avoid excessive logging.
* Keep log messages consistent across the project.

Failure to follow these rules reduces observability and may introduce security or privacy risks.
