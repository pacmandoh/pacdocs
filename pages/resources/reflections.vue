<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '这似乎不是您要寻找的页面', fatal: true })
}

const title = page.value.head?.title || page.value.title
const description = page.value.head?.description || page.value.description
useSeoMeta({
  titleTemplate: '%s · PacDocs 资源',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · PacDocs 资源`
})

defineOgImageComponent('Docs', {
  headline: '资源'
})
</script>

<template>
  <UContainer>
    <UPageHero v-bind="page" />

    <UPage>
      <UPageBody class="divide-y divide-gray-200 dark:divide-gray-800">
        <Warning>
          正在努力撰写中...
        </Warning>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
