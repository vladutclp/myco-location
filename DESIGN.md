---
name: Myco Location
description: A private field notebook for remembering mushroom spots and returning in season.
colors:
  pine-ink: "#1D271F"
  muted-ink: "#556258"
  parchment: "#F7F4EA"
  spore-white: "#FFFDF7"
  forest: "#1B6E4B"
  forest-deep: "#14563A"
  moss-wash: "#E3E8D8"
  chanterelle: "#A94E0D"
  bark-border: "#AEBBA6"
  danger: "#9A3412"
  danger-wash: "#FFF0E9"
typography:
  display:
    fontFamily: "Epilogue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Epilogue, Arial, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Epilogue, Arial, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Nunito Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Nunito Sans, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.01em"
  caption:
    fontFamily: "Nunito Sans, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 550
    lineHeight: 1.45
    letterSpacing: "0.01em"
rounded:
  detail: "4px"
  compact: "8px"
  control: "12px"
  surface: "16px"
  pill: "999px"
spacing:
  hairline: "4px"
  tight: "8px"
  compact: "12px"
  control: "16px"
  group: "24px"
  spacious: "32px"
  section-sm: "48px"
  section-md: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.spore-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.spore-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.spore-white}"
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
    height: "48px"
  input-default:
    backgroundColor: "{colors.spore-white}"
    textColor: "{colors.pine-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "48px"
  card-content:
    backgroundColor: "{colors.spore-white}"
    textColor: "{colors.pine-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.surface}"
    padding: "24px"
  chip-selected:
    backgroundColor: "{colors.moss-wash}"
    textColor: "{colors.pine-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 12px"
---

# Design System: Myco Location

## Overview

**Creative North Star: “The Forager’s Field Notebook”**

Myco Location should feel like a practical notebook carried into the woods: calm, observant, personal, and dependable. It combines the tactile warmth of paper field notes with the precision of a modern map tool. The product is not an identification authority or a game. It helps people remember where they found mushrooms, record useful context, and return when the season is right.

The visual system is operate-led. Map clarity, readable forms, and quick scanning come before decoration. The public home page may be more atmospheric, but authenticated surfaces remain quiet and task-focused. Photography provides the organic richness; interface surfaces stay disciplined enough to keep the map and the user’s records legible.

**Key Characteristics:**

- Warm parchment canvas with pale, paper-like surfaces.
- Forest green reserved for actions, navigation, and saved locations.
- Chanterelle amber reserved for discovery, focus, and a new unsaved pin.
- Editorial display type paired with highly readable interface text.
- Flat, tonal layers at rest; shadows only for genuinely floating elements.
- Responsive map-first compositions with complete empty, loading, error, and success states.

**The Field Evidence Rule.** Product imagery must show a real mushroom, a real map state, or a real user record. Decorative nature imagery never replaces task-relevant evidence.

**The Outdoor Light Rule.** This version is light-mode only because the primary use scene is daylight and outdoor planning. A future dark mode must be derived and contrast-tested as its own companion palette.

### Motion grammar

Motion should feel quick, grounded, and spatial, like opening a notebook or placing a marker. Use it to show where an item came from, what changed, or whether an action succeeded.

- Press: 120ms with `cubic-bezier(0.23, 1, 0.32, 1)`.
- Hover and focus feedback: 150ms maximum; focus rings appear immediately.
- Popover or map detail: 180ms.
- Panel, route, or list-state transition: 240ms with 8 to 12px of travel.
- Toast: 220ms, entering and leaving along the same path.
- Public hero: one restrained sequence with at most three beats: message, actions, anchor photograph.
- Reduced motion: remove spatial movement and use an opacity change of 150ms or less.
- Never animate map data during ordinary scanning. Animate only insertion, removal, selection, and navigation feedback.

## Colors

The palette is taken from the existing forest-green direction and a visual reading of the moss-and-chanterelle hero photograph. The photo extraction script could not run because Pillow is unavailable, so the image-derived choices are explicitly qualitative rather than sampled.

### Primary

- **Trail Forest:** the product’s main action and saved-location color. Use it for primary buttons, links, active navigation, and confirmed map markers.
- **Deep Forest:** the pressed and hover step for Trail Forest. It should never become a second competing brand color.

### Secondary

- **Moss Wash:** a quiet selection surface for active filters, lightweight panels, and empty-state backdrops.

### Tertiary

- **Chanterelle Amber:** a scarce discovery color for focus rings, a draft marker, season cues, and one high-value emphasis. Keep it below roughly 5% of a viewport.

### Neutral

