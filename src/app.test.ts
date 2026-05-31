import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("security-questionnaire-answer-studio app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/questionnaire-queue", "/answer-packs", "/trust-evidence", "/cycle-time", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/questionnaire-queue",
      "/api/answer-packs",
      "/api/trust-evidence",
      "/api/cycle-time",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
    }
  });
});
