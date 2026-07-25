/**
 * Render a syntax-highlighted code card on the Argos brand background.
 *
 * Used for social posts (X, LinkedIn, Bluesky) where a snippet is the point.
 * Output is a 1400x880 PNG at 2x — a 16:10 frame that survives feed cropping.
 *
 *   node scripts/code-card.mjs --code snippet.sh --out card.png
 *   node scripts/code-card.mjs --spec cards.json --out-dir ./out
 *
 * See .claude/skills/code-card/SKILL.md
 */
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const WIDTH = 1400;
const HEIGHT = 880;
const SCALE = 2;

const COMMANDS = new Set([
  "argos",
  "npx",
  "npm",
  "pnpm",
  "yarn",
  "claude",
  "codex",
  "git",
  "node",
]);

const SUBCOMMANDS = new Set([
  "upload",
  "build",
  "review",
  "comment",
  "change",
  "deploy",
  "analytics",
  "login",
  "logout",
  "whoami",
  "skip",
  "finalize",
  "create-project",
  "skills",
  "mcp",
  "test",
  "add",
]);

const KEYWORDS = new Set([
  "await",
  "async",
  "const",
  "let",
  "export",
  "import",
  "from",
  "return",
  "expect",
  "test",
  "describe",
  "it",
  "true",
  "false",
  "null",
  "undefined",
]);

const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Tokenize one line, then render. Tokenizing before escaping avoids the
 * classic bug of regexes matching inside generated markup.
 */
const TOKEN = new RegExp(
  [
    "(?<str>'[^']*'|\"[^\"]*\"|`[^`]*`)",
    "(?<ph><[A-Za-z][\\w./-]*>)",
    "(?<url>https?://[^\\s'\"]+)",
    "(?<flag>--?[A-Za-z][\\w-]*)",
    "(?<skill>\\$[A-Za-z][\\w-]*)",
    "(?<num>\\d[\\d,._]*)",
    "(?<word>[A-Za-z_@][\\w@./-]*)",
    "(?<other>[\\s\\S])",
  ].join("|"),
  "gy",
);

function highlight(line) {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
    return `<span class="c">${escapeHtml(line)}</span>`;
  }

  let out = "";
  let wordIndex = 0;
  TOKEN.lastIndex = 0;

  let match;
  while ((match = TOKEN.exec(line))) {
    const g = match.groups;
    const raw = match[0];
    const html = escapeHtml(raw);

    if (g.str) out += `<span class="s">${html}</span>`;
    else if (g.ph) out += `<span class="ph">${html}</span>`;
    else if (g.url) out += `<span class="u">${html}</span>`;
    else if (g.flag) out += `<span class="f">${html}</span>`;
    else if (g.skill) out += `<span class="sk">${html}</span>`;
    else if (g.num) out += `<span class="n">${html}</span>`;
    else if (g.word) {
      const w = raw;
      let cls = "";
      if (wordIndex === 0 && COMMANDS.has(w)) cls = "cmd";
      else if (wordIndex === 1 && SUBCOMMANDS.has(w)) cls = "sub";
      else if (KEYWORDS.has(w)) cls = "kw";
      wordIndex += 1;
      out += cls ? `<span class="${cls}">${html}</span>` : html;
    } else out += html;
  }

  return out;
}

