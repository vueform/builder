<template>
  <div
    :class="[
      'vfb-field-wrapper',
      option.root ? 'vfb-field-wrapper-root' : null,
      option.container ? 'vfb-field-wrapper-container' : null,
      option.disabled ? 'vfb-field-wrapper-disabled' : null,
    ]"
  >
    <div class="vfb-field-spacing">
      <template v-for="l in option.level">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </template>

      <template v-if="option.level >= 1">
        &nbsp;
      </template>
    </div>

    <div
      v-if="option.container && option.children && option.children.length && !option.root"
      :class="[
        'vfb-field-chevron-container',
        option.level > 0 ? 'vfb-field-chevron-container-sub' : null,
      ]"
    >
      <builder-icon
        class="vfb-field-chevron"
        :icon="['fas', 'chevron-down']"
      />
    </div>

    <div class="vfb-field-icon-container">
      <img
        v-if="typeof option.icon === 'string'"
        class="vfb-field-icon"
        :src="option.icon"
        :title="option.typeLabel"
      />
      <builder-icon
        v-else class="vfb-field-icon"
        :icon="option.icon || ['fas', 'shapes']"
      />
    </div>
    
    <div class="vfb-field-text" aria-hidden="true">
      <div class="vfb-field-text-primary">{{ option.primaryLabel }}</div>
      <div v-if="option.secondaryLabel" class="vfb-field-text-secondary">{{ option.secondaryLabel }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      required: true,
    },
    isPointed: {
      type: Function,
      required: false,
    },
    isSelected: {
      type: Function,
      required: false,
    },
  }
}
</script>

<style>
.vfb-element-selector-plugin {
  @apply absolute top-full left-0 right-0 w-full bg-white z-999;
}

.vfb-element-selector-plugin *,
.vfb-element-selector-plugin :before,
.vfb-element-selector-plugin :after,
.vfb-element-selector-plugin :root {
  --vf-gutter: 0.1rem !important;
  --vf-radius-input: 0 !important;
  --vf-bg-input: #fff !important;
}

.vfb-element-selector-plugin .vfb-fields-container {
  @apply w-full overflow-x-scroll;
}

.vfb-element-selector-plugin .vfb-fields-plugin {
  @apply border-t-0 w-auto;
}

.vfb-element-selector-plugin .vfb-field-text {
  @apply overflow-x-visible;
}
</style>