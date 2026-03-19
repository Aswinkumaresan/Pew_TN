import { useState } from "react";
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
import { AddCheckpointEntryForm } from "./AddCheckpointEntryForm";
import { CheckpointAttendancePage } from "./CheckpointAttendancePage";
import { BLGoondasEntryForm } from "./BLGoondasEntryForm";
import { BandobustEntryForm } from "./BandobustEntryForm";
import { HelplineCallEntryForm } from "./HelplineCallEntryForm";
import { WhatsAppCallEntryForm } from "./WhatsAppCallEntryForm";
import { VehicleDisposalEntryForm } from "./VehicleDisposalEntryForm";
import { SolventInspectionEntryForm } from "./SolventInspectionEntryForm";

// ── BL Goondas ────────────────────────────────────────────────────────────────
const goondasData = [
  {
    name: "Raju Bhai",
    alias: "RB",
    district: "Chennai",
    cases: 5,
    lastOffence: "Liquor smuggling",
    status: "Active",
  },
  {
    name: "Srinivas K",
    alias: "Srinu",
    district: "Coimbatore",
    cases: 3,
    lastOffence: "Ganja trafficking",
    status: "Detained",
  },
  {
    name: "Mohammed Ismail",
    alias: "MI",
    district: "Madurai",
    cases: 8,
    lastOffence: "Repeat offender - NDPS",
    status: "Active",
  },
  {
    name: "Venkatesh P",
    alias: "Venky",
    district: "Chennai",
    cases: 2,
    lastOffence: "Solvent misuse",
    status: "Released",
  },
];

const goondasStatusColor: Record<string, string> = {
  Active: "bg-red-500 text-white",
  Detained: "bg-primary text-primary-foreground",
  Released: "bg-muted text-muted-foreground",
};

// ── Bandobust ─────────────────────────────────────────────────────────────────
const bandobustData = [
  {
    op: "Op Thunderbolt",
    date: "2026-03-04",
    unit: "Unit A",
    personnel: 12,
    status: "In Progress",
    result: "2 seizures",
  },
  {
    op: "Op Clean Sweep",
    date: "2026-03-03",
    unit: "Unit B",
    personnel: 8,
    status: "Completed",
    result: "5 arrests, 100L liquor",
  },
  {
    op: "Op Night Watch",
    date: "2026-03-02",
    unit: "Unit C",
    personnel: 15,
    status: "Completed",
    result: "3 checkpost intercepts",
  },
];

const bbStatusColor: Record<string, string> = {
  "In Progress": "bg-muted text-muted-foreground",
  Completed: "bg-primary text-primary-foreground",
};

// ── Vehicle Disposal ──────────────────────────────────────────────────────────
const vehicleData = [
  {
    no: "TN 01 AB 1234",
    type: "Truck",
    seized: "2026-02-15",
    caseRef: "CS-2026-045",
    location: "Unit A Yard",
    status: "In Custody",
    disposition: "-",
  },
  {
    no: "TN 09 CD 5678",
    type: "Two-wheeler",
    seized: "2026-01-20",
    caseRef: "CS-2026-021",
    location: "Court Premises",
    status: "Court Order Pending",
    disposition: "-",
  },
  {
    no: "TN 07 EF 9012",
    type: "Auto",
    seized: "2025-12-10",
    caseRef: "CS-2025-198",
    location: "Auction Yard",
    status: "Disposed",
    disposition: "Auctioned",
  },
  {
    no: "TN 05 GH 3456",
    type: "Car",
    seized: "2026-02-28",
    caseRef: "CS-2026-067",
    location: "Unit B Yard",
    status: "In Custody",
    disposition: "-",
  },
];

const vehicleStatusColor: Record<string, string> = {
  "In Custody": "bg-muted text-muted-foreground",
  "Court Order Pending": "border border-border text-foreground",
  Disposed: "bg-primary text-primary-foreground",
};

// ── Solvent Inspections ───────────────────────────────────────────────────────
const solventData = [
  {
    licensee: "ABC Chemicals Ltd",
    licenseNo: "SOL-2025-001",
    type: "Solvent",
    date: "2026-03-03",
    inspector: "SI Ramesh",
    result: "Compliant",
    remarks: "All records in order",
  },
  {
    licensee: "XYZ Industries",
    licenseNo: "MET-2025-045",
    type: "Methanol",
    date: "2026-03-02",
    inspector: "CI Sharma",
    result: "Violation",
    remarks: "Excess stock found, show caus...",
  },
  {
    licensee: "PQR Solutions",
    licenseNo: "SOL-2025-078",
    type: "Solvent",
    date: "2026-03-01",
    inspector: "SI Reddy",
    result: "Compliant",
    remarks: "Minor documentation gaps no...",
  },
];

