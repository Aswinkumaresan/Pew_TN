export const kpiData = [
  { label: "Active Cases", value: 1247, delta: "+12%", deltaType: "up", icon: "briefcase", color: "primary" },
  { label: "Seizures Today", value: 38, delta: "+5", deltaType: "up", icon: "package", color: "accent" },
  { label: "High-Risk Districts", value: 6, delta: "-1", deltaType: "down", icon: "alert-triangle", color: "risk-high" },
  { label: "Source Reports - Pending", value: 10, delta: "+22", deltaType: "up", icon: "brain", color: "intel" },
  { label: "Checkposts Active", value: 42, delta: "0", deltaType: "neutral", icon: "shield", color: "risk-low" },
  { label: "Helpline Calls", value: 93, delta: "+8", deltaType: "up", icon: "phone", color: "risk-medium" },
];

export const recentCases = [
  { id: "CS-2024-1831", district: "Chennai", unit: "STF", type: "NDPS", severity: "high", status: "Active", accused: "Murugan K.", seizure: "4.2 kg Cannabis" },
  { id: "CS-2024-1830", district: "Coimbatore", unit: "District", type: "Excise", severity: "medium", status: "Under Investigation", accused: "Selvam M.", seizure: "120 L Arrack" },
  { id: "CS-2024-1829", district: "Madurai", unit: "CIU", type: "NDPS", severity: "high", status: "Chargesheeted", accused: "Velan S.", seizure: "850g Heroin" },
  { id: "CS-2024-1828", district: "Tiruchirappalli", unit: "Anti-Narcotics", type: "NDPS", severity: "low", status: "Closed", accused: "Anbu R.", seizure: "22 tablets" },
  { id: "CS-2024-1827", district: "Salem", unit: "District", type: "Smuggling", severity: "medium", status: "Active", accused: "Kumaran P.", seizure: "Counterfeit goods" },
  { id: "CS-2024-1826", district: "Tirunelveli", unit: "CIU", type: "NDPS", severity: "high", status: "Active", accused: "Durai A.", seizure: "1.2 kg Ganja" },
];

export const districtRisk = [
  { district: "Chennai", score: 87, cases: 234, trend: "up" },
  { district: "Coimbatore", score: 72, cases: 198, trend: "up" },
  { district: "Madurai", score: 65, cases: 156, trend: "stable" },
  { district: "Tiruchirappalli", score: 58, cases: 134, trend: "down" },
  { district: "Tirunelveli", score: 79, cases: 178, trend: "up" },
  { district: "Salem", score: 45, cases: 98, trend: "down" },
  { district: "Erode", score: 61, cases: 142, trend: "stable" },
  { district: "Thanjavur", score: 71, cases: 89, trend: "up" },
];

export const trendData = [
  { month: "Aug", cases: 98, seizures: 34 },
  { month: "Sep", cases: 112, seizures: 41 },
  { month: "Oct", cases: 127, seizures: 38 },
  { month: "Nov", cases: 143, seizures: 52 },
  { month: "Dec", cases: 138, seizures: 48 },
  { month: "Jan", cases: 156, seizures: 61 },
  { month: "Feb", cases: 171, seizures: 67 },
];

export const offenceBreakdown = [
  { type: "NDPS", count: 445, pct: 42 },
  { type: "CRIME", count: 387, pct: 36 },
  { type: "PEW", count: 235, pct: 22 },
];

export const checkpostData = [
  { name: "Walajapet", district: "Ranipet", status: "active", vehicles: 342, alerts: 3 },
  { name: "Hosur", district: "Krishnagiri", status: "active", vehicles: 218, alerts: 1 },
  { name: "Kaliyakkavilai", district: "Kanyakumari", status: "active", vehicles: 189, alerts: 0 },
  { name: "Meenakshipuram", district: "Theni", status: "active", vehicles: 276, alerts: 5 },
  { name: "Topslip", district: "Coimbatore", status: "maintenance", vehicles: 0, alerts: 0 },
  { name: "Vaniyambadi", district: "Tirupattur", status: "active", vehicles: 411, alerts: 2 },
];

