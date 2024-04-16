<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  lineType?: string
  orientation?: string
  size?: string
  wrapper?: string
  icon?: string
}>(), {
  lineType: 'solid',
  orientation: 'horizontal',
  size: 'border-t',
  wrapper: 'px-2 py-6',
  icon: 'i-ph-package-duotone'
})
</script>

<template>
  <div :class="props.wrapper">
    <UDivider
      :type="props.lineType"
      :orientation="props.orientation"
      :ui="{ border: { size: { horizontal: props.size } } }"
    >
      <div class="flex flex-row items-center gap-2">
        <UIcon v-if="props.icon" :name="props.icon" />
        {{ props.label }}
      </div>
    </UDivider>
  </div>
</template>
