import { apiClient } from './client';
import type { ApiResponse } from '../../types/api';
import type { EventType } from '../../types/domain';

export const eventTypesApi = {
  async listByUser(userId: number) {
    const res = await apiClient.get<ApiResponse<EventType[]>>('/event-types', {
      params: { userId },
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },

  async getBySlug(slug: string) {
    const res = await apiClient.get<ApiResponse<EventType>>(
      `/event-types/${encodeURIComponent(slug)}`,
    );
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },

  async create(input: {
    user_id: number;
    title: string;
    description?: string | null;
    duration_minutes: number;
    slug: string;
  }) {
    const res = await apiClient.post<ApiResponse<EventType>>('/event-types', input);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },

  async update(
    id: number,
    updates: Partial<Pick<EventType, 'title' | 'description' | 'duration_minutes' | 'slug'>>,
  ) {
    const res = await apiClient.put<ApiResponse<EventType>>(`/event-types/${id}`, updates);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
  },

  async remove(id: number) {
    await apiClient.delete(`/event-types/${id}`);
    return true;
  },
};

