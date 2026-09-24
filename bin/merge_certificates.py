#!/usr/bin/env python3
"""Merge the certificate PDFs into the single file /academic-programs/ embeds.

Sources:  assets/pdf/academic/*.pdf   (one file per certificate, "1_Name.pdf")
Output:   assets/pdf/certificates.pdf (one frame on the page, bookmarked)

The output lives outside assets/pdf/academic/ on purpose: the page scans that
folder to build its list of individual downloads, and a merged file sitting in
there would show up as a certificate of its own.

Run after adding or removing a certificate, then commit both the new source
PDF and the regenerated merge:

    python bin/merge_certificates.py

Needs pypdf:  python -m pip install pypdf
"""

import re
import sys
from pathlib import Path

try:
    from pypdf import PdfWriter
except ImportError:
    sys.exit("pypdf is not installed. Run: python -m pip install pypdf")

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "assets" / "pdf" / "academic"
OUTPUT = ROOT / "assets" / "pdf" / "certificates.pdf"

# Same rule the Liquid template uses for headings: drop a leading "12_" or "3-".
PREFIX = re.compile(r"^[0-9]+[_\-\s]*")


def main() -> int:
    pdfs = sorted(SOURCE_DIR.glob("*.pdf"))
    if not pdfs:
        sys.exit(f"No PDFs in {SOURCE_DIR.relative_to(ROOT)}")

    writer = PdfWriter()
    for pdf in pdfs:
        title = PREFIX.sub("", pdf.stem)
        start = len(writer.pages)
        writer.append(str(pdf))
        writer.add_outline_item(title, start)
        print(f"  + {title}  ({len(writer.pages) - start} page(s))")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("wb") as fh:
        writer.write(fh)

    size_kb = OUTPUT.stat().st_size / 1024
    print(f"\n{OUTPUT.relative_to(ROOT)} — {len(writer.pages)} pages, {size_kb:.0f} KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
