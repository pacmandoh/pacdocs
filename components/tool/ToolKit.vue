<script setup lang="ts">
const isMousedown = ref(false)
const isClick = ref(false)
const isTouchMoblie = /IOS|iPhone|Android|iPad|iPod|Mobi/i.test(navigator.userAgent) || navigator.maxTouchPoints > 0
const isInit = ref(true)

// toolbar
const displayed = 2
const hidden = -40

const el = ref<HTMLElement | null>(null)
const { height } = useSharedWindowSize()
const { height: elHeight } = useElementSize(el)
const { y: scrollY } = useSharedWindowScroll()
const isHovered = useElementHover(el)
const { unread } = useChannel()

const { y } = useDraggable(el, {
  initialValue: { x: displayed, y: height.value / displayed - 85 },
  preventDefault: true,
  onStart() {
    isMousedown.value = true
  },
  onEnd() {
    isMousedown.value = false
  }
})

const limitY = computed(() => {
  return y.value <= 0 ? 0 : y.value >= height.value - elHeight.value ? height.value - elHeight.value : y.value
})

const source = computed(() =>
  isInit.value
    ? displayed
    : isTouchMoblie
      ? isClick.value || isMousedown.value ? displayed : hidden
      : isHovered.value || isMousedown.value ? displayed : hidden
)

const vector = useTransition(source, {
  duration: 300,
  transition: [0.75, 0, 0.25, 1]
})

useTimeoutFn(() => {
  isInit.value = false
}, 1000)

const vditorContent = `
  # 欢迎使用 PacDown
  - PacDown 是 PacDocs 集成的 Markdown 在线编辑器，基于 [Vditor](https://github.com/Vanessa219/vditor)，您可以将您在学习中的笔记记录在此
  - 支持导出 pdf, md, png 格式
  - 您已经记录的笔记会缓存到本地，只要您不清楚浏览器缓存，不管怎么刷新记录都不会清空
  - 更细致的内容请阅读下 [PacDown](https://md.crybabyaq.love)

  **删除以上内容！开始您的学习笔记之旅**
`

if (isTouchMoblie) {
  watch(scrollY, () => {
    isClick.value = false
  })
}
</script>

<template>
  <div
    ref="el"
    :style="{ top: `${limitY}px`, left: `${vector}px` }"
    style="touch-action: none;"
    class="fixed z-50"
    @click="isClick = !isClick"
  >
    <div class="flex flex-row items-center rounded-2xl shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 py-2 pl-2">
      <div class="grid gap-2 grid-rows-3">
        <ToolPacGPTs button-size="sm" button-icon="i-simple-icons-openai" button-rounded="rounded-2xl" />

        <div>
          <ToolResizeSlideover button-size="sm" button-icon="i-ph-notebook-fill" button-rounded="rounded-2xl">
            <ToolPacDown :content="vditorContent" />
          </ToolResizeSlideover>
        </div>

        <ToolChannel />

        <ToolBackToTop />
      </div>

      <div class="flex">
        <UChip
          :show="unread > 0"
          :text="unread"
          size="md"
          inset
          :ui="{ position: { 'top-right': 'top-[-1rem] right-1' }, base: unread > 0 && 'animate-bounce' }"
        >
          <UIcon name="i-ph-caret-right-bold" class="cursor-pointer" :class="[source === displayed && 'transform rotate-180 transition duration-1000', source === hidden && 'transform rotate-360 transition duration-1000', unread > 0 && 'animate-pulse text-primary-500 dark:text-primary-400']" />
        </UChip>
      </div>
    </div>
  </div>
</template>
