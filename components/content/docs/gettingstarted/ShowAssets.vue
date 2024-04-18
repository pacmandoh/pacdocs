<template>
  <ClientOnly placeholder="PacAssets">
    <span class="inline-block">
      <ToolResizeSlideover
        button-size="sm"
        button-icon="i-ph-download-fill"
        button-rounded="rounded-2xl"
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
      </ToolResizeSlideover>
    </span>
  </ClientOnly>
</template>
