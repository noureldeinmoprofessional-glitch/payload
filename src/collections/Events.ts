import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'date', 'city'],
    description: 'Upcoming events shown in the Programs / Events grid.',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'Workshop',
      options: ['Workshop', 'Seminar', 'Conference', 'Corporate Olympics'],
    },
    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'city', type: 'text', required: true, defaultValue: 'Kuwait' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Card image (~600×400). Falls back to a placeholder if empty.' },
    },
    {
      name: 'externalImage',
      type: 'text',
      admin: { description: 'Optional fallback image URL if no media is uploaded yet.' },
    },
    { name: 'registerUrl', type: 'text', defaultValue: '#cta', admin: { description: 'Registration link.' } },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', admin: { description: 'Lower numbers appear first.' } },
  ],
}