export const auditLogs = [
  { id: 1, user: "SP Ramesh Kumar", action: "Approved Intel Report", module: "Intelligence", ip: "10.0.1.45", time: "2025-02-26 14:32" },
  { id: 2, user: "DSP Kavitha Devi", action: "Created DSR Entry", module: "DSR", ip: "10.0.2.12", time: "2025-02-26 14:18" },
  { id: 3, user: "CI Senthil Murugan", action: "Updated Case Status", module: "Case Mgmt", ip: "10.0.3.78", time: "2025-02-26 13:55" },
  { id: 4, user: "Admin Lakshmi", action: "Created User Account", module: "Admin", ip: "10.0.1.10", time: "2025-02-26 13:40" },
  { id: 5, user: "DIG Pandian", action: "Exported PDF Report", module: "Reports", ip: "10.0.4.22", time: "2025-02-26 13:22" },
  { id: 6, user: "CIU Officer Karthik", action: "Added Accused Profile", module: "Intelligence", ip: "10.0.5.33", time: "2025-02-26 13:10" },
];

export const intelligenceProfiles = [
  {
    id: "ACC-001", name: "Murugan Thevar", age: 38, district: "Chennai", risk: "high", cases: 4, status: "Active", associates: 6,
    caseStatus: "Judicial Custody", isHistorySheeter: true, isLevelAPlus: true, ovDetails: "TN-09-AK-7832 (Seized — NDPS transport)",
  },
  {
    id: "ACC-002", name: "Durai Singam", age: 44, district: "Madurai", risk: "high", cases: 7, status: "Active", associates: 12,
    caseStatus: "New Pending", isHistorySheeter: true, isLevelAPlus: true, ovDetails: "CS-2024-1829 (verified — inter-state supply)",
  },
  {
    id: "ACC-003", name: "Velan Raju", age: 29, district: "Coimbatore", risk: "medium", cases: 2, status: "Absconding", associates: 3,
    caseStatus: "New Pending", isHistorySheeter: false, isLevelAPlus: false, ovDetails: "",
  },
  {
    id: "ACC-004", name: "Anbu Selvan", age: 35, district: "Tiruchirappalli", risk: "medium", cases: 3, status: "Arrested", associates: 5,
    caseStatus: "Detained in Goondas", isHistorySheeter: true, isLevelAPlus: false, ovDetails: "TN-45-BX-2219 (linked — contraband seizure)",
  },
  {
    id: "ACC-005", name: "Kumaran Pillai", age: 51, district: "Salem", risk: "low", cases: 1, status: "Released on Bail", associates: 2,
    caseStatus: "On Bail", isHistorySheeter: false, isLevelAPlus: false, ovDetails: "",
  },
];

export const mapMarkers = [
  { id: 1, lat: 13.0827, lng: 80.2707, type: "NDPS", severity: "high", district: "Chennai", label: "CS-2024-1831" },
  { id: 2, lat: 11.0168, lng: 76.9558, type: "Excise", severity: "medium", district: "Coimbatore", label: "CS-2024-1830" },
  { id: 3, lat: 9.9252, lng: 78.1198, type: "NDPS", severity: "high", district: "Madurai", label: "CS-2024-1829" },
  { id: 4, lat: 10.7905, lng: 78.7047, type: "NDPS", severity: "low", district: "Tiruchirappalli", label: "CS-2024-1828" },
  { id: 5, lat: 11.6643, lng: 78.1460, type: "Smuggling", severity: "medium", district: "Salem", label: "CS-2024-1827" },
  { id: 6, lat: 8.7139, lng: 77.7567, type: "NDPS", severity: "high", district: "Tirunelveli", label: "CS-2024-1826" },
  { id: 7, lat: 11.3410, lng: 77.7172, type: "Excise", severity: "medium", district: "Erode", label: "CS-2024-1825" },
  { id: 8, lat: 10.7870, lng: 79.1378, type: "NDPS", severity: "high", district: "Thanjavur", label: "CS-2024-1824" },
];
