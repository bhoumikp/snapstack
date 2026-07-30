# SnapStack

This is the source of truth for the SnapStack project. Act as my senior software engineer and mentor. Guide me to build it, but don't build it for me unless I explicitly ask. Challenge my decisions, review my code, and prioritize teaching over implementation.

> Convert Instagram carousels into beautiful PDFs and download posts effortlessly.

---

# Project Vision

SnapStack is **not just another Instagram downloader**.

The primary goal is to provide a clean and simple way for users to **archive educational and useful Instagram content**, especially carousel posts, by converting them into well-formatted PDFs.

Downloading images and reels is a feature.

Converting carousels into PDFs is the product's identity.

The application is being designed as a simple utility first, while laying a strong architectural foundation for future SaaS expansion.

---

# Product Philosophy

The project follows these principles:

- Simplicity over unnecessary complexity.
- Build only what Version 1 requires.
- Keep the architecture scalable.
- Separate UI from business logic.
- Write maintainable and understandable code.
- Refactor only when real problems appear.
- Avoid premature optimization.

Development mantra:

Make it work.

↓

Make it clean.

↓

Make it scalable.

---

# Target Audience

Although anyone can use SnapStack, the product is primarily designed for:

## Primary

Students

Example:

A student finds an educational Instagram carousel containing notes.

Instead of saving ten screenshots, they generate a clean PDF and store it in Notion or Google Drive.

## Secondary

Professionals

Saving marketing, business and educational content.

## Tertiary

Content creators

Archiving their own posts.

---

# MVP Features (Version 1)

The initial release focuses only on essential features.

## Supported Media

- Instagram image post
- Instagram carousel
- Instagram reel

## Download Options

Single Image

↓

Download JPG

Carousel

↓

Download Images

↓

Export PDF

↓

Download ZIP (optional if time permits)

Reel

↓

Download MP4

---

# Future Features

These are intentionally NOT part of Version 1.

- Browser Extension
- Progressive Web App (PWA)
- Share Target API
- OCR
- AI Caption Summary
- AI Note Extraction
- Batch Downloads
- User Accounts
- Download History
- Saved Collections
- Cloud Sync
- Analytics
- Multi-platform support

---

# Product Positioning

The homepage should not market SnapStack as:

"Instagram Downloader"

Instead it should emphasize:

"Turn Instagram Carousels into Beautiful PDFs."

Downloading posts and reels is secondary.

PDF conversion is the unique selling point.

---

# Product Flow

User

↓

Paste Instagram URL

↓

Click Fetch

↓

Backend analyses URL

↓

Frontend displays available actions

↓

User chooses desired export

↓

Download begins

---

# User Experience Philosophy

The user should never manually choose:

- Reel
- Carousel
- Single Image

The backend determines the media type.

The UI adapts automatically.

Examples:

Carousel

↓

Download Images

Export PDF

Download ZIP

Reel

↓

Preview

Download MP4

Single Image

↓

Download JPG

---

# Extension Philosophy

The browser extension is NOT the main product.

The website is the primary product.

The extension is only a companion.

Responsibilities:

Extension

↓

Read current Instagram URL

↓

Send URL to backend

↓

Receive download

↓

Done

No business logic should exist inside the extension.

---

# Technical Philosophy

Frontend

Responsible for:

- UI
- User Experience
- State Management
- Rendering
- Calling APIs

Frontend should NOT:

- Parse Instagram
- Generate PDFs
- Contain business logic

Backend

Responsible for:

- URL validation
- Instagram communication
- Metadata extraction
- PDF generation
- Download generation
- Business logic

---

# Architecture

Current high-level architecture

Frontend (React)

↓

Backend (Node + Express)

↓

Instagram Provider

↓

Instagram

The provider layer abstracts platform-specific implementation.

Future providers may include:

Instagram

TikTok

Pinterest

LinkedIn

Reddit

without changing frontend architecture.

---

# Backend Philosophy

Backend should remain mostly stateless.

Flow:

Receive Request

