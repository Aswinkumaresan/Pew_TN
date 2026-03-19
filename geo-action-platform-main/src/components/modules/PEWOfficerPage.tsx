import { motion } from "framer-motion";
import { useState, useRef } from "react";
import {
  Shield, User, Check, FileText, Send, MapPin, Clock,
  HandMetal, Eye, UserX, AlertCircle, CheckCircle2,
  MessageSquare, Plus, ChevronDown, ChevronUp,
  Download, Upload, Paperclip, Trash2
} from "lucide-react";
import { useAppStore, IntelligenceReport } from "../../store/appStore";

type ActionTaken = 'arrested' | 'surveillance' | 'released';

const ACTION_CONFIG: Record<ActionTaken, { label: string; bg: string; text: string }> = {
  arrested: { label: "Arrested & Remanded", bg: "hsl(var(--risk-high) / 0.12)", text: "hsl(var(--risk-high))" },
  surveillance: { label: "Under Surveillance", bg: "hsl(var(--risk-medium) / 0.12)", text: "hsl(var(--risk-medium))" },
  released: { label: "Released / No Action", bg: "hsl(var(--risk-low) / 0.12)", text: "hsl(var(--risk-low))" },
};

const inputCls = "w-full rounded-md border p-2 text-sm bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all";
const labelCls = "text-xs font-semibold text-muted-foreground mb-1 block";


const SEED_INCOMING: IntelligenceReport[] = [
  {
    id: "INT-2025-3210", source: "CIU", date: "2025-03-08", time: "10:00",
    location: "Koyambedu Market", district: "Chennai",
    offenders: [{ type: "known", firstName: "Raghu", lastName: "Nadar", risk: "High", activity: "Ganja supply network coordinator — multiple informant tips." }],
    status: "approved_adgp",
    history: [
      { role: "CIU", action: "submitted", date: "2025-03-08T10:00:00Z" },
      { role: "ADGP", action: "approved", date: "2025-03-09T09:00:00Z" },
    ],
  },
  {
    id: "INT-2025-3312", source: "CIU", date: "2025-03-11", time: "14:30",
    location: "Mattuthavani Terminal", district: "Madurai",
    offenders: [
      { type: "known", firstName: "Vijay", lastName: "Arumugam", risk: "Medium", activity: "Illicit liquor distribution point." },
      { type: "unknown", description: "Young male, 25–30 yrs, bike rider with two pillion riders.", risk: "Medium" },
    ],
    status: "approved_adgp",
    history: [
      { role: "CIU", action: "submitted", date: "2025-03-11T14:30:00Z" },
      { role: "ADGP", action: "approved", date: "2025-03-12T11:00:00Z" },
    ],
  },
];

const SEED_DELEGATIONS: IntelligenceReport[] = [
  {
    id: "INT-2025-3540", source: "CIU", date: "2025-03-13", time: "09:15",
    location: "Gandhipuram", district: "Coimbatore",
    offenders: [{ type: "known", firstName: "Anbu", lastName: "Selvan", risk: "High" }],
    status: "delegated",
    history: [
      { role: "CIU", action: "submitted", date: "2025-03-13T09:15:00Z" },
      { role: "ADGP", action: "approved", date: "2025-03-14T08:00:00Z" },
      { role: "PEW_DSP", action: "delegated", date: "2025-03-14T10:00:00Z" },
    ],
    delegation: { officer: "Inspector", district: "Coimbatore", assignedDate: "2025-03-14" },
  },
  {
    id: "INT-2025-3601", source: "CIU", date: "2025-03-15", time: "11:00",
    location: "Salem New Bus Stand", district: "Salem",
    offenders: [
      { type: "known", firstName: "Ravi", lastName: "Shankar", risk: "Medium" },
      { type: "unknown", description: "Accomplice — female, 30–35 yrs", risk: "Low" },
    ],
    status: "delegated",
    history: [
      { role: "CIU", action: "submitted", date: "2025-03-15T11:00:00Z" },
      { role: "ADGP", action: "approved", date: "2025-03-15T16:00:00Z" },
      { role: "PEW_DSP", action: "delegated", date: "2025-03-16T09:30:00Z" },
    ],
    delegation: { officer: "SI", district: "Salem", assignedDate: "2025-03-16" },
  },
];

