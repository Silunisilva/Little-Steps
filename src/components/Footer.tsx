import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-extrabold font-display">Little Steps</div>
                <div className="text-[10px] text-primary-400 font-semibold tracking-widest uppercase -mt-0.5">Preschool</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nurturing young minds with love, creativity, and a passion for learning. Where every child's journey begins.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-500 flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-display mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Our Programs', to: '/programs' },
                { label: 'Photo Gallery', to: '/gallery' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-primary-400 transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold font-display mb-4">Programs</h4>
            <ul className="space-y-2.5">
              {[
                'Toddlers (18mo - 2yr)',
                'Nursery (2 - 3 years)',
                'Pre-K (3 - 4 years)',
                'Kindergarten Ready (4-5yr)',
                'After School Care',
                'Summer Camp',
              ].map((program) => (
                <li key={program} className="text-sm flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-secondary-500 rounded-full flex-shrink-0"></span>
                  {program}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold font-display mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <span>123 Sunshine Lane, Maplewood, CA 90210</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span>hello@littlesteps.edu</span>
              </li>
            </ul>

            <div className="mt-5 p-3 bg-secondary-500/10 rounded-xl border border-secondary-500/20">
              <p className="text-xs font-semibold text-secondary-400 mb-1">Hours of Operation</p>
              <p className="text-xs text-gray-400">Mon - Fri: 7:00 AM - 6:00 PM</p>
              <p className="text-xs text-gray-400">Sat: 8:00 AM - 12:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Little Steps Preschool. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-current" /> for little learners
          </p>
        </div>
      </div>
    </footer>
  );
}
