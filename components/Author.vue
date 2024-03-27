<template>
  <div
    class="flex gap-2 items-center p-1"
  >
    <UAvatar
      chip-color="primary"
      chip-text="Aq"
      chip-position="top-right"
      src="https://imgbucket-1318471229.cos.ap-beijing.myqcloud.com/pacmandoh.png"
      alt="Avatar of pacmandoh"
      class="lg:hover:scale-110 hover:ring-2 lg:hover:ring-primary-500 dark:lg:hover:ring-primary-400 transition-transform"
      size="sm"
    />

    <div
      class="text-md text-gray-500 dark:text-gray-400 font-medium"
    >
      {{ new Date().getFullYear() }} PacmanDoh
    </div>

    <NuxtLink to="https://github.com/pacmandoh" target="_blank" aria-label="Give me a Star on GitHub" class="flex">
      <UIcon name="i-ph-heart-duotone" class="dark:text-red-400 text-red-500 heart-animation" />
    </NuxtLink>
  </div>
</template>

<style scoped lang="postcss">
.heart-animation {
  animation: iconAnimate 1.5s linear infinite;

  @keyframes iconAnimate {

    0%,
    100% {
      transform: scale(1)
    }

    10%,
    30% {
      transform: scale(.9)
    }

    20%,
    40%,
    60%,
    80% {
      transform: scale(1.1)
    }

    50%,
    70% {
      transform: scale(1.1)
    }
  }
}
</style>
