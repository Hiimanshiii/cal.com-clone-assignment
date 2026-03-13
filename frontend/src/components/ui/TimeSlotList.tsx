import Button from './Button';

export default function TimeSlotList({
  slots,
  selected,
  onSelect,
  isLoading,
}: {
  slots: string[];
  selected: string | null;
  onSelect: (time: string) => void;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="h-10 animate-pulse rounded-lg bg-slate-100 ring-1 ring-slate-200"
          />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
        No slots available for this date.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {slots.map((time) => {
        const isSelected = selected === time;
        return (
          <Button
            key={time}
            variant={isSelected ? 'primary' : 'secondary'}
            className="w-full justify-center"
            onClick={() => onSelect(time)}
            type="button"
            // extra safety: prevent interaction while a refetch is in progress
            disabled={isLoading}
          >
            {time}
          </Button>
        );
      })}
    </div>
  );
}

