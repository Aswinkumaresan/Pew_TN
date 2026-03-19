import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { OffencesSelector } from "./OffencesSelector";

const statusOptions = ["Pending", "Under Review", "Approved"];
const riskOptions = ["low", "medium", "high"];

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls =
  "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function SourceReportEntryForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [sourceOfficer, setSourceOfficer] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [risk, setRisk] = useState("medium");
  const [remarks, setRemarks] = useState("");
  const [offences, setOffences] = useState<string[]>([]);

  const handleSubmit = () => {
    console.log("Source Report submitted");
    onClose();
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Header */}
      <div
        className="flex items-center gap-3 pb-2 border-b"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div>
          <h2 className="text-base font-bold text-foreground">
            New Source Report
          </h2>
          <p className="text-xs text-muted-foreground">
            Submit a new intelligence source report
          </p>
        </div>
      </div>

      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Report Details</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelCls}>Report Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. Ganja Supply Chain — Northern Corridor"
            />
          </div>
          <div>
            <label className={labelCls}>Source Officer *</label>
            <input
              value={sourceOfficer}
              onChange={(e) => setSourceOfficer(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Officer name/designation"
            />
          </div>
          <div>
            <label className={labelCls}>Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Risk Level</label>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              {riskOptions.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Remarks / Description</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={4}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Additional details about the report..."
            />
          </div>
        </div>
      </div>

      {/* Offences */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Offences Involved</p>
        <OffencesSelector selected={offences} onChange={setOffences} />
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg text-sm font-medium border hover:bg-muted transition-colors"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold"
          style={{
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
          }}
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}
