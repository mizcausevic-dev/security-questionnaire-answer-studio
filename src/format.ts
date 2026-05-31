import type { QuestionnaireReport } from "./types.js";

export function formatSummary(report: QuestionnaireReport) {
  return [
    `Generated: ${report.generatedAt}`,
    `Routes: ${report.items}`,
    `Average answer coverage: ${report.averageAnswerCoverage}`,
    `Average evidence linkage: ${report.averageEvidenceLinkage}`,
    `Average response maturity: ${report.averageResponseMaturity}`,
    `Average trust evidence: ${report.averageTrustEvidence}`,
    `Reusable answer packs: ${report.reusableAnswerPacks}`,
    `Blocked answer packs: ${report.blockedAnswerPacks}`,
    `Average turnaround days: ${report.averageTurnaroundDays}`,
    `Hours recovered per quarter: ${report.hoursRecoveredPerQuarter}`,
    `Findings: ${report.findingsList.length}`,
    `OK: ${report.ok ? "yes" : "no"}`
  ].join("\n");
}

export function formatJson(report: QuestionnaireReport) {
  return JSON.stringify(report, null, 2);
}
