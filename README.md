# Security Questionnaire Answer Studio

Executive answer-studio surface for security questionnaires, trust evidence, response ownership, and cycle-time reduction across the Kinetic Gain executive-intelligence estate.

- Live: `https://questionnaire.kineticgain.com/`
- Repo: `mizcausevic-dev/security-questionnaire-answer-studio`

## What it does
- maps enterprise questionnaire routes to answer ownership, trust evidence, blockers, and next move
- keeps questionnaire coverage, response maturity, evidence readiness, and cycle-time pressure in one lane
- separates reusable answer packs from blocked or weak response areas before the next security or legal review
- exposes the same questionnaire posture through HTML, JSON APIs, screenshots, and a reproducible CLI

## Routes
- `/`
- `/questionnaire-queue`
- `/answer-packs`
- `/trust-evidence`
- `/cycle-time`
- `/verification`
- `/docs`

## Local run
```powershell
cd security-questionnaire-answer-studio
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI
```powershell
npx security-questionnaire-answer-studio fixtures/security-questionnaire-answer-studio.json --format summary
npx security-questionnaire-answer-studio fixtures/security-questionnaire-answer-studio-clean.json --format json
```

## Verification
- synthetic sample data only
- no live customer questionnaires, security packets, or private diligence documents
- all routes and packets are generated from the sample export in this repo
