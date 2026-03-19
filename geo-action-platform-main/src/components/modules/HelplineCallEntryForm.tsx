import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const units = [
  "Unit A", "Unit B", "Unit C", "Unit D", "All Units",
  "Flying Squad", "Special Team", "DSP Office",
];

const callTypes = [
  "Tip-off", "Intelligence", "Complaint", "Directive",
  "Query", "Follow-up", "Anonymous", "Other",
];

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls =
  "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function HelplineCallEntryForm({ onClose }: { onClose: () => void }) {
  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  const [callDate, setCallDate] = useState(today);
  const [callTime, setCallTime] = useState(nowTime);
  const [source, setSource] = useState("Helpline");
  const [callerName, setCallerName] = useState("");
  const [callerPhone, setCallerPhone] = useState("");
  const [callerType, setCallerType] = useState("Anonymous");
  const [callType, setCallType] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Pending");
  const [actionTaken, setActionTaken] = useState("");
  const [followUpRequired, setFollowUpRequired] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    console.log("Helpline Call Entry submitted");
    onClose();
  };

  return (
    <div className="space-y-6">
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
            Log Helpline Call
          </h2>
          <p className="text-xs text-muted-foreground">
            Record a new helpline / control room call
          </p>
        </div>
      </div>

      {/* ── CALL DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Call Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Call Date</label>
            <input
              type="date"
              value={callDate}
              onChange={(e) => setCallDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Call Time</label>
            <input
              type="time"
              value={callTime}
              onChange={(e) => setCallTime(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Source *</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>Helpline</option>
              <option>Control Room</option>
              <option>Walk-in</option>
              <option>Email</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Call Type *</label>
            <select
              value={callType}
              onChange={(e) => setCallType(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select type</option>
              {callTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Caller Type</label>
            <select
              value={callerType}
              onChange={(e) => setCallerType(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>Anonymous</option>
              <option>Public</option>
              <option>Police Officer</option>
              <option>Government Official</option>
              <option>NGO</option>
              <option>Media</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>Pending</option>
              <option>Actioned</option>
              <option>Under Review</option>
              <option>Closed</option>
              <option>Referred</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── CALLER INFORMATION ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Caller Information</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Caller Name</label>
            <input
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Caller name or 'Anonymous'"
            />
          </div>
          <div>
            <label className={labelCls}>Caller Phone</label>
            <input
              value={callerPhone}
              onChange={(e) => setCallerPhone(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Phone number"
            />
          </div>
        </div>
      </div>

      {/* ── INFORMATION / COMPLAINT ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Information / Complaint</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Location / Area Mentioned</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Location / area mentioned by caller"
            />
          </div>
          <div>
            <label className={labelCls}>Summary / Details *</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Detailed description of the call / complaint / tip..."
            />
          </div>
        </div>
      </div>

      {/* ── ACTION TAKEN ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Action Taken</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Assigned To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select unit / officer</option>
              {units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Action Taken</label>
            <textarea
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="What action was taken on this call..."
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="followup"
              checked={followUpRequired}
              onChange={(e) => setFollowUpRequired(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <label
              htmlFor="followup"
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              Follow-up required
            </label>
          </div>
          {followUpRequired && (
            <div>
              <label className={labelCls}>Follow-up Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className={inputCls}
                style={{ borderColor: "hsl(var(--border))" }}
              />
            </div>
          )}
          <div>
            <label className={labelCls}>Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Additional remarks..."
            />
          </div>
        </div>
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
          Save Call Log
        </button>
      </div>
    </div>
  );
}
