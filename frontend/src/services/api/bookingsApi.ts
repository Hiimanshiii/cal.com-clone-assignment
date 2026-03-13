import { apiClient } from './client';
import type { ApiResponse } from '../../types/api';
import type { Booking } from '../../types/domain';

export const bookingsApi = {
  async create(input: {
    event_type_id: number;
    user_id: number;
    name: string;
    email: string;
    start_time: string;
    end_time: string;
    status?: Booking['status'];
    custom_answers?: Record<string, string>;
  }) {
    const res = await apiClient.post<ApiResponse<Booking>>('/bookings', {
      ...input,
      user_id: 1,
      status: input.status ?? 'confirmed',
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },
};

