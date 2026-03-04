import { useState, useRef, useEffect } from "react";

const MBDW_LOGO = "data:image/png;base64,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";
const MATERIALS = [
  "12ST (1/2\" STD)",
  "58ULIX (5/8\" ULTRALIGHT)",
  "58FG (5/8\" FIREGUARD)",
  "12TB (1/2\" TILEBACKER)",
  "58TB (5/8\" TILEBACKER)",
  "12CD (1/2\" CEILING BOARD)",
  "14FL (1/4\" FLEXIBLE)",
  "1254 (1/2\" 54\" STD)",
  "12DU (1/2\" DUROCK)",
  "58DU (5/8\" DUROCK)",
  "12MOLD (1/2\" AQUA BOARD)",
  "58MOLD (5/8\" AQUA BOARD)",
  "12SR (1/2\" SECUREROCK)",
  "58SR (5/8\" SECUREROCK)",
  "12FG (1/2\" FIREGUARD)",
  "12AR (1/2\" ABUSE RESISTANT)",
  "58AR (5/8\" ABUSE RESISTANT)",
  "01GM (SHAFT BOARD)",
];

const LENGTHS = ["8'", "9'", "10'", "12'", "14'"];

const ACCESSORIES = {
  "Mud & Tape": [
    "SYLLJT17 (SYNKO LITE JOINT MUD YELLOW)",
    "SYCLFN17 (SYNKO CLASSIS FINISH RED)",
    "SYPDCF (SYNKO CONCRETE FILL)",
    "HMRL17 (HAMILTON RED LINE FINISH)",
    "RPJNTP (DRYWALL TAPE 500')",
    "RPFIBA (FIBREGLASS TAPE 300')",
    "RPLL100 (LEVEL LINE)",
  ],
  "Beads & Trim": [
    "PBTBD (BULLDOG TAPE ON CORNER BEAD)",
    "B1XW (PROBEAD EXTRA WIDE BEAD)",
    "PJC58 (5/8\" PLASTIC J)",
    "PJC12 (1/2\" PLASTIC J)",
    "PBB9 (1/2\" PAPER J TRIM)",
    "PB58A9 (5/8\" PAPER J)",
    "VB41 (ARCHWAY CORNER BEAD)",
    "VB9000 (FLAT TEAR AWAY BEAD)",
  ],
  "Metal & Track": [
    "MS18RES (25G RESILIENT CHANNEL)",
    "MS18124 (25G 1 1/2\" X 1 1/4\" ANGLE)",
    "MS18HAT (25G HAT TRACK)",
  ],
  "Fasteners & Adhesives": [
    "ADDSA2 (DSA 20 ADHESIVE)",
    "ADDSA4 (DSA 40 ADHESIVE)",
    "DS001F (1\" DW SCREWS)",
    "JW15104 (1 1/4\" FINE DW SCREWS 5LB)",
    "DS114C (1 1/4\" COARSE DW SCREWS)",
    "DS002C (2\" COARSE DW SCREWS)",
    "DS002F (2\" FINE DW SCREWS)",
  ],
};

const ALL_ACCESSORIES = Object.values(ACCESSORIES).flat();

const DEFAULT_AREAS = ["Upper Floor", "Main Floor", "Basement", "Basement Suite", "Garage"];
const MULTIFAMILY_AREAS = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"];

const generateId = () => Math.random().toString(36).slice(2);

const initAreaData = () => {
  const data = {};
  MATERIALS.forEach((mat) => {
    data[mat] = {};
    LENGTHS.forEach((len) => {
      data[mat][len] = 0;
    });
  });
  return data;
};

const initJob = (name, jobNumber = "", type = "single") => ({
  id: generateId(),
  name,
  jobNumber,
  type,
  contact: "",
  areas: (type === "multi" ? MULTIFAMILY_AREAS : DEFAULT_AREAS).map((a) => ({ id: generateId(), name: a, data: initAreaData() })),
  accessories: ALL_ACCESSORIES.map((p) => ({ product: p, qty: 0, placement: "General" })),
});

