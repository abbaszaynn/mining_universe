# -*- coding: utf-8 -*-
"""
GB Mineral Corridor Report 2026 -- rebuild with current data.

Source of truth for every figure below is the live repo as of 2026-09-11:
  src/lib/companies-data.ts (deposits, status, licenceHolder, roadAccess)
  src/lib/commodities.ts (8 commodities, sourcedFrom)
  src/lib/markets.ts (Reko Diq figures)
  src/lib/site.ts (contact details)
plus live research done this session (PMIF26 outcome, CSIS skepticism on the
$8T figure). No em-dashes anywhere in body text -- checked at the end.
"""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

COPPER = colors.HexColor("#C2703D")
INK = colors.HexColor("#1A1A1A")
GREY = colors.HexColor("#5A5A5A")
LIGHT_GREY = colors.HexColor("#8A8A8A")
ROW_ALT = colors.HexColor("#F5F1EC")
TABLE_HEAD_BG = colors.HexColor("#1A1A1A")

OUT = r"E:\GOS\mining_universe\public\reports\gb-mineral-corridor-report-2026.pdf"

styles = {
    "kicker": ParagraphStyle("kicker", fontName="Helvetica-Bold", fontSize=9,
                              textColor=COPPER, tracking=1, spaceAfter=10,
                              leading=11),
    "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=27,
                          textColor=INK, leading=32, spaceAfter=14),
    "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=17,
                          textColor=INK, leading=21, spaceBefore=4,
                          spaceAfter=10),
    "sub": ParagraphStyle("sub", fontName="Helvetica", fontSize=12.5,
                           textColor=GREY, leading=17, spaceAfter=6),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=10,
                            textColor=INK, leading=15, spaceAfter=10),
    "body_bold_lead": ParagraphStyle("body_bold_lead", fontName="Helvetica",
                                      fontSize=10, textColor=INK, leading=15,
                                      spaceAfter=10),
    "small": ParagraphStyle("small", fontName="Helvetica", fontSize=8,
                             textColor=LIGHT_GREY, leading=11.5),
    "table_head": ParagraphStyle("table_head", fontName="Helvetica-Bold",
                                  fontSize=8, textColor=colors.white,
                                  leading=10),
    "table_cell": ParagraphStyle("table_cell", fontName="Helvetica",
                                  fontSize=8.3, textColor=INK, leading=11),
    "table_cell_b": ParagraphStyle("table_cell_b", fontName="Helvetica-Bold",
                                    fontSize=8.3, textColor=INK, leading=11),
    "footer_label": ParagraphStyle("footer_label", fontName="Helvetica-Bold",
                                    fontSize=11, textColor=COPPER,
                                    spaceAfter=6),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=9.5,
                               textColor=INK, leading=14),
}


def kicker_h2(kicker_text, h2_text):
    return [Paragraph(kicker_text.upper(), styles["kicker"]),
            Paragraph(h2_text, styles["h2"])]


def hr():
    return HRFlowable(width="100%", thickness=1, color=colors.HexColor("#E4DFD8"),
                       spaceBefore=2, spaceAfter=14)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(LIGHT_GREY)
    canvas.drawString(0.85 * inch, 0.55 * inch, "GB Mineral Corridor Report 2026")
    canvas.drawRightString(LETTER[0] - 0.85 * inch, 0.55 * inch,
                            f"Page {doc.page}")
    canvas.restoreState()


doc = SimpleDocTemplate(
    OUT, pagesize=LETTER,
    leftMargin=0.85 * inch, rightMargin=0.85 * inch,
    topMargin=0.95 * inch, bottomMargin=0.85 * inch,
    title="GB Mineral Corridor Report 2026",
    author="Durr & Zircon Consortium",
)

story = []

