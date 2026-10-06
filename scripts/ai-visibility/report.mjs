/**
 * Render the markdown summary of an AI visibility run from its answer records.
 */
import { TOOL_NAMES } from "./analyze.mjs";
import { MODES, PROVIDERS } from "./providers.mjs";

const pct = (count, total) =>
  total ? `${Math.round((count / total) * 100)}%` : "–";
const share = (count, total) =>
  total ? `${count}/${total} (${pct(count, total)})` : "–";
const int = (value) => value.toLocaleString("en-US");
const labelOf = (id) => PROVIDERS.find((provider) => provider.id === id).label;

/** @param {[title: string, align?: "right"][]} columns */
function table(columns, rows) {
  return [
    `| ${columns.map(([title]) => title).join(" | ")} |`,
    `| ${columns.map(([, align]) => (align === "right" ? "---:" : "---")).join(" | ")} |`,
    ...rows.map(
      (row) =>
        `| ${row.map((cell) => String(cell).replaceAll("|", "\\|")).join(" | ")} |`,
    ),
  ].join("\n");
}

/** Count answers per key; `keysOf` lists an answer's keys, each counted once. */
function countAnswers(answers, keysOf) {
  const counts = new Map();
  for (const answer of answers) {
    for (const key of new Set(keysOf(answer))) {
      const entry = counts.get(key) ?? { count: 0, providers: new Set() };
      entry.count += 1;
      entry.providers.add(labelOf(answer.provider));
      counts.set(key, entry);
    }
  }
  return [...counts]
    .map(([key, { count, providers }]) => ({
      key,
      count,
      providers: [...providers].join(", "),
    }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
}

export function renderSummary({
  startedAt,
  runs,
  promptCount,
  results,
  skipped,
  resultsFile,
}) {
  const answers = results.filter((result) => result.ok);
  const failed = results.length - answers.length;
  const lines = [
    "## AI visibility report",
    "",
    `${startedAt.slice(0, 16).replace("T", " ")} UTC · ${promptCount} prompts × ${runs} run${runs === 1 ? "" : "s"} · ${answers.length} answers${failed ? `, ${failed} failed` : ""}`,
  ];
  if (skipped.length) {
    const list = skipped.map((p) => `${p.label} (\`${p.keyEnv}\` not set)`);
    lines.push("", `Skipped: ${list.join(", ")}.`);
  }
  if (!results.length) {
    lines.push(
      "",
      "No assistant was asked anything. Set `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` to measure.",
    );
    return `${lines.join("\n")}\n`;
  }

  const groups = PROVIDERS.flatMap((provider) =>
    MODES.map((mode) => {
      const records = results.filter(
        (result) => result.provider === provider.id && result.mode === mode,
      );
      return {
        label: `${provider.label} ${mode}`,
        provider,
        mode,
        records,
        answers: records.filter((result) => result.ok),
      };
    }),
  ).filter((group) => group.records.length);
  const groupColumns = groups.map((group) => [group.label, "right"]);
  const citesArgos = (answer) => answer.citations.some((link) => link.argos);

  lines.push(
    "",
    "### Argos mentions",
    "",
    table(
      [
        ["Assistant"],
        ["Mode"],
        ["Model"],
        ["Mentions Argos", "right"],
        ["Avg. rank", "right"],
        ["Cites argos-ci.com", "right"],
        ["Searched the web", "right"],
      ],
      groups.map(({ provider, mode, records, answers: groupAnswers }) => {
        const mentioned = groupAnswers.filter(
          (answer) => answer.argosMentioned,
        );
        const rankSum = mentioned.reduce(
          (sum, answer) => sum + answer.argosRank,
          0,
        );
        const models = new Set(records.map((record) => `\`${record.model}\``));
        return [
          provider.label,
          mode,
          [...models].join(", "),
          share(mentioned.length, groupAnswers.length),
          mentioned.length ? (rankSum / mentioned.length).toFixed(1) : "–",
          share(groupAnswers.filter(citesArgos).length, groupAnswers.length),
          mode === "search"
            ? share(
                groupAnswers.filter((answer) => answer.searches > 0).length,
                groupAnswers.length,
              )
            : "–",
        ];
      }),
    ),
    "",
    "Avg. rank: Argos's position among the tracked tools in order of first mention (1 = named first), over the answers that mention it.",
  );

  const topics = [...new Set(results.map((result) => result.topic))];
  const argosByTopic = (list, topic) => {
    const inTopic = list.filter((answer) => answer.topic === topic);
    return [
      inTopic.filter((answer) => answer.argosMentioned).length,
      inTopic.length,
    ];
  };
  lines.push(
    "",
    "### Argos mention rate by topic",
    "",
    table(
      [["Topic"], ...groupColumns, ["All", "right"]],
      topics.map((topic) => [
        topic,
        ...groups.map((group) => {
          const [mentioned, total] = argosByTopic(group.answers, topic);
          return total ? `${mentioned}/${total}` : "–";
        }),
        share(...argosByTopic(answers, topic)),
      ]),
    ),
  );

  const tools = TOOL_NAMES.map((name) => ({
    name,
    count: answers.filter((answer) => answer.mentions.includes(name)).length,
  })).sort((a, b) => b.count - a.count);
  lines.push(
    "",
    "### Tools mentioned",
    "",
    "Share of answers that name each tool.",
    "",
    table(
      [["Tool"], ...groupColumns, ["All", "right"]],
      tools.map(({ name, count }) => [
        name === "Argos" ? "**Argos**" : name,
        ...groups.map((group) =>
          pct(
            group.answers.filter((answer) => answer.mentions.includes(name))
              .length,
            group.answers.length,
          ),
        ),
        pct(count, answers.length),
      ]),
    ),
  );

  const domains = countAnswers(answers, (answer) =>
    answer.citations.map((link) => link.domain),
  ).slice(0, 15);
  lines.push(
    "",
    "### Top cited domains",
    "",
    domains.length
      ? table(
          [["Domain"], ["Answers", "right"], ["Assistants"]],
          domains.map(({ key, count, providers }) => [
            key === "argos-ci.com" ? `**${key}**` : key,
            count,
            providers,
          ]),
        )
      : "No answer cited a URL.",
  );

  const argosLinks = (links) =>
    links.filter((link) => link.argos).map((link) => link.url);
  const cited = countAnswers(answers, (answer) => argosLinks(answer.citations));
  const retrieved = countAnswers(answers, (answer) =>
    argosLinks(answer.sources),
  );
  const argosUrls = [
    ...new Set([...cited, ...retrieved].map((row) => row.key)),
  ];
  const countOf = (rows, url) =>
    rows.find((row) => row.key === url)?.count ?? 0;
  lines.push(
    "",
    "### argos-ci.com URLs",
    "",
    argosUrls.length
      ? table(
          [["URL"], ["Cited in", "right"], ["Retrieved in", "right"]],
          argosUrls
            .map((url) => [url, countOf(cited, url), countOf(retrieved, url)])
            .sort((a, b) => b[1] - a[1] || b[2] - a[2]),
        )
      : "No answer cited or retrieved an argos-ci.com URL.",
    "",
    "Cited: the answer links to the URL. Retrieved: the URL came back in the assistant's web search results, cited or not.",
  );

  lines.push(
    "",
    "### Usage",
    "",
    table(
      [
        ["Assistant"],
        ["Mode"],
        ["Requests", "right"],
        ["Failed", "right"],
        ["Web searches", "right"],
        ["Input tokens", "right"],
        ["Output tokens", "right"],
      ],
      groups.map(({ provider, mode, records, answers: groupAnswers }) => {
        const sum = (pick) =>
          groupAnswers.reduce(
            (total, answer) => total + (pick(answer) ?? 0),
            0,
          );
        return [
          provider.label,
          mode,
          records.length,
          records.length - groupAnswers.length,
          int(sum((answer) => answer.searches)),
          int(sum((answer) => answer.usage.inputTokens)),
          int(sum((answer) => answer.usage.outputTokens)),
        ];
      }),
    ),
  );

  if (failed) {
    const errors = countAnswers(
      results.filter((result) => !result.ok),
      (result) => [
        `${labelOf(result.provider)} ${result.mode}: ${result.error}`,
      ],
    );
    lines.push(
      "",
      "### Failures",
      "",
      ...errors
        .slice(0, 10)
        .map(({ key, count }) => `- ${key}${count > 1 ? ` (${count}×)` : ""}`),
    );
  }

  if (resultsFile) lines.push("", `Raw answers: \`${resultsFile}\``);
  return `${lines.join("\n")}\n`;
}
