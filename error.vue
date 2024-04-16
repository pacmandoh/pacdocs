<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useSeoMeta({
  title: `${props.error?.statusCode} Page not found`,
  description: '抱歉! 页面未找到'
})

const { headerLinks, searchGroups, searchLinks } = useNavigation()

const { data: navigation } = await useLazyAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

provide('navigation', navigation)
</script>

<template>
  <div>
    <AppHeader :links="headerLinks" />

    <UContainer>
      <UMain>
        <UPage>
          <PageError :error="props.error" />
        </UPage>
      </UMain>
    </UContainer>

    <AppFooter />

    <ClientOnly>
      <UContentSearch :files="files" :navigation="navigation[0]?.children" :groups="searchGroups" :links="searchLinks" :fuse="{ resultLimit: 13 }" />

      <UNotifications />
    </ClientOnly>
  </div>
</template>
