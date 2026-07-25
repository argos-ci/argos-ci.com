/**
 * Generate concept illustrations for social posts with gpt-image-2.
 *
 * Every image gets the same locked style suffix, so a set generated months
 * apart still reads as one system. Scenes describe geometry and composition —
 * the style string forbids text, because the model garbles letterforms.
 *
 *   node scripts/social-image.mjs --spec images.json --out-dir ./out
 *   node scripts/social-image.mjs --scene "Two panels…" --out /tmp/a.png
 *
 * Requires ARGOS_OPENAI_API_KEY. See .claude/skills/social-image/SKILL.md
 */
import { mkdirSync, existsSync, writeFileSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

/**
 * The brand lock. Do not edit per-image — edit here and re-render the set,
 * otherwise old and new images stop matching.
 */
const STYLE =
  " Flat editorial vector illustration for a modern developer-tool brand. " +
  "Deep indigo navy background, violet and cyan accents, warm off-white surfaces. " +
  "Geometric and calm, generous negative space, subtle dot-grid and thin concentric line details. " +
  "Absolutely no text, no letters, no numbers, no words, no labels, no logos. " +
  "Confident, minimal, high craft.";

const MODEL = "gpt-image-2";
const SIZE = "1536x1024";
const CONCURRENCY = 4;

const KEY = process.env.ARGOS_OPENAI_API_KEY;
if (!KEY) {
  console.error(
    "ARGOS_OPENAI_API_KEY is not set. It lives in ~/.zshrc — run `source ~/.zshrc` first.",
  );
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, "");
    if (!key) continue;
    args[key] = argv[i + 1] ?? true;
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const force = Boolean(args.force);

/** @type {{name:string, scene:string, out:string}[]} */
const jobs = [];

if (args.spec) {
  const specPath = resolve(args.spec);
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  const outDir = resolve(args["out-dir"] ?? spec.outDir ?? dirname(specPath));
  mkdirSync(outDir, { recursive: true });
  for (const image of spec.images) {
    if (!image.scene) throw new Error(`Image "${image.name}" has no scene`);
    jobs.push({
      name: image.name,
      scene: image.scene,
      out: join(outDir, `${image.name}.png`),
    });
  }
} else if (args.scene) {
  const out = resolve(args.out ?? "social-image.png");
  mkdirSync(dirname(out), { recursive: true });
  jobs.push({ name: out, scene: args.scene, out });
} else {
  console.error(
    "Usage:\n" +
      "  node scripts/social-image.mjs --spec <spec.json> [--out-dir <dir>] [--force true]\n" +
      "  node scripts/social-image.mjs --scene <text> --out <file.png>",
  );
  process.exit(1);
}

async function generate(job, attempt = 1) {
  // Generated images cost money — never redo one that already landed.
  if (!force && existsSync(job.out) && statSync(job.out).size > 10_000) {
    return `${job.name} cached`;
  }
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: job.scene + STYLE,
        size: SIZE,
        n: 1,
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
    }
    const data = await res.json();
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) throw new Error("response had no b64_json");
    writeFileSync(job.out, Buffer.from(b64, "base64"));
    return `${job.name} ok`;
  } catch (error) {
    if (attempt === 1) return generate(job, 2);
    return `${job.name} FAILED — ${error.message}`;
  }
}

console.log(`generating ${jobs.length} image(s) at ${SIZE}`);

const queue = [...jobs];
const workers = Array.from(
  { length: Math.min(CONCURRENCY, queue.length) },
  async () => {
    let job;
    while ((job = queue.shift())) {
      console.log(`  ${await generate(job)}`);
    }
  },
);

await Promise.all(workers);
console.log("done — review every image before shipping it");
