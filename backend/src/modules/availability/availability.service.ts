import {
  createAvailability as createAvailabilityRepo,
  getAvailabilityByUser as getAvailabilityByUserRepo,
  updateAvailability as updateAvailabilityRepo,
  deleteAvailability as deleteAvailabilityRepo,
  type Availability,
  type CreateAvailabilityInput,
  type UpdateAvailabilityInput,
} from './availability.repository';

class InvalidTimeRangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidTimeRangeError';
  }
}

const isValidTimeFormat = (value: string): boolean => {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
};

const validateTimeRange = (start: string, end: string): void => {
  if (!start || !end) {
    throw new InvalidTimeRangeError('start_time and end_time are required');
  }

  if (!isValidTimeFormat(start) || !isValidTimeFormat(end)) {
    throw new InvalidTimeRangeError('start_time and end_time must be in HH:MM format');
  }

  if (start >= end) {
    throw new InvalidTimeRangeError('end_time must be after start_time');
  }
};

export const createAvailability = async (
  data: CreateAvailabilityInput,
): Promise<Availability> => {
  validateTimeRange(data.start_time, data.end_time);
  return createAvailabilityRepo(data);
};

export const getAvailabilityByUser = async (
  userId: number,
): Promise<Availability[]> => {
  return getAvailabilityByUserRepo(userId);
};

export const updateAvailability = async (
  id: number,
  updates: UpdateAvailabilityInput,
): Promise<Availability | null> => {
  if (updates.start_time !== undefined || updates.end_time !== undefined) {
    // Use existing values when one of the times is omitted; the repository layer
    // will handle partial updates, so here we only validate when both are present.
    if (updates.start_time && updates.end_time) {
      validateTimeRange(updates.start_time, updates.end_time);
    }
  }

  return updateAvailabilityRepo(id, updates);
};

export const deleteAvailability = async (id: number): Promise<boolean> => {
  return deleteAvailabilityRepo(id);
};

export { InvalidTimeRangeError };

