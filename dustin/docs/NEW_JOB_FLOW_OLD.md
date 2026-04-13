# "New Job" Button Flow

## 1. Modal Opens

A modal appears with three sections:

### Job Type Selector (3 buttons)

- **Single Family** — preloads 5 areas: Upper Floor, Main Floor, Basement, Basement Suite, Garage
- **Multifamily** — preloads 6 areas: Unit 1–6 (renameable)
- **Budget Order** — same 5 areas as Single + a Pricing Matrix; hidden behind a lock button unless the budget password (`MBDW2025B`) has already been entered

### Two Text Fields

- Job name
- Job number

## 2. Create Is Submitted

When **Create Job** is tapped:

- If job name is empty → does nothing
- If job number is empty → shows a warning: *"Purchasing will not be able to price or process this order without a Job Number"* with two options:
  - **Continue Without** — creates the job anyway
  - **Add Job Number** — dismisses the warning so you can fill it in

## 3. Job Is Created

Once confirmed, `initJob()` runs which:

- Generates a unique ID
- Sets the job name, number, type, and contact
- Pre-populates all areas with blank board-count data
- Pre-loads all accessories with qty = 0
- Sets the default selected materials
- (Budget jobs only) attaches a full `budgetPricing` object with default labour rates

The new job is **prepended to the top of the job list**, the modal closes, and the app immediately navigates to the **Job screen** for that new job.
