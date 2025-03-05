// import {ofetch} from 'ofetch'
import {logger} from '@nuxt/kit'

/**
 * content path
 * docs/example
 */ 
const docsSourceBase = process.env.DOCS_PATH
const examplesSourceBase = process.env.EXAMPLES_PATH 
// remote docs files
const docsSource: any = {
  name: 'pacdocs-docs',
  driver: 'github',
  repo: 'pacmandoh/docs',
  branch: 'main',
  dir: 'docs',
  prefix: '/1.docs',
  token: process.env.GITHUB_TOKEN || ''
}
if (docsSourceBase) {
  docsSource.driver = 'fs'
  docsSource.base = docsSourceBase
}
// remote examples
const examplesSource: any = {
  name: 'pacdocs-examples',
  driver: 'github',
  repo: 'pacmandoh/examples',
  branch: 'main',
  dir: 'docs',
  prefix: '/docs/1.examples',
  token: process.env.GITHUB_TOKEN || ''
}
if (examplesSourceBase) {
  examplesSource.driver = 'fs'
  examplesSource.base = examplesSourceBase
}

/**
 * nuxt config
 * defineNuxtConfig({})
 */
export default defineNuxtConfig({

  // extenal modules
  modules: [
    '@nuxt/content', // CMS
    '@nuxt/ui-pro',
    '@nuxt/eslint',
    () => {
      if (docsSourceBase) {
        logger.success(`Using local docs from ${docsSourceBase}`)
      }
      if (examplesSourceBase) {
        logger.success(`Using local examples from ${examplesSourceBase}`)
      }
    }
  ],

  compatibilityDate: '2024-11-01',

  // for nuxt 4
  future: {
    compatibilityVersion: 4
  },

  devtools: { 
    enabled: false
  }
})
