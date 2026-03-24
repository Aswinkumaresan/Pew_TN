import { motion } from "framer-motion";
import { useState } from "react";
import {
  Users,
  Lock,
  Building2,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Smartphone,
  ClipboardList,
  FileText,
  ShieldCheck,
  MapPin,
  Settings2,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const users = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "State Super Admin",
    district: "All",
    unit: "HQ",
    status: "Active",
    lastLogin: "2026-03-02 14:30",
  },
  {
    id: 2,
    name: "Priya",
    role: "District Admin",
    district: "Chennai",
    unit: "Anti-Narcotics",
    status: "Active",
    lastLogin: "2026-03-02 09:15",
  },
  {
    id: 3,
    name: "Arun Pandian",
    role: "PEW Officer",
    district: "Coimbatore",
    unit: "Checkpost",
    status: "Active",
    lastLogin: "2026-03-01 18:42",
  },
  {
    id: 4,
    name: "Sunita Meena",
    role: "CIU Personnel",
    district: "Madurai",
    unit: "Intelligence",
    status: "Disabled",
    lastLogin: "2026-02-15 11:20",
  },
  {
    id: 5,
    name: "Vikram Kumar",
    role: "CIU Personnel",
    district: "Salem",
    unit: "Enforcement",
    status: "Active",
    lastLogin: "2026-03-02 16:05",
  },
];

const roles = [
  "State Super Admin",
  "District Admin",
  "PEW Officer",
  "CIU Personnel",
  "NIBCID Personnel",
];

const modules = [
  "Dashboard",
  "DSR Cases",
  "GIS Map",
  "Intelligence Reports",
  "Accused Profiles",
  "Checkpost Data",
  "User Management",
  "Audit Trail",
  "Master Data",
  "Report Templates",
];
const permActions = [
  "View",
  "Upload",
  "Create",
  "Edit",
  "Delete",
  "Export",
  "Approve",
  "Disable",
];

const rolePermissions: Record<string, Record<string, string[]>> = {
  "State Super Admin": {
    Dashboard: ["View"],
    "Checkpost Data": ["View", "Create"],
  },
  "District Admin": {
    Dashboard: [],
    "DSR Cases": ["View", "Create", "Edit"],
    "Intelligence Reports": ["Create", "Edit"],
    "Checkpost Data": ["View", "Upload", "Create"],
    "User Management": ["View"],
    "Audit Trail": ["View"],
    "Master Data": ["View", "Create"],
    "Report Templates": ["View"],
  },
  "PEW Officer": {
    Dashboard: ["View"],
    "DSR Cases": ["View", "Upload", "Create"],
    "GIS Map": ["View", "Create"],
    "Intelligence Reports": ["Create", "Edit"],
    "Accused Profiles": ["View", "Create"],
  },
  "NIBCID Personnel": {
    Dashboard: [],
    "DSR Cases": ["View", "Create"],
    "GIS Map": ["View", "Create"],
    "Intelligence Reports": ["Create"],
    "Checkpost Data": ["View", "Create"],
    "User Management": ["View", "Approve"],
    "Master Data": ["Upload", "Create", "Edit"],
  },
  "CIU Personnel": {
    Dashboard: [],
    "DSR Cases": ["View", "Create", "Delete"],
    "GIS Map": ["View", "Delete"],
    "User Management": ["Upload", "Approve"],
    "Master Data": ["Upload", "Create", "Edit"],
  },
};

const districts = [
  { code: "CHN", name: "Chennai", zone: "North", status: "Active", units: 8 },
  { code: "CBE", name: "Coimbatore", zone: "West", status: "Active", units: 6 },
  { code: "MDU", name: "Madurai", zone: "South", status: "Active", units: 5 },
  {
    code: "TRY",
    name: "Tiruchirappalli",
    zone: "Central",
    status: "Active",
    units: 5,
  },
  {
    code: "TEN",
    name: "Tirunelveli",
    zone: "South",
    status: "Active",
    units: 4,
  },
  {
    code: "SLM",
    name: "Salem",
    zone: "North-West",
    status: "Active",
    units: 4,
  },
  { code: "ERD", name: "Erode", zone: "West", status: "Active", units: 3 },
  { code: "TNJ", name: "Thanjavur", zone: "East", status: "Active", units: 3 },
  { code: "VLR", name: "Vellore", zone: "North", status: "Active", units: 3 },
  {
    code: "KRG",
    name: "Krishnagiri",
    zone: "North-West",
    status: "Active",
    units: 3,
  },
];

