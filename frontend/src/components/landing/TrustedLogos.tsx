export default function TrustedLogos() {
  return (
    <section className="border-t border-slate-100 bg-slate-50/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="mb-8 text-sm font-semibold text-slate-500 uppercase tracking-widest">
          Trusted by fast-growing companies around the world
        </p>
        <div className="flex flex-wrap justify-center gap-8 opacity-60 md:gap-16 lg:gap-24 grayscale">
          {/* Placeholder text for logos since we don't have SVGs */}
          <div className="text-xl font-bold flex items-center justify-center h-12 w-24">Vercel</div>
          <div className="text-xl font-bold flex items-center justify-center h-12 w-24 text-green-600">Supabase</div>
          <div className="text-xl font-bold flex items-center justify-center h-12 w-24 text-purple-600">Udemy</div>
          <div className="text-xl font-bold flex items-center justify-center h-12 w-24">Rho</div>
          <div className="text-xl font-bold flex items-center justify-center h-12 w-24 text-blue-600">Deel</div>
          <div className="text-xl font-bold flex items-center justify-center h-12 w-24">Framer</div>
        </div>
      </div>
    </section>
  );
}
