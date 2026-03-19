import { motion } from "framer-motion";
import { intelligenceProfiles } from "@/data/mockData";
import { Brain, ChevronRight, User, Clock, AlertTriangle, Check, Plus, MapPin, Network, FileText, ListFilter, PlusCircle, Calendar, Building2, Users } from "lucide-react";
import { useState } from "react";
import { SourceReportEntryForm } from "./SourceReportEntryForm";
import { AccusedProfileEntryForm } from "./AccusedProfileEntryForm";
import { CIUInitiatedReportForm } from "./CIUInitiatedReportForm";
import { ApprovalDashboard } from "./ApprovalDashboard";
import { useAppStore, ReportStatus } from "../../store/appStore";

const topTabs = ["Source Reports", "Accused Profiles", "CIU Initiated", "Approval Workflow"];

const workflowSteps = [
  { role: "CIU", status: "approved", time: "09:15" },
  { role: "DSP", status: "approved", time: "10:32" },
  { role: "SPCIU", status: "approved", time: "11:48" },
  { role: "DIG", status: "pending", time: "" },
  { role: "ADGP", status: "waiting", time: "" },
  { role: "PEW DSP", status: "waiting", time: "" },
  { role: "Field Officer", status: "waiting", time: "" },
];

const sourceReports = [
  { id: "SR-2024-001", title: "Ganja Supply Chain — Northern Corridor", source: "CI Senthil", date: "2025-02-25", status: "Approved", risk: "high" },
  { id: "SR-2024-002", title: "Illicit Liquor Network — Sivaganga", source: "DSP Kavitha", date: "2025-02-22", status: "Pending", risk: "medium" },
  { id: "SR-2024-003", title: "NDPS Tablet Distribution — Salem", source: "CIU Officer Karthik", date: "2025-02-20", status: "Under Review", risk: "high" },
  { id: "SR-2024-004", title: "Cross-Border Smuggling Route — Hosur", source: "SI Murugan", date: "2025-02-18", status: "Approved", risk: "medium" },
];

const sellingPoints: Record<string, string[]> = {
  "ACC-001": ["Old Washermanpet, Chennai", "T. Nagar Bus Stop, Chennai", "Koyambedu Market"],
  "ACC-002": ["Mattuthavani Terminal, Madurai", "Periyar Bus Stand Area"],
  "ACC-003": ["Gandhipuram, Coimbatore", "RS Puram Junction"],
  "ACC-004": ["Chatram Bus Stand, Trichy"],
  "ACC-005": ["Salem New Bus Stand", "Shevapet Market, Salem"],
};

const knownAssociates: Record<string, { name: string; role: string; risk: string }[]> = {
  "ACC-001": [
    { name: "Durai Singam", role: "Supplier", risk: "high" },
    { name: "Rajan K.", role: "Courier", risk: "medium" },
    { name: "Senthil P.", role: "Lookout", risk: "low" },
  ],
  "ACC-002": [
    { name: "Murugan Thevar", role: "Distributor", risk: "high" },
    { name: "Arumugam V.", role: "Financier", risk: "high" },
    { name: "Kannan S.", role: "Courier", risk: "medium" },
    { name: "Balaji R.", role: "Lookout", risk: "low" },
  ],
  "ACC-003": [{ name: "Anbu Selvan", role: "Associate", risk: "medium" }],
  "ACC-004": [{ name: "Velan Raju", role: "Associate", risk: "medium" }, { name: "Suresh D.", role: "Courier", risk: "low" }],
  "ACC-005": [{ name: "Ravi M.", role: "Lookout", risk: "low" }],
};

