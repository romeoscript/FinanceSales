// types.ts
export type ReportStatus = 'submitted' | 'processing' | 'investigating' | 'resolved';

export type ReportType = 'theft' | 'vandalism' | 'assault' | 'suspicious_activity' | 'other';

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Report {
  id: string;
  type: ReportType;
  description: string;
  location: string;
  status: ReportStatus;
  evidence?: File[];
  timestamp: Date;
}