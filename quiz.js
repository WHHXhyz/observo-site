// ══════════════════════════════════════════════════════════════
// Aegis8 · Quiz Semanal
// Carga preguntas desde amenaza.json (campo "quiz")
// Score y racha se guardan en localStorage
// ══════════════════════════════════════════════════════════════

const AegisQuiz = (() => {

  const KEY_SCORE  = 'aegis8_quiz_score';
  const KEY_BEST   = 'aegis8_quiz_best';
  const KEY_RACHA  = 'aegis8_quiz_racha';
  const KEY_WEEK   = 'aegis8_quiz_week';
  const KEY_DONE   = 'aegis8_quiz_done';

  // Preguntas de fallback si amenaza.json no tiene quiz
  const FALLBACK = [
    {
      p: '¿Cuál es la señal más clara de un correo de phishing?',
      ops: ['El asunto está en mayúsculas','El dominio del remitente no coincide con la empresa','Tiene muchas imágenes','Llegó en la noche'],
      ok: 1,
      exp: 'El dominio del remitente es la señal más confiable. "banco-chile-alerta.com" no es el Banco de Chile aunque el nombre diga lo contrario.'
    },
    {
      p: '¿Qué debes hacer ANTES de borrar mensajes de un agresor digital?',
      ops: ['Borrarlos inmediatamente para no verlos más','Contestar para tener más evidencia','Guardar capturas de pantalla con fecha visible','Bloquear y ya'],
      ok: 2,
      exp: 'Los mensajes son evidencia legal. Siempre captura antes de borrar o bloquear.'
    },
    {
      p: 'Una app de linterna pide acceso a tus contactos y ubicación. ¿Qué haces?',
      ops: ['Acepto, necesito la linterna','Niego los permisos innecesarios','Desinstalo el celular','La comparto con mis amigos'],
      ok: 1,
      exp: 'Una linterna no necesita contactos ni ubicación. Pedir permisos innecesarios es señal de app maliciosa.'
    },
    {
      p: '¿Qué es el "grooming"?',
      ops: ['Un tipo de virus informático','Un proceso en que un adulto manipula a un menor para obtener imágenes o acceso físico','Acoso entre pares en redes sociales','Una técnica de hacking'],
      ok: 1,
      exp: 'El grooming es un proceso lento y calculado. Puede tomar semanas o meses antes de que el adulto pida algo inapropiado.'
    },
    {
      p: 'Un número desconocido dice ser tu banco y pide tus datos para "verificar tu cuenta". ¿Qué haces?',
      ops: ['Entrego mis datos porque parece urgente','Cuelgo y llamo yo al número oficial del banco','Le pido que me mande un correo','Espero a ver qué pasa'],
      ok: 1,
      exp: 'Ningún banco legítimo llama para pedirte datos. Siempre cuelga y llama TÚ al número oficial del sitio web.'
    }
  ];

  let preguntas = [];
  let actual    = 0;
  let correctas = 0;
  let semana    = '';

  function getSemana() {
    const d = new Date();
    const ini = new Date(d.getFullYear(), 0, 1);
    const sem = Math.ceil(((d - ini) / 86400000 + ini.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${sem}`;
  }

  function getScore()  { return parseInt(localStorage.getItem(KEY_SCORE) || '0'); }
  function getBest()   { return parseInt(localStorage.getItem(KEY_BEST)  || '0'); }
  function getRacha()  { return parseInt(localStorage.getItem(KEY_RACHA) || '0'); }
  function isDone()    { return localStorage.getItem(KEY_DONE) === getSemana(); }

  function saveResult(score, total) {
    const prev  = getScore();
    const best  = getBest();
    const racha = getRacha();
    const pct   = Math.round(score / total * 100);
    localStorage.setItem(KEY_SCORE, prev + score);
    localStorage.setItem(KEY_BEST,  Math.max(best, pct));
    localStorage.setItem(KEY_RACHA, score === total ? racha + 1 : 0);
    localStorage.setItem(KEY_WEEK,  getSemana());
    localStorage.setItem(KEY_DONE,  getSemana());
  }

  async function loadPreguntas() {
    try {
      const r = await fetch('https://aegis8-agent.christianmora705.workers.dev/news');
      if (r.ok) {
        const d = await r.json();
        if (d.quiz && d.quiz.length >= 3) return d.quiz;
      }
    } catch(e) {}
    try {
      const r = await fetch('/amenaza.json');
      if (r.ok) {
        const d = await r.json();
        if (d.quiz && d.quiz.length >= 3) return d.quiz;
      }
    } catch(e) {}
    return FALLBACK;
  }

  function render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (isDone()) {
      renderResultado(el, null, true);
      return;
    }

    renderPregunta(el);
  }

  function renderPregunta(el) {
    const q   = preguntas[actual];
    const tot = preguntas.length;
    const pct = Math.round(actual / tot * 100);

    el.innerHTML = `
      <div class="qz-wrap">
        <div class="qz-hd">
          <div class="qz-hd-l">
            <div class="qz-dot"></div>
            <span class="qz-label">QUIZ SEMANAL · AEGIS8</span>
          </div>
          <div class="qz-prog-txt">${actual + 1} / ${tot}</div>
        </div>
        <div class="qz-prog-bar"><div class="qz-prog-fill" style="width:${pct}%"></div></div>
        <div class="qz-body">
          <div class="qz-num">Pregunta ${actual + 1}</div>
          <div class="qz-pregunta">${q.p}</div>
          <div class="qz-ops" id="qz-ops">
            ${q.ops.map((o, i) => `
              <button class="qz-op" onclick="AegisQuiz._responder(${i})">
                <span class="qz-op-letra">${String.fromCharCode(65+i)}</span>
                <span class="qz-op-txt">${o}</span>
              </button>
            `).join('')}
          </div>
          <div class="qz-exp" id="qz-exp" style="display:none"></div>
          <button class="qz-next" id="qz-next" style="display:none" onclick="AegisQuiz._siguiente()">
            ${actual < tot - 1 ? 'Siguiente pregunta →' : 'Ver resultado →'}
          </button>
        </div>
        <div class="qz-ft">
          <span>Racha: <strong>${getRacha()}</strong> semanas perfectas</span>
          <span>Mejor: <strong>${getBest()}%</strong></span>
        </div>
      </div>`;
  }

  function _responder(idx) {
    const q    = preguntas[actual];
    const ops  = document.querySelectorAll('.qz-op');
    const exp  = document.getElementById('qz-exp');
    const next = document.getElementById('qz-next');
    const ok   = idx === q.ok;

    if (ok) correctas++;

    ops.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.ok)  btn.classList.add('qz-op-ok');
      if (i === idx && !ok) btn.classList.add('qz-op-mal');
    });

    exp.innerHTML = `<span class="qz-exp-ico">${ok ? '✓' : '✗'}</span> ${q.exp}`;
    exp.className = `qz-exp qz-exp-${ok ? 'ok' : 'mal'}`;
    exp.style.display = 'flex';
    next.style.display = 'block';
  }

  function _siguiente() {
    actual++;
    const el = document.querySelector('.qz-wrap')?.parentElement;
    if (!el) return;
    if (actual >= preguntas.length) {
      saveResult(correctas, preguntas.length);
      renderResultado(el, correctas);
    } else {
      renderPregunta(el);
    }
  }

  function renderResultado(el, score, yaHecho = false) {
    const tot   = preguntas.length || 5;
    const pct   = yaHecho ? getBest() : Math.round(score / tot * 100);
    const total = yaHecho ? '—' : `${score}/${tot}`;
    const emoji = pct >= 80 ? '🛡️' : pct >= 60 ? '⚠️' : '📚';
    const msg   = pct >= 80 ? 'Excelente defensa digital.' :
                  pct >= 60 ? 'Bien, pero hay margen para mejorar.' :
                  'Más práctica para fortalecer tu defensa.';
    const semMsg = yaHecho ? 'Ya completaste el quiz de esta semana.' : '¡Quiz completado!';

    el.innerHTML = `
      <div class="qz-wrap qz-resultado">
        <div class="qz-hd">
          <div class="qz-hd-l">
            <div class="qz-dot"></div>
            <span class="qz-label">RESULTADO · SEMANA ACTUAL</span>
          </div>
        </div>
        <div class="qz-body" style="text-align:center;padding:32px 24px;">
          <div style="font-size:3rem;margin-bottom:12px;">${emoji}</div>
          <div class="qz-score">${pct}%</div>
          <div class="qz-score-label">${msg}</div>
          <div class="qz-score-sub">${semMsg} Respuestas correctas: ${total}</div>
          <div class="qz-stats-row">
            <div class="qz-stat">
              <div class="qz-stat-n">${getRacha()}</div>
              <div class="qz-stat-l">Semanas perfectas</div>
            </div>
            <div class="qz-stat">
              <div class="qz-stat-n">${getBest()}%</div>
              <div class="qz-stat-l">Mejor resultado</div>
            </div>
            <div class="qz-stat">
              <div class="qz-stat-n">${getScore()}</div>
              <div class="qz-stat-l">Puntos totales</div>
            </div>
          </div>
          <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <a href="/quiz.html" class="qz-btn-sec">Ver todos los quiz →</a>
            <a href="/agente-seguridad.html" class="qz-btn-pri">Hablar con el agente →</a>
          </div>
        </div>
      </div>`;
  }

  async function init(containerId) {
    preguntas = await loadPreguntas();
    actual    = 0;
    correctas = 0;
    semana    = getSemana();
    render(containerId);
  }

  return { init, _responder, _siguiente, getScore, getBest, getRacha, isDone };

})();
