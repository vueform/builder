import {
  AddonsField,
  AddTextField,
  AlignField,
  AlignField_toggle,
  AlignField_checkbox,
  BaseElementField,
  BaseMultilingualElementField,
  ButtonLabelField,
  ConditionsField,
  ContentField,
  DefaultField_slider,
  DefaultField_toggle,
  DefaultField_checkbox,
  DescriptionField,
  DirectionField,
  DisabledField,
  DragAndDropField,
  FieldNameField,
  FileAcceptField,
  FullField,
  Hour24Field,
  LabelField,
  LabelsField,
  MaxField,
  MinField,
  NameField,
  PageButtonsField,
  PageConditionsField,
  PageLabelField,
  PageLabelsField,
  PlaceholderField,
  ReadonlyField,
  SecondsField,
  SizeField,
  SpaceField,
  StepField,
  TextField,
  TooltipFormatField,
  TypeField,
  ValidationField,
  ViewField,
  IncludeCountriesField,
  ExcludeCountriesField,

  FontsField,
  AutoloadField,
  ModesField,
  ColorsField,
  InvertColorsField,
  MaxSizeField,
  MaxFontSizeField,
  MinFontSizeField,
  CanClearField,
  CanDropField,
  CanUndoField,
  LineField,
  HeightField,
  MaxWidthField,
  UploadWidthField,
  UploadHeightField,
  AcceptImagesField,
  TitleSignatureDrawField,
  TitleSignatureTypeField,
  TitleSignatureUploadField,
  PlaceholderField_signature,
} from './../'

/**
 * Helpers
 */
const imageMimes = [
  'image/*', 'image/avif', 'image/bmp', 'image/gif', 'image/heic', 'image/jpeg', 'image/png',
  'image/svg+xml', 'image/tiff', 'image/vnd.microsoft.icon', 'image/webp',
]

const imageExtensions = [
  'avif', 'bmp', 'gif', 'heic', 'jpeg', 'jpg', 'png', 'svg', 'tiff', 'webp'
]

const rules = [
  'accepted',
  'active_url',
  'after',
  'after_or_equal',
  'alpha',
  'alpha_dash',
  'alpha_num',
  'array',
  'before',
  'before_or_equal',
  'boolean',
  'completed',
  'date',
  'date_equals',
  'date_format',
  'different',
  'digits',
  'digits_between',
  'dimensions',
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'ratio',
  'distinct',
  'email',
  'exists',
  'file',
  'gt',
  'gte',
  'image',
  'in',
  'in_array',
  'integer',
  'ip',
  'ipv4',
  'ipv6',
  'json',
  'lt',
  'lte',
  'max',
  'mimetypes',
  'mimes',
  'min',
  'not_in',
  'not_regex',
  'nullable',
  'numeric',
  'regex',
  'required',
  'same',
  'size',
  'string',
  'timezone',
  'unique',
  'url',
  'uuid',
]

const onlyRules = (only) => {
  return rules.reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: only.indexOf(curr) !== -1,
    }
  }, {})
}

/**
 * Config fields
 */
const InputTypeField_simple = class extends BaseElementField {
  get schema () {
    return {
      inputType: {
        type: 'hidden',
        meta: true,
      }
    }
  }
}

const PhoneMask_simple = class extends BaseElementField {
  objectValue = true

  get schema () {
    return {
      mask: {
        type: 'select',
        label: 'Number type',
        columns: { label: 4 },
        object: true,
        valueProp: 'mask',
        native: false,
        items: [
          { mask: '{+1} (000) 000 0000', label: 'US Phone number', placeholder: true },
          { mask: '+0000000[00000000]', label: 'International', placeholder: true },
        ]
      }
    }
  }
}

const ItemsField_simple = class extends BaseMultilingualElementField
{
  name = 'ItemsField'

  get schema () {
    return {
      items: {
        type: this.multilingual ? 't-textarea' : 'textarea',
        placeholder: 'First item\nSecond item',
        floating: false,
        label: 'Enter one option per line',
        addClasses: {
          ElementLabel: {
            container: 'order-2 p-0 mt-1.5 text-gray-500 dark:text-dark-400'
          }
        },
        formatLoad(v) {
          v = Array.isArray(v) ? v : Object.values(v)

          return v.join('\n')
        },
        formatData(n, v) {
          return {
            [n]: v.split('\n').filter(v => v !== '')
          }
        },
        onMounted: (el$) => {
          setTimeout(() => {
            el$.autosize()
          }, 0)
        },
        onUpdated: (el$) => {
          setTimeout(() => {
            el$.autosize()
          }, 0)
        },
      },
    }
  }
}

const SearchField_simple = class extends BaseElementField
{
  name = 'SearchField'

  get schema () {
    return {
      search: {
        type: 'toggle',
        label: 'Enable search',
        columns: { label: 6 },
        presets: ['prop-toggle'],
      }
    }
  }
}

const TextField_simple_checkbox = class extends BaseElementField
{
  name = 'TextField'

  get schema () {
    return {
      text: {
        type: this.multilingual ? 't-editor' : 'editor',
        hideTools: [
          'heading', 'quote', 'code', 'attach', 'bullet-list', 'number-list',
          'decrease-nesting', 'increase-nesting', 'undo', 'redo', 'strike'
        ],
        label: 'Text',
        placeholder: this.multilingual && this.locale.value !== this.fallbackLocale ? `Defaults to ${this.fallbackLocaleName}` : undefined,
        floating: false,
        columns: { label: 4 },
        presets: ['prop-multiline'],
        rows: 1,
        onMounted: (el$) => {
          setTimeout(() => {
            el$.autosize()
          }, 0)
        },
        onUpdated: (el$) => {
          setTimeout(() => {
            el$.autosize()
          }, 0)
        },
      }
    }
  }
}

