<template>
  <span class="flex flex-col">
    <span class="font-medium">
      在分享知识的同时, 提供便利的工具: 在线 IDE, 侧边栏式的 ChatAI (PacGPTs), Markdown 笔记本等
    </span>

    <span class="mt-2">
      <UButton
        icon="i-logos-visual-studio-code"
        label="VS Code"
        color="white"
        variant="link"
        to="https://code.crybabyaq.love/"
        target="_blank"
        class="text-sm md:text-base lg:text-lg 2xl:text-xl font-bold"
      />

      <UButton
        icon="i-devicon-rstudio"
        label="RStudio"
        color="white"
        variant="link"
        to="https://rstudio.crybabyaq.love/"
        target="_blank"
        class="text-sm md:text-base lg:text-lg 2xl:text-xl font-bold"
      />

      <UButton
        icon="i-logos-jupyter"
        label="JypyterLab"
        color="white"
        variant="link"
        to="https://jupyter.crybabyaq.love/"
        target="_blank"
        class="text-sm md:text-base lg:text-lg 2xl:text-xl font-bold"
      />
    </span>

    <span>
      <UButton
        icon="i-ph-download-fill"
        label="PacAssets"
        color="white"
        variant="link"
        to="https://downloads.crybabyaq.love/"
        target="_blank"
        class="text-sm md:text-base lg:text-lg 2xl:text-xl font-bold"
      />

      <UButton
        icon="i-ph-notebook-fill"
        label="PacDown"
        color="white"
        variant="link"
        to="https://md.crybabyaq.love/"
        target="_blank"
        class="text-sm md:text-base lg:text-lg 2xl:text-xl font-bold"
      />

      <UButton
        icon="i-ph-terminal-window-duotone"
        label="PacConsole"
        color="white"
        variant="link"
        to="https://console.crybabyaq.love/"
        target="_blank"
        class="text-sm md:text-base lg:text-lg 2xl:text-xl font-bold"
      />
    </span>
  </span>
</template>

<style scoped lang="postcss">
  .animate-text-slide {
    animation: text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  }

  @keyframes text-slide {
    0%,
    16% {
      transform: translateY(0%);
    }

    20%,
    36% {
      transform: translateY(-16.66%);
    }

    40%,
    56% {
      transform: translateY(-33.33%);
    }

    60%,
    76% {
      transform: translateY(-50%);
    }

    80%,
    96% {
      transform: translateY(-66.66%);
    }

    100% {
      transform: translateY(-83.33%);
    }
  }
</style>