export default function TakeoffApp() {
  // Load from localStorage on first render
  const [screen, setScreen] = useState("home");
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem("takeoff_jobs");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [currentJobId, setCurrentJobId] = useState(() => {
    try { return localStorage.getItem("takeoff_currentJobId") || null; } catch { return null; }
  });
  const [currentAreaId, setCurrentAreaId] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try { return localStorage.getItem("takeoff_unlocked") === "true"; } catch { return false; }
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [newJobName, setNewJobName] = useState("");
  const [newJobNumber, setNewJobNumber] = useState("");
  const [newJobType, setNewJobType] = useState("single");
  const [renamingAreaId, setRenamingAreaId] = useState(null);
  const [renameAreaValue, setRenameAreaValue] = useState("");
  const [jobSearch, setJobSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editJobName, setEditJobName] = useState("");
  const [editJobNumber, setEditJobNumber] = useState("");
  const [newAreaName, setNewAreaName] = useState("");
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [showNewAreaModal, setShowNewAreaModal] = useState(false);
  const [showMaterialPicker, setShowMaterialPicker] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState(() => {
    try {
      const saved = localStorage.getItem("takeoff_selectedMaterials");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [editingQtyProduct, setEditingQtyProduct] = useState(null);
  const [editingQtyValue, setEditingQtyValue] = useState("");
  const [newCustomMaterial, setNewCustomMaterial] = useState("");
  const [newCustomAccessory, setNewCustomAccessory] = useState("");
  const [toast, setToast] = useState("");
  const accScrollRef = useRef(null);
  const shellRef = useRef(null);
  const longPressTimer = useRef(null);
  const [isLandscape, setIsLandscape] = useState(
    typeof window !== "undefined" && window.innerWidth > window.innerHeight
  );

  // Auto-save whenever jobs, currentJobId, or selectedMaterials change
  useEffect(() => {
    try { localStorage.setItem("takeoff_jobs", JSON.stringify(jobs)); } catch {}
  }, [jobs]);

  useEffect(() => {
    try {
      if (currentJobId) localStorage.setItem("takeoff_currentJobId", currentJobId);
      else localStorage.removeItem("takeoff_currentJobId");
    } catch {}
  }, [currentJobId]);

  useEffect(() => {
    try { localStorage.setItem("takeoff_selectedMaterials", JSON.stringify(selectedMaterials)); } catch {}
  }, [selectedMaterials]);

  useEffect(() => {
    const update = () => setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // Scroll to top on every screen change
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (shellRef.current) shellRef.current.scrollTop = 0;
      if (screen === "accessories" && accScrollRef.current) {
        accScrollRef.current.scrollTop = 0;
      }
    }, 0);
  }, [screen]);

  const addCustomMaterial = () => {
    const val = newCustomMaterial.trim().toUpperCase();
    if (!val || selectedMaterials.includes(val)) return;
    setSelectedMaterials((prev) => [...prev, val]);
    setNewCustomMaterial("");
  };

  const addCustomAccessory = () => {
    const val = newCustomAccessory.trim().toUpperCase();
    if (!val) return;
    setJobs((prev) =>
      prev.map((job) =>
        job.id !== currentJobId
          ? job
          : {
              ...job,
              accessories: [
                ...(job.accessories || []),
                { product: val, qty: 0, placement: "General" },
              ],
            }
      )
    );
    setNewCustomAccessory("");
  };

  const currentJob = jobs.find((j) => j.id === currentJobId);
  const currentArea = currentJob?.areas.find((a) => a.id === currentAreaId);

  const updateQty = (mat, len, delta) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id !== currentJobId
          ? job
          : {
              ...job,
              areas: job.areas.map((area) =>
                area.id !== currentAreaId
                  ? area
                  : {
                      ...area,
                      data: {
                        ...area.data,
                        [mat]: {
                          ...area.data[mat],
                          [len]: Math.max(0, (area.data[mat][len] || 0) + delta),
                        },
                      },
                    }
              ),
            }
      )
    );
  };

  const handleCellPress = (mat, len) => updateQty(mat, len, 1);

  const startLongPress = (mat, len) => {
    longPressTimer.current = setTimeout(() => {
      updateQty(mat, len, -1);
    }, 500);
  };
  const cancelLongPress = () => clearTimeout(longPressTimer.current);

  const updateAccessory = (product, field, value) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id !== currentJobId
          ? job
          : {
              ...job,
              accessories: job.accessories.map((a) =>
                a.product === product ? { ...a, [field]: value } : a
              ),
            }
      )
    );
  };

  const updateAccessoryQty = (product, delta) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id !== currentJobId
          ? job
          : {
              ...job,
              accessories: job.accessories.map((a) =>
                a.product === product
                  ? { ...a, qty: Math.max(0, a.qty + delta) }
                  : a
              ),
            }
      )
    );
  };

  const createJob = () => {
    if (!newJobName.trim()) return;
    const job = initJob(newJobName.trim(), newJobNumber.trim(), newJobType);
    setJobs((prev) => [...prev, job]);
    setNewJobName("");
    setNewJobNumber("");
    setNewJobType("single");
    setShowNewJobModal(false);
    setCurrentJobId(job.id);
    setSelectedMaterials([MATERIALS[2], MATERIALS[0], MATERIALS[7], MATERIALS[1]]);
    setScreen("job");
  };

  const createArea = () => {
    if (!newAreaName.trim()) return;
    const area = { id: generateId(), name: newAreaName.trim(), data: initAreaData() };
    setJobs((prev) =>
      prev.map((j) =>
        j.id === currentJobId ? { ...j, areas: [...j.areas, area] } : j
      )
    );
    setNewAreaName("");
    setShowNewAreaModal(false);
  };

  const deleteArea = (areaId) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === currentJobId
          ? { ...j, areas: j.areas.filter((a) => a.id !== areaId) }
          : j
      )
    );
  };

  const renameArea = (areaId, newName) => {
    if (!newName.trim()) return;
    setJobs((prev) =>
      prev.map((j) =>
        j.id === currentJobId
          ? { ...j, areas: j.areas.map((a) => a.id === areaId ? { ...a, name: newName.trim() } : a) }
          : j
      )
    );
    setRenamingAreaId(null);
  };

  const saveJobEdit = (jobId) => {
    if (!editJobName.trim()) return;
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, name: editJobName.trim(), jobNumber: editJobNumber.trim() } : j
      )
    );
    setEditingJobId(null);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const exportToCSV = async () => {
    if (!currentJob) return;
    const mats = selectedMaterials.length > 0 ? selectedMaterials : MATERIALS;
    let csv = `"Job: ${currentJob.name}"\n\n`;

    currentJob.areas.forEach((area) => {
      if (areaTotal(area) === 0) return;
      csv += `"AREA: ${area.name}"\n`;
      csv += `"Material",${LENGTHS.map(l => `"${l}"`).join(",")},\"SHEET TOTAL\",\"SQ FT\"\n`;
      mats.forEach((mat) => {
        const rowData = LENGTHS.map((len) => area.data[mat]?.[len] || 0);
        const sheetTotal = rowData.reduce((a, b) => a + b, 0);
        if (sheetTotal === 0) return;
        const sqft = LENGTHS.reduce((s, len, i) => s + rowData[i] * sheetWidth(mat) * lenFeet(len), 0);
        csv += `"${mat}",${rowData.join(",")},${sheetTotal},${Math.round(sqft)}\n`;
      });
      const totalSheets = areaTotal(area);
      const totalSqFt = areaSqFt(area, mats);
      csv += `"TOTALS",,,,${totalSheets},${totalSqFt}\n\n`;
    });

    const grandSheets = currentJob.areas.reduce((s, a) => s + areaTotal(a), 0);
    const grandSqFt = currentJob.areas.reduce((s, a) => s + areaSqFt(a, mats), 0);
    csv += `"JOB TOTAL SHEETS",${grandSheets}\n`;
    csv += `"JOB TOTAL SQ FT",${grandSqFt}\n\n`;

    const usedAccessories = (currentJob.accessories || []).filter(a => a.qty > 0);
    if (usedAccessories.length > 0) {
      csv += `"ACCESSORIES & SUPPLIES"\n`;
      csv += `"Product","Qty","Placement"\n`;
      usedAccessories.forEach(a => {
        csv += `"${a.product}",${a.qty},"${a.placement || ''}"\n`;
      });
    }

    const filename = `${currentJob.name.replace(/\s+/g, "_")}_takeoff.csv`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Try Web Share API first (best on Android)
    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], filename, { type: "text/csv" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: filename });
          showToast("✅ Shared successfully!");
          return;
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          // share failed, fall through to download
        } else {
          return; // user cancelled
        }
      }
    }

    // Fallback: blob download
    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 1000);
      showToast("✅ Downloading to your device!");
    } catch (e) {
      // Last resort: open as data URI in new tab
      const reader = new FileReader();
      reader.onload = () => {
        window.open(reader.result, "_blank");
        showToast("✅ Opened — use Share to save!");
      };
      reader.readAsDataURL(blob);
    }
  };

  const areaTotal = (area) => {
    let t = 0;
    selectedMaterials.forEach((mat) => {
      LENGTHS.forEach((len) => {
        t += area.data[mat]?.[len] || 0;
      });
    });
    return t;
  };

  const sheetWidth = (mat) => mat.includes("1254") ? 4.5 : 4;
  const isDisabledCell = (mat, len) => {
    if (mat.includes("1254") && (len === "9'" || len === "14'")) return true;
    if (mat.startsWith("58") && len === "14'") return true;
    return false;
  };
  const lenFeet = (len) => parseFloat(len.replace("'", ""));

  const areaSqFt = (area, mats) => {
    let sqft = 0;
    mats.forEach((mat) => {
      LENGTHS.forEach((len) => {
        const qty = area?.data[mat]?.[len] || 0;
        sqft += qty * sheetWidth(mat) * lenFeet(len);
      });
    });
    return Math.round(sqft);
  };

  const lenSqFt = (area, len, mats) => {
    let sqft = 0;
    mats.forEach((mat) => {
      const qty = area?.data[mat]?.[len] || 0;
      sqft += qty * sheetWidth(mat) * lenFeet(len);
    });
    return Math.round(sqft);
  };

  // ─── SCREENS ──────────────────────────────────────────────────────────────

  if (!isUnlocked) {
    return (
      <div style={{ ...styles.shell, maxWidth: 520, alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px", width: "100%" }}>
          <img src={MBDW_LOGO} alt="MBDW" style={{ height: 72, marginBottom: 24, objectFit: "contain" }} />
          <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>Maclean Bros.</div>
          <div style={{ fontSize: 13, color: "#475569", marginBottom: 40, letterSpacing: 1 }}>Drywall Takeoff App</div>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>ENTER PASSWORD</div>
            <input
              autoFocus
              type="password"
              style={{ ...styles.input, fontSize: 18, letterSpacing: 4, textAlign: "center", borderColor: passwordError ? "#ef4444" : "#1e293b" }}
              placeholder="••••••••"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (passwordInput === "MBDW2025") {
                    localStorage.setItem("takeoff_unlocked", "true");
                    setIsUnlocked(true);
                  } else {
                    setPasswordError(true);
                    setPasswordInput("");
                  }
                }
              }}
            />
            {passwordError && (
              <div style={{ color: "#ef4444", fontSize: 12, textAlign: "center", marginTop: -8, marginBottom: 12 }}>Incorrect password. Try again.</div>
            )}
            <button
              style={styles.btnPrimary}
              onClick={() => {
                if (passwordInput === "MBDW2025") {
                  localStorage.setItem("takeoff_unlocked", "true");
                  setIsUnlocked(true);
                } else {
                  setPasswordError(true);
                  setPasswordInput("");
                }
              }}
            >Unlock</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "home") {
    const filteredJobs = jobs.filter(job => {
      if (!jobSearch.trim()) return true;
      const q = jobSearch.toLowerCase();
      return (
        job.name.toLowerCase().includes(q) ||
        (job.jobNumber || "").toLowerCase().includes(q)
      );
    });

    return (
      <div style={{ ...styles.shell, maxWidth: isLandscape ? "100%" : 520 }}>
        <div style={styles.header}>
          <img
            src={MBDW_LOGO}
            alt="Maclean Bros. Drywall"
            style={{ height: 38, objectFit: "contain" }}
          />
          <span style={styles.logo}>Maclean Bros.</span>
          {jobs.length > 0 && (
            <button
              style={{ background: "none", border: "none", color: showSearch ? "#60a5fa" : "#475569", fontSize: 20, cursor: "pointer", padding: "0 4px" }}
              onClick={() => { setShowSearch(s => !s); setJobSearch(""); }}
            >🔍</button>
          )}
        </div>

        {showSearch && (
          <div style={{ padding: "10px 16px 0", background: "#0d1526", borderBottom: "1px solid #1e293b" }}>
            <input
              autoFocus
              style={{ ...styles.input, marginBottom: 10 }}
              placeholder="Search by job name or number…"
              value={jobSearch}
              onChange={(e) => setJobSearch(e.target.value)}
            />
          </div>
        )}

        <div style={styles.body}>
          {!showSearch && <p style={styles.subtitle}>Drywall Takeoff App</p>}
          {jobs.length === 0 && (
            <p style={styles.empty}>No jobs yet. Create one to get started.</p>
          )}
          {showSearch && filteredJobs.length === 0 && (
            <p style={styles.empty}>No jobs match "{jobSearch}"</p>
          )}
          <div style={styles.list}>
            {filteredJobs.map((job) => (
              <div key={job.id} style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                {editingJobId === job.id ? (
                  <div style={{ flex: 1, background: "#0d1526", border: "1px solid #2563eb", borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                    <input
                      autoFocus
                      style={{ ...styles.input, marginBottom: 0 }}
                      placeholder="Job name"
                      value={editJobName}
                      onChange={(e) => setEditJobName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveJobEdit(job.id)}
                    />
                    <input
                      style={{ ...styles.input, marginBottom: 0 }}
                      placeholder="Job number (optional)"
                      value={editJobNumber}
                      onChange={(e) => setEditJobNumber(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveJobEdit(job.id)}
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ ...styles.btnPrimary, padding: "8px", flex: 1 }} onClick={() => saveJobEdit(job.id)}>Save</button>
                      <button style={{ ...styles.smallBtn, padding: "8px 14px" }} onClick={() => setEditingJobId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button
                    style={{ ...styles.jobCard, flex: 1 }}
                    onClick={() => {
                      setCurrentJobId(job.id);
                      if (selectedMaterials.length === 0)
                        setSelectedMaterials([MATERIALS[2], MATERIALS[0], MATERIALS[7], MATERIALS[1]]);
                      setScreen("job");
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={styles.jobName}>{job.name}</div>
                        <span style={{ ...styles.typeBadge, background: job.type === "multi" ? "#7c3aed22" : "#0369a122", color: job.type === "multi" ? "#a78bfa" : "#38bdf8", borderColor: job.type === "multi" ? "#7c3aed44" : "#0369a144" }}>
                          {job.type === "multi" ? "MULTI" : "SINGLE"}
                        </span>
                      </div>
                      <div style={styles.jobMeta}>
                        {job.jobNumber ? `#${job.jobNumber} · ` : ""}{job.areas.length} area(s)
                      </div>
                    </div>
                    <span style={{ fontSize: 20 }}>›</span>
                  </button>
                )}
                {editingJobId !== job.id && (
                  <button
                    style={styles.renameAreaBtn}
                    onClick={() => { setEditingJobId(job.id); setEditJobName(job.name); setEditJobNumber(job.jobNumber || ""); }}
                  >✏️</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button style={styles.fab} onClick={() => setShowNewJobModal(true)}>＋ New Job</button>

        {showNewJobModal && (
          <Modal title="New Job" onClose={() => { setShowNewJobModal(false); setNewJobName(""); setNewJobNumber(""); setNewJobType("single"); }}>
            {/* Job type selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button
                style={{ ...styles.typeBtn, background: newJobType === "single" ? "#0369a1" : "#1e293b", borderColor: newJobType === "single" ? "#38bdf8" : "#334155", color: newJobType === "single" ? "#fff" : "#94a3b8" }}
                onClick={() => setNewJobType("single")}
              >
                🏠 Single Family
              </button>
              <button
                style={{ ...styles.typeBtn, background: newJobType === "multi" ? "#7c3aed" : "#1e293b", borderColor: newJobType === "multi" ? "#a78bfa" : "#334155", color: newJobType === "multi" ? "#fff" : "#94a3b8" }}
                onClick={() => setNewJobType("multi")}
              >
                🏢 Multifamily
              </button>
            </div>
            <input
              autoFocus
              style={styles.input}
              placeholder="Job name"
              value={newJobName}
              onChange={(e) => setNewJobName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createJob()}
            />
            <input
              style={styles.input}
              placeholder="Job number (optional)"
              value={newJobNumber}
              onChange={(e) => setNewJobNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createJob()}
            />
            <div style={{ fontSize: 12, color: "#475569", marginBottom: 10 }}>
              {newJobType === "multi"
                ? "Preloads Units 1–6 (renameable)"
                : "Preloads Upper Floor, Main Floor, Basement, Suite, Garage"}
            </div>
            <button style={styles.btnPrimary} onClick={createJob}>Create Job</button>
          </Modal>
        )}
      </div>
    );
  }

  if (screen === "job") {
    const totalSheets = currentJob?.areas.reduce((s, a) => s + areaTotal(a), 0) || 0;
    const totalSqFt = currentJob?.areas.reduce((s, a) => s + areaSqFt(a, selectedMaterials), 0) || 0;
    return (
      <div style={{ ...styles.shell, maxWidth: isLandscape ? "100%" : 520 }}>
        <div style={{ ...styles.header, padding: isLandscape ? "8px 16px" : "14px 16px" }}>
          <button style={styles.back} onClick={() => setScreen("home")}>‹</button>
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.headerTitle, fontSize: isLandscape ? 14 : 16 }}>{currentJob?.name}</div>
            {currentJob?.jobNumber ? <div style={{ fontSize: 11, color: "#64748b" }}>#{currentJob.jobNumber}</div> : null}
          </div>
          <button style={styles.exportBtn} onClick={exportToCSV}>Export</button>
        </div>
        <div style={{ ...styles.body, display: isLandscape ? "grid" : "block", gridTemplateColumns: isLandscape ? "1fr 1fr" : undefined, gap: isLandscape ? "0 24px" : undefined }}>
          <div>
          <div style={styles.sectionRow}>
            <span style={styles.sectionLabel}>AREAS</span>
            <button style={styles.smallBtn} onClick={() => setShowNewAreaModal(true)}>+ Add Area</button>
          </div>
          <div style={styles.list}>
            {currentJob?.areas.map((area) => (
              <div key={area.id} style={styles.areaRow}>
                {renamingAreaId === area.id ? (
                  <div style={{ flex: 1, display: "flex", gap: 6 }}>
                    <input
                      autoFocus
                      style={{ ...styles.input, marginBottom: 0, flex: 1 }}
                      value={renameAreaValue}
                      onChange={(e) => setRenameAreaValue(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") renameArea(area.id, renameAreaValue); if (e.key === "Escape") setRenamingAreaId(null); }}
                    />
                    <button style={styles.accConfirmBtn} onClick={() => renameArea(area.id, renameAreaValue)}>✓</button>
                    <button style={{ ...styles.accClearBtn, fontSize: 16 }} onClick={() => setRenamingAreaId(null)}>✕</button>
                  </div>
                ) : (
                  <>
                    <button
                      style={styles.areaCard}
                      onClick={() => { setCurrentAreaId(area.id); setScreen("area"); }}
                    >
                      <div>
                        <div style={styles.areaName}>{area.name}</div>
                        <div style={styles.areaMeta}>{areaTotal(area)} sheets · {areaSqFt(area, selectedMaterials)} ft²</div>
                      </div>
                      <span style={{ fontSize: 20 }}>›</span>
                    </button>
                    <button style={styles.renameAreaBtn} onClick={() => { setRenamingAreaId(area.id); setRenameAreaValue(area.name); }}>✏️</button>
                    <button style={styles.deleteAreaBtn} onClick={() => deleteArea(area.id)}>🗑</button>
                  </>
                )}
              </div>
            ))}
          </div>
          </div>{/* end left col */}

          <div>
          {/* Job-wide totals summary */}
          {currentJob?.areas.length > 0 && (
              <div style={styles.jobSummaryCard}>
                <div style={styles.jobSummaryLabel}>JOB TOTAL</div>
                <div style={styles.jobSummaryRow}>
                  <div style={styles.jobSummaryItem}>
                    <div style={styles.jobSummaryValue}>{totalSheets}</div>
                    <div style={styles.jobSummaryUnit}>sheets</div>
                  </div>
                  <div style={styles.jobSummaryDivider} />
                  <div style={styles.jobSummaryItem}>
                    <div style={{ ...styles.jobSummaryValue, color: "#34d399" }}>{totalSqFt}</div>
                    <div style={styles.jobSummaryUnit}>ft²</div>
                  </div>
                </div>
              </div>
          )}

          {/* Accessories link */}
          <button style={styles.accessoriesNav} onClick={() => setScreen("accessories")}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>📦 Accessories & Supplies</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
                {currentJob?.accessories?.filter(a => a.qty > 0).length || 0} items selected
              </div>
            </div>
            <span style={{ fontSize: 20 }}>›</span>
          </button>

          <div style={{ marginTop: 16 }}>
            <div style={styles.sectionRow}>
              <span style={styles.sectionLabel}>ACTIVE MATERIALS ({selectedMaterials.length})</span>
              <button style={styles.smallBtn} onClick={() => setShowMaterialPicker(true)}>Edit</button>
            </div>
            {selectedMaterials.map((m) => (
              <div key={m} style={styles.matChip}>{m}</div>
            ))}
          </div>
          </div>{/* end right col */}
        </div>

        {toast && (
          <div style={styles.toast}>{toast}</div>
        )}

        {showNewAreaModal && (
          <Modal title="New Area" onClose={() => setShowNewAreaModal(false)}>
            <input
              autoFocus
              style={styles.input}
              placeholder={currentJob?.type === "multi" ? "e.g. Unit 7" : "e.g. Bonus Room"}
              value={newAreaName}
              onChange={(e) => setNewAreaName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createArea()}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              {(currentJob?.type === "multi"
                ? ["Unit 7","Unit 8","Unit 9","Unit 10","Unit 11","Unit 12","Common Area","Parkade","Lobby"]
                : ["Upper Floor","Main Floor","Basement","Basement Suite","Garage","Bonus Room"]
              ).map(n => (
                <button key={n} style={styles.presetBtn} onClick={() => setNewAreaName(n)}>{n}</button>
              ))}
            </div>
            <button style={styles.btnPrimary} onClick={createArea}>Add Area</button>
          </Modal>
        )}

        {showMaterialPicker && (
          <Modal title="Select Materials" onClose={() => setShowMaterialPicker(false)} tall>
            <p style={{ color: "#aaa", fontSize: 12, marginBottom: 8 }}>Tap to toggle active materials.</p>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {selectedMaterials.concat(
                MATERIALS.filter(m => !selectedMaterials.includes(m))
              ).map((m) => {
                const active = selectedMaterials.includes(m);
                return (
                  <button
                    key={m}
                    style={{ ...styles.matToggle, background: active ? "#2563eb22" : "#1a1a2e", borderColor: active ? "#2563eb" : "#333" }}
                    onClick={() =>
                      setSelectedMaterials((prev) =>
                        active ? prev.filter((x) => x !== m) : [...prev, m]
                      )
                    }
                  >
                    <span style={{ color: active ? "#60a5fa" : "#888" }}>{active ? "✓" : "○"}</span>
                    <span style={{ color: active ? "#e2e8f0" : "#aaa", fontSize: 13, marginLeft: 8 }}>{m}</span>
                  </button>
                );
              })}
              {/* Custom material input */}
              <div style={{ borderTop: "1px solid #1e293b", paddingTop: 10, marginTop: 6 }}>
                <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>ADD CUSTOM MATERIAL</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    style={{ ...styles.input, marginBottom: 0, flex: 1 }}
                    placeholder="e.g. CUSTOM BOARD TYPE"
                    value={newCustomMaterial}
                    onChange={(e) => setNewCustomMaterial(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomMaterial()}
                  />
                  <button style={{ ...styles.accConfirmBtn, padding: "8px 14px" }} onClick={addCustomMaterial}>＋</button>
                </div>
              </div>
            </div>
            <button style={styles.btnPrimary} onClick={() => setShowMaterialPicker(false)}>Done</button>
          </Modal>
        )}
      </div>
    );
  }

  if (screen === "area") {
    const matRows = selectedMaterials.length > 0 ? selectedMaterials : MATERIALS.slice(0, 6);
    const cellH = isLandscape ? 40 : 52;
    const matColW = isLandscape ? 148 : 120;
    const cellFontSize = isLandscape ? 15 : 17;
    const headerPad = isLandscape ? "6px 8px" : "10px 8px";

    return (
      <div style={{ ...styles.shell, maxWidth: "100%" }}>
        <div style={{ ...styles.header, padding: isLandscape ? "8px 16px" : "14px 16px" }}>
          <button style={styles.back} onClick={() => setScreen("job")}>‹</button>
          <span style={{ ...styles.headerTitle, fontSize: isLandscape ? 14 : 16 }}>{currentArea?.name}</span>
          <span style={{ color: "#60a5fa", fontSize: isLandscape ? 11 : 13 }}>{areaTotal(currentArea)} pcs · {areaSqFt(currentArea, matRows)} ft²</span>
        </div>

        {/* Totals pinned at top */}
        <div style={{ ...styles.totalsBar, borderTop: "none", borderBottom: "2px solid #2563eb44" }}>
          <div style={{ ...styles.totalsLabel, width: matColW, minWidth: matColW }}>SHEETS</div>
          {LENGTHS.map((len) => {
            const total = matRows.reduce((s, mat) => s + (currentArea?.data[mat]?.[len] || 0), 0);
            return <div key={len} style={{ ...styles.totalCell, fontSize: isLandscape ? 14 : 16 }}>{total > 0 ? total : "·"}</div>;
          })}
          <div style={{ ...styles.totalCell, fontWeight: 900, fontSize: isLandscape ? 14 : 16, minWidth: 48 }}>
            ={matRows.reduce((s, mat) => s + LENGTHS.reduce((ls, len) => ls + (currentArea?.data[mat]?.[len] || 0), 0), 0)}
          </div>
        </div>
        <div style={{ ...styles.totalsBar, background: "#0d2040", borderTop: "none", borderBottom: "2px solid #1e293b" }}>
          <div style={{ ...styles.totalsLabel, fontSize: 9, width: matColW, minWidth: matColW }}>FT²</div>
          {LENGTHS.map((len) => (
            <div key={len} style={{ ...styles.totalCell, color: "#34d399", fontSize: isLandscape ? 12 : 13 }}>
              {lenSqFt(currentArea, len, matRows)}
            </div>
          ))}
          <div style={{ ...styles.totalCell, color: "#34d399", fontWeight: 900, fontSize: isLandscape ? 12 : 13, minWidth: 48 }}>
            ={areaSqFt(currentArea, matRows)}
          </div>
        </div>

        {/* Scrollable grid */}
        <div style={styles.gridWrapper}>
          {/* Header row */}
          <div style={{ ...styles.gridHead, minWidth: matColW + LENGTHS.length * 50 + 48 }}>
            <div style={{ ...styles.matLabelHead, width: matColW, minWidth: matColW, padding: headerPad }}>Material</div>
            {LENGTHS.map((l) => (
              <div key={l} style={{ ...styles.lenHead, padding: headerPad }}>{l}</div>
            ))}
            <div style={{ ...styles.lenHead, minWidth: 48, padding: headerPad }}>TOT</div>
          </div>

          {/* Data rows */}
          <div style={{ ...styles.gridBody, minWidth: matColW + LENGTHS.length * 50 + 48 }}>
            {matRows.map((mat, i) => (
              <div key={mat} style={{ ...styles.gridRow, background: i % 2 === 0 ? "#0f172a" : "#111827" }}>
                <div style={{ ...styles.matLabel, width: matColW, minWidth: matColW, fontSize: isLandscape ? 10 : 10.5, padding: isLandscape ? "4px 8px" : "6px 8px" }}>{mat}</div>
                {LENGTHS.map((len) => {
                  const val = currentArea?.data[mat]?.[len] || 0;
                  const disabled = isDisabledCell(mat, len);
                  return (
                    <button
                      key={len}
                      disabled={disabled}
                      style={{ ...styles.cell, height: cellH, fontSize: cellFontSize, background: disabled ? "#0a0f1e" : val > 0 ? "#1e3a5f" : "#1e293b", color: disabled ? "#1e293b" : val > 0 ? "#60a5fa" : "#475569", cursor: disabled ? "not-allowed" : "pointer" }}
                      onPointerDown={() => !disabled && startLongPress(mat, len)}
                      onPointerUp={() => { if (!disabled) { cancelLongPress(); handleCellPress(mat, len); } }}
                      onPointerLeave={cancelLongPress}
                      onContextMenu={(e) => { e.preventDefault(); if (!disabled) updateQty(mat, len, -1); }}
                    >
                      {disabled ? "—" : val > 0 ? val : "·"}
                    </button>
                  );
                })}
                <div style={{ ...styles.totalCell, minWidth: 48, height: cellH, fontSize: isLandscape ? 12 : 13, color: "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center", background: i % 2 === 0 ? "#0f172a" : "#111827" }}>
                  {LENGTHS.reduce((s, len) => s + (currentArea?.data[mat]?.[len] || 0), 0) || "·"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...styles.hint, fontSize: isLandscape ? 10 : 11, padding: isLandscape ? "4px 0" : "6px 0" }}>
          Tap = +1 &nbsp;|&nbsp; Long press = −1
        </div>
      </div>
    );
  }

  if (screen === "accessories") {
    const areaNames = currentJob?.areas.map((a) => a.name) || [];

    // Auto-repair: if job was created before accessories were added, initialize them now
    const rawAccessories = currentJob?.accessories;
    if (!rawAccessories || rawAccessories.length === 0) {
      setJobs((prev) =>
        prev.map((j) =>
          j.id !== currentJobId
            ? j
            : { ...j, accessories: ALL_ACCESSORIES.map((p) => ({ product: p, qty: 0, placement: "General" })) }
        )
      );
    }
    const accessories = (rawAccessories && rawAccessories.length > 0)
      ? rawAccessories
      : ALL_ACCESSORIES.map((p) => ({ product: p, qty: 0, placement: "" }));

    return (
      <div ref={shellRef} style={{ ...styles.shell, maxWidth: isLandscape ? "100%" : 520 }}>
        <div style={{ ...styles.header, padding: isLandscape ? "8px 16px" : "14px 16px" }}>
          <button style={styles.back} onClick={() => setScreen("job")}>‹</button>
          <span style={styles.headerTitle}>Accessories & Supplies</span>
          <span style={{ color: "#60a5fa", fontSize: 12 }}>{accessories.filter(a => a.qty > 0).length} items</span>
        </div>

        <div key="acc-scroll" ref={accScrollRef} style={{ flex: 1, overflowY: "auto", display: isLandscape ? "grid" : "block", gridTemplateColumns: isLandscape ? "1fr 1fr" : undefined, alignItems: "start" }}>

          {/* All Areas warning */}
          {accessories.some(a => a.placement === "All Areas") && (
            <div style={styles.allAreasWarning}>
              ⚠️ One or more items are set to <strong>All Areas</strong> — these will be listed under every area in your export.
            </div>
          )}
          {Object.entries(ACCESSORIES).map(([category, products]) => (
            <div key={category}>
              <div style={styles.accCategoryHeader}>{category}</div>
              {products.map((product) => {
                const entry = accessories.find((a) => a.product === product) || { qty: 0, placement: "" };
                const isEditingThis = editingQtyProduct === product;
                return (
                  <div key={product} style={styles.accRow}>
                    <div style={styles.accProductName}>{product}</div>
                    <div style={styles.accControls}>
                      {/* Qty controls */}
                      <div style={styles.accQtyRow}>
                        <button
                          style={{ ...styles.accQtyBtn, minWidth: 52 }}
                          onPointerDown={() => { longPressTimer.current = setTimeout(() => updateAccessoryQty(product, -1), 500); }}
                          onPointerUp={() => { cancelLongPress(); updateAccessoryQty(product, 1); }}
                          onPointerLeave={cancelLongPress}
                          onContextMenu={(e) => { e.preventDefault(); updateAccessoryQty(product, -1); }}
                        >
                          <span style={{ color: entry.qty > 0 ? "#60a5fa" : "#475569", fontWeight: 900, fontSize: 18 }}>
                            {entry.qty > 0 ? entry.qty : "·"}
                          </span>
                        </button>

                        {/* Pencil edit button */}
                        {isEditingThis ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <input
                              autoFocus
                              type="number"
                              min="0"
                              style={styles.accQtyInput}
                              value={editingQtyValue}
                              onChange={(e) => setEditingQtyValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  const v = parseInt(editingQtyValue, 10);
                                  if (!isNaN(v)) updateAccessory(product, "qty", Math.max(0, v));
                                  setEditingQtyProduct(null);
                                }
                                if (e.key === "Escape") setEditingQtyProduct(null);
                              }}
                            />
                            <button
                              style={styles.accConfirmBtn}
                              onClick={() => {
                                const v = parseInt(editingQtyValue, 10);
                                if (!isNaN(v)) updateAccessory(product, "qty", Math.max(0, v));
                                setEditingQtyProduct(null);
                              }}
                            >✓</button>
                          </div>
                        ) : (
                          <button
                            style={styles.accPencilBtn}
                            onClick={() => { setEditingQtyProduct(product); setEditingQtyValue(String(entry.qty)); }}
                          >✏️</button>
                        )}

                        {entry.qty > 0 && !isEditingThis && (
                          <button style={styles.accClearBtn} onClick={() => updateAccessory(product, "qty", 0)}>✕</button>
                        )}
                      </div>
                      {/* Placement dropdown */}
                      <select
                        style={{ ...styles.accSelect, color: entry.placement === "All Areas" ? "#f59e0b" : "#94a3b8" }}
                        value={entry.placement || "General"}
                        onChange={(e) => updateAccessory(product, "placement", e.target.value)}
                      >
                        <option value="General">General</option>
                        {areaNames.map((n) => <option key={n} value={n}>{n}</option>)}
                        <option value="All Areas">⚠️ All Areas</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Custom accessories added by user */}
          {accessories.filter(a => !ALL_ACCESSORIES.includes(a.product)).length > 0 && (
            <div>
              <div style={styles.accCategoryHeader}>CUSTOM ITEMS</div>
              {accessories.filter(a => !ALL_ACCESSORIES.includes(a.product)).map((entry) => {
                const product = entry.product;
                const isEditingThis = editingQtyProduct === product;
                return (
                  <div key={product} style={styles.accRow}>
                    <div style={styles.accProductName}>{product}</div>
                    <div style={styles.accControls}>
                      <div style={styles.accQtyRow}>
                        <button
                          style={{ ...styles.accQtyBtn, minWidth: 52 }}
                          onPointerDown={() => { longPressTimer.current = setTimeout(() => updateAccessoryQty(product, -1), 500); }}
                          onPointerUp={() => { cancelLongPress(); updateAccessoryQty(product, 1); }}
                          onPointerLeave={cancelLongPress}
                          onContextMenu={(e) => { e.preventDefault(); updateAccessoryQty(product, -1); }}
                        >
                          <span style={{ color: entry.qty > 0 ? "#60a5fa" : "#475569", fontWeight: 900, fontSize: 18 }}>
                            {entry.qty > 0 ? entry.qty : "·"}
                          </span>
                        </button>
                        {isEditingThis ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <input autoFocus type="number" min="0" style={styles.accQtyInput} value={editingQtyValue}
                              onChange={(e) => setEditingQtyValue(e.target.value)}
                              onKeyDown={(e) => { if (e.key === "Enter") { const v = parseInt(editingQtyValue, 10); if (!isNaN(v)) updateAccessory(product, "qty", Math.max(0, v)); setEditingQtyProduct(null); } if (e.key === "Escape") setEditingQtyProduct(null); }}
                            />
                            <button style={styles.accConfirmBtn} onClick={() => { const v = parseInt(editingQtyValue, 10); if (!isNaN(v)) updateAccessory(product, "qty", Math.max(0, v)); setEditingQtyProduct(null); }}>✓</button>
                          </div>
                        ) : (
                          <button style={styles.accPencilBtn} onClick={() => { setEditingQtyProduct(product); setEditingQtyValue(String(entry.qty)); }}>✏️</button>
                        )}
                        {entry.qty > 0 && !isEditingThis && (
                          <button style={styles.accClearBtn} onClick={() => updateAccessory(product, "qty", 0)}>✕</button>
                        )}
                      </div>
                      <select style={{ ...styles.accSelect, color: entry.placement === "All Areas" ? "#f59e0b" : "#94a3b8" }} value={entry.placement || "General"} onChange={(e) => updateAccessory(product, "placement", e.target.value)}>
                        <option value="General">General</option>
                        {areaNames.map((n) => <option key={n} value={n}>{n}</option>)}
                        <option value="All Areas">⚠️ All Areas</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add custom accessory */}
          <div style={{ padding: "14px 16px", borderTop: "2px solid #1e293b" }}>
            <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>ADD CUSTOM ITEM</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                style={{ ...styles.input, marginBottom: 0, flex: 1 }}
                placeholder="e.g. SPECIAL COMPOUND"
                value={newCustomAccessory}
                onChange={(e) => setNewCustomAccessory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomAccessory()}
              />
              <button style={{ ...styles.accConfirmBtn, padding: "8px 16px", fontSize: 18 }} onClick={addCustomAccessory}>＋</button>
            </div>
          </div>

          <div style={{ height: 32 }} />
        </div>
      </div>
    );
  }

  return null;
}

// ─── MODAL ───────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, tall }) {
  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, maxHeight: tall ? "80vh" : "auto", display: "flex", flexDirection: "column" }}>
        <div style={styles.modalHeader}>
          <span style={styles.modalTitle}>{title}</span>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const styles = {
  shell: {
    minHeight: "100vh",
    background: "#0a0f1e",
    color: "#e2e8f0",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 520,
    margin: "0 auto",
    position: "relative",
    boxSizing: "border-box",
  },
  header: {
    background: "#0d1526",
    borderBottom: "1px solid #1e293b",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: { fontSize: 18, fontWeight: 800, letterSpacing: 2, color: "#60a5fa", flex: 1 },
  headerTitle: { flex: 1, fontWeight: 700, fontSize: 16, color: "#f1f5f9", letterSpacing: 0.5 },
  back: { background: "none", border: "none", color: "#60a5fa", fontSize: 28, cursor: "pointer", lineHeight: 1, padding: "0 4px" },
  exportBtn: { background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontWeight: 700, fontSize: 12, cursor: "pointer" },
  body: { flex: 1, padding: "16px", overflowY: "auto" },
  subtitle: { color: "#64748b", fontSize: 13, marginBottom: 20, letterSpacing: 1 },
  empty: { color: "#475569", textAlign: "center", marginTop: 60, fontSize: 14 },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  jobCard: {
    background: "#0d1526",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: "14px 16px",
    color: "#e2e8f0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    textAlign: "left",
  },
  jobName: { fontWeight: 700, fontSize: 16 },
  jobMeta: { color: "#64748b", fontSize: 12, marginTop: 2 },
  areaRow: { display: "flex", gap: 8, alignItems: "center" },
  areaCard: {
    background: "#0d1526",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: "14px 16px",
    color: "#e2e8f0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    textAlign: "left",
  },
  areaName: { fontWeight: 600, fontSize: 15 },
  areaMeta: { color: "#64748b", fontSize: 12, marginTop: 2 },
  deleteAreaBtn: { background: "#1e293b", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontSize: 16 },
  renameAreaBtn: { background: "#1e293b", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer", fontSize: 15 },
  typeBadge: {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1,
    padding: "2px 7px",
    borderRadius: 6,
    border: "1px solid",
  },
  typeBtn: {
    flex: 1,
    border: "1px solid",
    borderRadius: 10,
    padding: "10px 8px",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
  },
  fab: {
    position: "fixed",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 100,
    padding: "14px 32px",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 4px 24px #2563eb66",
    letterSpacing: 0.5,
  },
  sectionRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sectionLabel: { fontSize: 11, fontWeight: 700, color: "#475569", letterSpacing: 1.5 },
  smallBtn: { background: "#1e293b", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "4px 12px", fontSize: 12, cursor: "pointer" },
  matChip: { background: "#1e293b", borderRadius: 6, padding: "5px 10px", fontSize: 12, color: "#94a3b8", marginBottom: 4 },
  matToggle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "1px solid #333",
    borderRadius: 8,
    padding: "10px 12px",
    marginBottom: 6,
    cursor: "pointer",
    textAlign: "left",
  },
  // Grid
  gridWrapper: {
    flex: 1,
    overflowY: "auto",
    overflowX: "auto",
  },
  gridHead: {
    display: "flex",
    background: "#0d1526",
    borderBottom: "2px solid #2563eb44",
    position: "sticky",
    top: 0,
    zIndex: 5,
  },
  matLabelHead: { width: 120, minWidth: 120, padding: "10px 8px", fontSize: 11, color: "#475569", fontWeight: 700, letterSpacing: 1 },
  lenHead: { flex: 1, minWidth: 50, textAlign: "center", padding: "10px 4px", fontSize: 13, fontWeight: 800, color: "#60a5fa" },
  gridBody: { display: "flex", flexDirection: "column" },
  gridRow: { display: "flex", alignItems: "center", borderBottom: "1px solid #1e293b" },
  matLabel: { width: 120, minWidth: 120, padding: "6px 8px", fontSize: 10.5, color: "#94a3b8", fontWeight: 600, lineHeight: 1.3 },
  cell: {
    flex: 1,
    minWidth: 50,
    height: 48,
    border: "none",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 16,
    userSelect: "none",
    WebkitUserSelect: "none",
    touchAction: "manipulation",
    transition: "background 0.1s, color 0.1s",
    borderRight: "1px solid #1e293b44",
  },
  hint: {
    textAlign: "center",
    fontSize: 11,
    color: "#475569",
    padding: "6px 0",
    background: "#0a0f1e",
    borderTop: "1px solid #1e293b",
  },
  totalsBar: {
    display: "flex",
    background: "#0d1526",
    borderTop: "2px solid #2563eb44",
    padding: "8px 0",
  },
  totalsLabel: { width: 120, minWidth: 120, padding: "0 8px", fontSize: 11, color: "#60a5fa", fontWeight: 800, display: "flex", alignItems: "center" },
  totalCell: { flex: 1, minWidth: 50, textAlign: "center", fontWeight: 800, fontSize: 16, color: "#f1f5f9" },
  // Modal
  overlay: {
    position: "fixed", inset: 0, background: "#000000bb", zIndex: 100,
    display: "flex", alignItems: "flex-end", justifyContent: "center",
  },
  modal: {
    background: "#0d1526",
    border: "1px solid #1e293b",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 480,
    gap: 12,
  },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  modalTitle: { fontWeight: 800, fontSize: 17 },
  closeBtn: { background: "#1e293b", border: "none", color: "#94a3b8", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 },
  input: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 10,
    padding: "12px 14px",
    color: "#f1f5f9",
    fontSize: 15,
    width: "100%",
    outline: "none",
    marginBottom: 10,
    boxSizing: "border-box",
  },
  btnPrimary: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "13px",
    fontWeight: 800,
    fontSize: 15,
    cursor: "pointer",
    width: "100%",
  },
  presetBtn: {
    background: "#1e293b",
    border: "1px solid #334155",
    color: "#94a3b8",
    borderRadius: 8,
    padding: "6px 10px",
    fontSize: 12,
    cursor: "pointer",
  },
  jobSummaryCard: {
    background: "#0d2040",
    border: "1px solid #2563eb44",
    borderRadius: 12,
    padding: "14px 16px",
    marginTop: 16,
  },
  jobSummaryLabel: {
    fontSize: 10,
    fontWeight: 800,
    color: "#60a5fa",
    letterSpacing: 2,
    marginBottom: 10,
  },
  jobSummaryRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  jobSummaryItem: {
    textAlign: "center",
    flex: 1,
  },
  jobSummaryValue: {
    fontSize: 32,
    fontWeight: 900,
    color: "#f1f5f9",
    lineHeight: 1,
  },
  jobSummaryUnit: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 4,
    letterSpacing: 1,
  },
  jobSummaryDivider: {
    width: 1,
    height: 40,
    background: "#1e3a5f",
  },
  toast: {
    position: "fixed",
    bottom: 32,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#065f46",
    color: "#d1fae5",
    border: "1px solid #34d399",
    borderRadius: 12,
    padding: "12px 24px",
    fontWeight: 700,
    fontSize: 14,
    zIndex: 999,
    whiteSpace: "nowrap",
    boxShadow: "0 4px 20px #00000066",
  },
  accessoriesNav: {
    background: "#0d2040",
    border: "1px solid #2563eb44",
    borderRadius: 12,
    padding: "14px 16px",
    marginTop: 12,
    color: "#e2e8f0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    textAlign: "left",
  },
  allAreasWarning: {
    background: "#451a03",
    border: "1px solid #f59e0b",
    borderRadius: 10,
    padding: "10px 14px",
    margin: "10px 12px",
    fontSize: 13,
    color: "#fcd34d",
    lineHeight: 1.5,
    gridColumn: "1 / -1",
  },
  accCategoryHeader: {
    background: "#0d1526",
    color: "#60a5fa",
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 2,
    padding: "10px 16px 6px",
    borderBottom: "1px solid #1e293b",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  accRow: {
    borderBottom: "1px solid #1e293b",
    padding: "10px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#0a0f1e",
  },
  accProductName: {
    fontSize: 13,
    color: "#cbd5e1",
    fontWeight: 600,
  },
  accControls: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  accQtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  accQtyBtn: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 8,
    width: 48,
    height: 36,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    touchAction: "manipulation",
  },
  accClearBtn: {
    background: "none",
    border: "none",
    color: "#475569",
    fontSize: 12,
    cursor: "pointer",
    padding: "4px",
  },
  accPencilBtn: {
    background: "none",
    border: "none",
    fontSize: 15,
    cursor: "pointer",
    padding: "4px 6px",
    opacity: 0.7,
  },
  accQtyInput: {
    background: "#1e293b",
    border: "1px solid #2563eb",
    borderRadius: 8,
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: 800,
    width: 64,
    padding: "6px 8px",
    outline: "none",
    textAlign: "center",
  },
  accConfirmBtn: {
    background: "#2563eb",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontWeight: 800,
    fontSize: 15,
    padding: "6px 10px",
    cursor: "pointer",
  },
  accSelect: {
    flex: 1,
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 8,
    color: "#94a3b8",
    padding: "8px 10px",
    fontSize: 12,
    outline: "none",
  },
};
