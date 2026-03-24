import { useState } from "react";
import { Plus, ArrowLeft, Upload } from "lucide-react";
import {
  AccusedDetailsSection,
  AccusedData,
  defaultAccusedData,
} from "./AccusedDetailsSection";

const zones = ["Chennai Zone", "Madurai Zone"];
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
  { label: "Jaggery", unit: "Bottles" },
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

export function DSRPEWEntryForm({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [accusedData, setAccusedData] =
    useState<AccusedData>(defaultAccusedData);

  // Case details
  const [caseId] = useState("DSR-MMM3LAG5-ZA0H");
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
          <p className="text-xs text-muted-foreground">PEW Case</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Section</label>
                <input
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Offence</label>
                <input
                  value={offence}
                  onChange={(e) => setOffence(e.target.value)}
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

          {/* Vehicle Seizure */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Vehicle Seizure Details
            </p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { l: "2W", v: vehicle2w, s: setVehicle2w },
                { l: "3W", v: vehicle3w, s: setVehicle3w },
                { l: "4W", v: vehicle4w, s: setVehicle4w },
                { l: "6W", v: vehicle6w, s: setVehicle6w },
              ].map((x) => (
                <div key={x.l}>
                  <label className={labelCls}>{x.l}</label>
                  <input
                    value={x.v}
                    onChange={(e) => x.s(e.target.value)}
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <label className={labelCls}>Additional Notes</label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
              className={inputCls + " resize-none"}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          {/* <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <label className={labelCls}>Seizure photos</label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
              className={inputCls + " resize-none"}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div> */}
          {/* <div>
            <label className={labelCls}>Photograph of Accused</label>
            <div
              className="w-full rounded-lg border-2 border-dashed p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors"
              style={{ borderColor: "hsl(var(--border))" }}
              onClick={() =>
                document.getElementById("accused-photo-upload")?.click()
              }
            >
              {data.photograph ? (
                <img
                  src={data.photograph}
                  alt="Accused"
                  className="mx-auto h-28 w-28 rounded-lg object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload photograph
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG (max 5MB)
                  </p>
                </div>
              )}
            </div>
            <input
              id="accused-photo-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size <= 5 * 1024 * 1024) {
                  const reader = new FileReader();
                  reader.onload = (ev) =>
                    set("photograph", ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div> */}
          <div>
            <label className={labelCls}>Photograph of Seizure</label>

            <div
              className="w-full rounded-lg border-2 border-dashed p-6 text-center cursor-pointer hover:bg-muted/30 transition-colors"
              style={{ borderColor: "hsl(var(--border))" }}
              onClick={() =>
                document.getElementById("accused-photo-upload")?.click()
              }
            >
              {accusedData.photograph ? (
                <img
                  src={accusedData.photograph}
                  alt="Accused"
                  className="mx-auto h-28 w-28 rounded-lg object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload photograph
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG (max 5MB)
                  </p>
                </div>
              )}
            </div>

            <input
              id="accused-photo-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file && file.size <= 5 * 1024 * 1024) {
                  const reader = new FileReader();

                  reader.onload = (ev) => {
                    setAccusedData((prev) => ({
                      ...prev,
                      photograph: ev.target?.result as string,
                    }));
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
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
            {/* <div>
              <label className={labelCls}>Transport Mode</label>
              <input
                value={transportMode}
                onChange={(e) => setTransportMode(e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div> */}
            <div>
              <label className={labelCls}>Search/Seizure Details</label>
              <textarea
                value={searchDetails}
                onChange={(e) => setSearchDetails(e.target.value)}
                rows={3}
                className={inputCls + " resize-none"}
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
              onClick={() => setActiveStep(3)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Next: Court Hearing →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Court Hearing ── */}
      {activeStep === 3 && (
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-foreground">
            Court Hearing Details
          </h3>
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Court Information
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Court Name</label>
                <input
                  value={courtName}
                  onChange={(e) => setCourtName(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Court Location</label>
                <input
                  value={courtLocation}
                  onChange={(e) => setCourtLocation(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
          </div>
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Court Police Details
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Police Officer Name</label>
                <input
                  value={policeOfficerName}
                  onChange={(e) => setPoliceOfficerName(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Police ID</label>
                <input
                  value={policeId}
                  onChange={(e) => setPoliceId(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
          </div>
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Hearing Details
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Hearing Date & Time</label>
                <input
                  type="datetime-local"
                  value={hearingDate}
                  onChange={(e) => setHearingDate(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Judge Name</label>
                <input
                  value={judgeName}
                  onChange={(e) => setJudgeName(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Courtroom Number</label>
                <input
                  value={courtRoomNo}
                  onChange={(e) => setCourtRoomNo(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCourtDecision("remand")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${courtDecision === "remand" ? "text-primary-foreground" : "border hover:bg-muted"}`}
              style={
                courtDecision === "remand"
                  ? { background: "hsl(var(--primary))" }
                  : { borderColor: "hsl(var(--border))" }
              }
            >
              Court Decision: Remand (Jail)
            </button>
            <button
              onClick={() => setCourtDecision("bail")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${courtDecision === "bail" ? "text-primary-foreground" : "border hover:bg-muted"}`}
              style={
                courtDecision === "bail"
                  ? { background: "hsl(var(--destructive))" }
                  : { borderColor: "hsl(var(--border))" }
              }
            >
              Court Decision: Bail
            </button>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:bg-muted"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              ← Back
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Next: Jail Details →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Remand (Jail) Details ── */}
      {activeStep === 4 && (
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-foreground">
            Remand (Jail) Details
          </h3>
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Remand Days Count</label>
                <input
                  value={remandDays}
                  onChange={(e) => setRemandDays(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Jail Name</label>
                <input
                  value={jailName}
                  onChange={(e) => setJailName(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Entry Date</label>
                <input
                  type="date"
                  value={entryDate}
                  onChange={(e) => setEntryDate(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Release Date</label>
                <input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
          </div>
          {/* <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          > */}
          {/* <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Jail / Updated
            </p> */}
          {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Jail Officer Name</label>
                <input
                  value={jailOfficerName}
                  onChange={(e) => setJailOfficerName(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Jail Officer Contact</label>
                <input
                  value={jailOfficerContact}
                  onChange={(e) => setJailOfficerContact(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div> */}
          {/* <div>
              <label className={labelCls}>Daily / Weekly Status</label>
              <textarea
                value={dailyStatus}
                onChange={(e) => setDailyStatus(e.target.value)}
                rows={3}
                className={inputCls + " resize-none"}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div> */}
          {/* </div> */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                Co-Accused Details
              </p>
              <button
                onClick={addCoAccused}
                className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            {coAccused.length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                No co-accused added yet.
              </p>
            )}
            {coAccused.map((ca, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-3 border-t pt-3"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <input
                  placeholder="Name"
                  value={ca.name}
                  onChange={(e) => {
                    const n = [...coAccused];
                    n[i].name = e.target.value;
                    setCoAccused(n);
                  }}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
                <input
                  placeholder="Age"
                  value={ca.age}
                  onChange={(e) => {
                    const n = [...coAccused];
                    n[i].age = e.target.value;
                    setCoAccused(n);
                  }}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
                <input
                  placeholder="Address"
                  value={ca.address}
                  onChange={(e) => {
                    const n = [...coAccused];
                    n[i].address = e.target.value;
                    setCoAccused(n);
                  }}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(3)}
              className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:bg-muted"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              ← Back
            </button>
            <button
              onClick={() => setActiveStep(5)}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Save & Proceed to Monitoring
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 5: Monitoring / Bail Details ── */}
      {activeStep === 5 && (
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-foreground">Bail Details</h3>
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Bail Date & Time</label>
                <input
                  type="datetime-local"
                  value={bailDate}
                  onChange={(e) => setBailDate(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Address</label>
                <input
                  value={bailLocation}
                  onChange={(e) => setBailLocation(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
          </div>
          {/* <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Personal & Advocate Details
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Surety Name</label>
                <input
                  value={suretyName}
                  onChange={(e) => setSuretyName(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Surety Amount</label>
                <input
                  value={suretyAmount}
                  onChange={(e) => setSuretyAmount(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Bond Type</label>
                <input
                  value={bondType}
                  onChange={(e) => setBondType(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Bond Amount</label>
                <input
                  value={bondAmount}
                  onChange={(e) => setBondAmount(e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Advocate Name</label>
              <input
                value={advocateName}
                onChange={(e) => setAdvocateName(e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div>
              <label className={labelCls}>Bail Conditions</label>
              <textarea
                value={bailConditions}
                onChange={(e) => setBailConditions(e.target.value)}
                rows={3}
                className={inputCls + " resize-none"}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
          </div> */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
              Monitoring Dashboard
            </p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Case ID", value: caseId },
                { label: "Court Decision", value: courtDecision || "—" },
                { label: "Bail Status", value: "ACTIVE" },
                { label: "Remarks", value: "0 recorded" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-lg border p-3"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm font-bold text-foreground mt-1">
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(4)}
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
              Save & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
