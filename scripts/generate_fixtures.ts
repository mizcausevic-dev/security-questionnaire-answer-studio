import { readdir, rm, writeFile } from "node:fs/promises";
import { sampleSecurityQuestionnaireAnswerStudio } from "../src/data/sampleVerticalBrief.js";

async function main() {
  const clean = sampleSecurityQuestionnaireAnswerStudio.map((item) => ({
    ...item,
    answerState: item.answerState === "BLOCKED" ? ("NEEDS_WORK" as const) : item.answerState,
    answerCoverageScore: Math.max(item.answerCoverageScore, 84),
    evidenceLinkageScore: Math.max(item.evidenceLinkageScore, 80),
    responseMaturityScore: Math.max(item.responseMaturityScore, 82),
    trustEvidenceScore: Math.max(item.trustEvidenceScore, 80),
    turnaroundDays: Math.min(item.turnaroundDays, 6)
  }));

  await writeFile(
    "fixtures/security-questionnaire-answer-studio.json",
    JSON.stringify(sampleSecurityQuestionnaireAnswerStudio, null, 2) + "\n"
  );
  await writeFile(
    "fixtures/security-questionnaire-answer-studio-clean.json",
    JSON.stringify(clean, null, 2) + "\n"
  );

  const expected = new Set([
    "security-questionnaire-answer-studio.json",
    "security-questionnaire-answer-studio-clean.json"
  ]);
  for (const file of await readdir("fixtures")) {
    if (expected.has(file)) {
      continue;
    }
    try {
      await rm(`fixtures/${file}`);
    } catch {
      // Ignore cleanup misses during scaffold replacement.
    }
  }
}

await main();
