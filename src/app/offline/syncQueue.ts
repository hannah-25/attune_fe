import { db, type LocalEntityType } from './db';

export async function pendingCreateIds(localEntityType: LocalEntityType): Promise<Set<number>> {
  const items = await db.syncQueue
    .where('status')
    .equals('pending')
    .filter(item =>
      item.method === 'POST'
      && item.localEntityType === localEntityType
      && typeof item.localEntityId === 'number')
    .toArray();
  return new Set(items.map(item => item.localEntityId!));
}
