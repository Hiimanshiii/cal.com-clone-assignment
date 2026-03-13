import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Mic, Grid3X3, UserRound, ArrowRight } from 'lucide-react';

export default function AiPage() {
  return (
    <div className="min-h-dvh bg-[#0a0a0a] text-white font-sans selection:bg-purple-900 selection:text-white">
      {/* Dark theme wrapper for Navbar */}
      <div className="dark">
        <Navbar />
      </div>

      <main>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pr-3 pl-1 py-1 text-sm font-medium text-white mb-8 hover:bg-white/10 transition cursor-pointer">
                 <span className="bg-white/10 rounded-full px-2 py-0.5 text-xs text-purple-400">✨</span>
                 Book a sales call with our team
                 <ArrowRight className="h-4 w-4 ml-1 opacity-60" />
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6 leading-[1.1]">
                Supercharged scheduling with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">AI-powered</span> calls
              </h1>
              
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                Turn scheduling into a conversation. Cal.ai uses lifelike agents to book
                meetings, send reminders and follow up all through natural phone calls that
                boost conversions, reduce no-shows, and save time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="rounded-full bg-purple-600 hover:bg-purple-500 px-8 py-4 text-sm font-bold text-white transition shadow-[0_0_30px_-5px_#9333ea]">
                  Try AI scheduling
                </button>
              </div>
              <p className="text-sm text-slate-500">
                Try calling the phone number above to test Cal.ai!
              </p>
            </div>

            {/* Right Phone Mockup */}
            <div className="flex justify-center lg:justify-end relative perspective-1000">
              {/* Glow effect behind phone */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full"></div>
              
              <div className="relative w-full max-w-[340px] h-[700px] bg-[#111116] rounded-[3rem] border-8 border-[#22222a] p-6 flex flex-col shadow-2xl relative z-10 overflow-hidden transform rotate-y-[-5deg]">
                {/* Dynamic Island / Notch area */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#22222a] rounded-b-3xl"></div>
                
                {/* Top Bar */}
                <div className="flex justify-between items-end h-10 mb-8 text-xs font-semibold text-slate-400 px-2 mt-2">
                  <span>9:41</span>
                  <div className="flex gap-1.5 items-center">
                     <span className="h-2.5 w-4 rounded-sm border border-slate-400 flex items-center p-[1px]">
                         <span className="h-full w-[70%] bg-slate-400 rounded-sm"></span>
                     </span>
                  </div>
                </div>

                {/* Contact Info Header */}
                <div className="text-center mb-10">
                  <p className="text-slate-400 text-sm mb-1">+1 (415) 873-1159</p>
                  <h2 className="text-2xl font-bold text-white">Cal.ai Agent</h2>
                </div>

                {/* Chat Bubbles */}
                <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                   {/* Agent Bubble 1 */}
                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                         <div className="bg-purple-600/20 text-purple-400 p-1 rounded-md"><UserRound className="h-3 w-3" /></div>
                         Cal.ai Agent
                      </div>
                      <div className="bg-[#1c1c24] border border-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-200 leading-relaxed w-[90%] font-medium">
                        Hi, Alex. This is Sally from Deel. How are you doing today?
                      </div>
                   </div>

                   {/* User Bubble 1 */}
                   <div className="flex flex-col gap-2 items-end">
                      <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm p-4 text-sm leading-relaxed w-[85%] font-medium flex flex-col gap-3 items-start">
                         <div className="h-6 w-6 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                            <img src="https://i.pravatar.cc/100?img=11" alt="avatar" />
                         </div>
                         I'm doing great Sally, thanks for asking. How are you?
                      </div>
                   </div>

                   {/* Agent Bubble 2 */}
                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                         <div className="bg-purple-600/20 text-purple-400 p-1 rounded-md"><UserRound className="h-3 w-3" /></div>
                         Cal.ai Agent
                      </div>
                      <div className="bg-[#1c1c24] border border-white/5 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-200 leading-relaxed w-[90%] font-medium">
                        I'm great! I'm just calling to see if you can still make the call tomorrow?
                      </div>
                   </div>
                   
                   {/* AI Typing Indicator */}
                   <div className="bg-[#1c1c24] border border-white/5 rounded-2xl rounded-tl-sm p-4 w-16 h-10 flex items-center justify-center gap-1 opacity-50">
                      <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                   </div>
                </div>

                {/* Call Action Buttons */}
                <div className="h-20 flex items-center justify-center gap-8 border-t border-white/5 mt-4 pt-4">
                  <button className="h-12 w-12 rounded-full bg-[#1c1c24] hover:bg-[#2a2a35] transition flex items-center justify-center text-slate-400">
                    <Mic className="h-5 w-5" />
                  </button>
                  <button className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-400 transition shadow-[0_0_20px_-5px_#ef4444] flex items-center justify-center text-white">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-off"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="22" x2="2" y1="2" y2="22"/></svg>
                  </button>
                  <button className="h-12 w-12 rounded-full bg-[#1c1c24] hover:bg-[#2a2a35] transition flex items-center justify-center text-slate-400">
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Marquee Area */}
        <section className="border-t border-white/5 py-12 bg-black/50">
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center opacity-50 grayscale gap-16 overflow-hidden items-center text-xl font-bold font-serif">
              <span>Deel.</span>
              <span>Framer</span>
              <span>Ramp</span>
              <span>PlanetScale</span>
              <span>Mercury</span>
           </div>
        </section>
      </main>
      
      {/* Dark mode footer override wrapper */}
      <div className="[&>footer]:bg-[#0a0a0a] [&>footer]:border-white/5 [&>footer_*]:text-slate-400 [&>footer_h4]:text-white [&>footer_a:hover]:text-white [&>footer_span]:text-white">
        <Footer />
      </div>
    </div>
  );
}
