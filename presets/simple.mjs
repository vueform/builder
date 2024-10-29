/*@localize*/

import {
  AddonsField,
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
  MatrixInputTypeField,
  MatrixItemsField,
  MatrixColsField,
  MatrixRowsField,
  ViewField_matrix,
  MatrixMinWidthField,
  MatrixMaxWidthField,
  MatrixGapField,
  PaddingField,
  HideRowsField,
  RowWrapField,
  StickyRowsField,
  HideColsField,
  ColWrapField,
  StickyColsField,
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

const ItemsField_simple = class extends BaseMultilingualElementField
{
  name = 'ItemsField'

  get schema () {
    return {
      items: {
        type: this.multilingual ? 't-textarea' : 'textarea',
        placeholder: this.tags.simple_items_items_placeholder,
        floating: false,
        label: this.tags.simple_items_items_label,
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
        label: this.tags.simple_search_search_label,
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
        label: this.tags.simple_text_text_label,
        placeholder: this.multilingual && this.locale.value !== this.fallbackLocale ? `${this.tags.field_placeholder_defaults_to} ${this.fallbackLocaleName}` : undefined,
        floating: false,
        columns: { label: 4 },
        presets: ['prop-multiline'],
        rows: 1,
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
        label: this.tags.simple_create_create_label,
        info: this.tags.simple_create_create_info,
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
        label: this.tags.simple_no_results_no_results_text_label,
        info: this.tags.simple_no_results_no_results_text_info,
        placeholder: this.multilingual && this.locale.value !== this.fallbackLocale ? `${this.tags.field_placeholder_defaults_to} ${this.fallbackLocaleName}` : this.tags.simple_no_results_no_results_text_placeholder,
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
        label: this.tags.simple_date_format_display_format_label,
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
        label: this.tags.simple_date_format_datetime_display_format_label,
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
            label: this.tags.simple_date_restrictions_min_label,
            columns: { label: 5 },
            addClass: 'vfb-config-datepicker',
          },
          max: {
            type: 'date',
            label: this.tags.simple_date_restrictions_max_label,
            columns: { label: 5 },
            addClass: 'vfb-config-datepicker',
          },
          disables: {
            type: 'dates',
            label: this.tags.simple_date_restrictions_disables_label,
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
        label: this.tags.simple_tooltip_position_tooltip_position_label,
        items: {
          top: this.tags.simple_tooltip_position_tooltip_position_item_top,
          bottom: this.tags.simple_tooltip_position_tooltip_position_item_bottom,
        },
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
            content: this.tags.simple_file_accept_subtitle_content,
            presets: ['prop-subtitle'],
          },
          acceptMimes: {
            type: 'tags',
            label: this.tags.simple_file_accept_accept_mimes_label,
            columns: { label: 4 },
            appendNewOption: false,
            info: this.tags.simple_file_accept_accept_mimes_info,
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
            label: this.tags.simple_file_accept_accept_label,
            columns: { label: 4 },
            appendNewOption: false,
            info: this.tags.simple_file_accept_accept_info,
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
        placeholder: this.tags.simple_content_content_placeholder,
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
            label: this.tags.simple_img_src_label,
            placeholder: this.tags.simple_img_src_placeholder,
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
            label: this.tags.simple_img_width_label,
            placeholder: this.tags.simple_img_width_placeholder,
            floating: false,
            addons: {
              after: 'px',
            },
            columns: { label: 8 },
          },
          height: {
            type: 'text',
            label: this.tags.simple_img_height_label,
            info: this.tags.simple_img_height_info,
            placeholder: this.tags.simple_img_height_placeholder,
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
            label: this.tags.simple_img_props_alt_label,
            info: this.tags.simple_img_props_alt_info,
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
            label: this.tags.simple_img_props_title_label,
            info: this.tags.simple_img_props_title_info,
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
            label: this.tags.simple_link_href_label,
            placeholder: this.tags.simple_link_href_placeholder,
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
            label: this.tags.simple_link_target_label,
            default: '_self',
            floating: false,
            columns: { label: 4 },
            items: {
              '_self': this.tags.simple_link_target_item_self,
              '_blank': this.tags.simple_link_target_item_blank,
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
            label: this.tags.simple_columns_wrapper_label,
            presets: ['prop-toggle'],
            columns: {
              label: 8
            },
          },
          shrink: {
            type: 'radiogroup',
            presets: ['tabs-tiny', `tabs-3`],
            view: 'tabs',
            label: this.tags.simple_columns_shrink_label,
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
            label: this.tags.simple_columns_label_label,
            items: {
              Left: this.tags.simple_columns_label_item_left,
              Top: this.tags.simple_columns_label_item_top,
            },
            columns: {
              label: 8
            },
          },
          size: {
            type: 'radiogroup',
            presets: ['tabs-tiny', `tabs-3`],
            view: 'tabs',
            label: this.tags.simple_columns_size_label,
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

    if (update.columns?.wrapper) {
      update.columns.wrapper = parseInt(update.columns.wrapper)
    }

    if (update.columns?.label) {
      update.columns.label = parseInt(update.columns.label)
    }

    this.update(update, remove)
  }

  load(data) {
    let load = {
      columns_wrapper: {}
    }

    load.columns_wrapper.label = this.elementSchema.columns?.label ? 'Left' : 'Top'
    load.columns_wrapper.size = this.elementSchema.columns?.label || 6
    load.columns_wrapper.wrapper = !!this.elementSchema.columns?.wrapper
    load.columns_wrapper.shrink = this.elementSchema.columns?.wrapper || 6

    return load
  }
}

const AddTextField = class extends BaseElementField
{
  name = 'AddTextField'

  watchers = {
    [`${this.section}.addText`]: [
      [
        'controls_wrapper.add', async (el$, value) => {
          if (!value) {
            el$.clear()
          }
        }
      ],
    ]
  }

  get schema () {
    return {
      addText: {
        type: 'text',
        label: this.tags.simple_add_text_add_text_label,
        columns: { label: 4 },
        placeholder: this.tags.simple_add_text_add_text_placeholder,
        floating: false,
      },
    }
  }
}

/**
 * Element definitions
 */
const text = {
  label: 'simple_text_label',
  description: 'simple_text_description',
  icon: ['fas', 'font-case'],
  category: 'fields',
  schema: {
    type: 'text',
    label: 'simple_text_field_label',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_number_label',
  description: 'simple_number_description',
  icon: ['fas', 'number'],
  category: 'fields',
  schema: {
    type: 'text',
    inputType: 'number',
    rules: ['nullable', 'numeric'],
    autocomplete: 'off',
    label: 'simple_number_field_label',
  },
}

const email = {
  ...text,
  label: 'simple_email_label',
  description: 'simple_email_description',
  icon: ['fas', 'at'],
  category: 'fields',
  schema: {
    type: 'text',
    inputType: 'email',
    rules: ['nullable', 'email'],
    label: 'simple_email_field_label',
  },
}

const phone = {
  label: 'simple_phone_label',
  description: 'simple_phone_description',
  icon: ['fas', 'phone-rotary'],
  category: 'fields',
  schema: {
    type: 'phone',
    label: 'simple_phone_field_label',
    allowIncomplete: true,
    unmask: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        placeholder: { type: PlaceholderField },
      },
    },
    options: {
      name: 'options',
      label: 'simple_section_options',
      fields: {
        include: { type: IncludeCountriesField, },
        exclude: { type: ExcludeCountriesField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_signature_label',
  description: 'simple_signature_description',
  icon: ['fas', 'signature'],
  category: 'fields',
  schema: {
    type: 'signature',
    label: 'simple_signature_field_label',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_options',
      fields: {
        accept: { type: AcceptImagesField, },
        maxSize: { type: MaxSizeField, },
        height: { type: HeightField, },
        maxWidth: { type: MaxWidthField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_password_label',
  description: 'simple_password_description',
  icon: ['fas', 'lock'],
  category: 'fields',
  schema: {
    type: 'text',
    inputType: 'password',
    label: 'simple_password_field_label',
  },
}

const url = {
  ...text,
  label: 'simple_url_label',
  description: 'simple_url_description',
  icon: ['fas', 'link'],
  category: 'fields',
  schema: {
    type: 'text',
    inputType: 'url',
    rules: ['nullable', 'url'],
    placeholder: 'simple_url_field_placeholder',
    floating: false,
    label: 'simple_url_field_label',
  },
}

const location = {
  ...text,
  label: 'simple_location_label',
  description: 'simple_location_description',
  icon: ['fas', 'map-marker-alt'],
  category: 'fields',
  schema: {
    type: 'location',
    label: 'simple_location_field_label',
  },
}

const textarea = {
  ...text,
  label: 'simple_textarea_label',
  description: 'simple_textarea_description',
  icon: ['fas', 'align-left'],
  category: 'fields',
  schema: {
    type: 'textarea',
    label: 'simple_textarea_field_label',
  },
}

const editor = {
  ...text,
  label: 'simple_editor_label',
  description: 'simple_editor_description',
  icon: ['fas', 'italic'],
  category: 'fields',
  schema: {
    type: 'editor',
    label: 'simple_editor_field_label',
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
  label: 'simple_checkbox_label',
  description: 'simple_checkbox_description',
  icon: ['fas', 'check-square'],
  category: 'fields',
  schema: {
    type: 'checkbox',
    text: 'simple_checkbox_field_label',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        align: { type: AlignField_checkbox, },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_checkboxgroup_label',
  description: 'simple_checkboxgroup_description',
  icon: ['fas', 'tasks'],
  category: 'fields',
  schema: {
    type: 'checkboxgroup',
    items: [
      'simple_default_option_1',
      'simple_default_option_2',
      'simple_default_option_3',
    ],
    label: 'simple_checkboxgroup_field_label',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        disabled: { type: DisabledField },
      },
    },
    options: {
      name: 'options',
      label: 'simple_section_options',
      fields: {
        items: { type: ItemsField_simple, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        view: { type: ViewField, },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_radiogroup_label',
  description: 'simple_radiogroup_description',
  icon: ['fas', 'list-ul'],
  category: 'fields',
  schema: {
    type: 'radiogroup',
    items: [
      'simple_default_option_1',
      'simple_default_option_2',
      'simple_default_option_3',
    ],
    label: 'simple_radiogroup_field_label',
  },
}

const toggle = {
  label: 'simple_toggle_label',
  description: 'simple_toggle_description',
  icon: ['fas', 'toggle-on'],
  category: 'fields',
  schema: {
    type: 'toggle',
    text: 'simple_toggle_field_text',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        align: { type: AlignField_toggle, },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_select_label',
  description: 'simple_select_description',
  icon: ['fas', 'caret-square-down'],
  category: 'fields',
  schema: {
    type: 'select',
    items: [
      'simple_default_option_1',
      'simple_default_option_2',
      'simple_default_option_3',
    ],
    search: true,
    native: false,
    strict: false,
    label: 'simple_select_field_label',
    inputType: 'search',
    autocomplete: 'off',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_options',
      fields: {
        items: { type: ItemsField_simple, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_tags_label',
  description: 'simple_tags_description',
  icon: ['fas', 'tags'],
  category: 'fields',
  schema: {
    type: 'tags',
    closeOnSelect: false,
    search: true,
    strict: false,
    hideSelected: false,
    items: [
      'simple_default_option_1',
      'simple_default_option_2',
      'simple_default_option_3',
    ],
    label: 'simple_tags_field_label',
    inputType: 'search',
    autocomplete: 'off',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_options',
      fields: {
        items: { type: ItemsField_simple, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_date_label',
  description: 'simple_date_description',
  icon: ['fas', 'calendar'],
  category: 'fields',
  schema: {
    type: 'date',
    label: 'simple_date_field_label',
    displayFormat: 'simple_date_field_display_format',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_datetime_label',
  description: 'simple_datetime_description',
  icon: ['fas', 'datetime'],
  category: 'fields',
  schema: {
    type: 'date',
    label: 'simple_datetime_field_label',
    time: true,
    displayFormat: 'simple_datetime_field_display_format',
    hour24: false,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_time_label',
  description: 'simple_time_description',
  icon: ['fas', 'clock'],
  category: 'fields',
  schema: {
    type: 'date',
    label: 'simple_time_field_label',
    time: true,
    date: false,
    hour24: false,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_dates_label',
  description: 'simple_dates_description',
  icon: ['fas', 'dates'],
  category: 'fields',
  schema: {
    type: 'dates',
    label: 'simple_dates_field_label',
  },
}

const dateRange = {
  ...date,
  label: 'simple_dateRange_label',
  description: 'simple_dateRange_description',
  icon: ['fas', 'date-range'],
  category: 'fields',
  schema: {
    type: 'dates',
    label: 'simple_dateRange_field_label',
    mode: 'range',
  },
}

const slider = {
  label: 'simple_slider_label',
  description: 'simple_slider_description',
  icon: ['fas', 'slider'],
  category: 'fields',
  schema: {
    type: 'slider',
    label: 'simple_slider_field_label',
    default: 30,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_rangeSlider_label',
  description: 'simple_rangeSlider_description',
  icon: ['fas', 'range-slider'],
  category: 'fields',
  schema: {
    type: 'slider',
    default: [30, 70],
    label: 'simple_rangeSlider_field_label',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField },
        fieldName: { type: FieldNameField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_file_label',
  description: 'simple_file_description',
  icon: ['fas', 'file'],
  category: 'fields',
  schema: {
    type: 'file',
    label: 'simple_file_field_label',
    uploadTempEndpoint: false,
    removeTempEndpoint: false,
    removeEndpoint: false,
    clickable: false,
    softRemove: true,

  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_image_label',
  description: 'simple_image_description',
  icon: ['fas', 'image'],
  category: 'fields',
  schema: {
    type: 'file',
    view: 'image',
    label: 'simple_image_field_label',
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
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_multifile_label',
  description: 'simple_multifile_description',
  icon: ['fas', 'copy'],
  category: 'fields',
  schema: {
    type: 'multifile',
    label: 'simple_multifile_field_label',
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
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_multiImage_label',
  description: 'simple_multiImage_description',
  icon: ['fas', 'images'],
  category: 'fields',
  schema: {
    type: 'multifile',
    label: 'simple_multiImage_field_label',
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
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_h1_label',
  description: 'simple_h1_description',
  icon: ['fas', 'h1'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'h1',
    content: 'simple_h1_field_content',
    align: 'left',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        content: { type: ContentField, },
        description: { type: DescriptionField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        align: { type: AlignField, },
        space: { type: SpaceField, },
        size: { type: SizeField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_h2_label',
  description: 'simple_h2_description',
  icon: ['fas', 'h2'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'h2',
    content: 'simple_h2_field_content',
    align: 'left',
  },
}

const h3 = {
  ...h1,
  label: 'simple_h3_label',
  description: 'simple_h3_description',
  icon: ['fas', 'h3'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'h3',
    content: 'simple_h3_field_content',
    align: 'left',
  },
}

const p = {
  label: 'simple_p_label',
  description: 'simple_p_description',
  icon: ['fas', 'paragraph'],
  category: 'fields',
  schema: {
    type: 'static',
    tag: 'p',
    content: 'simple_p_field_content',
    align: 'left',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        content: { type: ContentField_p, },
        description: { type: DescriptionField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        align: { type: AlignField, },
        space: { type: SpaceField, },
        size: { type: SizeField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_img_label',
  description: 'simple_img_description',
  icon: ['fas', 'image-polaroid'],
  category: 'fields',
  schema: {
    type: 'static',
    tag: 'img',
    src: 'simple_img_field_src',
    align: 'left',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        img: { type: ImgField_simple, },
        description: { type: DescriptionField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        align: { type: AlignField, },
        space: { type: SpaceField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
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
      label: 'simple_section_attributes',
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
  label: 'simple_link_label',
  description: 'simple_link_description',
  icon: ['fas', 'external-link-square'],
  category: 'fields',
  schema: {
    type: 'static',
    content: 'simple_link_field_content',
    tag: 'a',
    target: '_blank',
    align: 'left',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
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
      label: 'simple_section_layout',
      fields: {
        align: { type: AlignField, },
        space: { type: SpaceField, },
        size: { type: SizeField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_divider_label',
  description: 'simple_divider_description',
  icon: ['fas', 'horizontal-rule'],
  category: 'page',
  schema: {
    type: 'static',
    tag: 'hr',
  },
  sections: {
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        space: { type: SpaceField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_spacer_label',
  description: 'simple_spacer_description',
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
      label: 'simple_section_layout',
      fields: {
        space: { type: SpaceField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_submit_label',
  description: 'simple_submit_description',
  icon: ['fas', 'check'],
  category: 'page',
  schema: {
    type: 'button',
    buttonLabel: 'simple_submit_field_button_label',
    submits: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        tag: { type: TagField_simple, },
        buttonLabel: { type: ButtonLabelField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        full: { type: FullField, },
        align: { type: AlignField, },
        size: { type: SizeField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_captcha_label',
  description: 'simple_captcha_description',
  icon: ['fas', 'user-robot'],
  category: 'page',
  schema: {
    type: 'captcha',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField, },
        description: { type: DescriptionField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
      fields: {
        name: { type: NameField, extend: { disabled: true, } },
      }
    }
  },
}

const steps = {
  label: 'simple_steps_label',
  description: 'simple_steps_description',
  icon: ['fas', 'page-break'],
  category: 'page',
  schema: {
    type: 'steps',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        label: { type: PageLabelField, },
        label2: { type: PageLabelField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
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
  label: 'simple_container_label',
  description: 'simple_container_description',
  icon: ['fas', 'object'],
  category: 'page',
  disabled: false,
  schema: {
    type: 'group',
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_list_label',
  description: 'simple_list_description',
  icon: ['fas', 'list'],
  category: 'page',
  schema: {
    type: 'list',
    sort: true,
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        addText: { type: AddTextField },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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
  label: 'simple_nestedList_label',
  description: 'simple_nestedList_description',
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
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField },
        label: { type: LabelField },
        description: { type: DescriptionField },
        addText: { type: AddTextField },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        columns: { type: ColumnsField_simple },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField,  },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
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

const matrix = {
  label: 'simple_matrix_label',
  description: 'simple_matrix_description',
  icon: ['fas', 'matrix'],
  category: 'fields',
  schema: {
    type: 'matrix',
    cols: [
      {
        label: 'matrix_cols_1',
        value: 'column_1',
      },
      {
        label: 'matrix_cols_2',
        value: 'column_2',
      },
    ],
    rows: [
      {
        label: 'matrix_rows_1',
        value: 'row_1',
      },
      {
        label: 'matrix_rows_2',
        value: 'row_2',
      },
    ],
  },
  sections: {
    properties: {
      name: 'properties',
      label: 'simple_section_properties',
      fields: {
        type: { type: TypeField, },
        label: { type: LabelField, },
        description: { type: DescriptionField, },
        disabled: { type: DisabledField, },
        readonly: { type: ReadonlyField, },
      },
    },
    columns: {
      name: 'columns',
      label: 'simple_section_columns',
      fields: {
        inputType: { type: MatrixInputTypeField, },
        items: { type: MatrixItemsField, },
        cols: { type: MatrixColsField, },
      },
    },
    rows: {
      name: 'rows',
      label: 'simple_section_rows',
      fields: {
        rows: { type: MatrixRowsField, },
      },
    },
    layout: {
      name: 'layout',
      label: 'simple_section_layout',
      fields: {
        view: { type: ViewField_matrix, },
        minWidth: { type: MatrixMinWidthField, },
        maxWidth: { type: MatrixMaxWidthField, },
        gap: { type: MatrixGapField, },
        padding: { type: PaddingField, },
        hideRows: { type: HideRowsField, },
        rowWrap: { type: RowWrapField, },
        stickyRows: { type: StickyRowsField, },
        hideCols: { type: HideColsField, },
        colWrap: { type: ColWrapField, },
        stickyCols: { type: StickyColsField, },
        columns: { type: ColumnsField_simple, },
        size: { type: SizeField, },
      },
    },
    validation: {
      name: 'validation',
      label: 'simple_section_validation',
      fields: {
        validation: { type: ValidationField, },
        fieldName: { type: FieldNameField, },
      },
    },
    conditions: {
      name: 'conditions',
      label: 'simple_section_conditions',
      fields: {
        conditions: { type: ConditionsField, },
      },
    },
    attributes: {
      name: 'attributes',
      label: 'simple_section_attributes',
      fields: {
        name: { type: NameField, },
      },
    },
  },
  separators: {
    properties: [
      ['name', 'label', 'description'],
      ['disabled', 'readonly'],
    ],
    columns: [
      ['inputType', 'items'],
      ['!', 'cols'],
    ],
    rows: [
      ['rows'],
    ],
    layout: [
      ['view'],
      ['minWidth', 'maxWidth'],
      ['!', 'gap'],
      ['!', 'padding'],
      ['!', 'hideRows', 'rowWrap', 'stickyRows'],
      ['!', 'hideCols', 'colWrap', 'stickyCols'],
      ['!', 'columns'],
      ['size'],
    ],
    validation: [
      ['validation'],
      ['fieldName'],
    ],
    attributes: [
      ['name'],
    ]
  }
}

const matrixMulti = {
  ...matrix,
  label: 'simple_matrix_multi_label',
  description: 'simple_matrix_multi_description',
  icon: ['fas', 'matrix-multi'],
  schema: {
    ...matrix.schema,
    inputType: { type: 'checkbox' },
  }
}

const table = {
  ...matrix,
  label: 'simple_table_label',
  description: 'simple_table_description',
  icon: ['far', 'table'],
  schema: {
    ...matrix.schema,
    inputType: { type: 'text' },
    presets: ['matrix-table'],
  }
}

/**
 * Config object
 */
const config = {
  views: ['editor', 'preview'],
  leftPanel: ['elements', ],
  rightPanel: ['tree', 'settings'],
  categories: [
    {
      key: 'fields',
      label: 'simple_category_fields',
    },
    {
      key: 'page',
      label: 'simple_category_page',
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
    'matrix',
    'matrixMulti',
    'table',
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
      matrix: {
        validation: {
          validation: onlyRules([
            'required',
          ])
        },
      },
      matrixMulti: {
        validation: {
          validation: onlyRules([
            'required',
          ])
        },
      },
      table: {
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
      matrix,
      matrixMulti,
      table,
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