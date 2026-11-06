/**
 * Scroll reveals, hero word animation, pointer parallax and card tilt.
 * Uses only CSS classes and CSSOM custom properties, so the strict CSP holds.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

// Header shadow once the page scrolls.
const header = document.querySelector('.site-header');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

if (!reduce) {
  // 1. Hero headline: wrap words so they can rise in one after another.
  const h1 = document.querySelector<HTMLElement>('.hero h1');
  if (h1 && !h1.dataset.split) {
    const words = (h1.textContent ?? '').trim().split(/\s+/);
    h1.setAttribute('aria-label', words.join(' '));
    h1.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = word;
      span.style.setProperty('--i', String(i));
      h1.append(span, i < words.length - 1 ? ' ' : '');
    });
    h1.dataset.split = 'true';
  }

  // 2. Scroll reveals. Groups of siblings get a stagger index.
  const groups: Array<[string, string?]> = [
    ['.hero__sub, .hero .lede, .hero .btn-row'],
    ['.section-head, .page-head, .prototypes__head, .more__head, .services__head, .lab__head'],
    ['.product-row__body', 'right'],
    ['.product-row__media', 'left'],
    ['.product-hero__text'],
    ['.product-hero__media', 'right'],
    ['.services__item, .service, .lab__list > li, .proto, .more__item, .ways__item, .step, .faq__item, .details__row, .review'],
    ['.built-for__inner, .cta-band__inner, .faq > h2, .reviews__title'],
  ];
  const targets: HTMLElement[] = [];
  for (const [selector, dir] of groups) {
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (el.dataset.reveal !== undefined) return;
      el.dataset.reveal = dir ?? '';
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const index = siblings.filter((s) => s.matches(selector)).indexOf(el);
      el.style.setProperty('--i', String(Math.min(Math.max(index, 0), 6)));
      targets.push(el);
    });
  }
  root.classList.add('motion-ready');

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => io.observe(el));

  if (finePointer) {
    // 3. Hero screens drift with the pointer at different depths.
    const stack = document.querySelector<HTMLElement>('.hero__stack');
    const hero = document.querySelector<HTMLElement>('.hero');
    if (stack && hero) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        stack.style.setProperty('--px', (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        stack.style.setProperty('--py', (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
      });
      hero.addEventListener('pointerleave', () => {
        stack.style.setProperty('--px', '0');
        stack.style.setProperty('--py', '0');
      });
    }

    // Service cards: glow follows the pointer.
    document.querySelectorAll<HTMLElement>('.service').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

    // 4. Product screenshots tilt toward the pointer.
    document.querySelectorAll<HTMLElement>('.product-row__media, .product-hero__media').forEach((media) => {
      const frame = media.querySelector<HTMLElement>('.frame');
      if (!frame) return;
      media.addEventListener('pointermove', (e) => {
        const r = media.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        frame.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`);
        frame.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
      });
      media.addEventListener('pointerleave', () => {
        frame.style.setProperty('--ry', '0deg');
        frame.style.setProperty('--rx', '0deg');
      });
    });
  }
}
