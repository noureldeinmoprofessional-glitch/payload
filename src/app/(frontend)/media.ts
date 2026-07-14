// Resolve an image src from a Payload upload relation, falling back to an
// external URL field, then to a final placeholder. Keeps templates tidy.
type MediaLike = { url?: string | null; alt?: string | null } | string | null | undefined

export function imgSrc(media: MediaLike, external?: string | null, fallback = ''): string {
  if (media && typeof media === 'object' && media.url) return media.url
  if (external) return external
  return fallback
}

export function imgAlt(media: MediaLike, fallback = ''): string {
  if (media && typeof media === 'object' && media.alt) return media.alt
  return fallback
}
