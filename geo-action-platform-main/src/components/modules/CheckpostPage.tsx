import { motion } from "framer-motion";
import { checkpostData, auditLogs } from "@/data/mockData";
import { Shield, Activity, AlertTriangle, Car } from "lucide-react";

export function CheckpostPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Checkposts", value: 5, icon: Shield, color: "risk-low" },
          { label: "Vehicles Today", value: "1,436", icon: Car, color: "accent" },
          { label: "Alerts Raised", value: 11, icon: AlertTriangle, color: "risk-high" },
          { label: "Avg. Wait Time", value: "4 min", icon: Activity, color: "primary" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 opacity-20" style={{ color: `hsl(var(--${stat.color}))` }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-card">
        <h3 className="text-sm font-semibold mb-4">Checkpost Status Board</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                {["Checkpost", "District", "Status", "Vehicles Today", "Alerts", "Action"].map(h => (
                  <th key={h} className="text-left text-xs font-medium pb-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {checkpostData.map((cp) => (
                <tr key={cp.name} className="data-table-row">
                  <td className="py-3 font-semibold">{cp.name}</td>
                  <td className="py-3 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{cp.district}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: cp.status === "active" ? "hsl(var(--risk-low))" : "hsl(var(--risk-medium))" }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cp.status === "active" ? "hsl(var(--risk-low))" : "hsl(var(--risk-medium))" }} />
                      {cp.status.charAt(0).toUpperCase() + cp.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-medium">{cp.vehicles}</td>
                  <td className="py-3">
                    {cp.alerts > 0 ? (
                      <span className="risk-badge-high">{cp.alerts}</span>
                    ) : (
                      <span className="risk-badge-low">None</span>
                    )}
                  </td>
                  <td className="py-3">
                    <button className="text-xs font-medium" style={{ color: "hsl(var(--accent))" }}>View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

export function AuditLogsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">System Audit Trail</h3>
          <div className="flex gap-2">
            <input className="rounded-md border px-3 py-1.5 text-xs bg-muted focus:outline-none" style={{ borderColor: "hsl(var(--border))" }} placeholder="Filter logs..." />
            <button className="px-3 py-1.5 rounded-md text-xs font-medium" style={{ background: "hsl(var(--primary) / 0.15)", color: "hsl(var(--primary))" }}>Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                {["#", "User", "Action", "Module", "IP Address", "Timestamp"].map(h => (
                  <th key={h} className="text-left font-medium pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="data-table-row">
                  <td className="py-2.5 pr-4 font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>{log.id}</td>
                  <td className="py-2.5 pr-4 font-medium">{log.user}</td>
                  <td className="py-2.5 pr-4">{log.action}</td>
                  <td className="py-2.5 pr-4">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>{log.module}</span>
                  </td>
                  <td className="py-2.5 pr-4 font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>{log.ip}</td>
                  <td className="py-2.5 font-mono" style={{ color: "hsl(var(--muted-foreground))" }}>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
