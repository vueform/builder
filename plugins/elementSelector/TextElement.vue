<template>
  <component :is="elementLayout" ref="container">
    <template #element>
      <div :class="classes.inputContainer">
        <ElementAddon v-if="hasAddonBefore" type="before"><slot name="addon-before"/></ElementAddon>
        <ElementAddon v-if="hasAddonAfter" type="after"><slot name="addon-after"/></ElementAddon>
        <ElementLabelFloating v-if="hasFloating && !empty" :visible="!empty" />
        <ElementLoader v-if="isLoading"/>
        <input
          :value="model"
          :type="inputType"
          :name="name"
          :id="fieldId"
          :class="classes.input"
          :placeholder="placeholder" 
          :autocomplete="autocomplete"
          :disabled="isDisabled"
          :readonly="readonly"
          v-bind="{
            ...attrs,
            ...aria,
          }"
          @keydown="handleKeydown"
          @keyup="handleKeyup"
          @keypress="handleKeypress"
          @input="handleInput"
          @select="handleInput"
          @blur="handleBlur"
          ref="input"
       />
        <div
          v-if="elementSelector && selectingElement"
          class="vfb-element-selector-plugin"
        >
          <Vueform ref="elementSelector$" v-bind="elementSelectorForm" />
        </div>
      </div>
    </template>
    <!-- Default element slots -->
    <template v-for="(component, slot) in elementSlots" #[slot]><slot :name="slot" :el$="el$"><component :is="component" :el$="el$"/></slot></template>
  </component>
</template>

<script>
  export default {
    name: 'TextElement',
    data() {
      return {
        merge: true,
        defaultClasses: {},
      }
    },
  }
</script>

<style lang="scss">
</style>