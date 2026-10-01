# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- React 19 and TypeScript, built with Vite.
- React Router for client navigation.
- Leaflet and React Leaflet for map interaction.
- Express API with Prisma and PostgreSQL for authenticated user and spot data.

## Users

The primary user is an individual mushroom forager using a phone outdoors to save a location and short observation, then returning later to review or revisit it. Desktop use supports planning and reviewing saved spots, but mobile field use is the priority.

## Product Purpose

Myco Location is a private field notebook with a map. It lets a user remember where a mushroom spot was found, attach a useful note, review saved spots, and return to them later. Success means recording a spot is fast in the field and finding it again is unambiguous.

## Positioning

Myco Location organizes a person’s own mushroom locations around a synchronized map and spot record. It is not a social network, public sightings database, mushroom-identification service, or edibility authority.

## Operating Context

- A user registers or signs in before accessing private spots.
- The saved-spots workflow combines map markers with a readable list.
- The new-spot workflow starts from the user’s location, allows marker adjustment, and records a spot name plus optional observation.
- Outdoor use may involve a narrow viewport, glare, imprecise touch, distraction, and intermittent attention.
- Destructive actions such as deleting a spot require recovery or confirmation in future UI work.

## Capabilities and Constraints

- Implemented capabilities: registration, login, authenticated session, list saved spots, show spots on a map, create a named spot with coordinates and an optional observation, delete a spot, and locate the current user on a map.
- Each stored spot belongs to a user account.
- Exact coordinates are private product data and must not be presented as public proof or decorative content.
- Photo upload, species identification, season forecasts, sharing, offline storage, and navigation to a spot are not established capabilities and must not be implied in mockups.
- Mockups may use clearly illustrative spot records, but may not invent commercial claims, testimonials, user counts, or safety guarantees.

## Brand Commitments

- Product name: Myco Location.
- Approved product stance: “The Forager’s Field Notebook,” documented in `DESIGN.md`.
- Existing anchor photograph: `client/assets/hero.jpeg`.
- The purple Vite favicon is scaffold artwork, not an established product mark.

## Evidence on Hand

- Existing routes and workflows in `client/src/pages/`.
- Existing mushroom photograph at `client/assets/hero.jpeg`.
- User, spot, and ownership model in `server/prisma/schema.prisma`.
- No verified testimonials, usage metrics, customer logos, identification accuracy data, or public safety evidence exists. Future work must not fabricate them.

## Product Principles

- Keep the map and the current task primary.
- Make field capture fast, thumb-reachable, and resilient to interrupted attention.
- Keep private locations visibly private.
- State only capabilities the product actually has.
- Make selection, saving, deletion, loading, failure, and recovery states explicit.

## Accessibility & Inclusion

Design for keyboard access, screen-reader semantics, visible focus, readable contrast, 44px minimum touch targets on mobile, reduced motion, and layouts that remain usable from 320px through wide desktop viewports.
