import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Events } from './collections/Events'
import { Articles } from './collections/Articles'
import { Testimonials } from './collections/Testimonials'
import { Sponsors } from './collections/Sponsors'
import { Faqs } from './collections/Faqs'
import { HomePage } from './globals/HomePage'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: '— Knowledge Club CMS',
    },
  },
  collections: [Events, Articles, Testimonials, Sponsors, Faqs, Media, Users],
  globals: [HomePage, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // Store media uploads in Cloudflare R2 (S3-compatible) instead of the local
    // filesystem. Required on Vercel (read-only/ephemeral disk). If the R2 env
    // vars are unset the plugin disables itself and Payload falls back to local
    // disk — fine for `npm run dev`.
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        endpoint: process.env.R2_ENDPOINT || '',
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        // R2 requires path-style URLs.
        forcePathStyle: true,
      },
    }),
  ],
})
