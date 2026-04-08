import { useState, Fragment } from "react";
import {
  Search,
  FileText,
  FileSpreadsheet,
  Plus,
  Save,
  QrCode,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DSRNewEntryForm } from "./DSRNewEntryForm";
import { DSRPEWForm } from "./DSRPEWForm";
import { DSRNDPSForm } from "./DSRNDPSForm";
import { DSRPEWEntryForm } from "./DSRPEWEntryForm";
import { DSRNDPSEntryForm } from "./DSRNDPSEntryForm";
import { DSRLocalForm } from "./DSRLocalForm";
import { DSRLocalEntryForm } from "./DSRLocalEntryForm";
import { DSRNIACrimeForm } from "./DSRNIACrimeForm";
import { DSRNIACrimeEntryForm } from "./DSRNIACrimeEntryForm";
import { AddCheckpointEntryForm } from "./AddCheckpointEntryForm";
import { CheckpointAttendancePage } from "./CheckpointAttendancePage";
import { CheckpostPage } from "./CheckpostPage";

// ── Checkpost Seizures Form ───────────────────────────────────────────────────
type CheckpostRow = {
  id: number;
  district: string;
  checkpostName: string;
  s1Si: string;
  s1Ors: string;
  s2Si: string;
  s2Ors: string;
  s3Si: string;
  s3Ors: string;
  cases: string;
  accused: string;
  paCase: string;
  paLtrs: string;
  paAcc: string;
  apIdCase: string;
  apIdLtrs: string;
  apIdAcc: string;
  apImflCase: string;
  apImflLtrs: string;
  piCase: string;
  piBtls: string;
  kiCase: string;
  kiLtrs: string;
  tiCase: string;
  tiBtls: string;
  gtCase: string;
  gtNos: string;
  tdCase: string;
  tdLtrs: string;
  v2w: string;
  v3w: string;
  v4w: string;
  v6w: string;
};

const PEW_LIQUOR_CATEGORIES = [
  "Rectified Spirit",
  "Methyl Alcohol",
  "Pondy Arrack",
  "Pondy IMFL",
  "KA IMFL",
  "AP ID Arrack",
  "TN IMFL",
  "F.Wash",
  "ID Arrack",
  "Spurious Liquor",
  "Foreign Liquor",
  "Military Liquor",
  "Other IMFL",
  "Toddy",
];

const PEW_LIQUOR_WITH_UNITS = [
  { name: "Rectified Spirit", unit: "Litres" },
  { name: "Methyl Alcohol", unit: "Litres" },
  { name: "Pondy Arrack", unit: "Litres" },
  { name: "Pondy IMFL", unit: "Bottles" },
  { name: "KA IMFL", unit: "Bottles" },
  { name: "AP ID Arrack", unit: "Litres" },
  { name: "TN IMFL", unit: "Bottles" },
  { name: "F.Wash", unit: "Litres" },
  { name: "ID Arrack", unit: "Litres" },
  { name: "Spurious Liquor", unit: "Bottles" },
  { name: "Foreign Liquor", unit: "Bottles" },
  { name: "Military Liquor", unit: "Bottles" },
  { name: "Other IMFL", unit: "Bottles" },
  { name: "Toddy", unit: "Bottles" },
];

const NDPS_DRUG_CATEGORIES = [
  "Ganja",
  "Ganja Chocolate",
  "Methamphetamine",
  "Methaqualone",
  "Amphetamine",
  "Ketamine",
  "Heroin",
  "Cocaine",
  "Tablets",
  "Opium",
  "Hashish Oil",
];


type PEWSeizureRow = {
  id: number;
  district: string;
  unitName: string;
  s1Si: string;
  s1Ors: string;
  s2Si: string;
  s2Ors: string;
  s3Si: string;
  s3Ors: string;
  cases: string;
  accused: string;
  [key: string]: string | number; // For dynamic seizure fields
};

const emptyRow = (id: number): CheckpostRow => ({
  id,
  district: "",
  checkpostName: "",
  s1Si: "",
  s1Ors: "",
  s2Si: "",
  s2Ors: "",
  s3Si: "",
  s3Ors: "",
  cases: "",
  accused: "",
  paCase: "",
  paLtrs: "",
  paAcc: "",
  apIdCase: "",
  apIdLtrs: "",
  apIdAcc: "",
  apImflCase: "",
  apImflLtrs: "",
  piCase: "",
  piBtls: "",
  kiCase: "",
  kiLtrs: "",
  tiCase: "",
  tiBtls: "",
  gtCase: "",
  gtNos: "",
  tdCase: "",
  tdLtrs: "",
  v2w: "0",
  v3w: "0",
  v4w: "0",
  v6w: "0",
});

const emptyPEWRow = (id: number): PEWSeizureRow => {
  const row: PEWSeizureRow = {
    id,
    district: "",
    unitName: "",
    s1Si: "",
    s1Ors: "",
    s2Si: "",
    s2Ors: "",
    s3Si: "",
    s3Ors: "",
    cases: "",
    accused: "",
  };
  PEW_LIQUOR_CATEGORIES.forEach(cat => {
    row[`${cat}_case`] = "";
    row[`${cat}_ltrs`] = "";
  });
  return row;
};

const emptyNDPSRow = (id: number): PEWSeizureRow => {
  const row: PEWSeizureRow = {
    id,
    district: "",
    unitName: "",
    s1Si: "",
    s1Ors: "",
    s2Si: "",
    s2Ors: "",
    s3Si: "",
    s3Ors: "",
    cases: "",
    accused: "",
  };
  NDPS_DRUG_CATEGORIES.forEach(cat => {
    row[`${cat}_case`] = "";
    row[`${cat}_qty`] = "";
  });
  return row;
};

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
  "Sivaganga",
  "Karur",
  "Namakkal",
  "Kancheepuram",
  "Tiruvannamalai",
];

