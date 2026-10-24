"""
One-page concession portfolio summary for prospective investors.

Figures are the registry values in src/lib/companies-data.ts (Oct 2026),
including the revised Hilal Abad (9.75 sq km) and Skardu Placer Gold
(0.57 sq km, 9.5 km of riverbed) boundaries. Deliberately excludes
boundary coordinates and department application numbers, both of which the
owners treat as confidential. Update ROWS whenever the registry changes.

    python scripts/build_portfolio_summary.py
"""
import os
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable,
)

COPPER = colors.HexColor("#B05B29")
INK = colors.HexColor("#1A1A1A")
GREY = colors.HexColor("#5A5A5A")
LIGHT = colors.HexColor("#8A8A8A")
RULE = colors.HexColor("#E4DFD8")
ROW_ALT = colors.HexColor("#F7F3EE")
HEAD_BG = colors.HexColor("#1A1A1A")
PRODUCING_BG = colors.HexColor("#E8F2EA")
PRODUCING_FG = colors.HexColor("#256B3A")

OUT = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..",
    "Durr & Zircon - Concession Portfolio (Oct 2026).pdf",
)

S = {
    "kicker": ParagraphStyle("k", fontName="Helvetica-Bold", fontSize=8.5, textColor=COPPER, leading=11),
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=21, textColor=INK, leading=25),
    "sub": ParagraphStyle("sub", fontName="Helvetica", fontSize=10, textColor=GREY, leading=14),
    "fig": ParagraphStyle("fig", fontName="Helvetica-Bold", fontSize=17, textColor=COPPER, leading=20),
    "figl": ParagraphStyle("figl", fontName="Helvetica", fontSize=8, textColor=GREY, leading=10),
    "th": ParagraphStyle("th", fontName="Helvetica-Bold", fontSize=7.8, textColor=colors.white, leading=10),
    "td": ParagraphStyle("td", fontName="Helvetica", fontSize=8.2, textColor=INK, leading=10.5),
    "tdb": ParagraphStyle("tdb", fontName="Helvetica-Bold", fontSize=8.2, textColor=INK, leading=10.5),
    "tdr": ParagraphStyle("tdr", fontName="Helvetica-Bold", fontSize=8.6, textColor=INK, leading=10.5, alignment=2),
    "note": ParagraphStyle("note", fontName="Helvetica", fontSize=7.8, textColor=GREY, leading=10.5),
    "noteb": ParagraphStyle("noteb", fontName="Helvetica-Bold", fontSize=8.2, textColor=INK, leading=11),
    "contact": ParagraphStyle("c", fontName="Helvetica", fontSize=8.6, textColor=INK, leading=12),
}

# (concession, location, minerals, area_sq_km, area_note, stage, road, holder)
ROWS = [
    ("Hilal Abad", "Kharmang", "Premium nephrite jade, serpentine, copper", 9.75, "", "Producing", True, "Zircon Mines"),
    ("Bagicha", "Skardu", "Copper (vein at surface), snow white marble, ruby, lithium indications, quartz", 20.00, "", "Producing", True, "Durr Mines"),
    ("Jutial Nala", "Gilgit", "Copper veins, lead, silver", 9.97, "", "Producing", False, "Earth Lux"),
    ("Skardu Placer Gold", "Skardu", "Placer gold, black sand", 0.57, "9.5 km of riverbed", "Producing", True, "Durr Mines"),
    ("Gultari", "Gultari", "Copper, gold, molybdenum, antimony, lead, gemstones", 20.00, "", "Exploration", False, "Durr Mines"),
    ("Mahdi Abad", "Kharmang", "Serpentine, nephrite (initial samples), copper, iron, silver", 9.90, "", "Exploration", True, "Durr Mines"),
    ("Shigar (Askoli)", "Shigar", "Gold, lead, lithium, copper, gemstones", 8.87, "", "Exploration", False, "Zircon Mines"),
    ("Gupis", "Ghizer", "Copper, granite, premium marble", 10.00, "", "Exploration", False, "Earth Lux"),
    ("Gojal", "Hunza", "Antimony, molybdenum indications", 10.00, "", "Exploration licence applied", False, "Zircon Mines"),
    ("Ishkoman", "Ghizer", "Antimony, granite", 10.00, "", "Reconnaissance licence applied", False, "Zircon Mines"),
]

total = sum(r[3] for r in ROWS)
producing = [r for r in ROWS if r[5] == "Producing"]
prod_area = sum(r[3] for r in producing)
districts = len({r[1] for r in ROWS})


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(LIGHT)
    w, _ = landscape(A4)
    canvas.drawString(14 * mm, 8 * mm, "Durr & Zircon Consortium  |  Concession portfolio, October 2026  |  Confidential: prepared for prospective investors")
    canvas.drawRightString(w - 14 * mm, 8 * mm, "gbmines.com")
    canvas.restoreState()


doc = SimpleDocTemplate(
    OUT, pagesize=landscape(A4),
    leftMargin=14 * mm, rightMargin=14 * mm, topMargin=12 * mm, bottomMargin=14 * mm,
    title="Durr & Zircon Consortium: Concession Portfolio", author="Durr & Zircon Consortium",
)
W = landscape(A4)[0] - 28 * mm

