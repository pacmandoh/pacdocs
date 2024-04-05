<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

const title = page.value.head?.title || page.value.title
const description = page.value.head?.description || page.value.description
useSeoMeta({
  titleTemplate: '%s · PacDocs 集成',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · PacDocs 集成`
})
</script>

<template>
  <UContainer>
    <UPageHero v-bind="page" />

    <UPage id="smooth" class="pt-20 -mt-20">
      <UPageBody>
        <Warning>
          开发中...
        </Warning>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
