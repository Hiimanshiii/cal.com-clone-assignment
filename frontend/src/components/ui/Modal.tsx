import type { ReactNode } from 'react';
import Button from './Button';

export default function Modal({
  title,
  isOpen,
  onClose,
  children,
  footer,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40"
        aria-label="Close modal"
      />

      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 shadow-soft ring-1 ring-slate-200 dark:ring-slate-800 transition-colors">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 p-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
          </div>
          <Button variant="ghost" onClick={onClose} className="px-3">
            Close
          </Button>
        </div>

        <div className="p-5">{children}</div>

        {footer ? (
          <div className="border-t border-slate-100 dark:border-slate-800 p-5">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
