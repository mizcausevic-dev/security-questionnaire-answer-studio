import { describe, expect, it } from "vitest";
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

describe("security questionnaire answer studio service", () => {
  it("returns an executive summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the questionnaire queue", () => {
    expect(questionnaireQueue()[0]?.buyer).toBeTruthy();
  });

  it("returns the answer packs view", () => {
    expect(answerPacks()[0]?.answerCoverageScore).toBeGreaterThan(0);
  });

  it("returns the trust evidence view", () => {
    expect(trustEvidence()[0]?.trustEvidenceScore).toBeGreaterThan(0);
  });

  it("returns cycle time", () => {
    expect(cycleTime()[0]?.boardStory).toBeTruthy();
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
    expect(payload().verification.length).toBeGreaterThan(0);
  });
});
