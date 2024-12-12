import _ from 'lodash'
import { toRefs, markRaw, ref, computed, nextTick, onMounted, inject } from 'vue'
import TextElement from './TextElement.vue'
import TextareaElement from './TextareaElement.vue'
import ElementSelectOption from './ElementSelectOption.vue'

export default function () {
  return [
    () => ({
      config(config) {
        // Can be used on Text & Textarea elements with `view: 'elementSelector'`
        config.theme.templates.TextElement_elementSelector = markRaw(TextElement)
        config.theme.templates.TextareaElement_elementSelector = markRaw(TextareaElement)

        // Add an extra class to Text & Textarea elements
        config.theme.classes.TextElement.inputContainer_elementSelector = 'relative'
        config.theme.classes.TextareaElement.inputContainer_elementSelector = 'relative'

        let TextElement_$inputContainer = config.theme.classes.TextElement.$inputContainer
        let TextareaElement_$inputContainer = config.theme.classes.TextareaElement.$inputContainer

        // Add those extra classes to $inputContainer
        config.theme.classes.TextElement.$inputContainer = (classes, el$) => {
          return TextElement_$inputContainer(classes, el$).concat(
            el$.elementSelector ? classes.inputContainer_elementSelector : null
          )
        }

        config.theme.classes.TextareaElement.$inputContainer = (classes, el$) => {
          return TextareaElement_$inputContainer(classes, el$).concat(
            el$.elementSelector ? classes.inputContainer_elementSelector : null
          )
        }

        return config
      },
    }),
    () => ({
      apply: ['TextElement', 'TextareaElement'],
      props: {
        elementSelector: {
          type: Boolean,
          required: false,
          default: false,
        },
        elementSelectorOptions: {
          type: Object,
          required: false,
          default: () => ({}),
        },
      },
      setup(props, context, component) {
        const { elementSelector, elementSelectorOptions, builder } = toRefs(props)

        // If the element does not have elementSelector enabled we return
        // the original component with adding any extra features.
        if (!elementSelector?.value) {
          return component
        }

        const tags = inject('tags')

        // ================ DATA ================

        /**
         * Whether a field is being selected.
         * 
         * @type {boolean}
         * @default {false}
         */
        const selectingElement = ref(false)

        /**
         * The field selector's Vueform component instance.
         * 
         * @type {object}
         * @default {null}
         */
        const elementSelector$ = ref(null)

        /**
         * The saved position of the cursor.
         * 
         * @type {integer}
         * @default {-1}
         */
        const cursorPosition = ref(-1)

        // ============== COMPUTED ==============

        /**
         * The flatten list of form elements.
         * 
         * @returns {array}
         */
        const fields = computed(() => {
          return flattenTree(component.form$.value.builderPagedTree || [])
        })

        /**
         * Exclude the current item from options.
         * 
         * @returns {boolean}
         */
        const excludeSelf = computed(() => {
          return elementSelectorOptions.value.excludeSelf || false
        })

        /**
         * The path of the currently selected element.
         * 
         * @returns {string}
         */
        const selectedElement = computed(() => {
          return component.form$.value.selectedElement
        })

        /**
         * The form options for the field selector.
         * 
         * @returns {object}
         */
        const elementSelectorForm = computed(() => {
          return {
            schema: {
              field: {
                type: 'select',
                inputType: 'search',
                canClear: false,
                canDeselect: false,
                search: true,
                items: fields.value,
                autocomplete: 'off',
                placeholder: tags.element_selector_placeholder,
                trackBy: 'searchLabel',
                caret: false,
                object: true,
                noResultsText: tags.element_selector_no_results,
                addClass: {
                  select: {
                    search: 'vfb-field-input',
                    dropdown: 'vfb-fields-container vfb-fields-dropdown',
                    option: fields.value.some(f => f.container && f?.children.length) ? '' : 'vfb-field-container-no-nesting',
                    optionPointed: 'vfb-field-pointed',
                    optionSelected: 'vfb-field-selected',
                    optionSelectedPointed: 'vfb-field-pointed vfb-field-selected',
                    groupLabel: 'vfb-field-group-label-container',
                  }
                },
                slots: {
                  'option': markRaw(ElementSelectOption),
                },
                onChange(n) {
                  selectingElement.value = false

                  let position = cursorPosition.value + n.path.length
                  let input = component.input.value

                  let start = input.value.slice(0, cursorPosition.value)
                  let end = input.value.slice(cursorPosition.value)

                  // Text before the original cursor
                  let value = start

                  // Add the insertion
                  value += n.path

                  // Add space after insertion if next part does not start with } or |
                  if (['}', '|'].indexOf(end.charAt(0)) === -1) {
                    value += '}'
                  }

                  let scrollToText = value

                  // Add add text after the original cursor
                  value += end
                  
                  // Update the element value with text insertion
                  component.update(value)

                  // Refocus the input
                  component.input.value.focus()

                  // Set the cursor to the original position
                  nextTick(() => {
                    setCaretPosition(component.input.value, position + 1)

                    if (['text', 'search'].indexOf(component.input.value.type) !== -1) {
                      const measureSpan = document.createElement('span')

                      measureSpan.style.visibility = 'hidden'
                      measureSpan.style.position = 'absolute'
                      measureSpan.style.whiteSpace = 'nowrap'
                      measureSpan.style.font = component.input.value.font;

                      document.body.appendChild(measureSpan)

                      measureSpan.textContent = scrollToText

                      component.input.value.scrollLeft = measureSpan.offsetWidth - component.input.value.clientWidth

                      document.body.removeChild(measureSpan)
                    } else if (component.autosize) {
                      component.autosize()
                    }
                  })
                },
                // onClose(a,b) {
                //   nextTick(() => {
                //     selectingElement.value = false

                //     nextTick(() => {
                //       setCaretPosition(component.input.value, cursorPosition.value)
                //     })
                //   })
                // }
              },
            }
          }
        })

        // ============== METHODS ===============

        /**
         * Set the cursor to a certain position in a text or textarea input.
         * 
         * @param {HTMLElement} el - the HTML element
         * @param {integer} pos - the position to set
         * @returns {void}
         */
        const setCaretPosition = (el, pos) => {
          if (el) {
            if (el.createTextRange) {
              let range = el.createTextRange()

              range.move('character', pos)
              range.select()
            } else {
              if (el.selectionStart) {
                el.focus()
                el.setSelectionRange(pos, pos)
              } else {
                el.focus()
              }
            }
          }
        }

        const getCharacterBeforeCursor = (el) => {
          let lastChar = null
          const cursorPosition = el.selectionStart
          const value = el.value

          if (cursorPosition > 0) {
            lastChar = value[cursorPosition - 1]
          }

          return lastChar
        }

        /**
         * Flattens the tree to be consumable by SelectElement.
         * 
         * @param {array} elements - elements in the tree
         * @param {integer} level - current level of elements
         * @returns {array}
         */
        const flattenTree = (elements = pagedTree.value, level = 0) => {
          let paths = []

          _.forEach(elements, (el) => {
            let path = el.root ? '__VUEFORM_ROOT__' : el.path.replace(/\.0\b/g, () => '.*')

            if (excludeSelf.value && path === selectedElement.value.replace(/\.0\b/g, () => '.*')) {
              return
            }

            let field = {
              ...el,
              path,
              level,
              value: path,
              searchLabel: `${el.primaryLabel || ''} ${el.secondaryLabel || ''}`,
            }

            paths.push(field)

            if (['group', 'object', 'table', 'tabs', 'steps', 'root'].indexOf(el.type) !== -1) {
              paths = paths.concat(flattenTree(el.children || [], level + 1) || [])
            }

            if (el.type === 'list' && el.children[0].type === 'object') {
              if (selectedElement.value.match(new RegExp(`^${el.path.replace('.', '\\\.')}\\\.`))) {
                paths = paths.concat(flattenTree(el.children[0].children || [], level + 1) || [])
              }
            }
          })

          return paths
        }

        /**
         * Close the dropdown on Backspace if it is empy.
         * 
         * @returns {void}
         */
        const handleSearchKeydown = (e) => {
          if (e.key === 'Backspace' && e.target.value == '') {
            e.preventDefault()
            selectingElement.value = false

            nextTick(() => {
              setCaretPosition(component.input.value, cursorPosition.value)
            })
          }

          if (e.key === 'Escape') {
            setTimeout(() => {
              elementSelector$.value.el$('field').input.focus()
            }, 0)
          }
        }

        /**
         * Close the dropdown on Escape if it is empy.
         * 
         * @returns {void}
         */
        const handleSearchKeyup = (e) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            e.stopPropagation()
            selectingElement.value = false

            nextTick(() => {
              setCaretPosition(component.input.value, cursorPosition.value)
            })
          }
        }

        /**
         * Handles the input's keydown event and shows the field selector dropdown on `[` key.
         * 
         * @param {Event} e - the keydown Event
         * @returns {void}
         */
        const handleKeydown = (e) => {
          if (e.key === '{' || (e.key === 'ArrowDown' && getCharacterBeforeCursor(e.target) === '{')) {
            selectingElement.value = true

            cursorPosition.value = e.target.selectionStart + 1

            setTimeout(() => {
              let field$ = elementSelector$.value.el$('field')

              field$.input.focus()
              field$.input.open()

              field$.input.input.addEventListener('keydown', handleSearchKeydown)
              field$.input.input.addEventListener('keyup', handleSearchKeyup)
            }, 0)
          } else {
            context.emit('keydown', e, component.el$)
          }
        }

        return {
          ...component,
          handleKeydown,
          elementSelector$,
          selectingElement,
          elementSelectorForm,
        }
      }
    })
  ]
}