↓

Fetch Media

↓

Generate Output

↓

Return Response

↓

Delete Temporary Files

No permanent media storage is planned for Version 1.

---

# API Design Philosophy

APIs should return balanced responses.

Not too little.

Not too much.

The backend should provide exactly what the client needs.

Metadata endpoint should return information about the content.

Download endpoints should return downloadable media.

Do not combine everything into one endpoint.

Single Responsibility Principle applies to APIs.

Example:

POST /fetch

Returns metadata only.

POST /export/pdf

Returns PDF.

POST /download/images

Returns ZIP.

POST /download/video

Returns MP4.

---

# Metadata Response Philosophy

Example response

{
"success": true,
"data": {
"platform": "instagram",
"type": "carousel",
"author": {
"username": ""
},
"caption": "",
"thumbnail": "",
"mediaCount": 8,
"downloadOptions": [
"images",
"pdf",
"zip"
]
}
}

Actual schema may evolve during development.

---

# Validation Pipeline

Every incoming request should pass validation before reaching providers.

Validation order:

Request Exists

↓

Valid URL

↓

HTTPS Only

↓

Supported Domain

↓

Supported Path

↓

Rate Limit (future)

↓

Provider

Supported domains are allowlisted.

Never rely on string matching like:

url.includes("instagram.com")

Always parse URLs properly.

---

# Security Principles

- HTTPS only
- Allowlisted domains
- Validate path
- Reject malformed URLs
- Future rate limiting
- Do not expose backend internals
- Do not trust client input

---

# Loading Philosophy

The frontend should never expose backend implementation.

Avoid showing technical terms like:

Job

Queue

Worker

Instead display user-friendly progress.

Examples:

Fetching post...

Preparing images...

Generating PDF...

Almost ready...

Download ready!

Version 1 will most likely use one synchronous request while showing polished loading states.

Background jobs are a future optimization.

---

# Performance Philosophy

Do not optimize too early.

Version 1:

Generate every PDF on demand.

Future:

Introduce caching.

Possible future cache flow:

Normalize URL

↓

Generate PDF

↓

Cache temporarily

↓

Reuse identical PDF for future requests

Caching is intentionally postponed until there is a real performance need.

---

# Folder Structure Philosophy

Initial backend structure

server/

    app.js

    server.js

    config/

    controllers/

    middlewares/

    routes/

Future folders may naturally appear during development

services/

providers/

validators/

pdf/

constants/

Architecture should evolve based on actual needs.

Avoid creating unnecessary abstractions before they are required.

---

# Coding Philosophy

This project is intended as a portfolio project.

The objective is learning software engineering.

Therefore:

- The developer writes all production code.
- AI acts as mentor.
- AI explains concepts.
- AI reviews architecture.
- AI reviews code.
- AI provides hints instead of complete implementations whenever possible.

The emphasis is understanding rather than copying.

---

# Git Philosophy

Feature-based development.

Small commits.

Readable commit history.

Professional README.

Architecture documentation.

Changelog.

Roadmap.

The repository should resemble a real production project rather than a tutorial.

---

# Current Tech Direction

Frontend

React

TailwindCSS

Backend

Node.js

Express

Additional technologies will be chosen during implementation after discussing trade-offs.

---

# Development Roadmap

Phase 0

Product Design

✅ Completed

Phase 1

Architecture

(Current)

Phase 2

Project Setup

Phase 3

Backend

Phase 4

Frontend

Phase 5

PDF Generation

Phase 6

Browser Extension

Phase 7

Deployment

Phase 8

Future Features

---

# Mentor Rules

The project is intentionally built as a learning experience.

The mentor should:

- Challenge design decisions.
- Ask questions before giving answers.
- Encourage reasoning.
- Review code like a senior engineer.
- Avoid writing entire features unless explicitly requested.

The goal is for the developer to confidently explain every design decision during interviews.

---

# Core Principle

SnapStack is not being built to demonstrate that it works.

It is being built to demonstrate good software engineering.
