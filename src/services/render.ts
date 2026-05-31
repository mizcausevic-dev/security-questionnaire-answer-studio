import { toExport } from "../analyze.js";
import { sampleSecurityQuestionnaireAnswerStudio } from "../data/sampleVerticalBrief.js";
import {
  answerPacks,
  cycleTime,
  payload,
  questionnaireQueue,
  riskMap,
  summary,
  trustEvidence,
  verification
} from "./verticalBriefService.js";

const productTitle = "Security Questionnaire Answer Studio";
const domain = "https://questionnaire.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function shell(title: string, active: string, body: string, description: string) {
  const routes = [
    ["/", "Overview"],
    ["/questionnaire-queue", "Questionnaire queue"],
    ["/answer-packs", "Answer packs"],
    ["/trust-evidence", "Trust evidence"],
    ["/cycle-time", "Cycle time"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ];

  const nav = routes
    .map(([href, label]) => {
      const current = href === active ? ' aria-current="page"' : "";
      return `<a href="${href}"${current}>${label}</a>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${productTitle} · ${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${domain}${active === "/" ? "/" : `${active}/`}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${productTitle} · ${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${domain}${active === "/" ? "/" : `${active}/`}" />
    <meta name="twitter:card" content="summary_large_image" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #071019;
        --panel: #101a2b;
        --panel-alt: #0d1624;
        --ink: #ecf2ff;
        --muted: #9fb1c9;
        --accent: #45f2b4;
        --line: rgba(114, 142, 188, 0.24);
        --chip: rgba(73, 242, 180, 0.12);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(85, 92, 224, 0.18), transparent 36%),
          linear-gradient(180deg, #071019, #081221 55%, #0b1830);
        color: var(--ink);
      }
      a { color: #8fd0ff; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 24px 56px; }
      .hero, .section, .table-wrap {
        background: rgba(16, 26, 43, 0.94);
        border: 1px solid var(--line);
        border-radius: 28px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
      }
      .hero { padding: 28px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(69, 242, 180, 0.3);
        background: rgba(69, 242, 180, 0.08);
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font: 600 12px/1.2 "Consolas", monospace;
      }
      h1, h2, h3 {
        margin: 18px 0 10px;
        font-family: Georgia, serif;
        line-height: 1.05;
      }
      h1 { font-size: clamp(40px, 7vw, 72px); max-width: 13ch; }
      h2 { font-size: clamp(28px, 4vw, 42px); }
      .lede, .section p, td, th, li, .metric-copy {
        color: var(--muted);
        line-height: 1.6;
      }
      .topbar {
        display: flex;
        justify-content: space-between;
        gap: 18px;
        align-items: center;
        margin-bottom: 18px;
      }
      .product { font: 700 24px/1.2 "Segoe UI", system-ui, sans-serif; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; }
      nav a {
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.02);
        color: var(--muted);
      }
      nav a[aria-current="page"] {
        border-color: rgba(69, 242, 180, 0.4);
        background: var(--chip);
        color: var(--ink);
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 14px;
        margin-top: 22px;
      }
      .metric {
        padding: 18px;
        background: rgba(255,255,255,0.03);
        border: 1px solid var(--line);
        border-radius: 22px;
      }
      .metric-label {
        color: var(--muted);
        font: 600 12px/1.2 "Consolas", monospace;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .metric-value {
        display: block;
        margin-top: 10px;
        font: 700 34px/1 Georgia, serif;
      }
      .section, .table-wrap { margin-top: 28px; padding: 24px; }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
        margin-top: 18px;
      }
      .card {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid var(--line);
        background: var(--panel-alt);
      }
      .pill {
        display: inline-flex;
        align-items: center;
        padding: 7px 11px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.02);
        color: var(--muted);
        font: 600 12px/1.1 "Consolas", monospace;
      }
      .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
      .table-wrap table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 14px;
      }
      th, td {
        text-align: left;
        vertical-align: top;
        padding: 14px 12px;
        border-top: 1px solid var(--line);
      }
      th {
        color: var(--ink);
        font: 600 12px/1.2 "Consolas", monospace;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      footer {
        margin-top: 28px;
        padding-top: 18px;
        border-top: 1px solid var(--line);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 12px;
        color: var(--muted);
      }
      .footer-links { display: flex; flex-wrap: wrap; gap: 16px; }
      code {
        padding: 2px 6px;
        border-radius: 6px;
        background: rgba(255,255,255,0.05);
      }
      ul { padding-left: 20px; }
      @media (max-width: 720px) {
        .topbar { flex-direction: column; align-items: flex-start; }
        .wrap { padding: 18px 14px 28px; }
        .hero, .section, .table-wrap { padding: 18px; border-radius: 20px; }
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      <section class="hero">
        <div class="topbar">
          <div class="product">${productTitle}</div>
          <nav>${nav}</nav>
        </div>
        <span class="eyebrow">Executive intelligence · trust answers</span>
        ${body}
        <footer>
          <div>Reusable security answers, trust evidence, and response ownership for enterprise, regulated, and public-sector diligence paths.</div>
          <div class="footer-links">
            <a href="https://github.com/mizcausevic-dev/">GitHub</a>
            <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
            <a href="https://kineticgain.com/">Kinetic Gain</a>
          </div>
        </footer>
      </section>
    </div>
  </body>
</html>`;
}

export function renderOverview() {
  const executiveSummary = summary();
  const queue = questionnaireQueue();
  const risks = riskMap().slice(0, 5);
  const cards = queue
    .slice(0, 6)
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.answerState)}</span>
        <h3>${escapeHtml(item.buyer)}</h3>
        <p>${escapeHtml(item.operatingQuestion)}</p>
        <div class="pills">
          <span class="pill">${escapeHtml(item.owner)}</span>
          <span class="pill">${escapeHtml(item.reviewStage)}</span>
        </div>
      </article>`
    )
    .join("");
  const riskRows = risks
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.buyer)}</td>
        <td>${escapeHtml(item.code)}</td>
        <td>${escapeHtml(item.severity)}</td>
        <td>${escapeHtml(item.message)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Overview",
    "/",
    `
      <h1>Turn security questionnaires into reusable answer packs.</h1>
      <p class="lede">Security Questionnaire Answer Studio keeps answer coverage, trust evidence, response maturity, and turnaround pressure in one executive surface so diligence stops feeling bespoke.</p>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Routes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled answer families in the current sample set.</div></div>
        <div class="metric"><span class="metric-label">Coverage</span><span class="metric-value">${executiveSummary.averageAnswerCoverage}</span><div class="metric-copy">Average questionnaire answer coverage across the library.</div></div>
        <div class="metric"><span class="metric-label">Evidence linkage</span><span class="metric-value">${executiveSummary.averageEvidenceLinkage}</span><div class="metric-copy">How tightly each answer pack points back to proof.</div></div>
        <div class="metric"><span class="metric-label">Response maturity</span><span class="metric-value">${executiveSummary.averageResponseMaturity}</span><div class="metric-copy">How reusable the current answer language is under review.</div></div>
        <div class="metric"><span class="metric-label">Reusable packs</span><span class="metric-value">${executiveSummary.reusableAnswerPacks}</span><div class="metric-copy">Answer families already strong enough to reuse right now.</div></div>
        <div class="metric"><span class="metric-label">Hours recovered</span><span class="metric-value">${formatNumber(executiveSummary.hoursRecoveredPerQuarter)}</span><div class="metric-copy">Modeled quarterly hours recovered when the packs get standardized.</div></div>
      </div>
      <section class="section">
        <h2>Questionnaire queue</h2>
        <p>Each route keeps the owner, buyer, headline gap, and next move visible before the next diligence cycle opens.</p>
        <div class="grid">${cards}</div>
      </section>
      <section class="table-wrap">
        <h2>Risk map</h2>
        <p>The risk map keeps missing standard answers, weak evidence links, slow turnaround, and blocked ownership visible before the questionnaire cycle drags the deal.</p>
        <table>
          <thead>
            <tr><th>Buyer</th><th>Code</th><th>Severity</th><th>Message</th></tr>
          </thead>
          <tbody>${riskRows}</tbody>
        </table>
      </section>
    `,
    "Executive answer-studio surface for security questionnaires, trust evidence, response ownership, and cycle-time reduction."
  );
}

export function renderQuestionnaireQueue() {
  const cards = questionnaireQueue()
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.answerState)}</span>
        <h3>${escapeHtml(item.buyer)}</h3>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Family:</strong> ${escapeHtml(item.questionnaireFamily)}</p>
        <p><strong>Question:</strong> ${escapeHtml(item.operatingQuestion)}</p>
        <p><strong>Gap:</strong> ${escapeHtml(item.headlineGap)}</p>
        <p><strong>Next move:</strong> ${escapeHtml(item.nextMove)}</p>
        <div class="pills">
          <span class="pill">${escapeHtml(item.reviewStage)}</span>
        </div>
      </article>`
    )
    .join("");

  return shell(
    "Questionnaire queue",
    "/questionnaire-queue",
    `
      <h1>Keep the answer queue and owner map visible.</h1>
      <p class="lede">The questionnaire queue shows which answer families are reusable, which need work, and where ownership is still blocking cycle-time improvement.</p>
      <section class="section">
        <h2>Answer queue</h2>
        <div class="grid">${cards}</div>
      </section>
    `,
    "Questionnaire queue for answer ownership, blocker visibility, and reusable security-response packaging."
  );
}

