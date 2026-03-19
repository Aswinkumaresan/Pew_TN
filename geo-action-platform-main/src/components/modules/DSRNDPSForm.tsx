import { useState } from "react";

const zones = ["Chennai Zone", "Madurai Zone"];

const substances = [
  { label: "Ganja", unit: "Kgs" },
  { label: "Ganja Chocolate", unit: "Kgs" },
  { label: "Methamphetamine", unit: "Grams" },
  { label: "Methaqualone", unit: "Grams" },
  { label: "Amphetamine", unit: "Grams" },
  { label: "Ketamine", unit: "Grams" },
  { label: "Heroin", unit: "Grams" },
  { label: "Cocaine", unit: "Grams" },
  { label: "Tablets", unit: "Nos" },
  { label: "Opium", unit: "Grams" },
  { label: "Hashish Oil", unit: "Grams" },
];

type Row = { cases: string; quantity: string; accused: string };

export function DSRNDPSForm() {
  const [zone, setZone] = useState("");
  const [noOfCases, setNoOfCases] = useState("0");
  const [noOfAccused, setNoOfAccused] = useState("0");
  const [remand, setRemand] = useState("0");
  const [rows, setRows] = useState<Record<string, Row>>(
    Object.fromEntries(substances.map(s => [s.label, { cases: "0", quantity: "0", accused: "0" }]))
  );

  const updateRow = (label: string, field: keyof Row, value: string) => {
    setRows(prev => ({ ...prev, [label]: { ...prev[label], [field]: value } }));
  };

  const handleReset = () => {
    setZone("");
    setNoOfCases("0");
    setNoOfAccused("0");
    setRemand("0");
    setRows(Object.fromEntries(substances.map(s => [s.label, { cases: "0", quantity: "0", accused: "0" }])));
  };

  const handleSave = () => {
    console.log("NDPS Report Saved", { zone, noOfCases, noOfAccused, remand, rows });
  };

  const inputCls = "w-full rounded border px-2 py-1.5 text-sm text-center bg-background focus:outline-none focus:ring-1 focus:ring-ring";
  const thCls = "py-2.5 px-3 text-xs font-semibold text-muted-foreground text-left border-b";
  const tdCls = "py-1.5 px-3 text-sm";

  return (
    <div className="space-y-6">
      {/* Zone + Summary Row */}
      <div className="rounded-lg border overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="bg-muted/40 px-4 py-2.5 border-b" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-bold text-foreground">Zone & Case Summary</h3>
        </div>
        <div className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={thCls}>Zone</th>
                <th className={thCls}>No. of Cases Booked</th>
                <th className={thCls}>No. of Accused</th>
                <th className={thCls}>Remand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCls}>
                  <select value={zone} onChange={e => setZone(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))", textAlign: "left" }}>
                    <option value="">Select zone</option>
                    {zones.map(z => <option key={z}>{z}</option>)}
                  </select>
                </td>
                <td className={tdCls}><input value={noOfCases} onChange={e => setNoOfCases(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }} /></td>
                <td className={tdCls}><input value={noOfAccused} onChange={e => setNoOfAccused(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }} /></td>
                <td className={tdCls}><input value={remand} onChange={e => setRemand(e.target.value)} className={inputCls} style={{ borderColor: "hsl(var(--border))" }} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Substance Seizure Details */}
      <div className="rounded-lg border overflow-hidden" style={{ borderColor: "hsl(var(--border))" }}>
        <div className="bg-muted/40 px-4 py-2.5 border-b" style={{ borderColor: "hsl(var(--border))" }}>
          <h3 className="text-sm font-bold text-foreground">PEW NDPS Seizure Details — Substance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "hsl(var(--border))" }}>
                <th className={thCls} style={{ width: "45%" }}>Substance</th>
                <th className={thCls}>Cases</th>
                <th className={thCls}>Quantity</th>
                <th className={thCls}>Accused</th>
              </tr>
            </thead>
            <tbody>
              {substances.map((sub, i) => (
                <tr key={sub.label} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                  <td className={`${tdCls} font-medium text-foreground`}>
                    {sub.label} <span className="text-muted-foreground font-normal">({sub.unit})</span>
                  </td>
                  <td className={tdCls}>
                    <input value={rows[sub.label].cases} onChange={e => updateRow(sub.label, "cases", e.target.value)}
                      className={inputCls} style={{ borderColor: "hsl(var(--border))" }} />
                  </td>
                  <td className={tdCls}>
                    <input value={rows[sub.label].quantity} onChange={e => updateRow(sub.label, "quantity", e.target.value)}
                      className={inputCls} style={{ borderColor: "hsl(var(--border))" }} />
                  </td>
                  <td className={tdCls}>
                    <input value={rows[sub.label].accused} onChange={e => updateRow(sub.label, "accused", e.target.value)}
                      className={inputCls} style={{ borderColor: "hsl(var(--border))" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-1">
        <button onClick={handleReset} className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-muted" style={{ borderColor: "hsl(var(--border))" }}>
          Reset
        </button>
        <button onClick={handleSave} className="px-6 py-2.5 rounded-lg text-sm font-semibold" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
          Save NDPS Report
        </button>
      </div>
    </div>
  );
}