const SEED_FIELD_REPORTS: IntelligenceReport[] = [
  {
    id: "INT-2025-3110", source: "CIU", date: "2025-03-06", time: "08:00",
    location: "Anna Nagar", district: "Chennai",
    offenders: [{ type: "known", firstName: "Murugan", lastName: "Selvam", risk: "High" }],
    status: "field_report_received",
    history: [
      { role: "CIU", action: "submitted", date: "2025-03-06T08:00:00Z" },
      { role: "ADGP", action: "approved", date: "2025-03-07T09:00:00Z" },
      { role: "PEW_DSP", action: "delegated", date: "2025-03-07T11:00:00Z" },
    ],
    delegation: { officer: "DSP", district: "Chennai", assignedDate: "2025-03-07" },
    fieldReport: {
      content: "Subject was tracked across three locations. Observed handing over small packets near Koyambedu. Nabbed with 2.5 kg ganja at residence.",
      date: "2025-03-10",
      status: "Pending DSP Action",
      actionTaken: "arrested",
      arrestDetails: {
        accusedName: "Murugan Selvam",
        court: "Chief Judicial Magistrate, Chennai",
        remandDate: "2025-03-10",
        remandOrderNo: "CJM/REM/2025/1142",
        remarks: "2.5 kg cannabis seized. One bike (TN09-AB-1234) seized. Bail denied.",
      },
    },
  },
  {
    id: "INT-2025-3205", source: "CIU", date: "2025-03-08", time: "13:00",
    location: "Periyar Bus Stand", district: "Madurai",
    offenders: [{ type: "known", firstName: "Lakshmi", lastName: "Devi", risk: "Medium" }],
    status: "field_report_received",
    history: [
      { role: "CIU", action: "submitted", date: "2025-03-08T13:00:00Z" },
      { role: "ADGP", action: "approved", date: "2025-03-09T10:00:00Z" },
      { role: "PEW_DSP", action: "delegated", date: "2025-03-09T14:00:00Z" },
    ],
    delegation: { officer: "Inspector", district: "Madurai", assignedDate: "2025-03-09" },
    fieldReport: {
      content: "Subject monitored for 4 days. No active supply during surveillance. Gave warning and released after counselling session.",
      date: "2025-03-13",
      status: "Pending DSP Action",
      actionTaken: "released",
    },
  },
];

const SEED_FORWARDED: IntelligenceReport[] = [
  {
    id: "INT-2025-2980", source: "CIU", date: "2025-03-03", time: "09:00",
    location: "RS Puram Junction", district: "Coimbatore",
    offenders: [{ type: "known", firstName: "Senthil", lastName: "Kumar", risk: "High" }],
    status: "field_report_received",
    history: [
      { role: "CIU", action: "submitted", date: "2025-03-03T09:00:00Z" },
      { role: "ADGP", action: "approved", date: "2025-03-04T08:00:00Z" },
      { role: "PEW_DSP", action: "delegated", date: "2025-03-04T10:00:00Z" },
    ],
    delegation: { officer: "Inspector", district: "Coimbatore", assignedDate: "2025-03-04" },
    fieldReport: {
      content: "Suspect arrested with 1.8 kg NDPS tablets. Remanded to judicial custody. Co-accused Selvam D. still at large.",
      date: "2025-03-07",
      status: "Submitted to ADGP",
      actionTaken: "arrested",
      arrestDetails: {
        accusedName: "Senthil Kumar",
        court: "JFCM Court, Coimbatore",
        remandDate: "2025-03-07",
        remandOrderNo: "JFCM/REM/2025/0891",
        remarks: "1.8 kg NDPS tablets seized. Vehicle impounded.",
      },
      adgpAction: "Arrest confirmed. Recommend filing supplementary chargesheet for co-accused. Ensure NDPS special court hearing is scheduled within 15 days.",
    },
  },
  {
    id: "INT-2025-3050", source: "CIU", date: "2025-03-04", time: "11:30",
    location: "Shevapet Market", district: "Salem",
    offenders: [{ type: "known", firstName: "Rajesh", lastName: "Kannan", risk: "Medium" }],
    status: "field_report_received",
    history: [
      { role: "CIU", action: "submitted", date: "2025-03-04T11:30:00Z" },
      { role: "ADGP", action: "approved", date: "2025-03-05T09:00:00Z" },
      { role: "PEW_DSP", action: "delegated", date: "2025-03-05T13:00:00Z" },
    ],
    delegation: { officer: "SI Murugan", district: "Salem", assignedDate: "2025-03-05" },
    fieldReport: {
      content: "Subject under surveillance for 6 days. Activity reduced significantly after first stop. Placed under preventive detention notice.",
      date: "2025-03-11",
      status: "ADGP Response Received",
      actionTaken: "surveillance",
      adgpAction: "Preventive action appropriate. Continue monitoring for 30 days. File PD report with ADGP office.",
      adgpResponse: "Acknowledged. Extend surveillance as recommended. Submit monthly progress report to ADGP Secretariat by the 1st of each month.",
    },
  },
];

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">{children}</th>
);

