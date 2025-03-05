import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      // Specify the type of content in this collection
      type: 'page',
      // Load every markdown file inside the `content` directory
      source: '**/*.md'
    })
  }
})