const CreateField_simple = class extends BaseElementField
{
  name = 'CreateField'
  
  watchers = {
    [`${this.section}.create`]: [
      [
        ['search'], (el$, value) => {
          el$.reset()
        }
      ],
    ]
  }

  get schema () {
    return {
      create: {
        type: 'toggle',
        label: 'Allow new option',
        info: 'New option can be added by hitting `enter` after typing a non-existing option.',
        columns: { label: 6 },
        presets: ['prop-toggle'],
        conditions: [
          [`${this.section}.search`, true]
        ]
      }
    }
  }
}

const NoResultsField_simple = class extends BaseMultilingualElementField
{
  name = 'NoResultsField'
  
  watchers = {
    [`${this.section}.noResultsText`]: [
      [
        ['search'], (el$, value) => {
          el$.reset()
        }
      ],
    ]
  }

  get schema () {
    return {
      noResultsText: {
        type: this.multilingual ? 't-textarea' : 'textarea',
        label: 'No results text',
        info: 'Displayed when the search does not give any result.',
        placeholder: this.multilingual && this.locale.value !== this.fallbackLocale ? `Defaults to ${this.fallbackLocaleName}` : 'No options found',
        floating: false,
        rows: 1,
        columns: { label: 6 },
        conditions: [
          [`${this.section}.search`, true]
        ],
        onMounted: (el$) => {
          setTimeout(() => {
            el$.autosize()
          }, 0)
        },
        onUpdated: (el$) => {
          setTimeout(() => {
            el$.autosize()
          }, 0)
        },
      }
    }
  }
}

const DateFormatField_simple = class extends BaseElementField
{
  name = 'DateFormatField'

  get schema () {
    return {
      displayFormat: {
        type: 'select',
        label: 'Date format',
        items: [
          'DD/MM/YYYY',
          'DD-MM-YYYY',
          'DD.MM.YYYY',
          'MM/DD/YYYY',
          'MM-DD-YYYY',
          'MM.DD.YYYY',
          'YYYY/MM/DD',
          'YYYY-MM-DD',
          'YYYY.MM.DD',
        ],
        floating: false,
        columns: { label: 5 },
      }
    }
  }
}

const DateFormatField_datetime_simple = class extends BaseElementField
{
  name = 'DateFormatField'

  get schema () {
    return {
      displayFormat: {
        type: 'select',
        label: 'Date format',
        items: [
          'DD/MM/YYYY HH:mm',
          'DD-MM-YYYY HH:mm',
          'DD.MM.YYYY HH:mm',
          'MM/DD/YYYY HH:mm',
          'MM-DD-YYYY HH:mm',
          'MM.DD.YYYY HH:mm',
          'YYYY/MM/DD HH:mm',
          'YYYY-MM-DD HH:mm',
          'YYYY.MM.DD HH:mm',
        ],
        floating: false,
        columns: { label: 5 },
      }
    }
  }
}

const DateRestrictionsField_simple = class extends BaseElementField
{
  name = 'DateRestrictionsField'

  wrapped = true

  get schema () {
    return {
      dateRestrictions: {
        type: 'object',
        schema: {
          min: {
            type: 'date',
            label: 'Min date',
            columns: { label: 5 },
            addClass: 'vfb-config-datepicker',
          },
          max: {
            type: 'date',
            label: 'Max date',
            columns: { label: 5 },
            addClass: 'vfb-config-datepicker',
          },
          disables: {
            type: 'dates',
            label: 'Disabled dates',
            columns: { label: 5 },
            addClass: 'vfb-config-datepicker',
          }
        }
      }
    }
  }
}

const TooltipPositionField_simple = class extends BaseElementField
{
  name = 'TooltipPositionField'

  get schema () {
    return {
      tooltipPosition: {
        type: 'radiogroup',
        presets: ['tabs-tiny', 'tabs-2'],
        view: 'tabs',
        items: {
          top: 'Top',
          bottom: 'Bottom',
        },
        label: 'Tooltip position',
        columns: { label: 6 },
        default: 'top',
      },
    }
  }
}

const FileAcceptField_simple_image = class extends BaseElementField
{
  name = 'FileAcceptField'

  wrapped = true

  get schema () {
    return {
      file_accept_wrapper: {
        type: 'object',
        schema: {
          subtitle: {
            type: 'static',
            content: 'Accept',
            presets: ['prop-subtitle'],
          },
          acceptMimes: {
            type: 'tags',
            label: 'MIME types',
            columns: { label: 4 },
            appendNewOption: false,
            info: 'Allowed MIME types extensions.',
            create: true,
            closeOnSelect: false,
            replaceClasses: {
              ElementLabel: {
                container: {
                  'items-center': 'items-start form-pt-input-border'
                }
              },
              TagsElement: {
                select: {
                  tag: {
                    'whitespace-nowrap': 'whitespace-normal break-all'
                  }
                }
              }
            },
            items: imageMimes,
            object: true,
            conditions: [
              [`${this.section}.file_accept_wrapper.accept`, []]
            ]
          },
          accept: {
            type: 'tags',
            label: 'Extensions',
            columns: { label: 4 },
            appendNewOption: false,
            info: 'Allowed file extensions.',
            create: true,
            closeOnSelect: false,
            replaceClasses: {
              ElementLabel: {
                container: {
                  'items-center': 'items-start form-pt-input-border'
                }
              },
            },
            items: imageExtensions,
            object: true,
            conditions: [
              [`${this.section}.file_accept_wrapper.acceptMimes`, []]
            ]
          }
        }
      }
    }
  }

  save(value) {
    let accept = [].concat((value.acceptMimes || []).map(v => v.value), (value.accept || []).map(v => `.${v.value}`))

    if (accept.length) {
      this.update({
        accept: accept.join(','),
      })
    } else {
      this.update(null, 'accept')
    }
  }

  load(data) {
    let load = {}

    if (data.accept) {
      load.acceptMimes = data.accept.split(',')
        .filter(v => v.charAt(0) !== '.')
        .map(v => ({ value: v, label: v }))

      load.accept = data.accept.split(',').filter(v =>  v.charAt(0) === '.')
        .map(v => v.replace('.', ''))
        .map(v => ({ value: v, label: v }))
    }

    return {
      file_accept_wrapper: load
    }
  }
}

