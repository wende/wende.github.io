#!/usr/bin/env python3
"""Generate Krzysztof Wende CV — visually matched to KrzysztofWende_CV_June_original.pdf."""

from pathlib import Path

from reportlab.lib.colors import Color, HexColor
from reportlab.lib.enums import TA_LEFT, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parent
FONTS = ROOT / "fonts"
OUT = ROOT / "KrzysztofWende_CV.pdf"
JUNE = ROOT / "KrzysztofWende_CV_June.pdf"

# Exact colors from original PDF
PAGE_BG = Color(0.960784, 0.956863, 0.952941)
BAND = Color(0.941176, 0.933333, 0.913725)
INK = HexColor("#1a1a1a")
MUTED = HexColor("#4e4e4e")
NAME_LIGHT = HexColor("#8e8d88")
RULE = Color(0.847059, 0.839216, 0.823529)
LINK_STROKE = MUTED

PAGE_W, PAGE_H = A4
MARGIN_X = 56.7
CONTENT_RIGHT = 538.6
CONTENT_W = CONTENT_RIGHT - MARGIN_X
TEXT_X = 62.7
JOB_X = 68.7
BULLET_X = 79.7
TIMELINE_X = 56.7


def register_fonts():
    pdfmetrics.registerFont(TTFont("Montserrat", str(FONTS / "Montserrat-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("Montserrat-Bold", str(FONTS / "Montserrat-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Carlito", str(FONTS / "Carlito-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("Carlito-Bold", str(FONTS / "Carlito-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Carlito-Italic", str(FONTS / "Carlito-Italic.ttf")))


def P(size, leading, color=INK, font="Carlito", align=TA_LEFT):
    return ParagraphStyle(
        f"s_{font}_{size}_{leading}_{color.hexval()}_{align}",
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=align,
        spaceBefore=0,
        spaceAfter=0,
    )


EXPERIENCE = [
    {
        "role": "AI Infrastructure & Elixir Developer",
        "company": "Thenvoi · Remote",
        "year": "2025",
        "duration": "4 months",
        "bullets": [
            "Built core infrastructure for the Agentic Mesh platform — a secure communication layer enabling AI agents to dynamically discover, collaborate, and orchestrate tasks.",
            "Owned AI orchestration and inter-agent communication protocols on open standards (MCP, A2A), plus centralized agent management.",
            "Shipped human-agent collaboration features for shared working environments.",
        ],
    },
    {
        "role": "Elixir Developer",
        "company": "Software Mansion · Poland (Remote)",
        "year": "2024",
        "duration": "6 months",
        "bullets": [
            "Built observability tooling for Membrane Framework, an open-source Elixir multimedia streaming stack supporting WebRTC, HLS, RTMP, and common codecs.",
            "Shipped tooling that made real-time multimedia processing pipelines inspectable end-to-end.",
        ],
    },
    {
        "role": "Elixir Developer",
        "company": "Confly sp. z o.o. (Priv) · Poland (Remote)",
        "year": "2021",
        "duration": "2 years",
        "bullets": [
            "Designed and built the telecom platform for Priv — a virtual phone number app with VoIP and SMS, handling instantaneous number acquisition and Polish telecom compliance.",
            "Designed and developed an in-house Event Sourcing system from scratch.",
            "Designed and developed a custom VoIP telecommunication protocol.",
        ],
    },
    {
        "role": "Elixir Developer (Founding Team)",
        "company": "Inflowmatix Ltd (acquired by SUEZ) · Southampton, UK (Remote)",
        "year": "2016",
        "duration": "5 years",
        "bullets": [
            "One of the first three developers to build the InflowNet real-time water telemetry platform, now deployed in 20+ countries.",
            "Designed a fully distributed Elixir architecture processing gigabytes/sec with 99.999% annual availability.",
            "Managed databases including InfluxDB, Mnesia, TimescaleDB, and PostgreSQL.",
            "Designed and operated a cluster of 20+ machines on AWS with event-sourced architecture.",
        ],
    },
    {
        "role": "CEO / Founder",
        "company": "Neon Tree Solutions Ltd · Kraków & London",
        "year": "2014",
        "duration": "7 years",
        "bullets": [
            "Led a software consultancy of 3–5 engineers specializing in cutting-edge proofs of concept using Erlang, Elixir, Scala, React.js, and ReasonML.",
            "Chose client POCs over productizing an in-house platform — deferring a product bet bought the first Erlang Performance Lab prototype and dual Poland/UK operations.",
        ],
    },
    {
        "role": "CTO / Co-founder",
        "company": "Man La Mode LLC · Kraków & Ann Arbor, MI",
        "year": "2015",
        "duration": "1 year",
        "bullets": [
            "Built the Elixir backend and oversaw React.js frontend for a luxury fashion buyers club sourcing goods directly from brands.",
            "Skipped a full marketplace stack to prove demand with a thin affiliate-style club before expanding; engaged investors in Ann Arbor, Michigan.",
        ],
    },
    {
        "role": "CTO / Co-founder",
        "company": "CloudCab LLC → LightDispatch (acquired by WideTech) · New York (Remote)",
        "year": "2013",
        "duration": "2 years",
        "bullets": [
            "Chose white-label B2B over a consumer taxi brand — one platform serving taxi, medical, and cargo; later acquired by WideTech (18+ countries).",
            "Developed Android apps for customers and drivers, a Node.js backend, and a fleet dispatch admin panel; led a team of four.",
        ],
    },
]

PROJECTS = [
    {
        "title": "Forbes 25 Under 25",
        "meta": "Forbes Poland & McKinsey & Company",
        "year": "2020",
        "body": "New Technology Category.",
        "link": None,
    },
    {
        "title": "BUZZArt / Idziemy Na Solo",
        "meta": "Stowarzyszenie Twórców Kultury BUZZArt",
        "year": "2022–2026",
        "body": "Founder & president of a culture-focused NGO in Gdańsk running Idziemy Na Solo — free music production program. 7 editions; 130 songs released; KPO/EU funded.",
        "link": None,
    },
    {
        "title": "Cicada",
        "meta": "github.com/wende/cicada",
        "year": "2025–2026",
        "body": "AST-based code intelligence MCP server for AI assistants (tree-sitter/SCIP). Indexes code structure and GitHub PR history across 17+ languages. Listed in awesome-mcp-servers.",
        "link": "https://github.com/wende/cicada",
    },
    {
        "title": "MobileClaw",
        "meta": "github.com/wende/mobileclaw",
        "year": "2026",
        "body": "Open-source mobile-first AI chat client for OpenClaw/LM Studio. Streaming, tool execution display, inline diffs, sub-agent feeds.",
        "link": "https://github.com/wende/mobileclaw",
    },
    {
        "title": "Elchemy",
        "meta": "github.com/wende/elchemy",
        "year": "2017–2019",
        "body": "Statically-typed language for the Erlang VM, inspired by Elm and Haskell. 1,000+ GitHub stars.",
        "link": "https://github.com/wende/elchemy",
    },
    {
        "title": "Autocomplete Elixir",
        "meta": "github.com/wende/autocomplete-elixir",
        "year": "2015",
        "body": "#1 most popular Elixir/Erlang plugin for Atom Editor. 60,000+ downloads. Semantic completion via live BEAM introspection.",
        "link": "https://github.com/wende/autocomplete-elixir",
    },
]

EXPERTISE = [
    ("Core Technologies", "Elixir, Erlang/OTP, TypeScript, Distributed Systems, Event Sourced Architecture"),
    ("AI & Agents", "Agentic Architectures, MCP Servers, A2A, LLM Integration, Local Model Deployment"),
    ("Developer Tooling", "Code Intelligence (AST/tree-sitter), Language Design, Editor Tooling, Data Pipelines"),
    ("Frontend", "React.js, Next.js, Tailwind CSS"),
    ("Infrastructure", "InfluxDB, TimescaleDB, PostgreSQL, VoIP/SIP/RTP"),
]


class CV:
    def __init__(self, path: Path):
        self.c = canvas.Canvas(str(path), pagesize=A4)
        self.c.setTitle("Krzysztof Wende — CV")
        self.c.setAuthor("Krzysztof Wende")
        self._page_bg()
        self.y = PAGE_H - 48.5

    def _page_bg(self):
        self.c.setFillColor(PAGE_BG)
        self.c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    def new_page(self):
        self.c.showPage()
        self._page_bg()
        self.y = PAGE_H - 48.5

    def ensure(self, need: float):
        if self.y - need < 28:
            self.new_page()

    def band(self, title: str):
        self.ensure(40)
        self.y -= 8
        bar_h = 28
        bar_bottom = self.y - bar_h
        self.c.setFillColor(BAND)
        self.c.roundRect(MARGIN_X, bar_bottom, CONTENT_W, bar_h, 3, fill=1, stroke=0)
        self.c.setFillColor(INK)
        self.c.setFont("Montserrat-Bold", 11.2)
        self.c.drawString(JOB_X, bar_bottom + 9.5, title.upper())
        self.y = bar_bottom - 12

    def right_text(self, text, font, size, color):
        self.c.setFont(font, size)
        self.c.setFillColor(color)
        tw = self.c.stringWidth(text, font, size)
        self.c.drawString(CONTENT_RIGHT - tw, self.y, text)

    def para(self, text, style, x, width) -> float:
        """Draw paragraph with top at self.y; advance self.y to bottom."""
        p = Paragraph(text, style)
        _w, h = p.wrap(width, 2000)
        self.ensure(h + 6)
        p.drawOn(self.c, x, self.y - h)
        self.y -= h
        return h

    def header(self):
        header_top = PAGE_H - 48.5
        header_bottom = PAGE_H - 142.0
        self.c.setFillColor(BAND)
        self.c.roundRect(MARGIN_X, header_bottom, CONTENT_W, header_top - header_bottom, 4, fill=1, stroke=0)

        y_name = PAGE_H - 88.5
        self.c.setFont("Montserrat", 27)
        first = "K R Z Y S Z T O F "
        last = "W E N D E"
        self.c.setFillColor(NAME_LIGHT)
        self.c.drawString(JOB_X + 2, y_name, first)
        fw = self.c.stringWidth(first, "Montserrat", 27)
        self.c.setFillColor(MUTED)
        self.c.drawString(JOB_X + 2 + fw, y_name, last)

        self.c.setFont("Carlito", 10.5)
        self.c.setFillColor(INK)
        self.c.drawString(JOB_X + 2, PAGE_H - 105.5, "Software Engineer & Distributed Systems Architect")

        self.c.setFont("Carlito", 9)
        self.c.setFillColor(MUTED)
        self.c.drawString(JOB_X + 2, PAGE_H - 117.8, "wende@hey.com · +48 533-30-20-90 · Kraków, Poland")

        y = PAGE_H - 130.3
        links = [
            ("Portfolio", "https://wende.github.io"),
            ("LinkedIn", "https://linkedin.com/in/krzysztofwende"),
            ("GitHub", "https://github.com/wende"),
        ]
        x = JOB_X + 2
        self.c.setFont("Carlito", 9)
        for i, (label, url) in enumerate(links):
            self.c.setFillColor(MUTED)
            self.c.drawString(x, y, label)
            w = self.c.stringWidth(label, "Carlito", 9)
            self.c.setStrokeColor(LINK_STROKE)
            self.c.setLineWidth(1.0)
            self.c.line(x, y - 1.2, x + w, y - 1.2)
            self.c.linkURL(url, (x, y - 2, x + w, y + 10), relative=0)
            x += w
            if i < len(links) - 1:
                sep = " · "
                self.c.drawString(x, y, sep)
                x += self.c.stringWidth(sep, "Carlito", 9)

        self.y = header_bottom - 15.5

    def profile(self):
        self.band("Profile")
        text = (
            "Distributed systems architect and Elixir specialist with 13 years of commercial experience. "
            "Background spanning AI agent infrastructure, real-time multimedia processing, water telemetry "
            "systems deployed across 20+ countries, telecom platforms, and open-source language design. "
            "Forbes 25 Under 25 awardee (New Technology, 2020). Founded and exited a transportation tech "
            "startup at age 19."
        )
        self.para(text, P(9.8, 13.0, INK, align=TA_JUSTIFY), TEXT_X, CONTENT_RIGHT - TEXT_X)
        self.y -= 6

    def expertise(self):
        self.band("Expertise")
        label_w = 105
        for cat, items in EXPERTISE:
            self.ensure(16)
            self.c.setFont("Carlito-Bold", 9)
            self.c.setFillColor(INK)
            self.c.drawString(TEXT_X - 4, self.y, cat)
            self.c.setFont("Carlito", 9)
            self.c.drawString(TEXT_X - 4 + label_w, self.y, items)
            self.y -= 15.5
        self.y -= 4

    def _quote_line(self, top: float, bottom: float):
        """Full-entry quote rule — same geometry as the original PDF."""
        if top - bottom > 4:
            self.c.setStrokeColor(RULE)
            self.c.setLineWidth(1.4)
            self.c.line(TIMELINE_X, bottom, TIMELINE_X, top)

    def job(self, job: dict):
        # Original quote line spans role → last bullet (not bullets alone).
        # line top ≈ role_top - 2.6; line bottom ≈ last_bullet_bottom + 1.1
        self.ensure(80)
        seg_top = self.y + 10.5  # role baseline + ascent + small pad above glyphs

        self.c.setFont("Carlito-Bold", 10.3)
        self.c.setFillColor(INK)
        self.c.drawString(JOB_X, self.y, job["role"])
        self.right_text(job["year"], "Carlito", 9.3, MUTED)
        self.y -= 12.8

        self.c.setFont("Carlito", 9.5)
        self.c.setFillColor(MUTED)
        self.c.drawString(JOB_X, self.y, job["company"])
        self.right_text(job["duration"], "Carlito", 9.5, MUTED)
        self.y -= 14.0

        style = P(9.5, 13.0, INK)
        for b in job["bullets"]:
            p = Paragraph(f"•  {b}", style)
            _w, h = p.wrap(CONTENT_RIGHT - BULLET_X, 200)
            if self.y - h < 28:
                self._quote_line(seg_top, self.y)
                self.new_page()
                seg_top = self.y + 2
            p.drawOn(self.c, BULLET_X, self.y - h)
            self.y -= h

        self._quote_line(seg_top, self.y - 1.1)
        # Original clear gap bullet-bottom → next-role-top ≈ 13.3pt
        self.y -= 21

    def work(self):
        self.band("Work History")
        for job in EXPERIENCE:
            self.job(job)

    def projects(self):
        self.band("Selected Projects & Achievements")
        style = P(9.5, 13.0, MUTED)
        year_reserve = 54

        for proj in PROJECTS:
            self.ensure(44)

            self.c.setFont("Carlito-Bold", 10.3)
            self.c.setFillColor(INK)
            self.c.drawString(TEXT_X, self.y, proj["title"])
            tw = self.c.stringWidth(proj["title"], "Carlito-Bold", 10.3)

            meta = " " + proj["meta"]
            self.c.setFont("Carlito-Bold", 8.2)
            self.c.setFillColor(MUTED if proj["link"] else INK)
            self.c.drawString(TEXT_X + tw, self.y, meta)
            mw = self.c.stringWidth(meta, "Carlito-Bold", 8.2)
            if proj["link"]:
                self.c.setStrokeColor(MUTED)
                self.c.setLineWidth(0.6)
                self.c.line(TEXT_X + tw + 2, self.y - 1.0, TEXT_X + tw + mw, self.y - 1.0)
                self.c.linkURL(
                    proj["link"],
                    (TEXT_X + tw, self.y - 2, TEXT_X + tw + mw, self.y + 10),
                    relative=0,
                )

            self.right_text(proj["year"], "Carlito", 9.3, MUTED)

            self.y -= 13.3
            self.para(proj["body"], style, TEXT_X, CONTENT_RIGHT - TEXT_X - year_reserve)
            # Original clear gap ≈ 11.6pt body-bottom → next-title-top
            self.y -= 19

    def education(self):
        self.band("Education")
        text = (
            "<b>Jagiellonian University in Kraków</b> — Theoretical Computer Science. "
            "Left after one semester (2013) to take the CTO role at CloudCab, New York."
        )
        self.para(text, P(9.5, 13.0, INK), TEXT_X, CONTENT_RIGHT - TEXT_X)
        self.y -= 4

    def other(self):
        self.band("Other")
        interests = (
            "<b>Interests:</b> Fusion jazz, drums &amp; percussion (17 years), recording studio owner, "
            "indie games, nutrition, psychology, coffee."
        )
        self.para(interests, P(9.5, 13.0, INK), TEXT_X, CONTENT_RIGHT - TEXT_X)

    def consent(self):
        text = (
            "I hereby consent to the processing of this CV and the personal data contained within, "
            "by anyone who receives this document for the sole purpose of considering my application "
            "for employment opportunities."
        )
        style = P(7.4, 9.2, MUTED, font="Carlito-Italic")
        p = Paragraph(text, style)
        _w, h = p.wrap(CONTENT_RIGHT - TEXT_X, 200)
        if self.y < h + 14:
            self.new_page()
        self.y -= 6
        self.c.setStrokeColor(BAND)
        self.c.setLineWidth(0.5)
        self.c.line(TEXT_X, self.y + 5, CONTENT_RIGHT - 6, self.y + 5)
        p.drawOn(self.c, TEXT_X, max(8.0, self.y - h))
        self.y -= h

    def build(self):
        self.header()
        self.profile()
        self.expertise()
        self.work()
        self.projects()
        self.education()
        self.other()
        self.consent()
        self.c.save()


def main():
    register_fonts()
    CV(OUT).build()
    JUNE.write_bytes(OUT.read_bytes())
    print(f"Wrote {OUT}")
    print(f"Updated {JUNE}")


if __name__ == "__main__":
    main()
