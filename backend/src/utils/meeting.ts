export const generateMeetingLink = (bookingId: number | string): string => {
  return `https://meet.jit.si/calcom-${bookingId}`;
};
