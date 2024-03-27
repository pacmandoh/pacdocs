<template>
  <div class="flex flex-col gap-1">
    <div class="text-6xl min-[375px]:text-7xl md:text-[5.5rem] lg:text-8xl 2xl:text-9xl font-bold">
      <span class="absolute bg-gradient-to-r from-primary-500 to-primary-400 dark:from-primary-600 dark:to-primary-500/80 animate-fadecolorB" style="-webkit-text-fill-color: transparent; override-colors: transparent; -webkit-background-clip: text;">
        PacDocs
      </span>
      <span class="text-transparent bg-[length:200%_auto] bg-clip-text bg-[60%_center] bg-gray-900 dark:bg-gray-200" style="-webkit-background-clip: text;">
        PacDocs
      </span>
    </div>
    <div class="hidden min-[375px]:flex min-[375px]:text-2xl min-[398px]:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold px-4 items-center justify-center gap-2">
      <span>
        <span class="absolute bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-500/80 animate-fadecolorR" style="-webkit-text-fill-color: transparent; override-colors: transparent; -webkit-background-clip: text;">渐进式指南</span>
        <span class="text-transparent bg-[length:200%_auto] bg-clip-text bg-[60%_center] bg-gray-900 dark:bg-gray-200" style="-webkit-background-clip: text;">渐进式指南</span>
      </span> 
      <span class="flex 2xl:h-[3.75rem] 2xl:w-[3.75rem] lg:w-[3rem] lg:h-[3rem] md:w-[2.25rem] md:h-[2.25rem] min-[375px]:w-[1.5rem] min-[375px]:h-[1.5rem] min-[398px]:h-[1.875rem] min-[398px]:w-[1.875rem]">
        <HomeHeroLogo />
      </span>
      <span>
        <span class="absolute bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500/80 dark:to-primary-600 animate-fadecolorY" style="-webkit-text-fill-color: transparent; override-colors: transparent; -webkit-background-clip: text;">专注于分享</span>
        <span class="text-transparent bg-[length:200%_auto] bg-clip-text bg-[60%_center] bg-gray-900 dark:bg-gray-200" style="-webkit-background-clip: text;">专注于分享</span>
      </span>
    </div>
    <div class="text-lg lg:text-xl 2xl:text-2xl mt-2 text-gray-800 dark:text-gray-300">
      <div
        class="rounded-md flex flex-col justify-center items-center overflow-hidden"
      >
        <div class="font-extrabold [text-wrap:balance]">
          丰富的资源
          <span
            class="inline-flex flex-col h-[calc(theme(fontSize.lg)*theme(lineHeight.tight))] overflow-hidden"
          >
            <ul
              class="block text-center leading-tight [&_li]:block animate-text-slide"
            >
              <li class="text-primary-500 dark:text-primary-400 px-2">DataScience</li>
              <li class="text-primary-500 dark:text-primary-400">Front-End</li>
              <li class="text-primary-500 dark:text-primary-400">DataBase</li>
              <li class="text-primary-500 dark:text-primary-400">AI Model</li>
              <li class="text-primary-500 dark:text-primary-400">Software</li>
              <li class="text-primary-500 dark:text-primary-400">...</li>
            </ul>
          </span>
          等待着探索
        </div>
      </div>
    </div>
  </div>
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
  }
</style>