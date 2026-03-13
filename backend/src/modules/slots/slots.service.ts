import { getEventTypeBySlug } from '../eventTypes/eventType.service';
import { getAvailabilityByUser } from '../availability/availability.service';
import { getBookingsByDate } from '../bookings/booking.repository';
import { generateTimeSlots } from '../../utils/slot.util';

const formatDateToHHMM = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getAvailableSlotsBySlugAndDate = async (
  slug: string,
  date: string,
): Promise<string[] | null> => {
  const eventType = await getEventTypeBySlug(slug);

  if (!eventType) {
    return null;
  }

  const requestDate = new Date(date);
  const dayOfWeek = requestDate.getDay(); // 0-6, Sunday-Saturday

  const availability = await getAvailabilityByUser(eventType.user_id);
  const dayAvailability = availability.filter((slot) => slot.day_of_week === dayOfWeek);

  if (dayAvailability.length === 0) {
    return [];
  }

  const duration = eventType.duration_minutes;

  const allSlots = new Set<string>();
  for (const slot of dayAvailability) {
    const candidateTimes = generateTimeSlots(slot.start_time, slot.end_time, duration);
    for (const time of candidateTimes) {
      allSlots.add(time);
    }
  }

  // 1) Fetch existing bookings for the event type and date
  const bookings = await getBookingsByDate(eventType.id, date);

  // 2) Extract start_time of each booking
  // 3) Convert those times to HH:MM format
  const bookedTimes = new Set<string>(
    bookings
      .filter((b) => b.status !== 'cancelled')
      .map((b) => formatDateToHHMM(new Date(b.start_time))),
  );

  // 4) Remove booked start times from generated slots array
  const available = Array.from(allSlots).filter((time) => !bookedTimes.has(time));

  return available.sort();
};

