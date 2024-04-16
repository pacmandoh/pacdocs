<script setup lang="ts">
const items = [{
  key: 'lang',
  icon: 'i-ph-code-duotone',
  label: '基础'
}, {
  key: 'frontend-frame',
  icon: 'i-ph-selection-foreground-duotone',
  label: '前端框架/库'
}, {
  key: 'web-frame',
  icon: 'i-ph-browsers-bold',
  label: 'Web 框架'
}]
</script>

<template>
  <UTabs :items="items" class="w-full">
    <template #default="{ item, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

        <span class="truncate">{{ item.label }}</span>

        <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
      </div>
    </template>
    <template #item="{ item }">
      <div class="py-1" />
      <div v-if="item.key === 'lang'" class="space-y-3">
        <CardGroup class="sm:grid-cols-2">
          <Card icon="i-simple-icons-javascript" title="JavaScript" to="/docs/guide/js">
            前端三剑客之一，JS 是一种脚本编程语言，它可以在网页上实现复杂的功能，网页展现给你的不再是简单的静态信息，而是实时的内容更新
          </Card>
          <Card icon="i-simple-icons-typescript" title="TypeScript" to="/docs/guide/ts">
            TS 是 JS 的严格语法超集，提供了可选的静态类型检查，它是为开发大型应用程序而设计的，且可转译成 JS。许多框架都已支持 TS
          </Card>
          <Card icon="i-simple-icons-html5" title="HTML" to="/docs/guide/html">
            前端三剑客之一，HTML 是一种用来告知浏览器如何组织页面的标记语言。HTML 可复杂、可简单，一切取决于 web 开发者
          </Card>
          <Card icon="i-simple-icons-css3" title="CSS" to="/docs/guide/css">
            前端三剑客之一，CSS 用于设置和布置网页——例如，更改内容的字体、颜色、大小和间距，将其拆分为多个列，或添加动画和其他装饰功能
          </Card>
        </CardGroup>
      </div>
      <div v-else-if="item.key === 'frontend-frame'" class="space-y-3">
        <CardGroup class="sm:grid-cols-2">
          <Card icon="i-simple-icons-vuedotjs" title="Vue.js" to="/docs/guide/vue">
            Vue 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型
          </Card>
          <Card icon="i-simple-icons-nuxtdotjs" title="Nuxt" to="/docs/guide/nuxt">
            "直观的 Vue 框架" - 使得 Web 开发变得直观且强大。可以自信地创建高性能和生产级别的全栈Web应用和网站 (Vue 框架的框架)
          </Card>
          <Card icon="i-simple-icons-react" title="React" to="/docs/guide/react">
            React 是一个用于构建用户界面的库。React 不是一个框架 — 它的应用甚至不局限于 Web 开发，它可以与其他库一起使用以渲染到特定环境
          </Card>
          <Card icon="i-simple-icons-nextdotjs" title="Next.js" to="/docs/guide/next">
            Next.js 是一个用于生产环境的 React 框架，为您提供生产环境所需的所有功能以及最佳的开发体验: 包括静态及服务器端融合渲染、TS 等，无需任何配置
          </Card>
        </CardGroup>
      </div>
      <div v-else-if="item.key === 'web-frame'" class="space-y-3">
        <CardGroup class="sm:grid-cols-3">
          <Card icon="i-simple-icons-flask" title="Flask" to="/docs/guide/py/flask">
            Flask 是一个使用 Python 编写的轻量级 Web 应用框架 (微框架)。基于 Werkzeug WSGI 工具箱和 Jinja2 模板引擎
          </Card>
          <Card icon="i-simple-icons-django" title="Django" to="/docs/guide/py/django">
            由 Python 编写的 Web 应用框架，采用了 MTV (model–template–views) 的软件设计模式，旨在简化数据库驱动的网站的开发
          </Card>
          <Card icon="i-devicon-plain-spring" title="Spring Boot" to="/docs/guide/java/springboot">
            Spring Boot 是基于 Spring (Java) 派生的，用于快速搭建独立的基于生产级别的 Spring 应用的框架，可以以最小的依赖引入构建应用程序
          </Card>
        </CardGroup>
      </div>
    </template>
  </UTabs>
</template>
