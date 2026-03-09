// MBDW Takeoff App v1.5
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

// ─── MATERIAL PRICING (Shoemaker price list, effective Feb 20 2026) ───────────
// Per-sheet prices by material code and length. Update via Admin Pricing screen.
// Stored in localStorage key: takeoff_sheet_prices (overrides these defaults)
const DEFAULT_SHEET_PRICES = {
  "12ST":   { "8'": 14.40, "9'": 16.20, "10'": 18.00, "12'": 21.60, "14'": 25.20 },
  "58ULIX": { "8'": 19.07, "9'": 21.46, "10'": 23.84, "12'": 28.61, "14'": null  },
  "58FG":   { "8'": 18.08, "9'": 20.34, "10'": 22.60, "12'": 27.12, "14'": null  },
  "12TB":   { "8'": 51.84, "9'": null,   "10'": null,   "12'": null,   "14'": null  },
  "58TB":   { "8'": 59.04, "9'": null,   "10'": null,   "12'": null,   "14'": null  },
  "12CD":   { "8'": 18.24, "9'": null,   "10'": 22.80, "12'": 27.36, "14'": 31.92 },
  "14FL":   { "8'": 26.02, "9'": null,   "10'": null,   "12'": 39.02, "14'": null  },
  "1254":   { "8'": 20.34, "9'": null,   "10'": 25.43, "12'": 30.51, "14'": null  },
  "12DU":   { "8'": 55.04, "9'": null,   "10'": null,   "12'": null,   "14'": null  },
  "58DU":   { "8'": 78.72, "9'": null,   "10'": null,   "12'": null,   "14'": null  },
  "12MOLD": { "8'": 34.40, "9'": null,   "10'": 43.00, "12'": 51.60, "14'": null  },
  "58MOLD": { "8'": 40.00, "9'": 45.00, "10'": 50.00, "12'": 60.00, "14'": null  },
  "12SR":   { "8'": 37.44, "9'": null,   "10'": null,   "12'": null,   "14'": null  },
  "58SR":   { "8'": 40.54, "9'": null,   "10'": 50.68, "12'": null,   "14'": null  },
  "12FG":   { "8'": 18.24, "9'": null,   "10'": 22.80, "12'": 27.36, "14'": null  },
  "12AR":   { "8'": 37.95, "9'": null,   "10'": 47.44, "12'": 56.93, "14'": null  },
  "58AR":   { "8'": 44.35, "9'": 49.90, "10'": 55.44, "12'": 66.53, "14'": null  },
  "01GM":   { "8'": 30.66, "9'": null,   "10'": 38.32, "12'": null,   "14'": null  },
};

const loadSheetPrices = () => {
  try {
    const saved = localStorage.getItem("takeoff_sheet_prices");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...JSON.parse(JSON.stringify(DEFAULT_SHEET_PRICES)), ...parsed };
    }
  } catch(e) {}
  return JSON.parse(JSON.stringify(DEFAULT_SHEET_PRICES));
};

const saveSheetPrices = (prices) => {
  try { localStorage.setItem("takeoff_sheet_prices", JSON.stringify(prices)); } catch(e) {}
};

const getSheetPrice = (prices, mat, length) => {
  const code = mat.split(" ")[0];
  return prices?.[code]?.[length] ?? null;
};


