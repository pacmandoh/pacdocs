export default defineNuxtPlugin(() => {
  const toast = useToast()

  useNuxtApp().hook('app:mounted', () => {
    const { email, confirmation } = useRoute().query
    if (email && confirmation) {
      $fetch('https://api.crybabyaq.love/newsletter/confirm', {
        method: 'POST',
        body: { email, confirmation }
      }).then(() => {
        toast.add({ title: '订阅成功!', description: '您已成功订阅 PacDocs 的最新简报', color: 'green' })
      }).catch((err) => {
        toast.add({ title: '订阅失败!', description: err.data?.message || '', color: 'red' })
      })
    }
  })
})
