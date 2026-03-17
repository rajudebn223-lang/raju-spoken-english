# Raju Spoken English

## Current State
New project — no existing app files.

## Requested Changes (Diff)

### Add
- Spoken English learning platform branded as "Raju Spoken English"
- Hero section with headline, tagline, and CTA
- Featured Lessons section (lesson cards with title, description, duration, rating)
- Practice Phrases section with tabbed categories
- Grammar Tips section
- Student Testimonials
- Footer with navigation

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend
- Lessons store: id, title, description, category, duration, level, rating
- Practice phrases store: id, phrase, category, translation/meaning
- Grammar tips store: id, title, content, category
- Testimonials store: id, studentName, message, rating
- Query methods for all stores with optional category filtering
- Seed data for lessons, phrases, grammar tips, testimonials

### Frontend
- Landing page with hero, feature strip, lesson cards, practice phrases, testimonials, footer
- Lessons browse page with category filters
- Practice page with tabbed phrase categories
- Grammar tips page
- Responsive layout
