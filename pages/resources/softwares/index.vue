<script setup lang="ts">
const route = useRoute()
const { filteredSoftwares, fetchList, groups, licenses, platforms } = useResourcesSoftwares()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

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

await fetchList()
</script>

<template>
  <UContainer>
    <UPageHero v-bind="page" />

    <UPage id="smooth" class="pt-20 -mt-20">
      <template #left>
        <UAside>
          <UNavigationTree :links="[{ label: '分类', disabled: true, children: groups }, { label: '平台', disabled: true, children: platforms }, { label: '许可证', disabled: true, children: licenses }]" />
        </UAside>
      </template>

      <UPageBody>
        <UPageGrid v-if="filteredSoftwares?.length">
          <UPageCard
            v-for="(software, index) in filteredSoftwares"
            :key="index"
            :to="software._path"
            :title="software.title"
            :description="software.description"
            :ui="{
              divide: '',
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              description: 'line-clamp-3'
            }"
          >
            <template #icon>
              <UColorModeAvatar :light="software.logo.light" :dark="software.logo.dark" size="lg" :ui="{ rounded: 'rounded-sm' }" />
            </template>

            <template #footer>
              <div class="flex gap-1">
                <UBadge v-for="(platform, key) in software.platforms" :key="key" :label="platform.label" color="gray" />
              </div>
            </template>
          </UPageCard>
        </UPageGrid>

        <EmptyCard v-else label="暂无匹配的软件">
          <UButton
            label="清除筛选"
            color="white"
            trailing-icon="i-ph-x-circle"
            size="md"
            @click="$router.replace({ query: {} })"
          />
          <UButton
            to="https://github.com/pacmandoh/pacdocs"
            target="_blank"
            color="black"
            size="md"
            label="向 PacDocs 推荐软件"
          />
        </EmptyCard>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
