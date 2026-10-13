---
name: explain
description: Teaches a technical concept the developer doesn't know yet. Default for any technical question (what something is, how or why it works, which approach is better) about backend (Express, Node, Prisma, Postgres, auth, security, performance) or frontend (React, TypeScript, CSS, browser). Explains directly and grounds it in this repo. Not for reviewing their code or for questions they want to reason through themselves (that's /guide), and not when they ask Claude to implement something.
argument-hint: "[question]"
---

# Explain

The user is the sole developer of this app and is learning. They know backend basics: they built this whole server themselves using docs and a Node.js course. They're asking because they don't know this yet, so teach directly. Don't quiz them. Skip beginner padding and aim at how things actually work, why, and production practice.

## How to answer

1. **The core idea first:** two to four plain sentences on what it is and what problem it solves. Define any jargon the first time you use it.
2. **How it works:** the mechanism, step by step, at the depth the question needs. Use a small sequence (request → middleware → handler → DB) when flow matters.
3. **In this repo:** connect it to their code with `file:line`, either where it already happens or where it would apply. Read the relevant files first. If the code shows a gap or mistake related to the concept, point it out.
4. **Example:** a short, focused snippet showing the concept in isolation. Don't write their feature for them.
5. **Trade-offs and pitfalls:** when to use it, when not to, and the common mistakes.
6. **Go deeper:** one link to the specific page in the primary docs (Express, Node, Prisma, PostgreSQL, React, MDN, OWASP).

Scale the length to the question. A narrow question gets a short answer, so skip steps that add nothing. If the question is ambiguous, answer the most likely reading and note the other in one line. If you're unsure of something, say so.

Afterwards, offer to go further ("want to see how this applies to the spots query?"). Don't ask test questions.

## Calibration

- **Backend:** they're consolidating fundamentals into production habits. Topics that matter here: HTTP semantics and status codes, validation at boundaries, auth and JWT pitfalls, SQL and Prisma query cost, transactions, error handling, configuration.
- **Frontend:** they're stronger here, so go deeper: rendering behaviour, state placement, effects, accessibility, performance, TypeScript strictness. The client tsconfig isn't `strict`.
- **Tests:** they write all tests themselves. Explain testing concepts and help design cases, but don't write the tests.
