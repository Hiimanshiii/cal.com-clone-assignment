import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function TeamsPage() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] bg-[#111111] text-white shadow-2xl md:flex-row border border-neutral-800">
        
        {/* Left Section */}
        <div className="flex flex-1 flex-col justify-center p-10 md:p-14">
          <div className="mb-6 flex">
            <span className="rounded-md border border-neutral-700 bg-neutral-800/50 px-2.5 py-1 text-xs font-medium text-neutral-300">
              Teams
            </span>
          </div>
          
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            Automatically route meetings to your team
          </h2>
          
          <p className="mb-8 text-neutral-400">
            Turn individual scheduling into a system that assigns, distributes, and manages meetings for our team.
          </p>
          
          <ul className="mb-10 space-y-4">
            {[
              'Route inbound requests to the right person',
              'Distribute meetings fairly with round-robin',
              "See what's getting booked (and what's not)",
              'Remove Cal.com branding'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500"></span>
                {item}
              </li>
            ))}
          </ul>
          
          <div className="mb-8 font-sans flex items-center gap-2 text-sm text-neutral-400">
            Available on 
            <span className="rounded-md bg-orange-100/10 px-2 py-0.5 text-xs font-medium text-orange-200 border border-orange-500/20">Teams</span>
            <span className="rounded-md bg-purple-100/10 px-2 py-0.5 text-xs font-medium text-purple-200 border border-purple-500/20">Orgs</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200">
              Try it for free <ArrowRight className="h-4 w-4" />
            </button>
            <button className="text-sm font-medium text-neutral-400 transition hover:text-white">
              Learn more
            </button>
          </div>
        </div>

        {/* Right Section (Visual) */}
        <div className="flex flex-1 items-center justify-center bg-white dark:bg-slate-900 p-10 min-h-[500px] relative transition-colors">
          <div className="relative flex w-full max-w-sm flex-col items-center">
            
            {/* Customer Badge */}
            <div className="absolute top-0 flex -translate-y-6 items-center justify-center z-10">
               <span className="rounded-full border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-4 py-1.5 text-sm font-medium text-neutral-600 dark:text-slate-300 shadow-sm transition-colors">
                 Customer
               </span>
            </div>

            <div className="h-8 w-px bg-neutral-200 dark:bg-slate-700 mt-2"></div>
            
            {/* Form Answers Box */}
            <div className="w-full rounded-2xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm relative z-10 flex flex-col items-center mt-[-10px] transition-colors">
              <div className="absolute -top-6 h-12 w-12 overflow-hidden rounded-full border-4 border-white dark:border-slate-800 shadow-sm">
                <img src="https://i.pravatar.cc/100?img=33" alt="Customer avatar" className="h-full w-full object-cover" />
              </div>
              
              <h3 className="mt-4 text-base font-semibold text-neutral-900 dark:text-white">Form answers</h3>
              
              <div className="mt-6 w-full space-y-4 rounded-xl border border-neutral-100 dark:border-slate-700 p-4">
                <div className="h-3 w-3/4 rounded-full bg-neutral-200 dark:bg-slate-600 mx-auto"></div>
                <div className="h-3 w-1/2 rounded-full bg-neutral-200 dark:bg-slate-600 mx-auto"></div>
              </div>
            </div>

            <div className="h-10 w-px bg-blue-200 dark:bg-blue-900/50 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-full p-0.5">
                  <CheckCircle2 className="h-5 w-5 fill-emerald-100 dark:fill-emerald-900 text-emerald-500" />
               </div>
               <span className="absolute top-1/2 left-5 -translate-y-1/2 text-sm font-medium text-emerald-500">Booked</span>
            </div>

            {/* Enterprise round robin box */}
            <div className="w-full rounded-2xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-sm z-10 flex flex-col items-center transition-colors">
               <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-6">Enterprise round robin</h3>
               
               <div className="flex w-full justify-center gap-4">
                  <div className="w-1/3 opacity-20 flex flex-col items-center">
                     <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white dark:border-slate-800 shadow-sm mb-2">
                        <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="h-full w-full object-cover grayscale" />
                     </div>
                  </div>
                  <div className="w-1/3 flex flex-col items-center">
                     <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white dark:border-slate-800 shadow-md mb-2">
                        <img src="https://i.pravatar.cc/100?img=12" alt="Avatar" className="h-full w-full object-cover" />
                     </div>
                     <span className="text-xs font-semibold text-neutral-900 dark:text-white whitespace-nowrap">Alex Fisher</span>
                  </div>
                  <div className="w-1/3 opacity-20 flex flex-col items-center">
                     <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white dark:border-slate-800 shadow-sm mb-2">
                        <img src="https://i.pravatar.cc/100?img=15" alt="Avatar" className="h-full w-full object-cover grayscale" />
                     </div>
                  </div>
               </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