const TagField_simple = class extends BaseElementField {
  get schema () {
    return {
      tag: {
        type: 'hidden',
        meta: true,
      }
    }
  }
}

const ContentField_p = class extends BaseElementField {
  get schema () {
    return {
      content: {
        type: 'editor',
        placeholder: 'Write here...',
        floating: 'Content',
        hideTools: [
          'heading', 'quote', 'code', 'attach', 'bullet-list', 'number-list',
          'decrease-nesting', 'increase-nesting', 'undo', 'redo', 'strike'
        ]
      },
    }
  }
}

const ImgField_simple = class extends BaseElementField {
  name = 'ImgField'

  wrapped = true

  get schema () {
    return {
      img: {
        type: 'object',
        schema: {
          src: {
            type: 'textarea',
            label: 'Image url',
            placeholder: 'https://your-image-url',
            floating: false,
            columns: { label: 4 },
            rows: 1,
            onMounted: (el$) => {
              setTimeout(() => {
                el$.autosize()
              }, 0)
            },
            onUpdated: (el$) => {
              setTimeout(() => {
                el$.autosize()
              }, 0)
            },
          },
          width: {
            type: 'text',
            label: 'Width',
            placeholder: 'auto',
            floating: false,
            addons: {
              after: 'px',
            },
            columns: { label: 8 },
          },
          height: {
            type: 'text',
            label: 'Height',
            info: 'Will not affect actual height, it\'s only for SEO compilance. Height is calculated based on width to avoid distortion.',
            placeholder: 'auto',
            floating: false,
            addons: {
              after: 'px',
            },
            columns: { label: 8 },
          }
        }
      }
    }
  }
}

const ImgPropsField_simple = class extends BaseElementField {
  name = 'ImgPropsField'

  wrapped = true

  get schema () {
    return {
      props: {
        type: 'object',
        schema: {
          alt: {
            type: 'textarea',
            rows: 1,
            label: 'Alt. text',
            info: 'Text to render when the image is not available.',
            columns: { label: 4 },
            onMounted: (el$) => {
              setTimeout(() => {
                el$.autosize()
              }, 0)
            },
            onUpdated: (el$) => {
              setTimeout(() => {
                el$.autosize()
              }, 0)
            },
          },
          title: {
            type: 'textarea',
            rows: 1,
            label: 'Title',
            info: 'Tooltip text when you hover the image.',
            columns: { label: 4 },
            onMounted: (el$) => {
              setTimeout(() => {
                el$.autosize()
              }, 0)
            },
            onUpdated: (el$) => {
              setTimeout(() => {
                el$.autosize()
              }, 0)
            },
          },
        }
      }
    }
  }
}

const LinkField_simple = class extends BaseElementField {
  name = 'LinkField'

  wrapped = true

  get schema () {
    return {
      link: {
        type: 'object',
        schema: {
          href: {
            type: 'textarea',
            rows: 1,
            label: 'Link',
            placeholder: 'https://...',
            floating: false,
            columns: { label: 4 },
            onMounted: (el$) => {
              setTimeout(() => {
                el$.autosize()
              }, 0)
            },
            onUpdated: (el$) => {
              setTimeout(() => {
                el$.autosize()
              }, 0)
            },
          },
          target: {
            type: 'select',
            label: 'Open in',
            default: '_self',
            floating: false,
            columns: { label: 4 },
            items: {
              '_self': 'Same tab',
              '_blank': 'New tab',
            }
          },
        }
      }
    }
  }
}

