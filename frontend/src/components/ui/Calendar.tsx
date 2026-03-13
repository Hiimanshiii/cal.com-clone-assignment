import Input from './Input';

export default function Calendar({
  value,
  onChange,
  label = 'Select a date',
  min,
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  min?: string;
}) {
  return (
    <div>
      <Input
        label={label}
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
