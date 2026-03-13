import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SESSION } from '../store/session';
import { eventTypesApi } from '../services/api/eventTypesApi';
import { apiClient } from '../services/api/client';
import type { Booking, EventType } from '../types/domain';
import type { ApiResponse } from '../types/api';

export default function BookingsPage() {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [selectedEventTypeId, setSelectedEventTypeId] = useState<number | null>(
    null,
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState<string | null>(null);

  const loadEventTypes = async () => {
    const ets = await eventTypesApi.listByUser(SESSION.userId);
    setEventTypes(ets);
    setSelectedEventTypeId((prev) => prev ?? (ets[0]?.id ?? null));
  };

  const loadBookings = async (eventTypeId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await apiClient.get<ApiResponse<Booking[]>>('/bookings', {
        params: { eventTypeId },
      });
      if (!res.data.success) throw new Error(res.data.message);
      // Hide cancelled bookings in the dashboard
      setBookings(res.data.data.filter((b) => b.status !== 'cancelled'));
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: number) => {
    if (!selectedEventTypeId) return;
    setError(null);
    setSuccess(null);
    try {
      await apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}/cancel`);
      setSuccess('Booking cancelled');
      await loadBookings(selectedEventTypeId);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to cancel booking');
    }
  };

  useEffect(() => {
    loadEventTypes().catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedEventTypeId) loadBookings(selectedEventTypeId).catch(() => {});
  }, [selectedEventTypeId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Bookings</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            View bookings for an event type.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() =>
            selectedEventTypeId ? loadBookings(selectedEventTypeId) : undefined
          }
        >
          Refresh
        </Button>
      </div>

      <Card className="p-5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Event type
        </label>
        <select
          className="mt-2 w-full rounded-lg bg-white dark:bg-slate-900 px-3 py-2 text-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20 dark:text-white transition-colors"
          value={selectedEventTypeId ?? ''}
          onChange={(e) => setSelectedEventTypeId(Number(e.target.value))}
        >
          {eventTypes.map((et) => (
            <option key={et.id} value={et.id}>
              {et.title}
            </option>
          ))}
        </select>
      </Card>

      {error ? (
        <Card className="p-4">
          <p className="text-sm text-rose-600">{error}</p>
        </Card>
      ) : null}

      {success ? (
        <Card className="p-4">
          <p className="text-sm text-emerald-700">{success}</p>
        </Card>
      ) : null}

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Results</h2>
        <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-slate-800 transition-colors">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">
                  Date
                </th>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">
                  Time
                </th>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">
                  Status
                </th>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    Loading…
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id}>
                  <td className="px-4 py-3">{b.name}</td>
                    <td className="px-4 py-3">{b.email}</td>
                    <td className="px-4 py-3">
                      {new Date(b.start_time).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(b.start_time).toLocaleTimeString(undefined, {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700">
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="danger"
                        className="px-3 py-1 text-xs"
                        type="button"
                        disabled={b.status === 'cancelled'}
                        onClick={() => cancelBooking(b.id)}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
