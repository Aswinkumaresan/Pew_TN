import { useState } from "react";
import { Plus, ArrowRight, Search, Trash2, User, UserCheck, ShieldAlert, CheckCircle2, ChevronRight } from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { OffencesSelector } from "./OffencesSelector";

// Mock known offenders data
const mockKnownOffenders = [
  { id: "S-001", firstName: "Murugan", lastName: "Selvam", surName: "M", aliasName: "Muru", idProofNumber: "TN-98234", address: "12 Anna Nagar, Chennai", risk: "High" },
  { id: "S-002", firstName: "Kavitha", lastName: "Rajan", surName: "K", aliasName: "", idProofNumber: "TN-45123", address: "45 Kamarajar Salai, Madurai", risk: "Medium" },
  { id: "S-003", firstName: "Senthil", lastName: "Kumar", surName: "P", aliasName: "Sen", idProofNumber: "TN-78456", address: "78 Lake Area, Coimbatore", risk: "Low" },
  { id: "S-004", firstName: "Lakshmi", lastName: "Devi", surName: "S", aliasName: "", idProofNumber: "TN-23567", address: "23 Temple Street, Thanjavur", risk: "High" },
  { id: "S-005", firstName: "Rajesh", lastName: "Kannan", surName: "R", aliasName: "Raju", idProofNumber: "TN-67890", address: "56 Periyar Nagar, Tiruchirappalli", risk: "Medium" },
];

type OffenderEntry = {
  type: 'known' | 'unknown';
  isKnownSelected?: boolean;  // true once a known offender row was clicked
  profileId?: string;
  firstName?: string;
  lastName?: string;
  surName?: string;
  aliasName?: string;
  idProofNumber?: string;
  address?: string;
  description?: string;
  appearance?: string;
  vehicle?: string;
  activity?: string;
  risk?: string;
};

