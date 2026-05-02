// ─── Auto-calculate age (nacido en 1997) ─────────────────────
const birthYear = 1997, birthMonth = 0, birthDay = 1; // ajusta mes/día si quieres
const today = new Date();
let age = today.getFullYear() - birthYear;
if (today.getMonth() < birthMonth || (today.getMonth() === birthMonth && today.getDate() < birthDay)) age--;
document.querySelectorAll('#edad, #edad2').forEach(el => el.textContent = age);

// ─── Scroll reveal on viewport entry ─────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ─── Compact navbar on scroll ────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('compact', scrollY > 60));

// ─── Active nav link highlight ───────────────────────────────
const secs = document.querySelectorAll('section[id], header[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

// ─── Mobile burger menu ──────────────────────────────────────
document.getElementById('burger').addEventListener('click', () =>
  document.getElementById('mobileNav').classList.toggle('open'));

document.querySelectorAll('#mobileNav a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('open')));

// ─── Auto-update copyright year ──────────────────────────────
const currentYear = new Date().getFullYear();
document.querySelector('.footer-txt').textContent = `© ${currentYear} Jon Garcia — Todos los derechos reservados.`;