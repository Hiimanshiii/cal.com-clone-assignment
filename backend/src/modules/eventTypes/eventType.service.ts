import {
  createEventType as createEventTypeRepo,
  getEventTypesByUser as getEventTypesByUserRepo,
  getEventTypeBySlug as getEventTypeBySlugRepo,
  updateEventType as updateEventTypeRepo,
  deleteEventType as deleteEventTypeRepo,
  type EventType,
  type CreateEventTypeInput,
  type UpdateEventTypeInput,
} from './eventType.repository';

export class DuplicateSlugError extends Error {
  constructor(slug: string) {
    super(`Event type slug "${slug}" is already in use`);
    this.name = 'DuplicateSlugError';
  }
}

export const createEventType = async (
  data: CreateEventTypeInput,
): Promise<EventType> => {
  const existing = await getEventTypeBySlugRepo(data.slug);
  if (existing) {
    throw new DuplicateSlugError(data.slug);
  }

  return createEventTypeRepo(data);
};

export const getEventTypesByUser = async (
  userId: number,
): Promise<EventType[]> => {
  return getEventTypesByUserRepo(userId);
};

// Backwards-compatible alias used elsewhere in the codebase
export const getAllEventTypes = getEventTypesByUser;

export const getEventTypeBySlug = async (
  slug: string,
): Promise<EventType | null> => {
  return getEventTypeBySlugRepo(slug);
};

export const updateEventType = async (
  id: number,
  updates: UpdateEventTypeInput,
): Promise<EventType | null> => {
  if (updates.slug) {
    const existing = await getEventTypeBySlugRepo(updates.slug);
    if (existing && existing.id !== id) {
      throw new DuplicateSlugError(updates.slug);
    }
  }

  return updateEventTypeRepo(id, updates);
};

export const deleteEventType = async (id: number): Promise<boolean> => {
  return deleteEventTypeRepo(id);
};

