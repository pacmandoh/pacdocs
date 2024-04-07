import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface Analytic extends ParsedContent {
  title: string
  description: string
  fullDescription: string
  _path: string
  link: string
  twitter: string
  github: string
}
