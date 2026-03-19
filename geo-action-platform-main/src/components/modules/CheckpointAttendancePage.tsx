import { useState } from "react";
import { QrCode, ArrowLeft } from "lucide-react";

const checkpostOptions = [
  "Uttukottai", "Madhavaram", "Poonamallee", "Vandalur", "Tambaram",
  "Sriperumbudur", "Tiruvallur", "Kancheepuram", "Alpettai",
];

const mockScanned = [
  { no: 1, name: "SI Rajesh Kumar", rank: "SI", badge: "SI-4521", checkpost: "Uttukottai", shift: "Shift 1", scannedAt: "06:05", status: "Present" },
  { no: 2, name: "Const. Murugan S", rank: "ORS", badge: "HC-7823", checkpost: "Uttukottai", shift: "Shift 1", scannedAt: "06:02", status: "Present" },
  { no: 3, name: "Const. Selvam R", rank: "ORS", badge: "PC-3412", checkpost: "Uttukottai", shift: "Shift 1", scannedAt: "06:18", status: "Late" },
  { no: 4, name: "SI Lakshmi P", rank: "SI", badge: "SI-5632", checkpost: "Alpettai", shift: "Shift 1", scannedAt: "06:01", status: "Present" },
  { no: 5, name: "Const. Arun V", rank: "ORS", badge: "PC-8901", checkpost: "Alpettai", shift: "Shift 1", scannedAt: "06:03", status: "Present" },
];

const statusColor: Record<string, string> = {
  Present: "bg-green-500/15 text-green-600",
  Late: "bg-yellow-500/15 text-yellow-600",
  Absent: "bg-destructive/10 text-destructive",
};

const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, " ");

export function CheckpointAttendancePage({ onBack }: { onBack: () => void }) {
  const [checkpost, setCheckpost] = useState("");
  const [shift, setShift] = useState("");
  const [badgeNo, setBadgeNo] = useState("");

  const inputCls = "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
  const labelCls = "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";

  return (
    <div className="space-y-5">
      {/* Breadcrumb / Header */}
      <div className="flex items-center gap-2 mb-1">
        <button onClick={onBack} className="p-1 rounded hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-foreground">Checkpost Attendance</h2>
          <p className="text-xs text-muted-foreground">Scan QR at checkpost location to mark attendance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-">
        {/* Left: QR Scanner */}
        {/* <div className="rounded-xl border p-5 space-y-5" style={{ borderColor: "hsl(var(--border))" }}> */}
        {/* <div className="flex items-center gap-2 mb-2">
            <QrCode className="h-5 w-5" style={{ color: "hsl(var(--primary))" }} />
            <h3 className="text-sm font-bold text-foreground">QR Scanner</h3>
          </div> */}

        {/* <div>
            <label className={labelCls}>Checkpoint</label>
            <select value={checkpost} onChange={e => setCheckpost(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }}>
              <option value="">Select Checkpost</option>
              {checkpostOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div> */}

        {/* <div>
            <label className={labelCls}>Shift</label>
            <select value={shift} onChange={e => setShift(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }}>
              <option value="">Select Shift</option>
              <option>Shift 1 (06:00 – 14:00)</option>
              <option>Shift 2 (14:00 – 22:00)</option>
              <option>Shift 3 (22:00 – 06:00)</option>
            </select>
          </div> */}

        {/* QR placeholder */}
        {/* <div
            className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-10 gap-3"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="text-muted-foreground/40">
              <QrCode className="h-16 w-16" />
            </div>
            <p className="text-sm text-muted-foreground">Point camera at checkpoint QR code</p>
          </div> */}

        {/* <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
          >
            <QrCode className="h-4 w-4" /> Scan QR Code
          </button> */}

        {/* Manual entry */}
        {/* <div>
            <label className={labelCls}>Manual Entry (Badge No)</label>
            <div className="flex gap-2">
              <input
                value={badgeNo}
                onChange={e => setBadgeNo(e.target.value)}
                placeholder="Badge number"
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
              <button
                className="px-4 py-2.5 rounded-lg text-sm font-semibold border hover:bg-muted transition-colors"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                Add
              </button>
            </div>
          </div> */}
        {/* </div> */}

        {/* Right: Scanned Personnel */}
        <div className="rounded-xl border p-5 space-y-4" style={{ borderColor: "hsl(var(--border))" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-foreground">Scanned Personnel</h3>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: "hsl(var(--primary)/0.12)", color: "hsl(var(--primary))" }}
              >
                {mockScanned.length}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">⏱ {today}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b" style={{ borderColor: "hsl(var(--border))" }}>
                  {["#", "Name", "Rank", "Badge No", "Checkpost", "Shift", "Scanned At", "Status"].map(h => (
                    <th key={h} className="text-left py-2.5 px-2 font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockScanned.map(p => (
                  <tr key={p.no} className="border-b hover:bg-muted/30 transition-colors" style={{ borderColor: "hsl(var(--border))" }}>
                    <td className="py-3 px-2 font-medium text-muted-foreground">{p.no}</td>
                    <td className="py-3 px-2 font-semibold text-foreground whitespace-nowrap">{p.name}</td>
                    <td className="py-3 px-2">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-muted text-foreground">{p.rank}</span>
                    </td>
                    <td className="py-3 px-2 font-mono">{p.badge}</td>
                    <td className="py-3 px-2">{p.checkpost}</td>
                    <td className="py-3 px-2 whitespace-nowrap">{p.shift}</td>
                    <td className="py-3 px-2 font-mono">{p.scannedAt}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor[p.status]}`}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
