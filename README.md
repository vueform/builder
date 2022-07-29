# Vueform Builder Docs

Documentation for Vueform Builder.

## Requirements

- Vue.js 3.0.0+
- Tailwind CSS 3.0.0+ 

## Manual Installation

#### 1. Install Vueform in your project

Head to our [Installation guide](https://vueform.com/docs/1.x/installation#installation) and install Vueform in your project.

#### 2. Add Vueform Builder

```bash
npm i git+https://github.com/vueform/vueform-builder-{YOUR_ID}.git
```

Vueform Builder will be provided to you via a private GitHub repo.

#### 3. Create `builder.config.js`

Create `builder.config.js` in your project root:

```js
// builder.config.js

export default {
  // config here
}
```

#### 4. Import `@vueform/builder`

Import `@vueform/builder` and apply it as a Vue plugin after Vueform:

```js
import Vueform from '@vueform/vueform/plugin'
import vueformConfig from './path/to/vueform.config.js'
// ...
import VueformBuilder from '@vueform/builder'
import builderConfig from './path/to/builder.config.js'
// ...

app.use(Vueform, vueformConfig)
app.use(VueformBuilder, builderConfig)
```

#### 5. Add styles

Add Vueform Builder styles to your main stylesheet:

```css
@import "./path/to/node_modules/@vueform/builder/index.css";
```

#### 6. Update `tailwind.config.js`

Add the builder files to `content` and apply the builder's plugin:

```js
// tailwind.config.js

module.exports = {
  content: [
    // ...
    './node_modules/@vueform/builder/**/*.js',
    './node_modules/@vueform/builder/**/*.css',
  ],
  // ...
  plugins: [
    // ...
    require('@vueform/builder/tailwind'),
  ]
}

```

#### 7. Update `vueform.config.js`

Apply the builder's plugin to Vueform config:

```js
// vueform.config.js

// ...
import builder from '@vueform/builder/plugin'

export default {
  // ...
  plugins: [
    // ...
    builder,
  ]
}

```

#### 8. Add `<VueformBuilder>` to your app

```vue
<template>
  <div id="app" class="h-screen">
    <VueformBuilder />
  </div>
</template>
```

## Saving

To save the output of the form you can subscribe to `@save` event, which is triggered anytime the form settings are changed:

```vue
<template>
  <div id="app" class="h-screen">
    <VueformBuilder
      @save="handleSave"
    />
  </div>
</template>

<script>
  export default {
    methods: {
      handleSave(builderObject, history) {
        // builderObject - the object that should be saved to db (and loaded)
        // history - the array of previous builderObjects
      },
    }
  }
</script>
```

The `@save` event has two params:
- **builderObject** `{object}` <br> the object that should be saved to db (and can be loaded)
- **history** `{array}` <br> he array of previous builderObjects

### Manual Saving

The current state of the form is always available in local storage as `vueform-builder` and `vueform-history`.

To save the form anytime just reach for these values:

```js
const builderObject = localStorage.getItem('vueform-builder')
const history = localStorage.getItem('vueform-history')
```

## Loading

Once a form's JSON (& history) are saved into the database they can be loaded back using Vueform Builder's `.load()` method:

```vue
<template>
  <div id="app" class="h-screen">
    <VueformBuilder
      ref="builder$"
    />
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    async onMounted() {
      const form = (await axios.get('/url')).data

      let builderObject = form.builder // object
      let history = form.history // array

      this.$refs.builder$.load(builderObject, history)
    }
  }
</script>
```

## Configuration

Here's the default configuration, which can be overwritten in `builder.config.js`:

```js
// builder.config.js

export default {
  // Main features
  search: true,
  views: ['editor', 'preview', 'code'],
  devices: ['desktop', 'tablet', 'mobile'],
  darkMode: ['light', 'dark'],
  toggleLeft: true,
  toggleRight: true,
  clear: true,
  save: true,
  undo: true,
  modelPreview: true,
  infos: true, // whether to display helper texts in form props
  defaultName: 'MyForm',
  defaultWidth: 432,
  validators: [ // validators that are available in the 'Additional rules' (where applicable)
    'after', 'after_or_equal', // ...
  ],
  sizes: ['sm', 'md', 'lg'], // the sizes to allow globally, false to allow only 'md'
  autosave: 1000, // ms after last action, false to turn off

  // Panel organization (can be groupped to a single panel)
  leftPanel: ['elements'],
  rightPanel: ['form', 'theme', 'export'],

  // Themes available for loading
  themes: [
    {
      label: 'Official themes',
      themes: [
        {
          label: 'Vueform',
          default: true,
          vars: {
            'primary': '#07bf9b',
            'primary-darker': '#06ac8b',
            'color-on-primary': '#ffffff',
            'danger': '#ef4444',
            'danger-lighter': '#fee2e2',
            'success': '#10b981',
            'success-lighter': '#d1fae5',
            'ring-width': '2px',
            'ring-color': '#07bf9b66',
            'gray-50': '#f9fafb',
            'gray-100': '#f3f4f6',
            'gray-200': '#e5e7eb',
            'gray-300': '#d1d5db',
            'gray-400': '#9ca3af',
            'gray-500': '#6b7280',
            'gray-600': '#4b5563',
            'gray-700': '#374151',
            'gray-800': '#1f2937',
            'gray-900': '#111827',
            'font-size': '1rem',
            'font-size-sm': '0.875rem',
            'font-size-lg': '1rem',
            'font-size-small': '0.875rem',
            'font-size-small-sm': '0.8125rem',
            'font-size-small-lg': '0.875rem',
            'line-height': '1.5rem',
            'line-height-sm': '1.25rem',
            'line-height-lg': '1.5rem',
            'line-height-small': '1.25rem',
            'line-height-small-sm': '1.125rem',
            'line-height-small-lg': '1.25rem',
            'letter-spacing': '0px',
            'letter-spacing-sm': '0px',
            'letter-spacing-lg': '0px',
            'letter-spacing-small': '0px',
            'letter-spacing-small-sm': '0px',
            'letter-spacing-small-lg': '0px',
            'gutter': '1rem',
            'gutter-sm': '0.5rem',
            'gutter-lg': '1rem',
            'min-height-input': '2.375rem',
            'min-height-input-sm': '2.125rem',
            'min-height-input-lg': '2.875rem',
            'py-input': '0.375rem',
            'py-input-sm': '0.375rem',
            'py-input-lg': '0.625rem',
            'px-input': '0.75rem',
            'px-input-sm': '0.5rem',
            'px-input-lg': '0.875rem',
            'py-btn': '0.375rem',
            'py-btn-sm': '0.375rem',
            'py-btn-lg': '0.625rem',
            'px-btn': '0.875rem',
            'px-btn-sm': '0.75rem',
            'px-btn-lg': '1.25rem',
            'py-btn-small': '0.25rem',
            'py-btn-small-sm': '0.25rem',
            'py-btn-small-lg': '0.375rem',
            'px-btn-small': '0.625rem',
            'px-btn-small-sm': '0.625rem',
            'px-btn-small-lg': '0.75rem',
            'py-group-tabs': 'var(--vf-py-input)',
            'py-group-tabs-sm': 'var(--vf-py-input-sm)',
            'py-group-tabs-lg': 'var(--vf-py-input-lg)',
            'px-group-tabs': 'var(--vf-px-input)',
            'px-group-tabs-sm': 'var(--vf-px-input-sm)',
            'px-group-tabs-lg': 'var(--vf-px-input-lg)',
            'py-group-blocks': '0.75rem',
            'py-group-blocks-sm': '0.625rem',
            'py-group-blocks-lg': '0.875rem',
            'px-group-blocks': '1rem',
            'px-group-blocks-sm': '1rem',
            'px-group-blocks-lg': '1rem',
            'py-tag': '0px',
            'py-tag-sm': 'var(--vf-py-tag)',
            'py-tag-lg': 'var(--vf-py-tag)',
            'px-tag': '0.4375rem',
            'px-tag-sm': 'var(--vf-px-tag)',
            'px-tag-lg': 'var(--vf-px-tag)',
            'py-slider-tooltip': '0.125rem',
            'py-slider-tooltip-sm': '0.0625rem',
            'py-slider-tooltip-lg': '0.1875rem',
            'px-slider-tooltip': '0.375rem',
            'px-slider-tooltip-sm': '0.3125rem',
            'px-slider-tooltip-lg': '0.5rem',
            'space-addon': '0px',
            'space-addon-sm': 'var(--vf-space-addon)',
            'space-addon-lg': 'var(--vf-space-addon)',
            'space-checkbox': '0.375rem',
            'space-checkbox-sm': 'var(--vf-space-checkbox)',
            'space-checkbox-lg': 'var(--vf-space-checkbox)',
            'space-tags': '0.25rem',
            'space-tags-sm': 'var(--vf-space-tags)',
            'space-tags-lg': 'var(--vf-space-tags)',
            'floating-top': '0rem',
            'floating-top-sm': '0rem',
            'floating-top-lg': '0.6875rem',
            'bg-input': '#ffffff',
            'bg-input-hover': '#ffffff',
            'bg-input-focus': '#ffffff',
            'bg-input-danger': '#ffffff',
            'bg-input-success': '#ffffff',
            'bg-disabled': 'var(--vf-gray-200)',
            'bg-selected': '#1118270d',
            'bg-passive': 'var(--vf-gray-300)',
            'bg-icon': 'var(--vf-gray-500)',
            'bg-danger': 'var(--vf-danger-lighter)',
            'bg-success': 'var(--vf-success-lighter)',
            'bg-tag': 'var(--vf-primary)',
            'bg-slider-handle': 'var(--vf-primary)',
            'bg-toggle-handle': '#ffffff',
            'bg-date-head': 'var(--vf-gray-100)',
            'bg-addon': '#ffffff00',
            'bg-btn': 'var(--vf-primary)',
            'bg-btn-danger': 'var(--vf-danger)',
            'bg-btn-secondary': 'var(--vf-gray-200)',
            'color-input': 'var(--vf-gray-800)',
            'color-input-hover': 'var(--vf-gray-800)',
            'color-input-focus': 'var(--vf-gray-800)',
            'color-input-danger': 'var(--vf-gray-800)',
            'color-input-success': 'var(--vf-gray-800)',
            'color-disabled': 'var(--vf-gray-400)',
            'color-placeholder': 'var(--vf-gray-300)',
            'color-passive': 'var(--vf-gray-700)',
            'color-muted': 'var(--vf-gray-500)',
            'color-floating': 'var(--vf-gray-500)',
            'color-floating-focus': 'var(--vf-gray-500)',
            'color-floating-success': 'var(--vf-gray-500)',
            'color-floating-danger': 'var(--vf-gray-500)',
            'color-danger': 'var(--vf-danger)',
            'color-success': 'var(--vf-success)',
            'color-tag': 'var(--vf-color-on-primary)',
            'color-addon': 'var(--vf-gray-800)',
            'color-date-head': 'var(--vf-gray-700)',
            'color-btn': 'var(--vf-color-on-primary)',
            'color-btn-danger': '#ffffff',
            'color-btn-secondary': 'var(--vf-gray-700)',
            'border-color-input': 'var(--vf-gray-300)',
            'border-color-input-hover': 'var(--vf-gray-300)',
            'border-color-input-focus': 'var(--vf-primary)',
            'border-color-input-danger': 'var(--vf-gray-300)',
            'border-color-input-success': 'var(--vf-gray-300)',
            'border-color-checked': 'var(--vf-primary)',
            'border-color-passive': 'var(--vf-gray-300)',
            'border-color-slider-tooltip': 'var(--vf-primary)',
            'border-color-tag': 'var(--vf-primary)',
            'border-color-btn': 'var(--vf-primary)',
            'border-color-btn-danger': 'var(--vf-danger)',
            'border-color-btn-secondary': 'var(--vf-gray-200)',
            'border-width-input-t': '1px',
            'border-width-input-r': '1px',
            'border-width-input-b': '1px',
            'border-width-input-l': '1px',
            'border-width-radio-t': 'var(--vf-border-width-input-t)',
            'border-width-radio-r': 'var(--vf-border-width-input-r)',
            'border-width-radio-b': 'var(--vf-border-width-input-b)',
            'border-width-radio-l': 'var(--vf-border-width-input-l)',
            'border-width-checkbox-t': 'var(--vf-border-width-input-t)',
            'border-width-checkbox-r': 'var(--vf-border-width-input-r)',
            'border-width-checkbox-b': 'var(--vf-border-width-input-b)',
            'border-width-checkbox-l': 'var(--vf-border-width-input-l)',
            'border-width-dropdown': '1px',
            'border-width-btn': '3px',
            'border-width-toggle': '0.125rem',
            'border-width-tag': '1px',
            'shadow-input': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-input-hover': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-input-focus': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-handles': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-handles-hover': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-handles-focus': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-btn': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-dropdown': '0px 0px 0px 0px rgba(0,0,0,0)',
            'radius-input': '0.25rem',
            'radius-input-sm': 'var(--vf-radius-input)',
            'radius-input-lg': 'var(--vf-radius-input)',
            'radius-btn': 'var(--vf-radius-input)',
            'radius-btn-sm': 'var(--vf-radius-input-sm)',
            'radius-btn-lg': 'var(--vf-radius-input)',
            'radius-small': 'var(--vf-radius-input)',
            'radius-small-sm': 'var(--vf-radius-input-sm)',
            'radius-small-lg': 'var(--vf-radius-input)',
            'radius-large': 'var(--vf-radius-input)',
            'radius-large-sm': 'var(--vf-radius-input-sm)',
            'radius-large-lg': 'var(--vf-radius-input)',
            'radius-tag': 'var(--vf-radius-input)',
            'radius-tag-sm': 'var(--vf-radius-input-sm)',
            'radius-tag-lg': 'var(--vf-radius-input)',
            'radius-checkbox': 'var(--vf-radius-input)',
            'radius-checkbox-sm': 'var(--vf-radius-input-sm)',
            'radius-checkbox-lg': 'var(--vf-radius-input)',
            'radius-slider': 'var(--vf-radius-input)',
            'radius-slider-sm': 'var(--vf-radius-input-sm)',
            'radius-slider-lg': 'var(--vf-radius-input)',
            'radius-image': 'var(--vf-radius-input)',
            'radius-image-sm': 'var(--vf-radius-input-sm)',
            'radius-image-lg': 'var(--vf-radius-input)',
            'radius-gallery': 'var(--vf-radius-input)',
            'radius-gallery-sm': 'var(--vf-radius-input-sm)',
            'radius-gallery-lg': 'var(--vf-radius-input)',
            'checkbox-size': '1rem',
            'checkbox-size-sm': '0.875rem',
            'checkbox-size-lg': '1rem',
            'gallery-size': '6rem',
            'gallery-size-sm': '5rem',
            'gallery-size-lg': '7rem',
            'toggle-width': '3rem',
            'toggle-width-sm': '2.75rem',
            'toggle-width-lg': '3rem',
            'toggle-height': '1.25rem',
            'toggle-height-sm': '1rem',
            'toggle-height-lg': '1.25rem',
            'slider-height': '0.375rem',
            'slider-height-sm': '0.3125rem',
            'slider-height-lg': '0.5rem',
            'slider-height-vertical': '20rem',
            'slider-height-vertical-sm': 'var(--vf-slider-height-vertical)',
            'slider-height-vertical-lg': 'var(--vf-slider-height-vertical)',
            'slider-handle-size': '1rem',
            'slider-handle-size-sm': '0.875rem',
            'slider-handle-size-lg': '1.25rem',
            'slider-tooltip-distance': '0.5rem',
            'slider-tooltip-distance-sm': '0.375rem',
            'slider-tooltip-distance-lg': '0.5rem',
            'slider-tooltip-arrow-size': '0.3125rem',
            'slider-tooltip-arrow-size-sm': 'var(--vf-slider-tooltip-arrow-size)',
            'slider-tooltip-arrow-size-lg': 'var(--vf-slider-tooltip-arrow-size)',
          }
        },
        {
          label: 'Bootstrap',
          vars: {
            'primary': '#6200ee',
            'primary-darker': '#5000cc',
            'color-on-primary': '#ffffff',
            'danger': '#b00020',
            'danger-lighter': '#f9e5e8',
            'success': '#4caf50',
            'success-lighter': '#e8f5e9',
            'ring-width': '0px',
            'ring-color': '#673ab766',
            'gray-50': '#fafafa',
            'gray-100': '#f5f5f5',
            'gray-200': '#eeeeee',
            'gray-300': '#e0e0e0',
            'gray-400': '#bdbdbd',
            'gray-500': '#9e9e9e',
            'gray-600': '#757575',
            'gray-700': '#616161',
            'gray-800': '#424242',
            'gray-900': '#212121',
            'font-size': '1rem',
            'font-size-sm': '0.875rem',
            'font-size-lg': '1rem',
            'font-size-small': '0.875rem',
            'font-size-small-sm': '0.75rem',
            'font-size-small-lg': '0.875rem',
            'line-height': '1.5rem',
            'line-height-sm': '1.25rem',
            'line-height-lg': '1.5rem',
            'line-height-small': '1.25rem',
            'line-height-small-sm': '1.125rem',
            'line-height-small-lg': '1.25rem',
            'letter-spacing': '0px',
            'letter-spacing-sm': '0px',
            'letter-spacing-lg': '0px',
            'letter-spacing-small': '0px',
            'letter-spacing-small-sm': '0px',
            'letter-spacing-small-lg': '0px',
            'gutter': '1rem',
            'gutter-sm': '0.5rem',
            'gutter-lg': '1rem',
            'min-height-input': '3rem',
            'min-height-input-sm': '2.125rem',
            'min-height-input-lg': '3.5rem',
            'py-input': '0.75rem',
            'py-input-sm': '0.375rem',
            'py-input-lg': '1rem',
            'px-input': '1rem',
            'px-input-sm': '0.625rem',
            'px-input-lg': '1rem',
            'py-btn': '0.375rem',
            'py-btn-sm': '0.5rem',
            'py-btn-lg': '0.5rem',
            'px-btn': '1rem',
            'px-btn-sm': '1rem',
            'px-btn-lg': '1rem',
            'py-btn-small': '0.28125rem',
            'py-btn-small-sm': '0.375rem',
            'py-btn-small-lg': '0.375rem',
            'px-btn-small': '0.75rem',
            'px-btn-small-sm': '0.75rem',
            'px-btn-small-lg': '0.75rem',
            'py-group-tabs': 'var(--vf-py-input)',
            'py-group-tabs-sm': 'var(--vf-py-input-sm)',
            'py-group-tabs-lg': 'var(--vf-py-input-lg)',
            'px-group-tabs': 'var(--vf-px-input)',
            'px-group-tabs-sm': 'var(--vf-px-input-sm)',
            'px-group-tabs-lg': 'var(--vf-px-input-lg)',
            'py-group-blocks': '1rem',
            'py-group-blocks-sm': '0.75rem',
            'py-group-blocks-lg': '1.25rem',
            'px-group-blocks': '1.25rem',
            'px-group-blocks-sm': '1rem',
            'px-group-blocks-lg': '1.5rem',
            'py-tag': '0.1875rem',
            'py-tag-sm': '0.125rem',
            'py-tag-lg': '0.1875rem',
            'px-tag': '0.675rem',
            'px-tag-sm': '0.5rem',
            'px-tag-lg': '0.75rem',
            'py-slider-tooltip': '0.25rem',
            'py-slider-tooltip-sm': '0.1875rem',
            'py-slider-tooltip-lg': '0.3125rem',
            'px-slider-tooltip': '0.5rem',
            'px-slider-tooltip-sm': '0.375rem',
            'px-slider-tooltip-lg': '0.625rem',
            'space-addon': '0px',
            'space-addon-sm': 'var(--vf-space-addon)',
            'space-addon-lg': 'var(--vf-space-addon)',
            'space-checkbox': '0.5rem',
            'space-checkbox-sm': '0.5rem',
            'space-checkbox-lg': '0.625rem',
            'space-tags': '0.25rem',
            'space-tags-sm': 'var(--vf-space-tags)',
            'space-tags-lg': '0.3125rem',
            'floating-top': '0.75rem',
            'floating-top-sm': '0rem',
            'floating-top-lg': '0.875rem',
            'bg-input': 'var(--vf-gray-100)',
            'bg-input-hover': '#ececec',
            'bg-input-focus': '#dcdcdc',
            'bg-input-danger': 'var(--vf-gray-100)',
            'bg-input-success': 'var(--vf-gray-100)',
            'bg-disabled': 'var(--vf-gray-50)',
            'bg-selected': '#1118270d',
            'bg-passive': 'var(--vf-gray-300)',
            'bg-icon': 'var(--vf-gray-700)',
            'bg-danger': 'var(--vf-danger-lighter)',
            'bg-success': 'var(--vf-success-lighter)',
            'bg-tag': 'var(--vf-primary)',
            'bg-slider-handle': 'var(--vf-primary)',
            'bg-toggle-handle': '#ffffff',
            'bg-date-head': 'var(--vf-gray-100)',
            'bg-addon': 'transparent',
            'bg-btn': 'var(--vf-primary)',
            'bg-btn-danger': 'var(--vf-danger)',
            'bg-btn-secondary': 'var(--vf-gray-200)',
            'color-input': 'var(--vf-gray-900)',
            'color-input-focus': 'var(--vf-gray-900)',
            'color-input-hover': 'var(--vf-gray-900)',
            'color-input-danger': 'var(--vf-gray-900)',
            'color-input-success': 'var(--vf-gray-900)',
            'color-disabled': '#afafaf',
            'color-placeholder': '#00000099',
            'color-passive': 'var(--vf-gray-700)',
            'color-muted': '#00000099',
            'color-floating': '#00000099',
            'color-floating-focus': 'var(--vf-primary)',
            'color-floating-success': 'var(--vf-success)',
            'color-floating-danger': 'var(--vf-danger)',
            'color-danger': 'var(--vf-danger)',
            'color-success': 'var(--vf-success)',
            'color-tag': 'var(--vf-color-on-primary)',
            'color-addon': 'inherit',
            'color-date-head': 'var(--vf-gray-700)',
            'color-btn': 'var(--vf-color-on-primary)',
            'color-btn-danger': '#ffffff',
            'color-btn-secondary': 'var(--vf-gray-700)',
            'border-color-input': 'var(--vf-gray-600)',
            'border-color-input-focus': 'var(--vf-primary)',
            'border-color-input-hover': 'var(--vf-gray-600)',
            'border-color-input-danger': 'var(--vf-danger)',
            'border-color-input-success': 'var(--vf-gray-600)',
            'border-color-checked': 'var(--vf-primary)',
            'border-color-passive': 'var(--vf-gray-300)',
            'border-color-slider-tooltip': 'var(--vf-primary)',
            'border-color-tag': 'var(--vf-primary)',
            'border-color-btn': 'var(--vf-primary)',
            'border-color-btn-danger': 'var(--vf-danger)',
            'border-color-btn-secondary': 'var(--vf-gray-200)',
            'border-width-input-t': '0px',
            'border-width-input-r': '0px',
            'border-width-input-b': '1px',
            'border-width-input-l': '0px',
            'border-width-radio-t': '2px',
            'border-width-radio-r': '2px',
            'border-width-radio-b': '2px',
            'border-width-radio-l': '2px',
            'border-width-checkbox-t': '2px',
            'border-width-checkbox-r': '2px',
            'border-width-checkbox-b': '2px',
            'border-width-checkbox-l': '2px',
            'border-width-dropdown': '0px',
            'border-width-toggle': '0.25rem',
            'border-width-btn': '1px',
            'border-width-tag': '1px',
            'shadow-input': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-input-hover': 'var(--vf-shadow-input)',
            'shadow-input-focus': 'var(--vf-shadow-input)',
            'shadow-handles': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-handles-hover': '0px 0px 0px 9px rgba(0,0,0,0.15)',
            'shadow-handles-focus': '0px 0px 0px 9px rgba(0,0,0,0.15)',
            'shadow-btn': '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            'shadow-dropdown': '0 4px 6px 0 rgb(32 33 36 / 28%)',
            'radius-input': '0.25rem 0.25rem 0rem 0rem',
            'radius-input-sm': 'var(--vf-radius-input)',
            'radius-input-lg': 'var(--vf-radius-input)',
            'radius-btn': '0.25rem',
            'radius-btn-sm': '0.25rem',
            'radius-btn-lg': '0.25rem',
            'radius-small': '0.125rem',
            'radius-small-sm': '0.125rem',
            'radius-small-lg': '0.125rem',
            'radius-large': '0.5rem 0.5rem 0rem 0rem',
            'radius-large-sm': '0.5rem 0.5rem 0rem 0rem',
            'radius-large-lg': '0.5rem 0.5rem 0rem 0rem',
            'radius-tag': '999px',
            'radius-tag-sm': '999px',
            'radius-tag-lg': '999px',
            'radius-checkbox': '0.25rem',
            'radius-checkbox-sm': '0.25rem',
            'radius-checkbox-lg': '0.25rem',
            'radius-slider': '1rem',
            'radius-slider-sm': '1rem',
            'radius-slider-lg': '1rem',
            'radius-image': '0.25rem 0.25rem 0rem 0rem',
            'radius-image-sm': '0.25rem 0.25rem 0rem 0rem',
            'radius-image-lg': '0.25rem 0.25rem 0rem 0rem',
            'radius-gallery': '0.25rem 0.25rem 0rem 0rem',
            'radius-gallery-sm': '0.25rem 0.25rem 0rem 0rem',
            'radius-gallery-lg': '0.25rem 0.25rem 0rem 0rem',
            'checkbox-size': '1rem',
            'checkbox-size-sm': '0.9375rem',
            'checkbox-size-lg': '1.125rem',
            'gallery-size': '6rem',
            'gallery-size-sm': '5rem',
            'gallery-size-lg': '7rem',
            'toggle-width': '3rem',
            'toggle-width-sm': '2.75rem',
            'toggle-width-lg': '3rem',
            'toggle-height': '1rem',
            'toggle-height-sm': '1.125rem',
            'toggle-height-lg': '1.25rem',
            'slider-height': '0.375rem',
            'slider-height-sm': '0.3125rem',
            'slider-height-lg': '0.4375rem',
            'slider-height-vertical': '20rem',
            'slider-height-vertical-sm': 'var(--vf-slider-height-vertical)',
            'slider-height-vertical-lg': 'var(--vf-slider-height-vertical)',
            'slider-handle-size': '1.25rem',
            'slider-handle-size-sm': 'var(--vf-slider-handle-size)',
            'slider-handle-size-lg': '1.4375rem',
            'slider-tooltip-distance': '0.625rem',
            'slider-tooltip-distance-sm': 'var(--vf-slider-tooltip-distance)',
            'slider-tooltip-distance-lg': 'var(--vf-slider-tooltip-distance)',
            'slider-tooltip-arrow-size': '0.375rem',
            'slider-tooltip-arrow-size-sm': 'var(--vf-slider-tooltip-arrow-size)',
            'slider-tooltip-arrow-size-lg': 'var(--vf-slider-tooltip-arrow-size)',
          }
        },
        {
          label: 'Material',
          vars: {
            'primary': '#007bff',
            'primary-darker': '#0056b3',
            'color-on-primary': '#ffffff',
            'danger': '#dc3545',
            'danger-lighter': '#f9dcdf',
            'success': '#28a745',
            'success-lighter': '#c4f1ce',
            'ring-width': '0.2rem',
            'ring-color': '#007bff66',
            'gray-50': '#f9fafb',
            'gray-100': '#f8f9fa',
            'gray-200': '#e9ecef',
            'gray-300': '#dee2e6',
            'gray-400': '#ced4da',
            'gray-500': '#adb5bd',
            'gray-600': '#6c757d',
            'gray-700': '#495057',
            'gray-800': '#343a40',
            'gray-900': '#212529',
            'font-size': '1rem',
            'font-size-sm': '0.875rem',
            'font-size-lg': '1.25rem',
            'font-size-small': '0.8rem',
            'font-size-small-sm': '0.7rem',
            'font-size-small-lg': '1rem',
            'line-height': '1.5rem',
            'line-height-sm': '1.5rem',
            'line-height-lg': '1.5rem',
            'line-height-small': '1.5rem',
            'line-height-small-sm': '1.5rem',
            'line-height-small-lg': '1.5rem',
            'letter-spacing': '0px',
            'letter-spacing-sm': '0px',
            'letter-spacing-lg': '0px',
            'letter-spacing-small': '0px',
            'letter-spacing-small-sm': '0px',
            'letter-spacing-small-lg': '0px',
            'gutter': '15px',
            'gutter-sm': '7.5px',
            'gutter-lg': '15px',
            'min-height-input': '2.375rem',
            'min-height-input-sm': '2.125rem',
            'min-height-input-lg': '2.625rem',
            'py-input': '0.375rem',
            'py-input-sm': '0.25rem',
            'py-input-lg': '0.5rem',
            'px-input': '0.75rem',
            'px-input-sm': '0.5rem',
            'px-input-lg': '1rem',
            'py-btn': '0.375rem',
            'py-btn-sm': '0.25rem',
            'py-btn-lg': '0.5rem',
            'px-btn': '0.75rem',
            'px-btn-sm': '0.5rem',
            'px-btn-lg': '1rem',
            'py-btn-small': '0.28125rem',
            'py-btn-small-sm': '0.1875rem',
            'py-btn-small-lg': '0.375rem',
            'px-btn-small': '0.5625rem',
            'px-btn-small-sm': '0.375rem',
            'px-btn-small-lg': '0.75rem',
            'py-group-tabs': 'var(--vf-py-input)',
            'py-group-tabs-sm': 'var(--vf-py-input-sm)',
            'py-group-tabs-lg': 'var(--vf-py-input-lg)',
            'px-group-tabs': 'var(--vf-px-input)',
            'px-group-tabs-sm': 'var(--vf-px-input-sm)',
            'px-group-tabs-lg': 'var(--vf-px-input-lg)',
            'py-group-blocks': '0.75rem',
            'py-group-blocks-sm': '0.625rem',
            'py-group-blocks-lg': '0.875rem',
            'px-group-blocks': '1rem',
            'px-group-blocks-sm': '1rem',
            'px-group-blocks-lg': '1rem',
            'py-tag': '0px',
            'py-tag-sm': 'var(--vf-py-tag)',
            'py-tag-lg': 'var(--vf-py-tag)',
            'px-tag': '0.4375rem',
            'px-tag-sm': 'var(--vf-px-tag)',
            'px-tag-lg': 'var(--vf-px-tag)',
            'py-slider-tooltip': '0.125rem',
            'py-slider-tooltip-sm': '0.0625rem',
            'py-slider-tooltip-lg': '0.1875rem',
            'px-slider-tooltip': '0.375rem',
            'px-slider-tooltip-sm': '0.3125rem',
            'px-slider-tooltip-lg': '0.5rem',
            'space-addon': '0.75rem',
            'space-addon-sm': 'var(--vf-space-addon)',
            'space-addon-lg': 'var(--vf-space-addon)',
            'space-checkbox': '0.25rem',
            'space-checkbox-sm': 'var(--vf-space-checkbox)',
            'space-checkbox-lg': 'var(--vf-space-checkbox)',
            'space-tags': '0.25rem',
            'space-tags-sm': 'var(--vf-space-tags)',
            'space-tags-lg': 'var(--vf-space-tags)',
            'floating-top': '0rem',
            'floating-top-sm': '0rem',
            'floating-top-lg': '0.6875rem',
            'bg-input': '#ffffff',
            'bg-input-focus': '#ffffff',
            'bg-input-hover': '#ffffff',
            'bg-input-danger': '#ffffff',
            'bg-input-success': '#ffffff',
            'bg-disabled': '#e9ecef',
            'bg-selected': '#1118270d',
            'bg-passive': 'var(--vf-gray-300)',
            'bg-icon': 'var(--vf-gray-500)',
            'bg-danger': 'var(--vf-danger-lighter)',
            'bg-success': 'var(--vf-success-lighter)',
            'bg-tag': 'var(--vf-primary)',
            'bg-slider-handle': 'var(--vf-primary)',
            'bg-toggle-handle': '#ffffff',
            'bg-date-head': 'var(--vf-gray-100)',
            'bg-addon': '#e9ecef',
            'bg-btn': 'var(--vf-primary)',
            'bg-btn-danger': 'var(--vf-danger)',
            'bg-btn-secondary': 'var(--vf-gray-200)',
            'color-input': 'var(--vf-gray-700)',
            'color-input-focus': 'var(--vf-gray-700)',
            'color-input-hover': 'var(--vf-gray-700)',
            'color-input-danger': 'var(--vf-gray-700)',
            'color-input-success': 'var(--vf-gray-700)',
            'color-disabled': 'var(--vf-gray-700)',
            'color-placeholder': 'var(--vf-gray-600)',
            'color-passive': 'var(--vf-gray-700)',
            'color-muted': 'var(--vf-gray-600)',
            'color-floating': 'var(--vf-gray-600)',
            'color-floating-success': 'var(--vf-gray-600)',
            'color-floating-danger': 'var(--vf-gray-600)',
            'color-floating-focus': 'var(--vf-gray-600)',
            'color-danger': 'var(--vf-danger)',
            'color-success': 'var(--vf-success)',
            'color-tag': 'var(--vf-color-on-primary)',
            'color-addon': 'var(--vf-gray-700)',
            'color-date-head': 'var(--vf-gray-700)',
            'color-btn': 'var(--vf-color-on-primary)',
            'color-btn-danger': '#ffffff',
            'color-btn-secondary': 'var(--vf-gray-700)',
            'border-color-input': 'var(--vf-gray-400)',
            'border-color-input-focus': '#80bdff',
            'border-color-input-hover': 'var(--vf-gray-400)',
            'border-color-input-danger': 'var(--vf-gray-400)',
            'border-color-input-success': 'var(--vf-gray-400)',
            'border-color-checked': 'var(--vf-primary)',
            'border-color-passive': 'var(--vf-gray-300)',
            'border-color-slider-tooltip': 'var(--vf-primary)',
            'border-color-tag': 'var(--vf-primary)',
            'border-color-btn': 'var(--vf-primary)',
            'border-color-btn-danger': 'var(--vf-danger)',
            'border-color-btn-secondary': 'var(--vf-gray-200)',
            'border-width-input-t': '1px',
            'border-width-input-r': '1px',
            'border-width-input-b': '1px',
            'border-width-input-l': '1px',
            'border-width-radio-t': 'var(--vf-border-width-input-t)',
            'border-width-radio-r': 'var(--vf-border-width-input-r)',
            'border-width-radio-b': 'var(--vf-border-width-input-b)',
            'border-width-radio-l': 'var(--vf-border-width-input-l)',
            'border-width-checkbox-t': 'var(--vf-border-width-input-t)',
            'border-width-checkbox-r': 'var(--vf-border-width-input-r)',
            'border-width-checkbox-b': 'var(--vf-border-width-input-b)',
            'border-width-checkbox-l': 'var(--vf-border-width-input-l)',
            'border-width-dropdown': '1px',
            'border-width-btn': '1px',
            'border-width-toggle': '0.125rem',
            'border-width-tag': '1px',
            'shadow-input': 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
            'shadow-input-hover': 'var(--vf-shadow-input)',
            'shadow-input-focus': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
            'shadow-handles': '0px 0px 0px 0px rgba(0,0,0,0)',
            'shadow-handles-hover': 'var(--vf-shadow-input-hover)',
            'shadow-handles-focus': 'var(--vf-shadow-input-focus)',
            'shadow-btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075)',
            'shadow-dropdown': '0px 0px 0px 0px rgba(0,0,0,0)',
            'radius-input': '0.25rem',
            'radius-input-sm': '0.2rem',
            'radius-input-lg': '0.3rem',
            'radius-btn': '0.25rem',
            'radius-btn-sm': '0.2rem',
            'radius-btn-lg': '0.3rem',
            'radius-small': 'var(--vf-radius-input)',
            'radius-small-sm': 'var(--vf-radius-input-sm)',
            'radius-small-lg': 'var(--vf-radius-input)',
            'radius-large': 'var(--vf-radius-input)',
            'radius-large-sm': 'var(--vf-radius-input-sm)',
            'radius-large-lg': 'var(--vf-radius-input)',
            'radius-tag': 'var(--vf-radius-input)',
            'radius-tag-sm': 'var(--vf-radius-input-sm)',
            'radius-tag-lg': 'var(--vf-radius-input)',
            'radius-checkbox': 'var(--vf-radius-input)',
            'radius-checkbox-sm': 'var(--vf-radius-input-sm)',
            'radius-checkbox-lg': 'var(--vf-radius-input)',
            'radius-slider': 'var(--vf-radius-input)',
            'radius-slider-sm': 'var(--vf-radius-input-sm)',
            'radius-slider-lg': 'var(--vf-radius-input)',
            'radius-image': 'var(--vf-radius-input)',
            'radius-image-sm': 'var(--vf-radius-input-sm)',
            'radius-image-lg': 'var(--vf-radius-input)',
            'radius-gallery': 'var(--vf-radius-input)',
            'radius-gallery-sm': 'var(--vf-radius-input-sm)',
            'radius-gallery-lg': 'var(--vf-radius-input)',
            'checkbox-size': '1rem',
            'checkbox-size-sm': '0.875rem',
            'checkbox-size-lg': '1rem',
            'gallery-size': '6rem',
            'gallery-size-sm': '5rem',
            'gallery-size-lg': '7rem',
            'toggle-width': '3rem',
            'toggle-width-sm': '2.75rem',
            'toggle-width-lg': '3rem',
            'toggle-height': '1.25rem',
            'toggle-height-sm': '1.125rem',
            'toggle-height-lg': '1.25rem',
            'slider-height': '0.375rem',
            'slider-height-sm': '0.3125rem',
            'slider-height-lg': '0.5rem',
            'slider-height-vertical': '20rem',
            'slider-height-vertical-sm': 'var(--vf-slider-height-vertical)',
            'slider-height-vertical-lg': 'var(--vf-slider-height-vertical)',
            'slider-handle-size': '1rem',
            'slider-handle-size-sm': '0.875rem',
            'slider-handle-size-lg': '1.25rem',
            'slider-tooltip-distance': '0.5rem',
            'slider-tooltip-distance-sm': '0.375rem',
            'slider-tooltip-distance-lg': '0.5rem',
            'slider-tooltip-arrow-size': '0.3125rem',
            'slider-tooltip-arrow-size-sm': 'var(--vf-slider-tooltip-arrow-size)',
            'slider-tooltip-arrow-size-lg': 'var(--vf-slider-tooltip-arrow-size)',
          }
        },
      ]
    },
  ],

  // Form properties
  // ---------------
  // Disable group:
  //  group_name: false
  //
  // Disable prop:
  //  group_name: {
  //    feature: false 
  //  }
  formProps: {
    properties: {
      name: true,
      width: true,
    },
    submission: {
      endpoint: true,
      methods: true, // custom methods [true, { items: ['default', 'POST', 'GET'] }]
      formKey: true,
    },
    validation: {
      live: true,
    },
    layout: {
      size: true,
      columns: true,
      forceLabels: true,
      floatPlaceholders: true,
      displayErrors: true,
      displayMessages: true,
    },
  },

  // Theme properties
  // ---------------
  // Disable group:
  //  group_name: false
  //
  // Disable prop:
  //  group_name: {
  //    feature: false 
  //  }
  themeProps: {
    theme: {
      theme: true,
    },
    tools: {
      tools: true,
    },
    colors: {
      'primary': true,
      'primary-darker': true,
      'color-on-primary': true,
      'danger': true,
      'danger-lighter': true,
      'success': true,
      'success-lighter': true,
      'gray-50': true,
      'gray-100': true,
      'gray-200': true,
      'gray-300': true,
      'gray-400': true,
      'gray-500': true,
      'gray-600': true,
      'gray-700': true,
      'gray-800': true,
      'gray-900': true,
    },
    fonts: {
      'font-size': true,
      'line-height': true,
      'letter-spacing': true,
      'font-size-small': true,
      'line-height-small': true,
      'letter-spacing-small': true,
    },
    spaces: {
      'gutter': true,
      'color-muted': true,
      'color-passive': true,
      'bg-passive': true,
      'border-color-passive': true,
      'bg-selected': true,
      'radius-small': true,
      'shadow-handles': true,
      'shadow-handles-hover': true,
      'shadow-handles-focus': true,
    },
    inputs: {
      'min-height-input': true,
      'ring-width': true,
      'ring-color': true,
      'py-input': true,
      'px-input': true,
      'border-width-input': true,
      'radius-input': true,
      'radius-large': true,
      'border-color-input': true,
      'color-input': true,
      'bg-icon': true,
      'color-floating': true,
      'bg-input': true,
      'shadow-input': true,
      'hover': true,
      'color-input-hover': true,
      'bg-input-hover': true,
      'border-color-input-hover': true,
      'shadow-input-hover': true,
      'focus': true,
      'color-input-focus': true,
      'color-floating-focus': true,
      'bg-input-focus': true,
      'border-color-input-focus': true,
      'shadow-input-focus': true,
      'danger': true,
      'color-input-danger': true,
      'color-floating-danger': true,
      'bg-input-danger': true,
      'border-color-input-danger': true,
      'success': true,
      'color-input-success': true,
      'color-floating-success': true,
      'bg-input-success': true,
      'border-color-input-success': true,
      'disabled': true,
      'color-disabled': true,
      'bg-disabled': true,
      'floating-top': true,
      'space-addon': true,
      'bg-addon': true,
      'color-addon': true,
    },
    select: {
      'dropdown': true,
      'border-width-dropdown': true,
      'shadow-dropdown': true,
    },
    tags: {
      'py-tag': true,
      'px-tag': true,
      'space-tags': true,
      'border-width-tag': true,
      'radius-tag': true,
      'color-tag': true,
      'bg-tag': true,
      'border-color-tag': true,
    },
    datepicker: {
      'color-date-head': true,
      'bg-date-head': true,
    },
    checkboxes: {
      'checkbox-size': true,
      'space-checkbox': true,
      'border-color-checked': true,
      'radio': true,
      'border-width-radio': true,
      'checkbox': true,
      'border-width-checkbox': true,
      'radius-checkbox': true,
      'tabs': true,
      'py-group-tabs': true,
      'px-group-tabs': true,
      'blocks': true,
      'py-group-blocks': true,
      'px-group-blocks': true,
    },
    slider: {
      'slider-height': true,
      'slider-height-vertical': true,
      'radius-slider': true,
      'handle': true,
      'slider-handle-size': true,
      'bg-slider-handle': true,
      'tooltip': true,
      'py-slider-tooltip': true,
      'px-slider-tooltip': true,
      'slider-tooltip-distance': true,
      'slider-tooltip-arrow-size': true,
      'border-color-slider-tooltip': true,
    },
    toggle: {
      'toggle-width': true,
      'toggle-height': true,
      'border-width-toggle': true,
      'handle': true,
      'bg-toggle-handle': true,
    },
    images: {
      'image': true,
      'radius-image': true,
      'gallery': true,
      'gallery-size': true,
      'radius-gallery': true,
    },
    buttons: {
      'py-btn': true,
      'px-btn': true,
      'small-buttons': true,
      'py-btn-small': true,
      'px-btn-small': true,
      'border-color-btn': true,
      'border-width-btn': true,
      'radius-btn': true,
      'color-btn': true,
      'bg-btn': true,
      'shadow-btn': true,
      'secondary': true,
      'color-btn-secondary': true,
      'bg-btn-secondary': true,
      'border-color-btn-secondary': true,
      'danger': true,
      'color-btn-danger': true,
      'bg-btn-danger': true,
      'border-color-btn-danger': true,
    },
  },

  // Export properties
  // ---------------
  // Disable prop:
  //  group_name: {
  //    feature: false 
  //  }
  exportProps: {
    export: {
      vue: true,
      output: true,
      api: true,
      theme: true,
      download: true,
    }
  },

  // Element properties
  // ---------------
  // Disable group:
  //  group_name: false
  //
  // Disable prop:
  //  group_name: {
  //    feature: false 
  //  }
  elementProps: {
    // Applied to each element as a default
    general: {
      properties: {
        name: true,
        label: true,
        placeholder: true,
        floatingPlaceholder: true,
      },
      data: {
        default: true,
        submit: true,
      },
      decorators: {
        tooltip: true,
        prefix: true,
        suffix: true,
        description: true,
        before: true,
        between: true,
        after: true,
      },
      layout: {
        size: [true, { options: ['sm', 'md', 'lg'] }],
        columns: true,
      },
      validation: {
        fieldName: true,
        required: true,
        nullable: true,
        unique: true,
        exists: true,
        min: true,
        max: true,
        exact: true,
        regex: true,
        additional: true,
      },
      conditions: true,
      attributes: {
        disabled: true,
        readonly: true,
        id: true,
        autocomplete: true,
        custom: true,
      }
    },
    text: {
      properties: {
        name: true,
        inputType: true,
        label: true,
        placeholder: true,
        floatingPlaceholder: true,
      },
      data: {
        default: true,
        submit: true,
      },
      decorators: {
        tooltip: true,
        prefix: true,
        suffix: true,
        description: true,
        before: true,
        between: true,
        after: true,
      },
      layout: {
        size: [true, { options: ['sm', 'md', 'lg'] }],
        columns: true,
      },
      validation: {
        fieldName: true,
        required: true,
        nullable: true,
        unique: true,
        exists: true,
        min: true,
        max: true,
        exact: true,
        regex: true,
        additional: true,
      },
      conditions: true,
      attributes: {
        disabled: true,
        readonly: true,
        id: true,
        autocomplete: true,
        custom: true,
      }
    },
    textarea: {
      properties: {
        name: true,
        label: true,
        placeholder: true,
        floatingPlaceholder: true,
      },
      textarea: {
        autogrow: true,
        rows: true,
      },
      data: {
        default: true,
        submit: true,
      },
      decorators: {
        tooltip: true,
        prefix: true,
        suffix: true,
        description: true,
        before: true,
        between: true,
        after: true,
      },
      layout: {
        size: [true, { options: ['sm', 'md', 'lg'] }],
        columns: true,
      },
      validation: {
        fieldName: true,
        required: true,
        nullable: true,
        unique: true,
        exists: true,
        min: true,
        max: true,
        exact: true,
        regex: true,
        additional: true,
      },
      conditions: true,
      attributes: {
        disabled: true,
        readonly: true,
        id: true,
        custom: true,
      }
    },
    // ... full list coming soon
  },

  // Element categories
  categories: [
    {
      label: 'Fields',
      key: 'fields',
    },
    {
      label: 'Static',
      key: 'static',
    },
    {
      label: 'Structure',
      key: 'structure',
    },
  ],
  // Remove elements from the element list
  removeElements: [], // ['text', 'number', '...']

  // Elements to include
  elements: [
    {
      key: 'text',
      label: 'Text input',
      description: 'Single line text input',
      icon: ['fas', 'font-case'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'text',
        type: 'text',
        label: 'Text',
      }
    },
    {
      key: 'number',
      label: 'Number input',
      description: 'Input field that only allows numbers',
      icon: ['fas', 'number'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'number',
        type: 'text',
        inputType: 'number',
        rules: ['nullable', 'numeric'],
        autocomplete: 'off',
        label: 'Number',
      }
    },
    {
      key: 'email',
      label: 'Email address',
      description: 'Text field that expects an email',
      icon: ['fas', 'at'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'email',
        type: 'text',
        inputType: 'email',
        rules: ['nullable', 'email'],
        label: 'Email',
      }
    },
    {
      label: 'Phone number',
      description: 'Text field that expects a phone number',
      icon: ['fas', 'phone-rotary'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'phone',
        type: 'text',
        inputType: 'tel',
        label: 'Phone',
      }
    },
    {
      label: 'Password',
      description: 'Text field that expects a password',
      icon: ['fas', 'lock'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'password',
        type: 'text',
        inputType: 'password',
        label: 'Password',
      }
    },
    {
      label: 'URL',
      description: 'Text field that expects an URL',
      icon: ['fas', 'link'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'url',
        type: 'text',
        inputType: 'url',
        rules: ['nullable', 'url'],
        placeholder: 'eg. http(s)://domain.com',
        floating: false,
        label: 'URL',
      }
    },
    {
      label: 'Location',
      description: 'Google places location input',
      icon: ['fas', 'map-marker-alt'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'location',
        type: 'location',
        label: 'Location',
      }
    },
    {
      label: 'Textarea',
      description: 'Single line or multiline text area',
      icon: ['fas', 'align-left'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'textarea',
        type: 'textarea',
        label: 'Textarea',
      }
    },
    {
      label: 'WYSIWYG Editor',
      description: 'Rich text editor',
      icon: ['fas', 'italic'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'editor',
        type: 'editor',
        label: 'Editor',
      }
    },
    {
      label: 'Checkbox',
      description: 'Plain checkbox input',
      icon: ['fas', 'check-square'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'checkbox',
        type: 'checkbox',
        text: 'Checkbox',
        label: 'Checkbox',
      }
    },
    {
      label: 'Checkbox group',
      description: 'Plain checkbox options',
      icon: ['fas', 'tasks'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'checkbox_group',
        type: 'checkboxgroup',
        items: [
          { value: 0, label: 'Label' },
        ],
        label: 'Checkbox group',
      }
    },
    {
      label: 'Checkbox blocks',
      description: 'Checkbox options as blocks',
      icon: ['fas', 'checkbox-blocks'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'checkbox_blocks',
        type: 'checkboxgroup',
        view: 'blocks',
        items: [
          { value: 0, label: 'Label', description: 'Description' },
          { value: 1, label: 'Label 2', description: 'Description 2' },
        ],
        label: 'Checkbox blocks',
      }
    },
    {
      label: 'Checkbox tabs',
      description: 'Checkbox options masked as tabs',
      icon: ['fas', 'checkbox-tabs'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'checkbox_tabs',
        type: 'checkboxgroup',
        view: 'tabs',
        items: [
          { value: 0, label: 'Label', description: 'Description' },
          { value: 1, label: 'Label 2', description: 'Description 2' },
        ],
        label: 'Checkbox tabs',
      }
    },
    {
      label: 'Radio',
      description: 'Plain radio input',
      icon: ['fas', 'dot-circle'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'radio',
        type: 'radio',
        text: 'Radio',
        label: 'Radio',
      }
    },
    {
      label: 'Radio group',
      description: 'Plain radio options',
      icon: ['fas', 'list-ul'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'radio_group',
        type: 'radiogroup',
        items: [
          { value: 'Value', label: 'Label' },
        ],
        label: 'Radio group',
      }
    },
    {
      label: 'Radio blocks',
      description: 'Radio options as blocks',
      icon: ['fas', 'radio-blocks'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'radio_blocks',
        type: 'radiogroup',
        view: 'blocks',
        items: [
          { value: 0, label: 'Label', description: 'Description' },
          { value: 1, label: 'Label 2', description: 'Description 2' },
        ],
        label: 'Radio blocks',
      }
    },
    {
      label: 'Radio tabs',
      description: 'Radio options masked as tabs',
      icon: ['fas', 'radio-tabs'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'radio_tabs',
        type: 'radiogroup',
        view: 'tabs',
        items: [
          { value: 0, label: 'Label', description: 'Description' },
          { value: 1, label: 'Label 2', description: 'Description 2' },
        ],
        label: 'Radio tabs',
      }
    },
    {
      label: 'Toggle',
      description: 'Toggle / switch button',
      icon: ['fas', 'toggle-on'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'toggle',
        type: 'toggle',
        label: 'Toggle',
      },
    },
    {
      label: 'Select',
      description: 'Select input',
      icon: ['fas', 'caret-square-down'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'select',
        type: 'select',
        items: [
          { value: 0, label: 'Label' },
        ],
        search: true,
        label: 'Select',
      }
    },
    {
      label: 'Multiselect',
      description: 'Multiselect input',
      icon: ['fas', 'plus-square'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'multiselect',
        type: 'multiselect',
        closeOnSelect: false,
        items: [
          { value: 0, label: 'Label' },
        ],
        search: true,
        label: 'Multiselect',
      }
    },
    {
      label: 'Tags',
      description: 'Tags input',
      icon: ['fas', 'tags'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'tags',
        type: 'tags',
        closeOnSelect: false,
        search: true,
        items: [
          { value: 0, label: 'Label' },
        ],
        label: 'Tags',
      }
    },
    {
      label: 'Date',
      description: 'Datepicker input',
      icon: ['fas', 'calendar'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'date',
        type: 'date',
        label: 'Date',
      }
    },
    {
      label: 'Date & time',
      description: 'Date & time picker input',
      icon: ['fas', 'datetime'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'datetime',
        type: 'date',
        label: 'Datetime',
      }
    },
    {
      label: 'Time',
      description: 'Time picker input',
      icon: ['fas', 'clock'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'time',
        type: 'date',
        label: 'Time',
      }
    },
    {
      label: 'Multiple dates',
      description: 'Date picker that allows multiple dates',
      icon: ['fas', 'dates'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'multi_date',
        type: 'dates',
        label: 'Dates',
      }
    },
    {
      label: 'Date range',
      description: 'Date picker that allows date range',
      icon: ['fas', 'date-range'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'date_range',
        type: 'dates',
        label: 'Date range',
      }
    },
    {
      label: 'Slider',
      description: 'Horizontal slider',
      icon: ['fas', 'slider'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'slider',
        type: 'slider',
        label: 'Slider',
        default: 30,
      }
    },
    {
      label: 'Range slider',
      description: 'Horizontal slider with range',
      icon: ['fas', 'range-slider'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'range_slider',
        type: 'slider',
        default: [30, 70],
        label: 'Range slider',
      }
    },
    {
      label: 'Vertical slider',
      description: 'Vertical slider',
      icon: ['fas', 'v-slider'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'vertical_slider',
        type: 'slider',
        orientation: 'vertical',
        label: 'Vertical slider',
      }
    },
    {
      label: 'File upload',
      description: 'File upload input',
      icon: ['fas', 'file'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'file',
        type: 'file',
        label: 'File',
      }
    },
    {
      label: 'Multi-file upload',
      description: 'Multi-file upload input',
      icon: ['fas', 'copy'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'multifile',
        type: 'multifile',
        label: 'Multi-file'
      }
    },
    {
      label: 'Image upload',
      description: 'File upload with image only',
      icon: ['fas', 'image'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'image',
        type: 'file',
        label: 'Image',
        accept: 'image/*',
        view: 'image',
        rules: [
          'mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff'
        ]
      }
    },
    {
      label: 'Multi-image upload',
      description: 'Multi-file upload with images only',
      icon: ['fas', 'images'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'multi_image',
        type: 'multifile',
        label: 'Multi-image',
        view: 'image',
        accept: 'image/*',
        file: {
          rules: [
            'mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff'
          ]
        }
      }
    },
    {
      label: 'Gallery',
      description: 'Multi-image upload with gallery view',
      icon: ['fas', 'camera'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'gallery',
        type: 'multifile',
        label: 'Gallery',
        view: 'gallery',
        accept: 'image/*',
        file: {
          rules: [
            'mimetypes:image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/tiff'
          ]
        }
      }
    },
    {
      label: 'Hidden input',
      description: 'Single line or multiline text area',
      icon: ['fas', 'eye-slash'], // or: /path/to/img
      type: 'fields',
      schema: {
        name: 'hidden',
        type: 'hidden',
      }
    },
    {
      label: 'Submit button',
      description: 'Button that triggers submit',
      icon: ['fas', 'check'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'submit',
        type: 'button',
        buttonLabel: 'Submit',
        submits: true,
      }
    },
    {
      label: 'Reset button',
      description: 'Button that triggers reset',
      icon: ['fas', 'sync'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'reset',
        type: 'button',
        buttonLabel: 'Reset',
        secondary: true,
        resets: true,
      }
    },
    {
      label: 'Primary button',
      description: 'Button with primary color',
      icon: ['fas', 'star'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'primary_btn',
        type: 'button',
        buttonLabel: 'Button',
      }
    },
    {
      label: 'Secondary button',
      description: 'Button with gray color',
      icon: ['fas', 'plus'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'secondary_btn',
        type: 'button',
        buttonLabel: 'Button',
        secondary: true,
      }
    },
    {
      label: 'Danger button',
      description: 'Button with danger color',
      icon: ['fas', 'exclamation-triangle'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'danger_btn',
        type: 'button',
        buttonLabel: 'Button',
        danger: true,
      }
    },
    {
      label: 'H1 header',
      description: 'HTML <h1> tag',
      icon: ['fas', 'h1'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'h1',
        type: 'static',
        content: '<h1 style="font-size: 36px; font-weight: 600; line-height: 1.5;">Lorem ipsum dolor</h1>',
      }
    },
    {
      label: 'H2 header',
      description: 'HTML <h2> tag',
      icon: ['fas', 'h2'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'h2',
        type: 'static',
        content: '<h2 style="font-size: 30px; font-weight: 600; line-height: 1.5;">Lorem ipsum dolor</h2>',
      }
    },
    {
      label: 'H3 header',
      description: 'HTML <h3> tag',
      icon: ['fas', 'h3'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'h3',
        type: 'static',
        content: 'Lorem ipsum dolor',
        content: '<h3 style="font-size: 24px; font-weight: 600; line-height: 1.5;">Lorem ipsum dolor</h3>',
      }
    },
    {
      label: 'H4 header',
      description: 'HTML <h4> tag',
      icon: ['fas', 'h4'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'h4',
        type: 'static',
        content: 'Lorem ipsum dolor',
        content: '<h4 style="font-size: 18px; font-weight: 600; line-height: 1.5;">Lorem ipsum dolor</h4>',
      }
    },
    {
      label: 'Paragraph',
      description: 'HTML <p> tag',
      icon: ['fas', 'paragraph'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'p',
        type: 'static',
        content: '<p>Lorem ipsum dolor<p>',
      }
    },
    {
      label: 'Quote',
      description: 'HTML <quote> tag',
      icon: ['fas', 'quote-left'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'quote',
        type: 'static',
        content: '<quote style="border-left: 3px #c2c3c4 solid; padding: 4px 0px 4px 12px; font-style: italic;">Lorem ipsum dolor</quote>',
      }
    },
    {
      label: 'Image',
      description: 'HTML <img> tag',
      icon: ['fas', 'image-polaroid'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'image',
        type: 'static',
        content: '<img src="https://vueform.com/images/logo.svg" alt="Image" title="Image" />',
      }
    },
    {
      label: 'Link',
      description: 'HTML <a> tag',
      icon: ['fas', 'external-link-square'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'link',
        type: 'static',
        content: '<a href="https://" style="border-bottom: 1px dotted currentColor;">Link</a>',
      }
    },
    {
      label: 'Divider',
      description: 'HTML <hr> tag',
      icon: ['fas', 'horizontal-rule'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'divider',
        type: 'static',
        content: '<hr style="border-color: #d1d5db; margin-top: 16px; padding-bottom: 16px;" />',
      }
    },
    {
      label: 'Static HTML',
      description: 'Plain HTML element',
      icon: ['fas', 'code'], // or: /path/to/img
      type: 'static',
      schema: {
        name: 'static',
        type: 'static',
        content: '<b>Lorem ipsum dolor</b>',
      }
    },
    {
      label: 'Object',
      description: 'Object element with two columns',
      icon: ['fas', 'object'], // or: /path/to/img
      type: 'structure',
      disabled: true,
      schema: {
        name: 'object',
        type: 'static',
      }
    },
    {
      label: '2 columns',
      description: 'Object element with two columns',
      icon: ['fas', 'columns-2'], // or: /path/to/img
      type: 'structure',
      disabled: true,
      schema: {
        name: '2_columns',
        type: 'static',
      }
    },
    {
      label: '3 columns',
      description: 'Object element with three columns',
      icon: ['fas', 'columns-3'], // or: /path/to/img
      type: 'structure',
      disabled: true,
      schema: {
        name: '3_columns',
        type: 'static',
      }
    },
    {
      label: '4 columns',
      description: 'Object element with four columns',
      icon: ['fas', 'columns-4'], // or: /path/to/img
      type: 'structure',
      disabled: true,
      schema: {
        name: '4_columns',
        type: 'static',
      }
    },
    {
      label: 'List',
      description: 'Repeatable single element',
      icon: ['fas', 'list'], // or: /path/to/img
      type: 'structure',
      disabled: true,
      schema: {
        name: 'list',
        type: 'static',
      }
    },
    {
      label: 'Nested list',
      description: 'Repeatable elements in an object',
      icon: ['fas', 'th-list'], // or: /path/to/img
      type: 'structure',
      disabled: true,
      schema: {
        name: 'nested_list',
        type: 'static',
      }
    },
  ],
}
```

### Custom Config

Custom configuration can be applied to `<VueformBuilder>` individually, that will extend the default `builder.config.js` values:

```vue
<template>
  <VueformBuilder :config="customConfig" />
</template>

<script>
  import { markRaw } from 'vue'
  import CustomBuilderConfig from './path/to/builder.custom.config.js'

  export default {
    data: () => ({
      customConfig: markRaw(CustomBuilderConfig),
    })
  }
</script>
```

## Upcoming Features

- adding custom elements with custom configuration props
- nested & repeatable elements (multi-column containers)
- form steps & tabs
- a11y

## Support

Regarding any questions or issues please contact me at adam@vueform.com.