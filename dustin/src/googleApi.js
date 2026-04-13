// ─── GOOGLE API CONFIGURATION ────────────────────────────────────────────────
// Fill in your values from Google Cloud Console before deploying.
// Required APIs (enable in Cloud Console): Google Drive API, Google Sheets API
// OAuth 2.0 scopes: drive.file, spreadsheets

export const GOOGLE_CONFIG = {
  // OAuth 2.0 Client ID — from Cloud Console → APIs & Services → Credentials
  CLIENT_ID: "446616410257-glc3mpegh9c574ep3ui915ctesgj15ti.apps.googleusercontent.com",

  // Drive folder ID where job sub-folders will be created
  // Get it from the URL when you open the parent folder in Google Drive:
  // https://drive.google.com/drive/folders/<PARENT_FOLDER_ID>
  PARENT_FOLDER_ID: "1a7nLW1X4pesPJSq1s_6RLRK2ic7Fex26",

  // Google Spreadsheet ID where each new job is logged
  // Get it from the Sheet URL:
  // https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit
  SPREADSHEET_ID: "1E2u3Q1uIFiaybbbnpca9ZAvMAGvUEz_zWGMQcegM1DE",

  // Name of the sheet tab to append rows into
  SHEET_NAME: "TAKEOFF_DATA",

  SCOPES: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ].join(" "),
};

// ─── TOKEN MANAGEMENT ────────────────────────────────────────────────────────

let tokenClient = null;
let cachedToken = null;
let tokenExpiry = 0;

function waitForGIS() {
  return new Promise((resolve) => {
    const check = () => {
      if (window.google?.accounts?.oauth2) resolve();
      else setTimeout(check, 100);
    };
    check();
  });
}

async function ensureTokenClient() {
  if (tokenClient) return;
  await waitForGIS();
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CONFIG.CLIENT_ID,
    scope: GOOGLE_CONFIG.SCOPES,
    callback: () => {}, // overridden per request below
  });
}

// Returns a valid OAuth 2.0 access token, prompting the user if needed.
export function getAccessToken() {
  return new Promise(async (resolve, reject) => {
    await ensureTokenClient();

    // Reuse cached token if it has more than 60 seconds left
    if (cachedToken && Date.now() < tokenExpiry - 60_000) {
      resolve(cachedToken);
      return;
    }

    tokenClient.callback = (response) => {
      if (response.error) {
        reject(new Error(`OAuth error: ${response.error}`));
        return;
      }
      cachedToken = response.access_token;
      tokenExpiry = Date.now() + response.expires_in * 1000;
      resolve(cachedToken);
    };

    // Skip the consent screen on token refresh; show it on first auth
    tokenClient.requestAccessToken({ prompt: cachedToken ? "" : "consent" });
  });
}

// ─── DRIVE FOLDER CREATION ───────────────────────────────────────────────────

// Creates a sub-folder inside PARENT_FOLDER_ID and returns its ID and URL.
// Checks for an existing folder with the same name first to prevent duplicates.
export async function createDriveFolder(folderName) {
  const token = await getAccessToken();

  // Search for an existing folder with this exact name in the parent
  const escapedName = folderName.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
  const query = `name='${escapedName}' and '${GOOGLE_CONFIG.PARENT_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
  const searchRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!searchRes.ok) {
    const err = await searchRes.json().catch(() => ({}));
    throw new Error(
      `Drive search ${searchRes.status}: ${err?.error?.message ?? searchRes.statusText}`
    );
  }

  const searchData = await searchRes.json();
  if (searchData.files?.length > 0) {
    // Folder already exists — return the existing one
    const existing = searchData.files[0];
    return {
      folderId: existing.id,
      folderUrl: `https://drive.google.com/drive/folders/${existing.id}`,
    };
  }

  // No existing folder found — create it
  const response = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [GOOGLE_CONFIG.PARENT_FOLDER_ID],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `Drive API ${response.status}: ${err?.error?.message ?? response.statusText}`
    );
  }

  const data = await response.json();
  return {
    folderId: data.id,
    folderUrl: `https://drive.google.com/drive/folders/${data.id}`,
  };
}

// ─── SPREADSHEET LOGGING ─────────────────────────────────────────────────────

// Appends one row to the configured spreadsheet with job and folder details.
// Columns: Timestamp | Job Name | Job Number | Job ID | Folder Name | Folder ID | Folder URL
export async function logToSpreadsheet({ jobName, jobNumber, jobId, folderName, folderId, folderUrl }) {
  const token = await getAccessToken();
  const timestamp = new Date().toLocaleString();
  const range = encodeURIComponent(`${GOOGLE_CONFIG.SHEET_NAME}!A1`);

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_CONFIG.SPREADSHEET_ID}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[timestamp, jobName, jobNumber, jobId, folderName, folderId, folderUrl]],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `Sheets API ${response.status}: ${err?.error?.message ?? response.statusText}`
    );
  }
}

// ─── FILE UPLOAD TO DRIVE FOLDER ─────────────────────────────────────────────

// Uploads a JSON file into an existing Drive folder.
// Returns the created file's Drive ID.
export async function uploadFileToDrive(folderId, filename, content) {
  const token = await getAccessToken();
  const boundary = "mbdw_boundary_" + Math.random().toString(36).slice(2);

  const metadata = JSON.stringify({ name: filename, parents: [folderId] });
  const body = [
    `--${boundary}`,
    "Content-Type: application/json; charset=UTF-8",
    "",
    metadata,
    `--${boundary}`,
    "Content-Type: application/json",
    "",
    content,
    `--${boundary}--`,
  ].join("\r\n");

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body,
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      `Drive upload ${response.status}: ${err?.error?.message ?? response.statusText}`
    );
  }

  const data = await response.json();
  return data.id;
}

// ─── ORCHESTRATOR ────────────────────────────────────────────────────────────

// Called once per new job. Creates the Drive folder then logs it to the sheet.
// Folder name format: "<Job Name> __ <Job ID>"
// Returns { folderId, folderUrl, folderName } to be stored on the job object.
export async function provisionJob(job) {
  const folderName = `${job.name} __ ${job.id}`;
  const { folderId, folderUrl } = await createDriveFolder(folderName);
  await logToSpreadsheet({
    jobName: job.name,
    jobNumber: job.jobNumber,
    jobId: job.id,
    folderName,
    folderId,
    folderUrl,
  });
  return { folderId, folderUrl, folderName };
}
