import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useAppStore, ApprovalRole, ReportStatus, IntelligenceReport } from "../../store/appStore";
import { ShieldAlert, CheckCircle, XCircle, ArrowRight, Clock, MessageSquare, Edit2, Save, X, Download, FileText, Upload, Paperclip, Trash2 } from "lucide-react";

// ── Seed sample data ────────────────────────────────────────────────────────
const STATUS_META: Record<string, { label: string; pill: string }> = {
  pending_dsp:   { label: "Pending DSP",     pill: "bg-yellow-100 text-yellow-700" },
  pending_spciu: { label: "Pending SPCIU",   pill: "bg-orange-100 text-orange-700" },
  pending_dig:   { label: "Pending DIG",     pill: "bg-blue-100 text-blue-700" },
  pending_adgp:  { label: "Pending ADGP",    pill: "bg-purple-100 text-purple-700" },
  approved_adgp: { label: "ADGP Approved ✓", pill: "bg-green-100 text-green-700" },
  delegated:     { label: "Delegated",        pill: "bg-cyan-100 text-cyan-700" },
  rejected:      { label: "Rejected",         pill: "bg-red-100 text-red-700" },
  field_report_received: { label: "Field Report Received", pill: "bg-teal-100 text-teal-700" },
};

const SEED_CIU: IntelligenceReport[] = [
  { id:"INT-2025-3001", source:"CIU", date:"2025-03-02", time:"09:00", location:"Central Bus Stand", district:"Chennai",
    offenders:[{type:"known",firstName:"Arun",lastName:"Vel",risk:"High"}], status:"approved_adgp",
    history:[{role:"CIU",action:"submitted",date:"2025-03-02T09:00:00Z"},{role:"DSP",action:"approved",date:"2025-03-02T11:00:00Z"},{role:"SPCIU",action:"approved",date:"2025-03-03T09:30:00Z"},{role:"DIG",action:"approved",date:"2025-03-03T14:00:00Z"},{role:"ADGP",action:"approved",date:"2025-03-04T10:00:00Z",comment:"Proceed immediately."}]},
  { id:"INT-2025-3105", source:"CIU", date:"2025-03-05", time:"14:15", location:"Koyambedu Market", district:"Chennai",
    offenders:[{type:"known",firstName:"Bala",lastName:"Krishnan",risk:"Medium"},{type:"unknown",description:"Male companion",risk:"Low"}], status:"pending_dig",
    history:[{role:"CIU",action:"submitted",date:"2025-03-05T14:15:00Z"},{role:"DSP",action:"approved",date:"2025-03-06T08:00:00Z"},{role:"SPCIU",action:"approved",date:"2025-03-06T16:30:00Z",comment:"Verified."}]},
  { id:"INT-2025-3202", source:"CIU", date:"2025-03-08", time:"11:30", location:"Periyar Nagar", district:"Madurai",
    offenders:[{type:"known",firstName:"Chitra",lastName:"Selvam",risk:"High"}], status:"pending_spciu",
    history:[{role:"CIU",action:"submitted",date:"2025-03-08T11:30:00Z"},{role:"DSP",action:"approved",date:"2025-03-09T09:00:00Z",comment:"Credible source."}]},
  { id:"INT-2025-3308", source:"CIU", date:"2025-03-11", time:"16:00", location:"Gandhipuram", district:"Coimbatore",
    offenders:[{type:"known",firstName:"Durai",lastName:"Nadar",risk:"Low"}], status:"rejected",
    history:[{role:"CIU",action:"submitted",date:"2025-03-11T16:00:00Z"},{role:"DSP",action:"rejected",date:"2025-03-12T10:00:00Z",comment:"Insufficient evidence."}]},
  { id:"INT-2025-3410", source:"CIU", date:"2025-03-14", time:"08:45", location:"Salem Junction", district:"Salem",
    offenders:[{type:"unknown",description:"Two men on white Pulsar",risk:"Medium"}], status:"pending_dsp",
    history:[{role:"CIU",action:"submitted",date:"2025-03-14T08:45:00Z"}]},
];

