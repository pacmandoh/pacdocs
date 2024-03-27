<script setup lang="ts">
import type { TabItem } from '#ui/types'

const props = defineProps<{
  items: TabItem[]
}>()
</script>

<template>
  <UTabs :items="props.items" class="w-full">
    <template #default="{ item, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

        <span class="truncate">{{ item.label }}</span>

        <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
      </div>
    </template>
  </UTabs>
</template>
