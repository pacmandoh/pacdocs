import type { Software, Filter } from '../types'
import { slugify, random } from '../utils'

export const useResourcesSoftwares = () => {
  const route = useRoute()
  const router = useRouter()
  const softwares = useState<Software[]>('resources-softwares', () => [])

  // Data fetching
  async function fetchList() {
    if (softwares.value.length) {
      return
    }

    try {
      const data = await queryContent('/resources/softwares').where({ _extension: 'md' }).find()

      softwares.value = data.map(software => ({
        ...software,
        groups: (software.groups || []).map((group: string) => ({
          key: slugify(group),
          label: group
        })),
        platforms: (software.platforms || []).map((platform: string) => ({
          key: slugify(platform),
          label: platform
        })),
        licenses: (software.licenses || []).map((license: string) => ({
          key: slugify(license),
          label: license
        }))
      })) as Software[]
    }
    catch (e) {
      softwares.value = []
      return e
    }
  }

  // Computed
  const filteredSoftwares = computed<Software[]>(() => {
    return [...softwares.value]
      .filter((software) => {
        if (selectedGroup.value && !software.groups.find(group => group.key === selectedGroup.value?.key)) {
          return false
        }
        if (selectedPlatform.value && !software.platforms.find(platform => platform.key === selectedPlatform.value?.key)) {
          return false
        }
        if (selectedLicense.value && !software.licenses.find(license => license.key === selectedLicense.value?.key)) {
          return false
        }

        return true
      })
  })

  const groups = computed<Filter[]>(() => {
    const ids = new Set<string>()
    const groups = softwares.value.flatMap((software) => {
      return software.groups.filter((r) => {
        if (ids.has(r.key as string)) {
          return false
        }
        ids.add(r.key as string)
        return true
      })
    })
    return groups
      .map(group => ({
        ...group,
        exactQuery: true,
        to: {
          name: 'resources-softwares',
          query: {
            ...route.query,
            group: group.key
          },
          state: { smooth: '#smooth' }
        },
        click: (e: any) => {
          if (route.query.group !== group.key) {
            return
          }

          e.preventDefault()

          router.replace({ query: { ...route.query, group: undefined } })
        }
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  })

  const licenses = computed<Filter[]>(() => {
    const ids = new Set<string>()
    const licenses = softwares.value.flatMap((software) => {
      return software.licenses.filter((r) => {
        if (ids.has(r.key as string)) {
          return false
        }
        ids.add(r.key as string)
        return true
      })
    })
    return licenses
      .map((license) => {
        return {
          key: license.key,
          label: license.label,
          exactQuery: true,
          to: {
            name: 'resources-softwares',
            query: {
              ...route.query,
              license: license.key
            },
            state: { smooth: '#smooth' }
          },
          click: (e: any) => {
            if (route.query.license !== license.key) {
              return
            }

            e.preventDefault()

            router.replace({ query: { ...route.query, license: undefined } })
          }
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  })

  const platforms = computed<Filter[]>(() => {
    const ids = new Set<string>()
    const platforms = softwares.value.flatMap((software) => {
      return software.platforms.filter((r) => {
        if (ids.has(r.key as string)) {
          return false
        }
        ids.add(r.key as string)
        return true
      })
    })
    return platforms
      .map((platform) => {
        return {
          key: platform.key,
          label: platform.label,
          exactQuery: true,
          to: {
            name: 'resources-softwares',
            query: {
              ...route.query,
              platform: platform.key
            },
            state: { smooth: '#smooth' }
          },
          click: (e: any) => {
            if (route.query.platform !== platform.key) {
              return
            }

            e.preventDefault()

            router.replace({ query: { ...route.query, platform: undefined } })
          }
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))
  })

  const selectedGroup = computed(() => {
    return groups.value.find(group => group.key === route.query.group)
  })

  const selectedPlatform = computed(() => {
    return platforms.value.find(platform => platform.key === route.query.platform)
  })

  const selectedLicense = computed(() => {
    return licenses.value.find(license => license.key === route.query.license)
  })

  const adPartner = computed(() => random(softwares.value))

  return {
    fetchList,
    filteredSoftwares,
    softwares,
    groups,
    platforms,
    licenses,
    selectedGroup,
    selectedPlatform,
    adPartner
  }
}
