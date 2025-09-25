// Año en footer
document.querySelectorAll('#year').forEach(n => n.textContent = new Date().getFullYear());

// Drawer
const fab = document.getElementById('fabHome');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('drawerOverlay');

function openDrawer(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');}
function closeDrawer(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');}

fab?.addEventListener('click', ()=>{drawer.classList.contains('open')?closeDrawer():openDrawer();});
overlay?.addEventListener('click', closeDrawer);

// Navegación interna
drawer?.querySelectorAll('.drawer-nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id=a.getAttribute('href').slice(1);
    const el=document.getElementById(id);
    if(el){
      el.scrollIntoView({behavior:'smooth',block:'start'});
      closeDrawer();
    }
  });
});

// ESC para cerrar
document.addEventListener('keydown', e=>{if(e.key==="Escape"&&drawer.classList.contains('open'))closeDrawer();});

// Banner canvas animado
(function(){
  const canvas=document.getElementById('heroCanvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const COLORS={blue:getCssVar('--brand')||'#1d4ed8',sky:getCssVar('--accent')||'#60a5fa',bg:'#ffffff'};
  let DPR=Math.max(1,Math.min(2,window.devicePixelRatio||1)),W=0,H=0,circles=[];
  function getCssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();}
  function resize(){const r=canvas.getBoundingClientRect();W=Math.floor(r.width);H=Math.floor(r.height);canvas.width=W*DPR;canvas.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);initCircles();}
  function rand(a,b){return a+Math.random()*(b-a);}
  function initCircles(){const c=Math.max(28,Math.round(W/18));circles=[];for(let i=0;i<c;i++){const r=rand(6,16);circles.push({x:rand(r,W-r),y:rand(r,H-r),r,vx:rand(-.7,.7),vy:rand(-.7,.7),color:Math.random()<.5?COLORS.blue:COLORS.sky});}}
  function step(){ctx.fillStyle=COLORS.bg;ctx.fillRect(0,0,W,H);for(const c of circles){c.x+=c.vx;c.y+=c.vy;if(c.x<c.r||c.x>W-c.r)c.vx*=-1;if(c.y<c.r||c.y>H-c.r)c.vy*=-1;ctx.beginPath();ctx.arc(c.x,c.y,c.r,0,Math.PI*2);ctx.fillStyle=c.color;ctx.fill();}requestAnimationFrame(step);}
  window.addEventListener('resize',resize);resize();step();
})();
