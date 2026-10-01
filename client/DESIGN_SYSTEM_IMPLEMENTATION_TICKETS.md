# Design System Implementation Tickets

These tickets implement the visual system defined in [`../DESIGN.md`](../DESIGN.md) for the product described in [`../PRODUCT.md`](../PRODUCT.md). The approved direction is mobile-first **Field Sheet**: map-led screens, parchment surfaces, strong field-notebook typography, and one dominant action for saving a spot.

## Review and checkbox policy

- `[ ]` means the work has not yet been independently verified.
- A checkbox should become `[x]` only after the implementation has been reviewed in code and verified in the running application.
- A ticket is complete only when all of its acceptance criteria and verification items are checked.
- Screenshots or implementation claims alone are not sufficient; interaction, responsive behavior, accessibility, and relevant states must also be checked.
- The mockup files are design references, not production components.

## Agreed implementation approach

- Use native CSS custom properties for design tokens.
- Use CSS Modules for component- and page-scoped styles.
- Keep global CSS limited to reset/base rules, typography, shared accessibility behavior, and unavoidable third-party overrides.
- Keep the application routes, API contracts, authentication flow, and spot data model unchanged unless a separate product ticket authorizes a change.
- Treat map tiles as a vendor-owned visual surface. Do not recolor, filter, restyle, or replace the terrain tiles as part of this work.
- Build mobile-first, then enhance layouts for larger viewports.
- Do not add photo upload, species identification, forecasts, sharing, offline mode, or directions; these are outside the current product scope.

## Suggested delivery order

1. Foundation and tokens
2. Shared UI primitives
3. Application shell and navigation
4. Authentication
5. Saved spots
6. New spot
7. Public home
8. Motion and interaction states
9. Responsive and accessibility hardening
10. Cleanup and final verification

---

## [ ] Ticket 01: Establish the styling foundation

Create the production styling structure that all later tickets use.

### Scope

- Add a token stylesheet containing the colors, typography, spacing, radii, shadows, layers, and motion values from `DESIGN.md`.
- Add a minimal global stylesheet for normalization, document defaults, font rendering, selection, and base accessibility behavior.
- Load **Epilogue** for display/headings and **Nunito Sans** for body/interface copy using a documented, production-safe strategy.
- Define a clear location for Leaflet-specific global overrides so they do not leak into unrelated UI.
- Confirm that Vite's built-in CSS Modules support is sufficient; do not add a styling dependency without a demonstrated need.

### Acceptance criteria

- [ ] Production color tokens exactly represent pine, muted pine, parchment, spore, forest, deep forest, moss, chanterelle, border, danger, and danger wash from `DESIGN.md`.
- [ ] Typography, radius, elevation, spacing, layer, and motion values are expressed as reusable custom properties.
- [ ] Tokens use semantic names where usage matters, without duplicating arbitrary page-specific values.
- [ ] Global styles contain only genuinely application-wide behavior.
- [ ] CSS Modules are the default for new component and page styles.
- [ ] Font loading avoids invisible text and has sensible fallbacks.
- [ ] Existing vendor map tiles render without filters or visual modification.

### Verification

- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] Token values have been compared directly with `DESIGN.md`.
- [ ] No production route regresses before component migration begins.

---

## [ ] Ticket 02: Build the shared UI primitives

Create the small set of reusable controls needed by the real product screens. Prefer focused components over a large generic component library.

### Scope

- Button variants: primary, secondary, quiet/text, and destructive.
- Form field building blocks: label, hint, error message, text input, password input, and textarea.
- Notebook surfaces: field sheet/panel, compact card or list row, status message, and toast.
- A consistent icon approach for navigation, location, add, delete, visibility, and status actions.

### Acceptance criteria

- [ ] Buttons support default, hover, active/pressed, keyboard focus, loading, and disabled states.
- [ ] Disabled controls use native semantics and remain visually distinguishable without relying only on opacity.
- [ ] Loading buttons keep a stable width and expose an accessible loading label.
- [ ] Inputs support default, hover, focus, populated, disabled, error, and read-only states where applicable.
- [ ] Labels remain visible; placeholders are not used as label replacements.
- [ ] Errors are programmatically associated with their fields.
- [ ] Interactive targets are at least 44 by 44 CSS pixels on touch layouts.
- [ ] Components use design tokens and CSS Modules rather than copied literal values.
- [ ] Component APIs reflect actual product needs and avoid speculative variants.

### Verification

- [ ] Every primitive has been exercised in all required states.
- [ ] Keyboard focus is visible against both parchment and map-adjacent surfaces.
- [ ] Text and control contrast meet WCAG AA.

---

## [ ] Ticket 03: Restyle the application shell and navigation

Apply the field-notebook identity to the shared layout while keeping navigation compact on mobile.

### Scope

- Replace the existing global header styling with a CSS Module-based shell.
- Implement the `64px` desktop top bar and its compact mobile equivalent.
- Present route-aware navigation for home, saved spots, new spot, login/register, and logout as appropriate to authentication state.
- Keep the primary save/add action visually dominant without creating multiple competing green actions.

### Acceptance criteria

