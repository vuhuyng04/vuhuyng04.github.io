---
layout: page
title: Intelligent CV–Job Description Matching
description: Capstone project and the basis of the EAI FISAT 2026 paper — multi-view matching for recruitment decision support
img: assets/img/projects/cv-job-matching.jpg
importance: 1
category: work
---

My graduation capstone at **FPT University** (AIP491, Can Tho, August 2026), supervised
by **Dr. Le The Anh**, and the work behind the paper accepted to
[EAI FISAT 2026]({{ '/publications/' | relative_url }}).

A recruiter pastes a job description and uploads candidate CVs; the system returns a
match score, a ranking, and a side-by-side comparison, rather than the keyword overlap
that conventional screening relies on.

## Approach

- **Multi-view decomposition** — an LLM restructures each unstructured CV into 10 views
  and each job description into 5, so the comparison happens between comparable facets
  instead of between two walls of text
- **Cross-view interaction** — every CV view is paired with every JD view and scored by a
  cross-encoder transformer, producing an alignment matrix
- **Filtering** — a binary mask keeps the informative pairs; the masked matrix is
  flattened into an information fusion layer
- **Multi-task objective** — regression, classification and contrastive losses combined
  with trainable weights, giving both a continuous matching score and a match/mismatch
  decision

Evaluated against single-view and multi-view baselines on three datasets:
Resume-Score-Details, a Vietnamese–English benchmark, and Resume-Job-Description-Fit.

## System

Built as three services — a React front end, a FastAPI back end, and a separate AI
service — covering CV storage, CV–JD matching, ranking, pairwise comparison and search.

## Demo

{% include figure.liquid loading="lazy" path="assets/img/projects/cv-job-matching.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="The CV Comparison screen, scoring two candidate CVs against one job description" %}

Team project with Thai Phong Huan, Dang Hoang Kiet and Nguyen Thi Bich Tuyen · 2026
