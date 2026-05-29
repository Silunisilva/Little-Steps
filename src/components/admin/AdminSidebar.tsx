import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  X,
  CheckSquare,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
  { icon: Users, label: 'Students', to: '/admin/students' },
  { icon: UserCheck, label: 'Teachers', to: '/admin/teachers' },
  { icon: CalendarDays, label: 'Events', to: '/admin/events' },
  { icon: ClipboardList, label: 'Admissions', to: '/admin/admissions' },
  { icon: CheckSquare, label: 'Attendance', to: '/admin/attendance' },
  { icon: MessageSquare, label: 'Messages', to: '/admin/messages' },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-30 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-extrabold font-display">Little Steps</div>
              <div className="text-[9px] text-primary-400 font-semibold tracking-wider uppercase">Admin Portal</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3 bg-gray-800 rounded-xl p-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.user_metadata?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">
                {user?.user_metadata?.full_name || 'Administrator'}
              </div>
              <div className="text-xs text-gray-400 truncate">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <p className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Main Menu</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : ''}`} />
                {item.label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 bg-primary-400 rounded-full" />}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-gray-800">
            <p className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">System</p>
            <Link
              to="/admin/notifications"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
            >
              <Bell className="w-5 h-5" />
              Notifications
              <span className="ml-auto bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
            </Link>
            <Link
              to="/admin/settings"
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
