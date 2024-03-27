<script setup lang="ts">
import type { Database } from '../../types'

const route = useRoute()
const { fetchList, databases } = useDatabases()

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

defineOgImageComponent(
  'Docs',
  {
    title: title,
    description: description,
    headline: ''
  }
)

await fetchList()

const featuredProviders = computed(() => databases.value.filter((database: Database) => database.featured === true))
const otherProviders = computed(() => databases.value.filter((database: Database) => database.featured !== true))
</script>

<template>
  <UContainer>
    <UPageHero v-bind="page" />

    <UPage>
      <UPageBody>
        <h2 class="text-gray-950 dark:text-white text-2xl font-semibold pb-4">
          生信相关数据库
        </h2>

        <UPageGrid>
          <UPageCard
            v-for="(database, index) in featuredProviders"
            :key="index"
            :to="database._path"
            :description="database.description"
            class="flex flex-col overflow-hidden"
            :ui="{
              divide: '',
              to: ' hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 hover:!bg-transparent dark:hover:!bg-gray-900',
              header: { base: 'relative flex items-center justify-center', padding: '' },
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              icon: { wrapper: 'mb-4' },
              description: 'line-clamp-2'
            }"
          >
            <template #header>
              <div class="h-[192px] w-full gradient dark:gradient-dark" />
              <div class="absolute inset-0 w-full h-full flex items-center justify-center">
                <component :is="database.componentImg" />
              </div>
            </template>

            <template #title>
              <span class="flex-1">{{ database.title }}</span>
              <UBadge
                v-if="database.badge"
                :label="database.badge"
                variant="subtle"
                size="xs"
                class="rounded-full"
                :color="database.color"
              />
            </template>
          </UPageCard>
        </UPageGrid>

        <h2 class="text-gray-950 dark:text-white text-2xl font-semibold pt-12 pb-4">
          PacDocs 集成数据库
        </h2>

        <UPageGrid>
          <UPageCard
            v-for="(database, index) in otherProviders"
            :key="index"
            :to="database._path"
            :title="database.title"
            :description="database.description"
            class="flex flex-col"
            :ui="{
              divide: '',
              header: { base: 'aspect-w-4 aspect-h-2', padding: '' },
              footer: { padding: 'pt-0' },
              title: 'text-lg',
              description: 'line-clamp-2'
            }"
          >
            <template #icon>
              <img v-if="database.logoSrc" :src="database.logoSrc" width="10" height="10" class="w-10 h-10">
              <UIcon v-else :name="database.logoIcon" class="w-10 h-10 text-black dark:text-white" />
            </template>

            <template #title>
              <span class="flex-1">{{ database.title }}</span>
              <UBadge
                v-if="database.badge"
                :label="database.badge"
                variant="subtle"
                size="xs"
                class="rounded-full"
                :color="database.color"
              />
            </template>

            <template #description>
              <span class="line-clamp-2">{{ database.description }}</span>
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<style lang="postcss">
.gradient {
  background-image: linear-gradient(105deg, #f8fafc 5.03%, #f1f5f9 102.15%);
}
.dark .gradient {
  background-image: linear-gradient(105deg, #020420 5.03%, #010211 102.15%);
}
</style>
