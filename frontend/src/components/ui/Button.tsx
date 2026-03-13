import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900/30 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus:ring-white/30',
  secondary:
    'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 focus:ring-slate-900/10 dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-800 dark:focus:ring-white/10',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-900/10 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus:ring-white/10',
  danger:
    'bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-600/30 dark:bg-rose-500 dark:hover:bg-rose-400 dark:focus:ring-rose-500/30',
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  isLoading?: boolean;
};

export default function Button({
  variant = 'primary',
  isLoading,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium',
        'transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" />
          <span>Loading</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
