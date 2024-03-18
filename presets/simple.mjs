import {
  AcceptField,
  AddonsField,
  AddTextField,
  AfterField,
  AlignField,
  AlignField_toggle,
  AlignField_checkbox,
  AlignField_radio,
  AttrsField,
  AttrsField_static,
  AutocompleteField,
  AutogrowField,
  AutoUploadField,
  BaseElementField,
  BaseExportField,
  BaseField,
  BaseFormField,
  BaseMultilingualElementField,
  BaseMultilingualFormField,
  BaseSelectOptionField,
  BaseThemeField,
  BeforeField,
  BetweenField,
  BoolValueField,
  ButtonLabelField,
  ButtonTypeField,
  ClickableField,
  ColumnsField,
  ConditionsField,
  ContentField,
  ControlsField,
  CreateField,
  DateRestrictionsField,
  DateFormatField,
  DateModeField,
  DefaultField,
  DefaultField_location,
  DefaultField_select,
  DefaultField_multiselect,
  DefaultField_tags,
  DefaultField_radiogroup,
  DefaultField_checkboxgroup,
  DefaultField_date,
  DefaultField_time,
  DefaultField_datetime,
  DefaultField_dates,
  DefaultField_slider,
  DefaultField_toggle,
  DefaultField_checkbox,
  DefaultField_radio,
  DefaultField_editor,
  DefaultField_textarea,
  DefaultField_list,
  DefaultField_multilingual,
  DescriptionField,
  DirectionField,
  DisabledField,
  DragAndDropField,
  EndpointField,
  ExportApiField,
  ExportDownloadField,
  ExportOutputField,
  ExportThemeField,
  FieldNameField,
  FileAcceptField,
  FileEndpointsField,
  FileRulesField,
  FileUrlsField,
  FormColumnsField,
  FormDisplayErrorsField,
  FormDisplayMessagesField,
  FormEndpointField,
  FormFloatPlaceholderField,
  FormForceLabelsField,
  FormFormKeyField,
  FormI18nField,
  FormLocaleField,
  FormNameField,
  FormNestingField,
  FormSizeField,
  FormValidationField,
  FormWidthField,
  FullField,
  GroupsField,
  Hour24Field,
  HrefField,
  IdField,
  ImgField,
  InfoField,
  InitialField,
  InputTypeField,
  ItemsField,
  LabelField,
  LabelsField,
  LinkField,
  MaxField,
  MaxOptionsField,
  MetaField,
  MinField,
  MultipleLabelField,
  NameField,
  NativeField,
  NestedField,
  NoOptionsField,
  NoResultsField,
  ObjectField,
  OrientationField,
  PageButtonsField,
  PageConditionsField,
  PageLabelField,
  PageLabelsField,
  ParamsField,
  PlaceholderField,
  RadioField,
  ReadonlyField,
  ResetsField,
  RowsField,
  SearchField,
  SearchField_tags,
  SecondsField,
  SelectBehaviorField,
  SelectBehaviorField_tags,
  SelectBehaviorField_multiselect,
  SelectItemsField,
  SelectUiField,
  SizeField,
  SoftRemoveField,
  SpaceField,
  StepField,
  StoreField,
  StoreOrderField,
  SubmitField,
  SubmitsField,
  SubtitleField,
  TagField,
  TargetField,
  TextField,
  ThemeBorderField,
  ThemeColorField,
  ThemeColorSelectorField,
  ThemeRadiusField,
  ThemeSelectField,
  ThemeShadowField,
  ThemeSingleSizeField,
  ThemeSizeField,
  ThemeThemeField,
  ThemeToolsField,
  ThemeToolsHiddenField,
  ToolsField,
  TooltipFormatField,
  TooltipsField,
  TypeField,
  ValidationField,
  ViewField,
  ViewField_file,

  elementTypes,
} from './../'

import { h } from 'vue'

const imageMimes = [
  'image/*', 'image/avif', 'image/bmp', 'image/gif', 'image/heic', 'image/jpeg', 'image/png',
  'image/svg+xml', 'image/tiff', 'image/vnd.microsoft.icon', 'image/webp',
]

const imageExtensions = [
  'avif', 'bmp', 'gif', 'heic', 'jpeg', 'jpg', 'png', 'svg', 'tiff', 'webp'
]

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

