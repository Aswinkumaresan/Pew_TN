import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const vehicleTypes = [
  "Two-wheeler", "Auto Rickshaw", "Car", "Jeep", "Van",
  "Mini Truck", "Truck", "Heavy Vehicle", "Tractor", "Boat", "Other",
];

const disposalMethods = [
  "Released on Supravision", "Auction", "Court Order", "Confiscation",
  "Returned to Owner", "Destroyed", "Transferred", "Other",
];

const storagePlaces = [
  "Unit A Yard", "Unit B Yard", "Unit C Yard", "Court Premises",
  "Auction Yard", "District HQ", "Other",
];

const inputCls =
  "w-full rounded-lg border px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary";
const labelCls =
  "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block";
const sectionCls = "rounded-lg border p-5 space-y-4";
const sectionTitleCls =
  "text-xs font-bold text-foreground uppercase tracking-widest mb-1";

export function VehicleDisposalEntryForm({ onClose }: { onClose: () => void }) {
  const today = new Date().toISOString().split("T")[0];

  // Vehicle details
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [colour, setColour] = useState("");
  const [engineNo, setEngineNo] = useState("");
  const [chassisNo, setChassisNo] = useState("");

  // Seizure details
  const [seizedDate, setSeizedDate] = useState(today);
  const [caseRef, setCaseRef] = useState("");
  const [seizedFrom, setSeizedFrom] = useState("");
  const [seizedLocation, setSeizedLocation] = useState("");
  const [seizingOfficer, setSeizingOfficer] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [status, setStatus] = useState("In Custody");

  // Disposal details
  const [courtOrderDate, setCourtOrderDate] = useState("");
  const [courtOrderNo, setCourtOrderNo] = useState("");
  const [disposalMethod, setDisposalMethod] = useState("");
  const [disposalDate, setDisposalDate] = useState("");
  const [auctionValue, setAuctionValue] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = () => {
    console.log("Vehicle Disposal Entry submitted");
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
            Add Vehicle Disposal Entry
          </h2>
          <p className="text-xs text-muted-foreground">
            Record a seized vehicle and its disposal details
          </p>
        </div>
      </div>

      {/* ── VEHICLE DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Vehicle Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Vehicle Registration No. *</label>
            <input
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. TN 01 AB 1234"
            />
          </div>
          <div>
            <label className={labelCls}>Vehicle Type *</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select type</option>
              {vehicleTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Make / Brand</label>
            <input
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. Tata, Mahindra, Honda"
            />
          </div>
          <div>
            <label className={labelCls}>Model</label>
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Model name"
            />
          </div>
          <div>
            <label className={labelCls}>Colour</label>
            <input
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Vehicle colour"
            />
          </div>
          <div>
            <label className={labelCls}>Current Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option>In Custody</option>
              <option>Court Order Pending</option>
              <option>Disposed</option>
              <option>Released</option>
              <option>Transferred</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Engine No.</label>
            <input
              value={engineNo}
              onChange={(e) => setEngineNo(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Engine number"
            />
          </div>
          <div>
            <label className={labelCls}>Chassis No.</label>
            <input
              value={chassisNo}
              onChange={(e) => setChassisNo(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Chassis number"
            />
          </div>
        </div>
      </div>

      {/* ── SEIZURE DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Seizure Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Date of Seizure *</label>
            <input
              type="date"
              value={seizedDate}
              onChange={(e) => setSeizedDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Case Reference No. *</label>
            <input
              value={caseRef}
              onChange={(e) => setCaseRef(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="e.g. CS-2026-045"
            />
          </div>
          <div>
            <label className={labelCls}>Seized From (Owner / Driver)</label>
            <input
              value={seizedFrom}
              onChange={(e) => setSeizedFrom(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Owner / driver name"
            />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Seizure Location</label>
            <input
              value={seizedLocation}
              onChange={(e) => setSeizedLocation(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Where vehicle was seized"
            />
          </div>
          <div>
            <label className={labelCls}>Seizing Officer</label>
            <input
              value={seizingOfficer}
              onChange={(e) => setSeizingOfficer(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Officer name & rank"
            />
          </div>
          <div>
            <label className={labelCls}>Current Storage Location</label>
            <select
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select location</option>
              {storagePlaces.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── DISPOSAL DETAILS ── */}
      <div
        className={sectionCls}
        style={{ borderColor: "hsl(var(--border))" }}
      >
        <p className={sectionTitleCls}>Disposal Details</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Court Order Date</label>
            <input
              type="date"
              value={courtOrderDate}
              onChange={(e) => setCourtOrderDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Court Order No.</label>
            <input
              value={courtOrderNo}
              onChange={(e) => setCourtOrderNo(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Court order reference"
            />
          </div>
          <div>
            <label className={labelCls}>Disposal Method</label>
            <select
              value={disposalMethod}
              onChange={(e) => setDisposalMethod(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <option value="">Select method</option>
              {disposalMethods.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Date of Disposal</label>
            <input
              type="date"
              value={disposalDate}
              onChange={(e) => setDisposalDate(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
            />
          </div>
          <div>
            <label className={labelCls}>Auction Value (₹)</label>
            <input
              type="number"
              min="0"
              value={auctionValue}
              onChange={(e) => setAuctionValue(e.target.value)}
              className={inputCls}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Amount in rupees"
            />
          </div>
          <div className="col-span-3">
            <label className={labelCls}>Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className={`${inputCls} resize-none`}
              style={{ borderColor: "hsl(var(--border))" }}
              placeholder="Additional remarks about the vehicle or disposal..."
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
          Save Vehicle Record
        </button>
      </div>
    </div>
  );
}