- **Pine Ink:** primary text and high-emphasis icons.
- **Lichen Ink:** secondary text, metadata, and placeholder copy.
- **Parchment:** application background and the quietest canvas.
- **Spore White:** forms, popovers, cards, and map detail panels.
- **Bark Border:** decorative separation only. Use Trail Forest or Chanterelle Amber when a border is the sole carrier of state.
- **Danger / Danger Wash:** deletion, destructive confirmation, and recoverable error messaging.

### Contrast contract

- Pine Ink on Parchment, Spore White, Moss Wash, and Bark Border is text-safe.
- Lichen Ink on Parchment, Spore White, and Moss Wash is text-safe.
- Spore White on Trail Forest, Deep Forest, and Chanterelle Amber is text-safe.
- Trail Forest and Chanterelle Amber on Parchment or Spore White are text-safe.
- Bark Border against Parchment or Spore White is decorative only and cannot communicate state by itself.

**The Chanterelle Rule.** Amber identifies discovery, focus, or a pending location. It does not fill large sections, replace the primary action color, or decorate unrelated controls.

**The No Flat Gray Rule.** Neutrals lean toward moss and bark. Avoid generic cool gray palettes that disconnect the interface from the anchor photograph.

## Typography

**Display Font:** Epilogue with Arial and sans-serif fallbacks

**Body Font:** Nunito Sans with Arial and sans-serif fallbacks

**Character:** Epilogue gives titles a compact editorial confidence without pretending to be a vintage field guide. Nunito Sans keeps forms, map labels, and observations friendly and highly readable. Use only these two families.

### Hierarchy

- **Display:** public home headline and rare empty-state statement only. Keep it to one or two balanced lines.
- **Headline:** page titles and major authenticated-screen headings.
- **Title:** spot names, form sections, map-detail headers, and card titles.
- **Body:** interface copy and observations, with a maximum measure of 70 characters for prose.
- **Label:** controls, field labels, navigation, and compact metadata. Use sentence case.
- **Caption:** map metadata, coordinates, timestamps, and supporting details. Use tabular numerals for coordinates and comparable values.

**The One Editorial Voice Rule.** Epilogue establishes hierarchy; it is not used for long observations, labels, or dense lists.

**The Roman Heading Rule.** Headings remain upright. Use scale, weight, or color for emphasis, never italics or gradient text.

## Layout

Use a 4px foundation with deliberate steps at 8, 12, 16, 24, 32, 48, 64, and 96px. Tight space groups related labels and values. Larger space separates tasks and screen regions. Internal component padding must not exceed the gap to neighboring components.

### Responsive frame

- **Small:** below 640px. Single column, 16px page gutters, 44px minimum hit targets, and map panels sized to the viewport width.
- **Medium:** 640 to 959px. 24px gutters and stacked map/detail sections unless the available width safely supports a split.
- **Large:** 960px and above. 32px gutters, public content capped near 1180px, and task screens allowed to use the full working canvas.
- **Wide:** 1280px and above. Increase outer whitespace, not component density or text measure.

### Screen blueprints

- **Public home, Persuade:** asymmetric two-column composition. The promise and actions sit in one column; the existing mushroom photograph is the single visual focus. Benefits become a short visual ledger below the main pitch, not three equal cards.
- **Authentication, transactional form:** one focused form column with a nearby product cue or cropped anchor photograph. Do not place a card inside another card. Login and registration share the same geometry and state system.
- **Saved spots, data view:** map/list split view on large screens. The list becomes a bottom sheet or stacked section on small screens. Selection is synchronized between marker and row. Keep “Add spot” as the one dominant action.
- **New spot, transactional map form:** map first, details second. On large screens the form sits beside the map; on small screens it follows the map. A draft marker uses Chanterelle Amber until the save succeeds, then becomes Trail Forest.
- **Empty spots:** explain what will appear, show how to create it, and provide one “Add your first spot” action. Use one simple field-note visual or a quiet map cue, not a generic illustration card.

### Navigation

The product currently has only a few destinations, so a 64px top bar is more appropriate than a permanent sidebar. Keep primary destinations visible on large screens. Collapse them into a single accessible menu when labels no longer fit on one line. The top bar uses the Parchment canvas with a subtle Bark Border divider; active navigation uses Trail Forest text plus a quiet Moss Wash state.

**The Map Owns the Canvas Rule.** On map tasks, chrome and forms frame the map instead of shrinking it into a decorative card.

## Elevation & Depth

The system is flat by default. Depth comes from Parchment, Spore White, Moss Wash, and map imagery occupying distinct planes. Do not combine a visible border and a broad shadow on the same surface.

### Shadow vocabulary

- **Resting surfaces:** no shadow. Use tonal separation or the decorative Bark Border.
- **Floating detail:** `0 12px 32px rgba(29, 39, 31, 0.14)` for map popovers, menus, and temporary floating panels only.
- **Toast:** `0 10px 28px rgba(29, 39, 31, 0.18)` because it must remain legible above map imagery.

