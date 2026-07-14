'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Runs all motion + interactivity for the landing page against the
 * server-rendered DOM (same class contract as the static build):
 *  - hero split-text + entrance, blob/float parallax
 *  - scroll reveals (fade-up + blur), count-up counters
 *  - pinned Member Journey storytelling
 *  - nav scrolled state, scrollspy, mobile menu
 *  - event category filter, FAQ accordion, magnetic buttons
 * Honors prefers-reduced-motion.
 */
export default function Motion() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {})
    const cleanups: Array<() => void> = []

    /* ---- Nav: scrolled state ---- */
    const nav = document.getElementById('nav')
    const onScrollNav = () => nav?.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', onScrollNav, { passive: true })
    onScrollNav()
    cleanups.push(() => window.removeEventListener('scroll', onScrollNav))

    /* ---- Mobile menu ---- */
    const burger = document.getElementById('burger')
    const mobile = document.getElementById('mobileMenu')
    const toggleMenu = () => {
      const open = mobile?.classList.toggle('open')
      burger?.setAttribute('aria-expanded', String(!!open))
    }
    burger?.addEventListener('click', toggleMenu)
    const menuLinks = mobile ? Array.from(mobile.querySelectorAll('a')) : []
    const closeMenu = () => {
      mobile?.classList.remove('open')
      burger?.setAttribute('aria-expanded', 'false')
    }
    menuLinks.forEach((a) => a.addEventListener('click', closeMenu))
    cleanups.push(() => {
      burger?.removeEventListener('click', toggleMenu)
      menuLinks.forEach((a) => a.removeEventListener('click', closeMenu))
    })

    /* ---- Event filter ---- */
    const filters = document.getElementById('filters')
    const onFilter = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('.filter-btn')
      if (!b) return
      filters?.querySelectorAll('.filter-btn').forEach((x) => x.classList.remove('active'))
      b.classList.add('active')
      const f = b.dataset.filter
      document.querySelectorAll<HTMLElement>('#eventGrid .event-card').forEach((card) => {
        card.classList.toggle('hide', f !== 'all' && card.dataset.type !== f)
      })
      ScrollTrigger.refresh()
    }
    filters?.addEventListener('click', onFilter)
    cleanups.push(() => filters?.removeEventListener('click', onFilter))

    /* ---- FAQ accordion ---- */
    const faqItems = Array.from(document.querySelectorAll<HTMLElement>('.faq-item'))
    const faqHandlers: Array<() => void> = []
    faqItems.forEach((item) => {
      const q = item.querySelector('.faq-q')
      const a = item.querySelector<HTMLElement>('.faq-a')
      const h = () => {
        const open = item.classList.contains('open')
        faqItems.forEach((i) => {
          i.classList.remove('open')
          const ia = i.querySelector<HTMLElement>('.faq-a')
          if (ia) ia.style.maxHeight = ''
        })
        if (!open && a) {
          item.classList.add('open')
          a.style.maxHeight = a.scrollHeight + 'px'
        }
      }
      q?.addEventListener('click', h)
      faqHandlers.push(() => q?.removeEventListener('click', h))
    })
    cleanups.push(() => faqHandlers.forEach((fn) => fn()))

    /* ---- Scrollspy ---- */
    const spy = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-links a'))
    const secMap = spy
      .map((a) => document.querySelector<HTMLElement>(a.getAttribute('href') || ''))
      .filter(Boolean) as HTMLElement[]
    const onSpy = () => {
      const pos = window.scrollY + 120
      let current = secMap[0]
      secMap.forEach((s) => { if (s.offsetTop <= pos) current = s })
      spy.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current?.id))
    }
    window.addEventListener('scroll', onSpy, { passive: true })
    onSpy()
    cleanups.push(() => window.removeEventListener('scroll', onSpy))

    /* ---- Counters helper ---- */
    const animateCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.count)
      const suffix = el.dataset.suffix || ''
      if (prefersReduced) { el.innerHTML = target + `<span class="suf">${suffix}</span>`; return }
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target, duration: 2, ease: 'power2.out',
        onUpdate: () => { el.innerHTML = Math.round(obj.v) + `<span class="suf">${suffix}</span>` },
      })
    }

    /* ---- GSAP scroll animations ---- */
    if (!prefersReduced) {
      gsap.registerPlugin(ScrollTrigger)
      document.documentElement.classList.add('gsap-ready')

      ctx.add(() => {
        // Reveals
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
          gsap.set(el, { opacity: 0, y: 40, filter: 'blur(6px)' })
          ScrollTrigger.create({
            trigger: el, start: 'top 88%', once: true,
            onEnter: () => gsap.to(el, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }),
          })
        })

        // Hero entrance
        gsap.set('.hero-h .word span', { yPercent: 110 })
        gsap.to('.hero-h .word span', { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 0.15 })
        gsap.from('.hero__badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.1 })
        gsap.from('.hero__sub', { opacity: 0, y: 24, duration: 0.7, delay: 0.7 })
        gsap.from('.hero__cta > *', { opacity: 0, y: 24, duration: 0.6, stagger: 0.12, delay: 0.85 })
        gsap.from('.hero__stats > *', { opacity: 0, y: 24, duration: 0.6, stagger: 0.1, delay: 1 })
        gsap.from('.hero-card.main', { opacity: 0, scale: 0.92, duration: 1, ease: 'power3.out', delay: 0.3 })
        gsap.from('.hero-float', { opacity: 0, y: 30, duration: 0.7, stagger: 0.15, delay: 1.1 })

        // Counters
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
          ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => animateCounter(el) })
        })

        // Hero parallax
        gsap.to('.blob.b1', { yPercent: 30, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.to('.blob.b2', { yPercent: -25, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          gsap.to(el, { y: () => -60 * parseFloat(el.dataset.parallax || '0'), scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
        })

        // Member Journey — pinned storytelling
        const steps = gsap.utils.toArray<HTMLElement>('#journeySteps .j-step')
        ScrollTrigger.matchMedia({
          '(min-width: 769px)': () => {
            gsap.timeline({ scrollTrigger: { trigger: '.journey', start: 'top top', end: '+=1800', scrub: 0.6, pin: true, anticipatePin: 1 } })
              .to('#journeyFill', { width: '100%', ease: 'none' }, 0)
            ScrollTrigger.create({
              trigger: '.journey', start: 'top top', end: '+=1800', scrub: 0.6,
              onUpdate: (self) => steps.forEach((s, i) => s.classList.toggle('on', self.progress >= (i / steps.length) * 0.92)),
            })
          },
          '(max-width: 768px)': () => {
            steps.forEach((s) => s.classList.add('on'))
            ScrollTrigger.create({ trigger: '.journey', start: 'top 70%', once: true, onEnter: () => gsap.to('#journeyFill', { width: '100%', duration: 1.2, ease: 'power2.out' }) })
          },
        })
      })
    } else {
      // Reduced motion: finalize counters
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        el.innerHTML = el.dataset.count + `<span class="suf">${el.dataset.suffix || ''}</span>`
      })
      document.querySelectorAll('.j-step').forEach((s) => s.classList.add('on'))
      const jf = document.getElementById('journeyFill')
      if (jf) jf.style.width = '100%'
    }

    /* ---- Magnetic buttons ---- */
    const magnetics = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))
    const magHandlers: Array<() => void> = []
    if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
      magnetics.forEach((btn) => {
        const move = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect()
          const x = e.clientX - r.left - r.width / 2
          const y = e.clientY - r.top - r.height / 2
          btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35 - 2}px)`
        }
        const leave = () => { btn.style.transform = '' }
        btn.addEventListener('mousemove', move)
        btn.addEventListener('mouseleave', leave)
        magHandlers.push(() => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave) })
      })
    }
    cleanups.push(() => magHandlers.forEach((fn) => fn()))

    /* ---- Cleanup ---- */
    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      document.documentElement.classList.remove('gsap-ready')
    }
  }, [])

  return null
}
