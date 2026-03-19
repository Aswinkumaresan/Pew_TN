import { useState } from "react";
import {
  Search,
  UserCheck,
  UserX,
  Plus,
  Upload,
  ChevronRight,
} from "lucide-react";

// Mock accused list for search
const mockAccusedList = [
  {
    id: "ACC-001",
    name: "Murugan Thevar",
    alias: "Murugan",
    fatherName: "Thevar A.",
    dob: "1986-04-12",
    gender: "Male",
    district: "Chennai",
    mobile: "9876543210",
    risk: "high",
    cases: 4,
  },
  {
    id: "ACC-002",
    name: "Durai Singam",
    alias: "Durai",
    fatherName: "Singam B.",
    dob: "1980-07-22",
    gender: "Male",
    district: "Madurai",
    mobile: "9123456789",
    risk: "high",
    cases: 7,
  },
  {
    id: "ACC-003",
    name: "Velan Raju",
    alias: "Velan",
    fatherName: "Raju C.",
    dob: "1995-01-05",
    gender: "Male",
    district: "Coimbatore",
    mobile: "9988776655",
    risk: "medium",
    cases: 2,
  },
  {
    id: "ACC-004",
    name: "Anbu Selvan",
    alias: "Anbu",
    fatherName: "Selvan D.",
    dob: "1989-11-30",
    gender: "Male",
    district: "Tiruchirappalli",
    mobile: "9871234560",
    risk: "medium",
    cases: 3,
  },
  {
    id: "ACC-005",
    name: "Kumaran Pillai",
    alias: "Kumar",
    fatherName: "Pillai E.",
    dob: "1973-06-18",
    gender: "Male",
    district: "Salem",
    mobile: "9765432109",
    risk: "low",
    cases: 1,
  },
];

export type AccusedData = {
  type: "known" | "unknown";
  selectedAccused?: (typeof mockAccusedList)[0];
  // Personal
  firstName: string;
  lastName: string;
  surName: string;
  alias: string;
  fatherMotherName: string;
  gender: string;
  dob: string;
  age: string;
  nationality: string;
  permanentAddress: string;
  currentAddress: string;
  mobile: string;
  idProofType: string;
  idProofNumber: string;
  // Physical
  height: string;
  weight: string;
  complexion: string;
  identificationMarks: string;
  photograph: string;
  // Occupation
  occupation: string;
  employer: string;
  income: string;
  education: string;
  // Investigation
  drugSource: string;
  drugDestination: string;
  confessionRecorded: boolean;
  gangLinks: string;
};

const defaultAccusedData: AccusedData = {
  type: "unknown",
  firstName: "",
  lastName: "",
  surName: "",
  alias: "",
  fatherMotherName: "",
  gender: "",
  dob: "",
  age: "",
  nationality: "Indian",
  permanentAddress: "",
  currentAddress: "",
  mobile: "",
  idProofType: "",
  idProofNumber: "",
  height: "",
  weight: "",
  complexion: "",
  identificationMarks: "",
  photograph: "",
  occupation: "",
  employer: "",
  income: "",
  education: "",
  drugSource: "",
  drugDestination: "",
  confessionRecorded: false,
  gangLinks: "",
};

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-4 space-y-4";

interface Props {
  data: AccusedData;
  onChange: (d: AccusedData) => void;
  onKnownProceed?: () => void; // called when user picks known accused & clicks proceed
}

