<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation')

const route = useRoute()
const { navPageFromPath } = useContentHelpers()
const { headerLinks, select, headerSubLinks } = useNavigation()

const links = computed(() => headerLinks.value.find(link => link.to === '/docs')?.children ?? [])
const sublinks = computed(() => headerSubLinks.value.find(link => link.to === ['/docs', route.params.slug?.[0]].filter(Boolean).join('/'))?.children ?? [])

// 三层级以上至显示当前目录下内容
const navigationLinks = computed(() => {
  const pathArray = ['/docs', route.params.slug?.[0]]
  if (route.params.slug?.length >= 3) {
    pathArray.push(route.params.slug?.[1])
  }
  const path = pathArray.filter(Boolean).join('/')

  return mapContentNavigation(navPageFromPath(path, navigation.value)?.children || [])
})

const selected = computed(() => sublinks.value.find(link => link.id === route.params.slug?.[1]) || sublinks.value[0])
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside :links="links" class="h-full">
          <TransitionSlide :offset="[0, -16]">
            <div v-if="sublinks.length > 0" class="pr-2">
              <UInputMenu
                :model-value="selected"
                :options="sublinks"
                :ui-menu="{ option: { disabled: 'cursor-not-allowed opacity-80' } }"
                trailing-icon="i-heroicons-chevron-up-down-20-solid"
                @update:model-value="select"
              >
                <template #leading>
                  <UIcon v-if="selected.icon" :name="selected.icon" class="w-4 h-4 mx-0.5" />
                </template>
                <!-- <UButton color="gray" class="flex-1 justify-between" aria-label="Sublink Button">
                  <UIcon v-if="selected?.icon" :name="selected?.icon" class="w-4 h-4 flex-shrink-0 text-gray-600 dark:text-gray-300" />
                  <span class="font-medium">{{ selected?.label }}</span>
                  <UIcon name="i-heroicons-chevron-right-20-solid" class="w-5 h-5 transition-transform text-gray-400 dark:text-gray-500" :class="[open && 'transform rotate-90']" />
                </UButton> -->
              </UInputMenu>
            </div>
          </TransitionSlide>

          <UDivider type="dashed" class="mb-6" />

          <UNavigationTree :links="navigationLinks" default-open :multiple="false" />
        </UAside>
      </template>

      <NuxtPage />
    </UPage>
  </UContainer>
</template>