const otpPersonnel = [
  {
    name: "Arun Pandian",
    role: "PEW Officer",
    phone: "+91 98765 43210",
    enabled: true,
    lastOtp: "2026-03-02 18:30",
    device: "Android",
  },
  {
    name: "Sunita Meena",
    role: "CIU Personnel",
    phone: "+91 87654 32109",
    enabled: true,
    lastOtp: "2026-03-01 09:15",
    device: "iOS",
  },
  {
    name: "Deepak Kumar",
    role: "PEW Officer",
    phone: "+91 76543 21098",
    enabled: false,
    lastOtp: "—",
    device: "—",
  },
  {
    name: "Kavita",
    role: "NIBCID Personnel",
    phone: "+91 65432 10987",
    enabled: true,
    lastOtp: "2026-03-02 14:22",
    device: "Android",
  },
];

const auditLogs = [
  {
    time: "2026-03-02 14:30:12",
    user: "Rajesh Kumar",
    action: "Login",
    details: "Logged in from 192.168.1.100",
    ip: "192.168.1.100",
  },
  {
    time: "2026-03-02 13:45:08",
    user: "Priya ",
    action: "Data Entry",
    details: "Created DSR Case #DSR-2026-0342",
    ip: "10.0.5.22",
  },
  {
    time: "2026-03-02 12:20:55",
    user: "Arun Pandian",
    action: "Modification",
    details: "Updated accused profile: Raju Meena",
    ip: "172.16.0.45",
  },
  {
    time: "2026-03-02 11:10:30",
    user: "Rajesh Kumar",
    action: "Admin Action",
    details: "Disabled user account: Sunita Meena",
    ip: "192.168.1.100",
  },
  {
    time: "2026-03-02 10:05:18",
    user: "Vikram Kumar",
    action: "Export",
    details: "Exported DSR report (Excel) for Feb 2026",
    ip: "10.0.3.88",
  },
  {
    time: "2026-03-02 09:30:42",
    user: "Priya ",
    action: "Data Entry",
    details: "Added intelligence report #IR-2026-0089",
    ip: "10.0.5.22",
  },
  {
    time: "2026-03-02 08:15:05",
    user: "Kavita",
    action: "Login",
    details: "Mobile OTP login from Android device",
    ip: "103.25.44.12",
  },
  {
    time: "2026-03-01 17:50:33",
    user: "Deepak Kumar",
    action: "Modification",
    details: "Modified checkpost status: Shahpura Naka",
    ip: "10.0.7.19",
  },
  {
    time: "2026-03-01 16:22:10",
    user: "Rajesh Kumar",
    action: "Admin Action",
    details: "Created new role: Regional Coordinator",
    ip: "192.168.1.100",
  },
  {
    time: "2026-03-01 15:00:00",
    user: "Arun Pandian",
    action: "Logout",
    details: "Session ended",
    ip: "172.16.0.45",
  },
];

const reportTemplates = [
  {
    id: "RPT-001",
    name: "Daily Situation Report",
    module: "DSR",
    metrics: "Cases, Seizures, Arrests",
    filters: "Date, District",
    formats: "PDF, Excel",
    status: "Active",
  },
  {
    id: "RPT-002",
    name: "Monthly District Summary",
    module: "Dashboard",
    metrics: "Total Cases, Contraband Volume",
    filters: "Month, District",
    formats: "PDF",
    status: "Active",
  },
  {
    id: "RPT-003",
    name: "Intelligence Analysis Report",
    module: "Intelligence",
    metrics: "Source Reports, Accused Profiles",
    filters: "Date Range, Risk Level",
    formats: "PDF, Excel",
    status: "Active",
  },
  {
    id: "RPT-004",
    name: "Checkpost Activity Log",
    module: "DSR",
    metrics: "Vehicles Checked, Seizures, Contraband",
    filters: "Date, Checkpost",
    formats: "PDF, Excel, CSV",
    status: "Active",
  },
  {
    id: "RPT-005",
    name: "GIS Heatmap Export",
    module: "GIS Map",
    metrics: "Case Density, Hotspot Zones",
    filters: "Date Range, Contraband",
    formats: "PDF, KML",
    status: "Draft",
  },
];