const ColumnsField_simple = class extends BaseElementField {
  name = 'ColumnsField'

  wrapped = true

  get schema () {
    return {
      columns_wrapper: {
        type: 'object',
        schema: {
          wrapper: {
            type: 'toggle',
            label: 'Shrink element',
            presets: ['prop-toggle'],
            columns: {
              label: 8
            },
          },
          shrink: {
            type: 'radiogroup',
            presets: ['tabs-tiny', `tabs-3`],
            view: 'tabs',
            label: 'Element size',
            items: {
              3: '1/4',
              4: '1/3',
              6: '1/2',
            },
            columns: {
              label: 8
            },
            conditions: [
              [`${this.section}.columns_wrapper.wrapper`, true]
            ]
          },
          label: {
            type: 'radiogroup',
            presets: ['tabs-tiny', `tabs-2`, 'separator-top'],
            view: 'tabs',
            label: 'Label position',
            items: [
              'Left',
              'Top',
            ],
            columns: {
              label: 8
            },
          },
          size: {
            type: 'radiogroup',
            presets: ['tabs-tiny', `tabs-3`],
            view: 'tabs',
            label: 'Label size',
            items: {
              3: '1/4',
              4: '1/3',
              6: '1/2',
            },
            columns: {
              label: 8
            },
            conditions: [
              [`${this.section}.columns_wrapper.label`, 'Left']
            ]
          },
        }
      }
    }
  }

  save(value, old, name, el$) {
    let update = {}
    let remove = []

    let label = value.label === 'Left' ? (value.size || 6) : null
    let wrapper = value.wrapper ? (value.shrink || 6) : null

    if (label || wrapper) {
      update.columns = {
        ...(this.elementSchema.columns || {}),
      }

      if (label) {
        update.columns.label = label || 6
      } else {
        delete update.columns.label
      }

      if (wrapper) {
        update.columns.wrapper = wrapper || 6
      } else {
        delete update.columns.wrapper
      }
    } else {
      if (this.elementSchema.columns?.container) {
        let clone = this.elementSchema.columns

        delete clone.label
        delete clone.wrapper

        update.columns = {
          ...clone,
        }
      } else {
        remove.push('columns')
      }
    }

    this.update(update, remove)
  }

  load(data) {
    let load = {
      columns_wrapper: {}
    }

    load.columns_wrapper.label = this.elementSchema.columns?.label ? 'Left' : 'Top'
    load.columns_wrapper.size = this.elementSchema.columns?.label || 6
    load.columns_wrapper.wrapper = this.elementSchema.columns?.wrapper || false
    load.columns_wrapper.shrink = this.elementSchema.columns?.wrapper || 6

    return load
  }
}

/**
 * Element definitions
 */
