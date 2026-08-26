# SnapStack — Implementation Plan

> This is the execution plan for the current SnapStack codebase.
> `docs/PROJECT.md` remains the source of truth for product and architecture decisions.
> This file answers one question: **what do we build next, in what order, and how do we know each step is finished?**

---

## 1. Current State

SnapStack is past the initial setup stage.

### Already in place

- React + Vite + TypeScript client
- Tailwind CSS v4
- React Router
- Express + TypeScript server
- `POST /api/fetch`
- URL parsing and validation
- HTTPS enforcement
- Instagram host allowlist
- `/p/` and `/reel/` path validation
- Thin controller structure
- Separate constants for domains and paths
- Initial provider architecture decision
- Direct Instagram anonymous-session/GraphQL approach experimentally verified

### Not implemented yet

- Instagram session module
- Instagram provider
- Carousel extraction
- Normalized metadata response
- Client → `/api/fetch` integration
- Media preview
- Image download
- Reel download
- PDF generation
- Production error handling
- Deployment

### Important correction to the older task board

Do **not** go back and redo generic setup work such as Tailwind, ESLint, path aliases, or landing-page work just because an older `TASKS.md` still lists them as incomplete.

The current codebase is the stronger indication of progress.

---

# 2. The V1 Build Order

We will build one complete vertical slice at a time:

```text
1. Instagram session
        ↓
2. Instagram provider
        ↓
3. Carousel extraction
        ↓
4. Normalize metadata
        ↓
5. POST /api/fetch
        ↓
6. Frontend fetch + preview
        ↓
7. Image download
        ↓
8. Reel download
        ↓
9. PDF generation
        ↓
10. Error handling + cleanup
        ↓
11. Testing + deployment
```

The most important rule:

> **Do not build downloads or PDF generation before metadata extraction is reliable.**

The provider is the foundation for everything after it.

---

# 3. Phase 1 — Build the Instagram Session

## Goal

Create a small module responsible only for creating and managing a temporary anonymous Instagram session.

### Session should own

- HTTP client
- Cookie jar
- Instagram cookies
- CSRF token
- request headers needed by Instagram

### Session should NOT own

- URL validation
- Media extraction
- Response normalization
- PDF generation
- Express `Request` / `Response`

### Suggested structure

```text
server/src/
├── config/
├── constants/
├── controllers/
├── routes/
├── validators/
└── providers/
    └── instagram/
        ├── instagram.session.ts
        └── instagram.provider.ts
```

Do not create additional abstractions until they are actually needed.

## Implementation steps

1. Choose and install a cookie-jar HTTP solution.
2. Create a function/class that creates a fresh Instagram session.
3. Request Instagram using that session.
4. Capture the returned cookies.
5. Obtain the CSRF token from the session.
6. Verify that the session can make the required Instagram web request.
7. Make sure session state is local to the request.

## Done when

You can prove:

```text
new request
   ↓
new session
   ↓
Instagram reachable
   ↓
cookies available
   ↓
CSRF token available
```

Do not move on until this works reliably.

---

# 4. Phase 2 — Build the Instagram Provider

## Goal

Hide all Instagram-specific details behind:

```ts
instagramProvider.getMetadata(url);
```

The controller should not know how Instagram works.

### Provider responsibilities

- Receive a validated Instagram URL
- Create/use a temporary session
- Request Instagram
- Extract the relevant post data
- Return application-level data

### Provider must hide

- Instagram GraphQL details
- Query identifiers
- Cookies
- CSRF handling
- Instagram response structure
- Instagram-specific extraction logic

## First target

Implement **carousel extraction first**.

Do not start with image + carousel + reel simultaneously.

### First provider flow

```text
Instagram URL
      ↓
Create session
      ↓
Request Instagram
      ↓
Find post data
      ↓
Determine media type
      ↓
Extract carousel children
      ↓
Extract image URLs
      ↓
Return normalized data
```

## Done when

For a known public carousel URL:

```ts
await instagramProvider.getMetadata(url);
```

returns useful data without exposing Instagram's raw response.

---

# 5. Phase 3 — Define the Normalized Metadata

Before connecting the frontend, define the data contract.

Keep it small.

Example shape:

```ts
type MediaType = "image" | "carousel" | "reel";

interface PostMetadata {
  type: MediaType;
  caption?: string;
  author?: {
    username: string;
    displayName?: string;
  };
  thumbnail?: string;
  media: Array<{
    type: "image" | "video";
    url: string;
  }>;
}
```

This is an example direction, not a requirement to copy blindly.

The important principle is:

> The client receives SnapStack data, not Instagram data.

For a carousel, the client should receive all usable image URLs.

## Done when

The provider output is stable enough that the frontend does not care how Instagram was queried.

---

# 6. Phase 4 — Connect `POST /api/fetch`

The current controller only validates the URL and returns a success message.

Change the responsibility to:

```text
HTTP request
    ↓
validate URL
    ↓
provider.getMetadata()
    ↓
return normalized metadata
```

The controller remains thin.

It should not contain extraction logic.

### Expected successful flow

```http
POST /api/fetch
Content-Type: application/json
```

```json
{
  "url": "https://www.instagram.com/p/..."
}
```

Response:

```json
{
  "success": true,
  "data": {
    "...": "normalized metadata"
  }
}
```

## Error cases to handle

At minimum:

- Missing URL
- Invalid URL
- Unsupported host
- Unsupported path
- Instagram cannot be reached
- Post unavailable
- Private/unavailable content
- Extraction failure

