import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

const tnDistricts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul",
  "Thanjavur", "Ranipet", "Sivaganga", "Karur", "Namakkal",
  "Kancheepuram", "Tiruvannamalai",
];

const units = [
  "Unit A", "Unit B", "Unit C", "Unit D", "Unit E",
  "Flying Squad", "Special Team", "Joint Team",
];

const operationTypes = [
  "Anti-Liquor Drive", "Anti-NDPS Drive", "Checkpost Intensified",
  "Night Patrol", "Border Surveillance", "Market Inspection",
  "Joint Operation", "Special Operation",
];

type PersonnelRow = {
  id: number;
  rank: string;
  name: string;
  badge: string;
};

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls =
  "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function BandobustEntryForm({ onClose }: { onClose: () => void }) {
  const today = new Date().toISOString().split("T")[0];

  const [opName, setOpName] = useState("");
  const [opType, setOpType] = useState("");
  const [opDate, setOpDate] = useState(today);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("18:00");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [unit, setUnit] = useState("");
  const [commandingOfficer, setCommandingOfficer] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [objective, setObjective] = useState("");
  const [result, setResult] = useState("");
  const [arrests, setArrests] = useState("0");
  const [seizures, setSeizures] = useState("");
  const [remarks, setRemarks] = useState("");

  const [personnel, setPersonnel] = useState<PersonnelRow[]>([
    { id: 1, rank: "", name: "", badge: "" },
  ]);

  const addPersonnel = () =>
    setPersonnel((prev) => [
      ...prev,
      { id: prev.length + 1, rank: "", name: "", badge: "" },
    ]);

  const removePersonnel = (id: number) =>
    setPersonnel((prev) => prev.filter((p) => p.id !== id));

  const updatePersonnel = (
    id: number,
    field: keyof Omit<PersonnelRow, "id">,
    val: string
  ) =>
    setPersonnel((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );

  const handleSubmit = () => {
    console.log("Bandobust Entry submitted");
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
            Add Bandobust Entry
          </h2>
          <p className="text-xs text-muted-foreground">
            Log a new bandobust operation record
          </p>
        </div>
      </div>

      {/* ── OPERATION DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Operation Details</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Operation Name *</label>
            <input
              value={opName}
              onChange={(e) => setOpName(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. Op Thunderbolt"
            />
          </div>
          <div>
            <label className={labelCls}>Operation Type</label>
            <select
              value={opType}
              onChange={(e) => setOpType(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select type</option>
              {operationTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Date *</label>
            <input
              type="date"
              value={opDate}
              onChange={(e) => setOpDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div>
              <label className={labelCls}>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
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
            <label className={labelCls}>Area / Location</label>
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Specific area or road"
            />
          </div>
          <div>
            <label className={labelCls}>Unit *</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select Unit</option>
              {units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Commanding Officer</label>
            <input
              value={commandingOfficer}
              onChange={(e) => setCommandingOfficer(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Officer name & rank"
            />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>
              <option>Planned</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Arrests Made</label>
            <input
              type="number"
              min="0"
              value={arrests}
              onChange={(e) => setArrests(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Objective</label>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Operation objective..."
            />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Seizures / Outcome</label>
            <textarea
              value={seizures}
              onChange={(e) => setSeizures(e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Items seized, quantity, etc."
            />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Result / Summary</label>
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Overall result summary..."
            />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Additional remarks..."
            />
          </div>
        </div>
      </div>

      {/* ── PERSONNEL DEPLOYED ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center justify-between">
          <p className={sectionTitleCls}>Personnel Deployed</p>
          <button
            type="button"
            onClick={addPersonnel}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border hover:bg-muted transition-colors"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Person
          </button>
        </div>
        <div className="space-y-3">
          {personnel.map((p) => (
            <div key={p.id} className="grid grid-cols-4 gap-3 items-end">
              <div>
                <label className={labelCls}>Rank</label>
                <input
                  value={p.rank}
                  onChange={(e) => updatePersonnel(p.id, "rank", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                  placeholder="SI / HC / PC"
                />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Name</label>
                <input
                  value={p.name}
                  onChange={(e) => updatePersonnel(p.id, "name", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className={labelCls}>Badge No.</label>
                <div className="flex items-center gap-2">
                  <input
                    value={p.badge}
                    onChange={(e) =>
                      updatePersonnel(p.id, "badge", e.target.value)
                    }
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                    placeholder="Badge"
                  />
                  {personnel.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePersonnel(p.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors flex-shrink-0"
                      style={{ color: "hsl(var(--destructive))" }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
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
          Save Operation
        </button>
      </div>
    </div>
  );
}
