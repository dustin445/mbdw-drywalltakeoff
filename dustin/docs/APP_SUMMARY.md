# MBDW Drywall Takeoff App (v1.5)

A **mobile-first React app** for drywall contractors to do material takeoffs and job estimating. It's a single-file, client-side app (~4000 lines) that stores all data in `localStorage`.

## Core Screens

| Screen | Purpose |
|---|---|
| `home` | Job list — search, create, delete, reorder jobs |
| `job` | Job overview — manage areas/floors, select materials, contact info |
| `area` | Per-area board entry — input sheet counts by material × length |
| `accessories` | Track quantities of mud, tape, beads, metal, fasteners |
| `budget` | Labour & cost estimating with overhead/profit margins |
| `pricing` | Admin screen (password-locked) to override per-sqft and accessory prices |

## Key Features

- **20 drywall board types** (1/2" STD, 5/8" Fireguard, Aqua Board, QuietRock, Durock, etc.) in standard lengths (8'–14')
- **Three job types**: Single family, Multi-family (Unit 1–6), Budget
- **Accessory tracking** across 4 categories: Mud & Tape, Beads & Trim, Metal & Track, Fasteners & Adhesives
- **Bead/trim entry** supports stick-count mode (qty × length per product code)
- **Budget/estimating**: calculates labour costs for boarding, taping, beading, scrap, drives, management, warranty, scaffold — with configurable overhead % and profit %
- **Pricing based on Shoemaker Feb 20 2026 price list** — editable per sqft and per accessory unit via the locked admin screen
- **Import/export** of job data (JSON)
- **Password-locked** admin and budget screens
- Landscape orientation detection for layout adjustments
- Toast notifications, drag-to-reorder, long-press bulk actions

## Tech Stack

- React 19, pure JSX, all styles inline (no CSS framework)
- Vite + TypeScript tooling (though the app logic is `.jsx`)
- Zero external runtime dependencies beyond React

## Summary

A **field-use drywall estimating tool** for MacLean Bros, letting crews quickly tally board counts per area, track accessories, and generate a cost estimate with materials and labour.
