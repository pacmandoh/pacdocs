<template>
  <ClientOnly placeholder="PacAssets">
    <span class="inline-block">
      <ToolResizedSlideover
        :iframe="true"
        size="sm"
        icon="i-ph-download-fill"
        rounded="rounded-2xl"
        :overlay="true"
        close-postion="top-14 left-1 md:left-2"
      >
        <template #text>
          <slot name="text" />
        </template>
        <iframe
          width="100%"
          height="100%"
          src="https://downloads.crybabyaq.love/"
          title="Downloader for PacDocs"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="rounded-2xl"
        />
      </ToolResizedSlideover>
    </span>
  </ClientOnly>
</template>