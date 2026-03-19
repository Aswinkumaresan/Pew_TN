import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { OffencesSelector } from "./OffencesSelector";

const tnDistricts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul",
  "Thanjavur", "Ranipet", "Sivaganga", "Karur", "Namakkal",
  "Kancheepuram", "Tiruvannamalai",
];

const statusOptions = ["Active", "Detained", "Released", "Absconding", "Under Surveillance"];
const riskOptions = ["low", "medium", "high"];

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls =
  "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function AccusedProfileEntryForm({ onClose }: { onClose: () => void }) {
  // Personal Details
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [district, setDistrict] = useState("");
  const [status, setStatus] = useState("Active");
  const [risk, setRisk] = useState("medium");
  const [offences, setOffences] = useState<string[]>([]);

  // Dynamic Lists
  const [sellingPoints, setSellingPoints] = useState<string[]>([""]);
  
  const [associates, setAssociates] = useState<{ id: number; name: string; role: string; risk: string }[]>([
    { id: 1, name: "", role: "", risk: "low" },
  ]);

  const [cases, setCases] = useState<{ id: number; caseId: string; date: string; type: string; outcome: string }[]>([
    { id: 1, caseId: "", date: "", type: "", outcome: "" },
  ]);

  const addSellingPoint = () => setSellingPoints((prev) => [...prev, ""]);
  const removeSellingPoint = (index: number) => setSellingPoints((prev) => prev.filter((_, i) => i !== index));
  const updateSellingPoint = (index: number, val: string) =>
    setSellingPoints((prev) => prev.map((sp, i) => (i === index ? val : sp)));

  const addAssociate = () =>
    setAssociates((prev) => [
      ...prev,
      { id: prev.length ? Math.max(...prev.map(a => a.id)) + 1 : 1, name: "", role: "", risk: "low" },
    ]);
  const removeAssociate = (id: number) =>
    setAssociates((prev) => prev.filter((a) => a.id !== id));
  const updateAssociate = (id: number, field: string, val: string) =>
    setAssociates((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: val } : a))
    );

  const addCase = () =>
    setCases((prev) => [
      ...prev,
      { id: prev.length ? Math.max(...prev.map(c => c.id)) + 1 : 1, caseId: "", date: "", type: "", outcome: "" },
    ]);
  const removeCase = (id: number) =>
    setCases((prev) => prev.filter((c) => c.id !== id));
  const updateCase = (id: number, field: string, val: string) =>
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );

  const handleSubmit = () => {
    console.log("Accused Profile submitted");
    onClose();
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
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
            Add Accused Profile
          </h2>
          <p className="text-xs text-muted-foreground">
            Register a new accused individual profile
          </p>
        </div>
      </div>

      {/* ── PERSONAL DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Personal Details</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Full Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. Durai Singam"
            />
          </div>
          <div>
            <label className={labelCls}>Age *</label>
            <input
              type="number"
              min="0"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Age"
            />
          </div>
          <div>
            <label className={labelCls}>District *</label>
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
            <label className={labelCls}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Risk Level</label>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              {riskOptions.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── SELLING POINTS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center justify-between">
          <p className={sectionTitleCls}>Selling Points</p>
          <button
            type="button"
            onClick={addSellingPoint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border hover:bg-muted transition-colors"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Location
          </button>
        </div>
        <div className="space-y-3">
          {sellingPoints.map((sp, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                value={sp}
                onChange={(e) => updateSellingPoint(idx, e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
                placeholder="e.g. Koyambedu Market"
              />
              {sellingPoints.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSellingPoint(idx)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors shrink-0"
                  style={{ color: "hsl(var(--destructive))" }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── OFFENCES ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Offences Involved</p>
        <OffencesSelector selected={offences} onChange={setOffences} />
      </div>

      {/* ── KNOWN ASSOCIATES ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center justify-between">
          <p className={sectionTitleCls}>Known Associates</p>
          <button
            type="button"
            onClick={addAssociate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border hover:bg-muted transition-colors"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Associate
          </button>
        </div>
        <div className="space-y-3">
          {associates.map((a) => (
            <div key={a.id} className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 items-center">
              <input
                value={a.name}
                onChange={(e) => updateAssociate(a.id, "name", e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
                placeholder="Name"
              />
              <input
                value={a.role}
                onChange={(e) => updateAssociate(a.id, "role", e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
                placeholder="Role (e.g. Supplier)"
              />
              <select
                value={a.risk}
                onChange={(e) => updateAssociate(a.id, "risk", e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              >
                {riskOptions.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>
              <div className="flex items-center w-[36px]">
                {associates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAssociate(a.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    style={{ color: "hsl(var(--destructive))" }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CASE HISTORY ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center justify-between">
          <p className={sectionTitleCls}>Case History</p>
          <button
            type="button"
            onClick={addCase}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border hover:bg-muted transition-colors"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Case
          </button>
        </div>
        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className="grid grid-cols-[1fr_auto_1fr_1fr_auto] gap-3 items-center">
              <input
                value={c.caseId}
                onChange={(e) => updateCase(c.id, "caseId", e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
                placeholder="Case ID (e.g. CS-2024-1831)"
              />
              <input
                type="date"
                value={c.date}
                onChange={(e) => updateCase(c.id, "date", e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
              <input
                value={c.type}
                onChange={(e) => updateCase(c.id, "type", e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
                placeholder="Type (e.g. NDPS)"
              />
              <input
                value={c.outcome}
                onChange={(e) => updateCase(c.id, "outcome", e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
                placeholder="Outcome"
              />
              <div className="flex items-center w-[36px]">
                {cases.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCase(c.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                    style={{ color: "hsl(var(--destructive))" }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
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
          Save Profile
        </button>
      </div>
    </div>
  );
}
