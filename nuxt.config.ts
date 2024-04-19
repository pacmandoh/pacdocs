import { ofetch } from 'ofetch'
import { logger } from '@nuxt/kit'
// WINDOWS
import { isWindows } from 'std-env'
// Get PacDocs' Version
import pkg from './package.json'

function normalizedDirPath(path?: string) {
  if (!path || !isWindows) {
    return path
  }

  const windowsPath = path.replace(/\\/g, '/')
  return windowsPath.startsWith('file:///') ? windowsPath : `file:///${windowsPath}`
}

const docsSourceBase = normalizedDirPath(process.env.DOCS_PATH)
const examplesSourceBase = normalizedDirPath(process.env.EXAMPLES_PATH)

// remote docs *.md
const docsSource: any = {
  name: 'nuxt-docs',
  driver: 'github',
  repo: 'nuxt/nuxt',
  branch: 'main',
  dir: 'docs',
  prefix: '/1.docs',
  token: process.env.GITHUB_TOKEN || ''
}
if (docsSourceBase) {
  docsSource.driver = 'fs'
  docsSource.base = docsSourceBase
}

// remote example *.md
const examplesSource: any = {
  name: 'nuxt-examples',
  driver: 'github',
  repo: 'nuxt/examples',
  branch: 'main',
  dir: '.docs',
  prefix: '/docs/4.examples',
  token: process.env.GITHUB_TOKEN || ''
}
if (examplesSourceBase) {
  examplesSource.driver = 'fs'
  examplesSource.base = examplesSourceBase
}

