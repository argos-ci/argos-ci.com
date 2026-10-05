/**
 * Submit argos-ci.com URLs to IndexNow (https://www.indexnow.org), so Bing
 * (which feeds Copilot), Yandex, Naver, Seznam and Yep recrawl new and updated
 * pages right away instead of waiting for their next pass. Google and Brave
 * don't use IndexNow; they read the sitemaps.
 *
 * Reads the live sitemaps (the same ones search engines see) and submits the
 * URLs whose <lastmod> falls in the last `--days` days (default 2): new
 * articles and changelog entries, and articles whose `updatedAt` was bumped.
 * `--all` submits every URL, for a one-off push after site-wide changes.
 * `--dry-run` prints the URLs without submitting.
 *
 * The key is public by design: IndexNow checks that `KEY_LOCATION` serves it,
 * which proves we own the host. It lives in `public/<key>.txt`.
 *
 * Used by the "IndexNow" workflow.
 */
const BASE_URL = "https://argos-ci.com";
const HOST = new URL(BASE_URL).host;
const KEY = "b6244398905cda7c3d18e6ced4723956";
const KEY_LOCATION = `${BASE_URL}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
/** IndexNow accepts up to 10,000 URLs per request. */
const BATCH_SIZE = 10_000;

function parseArgs(argv) {
  const args = { all: false, dryRun: false, days: 2 };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--all") {
      args.all = true;
    } else if (arg === "--dry-run") {
      args.dryRun = true;
    } else if (arg === "--days") {
      args.days = Number(argv[++i]);
      if (!Number.isFinite(args.days) || args.days <= 0) {
        throw new Error("--days expects a positive number");
      }
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status}`);
  }
  return response.text();
}

/** Every `{ loc, lastmod }` of a sitemap, following sitemap indexes. */
async function readSitemap(url) {
  const xml = await fetchText(url);
  if (/<sitemapindex[\s>]/.test(xml)) {
    const children = [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)].map(
      (match) => match[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1],
    );
    const entries = await Promise.all(
      children.filter(Boolean).map((child) => readSitemap(child)),
    );
    return entries.flat();
  }
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => ({
    loc: match[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1],
    lastmod: match[1].match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1],
  }));
}

async function submit(urlList) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });
  // 200: submitted. 202: accepted, the key is still being validated.
  if (response.status !== 200 && response.status !== 202) {
    throw new Error(
      `IndexNow rejected the submission: ${response.status} ${await response.text()}`,
    );
  }
  return response.status;
}

const args = parseArgs(process.argv.slice(2));

const servedKey = await fetchText(KEY_LOCATION).then(
  (text) => text.trim(),
  () => null,
);
if (servedKey !== KEY) {
  const message = `${KEY_LOCATION} does not serve the IndexNow key (is public/${KEY}.txt deployed?)`;
  if (!args.dryRun) {
    throw new Error(message);
  }
  console.warn(`Warning: ${message}`);
}

const since = Date.now() - args.days * 24 * 60 * 60 * 1000;
const entries = await readSitemap(`${BASE_URL}/sitemap.xml`);
const urls = [
  ...new Set(
    entries
      .filter((entry) => entry.loc && new URL(entry.loc).host === HOST)
      .filter(
        (entry) =>
          args.all ||
          (entry.lastmod && new Date(entry.lastmod).getTime() >= since),
      )
      .map((entry) => entry.loc),
  ),
];

console.log(
  `${urls.length} URL(s) to submit (${args.all ? "all" : `changed in the last ${args.days} day(s)`}, ${entries.length} in the sitemaps).`,
);
for (const url of urls) {
  console.log(`  ${url}`);
}

if (urls.length === 0 || args.dryRun) {
  process.exit(0);
}

for (let i = 0; i < urls.length; i += BATCH_SIZE) {
  const status = await submit(urls.slice(i, i + BATCH_SIZE));
  console.log(
    `Submitted ${Math.min(urls.length - i, BATCH_SIZE)} URL(s): ${status}`,
  );
}
