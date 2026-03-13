import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800 transition-colors">
      <div className="container-page flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold dark:text-white">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            C
          </span>
          <span>Cal Clone</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <span className="text-slate-700 dark:text-slate-300 font-medium">User</span>
          <button 
            onClick={() => window.location.href = '/'} 
            className="rounded-lg bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors font-medium"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