function DSRSeizuresForm({
  title,
  unitLabel,
  initialRows,
  categories = PEW_LIQUOR_CATEGORIES,
  qtyLabel = "Ltrs",
  onAddEntry,
  buttonLabel,
}: {
  title: string;
  unitLabel: string;
  initialRows: PEWSeizureRow[];
  categories?: string[];
  qtyLabel?: string;
  onAddEntry: () => void;
  buttonLabel?: string;
}) {
  const today = new Date().toISOString().split("T")[0];
  const [reportDate, setReportDate] = useState(today);
  const [filterMode, setFilterMode] = useState<"daily" | "weekly" | "monthly" | "custom">("daily");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rows, setRows] = useState<PEWSeizureRow[]>(initialRows);
  const qtyKeySuffix = qtyLabel.toLowerCase();

  const applyWeekly = () => {
    const d = new Date();
    const dayOfWeek = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((dayOfWeek + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    setFromDate(monday.toISOString().split("T")[0]);
    setToDate(sunday.toISOString().split("T")[0]);
    setFilterMode("weekly");
  };

  const applyMonthly = () => {
    const d = new Date();
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0];
    setFromDate(firstDay);
    setToDate(lastDay);
    setFilterMode("monthly");
  };

  const updateRow = (id: number, field: string, value: string) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );

  const sumField = (field: string) =>
    rows.reduce((acc, r) => acc + (parseInt(r[field] as string) || 0), 0);

  const cellCls =
    "border px-1.5 py-1 text-xs text-center w-12 focus:outline-none focus:ring-1 focus:ring-primary bg-background";
  const thCls =
    "border px-2 py-2 text-xs font-semibold text-foreground text-center";

  return (
    <div className="space-y-4">
      <div
        className="flex flex-wrap items-end gap-3 rounded-xl border p-4 bg-card/30"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block ml-1">
            Report Date
          </label>
          <input
            type="date"
            value={reportDate}
            onChange={(e) => { setReportDate(e.target.value); setFilterMode("daily"); }}
            className="rounded-lg border px-3 py-2 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            style={{ borderColor: "hsl(var(--border))" }}
          />
        </div>

        <div className="self-stretch w-px bg-border/50 mx-1" />

        <div className="flex items-center gap-2 p-1 rounded-lg border bg-muted/40" style={{ borderColor: "hsl(var(--border))" }}>
          {[
            { id: "weekly", label: "Weekly", fn: applyWeekly },
            { id: "monthly", label: "Monthly", fn: applyMonthly },
          ].map(f => (
            <button
              key={f.id}
              onClick={f.fn}
              className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all ${filterMode === f.id ? "bg-primary text-white shadow" : "text-muted-foreground hover:bg-muted"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block ml-1">
            Custom Range (From – To)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); setFilterMode("custom"); }}
              className="rounded-lg border px-3 py-2 text-xs bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
              style={{ borderColor: filterMode === "custom" ? "hsl(var(--primary))" : "hsl(var(--border))" }}
            />
            <span className="text-[10px] text-muted-foreground font-bold">TO</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => { setToDate(e.target.value); setFilterMode("custom"); }}
              className="rounded-lg border px-3 py-2 text-xs bg-background shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
              style={{ borderColor: filterMode === "custom" ? "hsl(var(--primary))" : "hsl(var(--border))" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={onAddEntry}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "hsl(var(--primary))" }}
          >
            <Plus className="h-4 w-4" /> {buttonLabel || "Add New Entry"}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-all hover:bg-muted"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <FileSpreadsheet className="h-4 w-4 text-green-600" /> Export Excel
          </button>
        </div>
      </div>

      <div
        className="rounded-xl border shadow-sm overflow-hidden"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div
          className="px-5 py-3 border-b bg-muted/20 flex items-center justify-between"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <span className="text-sm font-bold text-foreground capitalize">
            {title}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded">
            Live Records
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="text-[11px] border-collapse w-full min-w-[900px]">
            <thead>
              <tr
                className="border-b bg-muted/40"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <th className={`${thCls} w-10`} rowSpan={2}>S.No</th>
                <th className={`${thCls} w-28`} rowSpan={2}>Dist./City</th>
                <th className={`${thCls} w-32`} rowSpan={2}>{unitLabel}</th>
                <th className={`${thCls}`} colSpan={2}>Shift 1</th>
                <th className={`${thCls}`} colSpan={2}>Shift 2</th>
                <th className={`${thCls}`} colSpan={2}>Shift 3</th>
                <th className={`${thCls} w-20`}>Cases</th>
                <th className={`${thCls} w-20`}>Acc.</th>
              </tr>
              <tr className="bg-muted/30">
                <td className="border" colSpan={11}></td>
                {categories.map(cat => (
                  <Fragment key={cat}>
                    <td className={`${thCls} text-[10px] py-1 bg-primary/5`} colSpan={2}>
                      {cat}
                    </td>
                  </Fragment>
                ))}
              </tr>
              <tr className="bg-muted/20">
                <td className="border" colSpan={11}></td>
                {categories.map(cat => (
                  <Fragment key={cat}>
                    <td className={`${thCls} text-[9px] py-0.5`}>Case</td>
                    <td className={`${thCls} text-[9px] py-0.5`}>{qtyLabel}</td>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-primary/5 transition-colors"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <td className="border px-2 py-2 text-center font-mono font-bold text-primary">
                    {idx + 1}
                  </td>
                  <td className="border px-1">
                    <select
                      value={row.district}
                      onChange={(e) => updateRow(row.id, "district", e.target.value)}
                      className="w-full text-[11px] py-1 bg-transparent focus:outline-none font-medium"
                    >
                      <option value="">-</option>
                      {tnDistricts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-1">
                    <input
                      value={row.unitName}
                      onChange={(e) => updateRow(row.id, "unitName", e.target.value)}
                      placeholder={unitLabel}
                      className="w-full text-[11px] py-1 px-1 bg-transparent focus:outline-none placeholder:text-muted-foreground/50 font-medium"
                    />
                  </td>
                  {(
                    [
                      "s1Si", "s1Ors", "s2Si", "s2Ors", "s3Si", "s3Ors",
                      "cases", "accused"
                    ]
                  ).map((f) => (
                    <td key={f} className="border">
                      <input
                        type="number"
                        min="0"
                        value={row[f] as string}
                        onChange={(e) => updateRow(row.id, f, e.target.value)}
                        className="w-full text-center py-1 bg-transparent focus:outline-none font-medium"
                      />
                    </td>
                  ))}
                  {categories.map(cat => (
                    <Fragment key={cat}>
                      <td className="border">
                        <input
                          type="number"
                          min="0"
                          value={row[`${cat}_case`] as string}
                          onChange={(e) => updateRow(row.id, `${cat}_case`, e.target.value)}
                          className="w-full text-center py-1 bg-transparent focus:outline-none font-medium"
                        />
                      </td>
                      <td className="border text-center">
                        <input
                          type="number"
                          min="0"
                          value={row[`${cat}_${qtyKeySuffix}`] as string}
                          onChange={(e) => updateRow(row.id, `${cat}_${qtyKeySuffix}`, e.target.value)}
                          className="w-full text-center py-1 bg-transparent focus:outline-none font-medium"
                        />
                      </td>
                    </Fragment>
                  ))}
                </tr>
              ))}
              <tr className="bg-primary/5 font-bold">
                <td colSpan={3} className="border px-4 py-2.5 text-right text-[11px] uppercase tracking-wider text-primary">
                  Total
                </td>
                {(
                  [
                    "s1Si", "s1Ors", "s2Si", "s2Ors", "s3Si", "s3Ors",
                    "cases", "accused"
                  ]
                ).map((f) => (
                  <td key={f} className="border text-center text-[11px] py-2.5 text-primary">
                    {sumField(f) || 0}
                  </td>
                ))}
                {categories.map(cat => (
                  <Fragment key={cat}>
                    <td className="border text-center text-[11px] py-2.5 text-primary">
                      {sumField(`${cat}_case`) || 0}
                    </td>
                    <td className="border text-center text-[11px] py-2.5 text-primary">
                      {sumField(`${cat}_${qtyKeySuffix}`) || 0}
                    </td>
                  </Fragment>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


interface SummaryData {
  zone: {
    zone: string;
    district: string;
    value: string;
    cases: string;
    accused: string;
    remand: string;
  };
  liquor: { name: string; unit: string; cases: string; quantity: string; accused: string; }[];
  vehicles: { w2: string; w3: string; w4: string; w6: string; };
}

function DSRSummaryReport({
  module,
  title,
  seizureTitle = "Liquor Seizure Details",
  initialData,
  onSave
}: {
  module: "PEW" | "NIA/Crime" | "Local";
  title?: string;
  seizureTitle?: string;
  initialData?: SummaryData;
  onSave?: (data: SummaryData) => void;
}) {
  const [zoneSummary, setZoneSummary] = useState(initialData?.zone || {
    zone: "Chennai Zor",
    district: "",
    value: "0",
    cases: "0",
    accused: "0",
    remand: "0",
  });

  const [liquorData, setLiquorData] = useState(
    initialData?.liquor || PEW_LIQUOR_WITH_UNITS.map(item => ({
      ...item,
      cases: "0",
      quantity: "0",
      accused: "0",
    }))
  );

  const [vehicles, setVehicles] = useState(initialData?.vehicles || {
    w2: "0",
    w3: "0",
    w4: "0",
    w6: "0",
  });

  const updateZone = (field: string, val: string) => setZoneSummary(prev => ({ ...prev, [field]: val }));
  const updateLiquor = (index: number, field: string, val: string) => {
    const newData = [...liquorData];
    newData[index] = { ...newData[index], [field]: val };
    setLiquorData(newData);
  };
  const updateVehicle = (field: string, val: string) => setVehicles(prev => ({ ...prev, [field]: val }));

  const labelCls = "text-[11px] font-semibold text-muted-foreground mb-2 block";
  const inputCls = "w-full border rounded-lg px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary shadow-sm h-10 text-center font-medium placeholder:text-muted-foreground/30";

  return (
    <div className="space-y-6">
      {/* Zone & Case Summary */}
      <div className="rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="px-5 py-3 border-b bg-muted/20" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-bold text-foreground">{title || "Zone & Case Summary"}</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-6 gap-4">
            <div>
              <label className={labelCls}>Zone</label>
              <select
                value={zoneSummary.zone}
                onChange={(e) => updateZone("zone", e.target.value)}
                className={inputCls}
              >
                <option value="Chennai Zor">Chennai Zor</option>
                <option value="Madurai Zor">Madurai Zor</option>
                <option value="North Zone">North Zone</option>
                <option value="Central Zone">Central Zone</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>District</label>
              <input value={zoneSummary.district} onChange={(e) => updateZone("district", e.target.value)} placeholder="—" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>{module}</label>
              <input type="number" value={zoneSummary.value} onChange={(e) => updateZone("value", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>No. of Cases</label>
              <input type="number" value={zoneSummary.cases} onChange={(e) => updateZone("cases", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>No. of Accused</label>
              <input type="number" value={zoneSummary.accused} onChange={(e) => updateZone("accused", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Remand</label>
              <input type="number" value={zoneSummary.remand} onChange={(e) => updateZone("remand", e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
      </div>

      {/* Liquor Seizure Details */}
      <div className="rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="px-5 py-3 border-b bg-muted/20" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-bold text-foreground">{seizureTitle}</h3>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/10">
                <th className="text-left px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider w-1/3">Category</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Cases</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Quantity</th>
                <th className="text-left px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Accused</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {liquorData.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/5 transition-colors">
                  <td className="px-6 py-3">
                    <span className="font-bold text-foreground">{row.name}</span>
                    <span className="text-xs text-muted-foreground ml-1">({row.unit})</span>
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={row.cases}
                      onChange={(e) => updateLiquor(idx, "cases", e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm bg-card transition-all focus:ring-1 focus:ring-primary sm:w-32 focus:outline-none h-11 text-center"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => updateLiquor(idx, "quantity", e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm bg-card transition-all focus:ring-1 focus:ring-primary sm:w-32 focus:outline-none h-11 text-center"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="number"
                      value={row.accused}
                      onChange={(e) => updateLiquor(idx, "accused", e.target.value)}
                      className="w-full border rounded px-3 py-2 text-sm bg-card transition-all focus:ring-1 focus:ring-primary sm:w-32 focus:outline-none h-11 text-center"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicles Seized */}
      <div className="rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="px-5 py-3 border-b bg-muted/20" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-bold text-foreground">Vehicles Seized</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-8">
            {[
              { label: "2w", field: "w2" },
              { label: "3w", field: "w3" },
              { label: "4w", field: "w4" },
              { label: "6w", field: "w6" },
            ].map(v => (
              <div key={v.field}>
                <label className={labelCls}>{v.label}</label>
                <input
                  type="number"
                  value={vehicles[v.field as keyof typeof vehicles]}
                  onChange={(e) => updateVehicle(v.field, e.target.value)}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-4 pt-4">
        <button className="px-8 py-2.5 rounded-lg text-sm font-bold border hover:bg-muted transition-colors bg-white">
          Reset
        </button>
        <button
          onClick={() => onSave?.({ zone: zoneSummary, liquor: liquorData, vehicles })}
          className="px-8 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90"
          style={{ background: "hsl(var(--primary))" }}
        >
          Save {module} Report
        </button>
      </div>
    </div>
  );
}

function CheckpostSeizuresForm({
  onAttendance,
  onAddEntry,
}: {
  onAttendance: () => void;
  onAddEntry: () => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const [reportDate, setReportDate] = useState(today);
  const [filterMode, setFilterMode] = useState<"daily" | "weekly" | "monthly" | "custom">("daily");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rows, setRows] = useState<CheckpostRow[]>([emptyRow(1)]);

  // Auto-compute from/to when a quick filter is selected
  const applyWeekly = () => {
    const d = new Date();
    const dayOfWeek = d.getDay(); // 0=Sun
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((dayOfWeek + 6) % 7)); // Monday
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    setFromDate(monday.toISOString().split("T")[0]);
    setToDate(sunday.toISOString().split("T")[0]);
    setFilterMode("weekly");
  };

  const applyMonthly = () => {
    const d = new Date();
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0];
    setFromDate(firstDay);
    setToDate(lastDay);
    setFilterMode("monthly");
  };

  const updateRow = (id: number, field: keyof CheckpostRow, value: string) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );

  const addRow = () => setRows((prev) => [...prev, emptyRow(prev.length + 1)]);

  const sumField = (field: keyof CheckpostRow) =>
    rows.reduce((acc, r) => acc + (parseInt(r[field] as string) || 0), 0);

  const cellCls =
    "border px-1.5 py-1 text-xs text-center w-12 focus:outline-none focus:ring-1 focus:ring-primary bg-background";
  const thCls =
    "border px-2 py-2 text-xs font-semibold text-foreground text-center";

  return (
    <div className="space-y-4">
      {/* Date + Filter Row */}
      <div
        className="flex flex-wrap items-end gap-4 rounded-lg border p-4"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        {/* Report Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Report Date
          </label>
          <input
            type="date"
            value={reportDate}
            onChange={(e) => { setReportDate(e.target.value); setFilterMode("daily"); }}
            className="rounded-md border px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            style={{ borderColor: "hsl(var(--border))" }}
          />
        </div>

        {/* Separator */}
        <div
          className="self-stretch w-px"
          style={{ background: "hsl(var(--border))" }}
        />

        {/* Weekly Report */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Weekly Report
          </label>
          <button
            type="button"
            onClick={applyWeekly}
            className="px-4 py-2 rounded-md text-xs font-semibold border transition-colors"
            style={{
              background: filterMode === "weekly" ? "hsl(var(--primary))" : "hsl(var(--muted)/0.5)",
              color: filterMode === "weekly" ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              borderColor: filterMode === "weekly" ? "hsl(var(--primary))" : "hsl(var(--border))",
            }}
          >
            Last 7 days
          </button>
        </div>

        {/* Monthly Report */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Monthly Report
          </label>
          <button
            type="button"
            onClick={applyMonthly}
            className="px-4 py-2 rounded-md text-xs font-semibold border transition-colors"
            style={{
              background: filterMode === "monthly" ? "hsl(var(--primary))" : "hsl(var(--muted)/0.5)",
              color: filterMode === "monthly" ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
              borderColor: filterMode === "monthly" ? "hsl(var(--primary))" : "hsl(var(--border))",
            }}
          >
            Last 30 days
          </button>
        </div>

        {/* Custom Date Range */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground block">
            Date Range (From – To)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); setFilterMode("custom"); }}
              className="rounded-md border px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              style={{ borderColor: filterMode === "custom" ? "hsl(var(--primary))" : "hsl(var(--border))" }}
            />
            <span className="text-xs text-muted-foreground font-medium">to</span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => { setToDate(e.target.value); setFilterMode("custom"); }}
              className="rounded-md border px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              style={{ borderColor: filterMode === "custom" ? "hsl(var(--primary))" : "hsl(var(--border))" }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={onAttendance}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-muted"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <QrCode className="h-4 w-4" /> Attendance
          </button>
          <button
            onClick={onAddEntry}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            <Plus className="h-4 w-4" /> Add Checkpost Entry
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-muted"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <FileSpreadsheet className="h-4 w-4" /> Export Excel
          </button>
          {filterMode !== "daily" && (
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Search className="h-4 w-4" /> Search
            </button>
          )}

          {/* <button
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
          >
            <Save className="h-4 w-4" /> Save DSR
          </button> */}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-lg border overflow-x-auto"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div
          className="px-4 py-3 border-b text-sm font-semibold"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          Prohibition Checkpost Seizure Details on{" "}
          {reportDate.split("-").reverse().join("/")}
        </div>
        <table className="text-xs border-collapse w-full min-w-[900px]">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <th className={`${thCls} w-10`} rowSpan={2}>
                S.No
              </th>
              <th className={`${thCls} w-28`} rowSpan={2}>
                Dist./City
              </th>
              <th className={`${thCls} w-32`} rowSpan={2}>
                Checkpost Name
              </th>
              <th className={`${thCls}`} colSpan={2}>
                Shift 1
              </th>
              <th className={`${thCls}`} colSpan={2}>
                Shift 2
              </th>
              <th className={`${thCls}`} colSpan={2}>
                Shift 3
              </th>
              <th className={`${thCls} w-12`} rowSpan={2}>
                Cases
              </th>
              <th className={`${thCls} w-14`} rowSpan={2}>
                Accused
              </th>
              <th className={`${thCls}`} colSpan={3}>
                Pondy Arrack
              </th>
              <th className={`${thCls}`} colSpan={2}>
                Pondy IMFL
              </th>
              <th className={`${thCls}`} colSpan={3}>
                AP ID Arrack
              </th>
              <th className={`${thCls}`} colSpan={2}>
                AP IMFL
              </th>
              <th className={`${thCls}`} colSpan={2}>
                KA IMFL
              </th>
              <th className={`${thCls}`} colSpan={2}>
                TN IMFL
              </th>
              <th className={`${thCls}`} colSpan={2}>
                Ganja Tablet
              </th>
              <th className={`${thCls}`} colSpan={2}>
                Toddy
              </th>
              <th className={`${thCls}`} colSpan={4}>
                Vehicle Seized
              </th>
            </tr>
            <tr
              className="border-b"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              {["SI", "ORS", "SI", "ORS", "SI", "ORS"].map((h, i) => (
                <th key={i} className={thCls}>
                  {h}
                </th>
              ))}
              {[
                "Case",
                "Ltrs",
                "Acc",
                "Case",
                "Btls",
                "Case",
                "Ltrs",
                "Acc",
                "Case",
                "Ltrs",
                "Case",
                "Ltrs",
                "Case",
                "Btls",
                "Case",
                "Nos",
                "Case",
                "Ltrs",
                "2W",
                "3W",
                "4W",
                "6W",
              ].map((h, i) => (
                <th key={i} className={thCls}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.id}
                className="border-b hover:bg-muted/20"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <td
                  className="border px-2 py-1.5 text-center text-xs font-medium"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  {idx + 1}
                </td>
                <td
                  className="border px-1"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <select
                    value={row.district}
                    onChange={(e) =>
                      updateRow(row.id, "district", e.target.value)
                    }
                    className="w-full text-xs py-1 bg-background focus:outline-none"
                  >
                    <option value="">-</option>
                    {tnDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </td>
                <td
                  className="border px-1"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  <input
                    value={row.checkpostName}
                    onChange={(e) =>
                      updateRow(row.id, "checkpostName", e.target.value)
                    }
                    placeholder="Checkpost"
                    className="w-full text-xs py-1 px-1 bg-background focus:outline-none"
                  />
                </td>
                {(
                  [
                    "s1Si",
                    "s1Ors",
                    "s2Si",
                    "s2Ors",
                    "s3Si",
                    "s3Ors",
                    "cases",
                    "accused",
                    "paCase",
                    "paLtrs",
                    "paAcc",
                    "piCase",
                    "piBtls",
                    "apIdCase",
                    "apIdLtrs",
                    "apIdAcc",
                    "apImflCase",
                    "apImflLtrs",
                    "kiCase",
                    "kiLtrs",
                    "tiCase",
                    "tiBtls",
                    "gtCase",
                    "gtNos",
                    "tdCase",
                    "tdLtrs",
                    "v2w",
                    "v3w",
                    "v4w",
                    "v6w",
                  ] as (keyof CheckpostRow)[]
                ).map((f) => (
                  <td
                    key={f}
                    className="border"
                    style={{ borderColor: "hsl(var(--border))" }}
                  >
                    <input
                      type="number"
                      min="0"
                      value={row[f] as string}
                      onChange={(e) => updateRow(row.id, f, e.target.value)}
                      className={cellCls}
                    />
                  </td>
                ))}
              </tr>
            ))}
            {/* Totals row */}
            <tr className="font-semibold bg-muted/30">
              <td
                colSpan={3}
                className="border px-3 py-2 text-right text-xs"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                Total
              </td>
              {(
                [
                  "s1Si",
                  "s1Ors",
                  "s2Si",
                  "s2Ors",
                  "s3Si",
                  "s3Ors",
                  "cases",
                  "accused",
                  "paCase",
                  "paLtrs",
                  "paAcc",
                  "piCase",
                  "piBtls",
                  "apIdCase",
                  "apIdLtrs",
                  "apIdAcc",
                  "apImflCase",
                  "apImflLtrs",
                  "kiCase",
                  "kiLtrs",
                  "tiCase",
                  "tiBtls",
                  "gtCase",
                  "gtNos",
                  "tdCase",
                  "tdLtrs",
                  "v2w",
                  "v3w",
                  "v4w",
                  "v6w",
                ] as (keyof CheckpostRow)[]
              ).map((f) => (
                <td
                  key={f}
                  className="border text-center text-xs py-2"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  {sumField(f) || 0}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between">
        {/* <button
          onClick={addRow}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border hover:bg-muted transition-colors"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <Plus className="h-4 w-4" /> Add Checkpost Row
        </button> */}
        {/* <button
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          <Save className="h-4 w-4" /> Save All Entries
        </button> */}
      </div>
    </div>
  );
}

const topTabs = ["PEW", "NDPS", "NIA/Crime", "Local", "DSR Cases", "Checkpost"];

const dsrSubTabs = [
  "PEW",
  "NDPS",
  "NIA/Crime",
  "Local",
  "Consolidated",
];

const checkpostSubTabs = ["Checkpost Monitoring", "Checkpost Seizure", "Attendance"];

const ndpsSubTabs = ["PEW", "NIA/Crime", "Local", "Consolidated"];

const ndpsLocalData = [
  { id: "L-NDPS-001", date: "2026-03-23", district: "Chennai", location: "Koyambedu", substance: "Ganja", quantity: "5.2 Kg", accused: 2, status: "Remanded", crimeType: "Ganja" },
  { id: "L-NDPS-002", date: "2026-03-22", district: "Madurai", location: "Bus Stand", substance: "Meth", quantity: "50g", accused: 1, status: "Enquiry", crimeType: "Meth" },
  { id: "L-NDPS-003", date: "2026-03-21", district: "Coimbatore", location: "Railway Station", substance: "Heroin", quantity: "20g", accused: 1, status: "Remanded", crimeType: "Heroin" },
  { id: "L-NDPS-004", date: "2026-03-20", district: "Salem", location: "Market Area", substance: "Tablets", quantity: "500 Nos", accused: 3, status: "Remanded", crimeType: "Tablets" },
  { id: "L-NDPS-005", date: "2026-03-19", district: "Trichy", location: "NH-45", substance: "Ganja", quantity: "12 Kg", accused: 2, status: "Enquiry", crimeType: "Ganja" },
  { id: "L-NDPS-006", date: "2026-03-18", district: "Vellore", location: "Katpadi", substance: "Cocaine", quantity: "15g", accused: 1, status: "Remanded", crimeType: "Cocaine" },
  { id: "L-NDPS-007", date: "2026-03-17", district: "Erode", location: "Peralai", substance: "Ganja", quantity: "3.5 Kg", accused: 1, status: "Remanded", crimeType: "Ganja" },
  { id: "L-NDPS-008", date: "2026-03-16", district: "Tirunelveli", location: "Town Area", substance: "Meth", quantity: "30g", accused: 2, status: "Enquiry", crimeType: "Meth" },
  { id: "L-NDPS-009", date: "2026-03-15", district: "Thanjavur", location: "Bus Route", substance: "Opium", quantity: "100g", accused: 1, status: "Remanded", crimeType: "Opium" },
  { id: "L-NDPS-010", date: "2026-03-14", district: "Salem", location: "Attur", substance: "Ganja", quantity: "8 Kg", accused: 2, status: "Remanded", crimeType: "Ganja" },
];

const ndpsPewData = [
  { id: "P-NDPS-001", date: "2026-03-23", district: "Chennai Zone", location: "Inter-zone Border", substance: "Ganja", quantity: "25 Kg", accused: 4, status: "Remanded", crimeType: "Ganja" },
  { id: "P-NDPS-002", date: "2026-03-22", district: "Madurai Zone", location: "Highway", substance: "Hashish Oil", quantity: "200ml", accused: 2, status: "Remanded", crimeType: "Hashish" },
  { id: "P-NDPS-003", date: "2026-03-21", district: "Chennai Zone", location: "Storage Unit", substance: "Meth", quantity: "150g", accused: 3, status: "Enquiry", crimeType: "Meth" },
  { id: "P-NDPS-004", date: "2026-03-20", district: "Madurai Zone", location: "Distillery Near Ganja Patch", substance: "Ganja", quantity: "50 Kg", accused: 6, status: "Remanded", crimeType: "Ganja" },
  { id: "P-NDPS-005", date: "2026-03-19", district: "Chennai Zone", location: "Warehouse", substance: "Tablets", quantity: "2000 Nos", accused: 2, status: "Remanded", crimeType: "Tablets" },
  { id: "P-NDPS-006", date: "2026-03-18", district: "Madurai Zone", location: "Forest Range", substance: "Ganja", quantity: "18 Kg", accused: 2, status: "Remanded", crimeType: "Ganja" },
  { id: "P-NDPS-007", date: "2026-03-17", district: "Chennai Zone", location: "Express Way", substance: "Meth", quantity: "80g", accused: 1, status: "Enquiry", crimeType: "Meth" },
  { id: "P-NDPS-008", date: "2026-03-16", district: "Madurai Zone", location: "Border Check", substance: "Opium", quantity: "250g", accused: 1, status: "Remanded", crimeType: "Opium" },
  { id: "P-NDPS-009", date: "2026-03-15", district: "Chennai Zone", location: "Docks Area", substance: "Heroin", quantity: "45g", accused: 2, status: "Remanded", crimeType: "Heroin" },
  { id: "P-NDPS-010", date: "2026-03-14", district: "Madurai Zone", location: "Bus Station", substance: "Ganja", quantity: "10 Kg", accused: 2, status: "Remanded", crimeType: "Ganja" },
];

const ndpsNiaData = [
  { id: "N-NDPS-001", date: "2026-03-23", district: "Chennai", location: "International Terminal", substance: "Heroin", quantity: "2.5 Kg", accused: 1, status: "Remanded", crimeType: "Heroin" },
  { id: "N-NDPS-002", date: "2026-03-21", district: "Coimbatore", location: "Safe House", substance: "Meth", quantity: "1.2 Kg", accused: 3, status: "Remanded", crimeType: "Meth" },
  { id: "N-NDPS-003", date: "2026-03-18", district: "Madurai", location: "Logistics Center", substance: "Cocaine", quantity: "800g", accused: 2, status: "Enquiry", crimeType: "Cocaine" },
  { id: "N-NDPS-004", date: "2026-03-15", district: "Chennai", location: "Courier Hub", substance: "LSD Papers", quantity: "500 Nos", accused: 1, status: "Remanded", crimeType: "LSD" },
  { id: "N-NDPS-005", date: "2026-03-12", district: "Trichy", location: "International Airport", substance: "Meth", quantity: "2.8 Kg", accused: 2, status: "Remanded", crimeType: "Meth" },
  { id: "N-NDPS-006", date: "2026-03-09", district: "Chennai", location: "Port Trust", substance: "Heroin", quantity: "5 Kg", accused: 4, status: "Remanded", crimeType: "Heroin" },
  { id: "N-NDPS-007", date: "2026-03-05", district: "Salem", location: "Pharma Unit", substance: "Precursor Chemicals", quantity: "20 Litres", accused: 3, status: "Enquiry", crimeType: "Chemicals" },
  { id: "N-NDPS-008", date: "2026-03-01", district: "Coimbatore", location: "Industrial Estate", substance: "MDMA", quantity: "450g", accused: 2, status: "Remanded", crimeType: "MDMA" },
  { id: "N-NDPS-009", date: "2026-02-25", district: "Chennai", location: "Transit Point", substance: "Ganja (Imported)", quantity: "1.5 Kg", accused: 1, status: "Remanded", crimeType: "Ganja" },
  { id: "N-NDPS-010", date: "2026-02-20", district: "Madurai", location: "Raid Facility", substance: "Crystal Meth", quantity: "600g", accused: 2, status: "Remanded", crimeType: "Meth" },
];

const tableColumns = [
  "Case ID",
  "Date",
  "District",
  "Unit",
  "Checkpost",
  "Offence Type",
  "Contraband",
  "Status",
];

const districts = [
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
  "Sivaganga",
  "Karur",
  "Namakkal",
];

export function DSRPage() {
  const [topTab, setTopTab] = useState("DSR Cases");
  const [activeTab, setActiveTab] = useState("PEW");
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [showPEWEntry, setShowPEWEntry] = useState(false);
  const [showNDPSEntry, setShowNDPSEntry] = useState(false);
  const [showCheckpointEntry, setShowCheckpointEntry] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showNIACrimeEntry, setShowNIACrimeEntry] = useState(false);
  const [showLocalEntry, setShowLocalEntry] = useState(false);

  // NDPS Specific State
  const [ndpsSubTab, setNdpsSubTab] = useState("PEW");
  const [ndpsFilters, setNdpsFilters] = useState({
    fromDate: "",
    toDate: "",
    crimeType: "",
    range: "" // Weekly, Monthly
  });

  const handleNDPSRange = (r: "Weekly" | "Monthly") => {
    const now = new Date();
    const to = now.toISOString().split("T")[0];
    const from = new Date();
    if (r === "Weekly") from.setDate(now.getDate() - 7);
    else from.setDate(now.getDate() - 30);
    const fromStr = from.toISOString().split("T")[0];

    setNdpsFilters(prev => ({
      ...prev,
      range: prev.range === r ? "" : r,
      fromDate: prev.range === r ? "" : fromStr,
      toDate: prev.range === r ? "" : to
    }));
  };

  // If showing Attendance or Checkpoint Entry inline (full-page style within content area)
  if (showAttendance) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <CheckpointAttendancePage onBack={() => setShowAttendance(false)} />
      </div>
    );
  }

  if (showCheckpointEntry) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <AddCheckpointEntryForm onClose={() => setShowCheckpointEntry(false)} />
      </div>
    );
  }



  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Daily Situation Report
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage case entries and daily reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-muted"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <FileText className="h-4 w-4" /> Export PDF
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-muted"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <FileSpreadsheet className="h-4 w-4" /> Export Excel
          </button>
          {topTab === "DSR Cases" && (
            <button
              onClick={() => setShowNewEntry(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-4 w-4" /> New Entry
            </button>
          )}
        </div>
      </div>

      {/* Top-level Tabs: DSR Cases | PEW | NDPS */}
      <div
        className="flex items-center gap-1 border-b mb-6"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        {topTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setTopTab(tab);
              if (tab === "DSR Cases") setActiveTab("PEW");
              if (tab === "Checkpost") setActiveTab("Checkpost Monitoring");
            }}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors relative ${topTab === tab
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {tab}
            {topTab === tab && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                style={{ background: "hsl(var(--primary))" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* DSR Cases Tab Content */}
      {topTab === "DSR Cases" && (
        <>
          {/* Search & Filters */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cases..."
                className="w-full rounded-lg border pl-10 pr-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="rounded-lg border px-4 py-2.5 text-sm bg-background min-w-[140px] focus:outline-none"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">District</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border px-4 py-2.5 text-sm bg-background min-w-[120px] focus:outline-none"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Sub-Tabs */}
          <div
            className="flex items-center gap-1 border-b mb-0"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            {dsrSubTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === tab
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t"
                    style={{ background: "hsl(var(--primary))" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            className="rounded-b-lg border border-t-0 overflow-hidden"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="p-4">
              {activeTab === "PEW" && (
                <div className="space-y-4">
                  <DSRSeizuresForm
                    title="PEW Details"
                    unitLabel="PEW Unit Name"
                    initialRows={[
                      {
                        ...emptyPEWRow(1),
                        district: "Chennai", unitName: "Chennai North PEW Unit-I",
                        s1Si: "1", s1Ors: "4", s2Si: "1", s2Ors: "3", s3Si: "0", s3Ors: "4",
                        cases: "12", accused: "15",
                        "Pondy Arrack_case": "2", "Pondy Arrack_ltrs": "100",
                        "AP ID Arrack_case": "1", "AP ID Arrack_ltrs": "50",
                        "TN IMFL_case": "3", "TN IMFL_ltrs": "45"
                      },
                      {
                        ...emptyPEWRow(2),
                        district: "Madurai", unitName: "Madurai South PEW Unit-II",
                        s1Si: "1", s1Ors: "3", s2Si: "0", s2Ors: "4", s3Si: "1", s3Ors: "3",
                        cases: "8", accused: "10",
                        "Pondy Arrack_case": "1", "Pondy Arrack_ltrs": "45",
                        "AP ID Arrack_case": "2", "AP ID Arrack_ltrs": "120",
                        "Rectified Spirit_case": "1", "Rectified Spirit_ltrs": "50"
                      },
                      emptyPEWRow(3)
                    ]}
                    onAddEntry={() => setShowPEWEntry(true)}
                    buttonLabel="Add PEW Entry"
                  />
                </div>
              )}
              {activeTab === "NDPS" && (
                <div className="space-y-4">
                  <DSRSeizuresForm
                    title="NDPS Details"
                    unitLabel="Unit Name"
                    categories={NDPS_DRUG_CATEGORIES}
                    qtyLabel="Qty"
                    initialRows={[
                      {
                        ...emptyNDPSRow(1),
                        district: "Chennai", unitName: "NIB Unit-I",
                        s1Si: "1", s1Ors: "5", s2Si: "1", s2Ors: "5", s3Si: "1", s3Ors: "5",
                        cases: "3", accused: "5",
                        "Ganja_case": "2", "Ganja_qty": "50",
                        "Methamphetamine_case": "1", "Methamphetamine_qty": "0.5",
                      },
                      emptyNDPSRow(2)
                    ]}
                    onAddEntry={() => setShowNDPSEntry(true)}
                    buttonLabel="Add NDPS Entry"
                  />
                </div>
              )}
              {activeTab === "NIA/Crime" && (
                <div className="space-y-4">
                  <DSRSeizuresForm
                    title="NIA/Crime Details"
                    unitLabel="Unit Name"
                    initialRows={[
                      {
                        ...emptyPEWRow(1),
                        district: "Chennai", unitName: "NIA Unit-I",
                        s1Si: "1", s1Ors: "2", s2Si: "1", s2Ors: "2", s3Si: "0", s3Ors: "2",
                        cases: "5", accused: "8",
                        "Pondy Arrack_case": "1", "Pondy Arrack_ltrs": "20",
                      },
                      emptyPEWRow(2)
                    ]}
                    onAddEntry={() => setShowNIACrimeEntry(true)}
                    buttonLabel="Add NIA/Crime Entry"
                  />
                </div>
              )}
              {activeTab === "Local" && (
                <div className="space-y-4">
                  <DSRSeizuresForm
                    title="Local Details"
                    unitLabel="Station Name"
                    initialRows={[
                      {
                        ...emptyPEWRow(1),
                        district: "Chennai", unitName: "Teynampet PS",
                        s1Si: "1", s1Ors: "10", s2Si: "1", s2Ors: "10", s3Si: "1", s3Ors: "10",
                        cases: "15", accused: "12",
                        "TN IMFL_case": "5", "TN IMFL_ltrs": "25"
                      },
                      emptyPEWRow(2)
                    ]}
                    onAddEntry={() => setShowLocalEntry(true)}
                    buttonLabel="Add Local Entry"
                  />
                </div>
              )}
              {activeTab === "Consolidated" && (
                <ConsolidatedDSRSection />
              )}
            </div>
          </div>
        </>
      )}

      {/* PEW Tab Content */}
      {topTab === "PEW" && (
        <>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <FileText className="h-4 w-4" />
                PEW Details
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Detailed shift-wise personnel and seizure records
              </p>
            </div>
            <button
              onClick={() => setShowPEWEntry(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-4 w-4" /> Add PEW Entry
            </button>
          </div>
          <DSRSummaryReport
            module="PEW"
            initialData={{
              zone: { zone: "Chennai Zor", district: "", value: "0", cases: "45", accused: "52", remand: "40" },
              liquor: PEW_LIQUOR_WITH_UNITS.map(item => ({
                ...item,
                cases: item.name === "Rectified Spirit" ? "12" : item.name === "Pondy Arrack" ? "8" : item.name === "TN IMFL" ? "15" : "0",
                quantity: item.name === "Rectified Spirit" ? "600" : item.name === "Pondy Arrack" ? "400" : item.name === "TN IMFL" ? "180" : "0",
                accused: item.name === "Rectified Spirit" ? "10" : item.name === "Pondy Arrack" ? "6" : item.name === "TN IMFL" ? "12" : "0",
              })),
              vehicles: { w2: "24", w3: "2", w4: "4", w6: "1" }
            }}
          />
        </>
      )}

      {/* NIA/Crime Tab Content */}
      {topTab === "NIA/Crime" && (
        <>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <FileText className="h-4 w-4" />
                NIA/Crime Details
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Detailed shift-wise personnel and seizure records
              </p>
            </div>
            <button
              onClick={() => setShowNIACrimeEntry(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-4 w-4" /> Add NIA/Crime Entry
            </button>
          </div>
          <DSRSummaryReport
            module="NIA/Crime"
            title="NIA/Crime - Zone & Case Summary"
            seizureTitle="Seizure Details (Alcohol & Drugs)"
            initialData={{
              zone: { zone: "Chennai Zor", district: "", value: "0", cases: "12", accused: "18", remand: "15" },
              liquor: PEW_LIQUOR_WITH_UNITS.map(item => ({
                ...item,
                cases: item.name === "Methyl Alcohol" ? "2" : item.name === "Spurious Liquor" ? "4" : "0",
                quantity: item.name === "Methyl Alcohol" ? "100" : item.name === "Spurious Liquor" ? "48" : "0",
                accused: item.name === "Methyl Alcohol" ? "2" : item.name === "Spurious Liquor" ? "4" : "0",
              })),
              vehicles: { w2: "8", w3: "1", w4: "2", w6: "0" }
            }}
          />
        </>
      )}

      {/* Local Tab Content */}
      {topTab === "Local" && (
        <>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Local Details
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Detailed shift-wise personnel and seizure records
              </p>
            </div>
            <button
              onClick={() => setShowLocalEntry(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-4 w-4" /> Add Local Entry
            </button>
          </div>
          <DSRSummaryReport
            module="Local"
            initialData={{
              zone: { zone: "Madurai Zor", district: "", value: "0", cases: "35", accused: "42", remand: "30" },
              liquor: PEW_LIQUOR_WITH_UNITS.map(item => ({
                ...item,
                cases: item.name === "Rectified Spirit" ? "10" : item.name === "Pondy Arrack" ? "6" : item.name === "ID Arrack" ? "4" : "0",
                quantity: item.name === "Rectified Spirit" ? "500" : item.name === "Pondy Arrack" ? "300" : item.name === "ID Arrack" ? "200" : "0",
                accused: item.name === "Rectified Spirit" ? "8" : item.name === "Pondy Arrack" ? "4" : item.name === "ID Arrack" ? "3" : "0",
              })),
              vehicles: { w2: "18", w3: "3", w4: "2", w6: "0" }
            }}
          />
        </>
      )}

      {/* NDPS Tab Content */}
      {topTab === "NDPS" && (
        <div className="flex-1 flex flex-col">
          {/* NDPS Sub-tabs */}
          <div className="flex items-center gap-1 border-b mb-6" style={{ borderColor: "hsl(var(--border))" }}>
            {ndpsSubTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setNdpsSubTab(tab)}
                className={`px-5 py-2.5 text-xs font-bold transition-all relative ${ndpsSubTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
                {ndpsSubTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* NDPS Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {ndpsSubTab !== "Consolidated" ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-foreground">
                    NDPS Cases — {ndpsSubTab}
                  </h3>
                  <button
                    onClick={() => setShowNDPSEntry(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    <Plus className="h-4 w-4" /> Create {ndpsSubTab} Entry
                  </button>
                </div>
                <div className="rounded-lg border overflow-hidden flex-1 overflow-y-auto" style={{ borderColor: "hsl(var(--border))" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/40" style={{ borderColor: "hsl(var(--border))" }}>
                        {["ID", "Date", "District", "Location", "Substance", "Qty", "Accused", "Status"].map(h => (
                          <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(ndpsSubTab === "Local" ? ndpsLocalData : ndpsSubTab === "PEW" ? ndpsPewData : ndpsNiaData).map((r, i) => (
                        <tr key={r.id} className={`border-b transition-colors hover:bg-muted/30 ${i % 2 === 0 ? "" : "bg-muted/10"}`} style={{ borderColor: "hsl(var(--border))" }}>
                          <td className="py-3 px-4 font-mono text-xs text-primary">{r.id}</td>
                          <td className="py-3 px-4 text-xs">{r.date}</td>
                          <td className="py-3 px-4 text-xs font-medium">{r.district}</td>
                          <td className="py-3 px-4 text-xs text-muted-foreground">{r.location}</td>
                          <td className="py-3 px-4 text-xs font-semibold">{r.substance}</td>
                          <td className="py-3 px-4 text-xs">{r.quantity}</td>
                          <td className="py-3 px-4 text-xs">{r.accused}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div className="flex items-center gap-3 flex-wrap p-4 rounded-xl border bg-card/50" style={{ borderColor: "hsl(var(--border))" }}>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-muted-foreground">From</label>
                    <input type="date" value={ndpsFilters.fromDate} onChange={e => setNdpsFilters(prev => ({ ...prev, fromDate: e.target.value }))} className="px-3 py-1.5 rounded-lg border text-xs bg-background" style={{ borderColor: "hsl(var(--border))" }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-muted-foreground">To</label>
                    <input type="date" value={ndpsFilters.toDate} onChange={e => setNdpsFilters(prev => ({ ...prev, toDate: e.target.value }))} className="px-3 py-1.5 rounded-lg border text-xs bg-background" style={{ borderColor: "hsl(var(--border))" }} />
                  </div>
                  <select
                    value={ndpsFilters.crimeType}
                    onChange={e => setNdpsFilters(prev => ({ ...prev, crimeType: e.target.value }))}
                    className="px-3 py-1.5 rounded-lg border text-xs bg-background focus:outline-none"
                    style={{ borderColor: "hsl(var(--border))" }}
                  >
                    <option value="">All Crimes</option>
                    <option value="Ganja">Ganja</option>
                    <option value="Meth">Meth</option>
                    <option value="Heroin">Heroin</option>
                    <option value="Tablets">Tablets</option>
                  </select>
                  <div className="flex items-center gap-1 p-1 rounded-lg border bg-muted/40" style={{ borderColor: "hsl(var(--border))" }}>
                    {["Weekly", "Monthly"].map(r => (
                      <button
                        key={r}
                        onClick={() => handleNDPSRange(r as any)}
                        className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${ndpsFilters.range === r ? "bg-primary text-white shadow" : "text-muted-foreground hover:bg-muted"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold bg-primary text-white ml-auto">
                    <Search className="h-3 w-3" /> Filter Results
                  </button>
                </div>

                <div className="rounded-lg border overflow-hidden flex-1 overflow-y-auto" style={{ borderColor: "hsl(var(--border))" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/40" style={{ borderColor: "hsl(var(--border))" }}>
                        {["Source", "ID", "Date", "District", "Substance", "Qty", "Accused", "Status"].map(h => (
                          <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ...ndpsLocalData.map(d => ({ ...d, source: "Local" })),
                        ...ndpsPewData.map(d => ({ ...d, source: "PEW" })),
                        ...ndpsNiaData.map(d => ({ ...d, source: "NIA/Crime" }))
                      ]
                        .filter(r => {
                          if (ndpsFilters.crimeType && r.crimeType !== ndpsFilters.crimeType) return false;
                          if (ndpsFilters.fromDate && r.date < ndpsFilters.fromDate) return false;
                          if (ndpsFilters.toDate && r.date > ndpsFilters.toDate) return false;
                          return true;
                        })
                        .map((r, i) => (
                          <tr key={r.id} className={`border-b transition-colors hover:bg-muted/30 ${i % 2 === 0 ? "" : "bg-muted/10"}`} style={{ borderColor: "hsl(var(--border))" }}>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${r.source === 'Local' ? 'bg-blue-100 text-blue-700' : r.source === 'PEW' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                                {r.source}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono text-xs text-primary">{r.id}</td>
                            <td className="py-3 px-4 text-xs">{r.date}</td>
                            <td className="py-3 px-4 text-xs font-medium">{r.district}</td>
                            <td className="py-3 px-4 text-xs font-semibold">{r.substance}</td>
                            <td className="py-3 px-4 text-xs">{r.quantity}</td>
                            <td className="py-3 px-4 text-xs">{r.accused}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Checkpost Tab Content */}
      {topTab === "Checkpost" && (
        <div className="flex-1 flex flex-col">
          {/* Checkpost Sub-tabs */}
          <div className="flex items-center gap-1 border-b mb-6" style={{ borderColor: "hsl(var(--border))" }}>
            {checkpostSubTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-xs font-bold transition-all relative ${activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            {activeTab === "Checkpost Monitoring" && (
              <div className="flex-1 overflow-y-auto">
                <CheckpostPage />
              </div>
            )}
            {activeTab === "Checkpost Seizure" && (
              <CheckpostSeizuresForm
                onAttendance={() => setActiveTab("Attendance")}
                onAddEntry={() => setShowCheckpointEntry?.(true)}
              />
            )}
            {activeTab === "Attendance" && (
              <div className="flex-1 overflow-y-auto">
                <CheckpointAttendancePage onBack={() => setActiveTab("Checkpost Seizure")} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Entry Dialog */}
      <Dialog open={showNewEntry} onOpenChange={setShowNewEntry}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              New DSR Case Entry
            </DialogTitle>
          </DialogHeader>
          <DSRNewEntryForm onClose={() => setShowNewEntry(false)} />
        </DialogContent>
      </Dialog>

      {/* PEW Entry Dialog */}
      <Dialog open={showPEWEntry} onOpenChange={setShowPEWEntry}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DSRPEWEntryForm onClose={() => setShowPEWEntry(false)} />
        </DialogContent>
      </Dialog>

      {/* NDPS Entry Dialog */}
      <Dialog open={showNDPSEntry} onOpenChange={setShowNDPSEntry}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DSRNDPSEntryForm onClose={() => setShowNDPSEntry(false)} />
        </DialogContent>
      </Dialog>

      {/* NIA/Crime Entry Dialog */}
      <Dialog open={showNIACrimeEntry} onOpenChange={setShowNIACrimeEntry}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DSRNIACrimeEntryForm onClose={() => setShowNIACrimeEntry(false)} />
        </DialogContent>
      </Dialog>

      {/* Local Entry Dialog */}
      <Dialog open={showLocalEntry} onOpenChange={setShowLocalEntry}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DSRLocalEntryForm onClose={() => setShowLocalEntry(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
// ── Consolidated DSR Section ──────────────────────────────────────────────────
function ConsolidatedDSRSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-foreground">Consolidated DSR Records</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded">
            Full Audit View
          </span>
        </div>
      </div>
      <ConsolidatedDetailedTable />
    </div>
  );
}

function ConsolidatedDetailedTable() {
  const today = new Date().toISOString().split("T")[0];
  const [reportDate, setReportDate] = useState(today);
  const [filterMode, setFilterMode] = useState<"daily" | "weekly" | "monthly" | "custom">("daily");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedModule, setSelectedModule] = useState<string>("All");

  const allCategories = [...PEW_LIQUOR_CATEGORIES, ...NDPS_DRUG_CATEGORIES];

  const mergedData = [
    {
      date: today,
      module: "PEW",
      district: "Chennai", unitName: "Chennai North PEW Unit-I",
      s1Si: "1", s1Ors: "4", s2Si: "1", s2Ors: "3", s3Si: "0", s3Ors: "4",
      cases: "12", accused: "15",
      "Pondy Arrack_case": "2", "Pondy Arrack_qty": "100",
      "AP ID Arrack_case": "1", "AP ID Arrack_qty": "50",
      "TN IMFL_case": "3", "TN IMFL_qty": "45"
    },
    {
      date: today,
      module: "PEW",
      district: "Madurai", unitName: "Madurai South PEW Unit-II",
      s1Si: "1", s1Ors: "3", s2Si: "0", s2Ors: "4", s3Si: "1", s3Ors: "3",
      cases: "8", accused: "10",
      "Pondy Arrack_case": "1", "Pondy Arrack_qty": "45",
      "AP ID Arrack_case": "2", "AP ID Arrack_qty": "120",
      "Rectified Spirit_case": "1", "Rectified Spirit_qty": "50"
    },
    {
      date: today,
      module: "NDPS",
      district: "Chennai", unitName: "NIB Unit-I",
      s1Si: "1", s1Ors: "5", s2Si: "1", s2Ors: "5", s3Si: "1", s3Ors: "5",
      cases: "3", accused: "5",
      "Ganja_case": "2", "Ganja_qty": "50",
      "Methamphetamine_case": "1", "Methamphetamine_qty": "0.5",
    },
    {
      date: today,
      module: "NIA/Crime",
      district: "Chennai", unitName: "NIA Unit-I",
      s1Si: "1", s1Ors: "2", s2Si: "1", s2Ors: "2", s3Si: "0", s3Ors: "2",
      cases: "5", accused: "8",
      "Pondy Arrack_case": "1", "Pondy Arrack_qty": "20",
    },
    {
      date: today,
      module: "Local",
      district: "Chennai", unitName: "Teynampet PS",
      s1Si: "1", s1Ors: "10", s2Si: "1", s2Ors: "10", s3Si: "1", s3Ors: "10",
      cases: "15", accused: "12",
      "TN IMFL_case": "5", "TN IMFL_qty": "25"
    }
  ];

  const applyWeekly = () => {
    const d = new Date();
    const dayOfWeek = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((dayOfWeek + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    setFromDate(monday.toISOString().split("T")[0]);
    setToDate(sunday.toISOString().split("T")[0]);
    setFilterMode("weekly");
  };

  const applyMonthly = () => {
    const d = new Date();
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split("T")[0];
    const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split("T")[0];
    setFromDate(firstDay);
    setToDate(lastDay);
    setFilterMode("monthly");
  };

  const filteredData = mergedData.filter(row => {
    const moduleMatch = selectedModule === "All" || row.module === selectedModule;
    let dateMatch = true;
    if (filterMode === "daily") dateMatch = row.date === reportDate;
    else if (fromDate && toDate) {
      dateMatch = row.date >= fromDate && row.date <= toDate;
    }
    return moduleMatch && dateMatch;
  });

  const thCls = "border px-2 py-2 text-[10px] font-bold text-muted-foreground bg-muted/30 uppercase tracking-tight text-center whitespace-nowrap";
  const tdCls = "border px-2 py-2 text-[10px] text-center whitespace-nowrap";

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border bg-card/50 shadow-sm" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block ml-1">
            Module Type
          </label>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="rounded-lg border px-3 py-2 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <option value="All">All Modules</option>
            <option value="PEW">PEW</option>
            <option value="NDPS">NDPS</option>
            <option value="NIA/Crime">NIA/Crime</option>
            <option value="Local">Local</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block ml-1">
            Report Date
          </label>
          <input
            type="date"
            value={reportDate}
            onChange={(e) => { setReportDate(e.target.value); setFilterMode("daily"); }}
            className="rounded-lg border px-3 py-2 text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
            style={{ borderColor: "hsl(var(--border))" }}
          />
        </div>

        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block ml-1">
            Range Filter
          </label>
          <div className="flex items-center gap-2">
            <div className="flex p-0.5 rounded-lg border bg-muted/40" style={{ borderColor: "hsl(var(--border))" }}>
              <button
                onClick={applyWeekly}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${filterMode === "weekly" ? "bg-primary text-white shadow" : "text-muted-foreground hover:bg-muted"}`}
              >
                Weekly
              </button>
              <button
                onClick={applyMonthly}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${filterMode === "monthly" ? "bg-primary text-white shadow" : "text-muted-foreground hover:bg-muted"}`}
              >
                Monthly
              </button>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => { setFromDate(e.target.value); setFilterMode("custom"); }}
                className="w-24 rounded-lg border px-2 py-1.5 text-[10px] bg-background focus:outline-none"
              />
              <span className="text-muted-foreground">-</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => { setToDate(e.target.value); setFilterMode("custom"); }}
                className="w-24 rounded-lg border px-2 py-1.5 text-[10px] bg-background focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="px-5 py-3 border-b bg-muted/20 flex items-center justify-between" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-bold text-foreground">Consolidated Detailed Records</h3>
          <div className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded tracking-wide uppercase">
            {selectedModule} records ({filteredData.length})
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={thCls} rowSpan={2}>Module</th>
                <th className={thCls} rowSpan={2}>District</th>
                <th className={thCls} rowSpan={2}>Unit Name</th>
                <th className={thCls} colSpan={2}>Shift 1</th>
                <th className={thCls} colSpan={2}>Shift 2</th>
                <th className={thCls} colSpan={2}>Shift 3</th>
                <th className={thCls} rowSpan={2}>Cases</th>
                <th className={thCls} rowSpan={2}>Acc.</th>
                {allCategories.map(cat => (
                  <th key={cat} className={thCls} colSpan={2}>{cat}</th>
                ))}
              </tr>
              <tr>
                <th className={thCls}>SI</th><th className={thCls}>Ors</th>
                <th className={thCls}>SI</th><th className={thCls}>Ors</th>
                <th className={thCls}>SI</th><th className={thCls}>Ors</th>
                {allCategories.map(cat => (
                  <Fragment key={cat}>
                    <th className={thCls}>Case</th>
                    <th className={thCls}>Qty</th>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i} className="hover:bg-muted/10 transition-colors">
                  <td className="border px-4 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      row.module === 'PEW' ? 'bg-green-100 text-green-700' : 
                      row.module === 'NDPS' ? 'bg-blue-100 text-blue-700' :
                      row.module === 'NIA/Crime' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {row.module}
                    </span>
                  </td>
                  <td className={tdCls}>{row.district}</td>
                  <td className="border px-3 py-2 text-[10px] font-medium text-left">{row.unitName}</td>
                  <td className={tdCls}>{row.s1Si}</td><td className={tdCls}>{row.s1Ors}</td>
                  <td className={tdCls}>{row.s2Si}</td><td className={tdCls}>{row.s2Ors}</td>
                  <td className={tdCls}>{row.s3Si}</td><td className={tdCls}>{row.s3Ors}</td>
                  <td className={tdCls}>{row.cases}</td>
                  <td className={tdCls}>{row.accused}</td>
                  {allCategories.map(cat => (
                    <Fragment key={cat}>
                      <td className={tdCls}>{(row as any)[`${cat}_case`] || "-"}</td>
                      <td className={tdCls}>{(row as any)[`${cat}_qty`] || "-"}</td>
                    </Fragment>
                  ))}
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={11 + allCategories.length * 2} className="py-12 text-center text-muted-foreground italic text-sm">
                    No records found for the selected module and date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