export function CIUInitiatedReportForm({ onAfterSubmit }: { onAfterSubmit?: () => void } = {}) {
  const [offenderIds, setOffenderIds] = useState<number[]>([1]);
  const [offenderEntries, setOffenderEntries] = useState<Record<number, OffenderEntry>>({
    1: { type: 'known' }
  });
  const [searchQuery, setSearchQuery] = useState<Record<number, string>>({});
  const [location, setLocation] = useState("");
  const [district, setDistrict] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("");
  const [offences, setOffences] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitIntelligenceReport = useAppStore(state => state.submitIntelligenceReport);

  const labelCls = "text-xs font-semibold text-muted-foreground mb-1 block";
  const inputCls = "w-full rounded-md border p-2 text-sm bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  const handleTypeChange = (id: number, type: 'known' | 'unknown') => {
    setOffenderEntries(prev => ({
      ...prev,
      [id]: { type, isKnownSelected: false } // fresh state, just preserving the type
    }));
  };

  const handleSelectKnownOffender = (id: number, profile: typeof mockKnownOffenders[0]) => {
    setOffenderEntries(prev => ({
      ...prev,
      [id]: {
        type: 'known',
        isKnownSelected: true,
        profileId: profile.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        surName: profile.surName,
        aliasName: profile.aliasName,
        idProofNumber: profile.idProofNumber,
        address: profile.address,
        risk: profile.risk,
      }
    }));
  };

  const handleFieldChange = (id: number, field: keyof OffenderEntry, value: string) => {
    setOffenderEntries(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const handleAddOffender = () => {
    const newId = (offenderIds[offenderIds.length - 1] || 0) + 1;
    setOffenderIds(prev => [...prev, newId]);
    setOffenderEntries(prev => ({ ...prev, [newId]: { type: 'unknown' } }));
  };

  const handleRemoveOffender = (id: number) => {
    setOffenderIds(prev => prev.filter(i => i !== id));
    setOffenderEntries(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleSubmit = () => {
    const submittedOffenders = offenderIds.map(id => {
      const entry = offenderEntries[id] || { type: 'unknown' };
      return {
        type: entry.type,
        profileId: entry.profileId,
        firstName: entry.firstName || '',
        lastName: entry.lastName || '',
        surName: entry.surName || '',
        aliasName: entry.aliasName || '',
        idProofNumber: entry.idProofNumber || '',
        address: entry.address || '',
        description: entry.description || '',
        appearance: entry.appearance || '',
        vehicle: entry.vehicle || '',
        activity: entry.activity || '',
        risk: entry.risk || 'Low',
      };
    });

    submitIntelligenceReport({
      source: 'CIU', date, time, location, district,
      offenders: submittedOffenders as any
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setOffenderIds([1]);
      setOffenderEntries({ 1: { type: 'known' } });
      setLocation(""); setDistrict(""); setTime(""); setOffences([]);
      setIsSubmitted(false);
      onAfterSubmit?.();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-background">
        <div className="max-w-md w-full text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-foreground">Report Submitted Successfully</h2>
          <p className="text-muted-foreground">
            The intelligence report has been forwarded to the DSP for the next level of approval.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
          <span className="text-primary bg-primary/10 rounded p-1">
            <ShieldAlert className="h-5 w-5" />
          </span>
          Intelligence Report
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Submit new intelligence for approval chain</p>
      </div>

      <div className="space-y-6">
        {/* Report Details */}
        <div className="stat-card p-0">
          <div className="p-5">
            <h3 className="text-sm font-bold text-foreground mb-4">Report Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>Date</label>
                <input type="date" className={inputCls} value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Time</label>
                <input type="time" className={inputCls} value={time} onChange={e => setTime(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Location</label>
                <input type="text" className={inputCls} placeholder="Location of incident" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>District</label>
                <input type="text" className={inputCls} placeholder="District name" value={district} onChange={e => setDistrict(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Offences */}
        <div className="stat-card p-0">
          <div className="p-5">
            <h3 className="text-sm font-bold text-foreground mb-4">Offences Involved</h3>
            <OffencesSelector selected={offences} onChange={setOffences} />
          </div>
        </div>

        {/* Offender Sections */}
        {offenderIds.map((id, index) => {
          const entry = offenderEntries[id] || { type: 'unknown' };
          const { type, isKnownSelected } = entry;
          const query = searchQuery[id] || '';
          const filteredOffenders = mockKnownOffenders.filter(p =>
            `${p.firstName} ${p.lastName} ${p.aliasName} ${p.idProofNumber}`.toLowerCase().includes(query.toLowerCase())
          );

          return (
            <div key={id} className="stat-card p-0">
              <div className="p-5">
                {/* Offender header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-bold text-foreground">Offender #{index + 1}</h3>
                  {offenderIds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOffender(id)}
                      className="flex items-center gap-1 text-xs font-semibold text-destructive hover:opacity-80 transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> REMOVE
                    </button>
                  )}
                </div>

                {/* Type Toggle */}
                <div className="mb-6">
                  <label className={labelCls}>Offender Type</label>
                  <div className="flex w-fit rounded-lg overflow-hidden border shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleTypeChange(id, 'known')}
                      className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold border-r transition-all ${type === 'known' ? 'bg-primary text-white' : 'bg-muted/30 text-muted-foreground hover:bg-muted/60'}`}
                    >
                      <UserCheck className="h-4 w-4" /> Known Offender
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange(id, 'unknown')}
                      className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold transition-all ${type === 'unknown' ? 'bg-primary text-white' : 'bg-muted/30 text-muted-foreground hover:bg-muted/60'}`}
                    >
                      <User className="h-4 w-4" /> Unknown Offender
                    </button>
                  </div>
                </div>

                {/* ─── KNOWN OFFENDER: Step 1 — Search & Select ─────────────────── */}
                {type === 'known' && !isKnownSelected && (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">Select an offender from the database to auto-populate the form:</p>
                    <div className="rounded-lg border overflow-hidden bg-background">
                      {/* Search bar */}
                      <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/20">
                        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                        <input
                          type="text"
                          placeholder="Search by name, alias or ID proof..."
                          className="bg-transparent border-none text-sm w-full focus:outline-none"
                          value={query}
                          onChange={e => setSearchQuery(prev => ({ ...prev, [id]: e.target.value }))}
                        />
                      </div>
                      {/* Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm whitespace-nowrap">
                          <thead className="bg-muted/30">
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 text-xs font-bold text-primary">ID</th>
                              <th className="text-left py-3 px-4 text-xs font-bold text-primary">FIRST NAME</th>
                              <th className="text-left py-3 px-4 text-xs font-bold text-primary">LAST NAME</th>
                              <th className="text-left py-3 px-4 text-xs font-bold text-primary">SURNAME</th>
                              <th className="text-left py-3 px-4 text-xs font-bold text-primary">ALIAS</th>
                              <th className="text-left py-3 px-4 text-xs font-bold text-primary">ID PROOF NO.</th>
                              <th className="text-left py-3 px-4 text-xs font-bold text-primary">ADDRESS</th>
                              <th className="text-left py-3 px-4 text-xs font-bold text-primary">RISK</th>
                              <th className="py-3 px-4"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredOffenders.length === 0 ? (
                              <tr>
                                <td colSpan={9} className="py-6 text-center text-xs text-muted-foreground">No offenders found matching your search.</td>
                              </tr>
                            ) : filteredOffenders.map(profile => (
                              <tr
                                key={profile.id}
                                className="border-b last:border-0 hover:bg-primary/5 transition-colors cursor-pointer group"
                                onClick={() => handleSelectKnownOffender(id, profile)}
                              >
                                <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{profile.id}</td>
                                <td className="py-3 px-4 font-semibold text-foreground">{profile.firstName}</td>
                                <td className="py-3 px-4 text-foreground">{profile.lastName}</td>
                                <td className="py-3 px-4 text-muted-foreground">{profile.surName || '—'}</td>
                                <td className="py-3 px-4 text-muted-foreground">{profile.aliasName || '—'}</td>
                                <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{profile.idProofNumber}</td>
                                <td className="py-3 px-4 text-muted-foreground text-xs">{profile.address}</td>
                                <td className="py-3 px-4">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${profile.risk === 'High' ? 'bg-red-100 text-red-700' : profile.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                                    {profile.risk}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── KNOWN OFFENDER: Step 2 — Form (auto-populated, editable) ─── */}
                {type === 'known' && isKnownSelected && (
                  <div className="space-y-5">
                    {/* Selected banner */}
                    <div className="flex justify-between items-center bg-primary/10 border border-primary/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-sm text-primary">
                          {[entry.firstName, entry.lastName].filter(Boolean).join(' ')} — {entry.profileId}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOffenderEntries(prev => ({ ...prev, [id]: { ...prev[id], isKnownSelected: false } }))}
                        className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ← CHANGE SELECTION
                      </button>
                    </div>

                    {/* Pre-populated editable fields */}
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>First Name *</label>
                        <input type="text" className={inputCls} placeholder="First Name" value={entry.firstName || ''} onChange={e => handleFieldChange(id, 'firstName', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Last Name</label>
                        <input type="text" className={inputCls} placeholder="Last Name" value={entry.lastName || ''} onChange={e => handleFieldChange(id, 'lastName', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Sur Name</label>
                        <input type="text" className={inputCls} placeholder="Sur Name" value={entry.surName || ''} onChange={e => handleFieldChange(id, 'surName', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Alias Name</label>
                        <input type="text" className={inputCls} placeholder="Alias Name" value={entry.aliasName || ''} onChange={e => handleFieldChange(id, 'aliasName', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>ID Proof Number</label>
                        <input type="text" className={inputCls} placeholder="Aadhaar / Voter ID / DL" value={entry.idProofNumber || ''} onChange={e => handleFieldChange(id, 'idProofNumber', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Risk Level</label>
                        <select className={inputCls} value={entry.risk || 'Low'} onChange={e => handleFieldChange(id, 'risk', e.target.value)}>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Address</label>
                      <input type="text" className={inputCls} placeholder="Full address" value={entry.address || ''} onChange={e => handleFieldChange(id, 'address', e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Activity Observed (Additional)</label>
                      <textarea className={`${inputCls} resize-none h-24`} placeholder="Add any new observed activity..." value={entry.activity || ''} onChange={e => handleFieldChange(id, 'activity', e.target.value)} />
                    </div>
                  </div>
                )}

                {/* ─── UNKNOWN OFFENDER: Blank entry form ───────────────────────── */}
                {type === 'unknown' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>First Name *</label>
                        <input type="text" className={inputCls} placeholder="First Name" value={entry.firstName || ''} onChange={e => handleFieldChange(id, 'firstName', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Last Name</label>
                        <input type="text" className={inputCls} placeholder="Last Name" value={entry.lastName || ''} onChange={e => handleFieldChange(id, 'lastName', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Sur Name</label>
                        <input type="text" className={inputCls} placeholder="Sur Name" value={entry.surName || ''} onChange={e => handleFieldChange(id, 'surName', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Alias Name</label>
                        <input type="text" className={inputCls} placeholder="Alias Name" value={entry.aliasName || ''} onChange={e => handleFieldChange(id, 'aliasName', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>ID Proof Number</label>
                        <input type="text" className={inputCls} placeholder="Aadhaar / Voter ID / DL (if known)" value={entry.idProofNumber || ''} onChange={e => handleFieldChange(id, 'idProofNumber', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Risk Level</label>
                        <select className={inputCls} value={entry.risk || 'Low'} onChange={e => handleFieldChange(id, 'risk', e.target.value)}>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Address (if known)</label>
                      <input type="text" className={inputCls} placeholder="Known address" value={entry.address || ''} onChange={e => handleFieldChange(id, 'address', e.target.value)} />
                    </div>

                    <div>
                      <label className={labelCls}>Description of Person</label>
                      <textarea className={`${inputCls} resize-none h-24`} placeholder="General physical description..." value={entry.description || ''} onChange={e => handleFieldChange(id, 'description', e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Physical Appearance</label>
                        <input type="text" className={inputCls} placeholder="Height, build, skin tone, features" value={entry.appearance || ''} onChange={e => handleFieldChange(id, 'appearance', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Vehicle Details</label>
                        <input type="text" className={inputCls} placeholder="Make, model, colour, plate no." value={entry.vehicle || ''} onChange={e => handleFieldChange(id, 'vehicle', e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>Activity Observed</label>
                      <textarea className={`${inputCls} resize-none h-24`} placeholder="Describe the observed criminal activity..." value={entry.activity || ''} onChange={e => handleFieldChange(id, 'activity', e.target.value)} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add Another Offender */}
        <div>
          <button
            type="button"
            onClick={handleAddOffender}
            className="flex items-center gap-2 text-sm font-bold text-primary hover:opacity-80 transition-opacity"
          >
            <Plus className="h-4 w-4" /> ADD ANOTHER OFFENDER
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 pb-12">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white bg-primary shadow-md hover:shadow-lg hover:opacity-90 transition-all"
          >
            Submit for Approval <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
