import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Icon, categoryIcon } from './icons'
import { imgSrc, imgAlt } from './media'
import Motion from './Motion'

// ISR: serve a cached, statically-rendered page (fast TTFB → better LCP/Speed
// Index) and re-render at most once a minute so CMS edits still show up.
export const revalidate = 60

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const pad = (n: number) => String(n).padStart(2, '0')

const CATEGORY_CARDS = [
  { icon: 'workshop', title: 'Workshops', text: 'Hands-on, practical skill-building in small groups.', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80&auto=format&fit=crop' },
  { icon: 'seminar', title: 'Seminars', text: 'Insight-led sessions with industry pioneers.', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&auto=format&fit=crop' },
  { icon: 'conference', title: 'Conferences', text: 'Flagship gatherings for the whole industry.', img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80&auto=format&fit=crop' },
  { icon: 'olympics', title: 'Corporate Olympics', text: 'Team-building at scale that bonds organizations.', img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80&auto=format&fit=crop' },
]

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [home, settings, eventsRes, articlesRes, testiRes, sponsorsRes, faqsRes] = await Promise.all([
    payload.findGlobal({ slug: 'home', depth: 2 }),
    payload.findGlobal({ slug: 'site-settings', depth: 2 }),
    payload.find({ collection: 'events', limit: 100, sort: 'date', depth: 1 }),
    payload.find({ collection: 'articles', limit: 20, sort: 'order', depth: 1 }),
    payload.find({ collection: 'testimonials', limit: 20, sort: 'order', depth: 1 }),
    payload.find({ collection: 'sponsors', limit: 50, sort: 'order', depth: 1 }),
    payload.find({ collection: 'faqs', limit: 50, sort: 'order', depth: 0 }),
  ])

  const h = home as any
  const s = settings as any
  const events = eventsRes.docs as any[]
  const articles = articlesRes.docs as any[]
  const testimonials = testiRes.docs as any[]
  const sponsors = sponsorsRes.docs as any[]
  const faqs = faqsRes.docs as any[]

  const featuredArticle = articles.find((a) => a.featured) || articles[0]
  const sideArticles = articles.filter((a) => a !== featuredArticle).slice(0, 2)
  const featuredTesti = testimonials.find((t) => t.featured) || testimonials[0]
  const sideTestis = testimonials.filter((t) => t !== featuredTesti).slice(0, 2)
  const marquee = sponsors.length ? [...sponsors, ...sponsors] : []

  const brandMark = (
    <span className="mark" aria-hidden="true"><Icon name="logo" /></span>
  )

  return (
    <>
      {/* ============================ NAV ============================ */}
      <header className="nav" id="nav">
        <div className="container">
          <a href="#top" className="brand" aria-label={`${s.brandName} home`}>
            {brandMark}
            <span>{s.brandName}<small>{s.brandTagline}</small></span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {(s.navLinks || []).map((l: any, i: number) => (
              <a key={i} href={l.url} className={i === 0 ? 'active' : ''}>{l.label}</a>
            ))}
          </nav>

          <div className="nav-cta">
            <a href={s.brochureUrl} className="nav-brochure"><Icon name="download" /> Brochure</a>
            <a href={s.primaryNavCtaUrl} className="btn btn--primary" data-magnetic>{s.primaryNavCtaLabel}</a>
            <button className="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
          </div>
        </div>
      </header>

      <div className="mobile-menu" id="mobileMenu">
        {(s.navLinks || []).map((l: any, i: number) => <a key={i} href={l.url}>{l.label}</a>)}
        <a href={s.brochureUrl} className="btn btn--secondary">Download Brochure</a>
        <a href={s.primaryNavCtaUrl} className="btn btn--primary">{s.primaryNavCtaLabel}</a>
      </div>

      <main>
        {/* ============================ HERO ============================ */}
        <section className="hero" id="top">
          <div className="hero__bg" aria-hidden="true">
            <span className="blob b1"></span><span className="blob b2"></span><span className="blob b3"></span>
            <div className="hero__grid-overlay"></div>
          </div>
          <div className="container">
            <div className="hero__inner">
              <div className="hero__copy">
                <span className="hero__badge"><span className="dot"></span>{h.heroBadge}</span>

                <h1 className="hero-h">
                  {(h.heroHeadline || []).map((w: any, i: number) => (
                    <span className="word" key={i}><span className={w.gold ? 'grad' : ''}>{w.word}</span></span>
                  ))}
                </h1>

                <p className="hero__sub">{h.heroSubheading}</p>

                <div className="hero__cta">
                  <a href={h.heroPrimaryCtaUrl} className="btn btn--primary" data-magnetic>
                    {h.heroPrimaryCtaLabel}<Icon name="arrowRight" />
                  </a>
                  <a href={h.heroSecondaryCtaUrl} className="btn btn--secondary">{h.heroSecondaryCtaLabel}</a>
                </div>

                {/* Stat values come from CMS (Home → Stats). PLACEHOLDER until real figures added. */}
                <div className="hero__stats">
                  {(h.stats || []).map((st: any, i: number) => (
                    <div key={i}>
                      <div className="num" data-count={st.value} data-suffix={st.suffix}>0</div>
                      <div className="lbl">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero__visual">
                <div className="hero-card main">
                  {/* LCP image — eager + high priority, explicit dimensions to reserve space */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc(h.heroImage, h.heroExternalImage, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=75&auto=format&fit=crop')}
                    alt={imgAlt(h.heroImage, 'Professionals engaged at a Knowledge Club leadership conference')}
                    width={900}
                    height={560}
                    // @ts-expect-error fetchPriority is valid HTML but not yet in React's img types
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
                <div className="hero-float f1" data-parallax="0.4">
                  <span className="ic"><Icon name="participants" /></span>
                  <div><b>Certified Learning</b><span>Attendance certificates</span></div>
                </div>
                <div className="hero-float f2" data-parallax="0.7">
                  <span className="ic"><Icon name="community" /></span>
                  <div><b>Elite Network</b><span>Executives &amp; leaders</span></div>
                </div>
              </div>
            </div>
          </div>
          <a href="#trusted" className="scroll-ind" aria-label="Scroll down"><span className="mouse"></span>Scroll</a>
        </section>

        {/* ============================ TRUSTED BY ============================ */}
        <section className="trusted" id="trusted">
          <div className="container">
            <p className="trusted__label">{s.trustedLabel}</p>
          </div>
          <div className="marquee">
            <div className="marquee__track">
              {marquee.map((sp: any, i: number) => (
                <span className="logo-item" key={i}>
                  {sp.logo && typeof sp.logo === 'object' && sp.logo.url
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={sp.logo.url} alt={sp.name} />
                    : <><Icon name="building" />{sp.name}</>}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ ABOUT ============================ */}
        <section className="section" id="about">
          <div className="container about">
            <div className="about__grid">
              <div className="about__media reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  loading="lazy"
                  src={imgSrc(h.aboutImage, h.aboutExternalImage, 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop')}
                  alt={imgAlt(h.aboutImage, 'Knowledge Club team collaborating during a workshop session')}
                />
                <div className="about__badge">
                  <div className="big">{h.aboutBadgeNumber}</div>
                  <div className="txt">{h.aboutBadgeText}</div>
                </div>
              </div>

              <div>
                <span className="eyebrow reveal">{h.aboutEyebrow}</span>
                <h2 className="reveal">{h.aboutHeading}</h2>
                <p className="about__lead reveal">{h.aboutLead}</p>
                <div className="mvv">
                  {(h.mvv || []).map((m: any, i: number) => (
                    <div className="mvv-card reveal" key={i}>
                      <span className="ic"><Icon name={m.icon} /></span>
                      <div><h5>{m.title}</h5><p>{m.text}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="timeline">
              {(h.timeline || []).map((t: any, i: number) => (
                <div className="tl-item reveal" key={i}><div className="yr">{t.year}</div><p>{t.text}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ PROGRAMS / EVENTS ============================ */}
        <section className="section section--gray" id="events">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">Programs &amp; Events</span>
              <h2 className="reveal">Four formats. One standard of excellence.</h2>
              <p className="reveal">From intimate workshops to region-wide conferences, every Knowledge Club experience is engineered to move you forward.</p>
            </div>

            <div className="cat-grid" id="speakers">
              {CATEGORY_CARDS.map((c, i) => (
                <a href="#events" className="cat-card reveal" key={i}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={c.img} alt={`${c.title} session`} />
                  <span className="arrow"><Icon name="arrowUpRight" /></span>
                  <span className="k-ic"><Icon name={c.icon} /></span>
                  <h4>{c.title}</h4><p>{c.text}</p>
                </a>
              ))}
            </div>

            <div className="filters" id="filters">
              <button className="filter-btn active" data-filter="all">All Events</button>
              <button className="filter-btn" data-filter="Conference">Conferences</button>
              <button className="filter-btn" data-filter="Seminar">Seminars</button>
              <button className="filter-btn" data-filter="Workshop">Workshops</button>
              <button className="filter-btn" data-filter="Corporate Olympics">Corporate Olympics</button>
            </div>

            <div className="event-grid" id="eventGrid">
              {events.map((e: any) => {
                const d = new Date(e.date)
                return (
                  <article className="event-card reveal" data-type={e.type} key={e.id}>
                    <div className="event-card__media">
                      <span className="event-tag" data-t={e.type}>{e.type}</span>
                      <div className="event-date">
                        <div className="d">{pad(d.getUTCDate())}</div>
                        <div className="m">{MONTHS[d.getUTCMonth()]} {d.getUTCFullYear()}</div>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" src={imgSrc(e.image, e.externalImage, 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80&auto=format&fit=crop')} alt={imgAlt(e.image, e.title)} />
                    </div>
                    <div className="event-card__body">
                      <h5>{e.title}</h5>
                      <div className="event-meta">
                        <span><Icon name="calendar" /> {pad(d.getUTCDate())}/{pad(d.getUTCMonth() + 1)}/{d.getUTCFullYear()}</span>
                        <span><Icon name="pin" /> {e.city}</span>
                      </div>
                      <div className="event-card__foot">
                        <a href={e.registerUrl || '#cta'} className="btn-text">Register <Icon name="arrowRight" /></a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================ WHY CHOOSE US ============================ */}
        <section className="section" id="highlights">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">{h.whyEyebrow}</span>
              <h2 className="reveal">{h.whyHeading}</h2>
              <p className="reveal">{h.whySubheading}</p>
            </div>

            {(h.tracks || []).map((t: any, i: number) => {
              const rev = i % 2 === 1
              const sponsorTrack = t.audience === 'sponsors'
              return (
                <div className={`track ${rev ? 'track--rev ' : ''}${sponsorTrack ? 'spo-track' : 'att-track'}`} key={i}>
                  <div className="track__media reveal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" src={imgSrc(t.image, t.externalImage, '')} alt={imgAlt(t.image, t.heading)} />
                    {t.statValue && <div className="float-stat"><b>{t.statValue}</b><span>{t.statLabel}</span></div>}
                  </div>
                  <div>
                    <span className={`tag ${sponsorTrack ? 'spo' : 'att'} reveal`}>{t.tag}</span>
                    <h3 className="reveal">{t.heading}</h3>
                    <p className="reveal">{t.text}</p>
                    <ul className="check-list">
                      {(t.points || []).map((p: any, j: number) => (
                        <li className="reveal" key={j}><span className="ck"><Icon name="check" strokeWidth={3} /></span>{p.text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}

            <div className="benefit-grid">
              {(h.benefits || []).map((b: any, i: number) => (
                <div className="benefit-card reveal" key={i}>
                  <span className="ic"><Icon name={b.icon} /></span>
                  <h5>{b.title}</h5><p>{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ MEMBER JOURNEY ============================ */}
        <section className="section journey" id="journey">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">{h.journeyEyebrow}</span>
              <h2 className="reveal" style={{ color: '#fff' }}>{h.journeyHeading}</h2>
              <p className="reveal">{h.journeySubheading}</p>
            </div>
            <div className="journey__wrap">
              <div className="journey__line"><div className="journey__line-fill" id="journeyFill"></div></div>
              <div className="journey__steps" id="journeySteps">
                {(h.journeySteps || []).map((st: any, i: number) => (
                  <div className="j-step" key={i}>
                    <div className="node"><span className="step-n">{i + 1}</span><Icon name={st.icon} /></div>
                    <h5>{st.title}</h5><p>{st.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================ TESTIMONIALS ============================ */}
        <section className="section section--gray">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">Success Stories</span>
              <h2 className="reveal">The impact, in their words.</h2>
              {/* NOTE: Seeded testimonials are PLACEHOLDER — replace with real quotes in the CMS before launch. */}
              <p className="reveal">Real, attributed stories from attendees &amp; partners.</p>
            </div>

            <div className="testi__grid">
              {featuredTesti && (
                <div className="testi-feature reveal">
                  <div className="stars">{Array.from({ length: featuredTesti.rating || 5 }).map((_, i) => <Icon key={i} name="values" fill="currentColor" />)}</div>
                  <div className="quote-mark">&ldquo;</div>
                  <blockquote>{featuredTesti.quote}</blockquote>
                  <div className="who">
                    {imgSrc(featuredTesti.avatar, featuredTesti.externalAvatar) &&
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" src={imgSrc(featuredTesti.avatar, featuredTesti.externalAvatar)} alt={featuredTesti.name} />}
                    <div><b>{featuredTesti.name}</b><span>{featuredTesti.role}</span></div>
                  </div>
                </div>
              )}

              <div className="testi-side">
                {sideTestis.map((t: any) => (
                  <div className="testi-card reveal" key={t.id}>
                    <div className="stars">{Array.from({ length: t.rating || 5 }).map((_, i) => <Icon key={i} name="values" fill="currentColor" />)}</div>
                    <p>&ldquo;{t.quote}&rdquo;</p>
                    <div className="who">
                      <span className="av">
                        {imgSrc(t.avatar, t.externalAvatar)
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={imgSrc(t.avatar, t.externalAvatar)} alt={t.name} />
                          : (t.name || '?').split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
                      </span>
                      <div><b>{t.name}</b><span>{t.role}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================ NUMBERS ============================ */}
        <section className="section numbers">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">By The Numbers</span>
              <h2 className="reveal" style={{ color: '#fff' }}>Eleven seasons of measurable impact.</h2>
            </div>
            <div className="num-grid">
              {(h.stats || []).map((st: any, i: number) => (
                <div className="num-card reveal" key={i}>
                  <span className="ic"><Icon name={st.icon} /></span>
                  <div className="n" data-count={st.value} data-suffix={st.suffix}>0</div>
                  <div className="l">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ ARTICLES ============================ */}
        <section className="section" id="articles">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">Latest Insights</span>
              <h2 className="reveal">Ideas worth reading between sessions.</h2>
              <p className="reveal">Perspectives from the thinkers and practitioners shaping the future of work.</p>
            </div>

            <div className="articles__grid">
              {featuredArticle && (
                <a href={featuredArticle.url || '#'} className="article-feature reveal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" src={imgSrc(featuredArticle.image, featuredArticle.externalImage, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop')} alt={imgAlt(featuredArticle.image, featuredArticle.title)} />
                  <span className="article-cat">{featuredArticle.category}</span>
                  <h3>{featuredArticle.title}</h3>
                  <p className="by">By {featuredArticle.author}{featuredArticle.readTime ? ` · ${featuredArticle.readTime}` : ''}</p>
                </a>
              )}

              <div className="articles__side">
                {sideArticles.map((a: any) => (
                  <a href={a.url || '#'} className="article-row reveal" key={a.id}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" src={imgSrc(a.image, a.externalImage, 'https://images.unsplash.com/photo-1552581234-26160f608093?w=400&q=80&auto=format&fit=crop')} alt={imgAlt(a.image, a.title)} />
                    <div className="meta">
                      <div className="k">{a.category}</div>
                      <h5>{a.title}</h5>
                      <div className="by">By {a.author}</div>
                    </div>
                  </a>
                ))}
                <a href="#articles" className="article-row article-row--cta reveal">
                  <div className="meta" style={{ textAlign: 'center' }}>
                    <h5>Explore all insights <Icon name="arrowRight" /></h5>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================ FAQ ============================ */}
        <section className="section section--gray">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow reveal">FAQ</span>
              <h2 className="reveal">Questions, answered.</h2>
            </div>
            <div className="faq" id="faq">
              {faqs.map((f: any) => (
                <div className="faq-item" key={f.id}>
                  <button className="faq-q">{f.question}<span className="ic"><Icon name="plus" strokeWidth={2.5} /></span></button>
                  <div className="faq-a"><p>{f.answer}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ CTA ============================ */}
        <section className="cta-final" id="cta">
          <div className="container">
            <div className="cta-box reveal">
              <span className="eyebrow">{h.ctaEyebrow}</span>
              <h2>{h.ctaHeading}</h2>
              <p>{h.ctaText}</p>
              <div className="btns">
                <a href={h.ctaPrimaryUrl} className="btn btn--primary" data-magnetic>{h.ctaPrimaryLabel}<Icon name="arrowRight" /></a>
                <a href={h.ctaSecondaryUrl} className="btn btn--light">{h.ctaSecondaryLabel}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer__top">
            <div>
              <a href="#top" className="brand">{brandMark}<span>{s.brandName}<small>{s.brandTagline}</small></span></a>
              <p className="footer__about">{s.footerAbout}</p>
              <div className="footer__social">
                {(s.social || []).map((soc: any, i: number) => (
                  <a key={i} href={soc.url} aria-label={soc.platform}><Icon name={soc.platform} /></a>
                ))}
              </div>
            </div>

            {(s.footerColumns || []).map((col: any, i: number) => (
              <div key={i}>
                <h6>{col.heading}</h6>
                <ul className="footer__links">
                  {(col.links || []).map((l: any, j: number) => <li key={j}><a href={l.url}>{l.label}</a></li>)}
                </ul>
              </div>
            ))}

            <div className="footer__news">
              <h6>{s.newsletterHeading}</h6>
              <p>{s.newsletterText}</p>
              <form className="news-form" action="#" method="post">
                <input type="email" placeholder="Your email address" aria-label="Email address" required />
                <button type="submit">Subscribe</button>
              </form>
              <div className="footer__contact">
                <span><Icon name="pin" /> {s.contactLocation}</span>
                <span><Icon name="mail" /> {s.contactEmail}</span>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <span>{s.copyright}</span>
            <span><a href="#">Privacy</a> · <a href="#">Terms</a></span>
          </div>
        </div>
      </footer>

      <Motion />
    </>
  )
}
