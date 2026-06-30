> [!WARNING]
> This document describes the planned security architecture.
>
> It is a design specification and has not been fully implemented yet.

# Authentication

## Overview

Authentication is the process of verifying a user's identity before allowing access to protected resources.

Joo-Joo Messenger uses a stateless authentication model based on:

* Access Tokens (JWT)
* Refresh Tokens (JWT)
* Server-side Sessions
* Refresh Token Rotation
* Reuse Detection

The authentication system is designed to prioritize:

* Security
* Privacy
* Scalability
* Self-hosting
* Maintainability

---

# Design Goals

The authentication system must:

* Verify user identity securely.
* Minimize the impact of stolen tokens.
* Support multiple active devices.
* Allow individual session revocation.
* Be independent of any cloud provider.
* Scale horizontally.

---

# Authentication Flow

```text
User

↓

Login

↓

Validate Credentials

↓

Create Session

↓

Generate Access Token

↓

Generate Refresh Token

↓

Store Session

↓

Return Tokens
```

---

# Authentication Components

The authentication system consists of four major components.

## User

Represents an authenticated account.

Responsible for:

* Identity
* Credentials
* Account status

---

## Access Token

A short-lived JWT used to authenticate API requests.

Characteristics:

* Stateless
* Short expiration
* Sent with every authenticated request
* Never stored in the database

The access token should only contain the minimum information required by the application.

---

## Refresh Token

A long-lived JWT used only to obtain a new access token.

Characteristics:

* Rotated after every successful refresh
* Associated with a server-side session
* Never reusable
* Invalidated on logout

---

## Session

A server-side representation of a logged-in device.

Each session stores information such as:

* User ID
* Refresh Token identifier
* Device information
* IP address (optional)
* User-Agent (optional)
* Creation time
* Last activity
* Expiration

Sessions allow administrators and users to revoke access for a specific device without affecting other active sessions.

---

# Authentication Lifecycle

```text
Register

↓

Login

↓

Authenticated Requests

↓

Refresh Token

↓

Logout

↓

Session Revoked
```

---

# Password Storage

Passwords are never stored in plain text.

Requirements:

* Strong password hashing algorithm
* Unique salt for every password
* Constant-time verification

Hashing implementation details are defined by the backend and may change over time without affecting the authentication architecture.

---

# Session Management

Each successful login creates a new session.

Examples:

Phone

↓

Session A

Laptop

↓

Session B

Browser

↓

Session C

Every session is independent.

Revoking one session must not affect the others.

---

# Refresh Token Rotation

Refresh tokens are single-use.

Every successful refresh operation generates:

* A new access token
* A new refresh token

The previous refresh token immediately becomes invalid.

This reduces the impact of token theft.

---

# Refresh Token Reuse Detection

If a previously used refresh token is presented again, the system assumes token compromise.

The server should:

* Reject the request.
* Revoke the affected session.
* Record a security event.
* Require the user to authenticate again.

---

# Logout

Logging out invalidates the current session.

The server must:

* Revoke the session.
* Invalidate the refresh token.
* Remove authentication cookies if applicable.

Logging out from one device must not terminate other active sessions.

---

# Multiple Devices

The authentication system supports multiple simultaneous devices.

Each device owns:

* Its own session
* Its own refresh token
* Its own expiration

This enables independent session management.

---

# Account Status

Authentication should fail when the account is:

* Disabled
* Suspended
* Deleted

Future account states may be introduced without changing the authentication model.

---

# Security Principles

The authentication system follows these principles:

* Never trust client input.
* Never store passwords in plain text.
* Never reuse refresh tokens.
* Never expose secrets in logs.
* Keep access tokens short-lived.
* Validate every token.
* Rotate refresh tokens.
* Protect against replay attacks.

---

# Future Features

The authentication architecture is intentionally designed to support future capabilities without major redesign.

Possible future additions include:

* Email verification
* Password reset
* Two-factor authentication (2FA)
* OAuth providers
* WebAuthn / Passkeys
* Device management
* Trusted devices

These features should extend the existing authentication architecture rather than replace it.

---

# Summary

The authentication architecture is based on a layered security model:

```text
User

↓

Password Verification

↓

Session

↓

Access Token

↓

Refresh Token

↓

Token Rotation

↓

Reuse Detection
```

This design provides secure authentication while remaining scalable, maintainable, and suitable for self-hosted deployments.
