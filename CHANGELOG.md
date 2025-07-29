[//]: # (Don't use <tags>)

## v1.11.4

> `2025-07-29`

### 🎉 Feature
- Added `hideDefaultColumnType` option

## v1.11.3

> `2025-07-28`

### 🎉 Feature
- Export `BasePageField`

## v1.11.2

> `2025-07-28`

### 🎉 Feature
- Be able to add custom tab/step props

### 🐞 Bug Fixes
- Unwatch type watcher on config panel open

## v1.11.1

> `2025-07-28`

### 🎉 Feature
- Added `builder$` to BaseField props

## v1.11.0

> `2025-07-23`

### 🎉 Feature
- Added opt-in expression support for `text`, `hidden` values, `static` content and conditions. It can be enabled by `expressions.enabled` in `builder.config.js`.
- Added `forceNumbers` toggle to `text` and `hidden` types.
- Hided attach tool for editor default.

### 🐞 Bug Fixes
- Added missing `columnTypes`, `allowCustomColumnTypes`, `excludeTypesFromColumns` , `columnTypesWithItems` config options #138.
- Removed console.log from AI Assistant modal.
- Added translation for hidden element's edit preview placeholder.
- Element search should search in translated value.
- Toggles & lists in object fields needed a CSS fix.

## v1.10.4

> `2025-07-15`

### 🐞 Bug Fixes
- Default prop merge override fix

## v1.10.3

> `2025-07-14`

### 🎉 Feature
- Change branding color via CSS var in `vueform` theme

### 🐞 Bug Fixes
- Don't reset static childs when added to list
- Merge default prop features with element level definitions #136

## v1.10.2

> `2025-06-04`

### 🐞 Bug Fixes
- CSS fixes

## v1.10.1

> `2025-06-03`

### 🐞 Bug Fixes
- CSS fixes

## v1.10.0

> `2025-06-03`

### 🎉 Feature
- Removed Tailwind CSS as a dependency. Now the builder can be used with `vueform` theme.
- Added provide `builder$` so that the builder instance is available in every child
- Made button label property translatable

### 🐞 Bug Fixes
- Moving elements in tree fix #126
- Remove unstyled color picker #108
- Load builder only on mounted to avoid FOUC in Firefox

## v1.9.5

> `2025-05-20`

### 🐞 Bug Fixes
- Prevented IME composition from adding new items (e.g., radio options when typing in Japanese)

## v1.9.4

> `2025-03-04`

### 🎉 Feature
- Sanitize props that end up in `v-html`
- Config option for custom AI endpoint
- New element char limit from config #118

### 🐞 Bug Fixes
- Respect col widths when adding/removing specific cols
- Grid border fix when cells are <100% #116 (fix released in vueform/vueform)

## v1.9.3

> `2025-03-01`

### 🐞 Bug Fixes
- Localize page label in tree.
- Reinit validation rules in preview mode too when they change.

## v1.9.2

> `2025-01-21`

### 🎉 Feature
- Now only `p` and `blockquote` tag static fields has rich text editor.

### 🐞 Bug Fixes
- Disable scrolling up to top on next steps.
- Infinite step label watcher loop fix, that likely caused #99.
- Step previous label placeholder fix.
- Items editing without view field fix #102.
- Page label label fix #100.

## v1.9.1

> `2025-01-03`

### 🎉 Feature
- Translatable static content & label.
- Changed import tool & lang selector display order.

### 🐞 Bug Fixes
- Selected element deps deconstruct fix.

## v1.9.0

> `2024-12-12`

### 🎉 Feature
- New Grid element.
- No more min width for elements (11 * gutter) because of grid gap.

## v1.8.2

> `2024-11-28`

### 🎉 Feature
- Added option to disable incrementing child names. Use `builder.incrementChildName = false` in the element's schema.

## v1.8.1

> `2024-11-16`

### 🐞 Bug Fixes
- Adding empty nested list fix #88

## v1.8.0

> `2024-10-29`

### 🎉 Feature
- New Matrix element.
- Allow users to save custom elements.

### 🐞 Bug Fixes
- Don't show resizer between elements in preview mode #85.

## v1.7.4

> `2024-09-17`

### 🎉 Feature
- Subscribe to custom modal `close` event.
- Added `web.app` to trial domains.

## v1.7.3

> `2024-09-17`

### 🎉 Feature
- Registering custom operators.

## v1.7.2

> `2024-09-11`

### 🐞 Bug Fixes
- Form and Export settings merge error fix.

## v1.7.1

> `2024-09-10`

### 🎉 Feature
- Added `@reset` event that receives the builder instance as first param.
- Allow extending `form` and `export` config fields.

### 🐞 Bug Fixes
- Removed backtick from code tags.
- Export `en_US` builder locale.

## v1.7.0

> `2024-08-24`

### 🎉 Feature
- Conditional readonly / disabled props.

## v1.6.6

> `2024-08-22`

### 🐞 Bug Fixes
- Condition modal i18n tag fixes.

## v1.6.5

> `2024-08-22`

### 🐞 Bug Fixes
- Fixes for `themes` config option.

## v1.6.4

> `2024-08-21`

### 🎉 Feature
- Added `openOnAdd` config option to automatically open config panel for added elements.

## v1.6.3

> `2024-08-17`

### 🎉 Feature
- Ability to replace theme sections.

## v1.6.2

> `2024-08-15`

### 🎉 Feature
- Optional Import / Export button that can be enabled in `builder.config.js` with `import: true`.

## v1.6.1

> `2024-08-07`

### 🐞 Bug Fixes
- Include `@vueform/country-phones` in Vite plugin
- Import locale modules in index.

## v1.6.0

> `2024-08-05`

### 🎉 Feature
- Builder localization.
- Hungarian, Japan, Dutch and Japanese locales.

### 🐞 Bug Fixes
- Trigger `@save` event on AI generate.
- Don't close the element panel on Escape when conditions modal is open.
- Select endpoint fix.

## v1.5.0

> `2024-07-24`

### 🎉 Feature
- The drag and drop feature got a major improvement!
- Drag elements next to other elements.
- When elements are dropped above or below an element it will dropped into the previous / next row, instead of next to the target element.
- A new handle appears between elements in the same row that can resize two adjacent elements simultaneously.
- Added `autoflow` config option, which is when disabled all elements take up a full row while the inputs can still be resized.
- Made Tab and Step labels localizable.

## v1.4.6

> `2024-07-18`

### 🎉 Feature
- Send element list with AI assistant call #70.

## v1.4.5

> `2024-07-05`

### 🎉 Feature
- New Signature element.

## v1.4.4

> `2024-05-13`

### 🎉 Feature
- Allow `.ddev.site`

## v1.4.3

> `2024-05-10`

### 🎉 Feature
- New Phone element.
- Show warning at the element when data paths are duplicated #54.

### 🐞 Bug Fixes
- Increment child names when cloning containers #54.

## v1.4.2

> `2024-04-29`

### 🎉 Feature
- New Captcha element.

## v1.4.1

> `2024-04-15`

### 🐞 Bug Fixes
- Escape HTML content in code export view.

## v1.4.0

> `2024-04-12`

### 🎉 Feature
- Added AI Assistant.

### 🐞 Bug Fixes
- Escape double quote in inline export attributes #55

## v1.3.2

> `2024-04-09`

### 🎉 Feature
- Allow `.webcontainer.io`

## v1.3.1

> `2024-03-20`

### 🐞 Bug Fixes
- `vite.mjs` typo fix

## v1.3.0

> `2024-03-19`

### 🎉 Feature
- [Simple preset](https://builder.vueform.com/docs/presets#available-presets) added.
- Allow `formatLoad` on config elements' schema.
- Added `formDefaults`, `transformElement` and `names` options to config.
- Element name increments now respect container element names.
- Added placeholder for list/container elements.
- All imports should now be proper modules.

## v1.2.0

> `2024-02-19`

### 🎉 Feature
- Dark mode 🌙
- Define list of condition operators for custom elements.

### 🐞 Bug Fixes
- No padding on right panel fix #34
- Condition selector for custom elements #38 #39

## v1.1.10

> `2024-02-09`

### 🐞 Bug Fixes
- Radio/checkboxgroup loading issue fix #40

## v1.1.9

> `2024-01-07`

### 🎉 Feature
- Localizable form fields.

## v1.1.8

> `2023-12-06`

### 🎉 Feature
- Added `*.azurewebsites.net` and `*.azurestaticapps.net` to allowed dev domains

## v1.1.7

> `2023-11-17`

### 🐞 Bug Fixes
- Don't rehighlight code on export view
- Missing return from FileElement in plugin

## v1.1.6

> `2023-11-06`

### 🎉 Feature
- Add types for `vite`, main exports and config

### 🐞 Bug Fixes
- Columns fields collision (no more browser warn)
- Disabled rules (eg. nullable) #1
- Autosize textareas on reopen panel
- Save on disabling `updateOnSearch`
- Divider single size theme setting

## v1.1.5

> `2023-11-02`

### 🐞 Bug Fixes
- Load missing theme vars.

## v1.1.4

> `2023-10-31`

### 🎉 Feature
- Added align left/right to button, toggle, checkbox & radio.
- Added full width to button.
- Static elements now use semantic HTML tags instead of having to type HTML code for eg. H1, Paragraph, Img, etc.

## v1.1.3

> `2023-10-25`

### 🎉 Feature
- Added `*.netlify.app` to free cloud hosting providers.

## v1.1.2

> `2023-10-02`

### 🎉 Feature
- Added `clearOnRefetch` option to elements with options.

## v1.1.1

> `2023-09-28`

### 🎉 Feature
- Added variable usage to elements with `items`.

### 🐞 Bug Fixes
- Fix error when clicking on element with `items` without having any specified in a multilingual setup.

## v1.1.0

> `2023-09-17`

### 🎉 Feature
- Remote API key validation as primary domain validation method.
- Removed `node-sass` dependency.

## v1.0.17

> `2023-04-07`

### 🎉 Feature
- Validation / Field name can also be localized.
- Added placeholder for non-primary localizable config options.

### 🐞 Bug Fixes
- Drag element from container to tree empty tab/step fix.
- Is empty condition fix.
- Tags element search toggle fix.
- Left panel CSS color fix when using dark mode and config panel is on the right.

## v1.0.16

> `2023-03-14`

### 🎉 Feature
- Localization feature added. Certain form properties now can be provided in multiple locales.
- Added `locales`, `defaultLocale`, `fallbackLocale` and `emojiFlags` options to config.

### 🐞 Bug Fixes
- Don't submit page on Search elements enter.
- Custom attributes frozen when single space was entered as key or value.

## v1.0.15

> `2023-03-02`

### 🎉 Feature
- Added responsive columns resizing and working device selector.
- New config options: `breakpoints`.
- Disabling `remove`, `clone`, `move` or `resize` for certain elements will disable it for their parent containers and lists.
- Added `HEIC/HEIF` extensions and mime types.
- `Clear form` now resets the whole form to default state instead of just clearing elements.

### 🐞 Bug Fixes
- Load back non-numeric list keys to checkbox group's and radio group's items.
- Refresh conditions for nested elements as well when switching to preview.
- App froze when selecting `equal to` condition for an element which was refering an element in a nested list.
- Tags options were not shown if tags was first clicked after a multiselect.
- If a tab or step was selected when loading a form the config panel became unclickable.

## v1.0.14

> `2023-02-17`

### 🎉 Feature
- Added `longFieldNames` config option.

## v1.0.13

> `2023-02-08`

### 🎉 Feature
- Advanced conditions editor & field selector.
- Condition editing for required rule.

### 🐞 Bug Fixes
- Minor bug fixes.

## v1.0.12

> `2022-12-23`

### 🐞 Bug Fixes
- A11y fixes related to JAWS.
- Adding element after resorting a list / multifile should add as last.

## v1.0.11

> `2022-12-14`

### 🎉 Feature
- Tree view is here 🎉🎉🎉 
- Move elements between tabs / steps.

### 🐞 Bug Fixes
- Checkbox / Toggle True value didn't got saved if False value was updated immediately after.
- Select elements in correct order with keyboard when has tabs / steps.
- If form level sizes are disabled theme sizes will be hidden as well.
- Load saved theme fix.
- Export Download threw error.
- Condition list failed to load if the form had a list without prototype.
- Item source JSON got replaced with list when switched to list and switched back to JSON.
- DataKey & queryParam options were not respected in endpoint items.
- Date restrictions dates were not readable in dark theme.
- Date config calendars were out of bounds.
- Textaera's autogrow got saved as `true` when changing Rows.

## v1.0.10

> `2022-11-24`

### 🐞 Bug Fixes
- Adding tabs & steps only worked with double click.
- Select page config on switching tab when hovering mouse.

## v1.0.9

> `2022-11-21`

### 🎉 Feature
- **BREAKING**: if `rightPanel` and `leftPanel` are defined they must also contain `settings` and `model`, which are the settings panel for elements & tabs/steps the model preview.
- Form steps & tabs have arrived. 🎉🎉🎉
- New `tab` & `step` configuration similarly to `form`, `theme` or `export`.
- Added columns counter to resizer.
- Added toaster.
- Notify user about adding element when the element is out of window.
- A11y improvements.

### 🐞 Bug Fixes
- **BREAKING**: CSS class names are refactored - if you have overrides please check.
- Don't display element border on hover when moving another element.
- Optimized z-indexes for better performance.
- Don't warn in model preview about static elements.
- Save size when element is selected and using default columns.
- Custom mimes & extensions could've been saved but were not loaded.
- Pressing enter in certain elements caused removing or adding list elements.
- Date range element was not configured for range.
- In_array rule can only choose from lists.
- Thrown error when clicking from select to slider.
- Slider format decimals could be higher than 7 which thrown error.
- Load the default Vueform theme if theme tab is disabled.
- Do not remove other CSS vars when loading a single theme variable.
- If renaming thrown error did not disappear when directly clicking to a new element.
- Renaming an element with integer/numeric validators thrown error.
- Removed expand / collapse all option from themes because opening all options at once is a too heavy load for a single click.

## v1.0.8

> `2022-10-28`

### 🎉 Feature
- Added list & nested list elements.
- Optimized adding & resorting performance.
- Added version to `$builder` prop.
- Replace paths in relative validation rules (eg. same as, different) when the target path changes.
- Added `autosave`, `history` and `maxHistory` config options.

### 🐞 Bug Fixes
- Hidden element is no longer resizable (as it doesn't have columns).
- Remove `floating` option when switching back to `Default` auto-float.
- Refocus element when moving with keyboard and its name changes.

## v1.0.7

> `2022-10-07`

### 🎉 Feature
- A11y improvements.
- Element features can be disabled.

## v1.0.6

> `2022-09-28`

### 🎉 Feature
- Loading performance improvement.

## v1.0.5

> `2022-09-16`

### 🎉 Feature
- **BREAKING:** Element names starting with `columns` got renamed to `containers`. Existing forms containing `group` or `object` elements should rename `builder.type` prop from `'columns*'` to `'container*'`.
- Update conditions when the target element's path/name changes or removed.
- Added `delay` option that delays form re-rendering during text config changes.
- Added feature level configuration for configuration groups (eg. `validation`).
- Elements in containers now can be referenced for conditions.
- Local storage self-cleanup when gets full (remove earliest histories).
- Export existing field types.
- Columns resizing performance optimizations.
- Text type config udpate performance improvements.

### 🐞 Bug Fixes
- Fixed empty config panel appearing when selecting new element right after deselect.
- Horiozontal presets are being removed when the element's column overrides form columns.
- Multifile filesize min/max fields are lengthened for more convenient input.
- Don't allow container dropping into itself.
- Elements became unselectable if in a conditional container.
- Container vertical align set to top.
- File names can't start with integer and can't contain dot.
- Unfocus selected element when loading a form.
- Filter internally config option loads back state.
- Config panel's datepicker text color in dark mode fix.

## v1.0.4

> `2022-08-19`

### 🎉 Feature
- Added Container element & nesting option to form settings.
- Moved Description & Tooltip config fields to top.
- Added resizing icon to element containers.
- Certain props (like label, info, text) are now textareas instead of text.
- Added `storagePrefix` config option.
- Select/multiselect/tags input type is now `search` by default and `autocomplete` is `off` to prevent browser autocompletes.
- Added `Data key` and `Search param` options to endpoint based data config.

### 🐞 Bug Fixes
- Fix for loading form without form/theme panels.
- Fixed `p` element closing tag.
- Last radiogroup/select/etc options can now be removed.
- Datetime & time elements default schema fix.
- Element name can no longer be emptied.
- Collapse / open all fix.
- Radio/select/etc option can be selected as default if value is 0.
- Fixed being able to drag element size in preview mode.
- Fixed default button border width in Vueform theme.
- Multiselect/select does not switch back to native if search is turned off.
- Added missing validation panel to various elements.
- Fixed width calculation on resizing when element width is <12.
- Resizing elements by dragging is now reflected in the config panel.
- Panel closed sections states are now being loaded on page refresh.
- Config textareas are now expanded when loaded.

## v1.0.3

> `2022-08-05`

### 🎉 Feature
- Element config options can be disabled.

### ⚠️ Breaking changes 
- Custom config is not merged with base `builder.config.js` anymore.
- The following config options are removed: `formProps`, `themeProps`, `exportProps`
- The usage of the following config options have changed: `elements`
- Please see `README.md` for updates on config options

## v1.0.2

> `2022-07-29`

### 🎉 Feature
- Added config options: `search`, `views`, `devices`, `darkMode`, `toggleLeft`, `toggleRight`, `clear`, `save`, `undo`, `modelPreview`, `leftPanel`, `rightPanel`, `themes`, `formProps`, `themeProps`, `exportProps`, `categories`, `elements`

### ⚠️ Breaking changes
- Classes renamed:
- `vfb-elements-search-container` > `vfb-elements-top-container`
- `vfb-elements-search-wrapper` > `vfb-elements-search-container`
- `vfb-elements-wrapper-with-search` > `vfb-elements-wrapper-with-keyword`
- `vfb-elements-wrapper-without-search` > `vfb-elements-wrapper-without-keyword`
- `vfb-form-settings-*` > `vfb-form-panel-*`

## v1.0.1

> `2022-07-25`

### 🎉 Feature
- Class name based styles.