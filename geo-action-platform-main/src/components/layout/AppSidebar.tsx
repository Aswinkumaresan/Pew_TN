import { motion } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import { 
  LayoutDashboard, Map, FileText, Brain, BarChart3, 
  Shield, ClipboardList, Settings, Users, ScrollText,
  ChevronLeft, ChevronRight, Zap, Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "main" },
  { id: "gis", label: "GIS Map", icon: Map, group: "main" },
  { id: "dsr", label: "Daily Situation Report", icon: FileText, group: "operations" },
  { id: "intelligence", label: "Intelligence Module", icon: Brain, group: "operations" },
  { id: "pew_officer", label: "PEW Operations", icon: Shield, group: "operations" },
  { id: "checkpost", label: "Checkpost Monitoring", icon: Shield, group: "operations" },
  { id: "analytics", label: "Prediction & Analytics", icon: BarChart3, group: "operations" },
  { id: "reports", label: "Reports & Exports", icon: ClipboardList, group: "reports" },
  { id: "admin", label: "Admin Management", icon: Users, group: "admin" },
  { id: "audit", label: "Audit Logs", icon: ScrollText, group: "admin" },
  { id: "settings", label: "Settings", icon: Settings, group: "admin" },
];

const groups = [
  { id: "main", label: "COMMAND CENTER" },
  { id: "operations", label: "OPERATIONS" },
  { id: "reports", label: "REPORTING" },
  { id: "admin", label: "ADMINISTRATION" },
];

export function AppSidebar() {
  const { activeModule, setActiveModule, sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 240 : 64 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex h-screen flex-col overflow-hidden"
      style={{ background: "hsl(var(--sidebar-background))", borderRight: "1px solid hsl(var(--sidebar-border))" }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 px-4 border-b" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
          <Zap className="h-4 w-4 text-white" />
        </div>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <p className="text-sm font-bold text-foreground leading-tight">DIPS</p>
            <p className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>Intel Platform</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3 space-y-4">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group.id);
          return (
            <div key={group.id}>
              {sidebarOpen && (
                <p className="mb-1 px-4 text-[10px] font-semibold tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {group.label}
                </p>
              )}
              {items.map((item) => {
                const active = activeModule === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveModule(item.id as any)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150",
                      active ? "nav-item-active" : "hover:bg-sidebar-accent"
                    )}
                    style={{ color: active ? "hsl(var(--sidebar-primary))" : "hsl(var(--sidebar-foreground))" }}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 }}
                        className="truncate text-left font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-16 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-card shadow-md"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        {sidebarOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </button>

      {/* Bottom user */}
      <div className="border-t p-3 flex items-center gap-3" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <div className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "hsl(var(--primary) / 0.2)", color: "hsl(var(--primary))" }}>
          SP
        </div>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">SP Ramesh Kumar</p>
            <p className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>District SP · Admin</p>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
