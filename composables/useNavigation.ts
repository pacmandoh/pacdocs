import { createSharedComposable } from '@vueuse/core'

const _useNavigation = () => {
  const route = useRoute()
  const router = useRouter()

  function select (branch: { id: string }) {
    router.push(['/docs', route.params.slug?.[0], branch.id].filter(Boolean).join('/'))
  }

  const headerSubLinks = computed(() => [{
    label: '指南',
    icon: 'i-ph-book-open-duotone',
    to: '/docs/guide',
    children: [{
      id: '',
      label: '指南总览',
      icon: 'i-ph-book-open-duotone',
      to: '/docs/guide',
      disabled: !route.params.slug?.[1]
    }, {
      id: 'r',
      label: 'R',
      icon: 'i-simple-icons-r',
      to: '/docs/guide/r',
      disabled: route.params.slug?.[1] === 'r'
    }, {
      id: 'py',
      label: 'Python',
      icon: 'i-simple-icons-python',
      to: '/docs/guide/py',
      disabled: route.params.slug?.[1] === 'py'
    }, {
      id: 'julia',
      label: 'Julia',
      icon: 'i-simple-icons-julia',
      to: '/docs/guide/julia',
      disabled: route.params.slug?.[1] === 'julia'
    }, {
      id: 'cpp',
      label: 'C++',
      icon: 'i-simple-icons-cplusplus',
      to: '/docs/guide/cpp',
      disabled: route.params.slug?.[1] === 'cpp'
    }, {
      id: 'java',
      label: 'Java',
      icon: 'i-devicon-plain-java',
      to: '/docs/guide/java',
      disabled: route.params.slug?.[1] === 'java'
    }, {
      id: 'matlab',
      label: 'MATLAB',
      icon: 'i-devicon-plain-matlab',
      to: '/docs/guide/matlab',
      disabled: route.params.slug?.[1] === 'matlab'
    }, {
      id: 'perl',
      label: 'Perl',
      icon: 'i-simple-icons-perl',
      to: '/docs/guide/perl',
      disabled: route.params.slug?.[1] === 'perl'
    }, {
      id: 'js',
      label: 'JavaScript',
      icon: 'i-simple-icons-javascript',
      to: '/docs/guide/js',
      disabled: route.params.slug?.[1] === 'js'
    }, {
      id: 'ts',
      label: 'TypeScript',
      icon: 'i-simple-icons-typescript',
      to: '/docs/guide/ts',
      disabled: route.params.slug?.[1] === 'ts'
    }, {
      id: 'html',
      label: 'HTML',
      icon: 'i-simple-icons-html5',
      to: '/docs/guide/html',
      disabled: route.params.slug?.[1] === 'html'
    }, {
      id: 'css',
      label: 'CSS',
      icon: 'i-simple-icons-css3',
      to: '/docs/guide/css',
      disabled: route.params.slug?.[1] === 'css'
    }, {
      id: 'vue',
      label: 'Vue.js',
      icon: 'i-simple-icons-vuedotjs',
      to: '/docs/guide/vue',
      disabled: route.params.slug?.[1] === 'vue'
    }, {
      id: 'nuxt',
      label: 'Nuxt',
      icon: 'i-simple-icons-nuxtdotjs',
      to: '/docs/guide/nuxt',
      disabled: route.params.slug?.[1] === 'nuxt'
    }, {
      id: 'react',
      label: 'React',
      icon: 'i-simple-icons-react',
      to: '/docs/guide/react',
      disabled: route.params.slug?.[1] === 'react'
    }, {
      id: 'next',
      label: 'Next.js',
      icon: 'i-simple-icons-nextdotjs',
      to: '/docs/guide/next',
      disabled: route.params.slug?.[1] === 'next'
    }, {
      id: 'flask',
      label: 'Flask',
      icon: 'i-simple-icons-flask',
      to: '/docs/guide/py/flask',
      disabled: route.params.slug?.[1] === 'flask'
    }, {
      id: 'django',
      label: 'Django',
      icon: 'i-simple-icons-django',
      to: '/docs/guide/py/django',
      disabled: route.params.slug?.[1] === 'django'
    }, {
      id: 'springboot',
      label: 'Spring Boot',
      icon: 'i-devicon-plain-spring',
      to: '/docs/guide/java/springboot',
      disabled: route.params.slug?.[1] === 'springboot'
    }, {
      id: 'latex',
      label: 'LaTeX',
      icon: 'i-simple-icons-latex',
      to: '/docs/guide/latex',
      disabled: route.params.slug?.[1] === 'latex'
    }, {
      id: 'md',
      label: 'Markdown',
      icon: 'i-simple-icons-markdown',
      to: '/docs/guide/md',
      disabled: route.params.slug?.[1] === 'md'
    }, {
      id: 'sql',
      label: 'SQL',
      icon: 'i-tabler-sql',
      to: '/docs/guide/sql',
      disabled: route.params.slug?.[1] === 'sql'
    }, {
      id: 'mysql',
      label: 'MySQL',
      icon: 'i-simple-icons-mysql',
      to: '/docs/guide/sql/mysql',
      disabled: route.params.slug?.[1] === 'mysql'
    }, {
      id: 'postgresql',
      label: 'PostgreSQL',
      icon: 'i-simple-icons-postgresql',
      to: '/docs/guide/sql/postgresql',
      disabled: route.params.slug?.[1] === 'postgresql'
    }, {
      id: 'sqlite',
      label: 'SQLite',
      icon: 'i-simple-icons-sqlite',
      to: '/docs/guide/sql/sqlite',
      disabled: route.params.slug?.[1] === 'sqlite'
    }, {
      id: 'mongodb',
      label: 'MongoDB',
      icon: 'i-simple-icons-mongodb',
      to: '/docs/guide/mongodb',
      disabled: route.params.slug?.[1] === 'mongodb'
    }, {
      id: 'redis',
      label: 'Redis',
      icon: 'i-simple-icons-redis',
      to: '/docs/guide/redis',
      disabled: route.params.slug?.[1] === 'redis'
    }, {
      id: 'git',
      label: 'Git',
      icon: 'i-simple-icons-git',
      to: '/docs/guide/tools/git',
      disabled: route.params.slug?.[1] === 'git'
    }, {
      id: 'anaconda',
      label: 'Anaconda',
      icon: 'i-simple-icons-anaconda',
      to: '/docs/guide/tools/anaconda',
      disabled: route.params.slug?.[1] === 'anaconda'
    }, {
      id: 'homebrew',
      label: 'Homebrew',
      icon: 'i-simple-icons-homebrew',
      to: '/docs/guide/tools/homebrew',
      disabled: route.params.slug?.[1] === 'homebrew'
    }, {
      id: 'nginx',
      label: 'Nginx',
      icon: 'i-simple-icons-nginx',
      to: '/docs/guide/tools/nginx',
      disabled: route.params.slug?.[1] === 'nginx'
    }, {
      id: 'vscode',
      label: 'VS Code',
      icon: 'i-simple-icons-visualstudiocode',
      to: '/docs/guide/tools/vscode',
      disabled: route.params.slug?.[1] === 'vscode'
    }, {
      id: 'lint',
      label: 'Lint',
      icon: 'i-simple-icons-eslint',
      to: '/docs/guide/tools/lint',
      disabled: route.params.slug?.[1] === 'lint'
    }, {
      id: 'jupyterlab',
      label: 'JupyterLab',
      icon: 'i-simple-icons-jupyter',
      to: '/docs/guide/tools/jupyterlab',
      disabled: route.params.slug?.[1] === 'jupyterlab'
    }, {
      id: 'node',
      label: 'Node.js',
      icon: 'i-simple-icons-nodedotjs',
      to: '/docs/guide/tools/node',
      disabled: route.params.slug?.[1] === 'node'
    }]
  }])

  const headerLinks = computed(() => [{
    label: '文档',
    icon: 'i-ph-book-bookmark-duotone',
    to: '/docs',
    search: false,
    children: [{
      label: '开始',
      description: '如何使用 PacDocs 高效学习',
      icon: 'i-ph-rocket-launch-duotone',
      to: '/docs/getting-started',
      active: route.path.startsWith('/docs/getting-started')
    }, {
      label: '指南',
      description: '相关编程语言及工具的初级入门指南',
      icon: 'i-ph-book-open-duotone',
      to: '/docs/guide',
      active: route.path.startsWith('/docs/guide')
    }, {
      label: '进阶指南',
      description: '相关编程语言/工具的进阶指南',
      icon: 'i-ph-code',
      to: '/docs/adv',
      active: route.path.startsWith('/docs/adv')
    }, {
      label: '示例',
      description: '探索相关知识对应的示例',
      icon: 'i-ph-app-window-duotone',
      to: '/docs/examples',
      active: route.path.startsWith('/docs/examples')
    }, {
      label: '笔记',
      description: '不成体系的随笔记录, 提供碎片化的知识',
      icon: 'i-ph-chats-teardrop-duotone',
      to: '/docs/notes',
      active: route.path.startsWith('/docs/notes')
    }]
  }, {
    label: '集成',
    to: '/modules',
    search: false,
    active: route.path.startsWith('/modules') || route.path.startsWith('/databases'),
    children: [{
      label: 'Nuxt 模块',
      description: '探索 Nuxt 模块，为您的 Nuxt 项目提供强大功能',
      icon: 'i-ph-puzzle-piece-duotone',
      to: '/modules'
    }, {
      label: '分析模块',
      description: '基于 R 或 Python 等构建的分析工具',
      icon: 'i-ph-brain-duotone',
      to: '/analytic'
    }, {
      label: '数据库',
      description: '相关数据库介绍以及使用指南，以及自建数据库的特性和使用指南',
      icon: 'i-ph-database-duotone',
      to: '/databases'
    }]
  }, {
    label: '展示',
    icon: 'i-ph-projector-screen-duotone',
    to: '/showcase'
  }, {
    label: '资源',
    icon: 'i-ph-buildings-duotone',
    to: '/resources',
    search: false,
    children: [{
      label: '介绍',
      to: '/resources/map',
      description: '资源目录，资源地图页面',
      icon: 'i-ph-map-trifold-duotone'
    }, {
      label: '软件推荐',
      to: '/resources/softwares',
      description: '各种提升效率、专业、好用的软件推荐',
      icon: 'i-ph-fire-fill'
    }, {
      label: '随笔心得',
      to: '/resources/reflections',
      description: '在此记录成长、学习过程中的心得体会',
      icon: 'i-ph-hand-heart-duotone'
    }, {
      label: 'GitHub 库',
      to: '/resources/repos',
      description: '精彩绝伦的 GitHub 开源库推荐',
      icon: 'i-mdi-github-face'
    }]
  }, {
    label: '博客',
    icon: 'i-ph-newspaper-duotone',
    to: '/blog'
  }, {
    label: '发布',
    icon: 'i-ph-projector-screen-duotone',
    to: '/releases'
  }])

  // footer
  const footerLinks = [{
    label: '效率',
    children: [{
      label: 'PacGPTs',
      to: 'https://chatgpt.crybabyaq.love',
      target: '_blank'
    }, {
      label: 'PacDown',
      to: 'https://md.crybabyaq.love',
      target: '_blank'
    }, {
      label: 'PacAssets',
      to: 'https://downloads.crybabyaq.love',
      target: '_blank'
    }, {
      label: 'Design Kit',
      to: '/design-kit'
    }]
  }, {
    label: '开发',
    children: [{
      label: 'PacConsole',
      to: 'https://console.crybabyaq.love',
      target: '_blank'
    }, {
      label: 'Code',
      to: 'https://code.crybabyaq.love',
      target: '_blank'
    }, {
      label: 'RStudio',
      to: 'https://rstudio.crybabyaq.love',
      target: '_blank'
    }, {
      label: 'JupyterLab',
      to: 'https://jupyter.crybabyaq.love',
      target: '_blank'
    }]
  }, {
    label: '链接',
    children: [{
      label: 'Nuxt',
      to: 'https://github.com/nuxt',
      target: '_blank'
    }, {
      label: 'Vue.js',
      to: 'https://cn.vuejs.org/',
      target: '_blank'
    }, {
      label: 'Tailwind CSS',
      to: 'https://www.tailwindcss.cn/',
      target: '_blank'
    }, {
      label: 'Mailchimp',
      to: 'https://mailchimp.com/',
      target: '_blank'
    }]
  }]

  const searchLinks = computed(() => [...headerLinks.value.map(link => {
    // Remove `/docs` and `/enterprise` links from command palette
    if (link.search === false) {
      return {
        label: link.label,
        icon: link.icon,
        children: link.children
      }
    }

    return link
  }).filter(Boolean), {
    label: 'Design Kit',
    icon: 'i-ph-palette-duotone',
    to: '/design-kit'
  }, {
    label: 'Newsletter',
    icon: 'i-ph-envelope-simple-duotone',
    to: '/newsletter'
  }])

  const searchGroups = [{
    key: 'modules-search',
    label: '分析模块',
    search: async (q: string) => {
      if (!q) {
        return []
      }

      const { modules, fetchList } = useModules()
      if (!modules.value.length) {
        await fetchList()
      }

      return modules.value
        .filter(module => ['name', 'npm', 'repo'].map(field => module[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
        .map(module => ({
          id: `module-${module.name}`,
          label: module.name,
          suffix: module.description,
          avatar: {
            src: moduleImage(module.icon)
          },
          to: `/modules/${module.name}`
        }))
    }
  }, {
    key: 'database-search',
    label: '数据库',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { databases, fetchList } = useDatabases()
      if (!databases.value.length) {
        await fetchList()
      }

      return databases.value
        .filter(database => ['title'].map(field => database[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
        .map(database => ({
          id: `database-${database._path}`,
          label: database.title,
          suffix: database.description,
          icon: database.logoIcon,
          avatar: database.logoSrc ? {
            src: database.logoSrc
          } : undefined,
          to: database._path
        }))
    }
  }, {
    key: 'articles-search',
    label: 'Articles',
    search: async (q: string) => {
      if (!q) {
        return []
      }

      const { articles, fetchList } = useBlog()
      if (!articles.value.length) {
        await fetchList()
      }

      return articles.value
        .filter(article => article.title.search(searchTextRegExp(q)) !== -1)
        .map(article => ({
          id: `article-${article._path}`,
          label: article.title,
          suffix: article.description,
          icon: 'i-ph-newspaper',
          to: article._path
        }))
    }
  }]

  return {
    select,
    headerSubLinks,
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = createSharedComposable(_useNavigation)
