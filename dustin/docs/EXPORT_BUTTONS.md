# Export Buttons

Both buttons call the same `exportToCSV` function and use the **Web Share API** on mobile (share sheet on Android/iOS), falling back to a regular file download on desktop.

---

## Export w/out Pricing

Generates a CSV file named `<JobName>_order_for_pricing.csv`.

Intended to be **sent to purchasing/supplier** to fill in prices. It includes:

- A **Pricing Sheet** section with blank `$/SQ FT << FILL IN` columns for each material used
- An **Accessory Pricing** section with blank `Unit Price << FILL IN` columns
- The full order details (board counts per area, sheet totals, sq ft) — **without any dollar amounts**
- Accessories list (product, qty, placement) — **without pricing**

The idea is the supplier fills in the unit prices and imports the file back.

---

## MPR Export

Generates a CSV file named `<JobName>_MPR.csv`.

An **internal pricing report** (MPR = Material Purchase Report). It includes everything the other export has, plus:

- Per-material **$/sq ft** and **total cost** for every area
- Accessories with **unit prices and line totals**
- **Cartage** calculation
- **Total Material Cost** (boards + accessories + cartage)
- A full **Labour Budget** section (boarding, taping, beading, scrap, drives, management, warranty, scaffold)
- **Overhead %** and **Profit %** applied on top
- Site notes (if any)
