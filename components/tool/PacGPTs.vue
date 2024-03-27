<template>
  <div>
    <ToolResizedSlideover :iframe="true" size="sm" icon="i-simple-icons-openai" rounded="rounded-2xl" :overlay="true">
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
    </ToolResizedSlideover>
  </div>
</template>
