/**
 * Email the AI visibility summary with Resend, once a run is done.
 *
 * Sends only when RESEND_API_KEY and AI_VISIBILITY_EMAIL_TO (comma-separated
 * addresses) are both set, so a local run never emails anyone by surprise.
 * AI_VISIBILITY_EMAIL_FROM defaults to the address the Argos app sends from,
 * on a domain verified in Resend.
 *
 * Request shape checked against the docs on 2026-10-06:
 * https://resend.com/docs/api-reference/emails/send-email
 */
const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Argos <contact@argos-ci.com>";

/** The email settings, or null when the report shouldn't be emailed. */
export function getEmailConfig(env = process.env) {
  const to = (env.AI_VISIBILITY_EMAIL_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!env.RESEND_API_KEY || !to.length) return null;
  return {
    key: env.RESEND_API_KEY,
    to,
    from: env.AI_VISIBILITY_EMAIL_FROM || DEFAULT_FROM,
  };
}

/** Send the summary; resolves to the Resend email id. */
export async function sendReportEmail({
  config,
  subject,
  markdown,
  runUrl,
  idempotencyKey,
}) {
  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.key}`,
      "content-type": "application/json",
      // A retried job step can't send the same report twice.
      ...(idempotencyKey && { "idempotency-key": idempotencyKey }),
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      subject,
      html: renderEmailHtml(markdown, runUrl),
      text: runUrl ? `${markdown}\nRaw answers: ${runUrl}\n` : markdown,
    }),
    signal: AbortSignal.timeout(30_000),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Resend answered ${response.status}: ${body.message ?? JSON.stringify(body)}`,
    );
  }
  return body.id;
}

/* Markdown to HTML --------------------------------------------------------- */

const escapeHtml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** `code`, **bold** and bare URLs: all the summary uses inline. */
function inline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code style="font-size:0.9em">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!["=>])\bhttps?:\/\/[^\s<]+/g, '<a href="$&">$&</a>');
}

/** Split a table row on its unescaped pipes. */
const cellsOf = (row) =>
  row
    .trim()
    .replace(/^\||\|$/g, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.trim().replaceAll("\\|", "|"));

const CELL = "padding:4px 10px;border:1px solid #d9d9e0";

function table(rows) {
  const [header, separator, ...body] = rows.map(cellsOf);
  const align = separator.map((cell) =>
    cell.endsWith(":") ? "right" : "left",
  );
  const row = (cells, tag) =>
    `<tr>${cells
      .map(
        (cell, index) =>
          `<${tag} style="${CELL};text-align:${align[index]}">${inline(cell)}</${tag}>`,
      )
      .join("")}</tr>`;
  return `<table style="border-collapse:collapse;font-size:13px;margin:8px 0">${row(header, "th")}${body
    .map((cells) => row(cells, "td"))
    .join("")}</table>`;
}

/**
 * The subset of markdown the summary is written in: `##`/`###` headings,
 * pipe tables, `-` lists and paragraphs.
 */
function markdownToHtml(markdown) {
  const blocks = [];
  const lines = markdown.split("\n");
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
    } else if (line.startsWith("|")) {
      const rows = [];
      while (lines[index]?.startsWith("|")) rows.push(lines[index++]);
      blocks.push(table(rows));
    } else if (line.startsWith("- ")) {
      const items = [];
      while (lines[index]?.startsWith("- "))
        items.push(lines[index++].slice(2));
      blocks.push(
        `<ul>${items.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`,
      );
    } else {
      const heading = line.match(/^(#{2,3}) (.*)$/);
      blocks.push(
        heading
          ? `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`
          : `<p>${inline(line)}</p>`,
      );
      index += 1;
    }
  }
  return blocks.join("\n");
}

function renderEmailHtml(markdown, runUrl) {
  const link = runUrl
    ? `<p>Raw answers and the full log: <a href="${escapeHtml(runUrl)}">${escapeHtml(runUrl)}</a></p>`
    : "";
  return `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c2024;line-height:1.5;max-width:960px;margin:0 auto;padding:16px">${markdownToHtml(markdown)}${link}</body></html>`;
}