const ACCESSORIES = {
  "Mud & Tape": [
    "RPHBTP (DRYWALL TAPE 500')",
    "SYLLJT17 (SYNKO LITE JOINT MUD YELLOW)",
    "SYCLFN17 (SYNKO CLASSIS FINISH RED)",
    "HMRL17 (HAMILTON RED LINE FINISH)",
    "SYPDCF (SYNKO CONCRETE FILL)",
    "RPFIBA (FIBREGLASS TAPE 300')",
  ],
  "Beads & Trim": [
    "RPLL100 (LEVEL LINE)",
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
    "MS18RES (25G RESILIENT CHANNEL 12')",
    "MS18124 (25G 1 1/2\" X 1 1/4\" ANGLE 10')",
    "MS18HAT (25G HAT TRACK 12')",
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

const initBudgetPricing = () => ({
  resBar: { qty: 0, rate: 0.25, manualQty: false, manualTotal: false },
  boarding: { rate: 0.35, manualTotal: false },
  scrap: { rate: 0.06, manualTotal: false },
  beading: { qty: 0, rate: 0.80, manualQty: false, manualTotal: false },
  taping: { noTapeFootage: 0, rate: 0.40, manualTotal: false },
  customLabour: [],
  boardingDrive: { rate: 65, manualTotal: false },
  tapingDrive: { rate: 50, manualTotal: false },
  management: { trips: 3, costPerTrip: 150, manualTotal: false },
  warranty: { qty: 0, rate: 50, manualTotal: false },
  scaffold: { qty: 1, rate: 500, manualTotal: false },
  overhead: { pct: 10 },
  profit: { pct: 15 },
  manualOverrides: {},
});

const initJob = (name, jobNumber = "", type = "single") => ({
  id: generateId(),
  name,
  jobNumber,
  type,
  contact: "",
  areas: (type === "multi" ? MULTIFAMILY_AREAS : DEFAULT_AREAS).map((a) => ({ id: generateId(), name: a, data: initAreaData() })),
  accessories: ALL_ACCESSORIES.map((p) => ({ product: p, qty: 0, placement: "General" })),
  ...(type === "budget" ? { budgetPricing: initBudgetPricing() } : {}),
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
  const [isBudgetUnlocked, setIsBudgetUnlocked] = useState(() => {
    try { return localStorage.getItem("takeoff_budget_unlocked") === "true"; } catch { return false; }
  });
  const [showBudgetUnlockModal, setShowBudgetUnlockModal] = useState(false);
  const [budgetPasswordInput, setBudgetPasswordInput] = useState("");
  const [budgetPasswordError, setBudgetPasswordError] = useState(false);
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
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState(
    Object.keys(ACCESSORIES).reduce((acc, cat) => ({ ...acc, [cat]: cat !== "Mud & Tape" }), {})
  );
  const toggleSection = (cat) => setCollapsedSections(prev => ({ ...prev, [cat]: !prev[cat] }));
  const [showNewAreaModal, setShowNewAreaModal] = useState(false);
  const [newAreaName, setNewAreaName] = useState("");
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
  const [sheetPrices, setSheetPrices] = useState(() => loadSheetPrices());
  const [adminPriceInput, setAdminPriceInput] = useState("");
  const [adminPriceError, setAdminPriceError] = useState(false);
  const [isPricingUnlocked, setIsPricingUnlocked] = useState(false);
  const [bulkPopup, setBulkPopup] = useState(null); // { x, y, mat, len, count }
  const bulkInterval = useRef(null);
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

  const longPressFired = useRef(false);
  const bulkDeleteTimer = useRef(null);

  const startLongPress = (mat, len, x, y) => {
    longPressFired.current = false;
    clearTimeout(longPressTimer.current);
    clearTimeout(bulkDeleteTimer.current);
    clearInterval(bulkInterval.current);

    // 600ms — show popup only, no delete yet
    longPressTimer.current = setTimeout(() => {
      longPressFired.current = true;
      setBulkPopup({ x, y, mat, len });

      // 600ms more (1200ms total) — start deleting 1 per second
      bulkDeleteTimer.current = setTimeout(() => {
        updateQty(mat, len, -1);
        bulkInterval.current = setInterval(() => {
          updateQty(mat, len, -1);
        }, 1000);
      }, 600);
    }, 600);
  };

  const cancelLongPress = () => {
    clearTimeout(longPressTimer.current);
    clearTimeout(bulkDeleteTimer.current);
    clearInterval(bulkInterval.current);
    setBulkPopup(null);
  };

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

  const [showJobNumberWarning, setShowJobNumberWarning] = useState(false);

  const handleBudgetUnlock = () => {
    if (budgetPasswordInput === "MBDW2025B") { // Budget password
      localStorage.setItem("takeoff_budget_unlocked", "true");
      setIsBudgetUnlocked(true);
      setShowBudgetUnlockModal(false);
      setBudgetPasswordInput("");
      setBudgetPasswordError(false);
      setNewJobType("budget");
    } else {
      setBudgetPasswordError(true);
      setBudgetPasswordInput("");
    }
  };

  const createJob = (skipNumberCheck = false) => {
    if (!newJobName.trim()) return;
    if (!newJobNumber.trim() && !skipNumberCheck) {
      setShowJobNumberWarning(true);
      return;
    }
    const job = initJob(newJobName.trim(), newJobNumber.trim(), newJobType);
    setJobs((prev) => [...prev, job]);
    setNewJobName("");
    setNewJobNumber("");
    setNewJobType("single");
    setShowNewJobModal(false);
    setShowJobNumberWarning(false);
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

  const [deleteJobId, setDeleteJobId] = useState(null);
  const deleteJob = (jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    if (currentJobId === jobId) setCurrentJobId(null);
    setDeleteJobId(null);
  };

  const duplicateJob = (jobId) => {
    const source = jobs.find(j => j.id === jobId);
    if (!source) return;
    const newJob = {
      ...JSON.parse(JSON.stringify(source)),
      id: generateId(),
      name: source.name + " (Copy)",
      areas: source.areas.map(a => ({ ...JSON.parse(JSON.stringify(a)), id: generateId() })),
    };
    setJobs(prev => [...prev, newJob]);
    showToast("✅ Job duplicated!");
  };

  const duplicateArea = (areaId) => {
    const source = currentJob?.areas.find(a => a.id === areaId);
    if (!source) return;
    const newArea = {
      ...JSON.parse(JSON.stringify(source)),
      id: generateId(),
      name: source.name + " (Copy)",
    };
    setJobs(prev => prev.map(j =>
      j.id !== currentJobId ? j : { ...j, areas: [...j.areas, newArea] }
    ));
    showToast("✅ Area duplicated!");
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
    let csv = currentJob.jobNumber
      ? `"Job #: ${currentJob.jobNumber}"\n"Order: ${currentJob.name}"\n\n`
      : `"Order: ${currentJob.name}"\n\n`;

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

  const sheetWidth = (mat) => {
    if (mat.includes("1254")) return 4.5;
    if (mat.startsWith("01GM")) return 2;
    return 4;
  };
  const isDisabledCell = (mat, len) => {
    // 1254 (54" board): no 9' or 14'
    if (mat.includes("1254") && (len === "9'" || len === "14'")) return true;
    // All 5/8" boards: no 14'
    if (mat.startsWith("58") && len === "14'") return true;
    // Tilebacker (12TB, 58TB): 8' only
    if ((mat.startsWith("12TB") || mat.startsWith("58TB")) && len !== "8'") return true;
    // Securerock (12SR, 58SR): 8' and 10' only
    if ((mat.startsWith("12SR") || mat.startsWith("58SR")) && (len === "9'" || len === "12'" || len === "14'")) return true;
    // Durock (12DU, 58DU): 8' only
    if ((mat.startsWith("12DU") || mat.startsWith("58DU")) && len !== "8'") return true;
    // Shaft board (01GM): 8' and 10' only
    if (mat.startsWith("01GM") && (len === "9'" || len === "12'" || len === "14'")) return true;
    return false;
  };

  // Wipe any quantities in disabled cells (cleans up legacy data)
  const cleanDisabledCells = (jobId, areaId) => {
    setJobs((prev) => prev.map((j) => {
      if (j.id !== jobId) return j;
      return {
        ...j,
        areas: j.areas.map((a) => {
          if (a.id !== areaId) return a;
          const newData = { ...a.data };
          Object.keys(newData).forEach((mat) => {
            LENGTHS.forEach((len) => {
              if (isDisabledCell(mat, len)) {
                newData[mat] = { ...newData[mat], [len]: 0 };
              }
            });
          });
          return { ...a, data: newData };
        }),
      };
    }));
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
          <img src={MBDW_LOGO} alt="MBDW" style={{ height: 72, marginBottom: 24, objectFit: "contain", mixBlendMode: "screen" }} />
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
            style={{ height: 38, objectFit: "contain", mixBlendMode: "screen" }}
          />
          <span style={styles.logo}>Maclean Bros.</span>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {jobs.length > 0 && (
              <button
                style={{ background: "none", border: "none", color: showSearch ? "#60a5fa" : "#475569", fontSize: 20, cursor: "pointer", padding: "0 4px" }}
                onClick={() => { setShowSearch(s => !s); setJobSearch(""); }}
              >🔍</button>
            )}
            <button
              style={{ background: "none", border: "none", color: "#1e293b", fontSize: 16, cursor: "pointer", padding: "0 2px" }}
              onClick={() => setScreen("pricing")}
              title="Admin Pricing"
            >⚙️</button>
          </div>
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
                {editingJobId !== job.id && (
                  <button
                    style={styles.renameAreaBtn}
                    onClick={() => duplicateJob(job.id)}
                  >⧉</button>
                )}
                {editingJobId !== job.id && (
                  <button
                    style={{ ...styles.deleteAreaBtn, color: "#ef4444" }}
                    onClick={() => setDeleteJobId(job.id)}
                  >🗑</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button style={styles.fab} onClick={() => setShowNewJobModal(true)}>＋ New Job</button>

        {showNewJobModal && (
          <Modal title="New Job" onClose={() => { setShowNewJobModal(false); setNewJobName(""); setNewJobNumber(""); setNewJobType("single"); setShowJobNumberWarning(false); }}>
            {/* Job type selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
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
              {isBudgetUnlocked ? (
                <button
                  style={{ ...styles.typeBtn, background: newJobType === "budget" ? "#065f46" : "#1e293b", borderColor: newJobType === "budget" ? "#34d399" : "#334155", color: newJobType === "budget" ? "#fff" : "#94a3b8" }}
                  onClick={() => setNewJobType("budget")}
                >
                  💰 Budget Order
                </button>
              ) : (
                <button
                  style={{ ...styles.typeBtn, background: "#1e293b", borderColor: "#334155", color: "#475569" }}
                  onClick={() => setShowBudgetUnlockModal(true)}
                >
                  🔒
                </button>
              )}
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
              placeholder="Job number"
              value={newJobNumber}
              onChange={(e) => { setNewJobNumber(e.target.value); setShowJobNumberWarning(false); }}
              onKeyDown={(e) => e.key === "Enter" && createJob()}
            />
            {showJobNumberWarning && (
              <div style={{ background: "#7c2d12", border: "1px solid #f97316", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                <div style={{ fontSize: 13, color: "#fed7aa", fontWeight: 600, marginBottom: 10 }}>
                  ⚠️ Please note that purchasing will not be able to price or process this order without a Job Number.
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{ ...styles.btnPrimary, flex: 1, background: "#ea580c", fontSize: 13, padding: "10px" }}
                    onClick={() => createJob(true)}
                  >Continue Without</button>
                  <button
                    style={{ ...styles.btnPrimary, flex: 1, fontSize: 13, padding: "10px", background: "#1e40af" }}
                    onClick={() => setShowJobNumberWarning(false)}
                  >Add Job Number</button>
                </div>
              </div>
            )}
            <div style={{ fontSize: 12, color: "#475569", marginBottom: 10 }}>
              {newJobType === "multi"
                ? "Preloads Units 1–6 (renameable)"
                : newJobType === "budget"
                ? "Preloads Upper Floor, Main Floor, Basement, Suite, Garage + Pricing Matrix"
                : "Preloads Upper Floor, Main Floor, Basement, Suite, Garage"}
            </div>
            <button style={styles.btnPrimary} onClick={() => createJob()}>Create Job</button>
          </Modal>
        )}

        {showBudgetUnlockModal && (
          <Modal title="🔒 Budget Access" onClose={() => { setShowBudgetUnlockModal(false); setBudgetPasswordInput(""); setBudgetPasswordError(false); }}>
            <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>Enter the budget password to unlock Budget Order jobs.</p>
            <input
              autoFocus
              type="password"
              style={styles.input}
              placeholder="Password"
              value={budgetPasswordInput}
              onChange={(e) => { setBudgetPasswordInput(e.target.value); setBudgetPasswordError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleBudgetUnlock()}
            />
            {budgetPasswordError && <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 8 }}>Incorrect password.</div>}
            <button style={styles.btnPrimary} onClick={handleBudgetUnlock}>Unlock</button>
          </Modal>
        )}

        {deleteJobId && (
          <Modal title="Delete Job?" onClose={() => setDeleteJobId(null)}>
            <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 16 }}>
              Are you sure you want to delete <strong style={{ color: "#f1f5f9" }}>{jobs.find(j => j.id === deleteJobId)?.name}</strong>? This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{ ...styles.btnPrimary, background: "#dc2626", flex: 1 }}
                onClick={() => deleteJob(deleteJobId)}
              >Delete</button>
              <button style={{ ...styles.smallBtn, flex: 1, padding: "12px" }} onClick={() => setDeleteJobId(null)}>Cancel</button>
            </div>
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
                      onClick={() => { setCurrentAreaId(area.id); cleanDisabledCells(currentJobId, area.id); setScreen("area"); }}
                    >
                      <div>
                        <div style={styles.areaName}>{area.name}</div>
                        <div style={styles.areaMeta}>{areaTotal(area)} sheets · {areaSqFt(area, selectedMaterials)} ft²</div>
                      </div>
                      <span style={{ fontSize: 20 }}>›</span>
                    </button>
                    <button style={styles.renameAreaBtn} onClick={() => { setRenamingAreaId(area.id); setRenameAreaValue(area.name); }}>✏️</button>
                    <button style={styles.renameAreaBtn} onClick={() => duplicateArea(area.id)}>⧉</button>
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

          {currentJob?.type === "budget" && (
            <button style={{ ...styles.accessoriesNav, borderColor: "#34d399", marginTop: 8 }} onClick={() => setScreen("budget")}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>💰 Budget & Pricing</div>
                <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>Labour rates, drive, overhead & profit</div>
              </div>
              <span style={{ fontSize: 20 }}>›</span>
            </button>
          )}

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
          <Modal title="Select & Order Materials" onClose={() => setShowMaterialPicker(false)} tall>
            <p style={{ color: "#aaa", fontSize: 12, marginBottom: 8 }}>Tap to toggle · Drag ☰ to reorder active materials.</p>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {/* Active materials — draggable */}
              {selectedMaterials.map((m, i) => (
                <div
                  key={m}
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragOver={(e) => { e.preventDefault(); setDragOverIndex(i); }}
                  onDrop={() => {
                    if (dragIndex === null || dragIndex === i) return;
                    const next = [...selectedMaterials];
                    const [moved] = next.splice(dragIndex, 1);
                    next.splice(i, 0, moved);
                    setSelectedMaterials(next);
                    setDragIndex(null);
                    setDragOverIndex(null);
                  }}
                  onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                  style={{ ...styles.matToggle, background: "#2563eb22", borderColor: dragOverIndex === i ? "#60a5fa" : "#2563eb", display: "flex", alignItems: "center", cursor: "grab", opacity: dragIndex === i ? 0.4 : 1 }}
                >
                  <span style={{ color: "#475569", fontSize: 16, marginRight: 8, cursor: "grab" }}>☰</span>
                  <span style={{ color: "#60a5fa" }}>✓</span>
                  <span style={{ color: "#e2e8f0", fontSize: 13, marginLeft: 8, flex: 1 }}>{m}</span>
                  <button
                    style={{ background: "none", border: "none", color: "#475569", fontSize: 18, cursor: "pointer", padding: "0 4px" }}
                    onClick={(e) => { e.stopPropagation(); setSelectedMaterials(prev => prev.filter(x => x !== m)); }}
                  >×</button>
                </div>
              ))}
              {/* Inactive materials */}
              {MATERIALS.filter(m => !selectedMaterials.includes(m)).map((m) => (
                <button
                  key={m}
                  style={{ ...styles.matToggle, background: "#1a1a2e", borderColor: "#333" }}
                  onClick={() => setSelectedMaterials(prev => [...prev, m])}
                >
                  <span style={{ color: "#888" }}>○</span>
                  <span style={{ color: "#aaa", fontSize: 13, marginLeft: 8 }}>{m}</span>
                </button>
              ))}
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
    const cellH = isLandscape ? 48 : 64;
    const matColW = isLandscape ? 130 : 80;
    const cellW = isLandscape ? 56 : 52;
    const cellFontSize = isLandscape ? 16 : 18;
    const headerPad = isLandscape ? "8px 4px" : "10px 2px";
    const totalWidth = matColW + LENGTHS.length * cellW;

    const formatMat = (mat) => {
      const bracket = mat.indexOf("(");
      if (bracket === -1) return [mat, ""];
      return [mat.slice(0, bracket).trim(), mat.slice(bracket)];
    };

    return (
      <div style={{ ...styles.shell, maxWidth: "100%" }}>
        <div style={{ ...styles.header, padding: isLandscape ? "8px 16px" : "14px 16px" }}>
          <button style={styles.back} onClick={() => setScreen("job")}>‹</button>
          <span style={{ ...styles.headerTitle, fontSize: isLandscape ? 14 : 16 }}>{currentArea?.name}</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#60a5fa", fontSize: isLandscape ? 11 : 13, fontWeight: 700 }}>{areaTotal(currentArea)} pcs</div>
            <div style={{ color: "#34d399", fontSize: isLandscape ? 10 : 12 }}>{areaSqFt(currentArea, matRows)} ft²</div>
          </div>
        </div>

        {/* Single scrollable container */}
        <div style={{ flex: 1, overflowX: "auto", overflowY: "auto" }}>
          <div style={{ minWidth: totalWidth }}>

            {/* Header row */}
            <div style={{ ...styles.gridHead, position: "sticky", top: 0, zIndex: 5 }}>
              <div style={{ ...styles.matLabelHead, width: matColW, minWidth: matColW, padding: headerPad }}>Mat.</div>
              {LENGTHS.map((l) => (
                <div key={l} style={{ ...styles.lenHead, width: cellW, minWidth: cellW, padding: headerPad }}>{l}</div>
              ))}
            </div>

            {/* Data rows */}
            <div style={styles.gridBody}>
              {matRows.map((mat, i) => {
                const [code, desc] = formatMat(mat);
                return (
                  <div key={mat} style={{ ...styles.gridRow, background: i % 2 === 0 ? "#0f172a" : "#111827" }}>
                    <div style={{ ...styles.matLabel, width: matColW, minWidth: matColW, padding: "4px 6px" }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#e2e8f0", lineHeight: 1.2 }}>{code}</div>
                      <div style={{ fontSize: 8, color: "#64748b", lineHeight: 1.2, marginTop: 1 }}>{desc}</div>
                    </div>
                    {LENGTHS.map((len) => {
                      const val = currentArea?.data[mat]?.[len] || 0;
                      const disabled = isDisabledCell(mat, len);
                      return (
                        <button
                          key={len}
                          disabled={disabled}
                          style={{ ...styles.cell, width: cellW, minWidth: cellW, height: cellH, fontSize: cellFontSize, background: disabled ? "#0a0f1e" : val > 0 ? "#1e3a5f" : "#1e293b", color: disabled ? "#1e293b" : val > 0 ? "#60a5fa" : "#475569", cursor: disabled ? "not-allowed" : "pointer" }}
                          onPointerDown={(e) => !disabled && startLongPress(mat, len, e.clientX, e.clientY)}
                          onPointerUp={() => { cancelLongPress(); if (!disabled && !longPressFired.current) handleCellPress(mat, len); }}
                          onPointerCancel={() => cancelLongPress()}
                          onContextMenu={(e) => { e.preventDefault(); if (!disabled) updateQty(mat, len, -1); }}
                        >
                          {disabled ? "—" : val > 0 ? val : "·"}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        <div style={{ ...styles.hint, fontSize: isLandscape ? 10 : 11, padding: isLandscape ? "4px 0" : "6px 0" }}>
          Tap = +1 &nbsp;|&nbsp; Long press = −1
        </div>

        {/* Bulk delete popup */}
        {bulkPopup && (() => {
          const liveVal = currentArea?.data[bulkPopup.mat]?.[bulkPopup.len] || 0;
          const popX = Math.min(Math.max(bulkPopup.x - 65, 10), window.innerWidth - 150);
          const popY = Math.max(bulkPopup.y - 180, 10);
          return (
            <div style={{ position: "fixed", left: popX, top: popY, zIndex: 999, background: "#0f172a", border: "2px solid #ef4444", borderRadius: 14, padding: "12px 20px", textAlign: "center", pointerEvents: "none", boxShadow: "0 4px 24px #000a" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 800, letterSpacing: 1, marginBottom: 4 }}>REMOVING</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: liveVal > 0 ? "#f87171" : "#475569", lineHeight: 1 }}>{liveVal}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>release to stop</div>
            </div>
          );
        })()}
      </div>
    );
  }

  if (screen === "budget") {
    const bp = currentJob?.budgetPricing || initBudgetPricing();
    const totalSqFt = currentJob?.areas.reduce((s, a) => s + areaSqFt(a, selectedMaterials), 0) || 0;

    const boardingFootage = totalSqFt;
    const tapingFootage = Math.max(0, boardingFootage - (bp.taping.noTapeFootage || 0));

    // Res bar auto-calc: MS18RES qty × 12' (unless manually overridden)
    const resBarAccessoryQty = (currentJob?.accessories || []).find(a => a.product.startsWith("MS18RES"))?.qty || 0;
    const resBarAutoQty = bp.resBar.manualQty ? bp.resBar.qty : resBarAccessoryQty * 12;

    // Drive quantities rounded up to nearest 1
    const boardingDriveQty = Math.ceil(boardingFootage / 3000);
    const tapingDriveQty = Math.ceil(tapingFootage / 3000);

    const updateBP = (path, value) => {
      setJobs(prev => prev.map(j => {
        if (j.id !== currentJobId) return j;
        const newBP = JSON.parse(JSON.stringify(j.budgetPricing || initBudgetPricing()));
        const keys = path.split(".");
        let obj = newBP;
        for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
        obj[keys[keys.length - 1]] = value;
        return { ...j, budgetPricing: newBP };
      }));
    };

    const addCustomLabour = () => {
      setJobs(prev => prev.map(j => {
        if (j.id !== currentJobId) return j;
        const newBP = JSON.parse(JSON.stringify(j.budgetPricing || initBudgetPricing()));
        newBP.customLabour = [...(newBP.customLabour || []), { id: Date.now().toString(), label: "Custom Labour", qty: 0, rate: 0, manualTotal: false }];
        return { ...j, budgetPricing: newBP };
      }));
    };

    const updateCustomLabour = (id, field, value) => {
      setJobs(prev => prev.map(j => {
        if (j.id !== currentJobId) return j;
        const newBP = JSON.parse(JSON.stringify(j.budgetPricing || initBudgetPricing()));
        newBP.customLabour = newBP.customLabour.map(r => r.id === id ? { ...r, [field]: value } : r);
        return { ...j, budgetPricing: newBP };
      }));
    };

    const deleteCustomLabour = (id) => {
      setJobs(prev => prev.map(j => {
        if (j.id !== currentJobId) return j;
        const newBP = JSON.parse(JSON.stringify(j.budgetPricing || initBudgetPricing()));
        newBP.customLabour = newBP.customLabour.filter(r => r.id !== id);
        return { ...j, budgetPricing: newBP };
      }));
    };

    // Computed totals (unless manually overridden)
    const rows = {
      resBar:       { label: "Res Bar / Angle",  qty: resBarAutoQty,        rate: bp.resBar.rate,           total: bp.resBar.manualTotal !== false ? bp.resBar.manualTotal : resBarAutoQty * bp.resBar.rate },
      boarding:     { label: "Boarding",          qty: boardingFootage,      rate: bp.boarding.rate,         total: bp.boarding.manualTotal !== false ? bp.boarding.manualTotal : boardingFootage * bp.boarding.rate },
      scrap:        { label: "Scrap",             qty: boardingFootage,      rate: bp.scrap.rate,            total: bp.scrap.manualTotal !== false ? bp.scrap.manualTotal : boardingFootage * bp.scrap.rate },
      beading:      { label: "Beading",           qty: bp.beading.qty,       rate: bp.beading.rate,          total: bp.beading.manualTotal !== false ? bp.beading.manualTotal : bp.beading.qty * bp.beading.rate },
      taping:       { label: "Taping",            qty: tapingFootage,        rate: bp.taping.rate,           total: bp.taping.manualTotal !== false ? bp.taping.manualTotal : tapingFootage * bp.taping.rate },
      boardingDrive:{ label: "Boarding Drive",    qty: boardingDriveQty,     rate: bp.boardingDrive.rate,    total: bp.boardingDrive.manualTotal !== false ? bp.boardingDrive.manualTotal : boardingDriveQty * bp.boardingDrive.rate },
      tapingDrive:  { label: "Taping Drive",      qty: tapingDriveQty,       rate: bp.tapingDrive.rate,      total: bp.tapingDrive.manualTotal !== false ? bp.tapingDrive.manualTotal : tapingDriveQty * bp.tapingDrive.rate },
      management:   { label: "Management",        qty: bp.management.trips,  rate: bp.management.costPerTrip,total: bp.management.manualTotal !== false ? bp.management.manualTotal : bp.management.trips * bp.management.costPerTrip },
      warranty:     { label: "Warranty",          qty: bp.warranty.qty,      rate: bp.warranty.rate,         total: bp.warranty.manualTotal !== false ? bp.warranty.manualTotal : bp.warranty.qty * bp.warranty.rate },
      scaffold:     { label: "Scaffold",          qty: bp.scaffold.qty,      rate: bp.scaffold.rate,         total: bp.scaffold.manualTotal !== false ? bp.scaffold.manualTotal : bp.scaffold.qty * bp.scaffold.rate },
    };

    const customLabourRows = (bp.customLabour || []);
    const customLabourTotal = customLabourRows.reduce((s, r) => s + (r.manualTotal !== false ? r.manualTotal : r.qty * r.rate), 0);
    const subTotal = Object.values(rows).reduce((s, r) => s + (r.total || 0), 0) + customLabourTotal;
    // Material cost: sum of (sheet qty × price per sheet) across all areas/materials/lengths
    const calcMaterialCost = () => {
      let total = 0;
      const mats = selectedMaterials.length > 0 ? selectedMaterials : MATERIALS;
      (currentJob?.areas || []).forEach(area => {
        mats.forEach(mat => {
          LENGTHS.forEach(len => {
            const qty = area?.data[mat]?.[len] || 0;
            if (qty > 0) {
              const price = getSheetPrice(sheetPrices, mat, len);
              if (price !== null) total += qty * price;
            }
          });
        });
      });
      return total;
    };
    const materialCost = bp.materialCost?.manualTotal !== undefined ? bp.materialCost.manualTotal : calcMaterialCost();
    const materialCostIsManual = bp.materialCost?.manualTotal !== undefined;
    const ohAmt = subTotal * (bp.overhead.pct / 100);
    const profitAmt = subTotal * (bp.profit.pct / 100);
    const totalQuote = materialCost + subTotal + ohAmt + profitAmt;

    const BPRow = ({ rowKey, row, qtyEditable = false, qtyPath = null, showNoTape = false }) => {
      const isManual = (currentJob?.budgetPricing?.[rowKey]?.manualTotal !== false && currentJob?.budgetPricing?.[rowKey]?.manualTotal !== undefined) ||
        (bp[rowKey]?.manualTotal !== false && bp[rowKey]?.manualTotal !== undefined && bp[rowKey]?.manualTotal !== false);
      const manualQty = currentJob?.budgetPricing?.[rowKey]?.manualQty;
      return (
        <div style={{ borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 80px", alignItems: "center", padding: "8px 12px", gap: 4 }}>
            <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>
              {row.label}
              {(isManual || manualQty) && <span style={{ fontSize: 10, color: "#f59e0b", marginLeft: 6 }}>⚠️ edited</span>}
            </div>
            {/* Qty */}
            <div
              style={{ fontSize: 12, color: manualQty ? "#f59e0b" : "#94a3b8", textAlign: "right", cursor: qtyEditable ? "pointer" : "default" }}
              onClick={() => {
                if (!qtyEditable) return;
                const v = prompt(`Edit quantity for ${row.label}:`, String(row.qty));
                if (v !== null && !isNaN(parseFloat(v))) {
                  updateBP(`${rowKey}.${qtyPath}`, parseFloat(v));
                  updateBP(`${rowKey}.manualQty`, true);
                  updateBP(`${rowKey}.manualTotal`, false);
                }
              }}
            >
              {typeof row.qty === "number" ? (Number.isInteger(row.qty) ? row.qty : row.qty.toFixed(2)) : row.qty}
              {qtyEditable && <span style={{ fontSize: 9, color: "#475569", marginLeft: 2 }}>✏️</span>}
            </div>
            {/* Rate */}
            <div
              style={{ fontSize: 12, color: "#64748b", textAlign: "right", cursor: "pointer" }}
              onClick={() => {
                const rateKey = rowKey === "management" ? "costPerTrip" : "rate";
                const v = prompt(`Edit rate for ${row.label}:`, String(row.rate));
                if (v !== null && !isNaN(parseFloat(v))) {
                  updateBP(`${rowKey}.${rateKey}`, parseFloat(v));
                  updateBP(`${rowKey}.manualTotal`, false);
                }
              }}
            >
              ${row.rate}<span style={{ fontSize: 9, color: "#475569", marginLeft: 2 }}>✏️</span>
            </div>
            {/* Total */}
            <div
              style={{ fontSize: 13, fontWeight: 700, color: isManual ? "#f59e0b" : "#34d399", textAlign: "right", cursor: "pointer" }}
              onClick={() => {
                const v = prompt(`Override total for ${row.label}:`, String(row.total?.toFixed(2)));
                if (v !== null && !isNaN(parseFloat(v))) {
                  updateBP(`${rowKey}.manualTotal`, parseFloat(v));
                }
              }}
            >
              ${(row.total || 0).toFixed(0)}<span style={{ fontSize: 9, color: "#475569", marginLeft: 2 }}>✏️</span>
            </div>
          </div>
          {showNoTape && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 12px 8px", borderTop: "1px solid #0f172a" }}>
              <span style={{ fontSize: 11, color: "#475569", flex: 1 }}>No-tape footage:</span>
              <input
                type="number"
                min="0"
                style={{ ...styles.input, marginBottom: 0, width: 90, padding: "4px 8px", fontSize: 12, textAlign: "right" }}
                value={bp.taping.noTapeFootage || 0}
                onChange={(e) => updateBP("taping.noTapeFootage", parseFloat(e.target.value) || 0)}
              />
            </div>
          )}
        </div>
      );
    };

    return (
      <div style={{ ...styles.shell, maxWidth: isLandscape ? "100%" : 520 }}>
        <div style={{ ...styles.header, padding: isLandscape ? "8px 16px" : "14px 16px" }}>
          <button style={styles.back} onClick={() => setScreen("job")}>‹</button>
          <div style={{ flex: 1 }}>
            <div style={{ ...styles.headerTitle, fontSize: 14 }}>💰 Budget & Pricing</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{currentJob?.name}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#34d399" }}>${totalQuote.toFixed(0)}</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Material Cost */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 80px", padding: "8px 12px", background: "#1a1a2e", borderBottom: "2px solid #f59e0b", alignItems: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#f59e0b", letterSpacing: 1 }}>
              MATERIAL COST
              {materialCostIsManual && <span style={{ fontSize: 10, color: "#f59e0b", marginLeft: 6 }}>⚠️ edited</span>}
            </div>
            <div style={{ fontSize: 11, color: "#64748b", textAlign: "right" }}>{boardingFootage} ft²</div>
            <div style={{ fontSize: 11, color: "#64748b", textAlign: "right" }}>per sheet</div>
            <div
              style={{ fontSize: 13, fontWeight: 800, color: "#f59e0b", textAlign: "right", cursor: "pointer" }}
              onClick={() => { const v = prompt("Override material cost:", String(materialCost.toFixed(2))); if (v !== null && !isNaN(parseFloat(v))) updateBP("materialCost.manualTotal", parseFloat(v)); }}
            >${materialCost.toFixed(0)}<span style={{ fontSize: 9, color: "#475569", marginLeft: 2 }}>✏️</span></div>
          </div>

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 80px", padding: "6px 12px", background: "#0d1526", borderBottom: "1px solid #1e3a5f" }}>
            <div style={{ fontSize: 10, color: "#475569", fontWeight: 700, letterSpacing: 1 }}>LABOUR BUDGET</div>
            <div style={{ fontSize: 10, color: "#475569", textAlign: "right" }}>QTY</div>
            <div style={{ fontSize: 10, color: "#475569", textAlign: "right" }}>RATE</div>
            <div style={{ fontSize: 10, color: "#475569", textAlign: "right" }}>TOTAL</div>
          </div>

          <BPRow rowKey="resBar" row={rows.resBar} qtyEditable qtyPath="qty" />
          <BPRow rowKey="boarding" row={rows.boarding} />
          <BPRow rowKey="scrap" row={rows.scrap} />
          <BPRow rowKey="beading" row={rows.beading} qtyEditable qtyPath="qty" />
          <BPRow rowKey="taping" row={rows.taping} showNoTape />

          {/* Custom labour rows */}
          {customLabourRows.map((row) => {
            const total = row.manualTotal !== false ? row.manualTotal : row.qty * row.rate;
            const isManual = row.manualTotal !== false;
            return (
              <div key={row.id} style={{ borderBottom: "1px solid #1e293b", background: "#0d1a2a" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 72px 24px", alignItems: "center", padding: "8px 12px", gap: 4 }}>
                  <input
                    style={{ background: "transparent", border: "none", borderBottom: "1px solid #334155", color: "#e2e8f0", fontSize: 13, fontWeight: 600, padding: "2px 0", outline: "none" }}
                    value={row.label}
                    onChange={(e) => updateCustomLabour(row.id, "label", e.target.value)}
                  />
                  <div
                    style={{ fontSize: 12, color: "#94a3b8", textAlign: "right", cursor: "pointer" }}
                    onClick={() => { const v = prompt(`Qty for ${row.label}:`, String(row.qty)); if (v !== null && !isNaN(parseFloat(v))) { updateCustomLabour(row.id, "qty", parseFloat(v)); updateCustomLabour(row.id, "manualTotal", false); } }}
                  >{row.qty}<span style={{ fontSize: 9, color: "#475569", marginLeft: 2 }}>✏️</span></div>
                  <div
                    style={{ fontSize: 12, color: "#64748b", textAlign: "right", cursor: "pointer" }}
                    onClick={() => { const v = prompt(`Rate for ${row.label}:`, String(row.rate)); if (v !== null && !isNaN(parseFloat(v))) { updateCustomLabour(row.id, "rate", parseFloat(v)); updateCustomLabour(row.id, "manualTotal", false); } }}
                  >${row.rate}<span style={{ fontSize: 9, color: "#475569", marginLeft: 2 }}>✏️</span></div>
                  <div
                    style={{ fontSize: 13, fontWeight: 700, color: isManual ? "#f59e0b" : "#34d399", textAlign: "right", cursor: "pointer" }}
                    onClick={() => { const v = prompt(`Override total for ${row.label}:`, String(total.toFixed(2))); if (v !== null && !isNaN(parseFloat(v))) updateCustomLabour(row.id, "manualTotal", parseFloat(v)); }}
                  >${total.toFixed(0)}{isManual && <span style={{ fontSize: 9, color: "#f59e0b", marginLeft: 2 }}>⚠️</span>}</div>
                  <button
                    style={{ background: "none", border: "none", color: "#ef4444", fontSize: 16, cursor: "pointer", padding: 0, textAlign: "center" }}
                    onClick={() => deleteCustomLabour(row.id)}
                  >✕</button>
                </div>
              </div>
            );
          })}

          {/* Add custom labour line */}
          <div style={{ padding: "8px 12px", borderBottom: "1px solid #1e293b" }}>
            <button
              style={{ background: "#0d2a1a", border: "1px dashed #34d399", borderRadius: 8, color: "#34d399", fontSize: 13, fontWeight: 700, padding: "8px 16px", cursor: "pointer", width: "100%" }}
              onClick={addCustomLabour}
            >＋ Add Labour Line</button>
          </div>

          <BPRow rowKey="boardingDrive" row={rows.boardingDrive} />
          <BPRow rowKey="tapingDrive" row={rows.tapingDrive} />
          <BPRow rowKey="management" row={rows.management} qtyEditable qtyPath="trips" />
          <BPRow rowKey="warranty" row={rows.warranty} qtyEditable qtyPath="qty" />
          <BPRow rowKey="scaffold" row={rows.scaffold} qtyEditable qtyPath="qty" />

          {/* SUB TOTAL */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 80px", padding: "10px 12px", background: "#1e293b", borderTop: "2px solid #334155", borderBottom: "1px solid #334155" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#f1f5f9", gridColumn: "1/4" }}>SUB TOTAL</div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#60a5fa", textAlign: "right" }}>${subTotal.toFixed(0)}</div>
          </div>

          {/* OH */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 80px", padding: "8px 12px", borderBottom: "1px solid #1e293b", alignItems: "center" }}>
            <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>Overhead</div>
            <div />
            <div
              style={{ fontSize: 12, color: "#64748b", textAlign: "right", cursor: "pointer" }}
              onClick={() => { const v = prompt("Edit OH %:", String(bp.overhead.pct)); if (v !== null && !isNaN(parseFloat(v))) updateBP("overhead.pct", parseFloat(v)); }}
            >
              {bp.overhead.pct}%<span style={{ fontSize: 9, color: "#475569", marginLeft: 2 }}>✏️</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#34d399", textAlign: "right" }}>${ohAmt.toFixed(0)}</div>
          </div>

          {/* Profit */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px 80px", padding: "8px 12px", borderBottom: "2px solid #334155", alignItems: "center" }}>
            <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>Profit</div>
            <div />
            <div
              style={{ fontSize: 12, color: "#64748b", textAlign: "right", cursor: "pointer" }}
              onClick={() => { const v = prompt("Edit Profit %:", String(bp.profit.pct)); if (v !== null && !isNaN(parseFloat(v))) updateBP("profit.pct", parseFloat(v)); }}
            >
              {bp.profit.pct}%<span style={{ fontSize: 9, color: "#475569", marginLeft: 2 }}>✏️</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#34d399", textAlign: "right" }}>${profitAmt.toFixed(0)}</div>
          </div>

          {/* Total Quote */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", padding: "14px 12px", background: "#0d1526" }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: "#f1f5f9" }}>TOTAL QUOTE</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#34d399", textAlign: "right" }}>${totalQuote.toFixed(0)}</div>
          </div>

          <div style={{ padding: "8px 12px 24px" }}>
            <div style={{ fontSize: 10, color: "#334155", textAlign: "center" }}>Tap any QTY, RATE, or TOTAL to edit · ⚠️ = manually overridden</div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "accessories") {
    const areaNames = currentJob?.areas.map((a) => a.name) || [];

    // Mud & tape auto-suggestion rates (single family only)
    const MUD_SUGGESTIONS = {
      "RPHBTP (DRYWALL TAPE 500')": 1200,
      "SYLLJT17 (SYNKO LITE JOINT MUD YELLOW)": 1800,
      "SYCLFN17 (SYNKO CLASSIS FINISH RED)": 550,
    };

    // Auto-populate suggested mud quantities for single family jobs
    const jobTotalSqFt = currentJob?.areas.reduce((s, a) => s + areaSqFt(a, selectedMaterials), 0) || 0;

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

    // For single family jobs with sqft, compute suggested qtys
    const getSuggestedQty = (product) => {
      if (currentJob?.type !== "single" || jobTotalSqFt === 0) return null;
      const rate = MUD_SUGGESTIONS[product];
      if (!rate) return null;
      return Math.ceil(jobTotalSqFt / rate);
    };

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
              <div
                style={{ ...styles.accCategoryHeader, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}
                onClick={() => toggleSection(category)}
              >
                <span>{category}</span>
                <span style={{ fontSize: 14, color: "#60a5fa" }}>{collapsedSections[category] ? "▸" : "▾"}</span>
              </div>
              {!collapsedSections[category] && products.map((product) => {
                const entry = accessories.find((a) => a.product === product) || { qty: 0, placement: "" };
                const isEditingThis = editingQtyProduct === product;
                const suggestedQty = getSuggestedQty(product);
                const isAutoSuggested = suggestedQty !== null && entry.qty === 0;
                return (
                  <div key={product} style={{ ...styles.accRow, borderLeft: isAutoSuggested ? "3px solid #f59e0b" : "3px solid transparent" }}>
                    <div style={styles.accProductName}>
                      {product}
                      {isAutoSuggested && (
                        <div style={{ fontSize: 10, color: "#f59e0b", marginTop: 2 }}>
                          ⚠️ Suggested: {suggestedQty} — tap to confirm
                        </div>
                      )}
                    </div>
                    <div style={styles.accControls}>
                      {/* Qty controls */}
                      <div style={styles.accQtyRow}>
                        <button
                          style={{ ...styles.accQtyBtn, minWidth: 52, borderColor: isAutoSuggested ? "#f59e0b44" : undefined }}
                          onPointerDown={() => { longPressTimer.current = setTimeout(() => updateAccessoryQty(product, -1), 500); }}
                          onPointerUp={() => { cancelLongPress(); updateAccessoryQty(product, isAutoSuggested ? suggestedQty : 1); }}
                          onPointerLeave={cancelLongPress}
                          onContextMenu={(e) => { e.preventDefault(); updateAccessoryQty(product, -1); }}
                        >
                          <span style={{ color: entry.qty > 0 ? "#60a5fa" : isAutoSuggested ? "#f59e0b" : "#475569", fontWeight: 900, fontSize: 18 }}>
                            {entry.qty > 0 ? entry.qty : isAutoSuggested ? suggestedQty : "·"}
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


  // ─── ADMIN PRICING SCREEN ──────────────────────────────────────────────────
  if (screen === "pricing") {
    if (!isPricingUnlocked) {
      return (
        <div style={{ ...styles.shell, maxWidth: 520, alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px", width: "100%", gap: 16 }}>
            <div style={{ fontSize: 28 }}>🔒</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>Admin Pricing</div>
            <div style={{ fontSize: 13, color: "#64748b", textAlign: "center" }}>Enter admin password to view and edit material prices</div>
            <input
              autoFocus
              type="password"
              placeholder="Admin password"
              value={adminPriceInput}
              onChange={e => { setAdminPriceInput(e.target.value); setAdminPriceError(false); }}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (adminPriceInput === "MBDW2025P") { setIsPricingUnlocked(true); setAdminPriceInput(""); }
                  else setAdminPriceError(true);
                }
              }}
              style={{ width: "100%", background: "#1e293b", border: adminPriceError ? "1px solid #ef4444" : "1px solid #334155", borderRadius: 8, color: "#e2e8f0", fontSize: 15, padding: "10px 12px", boxSizing: "border-box", outline: "none" }}
            />
            {adminPriceError && <div style={{ color: "#ef4444", fontSize: 12 }}>Incorrect password</div>}
            <button onClick={() => { if (adminPriceInput === "MBDW2025P") { setIsPricingUnlocked(true); setAdminPriceInput(""); } else setAdminPriceError(true); }}
              style={{ background: "#2563eb", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 28px", cursor: "pointer" }}>Unlock</button>
            <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#64748b", fontSize: 13, cursor: "pointer" }}>← Back</button>
          </div>
        </div>
      );
    }

    // Price entry helper
    const updatePrice = (code, length, val) => {
      const num = val === "" ? null : parseFloat(val);
      const newPrices = JSON.parse(JSON.stringify(sheetPrices));
      if (!newPrices[code]) newPrices[code] = {};
      newPrices[code][length] = (isNaN(num) || val === "") ? null : num;
      setSheetPrices(newPrices);
      saveSheetPrices(newPrices);
    };

    const resetPrices = () => {
      const fresh = JSON.parse(JSON.stringify(DEFAULT_SHEET_PRICES));
      setSheetPrices(fresh);
      saveSheetPrices(fresh);
    };

    const matLabels = {
      "12ST": "12ST — 1/2" Standard Lite",
      "58ULIX": "58ULIX — 5/8" Ultralight FC",
      "58FG": "58FG — 5/8" Fireguard (Type X)",
      "12TB": "12TB — 1/2" Tile Backer",
      "58TB": "58TB — 5/8" Tile Backer",
      "12CD": "12CD — 1/2" Ceiling Board",
      "14FL": "14FL — 1/4" Flexible",
      "1254": "1254 — 1/2" 54" Std Lite",
      "12DU": "12DU — 1/2" Durock",
      "58DU": "58DU — 5/8" Durock",
      "12MOLD": "12MOLD — 1/2" Aqua/Mold Tough",
      "58MOLD": "58MOLD — 5/8" Aqua/Mold Tough",
      "12SR": "12SR — 1/2" Securock",
      "58SR": "58SR — 5/8" Securock",
      "12FG": "12FG — 1/2" Fireguard (FC Type C)",
      "12AR": "12AR — 1/2" Abuse Resistant",
      "58AR": "58AR — 5/8" Abuse Resistant",
      "01GM": "01GM — Shaft Board (Glass Mat)",
    };

    return (
      <div style={styles.shell}>
        <div style={styles.header}>
          <button onClick={() => { setScreen("home"); setIsPricingUnlocked(false); }} style={styles.backBtn}>←</button>
          <div style={styles.headerTitle}>💲 Material Pricing</div>
          <button onClick={resetPrices} style={{ background: "none", border: "1px solid #ef4444", borderRadius: 6, color: "#ef4444", fontSize: 11, fontWeight: 700, padding: "4px 8px", cursor: "pointer" }}>RESET</button>
        </div>
        <div style={{ ...styles.body, padding: "0 0 40px 0" }}>
          <div style={{ padding: "10px 14px 4px", fontSize: 11, color: "#64748b" }}>
            Tap any price to edit. Null = not available for that length. Prices per sheet (Shoemaker effective Feb 20, 2026).
          </div>

          {/* Column header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 60px 60px 60px", gap: 2, padding: "6px 12px", background: "#0f172a", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 10 }}>
            <div style={{ fontSize: 10, color: "#475569", fontWeight: 700 }}>MATERIAL</div>
            {LENGTHS.map(l => <div key={l} style={{ fontSize: 10, color: "#475569", fontWeight: 700, textAlign: "center" }}>{l}</div>)}
          </div>

          {Object.keys(matLabels).map(code => (
            <div key={code} style={{ borderBottom: "1px solid #1e293b" }}>
              <div style={{ padding: "6px 12px 2px", fontSize: 11, color: "#94a3b8", fontWeight: 700, background: "#0d1a2a" }}>{matLabels[code]}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 60px 60px 60px", gap: 2, padding: "4px 12px 8px" }}>
                <div style={{ fontSize: 10, color: "#475569" }}>Shoemaker item</div>
                {LENGTHS.map(len => {
                  const price = sheetPrices?.[code]?.[len];
                  const isNull = price === null || price === undefined;
                  return (
                    <div key={len}
                      style={{ background: isNull ? "#0f172a" : "#1e293b", borderRadius: 4, padding: "4px 2px", textAlign: "center", cursor: isNull ? "default" : "pointer", fontSize: 12, color: isNull ? "#1e293b" : "#34d399", fontWeight: 600, border: isNull ? "1px solid #1a1a2e" : "1px solid #334155" }}
                      onClick={() => {
                        if (isNull) return;
                        const v = prompt(`${code} ${len} price per sheet:`, String(price));
                        if (v !== null && v.trim() !== "") {
                          const n = parseFloat(v);
                          if (!isNaN(n)) updatePrice(code, len, v);
                        }
                      }}
                    >
                      {isNull ? "—" : `$${price.toFixed(2)}`}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ padding: 16, margin: 12, background: "#0d1a2a", borderRadius: 8, border: "1px solid #1e293b" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", marginBottom: 6 }}>📋 Future Price Updates</div>
            <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}>
              To update prices from a new Shoemaker price list:<br/>
              1. Open Admin Pricing (password: MBDW2025P)<br/>
              2. Tap each cell to enter the new per-sheet Variant Price<br/>
              3. Changes save automatically to this device<br/>
              4. Use RESET to restore Shoemaker Feb 2026 defaults
            </div>
          </div>
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
    boxSizing: "border-box",
    border: "1px solid #333",
    borderRadius: 8,
    padding: "10px 8px",
    marginBottom: 6,
    cursor: "pointer",
    textAlign: "left",
    overflow: "hidden",
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
    overflow: "hidden",
  },
  modal: {
    background: "#0d1526",
    border: "1px solid #1e293b",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: "100vw",
    boxSizing: "border-box",
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
    fontSize: 15,
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
