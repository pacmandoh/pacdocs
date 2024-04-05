<template>
  <div class="h-full">
    <div v-if="isLoading" class="boxLoading" />
    <div id="vditor" style="border: 0;" />
  </div>
</template>

<script setup lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const props = defineProps({
  content: {
    type: String,
    required: true,
    default: ''
  }
})

const vditor = ref<Vditor | null>(null)
const mode = useColorMode()
const unwatchRef = ref(null)
const isLoading = ref(true)

// option
const CDN = 'https://imgbucket-1318471229.cos.ap-beijing.myqcloud.com/cdnjs/vditor%403.10.3'
const option: IOptions = {
  cdn: CDN,
  height: '100%',
  width: '100%',
  theme: mode.preference === 'dark' ? 'dark' : 'classic',
  preview: {
    theme: {
      current: mode.preference === 'dark' ? 'dark' : 'light',
      path: `${CDN}/dist/css/content-theme`
    },
    hljs: {
      lineNumber: true
    }
  },
  upload: {
    url: 'https://api.crybabyaq.love/proxy',
    linkToImgUrl: 'https://api.crybabyaq.love/proxy',
    accept: 'image/*',
    multiple: false,
    // setHeaders () {
    //   return {
    //     'Authorization': config.public.authoriz,
    //     'x-api-key': config.public.apiKey
    //   }
    // },
    fieldName: 'file',
    success (_, msg) {
      vditor.value.insertValue(`![${JSON.parse(msg).date}](${JSON.parse(msg).file_url})`)
    }
  },
  hint: {
    emojiPath: `${CDN}/dist/images/emoji`
  },
  cache: {
    id: 'vditor'
  },
  after: () => {
    vditor.value!.setValue(localStorage.getItem('pacdown') || props.content)
    unwatchRef.value = watch(mode, (oVal, nVal) => {
      vditor.value.setTheme(nVal.preference === 'dark' ? 'dark' : 'classic', nVal.preference)
    })

    nextTick(() => {
      isLoading.value = false
    })
  }
}

// init vditor
const initVditor = () => {
  vditor.value = new Vditor('vditor', option)
}

// destroy vditor
const destroyVditor = () => {
  if (vditor.value) {
    vditor.value.destroy()
    vditor.value = null
  }

  // watch clean
  if (unwatchRef.value) {
    unwatchRef.value()
  }
}

// save cache
const transCache = () => {
  if (localStorage.getItem('vditor')) localStorage.setItem('pacdown', localStorage.getItem('vditor'))
}


onMounted(() => {
  transCache()
  initVditor()
})

onBeforeUnmount(() => {
  transCache()
  destroyVditor()
})
</script>

<style scoped lang="postcss">
.boxLoading {
  width: 50px;
  height: 50px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.boxLoading:before {
  content: '';
  width: 50px;
  height: 5px;
  opacity: 0.7;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow .5s linear infinite;
  @apply bg-gray-400 dark:bg-gray-500
}

.boxLoading:after {
  content: '';
  width: 50px;
  height: 50px;
  animation: animate .5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  @apply dark:bg-primary-400 bg-primary-500
}

@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow {
  0%, 100% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1);
  }
}
</style>
