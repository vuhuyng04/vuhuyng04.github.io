---
layout: page
permalink: /academic-programs/
title: Academic Programs & Certificates
description: Programmes, certifications and specialised training completed.
nav: true
nav_order: 4
---

{%- comment -%}
  Sections are built from whatever PDFs sit in assets/pdf/academic/, rather
  than from a hard-coded list, so adding a document means dropping a file in
  and pushing — no edit here.

  The filename becomes the heading. Prefix with a number to control the order:

      assets/pdf/academic/1_IBM Data Science.pdf   ->  "IBM Data Science"
      assets/pdf/academic/2_Deep Learning.pdf      ->  "Deep Learning"

  The numeric prefix is stripped for display. With the folder empty the page
  says the section is being prepared instead of embedding a broken viewer.

  Headings and separators are written as HTML rather than Markdown on purpose:
  Liquid's whitespace-trimming tags swallow the blank line a Markdown `##`
  needs to start a block, so every heading after the first silently rendered
  as body text.
{%- endcomment -%}

{%- assign pdfs = site.static_files | where_exp: "f", "f.extname == '.pdf'" | where_exp: "f", "f.path contains '/assets/pdf/academic/'" | sort: "path" -%}

{%- if pdfs.size > 0 -%}
  {%- for f in pdfs -%}
    {%- assign section_title = f.basename | regex_replace: '^[0-9]+[_\-\s]*', '' -%}
    {%- assign pdf_url = f.path | relative_url -%}

    {%- unless forloop.first %}<hr>{% endunless -%}

    <h2 id="{{ section_title | slugify }}">{{ section_title }}</h2>

    <div class="pdf-container">
      <embed src="{{ pdf_url }}" type="application/pdf" />
    </div>

    <p class="pdf-download">
      <a href="{{ pdf_url }}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <i class="fa-solid fa-download"></i> Download full document
      </a>
    </p>
  {%- endfor -%}
{%- else -%}

## Being prepared

The supporting documents for this section are not online yet. In the meantime,
the [CV page]({{ '/cv/' | relative_url }}) lists every programme and certificate,
each linked to its verification page.

{%- endif -%}