const SEED_PEW: IntelligenceReport[] = [
  { id:"INT-2025-2901", source:"CIU", date:"2025-03-01", time:"10:00", location:"RS Puram", district:"Coimbatore",
    offenders:[{type:"known",firstName:"Elanko",lastName:"Raja",risk:"High"}], status:"approved_adgp",
    history:[{role:"CIU",action:"submitted",date:"2025-03-01T10:00:00Z"},{role:"ADGP",action:"approved",date:"2025-03-02T09:00:00Z",comment:"High priority."}]},
  { id:"INT-2025-2980", source:"CIU", date:"2025-03-03", time:"09:00", location:"RS Puram Junction", district:"Coimbatore",
    offenders:[{type:"known",firstName:"Senthil",lastName:"Kumar",risk:"High"}], status:"delegated",
    delegation:{officer:"Inspector Rajan",district:"Coimbatore",assignedDate:"2025-03-04"},
    history:[{role:"CIU",action:"submitted",date:"2025-03-03T09:00:00Z"},{role:"ADGP",action:"approved",date:"2025-03-04T08:00:00Z"},{role:"PEW_DSP",action:"delegated",date:"2025-03-04T10:00:00Z"}]},
  { id:"INT-2025-3210", source:"CIU", date:"2025-03-08", time:"10:00", location:"Koyambedu Market", district:"Chennai",
    offenders:[{type:"known",firstName:"Raghu",lastName:"Nadar",risk:"High"}], status:"approved_adgp",
    history:[{role:"CIU",action:"submitted",date:"2025-03-08T10:00:00Z"},{role:"ADGP",action:"approved",date:"2025-03-09T09:00:00Z"}]},
];

const SEED_PENDING: IntelligenceReport[] = [
  { id:"INT-2025-3105", source:"CIU", date:"2025-03-05", time:"14:15", location:"Koyambedu", district:"Chennai",
    offenders:[{type:"known",firstName:"Bala",lastName:"Krishnan",risk:"Medium"}], status:"pending_dig",
    history:[{role:"CIU",action:"submitted",date:"2025-03-05T14:15:00Z"},{role:"DSP",action:"approved",date:"2025-03-06T08:00:00Z"},{role:"SPCIU",action:"approved",date:"2025-03-06T16:30:00Z"}]},
  { id:"INT-2025-3350", source:"CIU", date:"2025-03-12", time:"13:00", location:"Anna Nagar", district:"Chennai",
    offenders:[{type:"known",firstName:"Priya",lastName:"Murthi",risk:"High"}], status:"pending_dig",
    history:[{role:"CIU",action:"submitted",date:"2025-03-12T13:00:00Z"},{role:"DSP",action:"approved",date:"2025-03-13T09:00:00Z"},{role:"SPCIU",action:"approved",date:"2025-03-13T14:00:00Z",comment:"High risk — expedite."}]},
];

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="text-left py-2.5 px-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">{children}</th>
);


const getRoleStatusMap = (role: ApprovalRole): ReportStatus => {
  switch (role) {
    case 'DSP': return 'pending_dsp';
    case 'SPCIU': return 'pending_spciu';
    case 'DIG': return 'pending_dig';
    case 'ADGP': return 'pending_adgp';
    default: return 'pending_dsp';
  }
};

const getNextStatus = (role: ApprovalRole): ReportStatus => {
  switch (role) {
    case 'DSP': return 'pending_spciu';
    case 'SPCIU': return 'pending_dig';
    case 'DIG': return 'pending_adgp';
    case 'ADGP': return 'approved_adgp';
    default: return 'pending_dsp';
  }
};

