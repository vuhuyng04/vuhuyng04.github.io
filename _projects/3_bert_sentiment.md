---
layout: page
title: Fine-tuned BERT for Vietnamese Sentiment Classification
description: BERT fine-tuned on the NTC-SCV dataset, served as a web app
img: assets/img/projects/bert-sentiment.png
importance: 4
category: work
github: https://github.com/vuhuyng04/finetune-bert-ntc-scv-sentiment
---

BERT fine-tuned on the **NTC-SCV** dataset for Vietnamese sentiment analysis, with
the full training pipeline published so the result can be reproduced.

- **Task** — binary sentiment (positive / negative) on Vietnamese review text
- **Data** — NTC-SCV, a Vietnamese sentiment corpus
- **Model** — BERT fine-tuned end to end, training notebook included in the repository
- **Serving** — Flask application that classifies a sentence typed into the page

## Demo

{% include figure.liquid loading="lazy" path="assets/img/projects/bert-sentiment.png" class="img-fluid rounded z-depth-1" zoomable=true alt="The app classifying a Vietnamese sentence as negative sentiment" %}

Type a sentence, get the sentiment back. The
[animated walkthrough](https://github.com/vuhuyng04/finetune-bert-ntc-scv-sentiment/blob/HEAD/demo.gif)
in the repository shows both the positive and the negative path.

Code: [vuhuyng04/finetune-bert-ntc-scv-sentiment](https://github.com/vuhuyng04/finetune-bert-ntc-scv-sentiment) · 2024
