# Sessions

## Overview

A session represents an authenticated device connected to Joo-Joo Messenger.

While access tokens are stateless, sessions provide server-side control over authenticated devices.

Each successful login creates a new session.

Sessions allow the server to:

* Track authenticated devices.
* Revoke individual logins.
* Detect stolen refresh tokens.
* Manage long-lived authentication securely.

---

# Goals

The session system should:

* Support multiple active devices.
* Allow independent session revocation.
* Minimize the impact of stolen tokens.
* Enable refresh token rotation.
* Detect token reuse attacks.
* Remain scalable and self-hostable.

---

# Session Lifecycle

```text
User Login

↓

Create Session

↓

Issue Access Token

↓

Issue Refresh Token

↓

Authenticated Requests

↓

Refresh Token Rotation

↓

Logout or Expiration

↓

Session Revoked
```

---

# Why Sessions?

JWT access tokens are stateless.

This improves scalability but makes immediate revocation difficult.

Sessions introduce a lightweight server-side state that allows:

* Device management
* Logout
* Refresh token rotation
* Security monitoring

without sacrificing the benefits of JWT authentication.

---

# One Login = One Session

Every successful login creates a separate session.

Example:

```text
Phone

↓

Session A

Laptop

↓

Session B

Browser

↓

Session C
```

Each session is completely independent.

Logging out from one device must not affect the others.

---

# Session Contents

A session should contain information similar to:

* Session ID
* User ID
* Refresh Token Identifier (JTI)
* Device Name (optional)
* User Agent (optional)
* IP Address (optional)
* Created At
* Last Used At
* Expires At
* Revoked At (nullable)

Implementation details may evolve over time.

---

# Session Expiration

Sessions have a finite lifetime.

Expiration should be independent of the access token lifetime.

Example:

Access Token

15 minutes

Refresh Token

7 days

Session

7 days

Expired sessions should no longer accept refresh requests.

---

# Refresh Token Rotation

Refresh tokens are single-use.

Each successful refresh operation performs the following:

1. Validate the current refresh token.
2. Verify the associated session.
3. Generate a new access token.
4. Generate a new refresh token.
5. Update the session.
6. Invalidate the previous refresh token.

```text
Old Refresh Token

↓

Refresh Request

↓

New Refresh Token

↓

Old Token Invalid
```

---

# Refresh Token Reuse Detection

If an already-used refresh token is presented again, the server assumes the token has been compromised.

The server should:

* Reject the request.
* Revoke the affected session.
* Log a security event.
* Require the user to authenticate again.

This significantly reduces the impact of token theft.

---

# Session Revocation

Sessions may be revoked for several reasons.

Examples:

* User logout
* Password changed
* Suspicious activity
* Administrator action
* Refresh token reuse
* Account deletion

Once revoked, a session cannot be reused.

---

# Device Management

Because every login creates a separate session, users can manage their active devices.

Future functionality may include:

* View active devices
* Rename devices
* Revoke individual sessions
* Revoke all sessions except current

---

# Session Cleanup

Expired or revoked sessions should be periodically removed.

Cleanup may be performed by:

* Scheduled jobs
* Background workers
* Database maintenance tasks

Cleanup should not interfere with active sessions.

---

# Security Principles

The session system follows these rules:

* Every login creates a new session.
* Sessions are independent.
* Refresh tokens are single-use.
* Refresh tokens are rotated.
* Reused refresh tokens revoke the session.
* Sessions can be revoked individually.
* Sessions must expire automatically.
* Sensitive session information must never be exposed.

---

# Logging

Important session events should be logged.

Examples:

* Session created
* Session refreshed
* Session revoked
* Session expired
* Refresh token reuse detected

Logs must never include:

* Access tokens
* Refresh tokens
* Passwords
* Secret keys

---

# Future Improvements

The session architecture is designed to support future features without significant redesign.

Possible enhancements include:

* Trusted devices
* Device fingerprints
* Concurrent session limits
* Session inactivity timeout
* Remote logout
* Session notifications
* Risk-based authentication

---

# Summary

Sessions provide server-side control over authenticated devices while JWT access tokens remain stateless.

Overall flow:

```text
Login

↓

Create Session

↓

Issue Tokens

↓

Authenticated Requests

↓

Refresh Rotation

↓

Session Update

↓

Logout or Expiration

↓

Session Removed
```

This architecture combines the scalability of JWT with the security and flexibility of server-managed sessions.