export function renderAnswerPacks() {
  const rows = answerPacks()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.buyer)}</td>
        <td>${escapeHtml(item.questionnaireFamily)}</td>
        <td>${item.answerCoverageScore}</td>
        <td>${item.responseMaturityScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Answer packs",
    "/answer-packs",
    `
      <h1>See which answers are reusable and which still fragment.</h1>
      <p class="lede">The answer-pack view turns questionnaire work into a readable inventory of coverage, response maturity, and company-tag context.</p>
      <section class="table-wrap">
        <h2>Reusable answer inventory</h2>
        <table>
          <thead>
            <tr><th>Owner</th><th>Buyer</th><th>Family</th><th>Coverage</th><th>Maturity</th><th>Company tags</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `,
    "Answer-pack inventory for reusable questionnaire responses, coverage, and response maturity."
  );
}

export function renderTrustEvidence() {
  const rows = trustEvidence()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.buyer)}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${item.trustEvidenceScore}</td>
        <td>${item.evidenceLinkageScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
        <td>${escapeHtml(item.relatedSurfaces.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Trust evidence",
    "/trust-evidence",
    `
      <h1>Keep every answer tied to actual proof.</h1>
      <p class="lede">The trust-evidence view keeps answer ownership, proof linkage, and the related live surfaces together before reviewers ask for receipts.</p>
      <section class="table-wrap">
        <h2>Evidence linkage</h2>
        <table>
          <thead>
            <tr><th>Buyer</th><th>Owner</th><th>Trust score</th><th>Evidence linkage</th><th>Company tags</th><th>Related surfaces</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `,
    "Trust-evidence inventory for answer packs, proof linkage, and diligence-ready supporting surfaces."
  );
}

export function renderCycleTime() {
  const cards = cycleTime()
    .map(
      (item) => `<article class="card">
        <span class="pill">${escapeHtml(item.answerState)}</span>
        <h3>${escapeHtml(item.buyer)}</h3>
        <p><strong>Turnaround:</strong> ${item.turnaroundDays} days</p>
        <p><strong>Board story:</strong> ${escapeHtml(item.boardStory)}</p>
        <p><strong>Gap:</strong> ${escapeHtml(item.headlineGap)}</p>
      </article>`
    )
    .join("");

  return shell(
    "Cycle time",
    "/cycle-time",
    `
      <h1>Reduce the rewrite tax on every review cycle.</h1>
      <p class="lede">The cycle-time view keeps turnaround pressure tied to answer quality so the team can see where a reusable pack saves the most effort.</p>
      <section class="section">
        <h2>Turnaround pressure</h2>
        <div class="grid">${cards}</div>
      </section>
    `,
    "Cycle-time view for questionnaire response pressure, ownership gaps, and answer-pack reuse."
  );
}

export function renderVerification() {
  const items = verification()
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  return shell(
    "Verification",
    "/verification",
    `
      <h1>Verification posture stays explicit.</h1>
      <p class="lede">The answer-studio surface is synthetic, read-only, and reproducible from the included sample export. This page keeps those guardrails easy to audit before the repo is shown externally.</p>
      <section class="section">
        <h2>Verification notes</h2>
        <ul>${items}</ul>
      </section>
    `,
    "Verification notes for the synthetic answer-studio surface, sample export, and read-only trust workflow."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `
      <h1>Security Questionnaire Answer Studio docs</h1>
      <p class="lede">This repo packages questionnaire-answer intelligence into one readable surface: queue, answer packs, trust evidence, cycle time, and risk map.</p>
      <section class="section">
        <h2>Core routes</h2>
        <ul>
          <li><code>/questionnaire-queue</code> keeps owner, buyer, blockers, and next move visible.</li>
          <li><code>/answer-packs</code> compares coverage and response maturity.</li>
          <li><code>/trust-evidence</code> shows where proof linkage is still too thin.</li>
          <li><code>/cycle-time</code> keeps turnaround drag tied to answer quality.</li>
          <li><code>/verification</code> makes the synthetic and read-only posture explicit.</li>
        </ul>
      </section>
    `,
    "Product documentation for Security Questionnaire Answer Studio and its queue, answer, trust, and cycle-time routes."
  );
}

export function renderSample() {
  return JSON.stringify(toExport(sampleSecurityQuestionnaireAnswerStudio, payload().generatedAt), null, 2);
}
