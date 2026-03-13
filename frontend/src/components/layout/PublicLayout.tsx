import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-dvh bg-slate-50">
      <main className="container-page py-8">
        <Outlet />
      </main>
    </div>
  );
}
