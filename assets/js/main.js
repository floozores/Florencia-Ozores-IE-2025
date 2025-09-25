// Año en footer
document.querySelectorAll('#year').forEach(n => n.textContent = new Date().getFullYear());

/* =========================
   Drawer lateral derecho
   ========================= */
const fab = document.getElementById('fabHome');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawerOverlay');

function openDrawer(){
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden','false');
}
function closeDrawer(){
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden','true');
}

fab?.addEventListener('click', ()=>{
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
overlay?.addEventListener('click', closeDrawer);

// FORZAR redirección/scroll a secciones (sin depender del comportamiento por defecto)
drawer?.querySelectorAll('.drawer-nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const hash = a.getAttribute('href');
    const id = hash ? hash.slice(1) : null;
    const el = id ? document.getElementById(id) : null;
    if(el){
      e.preventDefault();                       // evitamos interferencias
      el.scrollIntoView({behavior:'smooth', block:'start'});
      // Actualiza la URL (sin provocar otro salto)
      history.replaceState(null, '', '#' + id);
      closeDrawer();
    }
  });
});

// ESC para cerrar el drawer
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
});

/* =========================
   Banner Canvas Animado
   ========================= */
(function(){
  const canvas = document.getElementById('heroCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = {
    blue: getCssVar('--brand') || '#1d4ed8',
    sky:  getCssVar('--accent') || '#60a5fa',
    bg:   '#ffffff'
  };

  let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let W = 0, H = 0;
  let circles = [];

  function getCssVar(name){
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function resize(){
    const rect = canvas.getBoundingClientRect();
    W = Math.floor(rect.width);
    H = Math.floor(rect.height);
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    initCircles();
  }

  function rand(a,b){ return a + Math.random()*(b-a); }

  function initCircles(){
    const count = Math.max(28, Math.round(W/18));
    circles = [];
    for(let i=0;i<count;i++){
      const r = rand(6, 16);
      circles.push({
        x: rand(r, W-r),
        y: rand(r, H-r),
        r,
        vx: rand(-0.7, 0.7),
        vy: rand(-0.7, 0.7),
        color: Math.random() < 0.5 ? COLORS.blue : COLORS.sky
      });
    }
  }

  function step(){
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0,0,W,H);

    for(const c of circles){
      c.x += c.vx; c.y += c.vy;
      if(c.x < c.r || c.x > W - c.r) c.vx *= -1;
      if(c.y < c.r || c.y > H - c.r) c.vy *= -1;

      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
      ctx.fillStyle = c.color;
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  resize();
  step();
})();
