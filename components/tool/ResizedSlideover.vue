<script setup lang="ts">
import type { ButtonSize } from '#ui/types'

const props = withDefaults(defineProps<{
  iframe?: boolean
  initwidth?: number
  duration?: number
  overlay?: boolean
  color?: string
  size?: string
  icon: string
  rounded: string
  label?: string
  closePostion?: string
}>(), {
  iframe: false,
  initwidth: 480,
  duration: 300,
  overlay: false,
  color: 'white',
  size: 'md',
  icon: null,
  rounded: null,
  label: null,
  closePostion: 'top-2 left-1 md:left-2'
})

const isOpen = ref(false)
const { width } = useSharedWindowSize()
const initWidth = ref(props.initwidth)
const isResizing = ref(false)
const isClick = ref(true)

const isMobile = computed(() => width.value <= props.initwidth)
const newWidth = ref<number>()
const source = ref(props.initwidth)

const isMagnetic = computed(() => {
  return newWidth.value > width.value * (19 / 20)
})

const resized = computed({
  get: () => source.value,
  set: (value: number) => {
    if (!isClick.value) {
      if (value > width.value) {
        value = width.value
        initWidth.value = width.value
      }
      source.value = isMagnetic.value ? width.value : value
    }
    else {
      source.value = value
    }
  }
})

const transition = useTransition(resized, {
  duration: props.duration,
  transition: [0.75, 0, 0.25, 1]
})

const styleWidth = computed(() => {
  return isMagnetic.value || isClick.value ? `${transition.value}px` : `${resized.value}px`
})

const handleResize = (e: MouseEvent) => {
  const initPosX = e.clientX
  const onDocumentPointerMove = (e: MouseEvent) => {
    isClick.value = false
    isResizing.value = true
    newWidth.value = initWidth.value - (e.clientX - initPosX)
    if (newWidth.value <= props.initwidth || newWidth.value >= width.value) return
    resized.value = newWidth.value
  }
  document.addEventListener('pointermove', onDocumentPointerMove)
  const onDocumentPointerUp = () => {
    isResizing.value = false
    initWidth.value = resized.value
    document.removeEventListener('pointermove', onDocumentPointerMove)
    useTimeoutFn(() => {
      isClick.value = true
    }, props.duration)
  }
  document.addEventListener('pointerup', onDocumentPointerUp, { once: true })
}

const handleClick = () => {
  if (isClick.value) {
    if (resized.value >= width.value / 2) {
      resized.value = resized.value === width.value ? props.initwidth : width.value
    }
    else {
      resized.value = width.value / 2
    }
    initWidth.value = resized.value
  }
}

watch(width, () => {
  if (resized.value > width.value) {
    resized.value = width.value
    initWidth.value = width.value
  }
})
</script>

<template>
  <div>
    <div class="flex flex-row items-center gap-2" @click="isOpen = true">
      <UButton
        :size="(size as ButtonSize)"
        :color="color"
        :icon="icon"
        :ui="{ rounded: rounded }"
        :label="label"
        aria-label="SlideOver Button"
      />
      <slot name="text" />
    </div>

    <USlideover
      v-model="isOpen"
      :overlay="overlay"
      :style="{ '--width': styleWidth }"
      :ui="{ width: 'max-w-[var(--width)]', background: '' }"
    >
      <!-- close button -->
      <div class="absolute flex z-[60]" :class="props.closePostion">
        <UButton
          color="gray"
          variant="link"
          icon="i-ph-x-circle-duotone"
          class="rounded-full"
          :padded="false"
          :ui="{ color: { gray: { link: 'text-gray-500 dark:text-gray-400 hover:dark:text-gray-500 hover:text-gray-400' } } }"
          aria-label="Close Button"
          @click="isOpen = false"
        />
      </div>

      <!-- resize button -->
      <div
        v-if="!isMobile"
        class="absolute top-0 left-0 cursor-col-resize h-full flex z-50 w-4 justify-center flex-col group"
        @pointerdown="handleResize"
        @click="handleClick"
      >
        <div class="flex h-8 w-4 flex-col items-center justify-center opacity-30 dark:opacity-40 group-hover:dark:opacity-80 group-hover:opacity-80">
          <div class="h-4 w-1 rounded-full transform translate-y-[0.15rem] rotate-0 group-hover:transform group-hover:rotate-[15deg] bg-gray-500 dark:bg-gray-400" />
          <div class="h-4 w-1 rounded-full transform translate-y-[-0.15rem] rotate-0 group-hover:transform group-hover:rotate-[-15deg] bg-gray-500 dark:bg-gray-400" />
        </div>
      </div>

      <div v-if="iframe">
        <div v-if="isResizing" class="w-full h-full absolute z-50 opacity-0 bg-transparent left-4" />
      </div>

      <div class="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden h-full w-full">
        <slot />
      </div>
    </USlideover>
  </div>
</template>
