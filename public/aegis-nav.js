/* ============================================================
   AEGIS8 — Navbar v3 · Nueva identidad naranja
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
  <line x1="98" y1="104" x2="142" y2="104" stroke="rgba(240,120,48,0.3)" stroke-width="1.5">
    <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="2s" repeatCount="indefinite"/>
  </line>
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
  #aegis-nav.an-scrolled {
    background:rgba(8,12,20,0.98);
    border-bottom-color:rgba(240,120,48,0.18);
  }

  /* LOGO */
  #aegis-nav .an-logo {
    font-family:'JetBrains Mono',monospace;
    font-size:.9rem;font-weight:600;letter-spacing:4px;
    color:#eaf0f8;text-decoration:none;
    display:flex;align-items:center;gap:10px;flex-shrink:0;
  }
  #aegis-nav .an-logo .an-acc{color:#f07830;}
  #aegis-nav .an-logo:hover svg{filter:drop-shadow(0 0 14px rgba(240,120,48,.7))!important;}

  /* LINKS */
  #aegis-nav .an-links{display:flex;align-items:center;gap:1.75rem;list-style:none;}
  #aegis-nav .an-links a {
    font-family:'JetBrains Mono',monospace;
    font-size:.6rem;color:#5a6a80;
    text-decoration:none;letter-spacing:2px;text-transform:uppercase;
    transition:color .2s;position:relative;white-space:nowrap;
  }
  #aegis-nav .an-links a::after{
    content:'';position:absolute;bottom:-4px;left:0;right:0;
    height:1px;background:#f07830;
    transform:scaleX(0);transition:transform .3s;
  }
  #aegis-nav .an-links a:hover{color:#eaf0f8;}
  #aegis-nav .an-links a:hover::after{transform:scaleX(1);}

  /* Active */
  #aegis-nav .an-links a.an-active{
    color:#f07830;
    border:1px solid rgba(240,120,48,.28);
    padding:.28rem .65rem;border-radius:2px;
  }
  #aegis-nav .an-links a.an-active::after{display:none;}

  /* Agente IA pill */
  #aegis-nav .an-links a.an-agent{
    color:#f07830;
    border:1px solid rgba(240,120,48,.32);
    padding:.28rem .75rem;border-radius:2px;
    display:inline-flex;align-items:center;gap:.4rem;
    background:rgba(240,120,48,.04);
    transition:background .2s,border-color .2s;
  }
  #aegis-nav .an-links a.an-agent::before{
    content:'';width:5px;height:5px;border-radius:50%;
    background:#f07830;flex-shrink:0;
    animation:an-blink 1.5s step-end infinite;
  }
  #aegis-nav .an-links a.an-agent:hover{background:rgba(240,120,48,.12);border-color:rgba(240,120,48,.6);}
  #aegis-nav .an-links a.an-agent::after{display:none;}

  /* Educa */
  #aegis-nav .an-links a.an-educa{
    color:#38bdf8!important;
    border:1px solid rgba(56,189,248,.3);
    padding:.28rem .75rem;border-radius:2px;position:relative;
  }
  #aegis-nav .an-links a.an-educa:hover{color:#7dd3fc!important;}
  #aegis-nav .an-links a.an-educa::after{display:none;}
  .an-educa-dot{
    position:absolute;top:-5px;right:-5px;
    width:7px;height:7px;border-radius:50%;background:#38bdf8;
    animation:an-educa-p 2s ease-in-out infinite;
  }

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
    background:none;border:none;cursor:pointer!important;
    padding:6px;z-index:801;
  }
  #aegis-nav .an-burger span{
    display:block;width:22px;height:2px;
    background:#8898b0;border-radius:2px;transition:all .3s;
  }
  #aegis-nav .an-burger.an-open span:nth-child(1){transform:translateY(7px) rotate(45deg);background:#f07830;}
  #aegis-nav .an-burger.an-open span:nth-child(2){opacity:0;transform:scaleX(0);}
  #aegis-nav .an-burger.an-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);background:#f07830;}

  /* Mobile drawer */
  #an-drawer{
    display:none;position:fixed;
    top:64px;left:0;right:0;bottom:0;
    background:rgba(8,12,20,.98);
    backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
    z-index:799;
    flex-direction:column;align-items:center;justify-content:center;gap:2rem;
  }
  #an-drawer.an-open{display:flex;}
  #an-drawer a{
    font-family:'JetBrains Mono',monospace;
    font-size:.95rem;color:#5a6a80;
    text-decoration:none;letter-spacing:3px;text-transform:uppercase;
    transition:color .2s;padding:.4rem 0;
  }
  #an-drawer a:hover,#an-drawer a.an-m-active{color:#f07830;}
  #an-drawer a.an-m-agent{
    color:#f07830!important;
    border:1px solid rgba(240,120,48,.28);
    padding:.65rem 2rem;border-radius:2px;
    display:inline-flex;align-items:center;gap:.5rem;
  }
  #an-drawer a.an-m-agent::before{
    content:'';width:5px;height:5px;border-radius:50%;
    background:#f07830;animation:an-blink 1.5s step-end infinite;
  }
  #an-drawer a.an-m-educa{color:#38bdf8!important;}
  #an-drawer a.an-m-cta{
    color:#080c14!important;background:#f07830;
    padding:.85rem 2.5rem;border-radius:2px;font-size:.85rem;
  }

  /* Custom cursor */
  *,*::before,*::after{cursor:none!important;}
  #an-cur{
    position:fixed;z-index:9999;pointer-events:none;
    width:10px;height:10px;border-radius:50%;
    background:#f07830;transform:translate(-50%,-50%);
    opacity:0;transition:opacity .2s;
    left:-50px;top:-50px;
  }
  #an-ring{
    position:fixed;z-index:9998;pointer-events:none;
    width:36px;height:36px;border-radius:50%;
    border:1px solid rgba(240,120,48,.3);
    transform:translate(-50%,-50%);
    opacity:0;transition:width .15s,height .15s,border-color .15s;
    left:-50px;top:-50px;
  }

  body{padding-top:64px;}

  @keyframes an-blink{0%,100%{opacity:1;}50%{opacity:.15;}}
  @keyframes an-educa-p{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(1.5);}}

  @media(max-width:768px){
    #aegis-nav{padding:0 1.25rem;}
    #aegis-nav .an-links{display:none!important;}
    #aegis-nav .an-burger{display:flex!important;}
  }
