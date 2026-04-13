---
name: slides-grab-card-news
description: Generate square Instagram-style card news by reusing the slides-grab workflow with card-news mode enabled.
metadata:
  short-description: Square card-news workflow on top of slides-grab
---

# slides-grab Card News Skill (Codex)

Use this when the user wants card news instead of a widescreen presentation.

## Goal
Reuse the existing slides-grab plan/design/export workflow, but generate **square** outputs optimized for Instagram posts.

## Workflow
1. Reuse the normal outline process from `slides-grab-plan`.
2. During design and review, keep every card at **720pt x 720pt** and run:
   - `slides-grab validate --slides-dir <path> --mode card-news`
   - `slides-grab build-viewer --slides-dir <path> --mode card-news`
   - `slides-grab edit --slides-dir <path> --mode card-news`
3. During export, reuse the normal export policy with card-news sizing:
   - `slides-grab convert --slides-dir <path> --mode card-news --output <name>.pptx`
   - `slides-grab pdf --slides-dir <path> --slide-mode card-news --output <name>.pdf`
   - `slides-grab figma --slides-dir <path> --mode card-news --output <name>-figma.pptx`
4. Remind the user that PPTX/Figma exports remain experimental / unstable.

## Rules
- Optimize layouts for square Instagram-style card news, not 16:9 slides.
- Reuse existing design, viewer, editor, and export policy wherever possible.
- Do **not** implement SNS/Instagram publishing automation.
- Use the packaged CLI and bundled skills only.
