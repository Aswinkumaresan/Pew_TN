import { useState, useRef } from "react";
import { ArrowLeft, Upload, Plus, Trash2, Camera } from "lucide-react";
import { AccusedDetailsSection, AccusedData, defaultAccusedData } from "./AccusedDetailsSection";

const tnDistricts = [
  "Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli",
  "Erode","Vellore","Thoothukudi","Dindigul","Thanjavur","Ranipet",
  "Sivaganga","Karur","Namakkal","Kancheepuram","Tiruvannamalai",
];

const checkpostList = [
  "Uttukottai", "Madhavaram", "Poonamallee", "Vandalur", "Tambaram",
  "Sriperumbudur", "Tiruvallur", "Kancheepuram", "Vellore", "Alpettai",
];

const contrabandTypes = [
  { label: "Pondy Arrack",       unit: "Cases / Ltrs" },
  { label: "AP ID Arrack",       unit: "Cases / Ltrs" },
  { label: "AP IMFL",            unit: "Btls" },
  { label: "Ganja Tablet",       unit: "Nos" },
  { label: "Pondy IMFL",         unit: "Btls" },
  { label: "KA IMFL",            unit: "Ltrs" },
  { label: "Toddy",              unit: "Ltrs" },
  { label: "TN IMFL",            unit: "Btls" },
  { label: "Ganja",              unit: "Kgs" },
];

type AccusedEntry = {
  id: number;
  accusedData: AccusedData;
  expanded: boolean;
};