const caseHistory: Record<string, { id: string; date: string; type: string; outcome: string }[]> = {
  "ACC-001": [
    { id: "CS-2024-1831", date: "2025-02-15", type: "NDPS", outcome: "Arrested — 4.2kg Cannabis" },
    { id: "CS-2023-0892", date: "2024-11-03", type: "NDPS", outcome: "Chargesheeted" },
    { id: "CS-2023-0412", date: "2024-06-20", type: "PEW", outcome: "Released on Bail" },
    { id: "CS-2022-0198", date: "2023-09-14", type: "NDPS", outcome: "Convicted — 6 months" },
  ],
  "ACC-002": [
    { id: "CS-2024-1829", date: "2025-01-28", type: "NDPS", outcome: "Active Investigation" },
    { id: "CS-2024-0231", date: "2024-03-12", type: "NDPS", outcome: "Chargesheeted" },
  ],
  "ACC-003": [{ id: "CS-2024-1827", date: "2024-12-10", type: "PEW", outcome: "Absconding" }],
  "ACC-004": [
    { id: "CS-2024-1828", date: "2025-02-10", type: "NDPS", outcome: "Arrested" },
    { id: "CS-2023-0901", date: "2024-08-22", type: "CRIME", outcome: "Closed" },
    { id: "CS-2023-0410", date: "2024-05-15", type: "NDPS", outcome: "Released on Bail" },
  ],
  "ACC-005": [{ id: "CS-2024-1826", date: "2024-11-30", type: "PEW", outcome: "Released on Bail" }],
};

// ─── Status helpers ────────────────────────────────────────────────────────
const STATUS_LABELS: Record<ReportStatus, string> = {
  pending_dsp: "Pending DSP",
  pending_spciu: "Pending SPCIU",
  pending_dig: "Pending DIG",
  pending_adgp: "Pending ADGP",
  approved_adgp: "Approved by ADGP",
  delegated: "Delegated",
  field_report_received: "Field Report Received",
  rejected: "Rejected",
};

const STATUS_COLORS: Record<ReportStatus, { bg: string; text: string }> = {
  pending_dsp: { bg: "hsl(var(--risk-medium) / 0.12)", text: "hsl(var(--risk-medium))" },
  pending_spciu: { bg: "hsl(var(--risk-medium) / 0.12)", text: "hsl(var(--risk-medium))" },
  pending_dig: { bg: "hsl(var(--risk-medium) / 0.12)", text: "hsl(var(--risk-medium))" },
  pending_adgp: { bg: "hsl(var(--risk-medium) / 0.12)", text: "hsl(var(--risk-medium))" },
  approved_adgp: { bg: "hsl(var(--risk-low) / 0.12)", text: "hsl(var(--risk-low))" },
  delegated: { bg: "hsl(var(--primary) / 0.12)", text: "hsl(var(--primary))" },
  field_report_received: { bg: "hsl(220 80% 55% / 0.12)", text: "hsl(220 80% 45%)" },
  rejected: { bg: "hsl(var(--risk-high) / 0.12)", text: "hsl(var(--risk-high))" },
};

