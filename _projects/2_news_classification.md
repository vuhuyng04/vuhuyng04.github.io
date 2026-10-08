---
layout: page
title: Vietnam News Crawling and Text Classification
description: End-to-end Vietnamese news pipeline, from scraping to a deployed classifier
img: assets/img/projects/news-classification.jpg
importance: 3
category: work
github: https://github.com/vuhuyng04/craw_data_VietnamNews_and_classification
---

An end-to-end Vietnamese news pipeline, from raw web pages to a classifier
serving predictions over HTTP.

- **Collection** — scraped and cleaned thousands of articles into a structured dataset
- **Features** — TF-IDF over the article text
- **Model** — multi-class XGBoost, evaluated on accuracy and F1 with a confusion matrix
- **Serving** — Flask application doing real-time inference, with the model,
  vectoriser and label mapping serialised for reuse

## Demo

{% include figure.liquid loading="lazy" path="assets/img/projects/news-classification.jpg" class="img-fluid rounded z-depth-1" zoomable=true alt="Classification result showing the predicted category and a confidence score" %}

Paste an article, get its category back with a confidence score. The
[animated walkthrough](https://github.com/vuhuyng04/craw_data_VietnamNews_and_classification/blob/HEAD/demo.gif)
in the repository runs through the whole flow.

Code: [vuhuyng04/craw_data_VietnamNews_and_classification](https://github.com/vuhuyng04/craw_data_VietnamNews_and_classification) · 2025
