<template>
  <div class="relative h-[250px] sm:h-[300px] md:h-[400px] w-full lg:h-full z-[2]">
    <div
      v-if="isLoading"
      class="py-12 absolute w-full h-full overflow-hidden flex items-center justify-center"
      :style="{ '--streak-speed': streakSpeed }"
      @mouseover="fast = true"
      @mouseleave="fast = false"
    >
      <span class="rocket flex items-center" :class="{ shake: fast, move: !fast }">
        <UIcon name="i-ph-rocket-duotone" class="h-12 w-12 -rotate-90 p-2" />
        <span class="text-lg font-medium p-2">Loading...</span>
      </span>
      <span
        v-for="n in 10"
        :key="n"
        :style="{
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 1 + 's',
          animationDuration: streakSpeed,
        }"
        class="streak absolute left-0 w-1/5 h-0.5 bg-gradient-to-r from-transparent to-black/60 dark:to-white/60"
      />
    </div>
    <div v-if="isSafari && isScrolling" class="absolute top-0 left-0 z-[1] h-full w-full" />
    <iframe
      width="100%"
      height="100%"
      :on-load="isLoading = false"
      src="https://model.crybabyaq.love/?nobutton&nozoom"
      title="3D Engine for PacDocs"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      style="color-scheme: light;"
    />
  </div>
</template>

<script setup lang="ts">
const isScrolling = ref(false)
const fast = ref(false)
const isLoading = ref(true)
const streakSpeed = computed(() => (fast.value ? '0.5s' : '2s'))

const isSafari = ref<boolean>()

onMounted(() => {
  isSafari.value = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')
  if (isSafari) {
    const { isScrolling: useIsScrolling } = useScroll(window, { throttle: 100 })
    watch(useIsScrolling, () => {
      isScrolling.value = useIsScrolling.value
    })
  }
})
</script>

<style scoped lang="postcss">
  .rocket.move {
    animation: move 1s linear infinite;
  }

  .rocket.shake {
    animation: shake 0.5s linear infinite;
  }

  .streak {
    animation: streaks linear infinite;
    animation-duration: var(--streak-speed);
  }

  @keyframes move {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes streaks {
    to {
      left: 100%;
    }
  }

  @keyframes shake {
    2% {
      transform: translate(2.5px, 1.5px) rotate(-0.5deg);
    }

    4% {
      transform: translate(2.5px, 0.5px) rotate(-0.5deg);
    }
    6% {
      transform: translate(2.5px, 0.5px) rotate(0.5deg);
    }
    8% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }
    10% {
      transform: translate(1.5px, -1.5px) rotate(-0.5deg);
    }
    12% {
      transform: translate(-1.5px, 0.5px) rotate(0.5deg);
    }
    14% {
      transform: translate(0.5px, 1.5px) rotate(-0.5deg);
    }
    16% {
      transform: translate(-1.5px, 0.5px) rotate(0.5deg);
    }
    18% {
      transform: translate(1.5px, -1.5px) rotate(0.5deg);
    }
    20% {
      transform: translate(2.5px, 1.5px) rotate(-0.5deg);
    }
    22% {
      transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }
    24% {
      transform: translate(0.5px, -0.5px) rotate(-0.5deg);
    }
    26% {
      transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }
    28% {
      transform: translate(0.5px, 0.5px) rotate(0.5deg);
    }
    30% {
      transform: translate(2.5px, 0.5px) rotate(0.5deg);
    }
    32% {
      transform: translate(-0.5px, 0.5px) rotate(0.5deg);
    }
    34% {
      transform: translate(2.5px, 0.5px) rotate(-0.5deg);
    }
    36% {
      transform: translate(0.5px, 2.5px) rotate(0.5deg);
    }
    38% {
      transform: translate(-0.5px, 0.5px) rotate(-0.5deg);
    }
    40% {
      transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
    }
    42% {
      transform: translate(1.5px, 2.5px) rotate(-0.5deg);
    }
    44% {
      transform: translate(-0.5px, 0.5px) rotate(-0.5deg);
    }
    46% {
      transform: translate(2.5px, 1.5px) rotate(-0.5deg);
    }
    48% {
      transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    }
    50% {
      transform: translate(-0.5px, -1.5px) rotate(-0.5deg);
    }
    52% {
      transform: translate(-1.5px, 1.5px) rotate(1.5deg);
    }
    54% {
      transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
    }
    56% {
      transform: translate(2.5px, 1.5px) rotate(0.5deg);
    }
    58% {
      transform: translate(-1.5px, -1.5px) rotate(0.5deg);
    }
    60% {
      transform: translate(1.5px, 0.5px) rotate(0.5deg);
    }
    62% {
      transform: translate(-0.5px, -1.5px) rotate(1.5deg);
    }
    64% {
      transform: translate(0.5px, 1.5px) rotate(-0.5deg);
    }
    66% {
      transform: translate(-0.5px, 2.5px) rotate(0.5deg);
    }
    68% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }
    70% {
      transform: translate(1.5px, -1.5px) rotate(0.5deg);
    }
    72% {
      transform: translate(0.5px, 2.5px) rotate(-0.5deg);
    }
    74% {
      transform: translate(0.5px, -1.5px) rotate(1.5deg);
    }
    76% {
      transform: translate(-0.5px, 0.5px) rotate(0.5deg);
    }
    78% {
      transform: translate(1.5px, -0.5px) rotate(0.5deg);
    }
    80% {
      transform: translate(-0.5px, 2.5px) rotate(-0.5deg);
    }
    82% {
      transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    }
    84% {
      transform: translate(-1.5px, 2.5px) rotate(-0.5deg);
    }
    86% {
      transform: translate(1.5px, -0.5px) rotate(0.5deg);
    }
    88% {
      transform: translate(-1.5px, 0.5px) rotate(0.5deg);
    }
    90% {
      transform: translate(0.5px, 0.5px) rotate(0.5deg);
    }
    92% {
      transform: translate(0.5px, -1.5px) rotate(-0.5deg);
    }
    94% {
      transform: translate(0.5px, 0.5px) rotate(-0.5deg);
    }
    96% {
      transform: translate(2.5px, 2.5px) rotate(1.5deg);
    }
    98% {
      transform: translate(1.5px, 2.5px) rotate(0.5deg);
    }
    0%,
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }
</style>
