import { useState } from "react";
import { Plus, ArrowLeft, Upload } from "lucide-react";
import {
  AccusedDetailsSection,
  AccusedData,
  defaultAccusedData,
} from "./AccusedDetailsSection";

const tnDistricts = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Vellore",
  "Thoothukudi",
  "Dindigul",
  "Thanjavur",
  "Ranipet",
];

const seizureCategories = [
  { label: "Rectified Spirit", unit: "Litres" },
  { label: "Methyl Alcohol", unit: "Litres" },
  { label: "Pondy Arrack", unit: "Litres" },
  { label: "Pondy IMFL", unit: "Bottles" },
  { label: "KA IMFL", unit: "Bottles" },
  { label: "AP ID Arrack", unit: "Litres" },
  { label: "TN IMFL", unit: "Bottles" },
  { label: "F.Wash", unit: "Litres" },
  { label: "ID Arrack", unit: "Litres" },
  { label: "Spurious Liquor", unit: "Bottles" },
  { label: "Foreign Liquor", unit: "Bottles" },
  { label: "Military Liquor", unit: "Bottles" },
  { label: "Other IMFL", unit: "Bottles" },
  { label: "Toddy", unit: "Bottles" },
];

type CoAccused = { name: string; age: string; address: string };

const steps = [
  "Accused Details",
  "Seizure Details",
  "Arrest Details",
  "Court Hearing",
  "Jail",
  "Monitoring",
];