// Seed mock reports so list is never empty in demo
const mockSeedReports = [
  {
    id: "INT-2025-3821",
    source: "CIU" as const,
    date: "2025-03-10",
    time: "09:30",
    location: "Anna Nagar",
    district: "Chennai",
    offenders: [{ type: "known" as const, firstName: "Murugan", lastName: "Selvam", risk: "High" }],
    status: "approved_adgp" as ReportStatus,
    history: [
      { role: "CIU" as const, action: "submitted" as const, date: "2025-03-10T09:30:00Z" },
      { role: "DSP" as const, action: "approved" as const, date: "2025-03-10T11:15:00Z" },
      { role: "SPCIU" as const, action: "approved" as const, date: "2025-03-10T14:20:00Z" },
      { role: "DIG" as const, action: "approved" as const, date: "2025-03-11T08:45:00Z" },
      { role: "ADGP" as const, action: "approved" as const, date: "2025-03-11T10:30:00Z" },
    ],
  },
  {
    id: "INT-2025-4102",
    source: "CIU" as const,
    date: "2025-03-14",
    time: "14:00",
    location: "Mattuthavani Terminal",
    district: "Madurai",
    offenders: [
      { type: "known" as const, firstName: "Kavitha", lastName: "Rajan", risk: "Medium" },
      { type: "unknown" as const, description: "Tall male, ~40 yrs", risk: "Medium" },
    ],
    status: "pending_dig" as ReportStatus,
    history: [
      { role: "CIU" as const, action: "submitted" as const, date: "2025-03-14T14:00:00Z" },
      { role: "DSP" as const, action: "approved" as const, date: "2025-03-14T16:10:00Z" },
      { role: "SPCIU" as const, action: "approved" as const, date: "2025-03-15T09:05:00Z" },
    ],
  },
  {
    id: "INT-2025-4567",
    source: "CIU" as const,
    date: "2025-03-16",
    time: "11:15",
    location: "Gandhipuram",
    district: "Coimbatore",
    offenders: [{ type: "unknown" as const, description: "Young male on motorcycle", risk: "Low" }],
    status: "pending_dsp" as ReportStatus,
    history: [
      { role: "CIU" as const, action: "submitted" as const, date: "2025-03-16T11:15:00Z" },
    ],
  },
  {
    id: "INT-2025-4890",
    source: "CIU" as const,
    date: "2025-03-17",
    time: "08:45",
    location: "RS Puram Junction",
    district: "Coimbatore",
    offenders: [{ type: "known" as const, firstName: "Senthil", lastName: "Kumar", risk: "High" }],
    status: "rejected" as ReportStatus,
    history: [
      { role: "CIU" as const, action: "submitted" as const, date: "2025-03-17T08:45:00Z" },
      { role: "DSP" as const, action: "rejected" as const, date: "2025-03-17T10:30:00Z", comment: "Insufficient evidence provided" },
    ],
  },
];

