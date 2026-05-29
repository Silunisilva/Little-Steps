import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, UserCheck, CalendarDays, ClipboardList,
  TrendingUp, ArrowRight, Activity, CheckCircle,
  AlertCircle, Clock,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface Stats {
  students: number;
  teachers: number;
  events: number;
  admissions: number;
}

const recentActivities = [
  { type: 'admission', text: 'New admission request from Emily Parker', time: '2 min ago', color: 'text-primary-500 bg-primary-50 dark:bg-primary-900/30' },
  { type: 'event', text: 'Spring Concert event scheduled for May 30', time: '1 hour ago', color: 'text-secondary-500 bg-secondary-50 dark:bg-secondary-900/30' },
  { type: 'student', text: 'Student James Lee marked present today', time: '2 hours ago', color: 'text-accent-500 bg-accent-50 dark:bg-accent-900/30' },
  { type: 'teacher', text: 'Ms. Williams updated her class schedule', time: '3 hours ago', color: 'text-warm-500 bg-warm-50 dark:bg-warm-900/30' },
  { type: 'admission', text: 'Admission for Sophie Chen approved', time: 'Yesterday', color: 'text-teal-500 bg-teal-50 dark:bg-teal-900/30' },
];

const upcomingEvents = [
  { name: 'Spring Concert', date: 'May 30, 2025', type: 'Event', color: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300' },
  { name: 'Parent-Teacher Day', date: 'Jun 5, 2025', type: 'Meeting', color: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300' },
  { name: 'Field Trip - Museum', date: 'Jun 12, 2025', type: 'Trip', color: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300' },
  { name: 'Year-End Graduation', date: 'Jun 28, 2025', type: 'Ceremony', color: 'bg-warm-100 text-warm-700 dark:bg-warm-900/40 dark:text-warm-300' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ students: 0, teachers: 0, events: 0, admissions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, teachers, events, admissions] = await Promise.all([
          supabase.from('students').select('id', { count: 'exact', head: true }),
          supabase.from('teachers').select('id', { count: 'exact', head: true }),
          supabase.from('events').select('id', { count: 'exact', head: true }),
          supabase.from('admissions').select('id', { count: 'exact', head: true }),
        ]);
        setStats({
          students: students.count || 0,
          teachers: teachers.count || 0,
          events: events.count || 0,
          admissions: admissions.count || 0,
        });
      } catch {
        // Stats will show 0 if tables don't exist yet
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { icon: Users, label: 'Total Students', value: loading ? '...' : stats.students, change: '+5 this month', color: 'text-primary-500 bg-primary-50 dark:bg-primary-900/30', link: '/admin/students' },
    { icon: UserCheck, label: 'Total Teachers', value: loading ? '...' : stats.teachers, change: '2 new this term', color: 'text-secondary-500 bg-secondary-50 dark:bg-secondary-900/30', link: '/admin/teachers' },
    { icon: CalendarDays, label: 'Upcoming Events', value: loading ? '...' : stats.events, change: '4 this month', color: 'text-accent-500 bg-accent-50 dark:bg-accent-900/30', link: '/admin/events' },
    { icon: ClipboardList, label: 'Admission Requests', value: loading ? '...' : stats.admissions, change: '3 pending review', color: 'text-warm-500 bg-warm-50 dark:bg-warm-900/30', link: '/admin/admissions' },
  ];

  const quickLinks = [
    { label: 'Add Student', to: '/admin/students', icon: Users, color: 'bg-primary-500' },
    { label: 'New Event', to: '/admin/events', icon: CalendarDays, color: 'bg-secondary-500' },
    { label: 'View Admissions', to: '/admin/admissions', icon: ClipboardList, color: 'bg-accent-500' },
    { label: 'Attendance', to: '/admin/attendance', icon: CheckCircle, color: 'bg-warm-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white">
            Good morning, {user?.user_metadata?.full_name?.split(' ')[0] || 'Admin'}! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's what's happening at Little Steps today.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 text-primary-500" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-3xl font-extrabold font-display text-gray-800 dark:text-white">{card.value}</div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1">{card.label}</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-secondary-500">
              <TrendingUp className="w-3 h-3" />
              {card.change}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-extrabold font-display text-gray-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex flex-col items-center gap-3 p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <link.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold font-display text-gray-800 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-500" />
              Recent Activity
            </h2>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className={`w-8 h-8 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {activity.type === 'admission' ? <ClipboardList className="w-4 h-4" /> :
                   activity.type === 'event' ? <CalendarDays className="w-4 h-4" /> :
                   activity.type === 'student' ? <Users className="w-4 h-4" /> :
                   <UserCheck className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold font-display text-gray-800 dark:text-white flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-secondary-500" />
              Upcoming Events
            </h2>
            <Link to="/admin/events" className="text-sm text-primary-500 font-semibold hover:text-primary-600">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-800 dark:text-white">{event.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{event.date}</p>
                </div>
                <span className={`badge ${event.color} text-xs`}>{event.type}</span>
              </div>
            ))}
          </div>

          {/* Attendance Summary */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Today's Attendance</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-secondary-400 to-secondary-500 rounded-full" style={{ width: '87%' }} />
              </div>
              <span className="text-sm font-bold text-secondary-600 dark:text-secondary-400 w-10">87%</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-secondary-400" /> 304 Present</span>
              <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 text-red-400" /> 46 Absent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
