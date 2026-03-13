import { useEffect, useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { availabilityApi } from '../services/api/availability';
import { SESSION } from '../store/session';
import type { Availability } from '../types/domain';

const DAYS: Array<{ value: number; label: string }> = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
];

export default function AvailabilityPage() {
  const [rows, setRows] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [day, setDay] = useState(1);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [saving, setSaving] = useState(false);

  const dayLabel = useMemo(
    () => DAYS.find((d) => d.value === day)?.label ?? 'Day',
    [day],
  );

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await availabilityApi.list(SESSION.userId);
      setRows(data);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    setSaving(true);
    setError(null);
    try {
      const created = await availabilityApi.create({
        user_id: SESSION.userId,
        day_of_week: day,
        start_time: startTime,
        end_time: endTime,
      });
      setRows((prev) => [...prev, created].sort((a, b) => a.day_of_week - b.day_of_week));
    } catch (e: any) {
      setError(e?.message ?? 'Failed to add availability');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Availability</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Define when people can book you.
          </p>
        </div>
        <Button variant="secondary" onClick={load}>
          Refresh
        </Button>
      </div>

      {error ? (
        <Card className="p-4">
          <p className="text-sm text-rose-600">{error}</p>
        </Card>
      ) : null}

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Add time window</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="w-full rounded-lg bg-white dark:bg-slate-900 px-3 py-2 text-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20 dark:text-white transition-colors"
            >
              {DAYS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Start"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            label="End"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={add} isLoading={saving}>
            Add {dayLabel}
          </Button>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Your schedule</h2>
        <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-slate-800 transition-colors">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">Day</th>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">Start</th>
                <th className="px-4 py-2 text-left font-medium text-slate-600 dark:text-slate-400">End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
              {loading ? (
                <tr>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400" colSpan={3}>
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400" colSpan={3}>
                    No availability set yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">
                      {DAYS.find((d) => d.value === r.day_of_week)?.label ?? r.day_of_week}
                    </td>
                    <td className="px-4 py-3">{r.start_time}</td>
                    <td className="px-4 py-3">{r.end_time}</td>
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
