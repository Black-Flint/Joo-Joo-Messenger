# Authorization

## Overview

Authorization determines what an authenticated user is allowed to access or perform.

While authentication answers:

> "Who is the user?"

Authorization answers:

> "What is this user allowed to do?"

Authentication must always occur before authorization.

---

# Goals

The authorization system should:

* Protect private resources.
* Enforce access control consistently.
* Follow the principle of least privilege.
* Be easy to extend as the application grows.
* Remain independent of any authentication implementation.

---

# Authentication vs Authorization

Authentication verifies identity.

Authorization verifies permissions.

Example:

```text
Unauthenticated User
        │
        ▼
Authentication
        │
Authenticated User
        │
        ▼
Authorization
        │
Access Granted / Denied
```

---

# Authorization Model

Joo-Joo Messenger uses **resource-based authorization**.

A user may only access resources they own or have been explicitly granted access to.

Examples:

* Their own profile
* Their own sessions
* Conversations they participate in
* Messages they own or are allowed to view
* Uploaded files they have permission to access

---

# Authorization Flow

```text
HTTP Request

↓

Authentication

↓

Load User

↓

Load Resource

↓

Permission Check

↓

Allowed

↓

Business Logic

↓

Response
```

If authorization fails, the request is immediately rejected.

---

# Ownership

Ownership is the primary authorization mechanism.

Examples:

A user may:

* Read their own profile.
* Update their own profile.
* Delete their own sessions.

A user may not:

* View another user's private profile.
* Delete another user's session.
* Access another user's private files.

---

# Permission Principles

Every protected action must verify authorization before execution.

The backend must never rely on:

* Hidden frontend buttons
* Client-side checks
* User-provided identifiers

All authorization decisions must be made on the server.

---

# Least Privilege

Users should receive only the permissions required to perform their intended actions.

No feature should expose additional information beyond what is necessary.

Example:

Good:

A user requests their own session list.

Bad:

A user receives every active session in the system.

---

# Resource Ownership Examples

## User Profile

Allowed:

* Read own profile
* Update own profile

Denied:

* Modify another user's profile

---

## Sessions

Allowed:

* View own sessions
* Revoke own sessions

Denied:

* Revoke another user's session

---

## Conversations

Allowed:

* Read conversations they belong to
* Send messages in joined conversations

Denied:

* Access private conversations they are not a member of

---

## Messages

Allowed:

* Read messages within authorized conversations
* Delete or edit messages according to future application rules

Denied:

* Read messages from unrelated conversations

---

# Roles

The initial version of Joo-Joo Messenger does **not** require a complex role-based access control (RBAC) system.

The application currently assumes a single application role:

* User

Administrative capabilities may be introduced in future versions.

Potential future roles include:

* Administrator
* Moderator
* Support

The authorization architecture should support additional roles without requiring major changes.

---

# Permission Checks

Permission checks should occur inside the business layer.

Controllers should never implement authorization logic directly.

Example:

```text
Controller

↓

Service

↓

Authorization Check

↓

Repository

↓

Database
```

This keeps authorization consistent across all entry points.

---

# HTTP Status Codes

The application follows standard HTTP semantics.

|           Status | Meaning                                             |
| ---------------: | --------------------------------------------------- |
| 401 Unauthorized | Authentication is required or invalid.              |
|    403 Forbidden | Authentication succeeded, but permission is denied. |
|    404 Not Found | Resource does not exist or should not be disclosed. |

---

# Security Principles

Authorization follows these principles:

* Deny by default.
* Validate every protected request.
* Never trust client input.
* Verify ownership on the server.
* Keep authorization decisions centralized.
* Avoid exposing unauthorized resources.
* Minimize information leakage.

---

# Future Extensions

The authorization architecture is intentionally designed to support future capabilities, including:

* Role-Based Access Control (RBAC)
* Attribute-Based Access Control (ABAC)
* Conversation-level permissions
* Group administration
* Channel moderation
* File sharing permissions
* Organization or workspace support

These features should extend the existing authorization model rather than replace it.

---

# Summary

Authorization protects application resources after a user has been authenticated.

The overall security flow is:

```text
Request

↓

Authentication

↓

Authenticated User

↓

Authorization

↓

Resource Access

↓

Business Logic

↓

Response
```

By separating authentication from authorization, the application remains easier to maintain, test, and extend while ensuring consistent security across all modules.
