import type { GlobalConfig } from 'payload'

const iconHelp = 'Lucide-style icon key. Available: certificate, network, engage, explore, expert, community, search, register, attend, grow, mission, vision, values, speakers, orgs, participants, events.'

export const HomePage: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: { group: 'Content' },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ---------------------------------------------------------- HERO
        {
          label: 'Hero',
          fields: [
            { name: 'heroBadge', type: 'text', defaultValue: '11 Seasons Empowering Minds · 2025–2026 Season Now Open' },
            {
              name: 'heroHeadline',
              type: 'array',
              admin: { description: 'Words revealed with a stagger. Toggle "gold" to highlight a word.' },
              defaultValue: [
                { word: 'The' }, { word: 'leadership' }, { word: 'ecosystem', gold: true },
                { word: 'that' }, { word: 'shapes' }, { word: "tomorrow's" }, { word: 'minds.' },
              ],
              fields: [
                { name: 'word', type: 'text', required: true },
                { name: 'gold', type: 'checkbox', defaultValue: false },
              ],
            },
            {
              name: 'heroSubheading',
              type: 'textarea',
              defaultValue:
                "Since 2013, The Knowledge Club™ has convened the region's most influential thinkers through world-class workshops, seminars, conferences and corporate olympics — a premium learning ecosystem built for individuals and organizations who refuse to stand still.",
            },
            { name: 'heroPrimaryCtaLabel', type: 'text', defaultValue: 'Explore Upcoming Events' },
            { name: 'heroPrimaryCtaUrl', type: 'text', defaultValue: '#events' },
            { name: 'heroSecondaryCtaLabel', type: 'text', defaultValue: 'Become a Member' },
            { name: 'heroSecondaryCtaUrl', type: 'text', defaultValue: '#cta' },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            { name: 'heroExternalImage', type: 'text', admin: { description: 'Fallback hero image URL.' } },
          ],
        },
        // ---------------------------------------------------------- STATS
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              admin: { description: 'PLACEHOLDER numbers — replace with client figures. Shown in hero + Numbers section.' },
              defaultValue: [
                { value: 120, suffix: '+', label: 'Expert Speakers', icon: 'speakers' },
                { value: 85, suffix: '+', label: 'Participating Organizations', icon: 'orgs' },
                { value: 12, suffix: 'K+', label: 'Upskilled Participants', icon: 'participants' },
                { value: 200, suffix: '+', label: 'Events Delivered', icon: 'events' },
              ],
              fields: [
                { name: 'value', type: 'number', required: true },
                { name: 'suffix', type: 'text', defaultValue: '+' },
                { name: 'label', type: 'text', required: true },
                { name: 'icon', type: 'text', admin: { description: iconHelp } },
              ],
            },
          ],
        },
        // ---------------------------------------------------------- ABOUT
        {
          label: 'About',
          fields: [
            { name: 'aboutEyebrow', type: 'text', defaultValue: 'About Knowledge Club' },
            { name: 'aboutHeading', type: 'text', defaultValue: 'The premier destination for professional growth in the region.' },
            {
              name: 'aboutLead',
              type: 'textarea',
              defaultValue:
                'Since 2013, The Knowledge Club™ has empowered individuals and organizations to sharpen their skills and competencies — through conferences, seminars, workshops and team-building experiences that support annual training calendars while giving professionals flexible access to the events that matter most to them. Members gain direct access to leading speakers, authors, experts and trainers.',
            },
            { name: 'aboutImage', type: 'upload', relationTo: 'media' },
            { name: 'aboutExternalImage', type: 'text' },
            { name: 'aboutBadgeNumber', type: 'text', defaultValue: '11' },
            { name: 'aboutBadgeText', type: 'text', defaultValue: 'Seasons of learning & leadership' },
            {
              name: 'mvv',
              label: 'Mission / Vision / Values',
              type: 'array',
              defaultValue: [
                { icon: 'mission', title: 'Our Mission', text: 'To make world-class learning accessible, giving every professional and organization a platform to grow with confidence.' },
                { icon: 'vision', title: 'Our Vision', text: "To be the region's most trusted leadership ecosystem — where minds are empowered and futures are shaped." },
                { icon: 'values', title: 'Our Values', text: 'Excellence, curiosity and community — produced by ALGAS Events, a Kuwait-based agency active since 2010.' },
              ],
              fields: [
                { name: 'icon', type: 'text', admin: { description: iconHelp } },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
            {
              name: 'timeline',
              type: 'array',
              defaultValue: [
                { year: '2013', text: 'The Knowledge Club™ founded in Kuwait.' },
                { year: '2016', text: 'Expanded into conferences & corporate olympics.' },
                { year: '2020', text: 'Reached thousands of upskilled participants across the GCC.' },
                { year: '2025', text: '11th season — the most ambitious program yet.' },
              ],
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'text', type: 'text', required: true },
              ],
            },
          ],
        },
        // ---------------------------------------------------------- WHY CHOOSE US
        {
          label: 'Why Choose Us',
          fields: [
            { name: 'whyEyebrow', type: 'text', defaultValue: 'Why Choose Us' },
            { name: 'whyHeading', type: 'text', defaultValue: 'Built for those who attend — and those who partner.' },
            { name: 'whySubheading', type: 'textarea', defaultValue: "Whether you're growing your career or your brand, The Knowledge Club delivers measurable value on both sides of the room." },
            {
              name: 'tracks',
              type: 'array',
              maxRows: 2,
              defaultValue: [
                {
                  audience: 'attendees', tag: 'For Attendees',
                  heading: 'Learn from pioneers. Grow beyond your role.',
                  text: 'Uncover unmatched insights, expand your knowledge base, and connect with a community of professionals who are as ambitious as you are.',
                  statValue: '12K+', statLabel: 'Upskilled attendees',
                  externalImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&auto=format&fit=crop',
                  points: [
                    { text: 'Insights with industry pioneers' }, { text: 'Innovative strategies to explore' },
                    { text: 'Network with like-minded pros' }, { text: 'Stay ahead of industry trends' },
                    { text: 'Inspiring keynotes & workshops' }, { text: 'Exclusive access to resources' },
                  ],
                },
                {
                  audience: 'sponsors', tag: 'For Sponsors & Organizations',
                  heading: 'Elevate your brand. Reach the decision-makers.',
                  text: 'Put your brand in front of a highly influential audience of executives and industry leaders, with measurable ROI backed by data and analytics.',
                  statValue: '85+', statLabel: 'Partner organizations',
                  externalImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop',
                  points: [
                    { text: 'Enhanced brand visibility' }, { text: 'Targeted executive reach' },
                    { text: 'Network with influential leaders' }, { text: 'Association with excellence' },
                    { text: 'Content & media exposure' }, { text: 'Measurable ROI & analytics' },
                  ],
                },
              ],
              fields: [
                { name: 'audience', type: 'select', options: ['attendees', 'sponsors'], required: true },
                { name: 'tag', type: 'text', required: true },
                { name: 'heading', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
                { name: 'statValue', type: 'text' },
                { name: 'statLabel', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'externalImage', type: 'text' },
                { name: 'points', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
              ],
            },
            {
              name: 'benefits',
              label: 'Why Join Benefits',
              type: 'array',
              defaultValue: [
                { icon: 'certificate', title: 'Certificate of Attendance', text: 'Formal recognition to add to your professional portfolio and LinkedIn.' },
                { icon: 'network', title: 'Increase Your Network', text: 'Connect with peers, mentors and leaders across industries and the GCC.' },
                { icon: 'engage', title: 'Be Engaged', text: 'Interactive formats designed to keep you participating, not just watching.' },
                { icon: 'explore', title: 'Explore More', text: 'Discover topics and disciplines beyond your day-to-day expertise.' },
                { icon: 'expert', title: 'Meet the Expert', text: 'Direct access to leading speakers, authors, experts and trainers.' },
                { icon: 'community', title: 'KC Community', text: 'Belong to a lasting community that keeps learning long after the event.' },
              ],
              fields: [
                { name: 'icon', type: 'text', admin: { description: iconHelp } },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },
        // ---------------------------------------------------------- JOURNEY
        {
          label: 'Member Journey',
          fields: [
            { name: 'journeyEyebrow', type: 'text', defaultValue: 'The Member Journey' },
            { name: 'journeyHeading', type: 'text', defaultValue: 'Five steps from curious to connected.' },
            { name: 'journeySubheading', type: 'textarea', defaultValue: 'A guided path that turns a single event into a lasting professional advantage.' },
            {
              name: 'journeySteps',
              type: 'array',
              defaultValue: [
                { icon: 'search', title: 'Discover', text: 'Browse programs tailored to your interests and goals.' },
                { icon: 'register', title: 'Register', text: 'Secure your seat in minutes with a seamless sign-up.' },
                { icon: 'attend', title: 'Attend', text: 'Immerse yourself in world-class sessions and speakers.' },
                { icon: 'network', title: 'Network', text: 'Build relationships with peers, mentors and leaders.' },
                { icon: 'grow', title: 'Grow', text: 'Apply new skills and keep growing with the KC community.' },
              ],
              fields: [
                { name: 'icon', type: 'text', admin: { description: iconHelp } },
                { name: 'title', type: 'text', required: true },
                { name: 'text', type: 'textarea', required: true },
              ],
            },
          ],
        },
        // ---------------------------------------------------------- CTA
        {
          label: 'Final CTA',
          fields: [
            { name: 'ctaEyebrow', type: 'text', defaultValue: 'Be part of the 2025–2026 season' },
            { name: 'ctaHeading', type: 'text', defaultValue: 'Empower your mind. Shape your future.' },
            { name: 'ctaText', type: 'textarea', defaultValue: 'Join a community of ambitious professionals and forward-thinking organizations. Your next breakthrough starts at The Knowledge Club™.' },
            { name: 'ctaPrimaryLabel', type: 'text', defaultValue: 'Explore Upcoming Events' },
            { name: 'ctaPrimaryUrl', type: 'text', defaultValue: '#events' },
            { name: 'ctaSecondaryLabel', type: 'text', defaultValue: 'Download Brochure' },
            { name: 'ctaSecondaryUrl', type: 'text', defaultValue: '#' },
          ],
        },
      ],
    },
  ],
}
