import type { CollectionConfig } from 'payload'

export const Sponsors: CollectionConfig = {
  slug: 'sponsors',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
    description: 'Partner / sponsor logos shown in the Trusted By marquee.',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', admin: { description: 'Transparent SVG/PNG. If empty, a placeholder icon + name is shown.' } },
    { name: 'url', type: 'text' },
    { name: 'order', type: 'number' },
  ],
}