- [ ] Navigation uses the approved pine/parchment visual hierarchy.
- [ ] Current-route state is clear visually and programmatically.
- [ ] Mobile navigation does not obscure page content or important map controls.
- [ ] Header controls have complete focus, pressed, and disabled behavior where relevant.
- [ ] The layout does not introduce a permanent sidebar.
- [ ] Long labels and authenticated user content do not break the shell.

### Verification

- [ ] Navigation works with keyboard only.
- [ ] Navigation is reviewed at 320px, 390px, 768px, and 1440px widths.
- [ ] All existing routes and authentication actions still work.

---

## [ ] Ticket 04: Implement the login and registration screens

Rebuild both authentication screens from the same visual grammar and reusable form components.

### Scope

- Use a focused form composition with one nearby photographic or environmental cue.
- Use a fixed parchment form panel that may overlap the image slightly.
- Do not present the form as a draggable or dismissible bottom sheet: no drag handle and no sheet gesture affordance.
- Keep login and registration layouts consistent while preserving their different fields and actions.

### Acceptance criteria

- [ ] Login and registration use shared primitives and page-level CSS Modules.
- [ ] The mobile form is immediately usable without depending on decorative imagery.
- [ ] Desktop composition follows the asymmetric field-notebook direction from `DESIGN.md`.
- [ ] Submission loading prevents duplicate requests and communicates progress.
- [ ] Server and validation errors are shown near the relevant field or form summary.
- [ ] Password visibility controls have accessible names and state.
- [ ] Tab order follows the visual reading order.
- [ ] The keyboard does not hide the active field or primary submit action on common mobile viewports.

### Verification

- [ ] Successful login and registration paths work.
- [ ] Invalid credentials, invalid fields, loading, and disabled states are visually reviewed.
- [ ] Layout is reviewed with browser zoom at 200%.

---

## [ ] Ticket 05: Implement the saved-spots experience

Make viewing saved spots the primary return experience: a map for place context and a field sheet for scanning saved observations.

### Scope

- Mobile: map on top with an opaque parchment field sheet/list below it.
- Desktop: coordinated map/list split view.
- Synchronize selected markers and selected list rows.
- Keep **Add spot** as the single dominant action in an accessible thumb-zone position on mobile.
- Preserve the configured tile vendor and the vendor's terrain appearance.

### Acceptance criteria

- [ ] Existing spot data appears in both the map and list representations.
- [ ] Selecting a marker identifies and reveals the corresponding list item.
- [ ] Selecting a list item identifies the corresponding marker without disruptive map motion.
- [ ] Marker and list selection are not communicated by color alone.
- [ ] The mobile list is an opaque reading surface, not translucent text over terrain.
- [ ] Empty state explains the value of saving a spot and offers one clear create action.
- [ ] Loading state preserves the page's main geometry.
- [ ] Fetch errors offer a useful retry path without erasing existing context.
- [ ] Delete is clearly destructive, keyboard accessible, and guarded by an appropriate confirmation or recovery pattern.
- [ ] Map attribution remains visible and vendor requirements remain intact.

### Verification

- [ ] Existing spots can be viewed, selected, and deleted successfully.
- [ ] Zero, one, many, and long-content spot states have been reviewed.
- [ ] Map/list behavior is reviewed on touch, mouse, and keyboard input.
- [ ] The tile URL/configuration and visual terrain have not been changed by styling work.

---

## [ ] Ticket 06: Implement the new-spot experience

Make saving a place quick and legible: choose the location first, add the observation second, then save.

### Scope

- Mobile: map first, form second, with the save action easy to reach.
- Desktop: coordinated map/form split layout.
- Support map placement and current-location selection using the existing product behavior.
- Distinguish the unsaved draft marker from saved markers: chanterelle/amber for draft, forest green for saved.
- Keep the current title, coordinates, and observation data model; do not introduce photo upload.

### Acceptance criteria

- [ ] A user can choose a location from the map and see the selected coordinates reflected in the form.
- [ ] Current-location behavior communicates requesting, success, denial, unavailable, and error states.
- [ ] Draft location styling is clearly distinct from saved-spot styling.
- [ ] Validation identifies missing or invalid required data before submission.
- [ ] Save loading prevents duplicate submissions and preserves entered content.
- [ ] Save failure retains the draft and provides a retry path.
- [ ] Save success clearly confirms completion and transitions to the intended saved-spot view.
- [ ] Mobile keyboard behavior keeps the active field and save action usable.
- [ ] Vendor tiles, attribution, and terrain appearance remain unchanged.

### Verification

- [ ] A spot can be created through map selection.
- [ ] A spot can be created using current location where permission is available.
- [ ] Permission denied, location unavailable, validation error, server error, loading, and success states are reviewed.

---

## [ ] Ticket 07: Implement the public home screen

Bring the unauthenticated entry page into the same visual system without turning it into a generic marketing site.

### Scope

- Use the asymmetric two-column composition from `DESIGN.md` on larger screens.
- Use one strong field/nature image, concise product copy, and a short benefits ledger.
- Make the primary action lead to the appropriate registration or save-a-spot journey.
- Stack the content deliberately on mobile with the value proposition visible early.

