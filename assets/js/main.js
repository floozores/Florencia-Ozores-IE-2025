// Año en footer (por si lo usas en alguna parte)
document.querySelectorAll('#year').forEach(n => n.textContent = new Date().getFullYear());

// Tema claro/oscuro (persistente)
const themeBtn = document.getElementById('theme-toggle');
const KEY = 'theme';
const saved = localStorage.getItem(KEY);
if(saved) document.documentElement.dataset.theme = saved;
themeBtn?.addEventListener('click', ()=>{
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem(KEY, next);
});

// Scroll suave + marcar link activo en sidenav y topbar
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      // actualizar estado activo
      document.querySelectorAll('.sidenav .sn-link,[aria-current="page"]').forEach(l=>l.removeAttribute('aria-current'));
      document.querySelector(`.sidenav a[href="#${id}"]`)?.setAttribute('aria-current','page');
      document.querySelector(`.nav-mobile a[href="#${id}"]`)?.setAttribute('aria-current','page');
    }
  });
});

// Observer para resaltar sección visible en el sidenav (desktop)
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      document.querySelectorAll('.sidenav .sn-link').forEach(l=>l.removeAttribute('aria-current'));
      document.querySelector(`.sidenav a[href="#${entry.target.id}"]`)?.setAttribute('aria-current','page');
    }
  });
},{rootMargin:'-40% 0px -55% 0px', threshold:0});
document.querySelectorAll('main .section[id]').forEach(sec=>observer.observe(sec));
