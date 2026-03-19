import { Bell, Search, RefreshCw, Shield, ChevronDown } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { Badge } from "@/components/ui/badge";

const moduleLabels: Record<string, string> = {
  dashboard: "PEW Dashboard",
  gis: "GIS Map",
  dsr: "Daily Situation Report",
  intelligence: "Intelligence Module",
  analytics: "Prediction & Analytics",
  checkpost: "Checkpost Monitoring",
  reports: "Reports & Exports",
  admin: "Admin Management",
  audit: "Audit Logs",
  settings: "Settings",
};

export function CommandBar() {
  const { activeModule, alertCount } = useAppStore();

  return (
    <header className="command-bar h-14 flex items-center justify-between px-6 gap-4 shrink-0">
      <div className="flex items-center gap-3">
        <Shield className="h-4 w-4" style={{ color: "hsl(var(--accent))" }} />
        <h1 className="text-sm font-semibold text-foreground">{moduleLabels[activeModule]}</h1>
        <span className="text-muted-foreground text-xs hidden sm:block">/ Tamilnadu Police Digital Intelligence Platform</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted))" }}>
          <Search className="h-3.5 w-3.5" style={{ color: "hsl(var(--muted-foreground))" }} />
          <span style={{ color: "hsl(var(--muted-foreground))" }}>Search cases, accused... ⌘K</span>
        </div>

        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs" style={{ color: "hsl(var(--risk-low))" }}>
          <span className="pulse-dot" />
          <span className="font-medium ml-2">LIVE</span>
        </div>

        {/* Refresh */}
        <button className="p-1.5 rounded-md hover:bg-muted transition-colors">
          <RefreshCw className="h-4 w-4" style={{ color: "hsl(var(--muted-foreground))" }} />
        </button>

        {/* Alerts */}
        <button className="relative p-1.5 rounded-md hover:bg-muted transition-colors">
          <Bell className="h-4 w-4" style={{ color: "hsl(var(--muted-foreground))" }} />
          {alertCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: "hsl(var(--risk-high))" }}>
              {alertCount}
            </span>
          )}
        </button>

        {/* User */}
        <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted transition-colors">
          <div className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "hsl(var(--primary) / 0.2)", color: "hsl(var(--primary))" }}>SP</div>
          <span className="text-xs font-medium hidden sm:block">Ramesh K.</span>
          <ChevronDown className="h-3 w-3" style={{ color: "hsl(var(--muted-foreground))" }} />
        </button>
      </div>
    </header>
  );
}
