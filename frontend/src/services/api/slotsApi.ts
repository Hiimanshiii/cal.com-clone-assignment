import { apiClient } from './client';
import type { ApiResponse } from '../../types/api';

export const slotsApi = {
  async getSlots(slug: string, date: string) {
    const res = await apiClient.get<ApiResponse<string[]>>(
      `/slots/${encodeURIComponent(slug)}`,
      { params: { date } },
    );
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },
};

