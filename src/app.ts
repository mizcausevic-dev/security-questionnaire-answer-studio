import express from "express";
import {
  renderAnswerPacks,
  renderCycleTime,
  renderDocs,
  renderOverview,
  renderQuestionnaireQueue,
  renderSample,
  renderTrustEvidence,
  renderVerification
} from "./services/render.js";
import {
  answerPacks,
  cycleTime,
  payload,
  questionnaireQueue,
  riskMap,
  summary,
  trustEvidence,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/questionnaire-queue", (_req, res) => res.type("html").send(renderQuestionnaireQueue()));
  app.get("/answer-packs", (_req, res) => res.type("html").send(renderAnswerPacks()));
  app.get("/trust-evidence", (_req, res) => res.type("html").send(renderTrustEvidence()));
  app.get("/cycle-time", (_req, res) => res.type("html").send(renderCycleTime()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/questionnaire-queue", (_req, res) => res.json(questionnaireQueue()));
  app.get("/api/answer-packs", (_req, res) => res.json(answerPacks()));
  app.get("/api/trust-evidence", (_req, res) => res.json(trustEvidence()));
  app.get("/api/cycle-time", (_req, res) => res.json(cycleTime()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.type("application/json").send(renderSample()));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? "3000");
  createApp().listen(port, () => {
    console.log(`security-questionnaire-answer-studio listening on http://127.0.0.1:${port}`);
  });
}
