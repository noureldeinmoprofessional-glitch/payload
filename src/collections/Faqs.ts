import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    group: 'Content',
    useAsTitle: 'question',
    defaultColumns: ['question', 'order'],
    description: 'Frequently asked questions (accordion).',
  },
  access: { read: () => true },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'order', type: 'number' },
  ],
}
