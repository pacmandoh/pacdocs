<script setup lang="ts">
import type { Analytic } from '~/types'

const route = useRoute()

const { data: analytic } = await useAsyncData(route.path, () => queryContent<Analytic>(route.path).findOne())
if (!analytic.value) {
  throw createError({ statusCode: 404, statusMessage: '这似乎不是您要寻找的软件页面', fatal: true })
}

const links = computed(() => [{
  label: `探索 ${analytic.value.title}`,
  color: 'black' as const,
  size: 'md' as const,
  icon: 'i-ph-arrow-square-out',
  trailing: true,
  to: analytic.value.link,
  target: '_blank'
}])

const title = analytic.value.head?.title || analytic.value.title
const description = analytic.value.head?.description || analytic.value.description
useSeoMeta({
  titleTemplate: '%s · 分析模块',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · 分析模块`
})

defineOgImageComponent(
  'Docs',
  {
    title: title,
    description: description,
    headline: '分析模块'
  }
)
</script>

<template>
  <UContainer>
    <UPageHeader :description="analytic.description" :links="links" headline="软件推荐">
      <template #title>
        <div class="flex items-center gap-4">
          <UColorModeAvatar :light="analytic.logo.light" :dark="analytic.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" class="-m-[4px]" />

          <span>{{ analytic.title }}</span>
        </div>
      </template>

      <div class="absolute top-[68px] -left-[64px] hidden lg:flex">
        <UTooltip text="返回主页">
          <UButton
            to="/analytic"
            icon="i-ph-caret-left"
            color="gray"
            :ui="{ rounded: 'rounded-full' }"
            size="lg"
            class=""
          />
        </UTooltip>
      </div>

      <div class="flex flex-col lg:flex-row lg:items-center gap-3 mt-4">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-ph-map-pin" class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm font-medium">{{ analytic.location }}</span>
        </div>

        <span v-if="analytic.twitter" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="analytic.twitter" :to="`https://twitter.com/${analytic.twitter}`" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-simple-icons-twitter" class="w-5 h-5" />
          <span class="text-sm font-medium">Twitter</span>
        </NuxtLink>

        <span v-if="analytic.github" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="analytic.github" :to="`https://github.com/${analytic.github}`" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-simple-icons-github" class="w-5 h-5" />
          <span class="text-sm font-medium">GitHub</span>
        </NuxtLink>

        <span v-if="analytic.link" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="analytic.link" :to="analytic.link" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-ph-link-duotone" class="w-5 h-5" />
          <span class="text-sm font-medium">Website</span>
        </NuxtLink>
      </div>
    </UPageHeader>

    <UPage :ui="{ right: 'my-8' }">
      <UPageBody prose class="prose-lg dark:text-gray-300">
        <ContentRenderer v-if="analytic && analytic.body" :value="analytic" />
      </UPageBody>

      <template #right>
        <UPageLinks v-if="analytic.groups?.length" title="Groups">
          <div class="prose dark:prose-invert -ml-1.5">
            <ul class="space-y-3">
              <li v-for="(service, index) in analytic.services" :key="index" class="text-sm text-gray-500 dark:text-gray-400">
                {{ service }}
              </li>
            </ul>
          </div>
        </UPageLinks>

        <div v-if="analytic.resources?.length">
          <UDivider type="dashed" class="my-6" />

          <UPageLinks title="Resources" :links="analytic.resources" />
        </div>
      </template>
    </UPage>
  </UContainer>
</template>
