<script setup lang="ts">
import type uiColors from '#ui-colors'
const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String as PropType<(typeof uiColors)[number]>, required: true },
  to: { type: String, required: false, default: undefined }
})
const target = computed(() => (props.to?.startsWith('https://') ? '_blank' : ''))
</script>

<template>
  <Callout :icon="icon" :color="color" :to="to" :target="target" class="font-medium">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </Callout>
</template>
