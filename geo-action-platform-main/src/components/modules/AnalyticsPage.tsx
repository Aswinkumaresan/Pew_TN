import { motion } from "framer-motion";
import { districtRisk, trendData } from "@/data/mockData";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LineChart, Line } from "recharts";
import { TrendingUp, AlertCircle, Zap, Map } from "lucide-react";

const forecastData = [
  { week: "W1", predicted: 45, actual: 42 },
  { week: "W2", predicted: 52, actual: 49 },
  { week: "W3", predicted: 48, actual: 51 },
  { week: "W4", predicted: 61, actual: 58 },
  { week: "W5", predicted: 67, actual: null },
  { week: "W6", predicted: 72, actual: null },
];

const radarData = [
  { subject: "NDPS", A: 85, fullMark: 100 },
  { subject: "CRIME", A: 70, fullMark: 100 },
  { subject: "PEW", A: 60, fullMark: 100 },
];

const anomalies = [
  { id: 1, district: "Chennai", type: "Unusual spike in NDPS cases", severity: "high", delta: "+340%", date: "Feb 25" },
  { id: 2, district: "Tirunelveli", type: "Increased interstate smuggling activity", severity: "medium", delta: "+120%", date: "Feb 24" },
  { id: 3, district: "Coimbatore", type: "Repeat offenders clustering", severity: "medium", delta: "+85%", date: "Feb 23" },
];

export function AnalyticsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg p-2" style={{ background: "hsl(var(--intelligence) / 0.12)" }}>
          <Zap className="h-4 w-4" style={{ color: "hsl(var(--intelligence))" }} />
        </div>
        <div>
          <h2 className="text-base font-bold">AI-Powered Prediction Engine</h2>
          <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>District risk forecasting & anomaly detection — Updated 10 min ago</p>
        </div>
        <span className="ml-auto text-xs px-2 py-1 rounded-full font-medium" style={{ background: "hsl(var(--risk-low) / 0.12)", color: "hsl(var(--risk-low))" }}>Model Accuracy: 87.4%</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Forecast */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4" style={{ color: "hsl(var(--primary))" }} /> Seizure Forecast</h3>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Predicted vs. Actual (weekly)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecastData}>
              <XAxis dataKey="week" tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215,15%,50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid hsl(214,22%,84%)", borderRadius: 8, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
              <Line type="monotone" dataKey="actual" stroke="hsl(185,75%,45%)" strokeWidth={2.5} dot={{ fill: "hsl(185,75%,45%)", r: 4 }} name="Actual" connectNulls={false} />
              <Line type="monotone" dataKey="predicted" stroke="hsl(270,65%,58%)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-2 text-xs"><div className="h-2 w-4 rounded" style={{ background: "hsl(185,75%,45%)" }} /><span style={{ color: "hsl(var(--muted-foreground))" }}>Actual</span></div>
            <div className="flex items-center gap-2 text-xs"><div className="h-0.5 w-4 border-t-2 border-dashed" style={{ borderColor: "hsl(270,65%,58%)" }} /><span style={{ color: "hsl(var(--muted-foreground))" }}>Predicted</span></div>
          </div>
        </motion.div>

        {/* Threat Radar */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
          <h3 className="text-sm font-semibold mb-1 flex items-center gap-2"><Map className="h-4 w-4" style={{ color: "hsl(var(--accent))" }} />Threat Category Radar</h3>
          <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Multi-dimensional threat assessment</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(220,15%,20%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(215,15%,50%)", fontSize: 10 }} />
              <Radar dataKey="A" stroke="hsl(230,70%,55%)" fill="hsl(230,70%,55%)" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* District Risk Bar */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-card">
        <h3 className="text-sm font-semibold mb-4">District Risk Score Comparison</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={districtRisk} barSize={20}>
            <XAxis dataKey="district" tick={{ fill: "hsl(215,15%,50%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215,15%,50%)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid hsl(214,22%,84%)", borderRadius: 8, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {districtRisk.map((d) => (
                <Cell key={d.district} fill={d.score >= 75 ? "hsl(0,75%,55%)" : d.score >= 55 ? "hsl(30,90%,55%)" : "hsl(145,65%,42%)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Anomaly Cards */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><AlertCircle className="h-4 w-4" style={{ color: "hsl(var(--risk-high))" }} />Anomaly Detection Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {anomalies.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.08 }} className="stat-card border-l-2" style={{ borderLeftColor: `hsl(var(--risk-${a.severity}))` }}>
              <div className="flex items-start justify-between">
                <p className="text-xs font-semibold" style={{ color: `hsl(var(--risk-${a.severity}))` }}>{a.district}</p>
                <span className="text-lg font-bold" style={{ color: `hsl(var(--risk-${a.severity}))` }}>{a.delta}</span>
              </div>
              <p className="text-sm mt-1 font-medium">{a.type}</p>
              <p className="text-[10px] mt-2" style={{ color: "hsl(var(--muted-foreground))" }}>Detected: {a.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
