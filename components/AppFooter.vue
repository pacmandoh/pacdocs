<script setup lang="ts">
const { footerLinks } = useNavigation()
</script>

<template>
  <div class="w-full h-px flex items-center justify-center">
    <div v-if="!['/playground', '/roadmap'].includes($route.path)" class="z-10">
      <LogoOnly class="w-5 h-5" />
    </div>
  </div>
  <UFooter
    :ui="{
      wrapper: 'z-[2]',
      bottom: { wrapper: 'border-t border-gray-200 dark:border-gray-800', container: '!py-6' },
      top: { wrapper: 'border-t border-gray-200 dark:border-gray-800', container: 'py-8 lg:py-12' }
    }"
  >
    <template #top>
      <UFooterColumns :links="footerLinks">
        <template #right>
          <NewsletterForm />
          <BeiAn />
          <Author />
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <div class="flex-col flex items-center lg:items-start">
        <p class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
          Copyright 
          <UIcon name="i-ph-copyright-duotone" /> 
          {{ new Date().getFullYear() }} PacDocs - <NuxtLink class="hover:underline" to="https://github.com/pacmandoh/pacdocs/LICENSE" target="_blank">
            MIT License
          </NuxtLink>
        </p>
        <p class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
          <UIcon name="i-logos-nuxt-icon" />
          Powered by <NuxtLink class="hover:underline" to="https://github.com/nuxt" target="_blank">
            Nuxt
          </NuxtLink>
        </p>
      </div>
    </template>

    <template #right>
      <UButton aria-label="X" to="https://x.com/haodou20" target="_blank" icon="i-simple-icons-x" v-bind="($ui.button.secondary as any)" />
      <UButton aria-label="Discord" to="https://discord.gg/XfUzJQkY" target="_blank" icon="i-simple-icons-discord" v-bind="($ui.button.secondary as any)" />
      <UButton aria-label="GitHub" to="https://github.com/pacmandoh" target="_blank" icon="i-simple-icons-github" v-bind="($ui.button.secondary as any)" />
    </template>
  </UFooter>
</template>
