<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: '这似乎不是您要寻找的资源页面', fatal: true })
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

defineOgImageComponent(
  'Docs',
  {
    title: title,
    description: description,
    headline: '资源地图'
  }
)
</script>

<template>
  <UContainer>
    <UPageHero v-bind="page" />

    <UPage>
      <UPageBody prose class="prose-lg">
        <ContentRenderer v-if="page && page.body" :value="page" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
