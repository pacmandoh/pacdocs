<script setup lang="ts">
import { debounce } from 'perfect-debounce'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import './styles/twoslash.css'

const config = useRuntimeConfig().public
const search = ref(null)
const colorMode = useColorMode()
const { width } = useWindowSize()
const { headerLinks, searchGroups, searchLinks } = useNavigation()

// mobile safari top bar bgColor
import colors from '#tailwind-config/theme/colors'

const appConfig = useAppConfig()
const grayColors = computed(() => ['slate', 'cool', 'zinc', 'neutral', 'stone'].map(color => ({ value: color, text: color, hex: colors[color][950] })))
const gray = computed(() => {
  return grayColors.value.find(option => option.value === appConfig.ui.gray)
})

const color = computed(() => colorMode.value === 'dark' ? gray.value.hex : 'white')

const { data: navigation } = await useLazyAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false
})

useHead({
  titleTemplate: title => title ? `${title} · PacDocs` : 'PacDocs: 渐进式指南, 资源分享, 并附带项目提升云学习效率',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' }
  ],
  htmlAttrs: {
    lang: 'zh'
  }
})

useSeoMeta({
  ogSiteName: 'PacDocs',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@haodou20'
})

watch(() => search.value?.commandPaletteRef?.query, debounce((query: string) => {
  if (!query) {
    return
  }

  useTrackEvent('Search', { props: { query: `${query} - ${search.value?.commandPaletteRef.results.length} results` } })
}, 500))

// Provide
provide('navigation', navigation)
</script>

<template>
  <div>
    <NuxtLoadingIndicator :color="colorMode.preference === 'dark' ? 'rgba(var(--color-primary-400) / 1)' : 'rgba(var(--color-primary-500) / 1)'" />
    <!-- <AppBanner :id="20" to="/blog/updates" target="_blank">
      <p class="text-gray-600 dark:text-gray-300 flex items-center gap-1">
        <UIcon name="i-ph-lightbulb-duotone" class="w-4 h-4" />
        <span class="font-bold text-gray-900 dark:text-white">PacDocs<sup>{{ config.version.slice(0, 3) }}</sup></span> 崭新UI和更多功能!
      </p>

      <UButton color="gray" trailing-icon="i-ph-arrow-right" size="xs" class="rounded-full" aria-label="Go" />
    </AppBanner> -->

    <AppBanner id="ui-pro-1-0" to="/blog/updates">
      <div class="flex items-center gap-2">
        <UIcon name="i-ph-rocket-launch-duotone" class="w-5 h-5 flex-shrink-0 pointer-events-none" />
        <span><span class="font-semibold">PacDocs<sup>{{ config.version.slice(0, 3) }}</sup></span> 崭新UI和更多功能!</span>
        <UButton label="查看" color="white" trailing-icon="i-ph-arrow-right" size="2xs" class="rounded-full" />
      </div>
    </AppBanner>

    <AppHeader :links="headerLinks" />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
    <ClientOnly>
      <UContentSearch
        ref="search"
        :files="files"
        :navigation="navigation[0]?.children"
        :groups="searchGroups"
        :links="searchLinks"
        :fuse="{ resultLimit: 13 }"
      />

      <UNotifications />
      <ToolKit v-if="width >= 640" />
    </ClientOnly>
  </div>
</template>
