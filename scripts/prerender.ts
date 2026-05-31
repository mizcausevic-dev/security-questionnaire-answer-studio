import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  renderAnswerPacks,
  renderCycleTime,
  renderDocs,
  renderOverview,
  renderQuestionnaireQueue,
  renderSample,
  renderTrustEvidence,
  renderVerification
} from "../src/services/render.js";
import {
  answerPacks,
  cycleTime,
  payload,
  questionnaireQueue,
  summary,
  trustEvidence,
  verification
} from "../src/services/verticalBriefService.js";

const outDir = path.resolve("site");

async function emit(filePath: string, contents: string) {
  const target = path.join(outDir, filePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, contents, "utf8");
}

await rm(outDir, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("questionnaire-queue", "index.html")]: renderQuestionnaireQueue(),
  [path.join("answer-packs", "index.html")]: renderAnswerPacks(),
  [path.join("trust-evidence", "index.html")]: renderTrustEvidence(),
  [path.join("cycle-time", "index.html")]: renderCycleTime(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://questionnaire.kineticgain.com/sitemap.xml\n",
  "sitemap.xml":
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://questionnaire.kineticgain.com/</loc></url><url><loc>https://questionnaire.kineticgain.com/questionnaire-queue/</loc></url><url><loc>https://questionnaire.kineticgain.com/answer-packs/</loc></url><url><loc>https://questionnaire.kineticgain.com/trust-evidence/</loc></url><url><loc>https://questionnaire.kineticgain.com/cycle-time/</loc></url><url><loc>https://questionnaire.kineticgain.com/verification/</loc></url><url><loc>https://questionnaire.kineticgain.com/docs/</loc></url></urlset>',
  [path.join("api", "dashboard-summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "questionnaire-queue.json")]: JSON.stringify(questionnaireQueue(), null, 2),
  [path.join("api", "answer-packs.json")]: JSON.stringify(answerPacks(), null, 2),
  [path.join("api", "trust-evidence.json")]: JSON.stringify(trustEvidence(), null, 2),
  [path.join("api", "cycle-time.json")]: JSON.stringify(cycleTime(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: renderSample(),
  [path.join("api", "payload.json")]: JSON.stringify(payload(), null, 2)
};

for (const [filePath, contents] of Object.entries(files)) {
  await emit(filePath, contents);
}
