export interface WorkEntry {
  id: string;
  content: string[];  
  timestamp: Date;
}

export type TimeFilter = 'day' | 'week' | 'month';