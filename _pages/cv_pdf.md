---
layout: page
permalink: /cv-pdf/
title: Resume (PDF)
nav: false
---

{%- comment -%}
  The PDF icon on /cv/ and the CV icon under the profile photo both point here
  rather than straight at a file, so that the link keeps working while no PDF
  has been uploaded yet.

  Drop a .pdf into assets/pdf/cv/ (any filename) and this page forwards to it.
  Leave the folder empty and it says the CV is being updated instead. No file
  paths to keep in sync — the theme's own `cv_pdf` setting takes a fixed path
  and would 404 the moment the file is missing or renamed.
{%- endcomment -%}

{%- assign cv_file = nil -%}
{%- for f in site.static_files -%}
  {%- if f.extname == '.pdf' and f.path contains '/assets/pdf/cv/' -%}
    {%- assign cv_file = f -%}
  {%- endif -%}
{%- endfor -%}

{%- if cv_file -%}
{%- assign cv_url = cv_file.path | relative_url -%}
<meta http-equiv="refresh" content="0; url={{ cv_url }}">

Opening the CV… if nothing happens, [download it here]({{ cv_url }}).

<script>
  window.location.replace({{ cv_url | jsonify }});
</script>
{%- else -%}

## The PDF is being updated

There is no downloadable CV here at the moment. Everything in it is on the
[Resume page]({{ '/cv/' | relative_url }}), which is always current.

{%- endif -%}
