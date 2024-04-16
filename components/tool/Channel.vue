<template>
  <div class="flex flex-row items-center gap-2" @click="handleChannelClick">
    <UChip :text="unread" size="xl" :show="unread > 0" class="cursor-pointer" inset>
      <UButton
        size="sm"
        color="white"
        icon="i-ph-chat-circle-duotone"
        class="rounded-2xl"
      />
    </UChip>
    <slot name="text" />
  </div>
</template>

<script setup lang="ts">
const { handleChannelClick, unread, initChannel, disposeChannel } = useChannel()

// init Channel
initChannel()

// dispose
onBeforeUnmount(() => {
  disposeChannel()
})
</script>