export function ApprovalDashboard() {
  const { 
    currentUserRole, 
    setCurrentUserRole, 
    intelligenceReports, 
    updateReportStatus,
    updateOffenderDetails
  } = useAppStore();
  
  const [selectedReport, setSelectedReport] = useState<IntelligenceReport | null>(null);
  const [comment, setComment] = useState("");
  const [editingOffenderIndex, setEditingOffenderIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});

  // ── Upload state ──────────────────────────────────────────────────────────
  type UploadedFile = { name: string; size: number; type: 'pdf' | 'word'; file: File };
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'pdf' | 'word') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFiles(prev => [...prev, { name: file.name, size: file.size, type: fileType, file }]);
    e.target.value = ''; // Reset
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  const pendingStatus = getRoleStatusMap(currentUserRole);
  const pendingReports = intelligenceReports.filter(r => r.status === pendingStatus);
  const historyReports = intelligenceReports.filter(
    r => r.history.some(h => h.role === currentUserRole && h.action !== 'submitted')
  );

  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  const handleApprove = () => {
    if (!selectedReport) return;
    const nextStatus = getNextStatus(currentUserRole);
    updateReportStatus(selectedReport.id, nextStatus, currentUserRole, 'approved', comment);
    setSelectedReport(null);
    setComment("");
  };

  const handleReject = () => {
    if (!selectedReport) return;
    updateReportStatus(selectedReport.id, 'rejected', currentUserRole, 'rejected', comment);
    setSelectedReport(null);
    setComment("");
    setUploadedFiles([]);
    setEditingOffenderIndex(null);
  };

  const handleApproveWithUpload = () => {
    if (!selectedReport) return;
    handleApprove();
    setUploadedFiles([]);
  };

  const startEditing = (index: number, offender: any) => {
    setEditingOffenderIndex(index);
    setEditFormData({ ...offender });
  };

  const cancelEditing = () => {
    setEditingOffenderIndex(null);
    setEditFormData({});
  };

  const saveOffenderDetails = () => {
    if (!selectedReport || editingOffenderIndex === null) return;
    updateOffenderDetails(selectedReport.id, editingOffenderIndex, editFormData);
    // Update local selected report state to reflect changes immediately
    setSelectedReport(prev => {
      if (!prev) return prev;
      const newOffenders = [...prev.offenders];
      newOffenders[editingOffenderIndex] = { ...newOffenders[editingOffenderIndex], ...editFormData };
      return { ...prev, offenders: newOffenders };
    });
    setEditingOffenderIndex(null);
  };

  const exportToWord = () => {
    if (!selectedReport) return;
    
    // Create HTML content for the Word document
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Intelligence Report ${selectedReport.id}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          h1, h2, h3 { color: #1a365d; margin-bottom: 10px; }
          .header { border-bottom: 2px solid #1a365d; padding-bottom: 10px; margin-bottom: 20px; }
          .meta-info { margin-bottom: 20px; font-size: 14px; }
          .section { margin-bottom: 25px; }
          .offender-card { border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; background: #f9f9f9; }
          .timeline { margin-top: 20px; }
          .timeline-item { margin-bottom: 10px; font-size: 14px; }
          .label { font-weight: bold; color: #555; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Intelligence Report: ${selectedReport.id}</h1>
          <p><strong>District:</strong> ${selectedReport.district}</p>
          <p><strong>Location:</strong> ${selectedReport.location}</p>
        </div>
        
        <div class="meta-info">
          <p><span class="label">Initiated By:</span> ${selectedReport.source}</p>
          <p><span class="label">Date/Time:</span> ${selectedReport.date} ${selectedReport.time}</p>
          <p><span class="label">Current Status:</span> ${selectedReport.status.replace('_', ' ').toUpperCase()}</p>
        </div>

        <div class="section">
          <h2>Offenders Involved (${selectedReport.offenders.length})</h2>
          ${selectedReport.offenders.map(o => `
            <div class="offender-card">
              <h3>${[o.firstName, o.lastName, o.surName].filter(Boolean).join(' ') || 'Unknown'} ${o.aliasName ? `(Alias: ${o.aliasName})` : ''} (${o.type.toUpperCase()})</h3>
              <p><span class="label">Risk Level:</span> ${o.risk || 'Not Specified'}</p>
              <p><span class="label">Address:</span> ${o.address || 'N/A'}</p>
              ${o.idProofNumber ? `<p><span class="label">ID Proof Number:</span> ${o.idProofNumber}</p>` : ''}
              ${o.description ? `<p><span class="label">Description:</span> ${o.description}</p>` : ''}
              ${o.activity ? `<p><span class="label">Activity:</span> ${o.activity}</p>` : ''}
              ${o.vehicle ? `<p><span class="label">Vehicle:</span> ${o.vehicle}</p>` : ''}
            </div>
          `).join('')}
        </div>

        <div class="section timeline">
          <h2>Approval Timeline</h2>
          <ul>
            ${selectedReport.history.map(h => `
              <li class="timeline-item">
                <strong>${h.role}</strong> - ${h.action.toUpperCase()} on ${new Date(h.date).toLocaleString()}
                ${h.comment ? `<br/><em>Comment: "${h.comment}"</em>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      </body>
      </html>
    `;

    // Create a Blob and trigger download
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Intelligence_Report_${selectedReport.id}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // In a real app we'd use a library like jspdf or react-to-pdf.
    // Here we use window.print() combined with a print stylesheet class to generate a functional PDF
    if (!selectedReport) return;
    
    // Add a class to body to trigger print-specific CSS rules (we will add these to index.css)
    document.body.classList.add('print-report-mode');
    setTimeout(() => {
      window.print();
      document.body.classList.remove('print-report-mode');
    }, 100);
  };

  // Only allow CIU, PEW_DSP and the active approval roles
  const roles: ApprovalRole[] = ['CIU', 'DSP', 'SPCIU', 'DIG', 'ADGP', 'PEW_DSP'];

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto space-y-6">
      
      {/* Dev Tool: Role Switcher */}
      <div className="bg-muted/20 p-4 rounded-xl border border-dashed text-sm flex items-center justify-between" style={{ borderColor: 'hsl(var(--border))' }}>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-muted-foreground">Demo Role Switcher:</span>
          <div className="flex gap-2">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setCurrentUserRole(role)}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${currentUserRole === role ? 'bg-primary text-white' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Currently acting as <span className="font-bold text-foreground">{currentUserRole}</span>
        </div>
      </div>


      {/* ─── CIU VIEW: Shows Reports Submitted by CIU ──────────────── */}
      {currentUserRole === 'CIU' && (() => {
        const live = intelligenceReports.filter(r => r.source === 'CIU');
        const ciuReports = [...SEED_CIU, ...live.filter(r => !SEED_CIU.find(s => s.id === r.id))];
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-foreground">My Submitted Reports</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{ciuReports.length} reports submitted by CIU</p>
            </div>
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
                    <tr><TH>Report ID</TH><TH>Date / Time</TH><TH>Location</TH><TH>District</TH><TH>Offenders</TH><TH>Last Action</TH><TH>Status</TH></tr>
                  </thead>
                  <tbody>
                    {ciuReports.length === 0 ? (
                      <tr><td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">No reports submitted yet. Use the CIU Initiated tab.</td></tr>
                    ) : ciuReports.map((r, i) => {
                      const sm = STATUS_META[r.status] || { label: r.status, pill: 'bg-muted text-muted-foreground' };
                      const last = r.history[r.history.length - 1];
                      return (
                        <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                          className={`border-b transition-colors hover:bg-muted/10 ${i % 2 !== 0 ? 'bg-muted/5' : ''}`}
                          style={{ borderColor: 'hsl(var(--border))' }}>
                          <td className="py-3 px-4 font-mono text-xs font-semibold" style={{ color: 'hsl(var(--accent))' }}>{r.id}</td>
                          <td className="py-3 px-4 text-xs text-muted-foreground">{r.date}<br/><span className="opacity-60">{r.time}</span></td>
                          <td className="py-3 px-4 font-medium text-foreground">{r.location}</td>
                          <td className="py-3 px-4 text-muted-foreground">{r.district}</td>
                          <td className="py-3 px-4 text-center font-semibold">{r.offenders.length}</td>
                          <td className="py-3 px-4 text-xs">
                            {last && (
                              <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                                last.action === 'approved' ? 'bg-green-100 text-green-700' :
                                last.action === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-muted text-muted-foreground'
                              }`}>{last.role}: {last.action}</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${sm.pill}`}>{sm.label}</span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── PEW_DSP VIEW: ADGP-approved reports ready for delegation ── */}
      {currentUserRole === 'PEW_DSP' && (() => {
        const live = intelligenceReports.filter(r => r.status === 'approved_adgp' || r.status === 'delegated');
        const approvedReports = [...SEED_PEW, ...live.filter(r => !SEED_PEW.find(s => s.id === r.id))];
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-foreground">ADGP Approved Reports — Action Required</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Reports approved by ADGP and awaiting PEW DSP delegation</p>
            </div>
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'hsl(var(--border))' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
                    <tr><TH>Report ID</TH><TH>Date</TH><TH>Location</TH><TH>District</TH><TH>Offenders</TH><TH>ADGP Approved On</TH><TH>Status</TH><TH>Delegated To</TH></tr>
                  </thead>
                  <tbody>
                    {approvedReports.length === 0 ? (
                      <tr><td colSpan={8} className="py-10 text-center text-sm text-muted-foreground">No reports awaiting delegation.</td></tr>
                    ) : approvedReports.map((r, i) => {
                      const sm = STATUS_META[r.status] || { label: r.status, pill: 'bg-muted text-muted-foreground' };
                      const adgpEntry = r.history.find(h => h.role === 'ADGP');
                      return (
                        <motion.tr key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                          className={`border-b transition-colors hover:bg-muted/10 ${i % 2 !== 0 ? 'bg-muted/5' : ''}`}
                          style={{ borderColor: 'hsl(var(--border))' }}>
                          <td className="py-3 px-4 font-mono text-xs font-semibold" style={{ color: 'hsl(var(--accent))' }}>{r.id}</td>
                          <td className="py-3 px-4 text-xs text-muted-foreground">{r.date}</td>
                          <td className="py-3 px-4 font-medium text-foreground">{r.location}</td>
                          <td className="py-3 px-4 text-muted-foreground">{r.district}</td>
                          <td className="py-3 px-4 text-center font-semibold">{r.offenders.length}</td>
                          <td className="py-3 px-4 text-xs text-muted-foreground">
                            {adgpEntry ? new Date(adgpEntry.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }) : '—'}
                            {adgpEntry?.comment && <p className="italic opacity-70 mt-0.5">"{adgpEntry.comment}"</p>}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${sm.pill}`}>{sm.label}</span>
                          </td>
                          <td className="py-3 px-4 text-xs text-muted-foreground">
                            {r.delegation ? <span className="font-medium text-foreground">{r.delegation.officer}</span> : <span className="opacity-40">—</span>}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── APPROVER VIEW (DSP/SPCIU/DIG/ADGP) ────────────────────── */}
      {!['CIU', 'PEW_DSP'].includes(currentUserRole) && (
        <>
          <div className="flex items-center gap-1 border-b" style={{ borderColor: "hsl(var(--border))" }}>
            <button onClick={() => setActiveTab('pending')}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors relative ${activeTab === 'pending' ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              Pending Approvals ({[...SEED_PENDING.filter(s => !pendingReports.find(r => r.id === s.id)), ...pendingReports].length})
              {activeTab === 'pending' && <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "hsl(var(--primary))" }} />}
            </button>
            <button onClick={() => setActiveTab('history')}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors relative ${activeTab === 'history' ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              My History ({historyReports.length})
              {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "hsl(var(--primary))" }} />}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* List View — compact clickable table */}
            <div>
              {activeTab === 'pending' && (() => {
                const merged = [...SEED_PENDING.filter(s => !pendingReports.find(r => r.id === s.id)), ...pendingReports];
                return merged.length === 0 ? (
                  <div className="text-center p-8 bg-muted/10 border rounded-lg" style={{ borderColor: 'hsl(var(--border))' }}>
                    <p className="text-sm font-semibold text-muted-foreground">No pending reports for {currentUserRole}</p>
                  </div>
                ) : (
                  <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'hsl(var(--border))' }}>
                    <table className="w-full text-sm">
                      <thead className="bg-muted/40 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
                        <tr><TH>ID</TH><TH>Date</TH><TH>Location</TH><TH>Offenders</TH><TH>Risk</TH></tr>
                      </thead>
                      <tbody>
                        {merged.map((report, i) => {
                          const topRisk = report.offenders[0]?.risk || 'Low';
                          return (
                            <motion.tr key={report.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                              onClick={() => { setActiveTab('pending'); setSelectedReport(report); }}
                              className={`border-b cursor-pointer transition-colors hover:bg-primary/5 ${selectedReport?.id === report.id ? 'bg-primary/10' : i % 2 !== 0 ? 'bg-muted/5' : ''}`}
                              style={{ borderColor: 'hsl(var(--border))' }}>
                              <td className="py-3 px-4 font-mono text-xs font-semibold" style={{ color: 'hsl(var(--accent))' }}>{report.id}</td>
                              <td className="py-3 px-4 text-xs text-muted-foreground">{report.date}</td>
                              <td className="py-3 px-4 text-xs font-medium text-foreground">{report.location}<br/><span className="text-muted-foreground font-normal">{report.district}</span></td>
                              <td className="py-3 px-4 text-center text-xs font-semibold">{report.offenders.length}</td>
                              <td className="py-3 px-4">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  topRisk.toLowerCase() === 'high' ? 'bg-red-100 text-red-700' :
                                  topRisk.toLowerCase() === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                }`}>{topRisk}</span>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })()}

              {activeTab === 'history' && (historyReports.length === 0 ? (
                <div className="text-center p-8 bg-muted/10 border rounded-lg" style={{ borderColor: 'hsl(var(--border))' }}>
                  <p className="text-sm font-semibold text-muted-foreground">No approval history found for {currentUserRole}</p>
                </div>
              ) : (
                <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'hsl(var(--border))' }}>
                  <table className="w-full text-sm">
                    <thead className="bg-muted/40 border-b" style={{ borderColor: 'hsl(var(--border))' }}>
                      <tr><TH>ID</TH><TH>Date</TH><TH>Location</TH><TH>My Action</TH><TH>Status</TH></tr>
                    </thead>
                    <tbody>
                      {historyReports.map((report, i) => {
                        const myAction = report.history.find(h => h.role === currentUserRole && h.action !== 'submitted');
                        const sm = STATUS_META[report.status] || { label: report.status, pill: 'bg-muted text-muted-foreground' };
                        return (
                          <motion.tr key={report.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                            onClick={() => setSelectedReport(report)}
                            className={`border-b cursor-pointer transition-colors hover:bg-primary/5 ${i % 2 !== 0 ? 'bg-muted/5' : ''}`}
                            style={{ borderColor: 'hsl(var(--border))' }}>
                            <td className="py-3 px-4 font-mono text-xs font-semibold" style={{ color: 'hsl(var(--accent))' }}>{report.id}</td>
                            <td className="py-3 px-4 text-xs text-muted-foreground">{report.date}</td>
                            <td className="py-3 px-4 text-xs font-medium text-foreground">{report.location}</td>
                            <td className="py-3 px-4">
                              {myAction && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${myAction.action === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{myAction.action}</span>}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sm.pill}`}>{sm.label}</span>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>


            {/* Detail View */}
            {selectedReport ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border rounded-xl overflow-hidden shadow-sm flex flex-col h-full print-container"
                id="report-print-container"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <div className="p-4 border-b bg-muted/20 flex justify-between items-start" style={{ borderColor: "hsl(var(--border))" }}>
                  <div>
                    <h3 className="font-bold text-foreground">Report {selectedReport.id} Validation</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Please review the details below before acting.</p>
                  </div>
                  <div className="flex gap-2 no-print">
                    {/* Hidden file inputs */}
                    <input
                      ref={pdfInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={e => handleFileUpload(e, 'pdf')}
                    />
                    <input
                      ref={wordInputRef}
                      type="file"
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={e => handleFileUpload(e, 'word')}
                    />
                    {/* Download buttons */}
                    <button 
                      onClick={exportToPDF}
                      className="p-1.5 rounded-md border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Download as PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={exportToWord}
                      className="p-1.5 rounded-md border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Download as Word"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    {/* Divider */}
                    <div className="w-px bg-border mx-0.5" style={{ background: 'hsl(var(--border))' }} />
                    {/* Upload buttons */}
                    <button
                      onClick={() => pdfInputRef.current?.click()}
                      className="p-1.5 rounded-md border bg-background hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                      title="Upload PDF"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => wordInputRef.current?.click()}
                      className="p-1.5 rounded-md border bg-background hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition-colors"
                      title="Upload Word Document"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> REPORT TIMELINE
                    </h4>
                    <div className="bg-muted/10 rounded-lg p-3 text-sm border space-y-2" style={{ borderColor: 'hsl(var(--border))' }}>
                      {selectedReport.history.map((h, i) => (
                        <div key={i} className="flex gap-3 text-xs">
                          <span className="text-muted-foreground w-12">{new Date(h.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          <span className="font-bold w-12 text-foreground">{h.role}</span>
                          <span className="flex-1 opacity-80">
                            {h.action === 'submitted' ? 'Initiated report' : h.action === 'approved' ? 'Approved report' : 'Rejected report'}
                            {h.comment && <div className="mt-1 italic opacity-70">"{h.comment}"</div>}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground mb-2">OFFENDERS INVOLVED</h4>
                    <div className="space-y-3">
                      {selectedReport.offenders.map((o, i) => (
                        <div key={i} className="border rounded-lg p-3 bg-background relative group" style={{ borderColor: "hsl(var(--border))" }}>
                          
                          {editingOffenderIndex === i ? (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-primary">Editing Offender</span>
                                <div className="flex gap-2">
                                  <button onClick={cancelEditing} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                                    <X className="w-4 h-4" />
                                  </button>
                                  <button onClick={saveOffenderDetails} className="p-1 text-primary hover:opacity-80 transition-colors">
                                    <Save className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[10px] font-semibold text-muted-foreground">First Name</label>
                                  <input type="text" className="w-full text-xs p-1.5 rounded border bg-muted/30 uppercase" 
                                    value={editFormData.firstName || ''} onChange={e => setEditFormData({...editFormData, firstName: e.target.value})} />
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-muted-foreground">Last Name</label>
                                  <input type="text" className="w-full text-xs p-1.5 rounded border bg-muted/30 uppercase" 
                                    value={editFormData.lastName || ''} onChange={e => setEditFormData({...editFormData, lastName: e.target.value})} />
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-muted-foreground">Sur Name</label>
                                  <input type="text" className="w-full text-xs p-1.5 rounded border bg-muted/30 uppercase" 
                                    value={editFormData.surName || ''} onChange={e => setEditFormData({...editFormData, surName: e.target.value})} />
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-muted-foreground">Alias Name</label>
                                  <input type="text" className="w-full text-xs p-1.5 rounded border bg-muted/30 uppercase" 
                                    value={editFormData.aliasName || ''} onChange={e => setEditFormData({...editFormData, aliasName: e.target.value})} />
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-muted-foreground">ID Proof Number</label>
                                  <input type="text" className="w-full text-xs p-1.5 rounded border bg-muted/30 uppercase" 
                                    value={editFormData.idProofNumber || ''} onChange={e => setEditFormData({...editFormData, idProofNumber: e.target.value})} />
                                </div>
                                <div>
                                  <label className="text-[10px] font-semibold text-muted-foreground">Risk Level</label>
                                  <select className="w-full text-xs p-1.5 rounded border bg-muted/30" 
                                    value={editFormData.risk || 'Low'} onChange={e => setEditFormData({...editFormData, risk: e.target.value})}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                  </select>
                                </div>
                              </div>
                              <div>
                                <label className="text-[10px] font-semibold text-muted-foreground">Address</label>
                                <input type="text" className="w-full text-xs p-1.5 rounded border bg-muted/30" 
                                  value={editFormData.address || ''} onChange={e => setEditFormData({...editFormData, address: e.target.value})} />
                              </div>
                              <div>
                                <label className="text-[10px] font-semibold text-muted-foreground">Activity Summary</label>
                                <textarea className="w-full text-xs p-1.5 rounded border bg-muted/30 resize-none h-16" 
                                  value={editFormData.activity || editFormData.description || ''} onChange={e => setEditFormData({...editFormData, activity: e.target.value})} />
                              </div>
                            </div>
                          ) : (
                            <>
                              <button 
                                onClick={() => startEditing(i, o)}
                                className="absolute top-3 right-3 p-1.5 rounded bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground no-print"
                                title="Edit Offender Details"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              
                              <div className="flex justify-between items-start mb-1 pr-8">
                                <div>
                                  <span className="font-bold text-sm text-foreground">{[o.firstName, o.lastName, o.surName].filter(Boolean).join(' ') || 'Unknown'}</span>
                                  {o.aliasName && <span className="text-xs text-muted-foreground ml-2 text-primary/80 font-medium">({o.aliasName})</span>}
                                </div>
                                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{o.type}</span>
                              </div>
                              {o.idProofNumber && <p className="text-xs text-muted-foreground mt-1 mb-1 font-mono">ID Proof: {o.idProofNumber}</p>}
                              <p className="text-xs text-muted-foreground">{o.address}</p>
                              {o.activity && <p className="text-xs mt-2 text-foreground p-2 rounded bg-muted/30 italic">"{o.activity}"</p>}
                              {o.description && !o.activity && <p className="text-xs mt-2 text-foreground p-2 rounded bg-muted/30 italic">"{o.description}"</p>}
                              {o.risk && <p className={`text-xs mt-2 font-semibold ${o.risk.toLowerCase() === 'high' ? 'text-destructive' : o.risk.toLowerCase() === 'medium' ? 'text-yellow-600' : 'text-primary'}`}>Risk: {o.risk}</p>}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t bg-muted/10 space-y-4 no-print" style={{ borderColor: "hsl(var(--border))" }}>

                  {/* Uploaded files list */}
                  {uploadedFiles.length > 0 && (
                    <div>
                      <label className="text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1">
                        <Paperclip className="w-3 h-3" /> Attached Documents ({uploadedFiles.length})
                      </label>
                      <div className="space-y-1.5">
                        {uploadedFiles.map((f, i) => (
                          <div key={i} className="flex items-center justify-between px-3 py-2 rounded-md border bg-background text-xs" style={{ borderColor: 'hsl(var(--border))' }}>
                            <div className="flex items-center gap-2 min-w-0">
                              {f.type === 'pdf' ? (
                                <Download className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              ) : (
                                <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              )}
                              <span className="font-medium text-foreground truncate">{f.name}</span>
                              <span className="text-muted-foreground shrink-0">{formatFileSize(f.size)}</span>
                            </div>
                            <button
                              onClick={() => removeUploadedFile(i)}
                              className="ml-2 p-0.5 rounded text-muted-foreground hover:text-destructive transition-colors shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-muted-foreground mb-1 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Add Comment / Remarks (Optional)
                    </label>
                    <textarea 
                      className="w-full text-sm p-2 rounded-md border bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      style={{ borderColor: "hsl(var(--border))" }}
                      rows={2}
                      placeholder="Type your notes here..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={handleReject}
                      className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg border text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors"
                      style={{ borderColor: "hsl(var(--destructive)/0.5)" }}
                    >
                      <XCircle className="w-4 h-4" /> Reject Report
                    </button>
                    <button 
                      onClick={handleApproveWithUpload}
                      className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity hover:opacity-90 shadow-md"
                      style={{ background: "hsl(var(--primary))" }}
                    >
                      Approve Report <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'pending' ? (
              <div className="hidden lg:flex flex-col items-center justify-center p-8 text-center bg-card border rounded-xl" style={{ borderColor: 'hsl(var(--border))' }}>
                <ArrowRight className="h-8 w-8 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-sm font-bold text-foreground">Select a Report</h3>
                <p className="text-xs text-muted-foreground mt-1 text-balance">
                  Click on a pending report from the list to view details and take action.
                </p>
              </div>
            ) : null}
            
          </div>
        </>
      )}
    </div>
  );
}