export function DSRLocalEntryForm({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [accusedData, setAccusedData] =
    useState<AccusedData>(defaultAccusedData);

  // Case details
  const [caseId] = useState("DSR-LOC-" + Math.random().toString(36).substring(2, 10).toUpperCase());
  const [stationName, setStationName] = useState("");
  const [dateOfSeizure, setDateOfSeizure] = useState("");
  const [crimeNo, setCrimeNo] = useState("");
  const [section, setSection] = useState("");
  const [offence, setOffence] = useState("");

  // Seizure table
  const [seizureRows, setSeizureRows] = useState<
    Record<string, { cases: string; quantity: string; accused: string }>
  >(
    Object.fromEntries(
      seizureCategories.map((c) => [
        c.label,
        { cases: "", quantity: "", accused: "" },
      ]),
    ),
  );
  const [vehicle2w, setVehicle2w] = useState("");
  const [vehicle3w, setVehicle3w] = useState("");
  const [vehicle4w, setVehicle4w] = useState("");
  const [vehicle6w, setVehicle6w] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Arrest details
  const [arrestDate, setArrestDate] = useState("");
  const [arrestTime, setArrestTime] = useState("");
  const [arrestedOfficer, setArrestedOfficer] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [searchDetails, setSearchDetails] = useState("");

  // Court Hearing
  const [courtName, setCourtName] = useState("");
  const [courtLocation, setCourtLocation] = useState("");
  const [policeOfficerName, setPoliceOfficerName] = useState("");
  const [policeId, setPoliceId] = useState("");
  const [hearingDate, setHearingDate] = useState("");
  const [judgeName, setJudgeName] = useState("");
  const [courtRoomNo, setCourtRoomNo] = useState("");
  const [courtDecision, setCourtDecision] = useState("");

  // Jail / Remand
  const [remandDays, setRemandDays] = useState("14");
  const [jailName, setJailName] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [jailOfficerName, setJailOfficerName] = useState("");
  const [jailOfficerContact, setJailOfficerContact] = useState("");
  const [dailyStatus, setDailyStatus] = useState("");

  // Co-accused
  const [coAccused, setCoAccused] = useState<CoAccused[]>([]);

  // Bail
  const [bailDate, setBailDate] = useState("");
  const [bailLocation, setBailLocation] = useState("");
  const [suretyName, setSuretyName] = useState("");
  const [suretyAmount, setSuretyAmount] = useState("");
  const [bondType, setBondType] = useState("");
  const [bondAmount, setBondAmount] = useState("");
  const [advocateName, setAdvocateName] = useState("");
  const [bailConditions, setBailConditions] = useState("");

  const updateSeizureRow = (label: string, field: string, value: string) => {
    setSeizureRows((prev) => ({
      ...prev,
      [label]: { ...prev[label], [field]: value },
    }));
  };

  const addCoAccused = () =>
    setCoAccused((prev) => [...prev, { name: "", age: "", address: "" }]);

  const inputCls =
    "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
  const labelCls =
    "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
  const sectionCls = "rounded-lg border p-5 space-y-4";

  const handleSave = () => {
    onClose();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div>
          <p className="text-base font-bold text-foreground">{caseId}</p>
          <p className="text-xs text-muted-foreground">Local Case Entry</p>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {steps.map((step, i) => (
          <button
            key={step}
            onClick={() => setActiveStep(i)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              i === activeStep
                ? "text-primary-foreground"
                : i < activeStep
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            }`}
            style={
              i === activeStep
                ? { background: "hsl(var(--primary))" }
                : undefined
            }
          >
            {step}
          </button>
        ))}
      </div>

      {/* ── STEP 0: Accused Details ── */}
      {activeStep === 0 && (
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-foreground">Accused Details</h3>
          <AccusedDetailsSection
            data={accusedData}
            onChange={setAccusedData}
            onKnownProceed={() => setActiveStep(1)}
          />
          {accusedData.type === "unknown" && (
            <div className="flex justify-end">
              <button
                onClick={() => setActiveStep(1)}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                Save & Proceed to Seizure →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── STEP 1: Seizure Details ── */}
      {activeStep === 1 && (
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-foreground">Seizure Details</h3>

          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <label className={labelCls}>Station/Unit</label>
            <input
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              placeholder="Enter station name"
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>

          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Date of Seizure</label>
                <input
                  type="date"
                  value={dateOfSeizure}
                  onChange={(e) => setDateOfSeizure(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Crime No.</label>
                <input
                  value={crimeNo}
                  onChange={(e) => setCrimeNo(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
          </div>

          {/* Seized Material Table */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Seized Material - Qty / Value
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <th
                    className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground"
                    style={{ width: "45%" }}
                  >
                    Category
                  </th>
                  <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground">
                    Cases
                  </th>
                  <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground">
                    Quantity
                  </th>
                  <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground">
                    Accused
                  </th>
                </tr>
              </thead>
              <tbody>
                {seizureCategories.map((cat, i) => (
                  <tr
                    key={cat.label}
                    className={i % 2 === 0 ? "bg-muted/20" : ""}
                  >
                    <td className="py-1.5 px-2 text-sm font-medium">
                      {cat.label}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({cat.unit})
                      </span>
                    </td>
                    <td className="py-1 px-1">
                      <input
                        value={seizureRows[cat.label].cases}
                        onChange={(e) =>
                          updateSeizureRow(cat.label, "cases", e.target.value)
                        }
                        className="w-full rounded border px-2 py-1.5 text-xs text-center bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        style={{ borderColor: "hsl(var(--border))" }}
                      />
                    </td>
                    <td className="py-1 px-1">
                      <input
                        value={seizureRows[cat.label].quantity}
                        onChange={(e) =>
                          updateSeizureRow(
                            cat.label,
                            "quantity",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border px-2 py-1.5 text-xs text-center bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        style={{ borderColor: "hsl(var(--border))" }}
                      />
                    </td>
                    <td className="py-1 px-1">
                      <input
                        value={seizureRows[cat.label].accused}
                        onChange={(e) =>
                          updateSeizureRow(cat.label, "accused", e.target.value)
                        }
                        className="w-full rounded border px-2 py-1.5 text-xs text-center bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        style={{ borderColor: "hsl(var(--border))" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(0)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:bg-muted"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              ← Back
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Next: Arrest Details →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Arrest Details ── */}
      {activeStep === 2 && (
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-foreground">Arrest Details</h3>
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Arrest Date</label>
                <input
                  type="date"
                  value={arrestDate}
                  onChange={(e) => setArrestDate(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Arrest Time</label>
                <input
                  type="time"
                  value={arrestTime}
                  onChange={(e) => setArrestTime(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Investigating Officer</label>
              <input
                value={arrestedOfficer}
                onChange={(e) => setArrestedOfficer(e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(1)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:bg-muted"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              ← Back
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Save Local Case Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
