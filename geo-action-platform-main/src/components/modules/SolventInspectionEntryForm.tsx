import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

const tnDistricts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul",
  "Thanjavur", "Ranipet", "Sivaganga", "Karur", "Namakkal",
  "Kancheepuram", "Tiruvannamalai",
];

const solventTypes = [
  "Solvent (General)", "Methanol", "Ethyl Alcohol", "Isopropyl Alcohol",
  "Acetone", "Toluene", "Benzene", "Xylene", "Chloroform", "Other",
];

const inspectionResults = ["Compliant", "Violation", "Minor Violation", "Notice Issued", "Pending"];

type ViolationType = {
  id: number;
  description: string;
  section: string;
};

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls =
  "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function SolventInspectionEntryForm({ onClose }: { onClose: () => void }) {
  const today = new Date().toISOString().split("T")[0];

  // Licensee info
  const [licenseeName, setLicenseeName] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Inspection details
  const [inspectionDate, setInspectionDate] = useState(today);
  const [inspectorName, setInspectorName] = useState("");
  const [inspectorRank, setInspectorRank] = useState("");
  const [inspectionType, setInspectionType] = useState("Routine");
  const [stockOnRecord, setStockOnRecord] = useState("");
  const [stockActual, setStockActual] = useState("");
  const [unit, setUnit] = useState("Litres");
  const [result, setResult] = useState("Compliant");
  const [showCauseIssued, setShowCauseIssued] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  // Violations
  const [violations, setViolations] = useState<ViolationType[]>([]);

  const addViolation = () =>
    setViolations((prev) => [
      ...prev,
      { id: prev.length + 1, description: "", section: "" },
    ]);

  const removeViolation = (id: number) =>
    setViolations((prev) => prev.filter((v) => v.id !== id));

  const updateViolation = (
    id: number,
    field: keyof Omit<ViolationType, "id">,
    val: string
  ) =>
    setViolations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );

  const handleSubmit = () => {
    console.log("Solvent Inspection Entry submitted");
    onClose();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="flex items-center gap-3 pb-2 border-b"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div>
          <h2 className="text-base font-bold text-foreground">
            Add Solvent Inspection Entry
          </h2>
          <p className="text-xs text-muted-foreground">
            Record a solvent / methanol license inspection
          </p>
        </div>
      </div>

      {/* ── LICENSEE DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Licensee Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className={labelCls}>Licensee / Company Name *</label>
            <input
              value={licenseeName}
              onChange={(e) => setLicenseeName(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Name of company / individual"
            />
          </div>
          <div>
            <label className={labelCls}>License No. *</label>
            <input
              value={licenseNo}
              onChange={(e) => setLicenseNo(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. SOL-2025-001"
            />
          </div>
          <div>
            <label className={labelCls}>License Type</label>
            <select
              value={licenseType}
              onChange={(e) => setLicenseType(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select type</option>
              {solventTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select District</option>
              {tnDistricts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Contact Person</label>
            <input
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Contact person name"
            />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Full business address"
            />
          </div>
          <div>
            <label className={labelCls}>Contact Phone</label>
            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Phone number"
            />
          </div>
        </div>
      </div>

      {/* ── INSPECTION DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Inspection Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Inspection Date *</label>
            <input
              type="date"
              value={inspectionDate}
              onChange={(e) => setInspectionDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Inspector Name *</label>
            <input
              value={inspectorName}
              onChange={(e) => setInspectorName(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Inspector's full name"
            />
          </div>
          <div>
            <label className={labelCls}>Inspector Rank</label>
            <input
              value={inspectorRank}
              onChange={(e) => setInspectorRank(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. SI, CI, DSP"
            />
          </div>
          <div>
            <label className={labelCls}>Inspection Type</label>
            <select
              value={inspectionType}
              onChange={(e) => setInspectionType(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>Routine</option>
              <option>Surprise</option>
              <option>Follow-up</option>
              <option>Complaint-based</option>
              <option>Annual Audit</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Inspection Result *</label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              {inspectionResults.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Follow-up Date</label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
        </div>
      </div>

      {/* ── STOCK VERIFICATION ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Stock Verification</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Stock as per Records</label>
            <input
              type="number"
              min="0"
              value={stockOnRecord}
              onChange={(e) => setStockOnRecord(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="0"
            />
          </div>
          <div>
            <label className={labelCls}>Actual Stock Found</label>
            <input
              type="number"
              min="0"
              value={stockActual}
              onChange={(e) => setStockActual(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="0"
            />
          </div>
          <div>
            <label className={labelCls}>Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>Litres</option>
              <option>Kilograms</option>
              <option>Drums</option>
              <option>Barrels</option>
            </select>
          </div>
          {stockOnRecord && stockActual && (
            <div className="col-span-3 rounded-lg p-3 bg-muted/30">
              <p className="text-xs text-muted-foreground">
                Discrepancy:{" "}
                <span
                  className="font-bold"
                  style={{
                    color:
                      parseFloat(stockActual) > parseFloat(stockOnRecord)
                        ? "hsl(var(--destructive))"
                        : "hsl(var(--primary))",
                  }}
                >
                  {(
                    parseFloat(stockActual) - parseFloat(stockOnRecord)
                  ).toFixed(2)}{" "}
                  {unit}
                  {parseFloat(stockActual) > parseFloat(stockOnRecord)
                    ? " (Excess)"
                    : " (Deficit)"}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── VIOLATIONS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center justify-between">
          <p className={sectionTitleCls}>Violations Found</p>
          <button
            type="button"
            onClick={addViolation}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border hover:bg-muted transition-colors"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Violation
          </button>
        </div>
        {violations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No violations added
          </p>
        ) : (
          <div className="space-y-3">
            {violations.map((v) => (
              <div key={v.id} className="grid grid-cols-5 gap-3 items-end">
                <div className="col-span-3">
                  <label className={labelCls}>Violation Description</label>
                  <input
                    value={v.description}
                    onChange={(e) =>
                      updateViolation(v.id, "description", e.target.value)
                    }
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                    placeholder="Describe the violation"
                  />
                </div>
                <div className="col-span-1">
                  <label className={labelCls}>Section / Act</label>
                  <input
                    value={v.section}
                    onChange={(e) =>
                      updateViolation(v.id, "section", e.target.value)
                    }
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                    placeholder="Section"
                  />
                </div>
                <div className="flex items-end pb-[3px]">
                  <button
                    type="button"
                    onClick={() => removeViolation(v.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    style={{ color: "hsl(var(--destructive))" }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="showCause"
            checked={showCauseIssued}
            onChange={(e) => setShowCauseIssued(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          <label
            htmlFor="showCause"
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Show Cause Notice Issued
          </label>
        </div>
      </div>

      {/* ── REMARKS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Remarks</p>
        <div>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={4}
            className={`${inputCls} resize-none`}
            style={{ borderColor: "hsl(var(--border))" }}
            placeholder="Overall inspection remarks and findings..."
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:bg-muted transition-colors"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          Save Inspection Record
        </button>
      </div>
    </div>
  );
}
