import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";

const units = [
  "Unit A", "Unit B", "Unit C", "Unit D", "All Units",
  "Flying Squad", "Special Team",
];

const callTypes = [
  "Tip-off", "Intelligence", "Complaint", "Media Report",
  "Photo/Video Evidence", "Query", "Follow-up", "Anonymous", "Other",
];

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls =
  "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function WhatsAppCallEntryForm({ onClose }: { onClose: () => void }) {
  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  const [callDate, setCallDate] = useState(today);
  const [callTime, setCallTime] = useState(nowTime);
  const [callerNumber, setCallerNumber] = useState("");
  const [callerName, setCallerName] = useState("");
  const [callType, setCallType] = useState("");
  const [messageType, setMessageType] = useState("Text");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Pending");
  const [actionTaken, setActionTaken] = useState("");
  const [mediaAttached, setMediaAttached] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [followUpRequired, setFollowUpRequired] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      if (file.size <= 20 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result)
            setMediaFiles((prev) => [...prev, ev.target!.result as string]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = "";
  };

  const handleSubmit = () => {
    console.log("WhatsApp Call Entry submitted");
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
            Log WhatsApp Call / Message
          </h2>
          <p className="text-xs text-muted-foreground">
            Record a new WhatsApp tip-off or complaint received
          </p>
        </div>
      </div>

      {/* ── CALL / MESSAGE DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Call / Message Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Date</label>
            <input
              type="date"
              value={callDate}
              onChange={(e) => setCallDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Time</label>
            <input
              type="time"
              value={callTime}
              onChange={(e) => setCallTime(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Message Type</label>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>Text</option>
              <option>Voice Call</option>
              <option>Video Call</option>
              <option>Photo / Video</option>
              <option>Voice Note</option>
              <option>Document</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Call / Information Type *</label>
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
        </div>
      </div>

      {/* ── CALLER INFO ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Caller Information</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>WhatsApp Number *</label>
            <input
              value={callerNumber}
              onChange={(e) => setCallerNumber(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
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
        </div>
      </div>

      {/* ── INFORMATION DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Information Details</p>
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Location / Area Mentioned</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Location or area mentioned"
            />
          </div>
          <div>
            <label className={labelCls}>Summary / Message Content *</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Detailed summary of the WhatsApp message / call content..."
            />
          </div>

          {/* Media attachment */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <input
                type="checkbox"
                id="mediaAttached"
                checked={mediaAttached}
                onChange={(e) => setMediaAttached(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              <label
                htmlFor="mediaAttached"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Media evidence attached (photos / videos / audio)
              </label>
            </div>
            {mediaAttached && (
              <div>
                <label className={labelCls}>Upload Media Files</label>
                <div
                  className="rounded-lg border-2 border-dashed p-6 text-center cursor-pointer hover:bg-muted/20 transition-colors"
                  style={{ borderColor: "hsl(var(--border))" }}
                >
                  {mediaFiles.length === 0 ? (
                    <label className="flex flex-col items-center gap-2 cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload media files (max 20MB each)
                      </p>
                      <input
                        type="file"
                        accept="image/*,video/*,audio/*"
                        multiple
                        className="hidden"
                        onChange={handleMediaUpload}
                      />
                    </label>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        {mediaFiles.length} file(s) attached
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {mediaFiles.map((f, i) => (
                          <img
                            key={i}
                            src={f}
                            alt={`media-${i}`}
                            className="h-16 w-16 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                      <label className="inline-block mt-2 cursor-pointer">
                        <span className="text-xs text-primary underline">
                          Add more files
                        </span>
                        <input
                          type="file"
                          accept="image/*,video/*,audio/*"
                          multiple
                          className="hidden"
                          onChange={handleMediaUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
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
            <label className={labelCls}>Action Taken</label>
            <textarea
              value={actionTaken}
              onChange={(e) => setActionTaken(e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="What action was taken on this tip-off / message..."
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="waFollowup"
              checked={followUpRequired}
              onChange={(e) => setFollowUpRequired(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <label
              htmlFor="waFollowup"
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
