// Año en footer
document.querySelectorAll('#year').forEach(n => n.textContent = new Date().getFullYear());

// Tema claro/oscuro
const themeBtn = document.getElementById('theme-toggle');
const KEY = 'theme';
const saved = localStorage.getItem(KEY);
if(saved) document.documentElement.dataset.theme = saved;
themeBtn?.addEventListener('click', ()=>{
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem(KEY, next);
});

// Scroll suave y marcado activo en sidenav
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      document.querySelectorAll('.sidenav .sn-link,[aria-current="page"]').forEach(l=>l.removeAttribute('aria-current'));
      document.querySelector(`.sidenav a[href="#${id}"]`)?.setAttribute('aria-current','page');
      document.querySelector(`.nav-mobile a[href="#${id}"]`)?.setAttribute('aria-current','page');
    }
  });
});

// Detecta sección visible para resaltar link en el menú lateral
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      document.querySelectorAll('.sidenav .sn-link').forEach(l=>l.removeAttribute('aria-current'));
      document.querySelector(`.sidenav a[href="#${entry.target.id}"]`)?.setAttribute('aria-current','page');
    }
  });
},{rootMargin:'-40% 0px -55% 0px', threshold:0});
document.querySelectorAll('main .section[id]').forEach(sec=>observer.observe(sec));