`;

const LINKS = [
  {href:'/',                       label:'Inicio',      page:'index'},
  {href:'/propuesta.html',         label:'El Proyecto', page:'propuesta'},
  {href:'/educa.html',             label:'Educa',       page:'educa', educa:true},
  {href:'/talleres.html',          label:'Talleres',    page:'talleres'},
  {href:'/agente-seguridad.html',  label:'Agente IA',   page:'agente', agent:true},
  {href:'/contactos.html',         label:'Contacto',    page:'contacto', cta:true},
];

function init(){
  const style=document.createElement('style');
  style.textContent=CSS;
  document.head.appendChild(style);

  const page=document.body.dataset.page||'';

  // Desktop links
  const ul=document.createElement('ul');
  ul.className='an-links';
  LINKS.forEach(link=>{
    const li=document.createElement('li');
    const a=document.createElement('a');
    a.href=link.href;
    a.textContent=link.label;
    if(link.cta){a.className='an-cta';}
    else if(link.agent){a.className='an-agent';}
    else if(link.educa){
      a.className='an-educa';
      const dot=document.createElement('span');
      dot.className='an-educa-dot';
      a.appendChild(dot);
    }
    else if(link.page&&page===link.page){a.className='an-active';}
    li.appendChild(a);ul.appendChild(li);
  });

  // Mobile drawer
  const drawer=document.createElement('div');
  drawer.id='an-drawer';
  LINKS.forEach(link=>{
    const a=document.createElement('a');
    a.href=link.href;
    a.textContent=link.label;
    a.addEventListener('click',closeMenu);
    if(link.cta)a.className='an-m-cta';
    else if(link.agent)a.className='an-m-agent';
    else if(link.educa)a.className='an-m-educa';
    else if(link.page&&page===link.page)a.className='an-m-active';
    drawer.appendChild(a);
  });

  // Burger
  const burger=document.createElement('button');
  burger.className='an-burger';
  burger.setAttribute('aria-label','Menú');
  burger.innerHTML='<span></span><span></span><span></span>';
  burger.addEventListener('click',toggleMenu);

  // Nav
  const nav=document.createElement('nav');
  nav.id='aegis-nav';
  const logo=document.createElement('a');
  logo.href='/';logo.className='an-logo';
  logo.innerHTML=LOGO_SVG+'<span>AEGIS<span class="an-acc">8</span></span>';
  nav.appendChild(logo);nav.appendChild(ul);nav.appendChild(burger);

  // Clean up any existing
  document.getElementById('aegis-nav')?.remove();
  document.getElementById('an-drawer')?.remove();
  document.querySelector('nav')?.remove();

  document.body.insertAdjacentElement('afterbegin',drawer);
  document.body.insertAdjacentElement('afterbegin',nav);

  // Cursor
  const cur=document.createElement('div');cur.id='an-cur';
  const ring=document.createElement('div');ring.id='an-ring';
  document.body.appendChild(cur);document.body.appendChild(ring);

  let mx=0,my=0,rx=0,ry=0,alive=false;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cur.style.left=mx+'px';cur.style.top=my+'px';
    if(!alive){cur.style.opacity='1';ring.style.opacity='1';alive=true;}
  },true);
  (function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
  document.addEventListener('mouseleave',()=>{cur.style.opacity='0';ring.style.opacity='0';});
  document.addEventListener('mouseenter',()=>{if(alive){cur.style.opacity='1';ring.style.opacity='1';}});

  // Hover ring expand
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

  // Scroll darken
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('an-scrolled',window.scrollY>30);
  },{passive:true});
}

function toggleMenu(){
  const burger=document.querySelector('.an-burger');
  const drawer=document.getElementById('an-drawer');
  const open=drawer.classList.contains('an-open');
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
