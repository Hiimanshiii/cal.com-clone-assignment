import { useEffect } from 'react';

type Props = {
  message: string;
  visible: boolean;
  onClose: () => void;
};

export default function Toast({ message, visible, onClose }: Props) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg shadow-slate-900/20">
      {message}
    </div>
  );
}

