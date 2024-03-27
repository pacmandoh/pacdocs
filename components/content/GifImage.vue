<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt?: string
  class?: string
  container?: string
}>(), {
  alt: 'GIF Image',
  class: 'rounded-lg border border-gray-200 dark:border-white/20 border-[1px]',
  container: 'px-8'
})
</script>

<template>
  <div :class="props.container">
    <img :src="props.src" :alt="props.alt" :class="props.class">
  </div>
</template>