const solventResultColor: Record<string, string> = {
  Compliant: "bg-primary text-primary-foreground",
  Violation: "bg-red-500 text-white",
};

// ── Helpline / Control Room ───────────────────────────────────────────────────
const helplineData = [
  {
    time: "09:15",
    source: "Helpline",
    caller: "Anonymous",
    type: "Tip-off",
    summary: "Illegal liquor transport on NH-65",
    assigned: "Unit A",
    status: "Actioned",
  },
  {
    time: "10:30",
    source: "Control Room",
    caller: "SI Ramesh",
    type: "Intelligence",
    summary: "Ganja cultivation spotted in fores...",
    assigned: "Unit B",
    status: "Pending",
  },
  {
    time: "11:45",
    source: "Helpline",
    caller: "Public",
    type: "Complaint",
    summary: "Illegal bar operating without lice...",
    assigned: "Unit C",
    status: "Under Review",
  },
  {
    time: "14:00",
    source: "Control Room",
    caller: "DSP Office",
    type: "Directive",
    summary: "Intensify checking on state border",
    assigned: "All Units",
    status: "Actioned",
  },
];

const helplineStatusColor: Record<string, string> = {
  Actioned: "bg-primary text-primary-foreground",
  Pending: "bg-red-500 text-white",
  "Under Review": "bg-muted text-muted-foreground",
};

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
});

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

