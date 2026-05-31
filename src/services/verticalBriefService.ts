import { analyze } from "../analyze.js";
import { sampleSecurityQuestionnaireAnswerStudio } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleSecurityQuestionnaireAnswerStudio, { now: "2026-05-31T23:59:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageAnswerCoverage: report.averageAnswerCoverage,
    averageEvidenceLinkage: report.averageEvidenceLinkage,
    averageResponseMaturity: report.averageResponseMaturity,
    averageTrustEvidence: report.averageTrustEvidence,
    reusableAnswerPacks: report.reusableAnswerPacks,
    blockedAnswerPacks: report.blockedAnswerPacks,
    averageTurnaroundDays: report.averageTurnaroundDays,
    hoursRecoveredPerQuarter: report.hoursRecoveredPerQuarter,
    highFindings,
    recommendation:
      "Standardize AI, identity, and healthcare answer packs first, tighten FinTech and biotech evidence linkage next, and package public-sector ownership as the final explicit unblocker."
  };
}

export function questionnaireQueue() {
  return sampleSecurityQuestionnaireAnswerStudio.map((item) => ({
    owner: item.owner,
    buyer: item.buyer,
    reviewStage: item.reviewStage,
    answerState: item.answerState,
    questionnaireFamily: item.questionnaireFamily,
    operatingQuestion: item.operatingQuestion,
    headlineGap: item.headlineGap,
    nextMove: item.nextMove
  }));
}

export function answerPacks() {
  return sampleSecurityQuestionnaireAnswerStudio.map((item) => ({
    owner: item.owner,
    buyer: item.buyer,
    questionnaireFamily: item.questionnaireFamily,
    answerCoverageScore: item.answerCoverageScore,
    responseMaturityScore: item.responseMaturityScore,
    currentAnswer: item.currentAnswer,
    companyTags: item.companyTags
  }));
}

export function trustEvidence() {
  return sampleSecurityQuestionnaireAnswerStudio.map((item) => ({
    buyer: item.buyer,
    owner: item.owner,
    trustEvidenceScore: item.trustEvidenceScore,
    evidenceLinkageScore: item.evidenceLinkageScore,
    companyTags: item.companyTags,
    relatedSurfaces: item.relatedSurfaces
  }));
}

export function cycleTime() {
  return sampleSecurityQuestionnaireAnswerStudio.map((item) => ({
    buyer: item.buyer,
    answerState: item.answerState,
    turnaroundDays: item.turnaroundDays,
    boardStory: item.boardStory,
    headlineGap: item.headlineGap
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic questionnaire data only - no live customer questionnaires, answer packets, or security evidence are included.",
    "Coverage, evidence linkage, response maturity, trust evidence, and turnaround metrics are modeled from the sample answer-studio set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can package reusable security-questionnaire answers as an executive product.",
    "Company tags and related surfaces are synthetic answer-design aids rather than audited references.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    questionnaireQueue: questionnaireQueue(),
    answerPacks: answerPacks(),
    trustEvidence: trustEvidence(),
    cycleTime: cycleTime(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleSecurityQuestionnaireAnswerStudio
  };
}
