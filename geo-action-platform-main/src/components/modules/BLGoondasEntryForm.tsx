import { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

const tnDistricts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul",
  "Thanjavur", "Ranipet", "Sivaganga", "Karur", "Namakkal",
  "Kancheepuram", "Tiruvannamalai",
];

const offenceCategories = [
  "Liquor smuggling", "Ganja trafficking", "NDPS violations",
  "Solvent misuse", "Repeat offender - NDPS", "Repeat offender - Liquor",
  "Distillery offences", "Property offences", "Other",
];

const statusOptions = ["Active", "Detained", "Released", "Absconding", "Under Surveillance"];

type PreviousCase = {
  id: number;
  caseNo: string;
  year: string;
  section: string;
};

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls =
  "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function BLGoondasEntryForm({ onClose }: { onClose: () => void }) {
  // Personal Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  // BL / Goondas details
  const [blOrderNo, setBlOrderNo] = useState("");
  const [blOrderDate, setBlOrderDate] = useState("");
  const [blExpiryDate, setBlExpiryDate] = useState("");
  const [lastOffence, setLastOffence] = useState("");
  const [threatLevel, setThreatLevel] = useState("Medium");
  const [status, setStatus] = useState("Active");
  const [remarks, setRemarks] = useState("");

  // Previous cases
  const [cases, setCases] = useState<PreviousCase[]>([
    { id: 1, caseNo: "", year: "", section: "" },
  ]);

  const addCase = () =>
    setCases((prev) => [
      ...prev,
      { id: prev.length + 1, caseNo: "", year: "", section: "" },
    ]);

  const removeCase = (id: number) =>
    setCases((prev) => prev.filter((c) => c.id !== id));

  const updateCase = (
    id: number,
    field: keyof Omit<PreviousCase, "id">,
    val: string
  ) =>
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setPhoto(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleSubmit = () => {
    console.log("BL Goondas Entry submitted");
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
            Add BL Goondas Entry
          </h2>
          <p className="text-xs text-muted-foreground">
            Register a new Bound Labour / Goondas individual
          </p>
        </div>
      </div>

      {/* ── PERSONAL DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Personal Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>First Name *</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="First name"
            />
          </div>
          <div>
            <label className={labelCls}>Last Name *</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Last name"
            />
          </div>
          <div>
            <label className={labelCls}>Alias / Nick Name</label>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Alias / nick name"
            />
          </div>
          <div>
            <label className={labelCls}>Age</label>
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
            <label className={labelCls}>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
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
          <div className="col-span-2">
            <label className={labelCls}>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Full address"
            />
          </div>
          <div>
            <label className={labelCls}>Phone No.</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Mobile number"
            />
          </div>
          <div>
            <label className={labelCls}>Aadhar No.</label>
            <input
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="XXXX-XXXX-XXXX"
            />
          </div>
        </div>

        {/* Photo upload */}
        <div>
          <label className={labelCls}>Photo</label>
          <div className="flex items-center gap-4">
            {photo ? (
              <img
                src={photo}
                alt="Goondas"
                className="h-24 w-20 object-cover rounded-lg border"
                style={{ borderColor: "hsl(var(--border))" }}
              />
            ) : (
              <div
                className="h-24 w-20 rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground text-xs"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                No Photo
              </div>
            )}
            <label className="cursor-pointer">
              <span
                className="px-4 py-2 rounded-lg text-sm font-medium border hover:bg-muted transition-colors"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                Upload Photo
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>
        </div>
      </div>

      {/* ── BL / GOONDAS ORDER DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>BL / Goondas Order Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>BL Order No. *</label>
            <input
              value={blOrderNo}
              onChange={(e) => setBlOrderNo(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. BL-2026-001"
            />
          </div>
          <div>
            <label className={labelCls}>Order Date</label>
            <input
              type="date"
              value={blOrderDate}
              onChange={(e) => setBlOrderDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Expiry Date</label>
            <input
              type="date"
              value={blExpiryDate}
              onChange={(e) => setBlExpiryDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Last Offence Category</label>
            <select
              value={lastOffence}
              onChange={(e) => setLastOffence(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select category</option>
              {offenceCategories.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Threat Level</label>
            <select
              value={threatLevel}
              onChange={(e) => setThreatLevel(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Current Status</label>
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
          <div className="col-span-3">
            <label className={labelCls}>Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Additional remarks..."
            />
          </div>
        </div>
      </div>

      {/* ── PREVIOUS CASES ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex items-center justify-between">
          <p className={sectionTitleCls}>Previous Cases</p>
          <button
            type="button"
            onClick={addCase}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border hover:bg-muted transition-colors"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <Plus className="h-3.5 w-3.5" /> Add Case
          </button>
        </div>
        <div className="space-y-3">
          {cases.map((c, idx) => (
            <div key={c.id} className="grid grid-cols-4 gap-3 items-end">
              <div className="col-span-1">
                <label className={labelCls}>Case No.</label>
                <input
                  value={c.caseNo}
                  onChange={(e) => updateCase(c.id, "caseNo", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                  placeholder="Case number"
                />
              </div>
              <div>
                <label className={labelCls}>Year</label>
                <input
                  value={c.year}
                  onChange={(e) => updateCase(c.id, "year", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                  placeholder="Year"
                />
              </div>
              <div>
                <label className={labelCls}>Section / Act</label>
                <input
                  value={c.section}
                  onChange={(e) =>
                    updateCase(c.id, "section", e.target.value)
                  }
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                  placeholder="e.g. IPC 302"
                />
              </div>
              <div className="flex items-end pb-[3px]">
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
          Save Entry
        </button>
      </div>
    </div>
  );
}
