# Architecture

## Overview

SnapStack follows a client-server architecture.

Client
↓
REST API
↓
Provider Layer
↓
Media Processing
↓
Response

## Components

### Client

Responsible for UI/UX.

### Server

Responsible for business logic.

### Providers

Responsible for extracting media from supported platforms.

### PDF Service

Responsible for generating downloadable PDF files.

## Design Principles

- Stateless backend
- Thin controllers
- Business logic inside services
- Provider-based architecture
- Future multi-platform support
