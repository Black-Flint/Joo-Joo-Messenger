# ADR-0002: Adopt Logixlysia as the Default Logging Solution

**Status:** Accepted

**Date:** 2026-07-01

## Context

Joo-Joo Messenger requires a consistent logging solution for both development and production environments.

The logging system should:

* Integrate naturally with the Elysia framework.
* Have minimal performance overhead.
* Support structured logging.
* Support log rotation.
* Support file logging.
* Provide configurable log levels.
* Be simple to configure and maintain.
* Scale across multiple services in the future (API, WebSocket, Workers).

Several logging solutions were considered, including:

* Console logging
* Pino
* Winston
* Logixlysia

## Decision

The project will use **Logixlysia** as the default logging solution.

A single shared logger factory will be provided through:

```text
apps/api/src/plugins/logger.ts
```

Each service will instantiate the logger by providing its service name:

```ts
logger("api")
logger("worker")
logger("websocket")
```

The logger configuration is shared across all services to ensure consistency.

## Rationale

Logixlysia was selected because it provides:

* Native integration with Elysia.
* A simple API with minimal boilerplate.
* Performance comparable to Pino.
* Built-in request logging.
* Log rotation support.
* File logging support.
* Structured log formatting.
* Environment-specific configuration.
* Easier maintenance than building a custom wrapper around Pino.

Using one centralized logger configuration also ensures that future configuration changes only need to be made in a single location.

## Consequences

### Positive

* Consistent logging across the entire project.
* Minimal setup required for new services.
* Cleaner application bootstrap.
* Easy migration to multiple services.
* Centralized configuration.
* Better developer experience during debugging.

### Negative

* The project becomes dependent on Logixlysia.
* If Logixlysia becomes unmaintained, migration to another logger will be required.
* Some advanced Pino features may not be directly exposed.

## Alternatives Considered

### Pino

Pros

* Extremely fast.
* Industry standard.
* Large ecosystem.

Cons

* Requires additional integration work with Elysia.
* More boilerplate.
* Log rotation requires additional tooling.

### Winston

Pros

* Mature ecosystem.
* Many transports.

Cons

* Slower than Pino.
* More complex configuration.
* Larger dependency footprint.

### Console Logging

Pros

* No dependencies.
* Simple.

Cons

* No structured logging.
* No rotation.
* Poor production experience.

## Future Considerations

The current design assumes one logger configuration shared by all services.

If the architecture evolves into multiple deployable services (API, WebSocket, Worker, Scheduler), each service should instantiate the shared logger using its own service name while keeping the configuration centralized.
