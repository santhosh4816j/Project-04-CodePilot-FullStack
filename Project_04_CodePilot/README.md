# CodePilot — Project 04 / 20

Advanced local developer code review workspace. Includes static rules, quality scoring, history, and optional offline AI assistance through Ollama.

## Requirements
- Node.js 20 or newer
- Optional: Ollama with `qwen2.5-coder:1.5b` installed for local AI

## Run on Windows
```powershell
npm.cmd start
```
Open **http://localhost:4004**.

No `npm install` is necessary: the base project uses only Node.js built-ins.

## Optional AI setup
1. Install Ollama from https://ollama.com
2. In a separate terminal: `ollama pull qwen2.5-coder:1.5b`
3. Ensure Ollama is running on its default port 11434.
4. In the app, select Review, Refactor, Explain, or Generate Tests, then click **Ask local AI**.

Ollama downloads a model, so internet is required for the first pull. Thereafter it can run locally. Model quality depends on your hardware and model choice.

## Test
```powershell
npm.cmd test
```

## Features
- Multi-language snippet workspace (JavaScript, TypeScript, Python, Java)
- Heuristic static analysis: embedded secrets, dynamic evaluation, DOM HTML injection, console logging, TODOs, long lines, Python bare except
- Severity, line numbers, suggested fixes, and quality scoring
- Persisted analysis sessions at `data/sessions.json`
- Optional Ollama-powered review, refactor, explanation and test generation
- Download current snippet
- Responsive developer dashboard

## Honest limitations
The built-in static analyzer is rule-based, not a compiler or full AST analyzer. Its findings can include false positives and it cannot prove that code is safe. AI output is advisory and should be reviewed before use. No arbitrary user code is executed. This is a localhost development application, not a production-hardened multi-user service. Avoid pasting confidential source into any AI model you do not trust.
