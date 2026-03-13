export default function Features() {
  return (
    <section className="border-t border-slate-100 bg-slate-50/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-16">
          ...and so much more!
        </h2>
        
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center h-48 hover:-translate-y-1 transition duration-300">
            <h3 className="font-bold text-slate-900 text-sm mb-2">Accept payments</h3>
            <p className="text-xs text-slate-500">You can monetize your bookings through our Stripe integration.</p>
          </div>
          
          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center h-48 hover:-translate-y-1 transition duration-300">
            <div className="mb-4 text-slate-700 bg-slate-100 p-3 rounded-2xl">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video text-slate-900"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Built-in video conferencing</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center h-48 hover:-translate-y-1 transition duration-300">
             <div className="mb-4 text-slate-700 bg-slate-100 p-3 rounded-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link-2 text-slate-900"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
             </div>
            <h3 className="font-bold text-slate-900 text-sm">Short booking links</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center h-48 hover:-translate-y-1 transition duration-300">
             <div className="mb-4 text-slate-700 bg-slate-100 p-3 rounded-2xl">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-slate-900"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
             </div>
            <h3 className="font-bold text-slate-900 text-sm">Privacy first</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center h-48 hover:-translate-y-1 transition duration-300">
             <div className="mb-4 text-slate-700 bg-slate-100 p-3 rounded-2xl text-xl font-bold font-serif text-slate-900">
                A
             </div>
            <h3 className="font-bold text-slate-900 text-sm">65+ languages</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center h-48 hover:-translate-y-1 transition duration-300">
            <div className="mb-4 text-slate-700 bg-slate-100 p-3 rounded-2xl">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code text-slate-900"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
             </div>
            <h3 className="font-bold text-slate-900 text-sm">Easy embeds</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center h-48 hover:-translate-y-1 transition duration-300">
            <div className="mb-4 text-slate-700 bg-slate-100 p-3 rounded-2xl">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-blocks text-slate-900"><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/></svg>
             </div>
            <h3 className="font-bold text-slate-900 text-sm">All your favorite apps</h3>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center h-48 hover:-translate-y-1 transition duration-300">
             <div className="mb-4 text-slate-700 bg-slate-100 p-3 rounded-2xl">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings text-slate-900"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
             </div>
            <h3 className="font-bold text-slate-900 text-sm">Simple customization</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
