# SnapStack

This document is the source of truth for SnapStack. Act as my senior software engineer and mentor. Guide me to build it, but don't build it for me unless I explicitly ask. Challenge my decisions, review my code, and prioritize teaching over implementation. When implementation details conflict with this document, this document takes precedence unless an architectural decision is recorded in the Decision Log.

> **Source of Truth**
>
> This document is the single source of truth for the SnapStack project.
> Product and architectural decisions should follow this document unless they
> are intentionally superseded by an entry in the Decision Log.

**Version:** 1.1.0  
**Status:** Foundation / Active Development  
**Last Updated:** 2026-07-30

---

# 1. Project Vision

SnapStack is a web application focused on helping users preserve valuable Instagram content.

It is **not** positioned as just another Instagram downloader.

Its primary identity is:

> **Turn Instagram Carousels into Beautiful PDFs**

Downloading images and reels is an important feature, but PDF generation is the product's unique value proposition.

---

# 2. Product Philosophy

- Simplicity over unnecessary complexity.
- Build only what Version 1 needs.
- Keep architecture scalable.
- Separate UI from business logic.
- Refactor only after real problems appear.

Development philosophy:

1. Make it work.
2. Make it clean.
3. Make it scalable.

---

# 3. Target Audience

Primary:

- Students saving educational carousel posts.

Secondary:

- Professionals archiving useful content.

Tertiary:

- Content creators preserving their own posts.

---

# 4. MVP Features

Supported:

- Instagram image posts
- Instagram carousels
- Instagram reels

Exports:

- JPG
- MP4
- PDF (carousel)
- ZIP (optional)

---

# 5. Non Goals (V1)

Not included:

- User accounts
- Authentication
- Download history
- Cloud storage
- Browser extension
- PWA
- AI
- OCR
- Batch downloads
- Multi-platform support
- Analytics
- Background jobs
- Advanced caching

---

# 6. Future Ideas

- Browser Extension
- Progressive Web App
- OCR
- AI summaries
- AI note extraction
- Batch downloads
- TikTok support
- Pinterest support
- Reddit support
- Notion export
- Google Drive export

---

# 7. Product Flow

User

↓

Paste URL

↓

Fetch

↓

Backend analyses content

↓

Frontend adapts UI automatically

↓

User chooses export

↓

Download

---

# 8. UX Principles

The user should never choose media type manually.

Backend determines whether the URL is:

- Image
- Carousel
- Reel

Frontend only adapts its interface.

Loading messages should be human friendly.

Examples:

- Fetching post...
- Downloading media...
- Preparing PDF...
- Almost ready...
- Download ready!

Never expose backend concepts like Jobs, Queues or Workers.

---

# 9. Technical Philosophy

Frontend responsibilities:

- UI
- UX
- State
- API communication

Frontend should never:

- Parse Instagram
- Generate PDFs
- Contain business logic

Backend responsibilities:

- Validation
- Instagram communication
- Metadata extraction
- PDF generation
- Download generation

---

# 10. Architecture

React

↓

Node + Express

↓

Provider

↓

Instagram

Future providers:

- Instagram
- TikTok
- Pinterest
- Reddit

Providers isolate platform-specific logic.

---

# 11. Backend Philosophy

Stateless architecture.

Receive Request

↓

Fetch Media

↓

Generate Output

↓

Return Response

↓

Delete Temporary Files

No permanent storage in Version 1.

---

# 12. API Philosophy

Separate metadata from downloads.

Example:

POST /fetch

Returns metadata only.

POST /export/pdf

Returns PDF.

POST /download/images

Returns archive/images.

POST /download/video

Returns MP4.

---

# 13. Validation Pipeline

Incoming Request

↓

Body exists

↓

Valid URL

↓

HTTPS only

↓

Allowed domain

↓

Allowed path

↓

Rate limit (future)

↓

Provider

Always use URL parsing.

Never rely on string matching.

---

# 14. Security Principles

- HTTPS only
- Domain allowlist
- Path validation
- Reject malformed URLs
- Never trust client input
- Future rate limiting

---

# 15. Performance Philosophy

Version 1:

Generate every request.

Future:

Normalize URL

↓

Generate

↓

Temporary cache

↓

Reuse identical output

Only optimize after real demand exists.

---

# 16. Design Principles

- Simplicity over cleverness.
- Explicit over implicit.
- Single responsibility.
- Build for today's problems.
- Refactor when necessary.
- User experience first.
- Consistency over perfection.

