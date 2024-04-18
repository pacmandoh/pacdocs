<script setup lang="ts">
import type { ButtonSize } from '#ui/types'

withDefaults(defineProps<{
  buttonSize?: ButtonSize
  buttonIcon?: string
  buttonRounded?: string
  buttonLabel?: string
  closePosition?: string
}>(), {
  buttonSize: 'md',
  buttonIcon: null,
  buttonRounded: null,
  buttonLabel: null
})
</script>

<template>
  <div>
    <ToolResizeSlideover :button-size="buttonSize" :button-icon="buttonIcon" :button-rounded="buttonRounded" :button-label="buttonLabel">
      <template #text>
        <slot name="text" />
      </template>
      <iframe
        width="100%"
        height="100%"
        src="https://chatgpt.crybabyaq.love/"
        title="ChatAI(GPT, Gemini Pro...) assistant for PacDocs"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </ToolResizeSlideover>
  </div>
</template>
