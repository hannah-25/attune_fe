import Dexie, { type Table } from 'dexie';
import type { JournalChecked, JournalActiveTags, JournalTag } from '../api/journal';
import type { MedicationSummary, MedicationPeriodLog } from '../api/medication';
import type { ScheduleSummary, ScheduleCategory, ScheduleDetail } from '../api/schedule';
import type { MedicationReport } from '../api/medicationAnalysis';
import type { ConsultationDetail } from '../api/consultation';

export interface CachedJournal {
  date: string;
  checked: JournalChecked;
  cachedAt: string;
}

export interface CachedActiveTags {
  id: 'tags';
  data: JournalActiveTags;
  cachedAt: string;
}

export interface CachedJournalTagsByCategory {
  category: 'CONDITION' | 'SIDE_EFFECT' | 'TROUBLE';
  data: JournalTag[];
  cachedAt: string;
}

export interface CachedMedications {
  id: 'list';
  data: MedicationSummary[];
  cachedAt: string;
}

export interface CachedMedicationLogs {
  date: string;
  data: MedicationPeriodLog[];
  cachedAt: string;
}

export interface CachedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  data: ScheduleSummary;
  cachedAt: string;
}

export interface CachedScheduleCategories {
  id: 'categories';
  data: ScheduleCategory[];
  cachedAt: string;
}

export interface CachedScheduleDetail {
  scheduleId: number;
  data: ScheduleDetail;
  cachedAt: string;
}

export interface CachedReports {
  id: 'list';
  data: MedicationReport[];
  cachedAt: string;
}

export interface CachedConsultations {
  id: 'list';
  data: ConsultationDetail[];
  cachedAt: string;
}

export interface CachedConsultationDetail {
  consultationId: number;
  data: ConsultationDetail;
  cachedAt: string;
}

export interface SyncQueueItem {
  id?: number;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  body?: unknown;
  localTimestamp: string;
  retryCount: number;
  status: 'pending' | 'failed';
}

class AttuneOfflineDB extends Dexie {
  journals!: Table<CachedJournal, string>;
  activeTags!: Table<CachedActiveTags, 'tags'>;
  journalTagsByCategory!: Table<CachedJournalTagsByCategory, string>;
  medications!: Table<CachedMedications, 'list'>;
  medicationLogs!: Table<CachedMedicationLogs, string>;
  schedules!: Table<CachedSchedule, number>;
  scheduleCategories!: Table<CachedScheduleCategories, 'categories'>;
  scheduleDetails!: Table<CachedScheduleDetail, number>;
  reports!: Table<CachedReports, 'list'>;
  consultations!: Table<CachedConsultations, 'list'>;
  consultationDetails!: Table<CachedConsultationDetail, number>;
  syncQueue!: Table<SyncQueueItem, number>;

  constructor() {
    super('attune-offline-db');
    this.version(1).stores({
      journals: 'date',
      activeTags: 'id',
      journalTagsByCategory: 'category',
      medications: 'id',
      medicationLogs: 'date',
      schedules: 'scheduleId',
      scheduleCategories: 'id',
      scheduleDetails: 'scheduleId',
      reports: 'id',
      consultations: 'id',
      consultationDetails: 'consultationId',
      syncQueue: '++id, status',
    });
    this.version(2).stores({
      schedules: 'scheduleId, startTime, endTime',
    });
  }
}

export const db = new AttuneOfflineDB();
