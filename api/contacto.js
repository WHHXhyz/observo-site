// /api/contacto.js (Vercel Serverless Function - Node.js)
// Requiere variables de entorno en Vercel:
// - TURNSTILE_SECRET_KEY (secret key de Cloudflare Turnstile)
// - RESEND_API_KEY (si usarás Resend)  [opcional]
// - CONTACT_TO_EMAIL (correo destino)
// - CONTACT_FROM_EMAIL (remitente verificado en Resend) [si aplica]

export default async function handler(req, res) {
  try{
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // --- Rate limit simple (por IP) ---
    // Nota: en serverless esto es "best effort" (se reinicia / escala).
    // Para rate limit serio: Upstash Redis / Vercel KV.
    const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').toString().split(',')[0].trim();
    const now = Date.now();
    globalThis.__rl = globalThis.__rl || new Map();
    const winMs = 60_000;           // 1 minuto
    const maxHits = 5;              // 5 envíos/min por IP
    const entry = globalThis.__rl.get(ip) || { n: 0, t: now };
    if (now - entry.t > winMs) { entry.n = 0; entry.t = now; }
    entry.n += 1;
    globalThis.__rl.set(ip, entry);
    if (entry.n > maxHits) {
      return res.status(429).json({ error: 'Demasiados intentos. Espera 1 minuto y prueba de nuevo.' });
    }

    const { nombre, correo, perfil, motivo, mensaje, urgencia, turnstileToken, page, ts } = req.body || {};

    if (!nombre || !correo || !turnstileToken) {
      return res.status(400).json({ error: 'Faltan campos requeridos.' });
    }

    // --- Verificar Turnstile ---
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return res.status(500).json({ error: 'Server misconfigured (TURNSTILE_SECRET_KEY).' });

    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', turnstileToken);
    if (ip) formData.append('remoteip', ip);

    const verifyResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    const verifyJson = await verifyResp.json();
    if (!verifyJson.success) {
      return res.status(403).json({ error: 'Verificación anti-spam fallida. Intenta nuevamente.' });
    }

    // --- Enviar correo ---
    // Opción A: Resend (recomendado por simpleza)
    // npm i resend
    // const { Resend } = require('resend');  (si usas CJS) / import { Resend } from 'resend' (si ESM)
    // En Vercel: si tu proyecto usa "type": "module", usa import.
    //
    // Para mantener esto "sin deps" acá dejamos el envío como pseudo-impl.
    // Si quieres, te adapto el repo exacto (package.json) para tu stack.

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) return res.status(500).json({ error: 'Server misconfigured (CONTACT_TO_EMAIL).' });

    const subject = `[Aegis8] Nuevo contacto: ${nombre} (${motivo || 'consulta'})`;
    const bodyText =
`Nuevo contacto desde: ${page || '—'}
Fecha: ${ts || new Date().toISOString()}
IP: ${ip || '—'}

Nombre: ${nombre}
Correo: ${correo}
Perfil: ${perfil || '—'}
Motivo: ${motivo || '—'}
Urgencia: ${urgencia || '—'}

Mensaje:
${mensaje || '—'}
`;

    // --- Resend (descomenta si lo usarás) ---
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const from = process.env.CONTACT_FROM_EMAIL; // ej: "Aegis8 <no-reply@aegis8.org>"
    // if (!from) return res.status(500).json({ error: 'Server misconfigured (CONTACT_FROM_EMAIL).' });
    // await resend.emails.send({ from, to, subject, text: bodyText });

    // --- TEMP: si aún no configuras envío real ---
    // Puedes loguear para pruebas:
    console.log(bodyText);

    return res.status(200).json({ ok: true });

  }catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Error interno.' });
  }
}