function CheckpostSeizuresForm({
  onAttendance,
  onAddEntry,
}: {
  onAttendance: () => void;
  onAddEntry: () => void;
}) {
  const today = new Date().toISOString().split("T")[0];
  const [reportDate, setReportDate] = useState(today);
  const [rows, setRows] = useState<CheckpostRow[]>([emptyRow(1)]);

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
      {/* Date + Actions */}
      <div
        className="flex items-end justify-between rounded-lg border p-4"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
            Report Date
          </label>
          <input
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            style={{ borderColor: "hsl(var(--border))" }}
          />
        </div>
        <div className="flex items-center gap-3">
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
          Prohibition Checkpost Performance Details on{" "}
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
              <th className={`${thCls}`} colSpan={3}>
                AP ID Arrack
              </th>
              <th className={`${thCls}`} colSpan={2}>
                AP IMFL
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
                "Ltrs",
                "Acc",
                "Case",
                "Ltrs",
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
                    "apIdCase",
                    "apIdLtrs",
                    "apIdAcc",
                    "apImflCase",
                    "apImflLtrs",
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
                  "apIdCase",
                  "apIdLtrs",
                  "apIdAcc",
                  "apImflCase",
                  "apImflLtrs",
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

const topTabs = ["PEW", "NDPS", "DSR Cases"];

const dsrSubTabs = [
  "Checkpost Seizures",
  // "BL Goondas Entry",
  // "Bandobust Details",
  // "Helpline Calls",
  // "WhatsApp Calls",
  // "Vehicle Disposal",
  // "Solvent Inspections",
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
  const [activeTab, setActiveTab] = useState("Checkpost Seizures");
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [showPEWEntry, setShowPEWEntry] = useState(false);
  const [showNDPSEntry, setShowNDPSEntry] = useState(false);
  const [showCheckpointEntry, setShowCheckpointEntry] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showBLGoondasEntry, setShowBLGoondasEntry] = useState(false);
  const [showBandobustEntry, setShowBandobustEntry] = useState(false);
  const [showHelplineEntry, setShowHelplineEntry] = useState(false);
  const [showWhatsAppEntry, setShowWhatsAppEntry] = useState(false);
  const [showVehicleEntry, setShowVehicleEntry] = useState(false);
  const [showSolventEntry, setShowSolventEntry] = useState(false);

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
            onClick={() => setTopTab(tab)}
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
              {/* ── BL Goondas Entry ── */}
              {activeTab === "BL Goondas Entry" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      BL Goondas Registry
                    </h3>
                  </div>
                  <div className="relative mb-4 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      placeholder="Search by name or alias..."
                      className="w-full rounded-lg border pl-9 pr-4 py-2 text-sm bg-background focus:outline-none"
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="border-b"
                        style={{ borderColor: "hsl(var(--border))" }}
                      >
                        {[
                          "Name",
                          "Alias",
                          "District",
                          "Cases",
                          "Last Offence",
                          "Status",
                        ].map((c) => (
                          <th
                            key={c}
                            className="text-left py-3 px-3 text-muted-foreground font-medium text-xs"
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {goondasData.map((r) => (
                        <tr
                          key={r.name}
                          className="border-b hover:bg-muted/30 transition-colors"
                          style={{ borderColor: "hsl(var(--border))" }}
                        >
                          <td className="py-3 px-3 font-semibold">{r.name}</td>
                          <td className="py-3 px-3 text-muted-foreground">
                            {r.alias}
                          </td>
                          <td className="py-3 px-3">{r.district}</td>
                          <td className="py-3 px-3">{r.cases}</td>
                          <td className="py-3 px-3">{r.lastOffence}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${goondasStatusColor[r.status]}`}
                            >
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {/* ── Bandobust Details ── */}
              {activeTab === "Bandobust Details" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      Bandobust Details
                    </h3>
                  </div>
                  <div
                    className="rounded-lg border overflow-hidden"
                    style={{ borderColor: "hsl(var(--border))" }}
                  >
                    <div
                      className="px-4 py-3 border-b text-sm font-semibold text-foreground"
                      style={{ borderColor: "hsl(var(--border))" }}
                    >
                      Operations Log
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          className="border-b"
                          style={{ borderColor: "hsl(var(--border))" }}
                        >
                          {[
                            "Operation",
                            "Date",
                            "Unit",
                            "Personnel",
                            "Status",
                            "Result",
                          ].map((c) => (
                            <th
                              key={c}
                              className="text-left py-3 px-4 text-muted-foreground font-medium text-xs"
                            >
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bandobustData.map((r) => (
                          <tr
                            key={r.op}
                            className="border-b hover:bg-muted/30 transition-colors"
                            style={{ borderColor: "hsl(var(--border))" }}
                          >
                            <td className="py-3 px-4 font-semibold">{r.op}</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {r.date}
                            </td>
                            <td
                              className="py-3 px-4"
                              style={{ color: "hsl(var(--primary))" }}
                            >
                              {r.unit}
                            </td>
                            <td className="py-3 px-4">{r.personnel}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${bbStatusColor[r.status]}`}
                              >
                                {r.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {r.result}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* ── Vehicle Disposal ── */}
              {activeTab === "Vehicle Disposal" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      Vehicle Disposal Tracking
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[
                      {
                        label: "Total Seized",
                        value: vehicleData.length,
                        color: "hsl(var(--primary))",
                      },
                      {
                        label: "In Custody",
                        value: vehicleData.filter(
                          (v) => v.status === "In Custody",
                        ).length,
                        color: "hsl(var(--risk-medium))",
                      },
                      {
                        label: "Disposed",
                        value: vehicleData.filter(
                          (v) => v.status === "Disposed",
                        ).length,
                        color: "hsl(var(--risk-low))",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg border p-4 text-center"
                        style={{ borderColor: "hsl(var(--border))" }}
                      >
                        <p
                          className="text-2xl font-bold"
                          style={{ color: s.color }}
                        >
                          {s.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="border-b"
                        style={{ borderColor: "hsl(var(--border))" }}
                      >
                        {[
                          "Vehicle No.",
                          "Type",
                          "Seized",
                          "Case Ref",
                          "Location",
                          "Status",
                          "Disposition",
                        ].map((c) => (
                          <th
                            key={c}
                            className="text-left py-3 px-3 text-muted-foreground font-medium text-xs"
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleData.map((r) => (
                        <tr
                          key={r.no}
                          className="border-b hover:bg-muted/30 transition-colors"
                          style={{ borderColor: "hsl(var(--border))" }}
                        >
                          <td className="py-3 px-3 font-mono text-xs">
                            {r.no}
                          </td>
                          <td className="py-3 px-3">{r.type}</td>
                          <td className="py-3 px-3 text-muted-foreground">
                            {r.seized}
                          </td>
                          <td className="py-3 px-3 font-mono text-xs">
                            {r.caseRef}
                          </td>
                          <td className="py-3 px-3">{r.location}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${vehicleStatusColor[r.status]}`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">
                            {r.disposition}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {/* ── Solvent Inspections ── */}
              {activeTab === "Solvent Inspections" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      Solvent/Methanol License Inspection
                    </h3>
                  </div>
                  <div
                    className="rounded-lg border overflow-hidden"
                    style={{ borderColor: "hsl(var(--border))" }}
                  >
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          className="border-b"
                          style={{ borderColor: "hsl(var(--border))" }}
                        >
                          {[
                            "Licensee",
                            "License No.",
                            "Type",
                            "Date",
                            "Inspector",
                            "Result",
                            "Remarks",
                          ].map((c) => (
                            <th
                              key={c}
                              className="text-left py-3 px-4 text-muted-foreground font-medium text-xs"
                            >
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {solventData.map((r) => (
                          <tr
                            key={r.licenseNo}
                            className="border-b hover:bg-muted/30 transition-colors"
                            style={{ borderColor: "hsl(var(--border))" }}
                          >
                            <td className="py-3 px-4 font-semibold">
                              {r.licensee}
                            </td>
                            <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                              {r.licenseNo}
                            </td>
                            <td className="py-3 px-4">{r.type}</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {r.date}
                            </td>
                            <td className="py-3 px-4">{r.inspector}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${solventResultColor[r.result]}`}
                              >
                                {r.result}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {r.remarks}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* ── Helpline Calls ── */}
              {activeTab === "Helpline Calls" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      Control Room & Helpline
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {[
                      {
                        label: "Total Calls",
                        value: 27,
                        color: "hsl(var(--primary))",
                      },
                      {
                        label: "Actioned",
                        value: 18,
                        color: "hsl(var(--risk-low))",
                      },
                      {
                        label: "Pending",
                        value: 9,
                        color: "hsl(var(--risk-medium))",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg border p-4 text-center"
                        style={{ borderColor: "hsl(var(--border))" }}
                      >
                        <p
                          className="text-2xl font-bold"
                          style={{ color: s.color }}
                        >
                          {s.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div
                    className="rounded-lg border overflow-hidden"
                    style={{ borderColor: "hsl(var(--border))" }}
                  >
                    <table className="w-full text-sm">
                      <thead>
                        <tr
                          className="border-b"
                          style={{ borderColor: "hsl(var(--border))" }}
                        >
                          {[
                            "Time",
                            "Source",
                            "Caller",
                            "Type",
                            "Summary",
                            "Assigned",
                            "Status",
                          ].map((c) => (
                            <th
                              key={c}
                              className="text-left py-3 px-4 text-muted-foreground font-medium text-xs"
                            >
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {helplineData.map((r, i) => (
                          <tr
                            key={i}
                            className="border-b hover:bg-muted/30 transition-colors"
                            style={{ borderColor: "hsl(var(--border))" }}
                          >
                            <td className="py-3 px-4 font-mono text-xs">
                              {r.time}
                            </td>
                            <td
                              className="py-3 px-4"
                              style={{
                                color:
                                  r.source === "Helpline"
                                    ? "hsl(var(--risk-high))"
                                    : undefined,
                              }}
                            >
                              {r.source}
                            </td>
                            <td className="py-3 px-4">{r.caller}</td>
                            <td className="py-3 px-4">
                              <span
                                className="px-2 py-0.5 rounded border text-xs"
                                style={{ borderColor: "hsl(var(--border))" }}
                              >
                                {r.type}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {r.summary}
                            </td>
                            <td
                              className="py-3 px-4"
                              style={{ color: "hsl(var(--primary))" }}
                            >
                              {r.assigned}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${helplineStatusColor[r.status]}`}
                              >
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* ── Checkpost Seizures ── */}
              {activeTab === "Checkpost Seizures" && (
                <CheckpostSeizuresForm
                  onAttendance={() => setShowAttendance(true)}
                  onAddEntry={() => setShowCheckpointEntry(true)}
                />
              )}

              {/* ── WhatsApp Calls ── */}
              {activeTab === "WhatsApp Calls" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      WhatsApp Calls / Messages
                    </h3>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr
                        className="border-b"
                        style={{ borderColor: "hsl(var(--border))" }}
                      >
                        {[
                          "Time",
                          "Caller",
                          "Summary",
                          "Assigned",
                          "Status",
                        ].map((col) => (
                          <th
                            key={col}
                            className="text-left py-3 px-3 text-muted-foreground font-medium text-xs"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-12 text-muted-foreground text-sm"
                        >
                          No records found.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* PEW Tab Content */}
      {topTab === "PEW" && (
        <>
          <div className="flex items-center justify-end mb-4">
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
          <DSRPEWForm />
        </>
      )}

      {/* NDPS Tab Content */}
      {topTab === "NDPS" && (
        <>
          <div className="flex items-center justify-end mb-4">
            <button
              onClick={() => setShowNDPSEntry(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-4 w-4" /> Add NDPS Entry
            </button>
          </div>
          <DSRNDPSForm />
        </>
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
    </div>
  );
}
