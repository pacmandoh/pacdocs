import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { Link } from '#ui-pro/types'
import type { Filter } from './filters'

export interface Analytic extends ParsedContent {
  title: string
  description: string
  fullDescription: string
  _path: string
  link: string
  twitter: string
  github: string
}
