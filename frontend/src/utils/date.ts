export const todayISO = (): string => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const combineDateAndTimeToISO = (date: string, time: string): string => {
  const [hoursStr, minutesStr] = time.split(':');
  const d = new Date(date);
  d.setHours(Number(hoursStr), Number(minutesStr), 0, 0);
  return d.toISOString();
};

export const addMinutesISO = (iso: string, minutes: number): string => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() + minutes);
  return d.toISOString();
};

// Date/time utilities placeholder
