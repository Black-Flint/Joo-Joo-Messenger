# Error Flow

## Overview

Error handling is a core part of the application's architecture.

Every error should follow a predictable path from its origin to the client response.

The goals are:

* Consistent API responses
* Clear logging
* Separation of concerns
* No sensitive information leakage
* Easy debugging
* Maintainable code

---

# Principles

The error flow follows these principles:

* Errors should be thrown, not silently ignored.
* Business logic should not generate HTTP responses directly.
* Infrastructure errors should not leak implementation details.
* Unexpected errors should always be logged.
* Clients should receive consistent error responses.

---

# Error Flow

```text
HTTP Request

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

Database

↓

Exception

↓

Global Error Handler

↓

Logger

↓

HTTP Response
```

Every error passes through the same centralized pipeline.

---

# Error Categories

The application distinguishes between several categories of errors.

## Validation Errors

Occurs before business logic.

Examples:

* Missing required field
* Invalid email
* Invalid username
* Invalid request body

Response:

```http
400 Bad Request
```

---

## Authentication Errors

Occurs when user identity cannot be verified.

Examples:

* Invalid credentials
* Invalid access token
* Expired access token
* Invalid refresh token

Response:

```http
401 Unauthorized
```

---

## Authorization Errors

Occurs when the user lacks permission.

Examples:

* Accessing another user's profile
* Reading a private conversation
* Deleting another user's message

Response:

```http
403 Forbidden
```

---

## Resource Errors

Occurs when a requested resource cannot be found.

Examples:

* User not found
* Conversation not found
* Message not found

Response:

```http
404 Not Found
```

---

## Conflict Errors

Occurs when the requested operation conflicts with the current state.

Examples:

* Username already exists
* Email already registered
* Duplicate resource

Response:

```http
409 Conflict
```

---

## Business Errors

Application-specific rule violations.

Examples:

* Session revoked
* Refresh token reused
* Account suspended
* Conversation archived

Response depends on the situation.

---

## Infrastructure Errors

Errors caused by external systems.

Examples:

* Database unavailable
* Redis unavailable
* File storage unavailable

Response:

```http
500 Internal Server Error
```

The client should never receive infrastructure details.

---

## Unexpected Errors

Unexpected exceptions should always be treated as internal server errors.

Response:

```http
500 Internal Server Error
```

These errors must always be logged.

---

# Layer Responsibilities

## Validation Layer

Responsible for:

* Request validation
* Schema validation
* Type validation

Should never:

* Query the database
* Execute business logic

---

## Controller

Responsible for:

* Receiving HTTP requests
* Calling services
* Returning responses

Should never:

* Implement business rules
* Handle database logic

---

## Service

Responsible for:

* Business logic
* Throwing domain-specific errors

Should never:

* Build HTTP responses
* Access HTTP objects directly

Example:

```text
if (!user) {
    throw new UserNotFoundError()
}
```

---

## Repository

Responsible for:

* Database operations

Should never:

* Return HTTP errors
* Implement authorization

Repository errors should be translated into domain errors by the service layer when appropriate.

---

## Global Error Handler

Every uncaught error eventually reaches the global error handler.

Responsibilities:

* Log the error
* Determine HTTP status
* Build a consistent response
* Hide sensitive details
* Return the response

Only the global handler should convert exceptions into HTTP responses.

---

# Error Response Format

Every API error should follow a consistent structure.

Example:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid username or password."
  }
}
```

Unexpected errors should return a generic message.

Example:

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred."
  }
}
```

Stack traces and implementation details must never be returned to clients.

---

# Logging

Errors should be logged according to severity.

Information to log may include:

* Timestamp
* Request ID
* User ID (if authenticated)
* Session ID (if available)
* HTTP method
* Request path
* Status code
* Error code
* Stack trace (development only)

Never log:

* Passwords
* Access tokens
* Refresh tokens
* Secrets
* Encryption keys

---

# Error Codes

Business errors should use stable error codes.

Examples:

```text
INVALID_CREDENTIALS

TOKEN_EXPIRED

TOKEN_REUSED

SESSION_REVOKED

USER_NOT_FOUND

USERNAME_ALREADY_EXISTS

VALIDATION_ERROR

FORBIDDEN

INTERNAL_SERVER_ERROR
```

Error codes should remain stable even if error messages change.

---

# Development vs Production

Development:

* Detailed logs
* Stack traces
* Helpful debugging information

Production:

* Generic client messages
* Structured logs
* No stack traces in API responses
* No internal implementation details

---

# Benefits

A centralized error flow provides:

* Consistent API responses
* Easier debugging
* Better observability
* Improved security
* Cleaner architecture
* Simpler maintenance

---

# Summary

The application follows a centralized error pipeline.

```text
Request

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

Exception

↓

Global Error Handler

↓

Logger

↓

Response
```

By ensuring that every error follows the same path, the application remains predictable, secure, and easier to maintain as it grows.
