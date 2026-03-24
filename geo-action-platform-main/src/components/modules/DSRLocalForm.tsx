import { useState } from "react";

const zones = ["Chennai Zone", "Madurai Zone"];

const liquorCategories = [
  { label: "Rectified Spirit", unit: "Litres" },
  { label: "Methyl Alcohol", unit: "Litres" },
  { label: "Pondy Arrack", unit: "Litres" },
  { label: "Pondy IMFL", unit: "Bottles" },
  { label: "KA IMFL", unit: "Bottles" },
  { label: "AP ID Arrack", unit: "Litres" },
  { label: "TN IMFL", unit: "Bottles" },
  { label: "F.Wash", unit: "Litres" },
  { label: "ID Arrack", unit: "Litres" },
  { label: "Spurious Liquor", unit: "Bottles" },
  { label: "Foreign Liquor", unit: "Bottles" },
  { label: "Military Liquor", unit: "Bottles" },
  { label: "Other IMFL", unit: "Bottles" },
  { label: "Toddy", unit: "Bottles" },
];

type Row = { cases: string; quantity: string; accused: string };
type Vehicles = { "2w": string; "3w": string; "4W": string; "6W": string };

export function DSRLocalForm() {
  const [zone, setZone] = useState("Madurai Zone");
  const [noOfCases, setNoOfCases] = useState("35");
  const [noOfAccused, setNoOfAccused] = useState("42");
  const [remand, setRemand] = useState("30");
  const [rows, setRows] = useState<Record<string, Row>>({
    ...Object.fromEntries(
      liquorCategories.map((c) => [
        c.label,
        { cases: "0", quantity: "0", accused: "0" },
      ]),
    ),
    "Rectified Spirit": { cases: "10", quantity: "500", accused: "8" },
    "Pondy Arrack": { cases: "6", quantity: "300", accused: "4" },
    "ID Arrack": { cases: "4", quantity: "200", accused: "3" },
  });
  const [vehicles, setVehicles] = useState<Vehicles>({
    "2w": "18",
    "3w": "3",
    "4W": "2",
    "6W": "0",
  });

  const updateRow = (label: string, field: keyof Row, value: string) => {
    setRows((prev) => ({
      ...prev,
      [label]: { ...prev[label], [field]: value },
    }));
  };

  const handleReset = () => {
    setZone("");
    setNoOfCases("0");
    setNoOfAccused("0");
    setRemand("0");
    setRows(
      Object.fromEntries(
        liquorCategories.map((c) => [
          c.label,
          { cases: "0", quantity: "0", accused: "0" },
        ]),
      ),
    );
    setVehicles({ "2w": "0", "3w": "0", "4W": "0", "6W": "0" });
  };

  const handleSave = () => {
    console.log("Local Report Saved", {
      zone,
      noOfCases,
      noOfAccused,
      remand,
      rows,
      vehicles,
    });
  };

  const inputCls =
    "w-full rounded border px-2 py-1.5 text-sm text-center bg-background focus:outline-none focus:ring-1 focus:ring-ring";
  const thCls =
    "py-2.5 px-3 text-xs font-semibold text-muted-foreground text-left border-b";
  const tdCls = "py-1.5 px-3 text-sm";

  return (
    <div className="space-y-6">
      {/* Zone + Summary Row */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div
          className="bg-muted/40 px-4 py-2.5 border-b"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <h3 className="text-sm font-bold text-foreground">
            Zone & Case Summary
          </h3>
        </div>
        <div className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className={thCls}>Zone</th>
                <th className={thCls}>District</th>
                <th className={thCls}>Local</th>
                <th className={thCls}>No. of Cases</th>
                <th className={thCls}>No. of Accused</th>
                <th className={thCls}>Remand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tdCls}>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className={inputCls}
                    style={{
                      borderColor: "hsl(var(--border))",
                      textAlign: "left",
                    }}
                  >
                    <option value="">Select zone</option>
                    {zones.map((z) => (
                      <option key={z}>{z}</option>
                    ))}
                  </select>
                </td>
                <td className={tdCls}>
                  <input
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                    placeholder="—"
                  />
                </td>
                <td className={tdCls}>
                  <input
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                    defaultValue="0"
                  />
                </td>
                <td className={tdCls}>
                  <input
                    value={noOfCases}
                    onChange={(e) => setNoOfCases(e.target.value)}
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                  />
                </td>
                <td className={tdCls}>
                  <input
                    value={noOfAccused}
                    onChange={(e) => setNoOfAccused(e.target.value)}
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                  />
                </td>
                <td className={tdCls}>
                  <input
                    value={remand}
                    onChange={(e) => setRemand(e.target.value)}
                    className={inputCls}
                    style={{ borderColor: "hsl(var(--border))" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Liquor Seizure Details */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div
          className="bg-muted/40 px-4 py-2.5 border-b"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <h3 className="text-sm font-bold text-foreground">
            Liquor Seizure Details
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <th className={thCls} style={{ width: "45%" }}>
                  Category
                </th>
                <th className={thCls}>Cases</th>
                <th className={thCls}>Quantity</th>
                <th className={thCls}>Accused</th>
              </tr>
            </thead>
            <tbody>
              {liquorCategories.map((cat, i) => (
                <tr
                  key={cat.label}
                  className={i % 2 === 0 ? "bg-muted/20" : ""}
                >
                  <td className={`${tdCls} font-medium text-foreground`}>
                    {cat.label}{" "}
                    <span className="text-muted-foreground font-normal">
                      ({cat.unit})
                    </span>
                  </td>
                  <td className={tdCls}>
                    <input
                      value={rows[cat.label].cases}
                      onChange={(e) =>
                        updateRow(cat.label, "cases", e.target.value)
                      }
                      className={inputCls}
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </td>
                  <td className={tdCls}>
                    <input
                      value={rows[cat.label].quantity}
                      onChange={(e) =>
                        updateRow(cat.label, "quantity", e.target.value)
                      }
                      className={inputCls}
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </td>
                  <td className={tdCls}>
                    <input
                      value={rows[cat.label].accused}
                      onChange={(e) =>
                        updateRow(cat.label, "accused", e.target.value)
                      }
                      className={inputCls}
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vehicles Seized */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <div
          className="bg-muted/40 px-4 py-2.5 border-b"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <h3 className="text-sm font-bold text-foreground">Vehicles Seized</h3>
        </div>
        <div className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="border-b"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                {(["2w", "3w", "4W", "6W"] as const).map((v) => (
                  <th key={v} className={thCls}>
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {(["2w", "3w", "4W", "6W"] as const).map((v) => (
                  <td key={v} className={tdCls}>
                    <input
                      value={vehicles[v]}
                      onChange={(e) =>
                        setVehicles((p) => ({ ...p, [v]: e.target.value }))
                      }
                      className={inputCls}
                      style={{ borderColor: "hsl(var(--border))" }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-1">
        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-muted"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          Save Local Report
        </button>
      </div>
    </div>
  );
}
