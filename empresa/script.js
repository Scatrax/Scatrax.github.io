// ─── Hero carousel: fundido + desplazamiento derecha → izquierda ─
const SLIDE_MS = 6000;
const slides = [...document.querySelectorAll('#heroSlides .slide')];
const dotsBox = document.getElementById('heroDots');
const caption = document.getElementById('heroCaption');
let current = 0, timer;

dotsBox.style.setProperty('--slide-ms', SLIDE_MS + 'ms');
const dots = slides.map((s, i) => {
  const b = document.createElement('button');
  b.className = 'hero-dot';
  b.setAttribute('aria-label', s.dataset.title);
  b.addEventListener('click', () => { goTo(i); restart(); });
  dotsBox.appendChild(b);
  return b;
});

function setCaption(slide) {
  caption.classList.add('fade');
  setTimeout(() => {
    caption.querySelector('.hc-tag').textContent = slide.dataset.tag;
    caption.querySelector('.hc-title').textContent = slide.dataset.title;
    caption.classList.remove('fade');
  }, 400);
}

function goTo(i) {
  const prev = slides[current];
  if (i !== current) {
    slides.forEach(s => s.classList.remove('leaving'));
    prev.classList.remove('active');
    prev.classList.add('leaving');
  }
  current = i;
  const next = slides[current];
  loadSlide(next);
  // Reinicia la animación de desplazamiento
  next.classList.remove('active');
  void next.offsetWidth;
  next.classList.add('active');
  dots.forEach((d, k) => {
    d.classList.remove('active');
    if (k === current) { void d.offsetWidth; d.classList.add('active'); }
  });
  setCaption(next);
}

function restart() {
  clearInterval(timer);
  timer = setInterval(() => goTo((current + 1) % slides.length), SLIDE_MS);
}

// Las imágenes del resto de diapositivas se cargan cuando la página ya está lista
function loadSlide(slide) {
  const img = slide.querySelector('img[data-src]');
  if (!img) return;
  img.srcset = img.dataset.srcset;
  img.src = img.dataset.src;
  img.removeAttribute('data-src');
}
window.addEventListener('load', () => slides.forEach(loadSlide));

goTo(0);
restart();
document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : restart());

// ─── Navbar sólida al hacer scroll ─────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Enlace activo en el menú ──────────────────────────────────
const secs = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 140) cur = s.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

// ─── Menú móvil ────────────────────────────────────────────────
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// ─── Aparición al hacer scroll + contadores ────────────────────
function countUp(el) {
  const end = +el.dataset.count, start = performance.now(), dur = 1400;
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ─── Formulario: abre el correo con el mensaje preparado ──────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = `Consulta web — ${f.get('empresa') || f.get('nombre')}`;
  const body = `Nombre: ${f.get('nombre')}\nEmpresa: ${f.get('empresa')}\nEmail: ${f.get('email')}\n\n${f.get('mensaje')}`;
  location.href = `mailto:cv@elprogramador.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// ─── Año del copyright ─────────────────────────────────────────
document.getElementById('copy').textContent = `© ${new Date().getFullYear()} JG Automatización. Todos los derechos reservados.`;
