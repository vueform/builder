import { onMounted, ref, computed, toRefs, watch, nextTick, inject, resolveComponent, } from 'vue'
import elementSelectorPlugin from './plugins/elementSelector/index.mjs'
import _ from 'lodash'

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < (_.isPlainObject(array) ? _.values(array) : array).length; index++) {
    let key = (_.isPlainObject(array) ? _.keys(array)[index] : index)

    await callback(array[key], key, array)
  }
}

const getElementSchemaByPath = (schema, path) => {
  if (!path) {
    return
  }

  const pathParts = path.split('.')
  const pathLength = pathParts.length

  const returnSchema = (schema, level = 1) => {
    const currentPath = pathParts[level - 1]

    if (pathLength === level) {
      return schema[currentPath]
    } else if (pathLength > level) {
      let base = schema[pathParts[level - 1]]
      let childSchema = base.type === 'list'
        ? { 0: base.element }
        : base.schema

      return returnSchema(childSchema, level + 1)
    }
  }

  return returnSchema(schema)
}

export default function () {
  return [
    ...elementSelectorPlugin(),
    () => ({
      config(config) {
        config.presets = {
          ...config.presets,
          'preview-form': {},
          
          'props-form': {
            removeClasses: {
              FormElements: {
                container_sm: ['form-gap-y-gutter-sm'],
              },
            },
            replaceClasses: {
              ToggleElement: {
                wrapper: {
                  'items-start': 'vfb-util-props-toggle-wrapper'
                }
              },
              TagsElement: {
                select: {
                  tag: {
                    'whitespace-nowrap': 'vfb-util-props-tags'
                  }
                }
              }
            },
            addClasses: {
              ElementLabel: {
                wrapper: 'leading-snug'
              },
              SliderElement: {
                container: 'vfb-config-slider',
              },
              ToggleElement: {
                container: 'vfb-config-toggle',
              },
              ListElement: {
                remove: 'vfb-config-list-remove',
              },
            },
          },
          'separator': {
            addClasses: {
              ElementLayout: {
                container: 'vfb-util-props-separator'
              }
            }
          },
          'separator-top': {
            addClasses: {
              ElementLayout: {
                container: 'vfb-util-props-separator-top'
              }
            }
          },
          'prop-multiline': {
            addClasses: {
              ElementAddon: {
                container: 'pt-2 mt-px'
              },
            },
            replaceClasses: {
              ElementAddon: {
                container: {
                  'items-center': 'items-start'
                }
              },
            },
          },
          'prop-toggle': {
            addClasses: {
              ElementLabel: {
                container: 'flex items-center'
              },
            },
          },
          'prop-subtitle': {
            addClasses: {
              StaticElement: {
                container: 'vfb-util-props-subtitle'
              }
            },
          },
          'prop-subtitle-no-m': {
            addClasses: {
              StaticElement: {
                container: 'vfb-util-props-subtitle-no-m'
              }
            },
          },
          'prop-list-subtitle': {
            addClasses: {
              ElementLabel: {
                container: 'vfb-util-props-list-subtitle'
              }
            }
          },
          'prop-list': {
            addClasses: {
              ElementLabel: {
                container: 'vfb-util-props-list-label',
              },
              ListElement: {
                add: 'vfb-util-props-list-add'
              },
              ElementLayout: {
                container: 'vfb-util-props-list-layout',
              }
            },
            removeClasses: {
              ListElement: {
                listItem_sm: ['form-gap-gutter-sm'],
              }
            },
          },
          'prop-list-object': {
            removeClasses: {
              ObjectElement: {
                wrapper_sm: ['form-gap-gutter-sm'],
              }
            },
          },
          'prop-list-el': {
            removeClasses: {
              TextElement: {
                inputContainer: ['form-border-width-input'],
                inputContainer_sm: ['form-radius-input-sm'],
                inputContainer_default: ['form-bg-input', 'hover:form-bg-input-hover', 'focused:form-bg-input-focus', 'focused:form-ring'],
                inputContainer_success: ['form-bg-input-success', 'focused:form-ring'],
              },
              TTextElement: {
                inputContainer: ['form-border-width-input'],
                inputContainer_sm: ['form-radius-input-sm'],
                inputContainer_default: ['form-bg-input', 'hover:form-bg-input-hover', 'focused:form-bg-input-focus', 'focused:form-ring'],
                inputContainer_success: ['form-bg-input-success', 'focused:form-ring'],
              },
              TextareaElement: {
                inputContainer: ['form-border-width-input'],
                inputContainer_sm: ['form-radius-large-sm'],
                inputContainer_default: ['form-bg-input', 'hover:form-bg-input-hover', 'focused:form-bg-input-focus', 'focused:form-ring'],
                inputContainer_success: ['form-bg-input-success', 'focused:form-ring'],
              },
              TTextareaElement: {
                inputContainer: ['form-border-width-input'],
                inputContainer_sm: ['form-radius-large-sm'],
                inputContainer_default: ['form-bg-input', 'hover:form-bg-input-hover', 'focused:form-bg-input-focus', 'focused:form-ring'],
                inputContainer_success: ['form-bg-input-success', 'focused:form-ring'],
              },
              DateElement: {
                inputContainer: ['form-border-width-input'],
                inputContainer_sm: ['form-radius-input-sm'],
                inputContainer_default: ['form-bg-input', 'hover:form-bg-input-hover', 'focused:form-bg-input-focus', 'focused:form-ring'],
                inputContainer_success: ['form-bg-input-success', 'focused:form-ring'],
              },
              SelectElement: {
                input: ['form-border-width-input'],
                input_sm: ['form-radius-input-sm'],
                input_default: ['form-bg-input', 'hover:form-bg-input-hover', 'focused:form-bg-input-focus', 'focused:form-ring'],
                input_success: ['form-bg-input-success', 'focused:form-ring'],
                select: {
                  container: ['form-border-width-input'],
                  container_sm: ['form-radius-input-sm'],
                  container_default: ['form-bg-input', 'hover:form-bg-input-hover', 'focused:form-bg-input-focus', 'focused:form-ring'],
                  container_success: ['form-bg-input-success', 'focused:form-ring'],
                }
              },
              TagsElement: {
                select: {
                  container: ['form-border-width-input'],
                  container_sm: ['form-radius-input-sm'],
                  container_default: ['form-bg-input', 'hover:form-bg-input-hover', 'focused:form-bg-input-focus', 'focused:form-ring'],
                  container_success: ['form-bg-input-success', 'focused:form-ring'],
                }
              },
            },
            addClasses: {
              TextElement: {
                inputContainer: 'vfb-util-props-list-el-input',
                inputContainer_default: 'vfb-util-props-list-el-input-default',
                inputContainer_success: 'vfb-util-props-list-el-input-success',
              },
              TTextElement: {
                inputContainer: 'vfb-util-props-list-el-input',
                inputContainer_default: 'vfb-util-props-list-el-input-default',
                inputContainer_success: 'vfb-util-props-list-el-input-success',
              },
              TextareaElement: {
                inputContainer: 'vfb-util-props-list-el-input',
                inputContainer_default: 'vfb-util-props-list-el-input-default',
                inputContainer_success: 'vfb-util-props-list-el-input-success',
              },
              TTextareaElement: {
                inputContainer: 'vfb-util-props-list-el-input',
                inputContainer_default: 'vfb-util-props-list-el-input-default',
                inputContainer_success: 'vfb-util-props-list-el-input-success',
              },
              DateElement: {
                inputContainer: 'vfb-util-props-list-el-input',
                inputContainer_default: 'vfb-util-props-list-el-input-default',
                inputContainer_success: 'vfb-util-props-list-el-input-success',
              },
              SelectElement: {
                input: 'vfb-util-props-list-el-select',
                input_default: 'vfb-util-props-list-el-select-default',
                input_success: 'vfb-util-props-list-el-select-success',
                select: {
                  container: 'vfb-util-props-list-el-select-container',
                  container_default: 'vfb-util-props-list-el-select-container-default',
                  container_success: 'vfb-util-props-list-el-select-container-success',
                }
              },
              TagsElement: {
                select: {
                  container: 'vfb-util-props-list-el-select-container',
                  container_default: 'vfb-util-props-list-el-select-container-default',
                  container_success: 'vfb-util-props-list-el-select-container-success',
                }
              },
            },
          },
          'prop-group': {
            addClasses: {
              GroupElement: {
                container: 'vfb-util-props-group'
              },
            },
          },
          'colorpicker': {
            addClasses: {
              TextElement: {
                inputContainer: 'vfb-util-colorpicker-input',
              },
              ElementAddon: {
                container: 'vfb-util-colorpicker-addon',
              }
            }
          },
          'number': {
            replaceClasses: {
              TextElement: {
                input_sm: {
                  'form-p-input-sm': 'vfb-util-number-input'
                }
              },
              ElementAddon: {
                container: {
                  'form-color-addon': 'vfb-util-number-addon'
                }
              }
            },
          },
          'tabs-outline': {
            overrideClasses: {
              RadiogroupRadio: {
                wrapper_selected: 'vfb-util-tabs-outline-selected',
                wrapper_unselected: 'vfb-util-tabs-outline-unselected',
              },
            },
          },
          'tabs-outline-gray': {
            overrideClasses: {
              RadiogroupRadio: {
                wrapper_selected: 'vfb-util-tabs-outline-gray-selected',
                wrapper_unselected: 'vfb-util-tabs-outline-gray-unselected',
              },
            },
          },
          'tabs-2': {
            addClasses: {
              RadiogroupElement: {
                wrapper: 'vfb-util-grid-cols-12'
              },
              RadiogroupRadio: {
                container: 'vfb-util-col-span-6'
              },
            },
          },
          'tabs-3': {
            addClasses: {
              RadiogroupElement: {
                wrapper: 'vfb-util-grid-cols-12'
              },
              RadiogroupRadio: {
                container: 'vfb-util-col-span-4'
              },
            },
          },
          'tabs-4': {
            addClasses: {
              RadiogroupElement: {
                wrapper: 'vfb-util-grid-cols-12'
              },
              RadiogroupRadio: {
                container: 'vfb-util-col-span-3'
              },
            },
          },
          'tabs-6': {
            addClasses: {
              RadiogroupElement: {
                wrapper: 'vfb-util-grid-cols-12'
              },
              RadiogroupRadio: {
                container: 'vfb-util-col-span-2'
              },
            },
          },
          'tabs-12': {
            addClasses: {
              RadiogroupElement: {
                wrapper: 'vfb-util-grid-cols-12'
              },
              RadiogroupRadio: {
                container: 'vfb-util-col-span-1'
              },
            },
          },
          'tabs-tiny': {
            replaceClasses: {
              RadiogroupRadio: {
                wrapper_sm: {
                  'form-text-sm': 'vfb-util-tabs-tiny'
                }
              },
              CheckboxgroupCheckbox: {
                wrapper_sm: {
                  'form-text-sm': 'vfb-util-tabs-tiny'
                }
              },
              ElementLabel: {
                wrapper: {
                  'leading-snug': 'leading-none'
                }
              }
            },
          },
          'tabs-small': {
            replaceClasses: {
              RadiogroupRadio: {
                wrapper_sm: {
                  'form-text-sm': 'vfb-util-tabs-small'
                }
              },
            },
          },
        }

        return config
      }
    }),
    () => ({
      apply: ['Vueform'],
      emits: [
        'rename-page', 'add-page',  'remove-page', 'move-page', 'move-to-page',
        'move-element', 'add-element', 'remove-pages', 'select-page', 'event',
      ],
      props: {
        selectedElement: {
          required: false,
          type: String,
        },
        selectedPage: {
          type: String,
          required: false,
        },
        draggingElement: {
          required: false,
          type: [null, String, Boolean],
        },
        draggingPage: {
          required: false,
          type: [null, String, Boolean],
        },
        builder: {
          required: false,
          type: Boolean,
          default: false,
        },
        nesting: {
          required: false,
          type: Boolean,
          default: false,
        },
        draggedSchema: {
          required: false,
          type: Object,
        },
        elementTypes: {
          required: false,
          type: Object,
          default: () => ({})
        },
        builderTree: {
          required: false,
          type: Array,
          default: () => ([]),
        },
        builderFlatTree: {
          required: false,
          type: Array,
          default: () => ([]),
        },
        builderPagedTree: {
          required: false,
          type: Array,
          default: () => ([]),
        },
        device: {
          required: false,
          type: String,
        },
        modelDuplicates: {
          required: false,
          type: Array,
        },
      },
      setup(props, context, component) {
        const { builder, schema, draggedSchema, tabs, steps } = toRefs(props)

        if (!builder.value) {
          return component
        }

        // =============== INJECT ===============

        const subscribeOnce = inject('subscribeOnce')

        // ================ DATA ================

        const droppingFirst = ref(false)

        // ============== COMPUTED ==============

        const hasTabs = computed(() => {
          return tabs.value && Object.keys(tabs.value).length
        })

        const hasSteps = computed(() => {
          return steps.value && Object.keys(steps.value).length
        })

        const isEmpty = computed(() => {
          if (hasTabs.value) {
            return !component.tabs$.value?.current$?.elements?.length
          }

          if (hasSteps.value) {
            return !component.steps$.value?.current$?.elements?.length
          }

          return !Object.keys(schema.value).length
        })

        const currentPage$ = computed(() => {
          return hasTabs.value
            ? component.tabs$.value.current$
            : (hasSteps.value
              ? component.steps$.value.current$
              : undefined
            )
        })

        const hasPages = computed(() => {
          return hasTabs.value || hasSteps.value
        })

        const pageType = computed(() => {
          return hasTabs.value ? 'tab' : (
            hasSteps.value ? 'step' : undefined
          )
        })

        // ============== METHODS ===============

        const reset = (setDefault = true) => {
          _.each(component.elements$.value, (e$) => {
            if (e$.isStatic) {
              return
            }
            
            e$.reset(setDefault)
          })

          if (component.steps$.value !== null) {
            component.steps$.value.reset()
          }

          if (component.tabs$.value !== null) {
            component.tabs$.value.reset()
          }

          component.fire('reset')
        }

        const submit = async () => {
          if (component.isDisabled.value) {
            return
          }
          
          await component.validate()

          if (component.invalid.value) {
            return
          }

          component.preparing.value = true

          try {
            await component.prepareElements()
            
            if (typeof component.options.value.prepare === 'function') {
              await component.options.value.prepare(component.form$.value)
            }
          } catch (error) {
            component.fire('error', error, { type: 'prepare' }, component.form$.value)
            console.error(error)
            return
          } finally {
            component.preparing.value = false
          }
          
          component.fire('submit', component.form$.value)
        }

        const handleSelectPage = (name) => {
          context.emit('select-page', name)
        }

        const handleRenamePage = (page, value) => {
          context.emit('rename-page', page, value)
        }

        const handleRemovePage = (value) => {
          context.emit('remove-page', value)
        }

        const handleAddPage = () => {
          context.emit('add-page')
        }

        const handleRemovePages = () => {
          context.emit('remove-pages')
        }

        const handleMovePage = (page, position, target) => {
          context.emit('move-page', page, position, target)
        }

        const handleMoveToPage = (page, schema, parentPath) => {
          context.emit('move-to-page', page, schema, parentPath)
        }

        const handleDragOver = (e) => {
          e.preventDefault()

          if (draggedSchema.value && ['tabs', 'steps'].indexOf(draggedSchema.value.type) === -1) {
            droppingFirst.value = true
          }
        }

        const handleDragLeave = () => {
          droppingFirst.value = false
        }

        const handleDrop = (e) => {
          let schema = e.dataTransfer.getData('schema')
          let path = e.dataTransfer.getData('path')

          if (path && currentPage$.value) {
            let currentPage = currentPage$.value.name

            // If element is in a container / list
            if (path && path.match(/\./)) {
              // Then move to a different tab
              subscribeOnce('moved-element', (newPath) => {
                nextTick(() => {
                  context.emit('move-to-page', currentPage, newPath)
                })
              })

              let to = currentPage$.value.elements?.pop()

              // First move out the element from the container
              component.el$(path).$emit('move-element', path, 'after', to)

            // If it's root just move to a tab
            } else if (path) {
              context.emit('move-to-page', currentPage, path)
            } else {
              // Then move to a different tab
              subscribeOnce('added-element', (schema, path) => {
                nextTick(() => {
                  context.emit('move-to-page', currentPage, path)
                })
              })

              context.emit('add-element', JSON.parse(schema), 'after')
            }
          } else if (schema) {
            context.emit('add-element', JSON.parse(schema), 'after')
          }

          droppingFirst.value = false
        }

        return {
          ...component,
          isEmpty,
          droppingFirst,
          hasPages,
          pageType,
          reset,
          submit,
          handleSelectPage,
          handleRenamePage,
          handleRemovePage,
          handleAddPage,
          handleRemovePages,
          handleMovePage,
          handleMoveToPage,
          handleDragOver,
          handleDragLeave,
          handleDrop,
        }
      }
    }),
    () => ({
      apply: ['Vueform'],
      emits: [
        'update-builder', 'download', 'closed-changed', 'announce',
      ],
      props: {
        pluginSettings: {
          required: false,
          type: Boolean,
          default: false,
        },
        name: {
          type: String,
          required: false,
        },
        sections: {
          required: false,
          type: Object,
        },
        fieldOptions: {
          required: false,
          type: Object,
          default: () => ({}),
        },
        closed: {
          required: false,
          type: Array,
          default: () => ([]),
        },
        k: {
          required: false,
          type: String,
          default: 'key'
        },
        lazy: {
          required: false,
          type: Boolean,
          default: false,
        },
        excludeFields: {
          required: false,
          type: Array,
          default: () => ([]),
        },
        builderConfig: {
          required: false,
          type: Object,
          default: () => ({}),
        },
      },
      setup(props, context, component) {
        const { pluginSettings, } = toRefs(props)

        if (!pluginSettings.value) {
          return component
        }

        const form = component

        const {
          sections,
          fieldOptions,
          closed,
          name,
          lazy,
          excludeFields,
        } = toRefs(props)

        const icon = resolveComponent('BuilderIcon')
        const tooltip = resolveComponent('BuilderTooltip')

        // ============== INJECTS ===============

        const config$ = inject('builderConfig$')

        const storage$ = inject('storage$')

        // ================ DATA ================

        const vueform = ref({
          size: 'sm',
          displayErrors: false,
          forceLabels: false,
          presets: ['props-form'],
        })

        const closedSections = ref([...closed.value])

        const onceOpened = ref([
          ...Object.keys(sections.value).filter(s => sections.value[s].collapsible === false || closed.value.indexOf(s) === -1)
        ])

        const formLoading = ref(false)

        const watchers = ref([])

        const watchersLog = ref([])

        const lastLoad = ref({})

        const loadingSections = ref([])

        // ============== COMPUTED ==============

        const resolvedFields = computed(() => {
          let fields = []

          Object.keys(sections.value).forEach((sectionName) => {
            const section = sections.value[sectionName]

            Object.keys(section.fields).forEach((fieldName) => {
              const field = section.fields[fieldName]
              
              if (excludeFields.value.indexOf(`${sectionName}.${fieldName}`) === -1) {
                fields.push(new field.type({
                  ...fieldOptions.value,
                  extend: field.extend || {},
                  loading: formLoading,
                  emit: context.emit,
                  icon,
                  tooltip,
                  section: section.name,
                  field,
                  closedSections,
                  closeAll,
                  openAll,
                  config$: config$.value,
                }))
              }
            })
          })

          return fields
        })

        const resolvedSections = computed(() => {
          let tempSections = {}

          Object.keys(sections.value).forEach((sectionName) => {
            const section = sections.value[sectionName]
            let s = {}

            Object.keys(section.fields).forEach((fieldName) => {
              const field = section.fields[fieldName]

              let f = new field.type({
                ...fieldOptions.value,
                extend: field.extend || {},
                loading: formLoading,
                emit: context.emit,
                icon,
                tooltip,
                section: sectionName,
                field,
                closedSections,
                closeAll,
                openAll,
                config$: config$.value,
              })

              if (excludeFields.value.indexOf(`${sectionName}.${fieldName}`) === -1) {
                s = {
                  ...s,
                  ...f.finalSchema,
                }
              }
            })

            tempSections[sectionName] = {
              ...section,
              schema: s,
            }
          })

          return tempSections
        })

        // =============== METHODS ==============

        const loadSettings = async (data, section) => {
          if (!section) {
            lastLoad.value = _.cloneDeep(data)
          }

          await nextTick()

          let load = {}

          formLoading.value = true

          let fields = resolvedFields.value

          if (section) {
            fields = fields.filter(f => f.section === section)
          }

          await asyncForEach(fields, async (field) => {
            load = {
              ...load,
              ...((await field.load(data, form)) || {})
            }

            if (field.watchers) {
              Object.keys(field.watchers).forEach((elementPath) => {
                field.watchers[elementPath].forEach((watcher) => {
                  let target = Array.isArray(watcher[0]) ? watcher[0] : [watcher[0]]
                  target = target.map(t => computed(() => _.get(form.data.value, t)))

                  let watcherFunction = (value, old) => {
                    watcher[1](
                      form.el$(elementPath),
                      Array.isArray(watcher[0]) ? value : value[0],
                      Array.isArray(watcher[0]) ? old : old[0]
                    )
                  }

                  let unwatch = watch(target, watcherFunction)

                  watchers.value.push(unwatch)
                  watchersLog.value.push({
                    target,
                    elementPath,
                    watcherFunction,
                  })
                })
              })
            }
          })

          let target = section ? form.el$(section) : form
          let elements$ = section ? target.children$ : target.elements$.value

          target.load(load, true)

          Object.keys(elements$).forEach((elementName) => {
            let element$ = elements$[elementName]
            
            if (!element$.isStatic) {
              element$.messageBag.clear()
            }
          })

          setTimeout(() => {
            formLoading.value = false
          }, 0)
        }

        const clearSettings = () => {
          formLoading.value = true

          clearWatchers()

          form.clear()

          setTimeout(() => {
            formLoading.value = false
          }, 0)
        }

        const clearWatchers = () => {
          watchers.value.forEach(unwatch=>unwatch())
          watchers.value = []
          watchersLog.value = []
        }

        const close = (section) => {
          closedSections.value.push(section)

          context.emit('announce', 'COLLAPSED')
        }

        const open = async (section) => {
          if (onceOpened.value.indexOf(section) === -1) {
            loadingSections.value.push(section)

            setTimeout(() => {
              onceOpened.value = onceOpened.value.concat([section])
              closedSections.value = closedSections.value.filter(s => s !== section)

              nextTick(() => {
                document.querySelectorAll('.vfb-panels-container textarea[data-autogrow]').forEach((textarea) => {
                  component.form$.value.$vueform.services.autosize.update(textarea)
                })
              })

              context.emit('announce', 'EXPANDED')
            }, 0)
          } else {
            closedSections.value = closedSections.value.filter(s => s !== section)
            context.emit('announce', 'EXPANDED')
          }

        }

        const toggle = (section) => {
          if (closedSections.value.indexOf(section) !== -1) {
            open(section)
          } else {
            close(section)
          }
        }

        const closeAll = () => {
          closedSections.value = [
            ...Object.keys(sections.value).filter(s => sections.value[s].collapsible !== false)
          ]
        }

        const openAll = () => {
          closedSections.value = []

          let neverOpened = Object.keys(sections.value).filter(s => onceOpened.value.indexOf(s) === -1)

          neverOpened.forEach((section) => {
            loadingSections.value.push(section)
          })

          setTimeout(() => {
            onceOpened.value = [
              ...Object.keys(sections.value).filter(s => sections.value[s].collapsible !== false)
            ]
          }, 0)
        }

        const handleFormSubmit = () => {
          if ("activeElement" in document) {
            document.activeElement.blur()
          }
        }

        // ============== WATCHERS ==============

        watch(closedSections, (n) => {
          if (!lazy.value) {
            storage$.value.set(`${name.value}-closed`, JSON.stringify(n))
            context.emit('closed-changed', n)
          }
        }, { deep: true })

        watch(name, (n) => {
          if (n && storage$.value.get(`${n}-closed`)) {
            closedSections.value = JSON.parse(storage$.value.get(`${n}-closed`))
          }
        }, { immediate: false })

        watch(onceOpened, async (n, o) => {
          if (!lazy.value) {
            _.difference(n, o).forEach((section) => {
              loadingSections.value = loadingSections.value.filter(s => s !== section)
            })
            return
          }

          await nextTick()

          await asyncForEach(_.difference(n, o), async (section) => {
            loadingSections.value.push(section)
            await loadSettings(lastLoad.value, section)
            loadingSections.value = loadingSections.value.filter(s => s !== section)
          })
        }, { immediate: false })

        // =============== HOOKS ================

        onMounted(() => {
          if (lazy.value) {
            return
          }

          if (storage$.value.get(`${name.value}-closed`)) {
            closedSections.value = JSON.parse(storage$.value.get(`${name.value}-closed`))
          }
        })

        return {
          ...form,
          vueform,
          onceOpened,
          closedSections,
          resolvedSections,
          loadSettings,
          clearSettings,
          clearWatchers,
          toggle,
          closeAll,
          openAll,
          handleFormSubmit,
          watchers,
          watchersLog,
          loadingSections
        }
      }
    }),
    () => ({
      apply: ['FormElements'],
      props: {
        draggingElement: {
          required: false,
          type: [null, String, Boolean],
        },
        draggingPage: {
          required: false,
          type: [null, String, Boolean],
        },
        draggedSchema: {
          required: false,
          type: Object,
        },
      },
    }),
    () => ({
      apply: ['FormTabs', 'FormSteps'],
      emits: [
        'rename-page', 'add-page', 'remove-pages', 'remove-page', 'move-page', 'move-to-page', 'add-element',
        'select-page', 'start-moving',
      ],
      props: {
        draggingElement: {
          required: false,
          type: [null, String, Boolean],
        },
        draggingPage: {
          required: false,
          type: [null, String, Boolean],
        },
        draggedSchema: {
          required: false,
          type: Object,
        },
        moving: {
          required: false,
          type: [Boolean, Object],
          default: false,
        },
        pointer: {
          required: false,
          type: Object,
          default: () => ({}),
        },
      },
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const announce = inject('announce')

        // ================ DATA ================

        const wrapper = ref(null)

        // ============== METHODS ===============

        const handleSelectPage = (name) => {
          context.emit('select-page', name)
        }

        const handleRenamePage = (page, value) => {
          context.emit('rename-page', page, value)
        }

        const handleAddClick = () => {
          context.emit('add-page')

          nextTick(() => {
            component.last$.value.edit()
          })
        }
        
        const handleRemoveClick = () => {
          context.emit('remove-pages')
          context.emit('select-page', null)

          announce('REMOVED')
        }

        const handleRemovePage = (value) => {
          context.emit('remove-page', value)
        }

        const handleMovePage = (page, position, target) => {
          context.emit('move-page', page, position, target)
        }

        const handleMoveToPage = (page, schema, parentPath) => {
          context.emit('move-to-page', page, schema, parentPath)
        }

        const handleAddElement = (schema, position, targetPath) => {
          context.emit('add-element', schema, position, targetPath)
        }

        const handleStartMoving = (page, source) => {
          context.emit('start-moving', page, source)
        }

        return {
          ...component,
          wrapper,
          handleRenamePage,
          handleAddClick,
          handleRemoveClick,
          handleRemovePage,
          handleMovePage,
          handleMoveToPage,
          handleAddElement,
          handleSelectPage,
          handleStartMoving,
        } 
      }
    }),
    () => ({
      apply: ['FormTab'],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        // ================ DATA ================

        const removeConfirm = ref('This will also remove all elements within the tab. Are you sure?')

        // ============== COMPUTED ==============
        
        const pageLabel = computed(() => {
          return component.tabLabel.value
        })
        
        const pages$ = computed(() => {
          return component.tabs$.value?.tabs$
        })

        // ============== METHODS ===============

        const goTo = (name) => {
          component.form$.value.tabs$.goTo(name)
        }

        return {
          ...component,
          removeConfirm,
          pageLabel,
          pages$,
          goTo,
        } 
      }
    }),
    () => ({
      apply: ['FormStep'],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        // ================ DATA ================

        const removeConfirm = ref('This will also remove all elements within the step. Are you sure?')

        // ============== COMPUTED ==============
        
        const pageLabel = computed(() => {
          return component.stepLabel.value
        })
        
        const pages$ = computed(() => {
          return component.steps$.value?.steps$
        })

        // ============== METHODS ===============

        const goTo = (name) => {
          component.form$.value.steps$.goTo(name)
        }

        return {
          ...component,
          removeConfirm,
          pageLabel,
          pages$,
          goTo,
        } 
      }
    }),
    () => ({
      apply: ['FormTab', 'FormStep'],
      props: {
        builder: {
          type: Object,
          required: false,
        },
        draggingElement: {
          required: false,
          type: [null, String, Boolean],
        },
        draggingPage: {
          required: false,
          type: [null, String, Boolean],
        },
        draggedSchema: {
          required: false,
          type: Object,
        },
        moving: {
          required: false,
          type: [Boolean, Object],
          default: false,
        },
        pointer: {
          required: false,
          type: Object,
          default: () => ({}),
        },
      },
      emits: [
        'rename-page', 'remove-page', 'move-page', 'move-to-page', 'add-element', 'select-page',
        'start-moving',
      ],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const { name, draggingPage, moving, pointer } = toRefs(props)

        const subscribeOnce = inject('subscribeOnce')

        const announce = inject('announce')

        // ================ DATA ================

        const editing = ref(false)

        const editLabel = ref(null)

        const input = ref(null)

        const highlighted = ref(null)

        // ============== COMPUTED ==============

        const beingDragged = computed(() => {
          return draggingPage.value === name.value
        })

        const selectedPage = computed(() => {
          return component.form$.value.selectedPage
        })

        const isSelected = computed(() => {
          return name.value === selectedPage.value
        })

        const beingMoved = computed(() => {
          if (!moving.value) {
            return false
          }

          return moving.value.source === 'preview' && moving.value.type === 'page' && moving.value.path === name.value
        })

        const pointed = computed(() => {
          return moving.value.source === 'preview' && pointer.value.path === name.value &&
                 (moving.value.type === 'page' || pointer.value.type === 'page')

        })

        const index = computed(() => {
          return parseInt(name.value.replace('page', ''))
        })

        const count = computed(() => {
          return Object.keys(component.form$.value[`${pageType.value}s`]).length
        })

        const pageType = computed(() => {
          return component.form$.value.pageType
        })

        // ============== METHODS ===============

        const edit = () => {
          editing.value = true
          editLabel.value = component.pageLabel.value

          nextTick(() => {
            input.value.select()
          })
        }

        const save = () => {
          editing.value = false
          context.emit('rename-page', name.value, editLabel.value)
        }

        const cancel = () => {
          editing.value = false
        }

        const focus = (path) => {
          component.form$.value.$el.querySelector(`[data-page="${path}"]`).focus()
        }

        const handleClick = (e) => {
          e.stopPropagation()

          if (component.form$.value.editorMode && !e.ctrlKey && !e.metaKey) {
            context.emit('select-page', name.value)
            component.form$.value.$emit('select-element', null)
          }

          component.select()
        }

        const handleKeyDown = (e) => {
          if (component.form$.value.editorMode) {
            if (['Enter'].indexOf(e.key) !== -1) {
              e.preventDefault()
              e.stopPropagation()

              context.emit('select-page', name.value)
              component.form$.value.$emit('select-element', null)

              setTimeout(() => {
                e.target.closest('.vfb-builder').querySelector('.vfb-config-panel-container-page').focus()
              }, 1000)

              announce('CONFIG_PANEL_OPENED')
            }
            
            else if ([' '].indexOf(e.key) !== -1) {
              e.preventDefault()
              e.stopPropagation()

              announce('PAGE_GRABBED', {
                page: component.pageLabel.value,
              })

              context.emit('start-moving', {
                path: name.value,
                source: 'preview',
                type: 'page',
              })
            }
            
            else if (['ArrowRight'].indexOf(e.key) !== -1) {
              e.preventDefault()

              if (count.value > index.value + 1) {
                focus(`page${index.value + 1}`)
              }
            }
            
            else if (['ArrowLeft'].indexOf(e.key) !== -1) {
              e.preventDefault()

              if (index.value > 0) {
                focus(`page${index.value - 1}`)
              }
            }
            
            else if (['Delete'].indexOf(e.key) !== -1) {
              e.preventDefault()

              handleRemoveClick()
            }
          }
          
          if (['Enter', ' '].indexOf(e.key) !== -1) {
            component.select()
          }
        }

        const handleDoubleClick = () => {
          if (!component.form$.value.editorMode) {
            return
          }
          
          edit()
        }

        const handleEditClick = () => {
          context.emit('select-page', name.value)
        }

        const handleConditionsClick = () => {
          
        }

        const handleRemoveClick = () => {
          if (Object.keys(component.children$.value).length && Object.keys(component.pages$.value).length > 1 && !confirm(component.removeConfirm.value)) {
            return
          }

          context.emit('remove-page', name.value)
        }

        const handleClearClick = () => {
          
        }

        const handleInputBlur = () => {
          if (!editing.value) {
            return
          }

          save()
        }

        const handleInputKeyDown = (e) => {
          if (e.key === 'Enter') {
            save()
          }

          if (e.key === 'Escape') {
            e.preventDefault()
            cancel()
          }
        }

        const handleDragStart = (e) => {
          e.dataTransfer.setData('page', name.value)
          e.dataTransfer.effectAllowed = 'move'
          e.dataTransfer.dropEffect = 'move'
        }

        const handleDragEnd = () => {
        }

        const handleDragOver = (e, position) => {
          e.preventDefault()

          highlighted.value = position

          if (position === 'middle') {
            component.goTo(name.value)

            if (selectedPage.value !== name.value) {
              context.emit('select-page', name.value)
            }
          }
        }

        const handleDragLeave = () => {
          highlighted.value = null
        }

        const handleDrop = (e, position) => {
          highlighted.value = null

          let page = e.dataTransfer.getData('page') || undefined

          if (page) {
            context.emit('move-page', page, position, name.value)
            return
          }

          let path = e.dataTransfer.getData('path') || undefined

          // If element is in a container / list
          if (path && path.match(/\./)) {
            // Then move to a different tab
            subscribeOnce('moved-element', (newPath) => {
              nextTick(() => {
                context.emit('move-to-page', name.value, newPath)
              })
            })

            let to = component.form$.value.tabs$.current$.elements?.pop()

            // First move out the element from the container
            component.form$.value.el$(path).$emit('move-element', path, 'after', to)

          // If it's root just move to a tab
          } else if (path) {
            context.emit('move-to-page', name.value, path)
          } else {
            let schema = JSON.parse(e.dataTransfer.getData('schema'))

            // Then move to a different tab
            subscribeOnce('added-element', (schema, path) => {
              nextTick(() => {
                context.emit('move-to-page', name.value, path)
              })
            })

            context.emit('add-element', schema, 'after')
          }
        }

        return {
          ...component,
          handleKeyDown,
          handleDoubleClick,
          handleEditClick,
          handleConditionsClick,
          handleRemoveClick,
          handleClearClick,
          handleInputBlur,
          handleInputKeyDown,
          handleDragStart,
          handleDragEnd,
          handleDragOver,
          handleDragLeave,
          handleDrop,
          handleClick,
          edit,
          pointed,
          beingMoved,
          isSelected,
          selectedPage,
          beingDragged,
          highlighted,
          editing,
          editLabel,
          input,
        } 
      }
    }),
    () => ({
      apply: ['FormStepsControls'],
      emits: [
        'select-page',
      ],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        // ============== COMPUTED ==============

        const isSelected = computed(() => {
          return !!component.form$.value.selectedPage
        })

        // ============== METHODS ===============

        const handleClick = () => {
          if (component.form$.value.editorMode) {
            nextTick(() => {
              context.emit('select-page', component.form$.value.steps$.current$.name)
            })
          }
        }

        return {
          ...component,
          isSelected,
          handleClick,
        } 
      }
    }),
    () => ({
      apply: ['HiddenElement'],
      props: {
        classes: {
          required: false,
          type: Object,
          default: () => ({})
        },
        columnsClasses: {
          required: false,
          type: Object,
          default: () => ({
            container: 'col-span-12',
            innerContainer: 'col-span-12',
            wrapper: 'col-span-12',
          })
        },
        visible: {
          required: false,
          type: Boolean,
          default: true
        },
      }
    }),
    () => ({
      apply: ['StaticElement'],
      props: {
        sourcePath: {
          type: String,
          required: false,
        },
        emptyText: {
          type: String,
          required: false,
        },
        handleEvent: {
          type: Function,
          required: false,
        },
        conditionType: {
          type: String,
          required: false,
        }
      },
    }),
    () => ({
      apply: ['FileElement'],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const axios = {
          request: (options) => {
            return new Promise((resolve) => {
              let { data } = options

              return resolve(options.url == '/vueform/file/remove' ? true : {
                data: data.get([...data.keys()][0]).name
              })
            })
          },
          CancelToken: { source: () => ({ token: 'token' }) },
          token: null,
          isCancel: () => { return false },
          __CUSTOM__: true
        }

        watch(component.axios, (n) => {
          if (!n.__CUSTOM__) {
            component.axios.value = axios
          }
        })

        return {
          ...component,
          axios,
        }
      }
    }),
    () => ({
      apply: ['ListElement'],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const { element, initial } = toRefs(props)

        const hasPrototype = computed(() => {
          return (component.isObject.value && component.prototype.value.schema) ||
                (!component.isObject.value && element && element.value?.type)
        })

        const childName = computed(() => {
          if (!element || !element.value?.type || !element.value?.builder?.type) {
            return
          }

          // let name = element.value?.builder?.type || element.value.type
          // return `${component.form$.value.elementTypes[name].label} (repeat)`

          return `(repeat)`
        })

        const reset = (setDefault = true) => {
          component.value.value = setDefault
            ? _.cloneDeep(component.defaultValue.value)
            : _.cloneDeep(component.nullValue.value)


          component.resetValidators()

          let instances = component.form$.value.editorMode ? 1 : initial.value

          if (!component.value.value.length && instances > 0) {
            for (let i = 0; i < instances; i++) {
              component.add()
            }

            nextTick(() => {
              component.children$Array.value.forEach((child$) => {
                child$.reset()
              })
            })
          }
    
          nextTick(() => {
            component.refreshOrderStore(component.value.value)
          })
        }

        return {
          ...component,
          hasPrototype,
          childName,
          reset,
        } 
      }
    }),
    () => ({
      apply: ['ObjectElement', 'GroupElement'],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const reset = (setDefault = true) => {
          _.each(component.children$.value, (element$) => {
            if (element$.isStatic) {
              return
            }
            
            element$.reset(setDefault)
          })
        }

        return {
          ...component,
          reset,
        } 
      }
    }),
    () => ({
      apply: ['ObjectElement', 'GroupElement', 'ListElement'],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const nestingLevel = computed(() => {
          return component.el$.value.path.split('.').length - 1
        })

        return {
          ...component,
          nestingLevel,
        }
      }
    }),

    () => ({
      apply: ['FormElements', 'Vueform', 'GroupElement', 'ObjectElement', 'ListElement'],
      emits: [
        'add-element', 'move-element', 'select-element', 'clone-element', 'remove-element', 'resize-element', 'set-dragged-schema', 'announce',
        'start-moving',
      ],
      props: {
        editorMode: {
          required: false,
          type: Boolean,
          default: false,
        },
        moving: {
          required: false,
          type: [Boolean, Object],
          default: false,
        },
        pointer: {
          required: false,
          type: Object,
          default: () => ({}),
        },
      },
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        // ============== METHODS ===============

        const handleAddElement = (schema, position, targetPath) => { context.emit('add-element', schema, position, targetPath) }
        const handleMoveElement = (from, position, to) => { context.emit('move-element', from, position, to) }
        const handleSelectElement = (path) => { context.emit('select-element', path) }
        const handleCloneElement = (path) => { context.emit('clone-element', path) }
        const handleRemoveElement = (path) => { context.emit('remove-element', path) }
        const handleResizeElement = (path, width) => { context.emit('resize-element', path, width) }
        const handleSetDraggedSchema = (schema) => { context.emit('set-dragged-schema', schema) }
        const handleAnnounce = (msg, params) => { context.emit('announce', msg, params) }
        const handleStartMoving = (path, source) => { context.emit('start-moving', path, source) }

        return {
          ...component,
          handleAddElement,
          handleMoveElement,
          handleSelectElement,
          handleCloneElement,
          handleRemoveElement,
          handleResizeElement,
          handleSetDraggedSchema,
          handleAnnounce,
          handleStartMoving,
        } 
      }
    }),
    () => ({
      apply: /^[a-zA-Z]*Element$/,
      emits: [
        'add-element', 'move-element', 'select-element', 'clone-element', 'remove-element', 'resize-element', 'set-dragged-schema', 'announce',
        'start-moving',
      ],
      props: {
        builder: {
          required: false,
          type: Object,
        },
        droppable: {
          required: false,
          type: Boolean,
          default: true,
        },
        cloneable: {
          required: false,
          type: Boolean,
          default: true,
        },
        displayName: {
          required: false,
          type: String,
        },
        allowSiblings: {
          required: false,
          type: Boolean,
          default: true,
        },
        draggingElement: {
          required: false,
          type: [null, String, Boolean],
        },
        draggingPage: {
          required: false,
          type: [null, String, Boolean],
        },
        draggedSchema: {
          required: false,
          type: Object,
        },
        moving: {
          required: false,
          type: [Boolean, Object],
          default: false,
        },
        pointer: {
          required: false,
          type: Object,
          default: () => ({}),
        },
      },
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const { droppable, draggingElement, moving, pointer } = toRefs(props)

        // ================ DATA ================

        const highlighted = ref(false)

        // ============== COMPUTED ==============

        const beingDragged = computed(() => {
          return draggingElement.value === component.path.value
        })

        const Droppable = computed(() => {
          return !beingDragged.value && droppable.value
        })

        const pointed = computed(() => {
          return moving.value && moving.value.source === 'preview' && pointer.value?.path === component.path.value
        })

        // =============== METHODS ==============

        const announce = (msg, params) => {
          context.emit('announce', msg, params)
        }

        return {
          ...component,
          announce,
          highlighted,
          beingDragged,
          Droppable,
          pointed,
        }
      }
    }),
    () => ({
      apply: 'ElementLayout',
      emits: [
        'add-element', 'select-element', 'clone-element', 'remove-element', 'resize-element', 'announce',
      ],
      props: {
        draggingElement: {
          required: false,
          type: [null, String, Boolean],
        },
        draggingPage: {
          required: false,
          type: [null, String, Boolean],
        },
        draggedSchema: {
          required: false,
          type: Object,
        },
      },
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const config$ = inject('builderConfig$')

        // ================ DATA ================

        const hovered = ref(false)
        const focused = ref(false)

        const startingWidth = ref(0)
        const elementWidth = ref(null)
        const lastWidth = ref(0)

        const editing = ref(false)
        const resizing = ref(false)

        let deviceSizeMap = ref({
          default: 'default',
          tablet: config$.value.breakpoints?.tablet.breakpoint,
          desktop: config$.value.breakpoints?.desktop.breakpoint
        })

        // ============== COMPUTED ==============

        const names = computed(() => {
          return component.form$.value.builderConfig.names
        })

        const device = computed(() => {
          return component.el$.value.form$.device || 'default'
        })

        const size = computed(() => {
          return deviceSizeMap.value[device.value]
        })

        const sizes = computed(() => {
          return Object.values(deviceSizeMap.value)
        })

        const moving = computed(() => {
          if (!component.el$.value.moving) {
            return false
          }

          let moving = component.el$.value.moving

          return moving.source === 'preview' && moving.type === 'element' && moving.path === path.value
        })

        const path = computed(() => {
          return component.el$.value.path
        })

        const flatTree = computed(() => {
          return component.el$.value.form$.flatTree || []
        })

        const selectedElement = computed(() => {
          return component.form$.value.selectedElement
        })

        const elementIndex = computed(() => {
          return flatTree.value.indexOf(path.value)
        })

        const isSelected = computed(() => {
          return selectedElement.value === path.value
        })

        const highlighted = computed({
          get() {
            return component.el$.value.highlighted
          },
          set(val) {
            component.el$.value.highlighted = val
          },
        })

        const childRestrictions = computed(() => {
          let childRestrictions = getChildRestrictions(component.el$.value)

          return childRestrictions
        })

        const canRemove = computed(() => {
          return !childRestrictions.value.remove && component.el$.value.builder?.remove !== false
        })

        const canClone = computed(() => {
          return !childRestrictions.value.clone && component.el$.value.builder?.clone !== false && component.el$.value.cloneable
        })

        const canEdit = computed(() => {
          return component.el$.value.builder?.edit !== false
        })

        const canMove = computed(() => {
          return !childRestrictions.value.move && component.el$.value.builder?.move !== false
        })

        const canResize = computed(() => {
          return !childRestrictions.value.resize && component.el$.value.builder?.resize !== false
        })

        const canDragInside = computed(() => {
          if (['object', 'group'].indexOf(component.el$.value.type) !== -1) {
            return !Object.keys(component.el$.value.children).length &&
                   (!component.el$.value.draggedSchema || ['tabs', 'steps'].indexOf(component.el$.value.draggedSchema.type) === -1)
          }

          else if (['list'].indexOf(component.el$.value.type) !== -1) {
            return !component.el$.value.hasPrototype &&
                   (!component.el$.value.draggedSchema || ['list', 'tabs', 'steps'].indexOf(component.el$.value.draggedSchema.type) === -1)
          }

          return false
        })

        const canDragSibling = computed(() => {
          return (!component.el$.value.draggedSchema || ['tabs', 'steps'].indexOf(component.el$.value.draggedSchema.type) === -1)
        })

        const hideDragLine = computed(() => {
          return false
        })

        const ariaLabel = computed(() => {
          return path.value.replace(/\./g, ' / ')
        })

        const pageType = computed(() => {
          return component.form$.value.pageType
        })

        const duplicates = computed(() => {
          return component.form$.value.modelDuplicates.filter(d => d.dataPath === component.el$.value.dataPath)
        })

        const hasWarning = computed(() => {
          return duplicates.value.length
        })

        // =============== METHODS ==============


        const getChildRestrictions = (schema) => {
          let restrictions = {
            remove: false,
            clone: false,
            move: false,
            edit: false,
            resize: false,
          }

          if (!schema || ['object', 'group', 'list'].indexOf(schema.type) === -1) {
            return restrictions
          }

          let children = ['object', 'group'].indexOf(schema.type) !== -1
            ? (schema.schema || {})
            : (schema.element
              ? { [0]: schema.element }
              : {}
            )

          Object.values(children).forEach((childSchema) => {
            if (Object.values(restrictions).some(r => !r)) {
              let childRestrictions = ['object', 'group', 'list'].indexOf(childSchema.type) !== -1
                ? getChildRestrictions(childSchema)
                : {
                  remove: childSchema.builder?.remove === false,
                  clone: childSchema.builder?.clone === false,
                  move: childSchema.builder?.move === false,
                  edit: childSchema.builder?.edit === false,
                  resize: childSchema.builder?.resize === false,
                }

              Object.keys(restrictions).forEach((key) => {
                if (childRestrictions[key]) {
                  restrictions[key] = true
                }
              })
            }
          })

          return restrictions
        }

        const startEditing = () => {
          announce('ELEMENT_GRABBED', {
            element: ariaLabel.value,
          })

          editing.value = true
        }

        const stopEditing = () => {
          editing.value = false
        }

        const startMoving = () => {
          component.el$.value.$emit('start-moving', {
            path: path.value,
            source: 'preview',
            type: 'element',
          })
        }

        const stopMoving = () => {
          stopEditing()
        }

        const startResizing = () => {
          let columns = component.el$.value.columnsClassesService.cols
          let container

          // If the size already exists
          if (columns[size.value]) {
            container = columns[size.value].container

          // If it does not exist, get one from the lower screen sizes
          } else {
            let sizeList = [...sizes.value].reverse()
            let index = sizeList.indexOf(size.value)

            sizeList.forEach((s, i) => {
              if (i > index && !container) {
                if (columns[s]) {
                  container = columns[s].container
                }
              }
            })

            if (!container) {
              container = columns.default.container
            }
          }

          lastWidth.value = container
          startingWidth.value = lastWidth.value
          resizing.value = true

          getElementDOM(path.value).focus()
        }
        
        const stopResizing = (save) => {
          stopEditing()
          resizing.value = false
          
          let msg
          let params = {}
          
          if (startingWidth.value !== lastWidth.value && save) {
            msg = 'SAVED_WIDTH'
            params = {
              width: lastWidth.value,
            }
            saveColums()
          } else {
            msg = 'CANCEL_WIDTH'
            params = {
              width: startingWidth.value,
            }
            
            if (!save && lastWidth.value !== startingWidth.value) {
              updateWidth(startingWidth.value, false)
            }
          }

          announce(msg, params)
        }

        const saveResizing = () => {
          stopResizing(true)
        }

        const cancelResizing = () => {
          stopResizing(false)
        }

        const updateWidth = (width, shouldAnnounce = true) => {
          if (width !== lastWidth.value) {
            lastWidth.value = width

            let columns = component.el$.value.columns

            if (size.value === 'default') {
              if (columns && typeof columns === 'object') {
                if (columns.container || columns.label || columns.wrapper) {
                  columns.container = width
                } else {
                  if (!columns.default) {
                    columns.default = {}
                  }

                  columns.default.container = width
                }
              } else {
                columns = { container: width }
              }
            } else {
              if (columns && typeof columns === 'object') {
                if (!columns[size.value]) {
                  if (columns.container || columns.label || columns.wrapper) {
                    columns = {
                      default: columns,
                      [size.value]: {
                        container: width
                      }
                    }
                  } else {
                    columns[size.value] = {
                      container: width
                    }
                  }
                } else {
                  columns[size.value].container = width
                }
              } else {
                columns = {
                  [size.value]: {
                    container: width,
                  }
                }
              }
            }

            component.el$.value.updateColumns(columns)

            if (shouldAnnounce) {
              announce('WIDTH_CHANGED', { width, })
            }
          }
        }

        const saveColums = () => {
          component.el$.value.$emit('resize-element', path.value, lastWidth.value)
        }

        const getSiblingPath = (distance) => {
          let index = flatTree.value.indexOf(path.value)
          let sibling = flatTree.value[index + distance] || (distance > 0 ? flatTree.value[flatTree.value.length - 1] : flatTree.value[0])

          if (!sibling) {
            return
          }
          
          return sibling
        }

        const getElementDOM = (path) => {
          return component.el$.value.form$.$el.querySelector(`[data-path="${path}"]`)
        }
        
        const focusElement = (path) => {
          let dom = getElementDOM(path)
          dom?.focus()

          if (isInOtherPage(path)) {
            goToPageThatContains(path)

            nextTick(() => {
              getElementDOM(path)?.focus()
            })
          }
        }

        const isInOtherPage = (path) => {
          return window.getComputedStyle(getElementDOM(path)).getPropertyValue('display') === 'none' && component.form$.value.hasPages
        }

        const goToPageThatContains = (path) => {
          let page = Object.keys(component.form$.value[`${pageType.value}s`]).find((name) => {
            let page = component.form$.value[`${pageType.value}s`][name]
            let rootPath = path.split('.')[0]

            return page.elements.indexOf(rootPath) !== -1
          })

          component.form$.value[`${pageType.value}s$`].goTo(page)
        }

        const announce = (msg, params) => {
          component.el$.value.announce(msg, params)
        }

        const handleOverlayClick = () => {
          if (!canEdit.value) {
            return
          }

          component.el$.value.$emit('select-element', path.value)
          component.form$.value.$emit('select-page', null)
        }

        const handleCloneClick = () => {
          component.el$.value.$emit('clone-element', path.value)
        }

        const handleRemoveClick = () => {
          component.el$.value.$emit('remove-element', path.value)
        }

        const handleDragStart = function (e) {
          e.dataTransfer.effectAllowed = 'move'

          let schema = getElementSchemaByPath(component.form$.value.options.schema, path.value)

          e.dataTransfer.setData('schema', JSON.stringify(schema))
          e.dataTransfer.setData('path', path.value)

          component.el$.value.$emit('set-dragged-schema', schema)
        }

        const handleDragEnd = (e) => {
          component.el$.value.$emit('set-dragged-schema', null)
        }

        const handleDragOver = (e, position) => {
          e.preventDefault()

          if (!component.el$.value.Droppable || component.el$.value.beingDragged) {
            return
          }

          highlighted.value = position
        }

        const handleDragLeave = (e) => {
          setTimeout(() => {
            highlighted.value = null
          }, 0)
        }

        const handleDrop = (e, position) => {
          e.preventDefault()

          if (!component.el$.value.Droppable) {
            return
          }
          
          highlighted.value = null

          const originalPath = e.dataTransfer.getData('path') || undefined

          if (originalPath) {
            component.el$.value.$emit('move-element', originalPath, position, path.value)
          } else {
            const schema = JSON.parse(e.dataTransfer.getData('schema'))

            component.el$.value.$emit('add-element', schema, position, path.value)
          }
        }

        const handleResizeDragStart = (e) => {
          e.dataTransfer.effectAllowed = 'move'

          lastWidth.value = 0

          let path = e.path || e?.composedPath()

          elementWidth.value = {
            from: path[1].getBoundingClientRect().x,
            to: path[1].getBoundingClientRect().x + path[2].getBoundingClientRect().width
          }

          resizing.value = true
        }

        const handleResizeDrag = (e) => {
          let end = elementWidth.value.to - elementWidth.value.from
          let current = e.x - elementWidth.value.from
          let width = Math.round(current / end * 12)

          if (width < 1) {
            width = 1
          }

          if (width > 12) {
            width = 12
          }

          if (!(e.x === 0 && e.y === 0)) {
            updateWidth(width, false)
          }
        }

        const handleResizeDragEnd = (e) => {
          resizing.value = false
          saveColums()
        }

        const handleFocus = () => {
          focused.value = true
        }

        const handleBlur = () => {
          focused.value = false
        }

        const decreaseColumns = (shiftKey) => {
          let value = lastWidth.value - 1

          if (shiftKey) {
            value = lastWidth.value > 6 ? 6 : 1
          }

          updateWidth(value)
        }

        const increaseColumns = (shiftKey) => {
          let value = lastWidth.value + 1

          if (shiftKey) {
            value = lastWidth.value < 6 ? 6 : 12
          }

          updateWidth(value)
        }

        const handleKeydown = (e) => {
          if (!focused.value && !resizing.value) {
            return
          }

          if (resizing.value) {
            if (e.key === 'ArrowLeft' && lastWidth.value > 1) {
              e.preventDefault()
              e.stopPropagation()

              decreaseColumns(e.shiftKey)
            }
            
            else if (e.key === 'ArrowRight' && lastWidth.value < 12) {
              e.preventDefault()
              e.stopPropagation()

              increaseColumns(e.shiftKey)
            }

            else if ([' ', 'Enter'].indexOf(e.key) !== -1) {
              e.preventDefault()
              e.stopPropagation()

              saveResizing()
            }

            else if (['Escape'].indexOf(e.key) !== -1) {
              e.preventDefault()
              e.stopPropagation()

              cancelResizing()
            }

            else if (['Tab'].indexOf(e.key) !== -1) {
              cancelResizing()
            }
          }
          else if (editing.value) {
            if (['ArrowLeft', 'ArrowRight'].indexOf(e.key) !== -1) {
              e.preventDefault()
              e.stopPropagation()

              if (!canResize.value) {
                return
              }

              startResizing()

              if (e.key === 'ArrowLeft' && lastWidth.value > 1) {
                decreaseColumns(e.shiftKey)
              }
              
              else if (e.key === 'ArrowRight' && lastWidth.value < 12) {
                increaseColumns(e.shiftKey)
              }
            }
            
            else if (['ArrowUp', 'ArrowDown'].indexOf(e.key) !== -1) {
              e.preventDefault()
              e.stopPropagation()

              if (!canMove.value) {
                return
              }

              startMoving()

            } else if ([' ', 'Escape'].indexOf(e.key) !== -1) {
              e.preventDefault()
              e.stopPropagation()

              stopEditing()

            } else if (['Tab'].indexOf(e.key) !== -1) {
              stopEditing()
            }
          } else {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.stopPropagation()

              if (!canEdit.value) {
                return
              }

              handleOverlayClick()

              announce('CONFIG_PANEL_OPENED')

              setTimeout(() => {
                e.target.closest('.vfb-builder').querySelector('.vfb-config-panel-container-element').focus()
              }, 1000)
            }

            else if (e.key === ' ') {
              e.preventDefault()
              e.stopPropagation()

              if (!canMove.value && !canResize.value) {
                return
              }
              
              startEditing()
            }

            else if (e.key === 'Delete') {
              e.preventDefault()
              e.stopPropagation()

              if (!canRemove.value) {
                return
              }
              
              handleRemoveClick()

              if (flatTree.value[elementIndex.value + 1]) {
                focusElement(getSiblingPath(1))
              }
              else if (flatTree.value[elementIndex.value - 1]) {
                focusElement(getSiblingPath(-1))
              } else {
                e.target.closest('.vfb-builder').querySelector('.vfb-preview-wrapper').focus()
              }
            }
            
            else if (e.key === 'ArrowDown' && e.shiftKey) {
              e.preventDefault()
              e.stopPropagation()

              let last = component.el$.value.form$.$el.querySelector('.vfb-preview-form > div > .vfb-preview-element-container:last-of-type')

              if (last) {
                last.focus()
              }
            } 
            
            else if (e.key === 'ArrowUp' && e.shiftKey) {
              e.preventDefault()
              e.stopPropagation()

              let first = component.el$.value.form$.$el.querySelector('.vfb-preview-form > div > .vfb-preview-element-container:first-of-type')

              if (first) {
                first.focus()
              }
            } 
            
            else if (e.key === 'ArrowDown') {
              e.preventDefault()
              e.stopPropagation()

              focusElement(getSiblingPath(1))
            } 
            
            else if (e.key === 'ArrowUp') {
              e.preventDefault()
              e.stopPropagation()

              focusElement(getSiblingPath(-1))
            }
          }
        }

        // ============== WATCHERS ==============

        watch(moving, (n, o) => {
          if (!n) {
            stopMoving()
          }
        })

        return {
          ...component,
          names,
          ariaLabel,
          editing,
          resizing,
          moving,
          highlighted,
          hovered,
          focused,
          isSelected,
          canRemove,
          canClone,
          canEdit,
          canMove,
          canResize,
          canDragInside,
          canDragSibling,
          hideDragLine,
          lastWidth,
          childRestrictions,
          hasWarning,
          handleOverlayClick,
          handleCloneClick,
          handleRemoveClick,
          handleFocus,
          handleBlur,
          handleKeydown,
          handleDragOver,
          handleDragLeave,
          handleDrop,
          handleDragStart,
          handleDragEnd,
          handleResizeDragStart,
          handleResizeDrag,
          handleResizeDragEnd,
        }
      }
    })
  ]
}