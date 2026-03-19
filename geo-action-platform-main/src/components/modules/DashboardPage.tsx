import { motion } from "framer-motion";
import {
  kpiData,
  recentCases,
  trendData,
  offenceBreakdown,
  districtRisk,
} from "@/data/mockData";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Briefcase,
  Package,
  AlertTriangle,
  Brain,
  Shield,
  Phone,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const iconMap: Record<string, any> = {
  briefcase: Briefcase,
  package: Package,
  "alert-triangle": AlertTriangle,
  brain: Brain,
  shield: Shield,
  phone: Phone,
};

const COLORS = [
  "hsl(230,70%,55%)",
  "hsl(185,75%,45%)",
  "hsl(270,65%,58%)",
  "hsl(30,90%,55%)",
  "hsl(215,15%,45%)",
];

const severityColors: Record<string, string> = {
  high: "risk-badge-high",
  medium: "risk-badge-medium",
  low: "risk-badge-low",
};

const getRiskColor = (score: number) => {
  if (score >= 75) return "hsl(var(--risk-high))";
  if (score >= 50) return "hsl(var(--risk-medium))";
  return "hsl(var(--risk-low))";
};

function KPICard({
  item,
  index,
}: {
  item: (typeof kpiData)[0];
  index: number;
}) {
  const Icon = iconMap[item.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="stat-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {item.label}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">
            {item.value.toLocaleString()}
          </p>
        </div>
        <div
          className="rounded-lg p-2.5"
          style={{ background: "hsl(var(--primary) / 0.12)" }}
        >
          <Icon className="h-5 w-5" style={{ color: "hsl(var(--primary))" }} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-xs">
        {item.deltaType === "up" ? (
          <TrendingUp
            className="h-3.5 w-3.5"
            style={{ color: "hsl(var(--risk-low))" }}
          />
        ) : item.deltaType === "down" ? (
          <TrendingDown
            className="h-3.5 w-3.5"
            style={{ color: "hsl(var(--risk-high))" }}
          />
        ) : (
          <Minus
            className="h-3.5 w-3.5"
            style={{ color: "hsl(var(--muted-foreground))" }}
          />
        )}
        <span
          style={{
            color:
              item.deltaType === "up"
                ? "hsl(var(--risk-low))"
                : item.deltaType === "down"
                  ? "hsl(var(--risk-high))"
                  : "hsl(var(--muted-foreground))",
          }}
        >
          {item.delta} vs yesterday
        </span>
      </div>
    </motion.div>
  );
}

export function DashboardPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((item, i) => (
          <KPICard key={item.label} item={item} index={i} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="stat-card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold">Case Trend — 7 Months</h3>
              <p
                className="text-xs"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Cases & seizures over time
              </p>
            </div>
            <span
              className="text-[10px] px-2 py-1 rounded-full font-medium"
              style={{
                background: "hsl(var(--primary) / 0.12)",
                color: "hsl(var(--primary))",
              }}
            >
              Monthly
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gradCases" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(230,70%,55%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(230,70%,55%)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="gradSeizures" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(185,75%,45%)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(185,75%,45%)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid hsl(214,22%,84%)",
                  borderRadius: 8,
                  fontSize: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="cases"
                stroke="hsl(230,70%,55%)"
                fill="url(#gradCases)"
                strokeWidth={2}
                name="Cases"
              />
              <Area
                type="monotone"
                dataKey="seizures"
                stroke="hsl(185,75%,45%)"
                fill="url(#gradSeizures)"
                strokeWidth={2}
                name="Seizures"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Offence Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="stat-card"
        >
          <h3 className="text-sm font-semibold mb-1">Offence Categories</h3>
          <p
            className="text-xs mb-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Distribution by type
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={offenceBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={3}
                dataKey="count"
              >
                {offenceBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid hsl(214,22%,84%)",
                  borderRadius: 8,
                  fontSize: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {offenceBreakdown.map((item, i) => (
              <div
                key={item.type}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: COLORS[i] }}
                  />
                  <span style={{ color: "hsl(var(--muted-foreground))" }}>
                    {item.type}
                  </span>
                </div>
                <span className="font-medium">{item.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Recent Cases Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="stat-card xl:col-span-3"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Recent Cases</h3>
            <button
              className="text-xs font-medium"
              style={{ color: "hsl(var(--accent))" }}
            >
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                  <th className="text-left pb-3 font-medium">Case ID</th>
                  <th className="text-left pb-3 font-medium">District</th>
                  <th className="text-left pb-3 font-medium">Type</th>
                  <th className="text-left pb-3 font-medium">Severity</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCases.map((c) => (
                  <tr key={c.id} className="data-table-row">
                    <td
                      className="py-2.5 font-mono font-medium"
                      style={{ color: "hsl(var(--accent))" }}
                    >
                      {c.id}
                    </td>
                    <td className="py-2.5">{c.district}</td>
                    <td className="py-2.5">{c.type}</td>
                    <td className="py-2.5">
                      <span className={severityColors[c.severity]}>
                        {c.severity}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                        style={{
                          background:
                            c.status === "Active"
                              ? "hsl(var(--risk-low) / 0.1)"
                              : "hsl(var(--muted))",
                          color:
                            c.status === "Active"
                              ? "hsl(var(--risk-low))"
                              : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* District Risk Scores */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="stat-card xl:col-span-2"
        >
          <h3 className="text-sm font-semibold mb-1">District Risk Index</h3>
          <p
            className="text-xs mb-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Composite enforcement score
          </p>
          <div className="space-y-3">
            {districtRisk.slice(0, 6).map((d) => (
              <div key={d.district}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{d.district}</span>
                  <span
                    className="font-mono font-bold"
                    style={{ color: getRiskColor(d.score) }}
                  >
                    {d.score}
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full"
                  style={{ background: "hsl(var(--muted))" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.score}%` }}
                    transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: getRiskColor(d.score) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
