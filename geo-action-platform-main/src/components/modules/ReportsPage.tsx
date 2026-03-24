import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Download, Filter } from "lucide-react";
import { recentCases, intelligenceProfiles } from "@/data/mockData";

export function ReportsPage() {
  const [dateFrom, setDateFrom] = useState("2025-02-01");
  const [dateTo, setDateTo] = useState("2025-02-26");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [accusedFilter, setAccusedFilter] = useState("All Accused");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const labelCls =
    "text-[10px] uppercase tracking-wider font-medium block mb-1";
  const selectCls =
    "w-full rounded-md border px-2 py-1.5 text-xs bg-muted focus:outline-none";
  const borderColor = "hsl(var(--border))";
  const labelColor = "hsl(var(--muted-foreground))";

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="stat-card"
      >
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Filter className="h-4 w-4" style={{ color: "hsl(var(--accent))" }} />
          Report Builder
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label className={labelCls} style={{ color: labelColor }}>
              From Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={selectCls}
              style={{ borderColor }}
            />
          </div>
          <div>
            <label className={labelCls} style={{ color: labelColor }}>
              To Date
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className={selectCls}
              style={{ borderColor }}
            />
          </div>
          <div>
            <label className={labelCls} style={{ color: labelColor }}>
              Zone
            </label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className={selectCls}
              style={{ borderColor }}
            >
              <option>All Zone</option>
              <option>Chennai</option>
              <option>Madurai</option>
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: labelColor }}>
              District
            </label>
            <select className={selectCls} style={{ borderColor }}>
              <option>All Districts</option>
              {Array.from(new Set(recentCases.map((c) => c.district))).map(
                (d) => (
                  <option key={d}>{d}</option>
                ),
              )}
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: labelColor }}>
              Offence Type
            </label>
            <select className={selectCls} style={{ borderColor }}>
              <option>All Types</option>
              <option>NDPS</option>
              <option>CRIME</option>
              <option>PEW</option>
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: labelColor }}>
              Category / Commodity
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={selectCls}
              style={{ borderColor }}
            >
              <option>All Categories</option>
              <option>NDPS Ganja</option>
              <option>F.Wash</option>
              <option>Arrack</option>
              <option>Interstate smuggling</option>
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: labelColor }}>
              Accused
            </label>
            <select
              value={accusedFilter}
              onChange={(e) => setAccusedFilter(e.target.value)}
              className={selectCls}
              style={{ borderColor }}
            >
              <option>All Accused</option>
              {intelligenceProfiles.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} style={{ color: labelColor }}>
              Unit
            </label>
            <select className={selectCls} style={{ borderColor }}>
              <option>All Units</option>
              {Array.from(new Set(recentCases.map((c) => c.unit))).map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end lg:col-span-1">
            <button
              className="w-full px-4 py-2 rounded-md text-xs font-semibold h-[34px]"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Generate Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Reports */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Daily Summary Report", icon: FileText, count: "14 today" },
          { label: "Monthly Statistics", icon: FileText, count: "Feb 2025" },
          {
            label: "District Comparison",
            icon: FileText,
            count: "All districts",
          },
          { label: "Seizure Register", icon: FileText, count: "Full year" },
        ].map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="stat-card cursor-pointer hover:border-primary/30 transition-colors"
          >
            <r.icon
              className="h-6 w-6 mb-3"
              style={{ color: "hsl(var(--primary))" }}
            />
            <p className="text-sm font-semibold">{r.label}</p>
            <p
              className="text-xs mt-1"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {r.count}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                className="flex items-center gap-1 text-[10px] px-2 py-1 rounded"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                <Download className="h-3 w-3" /> PDF
              </button>
              <button
                className="flex items-center gap-1 text-[10px] px-2 py-1 rounded"
                style={{
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                <Download className="h-3 w-3" /> Excel
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Report Preview Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="stat-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">
            Report Preview — Recent Cases
          </h3>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium"
              style={{
                background: "hsl(var(--risk-high) / 0.1)",
                color: "hsl(var(--risk-high))",
              }}
            >
              <Download className="h-3 w-3" /> Export PDF
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium"
              style={{
                background: "hsl(var(--risk-low) / 0.1)",
                color: "hsl(var(--risk-low))",
              }}
            >
              <Download className="h-3 w-3" /> Export Excel
            </button>
          </div>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ color: "hsl(var(--muted-foreground))" }}>
              {[
                "Case ID",
                "District",
                "Unit",
                "Type",
                "Accused",
                "Seizure",
                "Severity",
                "Status",
              ].map((h) => (
                <th key={h} className="text-left font-medium pb-3 pr-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentCases.map((c) => (
              <tr key={c.id} className="data-table-row">
                <td
                  className="py-2.5 pr-4 font-mono"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  {c.id}
                </td>
                <td className="py-2.5 pr-4">{c.district}</td>
                <td className="py-2.5 pr-4">{c.unit}</td>
                <td className="py-2.5 pr-4">{c.type}</td>
                <td className="py-2.5 pr-4">{c.accused}</td>
                <td className="py-2.5 pr-4">{c.seizure}</td>
                <td className="py-2.5 pr-4">
                  <span className={`risk-badge-${c.severity}`}>
                    {c.severity}
                  </span>
                </td>
                <td className="py-2.5">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
