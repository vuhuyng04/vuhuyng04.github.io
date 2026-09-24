---
layout: page
permalink: /academic-programs/
title: Academic Programs & Certificates
description: Programmes, certifications and specialised training completed.
nav: true
nav_order: 4
---

{%- comment -%}
  One viewer, not one per certificate.

  assets/pdf/certificates.pdf is the merged file, built by bin/merge_certificates.py
  from the individual PDFs in assets/pdf/academic/. It carries a bookmark per
  certificate, so the viewer's outline doubles as the table of contents.

  The individual files stay in assets/pdf/academic/ and are listed underneath as
  direct downloads — that list is generated from the folder, so adding a
  certificate means: drop the PDF in, rerun bin/merge_certificates.py, commit both.

  TWO THINGS THIS FILE HAS TO GET RIGHT, both of which fail silently:

  1. Emit headings as HTML <h2>, not Markdown `##`. Liquid's trimming tags
     (`-%}`) swallow the blank line a Markdown heading needs to open a block,
     so headings after the first render as body text.

  2. Keep every emitted line flush at column 0. Markdown reads four leading
     spaces as a code block, so indenting this HTML for readability publishes
     the section as escaped source inside <pre><code>.
{%- endcomment -%}

{%- assign merged = nil -%}
{%- for f in site.static_files -%}
{%- if f.path == '/assets/pdf/certificates.pdf' -%}{%- assign merged = f -%}{%- endif -%}
{%- endfor -%}
{%- assign pdfs = site.static_files | where_exp: "f", "f.extname == '.pdf'" | where_exp: "f", "f.path contains '/assets/pdf/academic/'" | sort: "path" -%}

{%- if merged -%}
{%- comment -%} ?v= busts the browser cache: the path never changes when the merged
PDF is rebuilt, and PDF viewers hold on to the old bytes. {%- endcomment -%}
{%- assign merged_url = merged.path | relative_url | append: '?v=' | append: merged.modified_time | date: '%s' -%}
<div class="pdf-container">
<embed src="{{ merged_url }}" type="application/pdf" />
</div>
<p class="pdf-download">
<a href="{{ merged_url }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
<i class="fa-solid fa-download"></i> Download all certificates
</a>
</p>
{%- if pdfs.size > 0 -%}
<h2 id="individual-certificates">Individual certificates</h2>
<ul class="cert-list">
{%- for f in pdfs -%}
{%- assign cert_title = f.basename | regex_replace: '^[0-9]+[_\-\s]*', '' -%}
<li><a href="{{ f.path | relative_url }}?v={{ f.modified_time | date: '%s' }}" target="_blank" rel="noopener noreferrer"><i class="fa-regular fa-file-pdf"></i> {{ cert_title }}</a></li>
{%- endfor -%}
</ul>
{%- endif -%}
{%- else -%}

## Being prepared

The supporting documents for this section are not online yet. In the meantime,
the [CV page]({{ '/cv/' | relative_url }}) lists every programme and certificate,
each linked to its verification page.

{%- endif -%}