export default defineNuxtConfig({
  // html attribute
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh'
      }
    }
  },
  extends: [
    process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore Type circular reference
  modules: [
    'nuxt-content-twoslash',
    'nuxt-build-cache',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/plausible',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxthq/studio',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@morev/vue-transitions/nuxt',
    'modules/content-examples-code',
    () => {
      if (docsSourceBase) {
        logger.success(`Using local docs from ${docsSourceBase}`)
      }
      if (examplesSourceBase) {
        logger.success(`Using local examples from ${examplesSourceBase}`)
      }
    }
  ],
  runtimeConfig: {
    public: {
      version: pkg.version,
      channelKey: process.env.CHANNEL_KEY
    }
  },
  routeRules: {
    // Pre-render
    '/api/search.json': { prerender: true },
    '/blog/rss.xml': { prerender: true },
    // '/sitemap.xml': { prerender: true },
    '/newsletter': { prerender: true },
    '/releases': { prerender: true },
    '/api/releases.json': { prerender: true },
    '/api/pulls.json': { prerender: true },

    // Redirects
    '/docs': { redirect: '/docs/getting-started/introduction', prerender: false },
    '/docs/getting-started': { redirect: '/docs/getting-started/introduction', prerender: false },

    // docs-guide
    '/docs/guide/r': { redirect: '/docs/guide/r/getting-started', prerender: false },
    '/docs/guide/py': { redirect: '/docs/guide/py/getting-started', prerender: false },
    '/docs/guide/py/flask': { redirect: '/docs/guide/py/flask/getting-started', prerender: false },
    '/docs/guide/py/django': { redirect: '/docs/guide/py/django/getting-started', prerender: false },
    '/docs/guide/julia': { redirect: '/docs/guide/julia/getting-started', prerender: false },
    '/docs/guide/cpp': { redirect: '/docs/guide/cpp/getting-started', prerender: false },
    '/docs/guide/java': { redirect: '/docs/guide/java/getting-started', prerender: false },
    '/docs/guide/java/springboot': { redirect: '/docs/guide/java/springboot/getting-started', prerender: false },
    '/docs/guide/matlab': { redirect: '/docs/guide/matlab/getting-started', prerender: false },
    '/docs/guide/perl': { redirect: '/docs/guide/perl/getting-started', prerender: false },
    '/docs/guide/js': { redirect: '/docs/guide/js/getting-started', prerender: false },
    '/docs/guide/ts': { redirect: '/docs/guide/ts/getting-started', prerender: false },
    '/docs/guide/html': { redirect: '/docs/guide/html/getting-started', prerender: false },
    '/docs/guide/css': { redirect: '/docs/guide/css/getting-started', prerender: false },
    '/docs/guide/vue': { redirect: '/docs/guide/vue/getting-started', prerender: false },
    '/docs/guide/nuxt': { redirect: '/docs/guide/nuxt/getting-started', prerender: false },
    '/docs/guide/react': { redirect: '/docs/guide/react/getting-started', prerender: false },
    '/docs/guide/next': { redirect: '/docs/guide/next/getting-started', prerender: false },
    '/docs/guide/sql': { redirect: '/docs/guide/sql/getting-started', prerender: false },
    '/docs/guide/sql/mysql': { redirect: '/docs/guide/sql/mysql/getting-started', prerender: false },
    '/docs/guide/sql/postgresql': { redirect: '/docs/guide/sql/postgresql/getting-started', prerender: false },
    '/docs/guide/sql/sqlite': { redirect: '/docs/guide/sql/sqlite/getting-started', prerender: false },
    '/docs/guide/mongodb': { redirect: '/docs/guide/mongodb/getting-started', prerender: false },
    '/docs/guide/redis': { redirect: '/docs/guide/redis/getting-started', prerender: false },
    '/docs/guide/tools': { redirect: '/docs/guide/tools/git/getting-started', prerender: false },
    '/docs/guide/tools/git': { redirect: '/docs/guide/tools/git/getting-started', prerender: false },
    '/docs/guide/tools/conda': { redirect: '/docs/guide/tools/conda/getting-started', prerender: false },
    '/docs/guide/tools/homebrew': { redirect: '/docs/guide/tools/homebrew/getting-started', prerender: false },
    '/docs/guide/tools/nginx': { redirect: '/docs/guide/tools/nginx/getting-started', prerender: false },
    '/docs/guide/tools/vscode': { redirect: '/docs/guide/tools/vscode/getting-started', prerender: false },
    '/docs/guide/tools/lint': { redirect: '/docs/guide/tools/lint/getting-started', prerender: false },
    '/docs/guide/tools/jupyter': { redirect: '/docs/guide/tools/jupyter/getting-started', prerender: false },
    '/docs/guide/tools/node': { redirect: '/docs/guide/tools/node/getting-started', prerender: false },

    // examples
    '/docs/examples': { redirect: '/docs/examples/introduction', prerender: false }
  },
  nitro: {
    prerender: {
      // failOnError: false
      // Ignore weird url from crawler on some modules readme
      ignore: ['/modules/%3C/span', '/modules/%253C/span', '/docs/getting-started/</span', '/docs/getting-started/%3C/span']
    },
    hooks: {
      'prerender:generate'(route) {
        // TODO: fix issue with recursive fetches with query string, e.g.
        if (route.route?.includes('&amp;')) {
          route.skip = true
        }
      }
    }
  },
  hooks: {
    async 'prerender:routes'(ctx) {
      // Add Nuxt 2 modules to the prerender list
      const { modules } = await ofetch<{ modules: [] }>('https://api.nuxt.com/modules?version=2').catch(() => ({ modules: [] }))
      for (const module of modules) {
        ctx.routes.add(`/modules/${module.name}`)
      }
    }
  },
  $development: {
    runtimeConfig: {
      public: {
        website: {
          url: 'http://localhost:3000'
        }
      }
    }
  },
  colorMode: {
    preference: 'dark'
  },

  // ui-iconify
  ui: {
    icons: ['simple-icons', 'ph', 'uil', 'heroicons', 'octicon', 'logos', 'devicon', 'mdi', 'tabler', 'solar', 'devicon-plain']
  },

  // @nuxt/fonts
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700]
    }
  },

  // @nuxt/content
  content: {
    navigation: {
      fields: ['titleTemplate']
    },
    sources: {
      docsSource,
      examplesSource
    },
    // shiki lang-highlight
    highlight: {
      preload: ['r', 'py', 'tex', 'md', 'julia', 'cpp', 'c#', 'nginx'], // 添加语言支持高亮
      // highlight theme
      theme: {
        light: 'github-light',
        default: 'github-dark-dimmed',
        dark: 'github-dark-dimmed'
      }
    }
  },
  twoslash: {
    floatingVueOptions: {
      classMarkdown: 'prose prose-primary dark:prose-invert'
    },
    // Skip Twoslash in dev to improve performance. Turn this on when you want to explictly test twoslash in dev.
    enableInDev: false,
    // Do not throw when twoslash fails, the typecheck should be down in github.com/nuxt/nuxt's CI
    throws: false
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never'
      }
    }
  },
  // ogImage support Chinese
  ogImage: {
    fonts: [
      'Noto+Sans+SC:400',
      'Noto+Sans+SC:500',
      'Noto+Sans+SC:600',
      'Noto+Sans+SC:700'
    ]
  },
  typescript: {
    strict: false
  },
  experimental: {
    headNext: true,
    sharedPrerenderData: true,
    appManifest: true
  },
  devtools: {
    enabled: false
  }
})
