/* ============================================================
   AEGIS8 — Navbar compartida
   Incluir en todos los HTML con:
   <script src="/aegis-nav.js"></script>
   Agregar data-page="nombre" al <body> para marcar el activo
   ============================================================ */

(function() {

  const CSS = `
    /* ── AEGIS8 SHARED NAV ── */
    #aegis-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 800;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 3rem; height: 64px;
      background: rgba(4,6,10,0.95);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border, #131928);
    }

    #aegis-nav .an-logo {
      font-family: var(--font-mono, 'IBM Plex Mono', monospace);
      font-size: 1rem; color: var(--green, #00ff88);
      text-decoration: none; letter-spacing: 0.1em;
      display: flex; align-items: center; gap: 0.75rem;
      flex-shrink: 0;
    }

    #aegis-nav .an-logo-dot {
      width: 8px; height: 8px;
      background: var(--green, #00ff88); border-radius: 50%;
      animation: an-pulse 2s infinite;
    }

    @keyframes an-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.5); }
      50%       { box-shadow: 0 0 0 8px rgba(0,255,136,0); }
    }

    #aegis-nav .an-links {
      display: flex; align-items: center;
      gap: 2rem; list-style: none;
    }

    #aegis-nav .an-links a {
      font-family: var(--font-mono, 'IBM Plex Mono', monospace);
      font-size: 0.68rem; color: var(--muted, #4a5568);
      text-decoration: none; letter-spacing: 0.12em;
      text-transform: uppercase; transition: color 0.2s;
      position: relative; white-space: nowrap;
    }

    #aegis-nav .an-links a::after {
      content: ''; position: absolute;
      bottom: -4px; left: 0; right: 0;
      height: 1px; background: var(--green, #00ff88);
      transform: scaleX(0); transition: transform 0.3s;
    }

    #aegis-nav .an-links a:hover { color: var(--green, #00ff88); }
    #aegis-nav .an-links a:hover::after { transform: scaleX(1); }

    #aegis-nav .an-links a.an-active {
      color: var(--green, #00ff88);
      border: 1px solid rgba(0,255,136,0.3);
      padding: 0.3rem 0.7rem;
    }

    #aegis-nav .an-links a.an-active::after { display: none; }

    /* AGENTE IA — pill con punto parpadeante */
    #aegis-nav .an-links a.an-agent {
      color: var(--green, #00ff88);
      border: 1px solid rgba(0,255,136,0.35);
      padding: 0.3rem 0.8rem;
      display: inline-flex; align-items: center; gap: 0.45rem;
      background: rgba(0,255,136,0.05);
      transition: background 0.2s, border-color 0.2s;
    }

    #aegis-nav .an-links a.an-agent::before {
      content: '';
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--green, #00ff88);
      flex-shrink: 0;
      animation: an-blink 1.5s step-end infinite;
    }

    @keyframes an-blink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.15; }
    }

    #aegis-nav .an-links a.an-agent:hover {
      background: rgba(0,255,136,0.12);
      border-color: rgba(0,255,136,0.6);
      color: var(--green, #00ff88);
    }

    #aegis-nav .an-links a.an-agent::after { display: none; }

    /* Mobile agente IA */
    #aegis-mobile-menu a.m-agent {
      color: var(--green, #00ff88) !important;
      border: 1px solid rgba(0,255,136,0.3);
      padding: 0.6rem 1.8rem;
      display: inline-flex; align-items: center; gap: 0.5rem;
    }

    #aegis-mobile-menu a.m-agent::before {
      content: '';
      width: 5px; height: 5px; border-radius: 50%;
      background: var(--green, #00ff88);
      animation: an-blink 1.5s step-end infinite;
    }

    #aegis-nav .an-links a.an-cta {
      color: #000 !important;
      background: var(--green, #00ff88);
      padding: 0.4rem 1rem;
      transition: background 0.2s !important;
    }

    #aegis-nav .an-links a.an-cta:hover {
      background: var(--green2, #00cc6a) !important;
    }

    #aegis-nav .an-links a.an-cta::after { display: none; }

    /* EDUCA highlight */
    #aegis-nav .an-links a.an-educa {
      color: #38bdf8 !important;
      border: 1px solid rgba(56,189,248,0.35);
      padding: 0.3rem 0.8rem;
      position: relative;
    }
    #aegis-nav .an-links a.an-educa:hover { color: #7dd3fc !important; }
    #aegis-nav .an-links a.an-educa::after { display: none; }
    .an-educa-dot {
      position: absolute;
      top: -5px; right: -5px;
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #38bdf8;
      animation: an-educa-pulse 2s ease-in-out infinite;
    }
    @keyframes an-educa-pulse {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.3; transform:scale(1.5); }
    }
    #aegis-mobile-menu a.m-educa { color: #38bdf8 !important; }

    /* HAMBURGER */
    #aegis-nav .an-burger {
      display: none; flex-direction: column; gap: 5px;
      background: none; border: none; cursor: pointer;
      padding: 6px; z-index: 801;
    }

    #aegis-nav .an-burger span {
      display: block; width: 22px; height: 2px;
      background: var(--green, #00ff88);
      transition: all 0.3s ease;
    }

    #aegis-nav .an-burger.open span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    #aegis-nav .an-burger.open span:nth-child(2) { opacity: 0; }
    #aegis-nav .an-burger.open span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    /* MOBILE OVERLAY */
    #aegis-mobile-menu {
      display: none;
      position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
      background: rgba(4,6,10,0.98);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      z-index: 799;
      flex-direction: column;
      align-items: center; justify-content: center;
      gap: 2rem;
    }

    #aegis-mobile-menu.open { display: flex; }

    #aegis-mobile-menu a {
      font-family: var(--font-mono, 'IBM Plex Mono', monospace);
      font-size: 1.1rem; color: var(--muted, #4a5568);
      text-decoration: none; letter-spacing: 0.15em;
      text-transform: uppercase; transition: color 0.2s;
    }

    #aegis-mobile-menu a:hover { color: var(--green, #00ff88); }
    #aegis-mobile-menu a.m-active { color: var(--green, #00ff88); }

    #aegis-mobile-menu a.m-cta {
      color: #000 !important;
      background: var(--green, #00ff88);
      padding: 0.85rem 2.5rem;
      font-size: 0.9rem;
    }

    /* RESPONSIVE */
    @media (max-width: 768px) {
      #aegis-nav { padding: 0 1.2rem; }
      #aegis-nav .an-links { display: none !important; }
      #aegis-nav .an-burger { display: flex !important; }
    }
  `;

  const LINKS = [
    { href: '/',                      label: 'Inicio',    page: 'index' },
    { href: '/#amenazas',             label: 'Amenazas',  page: null },
    { href: '/propuesta.html',        label: 'Propuesta', page: 'propuesta' },
    { href: '/formacion.html',        label: 'Formación', page: 'formacion' },
    { href: '/educa.html',            label: 'Educa',     page: 'educa', educa: true },
    { href: '/agente-seguridad.html', label: 'Agente IA', page: 'agente', agent: true },
    { href: '/contactos.html',        label: 'Contacto',  page: 'contacto', cta: true },
  ];

  function init() {
    const currentPage = document.body.dataset.page || '';

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Build desktop links
    const ul = document.createElement('ul');
    ul.className = 'an-links';

    LINKS.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      if (link.cta) a.className = 'an-cta';
      else if (link.agent) a.className = 'an-agent';
      else if (link.educa) {
        a.className = 'an-educa';
        // Dot badge
        const dot = document.createElement('span');
        dot.className = 'an-educa-dot';
        a.appendChild(dot);
      }
      else if (link.page && currentPage === link.page) a.className = 'an-active';
      li.appendChild(a);
      ul.appendChild(li);
    });

    // Build mobile links
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'aegis-mobile-menu';

    LINKS.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.label;
      a.onclick = () => closeMenu();
      if (link.cta) a.className = 'm-cta';
      else if (link.agent) a.className = 'm-agent';
      else if (link.educa) a.className = 'm-educa';
      else if (link.page && currentPage === link.page) a.className = 'm-active';
      mobileMenu.appendChild(a);
    });

    // Build hamburger
    const burger = document.createElement('button');
    burger.className = 'an-burger';
    burger.setAttribute('aria-label', 'Menú');
    burger.innerHTML = '<span></span><span></span><span></span>';
    burger.onclick = toggleMenu;

    // Build nav
    const nav = document.createElement('nav');
    nav.id = 'aegis-nav';

    const logo = document.createElement('a');
    logo.href = '/';
    logo.className = 'an-logo';
    logo.innerHTML = '<div class="an-logo-dot"></div>AEGIS8';

    nav.appendChild(logo);
    nav.appendChild(ul);
    nav.appendChild(burger);

    // Remove existing nav if any
    const existingNav = document.querySelector('nav');
    if (existingNav) existingNav.remove();

    document.body.insertAdjacentElement('afterbegin', mobileMenu);
    document.body.insertAdjacentElement('afterbegin', nav);

    // Add top padding to body so content clears the fixed nav
    document.body.style.paddingTop = document.body.style.paddingTop || '64px';
  }

  function toggleMenu() {
    const burger = document.querySelector('.an-burger');
    const menu = document.getElementById('aegis-mobile-menu');
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      burger.classList.add('open');
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    const burger = document.querySelector('.an-burger');
    const menu = document.getElementById('aegis-mobile-menu');
    burger.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
