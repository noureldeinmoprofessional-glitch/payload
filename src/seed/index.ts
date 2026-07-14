/**
 * Seed script — populates collections with the real Knowledge Club content.
 * Run once after `pnpm install` and setting up .env:   pnpm seed
 *
 * Globals (Home Page, Site Settings) already ship with sensible defaults via
 * field `defaultValue`s, so they don't need seeding — just open the admin panel
 * to edit them. This script seeds the list-style collections.
 *
 * NOTE: testimonials + stat numbers are PLACEHOLDERS — replace before launch.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const EVENTS = [
  { title: 'Happiness Effect Conference', type: 'Conference', date: '2025-12-16', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80&auto=format&fit=crop', order: 1 },
  { title: 'Corporate Olympics', type: 'Corporate Olympics', date: '2026-02-10', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80&auto=format&fit=crop', order: 2 },
  { title: 'Leading from the Jumpseat', type: 'Seminar', date: '2025-09-10', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80&auto=format&fit=crop', order: 3 },
  { title: 'The Holistic Employee Experience (HEX)', type: 'Workshop', date: '2025-09-30', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&q=80&auto=format&fit=crop', order: 4 },
  { title: 'Lead with Impact: Balancing Insight & Intuition', type: 'Seminar', date: '2025-10-21', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&auto=format&fit=crop', order: 5 },
  { title: 'Culture, Cognition & the Future of Work', type: 'Workshop', date: '2025-11-11', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80&auto=format&fit=crop', order: 6 },
  { title: 'Conflict Intelligence for Leaders', type: 'Workshop', date: '2025-11-25', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80&auto=format&fit=crop', order: 7 },
  { title: 'Bee Ready For Change™', type: 'Workshop', date: '2026-01-20', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&auto=format&fit=crop', order: 8 },
  { title: 'Leading with Attention Intelligence', type: 'Seminar', date: '2026-04-14', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&q=80&auto=format&fit=crop', order: 9 },
  { title: 'Connected Leadership: Transforming Culture Through Empathy and Influence', type: 'Seminar', date: '2026-05-19', city: 'Kuwait', externalImage: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80&auto=format&fit=crop', order: 10 },
]

const ARTICLES = [
  { title: 'Are HR Project Teams Dead?', author: 'Perry Timms', category: 'Future of Work', readTime: '6 min read', featured: true, externalImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop', order: 1 },
  { title: '6 Fundamental Reasons Why Companies Need to Transform', author: 'Christian Rangen', category: 'Transformation', externalImage: 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&q=80&auto=format&fit=crop', order: 2 },
  { title: '5 Ways to Sustain Yourself and Others', author: 'Sally Foley-Lewis', category: 'Wellbeing', externalImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80&auto=format&fit=crop', order: 3 },
]

// PLACEHOLDER testimonials — replace with real, attributed quotes before launch.
const TESTIMONIALS = [
  { quote: 'The Knowledge Club sessions completely reshaped how our leadership team thinks about culture. The caliber of speakers and the room full of ambitious peers is unmatched in the region.', name: '[Name Placeholder]', role: 'Chief People Officer, [Organization]', rating: 5, featured: true, externalAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop', order: 1 },
  { quote: 'I left with a network I still lean on two years later. Worth every minute.', name: '[Attendee Name]', role: 'Senior Manager, [Company]', rating: 5, order: 2 },
  { quote: 'As a sponsor, the visibility we got with senior decision-makers delivered real ROI.', name: '[Partner Name]', role: 'Marketing Director, [Sponsor]', rating: 5, order: 3 },
]

const SPONSORS = ['ALGAS Events', 'VisionCorp', 'GulfBank', 'NexaHR', 'Meridian', 'Pinnacle', 'AtlasGroup', 'Everest']
  .map((name, i) => ({ name, order: i + 1 }))

const FAQS = [
  { question: 'Who can join The Knowledge Club?', answer: 'Anyone committed to professional growth — from individual contributors to senior executives — as well as organizations building their annual training calendars. Members gain flexible access to events tailored to their interests.', order: 1 },
  { question: 'Where are the events held?', answer: 'Our 2025–2026 season is held in Kuwait with a GCC-wide focus. Each event listing shows its exact venue and date so you can plan ahead.', order: 2 },
  { question: 'Do I receive a certificate?', answer: 'Yes. Attendees receive a Certificate of Attendance for eligible events — a formal addition to your professional portfolio.', order: 3 },
  { question: 'How can my organization sponsor or partner?', answer: 'We offer customized brand activations, targeted executive reach, and measurable ROI through data and analytics. Reach out via the contact section and our team at ALGAS Events will build a package around your goals.', order: 4 },
  { question: 'What types of events do you run?', answer: 'Four formats: hands-on Workshops, insight-led Seminars, flagship Conferences, and large-scale Corporate Olympics for team-building.', order: 5 },
]

async function seed() {
  const payload = await getPayload({ config })

  // Admin user
  const users = await payload.count({ collection: 'users' })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email: 'admin@knowledgeclub.com', password: 'ChangeMe123!', name: 'KC Admin' },
    })
    payload.logger.info('✓ Created admin user  → admin@knowledgeclub.com / ChangeMe123!  (change this!)')
  }

  const seedCollection = async (collection: any, rows: any[]) => {
    const existing = await payload.count({ collection })
    if (existing.totalDocs > 0) {
      payload.logger.info(`• ${collection}: already has ${existing.totalDocs} docs, skipping`)
      return
    }
    for (const data of rows) await payload.create({ collection, data })
    payload.logger.info(`✓ Seeded ${rows.length} ${collection}`)
  }

  await seedCollection('events', EVENTS)
  await seedCollection('articles', ARTICLES)
  await seedCollection('testimonials', TESTIMONIALS)
  await seedCollection('sponsors', SPONSORS)
  await seedCollection('faqs', FAQS)

  payload.logger.info('Seed complete. Start the app with `pnpm dev` and visit /admin.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
