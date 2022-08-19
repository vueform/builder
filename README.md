# Vueform Builder Docs

Documentation for Vueform Builder. Vueform Builder requires a separate license from Vueform - [learn more](https://vueform.com/builder).

## Table

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

Vueform Builder can be configured via `builder.config.js`:

```js
// builder.config.js

export default {
  // config options
}
```

### Settings

The following options are for configuring different aspects of the builder's layout.

```js
// builder.config.js

export default {
  storagePrefix: null, // prefixes localStorage keys
}
```

### Layout

The following options are for configuring different aspects of the builder's layout.

```js
// builder.config.js

export default {
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
  leftPanel: ['elements'],
  rightPanel: ['form', 'theme', 'export'],
}
```

### Elements

The following options configure the available elements & element categories.

```js
// builder.config.js

export default {
  // Element categories (set to `false` to hide)
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

  // List of element types to include
  elements: [
    'text',
    'number',
    'email',
    'phone',
    'password',
    'url',
    'location',
    'textarea',
    'editor',
    'checkbox',
    'checkboxgroup',
    'checkboxBlocks',
    'checkboxTabs',
    'radio',
    'radiogroup',
    'radioBlocks',
    'radioTabs',
    'toggle',
    'select',
    'multiselect',
    'tags',
    'date',
    'datetime',
    'time',
    'dates',
    'dateRange',
    'slider',
    'rangeSlider',
    'verticalSlider',
    'file',
    'multifile',
    'image',
    'multiImage',
    'gallery',
    'hidden',
    'submit',
    'reset',
    'primaryButton',
    'secondaryButton',
    'dangerButton',
    'h1',
    'h2',
    'h3',
    'h4',
    'p',
    'quote',
    'img',
    'link',
    'divider',
    'html',
    'container',
    'container2',
    'container3',
    'container4',
    'list',
    'nestedList',
  ],

  // List of element types to exclude
  excludeElements: [],
}
```

### Form settings panel

The following options can be used to disable form settings config options.

```js
// builder.config.js

export default {
  form: {
    props: {
      properties: {
        name: true,
        width: true,
        nesting: true,
      },
      submission: {
        endpoint: true,
        method: true,
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
  },
}
```

### Theme settings panel

The following options can be used to disable theme config options.

```js
// builder.config.js

export default {
  theme: {
    props: {
      theme: {
        theme: true,
      },
      tools: {
        tools: true,
      },
      colors: {
        primary: true,
        'primary-darker': true,
        'color-on-primary': true,
        danger: true,
        'danger-lighter': true,
        success: true,
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
        gutter: true,
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
        hover: true,
        'color-input-hover': true,
        'bg-input-hover': true,
        'border-color-input-hover': true,
        'shadow-input-hover': true,
        focus: true,
        'color-input-focus': true,
        'color-floating-focus': true,
        'bg-input-focus': true,
        'border-color-input-focus': true,
        'shadow-input-focus': true,
        danger: true,
        'color-input-danger': true,
        'color-floating-danger': true,
        'bg-input-danger': true,
        'border-color-input-danger': true,
        success: true,
        'color-input-success': true,
        'color-floating-success': true,
        'bg-input-success': true,
        'border-color-input-success': true,
        disabled: true,
        'color-disabled': true,
        'bg-disabled': true,
        'floating-top': true,
        'space-addon': true,
        'bg-addon': true,
        'color-addon': true,
      },
      select: {
        dropdown: true,
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
        radio: true,
        'border-width-radio': true,
        checkbox: true,
        'border-width-checkbox': true,
        'radius-checkbox': true,
        tabs: true,
        'py-group-tabs': true,
        'px-group-tabs': true,
        blocks: true,
        'py-group-blocks': true,
        'px-group-blocks': true,
      },
      slider: {
        'slider-height': true,
        'slider-height-vertical': true,
        'radius-slider': true,
        handle: true,
        'slider-handle-size': true,
        'bg-slider-handle': true,
        tooltip: true,
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
        handle: true,
        'bg-toggle-handle': true,
      },
      images: {
        image: true,
        'radius-image': true,
        gallery: true,
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
        secondary: true,
        'color-btn-secondary': true,
        'bg-btn-secondary': true,
        'border-color-btn-secondary': true,
        danger: true,
        'color-btn-danger': true,
        'bg-btn-danger': true,
        'border-color-btn-danger': true,
      },
    },
  },
}
```

### Export settings panel

The following options can be used to disable export config options.

```js
// builder.config.js

export default {
  export: {
    props: {
      export: {
        output: true,
        api: true,
        theme: true,
        download: true,
      },
    },
  },
}
```

### Element settings panel

Element settings are a bit more complex than form, theme or export. Options can be disabled for different elements under `element.props`. This object has an item for each element type and a special one, called `default`.

```js
// builder.config.js

export default {
  element: {
    props: {
      default: {
        // ...
      },
      text: {
        // ...
      },
      textarea: {
        // ...
      },
      // ...
    },
  },
}
```

The `default` contains all the options of all the elements and can be used to disable properties globally, without having to go through each element and eg. disabling conditions for each.

The `{ELEMENT_NAME}` sections contain configuration options for only that specific element. These can be used to disable config options for certain elements only and to override `default`.

> Note: certain config options like `validation` are coupled and can only disabled as a whole. This might change in future releases.

Here's the complete config for element props:

```js
// builder.config.js

export default {
  element: {
    props: {
      default: {
        properties: {
          type: true,
          name: true,
          inputType: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
          meta: true,
        },
        data: {
          default: true,
          submit: true,
          items: true,
          selectItems: true,
          object: true,
          nested: true,
        },
        decorators: {
          tooltip: true,
          addons: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
          view: true,
        },
        validation: {
          fieldName: true,
          validation: true,
          fileRules: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          autocomplete: true,
          attrs: true,
        },
        textarea: {
          autogrow: true,
          rows: true,
        },
        file: {
          endpoint: true,
          accept: true,
          tools: true,
          file: true,
          fileAccept: true,
          fileEndpoints: true,
          params: true,
          multifile: true,
        },
        checkbox: {
          text: true,
          boolValue: true,
        },
        radio: {
          text: true,
          radio: true,
        },
        toggle: {
          text: true,
          labels: true,
          boolValue: true,
        },
        select: {
          native: true,
          searchHeader: true,
          search: true,
          strictSearch: true,
          trackBy: true,
          inputType: true,
          autocomplete: true,
          create: true,
          behavior: true,
          ui: true,
          optionLimit: true,
          noOptions: true,
          max: true,
          multipleLabel: true,
        },
        date: {
          date: true,
          dateFormats: true,
          dateConstraints: true,
          dateMode: true,
        },
        slider: {
          slider: true,
          tooltips: true,
          tooltipPosition: true,
          format: true,
        },
        button: {
          button: true,
        },
        content: {
          static: true,
        },
      },
      text: {
        properties: {
          type: true,
          name: true,
          inputType: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          addons: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          autocomplete: true,
          attrs: true,
        },
      },
      number: {
        properties: {
          type: true,
          name: true,
          inputType: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          addons: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          autocomplete: true,
          attrs: true,
        },
      },
      email: {
        properties: {
          type: true,
          name: true,
          inputType: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          addons: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          autocomplete: true,
          attrs: true,
        },
      },
      phone: {
        properties: {
          type: true,
          name: true,
          inputType: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          addons: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          autocomplete: true,
          attrs: true,
        },
      },
      password: {
        properties: {
          type: true,
          name: true,
          inputType: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          addons: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          autocomplete: true,
          attrs: true,
        },
      },
      url: {
        properties: {
          type: true,
          name: true,
          inputType: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          addons: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          autocomplete: true,
          attrs: true,
        },
      },
      location: {
        properties: {
          type: true,
          name: true,
          inputType: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          addons: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          autocomplete: true,
          attrs: true,
        },
      },
      textarea: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
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
          addons: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
          attrs: true,
        },
      },
      editor: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        file: {
          endpoint: true,
          accept: true,
          tools: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      checkbox: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        checkbox: {
          text: true,
          boolValue: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      checkboxgroup: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          items: true,
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      checkboxBlocks: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          items: true,
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      checkboxTabs: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          items: true,
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      radio: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        radio: {
          text: true,
          radio: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      radiogroup: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          items: true,
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      radioBlocks: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          items: true,
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      radioTabs: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          items: true,
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      toggle: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        toggle: {
          text: true,
          labels: true,
          boolValue: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      select: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        select: {
          native: true,
          searchHeader: true,
          search: true,
          strictSearch: true,
          trackBy: true,
          inputType: true,
          autocomplete: true,
          create: true,
          behavior: true,
          ui: true,
          optionLimit: true,
          noOptions: true,
        },
        data: {
          selectItems: true,
          default: true,
          object: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
          attrs: true,
        },
      },
      multiselect: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        select: {
          native: true,
          searchHeader: true,
          search: true,
          strictSearch: true,
          trackBy: true,
          inputType: true,
          autocomplete: true,
          create: true,
          behavior: true,
          ui: true,
          optionLimit: true,
          max: true,
          multipleLabel: true,
          noOptions: true,
        },
        data: {
          selectItems: true,
          default: true,
          object: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
          attrs: true,
        },
      },
      tags: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        select: {
          searchHeader: true,
          search: true,
          strictSearch: true,
          trackBy: true,
          inputType: true,
          autocomplete: true,
          create: true,
          behavior: true,
          ui: true,
          optionLimit: true,
          max: true,
          noOptions: true,
        },
        data: {
          selectItems: true,
          default: true,
          object: true,
          submit: true,
        },
        decorators: {
          tooltip: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
          attrs: true,
        },
      },
      date: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        date: {
          date: true,
          dateFormats: true,
          dateConstraints: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          addons: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
        },
      },
      datetime: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        date: {
          date: true,
          dateFormats: true,
          dateConstraints: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          addons: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
        },
      },
      time: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        date: {
          date: true,
          dateFormats: true,
          dateConstraints: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          addons: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
        },
      },
      dates: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        date: {
          dateMode: true,
          dateFormats: true,
          dateConstraints: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          addons: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
        },
      },
      dateRange: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          placeholder: true,
          description: true,
        },
        date: {
          dateMode: true,
          dateFormats: true,
          dateConstraints: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          addons: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          readonly: true,
          id: true,
        },
      },
      slider: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        slider: {
          slider: true,
          tooltips: true,
          tooltipPosition: true,
          format: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      rangeSlider: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        slider: {
          slider: true,
          tooltips: true,
          tooltipPosition: true,
          format: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      verticalSlider: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        slider: {
          slider: true,
          tooltips: true,
          tooltipPosition: true,
          format: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      file: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        file: {
          file: true,
          fileAccept: true,
          fileEndpoints: true,
          params: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      multifile: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        file: {
          multifile: true,
        },
        data: {
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          fileRules: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      image: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        file: {
          file: true,
          fileAccept: true,
          fileEndpoints: true,
          params: true,
        },
        data: {
          default: true,
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      multiImage: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        file: {
          multifile: true,
        },
        data: {
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          fileRules: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      gallery: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        file: {
          multifile: true,
        },
        data: {
          submit: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          view: true,
          size: true,
          columns: true,
        },
        validation: {
          fieldName: true,
          fileRules: true,
          validation: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      hidden: {
        properties: {
          type: true,
          name: true,
          meta: true,
        },
        data: {
          default: true,
          submit: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          id: true,
          attrs: true,
        },
      },
      submit: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        button: {
          button: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      reset: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        button: {
          button: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      primaryButton: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        button: {
          button: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      secondaryButton: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        button: {
          button: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      dangerButton: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        button: {
          button: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
        attributes: {
          disabled: true,
          id: true,
        },
      },
      h1: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      h2: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      h3: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      h4: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      p: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      quote: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      img: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      link: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      divider: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      html: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        content: {
          static: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      container: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          nested: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      container2: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          nested: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      container3: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          nested: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      container4: {
        properties: {
          type: true,
          name: true,
          label: true,
          tooltip: true,
          description: true,
        },
        data: {
          nested: true,
        },
        decorators: {
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      list: {
        properties: {
          type: true,
          name: true,
          label: true,
        },
        decorators: {
          tooltip: true,
          description: true,
          before: true,
          between: true,
          after: true,
        },
        layout: {
          size: true,
          columns: true,
        },
        conditions: {
          conditions: true,
        },
      },
      nestedList: {},
    },
  },
}
```

### Themes

Available themes (in Theme panel) can be configured with the following option:

```js
// builder.config.js

export default {
  themes: [
    {
      label: 'Official themes',
      themes: [
        {
          label: 'Vueform',
          default: true,
          vars: {
            primary: '#07bf9b',
            'primary-darker': '#06ac8b',
            'color-on-primary': '#ffffff',
            danger: '#ef4444',
            'danger-lighter': '#fee2e2',
            success: '#10b981',
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
            gutter: '1rem',
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
            'border-width-btn': '1px',
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
          },
        },
        {
          label: 'Bootstrap',
          vars: {
            primary: '#007bff',
            'primary-darker': '#0056b3',
            'color-on-primary': '#ffffff',
            danger: '#dc3545',
            'danger-lighter': '#f9dcdf',
            success: '#28a745',
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
            gutter: '15px',
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
          },
        },
        {
          label: 'Material',
          vars: {
            primary: '#6200ee',
            'primary-darker': '#5000cc',
            'color-on-primary': '#ffffff',
            danger: '#b00020',
            'danger-lighter': '#f9e5e8',
            success: '#4caf50',
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
            gutter: '1rem',
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
          },
        },
      ],
    },
  ],
}
```

### Custom Config

Custom configuration can be applied to `<VueformBuilder>` individually which will be used instead of the default `builder.config.js`:

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