const text = {
  label: 'Short text',
  description: 'Single line input',
  icon: ['fas', 'font-case'],
  category: 'fields',
  schema: {
    type: 'text',
    label: 'Text',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        inputType: { type: InputTypeField_simple },
        label: { type: LabelField },
        description: { type: DescriptionField },
        placeholder: { type: PlaceholderField },
        addons: { type: AddonsField },
        disabled: { type: DisabledField },
        readonly: { type: ReadonlyField },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description', 'placeholder'],
      ['addons'],
      ['disabled', 'readonly',]
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const number = {
  ...text,
  label: 'Number',
  description: 'Input field that only allows numbers',
  icon: ['fas', 'number'],
  category: 'fields',
  schema: {
    type: 'text',
    inputType: 'number',
    rules: ['nullable', 'numeric'],
    autocomplete: 'off',
    label: 'Number',
  },
}

const email = {
  ...text,
  label: 'Email',
  description: 'Input field that expects an email',
  icon: ['fas', 'at'],
  category: 'fields',
  schema: {
    type: 'text',
    inputType: 'email',
    rules: ['nullable', 'email'],
    label: 'Email',
  },
}

const phone = {
  label: 'Phone',
  description: 'Phone number with country selector',
  icon: ['fas', 'phone-rotary'],
  category: 'fields',
  schema: {
    type: 'phone',
    label: 'Phone',
    allowIncomplete: true,
    unmask: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        placeholder: { type: PlaceholderField },
      },
    },
    options: {
      name: 'options',
      label: 'Phone options',
      fields: {
        include: { type: IncludeCountriesField, },
        exclude: { type: ExcludeCountriesField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const signature = {
  label: 'Signature',
  description: 'Draw, type or upload signature',
  icon: ['fas', 'signature'],
  category: 'fields',
  schema: {
    type: 'signature',
    label: 'Signature',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField, },
        label: { type: LabelField, },
        description: { type: DescriptionField, },
        placeholder: { type: PlaceholderField_signature, },
        disabled: { type: DisabledField },
        readonly: { type: ReadonlyField },
      },
    },
    options: {
      name: 'options',
      label: 'Options',
      fields: {
        accept: { type: AcceptImagesField, },
        maxSize: { type: MaxSizeField, },
        height: { type: HeightField, },
        maxWidth: { type: MaxWidthField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description', 'placeholder'],
      ['disabled', 'readonly',]
    ],
    options: [
      ['accept'],
      ['maxSize'],
      ['height', 'maxWidth'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const password = {
  ...text,
  label: 'Password',
  description: 'Input field that hides characters',
  icon: ['fas', 'lock'],
  category: 'fields',
  schema: {
    type: 'text',
    inputType: 'password',
    label: 'Password',
  },
}

const url = {
  ...text,
  label: 'URL',
  description: 'Input field that expects an URL',
  icon: ['fas', 'link'],
  category: 'fields',
  schema: {
    type: 'text',
    inputType: 'url',
    rules: ['nullable', 'url'],
    placeholder: 'eg. http(s)://domain.com',
    floating: false,
    label: 'URL',
  },
}

const location = {
  ...text,
  label: 'Location',
  description: 'Google places location input',
  icon: ['fas', 'map-marker-alt'],
  category: 'fields',
  schema: {
    type: 'location',
    label: 'Location',
  },
}

const textarea = {
  ...text,
  label: 'Long text',
  description: 'Multi-line input',
  icon: ['fas', 'align-left'],
  category: 'fields',
  schema: {
    type: 'textarea',
    label: 'Textarea',
  },
}

const editor = {
  ...text,
  label: 'Text editor',
  description: 'Text editor that allows formatting',
  icon: ['fas', 'italic'],
  category: 'fields',
  schema: {
    type: 'editor',
    label: 'Editor',
    hideTools: [
      'strike',
      'heading',
      'quote',
      'code',
      'bullet-list',
      'number-list',
      'decrease-nesting',
      'increase-nesting',
      'attach',
      'undo',
      'redo',
    ]
  },
}

const checkbox = {
  label: 'Decision box',
  description: 'When something needs to be accepted',
  icon: ['fas', 'check-square'],
  category: 'fields',
  schema: {
    type: 'checkbox',
    text: 'Decision box',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        text: { type: TextField_simple_checkbox, },
        label: { type: LabelField },
        description: { type: DescriptionField },
        disabled: { type: DisabledField },
        default: { type: DefaultField_checkbox, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        align: { type: AlignField_checkbox, },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    },
  },
  separators: {
    properties: [
      ['text', 'label', 'description'],
      ['disabled', 'default'],
    ],
    layout: [
      ['columns'],
      ['align'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const checkboxgroup = {
  label: 'Multiple choice',
  description: 'Accept multiple options',
  icon: ['fas', 'tasks'],
  category: 'fields',
  schema: {
    type: 'checkboxgroup',
    items: [
      'Option 1',
      'Option 2',
      'Option 3',
    ],
    label: 'Multiple choice',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        disabled: { type: DisabledField },
      },
    },
    options: {
      name: 'options',
      label: 'Options',
      fields: {
        items: { type: ItemsField_simple, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        view: { type: ViewField, },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    },
  },
  separators: {
    properties: [
      ['text', 'label', 'description'],
      ['disabled'],
    ],
    layout: [
      ['columns'],
      ['view'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  },
}

const radiogroup = {
  ...checkboxgroup,
  label: 'Single choice',
  description: 'Accept a single option',
  icon: ['fas', 'list-ul'],
  category: 'fields',
  schema: {
    type: 'radiogroup',
    items: [
      'Option 1',
      'Option 2',
      'Option 3',
    ],
    label: 'Single choice',
  },
}

const toggle = {
  label: 'Toggle switch',
  description: 'Toggle / switch button',
  icon: ['fas', 'toggle-on'],
  category: 'fields',
  schema: {
    type: 'toggle',
    text: 'Toggle',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        text: { type: TextField, },
        labels: { type: LabelsField, },
        disabled: { type: DisabledField },
        default: { type: DefaultField_toggle, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        align: { type: AlignField_toggle, },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    },
  },
  separators: {
    properties: [
      ['label', 'description'],
      ['text', 'labels'],
      ['disabled', 'default'],
    ],
    layout: [
      ['columns'],
      ['align'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const select = {
  label: 'Dropdown',
  description: 'Select input',
  icon: ['fas', 'caret-square-down'],
  category: 'fields',
  schema: {
    type: 'select',
    items: [
      'Option 1',
      'Option 2',
      'Option 3',
    ],
    search: true,
    native: false,
    strict: false,
    label: 'Select',
    inputType: 'search',
    autocomplete: 'off',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        placeholder: { type: PlaceholderField },
        search: { type: SearchField_simple, },
        create: { type: CreateField_simple, },
        noResults: { type: NoResultsField_simple, },
        disabled: { type: DisabledField },
      },
    },
    options: {
      name: 'options',
      label: 'Options',
      fields: {
        items: { type: ItemsField_simple, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    },
  },
  separators: {
    properties: [
      ['text', 'label', 'description', 'placeholder'],
      ['search', 'create', 'noResults'],
      ['!', 'disabled'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  },
}

const tags = {
  label: 'Tags',
  description: 'Select multiple tags',
  icon: ['fas', 'tags'],
  category: 'fields',
  schema: {
    type: 'tags',
    closeOnSelect: false,
    search: true,
    strict: false,
    hideSelected: false,
    items: [
      'Option 1',
      'Option 2',
      'Option 3',
    ],
    label: 'Tags',
    inputType: 'search',
    autocomplete: 'off',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        placeholder: { type: PlaceholderField },
        search: { type: SearchField_simple, },
        create: { type: CreateField_simple, },
        noResults: { type: NoResultsField_simple, },
        disabled: { type: DisabledField },
      },
    },
    options: {
      name: 'options',
      label: 'Options',
      fields: {
        items: { type: ItemsField_simple, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    },
  },
  separators: {
    properties: [
      ['text', 'label', 'description', 'placeholder'],
      ['search', 'create', 'noResults'],
      ['!', 'disabled'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  },
}

const date = {
  label: 'Date',
  description: 'Datepicker input',
  icon: ['fas', 'calendar'],
  category: 'fields',
  schema: {
    type: 'date',
    label: 'Date',
    displayFormat: 'DD/MM/YYYY',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        inputType: { type: InputTypeField_simple },
        label: { type: LabelField },
        description: { type: DescriptionField },
        placeholder: { type: PlaceholderField },
        addons: { type: AddonsField },
        displayFormat: { type: DateFormatField_simple },
        restrictions: { type: DateRestrictionsField_simple },
        disabled: { type: DisabledField },
        readonly: { type: ReadonlyField },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description', 'placeholder'],
      ['addons'],
      ['displayFormat'],
      ['restrictions'],
      ['disabled', 'readonly',]
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const datetime = {
  label: 'Date-time',
  description: 'Date & time picker input',
  icon: ['fas', 'datetime'],
  category: 'fields',
  schema: {
    type: 'date',
    label: 'Datetime',
    time: true,
    displayFormat: 'DD/MM/YYYY HH:mm',
    hour24: false,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        inputType: { type: InputTypeField_simple },
        label: { type: LabelField },
        description: { type: DescriptionField },
        placeholder: { type: PlaceholderField },
        addons: { type: AddonsField },
        displayFormat: { type: DateFormatField_datetime_simple },
        hour24: { type: Hour24Field, },
        restrictions: { type: DateRestrictionsField_simple },
        disabled: { type: DisabledField },
        readonly: { type: ReadonlyField },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description', 'placeholder'],
      ['addons'],
      ['displayFormat', 'hour24'],
      ['restrictions'],
      ['disabled', 'readonly',]
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const time = {
  label: 'Time',
  description: 'Time picker input',
  icon: ['fas', 'clock'],
  category: 'fields',
  schema: {
    type: 'date',
    label: 'Time',
    time: true,
    date: false,
    hour24: false,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        inputType: { type: InputTypeField_simple },
        label: { type: LabelField },
        description: { type: DescriptionField },
        placeholder: { type: PlaceholderField },
        addons: { type: AddonsField },
        seconds: { type: SecondsField, },
        hour24: { type: Hour24Field, },
        disabled: { type: DisabledField },
        readonly: { type: ReadonlyField },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description', 'placeholder'],
      ['addons'],
      ['seconds', 'hour24'],
      ['disabled', 'readonly',]
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const dates = {
  ...date,
  label: 'Multiple dates',
  description: 'Date picker that allows multiple dates',
  icon: ['fas', 'dates'],
  category: 'fields',
  schema: {
    type: 'dates',
    label: 'Dates',
  },
}

const dateRange = {
  ...date,
  label: 'Date range',
  description: 'Date picker that allows date range',
  icon: ['fas', 'date-range'],
  category: 'fields',
  schema: {
    type: 'dates',
    label: 'Date range',
    mode: 'range',
  },
}

const slider = {
  label: 'Slider',
  description: 'Horizontal slider',
  icon: ['fas', 'slider'],
  category: 'fields',
  schema: {
    type: 'slider',
    label: 'Slider',
    default: 30,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        direction: { type: DirectionField, },
        position: { type: TooltipPositionField_simple, },
        min: { type: MinField, extend: { placeholder: '0', floating: false }, },
        max: { type: MaxField, extend: { placeholder: '10', floating: false }, },
        step: { type: StepField, extend: { placeholder: '1', floating: false }, },
        tooltipFormat: { type: TooltipFormatField, extend: { conditions: [] } },
        default: { type: DefaultField_slider, extend: { controls: { add: false, sort: false, remove: false, }, } },
        disabled: { type: DisabledField },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description'],
      ['direction', 'position'],
      ['min', 'max', 'step'],
      ['tooltipFormat'],
      ['default'],
      ['disabled'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const rangeSlider = {
  label: 'Range slider',
  description: 'Horizontal slider with range',
  icon: ['fas', 'range-slider'],
  category: 'fields',
  schema: {
    type: 'slider',
    default: [30, 70],
    label: 'Range slider',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        direction: { type: DirectionField, },
        position: { type: TooltipPositionField_simple, },
        min: { type: MinField, extend: { placeholder: '0', floating: false }, },
        max: { type: MaxField, extend: { placeholder: '10', floating: false }, },
        step: { type: StepField, extend: { placeholder: '1', floating: false }, },
        tooltipFormat: { type: TooltipFormatField, extend: { conditions: [] } },
        default: { type: DefaultField_slider, extend: { min: 2, } },
        disabled: { type: DisabledField },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description'],
      ['direction', 'position'],
      ['min', 'max', 'step'],
      ['tooltipFormat'],
      ['default'],
      ['disabled'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const file = {
  label: 'File upload',
  description: 'File upload input',
  icon: ['fas', 'file'],
  category: 'fields',
  schema: {
    type: 'file',
    label: 'File',
    uploadTempEndpoint: false,
    removeTempEndpoint: false,
    removeEndpoint: false,
    clickable: false,
    softRemove: true,

  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        dragAndDrop: { type: DragAndDropField, },
        accept: { type: FileAcceptField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description',],
      ['dragAndDrop'],
      ['accept'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const image = {
  ...file,
  label: 'Image upload',
  description: 'File upload with image only',
  icon: ['fas', 'image'],
  category: 'fields',
  schema: {
    type: 'file',
    view: 'image',
    label: 'Image',
    accept: 'image/*',
    uploadTempEndpoint: false,
    removeTempEndpoint: false,
    removeEndpoint: false,
    clickable: false,
    softRemove: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        dragAndDrop: { type: DragAndDropField, },
        accept: { type: FileAcceptField_simple_image, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description',],
      ['dragAndDrop'],
      ['accept'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const multifile = {
  label: 'Multi-file upload',
  description: 'Multi-file upload input',
  icon: ['fas', 'copy'],
  category: 'fields',
  schema: {
    type: 'multifile',
    label: 'Multi-file',
    uploadTempEndpoint: false,
    removeTempEndpoint: false,
    removeEndpoint: false,
    clickable: false,
    softRemove: true,
    sort: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        dragAndDrop: { type: DragAndDropField, },
        accept: { type: FileAcceptField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description',],
      ['dragAndDrop'],
      ['accept'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const multiImage = {
  label: 'Multi-image upload',
  description: 'Multi-file upload with images only',
  icon: ['fas', 'images'],
  category: 'fields',
  schema: {
    type: 'multifile',
    label: 'Multi-image',
    view: 'image',
    accept: 'image/*',
    uploadTempEndpoint: false,
    removeTempEndpoint: false,
    removeEndpoint: false,
    clickable: false,
    softRemove: true,
    sort: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        dragAndDrop: { type: DragAndDropField, },
        accept: { type: FileAcceptField_simple_image, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description',],
      ['dragAndDrop'],
      ['accept'],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const h1 = {
  label: 'Form heading',
  description: 'Heading for form',
  icon: ['fas', 'h1'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'h1',
    content: 'Heading 1',
    align: 'left',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        content: { type: ContentField, },
        description: { type: DescriptionField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        align: { type: AlignField, },
        space: { type: SpaceField, },
        size: { type: SizeField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'tag', 'content'],
      ['description'],
    ],
    layout: [
      ['align'],
      ['space'],
      ['size'],
    ],
  }
}

const h2 = {
  ...h1,
  label: 'Section heading',
  description: 'Heading for sections',
  icon: ['fas', 'h2'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'h2',
    content: 'Heading 2',
    align: 'left',
  },
}

const h3 = {
  ...h1,
  label: 'Subheading',
  description: 'Heading for subsections',
  icon: ['fas', 'h3'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'h3',
    content: 'Heading 3',
    align: 'left',
  },
}

const p = {
  label: 'Paragraph',
  description: 'Formattable text',
  icon: ['fas', 'paragraph'],
  category: 'fields',
  schema: {
    type: 'static',
    tag: 'p',
    content: 'Paragraph',
    align: 'left',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        content: { type: ContentField_p, },
        description: { type: DescriptionField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        align: { type: AlignField, },
        space: { type: SpaceField, },
        size: { type: SizeField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'tag', 'content'],
      ['description'],
    ],
    layout: [
      ['align'],
      ['space'],
      ['size'],
    ],
  }
}

const img = {
  label: 'Image',
  description: 'Display an image',
  icon: ['fas', 'image-polaroid'],
  category: 'fields',
  schema: {
    type: 'static',
    tag: 'img',
    src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=300',
    align: 'left',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        img: { type: ImgField_simple, },
        description: { type: DescriptionField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        align: { type: AlignField, },
        space: { type: SpaceField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    advanced: {
      name: 'advanced',
      label: 'Advanced',
      fields: {
        link: { type: LinkField_simple, },
        props: { type: ImgPropsField_simple, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'tag'],
      ['img'],
      ['description'],
    ],
    layout: [
      ['align'],
      ['space'],
    ],
    advanced: [
      ['link'],
      ['props'],
    ],
  }
}

const link = {
  label: 'Link',
  description: 'Link to another website',
  icon: ['fas', 'external-link-square'],
  category: 'fields',
  schema: {
    type: 'static',
    content: 'Link',
    tag: 'a',
    target: '_blank',
    align: 'left',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        content: { type: ContentField, extend: { rows: 1, label: 'Link text', columns: { label: 4 }, floating: false, placeholder: null } },
        link: { type: LinkField_simple, },
        description: { type: DescriptionField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        align: { type: AlignField, },
        space: { type: SpaceField, },
        size: { type: SizeField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'tag', 'content', 'link'],
      ['description'],
    ],
    layout: [
      ['align'],
      ['space'],
      ['size'],
    ],
  }
}

const divider = {
  label: 'Divider',
  description: 'Adds visual separation',
  icon: ['fas', 'horizontal-rule'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'hr',
  },
  sections: {
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        space: { type: SpaceField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
  }
}

const spacer = {
  label: 'Spacer',
  description: 'Empty space between elements',
  icon: ['fas', 'arrows-alt-v'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'p',
    content: '&nbsp;',
  },
  sections: {
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        space: { type: SpaceField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
  }
}

const submit = {
  label: 'Submit',
  description: 'Triggers form submission',
  icon: ['fas', 'check'],
  category: 'page',
  schema: {
    type: 'button',
    buttonLabel: 'Submit',
    submits: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        buttonLabel: { type: ButtonLabelField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        full: { type: FullField, },
        align: { type: AlignField, },
        size: { type: SizeField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    layout: [
      ['full'],
      ['align'],
      ['size'],
    ],
  }
}

const captcha = {
  label: 'Captcha',
  description: 'Prevents submission by robots',
  icon: ['fas', 'user-robot'],
  category: 'page',
  schema: {
    type: 'captcha',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField, },
        description: { type: DescriptionField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
}

const steps = {
  label: 'Pages',
  description: 'Break the form into steps',
  icon: ['fas', 'page-break'],
  category: 'page',
  schema: {
    type: 'steps',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        label: { type: PageLabelField, },
        label2: { type: PageLabelField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        buttons: { type: PageButtonsField, },
        labels: { type: PageLabelsField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Conditions',
      fields: {
        conditions: { type: PageConditionsField, },
      },
    },
  },
  separators: {
    layout: [
      ['buttons'],
      ['labels'],
    ]
  },
}

const container = {
  label: 'Group',
  description: 'A container to group elements',
  icon: ['fas', 'object'],
  category: 'page',
  disabled: false,
  schema: {
    type: 'group',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    layout: [
      ['columns'],
      ['size'],
    ],
  }
}

const list = {
  label: 'Repeat element',
  description: 'Repeat a single element',
  icon: ['fas', 'list'],
  category: 'page',
  schema: {
    type: 'list',
    sort: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        addText: { type: AddTextField, extend: { conditions: [], label: 'Button text', placeholder: '+ Add', floating: false, info: null, } },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description',],
      ['addText',],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const nestedList = {
  label: 'Repeat group',
  description: 'Repeat multiple element in a group',
  icon: ['fas', 'th-list'],
  category: 'page',
  schema: {
    type: 'list',
    element: {
      type: 'object',
      sort: true,
      name: 'container',
      builder: {
        type: 'container'
      }
    }
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        addText: { type: AddTextField, extend: { conditions: [], label: 'Button text', placeholder: '+ Add', floating: false, info: null, } },
      },
    },
    layout: {
      name: 'layout',
      label: 'Layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'Validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'Logic',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'Attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
  separators: {
    properties: [
      ['type', 'label', 'description',],
      ['addText',],
    ],
    layout: [
      ['columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

/**
 * Config object
 */
const config = {
  views: ['editor', 'preview'],
  leftPanel: ['elements', ],
  rightPanel: ['tree', 'settings'],
  defaultName: 'Form',
  categories: [
    {
      key: 'fields',
      label: 'Fields',
    },
    {
      key: 'page',
      label: 'Page',
    }
  ],
  darkMode: [],
  devices: [],
  breakpoints: {},
  defaultWidth: 460,
  names: false,
  elements: [
    'text',
    'textarea',
    'editor',
    'number',
    'email',
    'phone',
    'signature',
    'p',
    'img',
    'link',
    'checkboxgroup',
    'radiogroup',
    'checkbox',
    'select',
    'tags',
    'toggle',
    'date',
    'time',
    'datetime',
    'dates',
    'dateRange',
    'slider',
    'rangeSlider',
    'password',
    'url',
    'location',
    'file',
    'image',
    'multifile',
    'multiImage',
    'h1',
    'h2',
    'h3',
    'divider',
    'spacer',
    'captcha',
    'submit',
    'steps',
    'container',
    'list',
    'nestedList',
  ],
  element: {
    props: {
      default: {
        properties: {
          placeholder: {
            floating: false,
          }
        }
      },
      text: {
        validation: {
          validation: onlyRules([
            'alpha', 'alpha_dash', 'alpha_num', 'different', 'digits', 'digits_between', 'email',
            'gt', 'gte', 'integer', 'ip', 'ipv4', 'ipv6', 'lt', 'lte', 'numeric', 'required',
            'same', 'url', 'min', 'max'
          ]),
        }
      },
      number: {
        validation: {
          validation: onlyRules([
            'different', 'digits', 'digits_between', 'gt', 'gte', 'integer',
            'lt', 'lte', 'numeric', 'required', 'same', 'min', 'max'
          ]),
        },
      },
      email: {
        validation: {
          validation: onlyRules([
            'email', 'nullable', 'required',
          ])
        },
      },
      phone: {
        validation: {
          validation:  onlyRules([
            'required',
          ])
        },
      },
      signature: {
        validation: {
          validation:  onlyRules([
            'required',
          ])
        },
      },
      password: {
        validation: {
          validation:  onlyRules([
            'required', 'same'
          ])
        },
      },
      url: {
        validation: {
          validation: onlyRules([
            'url', 'nullable', 'required',
          ])
        },
      },
      location: {
        validation: {
          validation: onlyRules([
            'required',
          ])
        },
      },
      textarea: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max'
          ])
        },
      },
      editor: {
        validation: {
          validation: onlyRules([
            'required',
          ])
        },
      },
      checkbox: {
        validation: {
          validation: onlyRules([
            'accepted',
          ])
        },
      },
      checkboxgroup: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max', 'size'
          ])
        },
      },
      radiogroup: {
        validation: {
          validation: onlyRules([
            'required',
          ])
        },
      },
      toggle: {
        validation: {
          validation: onlyRules([
            'required',
          ])
        },
      },
      select: {
        validation: {
          validation: onlyRules([
            'required',
          ])
        },
      },
      tags: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max', 'size'
          ])
        },
      },
      date: {
        validation: {
          validation: onlyRules([
            'required', 'after', 'after_or_equal', 'before', 'before_or_equal', 'different',
          ])
        },
      },
      datetime: {
        validation: {
          validation: onlyRules([
            'required', 'after', 'after_or_equal', 'before', 'before_or_equal', 'different',
          ])
        },
      },
      time: {
        validation: {
          validation: onlyRules([
            'required', 'after', 'after_or_equal', 'before', 'before_or_equal', 'different',
          ])
        },
      },
      dates: {
        validation: {
          validation: onlyRules([
            'required', 'after', 'after_or_equal', 'before', 'before_or_equal',
          ])
        },
      },
      dateRange: {
        validation: {
          validation: onlyRules([
            'required', 'after', 'after_or_equal', 'before', 'before_or_equal',
          ])
        },
      },
      slider: {
        validation: {
          validation: onlyRules([
            'required', 'gt', 'gte', 'lt', 'lte', 'min', 'max',
          ])
        },
      },
      rangeSlider: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max',
          ])
        },
      },
      file: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max', 
          ])
        },
      },
      image: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max', 'dimensions', 'width', 'height', 'minWidth', 'minHeight',
            'maxWidth', 'maxHeight', 'ratio',
          ])
        },
      },
      multifile: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max',
          ])
        },
      },
      multiImage: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max',
          ])
        },
      },
      list: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max', 'size'
          ])
        },
      },
      nestedList: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max', 'size'
          ])
        },
      },
    },
    types: {
      text,
      number,
      email,
      phone,
      signature,
      password,
      url,
      location,
      textarea,
      editor,
      checkbox,
      checkboxgroup,
      radiogroup,
      toggle,
      select,
      tags,
      date,
      datetime,
      time,
      dates,
      dateRange,
      slider,
      rangeSlider,
      file,
      image,
      multifile,
      multiImage,
      captcha,
      submit,
      h1,
      h2,
      h3,
      p,
      img,
      link,
      divider,
      spacer,
      steps,
      container,
      list,
      nestedList,
    }
  }
}

export default config

export {
  InputTypeField_simple,
  PhoneMask_simple,
  ItemsField_simple,
  SearchField_simple,
  TextField_simple_checkbox,
  CreateField_simple,
  NoResultsField_simple,
  DateFormatField_simple,
  DateFormatField_datetime_simple,
  DateRestrictionsField_simple,
  TooltipPositionField_simple,
  FileAcceptField_simple_image,
  TagField_simple,
  ContentField_p,
  ImgField_simple,
  ImgPropsField_simple,
  LinkField_simple,
  ColumnsField_simple,
}