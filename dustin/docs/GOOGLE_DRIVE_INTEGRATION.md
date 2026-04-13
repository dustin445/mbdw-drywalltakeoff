# Google Drive Integration

## What Was Changed

| File | Change |
|---|---|
| `dustin/src/googleApi.js` | New module — token auth, Drive folder creation, Sheets logging, file upload |
| `dustin/index.html` | Added Google Identity Services `<script>` tag |
| `dustin/src/App.jsx` | Import, `driveFolder: null` on job, `createJob` made async, retry modal, Save to Google button |

## Duplicate Folder Prevention

`createDriveFolder` checks for an existing folder before creating one. On every call it:

1. Queries Drive for a folder matching the exact name inside the parent (excluding trashed items)
2. If found → returns the existing folder's ID and URL — **no new folder is created**
3. If not found → creates the folder as normal

Since the folder name is `"<Job Name> __ <Job ID>"` and the job ID is a random string unique to each job, false matches against other jobs are not possible. The only time a match is found is during a genuine retry of the same job.

## How It Works

1. `createJob` creates the job and navigates immediately — the UI is never blocked.
2. In the background, `provisionJob(job)` is called:
   - Authenticates the user via a Google OAuth popup (first time only)
   - Creates a Drive sub-folder named `"<Job Name> __ <Job ID>"` inside your parent folder
   - Appends a row to your spreadsheet: `Timestamp | Job Name | Job Number | Job ID | Folder Name | Folder ID | Folder URL`
3. On success → toast **"Google Drive folder created"**; folder info is saved to the job object in localStorage.
4. On failure → a **required retry modal** appears (see below).

## Failure — Retry Modal

Creating a Google Drive folder is a **required step**. If provisioning fails:

- A full-screen modal with a red border appears — it **cannot be dismissed** by tapping outside
- Shows the attempted folder name so the user knows what it tried to create
- A **Retry** button re-attempts `provisionJob` with the same job
- While retrying, the button shows **"Retrying…"** and is disabled
- On success: modal closes, job is updated with folder info, success toast appears
- On continued failure: modal stays open — the user must keep retrying or fix the underlying issue (auth, connectivity)

## ☁ Save to Google Button

Located in the job screen header, below **Import New Pricing** — full width, indigo colour.

### What happens when pressed

1. Checks the current job has a linked Drive folder (set during `createJob`). If not → toast error.
2. Serializes the full current job to JSON
3. Uploads it to the job's Drive folder via multipart upload
4. On success → toast: `file saved to google folder: <Folder Name>`
5. On failure → toast error + console log

### Filename saved

`<Job_Name>_<YYYY-MM-DD_HH-MM>.json`

**Example:** `4_Meadow_Lane_2026-04-13_14-35.json`

Every save is unique to the minute — no duplicate checking needed, and a full history of snapshots is preserved in the Drive folder.

## Do I Need to Recompile After Filling In the Values?

No. The values in `googleApi.js` are plain JavaScript read at runtime — not environment variables or build-time constants. No recompile is needed.

Just:
1. Fill in the 3 values in `googleApi.js`
2. Run `npm run dev` in the `dustin/` folder
3. Open the app in your browser — it works immediately

The only time a rebuild is needed is if you add a new import or change JSX structure.

## Before It Will Work — Fill In 3 Values in `googleApi.js`

```js
CLIENT_ID:        "YOUR_OAUTH2_CLIENT_ID.apps.googleusercontent.com"
PARENT_FOLDER_ID: "YOUR_PARENT_FOLDER_ID"
SPREADSHEET_ID:   "YOUR_SPREADSHEET_ID"
```

## Google Cloud Console Setup

- Enable **Google Drive API** and **Google Sheets API**
- Create an **OAuth 2.0 Client ID** (Web application type)
- Add your local dev URL (e.g. `http://localhost:5173`) to **Authorized JavaScript origins**
- Copy the Client ID into `GOOGLE_CONFIG.CLIENT_ID` in `googleApi.js`