### Acceptance criteria

- [ ] The page explains that the product saves private field locations and observations.
- [ ] One primary call to action is visually dominant.
- [ ] Supporting actions do not compete with the primary action.
- [ ] Imagery has meaningful alternative text when informative and empty alternative text when decorative.
- [ ] Image loading does not cause significant layout shift.
- [ ] The page uses the shared shell, tokens, primitives, and typography.

### Verification

- [ ] Logged-out and logged-in calls to action lead to valid routes.
- [ ] The page is reviewed at mobile and desktop widths with slow image loading simulated.

---

## [ ] Ticket 08: Add motion and complete interaction states

Apply restrained motion after screen structure and behavior are stable. Motion should explain state changes, not decorate ordinary map activity.

### Scope

- Use the motion tokens from `DESIGN.md`: press `120ms`, feedback up to `150ms`, popover `180ms`, panel `240ms`, and toast `220ms`.
- Add consistent focus, validation, loading, success, disabled, and error feedback across the application.
- Add a reduced-motion mode that removes nonessential movement.

### Acceptance criteria

- [ ] Buttons and tappable controls have immediate pressed feedback.
- [ ] Focus transitions remain visible and do not delay keyboard use.
- [ ] Field errors appear without shifting the page unpredictably.
- [ ] Toasts and status messages are announced appropriately without stealing focus.
- [ ] Panels and overlays preserve focus and reading order during transitions.
- [ ] Ordinary marker updates, panning, and data refreshes are not given decorative animation.
- [ ] `prefers-reduced-motion: reduce` produces a calm, fully usable experience.
- [ ] No essential information is conveyed only through animation.

### Verification

- [ ] All timings match the documented token values.
- [ ] Reduced-motion behavior is tested at the operating-system/browser level.
- [ ] Rapid repeated interaction does not leave controls or panels in an incorrect state.

---

## [ ] Ticket 09: Responsive and accessibility hardening

Review the complete experience as a system, including edge cases that are easy to miss while building individual pages.

### Acceptance criteria

- [ ] Core tasks work at 320px, 390px, 768px, 1024px, and 1440px viewport widths.
- [ ] Pages remain usable at 200% browser zoom without two-dimensional scrolling, except where the map itself requires spatial interaction.
- [ ] Heading hierarchy and landmarks are meaningful on every route.
- [ ] Every interactive control is reachable and operable by keyboard.
- [ ] Focus order follows visual order, and focus is not lost after route changes, deletion, errors, or dialogs.
- [ ] Foreground, text, controls, and focus indicators meet WCAG AA contrast requirements.
- [ ] Status, error, and success messages use suitable live-region behavior.
- [ ] Forms support browser autofill and appropriate input types/autocomplete values.
- [ ] Long titles, long observations, narrow screens, and enlarged text do not overlap or truncate essential actions.
- [ ] Touch interactions do not depend on hover.
- [ ] Map gestures do not prevent users from reaching surrounding page content.

### Verification

- [ ] Keyboard-only review is complete for every production route.
- [ ] Screen-reader smoke testing is complete for authentication, spot creation, spot selection, and deletion.
- [ ] Mobile device or high-fidelity mobile emulation review is complete.

---

## [ ] Ticket 10: Remove legacy styling and perform final system review

Finish the migration, eliminate conflicting styles, and verify that production routes—not only mockups—match the approved direction.

### Scope

- Remove obsolete selectors and design values from the old global stylesheet after their consumers are migrated.
- Replace production inline presentation styles with CSS Modules, except genuinely calculated values or required third-party integration styles; document any exceptions.
- Keep mockup assets isolated from the production bundle unless an asset is deliberately promoted and optimized for production use.
- Review visual consistency across all routes against `DESIGN.md` and the approved Field Sheet mockups.

### Acceptance criteria

- [ ] No obsolete global selectors continue to affect migrated components.
- [ ] No unexplained production `style={{ ... }}` presentation rules remain.
- [ ] No duplicate or contradictory token definitions remain.
- [ ] Production pages do not import the mockup application or mockup-only stylesheet.
- [ ] Routes, authentication behavior, API calls, and spot data behavior remain functionally unchanged.
- [ ] The primary save/view loop is visually clear: save a spot, then find and revisit it.
- [ ] Map tiles and terrain remain vendor-controlled and visually unchanged.
- [ ] All preceding tickets have been reviewed and checked.

### Final verification

- [ ] `npm run lint` passes with no new warnings.
- [ ] `npm run build` passes.
- [ ] Production routes have been manually reviewed at mobile and desktop sizes.
- [ ] Authentication, create spot, view/select spot, and delete spot flows pass end-to-end smoke testing.
- [ ] Error, empty, loading, success, focus, pressed, and disabled states have been reviewed in the running app.
- [ ] Reduced-motion and keyboard-only reviews pass.

## Completion record

Use this section during review rather than checking work based only on implementation notes.

- [ ] Code review completed
- [ ] Automated verification completed
- [ ] Mobile visual review completed
- [ ] Desktop visual review completed
- [ ] Keyboard and accessibility review completed
- [ ] Final design-system implementation accepted
