/* ============================================================
   AEGIS8 — Navbar v5 · Reestructuración 10 páginas
   <script src="/aegis-nav.js"></script>
   data-page="nombre" en <body>
   ============================================================ */
(function(){

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="none" width="34" height="34" style="flex-shrink:0;transition:filter .3s;">
  <defs>
    <linearGradient id="nav-g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5c842"/>
      <stop offset="100%" stop-color="#f07830"/>
    </linearGradient>
  </defs>
  <path d="M120 14 C98 14 64 23 40 36 L22 47 L22 124 C22 164 70 190 120 214 C170 190 218 164 218 124 L218 47 L200 36 C176 23 142 14 120 14 Z"
    fill="#0d1422" stroke="url(#nav-g)" stroke-width="3">
    <animate attributeName="stroke-opacity" values="0.55;1;0.55" dur="3s" repeatCount="indefinite"/>
  </path>
  <path d="M120 58 C104 58 92 67 92 80 C92 89 98 96 108 101 C98 106 90 115 90 126 C90 142 104 153 120 153 C136 153 150 142 150 126 C150 115 142 106 132 101 C142 96 148 89 148 80 C148 67 136 58 120 58 Z"
    fill="none" stroke="url(#nav-g)" stroke-width="4" stroke-linejoin="round">
    <animate attributeName="stroke-opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite"/>
  </path>
  <polyline points="42,58 42,44 56,44" fill="none" stroke="#f07830" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite"/>
  </polyline>
  <polyline points="198,58 198,44 184,44" fill="none" stroke="#f07830" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="3.5s" repeatCount="indefinite" begin="0.8s"/>
  </polyline>
</svg>`;

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');

  #aegis-nav {
    position:fixed;top:0;left:0;right:0;z-index:800;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 2.5rem;height:64px;
    background:rgba(8,12,20,0.9);
    backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    border-bottom:1px solid rgba(240,120,48,0.1);
    transition:background .3s,border-color .3s;
  }
  #aegis-nav.an-scrolled{background:rgba(8,12,20,0.98);border-bottom-color:rgba(240,120,48,0.18);}

  #aegis-nav .an-logo{
    font-family:'JetBrains Mono',monospace;font-size:.88rem;font-weight:600;letter-spacing:4px;
    color:#eaf0f8;text-decoration:none;display:flex;align-items:center;gap:10px;flex-shrink:0;
  }
  #aegis-nav .an-logo .an-acc{color:#f07830;}
  #aegis-nav .an-logo:hover svg{filter:drop-shadow(0 0 14px rgba(240,120,48,.7))!important;}

  #aegis-nav .an-links{display:flex;align-items:center;gap:0;list-style:none;}

  #aegis-nav .an-links a{
    font-family:'JetBrains Mono',monospace;font-size:.58rem;color:#5a6a80;
    text-decoration:none;letter-spacing:2px;text-transform:uppercase;
    transition:color .2s;position:relative;white-space:nowrap;
    padding:0 .9rem;
  }
  #aegis-nav .an-links a::after{
    content:'';position:absolute;bottom:-4px;left:.9rem;right:.9rem;
    height:1px;background:#f07830;transform:scaleX(0);transition:transform .3s;
  }
  #aegis-nav .an-links a:hover{color:#eaf0f8;}
  #aegis-nav .an-links a:hover::after{transform:scaleX(1);}

  /* Dropdown */
  #aegis-nav .an-has-drop{position:relative;}
  #aegis-nav .an-has-drop > a::before{
    content:'▾';font-size:.45rem;margin-left:4px;opacity:.5;
    vertical-align:middle;display:inline-block;
  }
  #aegis-nav .an-drop{
    display:none;position:absolute;top:calc(100% + 12px);left:0;
    background:rgba(8,12,20,.98);border:1px solid rgba(240,120,48,.2);
    border-radius:4px;min-width:220px;z-index:900;
    box-shadow:0 16px 40px rgba(0,0,0,.5);
    padding:6px 0;
  }
  #aegis-nav .an-has-drop:hover .an-drop{display:block;}
  #aegis-nav .an-drop a{
    display:block;padding:.6rem 1.25rem;font-size:.58rem;color:#5a6a80;
    letter-spacing:2px;text-transform:uppercase;text-decoration:none;
    transition:color .15s,background .15s;white-space:nowrap;
  }
  #aegis-nav .an-drop a:hover{color:#eaf0f8;background:rgba(240,120,48,.06);}
  #aegis-nav .an-drop a::after{display:none;}
  .an-drop-div{height:1px;background:rgba(240,120,48,.1);margin:5px 0;}

  /* Active */
  #aegis-nav .an-links a.an-active{color:#f07830;}
  #aegis-nav .an-links a.an-active::after{display:none;}

  /* Agente IA pill */
  #aegis-nav .an-links a.an-agent{
    color:#f07830;border:1px solid rgba(240,120,48,.32);
    padding:.28rem .75rem;border-radius:2px;
    display:inline-flex;align-items:center;gap:.4rem;
    background:rgba(240,120,48,.04);transition:background .2s,border-color .2s;
  }
  #aegis-nav .an-links a.an-agent::before{
    content:'';width:5px;height:5px;border-radius:50%;background:#f07830;flex-shrink:0;
    animation:an-blink 1.5s step-end infinite;
  }
  #aegis-nav .an-links a.an-agent:hover{background:rgba(240,120,48,.12);border-color:rgba(240,120,48,.6);}
  #aegis-nav .an-links a.an-agent::after{display:none;}

  /* CTA */
  #aegis-nav .an-links a.an-cta{
    color:#080c14!important;background:#f07830;
    padding:.38rem 1rem;border-radius:2px;
    transition:background .2s,box-shadow .2s!important;
  }
  #aegis-nav .an-links a.an-cta:hover{background:#d4611a!important;box-shadow:0 0 20px rgba(240,120,48,.4);}
  #aegis-nav .an-links a.an-cta::after{display:none;}

  /* Burger */
  #aegis-nav .an-burger{
    display:none;flex-direction:column;gap:5px;
    background:none;border:none;cursor:pointer!important;padding:6px;z-index:801;
  }
  #aegis-nav .an-burger span{
    display:block;width:22px;height:2px;background:#8898b0;border-radius:2px;transition:all .3s;
  }
  #aegis-nav .an-burger.an-open span:nth-child(1){transform:translateY(7px) rotate(45deg);background:#f07830;}
  #aegis-nav .an-burger.an-open span:nth-child(2){opacity:0;transform:scaleX(0);}
  #aegis-nav .an-burger.an-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);background:#f07830;}

  /* Mobile drawer */
  #an-drawer{
    display:none;position:fixed;top:64px;left:0;right:0;bottom:0;
    background:rgba(8,12,20,.98);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    z-index:799;flex-direction:column;align-items:stretch;
    overflow-y:auto;padding:0;
  }
  #an-drawer.an-open{display:flex;}

  /* Item principal */
  #an-drawer .m-item{
    font-family:'JetBrains Mono',monospace;font-size:.78rem;color:#8898b0;
    text-decoration:none;letter-spacing:3px;text-transform:uppercase;
    transition:color .2s;padding:1.1rem 2rem;
    border-bottom:1px solid rgba(58,127,212,.08);
    display:flex;align-items:center;justify-content:space-between;
    width:100%;
  }
  #an-drawer .m-item:hover,#an-drawer .m-item.an-m-active{color:#f07830;}

  /* Grupo acordeón */
  #an-drawer .m-group{border-bottom:1px solid rgba(58,127,212,.08);}
  #an-drawer .m-group-btn{
    font-family:'JetBrains Mono',monospace;font-size:.78rem;color:#8898b0;
    letter-spacing:3px;text-transform:uppercase;
    transition:color .2s;padding:1.1rem 2rem;
    display:flex;align-items:center;justify-content:space-between;
    width:100%;background:none;border:none;cursor:pointer;text-align:left;
  }
  #an-drawer .m-group-btn:hover{color:#eaf0f8;}
  #an-drawer .m-group-btn.open{color:#f07830;}
  #an-drawer .m-group-btn .m-chevron{
    font-size:.6rem;opacity:.5;transition:transform .25s;
  }
  #an-drawer .m-group-btn.open .m-chevron{transform:rotate(180deg);opacity:1;}

  /* Sub-ítems */
  #an-drawer .m-subs{
    display:none;background:rgba(255,255,255,.02);
    border-top:1px solid rgba(58,127,212,.06);
  }
  #an-drawer .m-subs.open{display:block;}
  #an-drawer .m-sub{
    font-family:'JetBrains Mono',monospace;font-size:.68rem;color:#4a5a70;
    text-decoration:none;letter-spacing:2px;text-transform:uppercase;
    transition:color .2s;padding:.85rem 2rem .85rem 2.5rem;
    display:block;border-bottom:1px solid rgba(58,127,212,.05);
  }
  #an-drawer .m-sub:last-child{border-bottom:none;}
  #an-drawer .m-sub:hover{color:#8898b0;}

  #an-drawer .m-agent{color:#f07830!important;}
  #an-drawer .m-red{color:#ef4444!important;}
  #an-drawer .m-purple{color:#9b6dff!important;}

  #an-drawer .m-cta{
    font-family:'JetBrains Mono',monospace;font-size:.78rem;letter-spacing:3px;
    text-transform:uppercase;color:#080c14!important;background:#f07830;
    padding:1.1rem 2rem;display:block;text-decoration:none;
    text-align:center;margin:1.5rem 2rem;border-radius:2px;
  }

  /* Custom cursor */
  *,*::before,*::after{cursor:none!important;}
  #an-cur{position:fixed;z-index:9999;pointer-events:none;width:10px;height:10px;border-radius:50%;
    background:#f07830;transform:translate(-50%,-50%);opacity:0;left:-50px;top:-50px;}
  #an-ring{position:fixed;z-index:9998;pointer-events:none;width:36px;height:36px;border-radius:50%;
    border:1px solid rgba(240,120,48,.3);transform:translate(-50%,-50%);
    opacity:0;transition:width .15s,height .15s,border-color .15s;left:-50px;top:-50px;}

  body{padding-top:64px;}
  @keyframes an-blink{0%,100%{opacity:1;}50%{opacity:.15;}}

  @media(max-width:900px){
    #aegis-nav{padding:0 1.25rem;}
    #aegis-nav .an-links{display:none!important;}
    #aegis-nav .an-burger{display:flex!important;}
  }
`;

// ── ESTRUCTURA DESKTOP (10 páginas) ──
const NAV = [
  {
    label: 'Educa',
    href: '/ninos',
    page: 'educa',
    drop: [
      {href:'/ninos',        label:'Niños 6–12'},
      {href:'/adolescentes', label:'Adolescentes'},
      {href:'/familias',     label:'Familias'},
      {href:'/docentes',     label:'Docentes'},
      'div',
      {href:'/educa/newsletter.html', label:'Newsletter mensual'},
    ]
  },
  {
    label: 'Herramientas',
    href: '/herramientas',
    page: 'herramientas',
    drop: [
      {href:'/agente-seguridad.html',    label:'Agente de Seguridad', agent:true},
      {href:'/analizador-phishing.html', label:'Analizador de Phishing'},
      'div',
      {href:'/quiz.html',                label:'Quiz Semanal'},
      {href:'/checklist.html',           label:'Checklist Familiar'},
      {href:'/caps.html',                label:'CAPS · Contraseñas'},
      'div',
      {href:'/botiquin',                 label:'Botiquín SOS',         red:true},
      {href:'/violencia-digital',        label:'Violencia Digital',    purple:true},
    ]
  },
  {href:'/noticias',      label:'Noticias',     page:'noticias'},
  {href:'/el-proyecto',   label:'El Proyecto',  page:'proyecto'},
  {href:'/talleres.html', label:'Talleres',      page:'talleres'},
  {href:'/contacto',      label:'Contacto',      cta:true},
];

function buildDesktop(page, ul) {
  NAV.forEach(item => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';

    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;

    if (item.cta) {
      a.className = 'an-cta';
    } else if (item.page && page === item.page) {
      a.className = 'an-active';
    }

    li.appendChild(a);

    if (item.drop) {
      li.className = 'an-has-drop';
      const drop = document.createElement('div');
      drop.className = 'an-drop';
      item.drop.forEach(d => {
        if (d === 'div') {
          const div = document.createElement('div');
          div.className = 'an-drop-div';
          drop.appendChild(div);
        } else {
          const da = document.createElement('a');
          da.href = d.href;
          da.textContent = d.label;
          if (d.agent)  da.style.color = '#f07830';
          if (d.purple) da.style.color = '#9b6dff';
          if (d.red)    da.style.color = '#ef4444';
          drop.appendChild(da);
        }
      });
      li.appendChild(drop);
    }

    ul.appendChild(li);
  });
}

function buildMobile(page, drawer) {

  const GROUPS = [
    {
      label: 'Educa',
      pg: 'educa',
      subs: [
        {href:'/ninos',        label:'Niños 6–12'},
        {href:'/adolescentes', label:'Adolescentes'},
        {href:'/familias',     label:'Familias'},
        {href:'/docentes',     label:'Docentes'},
        {href:'/educa/newsletter.html', label:'Newsletter'},
      ]
    },
    {
      label: 'Herramientas',
      pg: 'herramientas',
      subs: [
        {href:'/agente-seguridad.html',    label:'Agente IA',           agent:true},
        {href:'/quiz.html',                label:'Quiz Semanal'},
        {href:'/checklist.html',           label:'Checklist'},
        {href:'/analizador-phishing.html', label:'Analizador Phishing'},
        {href:'/caps.html',                label:'CAPS · Contraseñas'},
        {href:'/botiquin',                 label:'Botiquín SOS',         red:true},
        {href:'/violencia-digital',        label:'Violencia Digital',    purple:true},
      ]
    },
  ];

  const DIRECT = [
    {href:'/noticias',     label:'Noticias',     pg:'noticias'},
    {href:'/el-proyecto',  label:'El Proyecto',  pg:'proyecto'},
    {href:'/talleres.html',label:'Talleres',      pg:'talleres'},
  ];

  // Inicio
  const inicio = document.createElement('a');
  inicio.href = '/';
  inicio.textContent = 'Inicio';
  inicio.className = 'm-item' + (page === 'home' ? ' an-m-active' : '');
  inicio.addEventListener('click', closeMenu);
  drawer.appendChild(inicio);

  // Grupos acordeón
  GROUPS.forEach(function(group) {
    const wrap = document.createElement('div');
    wrap.className = 'm-group';

    const btn = document.createElement('button');
    btn.className = 'm-group-btn' + (page === group.pg ? ' open' : '');
    btn.innerHTML = group.label + '<span class="m-chevron">▾</span>';

    const subs = document.createElement('div');
    subs.className = 'm-subs' + (page === group.pg ? ' open' : '');

    group.subs.forEach(function(sub) {
      const a = document.createElement('a');
      a.href = sub.href;
      a.textContent = sub.label;
      let cls = 'm-sub';
      if (sub.agent)  cls += ' m-agent';
      if (sub.red)    cls += ' m-red';
      if (sub.purple) cls += ' m-purple';
      a.className = cls;
      a.addEventListener('click', closeMenu);
      subs.appendChild(a);
    });

    btn.addEventListener('click', function() {
      const isOpen = btn.classList.contains('open');
      drawer.querySelectorAll('.m-group-btn').forEach(function(b) { b.classList.remove('open'); });
      drawer.querySelectorAll('.m-subs').forEach(function(s) { s.classList.remove('open'); });
      if (!isOpen) {
        btn.classList.add('open');
        subs.classList.add('open');
      }
    });

    wrap.appendChild(btn);
    wrap.appendChild(subs);
    drawer.appendChild(wrap);
  });

  // Links directos
  DIRECT.forEach(function(item) {
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    a.className = 'm-item';
    if (page === item.pg) a.classList.add('an-m-active');
    a.addEventListener('click', closeMenu);
    drawer.appendChild(a);
  });

  // CTA Contacto
  const cta = document.createElement('a');
  cta.href = '/contacto';
  cta.textContent = 'Contacto';
  cta.className = 'm-cta';
  cta.addEventListener('click', closeMenu);
  drawer.appendChild(cta);
}

function init(){
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const page = document.body.dataset.page || '';

  const ul = document.createElement('ul');
  ul.className = 'an-links';
  buildDesktop(page, ul);

  const drawer = document.createElement('div');
  drawer.id = 'an-drawer';
  buildMobile(page, drawer);

  const burger = document.createElement('button');
  burger.className = 'an-burger';
  burger.setAttribute('aria-label','Menú');
  burger.innerHTML = '<span></span><span></span><span></span>';
  burger.addEventListener('click', toggleMenu);

  const nav = document.createElement('nav');
  nav.id = 'aegis-nav';

  const logo = document.createElement('a');
  logo.href = '/';
  logo.className = 'an-logo';
  logo.innerHTML = LOGO_SVG + '<span>AEGIS<span class="an-acc">8</span></span>';

  nav.appendChild(logo);
  nav.appendChild(ul);
  nav.appendChild(burger);

  document.getElementById('aegis-nav')?.remove();
  document.getElementById('an-drawer')?.remove();

  document.body.insertAdjacentElement('afterbegin', drawer);
  document.body.insertAdjacentElement('afterbegin', nav);

  // Custom cursor
  const cur = document.createElement('div'); cur.id = 'an-cur';
  const ring = document.createElement('div'); ring.id = 'an-ring';
  document.body.appendChild(cur);
  document.body.appendChild(ring);

  let mx=0,my=0,rx=0,ry=0,alive=false;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cur.style.left=mx+'px';cur.style.top=my+'px';
    if(!alive){cur.style.opacity='1';ring.style.opacity='1';alive=true;}
  },true);
  (function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
  document.addEventListener('mouseleave',()=>{cur.style.opacity='0';ring.style.opacity='0';});
  document.addEventListener('mouseenter',()=>{if(alive){cur.style.opacity='1';ring.style.opacity='1';}});
  document.addEventListener('mouseover',e=>{
    if(e.target.closest('a,button,[role=button]')){
      ring.style.width='50px';ring.style.height='50px';ring.style.borderColor='#f07830';
    }
  });
  document.addEventListener('mouseout',e=>{
    if(e.target.closest('a,button,[role=button]')){
      ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='rgba(240,120,48,.3)';
    }
  });

  window.addEventListener('scroll',()=>{
    nav.classList.toggle('an-scrolled', window.scrollY > 30);
  },{passive:true});
}

function toggleMenu(){
  const burger = document.querySelector('.an-burger');
  const drawer = document.getElementById('an-drawer');
  const open = drawer.classList.contains('an-open');
  if(open){closeMenu();}
  else{burger.classList.add('an-open');drawer.classList.add('an-open');document.body.style.overflow='hidden';}
}

function closeMenu(){
  document.querySelector('.an-burger')?.classList.remove('an-open');
  document.getElementById('an-drawer')?.classList.remove('an-open');
  document.body.style.overflow='';
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{init();}
})();
