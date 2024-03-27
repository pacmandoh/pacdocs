<script setup lang="ts">
const props = defineProps({
  single: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="flex flex-row gap-2">
    <ColorModePicker v-if="!props.single" />
    <ColorPicker />
  </div>
</template>
