<template>
  <div>
    <UButton
      size="sm"
      color="white"
      icon="i-ph-arrow-fat-up-duotone"
      class="rounded-2xl"
      aria-label="back to top"
      @click="handleScrollToTop"
    />
  </div>
</template>

<script setup lang="ts">
// back to top
const windowScroll = useWindowScroll({ behavior: 'smooth' })
const handleScrollToTop = () => {
  windowScroll.y.value = 0
}
</script>
