export type QuestionnaireSector =
  | "AI_PLATFORM"
  | "CLOUD_IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "GOVTECH_PUBLIC_SECTOR"
  | "HEALTHTECH";

export type ReviewStage = "INTAKE" | "SECURITY_REVIEW" | "LEGAL_REVIEW" | "PROCUREMENT_REVIEW";
export type AnswerState = "REUSABLE" | "NEEDS_WORK" | "BLOCKED";

export interface QuestionnaireItem {
  id: string;
  owner: string;
  buyer: string;
  sector: QuestionnaireSector;
  reviewStage: ReviewStage;
  answerState: AnswerState;
  questionnaireFamily: string;
  operatingQuestion: string;
  currentAnswer: string;
  headlineGap: string;
  answerCoverageScore: number;
  evidenceLinkageScore: number;
  responseMaturityScore: number;
  trustEvidenceScore: number;
  turnaroundDays: number;
  boardStory: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
}

export interface QuestionnaireExport {
  generatedAt: string;
  items: QuestionnaireItem[];
}

export type FindingCode =
  | "missing-standard-answer"
  | "weak-evidence-link"
  | "slow-turnaround"
  | "reusable-pack"
  | "blocked-by-ownership";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  sector: QuestionnaireSector;
  buyer: string;
  message: string;
}

export interface QuestionnaireReport {
  generatedAt: string;
  items: number;
  averageAnswerCoverage: number;
  averageEvidenceLinkage: number;
  averageResponseMaturity: number;
  averageTrustEvidence: number;
  reusableAnswerPacks: number;
  blockedAnswerPacks: number;
  averageTurnaroundDays: number;
  hoursRecoveredPerQuarter: number;
  findingsList: Finding[];
  ok: boolean;
}
