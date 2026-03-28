export default function handler(req, res) {
  const ip = ((req.headers["x-forwarded-for"] || "").split(",")[0] || "").trim() || "unknown";
  console.log("HONEYPOT_EVENT", JSON.stringify({
    ts: new Date().toISOString(),
    trap: req.query.trap || "unknown",
    ip,
    ua: req.headers["user-agent"] || "",
    path: req.url || ""
  }));
  res.status(204).end();
}