const html = (title, code) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:${WIDTH}px; height:${HEIGHT}px;
    display:flex; align-items:center; justify-content:center;
    background:
      radial-gradient(1100px 700px at 78% 18%, #23246b 0%, rgba(35,36,107,0) 62%),
      radial-gradient(900px 620px at 16% 86%, #1b2a63 0%, rgba(27,42,99,0) 60%),
      #0b0d2b;
    font-family: ui-sans-serif, -apple-system, "Segoe UI", sans-serif;
  }
  .halo { position:absolute; border-radius:50%; border:1px solid rgba(139,131,255,.10); }
  .halo.a { width:700px; height:700px; right:-200px; top:-240px; }
  .halo.b { width:520px; height:520px; left:-180px; bottom:-200px; }
  .dots {
    position:absolute; width:150px; height:110px; left:52px; top:48px; opacity:.5;
    background-image: radial-gradient(#8b83ff 1.6px, transparent 1.6px);
    background-size: 22px 22px;
  }
  .dots.end { left:auto; top:auto; right:54px; bottom:50px; }
  .card {
    position:relative; min-width:1180px; max-width:1320px;
    background:#151735; border:1px solid rgba(150,143,255,.16); border-radius:18px;
    box-shadow: 0 40px 90px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.02) inset;
    overflow:hidden;
  }
  .bar {
    display:flex; align-items:center; gap:9px; padding:20px 26px;
    border-bottom:1px solid rgba(150,143,255,.12); background:#1b1d3f;
  }
  .dot { width:14px; height:14px; border-radius:50%; }
  .dot.r { background:#ff5f57; } .dot.y { background:#febc2e; } .dot.g { background:#28c840; }
  .title {
    flex:1; text-align:center; margin-right:52px; letter-spacing:.2px;
    font: 600 17px ui-monospace, "SF Mono", Menlo, monospace; color:#a9a4d8;
  }
  pre {
    padding:38px 44px 42px; white-space:pre; tab-size:2; color:#e6e4f7;
    font: 400 27px/1.7 ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  }
  .c   { color:#6f6a9e; font-style:italic; }
  .cmd { color:#c4b5ff; font-weight:600; }
  .sub { color:#7ee0ff; }
  .kw  { color:#c4b5ff; }
  .f   { color:#ffb86c; }
  .s   { color:#8fe38f; }
  .ph  { color:#a9a4d8; }
  .n   { color:#ff9ecb; }
  .u   { color:#7ee0ff; }
  .sk  { color:#7ee0ff; font-weight:600; }
</style></head><body>
  <div class="halo a"></div><div class="halo b"></div>
  <div class="dots"></div><div class="dots end"></div>
  <div class="card">
    <div class="bar">
      <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
      <span class="title">${escapeHtml(title)}</span>
    </div>
    <pre>${code.split("\n").map(highlight).join("\n")}</pre>
  </div>
</body></html>`;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, "");
    if (!key) continue;
    args[key] = argv[i + 1];
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));

/** @type {{name:string, title:string, code:string, out:string}[]} */
const cards = [];

if (args.spec) {
  const specPath = resolve(args.spec);
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  const outDir = resolve(args["out-dir"] ?? spec.outDir ?? dirname(specPath));
  mkdirSync(outDir, { recursive: true });
  for (const card of spec.cards) {
    const code = card.codeFile
      ? readFileSync(resolve(dirname(specPath), card.codeFile), "utf8")
      : card.code;
    if (!code) throw new Error(`Card "${card.name}" has no code or codeFile`);
    cards.push({
      name: card.name,
      title: card.title ?? (card.codeFile ? basename(card.codeFile) : card.name),
      code: code.replace(/\n+$/, ""),
      out: join(outDir, `${card.name}.png`),
    });
  }
} else if (args.code) {
  const codePath = resolve(args.code);
  const out = resolve(args.out ?? codePath.replace(/\.[^.]+$/, "") + ".png");
  mkdirSync(dirname(out), { recursive: true });
  cards.push({
    name: basename(out),
    title: args.title ?? basename(codePath),
    code: readFileSync(codePath, "utf8").replace(/\n+$/, ""),
    out,
  });
} else {
  console.error(
    "Usage:\n" +
      "  node scripts/code-card.mjs --code <file> --out <file.png> [--title <label>]\n" +
      "  node scripts/code-card.mjs --spec <spec.json> [--out-dir <dir>]",
  );
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: SCALE,
});

for (const card of cards) {
  await page.setContent(html(card.title, card.code), { waitUntil: "load" });
  await page.screenshot({ path: card.out });
  console.log(`${card.name} -> ${card.out}`);
}

await browser.close();
