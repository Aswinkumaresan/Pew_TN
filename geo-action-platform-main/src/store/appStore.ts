import { create } from "zustand";

type Module = "dashboard" | "gis" | "dsr" | "intelligence" | "analytics" | "checkpost" | "reports" | "admin" | "audit" | "settings" | "pew_officer";

export type ApprovalRole = 'CIU' | 'DSP' | 'SPCIU' | 'DIG' | 'ADGP' | 'PEW_DSP';

export type ReportStatus = 'pending_dsp' | 'pending_spciu' | 'pending_dig' | 'pending_adgp' | 'approved_adgp' | 'delegated' | 'field_report_received' | 'rejected';

export interface Offender {
  type: 'known' | 'unknown';
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
}

export interface IntelligenceReport {
  id: string;
  source: 'CIU';
  date: string;
  time: string;
  location: string;
  district: string;
  offenders: Offender[];
  status: ReportStatus;
  history: { role: ApprovalRole; action: 'submitted' | 'approved' | 'rejected' | 'delegated'; date: string; comment?: string }[];
  delegation?: { district: string; officer: string; assignedDate: string };
  fieldReport?: {
    content: string;
    date: string;
    status: string;
    actionTaken?: 'arrested' | 'surveillance' | 'released';
    arrestDetails?: { accusedName: string; court: string; remandDate: string; remandOrderNo: string; remarks: string };
    adgpAction?: string;
    adgpResponse?: string;
  };
}

interface AppState {
  activeModule: Module;
  setActiveModule: (m: Module) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  selectedCaseId: string | null;
  setSelectedCaseId: (id: string | null) => void;
  alertCount: number;
  currentUserRole: ApprovalRole;
  setCurrentUserRole: (role: ApprovalRole) => void;
  intelligenceReports: IntelligenceReport[];
  submitIntelligenceReport: (report: Omit<IntelligenceReport, 'id' | 'status' | 'history'>) => string;
  updateReportStatus: (id: string, newStatus: ReportStatus, role: ApprovalRole, action: 'approved' | 'rejected', comment?: string) => void;
  updateOffenderDetails: (reportId: string, offenderIndex: number, updatedData: any) => void;
  delegateReport: (id: string, district: string, officer: string) => void;
  submitFieldReport: (id: string, content: string, actionTaken: 'arrested' | 'surveillance' | 'released', arrestDetails?: { accusedName: string; court: string; remandDate: string; remandOrderNo: string; remarks: string }) => void;
  submitDspActionToAdgp: (id: string, content: string) => void;
  adgpRespondToFieldReport: (id: string, response: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeModule: "dashboard",
  setActiveModule: (m) => set({ activeModule: m }),
  sidebarOpen: true,
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  selectedCaseId: null,
  setSelectedCaseId: (id) => set({ selectedCaseId: id }),
  alertCount: 7,
  currentUserRole: 'CIU',
  setCurrentUserRole: (role) => set({ currentUserRole: role }),
  intelligenceReports: [],
  submitIntelligenceReport: (report) => {
    const id = `INT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport: IntelligenceReport = {
      ...report,
      id,
      status: 'pending_dsp',
      history: [{ role: 'CIU', action: 'submitted', date: new Date().toISOString() }]
    };
    set((state) => ({ intelligenceReports: [...state.intelligenceReports, newReport] }));
    return id;
  },
  updateReportStatus: (id, newStatus, role, action, comment) => {
    set((state) => ({
      intelligenceReports: state.intelligenceReports.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status: newStatus,
            history: [...r.history, { role, action, date: new Date().toISOString(), comment }]
          };
        }
        return r;
      })
    }));
  },
  updateOffenderDetails: (reportId, offenderIndex, updatedData) => {
    set((state) => ({
      intelligenceReports: state.intelligenceReports.map(r => {
        if (r.id === reportId) {
          const newOffenders = [...r.offenders];
          newOffenders[offenderIndex] = { ...newOffenders[offenderIndex], ...updatedData };
          return { ...r, offenders: newOffenders };
        }
        return r;
      })
    }));
  },
  delegateReport: (id, district, officer) => {
    set((state) => ({
      intelligenceReports: state.intelligenceReports.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status: 'delegated',
            delegation: { district, officer, assignedDate: new Date().toISOString().split('T')[0] },
            history: [...r.history, { role: 'PEW_DSP', action: 'delegated', date: new Date().toISOString() }]
          };
        }
        return r;
      })
    }));
  },
  submitFieldReport: (id, content, actionTaken, arrestDetails) => {
    set((state) => ({
      intelligenceReports: state.intelligenceReports.map(r => {
        if (r.id === id) {
          return {
            ...r,
            status: 'field_report_received',
            fieldReport: {
              content,
              date: new Date().toISOString().split('T')[0],
              status: 'Pending DSP Action',
              actionTaken,
              arrestDetails: actionTaken === 'arrested' ? arrestDetails : undefined,
            }
          };
        }
        return r;
      })
    }));
  },
  submitDspActionToAdgp: (id, content) => {
    set((state) => ({
      intelligenceReports: state.intelligenceReports.map(r => {
        if (r.id === id && r.fieldReport) {
          return {
            ...r,
            fieldReport: { ...r.fieldReport, adgpAction: content, status: 'Submitted to ADGP' }
          };
        }
        return r;
      })
    }));
  },
  adgpRespondToFieldReport: (id, response) => {
    set((state) => ({
      intelligenceReports: state.intelligenceReports.map(r => {
        if (r.id === id && r.fieldReport) {
          return {
            ...r,
            fieldReport: { ...r.fieldReport, adgpResponse: response, status: 'ADGP Response Received' }
          };
        }
        return r;
      })
    }));
  }
}));
