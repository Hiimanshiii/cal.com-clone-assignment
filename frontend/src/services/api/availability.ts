import { apiClient } from './client';
import type { ApiResponse } from '../../types/api';
import type { Availability } from '../../types/domain';

export const availabilityApi = {
  async list(userId: number) {
    const res = await apiClient.get<ApiResponse<Availability[]>>('/availability', {
      params: { userId: 1 },
    });
    if (!res.data.success) {
      return [];
    }
    return res.data.data;
  },

  async create(input: {
    user_id: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
  }) {
    const res = await apiClient.post<ApiResponse<Availability>>('/availability', {
      ...input,
      user_id: 1,
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },
};
