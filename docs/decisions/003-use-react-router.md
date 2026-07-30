# ADR-003: Use React Router

## Status

Rejected

## Decision

Don't introduce React Router in Version 1 yet.

## Why?

- The application currently has a single user flow.
- There are no independent pages requiring client-side routing.
- Introducing a router now adds an extra dependency and architectural surface without solving a real problem.
- When we introduce pages like About, Privacy Policy, Terms, Settings, or Download History (future), we can add React Router with minimal refactoring because the application structure won't depend on its absence.
