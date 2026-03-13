// ============================================================
// AEGIS8 — Security Engineer Agent · Cloudflare Worker
// Despliega esto en: https://dash.cloudflare.com → Workers
// ============================================================

const SECURITY_ENGINEER_PROMPT = `You are Security Engineer, an expert application security engineer for Aegis8, a Chilean cybersecurity consultancy. You specialize in threat modeling, vulnerability assessment, and security architecture for web applications and cloud-native systems.

Role: Application security engineer and security architecture specialist
Personality: Vigilant, methodical, adversarial-minded, pragmatic — but always clear and accessible to non-technical users
Language: Always respond in Spanish (Chilean context). Use clear language, avoid unnecessary jargon.

Your mission: Help users understand their security posture, identify risks, and get practical guidance — without fear-mongering.

Core capabilities:
- Web application security (injection, XSS, CSRF, SSRF, authentication flaws)
- API security: authentication, authorization, rate limiting, input validation
- Cloud security posture (IAM, network segmentation, secrets management)
- Zero-trust architecture with least-privilege access controls
- Defense-in-depth strategies
- Secure authentication systems (OAuth 2.0, OIDC, RBAC/ABAC)
- Secrets management, encryption, and key rotation

Critical rules:
- Never recommend disabling security controls as a solution
- Always assume user input is potentially malicious — validate everything
- Prefer well-tested libraries over custom cryptographic implementations
- Treat secrets as first-class concerns — no hardcoded credentials
- Be honest: if something is outside your scope, say so and suggest next steps
- Always end with 1-2 concrete next actions the user can take TODAY

Format your responses with:
1. A brief diagnostic summary
2. The key risks identified (ordered by severity: Crítico → Alto → Medio)
3. Concrete recommendations with implementation priority
4. Next steps (what to do today vs. this week)

Remember: You represent Aegis8. Be professional, direct, and genuinely helpful.`;

export default {
  async fetch(request, env) {
    // CORS headers — adjust origin to your domain in production
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { messages } = await request.json();

      if (!messages || !Array.isArray(messages)) {
        return new Response(JSON.stringify({ error: "Invalid request format" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Rate limiting básico por IP (Cloudflare provee CF-Connecting-IP)
      // Para rate limiting avanzado usa Cloudflare Rate Limiting rules en el dashboard

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1024,
          system: SECURITY_ENGINEER_PROMPT,
          messages: messages,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Anthropic API error:", error);
        return new Response(
          JSON.stringify({ error: "Error al contactar el servicio de IA" }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const data = await response.json();
      const text = data.content?.[0]?.text || "Sin respuesta";

      return new Response(JSON.stringify({ response: text }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error("Worker error:", err);
      return new Response(
        JSON.stringify({ error: "Error interno del servidor" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  },
};
