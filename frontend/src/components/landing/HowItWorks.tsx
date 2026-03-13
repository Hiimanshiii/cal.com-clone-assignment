export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-800 mb-6 shadow-sm">
          How it works
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
          With us, appointment scheduling is easy
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Card 1 */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-500 flex flex-col items-center text-center overflow-hidden group">
          <div className="p-8 pb-4">
             <div className="mb-6 h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-400 mx-auto group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
               01
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-4">Connect your calendar</h3>
             <p className="text-slate-600 leading-relaxed">
               We'll handle all the cross-referencing, so you don't have to worry about double bookings.
             </p>
          </div>
          <div className="mt-auto h-56 w-full bg-slate-50 border-t border-slate-100 flex items-center justify-center relative overflow-hidden">
             {/* Animated Rings UI */}
             <div className="absolute w-48 h-48 border border-slate-200 rounded-full animate-[spin_10s_linear_infinite]">
                 <div className="absolute -top-2 left-1/2 w-4 h-4 bg-sky-500 rounded-full border-2 border-white shadow-sm"></div>
             </div>
             <div className="absolute w-32 h-32 border border-slate-200 rounded-full animate-[spin_8s_linear_infinite_reverse]">
                 <div className="absolute top-1/2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
             </div>
             <div className="absolute w-16 h-16 border border-slate-200 rounded-full animate-[spin_6s_linear_infinite]">
                 <div className="absolute -bottom-2 lg:left-1/4 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-sm"></div>
             </div>
             {/* Center Logo Bubble */}
             <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center border border-slate-100 text-sm font-bold text-slate-900 z-10 relative">
               Cal.com
               <div className="absolute inset-0 rounded-full ring-2 ring-slate-900 ring-offset-2 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition duration-500"></div>
             </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-500 flex flex-col items-center text-center overflow-hidden group">
          <div className="p-8 pb-4">
             <div className="mb-6 h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-400 mx-auto group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
               02
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-4">Set your availability</h3>
             <p className="text-slate-600 leading-relaxed">
               Want to block off weekends? Set up any buffers? We make that easy.
             </p>
          </div>
          <div className="mt-auto h-56 w-full bg-slate-50 border-t border-slate-100 flex flex-col justify-center px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10"></div>
            {/* Animated List UI */}
            <div className="space-y-4 relative w-full translate-y-4 group-hover:-translate-y-2 transition-transform duration-700 ease-in-out">
               {/* Day 1 */}
               <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm text-sm font-medium">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-slate-900 rounded-full"></div>
                    </div>
                    <span className="text-slate-900">Mon</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-500">
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">9:00am</span>
                    <span>-</span>
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">5:00pm</span>
                 </div>
               </div>
               {/* Day 2 */}
               <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm text-sm font-medium">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-slate-900 rounded-full"></div>
                    </div>
                    <span className="text-slate-900">Tue</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-500">
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">9:00am</span>
                    <span>-</span>
                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">5:00pm</span>
                 </div>
               </div>
               {/* Day 3 */}
               <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-sm text-sm font-medium opacity-50 relative top-[-4px]">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-4 bg-slate-200 rounded-full relative">
                        <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-slate-400 rounded-full"></div>
                    </div>
                    <span className="text-slate-900">Wed</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-400">
                    Unavailable
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-500 flex flex-col items-center text-center overflow-hidden group">
          <div className="p-8 pb-4">
             <div className="mb-6 h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-400 mx-auto group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
               03
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-4">Choose how to meet</h3>
             <p className="text-slate-600 leading-relaxed">
               It could be a video chat, phone call, or a walk in the park!
             </p>
          </div>
          <div className="mt-auto h-56 w-full bg-slate-50 border-t border-slate-100 flex items-center justify-center p-6 relative">
             {/* Mock Video Call UI */}
             <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-2 flex flex-col gap-2 group-hover:scale-105 transition-transform duration-500">
                <div className="flex gap-2 h-24">
                  <div className="flex-1 bg-slate-100 rounded-xl relative overflow-hidden group/video1">
                    <div className="absolute inset-0 bg-slate-200 translate-y-full group-hover/video1:translate-y-0 transition duration-300"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-slate-300 rounded-full flex items-center justify-center shadow-sm z-10 overflow-hidden">
                       <img src="https://i.pravatar.cc/100?img=1" className="w-full h-full object-cover" alt="" />
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-xl relative overflow-hidden group/video2">
                    <div className="absolute inset-0 bg-slate-200 translate-y-full group-hover/video2:translate-y-0 transition duration-300 delay-100"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-slate-300 rounded-full flex items-center justify-center shadow-sm z-10 overflow-hidden">
                       <img src="https://i.pravatar.cc/100?img=2" className="w-full h-full object-cover" alt="" />
                    </div>
                  </div>
                </div>
                <div className="h-10 bg-slate-50 rounded-xl flex items-center justify-center gap-3 border border-slate-100">
                  <div className="h-6 w-6 rounded-md bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg></div>
                  <div className="h-6 w-6 rounded-md bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg></div>
                  <div className="h-6 w-6 rounded-md bg-red-500 shadow-sm flex items-center justify-center text-white hover:bg-red-600 transition-colors"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="22" x2="2" y1="2" y2="22"/></svg></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
