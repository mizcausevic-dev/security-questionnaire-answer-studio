import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleSecurityQuestionnaireAnswerStudio } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleSecurityQuestionnaireAnswerStudio, { now: "2026-05-31T23:40:00Z" });
    expect(report.items).toBe(7);
  });

  it("computes positive answer-studio metrics", () => {
    const report = analyze(sampleSecurityQuestionnaireAnswerStudio, { now: "2026-05-31T23:40:00Z" });
    expect(report.averageAnswerCoverage).toBeGreaterThan(0);
    expect(report.averageTrustEvidence).toBeGreaterThan(0);
    expect(report.averageEvidenceLinkage).toBeGreaterThan(0);
    expect(report.averageResponseMaturity).toBeGreaterThan(0);
  });

  it("counts reusable and blocked answer packs", () => {
    const report = analyze(sampleSecurityQuestionnaireAnswerStudio, { now: "2026-05-31T23:40:00Z" });
    expect(report.reusableAnswerPacks).toBeGreaterThanOrEqual(1);
    expect(report.blockedAnswerPacks).toBeGreaterThanOrEqual(1);
  });

  it("emits answer quality and ownership findings", () => {
    const report = analyze(sampleSecurityQuestionnaireAnswerStudio, { now: "2026-05-31T23:40:00Z" });
    expect(report.findingsList.some((finding) => finding.code === "reusable-pack")).toBe(true);
    expect(
      report.findingsList.some((finding) =>
        ["missing-standard-answer", "weak-evidence-link", "slow-turnaround", "blocked-by-ownership"].includes(
          finding.code
        )
      )
    ).toBe(true);
  });

  it("rolls up recovered time", () => {
    const report = analyze(sampleSecurityQuestionnaireAnswerStudio, { now: "2026-05-31T23:40:00Z" });
    expect(report.hoursRecoveredPerQuarter).toBeGreaterThan(0);
  });
});
