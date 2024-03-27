<script setup lang="ts">
const { unread } = useChannel()

const vditorContent = `
  # 欢迎使用 PacDown
  - PacDown 是 PacDocs 集成的 Markdown 在线编辑器，基于 [Vditor](https://github.com/Vanessa219/vditor)，您可以将您在学习中的笔记记录在此
  - 支持导出 pdf, md, png 格式
  - 您已经记录的笔记会缓存到本地，只要您不清楚浏览器缓存，不管怎么刷新记录都不会清空
  - 更细致的内容请阅读下 [PacDown](https://md.crybabyaq.love)

  **删除以上内容！开始您的学习笔记之旅**
`
</script>

<template>
  <div class="flex items-center">
    <UPopover
      class="inline-flex"
      :ui="{
        ring: 'ring-1 ring-gray-200 dark:ring-gray-700',
        shadow: 'none',
        rounded: 'rounded-lg',
        popper: {
          strategy: 'absolute'
        }
      }"
    >
      <UChip
        :show="unread > 0"
        :text="unread"
        size="md"
        inset
        :ui="{ base: unread > 0 && 'animate-bounce' }"
      >
        <UButton
          variant="ghost"
          color="gray"
          icon="i-ph-caret-down-fill"
          square
          class="opacity-50 hover:opacity-100"
          :class="[unread > 0 && 'text-primary-500 dark:text-primary-400']"
          aria-label="Open dropdown"
          role="button"
        />
      </UChip>

      <template #panel>
        <div class="flex flex-col gap-y-1 p-2 bg-white dark:bg-gray-950">
          <div class="p-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer hover:text-gray-900 hover:dark:text-white dark:text-gray-200 text-gray-700">
            <ToolPacGPTs>
              <template #text>
                <span class="text-sm truncate">PacGPTs</span>
              </template>
            </ToolPacGPTs>
          </div>

          <div class="p-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer hover:text-gray-900 hover:dark:text-white dark:text-gray-200 text-gray-700">
            <ToolResizedSlideover size="sm" icon="i-ph-notebook-fill" rounded="rounded-2xl" :overlay="true" :iframe="true">
              <ToolPacDown :content="vditorContent" />
              <template #text>
                <span class="text-sm truncate">PacDown</span>
              </template>
            </ToolResizedSlideover>
          </div>

          <div class="p-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer hover:text-gray-900 hover:dark:text-white dark:text-gray-200 text-gray-700">
            <ToolChannel>
              <template #text>
                <span class="text-sm truncate">Channel.io</span>
              </template>
            </ToolChannel>
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>