Do not expose raw Instagram errors to the client.

## Done when

You can test `/api/fetch` independently with a REST client and receive useful normalized metadata.

---

# 7. Phase 5 — Frontend Integration

Only after the backend contract works.

## Goal

Turn the existing landing page into the actual SnapStack product flow.

### User flow

```text
Paste Instagram URL
       ↓
Click Fetch
       ↓
Fetching post...
       ↓
Metadata returned
       ↓
Show preview
       ↓
Show available actions
```

### Frontend responsibilities

- Input state
- Loading state
- Error state
- API request
- Display returned metadata
- Download button interactions

### Frontend must NOT

- Parse Instagram
- Inspect Instagram responses
- Decide whether something is a carousel
- Generate the PDF

The backend already knows the media type.

## Done when

A user can paste a public carousel URL and see its content in the browser.

---

# 8. Phase 6 — Image Downloads

Start with the simplest export.

## Goal

Allow carousel images to be downloaded.

Possible V1 behavior:

```text
Carousel
   ↓
Download images
```

If multiple files need to be returned together, decide whether ZIP is necessary at that point.

Remember:

> ZIP is optional for V1.

Do not build a sophisticated file-generation system unless the product actually needs it.

## Done when

A user can download the images from a fetched carousel.

---

# 9. Phase 7 — Reel Download

Once the image flow is stable:

```text
Reel URL
   ↓
Provider extracts video
   ↓
Normalized metadata
   ↓
Download endpoint
   ↓
MP4
```

Do not mix reel-specific logic into the carousel implementation.

The provider should determine the media type.

## Done when

A public supported reel can be fetched and downloaded.

---

# 10. Phase 8 — PDF Generation

This is the product-defining feature.

Only begin after carousel extraction and image downloading work.

## Goal

```text
Carousel
   ↓
Image URLs
   ↓
Fetch images
   ↓
Create PDF
   ↓
Return PDF
```

### Backend owns

- Downloading source images
- PDF generation
- Temporary files/buffers
- Cleanup

### Frontend owns

- "Export PDF" button
- Loading state
- Downloading returned PDF

## First PDF version

Keep it simple:

- One carousel image per PDF page
- Preserve image aspect ratio
- No fancy templates
- No user customization

Improve styling only after the basic export works.

## Done when

A user can paste a carousel URL and download a readable PDF containing every carousel slide.

---

# 11. Phase 9 — Production-Quality Error Handling

After the main feature works, improve reliability.

Add:

- Centralized error handling
- Consistent API error format
- Request validation
- Safe logging
- Temporary resource cleanup
- Timeouts
- Clear client-facing messages

Example client-facing errors:

```text
Invalid Instagram URL.
```

```text
This post could not be accessed.
```

```text
This Instagram content is not supported.
```

Avoid exposing:

```text
GraphQL query failed
ECONNRESET
500 Internal Server Error
```

unless appropriate for development logs.

---

# 12. Phase 10 — Testing

Testing should focus on important behavior rather than chasing 100% coverage.

## Validator tests

Test:

- Missing URL
- Malformed URL
- HTTP URL
- Non-Instagram URL
- Unsupported Instagram path
- Valid `/p/` URL
- Valid `/reel/` URL

## Provider tests

Test the normalization/extraction logic against controlled response data where possible.

Avoid making the entire test suite depend on Instagram being online.

## API tests

Test:

- Valid fetch
- Invalid URL
- Unsupported content
- Provider failure

## Frontend tests

At minimum verify:

- User can submit URL
- Loading state appears
- Error is shown
- Metadata appears
- Correct actions appear for image/carousel/reel

---

# 13. Phase 11 — Deployment

Only deploy after the complete core flow works locally.

## Deployment checklist

### Backend

- Production environment variables
- CORS configuration
- Request limits
- Timeouts
- Error handling
- Temporary file cleanup
- Production start command

### Frontend

- Production API URL
- Production build
- Responsive UI
- Error/loading states

### Final smoke test

```text
Public carousel
    ↓
Fetch
    ↓
Preview
    ↓
Download images
    ↓
Export PDF
```

Then:

```text
Public reel
    ↓
Fetch
    ↓
Download MP4
```

---

# 14. What We Are Explicitly NOT Building Yet

Do not start these until V1 proves there is a reason:

- Authentication
- Database
- Redis
- Cloud storage
- Queues
- Background workers
- Caching
- Rate limiting infrastructure
- Browser extension
- PWA
- AI
- OCR
- Batch downloads
- Multi-platform providers

This keeps the project aligned with its philosophy:

> Make it work → make it clean → make it scalable.

---

# 15. Development Checkpoints

Each checkpoint should produce something demonstrable.

### Checkpoint 1

```text
Instagram session works
```

### Checkpoint 2

```text
Provider extracts carousel data
```

### Checkpoint 3

```text
POST /api/fetch returns normalized metadata
```

### Checkpoint 4

```text
Frontend displays fetched carousel
```

### Checkpoint 5

```text
Images download
```

### Checkpoint 6

```text
Reels download
```

### Checkpoint 7

```text
Carousel exports to PDF
```

### Checkpoint 8

```text
V1 is deployable
```

---

# 18. Definition of V1 Complete

SnapStack V1 is complete when a user can:

- Paste a public Instagram URL.
- Fetch the post.
- Automatically identify image/carousel/reel.
- Preview the content.
- Download images.
- Download reels.
- Export carousels as PDFs.
- Complete the entire flow without an account.

Everything beyond that is secondary.
