import { describe, expect, it } from "vitest";
import { renderOverview } from "./render.js";

describe("render service", () => {
  it("includes the product title in overview", () => {
    expect(renderOverview()).toContain("Security Questionnaire Answer Studio");
  });
});