// ── Shared upload helpers ────────────────────────────────────────────────
type UploadedFile = { name: string; size: number; fileType: 'pdf' | 'word'; file: File };

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(1)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadedFileList({ files, onRemove }: { files: UploadedFile[]; onRemove: (i: number) => void }) {
  if (!files.length) return null;
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1">
        <Paperclip className="h-3 w-3" /> Attached Documents ({files.length})
      </p>
      <div className="space-y-1.5">
        {files.map((f, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2 rounded-md border bg-background text-xs" style={{ borderColor: 'hsl(var(--border))' }}>
            <div className="flex items-center gap-2 min-w-0">
              {f.fileType === 'pdf'
                ? <Download className="h-3.5 w-3.5 text-red-500 shrink-0" />
                : <FileText className="h-3.5 w-3.5 text-blue-500 shrink-0" />}
              <span className="font-medium text-foreground truncate">{f.name}</span>
              <span className="text-muted-foreground shrink-0">{formatBytes(f.size)}</span>
            </div>
            <button onClick={() => onRemove(i)} className="ml-2 p-0.5 rounded text-muted-foreground hover:text-destructive transition-colors shrink-0">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Field Report Submission Modal ─────────────────────────────────────────
function FieldReportModal({ report, onClose }: { report: IntelligenceReport; onClose: () => void }) {
  const submitFieldReport = useAppStore(s => s.submitFieldReport);
  const [observations, setObservations] = useState("");
  const [actionTaken, setActionTaken] = useState<ActionTaken>("surveillance");
  const [accusedName, setAccusedName] = useState(
    report.offenders[0] ? `${report.offenders[0].firstName || ""} ${report.offenders[0].lastName || ""}`.trim() : ""
  );
  const [court, setCourt] = useState("");
  const [remandDate, setRemandDate] = useState("");
  const [remandOrderNo, setRemandOrderNo] = useState("");
  const [remarks, setRemarks] = useState("");

  // Upload state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, ft: 'pdf' | 'word') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFiles(prev => [...prev, { name: file.name, size: file.size, fileType: ft, file }]);
    e.target.value = '';
  };

  // Download helpers
  const downloadWord = () => {
    const html = `<html><head><meta charset="utf-8"><title>Field Report ${report.id}</title></head><body>
      <h2>Field Monitoring Report — ${report.id}</h2>
      <p><b>Officer:</b> ${report.delegation?.officer || '—'}</p>
      <p><b>District:</b> ${report.delegation?.district || '—'}</p>
      <p><b>Assigned Date:</b> ${report.delegation?.assignedDate || '—'}</p>
      <h3>Observations</h3><p>${observations || '(pending submission)'}</p>
      <h3>Action Taken</h3><p>${ACTION_CONFIG[actionTaken]?.label}</p>
    </body></html>`;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `FieldReport_${report.id}.doc`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    window.print();
  };

  const canSubmit = observations.trim() && (
    actionTaken !== "arrested" || (accusedName && court && remandDate && remandOrderNo)
  );

  const handleSubmit = () => {
    submitFieldReport(
      report.id, observations, actionTaken,
      actionTaken === "arrested" ? { accusedName, court, remandDate, remandOrderNo, remarks } : undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      {/* Hidden file inputs */}
      <input ref={pdfInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={e => handleFileUpload(e, 'pdf')} />
      <input ref={wordInputRef} type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={e => handleFileUpload(e, 'word')} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-card border rounded-xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden"
        style={{ borderColor: "hsl(var(--border))" }}>
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between shrink-0" style={{ borderColor: "hsl(var(--border))" }}>
          <div>
            <h2 className="text-base font-bold text-foreground">Submit Monitoring Report</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              <span className="font-mono" style={{ color: "hsl(var(--accent))" }}>{report.id}</span>
              {" · "}{report.delegation?.officer} · {report.delegation?.district}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Download */}
            <button onClick={downloadPDF} className="p-1.5 rounded-md border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Download as PDF">
              <Download className="h-4 w-4" />
            </button>
            <button onClick={downloadWord} className="p-1.5 rounded-md border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Download as Word">
              <FileText className="h-4 w-4" />
            </button>
            {/* Divider */}
            <div className="w-px h-5 mx-0.5" style={{ background: 'hsl(var(--border))' }} />
            {/* Upload */}
            <button onClick={() => pdfInputRef.current?.click()} className="p-1.5 rounded-md border bg-background hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors" title="Upload PDF">
              <Upload className="h-4 w-4" />
            </button>
            <button onClick={() => wordInputRef.current?.click()} className="p-1.5 rounded-md border bg-background hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors" title="Upload Word">
              <Paperclip className="h-4 w-4" />
            </button>
            {/* Close */}
            <button onClick={onClose} className="ml-1 text-xs font-semibold text-muted-foreground hover:text-foreground">✕</button>
          </div>
        </div>
        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Uploaded files */}
          <UploadedFileList files={uploadedFiles} onRemove={i => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} />
          <div>
            <label className={labelCls}>Monitoring Observations *</label>
            <textarea className={`${inputCls} resize-none h-24`}
              placeholder="Describe surveillance findings, movements tracked, activities observed..."
              value={observations} onChange={e => setObservations(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Action Taken *</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(ACTION_CONFIG) as ActionTaken[]).map(key => {
                const cfg = ACTION_CONFIG[key]; const active = actionTaken === key;
                return (
                  <button key={key} type="button" onClick={() => setActionTaken(key)}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs font-semibold transition-all"
                    style={{ background: active ? cfg.bg : "transparent", color: active ? cfg.text : "hsl(var(--muted-foreground))", borderColor: active ? cfg.text : "hsl(var(--border))" }}>
                    {key === "arrested" ? <HandMetal className="h-4 w-4" /> : key === "surveillance" ? <Eye className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
          {actionTaken === "arrested" && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-4 rounded-lg border p-4"
              style={{ borderColor: "hsl(var(--risk-high) / 0.3)", background: "hsl(var(--risk-high) / 0.04)" }}>
              <h4 className="text-xs font-bold flex items-center gap-2" style={{ color: "hsl(var(--risk-high))" }}>
                <HandMetal className="h-3.5 w-3.5" /> Arrest & Remand Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelCls}>Accused Name *</label>
                  <input type="text" className={inputCls} placeholder="Full name" value={accusedName} onChange={e => setAccusedName(e.target.value)} /></div>
                <div><label className={labelCls}>Remand Order No. *</label>
                  <input type="text" className={inputCls} placeholder="Court order no." value={remandOrderNo} onChange={e => setRemandOrderNo(e.target.value)} /></div>
                <div><label className={labelCls}>Court Name *</label>
                  <input type="text" className={inputCls} placeholder="e.g. CJM, Chennai" value={court} onChange={e => setCourt(e.target.value)} /></div>
                <div><label className={labelCls}>Remand Date *</label>
                  <input type="date" className={inputCls} value={remandDate} onChange={e => setRemandDate(e.target.value)} /></div>
              </div>
              <div><label className={labelCls}>Additional Remarks</label>
                <textarea className={`${inputCls} resize-none h-20`} placeholder="Bail status, co-accused, property seized..."
                  value={remarks} onChange={e => setRemarks(e.target.value)} /></div>
            </motion.div>
          )}
        </div>
        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3 shrink-0" style={{ borderColor: "hsl(var(--border))" }}>
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</button>
          <button onClick={handleSubmit} disabled={!canSubmit}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
            <Send className="h-4 w-4" /> Submit to PEW DSP
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Expandable row detail panel ───────────────────────────────────────────
function RowDetail({ report, onClose }: { report: IntelligenceReport; onClose: () => void }) {
  const { submitDspActionToAdgp, adgpRespondToFieldReport } = useAppStore();
  const [dspAction, setDspAction] = useState(report.fieldReport?.adgpAction || "");
  const [adgpResp, setAdgpResp] = useState(report.fieldReport?.adgpResponse || "");
  const fr = report.fieldReport;

  // Upload state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, ft: 'pdf' | 'word') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFiles(prev => [...prev, { name: file.name, size: file.size, fileType: ft, file }]);
    e.target.value = '';
  };

  // Download Word
  const downloadWord = () => {
    const arrest = fr?.arrestDetails;
    const html = `<html><head><meta charset="utf-8"><title>Field Report ${report.id}</title></head><body>
      <h2>Field Report — ${report.id}</h2>
      <p><b>Officer:</b> ${report.delegation?.officer || '—'}</p>
      <p><b>District:</b> ${report.delegation?.district || '—'}</p>
      <p><b>Date:</b> ${fr?.date || '—'}</p>
      <h3>Monitoring Observations</h3><p>${fr?.content || '—'}</p>
      <h3>Action Taken</h3><p>${ACTION_CONFIG[fr?.actionTaken || 'surveillance']?.label}</p>
      ${arrest ? `<h3>Arrest & Remand Details</h3>
        <p><b>Accused:</b> ${arrest.accusedName}</p>
        <p><b>Court:</b> ${arrest.court}</p>
        <p><b>Remand Order:</b> ${arrest.remandOrderNo}</p>
        <p><b>Remand Date:</b> ${arrest.remandDate}</p>
        ${arrest.remarks ? `<p><b>Remarks:</b> ${arrest.remarks}</p>` : ''}` : ''}
      ${fr?.adgpAction ? `<h3>DSP Action to ADGP</h3><p>${fr.adgpAction}</p>` : ''}
      ${fr?.adgpResponse ? `<h3>ADGP Response</h3><p>${fr.adgpResponse}</p>` : ''}
    </body></html>`;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `FieldReport_${report.id}.doc`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const downloadPDF = () => window.print();

  return (
    <tr>
      {/* Hidden file inputs */}
      <input ref={pdfInputRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={e => handleFileUpload(e, 'pdf')} />
      <input ref={wordInputRef} type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={e => handleFileUpload(e, 'word')} />
      <td colSpan={8} className="px-6 py-4 bg-muted/10 border-b" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="max-w-3xl space-y-4">

          {/* Download / Upload toolbar */}
          <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
            <span className="text-xs font-semibold text-muted-foreground mr-1">Documents:</span>
            {/* Downloads */}
            <button onClick={downloadPDF} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors" title="Download as PDF">
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
            <button onClick={downloadWord} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors" title="Download as Word">
              <FileText className="h-3.5 w-3.5" /> Word
            </button>
            <div className="w-px h-4" style={{ background: 'hsl(var(--border))' }} />
            {/* Uploads */}
            <button onClick={() => pdfInputRef.current?.click()} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border bg-background hover:bg-red-50 text-xs font-medium text-muted-foreground hover:text-red-600 transition-colors" title="Upload PDF">
              <Upload className="h-3.5 w-3.5" /> Upload PDF
            </button>
            <button onClick={() => wordInputRef.current?.click()} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border bg-background hover:bg-blue-50 text-xs font-medium text-muted-foreground hover:text-blue-600 transition-colors" title="Upload Word">
              <Paperclip className="h-3.5 w-3.5" /> Upload Word
            </button>
          </div>

          {/* Uploaded files */}
          <UploadedFileList files={uploadedFiles} onRemove={i => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} />

          {/* Observations */}
          {fr?.content && (
            <div className="p-3 rounded-lg border bg-background" style={{ borderColor: "hsl(var(--border))" }}>
              <p className="text-xs font-semibold text-muted-foreground mb-1">MONITORING OBSERVATIONS</p>
              <p className="text-sm text-foreground">{fr.content}</p>
            </div>
          )}
          {/* Arrest details */}
          {fr?.actionTaken === "arrested" && fr.arrestDetails && (
            <div className="p-4 border rounded-lg" style={{ borderColor: "hsl(var(--risk-high) / 0.3)", background: "hsl(var(--risk-high) / 0.04)" }}>
              <p className="text-xs font-bold mb-3 flex items-center gap-1.5" style={{ color: "hsl(var(--risk-high))" }}>
                <HandMetal className="h-3.5 w-3.5" /> ARREST & REMAND DETAILS
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Accused</p><p className="font-semibold">{fr.arrestDetails.accusedName}</p></div>
                <div><p className="text-xs text-muted-foreground">Remand Order No.</p><p className="font-semibold">{fr.arrestDetails.remandOrderNo}</p></div>
                <div><p className="text-xs text-muted-foreground">Court</p><p className="font-semibold">{fr.arrestDetails.court}</p></div>
                <div><p className="text-xs text-muted-foreground">Remand Date</p><p className="font-semibold">{fr.arrestDetails.remandDate}</p></div>
                {fr.arrestDetails.remarks && <div className="col-span-2"><p className="text-xs text-muted-foreground">Remarks</p><p>{fr.arrestDetails.remarks}</p></div>}
              </div>
            </div>
          )}
          {/* DSP Action / ADGP Response */}
          {fr && !fr.adgpAction && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1.5"><Send className="h-3.5 w-3.5" /> PEW DSP ACTION TO FORWARD TO ADGP</p>
              <textarea className="w-full h-20 rounded-lg border p-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                style={{ borderColor: "hsl(var(--border))" }}
                placeholder="DSP remarks, action taken, recommendations for ADGP..."
                value={dspAction} onChange={e => setDspAction(e.target.value)} />
              <div className="flex justify-end mt-2">
                <button onClick={() => { submitDspActionToAdgp(report.id, dspAction); onClose(); }}
                  disabled={!dspAction}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                  <Check className="h-4 w-4" /> Forward to ADGP
                </button>
              </div>
            </div>
          )}
          {fr?.adgpAction && !fr.adgpResponse && (
            <div>
              <div className="p-3 rounded-lg border bg-muted/10 mb-3" style={{ borderColor: "hsl(var(--border))" }}>
                <p className="text-xs font-semibold text-muted-foreground mb-1">DSP ACTION FORWARDED</p>
                <p className="text-sm">{fr.adgpAction}</p>
              </div>
              <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5" /> ADGP RESPONSE</p>
              <textarea className="w-full h-20 rounded-lg border p-3 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                style={{ borderColor: "hsl(var(--border))" }}
                placeholder="ADGP directive / acknowledgement..."
                value={adgpResp} onChange={e => setAdgpResp(e.target.value)} />
              <div className="flex justify-end mt-2">
                <button onClick={() => { adgpRespondToFieldReport(report.id, adgpResp); onClose(); }}
                  disabled={!adgpResp}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                  <Check className="h-4 w-4" /> Save ADGP Response
                </button>
              </div>
            </div>
          )}
          {fr?.adgpResponse && (
            <div className="p-3 border rounded-lg" style={{ borderColor: "hsl(var(--risk-low) / 0.3)", background: "hsl(var(--risk-low) / 0.06)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "hsl(var(--risk-low))" }}>✓ ADGP RESPONSE RECEIVED</p>
              <p className="text-sm">{fr.adgpResponse}</p>
            </div>
          )}
          <button onClick={onClose} className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ChevronUp className="h-3.5 w-3.5" /> Collapse
          </button>
        </div>
      </td>
    </tr>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export function PEWOfficerPage() {
  const { intelligenceReports, delegateReport } = useAppStore();

  const storeIncoming = intelligenceReports.filter(r => r.status === 'approved_adgp');
  const storeDelegations = intelligenceReports.filter(r => r.status === 'delegated');
  const storeFieldReports = intelligenceReports.filter(r => r.status === 'field_report_received');
  const storeForwardedToAdgp = intelligenceReports.filter(r => r.fieldReport?.adgpAction);

  // Merge seed data with live store, deduplicated by ID
  const merge = (seed: IntelligenceReport[], live: IntelligenceReport[]) => [
    ...seed, ...live.filter(r => !seed.find(s => s.id === r.id)),
  ];
  const incomingInputs = merge(SEED_INCOMING, storeIncoming);
  const delegations = merge(SEED_DELEGATIONS, storeDelegations);
  const fieldReports = merge(SEED_FIELD_REPORTS, storeFieldReports);
  const forwardedToAdgp = merge(SEED_FORWARDED, storeForwardedToAdgp);

  const [activeTab, setActiveTab] = useState("Incoming CIU Input");
  const [selectedInput, setSelectedInput] = useState<IntelligenceReport | null>(null);
  const [delegationForm, setDelegationForm] = useState(false);
  const [fieldReportTarget, setFieldReportTarget] = useState<IntelligenceReport | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [fieldOfficer, setFieldOfficer] = useState("");
  const [district, setDistrict] = useState("");

  const tabs = [
    { label: "Incoming CIU Input", count: incomingInputs.length },
    { label: "Active Delegations", count: delegations.length },
    { label: "Field Reports", count: fieldReports.length },
    { label: "Forwarded to ADGP", count: forwardedToAdgp.length },
  ];

  const handleDelegate = () => {
    if (selectedInput && district && fieldOfficer) {
      delegateReport(selectedInput.id, district, fieldOfficer);
      setDelegationForm(false); setSelectedInput(null); setDistrict(""); setFieldOfficer("");
      setActiveTab("Active Delegations");
    }
  };

  const toggleRow = (id: string) => setExpandedRow(prev => prev === id ? null : id);

  const emptyRow = (cols: number, msg: string) => (
    <tr><td colSpan={cols} className="py-10 text-center text-sm text-muted-foreground">{msg}</td></tr>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-0">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6" style={{ color: "hsl(var(--primary))" }} /> PEW Operations
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Intelligence inputs · Delegation · Field monitoring · ADGP forwarding</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b mx-6 mt-4" style={{ borderColor: "hsl(var(--border))" }}>
        {tabs.map(({ label, count }) => (
          <button key={label} onClick={() => setActiveTab(label)}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold transition-colors relative ${activeTab === label ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {label}
            {count > 0 && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "hsl(var(--primary))", color: "#fff" }}>{count}</span>}
            {activeTab === label && <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "hsl(var(--primary))" }} />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">

        {/* ── INCOMING CIU INPUT ── */}
        {activeTab === "Incoming CIU Input" && (
          <div className="rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: "hsl(var(--border))" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ background: "hsl(var(--muted)/0.4)", borderColor: "hsl(var(--border))" }}>
                  <TH>Report ID</TH><TH>Date</TH><TH>Location</TH><TH>District</TH>
                  <TH>Offenders</TH><TH>Risk</TH><TH>Summary</TH><TH>Action</TH>
                </tr>
              </thead>
              <tbody>
                {incomingInputs.length === 0
                  ? emptyRow(8, "No pending CIU inputs awaiting delegation.")
                  : incomingInputs.map((r, i) => {
                    const p = r.offenders[0];
                    return (
                      <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                        className={`border-b transition-colors hover:bg-muted/20 ${i % 2 !== 0 ? "bg-muted/10" : ""}`}
                        style={{ borderColor: "hsl(var(--border))" }}>
                        <td className="py-3 px-4 font-mono text-xs font-semibold" style={{ color: "hsl(var(--accent))" }}>{r.id}</td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">{r.date}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{r.location}</td>
                        <td className="py-3 px-4 text-muted-foreground">{r.district}</td>
                        <td className="py-3 px-4 text-center font-semibold">{r.offenders.length}</td>
                        <td className="py-3 px-4">{p ? <span className={`risk-badge-${(p.risk || "low").toLowerCase()}`}>{(p.risk || "Low").toUpperCase()}</span> : "—"}</td>
                        <td className="py-3 px-4 text-xs text-muted-foreground max-w-[200px] truncate">{p?.description || p?.activity || "—"}</td>
                        <td className="py-3 px-4">
                          <button onClick={() => { setSelectedInput(r); setDelegationForm(true); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90"
                            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                            <User className="h-3 w-3" /> Delegate
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── ACTIVE DELEGATIONS ── */}
        {activeTab === "Active Delegations" && (
          <div className="rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: "hsl(var(--border))" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ background: "hsl(var(--muted)/0.4)", borderColor: "hsl(var(--border))" }}>
                  <TH>Report ID</TH><TH>Field Officer</TH><TH>District</TH>
                  <TH>Assigned Date</TH><TH>Offenders</TH><TH>Status</TH><TH>Action</TH>
                </tr>
              </thead>
              <tbody>
                {delegations.length === 0
                  ? emptyRow(7, "No active delegations.")
                  : delegations.map((r, i) => (
                    <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                      className={`border-b transition-colors hover:bg-muted/20 ${i % 2 !== 0 ? "bg-muted/10" : ""}`}
                      style={{ borderColor: "hsl(var(--border))" }}>
                      <td className="py-3 px-4 font-mono text-xs font-semibold" style={{ color: "hsl(var(--accent))" }}>{r.id}</td>
                      <td className="py-3 px-4 font-medium text-foreground flex items-center gap-1.5 mt-0.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />{r.delegation?.officer}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{r.delegation?.district}</span></td>
                      <td className="py-3 px-4 text-muted-foreground"><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.delegation?.assignedDate}</span></td>
                      <td className="py-3 px-4 text-center font-semibold">{r.offenders.length}</td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
                          style={{ background: "hsl(var(--risk-medium) / 0.12)", color: "hsl(var(--risk-medium))" }}>
                          Monitoring
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button onClick={() => setFieldReportTarget(r)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90"
                          style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                          <Plus className="h-3 w-3" /> Submit Report
                        </button>
                      </td>
                    </motion.tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── FIELD REPORTS ── */}
        {activeTab === "Field Reports" && (
          <div className="rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: "hsl(var(--border))" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ background: "hsl(var(--muted)/0.4)", borderColor: "hsl(var(--border))" }}>
                  <TH>Report ID</TH><TH>Officer</TH><TH>District</TH>
                  <TH>Date Received</TH><TH>Action Taken</TH><TH>Remand Info</TH><TH>DSP Action</TH>
                </tr>
              </thead>
              <tbody>
                {fieldReports.length === 0
                  ? emptyRow(7, "No field reports received yet.")
                  : fieldReports.flatMap((r, i) => {
                    const fr = r.fieldReport!;
                    const cfg = ACTION_CONFIG[fr.actionTaken || "surveillance"];
                    const isExp = expandedRow === r.id;
                    return [
                      <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                        className={`border-b transition-colors hover:bg-muted/20 ${i % 2 !== 0 ? "bg-muted/10" : ""}`}
                        style={{ borderColor: "hsl(var(--border))" }}>
                        <td className="py-3 px-4 font-mono text-xs font-semibold" style={{ color: "hsl(var(--accent))" }}>{r.id}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{r.delegation?.officer}</td>
                        <td className="py-3 px-4 text-muted-foreground">{r.delegation?.district}</td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">{fr.date}</td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
                            style={{ background: cfg.bg, color: cfg.text }}>{cfg.label}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">
                          {fr.actionTaken === "arrested" && fr.arrestDetails
                            ? <span className="font-semibold text-foreground">{fr.arrestDetails.accusedName} · {fr.arrestDetails.court}</span>
                            : "—"}
                        </td>
                        <td className="py-3 px-4">
                          <button onClick={() => toggleRow(r.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-80">
                            {isExp ? <><ChevronUp className="h-3.5 w-3.5" /> Collapse</> : <><ChevronDown className="h-3.5 w-3.5" /> Forward to ADGP</>}
                          </button>
                        </td>
                      </motion.tr>,
                      isExp && <RowDetail key={`${r.id}-detail`} report={r} onClose={() => setExpandedRow(null)} />,
                    ];
                  })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── FORWARDED TO ADGP ── */}
        {activeTab === "Forwarded to ADGP" && (
          <div className="rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: "hsl(var(--border))" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ background: "hsl(var(--muted)/0.4)", borderColor: "hsl(var(--border))" }}>
                  <TH>Report ID</TH><TH>Officer</TH><TH>District</TH>
                  <TH>Action Taken</TH><TH>Forwarded Date</TH><TH>ADGP Response</TH><TH>Details</TH>
                </tr>
              </thead>
              <tbody>
                {forwardedToAdgp.length === 0
                  ? emptyRow(7, "No reports forwarded to ADGP yet.")
                  : forwardedToAdgp.flatMap((r, i) => {
                    const fr = r.fieldReport!;
                    const cfg = ACTION_CONFIG[fr.actionTaken || "surveillance"];
                    const hasResp = !!fr.adgpResponse;
                    const isExp = expandedRow === r.id;
                    return [
                      <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                        className={`border-b transition-colors hover:bg-muted/20 ${i % 2 !== 0 ? "bg-muted/10" : ""}`}
                        style={{ borderColor: "hsl(var(--border))" }}>
                        <td className="py-3 px-4 font-mono text-xs font-semibold" style={{ color: "hsl(var(--accent))" }}>{r.id}</td>
                        <td className="py-3 px-4 font-medium text-foreground">{r.delegation?.officer}</td>
                        <td className="py-3 px-4 text-muted-foreground">{r.delegation?.district}</td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
                            style={{ background: cfg.bg, color: cfg.text }}>{cfg.label}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">{fr.date}</td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold"
                            style={{ background: hasResp ? "hsl(var(--risk-low)/0.12)" : "hsl(var(--risk-medium)/0.12)", color: hasResp ? "hsl(var(--risk-low))" : "hsl(var(--risk-medium))" }}>
                            {hasResp ? "Responded" : "Awaiting"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button onClick={() => toggleRow(r.id)}
                            className="flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-80">
                            {isExp ? <><ChevronUp className="h-3.5 w-3.5" /> Collapse</> : <><ChevronDown className="h-3.5 w-3.5" /> View / Respond</>}
                          </button>
                        </td>
                      </motion.tr>,
                      isExp && <RowDetail key={`${r.id}-detail`} report={r} onClose={() => setExpandedRow(null)} />,
                    ];
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── DELEGATION FORM OVERLAY ── */}
      {delegationForm && selectedInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card border rounded-xl shadow-lg flex flex-col p-6"
            style={{ borderColor: "hsl(var(--border))" }}>
            <h2 className="text-lg font-bold text-foreground mb-1">Delegate Task</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Assign <span className="font-mono" style={{ color: "hsl(var(--accent))" }}>{selectedInput.id}</span> to a field officer for monitoring.
            </p>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Select District</label>
                <select className={inputCls} value={district} onChange={e => setDistrict(e.target.value)}>
                  <option value="">-- Choose District --</option>
                  {["Madurai", "Coimbatore", "Chennai", "Trichy", "Salem", "Thanjavur"].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Assign Field Officer</label>
                <select className={inputCls} value={fieldOfficer} onChange={e => setFieldOfficer(e.target.value)}>
                  <option value="">-- Choose Officer --</option>
                  {["DSP", "Inspector", "SI",].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t" style={{ borderColor: "hsl(var(--border))" }}>
                <button onClick={() => setDelegationForm(false)} className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</button>
                <button onClick={handleDelegate} disabled={!district || !fieldOfficer}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                  Confirm Delegation
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── FIELD REPORT MODAL ── */}
      {fieldReportTarget && (
        <FieldReportModal report={fieldReportTarget} onClose={() => setFieldReportTarget(null)} />
      )}
    </div>
  );
}