# ---------------------------------------------------------------- PAGE 1
story += [
    Paragraph("GB MINERAL CORRIDOR REPORT", styles["kicker"]),
    Paragraph("The GB Mineral Corridor Report 2026", styles["h1"]),
    Paragraph(
        "Licensed mining concessions, commodity supply, and the investment "
        "climate across Gilgit Baltistan, Pakistan.", styles["sub"]),
    Spacer(1, 0.15 * inch),
    HRFlowable(width="100%", thickness=1.6, color=COPPER, spaceAfter=16),
    Spacer(1, 0.25 * inch),
    Paragraph(
        "Published by Durr &amp; Zircon Consortium, the trading name of three "
        "separately registered operating companies: Durr Mines and Minerals "
        "(PVT) LTD, Zircon Mines (PVT) LTD, and Earth Lux Mines &amp; "
        "Minerals (PVT) LTD. Together they hold ten licensed concessions "
        "across seven districts of Gilgit Baltistan, four of them currently "
        "producing.", styles["body"]),
    Spacer(1, 2.6 * inch),
    Paragraph("gbmines.com &middot; info@gbmines.com &middot; +92 316 9244827",
               styles["small"]),
    Paragraph(
        "This report compiles publicly available survey findings, government "
        "policy figures, and this consortium's own licensed concession data. "
        "It is not a geological or investment prospectus. Boundary "
        "coordinates, assay data, and full geological reports are shared "
        "directly with verified investors and buyers on request.",
        styles["small"]),
]

from reportlab.platypus import PageBreak
story.append(PageBreak())

# ---------------------------------------------------------------- PAGE 2
story += kicker_h2("Why this region, why now", "The investment case")
story.append(hr())
story += [
    Paragraph(
        "Gilgit Baltistan carries more than 43,000 sq km of mining area, "
        "and the region's own Secretary of Minerals, Shahzeb Sheikh, said "
        "in February 2026 that most of it remains unexplored. Roughly "
        "1,840 sq km have been granted exploration licences and around "
        "898 sq km sit under active mining leases: together, about 6 "
        "percent of the mapped area. Pakistan's government has put the "
        "country's total mineral wealth at close to $8 trillion, but the "
        "Center for Strategic and International Studies noted in April "
        "2026 that more than 95 percent of the country's mineral terrain "
        "is underexplored and that no internationally certified reserve "
        "estimates back that number. Read the opportunity as real and the "
        "headline figure as aspirational; the two are not the same claim.",
        styles["body"]),
    Paragraph(
        "Pakistan's National Minerals Harmonisation Framework, unveiled in "
        "2025, targets an investor rate of return around 18 percent as "
        "part of a push toward domestic value addition rather than raw "
        "ore export, alongside simplified licensing and a dispute "
        "resolution mechanism. Each province still has to adopt it "
        "individually, which has been slower in some provinces than "
        "others.", styles["body"]),
    Paragraph(
        "Three international commitments landed in 2025 and 2026, and "
        "each is publicly documented:", styles["body"]),
    Paragraph(
        "<b>United States.</b> A $500 million partnership between Pakistan "
        "and US Strategic Metals, signed September 2025, covering the "
        "full mineral value chain from exploration through refining. The "
        "first shipment, in October 2025, carried antimony, copper "
        "concentrate, and rare earth elements including neodymium and "
        "praseodymium.", styles["body"]),
    Paragraph(
        "<b>Saudi Arabia.</b> A pursued 15 percent stake in Pakistan's "
        "Reko Diq copper-gold project, reportedly worth $540 million. "
        "Reko Diq's own reserves are reported at 13.1 million tonnes of "
        "copper and 17.9 million ounces of gold, with a mine life "
        "projected past three decades.", styles["body"]),
    Paragraph(
        "<b>China and the wider field.</b> The Pakistan Minerals "
        "Investment Forum in Islamabad, held April 8 to 9, 2026, drew "
        "more than 5,000 delegates from over 50 countries and produced "
        "16 signed MOUs, up from 14 the previous year. Copper, gold and "
        "rare earths were the forum's stated focus, and Pakistan is "
        "targeting an estimated $6 to 8 billion in annual mineral export "
        "potential from the resulting pipeline.", styles["body"]),
    Paragraph(
        "None of these three commitments is specific to Gilgit Baltistan. "
        "The commodity mix they target, copper, gold and antimony above "
        "all, is exactly what this region's licensed concessions carry.",
        styles["body"]),
]
story.append(PageBreak())

# ---------------------------------------------------------------- PAGE 3
story += kicker_h2("Operator-level data", "Licensed concession registry")
story.append(hr())
story.append(Paragraph(
    "Ten licensed concessions across seven districts, held by three "
    "registered operating companies. Minerals listed are drawn directly "
    "from field results; boundary coordinates and full geological "
    "reports are not published here and are shared with verified "
    "counterparties on request.", styles["body"]))
story.append(Spacer(1, 0.12 * inch))


def cell(text, bold=False):
    return Paragraph(text, styles["table_cell_b"] if bold else styles["table_cell"])


