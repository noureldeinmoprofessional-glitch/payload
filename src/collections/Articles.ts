import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'featured'],
    description: 'Insight / blog posts shown in the Latest Articles section.',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'author', type: 'text', required: true },
    { name: 'category', type: 'text', required: true, defaultValue: 'Insights' },
    { name: 'readTime', type: 'text', admin: { description: 'e.g. "6 min read"' } },
    { name: 'url', type: 'text', defaultValue: '#', admin: { description: 'Link to the full article.' } },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'externalImage', type: 'text', admin: { description: 'Fallback image URL if no media uploaded.' } },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'One featured article renders large. Others render in the side list.' },
    },
    { name: 'order', type: 'number', admin: { description: 'Lower numbers appear first.' } },
  ],
}
