import { readFile } from "node:fs/promises";
import { analyze } from "./analyze.js";
import { formatJson, formatSummary } from "./format.js";
import type { QuestionnaireItem } from "./types.js";

const [, , filePath = "fixtures/security-questionnaire-answer-studio.json", format = "--format", output = "summary"] =
  process.argv;

if (format !== "--format" || !["summary", "json"].includes(output)) {
  console.error("usage: security-questionnaire-answer-studio <file> --format <summary|json>");
  process.exit(1);
}

const items = JSON.parse(await readFile(filePath, "utf8")) as QuestionnaireItem[];
const report = analyze(items);

process.stdout.write(output === "json" ? formatJson(report) : formatSummary(report));
