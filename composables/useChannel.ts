import * as ChannelService from '@channel.io/channel-web-sdk-loader'

const useGlobalState = createGlobalState(
  () => {
    // state
    const unread = ref(0)

    // actions
    function updateValue(nVal: number) {
      unread.value = nVal
    }

    return { unread, updateValue }
  }
)

export const useChannel = () => {
  const needChannel = ref(false)
  const colorMode = useColorMode()
  const { unread, updateValue } = useGlobalState()

  const initChannel = () => {
    ChannelService.loadScript()

    ChannelService.boot({
      pluginKey: useRuntimeConfig().public.channelKey,
      hideChannelButtonOnBoot: true
    }, (_error, user) => {
      updateValue(user.unread)
    })

    // hide message
    ChannelService.onHideMessenger(() => {
      needChannel.value = false
      ChannelService.hideChannelButton()
    })

    // adapting theme change
    ChannelService.setAppearance(colorMode.preference as ChannelService.Appearance)
    watch([colorMode, needChannel], () => {
      ChannelService.setAppearance(colorMode.preference as ChannelService.Appearance)
    })

    // send unread message
    ChannelService.onBadgeChanged((unread, _alert) => {
      updateValue(unread)
      // console.log(`Unread count: ${unread}, Alert count: ${alert}.`)
    })
  }

  const handleChannelClick = () => {
    needChannel.value = !needChannel.value
    needChannel.value ? ChannelService.showMessenger() : ChannelService.hideMessenger()
  }

  const disposeChannel = () => {
    ChannelService.clearCallbacks()
    ChannelService.shutdown()
  }

  return {
    handleChannelClick,
    disposeChannel,
    initChannel,
    unread
  }
}
