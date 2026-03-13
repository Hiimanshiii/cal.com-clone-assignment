import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';
import { useEventTypes } from '../hooks/useEventTypes';
import { eventTypesApi } from '../services/api/eventTypesApi';
import { SESSION } from '../store/session';
import type { EventType } from '../types/domain';
import InlineBooking from '../components/booking/InlineBooking';

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function EventTypeCard({
  eventType,
  onEdit,
  onDelete,
  onCopyLink,
}: {
  eventType: EventType;
  onEdit: (et: EventType) => void;
  onDelete: (et: EventType) => void;
  onCopyLink: (slug: string) => void;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            {eventType.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {eventType.description || 'No description'}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 font-medium text-slate-700 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700">
              {eventType.duration_minutes} min
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-50 dark:bg-slate-800 px-3 py-1 font-medium text-slate-700 dark:text-slate-300 ring-1 ring-slate-200 dark:ring-slate-700">
                /book/{eventType.slug}
              </span>
              <Button
                variant="secondary"
                type="button"
                className="px-3 py-1 text-xs"
                onClick={() => onCopyLink(eventType.slug)}
              >
                Copy link
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="px-3" onClick={() => onEdit(eventType)}>
            Edit
          </Button>
          <Button variant="danger" className="px-3" onClick={() => onDelete(eventType)}>
            Delete
          </Button>
        </div>
      </div>

      <InlineBooking eventType={eventType} />
    </Card>
  );
}

export default function EventTypesPage() {
  const { eventTypes, isLoading, error, refresh, setEventTypes } = useEventTypes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EventType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [slug, setSlug] = useState('');

  const heading = useMemo(
    () => (editing ? 'Edit event type' : 'New event type'),
    [editing],
  );

  const openCreate = () => {
    setEditing(null);
    setTitle('');
    setDescription('');
    setDuration(30);
    setSlug('');
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEdit = (et: EventType) => {
    setEditing(et);
    setTitle(et.title);
    setDescription(et.description ?? '');
    setDuration(et.duration_minutes);
    setSlug(et.slug);
    setFormError(null);
    setIsModalOpen(true);
  };

  const submit = async () => {
    setSaving(true);
    setFormError(null);
    try {
      const payload = {
        user_id: SESSION.userId,
        title: title.trim(),
        description: description.trim() ? description.trim() : null,
        duration_minutes: Number(duration),
        slug: slugify(slug || title),
      };

      if (!payload.title) throw new Error('Title is required');
      if (!payload.slug) throw new Error('Slug is required');

      if (editing) {
        const updated = await eventTypesApi.update(editing.id, {
          title: payload.title,
          description: payload.description,
          duration_minutes: payload.duration_minutes,
          slug: payload.slug,
        });
        setEventTypes(
          (eventTypes ?? []).map((x) => (x.id === editing.id ? updated : x)),
        );
      } else {
        const created = await eventTypesApi.create(payload);
        setEventTypes([created, ...(eventTypes ?? [])]);
      }

      setIsModalOpen(false);
    } catch (e: any) {
      setFormError(e?.message ?? 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (et: EventType) => {
    try {
      await eventTypesApi.remove(et.id);
      await refresh();
    } catch (e: any) {
      alert(e?.message ?? 'Failed to delete');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await remove(deleteTarget);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const copyLink = async (slug: string) => {
    const url = `${window.location.origin}/book/${slug}`;
    await navigator.clipboard.writeText(url);
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Event Types</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Create event types and share booking links.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => refresh()}>
            Refresh
          </Button>
          <Button onClick={openCreate}>New</Button>
        </div>
      </div>

      {error ? (
        <Card className="p-4">
          <p className="text-sm text-rose-600">{error}</p>
        </Card>
      ) : null}

      {isLoading ? (
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="h-24 animate-pulse rounded-2xl bg-white dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700"
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-3">
          {eventTypes.map((et) => (
            <EventTypeCard
              key={et.id}
              eventType={et}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
              onCopyLink={copyLink}
            />
          ))}
          {eventTypes.length === 0 ? (
            <Card className="p-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                No event types yet. Create one to get a public booking link.
              </p>
            </Card>
          ) : null}
        </div>
      )}

      <Modal
        title={heading}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button onClick={submit} isLoading={saving} type="button">
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {formError ? (
            <div className="rounded-xl bg-rose-50 dark:bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-400 ring-1 ring-rose-100 dark:ring-rose-500/20">
              {formError}
            </div>
          ) : null}

          <Input
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!editing) setSlug(slugify(e.target.value));
            }}
            placeholder="e.g. 30 min meeting"
          />

          <Input
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />

          <Input
            label="Duration (minutes)"
            type="number"
            value={duration}
            min={5}
            step={5}
            onChange={(e) => setDuration(Number(e.target.value))}
          />

          <Input
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            hint="Used in your public booking URL"
          />
        </div>
      </Modal>

      <Modal
        title="Delete event type"
        isOpen={!!deleteTarget}
        onClose={() => {
          if (!isDeleting) setDeleteTarget(null);
        }}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => setDeleteTarget(null)}
              type="button"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              isLoading={isDeleting}
              type="button"
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Are you sure you want to delete
            {deleteTarget ? (
              <span className="font-medium"> "{deleteTarget.title}"</span>
            ) : null}
            ? This action cannot be undone.
          </p>
        </div>
      </Modal>

      <Toast
        message="Booking link copied!"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