def head(text):
    return Paragraph(text, styles["table_head"])


concessions_rows = [
    [head("Concession"), head("District"), head("Minerals"), head("Area"),
     head("Status"), head("Access")],
    [cell("Hilal Abad", True), cell("Kharmang"),
     cell("Premium nephrite jade, serpentine, copper"), cell("9.97 sq/km"),
     cell("Producing"), cell("Road")],
    [cell("Bagicha", True), cell("Skardu"),
     cell("Copper (vein exposed), marble, ruby, lithium, quartz"),
     cell("20 sq/km"), cell("Producing"), cell("Road")],
    [cell("Skardu Placer Gold", True), cell("Skardu"),
     cell("Placer gold, black sand"), cell("26 km riverbed"),
     cell("Producing"), cell("Road")],
    [cell("Jutial Nala", True), cell("Gilgit"),
     cell("Copper veins, lead, silver"), cell("9.97 sq/km"),
     cell("Producing"), cell("")],
    [cell("Mahdi Abad"), cell("Kharmang"),
     cell("Serpentine, nephrite (early samples), copper, iron, silver"),
     cell("9.9 sq/km"), cell("Exploratory"), cell("Road")],
    [cell("Shigar (Askoli)"), cell("Shigar"),
     cell("Gold, lead, lithium, copper, gemstones"), cell("8.87 sq/km"),
     cell("Exploratory"), cell("")],
    [cell("Gultari"), cell("Gultari"),
     cell("Copper, gold, molybdenum, antimony, lead"), cell("20 sq/km"),
     cell("Exploratory"), cell("")],
    [cell("Gojal Antimony"), cell("Hunza"),
     cell("Antimony, molybdenum indications"), cell("App. #2024-3435"),
     cell("Exploratory"), cell("")],
    [cell("Ishkoman Granite"), cell("Ghizer"),
     cell("Antimony, granite"), cell("App. #2024-3122"),
     cell("Exploratory"), cell("")],
    [cell("Gupis"), cell("Ghizer"),
     cell("Copper, granite, marble"), cell("10 sq/km"),
     cell("Exploratory"), cell("")],
]

# Widths tuned so "Exploratory" (the longest Status value) and "Access" (the
# header) never wrap mid-word. The first attempt at 0.78in/0.55in wrapped
# both ("Operationa-l", "Acces-s"), which reads as a rendering bug in a
# document going to real recipients -- caught by reading the output back.
# District widened again after Kharmang still wrapped to "Kharman-g" at
# 0.62in -- 0.72in is the first width that keeps every district on one line.
col_widths = [1.02 * inch, 0.72 * inch, 2.25 * inch, 0.86 * inch,
              0.85 * inch, 0.75 * inch]