const text = {
  ...elementTypes.text,
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const number = {
  ...elementTypes.number,
  sections: text.sections,
  separators: text.separators,
}

const email = {
  ...elementTypes.email,
}

const phone = {
  ...elementTypes.phone,
}

const password = {
  ...elementTypes.password,
}

const url = {
  ...elementTypes.url,
}

const location = {
  ...elementTypes.location,
  sections: text.sections,
  separators: text.separators,
}

const textarea = {
  ...elementTypes.textarea,
  sections: text.sections,
  separators: text.separators,
}

const editor = {
  ...elementTypes.editor,
  sections: text.sections,
  separators: text.separators,
}

const checkbox = {
  ...elementTypes.checkbox,
  sections: {
    properties: {
      name: 'properties',
      label: 'Properties',
      fields: {
        type: { type: TypeField },
        text: { type: TextField, },
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const checkboxgroup = {
  ...elementTypes.checkboxgroup,
  schema: {
    type: 'checkboxgroup',
    items: [
      'Option 1',
    ],
    label: 'Checkbox group',
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  },
}

const radiogroup = {
  ...checkboxgroup,
  label: 'Radio group',
  description: 'Plain radio options',
  icon: ['fas', 'list-ul'],
  schema: {
    type: 'radiogroup',
    items: [
      'Option 1',
    ],
    label: 'Radio group',
  },
}

const toggle = {
  ...elementTypes.toggle,
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const select = {
  ...elementTypes.select,
  schema: {
    type: 'select',
    items: [
      'Option 1'
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  },
}

const multiselect = {
  ...elementTypes.multiselect,
  label: 'Multiselect',
  description: 'Multiselect input',
  icon: ['fas', 'plus-square'],
  category: 'fields',
  schema: {
    type: 'multiselect',
    closeOnSelect: false,
    items: [
      'Option 1',
    ],
    search: true,
    native: false,
    strict: false,
    hideSelected: false,
    label: 'Multiselect',
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
        multipleLabel: { type: MultipleLabelField, },
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
      ['multipleLabel'],
      ['search', 'create', 'noResults'],
      ['!', 'disabled'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  },
}

const tags = {
  ...elementTypes.tags,
  label: 'Tags',
  description: 'Tags input',
  icon: ['fas', 'tags'],
  category: 'fields',
  schema: {
    type: 'tags',
    closeOnSelect: false,
    search: true,
    strict: false,
    hideSelected: false,
    items: [
      'Option 1'
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  },
}

const date = {
  ...elementTypes.date,
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const datetime = {
  ...elementTypes.datetime,
  label: 'Datetime',
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const time = {
  ...elementTypes.time,
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
  ...elementTypes.slider,
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const rangeSlider = {
  ...elementTypes.rangeSlider,
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
    validation: [
      ['validation'],
      ['fieldName'],
    ]
  }
}

const file = {
  ...elementTypes.file,
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
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const multifile = {
  ...elementTypes.multifile,
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
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const multiImage = {
  ...elementTypes.multiImage,
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
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const h1 = {
  ...elementTypes.h1,
  label: 'H1 header',
  description: 'HTML <h1> tag',
  icon: ['fas', 'h1'],
  category: 'static',
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
  separators: {}
}

const h2 = {
  ...h1,
  label: 'H2 header',
  description: 'HTML <h2> tag',
  icon: ['fas', 'h2'],
  category: 'static',
  schema: {
    type: 'static',
    tag: 'h2',
    content: 'Heading 2',
    align: 'left',
  },
}

const h3 = {
  ...h1,
  label: 'H3 header',
  description: 'HTML <h3> tag',
  icon: ['fas', 'h3'],
  category: 'static',
  schema: {
    type: 'static',
    tag: 'h3',
    content: 'Heading 3',
    align: 'left',
  },
}

const h4 = {
  ...h1,
  label: 'H4 header',
  description: 'HTML <h4> tag',
  icon: ['fas', 'h4'],
  category: 'static',
  schema: {
    type: 'static',
    tag: 'h4',
    content: 'Heading 4',
    align: 'left',
  },
}

const p = {
  ...elementTypes.p,
  label: 'Paragraph',
  description: 'HTML <p> tag',
  icon: ['fas', 'paragraph'],
  category: 'static',
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
      ['type', 'tag'],
      ['content'],
    ],
  }
}

const img = {
  ...elementTypes.img,
  label: 'Image',
  description: 'HTML <img> tag',
  icon: ['fas', 'image-polaroid'],
  category: 'static',
  schema: {
    type: 'static',
    tag: 'img',
    src: 'https://vueform.com/images/logo.svg',
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
    ],
    advanced: [
      ['link'],
      ['props'],
    ],
  }
}

const link = {
  ...elementTypes.link,
  label: 'Link',
  description: 'HTML <a> tag',
  icon: ['fas', 'external-link-square'],
  category: 'static',
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
  }
}

const divider = {
  ...elementTypes.divider,
  label: 'Divider',
  description: 'HTML <hr> tag',
  icon: ['fas', 'horizontal-rule'],
  category: 'static',
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
  category: 'static',
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
  ...elementTypes.submit,
  schema: {
    type: 'button',
    buttonLabel: 'Submit',
    onClick() {
      alert(2)
    }
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
  }
}

const steps = {
  ...elementTypes.steps,
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
  ...elementTypes.container,
  label: 'Container',
  description: 'A container to group elements',
  icon: ['fas', 'object'],
  category: 'structure',
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
  separators: {}
}

const list = {
  ...elementTypes.list,
  label: 'List',
  description: 'Repeatable single element',
  icon: ['fas', 'list'],
  category: 'structure',
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
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const nestedList = {
  ...elementTypes.nestedList,
  label: 'Nested list',
  description: 'Repeatable elements in an object',
  icon: ['fas', 'th-list'],
  category: 'structure',
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
    validation: [
      ['validation'],
      ['fieldName'],
    ],
  }
}

const config = {
  views: ['editor', 'preview', 'code'],
  leftPanel: ['elements', ],
  rightPanel: ['tree', 'settings'],
  darkMode: [],
  devices: [],
  breakpoints: {},
  defaultWidth: 460,
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
    'radiogroup',
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
    'file',
    'image',
    'multifile',
    'multiImage',
    'h1',
    'h2',
    'h3',
    'h4',
    'p',
    'img',
    'link',
    'divider',
    'spacer',
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
      multiselect: {
        validation: {
          validation: onlyRules([
            'required', 'min', 'max', 'size'
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
            'required', 'gt', 'gte', 'lt', 'lte', 'min', 'max', // gt?
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
      multiselect,
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
      submit,
      h1,
      h2,
      h3,
      h4,
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
  ItemsField_simple,
  SearchField_simple,
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
}