const actionColors: Record<string, string> = {
  Login: "hsl(var(--accent))",
  Logout: "hsl(var(--muted-foreground))",
  "Data Entry": "hsl(var(--risk-low))",
  Modification: "hsl(var(--risk-medium))",
  "Admin Action": "hsl(var(--primary))",
  Export: "hsl(var(--risk-low))",
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const tabs = [
  { id: "users", label: "Users", icon: Users },
  { id: "permissions", label: "Permissions", icon: Lock },
  { id: "master", label: "Master Data", icon: MapPin },
  { id: "otp", label: "OTP Config", icon: Smartphone },
  { id: "audit", label: "Audit Trail", icon: ClipboardList },
  { id: "templates", label: "Report Templates", icon: FileText },
];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<string>("users");
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      u.district.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      {/* Header */}
      <div>
        <h2
          className="text-xl font-bold"
          style={{ color: "hsl(var(--foreground))" }}
        >
          Administration
        </h2>
        <p
          className="text-xs mt-0.5"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          User management, role permissions, master data, OTP configuration,
          audit trails &amp; report templates
        </p>
      </div>

      {/* Tab Bar */}
      <div
        className="flex gap-1 border-b"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all relative"
            style={{
              color:
                activeTab === id
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))",
              borderBottom:
                activeTab === id
                  ? "2px solid hsl(var(--primary))"
                  : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── USERS ── */}
      {activeTab === "users" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card space-y-4"
        >
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                style={{ color: "hsl(var(--muted-foreground))" }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, role, or district..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border outline-none"
                style={{
                  background: "hsl(var(--muted))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                }}
              />
            </div>
            {/* Filter */}
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg border outline-none"
              style={{
                background: "hsl(var(--muted))",
                borderColor: "hsl(var(--border))",
                color: "hsl(var(--foreground))",
              }}
            >
              <option value="all">Filter role</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button
              className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-3.5 w-3.5" /> Add User
            </button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                {[
                  "Name",
                  "Role",
                  "District",
                  "Unit",
                  "Status",
                  "Last Login",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="text-left text-xs font-medium pb-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="data-table-row">
                  <td className="py-3 font-semibold text-sm">{u.name}</td>
                  <td className="py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded border"
                      style={{
                        borderColor: "hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                        background: "hsl(var(--muted))",
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td
                    className="py-3 text-xs"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    {u.district}
                  </td>
                  <td
                    className="py-3 text-xs"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {u.unit}
                  </td>
                  <td className="py-3">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background:
                          u.status === "Active"
                            ? "hsl(var(--foreground))"
                            : "hsl(var(--muted))",
                        color:
                          u.status === "Active"
                            ? "hsl(var(--background))"
                            : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td
                    className="py-3 text-xs font-mono"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {u.lastLogin}
                  </td>
                  <td className="py-3 flex items-center gap-2">
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Edit
                        className="h-3.5 w-3.5"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                      />
                    </button>
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Trash2
                        className="h-3.5 w-3.5"
                        style={{ color: "hsl(var(--risk-high))" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            className="text-xs"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {filteredUsers.length} entries
          </p>
        </motion.div>
      )}

      {/* ── PERMISSIONS ── */}
      {activeTab === "permissions" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Role selector */}
          <div className="flex gap-2 flex-wrap">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background:
                    selectedRole === r
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted))",
                  color:
                    selectedRole === r
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--muted-foreground))",
                }}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="stat-card overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">
                {selectedRole} — Module Permissions
              </h3>
              <button
                className="px-4 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                Save Changes
              </button>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                  <th className="text-left font-medium pb-3 pr-6 min-w-[160px]">
                    Module
                  </th>
                  {permActions.map((a) => (
                    <th key={a} className="text-center font-medium pb-3 px-3">
                      {a}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((mod) => {
                  const granted = rolePermissions[selectedRole]?.[mod] ?? [];
                  return (
                    <tr key={mod} className="data-table-row">
                      <td className="py-2.5 pr-6 font-medium">{mod}</td>
                      {permActions.map((action) => {
                        const has = granted.includes(action);
                        return (
                          <td key={action} className="py-2.5 text-center">
                            <span
                              className="inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold mx-auto"
                              style={{
                                background: has
                                  ? "hsl(var(--risk-low) / 0.15)"
                                  : "hsl(var(--muted))",
                                color: has
                                  ? "hsl(var(--risk-low))"
                                  : "hsl(var(--muted-foreground))",
                              }}
                            >
                              {has ? "✓" : "−"}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ── MASTER DATA ── */}
      {activeTab === "master" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Districts</h3>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-3.5 w-3.5" /> Add District
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                {["Code", "Name", "Zone", "Status", "Units", "Actions"].map(
                  (h) => (
                    <th key={h} className="text-left text-xs font-medium pb-3">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {districts.map((d) => (
                <tr key={d.code} className="data-table-row">
                  <td
                    className="py-3 font-mono text-xs"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {d.code}
                  </td>
                  <td className="py-3 font-semibold">{d.name}</td>
                  <td
                    className="py-3 text-xs"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {d.zone}
                  </td>
                  <td className="py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsl(var(--risk-low) / 0.15)",
                        color: "hsl(var(--risk-low))",
                      }}
                    >
                      ● {d.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs">{d.units} units</td>
                  <td className="py-3 flex items-center gap-2">
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Edit
                        className="h-3.5 w-3.5"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                      />
                    </button>
                    <button className="p-1.5 rounded hover:bg-muted transition-colors">
                      <Trash2
                        className="h-3.5 w-3.5"
                        style={{ color: "hsl(var(--risk-high))" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            className="text-xs mt-3"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {districts.length} entries
          </p>
        </motion.div>
      )}

      {/* ── OTP CONFIG ── */}
      {activeTab === "otp" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* OTP Settings */}
            <div className="stat-card space-y-3">
              <h3 className="text-xs font-semibold flex items-center gap-1.5">
                <Settings2
                  className="h-3.5 w-3.5"
                  style={{ color: "hsl(var(--primary))" }}
                />
                OTP Settings
              </h3>
              <label className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  Enable Mobile OTP Login
                </span>
                <div
                  className="w-9 h-5 rounded-full relative cursor-pointer"
                  style={{ background: "hsl(var(--primary))" }}
                >
                  <div
                    className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full"
                    style={{ background: "hsl(var(--primary-foreground))" }}
                  />
                </div>
              </label>
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  OTP Validity (seconds)
                </p>
                <input
                  defaultValue="300"
                  className="w-full px-3 py-1.5 text-xs rounded border outline-none"
                  style={{
                    background: "hsl(var(--muted))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                />
              </div>
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  Max Retry Attempts
                </p>
                <input
                  defaultValue="3"
                  className="w-full px-3 py-1.5 text-xs rounded border outline-none"
                  style={{
                    background: "hsl(var(--muted))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                />
              </div>
            </div>
            {/* SMS Gateway */}
            <div className="stat-card space-y-3">
              <h3 className="text-xs font-semibold flex items-center gap-1.5">
                <Smartphone
                  className="h-3.5 w-3.5"
                  style={{ color: "hsl(var(--accent))" }}
                />
                SMS Gateway
              </h3>
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  SMS Provider
                </p>
                <input
                  defaultValue="Govt SMS Gateway (NIC)"
                  className="w-full px-3 py-1.5 text-xs rounded border outline-none"
                  style={{
                    background: "hsl(var(--muted))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                />
              </div>
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  Sender ID
                </p>
                <input
                  defaultValue="EBCID"
                  className="w-full px-3 py-1.5 text-xs rounded border outline-none"
                  style={{
                    background: "hsl(var(--muted))",
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                />
              </div>
            </div>
            {/* Security */}
            <div className="stat-card space-y-3">
              <h3 className="text-xs font-semibold flex items-center gap-1.5">
                <ShieldCheck
                  className="h-3.5 w-3.5"
                  style={{ color: "hsl(var(--risk-low))" }}
                />
                Security
              </h3>
              {["Rate Limiting", "Device Binding", "Geo-fencing"].map((s) => (
                <label key={s} className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {s}
                  </span>
                  <div
                    className="w-9 h-5 rounded-full relative cursor-pointer"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    <div
                      className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full"
                      style={{ background: "hsl(var(--primary-foreground))" }}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 rounded-lg text-xs font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Save Configuration
            </button>
          </div>

          <div className="stat-card">
            <h3 className="text-sm font-semibold mb-4">
              Field Personnel OTP Status
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                  {[
                    "Name",
                    "Role",
                    "Phone",
                    "OTP Enabled",
                    "Last OTP Sent",
                    "Device",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="text-left text-xs font-medium pb-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {otpPersonnel.map((p) => (
                  <tr key={p.name} className="data-table-row">
                    <td className="py-3 font-semibold">{p.name}</td>
                    <td
                      className="py-3 text-xs"
                      style={{ color: "hsl(var(--muted-foreground))" }}
                    >
                      {p.role}
                    </td>
                    <td className="py-3 text-xs font-mono">{p.phone}</td>
                    <td className="py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: p.enabled
                            ? "hsl(var(--risk-low) / 0.15)"
                            : "hsl(var(--muted))",
                          color: p.enabled
                            ? "hsl(var(--risk-low))"
                            : "hsl(var(--muted-foreground))",
                        }}
                      >
                        {p.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td
                      className="py-3 text-xs font-mono"
                      style={{ color: "hsl(var(--muted-foreground))" }}
                    >
                      {p.lastOtp}
                    </td>
                    <td className="py-3 text-xs">{p.device}</td>
                    <td className="py-3">
                      <button className="p-1.5 rounded hover:bg-muted">
                        <Settings2
                          className="h-3.5 w-3.5"
                          style={{ color: "hsl(var(--muted-foreground))" }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ── AUDIT TRAIL ── */}
      {activeTab === "audit" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
        >
          <h3 className="text-sm font-semibold mb-4">Complete Audit Trail</h3>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                {["Timestamp", "User", "Action", "Details", "IP Address"].map(
                  (h) => (
                    <th key={h} className="text-left font-medium pb-3 pr-4">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, i) => (
                <tr key={i} className="data-table-row">
                  <td
                    className="py-2.5 pr-4 font-mono whitespace-nowrap"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {log.time}
                  </td>
                  <td className="py-2.5 pr-4 font-semibold whitespace-nowrap">
                    {log.user}
                  </td>
                  <td className="py-2.5 pr-4">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-semibold"
                      style={{
                        background: "hsl(var(--muted))",
                        color:
                          actionColors[log.action] ??
                          "hsl(var(--muted-foreground))",
                      }}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td
                    className="py-2.5 pr-4"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {log.details}
                  </td>
                  <td
                    className="py-2.5 font-mono"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* ── REPORT TEMPLATES ── */}
      {activeTab === "templates" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold">Report Templates</h3>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              <Plus className="h-3.5 w-3.5" /> New Template
            </button>
          </div>
          <p
            className="text-xs mb-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Define metrics, filters, and export formats for generated reports.
          </p>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: "hsl(var(--muted-foreground))" }}>
                {[
                  "ID",
                  "Template Name",
                  "Module",
                  "Metrics",
                  "Filters",
                  "Formats",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="text-left font-medium pb-3 pr-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportTemplates.map((t) => (
                <tr key={t.id} className="data-table-row">
                  <td
                    className="py-2.5 pr-3 font-mono"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {t.id}
                  </td>
                  <td className="py-2.5 pr-3 font-semibold">{t.name}</td>
                  <td className="py-2.5 pr-3">
                    <span
                      className="px-2 py-0.5 rounded text-[10px]"
                      style={{
                        background: "hsl(var(--primary) / 0.1)",
                        color: "hsl(var(--primary))",
                      }}
                    >
                      {t.module}
                    </span>
                  </td>
                  <td
                    className="py-2.5 pr-3"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {t.metrics}
                  </td>
                  <td
                    className="py-2.5 pr-3"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    {t.filters}
                  </td>
                  <td className="py-2.5 pr-3 font-mono">{t.formats}</td>
                  <td className="py-2.5 pr-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{
                        background:
                          t.status === "Active"
                            ? "hsl(var(--risk-low) / 0.15)"
                            : "hsl(var(--muted))",
                        color:
                          t.status === "Active"
                            ? "hsl(var(--risk-low))"
                            : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="py-2.5 flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-muted">
                      <Edit
                        className="h-3.5 w-3.5"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                      />
                    </button>
                    <button className="p-1 rounded hover:bg-muted">
                      <Trash2
                        className="h-3.5 w-3.5"
                        style={{ color: "hsl(var(--risk-high))" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
