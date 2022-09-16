## v1.0.5

> `2022-09-16`

### 🎉 Feature
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