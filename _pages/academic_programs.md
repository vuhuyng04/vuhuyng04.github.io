---
layout: page
permalink: /academic-programs/
title: Academic Programs & Certificates
description: Programmes, certifications and specialised training completed.
nav: true
nav_order: 4
---

{%- comment -%}
  Two viewers:

  1. assets/pdf/aio2024.pdf      — the AI VIET NAM AIO2024 module certificates,
                                    kept on its own because it is a programme
                                    rather than a set of standalone courses.
  2. assets/pdf/certificates.pdf — the online certificates, merged from the
                                    individual PDFs in assets/pdf/academic/ by
                                    bin/merge_certificates.py, with a bookmark
                                    per certificate. Those individual files are
                                    listed underneath as direct downloads.

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
{%- assign pdfs = site.static_files | where_exp: "f", "f.extname == '.pdf'" | where_exp: "f", "f.path contains '/assets/pdf/academic/'" | sort: "path" -%}

{%- if aio -%}
{%- assign aio_url = aio.path | relative_url | append: '?v=' | append: aio.modified_time | date: '%s' -%}
<h2 id="ai-viet-nam-aio2024">AI VIET NAM — AIO2024</h2>
<p>Final examinations passed in all four modules of the one-year residency: Machine Learning, Deep Learning, Computer Vision and NLP, and GenAI and LLMs. Graduated 22 June 2025.</p>
<div class="pdf-container">
<embed src="{{ aio_url }}" type="application/pdf" />
</div>
<p class="pdf-download">
<a href="{{ aio_url }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
<i class="fa-solid fa-download"></i> Download AIO2024 certificates
</a>
</p>
{%- endif -%}

{%- if merged -%}
{%- assign merged_url = merged.path | relative_url | append: '?v=' | append: merged.modified_time | date: '%s' -%}
<hr>
<h2 id="certificates">Certificates</h2>
<div class="pdf-container">
<embed src="{{ merged_url }}" type="application/pdf" />
</div>
<p class="pdf-download">
<a href="{{ merged_url }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
<i class="fa-solid fa-download"></i> Download all certificates
</a>
</p>
{%- if pdfs.size > 0 -%}
<ul class="cert-list">
{%- for f in pdfs -%}
{%- assign cert_title = f.basename | regex_replace: '^[0-9]+[_\-\s]*', '' -%}
<li><a href="{{ f.path | relative_url }}?v={{ f.modified_time | date: '%s' }}" target="_blank" rel="noopener noreferrer"><i class="fa-regular fa-file-pdf"></i> {{ cert_title }}</a></li>
{%- endfor -%}
</ul>
{%- endif -%}
{%- endif -%}

{%- unless aio or merged -%}

## Being prepared

The supporting documents for this section are not online yet. In the meantime,
the [CV page]({{ '/cv/' | relative_url }}) lists every programme and certificate,
each linked to its verification page.

{%- endunless -%}
