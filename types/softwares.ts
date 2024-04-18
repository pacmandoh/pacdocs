import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { Filter } from './filters'
import type { Link } from '#ui-pro/types'

export interface Software extends ParsedContent {
  title: string
  description: string
  fullDescription: string
  _path: string
  link: string
  twitter: string
  github: string
  logo: {
    light: string
    dark: string
  }
  licenses: Filter[]
  groups: Filter[]
  resources?: Link[]
  platforms: Filter[]
}
