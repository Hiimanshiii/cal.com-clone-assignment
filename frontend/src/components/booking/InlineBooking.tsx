import { useCallback, useEffect, useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import Card from '../ui/Card';
import TimeSlotList from '../ui/TimeSlotList';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { slotsApi } from '../../services/api/slotsApi';
import { bookingsApi } from '../../services/api/bookingsApi';
import { todayISO, combineDateAndTimeToISO, addMinutesISO } from '../../utils/date';
import type { EventType } from '../../types/domain';

export default function InlineBooking({ eventType }: { eventType: EventType }) {
  const [date, setDate] = useState(todayISO());
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmedStartISO, setConfirmedStartISO] = useState<string | null>(null);

  const selectedDateObj = useMemo(
    () => (date ? new Date(date) : undefined),
    [date],
  );

  const fetchSlots = useCallback(async () => {
    if (!eventType.slug) return;
    setLoadingSlots(true);
    setError(null);
    setSelectedSlot(null);
    try {
      const s = await slotsApi.getSlots(eventType.slug, date);
      setSlots(s);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load slots');
    } finally {
      setLoadingSlots(false);
    }
  }, [eventType.slug, date]);

  useEffect(() => {
    fetchSlots().catch(() => {});
  }, [fetchSlots]);

  const submit = async () => {
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

      await fetchSlots();
      setConfirmedStartISO(startISO);
      setBookingSuccess(true);
      setSelectedSlot(null);
      setName('');
      setEmail('');
      setNotes('');
      setCompany('');
    } catch (e: any) {
      setError(e?.message ?? 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

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
      <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-2 ring-emerald-200">
          ✅
        </div>
        <h3 className="mt-4 text-lg font-semibold text-emerald-800">Booking Confirmed</h3>
        <div className="mt-2 space-y-1 text-sm text-emerald-700">
          <p>{dateLabel} at {timeLabel}</p>
        </div>
        <p className="mt-2 text-sm text-emerald-700">
          Confirmation email has been sent to your inbox.
        </p>
        <Button 
          variant="secondary" 
          className="mt-4"
          onClick={() => setBookingSuccess(false)}
        >
          Book another
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <h4 className="mb-4 text-sm font-semibold text-slate-900">Preview Booking</h4>
      
      {error && (
        <div className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-100">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        {/* Calendar */}
        <div className="w-full shrink-0 md:w-[320px] md:border-r md:border-slate-100 md:pr-8">
          <p className="mb-2 text-sm font-medium text-slate-700">Select Date</p>
          <div className="flex justify-center md:justify-start">
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
              className="w-fit rounded-xl border border-slate-200 p-4 shadow-sm bg-white"
              classNames={{
                day_selected: 'bg-slate-900 text-white rounded-md hover:bg-slate-800',
                day_today: 'font-bold text-slate-900',
                day: 'hover:bg-slate-100 rounded-md transition-colors',
              }}
            />
          </div>
        </div>

        {/* Time Slots */}
        <div className="flex-1 w-full">
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-slate-700">Select Time</p>
            {loadingSlots && <p className="text-xs text-slate-500">Loading slots...</p>}
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
          
          <Button
            onClick={submit}
            isLoading={submitting}
            className="mt-4 w-full justify-center"
          >
            Confirm booking
          </Button>
        </div>
      </div>
    </div>
  );
}
