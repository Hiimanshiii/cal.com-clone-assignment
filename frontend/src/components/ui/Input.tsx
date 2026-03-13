import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function Input({
  label,
  hint,
  error,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
        >
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        {...props}
        className={[
          'w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-900 dark:bg-slate-900 dark:text-white transition-colors',
          'ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 dark:ring-slate-800 dark:placeholder:text-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:focus:ring-white/20',
          error ? 'ring-rose-300 focus:ring-rose-500/20 dark:ring-rose-500/50' : '',
          className,
        ].join(' ')}
      />

      {error ? (
        <p className="mt-1 text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 transition-colors">{hint}</p>
      ) : null}
    </div>
  );
}
