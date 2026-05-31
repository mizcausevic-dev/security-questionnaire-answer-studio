import type { Finding, QuestionnaireExport, QuestionnaireItem, QuestionnaireReport } from "./types.js";

function average(items: QuestionnaireItem[], pick: (item: QuestionnaireItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: QuestionnaireItem): Finding[] {
  const findings: Finding[] = [];

  if (item.answerState === "REUSABLE" && item.answerCoverageScore >= 85 && item.evidenceLinkageScore >= 80) {
    findings.push({
      code: "reusable-pack",
      severity: "high",
      sector: item.sector,
      buyer: item.buyer,
      message: "This answer pack is strong enough to reuse across new diligence cycles right now."
    });
  }

  if (item.answerCoverageScore < 78 || item.responseMaturityScore < 70) {
    findings.push({
      code: "missing-standard-answer",
      severity: "high",
      sector: item.sector,
      buyer: item.buyer,
      message: "The answer library is still too weak or fragmented, so teams will keep rewriting security responses manually."
    });
  }

  if (item.evidenceLinkageScore < 74 || item.trustEvidenceScore < 70) {
    findings.push({
      code: "weak-evidence-link",
      severity: "medium",
      sector: item.sector,
      buyer: item.buyer,
      message: "The answer set is not tightly linked to trust evidence yet, so reviewers will still ask for manual follow-up."
    });
  }

  if (item.turnaroundDays > 7) {
    findings.push({
      code: "slow-turnaround",
      severity: item.turnaroundDays > 10 ? "high" : "low",
      sector: item.sector,
      buyer: item.buyer,
      message: "Questionnaire turnaround is still too slow, which drags procurement cycles and weakens deal momentum."
    });
  }

  if (item.answerState === "BLOCKED") {
    findings.push({
      code: "blocked-by-ownership",
      severity: "high",
      sector: item.sector,
      buyer: item.buyer,
      message: "This answer pack is blocked by missing ownership or packaging, so the buyer path cannot move cleanly."
    });
  }

  return findings;
}

export function analyze(items: QuestionnaireItem[], options: { now?: string } = {}): QuestionnaireReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const reusableAnswerPacks = items.filter((item) => item.answerState === "REUSABLE").length;
  const blockedAnswerPacks = items.filter((item) => item.answerState === "BLOCKED").length;
  const averageTurnaroundDays = Number(
    (items.reduce((sum, item) => sum + item.turnaroundDays, 0) / items.length).toFixed(1)
  );

  return {
    generatedAt,
    items: items.length,
    averageAnswerCoverage: average(items, (item) => item.answerCoverageScore),
    averageEvidenceLinkage: average(items, (item) => item.evidenceLinkageScore),
    averageResponseMaturity: average(items, (item) => item.responseMaturityScore),
    averageTrustEvidence: average(items, (item) => item.trustEvidenceScore),
    reusableAnswerPacks,
    blockedAnswerPacks,
    averageTurnaroundDays,
    hoursRecoveredPerQuarter: reusableAnswerPacks * 22 + items.filter((item) => item.turnaroundDays > 7).length * 11,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: QuestionnaireItem[], now?: string): QuestionnaireExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
