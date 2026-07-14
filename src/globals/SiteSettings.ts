import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Content' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & Nav',
          fields: [
            { name: 'brandName', type: 'text', defaultValue: 'Knowledge Club' },
            { name: 'brandTagline', type: 'text', defaultValue: 'Empowering Minds · Est. 2013' },
            { name: 'brochureUrl', type: 'text', defaultValue: '#', admin: { description: 'Download Brochure link.' } },
            { name: 'primaryNavCtaLabel', type: 'text', defaultValue: 'Become a Member' },
            { name: 'primaryNavCtaUrl', type: 'text', defaultValue: '#cta' },
            {
              name: 'navLinks',
              type: 'array',
              defaultValue: [
                { label: 'About Us', url: '#about' },
                { label: 'Speakers', url: '#speakers' },
                { label: 'Events', url: '#events' },
                { label: 'Highlights', url: '#highlights' },
                { label: 'Contact', url: '#contact' },
              ],
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Trusted By',
          fields: [
            { name: 'trustedLabel', type: 'text', defaultValue: 'Produced by ALGAS Events · Trusted by leading GCC organizations' },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerAbout', type: 'textarea', defaultValue: 'The Knowledge Club™ — 11 seasons empowering minds and shaping futures. Produced by ALGAS Events, a Kuwait-based agency active since 2010.' },
            { name: 'contactEmail', type: 'text', defaultValue: 'hello@knowledgeclub.com' },
            { name: 'contactLocation', type: 'text', defaultValue: 'Kuwait · GCC Season' },
            { name: 'newsletterHeading', type: 'text', defaultValue: 'Stay in the loop' },
            { name: 'newsletterText', type: 'textarea', defaultValue: 'Get new event announcements and insights for the 2025–2026 season.' },
            {
              name: 'social',
              type: 'array',
              defaultValue: [
                { platform: 'x', url: '#' }, { platform: 'facebook', url: '#' },
                { platform: 'instagram', url: '#' }, { platform: 'youtube', url: '#' }, { platform: 'linkedin', url: '#' },
              ],
              fields: [
                { name: 'platform', type: 'select', options: ['x', 'facebook', 'instagram', 'youtube', 'linkedin'], required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
            {
              name: 'footerColumns',
              type: 'array',
              defaultValue: [
                { heading: 'Explore', links: [
                  { label: 'About Us', url: '#about' }, { label: 'Speakers', url: '#speakers' },
                  { label: 'Events', url: '#events' }, { label: 'Highlights', url: '#highlights' }, { label: 'Insights', url: '#articles' },
                ]},
                { heading: 'Event Locations', links: [
                  { label: 'Kuwait City', url: '#events' }, { label: 'GCC Region', url: '#events' },
                  { label: 'Become a Member', url: '#cta' }, { label: 'Become a Sponsor', url: '#cta' }, { label: 'Download Brochure', url: '#' },
                ]},
              ],
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'links', type: 'array', fields: [
                  { name: 'label', type: 'text', required: true },
                  { name: 'url', type: 'text', required: true },
                ]},
              ],
            },
            { name: 'copyright', type: 'text', defaultValue: '© 2013–2026 The Knowledge Club™ · Produced by ALGAS Events. All rights reserved.' },
          ],
        },
      ],
    },
  ],
}