---

# 17. Error Philosophy

Users should receive meaningful errors.

Good:

- Invalid Instagram URL.
- Private accounts are not supported.
- Unable to access this post.

Avoid:

- Internal Server Error
- Something went wrong

---

# 18. Quality Standards

This portfolio project should demonstrate:

- Clean architecture
- Modular code
- Readable code
- Proper validation
- Good error handling
- Responsive UI
- Accessibility awareness
- Maintainability

---

# 19. Success Criteria

Version 1 is successful if a user can:

- Paste an Instagram URL.
- Fetch metadata.
- Preview content.
- Download images.
- Download reels.
- Export carousel as PDF.
- Complete the flow without an account.

---

# 20. Folder Philosophy

Current backend:

server/

- app.js
- server.js
- config/
- controllers/
- middlewares/
- routes/

Expected future additions:

- providers/
- services/
- validators/
- pdf/
- constants/

Architecture should evolve naturally.

---

# 21. Tech Direction

Frontend

- React
- Tailwind CSS

Backend

- Node.js
- Express

Technology choices may evolve after discussion.

---

# 22. Current Implementation State

Completed so far:

- React client initialized with Vite
- Backend foundation established with Express and TypeScript
- Basic project documentation created
- Git workflow and setup notes captured

Current focus:

- URL validation
- Metadata extraction
- Client-server integration
- First production feature slice

This project has moved beyond planning and architecture into the foundation stage.

---

# 23. Roadmap

Phase 0

- Product Design ✅

Phase 1

- Architecture ✅

Phase 2

- Foundation ✅
- Project Setup ✅
- Documentation ✅
- Git Workflow ✅
- Frontend Vite Setup ✅
- Backend Foundation ✅

Phase 3

- Metadata

Phase 4

- Downloads

Phase 5

- PDF Generation

Phase 6

- Deployment

Phase 7

- Browser Extension

Phase 8

- Future Features

---

# 24. Mentor Rules

The developer writes production code.

The AI acts as:

- Mentor
- Reviewer
- Senior engineer

The AI should:

- Challenge decisions
- Explain concepts
- Review architecture
- Review code
- Prefer hints over full solutions

---

# 25. Decision Log

Record major architectural decisions.

Template:

Date

Decision

Reason

Alternatives

Status

Example:

Decision:
Backend remains stateless.

Reason:
Simpler MVP.

Status:
Accepted

---

# Core Principle

SnapStack is not being built merely to demonstrate that it works.

It is being built to demonstrate thoughtful software engineering, clean architecture, and sound engineering decisions.

---

# Current Development State

The frontend foundation has been established using:

- React
- Vite
- TypeScript
- TailwindCSS

The frontend foundation is intentionally minimal for Version 1. Frontend
design/Tailwind mastery is a separate learning goal and is not the primary
focus of SnapStack.

Current development focus is the backend.

The backend currently uses:

- Node.js
- Express
- TypeScript

The backend currently has:

- Routes
- Controllers
- URL validation
- Allowed-host validation
- Supported-path validation

The current URL validation pipeline is:

Request exists

↓

Valid URL syntax

↓

HTTPS only

↓

Allowed Instagram host

↓

Supported Instagram path

↓

Provider

Supported V1 paths:

- `/p/` — Instagram image posts and carousels
- `/reel/` — Instagram reels

Path validation uses parsed URL properties rather than string matching.

---

# Current Backend Architecture Decisions

## Controller Responsibility

Controllers are responsible for:

- Processing HTTP requests
- Calling validation/business logic
- Returning HTTP responses

Controllers should not contain:

- URL validation rules
- Instagram-specific implementation
- PDF generation logic
- Download-generation logic

## Validator Responsibility

URL validation is separated from the controller.

The validator currently:

1. Checks that a URL exists.
2. Parses the URL using the built-in `URL` class.
3. Requires HTTPS.
4. Validates the hostname against an allowlist.
5. Validates the pathname against supported path prefixes.

Supported hosts are maintained as configuration rather than hardcoded
string comparisons.

Supported path prefixes are maintained separately from domain configuration.

Validation uses early returns and returns validation results rather than
HTTP responses.

## Instagram Provider

Instagram-specific communication is isolated behind an Instagram provider.

The provider's public responsibility is to expose application-relevant
Instagram data rather than HTTP-specific details.

Initial provider capability:

