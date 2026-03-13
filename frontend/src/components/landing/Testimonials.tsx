export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Don't just take our word for it
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Testimonial 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition">
          <p className="text-slate-600 mb-8 italic">
            "Cal Clone has completely transformed how our team manages meetings. The ease of use and customizable links are incredible."
          </p>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">JS</div>
            <div>
              <p className="text-sm font-bold text-slate-900">Jane Smith</p>
              <p className="text-xs text-slate-500">Product Manager, TechFlow</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition">
          <p className="text-slate-600 mb-8 italic">
            "We switched from a competitor to Cal Clone and never looked back. The open-source nature and clean UI make it the perfect choice."
          </p>
           <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">DJ</div>
            <div>
              <p className="text-sm font-bold text-slate-900">David Jones</p>
              <p className="text-xs text-slate-500">Founder, StartupX</p>
            </div>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition">
          <p className="text-slate-600 mb-8 italic">
            "Getting rid of double-bookings and back-and-forth emails was a huge win for my consulting business."
          </p>
           <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">EW</div>
            <div>
              <p className="text-sm font-bold text-slate-900">Emily White</p>
              <p className="text-xs text-slate-500">Independent Consultant</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
