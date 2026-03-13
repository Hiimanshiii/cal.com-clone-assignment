import { Calendar, Globe, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        {/* Left Col */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-tight">
            The better way to schedule your meetings
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row mb-4">
            <Link
              to="/dashboard/event-types"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-xl hover:bg-slate-800 hover:shadow-lg transition sm:w-auto"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </Link>
            <Link
              to="/dashboard/event-types"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition sm:w-auto"
            >
              Sign up with email
            </Link>
          </div>
        </div>

        {/* Right Col - Booking Card Preview */}
        <div className="flex justify-center flex-col items-center lg:items-end w-full relative">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-sm max-h-[400px] bg-gradient-to-tr from-slate-200 to-slate-50 rounded-[3rem] blur-3xl opacity-50 z-0"></div>

          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative z-10 hover:shadow-3xl transition duration-500 transform hover:-translate-y-1">
             <div className="flex flex-col md:flex-row">
                
                {/* Left Side Info */}
                <div className="p-8 md:w-3/5 border-b md:border-b-0 md:border-r border-slate-100 bg-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 p-0.5 shadow-sm">
                      <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=68" alt="avatar" className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-0.5">Denise Wilson</p>
                      <h2 className="text-lg font-bold text-slate-900 leading-tight">Property Viewing</h2>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 leading-relaxed mb-8">
                    Tour your potential dream home with our experienced real estate professionals.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-sm font-medium text-slate-700">
                      <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-lg border border-slate-200 px-2 py-1 hover:border-slate-400 cursor-pointer transition">15m</span>
                        <span className="rounded-lg border border-slate-200 px-2 py-1 hover:border-slate-400 cursor-pointer transition">30m</span>
                        <span className="rounded-lg border border-slate-900 bg-slate-900 text-white px-2 py-1 cursor-pointer transition shadow-md">45m</span>
                        <span className="rounded-lg border border-slate-200 px-2 py-1 hover:border-slate-400 cursor-pointer transition">1h</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <Video className="h-5 w-5 text-slate-400 shrink-0" />
                      <span>Pine Realty Office</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <Globe className="h-5 w-5 text-slate-400 shrink-0" />
                      <span>Australia/Sydney</span>
                    </div>
                  </div>
                </div>

                {/* Right Side Calendar Grid */}
                <div className="p-8 md:w-2/5 bg-slate-50">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">May 2025</span>
                    <div className="flex gap-1">
                      <button className="h-6 w-6 rounded hover:bg-slate-200 flex items-center justify-center text-slate-400">&lt;</button>
                      <button className="h-6 w-6 rounded hover:bg-slate-200 flex items-center justify-center text-slate-400">&gt;</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-y-4 gap-x-2 text-center text-xs text-slate-500 font-medium mb-3 border-b border-slate-200 pb-2">
                    <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div>
                  </div>
                  <div className="grid grid-cols-4 gap-y-3 gap-x-2 text-center text-sm">
                    <div className="py-2 text-slate-300"></div><div className="py-2 text-slate-300"></div><div className="py-2 text-slate-300"></div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">1</div>
                    <div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">5</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">6</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">7</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">8</div>
                    <div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">12</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">13</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">14</div><div className="relative py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">15<span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 bg-slate-400 rounded-full"></span></div>
                    <div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">19</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">20</div><div className="py-2 font-bold text-white bg-slate-900 rounded-lg shadow-md scale-105 cursor-pointer">21</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">22</div>
                    <div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">26</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">27</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">28</div><div className="py-2 font-medium text-slate-900 hover:bg-white rounded-lg cursor-pointer hover:shadow-sm">29</div>
                  </div>
                </div>

             </div>
          </div>
          
          {/* Decorative Trustpilot */}
          <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 flex gap-4 z-20 items-center transform -rotate-2 hover:rotate-0 transition duration-300">
             <div className="flex flex-col gap-1">
               <div className="flex text-emerald-500">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               </div>
               <span className="text-[10px] font-bold text-slate-900 block flex items-center gap-1"> <span className="text-emerald-500 text-lg">★</span> Trustpilot</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
