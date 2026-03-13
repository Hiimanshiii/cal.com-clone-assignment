import { NavLink } from 'react-router-dom';

const linkBase =
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition';

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800 md:block transition-colors">
      <div className="p-4">
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700 transition-colors">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Workspace</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
            Your scheduling
          </p>
        </div>

        <nav className="mt-4 space-y-1">
          <NavLink
            to="/dashboard/event-types"
            className={({ isActive }) =>
              [
                linkBase,
                isActive
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white',
              ].join(' ')
            }
          >
            Event Types
          </NavLink>

          <NavLink
            to="/dashboard/availability"
            className={({ isActive }) =>
              [
                linkBase,
                isActive
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white',
              ].join(' ')
            }
          >
            Availability
          </NavLink>

          <NavLink
            to="/dashboard/teams"
            className={({ isActive }) =>
              [
                linkBase,
                isActive
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white',
              ].join(' ')
            }
          >
            Teams
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            className={({ isActive }) =>
              [
                linkBase,
                isActive
                  ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white',
              ].join(' ')
            }
          >
            Bookings
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
