import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, Users, AlignJustify, Building2, Send, DollarSign, UsersRound, GraduationCap, PhoneCall, Stethoscope, MessageSquare, LineChart, FileText, Code2, Map, Key, Smartphone, Users2, FileQuestion, Moon, Sun, CreditCard, Link2, BellRing } from 'lucide-react';

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const handleMouseEnter = (menu: string) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setIsDarkMode(isDark);
  };

  return (
    <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8 relative z-50 font-sans sticky top-4">
      <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white px-6 py-4 shadow-sm relative z-50 dark:bg-slate-900 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white transition-colors">
          <Link to="/" className="flex items-center gap-2">
            <span>Cal Clone</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {/* Solutions Dropdown */}
          <div 
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-slate-900 flex items-center gap-1">
              Solutions <ChevronDown className="h-4 w-4" />
            </button>
            
            {activeMenu === 'solutions' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 grid grid-cols-3 gap-6">
                 <div className="col-span-1">
                    <p className="text-xs font-semibold text-slate-400 mb-4 tracking-wider uppercase">By team size</p>
                    <div className="space-y-4">
                       <Link to="#" className="flex gap-3 hover:bg-slate-50 p-2 text-slate-500 rounded-lg group">
                          <div className="bg-slate-100 p-2 rounded-lg text-slate-700 group-hover:bg-slate-200 transition"><User className="h-4 w-4" /></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">For Individuals</p>
                            <p className="text-xs">Personal scheduling made simple</p>
                          </div>
                       </Link>
                       <Link to="#" className="flex gap-3 hover:bg-slate-50 p-2 text-slate-500 rounded-lg group">
                          <div className="bg-slate-100 p-2 rounded-lg text-slate-700 group-hover:bg-slate-200 transition"><Users className="h-4 w-4" /></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">For Teams</p>
                            <p className="text-xs">Collaborative scheduling for groups</p>
                          </div>
                       </Link>
                       <Link to="#" className="flex gap-3 hover:bg-slate-50 p-2 text-slate-500 rounded-lg group">
                          <div className="bg-slate-100 p-2 rounded-lg text-slate-700 group-hover:bg-slate-200 transition"><AlignJustify className="h-4 w-4" /></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">For Organizations</p>
                            <p className="text-xs">Larger teams scheduling for more control</p>
                          </div>
                       </Link>
                       <Link to="#" className="flex gap-3 hover:bg-slate-50 p-2 text-slate-500 rounded-lg group">
                          <div className="bg-slate-100 p-2 rounded-lg text-slate-700 group-hover:bg-slate-200 transition"><Building2 className="h-4 w-4" /></div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">For Enterprises</p>
                            <p className="text-xs">Enterprise-level scheduling solutions</p>
                          </div>
                       </Link>
                    </div>
                 </div>
                 <div className="col-span-1">
                    <p className="text-xs font-semibold text-slate-400 mb-4 tracking-wider uppercase">By use case</p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                        <Link to="#" className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg text-sm text-slate-900 font-medium group">
                            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 group-hover:bg-slate-200"><Send className="h-4 w-4" /></div> Recruiting
                        </Link>
                        <Link to="#" className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg text-sm text-slate-900 font-medium group">
                            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 group-hover:bg-slate-200"><PhoneCall className="h-4 w-4" /></div> Support
                        </Link>
                        <Link to="#" className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg text-sm text-slate-900 font-medium group">
                            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 group-hover:bg-slate-200"><DollarSign className="h-4 w-4" /></div> Sales
                        </Link>
                         <Link to="#" className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg text-sm text-slate-900 font-medium group">
                            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 group-hover:bg-slate-200"><Stethoscope className="h-4 w-4" /></div> Healthcare
                        </Link>
                         <Link to="#" className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg text-sm text-slate-900 font-medium group">
                            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 group-hover:bg-slate-200"><UsersRound className="h-4 w-4" /></div> HR
                        </Link>
                         <Link to="#" className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg text-sm text-slate-900 font-medium group">
                            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 group-hover:bg-slate-200"><MessageSquare className="h-4 w-4" /></div> Telehealth
                        </Link>
                        <Link to="#" className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg text-sm text-slate-900 font-medium group">
                            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 group-hover:bg-slate-200"><GraduationCap className="h-4 w-4" /></div> Education
                        </Link>
                         <Link to="#" className="flex items-center gap-2 hover:bg-slate-50 p-2 rounded-lg text-sm text-slate-900 font-medium group">
                            <div className="bg-slate-100 p-1.5 rounded-lg text-slate-600 group-hover:bg-slate-200"><LineChart className="h-4 w-4" /></div> Marketing
                        </Link>
                    </div>
                 </div>
                 <div className="col-span-1 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 p-6 flex flex-col justify-between text-white shadow-inner">
                    <div className="flex justify-end">
                       <span className="bg-black/20 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span> Try Cal.ai now!
                       </span>
                    </div>
                    <div className="text-center">
                       <h3 className="text-4xl font-bold tracking-tight mb-2 opacity-90">Cal.ai</h3>
                       <p className="text-sm text-white/90 font-medium">Supercharged scheduling with AI-powered calls</p>
                    </div>
                 </div>
              </div>
            )}
          </div>

          <Link to="#" className="hover:text-slate-900">
            Enterprise
          </Link>
          <Link to="/ai" className="hover:text-slate-900">
            Cal.ai
          </Link>

          {/* Developer Dropdown */}
          <div 
             className="relative py-2"
             onMouseEnter={() => handleMouseEnter('developer')}
             onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-slate-900 flex items-center gap-1">
              Developer <ChevronDown className="h-4 w-4" />
            </button>

             {activeMenu === 'developer' && (
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] rounded-2xl bg-white p-4 shadow-2xl border border-slate-100 flex flex-col gap-2">
                 <Link to="#" className="flex items-start gap-4 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2.5 rounded-lg group-hover:bg-slate-200 transition shrink-0">
                     <FileText className="h-5 w-5" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">Developer Documentation</p>
                     <p className="text-xs text-slate-500 mt-0.5">Documentation for the Cal.com platform</p>
                   </div>
                 </Link>
                 <Link to="#" className="flex items-start gap-4 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2.5 rounded-lg group-hover:bg-slate-200 transition shrink-0">
                     <Code2 className="h-5 w-5" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">API</p>
                     <p className="text-xs text-slate-500 mt-0.5">Build your own integrations with our public API</p>
                   </div>
                 </Link>
                 <Link to="#" className="flex items-start gap-4 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2.5 rounded-lg group-hover:bg-slate-200 transition shrink-0">
                     <Map className="h-5 w-5" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">Scheduling Components</p>
                     <p className="text-xs text-slate-500 mt-0.5">Use our react atoms to add scheduling to your app</p>
                   </div>
                 </Link>
                 <Link to="#" className="flex items-start gap-4 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2.5 rounded-lg group-hover:bg-slate-200 transition shrink-0">
                     <Key className="h-5 w-5" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">Create OAuth Client</p>
                     <p className="text-xs text-slate-500 mt-0.5">Integrate Cal.com using OAuth</p>
                   </div>
                 </Link>
               </div>
             )}
          </div>

          {/* Resources Dropdown */}
          <div 
             className="relative py-2"
             onMouseEnter={() => handleMouseEnter('resources')}
             onMouseLeave={handleMouseLeave}
          >
            <button className="hover:text-slate-900 flex items-center gap-1">
              Resources <ChevronDown className="h-4 w-4" />
            </button>

            {activeMenu === 'resources' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] rounded-2xl bg-white p-4 shadow-2xl border border-slate-100 grid grid-cols-3 gap-2">
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><Code2 className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">API</p><p className="text-xs text-slate-500 leading-tight">Build your own integrations with our public API</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><Code2 className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Embed</p><p className="text-xs text-slate-500 leading-tight">Embed Cal.com into your website</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><FileText className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Blog</p><p className="text-xs text-slate-500 leading-tight">Stay up to date with the latest news</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><Smartphone className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">App Store</p><p className="text-xs text-slate-500 leading-tight">Integrate with your favorite apps</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><Moon className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Out Of Office</p><p className="text-xs text-slate-500 leading-tight">Schedule time off with ease</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><Users2 className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Instant Meetings</p><p className="text-xs text-slate-500 leading-tight">Meet with clients in minutes</p></div>
                 </Link>
                  <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><Users className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Collective Events</p><p className="text-xs text-slate-500 leading-tight">Schedule events with multiple participants</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><CreditCard className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Payments</p><p className="text-xs text-slate-500 leading-tight">Accept payments for bookings</p></div>
                 </Link>
                  <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><Link2 className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Dynamic Group Links</p><p className="text-xs text-slate-500 leading-tight">Seamlessly book meetings with multiple people</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><FileQuestion className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Help Docs</p><p className="text-xs text-slate-500 leading-tight">Need to learn more about our system?</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><Link2 className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Workflows</p><p className="text-xs text-slate-500 leading-tight">Automate scheduling and reminders</p></div>
                 </Link>
                 <Link to="#" className="flex items-start gap-3 hover:bg-slate-50 p-3 rounded-xl transition group">
                   <div className="bg-slate-100 text-slate-600 p-2 rounded-lg group-hover:bg-slate-200 transition shrink-0"><BellRing className="h-4 w-4" /></div>
                   <div><p className="text-sm font-bold text-slate-900">Webhooks</p><p className="text-xs text-slate-500 leading-tight">Get notified when something happens</p></div>
                 </Link>
              </div>
            )}
          </div>

          <Link to="#" className="hover:text-slate-900">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">

          <Link
            to="/dashboard/event-types"
            className="text-sm font-semibold text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/dashboard/event-types"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