```ts
instagramProvider.getMetadata(url)
```

The provider should hide:

- Instagram request details
- Cookies
- CSRF handling
- Instagram's internal response structure
- Instagram-specific extraction logic

The rest of the application should not depend on Instagram's internal
implementation.

## Instagram Data Extraction Strategy

For Version 1, SnapStack will communicate directly with Instagram rather than
using a third-party scraping API.

The current experimentally verified approach is:

```text
Create anonymous Instagram session
        ↓
Request Instagram
        ↓
Receive cookies
        ↓
Obtain valid CSRF token
        ↓
POST Instagram GraphQL web request
        ↓
Receive media/metadata
        ↓
Normalize into SnapStack data
```

This approach does not require the user to log into Instagram.

The Instagram GraphQL request currently being investigated is an internal
web request rather than a documented public API. Its request format,
identifiers, headers, and response structure may change if Instagram changes
its web implementation.

Therefore all Instagram-specific implementation must remain isolated inside
the provider.

## Instagram Session

A temporary Instagram session is created for each SnapStack request.

The session contains:

- Cookie jar
- HTTP client
- Instagram session state
- CSRF token obtained from that session

Session state must not be shared globally between unrelated SnapStack
requests.

Version 1 will not persist Instagram sessions in:

- A database
- Redis
- A global in-memory session
- User accounts

After the operation completes, the temporary session can be discarded.

A cookie-jar library will be used instead of manually implementing cookie
parsing and cookie persistence.

## Carousel Extraction Priority

The first major backend objective is not to implement every Instagram
feature.

The product-defining technical problem is:

```text
Instagram carousel URL
        ↓
Extract all carousel media
        ↓
Obtain image URLs
        ↓
Generate PDF
```

Carousel media extraction is therefore the first provider capability to
stabilize.

Once carousel extraction works reliably, the same provider architecture can
be extended to single-image posts and reels.

---

# Development Workflow

SnapStack is being developed one small task at a time.

For significant implementation decisions, the development process is:

```text
Understand requirement
        ↓
Discuss possible approaches
        ↓
Challenge trade-offs
        ↓
Choose approach
        ↓
Implement
        ↓
Review implementation
        ↓
Move to next task
```

The developer writes the production code.

The AI acts as a mentor and reviewer.

The AI should not provide complete implementations unless explicitly asked.

The AI should:

- Explain concepts when needed.
- Ask reasoning questions before major decisions.
- Challenge assumptions.
- Review code.
- Point out bugs and design problems.
- Provide hints rather than solutions when appropriate.
- Keep tasks small and sequential.
- Avoid unnecessary documentation work during implementation unless it
  directly helps the current development task.

The primary learning goal is to become confident building projects as a
developer and to understand the code and decisions being made, rather than
copying implementations.

---

# Architecture Evolution Rule

Architecture should be decided deliberately, but it is not immutable.

A new abstraction should be introduced when an actual responsibility,
complexity, or external integration justifies it.

Do not create folders, services, abstractions, or infrastructure merely
because they might be useful in the future.

When implementation reveals that an architectural decision is incorrect:

```text
Implementation
        ↓
New evidence
        ↓
Re-evaluate decision
        ↓
Update this document
        ↓
Continue implementation
```

The latest documented architectural decision takes precedence over older
assumptions.

---

# Current Backend Progress

Completed:

- Express backend initialized.
- Route/controller structure established.
- `POST /fetch` route established.
- URL validator established.
- URL syntax validation implemented using JavaScript's built-in `URL` class.
- HTTPS validation implemented.
- Instagram host allowlisting implemented.
- Instagram supported-path validation implemented.
- Direct Instagram GraphQL request experimentally verified.
- Anonymous Instagram cookie-session flow experimentally verified.
- CSRF token requirement and temporary cookie-session behavior verified.
- Carousel response successfully observed through the Instagram web request.

Current task:

- Build the Instagram provider/session implementation.
- Extract and normalize carousel media.
- Return SnapStack metadata through `POST /fetch`.

---

# Updated Development Roadmap

Phase 0

Product Design

✅ Completed

Phase 1

Architecture

✅ Core architecture established

Phase 2

Project Setup

✅ Completed

Phase 3

Backend

(Current)

Phase 4

Frontend

Foundation completed; product integration remains

Phase 5

PDF Generation

Phase 6

Browser Extension

Phase 7

Deployment

Phase 8

Future Features
