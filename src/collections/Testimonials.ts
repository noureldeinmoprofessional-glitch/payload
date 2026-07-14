import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'featured'],
    description: 'Success stories. NOTE: seed data is placeholder — replace with real, attributed quotes before launch.',
  },
  access: { read: () => true },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', admin: { description: 'e.g. "Chief People Officer, [Organization]"' } },
    { name: 'rating', type: 'number', defaultValue: 5, min: 1, max: 5 },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'externalAvatar', type: 'text', admin: { description: 'Fallback avatar URL.' } },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'One featured testimonial renders in the large panel.' },
    },
    { name: 'order', type: 'number' },
  ],
}
