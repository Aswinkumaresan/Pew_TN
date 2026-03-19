import { AppSidebar } from "@/components/layout/AppSidebar";
import { CommandBar } from "@/components/layout/CommandBar";
import { useAppStore } from "@/store/appStore";
import { DashboardPage } from "@/components/modules/DashboardPage";
import { GISPage } from "@/components/modules/GISPage";
import { DSRPage } from "@/components/modules/DSRPage";
import { IntelligencePage } from "@/components/modules/IntelligencePage";
import { AnalyticsPage } from "@/components/modules/AnalyticsPage";
import {
  CheckpostPage,
  AuditLogsPage,
} from "@/components/modules/CheckpostPage";
import { AdminPage } from "@/components/modules/AdminPage";
import { ReportsPage } from "@/components/modules/ReportsPage";
import { PEWOfficerPage } from "@/components/modules/PEWOfficerPage";
import { AnimatePresence, motion } from "framer-motion";

const moduleComponents: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  gis: GISPage,
  dsr: DSRPage,
  intelligence: IntelligencePage,
  analytics: AnalyticsPage,
  checkpost: CheckpostPage,
  reports: ReportsPage,
  admin: AdminPage,
  audit: AuditLogsPage,
  pew_officer: PEWOfficerPage,
  settings: () => (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold">Settings</p>
        <p
          className="text-sm"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          System configuration coming soon
        </p>
      </div>
    </div>
  ),
};

const Index = () => {
  const { activeModule } = useAppStore();
  const ActivePage = moduleComponents[activeModule] || DashboardPage;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <CommandBar />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-1 overflow-hidden"
          >
            <ActivePage />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
