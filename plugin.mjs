import { onMounted, ref, computed, toRefs, watch, nextTick, inject, resolveComponent, onBeforeUnmount, } from 'vue'
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
      let childSchema = base.schema
      
      if (base.type === 'list') {
        childSchema = { 0: base.element }
      }

      if (base.type === 'grid') {
        childSchema = base.grid.reduce((prev, curr) => ({
          ...prev,
          ...curr.reduce((p, c) => ({
            ...p,
            ...(!c || typeof c !== 'object' || (Array.isArray(c) && (!c[0] || typeof c[0] !== 'object'))
              ? {}
              : Array.isArray(c)
                ? { [c[0].name]: c[0] }
                : { [c.name]: c }
            )
          }), {}),
        }), {})
      }

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
          
          // @class
          'props-form': {
            addClasses: {
              FormElements: {
                container_sm: 'vfb-props-form-elements'
              },
              ElementLabel: {
                wrapper: 'vfb-props-form-element-label'
              },
              SliderElement: {
                container: 'vfb-config-slider',
              },
              ToggleElement: {
                container: 'vfb-config-toggle',
                wrapper: 'vfb-util-props-toggle-wrapper',
              },
              ListElement: {
                remove: 'vfb-config-list-remove',
              },
              TagsElement: {
                select: {
                  tag: 'vfb-util-props-tags'
                }
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
                container: 'vfb-multiline-addon'
              },
              ElementLabel: {
                container: 'vfb-prop-multiline'
              },
            },
          },
          'prop-toggle': {
            addClasses: {
              ElementLabel: {
                container: 'vfb-util-props-toggle-label'
              },
            },
          },
          'prop-toggle-object': {
            addClasses: {
              ObjectElement: {
                container: 'vfb-util-props-toggle-object'
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
                add: 'vfb-util-props-list-add',
                listItem_sm: 'vfb-util-props-list-item'
              },
              ElementLayout: {
                container: 'vfb-util-props-list-layout',
              }
            },
          },
          'prop-list-in-object': {
            addClasses: {
              ListElement: {
                add: 'vfb-util-props-list-in-object-add'
              },
            },
          },
          'prop-list-object': {
            addClasses: {
              ObjectElement: {
                wrapper_sm: 'vfb-util-props-list-item',
              }
            },
          },
          'prop-list-el': {
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
            addClasses: {
              TextElement: {
                input_sm: 'vfb-util-number-input'
              },
              ElementAddon: {
                container: 'vfb-util-number-addon'
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
            addClasses: {
              RadiogroupRadio: {
                wrapper_sm: 'vfb-util-tabs-tiny',
                text: 'vfb-util-tabs-tiny-text',
              },
              CheckboxgroupCheckbox: {
                wrapper_sm: 'vfb-util-tabs-tiny',
                text: 'vfb-util-tabs-tiny-text',
              },
              ElementLabel: {
                wrapper: 'vfb-util-tabs-tiny-label',
              }
            },
          },
          'tabs-small': {
            addClasses: {
              RadiogroupRadio: {
                wrapper_sm: 'vfb-util-tabs-small'
              },
            },
          },
          'cell-editor': {
            addClasses: {
              Vueform: {
                form: 'vfb-h-full',
              },
              FormElements: {
                container: 'vfb-h-full',
              },
              ElementLayout: {
                outerWrapper: 'vfb-h-full',
                innerWrapperBefore: 'vfb-hidden',
                innerWrapperAfter: 'vfb-hidden',
              },
              TextareaElement: {
                inputContainer: 'vfb-border-0',
                inputContainer_md: 'vfb-radius-0',
                inputContainer_focused: 'vfb-outline-none',
                input: 'vfb-h-auto',
              }
            },
          },
          'matrix-list': {
            addClasses: {
              ListElement: {
                add: 'vfb-matrix-list-add',
                list_sm: 'vfb-matrix-list-list',
                listItem: 'vfb-matrix-list-item',
                handle: 'vfb-matrix-list-handle'
              }
            },
            overrideClasses: {
              ListElement: {
                add_empty: 'vfb-matrix-list-add-empty',
                $add: (classes, { Size, value }) => ([
                  classes.add,
                  classes[`add_${Size}`],
                  !value?.length ? classes.add_empty : null,
                ]),
              },
            },
          },
          'matrix-item-list': {
            addClasses: {
              ElementLabel: {
                container: 'vfb-matrix-item-list-label'
              },
              ListElement: {
                handle: 'vfb-matrix-item-list-handle',
                listItem: 'vfb-matrix-item-list-item',
              },
            },
          }
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
        builder$: {
          required: false,
          type: Object,
          default: () => ({}),
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

        const tags = inject('tags')

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
            component.scrollToFirstInvalid()
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
          tags,
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
        rows: {
          required: false,
          type: Array,
          default: () => ([]),
        },
      },
      setup(props, context, component) {
        const { pluginSettings, } = toRefs(props)

        if (!pluginSettings.value) {
          return {
            ...component,
          }
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

        const builder$ = inject('builder$')

        const storage$ = inject('storage$')

        const settingsLocale = inject('settingsLocale')

        const tags = inject('tags')

        const elementTypes = inject('elementTypes')

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
                  tags,
                  settingsLocale: settingsLocale.value,
                  elementTypes: elementTypes.value,
                  builder$,
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
                tags,
                settingsLocale: settingsLocale.value,
                elementTypes: elementTypes.value,
                builder$,
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

        onBeforeUnmount(() => {
          watchers.value.forEach((w) => w())
        })

        return {
          ...form,
          tags,
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
      apply: ['FormTabs', 'FormSteps'],
      emits: [
        'rename-page', 'add-page', 'remove-pages', 'remove-page', 'move-page', 'move-to-page', 'add-element',
        'select-page', 'start-moving',
      ],
      props: {
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

        const tags = inject('tags')

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
          tags,
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

        const tags = inject('tags')

        // ================ DATA ================

        const removeConfirm = computed(() => tags.tabs_remove_confirm)

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
          tags,
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

        const tags = inject('tags')

        // ================ DATA ================

        const removeConfirm = computed(() => tags.steps_remove_confirm)

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
          tags,
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

        const { form$ } = component
        const { name, moving, pointer } = toRefs(props)

        const subscribeOnce = inject('subscribeOnce')

        const announce = inject('announce')

        // ================ DATA ================

        const editing = ref(false)

        const editLabel = ref(null)

        const input = ref(null)

        const highlighted = ref(null)

        // ============== COMPUTED ==============

        const beingDragged = computed(() => {
          return form$.value.draggingPage === name.value
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

            let to = component.form$.value.tabs$
              ? component.form$.value.tabs$.current$.elements?.pop()
              : component.form$.value.steps$.current$.elements?.pop()

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
            container: 'vfb-col-span-12',
            innerContainer: 'vfb-col-span-12',
            wrapper: 'vfb-col-span-12',
          })
        },
        visible: {
          required: false,
          type: Boolean,
          default: true
        },
      },
      setup(props, context, component) {
        const { expression } = toRefs(props)
        const { value, form$ } = component

        const tags = inject('tags')
        const config$ = inject('config$')

        const locale = computed(() => {
          return form$.value.locale$ || config$.value.i18n.locale
        })

        const placeholder = computed(() => {
          let exp = expression.value

          if (exp && typeof exp === 'object') {
            exp = exp?.[locale.value] || exp?.[locale.value.toUpperCase()] || exp?.[config$.value.i18n.fallbackLocale] || exp?.[config$.value.i18n.fallbackLocale.toUpperCase()] || exp?.[Object.keys(exp)[0]] || undefined
          }

          if (exp) {
            return exp
          }

          if (value.value) {
            return value.value
          }

          return ''
        })

        return {
          tags,
          placeholder,
          ...component,
        }
      },
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

        const tags = inject('tags')

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

          return tags.list_repeat_child_name
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
                if (!child$.isStatic) {
                  child$.reset()
                }
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
      apply: ['MatrixElement'],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const resolvedColumns = computed(() => {
          return component.resolvedColumns.value.map((c) => ({
            ...c,
            available: computed(() => component.form$.value.editorMode ? true : c.available.value),
          }))
        })

        const resolvedRows = computed(() => {
          return component.resolvedRows.value.map((c) => ({
            ...c,
            available: computed(() => component.form$.value.editorMode ? true : c.available.value),
          }))
        })

        return {
          ...component,
          resolvedColumns,
          resolvedRows,
        } 
      }
    }),
    () => ({
      apply: ['GridElement'],
      emits: ['resize-column', 'update-cell'],
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        let startingMousePosition = 0

        const {
          widths,
          cols,
          rows,
          minWidth,
          maxWidth,
          grid,
        } = toRefs(props)

        const {
          path,
          gridStyle: gridStyleBase,
          el$,
          cells: cellsBase,
          form$,
          children$,
        } = component

        const hoveredCell = ref(null)

        const editingCell = ref(null)

        const internalWidths = ref([])

        const startingWidths = ref([])

        const resizingCells = ref(false)

        const resizerVisible = ref(false)

        const hoverTimeout = ref(null)

        const editCell$ = ref(null)

        const cellContent = ref({})

        const cellValue = ref(null)

        const selectedAlign = ref(null)

        const selectedValign = ref(null)

        const align$ = ref(null)

        const valign$ = ref(null)

        const isBold = ref(false)

        // ============== COMPUTED ==============

        const gridStyle = computed(() => {
          const colWidths = []

          for (let c = 0; c < parseInt(cols.value); c++) {
            const internal = internalWidths.value[c]

            colWidths.push(internal
              ? typeof internal === 'number'
                ? `${internal}px`
                : internal
              : widths.value[c] || '1fr')
          }

          return {
            'grid-template-columns': colWidths.join(' '),
            'grid-template-rows': `repeat(${rows.value}, auto)`,
            'min-width': typeof minWidth.value === 'number'
              ? `${minWidth.value}px`
              : minWidth.value,
            'max-width': typeof maxWidth.value === 'number'
              ? maxWidth.value > 0 ? `${maxWidth.value}px` : undefined
              : maxWidth.value,
          }
        })

        const cellWidths = computed(() => {
          const cellWidths = {}
          const currentWidths = [...Array.from({length:cols.value}).map((v, i) => {
            return widths.value[i] || null
          })]

          cells.value.forEach(({ row, col, colStart, colEnd }) => {
            let colFixedSize = 0
            let colDynamicSize = 0

            const widthList = resizingCells.value
              ? internalWidths.value
              : currentWidths

            widthList.forEach((width, i) => {
              if (i < colStart || i > colEnd) {
                return
              }

              if (width) {
                colFixedSize += parseInt(width.toString().replace('px', ''))
              } else {
                colDynamicSize++
              }
            })

            let colWidth = colDynamicSize || `${colFixedSize}px`

            if (colFixedSize && colDynamicSize) {
              colWidth = `${colDynamicSize} + ${colFixedSize}px`
            }

            cellWidths[`${row}_${col}`] = colWidth
          })

          return cellWidths
        })

        const cells = computed(() => {
          let cells = cellsBase.value

          if (editingCell.value) {
            const [row, col] = editingCell.value.split('_')

            cells = cells.map((cell) => {
              if (cell.row !== parseInt(row) || cell.col !== parseInt(col)) {
                return cell
              }

              let content = form$.value.$vueform.sanitize(cellValue.value)

              if (content === null) {
                content = ''
              }

              if (isBold.value) {
                content = `<b>${content}</b>`
              }

              content = content.replace(/\n/g, '<br>')

              if (/<br>$/.test(content)) {
                content += '&nbsp;'
              }

              return {
                ...cell,
                content,
              }
            })
          }

          return cells
        })

        const inertCells = computed(() => {
          if (!form$.value.editorMode || !form$.value.draggingElement) {
            return {}
          }

          return cells.value.reduce((prev, curr) => {
            const child$ = children$.value[curr.name] || {}

            return {
              ...prev,
              [curr.name]: !child$.beingDragged && !child$.isGroupType && !child$.isObjectType && !child$.isListType
            }
          }, {})
        })

        const isDark = computed(() => {
          return form$.value.builder$.darkMode === 'dark'
        })

        // ============== METHODS ===============

        const selectAlign = (align) => {
          selectedAlign.value = align
        }

        const selectValign = (valign) => {
          selectedValign.value = valign
        }

        const closeAlign = () => {
          align$.value[0].close()
        }

        const closeValign = () => {
          valign$.value[0].close()
        }

        const createWidthsFrom = (widths, defaultValue = null) => {
          return [...Array.from({ length: cols.value })
            .map((v, i) => parseInt(widths?.[i]?.replace('px', '')) || null)]
        }

        const handleDragEnter = (rowIndex, colIndex) => {
          hoveredCell.value = `${rowIndex}_${colIndex}`
        }

        const handleDragLeave = (rowIndex, colIndex) => {
          if (hoveredCell.value === `${rowIndex}_${colIndex}`) {
            hoveredCell.value = null
          }
        }

        const handleDrop = (e, rowIndex, colIndex) => {
          e.preventDefault()

          hoveredCell.value = null

          const originalPath = e.dataTransfer.getData('path') || undefined
          const position = `cell_${rowIndex}_${colIndex}`

          if (originalPath) {
            component.el$.value.$emit('move-element', originalPath, position, path.value)
          } else {
            const schema = JSON.parse(e.dataTransfer.getData('schema'))

            component.el$.value.$emit('add-element', schema, position, path.value)
          }
        }

        const handleColumnDragStart = ({ colStart, colEnd, rowStart, rowEnd, col, row }, e) => {
          resizingCells.value = true

          internalWidths.value = createWidthsFrom(widths.value)
          startingWidths.value = [...internalWidths.value]

          startingMousePosition = Math.round(e.screenX)

          const cell = el$.value.$el.querySelector(`[data-col="${col}"][data-row="${row}"]`)
          const { width } = cell.getBoundingClientRect()

          let dynamicWidth = width
          let dynamicWidthCells = 0

          for (let c = colStart; c <= colEnd; c++) {
            if (!startingWidths.value[c]) {
              dynamicWidthCells += 1
            } else {
              dynamicWidth -= startingWidths.value[c]
            }
          }

          for (let c = colStart; c <= colEnd; c++) {
            startingWidths.value[c] = startingWidths.value[c] || parseFloat((dynamicWidth / dynamicWidthCells).toFixed(1))
          }
        }

        const handleColumnDrag = ({ colStart, colEnd }, e) => {
          if (!e.screenX) {
            return
          }

          const distance = Math.round(e.screenX) - startingMousePosition
          const portion = parseFloat((distance / (colEnd - colStart + 1)).toFixed())

          for (let c = colStart; c <= colEnd; c++) {
            internalWidths.value[c] = `${parseFloat((startingWidths.value[c] + portion).toFixed(1))}px`
          }
        }

        const handleColumnDragEnd = ({ colStart, colEnd }, e) => {
          resizingCells.value = false

          const cols = Array.from({ length: colEnd - colStart + 1 }, (v, i) => i + colStart);

          context.emit('resize-column', path.value, cols, internalWidths.value.map(w => typeof w === 'number' ? `${w}px` : w))

          internalWidths.value = []
        }

        const handleColumnDragMouseDown = () => {
          if (hoverTimeout.value) {
            clearTimeout(hoverTimeout.value)
          }

          resizerVisible.value = true
        }

        const handleColumnDragMouseUp = () => {
          if (hoverTimeout.value) {
            clearTimeout(hoverTimeout.value)
          }

          resizerVisible.value = false
        }

        const handleColumnDragMouseLeave = () => {
          resizerVisible.value = false
        }

        const handleColumnDragDoubleClick = ({ colStart, colEnd }) => {
          context.emit('resize-column', path.value, [...Array.from({ length: colEnd - colStart +1 }).map((v, i) => i + colStart)], [
            ...Array.from({length:cols.value}).map((c, i) => i >= colStart && i <= colEnd ? null : c)
          ])

          resizerVisible.value = true
        }

        const handleEditCellOutsideClick = (e) => {
          if (!editingCell.value) {
            return
          }

          let [row, col] = editingCell.value.split('_')

          const cell = el$.value.$el.querySelector(`[data-row="${row}"][data-col="${col}"]`)

          closeAlign()
          closeValign()

          if (e.target === editCell$.value[0].el$('content').input) {
            return
          }

          if (e.target === cell || (cell.contains(e.target) && e.target.dataset.resizer === undefined)) {
            e.preventDefault()
            editCell$.value[0].el$('content').input.focus()
            return
          }

          if (cell.contains(e.target) && e.target.dataset.resizer) {
            return
          }

          row = parseInt(row)
          col = parseInt(col)

          let content = cellValue.value

          if (isBold.value) {
            content = `<b>${content !== '' && content !== null ? content : ''}</b>`
          }
          
          if (content === '') {
            content = null
          }

          context.emit('update-cell', path.value, row, col, {
            content,
            align: selectedAlign.value,
            valign: selectedValign.value,
          })

          editingCell.value = null

          document.removeEventListener('mousedown', handleEditCellOutsideClick)
        }

        const handleEditCellClick = ({ row, col }) => {
          editingCell.value = `${row}_${col}`

          let value = grid.value[row][col] || ''

          if (Array.isArray(value)) {
            selectedAlign.value = value[3] || null
            selectedValign.value = value[4] || null
            value = value[0]
          } else {
            selectedAlign.value = null
            selectedValign.value = null
          }

          if (typeof value === 'number') {
            value = value.toString()
          }

          if (value === null || value === undefined) {
            value = ''
          }

          value = value?.replace(/<br>/g, '\n')

          if (/^<b>/.test(value)) {
            isBold.value = true
            value = value
              .replace(/^<b>/, '')
              .replace(/<\/b>$/, '')
          } else {
            isBold.value = false
          }

          if (value === '') {
            value = null
          }

          cellValue.value = value
          cellContent.value.content = value

          nextTick(() => {
            editCell$.value[0].el$('content').input.focus()

            document.addEventListener('mousedown', handleEditCellOutsideClick)

          })
        }

        const handleCellUpdate = (n, o, el$, { row, col }) => {
          cellValue.value = n
        }

        const handleBoldClick = () => {
          closeAlign()
          closeValign()

          isBold.value = !isBold.value
        }

        return {
          ...component,
          cells,
          editCell$,
          cellContent,
          resizingCells,
          resizerVisible,
          gridStyle,
          cellWidths,
          hoveredCell,
          editingCell,
          inertCells,
          isDark,
          handleDragEnter,
          handleDragLeave,
          handleDrop,
          handleColumnDragStart,
          handleColumnDrag,
          handleColumnDragEnd,
          handleColumnDragMouseDown,
          handleColumnDragMouseUp,
          handleColumnDragDoubleClick,
          handleColumnDragMouseLeave,
          handleEditCellClick,
          handleCellUpdate,
          selectedAlign,
          selectedValign,
          align$,
          valign$,
          selectAlign,
          selectValign,
          closeAlign,
          closeValign,
          isBold,
          handleBoldClick,
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
      apply: ['FormElements', 'Vueform', 'GroupElement', 'ObjectElement', 'ListElement', 'GridElement'],
      emits: [
        'add-element', 'move-element', 'select-element', 'clone-element', 'remove-element', 'resize-element', 'set-dragged-schema', 'announce',
        'start-moving', 'resize-column', 'update-cell',
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
        const handleResizeColumn = (path, colIndex, width) => { context.emit('resize-column', path, colIndex, width) }
        const handleUpdateCell = (path, row, col, content) => { context.emit('update-cell', path, row, col, content) }

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
          handleResizeColumn,
          handleUpdateCell,
        } 
      }
    }),
    () => ({
      apply: ['TTextElement', 'TTextareaElement', 'TEditorElement'],
      setup(props, context, component) {
        const config$ = inject('builderConfig$', undefined)

        const displayCurrentLocale = computed(() => {
          return Object.keys(config$?.value?.locales || {}).length > 1
        })

        return {
          ...component,
          displayCurrentLocale,
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

        const { form$ } = component
        const { droppable, moving, pointer } = toRefs(props)

        // ================ DATA ================

        const highlighted = ref(false)

        // ============== COMPUTED ==============

        const beingDragged = computed(() => {
          return form$.value.draggingElement === component.path.value
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
      setup(props, context, component) {
        if (!component.form$.value.builder) {
          return component
        }

        const config$ = inject('builderConfig$')

        const tags = inject('tags')

        // ================ DATA ================

        const hovered = ref(false)
        const focused = ref(false)
        const beingDraggedOver = ref(false)
        const DropArea = ref()

        const startingWidth = ref(0)
        const elementWidth = ref(null)
        const lastWidth = ref(0)

        const editing = ref(false)
        const resizing = ref(false)
        const multiResizing = ref(false)

        let deviceSizeMap = ref({
          default: 'default',
          tablet: config$.value.breakpoints?.tablet.breakpoint,
          desktop: config$.value.breakpoints?.desktop.breakpoint
        })

        const nextElement$ = ref(null)

        // ============== COMPUTED ==============

        const autoflow = computed(() => {
          return config$.value.autoflow
        })

        const defaultWidths = computed(() => {
          return component.form$.value.columns || {}
        })

        const names = computed(() => {
          return component.form$.value.builderConfig.names
        })

        const device = computed(() => {
          return component.el$.value.form$.device || 'default'
        })

        const size = computed(() => {
          return deviceSizeMap.value[device.value]
        })

        const rows = computed(() => {
          return component.form$.value.rows
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
          return !childRestrictions.value.clone && component.el$.value.builder?.clone !== false && component.el$.value.cloneable && !component.el$.value.parent?.isGridType
        })

        const canEditCells = computed(() => {
          return !childRestrictions.value.editCell && component.el$.value.builder?.editCell !== false
        })

        const canEdit = computed(() => {
          return component.el$.value.builder?.edit !== false
        })

        const canMove = computed(() => {
          return !childRestrictions.value.move && component.el$.value.builder?.move !== false
        })

        const canResize = computed(() => {
          return !childRestrictions.value.resize && component.el$.value.builder?.resize !== false && (autoflow.value || (!component.el$.value.isObjectType && !component.el$.value.isGroupType && !component.el$.value.isListType)) && !component.el$.value.parent?.isGridType
        })

        const canMultiResize = computed(() => {
          return autoflow.value && row.value.indexOf(path.value) !== row.value.length - 1 && !childRestrictions.value.resize && component.el$.value.builder?.resize !== false && component.form$.value.editorMode && config$.value.multiResize && !component.el$.value.parent?.isGridType
        })

        const canDragInside = computed(() => {
          if (['object', 'group'].indexOf(component.el$.value.type) !== -1) {
            return !Object.keys(component.el$.value.children).length &&
                   (!component.form$.value.draggedSchema || ['tabs', 'steps'].indexOf(component.form$.value.draggedSchema.type) === -1)
          }

          else if (['list'].indexOf(component.el$.value.type) !== -1) {
            return !component.el$.value.hasPrototype &&
                   (!component.form$.value.draggedSchema || ['list', 'tabs', 'steps'].indexOf(component.form$.value.draggedSchema.type) === -1)
          }

          return false
        })

        const canDragSibling = computed(() => {
          return (!component.form$.value.draggedSchema || ['tabs', 'steps'].indexOf(component.form$.value.draggedSchema.type) === -1)
        })

        const hideColumns = computed(() => {
          return component.el$.value.parent?.isGridType
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

        const currentColumns = computed(() => {
          if (!component.el$.value.columnsClassesService) {
            return 12
          }

          let columns = component.el$.value.columnsClassesService.cols
          let currentColumns

          const part = autoflow.value ? 'container' : 'wrapper'

          const defaultColumn = defaultWidths.value?.[size]?.[part] || defaultWidths.value?.[part] || 12

          // If the size already exists
          if (columns[size.value]) {
            currentColumns = columns[size.value][part] || defaultColumn

          // If it does not exist, get one from the lower screen sizes
          } else {
            let sizeList = [...sizes.value].reverse()
            let index = sizeList.indexOf(size.value)

            sizeList.forEach((s, i) => {
              if (i > index && !currentColumns) {
                if (columns[s]) {
                  currentColumns = columns[s][part]
                }
              }
            })

            if (!currentColumns) {
              currentColumns = columns.default[part] || defaultColumn
            }
          }

          return currentColumns
        })

        const row = computed(() => {
          return rows.value.find(r => r.indexOf(path.value) !== -1) || [] 
        })

        // =============== METHODS ==============


        const getChildRestrictions = (schema) => {
          let restrictions = {
            remove: false,
            clone: false,
            move: false,
            edit: false,
            resize: false,
            editCells: false,
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
                  editCells: childSchema.builder?.editCells === false,
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
          lastWidth.value = currentColumns.value
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
          if (width === lastWidth.value) {
            return
          }
          
          lastWidth.value = width

          let columns = component.el$.value.columns

          if (size.value === 'default') {
            if (columns && typeof columns === 'object') {
              if (columns.container || columns.label || columns.wrapper) {
                columns[autoflow.value ? 'container' : 'wrapper'] = width
              } else {
                if (!columns.default) {
                  columns.default = {}
                }

                columns.default[autoflow.value ? 'container' : 'wrapper'] = width
              }
            } else {
              columns = { [autoflow.value ? 'container' : 'wrapper']: width }
            }
          } else {
            if (columns && typeof columns === 'object') {
              if (!columns[size.value]) {
                if (columns.container || columns.label || columns.wrapper) {
                  columns = {
                    default: columns,
                    [size.value]: {
                      [autoflow.value ? 'container' : 'wrapper']: width
                    }
                  }
                } else {
                  columns[size.value] = {
                    [autoflow.value ? 'container' : 'wrapper']: width
                  }
                }
              } else {
                columns[size.value][autoflow.value ? 'container' : 'wrapper'] = width
              }
            } else {
              columns = {
                [size.value]: {
                  [autoflow.value ? 'container' : 'wrapper']: width,
                }
              }
            }
          }

          component.el$.value.updateColumns(columns)

          if (shouldAnnounce) {
            announce('WIDTH_CHANGED', { width, })
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

        const getNextElementInRow = () => {
          return component.form$.value.el$(row.value[row.value.indexOf(path.value) + 1])
        }

        const handleOverlayClick = () => {
          if (!canEdit.value) {
            return
          }

          component.el$.value.$emit('select-element', path.value)
          component.form$.value.$emit('select-page', null)
        }

        const handleEditCellsClick = () => {
          if (!canEdit.value) {
            return
          }

          component.el$.value.$emit('select-element', path.value)

          nextTick(() => {
            document.getElementById('vfb-edit-cells-button')?.click()
          })
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

        const handleDrag = (e) => {
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

          const target = path[1]
          const container = autoflow.value ? path[2] : path[5]

          elementWidth.value = {
            from: target.getBoundingClientRect().x,
            to: target.getBoundingClientRect().x + container.getBoundingClientRect().width
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

        const handleResizeMultiDragMouseDown = (e) => {
          nextElement$.value = getNextElementInRow()

          if (!nextElement$.value) {
            return
          }

          focused.value = true
          nextElement$.value.container.focused = true
        }

        const handleResizeMultiDragMouseUp = (e) => {
          focused.value = false
          nextElement$.value.container.focused = false
        }

        const handleResizeMultiDragStart = (e) => {
          nextElement$.value = getNextElementInRow()

          if (!nextElement$.value) {
            return
          }

          e.dataTransfer.effectAllowed = 'move'

          lastWidth.value = currentColumns.value
          startingWidth.value = lastWidth.value

          nextElement$.value.container.startingWidth = nextElement$.value.container.currentColumns

          focused.value = true
          nextElement$.value.container.focused = true

          let path = e.path || e?.composedPath()

          const target = path[1]
          const container = path[2]

          elementWidth.value = {
            from: target.getBoundingClientRect().x,
            to: target.getBoundingClientRect().x + container.getBoundingClientRect().width
          }

          multiResizing.value = true
        }

        const handleResizeMultiDrag = (e) => {
          if (!nextElement$.value) {
            return
          }

          focused.value = true
          nextElement$.value.container.focused = true

          let end = elementWidth.value.to - elementWidth.value.from
          let current = e.x - elementWidth.value.from
          let width = Math.round(current / end * 12)

          if (width < 1) {
            width = 1
          }

          if (width > 11) {
            width = 11
          }

          if (!(e.x === 0 && e.y === 0)) {
            updateWidth(width, false)

            const otherChange = nextElement$.value.container.startingWidth + (width - startingWidth.value) * -1

            nextElement$.value.container.updateWidth(otherChange > 1 ? otherChange : 1)
          }
        }

        const handleResizeMultiDragEnd = (e) => {
          if (!nextElement$.value) {
            return
          }

          focused.value = false
          nextElement$.value.container.focused = false

          multiResizing.value = false
          saveColums()

          const otherChange = nextElement$.value.container.startingWidth + (lastWidth.value - startingWidth.value) * -1

          nextElement$.value.$emit('resize-element', nextElement$.value.path, otherChange > 1 ? otherChange : 1)
        }

        const handleFocus = () => {
          focused.value = true
        }

        const handleBlur = () => {
          focused.value = false
        }

        const handleContainerDragenter = (e) => {
          beingDraggedOver.value = true
        }

        const handleContainerDragleave = (e) => {
          if (DropArea.value.contains(e.target)) return

          beingDraggedOver.value = false
        }

        const handleContainerDrop = (e) => {
          beingDraggedOver.value = false
        }

        const handleContainerMouseover = (e) => {
          hovered.value = true
        }

        const handleContainerMouseout = (e) => {
          if (e.relatedTarget?.closest('.vfb-preview-element-container')?.getAttribute('data-path') === DropArea.value?.getAttribute('data-path')) {
            return
          }

          if ([
            'vfb-icon',
            'vfb-preview-element-resizer',
            'vfb-preview-element-remove',
            'vfb-preview-element-clone',
            'vfb-preview-element-name-tag',
            'vfb-preview-element-edit-cells',
          ].some(c => e.relatedTarget?.classList?.contains(c))) return

          hovered.value = false
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
          rows,
          row,
          tags,
          autoflow,
          names,
          ariaLabel,
          editing,
          resizing,
          multiResizing,
          moving,
          highlighted,
          hovered,
          focused,
          beingDraggedOver,
          DropArea,
          startingWidth,
          elementWidth,
          lastWidth,
          isSelected,
          canRemove,
          canClone,
          canEditCells,
          canEdit,
          canMove,
          canResize,
          canDragInside,
          canDragSibling,
          canMultiResize,
          hideColumns,
          hideDragLine,
          lastWidth,
          childRestrictions,
          hasWarning,
          currentColumns,
          updateWidth,
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
          handleResizeMultiDragStart,
          handleResizeMultiDrag,
          handleResizeMultiDragEnd,
          handleResizeMultiDragMouseDown,
          handleResizeMultiDragMouseUp,
          handleDrag,
          handleEditCellsClick,
          handleContainerDragenter,
          handleContainerDragleave,
          handleContainerDrop,
          handleContainerMouseover,
          handleContainerMouseout,
        }
      }
    })
  ]
}