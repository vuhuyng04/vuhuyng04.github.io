---
layout: page
permalink: /academic-programs/
title: Programs & Certificates
description: Programmes, certifications and specialised training completed.
nav: true
nav_order: 2
---

{%- comment -%}
  Two viewers:

  1. assets/pdf/aio2024.pdf      — the AI VIET NAM AIO2024 module certificates,
                                    kept on its own because it is a programme
                                    rather than a set of standalone courses.
  2. assets/pdf/certificates.pdf — the online certificates, merged from the
                                    individual PDFs in assets/pdf/academic/ by
                                    bin/merge_certificates.py, with a bookmark
                                    per certificate. The viewer's outline is how
                                    a reader reaches a single certificate; the
                                    source PDFs are not linked separately.

  Adding a certificate: drop the PDF into assets/pdf/academic/ named
  "5_Its Title.pdf", rerun bin/merge_certificates.py, commit both files.

  Every PDF URL carries ?v=<mtime>. The paths never change when a file is
  rebuilt, and PDF viewers hold on to the old bytes without it.

  TWO THINGS THIS FILE HAS TO GET RIGHT, both of which fail silently:

  1. Emit headings as HTML <h2>, not Markdown `##`. Liquid's trimming tags
     (`-%}`) swallow the blank line a Markdown heading needs to open a block,
     so headings after the first render as body text.

  2. Keep every emitted line flush at column 0. Markdown reads four leading
     spaces as a code block, so indenting this HTML for readability publishes
     the section as escaped source inside <pre><code>.
{%- endcomment -%}

{%- assign aio = nil -%}
{%- assign merged = nil -%}
{%- for f in site.static_files -%}
{%- if f.path == '/assets/pdf/aio2024.pdf' -%}{%- assign aio = f -%}{%- endif -%}
{%- if f.path == '/assets/pdf/certificates.pdf' -%}{%- assign merged = f -%}{%- endif -%}
{%- endfor -%}

{%- if aio -%}
{%- comment -%} Compute the stamp on its own line: chaining `| date` after `| append`
applies it to the whole concatenated string, and Liquid parses that as a date,
collapsing the entire URL to an epoch number. {%- endcomment -%}
{%- assign aio_v = aio.modified_time | date: '%s' -%}
{%- assign aio_url = aio.path | relative_url | append: '?v=' | append: aio_v -%}
<h2 id="ai-viet-nam-aio2024">AI VIET NAM — AIO2024</h2>
<p>Final examinations passed in all four modules of the one-year residency: Machine Learning, Deep Learning, Computer Vision and NLP, and GenAI and LLMs. Graduated 22 June 2025.</p>
<div class="pdf-container">
<embed src="{{ aio_url }}" type="application/pdf" />
</div>
{%- endif -%}

{%- if merged -%}
{%- assign merged_v = merged.modified_time | date: '%s' -%}
{%- assign merged_url = merged.path | relative_url | append: '?v=' | append: merged_v -%}
<hr>
<h2 id="certificates">Certificates</h2>
<div class="pdf-container">
<embed src="{{ merged_url }}" type="application/pdf" />
</div>
{%- endif -%}

{%- unless aio or merged -%}

## Being prepared

The supporting documents for this section are not online yet. In the meantime,
the [Resume page]({{ '/cv/' | relative_url }}) lists every programme and certificate,
each linked to its verification page.

{%- endunless -%}