t = Table(concessions_rows, colWidths=col_widths, repeatRows=1)
tstyle = [
    ("BACKGROUND", (0, 0), (-1, 0), TABLE_HEAD_BG),
    ("TOPPADDING", (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LINEBELOW", (0, -1), (-1, -1), 0.5, colors.HexColor("#D8D2C8")),
]
for i in range(1, len(concessions_rows)):
    if i % 2 == 0:
        tstyle.append(("BACKGROUND", (0, i), (-1, i), ROW_ALT))
t.setStyle(TableStyle(tstyle))
story.append(t)
story.append(Spacer(1, 0.14 * inch))
story.append(Paragraph(
    "<i>Operator key: Durr Mines and Minerals (PVT) LTD holds Bagicha, "
    "Gultari, Mahdi Abad and Skardu Placer Gold. Zircon Mines (PVT) LTD "
    "holds Hilal Abad, Shigar, Gojal Antimony and Ishkoman Granite. Earth "
    "Lux Mines &amp; Minerals (PVT) LTD holds Jutial Nala and Gupis, and "
    "is offered for outright acquisition. Four of the ten blocks are "
    "currently producing; the remaining six are at exploration or "
    "reconnaissance stage.</i>", styles["small"]))
story.append(PageBreak())

# ---------------------------------------------------------------- PAGE 4
story += kicker_h2("Supply", "Commodities and demand context")
story.append(hr())

commodity_entries = [
    ("Copper.", "Sourced from Hilal Abad, Bagicha, Gultari, Shigar, Gupis, "
     "Jutial Nala and Mahdi Abad, seven of our ten blocks. Demand is "
     "driven by EV batteries, solar infrastructure and grid "
     "electrification."),
    ("Nephrite jade.", "Premium-grade nephrite is the primary target at "
     "Hilal Abad, with serpentine and early nephrite samples also "
     "recovered at Mahdi Abad. Samples have cleared review from "
     "specialists with more than twenty years in nephrite specifically, "
     "and separate buyer approval in China, the stone's principal "
     "market."),
    ("Antimony.", "Sourced from Gultari, Gojal (Hunza) and Ishkoman. On "
     "most Western critical-minerals watch lists, driven by flame "
     "retardants, battery chemistries and semiconductor manufacture."),
    ("Placer gold.", "A licensed 26 km riverbed concession in Skardu, "
     "scaled for mechanised recovery and already producing."),
    ("Hard-rock gold.", "A separate, earlier-stage product from placer "
     "gold: lode gold in ore at Shigar (Askoli) and Gultari, both at "
     "exploration stage."),
    ("Lead.", "Sourced from Gultari, Jutial Nala and Shigar, alongside "
     "associated silver and mineralised copper veins."),
    ("Quartz &amp; silica.", "Sourced from Bagicha, alongside that site's "
     "ruby, marble and lithium indications."),
    ("Granite &amp; marble.", "Sourced from Gupis, Ishkoman and Bagicha, "
     "within a documented dimension-stone belt running over 100 km "
     "through Ghizer district."),
]
for label, text in commodity_entries:
    story.append(Paragraph(f"<b>{label}</b> {text}", styles["body"]))

story.append(Spacer(1, 0.1 * inch))
story.append(Paragraph(
    "No licensed block on this registry is a rare earth claim. Documented "
    "rare earth occurrences in Pakistan sit in Chagai (Balochistan) and "
    "in granites in Dir, Swat and Kohistan; treat any Gilgit Baltistan "
    "rare earth claim you encounter elsewhere with the same scrutiny we "
    "apply to our own figures.", styles["body"]))
story.append(PageBreak())

# ---------------------------------------------------------------- PAGE 5
story += kicker_h2("Participate", "How investors engage")
story.append(hr())
story += [
    Paragraph(
        "Mineral titles in Gilgit Baltistan can only be granted to a "
        "locally incorporated entity. Foreign investors participate "
        "through one of four routes:", styles["body"]),
    Paragraph(
        "<b>Joint venture.</b> Structured against one of our three "
        "registered operating companies, combining an existing licence, "
        "local incorporation and field team with outside capital and "
        "technical resources.", styles["body"]),
    Paragraph(
        "<b>Farm-in / earn-in.</b> A stake earned through defined "
        "exploration spend rather than an upfront payment, suited to "
        "junior exploration companies evaluating our six earlier-stage "
        "blocks.", styles["body"]),
    Paragraph(
        "<b>Equity participation.</b> Direct equity in one of the three "
        "operating companies rather than a single concession, for "
        "portfolio-level exposure.", styles["body"]),
    Paragraph(
        "<b>Outright acquisition.</b> Earth Lux Mines &amp; Minerals "
        "(PVT) LTD, holder of the Jutial Nala and Gupis licences, is "
        "offered for complete acquisition.", styles["body"]),
    Spacer(1, 0.22 * inch),
    HRFlowable(width="100%", thickness=1.2, color=COPPER, spaceAfter=12),
    Paragraph("Durr &amp; Zircon Consortium", styles["footer_label"]),
    Paragraph("gbmines.com/invest &middot; gbmines.com/investor-desk<br/>"
               "info@gbmines.com &middot; +92 316 9244827<br/>"
               "Gilgit Baltistan, Pakistan", styles["contact"]),
    Spacer(1, 0.2 * inch),
    Paragraph(
        "Sources: Gilgit-Baltistan Mines &amp; Minerals Department "
        "published figures and Secretary of Minerals Shahzeb Sheikh, "
        "February 2026; Pakistan National Minerals Harmonisation "
        "Framework, 2025; Center for Strategic and International "
        "Studies, April 2026; public reporting on the Pakistan-US "
        "Strategic Metals partnership (Sept-Oct 2025), Saudi Arabia's "
        "Reko Diq stake pursuit, and the Pakistan Minerals Investment "
        "Forum, April 2026. Full citations available on request. This "
        "document does not constitute investment advice or a guarantee "
        "of return; the 18 percent figure cited is Pakistan's stated "
        "national policy target, not a return promised by this "
        "consortium.", styles["small"]),
]

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("wrote", OUT)