**The Earned Elevation Rule.** An element receives a shadow only when it actually floats above or overlaps another plane.

## Shapes

The shape language is gently organic without becoming bubbly. Controls use 12px corners, primary content surfaces use 16px corners, compact details use 8px corners, and tiny internal details may use 4px. Full pills are reserved for filters, statuses, and small metadata chips.

Map markers are the signature silhouette. Saved markers use Trail Forest; the current draft marker uses Chanterelle Amber; selected markers gain a high-contrast inner point or ring rather than changing to a third color.

**The No Bubble UI Rule.** Cards and primary buttons are not pills. Organic character comes from photography, palette, and marker shapes rather than inflated rounded rectangles.

## Components

### Buttons

- **Primary:** Trail Forest fill, Spore White label, 48px height, 12px corners. Use once per task region.
- **Secondary:** Spore White surface, Trail Forest label, and a one-pixel Trail Forest border. It has equal height to the primary button.
- **Tertiary:** text-only action in Trail Forest with a visible underline on hover and focus.
- **Destructive:** neutral by default when low priority; Danger becomes explicit in the confirmation or undo state.
- **States:** hover darkens; press scales to 0.97; focus uses an immediate Chanterelle Amber ring; loading keeps the label width stable; disabled uses opacity, cursor, and the native disabled attribute.

### Inputs / Fields

- **Style:** Spore White surface, Pine Ink text, 48px minimum height, 12px corners, constant one-pixel border width.
- **Focus:** Trail Forest border plus an immediate Chanterelle Amber outer ring. Never animate the focus ring into view.
- **Error:** Danger text on Danger Wash, placed next to the field with a recovery instruction.
- **Disabled:** visible text remains readable, the surface shifts toward Moss Wash, and interaction is unavailable through both semantics and appearance.
- **Textarea:** minimum 120px height with a visible resize affordance where supported.

### Cards / Containers

- **Content card:** Spore White, 16px corners, 24px internal padding, and no shadow at rest.
- **Compact spot row:** 12 to 16px internal padding, 8px corners, strong title, quiet metadata, and a clear selected state.
- **Map detail panel:** may use floating elevation because it overlaps the map. It includes the spot title, observation, and actions without repeating labels already visible in the marker.

### Chips

- Use pills only for species, season, filters, or state.
- Unselected chips use Spore White with a Bark Border.
- Selected chips use Moss Wash and Pine Ink.
- A removable chip exposes a real icon button with an accessible label, never a Unicode symbol.

### Navigation

- Use Label typography, sentence case, and one-line labels.
- Hover uses Moss Wash; active uses Trail Forest and a persistent selected treatment.
- Account and logout actions remain visually secondary to navigation and the current task.

### Toasts

- Success uses Trail Forest with Spore White text.
- Error uses Danger with Spore White text.
- Toasts announce politely, do not cover the primary action, and enter and exit along the same path.
- If the result is already obvious in the interface, prefer an inline confirmation or an undo action over an extra toast.

### Map

- Saved marker: Trail Forest.
- Draft marker: Chanterelle Amber.
- Selected marker: retain its semantic color and add a ring or center point.
- Map controls use the same 44px minimum hit target and focus treatment as every other icon button.
- Marker popovers and list rows represent the same selection state.
- Destructive spot deletion offers undo or confirmation; it never happens immediately.

## Do's and Don'ts

### Do:

- **Do** let the map or field photograph carry the visual weight of a screen.
- **Do** preserve a clear one-action hierarchy in forms and empty states.
- **Do** design populated, loading, empty, error, disabled, hover, focus, pressed, and success states.
- **Do** keep map and list selection synchronized in every mockup.
- **Do** use real product copy and realistic spot names without inventing public proof or metrics.
- **Do** keep destructive actions separate from safe actions and provide recovery.
- **Do** test mockups from 320px through 1920px with no wrapped control labels or horizontal overflow.

### Don't:

- **Don't** use corporate blue, purple gradients, gradient text, or flat gray neutral scales.
- **Don't** build screens from repeated icon-heading-paragraph cards.
- **Don't** use emoji or Unicode glyphs as interface icons.
- **Don't** treat the current purple Vite favicon as product identity; it is scaffold artwork, not an established Myco Location mark.
- **Don't** imply that the app identifies mushrooms or guarantees that a mushroom is safe to eat.
- **Don't** expose private spot precision as social proof or decorative map data.
- **Don't** add decorative motion to frequent navigation, form entry, list scanning, or map panning.
- **Don't** introduce a sidebar until the number of primary destinations or workflows genuinely outgrows the top bar.