export function AccusedDetailsSection({
  data,
  onChange,
  onKnownProceed,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const set = (
    field: keyof AccusedData,
    value: AccusedData[keyof AccusedData],
  ) => onChange({ ...data, [field]: value });

  const filteredAccused = mockAccusedList.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.district.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectAccused = (acc: (typeof mockAccusedList)[0]) => {
    onChange({ ...data, selectedAccused: acc, type: "known" });
    setShowSearch(false);
  };

  const riskColor = (risk: string) =>
    risk === "high"
      ? "bg-destructive/10 text-destructive"
      : risk === "medium"
        ? "bg-yellow-500/10 text-yellow-600"
        : "bg-green-500/10 text-green-600";

  return (
    <div className="space-y-4">
      {/* Known / Unknown Toggle */}
      <div className={sectionCls} style={{ borderColor: "hsl(var(--border))" }}>
        <p className={labelCls}>Accused Status</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              onChange({ ...data, type: "unknown", selectedAccused: undefined })
            }
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-colors ${
              data.type === "unknown"
                ? "border-destructive/60 text-destructive"
                : "border hover:bg-muted text-muted-foreground"
            }`}
            style={
              data.type === "unknown"
                ? {
                    background: "hsl(var(--destructive)/0.08)",
                    borderColor: "hsl(var(--destructive)/0.5)",
                  }
                : { borderColor: "hsl(var(--border))" }
            }
          >
            <UserX className="h-4 w-4" />
            Unknown Accused
          </button>
          <button
            type="button"
            onClick={() => {
              onChange({ ...data, type: "known" });
              setShowSearch(true);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-colors ${
              data.type === "known"
                ? "text-primary-foreground"
                : "border hover:bg-muted text-muted-foreground"
            }`}
            style={
              data.type === "known"
                ? {
                    background: "hsl(var(--primary))",
                    borderColor: "hsl(var(--primary))",
                  }
                : { borderColor: "hsl(var(--border))" }
            }
          >
            <UserCheck className="h-4 w-4" />
            Known Accused
          </button>
        </div>
      </div>

      {/* ── KNOWN: Accused List Search ── */}
      {data.type === "known" && (
        <div className="space-y-3">
          {/* Search bar */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className={labelCls}>Search Accused List</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearch(true);
                }}
                onFocus={() => setShowSearch(true)}
                placeholder="Search by name, ID or district…"
                className={inputCls + " pl-9"}
                style={{ borderColor: "hsl(var(--border))" }}
                maxLength={100}
              />
            </div>

            {/* Results */}
            {showSearch && (
              <div className="space-y-2 mt-1">
                {filteredAccused.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No accused found
                  </p>
                ) : (
                  filteredAccused.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => selectAccused(acc)}
                      className={`w-full text-left rounded-lg border p-3 hover:bg-muted/50 transition-colors ${data.selectedAccused?.id === acc.id ? "ring-2 ring-primary" : ""}`}
                      style={{ borderColor: "hsl(var(--border))" }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {acc.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {acc.id} · {acc.district} · {acc.gender}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Father: {acc.fatherName} · Mobile: {acc.mobile}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${riskColor(acc.risk)}`}
                          >
                            {acc.risk.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {acc.cases} case{acc.cases !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Selected Accused Card */}
          {data.selectedAccused && (
            <div
              className="rounded-lg border-2 p-4 space-y-2"
              style={{
                borderColor: "hsl(var(--primary)/0.4)",
                background: "hsl(var(--primary)/0.04)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    {data.selectedAccused.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {data.selectedAccused.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {data.selectedAccused.id} ·{" "}
                      {data.selectedAccused.district}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${riskColor(data.selectedAccused.risk)}`}
                >
                  {data.selectedAccused.risk.toUpperCase()} RISK
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <span>
                  Father:{" "}
                  <span className="text-foreground font-medium">
                    {data.selectedAccused.fatherName}
                  </span>
                </span>
                <span>
                  DOB:{" "}
                  <span className="text-foreground font-medium">
                    {data.selectedAccused.dob}
                  </span>
                </span>
                <span>
                  Cases:{" "}
                  <span className="text-foreground font-medium">
                    {data.selectedAccused.cases}
                  </span>
                </span>
              </div>
              {onKnownProceed && (
                <button
                  type="button"
                  onClick={onKnownProceed}
                  className="w-full mt-2 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                  }}
                >
                  Proceed to Seizure Details{" "}
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── UNKNOWN: Full Accused Details Form ── */}
      {data.type === "unknown" && (
        <div className="space-y-4">
          {/* 1. Personal Details */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">
              1. Personal Details
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>First Name</label>
                <input
                  value={data.firstName}
                  onChange={(e) =>
                    set("firstName", e.target.value.slice(0, 100))
                  }
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Last Name</label>
                <input
                  value={data.lastName}
                  onChange={(e) =>
                    set("lastName", e.target.value.slice(0, 100))
                  }
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Sur Name</label>
                <input
                  value={data.surName}
                  onChange={(e) => set("surName", e.target.value.slice(0, 100))}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Alias / Nickname (if any)</label>
              <input
                value={data.alias}
                onChange={(e) => set("alias", e.target.value.slice(0, 100))}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div>
              <label className={labelCls}>Father's / Mother's Name</label>
              <input
                value={data.fatherMotherName}
                onChange={(e) =>
                  set("fatherMotherName", e.target.value.slice(0, 150))
                }
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Gender</label>
                <select
                  value={data.gender}
                  onChange={(e) => set("gender", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Transgender</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Date of Birth</label>
                <input
                  type="date"
                  value={data.dob}
                  onChange={(e) => set("dob", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Age</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={data.age}
                  onChange={(e) => set("age", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Nationality</label>
              <input
                value={data.nationality}
                onChange={(e) =>
                  set("nationality", e.target.value.slice(0, 50))
                }
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div>
              <label className={labelCls}>Permanent Address</label>
              <textarea
                value={data.permanentAddress}
                onChange={(e) =>
                  set("permanentAddress", e.target.value.slice(0, 500))
                }
                rows={2}
                className={inputCls + " resize-none"}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div>
              <label className={labelCls}>Current / Temporary Address</label>
              <textarea
                value={data.currentAddress}
                onChange={(e) =>
                  set("currentAddress", e.target.value.slice(0, 500))
                }
                rows={2}
                className={inputCls + " resize-none"}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Mobile Number / Contact</label>
                <input
                  type="tel"
                  value={data.mobile}
                  onChange={(e) =>
                    set(
                      "mobile",
                      e.target.value.replace(/\D/g, "").slice(0, 15),
                    )
                  }
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>ID Proof Type</label>
                <select
                  value={data.idProofType}
                  onChange={(e) => set("idProofType", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <option value="">Select Type</option>
                  <option>Aadhar Card</option>
                  <option>Driving Licence</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>ID Proof Number</label>
              <input
                value={data.idProofNumber}
                onChange={(e) =>
                  set("idProofNumber", e.target.value.slice(0, 50))
                }
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
          </div>

          {/* 2. Physical Identification Details */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">
              2. Physical Identification Details
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Height (cm)</label>
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={data.height}
                  onChange={(e) => set("height", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Weight (kg)</label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={data.weight}
                  onChange={(e) => set("weight", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Complexion</label>
                <select
                  value={data.complexion}
                  onChange={(e) => set("complexion", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <option value="">Select</option>
                  <option>Fair</option>
                  <option>Wheatish</option>
                  <option>Medium</option>
                  <option>Dark</option>
                  <option>Very Dark</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>
                Identification Marks (scars, tattoos, birthmarks)
              </label>
              <textarea
                value={data.identificationMarks}
                onChange={(e) =>
                  set("identificationMarks", e.target.value.slice(0, 500))
                }
                rows={2}
                className={inputCls + " resize-none"}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <div>
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
            </div>
          </div>

          {/* 3. Occupation & Background */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">
              3. Occupation &amp; Background
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Occupation / Employment</label>
                <input
                  value={data.occupation}
                  onChange={(e) =>
                    set("occupation", e.target.value.slice(0, 100))
                  }
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Employer / Work Location</label>
                <input
                  value={data.employer}
                  onChange={(e) =>
                    set("employer", e.target.value.slice(0, 200))
                  }
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Income Details (if relevant)</label>
                <input
                  value={data.income}
                  onChange={(e) => set("income", e.target.value.slice(0, 100))}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Educational Qualification</label>
                <select
                  value={data.education}
                  onChange={(e) => set("education", e.target.value)}
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <option value="">Select</option>
                  <option>Illiterate</option>
                  <option>Primary School</option>
                  <option>Secondary School</option>
                  <option>Higher Secondary</option>
                  <option>Diploma</option>
                  <option>Graduate</option>
                  <option>Post Graduate</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Additional Investigation Details */}
          <div
            className={sectionCls}
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">
              4. Additional Investigation Details
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Source of Drugs</label>
                <input
                  value={data.drugSource}
                  onChange={(e) =>
                    set("drugSource", e.target.value.slice(0, 200))
                  }
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
              <div>
                <label className={labelCls}>Destination of Drugs</label>
                <input
                  value={data.drugDestination}
                  onChange={(e) =>
                    set("drugDestination", e.target.value.slice(0, 200))
                  }
                  className={inputCls}
                  style={{ borderColor: "hsl(var(--border))" }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  set("confessionRecorded", !data.confessionRecorded)
                }
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${data.confessionRecorded ? "bg-primary" : "bg-muted"}`}
                style={
                  data.confessionRecorded
                    ? { background: "hsl(var(--primary))" }
                    : {}
                }
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${data.confessionRecorded ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
              <label className="text-sm text-foreground font-medium">
                Confession / Statement Recorded
              </label>
            </div>
            <div>
              <label className={labelCls}>
                Links to Other Accused or Gangs
              </label>
              <textarea
                value={data.gangLinks}
                onChange={(e) => set("gangLinks", e.target.value.slice(0, 500))}
                rows={2}
                className={inputCls + " resize-none"}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { defaultAccusedData };
