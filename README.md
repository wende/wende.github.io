# Krzysztof Wende — Portfolio

Minimalist portfolio website built with React, TypeScript, and Tailwind CSS, featuring animated SVG heading effects and smooth scroll-driven transitions.

## Stack

- React 19 + TypeScript
- Tailwind CSS (CDN)
- Framer Motion
- Vite
- Deployed via GitHub Pages

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## CV

The generated CV uses Python and ReportLab:

```bash
python3 -m venv cv/.venv
cv/.venv/bin/pip install -r cv/requirements.txt
cv/.venv/bin/python cv/generate_cv.py
```

## Analytics (GA4)

This site supports Google Analytics 4 in production builds.

1. Create a GA4 Web Data Stream and copy its Measurement ID (format: `G-XXXXXXXXXX`).
2. In GitHub, add a repository secret named `VITE_GA_MEASUREMENT_ID` with that value.
3. Rebuild/redeploy the site.

If `VITE_GA_MEASUREMENT_ID` is not set, analytics stays disabled.
