<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import type { Link } from '#ui-pro/types'

const logo = ref(null)
const navigation = inject<Ref<NavItem[]>>('navigation')

const { metaSymbol } = useShortcuts()
const { copy } = useCopyToClipboard()

const mobileNav = computed(() => {
  const links = mapContentNavigation(navigation.value)
  return links
})

const open = ref(false)
const dropdownItems = [
  [{
     label: '复制 Logo SVG',
     icon: 'i-ph-copy-duotone',
     click: () => copy(logo.value.$el.outerHTML, { title: '复制至剪切板!' })
   },
   {
     label: 'PacDocs 设计套件',
     icon: 'i-simple-icons-figma',
     to: 'https://www.figma.com/community/file/1296154408275753939/nuxt-brand-kit',
     target: '_blank'
   }],
  [{
    label: '浏览设计套件',
    icon: 'i-ph-shapes-duotone',
    to: '/design-kit'
  }]
]
const isMobile = ref(false)
function openLogoContext () {
  if (isMobile.value) return navigateTo('/')
  open.value = true
}
onMounted(() => {
  isMobile.value = ('ontouchstart' in document.documentElement)
})

defineProps<{
  links?: Link[]
}>()
const { y } = useWindowScroll()
const { width } = useWindowSize()
</script>

<template>
  <!-- TODO Fix when slideover is open the header always transparent on Mobile -->
  <UHeader
    :class="{
      'transition-all duration-700': y > 0,
      'bg-transparent backdrop-blur-none transition-all duration-700': y <= 0
    }"
    title="PacDocs by PacmanDoh"
  >
    <template #left>
      <UDropdown
        v-model:open="open"
        :items="dropdownItems"
        :popper="{ strategy: 'absolute', placement: 'bottom-start' }"
        :ui="{
          container: 'mt-8',
          background: 'bg-white dark:bg-gray-950',
          item: { padding: 'gap-x-2.5 py-2.5', inactive: 'dark:bg-gray-950' },
        }"
      >
        <div class="block w-auto" @click.right.prevent="openLogoContext" @click.left.prevent="navigateTo('/')">
          <div class="flex items-center">
            <div class="w-10">
              <LogoBrandingIcon ref="logo" />
            </div>
            <div class="hidden sm:block self-center whitespace-nowrap leading-[10px] ml-2 dark:sidebase-green-400 pr-0" style="user-select: none; -webkit-user-select: none;">
              <h1 class="font-CooperHewitt my-0 text-2xl font-normal leading-5 pt-1">
                Pac<span class="text-primary-500 dark:text-primary-400 font-light">Docs</span>
              </h1>
              <h2 class="my-0 pl-[1px] text-xs font-light dark:text-gray-300 text-gray-700">
                by PacmanDoh
              </h2>
            </div>
          </div>
        </div>
      </UDropdown>
      <ClientOnly>
        <UTooltip v-if="width < 640" text="工具">
          <ToolDropDown />
        </UTooltip>
      </ClientOnly>
    </template>

    <template #center>
      <UHeaderLinks :links="links" :ui="{ default: { popover: { popper: { strategy: 'absolute' }, ui: { width: 'w-[256px]' } } } }" class="hidden lg:flex" />
    </template>

    <template #right>
      <ColorPicker />

      <UTooltip text="搜索" :shortcuts="[metaSymbol, 'K']">
        <UContentSearchButton :label="null" />
      </UTooltip>

      <UTooltip :text="$colorMode.preference === 'dark' ? '切换为日间模式' : '切换为暗色模式'">
        <UColorModeButton />
      </UTooltip>

      <UTooltip text="GitHub">
        <UButton
          icon="i-simple-icons-github"
          to="https://github.com/pacmandoh/PacDocs"
          target="_blank"
          v-bind="($ui.button.secondary as any)"
          aria-label="My GitHub"
        />
      </UTooltip>
    </template>

    <template #panel>
      <UNavigationTree :links="mobileNav" default-open :multiple="false" />
    </template>
  </UHeader>
</template>
