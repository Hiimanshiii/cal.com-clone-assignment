import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Card from '../components/ui/Card';
import TimeSlotList from '../components/ui/TimeSlotList';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { eventTypesApi } from '../services/api/eventTypesApi';
import { slotsApi } from '../services/api/slotsApi';
import { bookingsApi } from '../services/api/bookingsApi';
import { todayISO, combineDateAndTimeToISO, addMinutesISO } from '../utils/date';
import type { EventType } from '../types/domain';

export default function PublicBookingPage() {
  const { slug } = useParams();

  const [eventType, setEventType] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState(todayISO());
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmedStartISO, setConfirmedStartISO] = useState<string | null>(null);

  const title = useMemo(() => eventType?.title ?? 'Booking', [eventType]);
  const selectedDateObj = useMemo(
    () => (date ? new Date(date) : undefined),
    [date],
  );

  useEffect(() => {
    if (!slug) {
      setError('Event type not found');
      setLoading(false);
      return;
    }

    const loadEventType = async () => {
      try {
        setError(null);
        setBookingSuccess(false);
        setConfirmedStartISO(null);
        const data = await eventTypesApi.getBySlug(slug);
        setEventType(data);
      } catch (e: any) {
        setEventType(null);
        setError('Event type not found');
      } finally {
        setLoading(false);
      }
    };

    loadEventType();
  }, [slug]);

  const fetchSlots = useCallback(async () => {
    if (!slug) return;
    setLoadingSlots(true);
    setError(null);
    setSelectedSlot(null);
    try {
      const s = await slotsApi.getSlots(slug, date);
      setSlots(s);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load slots');
    } finally {
      setLoadingSlots(false);
    }
  }, [slug, date]);

  useEffect(() => {
    fetchSlots().catch(() => {});
  }, [fetchSlots]);

  const submit = async () => {
    if (!eventType) return;
    setSubmitting(true);
    setError(null);
    setBookingSuccess(false);
    setConfirmedStartISO(null);
    try {
      if (!selectedSlot) throw new Error('Please select a time slot');
      if (!name.trim()) throw new Error('Name is required');
      if (!email.trim()) throw new Error('Email is required');

      const startISO = combineDateAndTimeToISO(date, selectedSlot);
      const endISO = addMinutesISO(startISO, eventType.duration_minutes);

      await bookingsApi.create({
        event_type_id: eventType.id,
        user_id: eventType.user_id,
        name: name.trim(),
        email: email.trim(),
        start_time: startISO,
        end_time: endISO,
        custom_answers: {
          notes: notes.trim(),
          company: company.trim(),
        }
      });

      // Refresh available slots so the just-booked time disappears
      await fetchSlots();

      setConfirmedStartISO(startISO);
      setBookingSuccess(true);
      setSelectedSlot(null);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-sm text-slate-600">Loading booking page...</p>
      </div>
    );
  }

  if (!eventType) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-sm text-slate-600">Event type not found.</p>
      </div>
    );
  }

  if (bookingSuccess && confirmedStartISO) {
    const start = new Date(confirmedStartISO);
    const dateLabel = start.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeLabel = start.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    });

    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center">
        <Card className="w-full p-6">
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-2 ring-emerald-100">
              ✅
            </div>
            <div>
              <h2 className="text-xl font-semibold text-emerald-700">
                Booking Confirmed 🎉
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Your meeting has been scheduled successfully.
              </p>
            </div>

            <div className="mt-4 space-y-1 rounded-xl bg-slate-50 p-4 text-sm text-slate-800 ring-1 ring-slate-200">
              <p className="font-semibold">{eventType.title}</p>
              <p>{dateLabel}</p>
              <p>{timeLabel}</p>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              Confirmation email has been sent to your inbox.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="h-full rounded-xl p-8 shadow-sm">
        <div>
          <p className="text-xs font-medium text-slate-500">Booking</p>
          <h1 className="mt-2 text-xl font-semibold text-slate-900">
            {eventType.title}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {eventType.description || 'Pick a date and time that works for you.'}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 ring-1 ring-slate-200">
              {eventType.duration_minutes} min
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 ring-1 ring-slate-200">
              {slug}
            </span>
          </div>
        </div>

        {error ? (
          <div className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-100">
            {error}
          </div>
        ) : null}
        </Card>

        <Card className="h-full rounded-xl p-8 shadow-sm">
          <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">Date</p>
            <DayPicker
              mode="single"
              selected={selectedDateObj}
              onSelect={(day) => {
                if (!day) return;
                const y = day.getFullYear();
                const m = String(day.getMonth() + 1).padStart(2, '0');
                const d = String(day.getDate()).padStart(2, '0');
                setDate(`${y}-${m}-${d}`);
              }}
              disabled={{ before: new Date() }}
              className="mx-auto max-w-sm rounded-xl bg-white p-4 ring-1 ring-slate-200"
              classNames={{
                day_selected: 'bg-slate-900 text-white rounded-md',
                day_today: 'border border-slate-900',
                day: 'hover:bg-slate-100 rounded-md',
              }}
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">Time</p>
            {loadingSlots && (
              <p className="mb-2 text-xs text-slate-500">
                Loading available slots...
              </p>
            )}
            <TimeSlotList
              slots={slots}
              selected={selectedSlot}
              onSelect={setSelectedSlot}
              isLoading={loadingSlots}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <div className="sm:col-span-2">
              <Input
                label="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                What do you want to discuss?
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes"
                rows={3}
                className="w-full rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-inset ring-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button
              onClick={submit}
              isLoading={submitting}
              disabled={!eventType}
              className="w-full justify-center"
            >
              Confirm booking
            </Button>
          </div>
        </div>
        </Card>
      </div>
    </div>
  );
}


