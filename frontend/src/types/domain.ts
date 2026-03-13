export type EventType = {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  duration_minutes: number;
  slug: string;
  created_at: string;
};

export type Availability = {
  id: number;
  user_id: number;
  day_of_week: number; // 0-6
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  created_at: string;
};

export type Booking = {
  id: number;
  event_type_id: number;
  user_id: number;
  name: string;
  email: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  custom_answers?: Record<string, string> | null;
  created_at: string;
};
