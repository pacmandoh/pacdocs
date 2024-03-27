<template>
  <NuxtLink
    ref="mbtn"
    class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-base gap-x-2.5 px-3.5 py-2.5 shadow-sm ring-1 ring-offset-4 ring-gray-300 dark:ring-gray-700 ring-offset-white dark:ring-offset-gray-900 text-gray-900 dark:text-white bg-white disabled:bg-white dark:bg-gray-900  dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center relative btn hover:ring-primary-500 dark:hover:ring-primary-400 hover:text-white hover:dark:text-gray-900 group"
    :to="to" 
    :target="target"
    :style="{ '--x': `${elementX}px`, '--y': `${elementY}px`, '--clr': clr, 'transform': transform }"
  >
    <UIcon name="i-ph-rocket-launch-duotone" class="flex-shrink-0 h-6 w-6 group-hover:animate-bounce" />
    <span class="z-10">
      {{ label }}
    </span>
  </NuxtLink> 
</template>
  
<script setup lang="ts">
export interface Props {
  to: string
  target?: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  target: '_self',
  label: ''
})

const mbtn = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth, stop } = useMouseInElement(mbtn, { handleOutside: false })

const mode = useColorMode()

const clr = computed(() => {
  return mode.preference === 'dark' ? 'rgba(var(--color-primary-400) / 1)' : 'rgba(var(--color-primary-500) / 1)'
})

const transform = computed(() => {
  return !isOutside.value ? `translateX(${elementX.value - elementWidth.value / 2}px) translateY(${elementY.value - elementHeight.value / 2}px)` : ''
})

onBeforeUnmount(() => {
  stop()
})

</script>

<style scoped>
.btn {
    transition: transform .1s;
    overflow: hidden;
}

/* 悬停时会扩展开的圆圈样式 */
.btn::before {
    content: "";
    position: absolute;
    top: var(--y);
    left: var(--x);
    transform: translate(-50%, -50%);
    background-color: var(--clr);
    width: 0;
    height: 0;
    border-radius: 50%;
    transition: 1s, left 0s, top 0s;
}

.btn:hover::before {
    width: 205px;
    height: 205px;
}
</style>