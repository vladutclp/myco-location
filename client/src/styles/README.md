# Styling ownership

- `tokens.css` defines application-wide design values. Fonts are declared here as
  families with fallbacks; installing font files is a separate task.
- `reset.css` normalizes native elements. `global.css` owns document defaults,
  shared focus behavior, and browser surfaces.
- `vendor/leaflet.css` contains required Leaflet styles and control overrides.
  Terrain tiles are vendor-owned and are not filtered or recolored.
- Each UI component keeps its appearance in a neighboring CSS Module. Components
  merge caller classes with their base class and forward native attributes.
- `PaperPanel` owns the paper surface. `PhotoSheetLayout` and `MapSheetLayout`
  own placement and overlap. `AuthForm.module.css` contains presentation shared
  by login and registration; screen modules own their remaining content layout.
- Layout variables such as overlap depth stay local to the layout that uses
  them. Map screens fill the space below the naturally sized header. Their map
  region stays in place while the paper panel scrolls independently. The shell's
  `data-map-sheet` selector applies that viewport frame only to map routes; their
  named regions allow a later desktop layout without changes to request or map
  behavior.

Buttons retain the native default type. Use `type="button"` for controls inside a
form that should not submit it. Navigation links reuse the button stylesheet and
remain links. Shared fields retain their native label and input associations.
