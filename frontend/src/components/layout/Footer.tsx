import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Column 1: Branding and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 mb-6">
              <span>Cal Clone</span>
            </Link>
            <p className="text-sm text-slate-500 mb-6">
              Cal.com® and Cal® are a registered trademark by Cal.com, Inc. All rights reserved.
            </p>
            <p className="text-sm font-semibold text-slate-700">
              Our mission is to connect a billion people by 2031 through calendar scheduling.
            </p>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="#" className="hover:text-slate-900">iOS/Android App</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Self-hosted</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Pricing</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Docs</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Cal.ai - AI Phone Agent</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Enterprise</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Integrate Cal Clone</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Routing</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Desktop App</Link></li>
            </ul>
          </div>

          {/* Column 3: Use Cases */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Use Cases</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="#" className="hover:text-slate-900">Sales</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Marketing</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Talent Acquisition</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Customer Support</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Higher Education</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Telehealth</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Professional Services</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Hiring Marketplace</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Human Resources</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="#" className="hover:text-slate-900">Affiliate Program</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Help Docs</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Blog</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Teams</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Embed</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Recurring events</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Developers</Link></li>
              <li><Link to="#" className="hover:text-slate-900">OOO</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Workflows</Link></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link to="#" className="hover:text-slate-900">Jobs</Link></li>
              <li><Link to="#" className="hover:text-slate-900">About</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Open Startup</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Support</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Privacy</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Terms</Link></li>
              <li><Link to="#" className="hover:text-slate-900">License</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Security</Link></li>
              <li><Link to="#" className="hover:text-slate-900">Changelog</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