const inputCls = "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls = "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls = "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function AddCheckpointEntryForm({ onClose }: { onClose: () => void }) {
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Location Details
  const [district, setDistrict] = useState("");
  const [checkpost, setCheckpost] = useState("");
  const [latitude, setLatitude] = useState("13.6288");
  const [longitude, setLongitude] = useState("79.4192");

  // Shift data
  const [activeShift, setActiveShift] = useState("06:00 - 14:00");
  const shifts = ["06:00 - 14:00", "14:00 - 22:00", "22:00 - 06:00"];
  const [shiftData, setShiftData] = useState<Record<string, { si: string; hc: string; pc: string }>>({
    "06:00 - 14:00": { si: "", hc: "", pc: "" },
    "14:00 - 22:00": { si: "", hc: "", pc: "" },
    "22:00 - 06:00": { si: "", hc: "", pc: "" },
  });

  const updateShift = (shift: string, field: "si" | "hc" | "pc", val: string) =>
    setShiftData(prev => ({ ...prev, [shift]: { ...prev[shift], [field]: val } }));

  // Contraband
  const [seizures, setSeizures] = useState<Record<string, { qty: string; accused: string }>>(
    Object.fromEntries(contrabandTypes.map(c => [c.label, { qty: "", accused: "" }]))
  );
  const updateSeizure = (label: string, field: "qty" | "accused", val: string) =>
    setSeizures(prev => ({ ...prev, [label]: { ...prev[label], [field]: val } }));

  // Vehicle seized
  const [v2w, setV2w] = useState("0");
  const [v3w, setV3w] = useState("0");
  const [v4w, setV4w] = useState("0");
  const [v6w, setV6w] = useState("0");

  // Seizure photo
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.size <= 10 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = ev => {
          if (ev.target?.result) setPhotos(prev => [...prev, ev.target!.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = "";
  };

  // Accused
  const [accusedList, setAccusedList] = useState<AccusedEntry[]>([
    { id: 1, accusedData: { ...defaultAccusedData }, expanded: true },
  ]);

  const addAccused = () =>
    setAccusedList(prev => [
      ...prev,
      { id: prev.length + 1, accusedData: { ...defaultAccusedData }, expanded: true },
    ]);

  const removeAccused = (id: number) =>
    setAccusedList(prev => prev.filter(a => a.id !== id));

  const toggleExpand = (id: number) =>
    setAccusedList(prev => prev.map(a => a.id === id ? { ...a, expanded: !a.expanded } : a));

  const updateAccused = (id: number, data: AccusedData) =>
    setAccusedList(prev => prev.map(a => a.id === id ? { ...a, accusedData: data } : a));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b" style={{ borderColor: "hsl(var(--border))" }}>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div>
          <h2 className="text-base font-bold text-foreground">Add Checkpoint Seizure Entry</h2>
          <p className="text-xs text-muted-foreground">Fill in the seizure data for the selected checkpost shift</p>
        </div>
      </div>

      {/* ── LOCATION DETAILS ── */}
      <div className={sectionCls} style={{ borderColor: "hsl(var(--border))" }}>
        <p className={sectionTitleCls}>Location Details</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>District / City</label>
            <select value={district} onChange={e => setDistrict(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }}>
              <option value="">Select District</option>
              {tnDistricts.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Checkpost</label>
            <select value={checkpost} onChange={e => setCheckpost(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }}>
              <option value="">Select Checkpost</option>
              {checkpostList.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Latitude</label>
            <input value={latitude} onChange={e => setLatitude(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }} />
          </div>
          <div>
            <label className={labelCls}>Longitude</label>
            <input value={longitude} onChange={e => setLongitude(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }} />
          </div>
        </div>
      </div>

      {/* ── SHIFT-WISE DEPLOYMENT & SEIZURES ── */}
      <div className={sectionCls} style={{ borderColor: "hsl(var(--border))" }}>
        <p className={sectionTitleCls}>Shift-wise Deployment &amp; Seizures</p>
        {/* Shift selector tabs */}
        <div className="flex gap-2">
          {shifts.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveShift(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeShift === s ? "text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
              style={activeShift === s ? { background: "hsl(var(--primary))" } : {}}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 pt-1">
          <div>
            <label className={labelCls}>SI Count</label>
            <input
              type="number" min="0"
              value={shiftData[activeShift].si}
              onChange={e => updateShift(activeShift, "si", e.target.value)}
              className={inputCls} style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>HC Count</label>
            <input
              type="number" min="0"
              value={shiftData[activeShift].hc}
              onChange={e => updateShift(activeShift, "hc", e.target.value)}
              className={inputCls} style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>PC Count</label>
            <input
              type="number" min="0"
              value={shiftData[activeShift].pc}
              onChange={e => updateShift(activeShift, "pc", e.target.value)}
              className={inputCls} style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
        </div>
      </div>

      {/* ── CONTRABAND SEIZURES ── */}
      <div className={sectionCls} style={{ borderColor: "hsl(var(--border))" }}>
        <p className={sectionTitleCls}>Contraband Seizures</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b" style={{ borderColor: "hsl(var(--border))" }}>
                <th className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground" style={{ width: "40%" }}>Contraband Type</th>
                <th className="text-left py-2 px-2 text-xs font-semibold text-muted-foreground" style={{ width: "20%" }}>Unit</th>
                <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground">Quantity</th>
                <th className="text-center py-2 px-2 text-xs font-semibold text-muted-foreground">Accused</th>
              </tr>
            </thead>
            <tbody>
              {contrabandTypes.map((ct, i) => (
                <tr key={ct.label} className={`border-b ${i % 2 === 0 ? "bg-muted/10" : ""}`} style={{ borderColor: "hsl(var(--border))" }}>
                  <td className="py-1.5 px-2 text-sm font-medium text-foreground">{ct.label}</td>
                  <td className="py-1.5 px-2 text-xs text-muted-foreground">{ct.unit}</td>
                  <td className="py-1 px-1">
                    <input
                      type="number" min="0"
                      value={seizures[ct.label].qty}
                      onChange={e => updateSeizure(ct.label, "qty", e.target.value)}
                      className="w-full rounded border px-2 py-1.5 text-xs text-center bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </td>
                  <td className="py-1 px-1">
                    <input
                      type="number" min="0"
                      value={seizures[ct.label].accused}
                      onChange={e => updateSeizure(ct.label, "accused", e.target.value)}
                      className="w-full rounded border px-2 py-1.5 text-xs text-center bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── VEHICLE SEIZED ── */}
      <div className={sectionCls} style={{ borderColor: "hsl(var(--border))" }}>
        <p className={sectionTitleCls}>Vehicle Seized</p>
        <div className="grid grid-cols-4 gap-4">
          {[{ label: "2 Wheeler", v: v2w, s: setV2w }, { label: "3 Wheeler", v: v3w, s: setV3w }, { label: "4 Wheeler", v: v4w, s: setV4w }, { label: "6 Wheeler", v: v6w, s: setV6w }].map(x => (
            <div key={x.label}>
              <label className={labelCls}>{x.label}</label>
              <input
                type="number" min="0"
                value={x.v} onChange={e => x.s(e.target.value)}
                className={inputCls} style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── SEIZURE PHOTO ── */}
      <div className={sectionCls} style={{ borderColor: "hsl(var(--border))" }}>
        <p className={sectionTitleCls}>Seizure Photo</p>
        <div
          className="rounded-lg border-2 border-dashed p-8 text-center cursor-pointer hover:bg-muted/20 transition-colors"
          style={{ borderColor: "hsl(var(--border))" }}
          onClick={() => photoInputRef.current?.click()}
        >
          {photos.length === 0 ? (
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full p-3" style={{ background: "hsl(var(--muted))" }}>
                <Camera className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Click to upload or drag &amp; drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG (up to 10MB)</p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold mt-1"
                style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                onClick={e => { e.stopPropagation(); photoInputRef.current?.click(); }}
              >
                <Upload className="h-4 w-4" /> Browse Files
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {photos.map((p, i) => (
                  <div key={i} className="relative group">
                    <img src={p} alt={`Seizure ${i + 1}`} className="h-24 w-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); setPhotos(prev => prev.filter((_, idx) => idx !== i)); }}
                      className="absolute top-1 right-1 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "hsl(var(--destructive))", color: "hsl(var(--destructive-foreground))" }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <div
                  className="h-24 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors"
                  style={{ borderColor: "hsl(var(--border))" }}
                  onClick={e => { e.stopPropagation(); photoInputRef.current?.click(); }}
                >
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handlePhotoUpload}
        />
      </div>

      {/* ── ACCUSED DETAILS ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-foreground uppercase tracking-widest" style={{ fontSize: "0.7rem" }}>Accused Details</p>
          <button
            type="button"
            onClick={addAccused}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border hover:bg-muted transition-colors"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add More
          </button>
        </div>

        {accusedList.map((entry, idx) => (
          <div key={entry.id} className="rounded-lg border" style={{ borderColor: "hsl(var(--border))" }}>
            {/* Accused card header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg"
              onClick={() => toggleExpand(entry.id)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                >
                  #{idx + 1}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {entry.accusedData.type === "known" && entry.accusedData.selectedAccused
                    ? entry.accusedData.selectedAccused.name
                    : entry.accusedData.firstName
                    ? `${entry.accusedData.firstName} ${entry.accusedData.lastName}`.trim()
                    : "Accused Person"}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: entry.accusedData.type === "known"
                      ? "hsl(var(--primary)/0.12)"
                      : "hsl(var(--destructive)/0.1)",
                    color: entry.accusedData.type === "known"
                      ? "hsl(var(--primary))"
                      : "hsl(var(--destructive))",
                  }}
                >
                  {entry.accusedData.type === "known" ? "Known" : "Unknown"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {accusedList.length > 1 && (
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); removeAccused(entry.id); }}
                    className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                    style={{ color: "hsl(var(--destructive))" }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
                <span className="text-xs text-muted-foreground">{entry.expanded ? "▲" : "▼"}</span>
              </div>
            </div>

            {entry.expanded && (
              <div className="px-4 pb-4 pt-2 border-t space-y-3" style={{ borderColor: "hsl(var(--border))" }}>
                <AccusedDetailsSection
                  data={entry.accusedData}
                  onChange={d => updateAccused(entry.id, d)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── FOOTER ACTIONS ── */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "hsl(var(--border))" }}>
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
          onClick={onClose}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}
