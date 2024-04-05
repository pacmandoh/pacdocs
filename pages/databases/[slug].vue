<script lang="ts" setup>
import type { Database } from '~/types'
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const { slug } = route.params

const { data: database } = await useAsyncData(route.path, () => queryContent<Database>(route.path).findOne())
if (!database.value) {
  throw createError({ statusCode: 404, statusMessage: '这似乎不是您要寻找的数据库页面', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/databases')
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ featured: 1 })
  .findSurround(withoutTrailingSlash(route.path))
)

const title = database.value.head?.title || database.value.title
const description = database.value.head?.description || database.value.description

useSeoMeta({
  titleTemplate: '%s · 探索数据库',
  title,
  description,
  ogDescription: description,
  ogTitle: `在 PacDocs 中探索 ${title}`
})

defineOgImageComponent('Docs', {
  headline: '探索数据库'
})

const links = []
if (database.value?.website) {
  links.push({
    icon: 'i-ph-globe-duotone',
    label: database.value?.title,
    to: database.value?.website,
    target: '_blank'
  })
}
// if (database.value?.nitroPreset) {
//   links.push({
//     icon: 'i-ph-lightning-duotone',
//     label: 'Nitro Preset',
//     to: `https://nitro.unjs.io/deploy/databases/${database.value?.nitroPreset}`,
//     target: '_blank'
//   })
// }
links.push({
  icon: 'i-ph-pen-duotone',
  label: 'Edit this page',
  to: `https://github.com/nuxt/nuxt.com/edit/main/content/3.deploy/${slug}.md`,
  target: '_blank'
})
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :description="database.description" headline="探索数据库" :ui="{ icon: { base: 'text-black dark:text-white' } }">
        <template #title>
          <div class="flex items-center gap-4">
            <UIcon v-if="database.logoIcon" :name="database.logoIcon" class="w-10 text-black dark:text-white" />
            <NuxtImg v-else :src="database.logoSrc" class="w-10 h-10" />

            <span>{{ database.title }}</span>
          </div>
        </template>

        <div class="absolute top-[68px] -left-[64px] hidden lg:flex">
          <UTooltip text="返回主页">
            <UButton
              to="/databases"
              icon="i-ph-caret-left"
              color="gray"
              :ui="{ rounded: 'rounded-full' }"
              size="lg"
            />
          </UTooltip>
        </div>
      </UPageHeader>

      <UPage>
        <UPageBody prose class="dark:text-gray-300 dark:prose-pre:!bg-gray-800/60">
          <ContentRenderer v-if="database && database.body" :value="database" />

          <hr v-if="surround?.length">

          <UContentSurround :surround="surround" />
        </UPageBody>

        <template #right>
          <UContentToc :links="database.body.toc.links">
            <template #bottom>
              <div class="hidden lg:block space-y-6" :class="{ '!mt-6': database.body?.toc?.links?.length }">
                <UDivider v-if="links?.length && database.body?.toc?.links?.length" type="dashed" />

                <UPageLinks title="Links" :links="links" />

                <UDivider type="dashed" />

                <Ads />
              </div>
            </template>
          </UContentToc>
        </template>
      </UPage>
    </UPage>
  </UContainer>
</template>