function CIUInitiatedSection() {
  const [ciuView, setCiuView] = useState<"list" | "new">("list");
  const intelligenceReports = useAppStore(s => s.intelligenceReports);

  // Merge seeded mock data with any newly submitted reports from the store
  const allReports = [
    ...mockSeedReports,
    ...intelligenceReports.filter(r => !mockSeedReports.find(m => m.id === r.id)),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Sub-tab bar + action button */}
      <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="flex items-center gap-1 rounded-lg border overflow-hidden" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted)/0.3)" }}>
          <button
            onClick={() => setCiuView("list")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all ${ciuView === "list" ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ListFilter className="h-3.5 w-3.5" /> My Reports
          </button>
          <button
            onClick={() => setCiuView("new")}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all ${ciuView === "new" ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`}
          >
            <PlusCircle className="h-3.5 w-3.5" /> New Report
          </button>
        </div>

        {ciuView === "list" && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{allReports.length} report{allReports.length !== 1 ? "s" : ""} submitted</span>
            <button
              onClick={() => setCiuView("new")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-all"
              style={{ background: "hsl(var(--primary))" }}
            >
              <PlusCircle className="h-3.5 w-3.5" /> New Report
            </button>
          </div>
        )}
      </div>

      {/* ── LIST VIEW ── */}
      {ciuView === "list" && (
        <div className="flex-1 overflow-y-auto p-6">
          {allReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/30" />
              <div>
                <p className="font-semibold text-foreground">No reports yet</p>
                <p className="text-sm text-muted-foreground mt-1">Submit your first CIU intelligence report to get started.</p>
              </div>
              <button
                onClick={() => setCiuView("new")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: "hsl(var(--primary))" }}
              >
                <PlusCircle className="h-4 w-4" /> Create Report
              </button>
            </div>
          ) : (
            <div className="rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: "hsl(var(--border))" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ background: "hsl(var(--muted)/0.4)", borderColor: "hsl(var(--border))" }}>
                    {["Report ID", "Date", "Location", "District", "Offenders", "Current Status", "Approval Progress"].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allReports.map((r, i) => {
                    const color = STATUS_COLORS[r.status];
                    const label = STATUS_LABELS[r.status];
                    const approvalSteps = ["CIU", "DSP", "SPCIU", "DIG", "ADGP"];
                    // History actions map to steps
                    const approvedRoles = r.history
                      .filter(h => h.action === "approved" || h.action === "submitted")
                      .map(h => h.role);
                    const isRejected = r.status === "rejected";

                    return (
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`border-b last:border-0 transition-colors hover:bg-muted/20 ${i % 2 !== 0 ? "bg-muted/10" : ""}`}
                        style={{ borderColor: "hsl(var(--border))" }}
                      >
                        {/* Report ID */}
                        <td className="py-3 px-4">
                          <span className="font-mono text-xs font-semibold" style={{ color: "hsl(var(--accent))" }}>{r.id}</span>
                        </td>

                        {/* Date */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 shrink-0" />
                            {r.date}
                          </div>
                        </td>

                        {/* Location */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            {r.location || "—"}
                          </div>
                        </td>

                        {/* District */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Building2 className="h-3 w-3 shrink-0" />
                            {r.district || "—"}
                          </div>
                        </td>

                        {/* Offenders */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="text-sm font-semibold text-foreground">{r.offenders.length}</span>
                            <span className="text-xs text-muted-foreground">
                              ({r.offenders.filter(o => o.type === "known").length} known)
                            </span>
                          </div>
                        </td>

                        {/* Status badge */}
                        <td className="py-3 px-4">
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap"
                            style={{ background: color.bg, color: color.text }}
                          >
                            {label}
                          </span>
                        </td>

                        {/* Approval progress dots */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {approvalSteps.map((step, si) => {
                              const isDone = approvedRoles.includes(step as any);
                              const isRejectedStep = isRejected && !isDone && r.history.some(h => h.role === step && h.action === "rejected");
                              return (
                                <div key={step} className="flex items-center gap-1">
                                  <div
                                    title={step}
                                    className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold border transition-all"
                                    style={{
                                      background: isRejectedStep
                                        ? "hsl(var(--risk-high) / 0.15)"
                                        : isDone
                                          ? "hsl(var(--primary))"
                                          : "hsl(var(--muted))",
                                      color: isDone ? "#fff" : isRejectedStep ? "hsl(var(--risk-high))" : "hsl(var(--muted-foreground))",
                                      borderColor: isDone
                                        ? "hsl(var(--primary))"
                                        : isRejectedStep
                                          ? "hsl(var(--risk-high))"
                                          : "hsl(var(--border))",
                                    }}
                                  >
                                    {isDone ? "✓" : step.charAt(0)}
                                  </div>
                                  {si < approvalSteps.length - 1 && (
                                    <div
                                      className="h-px w-3"
                                      style={{ background: isDone && approvedRoles.includes(approvalSteps[si + 1] as any) ? "hsl(var(--primary))" : "hsl(var(--border))" }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                            {r.status === "delegated" && (
                              <>
                                <div className="h-px w-3" style={{ background: "hsl(var(--primary))" }} />
                                <div
                                  title="PEW DSP"
                                  className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold border"
                                  style={{ background: "hsl(var(--primary))", color: "#fff", borderColor: "hsl(var(--primary))" }}
                                >✓</div>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── NEW REPORT FORM ── */}
      {ciuView === "new" && (
        <CIUInitiatedReportForm onAfterSubmit={() => setCiuView("list")} />
      )}
    </div>
  );
}

export function IntelligencePage() {
  const [topTab, setTopTab] = useState("Accused Profiles");
  const [selected, setSelected] = useState(intelligenceProfiles[0]);
  const [showSourceReportForm, setShowSourceReportForm] = useState(false);
  const [showAccusedForm, setShowAccusedForm] = useState(false);

  const fieldCls = "text-sm font-medium text-foreground";
  const labelCls = "text-xs text-muted-foreground mb-0.5";

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Intelligence Module</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Source reports, accused profiles and approval pipeline</p>
        </div>
        <button
          onClick={() => {
            if (topTab === "Source Reports") setShowSourceReportForm(true);
            else if (topTab === "Accused Profiles") setShowAccusedForm(true);
          }}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold ${
            topTab === "Approval Workflow" || topTab === "CIU Initiated" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          disabled={topTab === "Approval Workflow" || topTab === "CIU Initiated"}
        >
          <Plus className="h-4 w-4" />
          {topTab === "Source Reports" ? "New Source Report" : topTab === "Accused Profiles" ? "New Accused Profile" : "New Entry"}
        </button>
      </div>

      {/* Top Tabs */}
      <div className="flex items-center gap-1 border-b mx-6 mt-4" style={{ borderColor: "hsl(var(--border))" }}>
        {topTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setTopTab(tab)}
            className={`px-5 py-2.5 text-sm font-semibold transition-colors relative ${topTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {tab}
            {topTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "hsl(var(--primary))" }} />
            )}
          </button>
        ))}
      </div>

      {/* ── SOURCE REPORTS ── */}
      {topTab === "Source Reports" && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="rounded-lg border overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40" style={{ borderColor: "hsl(var(--border))" }}>
                  {["Report ID", "Title", "Source Officer", "Date", "Status", "Risk"].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sourceReports.map((r, i) => (
                  <tr key={r.id} className={`border-b transition-colors hover:bg-muted/30 ${i % 2 === 0 ? "" : "bg-muted/10"}`} style={{ borderColor: "hsl(var(--border))" }}>
                    <td className="py-3 px-4 font-mono text-xs" style={{ color: "hsl(var(--accent))" }}>{r.id}</td>
                    <td className="py-3 px-4 font-medium text-foreground">{r.title}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.source}</td>
                    <td className="py-3 px-4 text-muted-foreground">{r.date}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          background: r.status === "Approved" ? "hsl(var(--risk-low) / 0.15)" : r.status === "Pending" ? "hsl(var(--risk-medium) / 0.15)" : "hsl(var(--risk-high) / 0.15)",
                          color: r.status === "Approved" ? "hsl(var(--risk-low))" : r.status === "Pending" ? "hsl(var(--risk-medium))" : "hsl(var(--risk-high))",
                        }}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-4"><span className={`risk-badge-${r.risk}`}>{r.risk}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── ACCUSED PROFILES ── */}
      {topTab === "Accused Profiles" && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-72 border-r flex flex-col" style={{ borderColor: "hsl(var(--border))" }}>
            <div className="p-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Brain className="h-4 w-4" style={{ color: "hsl(var(--intelligence))" }} />
                Accused Profiles
              </h3>
              <input className="mt-2 w-full rounded-md border px-3 py-1.5 text-xs bg-muted focus:outline-none" style={{ borderColor: "hsl(var(--border))" }} placeholder="Search profiles..." />
            </div>
            <div className="flex-1 overflow-y-auto">
              {intelligenceProfiles.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelected(p)}
                  className="w-full text-left p-4 border-b transition-colors hover:bg-muted/50"
                  style={{
                    borderColor: "hsl(var(--border))",
                    background: selected.id === p.id ? "hsl(var(--primary) / 0.08)" : "transparent",
                    borderLeft: selected.id === p.id ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{p.district}</p>
                      <p className="text-[10px] font-mono mt-1" style={{ color: "hsl(var(--accent))" }}>{p.id}</p>
                    </div>
                    <span className={`risk-badge-${p.risk}`}>{p.risk}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Profile Detail */}
          <div className="flex-1 overflow-y-auto p-6">
            <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-5">

              {/* Accused Profile Card */}
              <div className="stat-card">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <User className="h-4 w-4" style={{ color: "hsl(var(--primary))" }} />
                  Accused Profile
                </h3>
                <div className="flex items-start gap-5">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
                    style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))" }}>
                    {selected.name.charAt(0)}
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 flex-1">
                    <div>
                      <p className={labelCls}>Name</p>
                      <p className={fieldCls}>{selected.name}</p>
                    </div>
                    <div>
                      <p className={labelCls}>Age / Gender</p>
                      <p className={fieldCls}>{selected.age} / Male</p>
                    </div>
                    <div>
                      <p className={labelCls}>District</p>
                      <p className={fieldCls}>{selected.district}</p>
                    </div>
                    <div>
                      <p className={labelCls}>Status</p>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "hsl(var(--risk-medium) / 0.15)", color: "hsl(var(--risk-medium))" }}>
                        {selected.status}
                      </span>
                    </div>
                    <div>
                      <p className={labelCls}>Risk Level</p>
                      <span className={`risk-badge-${selected.risk} flex items-center gap-1 w-fit`}>
                        <AlertTriangle className="h-3 w-3" />{selected.risk.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className={labelCls}>Total Cases</p>
                      <p className="text-xl font-bold" style={{ color: "hsl(var(--risk-high))" }}>{selected.cases}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Known Associates */}
              <div className="stat-card">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Network className="h-4 w-4" style={{ color: "hsl(var(--intelligence))" }} />
                  Known Associates
                </h3>
                {(knownAssociates[selected.id] || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No data available</p>
                ) : (
                  <div className="space-y-2">
                    {(knownAssociates[selected.id] || []).map((a, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "hsl(var(--border))" }}>
                        <div className="flex items-center gap-3">
                          <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                            {a.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{a.name}</p>
                            <p className="text-xs text-muted-foreground">{a.role}</p>
                          </div>
                        </div>
                        <span className={`risk-badge-${a.risk}`}>{a.risk}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selling Points */}
              <div className="stat-card">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={{ color: "hsl(var(--risk-high))" }} />
                  Selling Points
                </h3>
                {(sellingPoints[selected.id] || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No data available</p>
                ) : (
                  <div className="space-y-2">
                    {(sellingPoints[selected.id] || []).map((sp, i) => (
                      <div key={i} className="flex items-center gap-3 py-1.5 border-b last:border-0" style={{ borderColor: "hsl(var(--border))" }}>
                        <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "hsl(var(--risk-high))" }} />
                        <p className="text-sm text-foreground">{sp}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Case History */}
              <div className="stat-card">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4" style={{ color: "hsl(var(--accent))" }} />
                  Case History
                </h3>
                {(caseHistory[selected.id] || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No data available</p>
                ) : (
                  <div className="space-y-3">
                    {(caseHistory[selected.id] || []).map((c, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="h-2 w-2 rounded-full mt-1.5 shrink-0" style={{ background: "hsl(var(--primary))" }} />
                          {i < (caseHistory[selected.id] || []).length - 1 && (
                            <div className="w-0.5 flex-1 mt-1" style={{ background: "hsl(var(--border))" }} />
                          )}
                        </div>
                        <div className="pb-3 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-semibold" style={{ color: "hsl(var(--accent))" }}>{c.id}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded font-medium"
                              style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>{c.type}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{c.date}</p>
                          <p className="text-sm mt-0.5 text-foreground">{c.outcome}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        </div>
      )}

      {/* ── APPROVAL WORKFLOW ── */}
      {topTab === "Approval Workflow" && (
        <ApprovalDashboard />
      )}

      {/* ── CIU INITIATED ── */}
      {topTab === "CIU Initiated" && (
        <CIUInitiatedSection />
      )}

      {/* Forms Overlay */}
      {showSourceReportForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-card border rounded-xl shadow-lg relative max-h-[90vh] overflow-hidden flex flex-col p-6">
            <SourceReportEntryForm onClose={() => setShowSourceReportForm(false)} />
          </div>
        </div>
      )}

      {showAccusedForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-card border rounded-xl shadow-lg relative max-h-[90vh] overflow-hidden flex flex-col p-6">
            <AccusedProfileEntryForm onClose={() => setShowAccusedForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
