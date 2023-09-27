[//]: # (Don't use <tags>)

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