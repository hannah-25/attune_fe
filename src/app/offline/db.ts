import Dexie, { type Table } from 'dexie';
import type { JournalChecked, JournalActiveTags, JournalTag } from '../api/journal';
import type { MedicationSummary, MedicationPeriodLog } from '../api/medication';
import type { ScheduleSummary, ScheduleCategory, ScheduleDetail } from '../api/schedule';
import type { MedicationReport } from '../api/medicationAnalysis';
import type { ConsultationDetail } from '../api/consultation';
import type { UserProfile, UserSettings } from '../api/user';
import type { CalendarEvent } from '../api/calendarEvents';
import type { CalendarConnection } from '../api/calendarConnection';
import type { TodoItem } from '../api/todo';

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

export interface CachedCalendarEvents {
  rangeKey: string;
  startDate: string;
  endDate: string;
  data: CalendarEvent[];
  cachedAt: string;
}

export interface CachedCalendarConnections {
  id: 'list';
  data: CalendarConnection[];
  cachedAt: string;
}

export interface CachedTodosByDate {
  date: string;
  data: TodoItem[];
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

export interface CachedUserProfile {
  id: 'profile';
  data: UserProfile;
  cachedAt: string;
}

export interface CachedUserSettings {
  id: 'settings';
  data: UserSettings;
  cachedAt: string;
}

export interface CachedCommunityPayload {
  key: string;
  data: unknown;
  cachedAt: string;
}

export type LocalEntityType =
  | 'journalTag'
  | 'journalGoal'
  | 'schedule'
  | 'calendarConnection'
  | 'consultation'
  | 'consultationQuestion'
  | 'medication';

export interface SyncQueueItem {
  id?: number;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  body?: unknown;
  localTimestamp: string;
  localEntityType?: LocalEntityType;
  localEntityId?: number;
  dependsOnLocalEntityType?: LocalEntityType;
  dependsOnLocalEntityId?: number;
  rewritePathTemplate?: string;
  rewriteBodyFields?: string[];
  retryCount: number;
  status: 'pending' | 'failed';
}

export interface SyncEntityMap {
  key: string;
  localEntityType: LocalEntityType;
  localEntityId: number;
  serverEntityId: number;
  createdAt: string;
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
  calendarEvents!: Table<CachedCalendarEvents, string>;
  calendarConnections!: Table<CachedCalendarConnections, 'list'>;
  todosByDate!: Table<CachedTodosByDate, string>;
  reports!: Table<CachedReports, 'list'>;
  consultations!: Table<CachedConsultations, 'list'>;
  consultationDetails!: Table<CachedConsultationDetail, number>;
  userProfile!: Table<CachedUserProfile, 'profile'>;
  userSettings!: Table<CachedUserSettings, 'settings'>;
  communityPayloads!: Table<CachedCommunityPayload, string>;
  syncQueue!: Table<SyncQueueItem, number>;
  syncEntityMap!: Table<SyncEntityMap, string>;

  constructor() {
    super('attune-offline-db');
    this.version(1).stores({
      journals: 'date',
      activeTags: 'id',
      journalTagsByCategory: 'category',
      medications: 'id',
      medicationLogs: 'date',
      schedules: 'scheduleId, startTime, endTime',
      scheduleCategories: 'id',
      scheduleDetails: 'scheduleId',
      reports: 'id',
      consultations: 'id',
      consultationDetails: 'consultationId',
      syncQueue: '++id, status',
    });
    this.version(2).stores({
      journals: 'date',
      activeTags: 'id',
      journalTagsByCategory: 'category',
      medications: 'id',
      medicationLogs: 'date',
      schedules: 'scheduleId, startTime, endTime',
      scheduleCategories: 'id',
      scheduleDetails: 'scheduleId',
      reports: 'id',
      consultations: 'id',
      consultationDetails: 'consultationId',
      userProfile: 'id',
      userSettings: 'id',
      syncQueue: '++id, status',
    });
    this.version(3).stores({
      journals: 'date',
      activeTags: 'id',
      journalTagsByCategory: 'category',
      medications: 'id',
      medicationLogs: 'date',
      schedules: 'scheduleId, startTime, endTime',
      scheduleCategories: 'id',
      scheduleDetails: 'scheduleId',
      reports: 'id',
      consultations: 'id',
      consultationDetails: 'consultationId',
      userProfile: 'id',
      userSettings: 'id',
      syncQueue: '++id, status',
      syncEntityMap: 'key, localEntityType, localEntityId, serverEntityId',
    });
    this.version(4).stores({
      journals: 'date',
      activeTags: 'id',
      journalTagsByCategory: 'category',
      medications: 'id',
      medicationLogs: 'date',
      schedules: 'scheduleId, startTime, endTime',
      scheduleCategories: 'id',
      scheduleDetails: 'scheduleId',
      calendarEvents: 'rangeKey, startDate, endDate',
      calendarConnections: 'id',
      todosByDate: 'date',
      reports: 'id',
      consultations: 'id',
      consultationDetails: 'consultationId',
      userProfile: 'id',
      userSettings: 'id',
      communityPayloads: 'key',
      syncQueue: '++id, status',
      syncEntityMap: 'key, localEntityType, localEntityId, serverEntityId',
    });
  }
}

export const db = new AttuneOfflineDB();