story = [
    Paragraph("CONCESSION PORTFOLIO  |  GILGIT BALTISTAN, PAKISTAN", S["kicker"]),
    Spacer(1, 3),
    Paragraph("Durr &amp; Zircon Consortium: licensed mining concessions", S["h1"]),
    Spacer(1, 3),
    Paragraph(
        "Ten concessions held by three Pakistan-registered companies: Durr Mines and Minerals (PVT) LTD, "
        "Zircon Mines (PVT) LTD and Earth Lux Mines &amp; Minerals (PVT) LTD.", S["sub"]),
    Spacer(1, 7),
    HRFlowable(width="100%", thickness=1.4, color=COPPER, spaceAfter=8),
]

figs = [
    (f"{len(ROWS)}", "licensed concessions"),
    (f"{total:.2f} km²", "total licensed area"),
    (f"{len(producing)}", f"producing blocks ({prod_area:.2f} km²)"),
    (f"{districts}", "districts of Gilgit Baltistan"),
    ("3", "licence-holding companies"),
]
fig_table = Table([[Paragraph(v, S["fig"]) for v, _ in figs], [Paragraph(l, S["figl"]) for _, l in figs]],
                  colWidths=[W / len(figs)] * len(figs))
fig_table.setStyle(TableStyle([
    ("LEFTPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, 0), 1),
    ("LINEAFTER", (0, 0), (-2, -1), 0.6, RULE), ("LEFTPADDING", (1, 0), (-1, -1), 10),
]))
story += [fig_table, Spacer(1, 10)]

head = ["#", "Concession", "Location", "Key minerals", "Area (km²)", "Stage", "Road access", "Licence holder"]
data = [[Paragraph(h, S["th"]) for h in head]]
for i, (name, loc, minerals, area, note, stage, road, holder) in enumerate(ROWS, 1):
    area_txt = f"{area:.2f}" + (f"<br/><font size='6.8' color='#5A5A5A'>{note}</font>" if note else "")
    data.append([
        Paragraph(str(i), S["td"]), Paragraph(name, S["tdb"]), Paragraph(loc, S["td"]),
        Paragraph(minerals, S["td"]), Paragraph(area_txt, S["tdr"]), Paragraph(stage, S["td"]),
        Paragraph("Yes" if road else "", S["td"]), Paragraph(holder, S["td"]),
    ])
data.append([
    Paragraph("", S["td"]), Paragraph("Total", S["tdb"]), Paragraph("", S["td"]),
    Paragraph(f"Producing: {prod_area:.2f} km² &nbsp;&nbsp; Exploration and applications: {total - prod_area:.2f} km²", S["td"]),
    Paragraph(f"{total:.2f}", S["tdr"]), Paragraph("", S["td"]), Paragraph("", S["td"]), Paragraph("", S["td"]),
])

cw = [7 * mm, 33 * mm, 21 * mm, 88 * mm, 22 * mm, 40 * mm, 20 * mm, 0]
cw[-1] = W - sum(cw)
t = Table(data, colWidths=cw, repeatRows=1)
style = [
    ("BACKGROUND", (0, 0), (-1, 0), HEAD_BG),
    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING", (0, 0), (-1, -1), 4.2), ("BOTTOMPADDING", (0, 0), (-1, -1), 4.2),
    ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ("LINEBELOW", (0, 1), (-1, -2), 0.4, RULE),
    ("LINEABOVE", (0, -1), (-1, -1), 1.1, INK),
    ("BACKGROUND", (0, -1), (-1, -1), ROW_ALT),
]
for r in range(1, len(ROWS) + 1):
    if ROWS[r - 1][5] == "Producing":
        style.append(("BACKGROUND", (5, r), (5, r), PRODUCING_BG))
        style.append(("TEXTCOLOR", (5, r), (5, r), PRODUCING_FG))
    elif r % 2 == 0:
        style.append(("BACKGROUND", (0, r), (-1, r), ROW_ALT))
t.setStyle(TableStyle(style))
story += [t, Spacer(1, 9)]

notes_left = [
    Paragraph("Notes", S["noteb"]), Spacer(1, 2),
    Paragraph("Areas are the licensed or applied area of each block in square kilometres. Mineral lists are field "
              "identifications from our own exploration; grades are confirmed by laboratory assay.", S["note"]),
    Spacer(1, 3),
    Paragraph("Gojal and Ishkoman are licence applications submitted to the Gilgit Baltistan Mines &amp; Minerals "
              "Department. Earth Lux Mines &amp; Minerals (Jutial Nala, Gupis) is available for outright acquisition.", S["note"]),
]
notes_right = [
    Paragraph("Available to verified investors under NDA", S["noteb"]), Spacer(1, 2),
    Paragraph("Licences and incorporation documents, boundary maps, geological reports and assay results, "
              "physical samples, and guided site visits with permits arranged.", S["note"]),
    Spacer(1, 6),
    Paragraph("<b>Contact:</b> gbmines.com/investor-desk &nbsp;|&nbsp; info@gbmines.com", S["contact"]),
    Paragraph("+92 316 9244827 (phone and WhatsApp) &nbsp;|&nbsp; +92 355 5653738", S["contact"]),
]
nt = Table([[notes_left, notes_right]], colWidths=[W * 0.5, W * 0.5])
nt.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                        ("RIGHTPADDING", (0, 0), (0, 0), 14), ("LINEBEFORE", (1, 0), (1, 0), 0.6, RULE),
                        ("LEFTPADDING", (1, 0), (1, 0), 14)]))
story.append(nt)

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("wrote", os.path.normpath(OUT), "| total", round(total, 2), "| producing", round(prod_area, 2))
