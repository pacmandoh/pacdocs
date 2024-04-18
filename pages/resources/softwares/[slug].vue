<script setup lang="ts">
import type { Software } from '~/types'

const route = useRoute()

const { data: software } = await useAsyncData(route.path, () => queryContent<Software>(route.path).findOne())
if (!software.value) {
  throw createError({ statusCode: 404, statusMessage: '这似乎不是您要寻找的软件页面', fatal: true })
}

const links = computed(() => [{
  label: `探索 ${software.value.title}`,
  color: 'black' as const,
  size: 'md' as const,
  icon: 'i-ph-arrow-square-out',
  trailing: true,
  to: software.value.link,
  target: '_blank'
}])

const title = software.value.head?.title || software.value.title
const description = software.value.head?.description || software.value.description
useSeoMeta({
  titleTemplate: '%s · 软件推荐',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · 软件推荐`
})

defineOgImageComponent('Docs', {
  headline: '软件推荐'
})
</script>

<template>
  <UContainer>
    <UPageHeader :description="software.description" :links="links" headline="软件推荐">
      <template #title>
        <div class="flex items-center gap-4">
          <UColorModeAvatar :light="software.logo.light" :dark="software.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" class="-m-[4px]" />

          <span>{{ software.title }}</span>
        </div>
      </template>

      <div class="absolute top-[68px] -left-[64px] hidden lg:flex">
        <UTooltip text="推荐主页">
          <UButton
            to="/resources/softwares"
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
          <UIcon name="i-mdi-license" class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm font-medium">{{ software.license }}</span>
        </div>

        <span v-if="software.twitter" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="software.twitter" :to="`https://twitter.com/${software.twitter}`" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-simple-icons-twitter" class="w-5 h-5" />
          <span class="text-sm font-medium">Twitter</span>
        </NuxtLink>

        <span v-if="software.github" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="software.github" :to="`https://github.com/${software.github}`" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-simple-icons-github" class="w-5 h-5" />
          <span class="text-sm font-medium">GitHub</span>
        </NuxtLink>

        <span v-if="software.link" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <NuxtLink v-if="software.link" :to="software.link" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
          <UIcon name="i-ph-link-duotone" class="w-5 h-5" />
          <span class="text-sm font-medium">官网</span>
        </NuxtLink>

        <span v-if="software.platforms" class="hidden lg:block text-gray-500 dark:text-gray-400">&bull;</span>

        <span v-for="(platform, index) in software.platforms" :key="index" class="flex items-center gap-1.5">
          <UIcon name="i-ph-circle-wavy-check-duotone" class="w-5 h-5 text-green-500" />
          <span class="text-sm font-medium">{{ platform }}</span>
        </span>
      </div>
    </UPageHeader>

    <UPage :ui="{ right: 'my-8' }">
      <UPageBody prose class="prose-lg dark:text-gray-300">
        <ContentRenderer v-if="software && software.body" :value="software" />
      </UPageBody>

      <template #right>
        <UPageLinks v-if="software.groups?.length" title="分类">
          <div class="prose dark:prose-invert -ml-1.5">
            <ul class="space-y-3">
              <li v-for="(group, index) in software.groups" :key="index" class="text-sm text-gray-500 dark:text-gray-400">
                {{ group }}
              </li>
            </ul>
          </div>
        </UPageLinks>

        <div v-if="software.resources?.length">
          <UDivider type="dashed" class="my-6" />

          <UPageLinks title="资源" :links="software.resources" />
        </div>
      </template>
    </UPage>
  </UContainer>
</template>
