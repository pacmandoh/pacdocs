<script setup lang="ts">
import { merge } from 'lodash'
import { twJoin } from 'tailwind-merge'
import type { ButtonSize } from '#ui/types'
import type { ResizeOptions } from '~/types'

const resizeConfig = useAppConfig().resize
const props = withDefaults(defineProps<{
  overlay?: boolean
  buttonColor?: string
  buttonSize?: ButtonSize
  buttonIcon?: string
  buttonRounded?: string
  buttonLabel?: string
  closePosition?: string
  side?: 'left' | 'right'
  transition?: boolean
  resizeOptions?: ResizeOptions
}>(), {
  overlay: true,
  buttonColor: 'white',
  buttonSize: 'md',
  buttonIcon: null,
  buttonRounded: null,
  buttonLabel: null,
  closePosition: 'top-2 left-1 md:left-2',
  side: 'right',
  transition: true,
  resizeOptions: () => ({} as ResizeOptions)
})

const isOpen = ref(false)

const mergedProps: ComputedRef<ResizeOptions> = computed(() => {
  const defaultResize = {
    width: resizeConfig.default.width,
    duration: 300,
    transition: [0.75, 0, 0.25, 1],
    percentage: 19 / 20,
    icon: null,
    size: resizeConfig.default.size
  }
  return merge({}, defaultResize, props.resizeOptions)
})

const shieldClass: ComputedRef<string[]> = computed(() => {
  return [
    resizeConfig.shield,
    props.side === 'right' ? 'left-4' : 'right-4'
  ]
})

const iconClass = computed(() => {
  return twJoin(
    resizeConfig.icon.base,
    resizeConfig.icon.size[mergedProps.value.size]
  )
})

const defaultIconClassT: ComputedRef<string[]> = computed(() => {
  return [
    resizeConfig.icon.defaultIconBase,
    resizeSlideover?.rotateTarget.value > 0 && resizeConfig.icon.defaultIconRotatePos,
    resizeSlideover?.rotateTarget.value < 0 && resizeConfig.icon.defaultIconRotateNeg,
    'translate-y-[0.15rem]'
  ]
})

const defaultIconClassB: ComputedRef<string[]> = computed(() => {
  return [
    resizeConfig.icon.defaultIconBase,
    resizeSlideover?.rotateTarget.value > 0 && resizeConfig.icon.defaultIconRotateNeg,
    resizeSlideover?.rotateTarget.value < 0 && resizeConfig.icon.defaultIconRotatePos,
    'translate-y-[-0.15rem]'
  ]
})

const resizeSlideover = useResizeSlideover({
  _width: resizeConfig.width.init[mergedProps.value.width],
  _duration: mergedProps.value.duration,
  _transition: mergedProps.value.transition,
  _percentage: mergedProps.value.percentage,
  _side: toRef(() => props.side),
  transitionP: toRef(() => props.transition)
})
</script>

<template>
  <div>
    <div class="flex flex-row items-center gap-2" @click="isOpen = true">
      <UButton
        :size="buttonSize"
        :color="buttonColor"
        :icon="buttonIcon"
        :ui="{ rounded: buttonRounded }"
        :label="buttonLabel"
        aria-label="SlideOver Button"
      />
      <slot name="text" />
    </div>

    <USlideover
      v-model="isOpen"
      :overlay="overlay"
      :style="{ '--width': resizeSlideover?.styleWidth.value }"
      :ui="{ width: 'max-w-[var(--width)]', background: '' }"
    >
      <div v-if="resizeSlideover.resize.isResizing" :class="shieldClass" style="user-select: none; -webkit-user-select: none;" />

      <!-- close button -->
      <div class="absolute flex z-[60]" :class="closePosition">
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

      <div
        :class="[resizeConfig.wrapper, side === 'left' ? 'right-0' : 'left-0']"
        @pointerdown="resizeSlideover?.handleResize"
        @click="resizeSlideover?.handleClick"
      >
        <div v-if="!resizeOptions.icon" :class="[resizeConfig.base]">
          <div :class="defaultIconClassT" />
          <div :class="defaultIconClassB" />
        </div>

        <div v-else class="flex items-center justify-center">
          <UIcon :name="resizeOptions.icon" :class="iconClass" aria-hidden="true" />
        </div>
      </div>

      <div :class="resizeConfig.slot">
        <slot />
      </div>
    </USlideover>
  </div>
</template>
