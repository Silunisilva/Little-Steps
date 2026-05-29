import { useState } from 'react';
import { CheckSquare, CheckCircle, XCircle, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

type AttendanceStatus = 'present' | 'absent' | 'late' | null;

interface StudentAttendance {
  id: string;
  name: string;
  program: string;
  status: AttendanceStatus;
}

const initialStudents: StudentAttendance[] = [
  { id: '1', name: 'Emma Johnson', program: 'Pre-K Adventurers', status: 'present' },
  { id: '2', name: 'Lucas Chen', program: 'Nursery Stars', status: 'present' },
  { id: '3', name: 'Aanya Patel', program: 'Kindergarten Ready', status: 'absent' },
  { id: '4', name: 'Noah Williams', program: 'Toddler Explorers', status: 'present' },
  { id: '5', name: 'Sofia Martinez', program: 'Pre-K Adventurers', status: 'late' },
  { id: '6', name: 'James Liu', program: 'Nursery Stars', status: 'present' },
  { id: '7', name: 'Zoe Davis', program: 'Pre-K Adventurers', status: null },
  { id: '8', name: 'Leo Thompson', program: 'Kindergarten Ready', status: 'present' },
];

const statusConfig = {
  present: { icon: CheckCircle, label: 'Present', color: 'text-secondary-500', bg: 'bg-secondary-50 dark:bg-secondary-900/30 border-secondary-200 dark:border-secondary-800' },
  absent: { icon: XCircle, label: 'Absent', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800' },
  late: { icon: Minus, label: 'Late', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800' },
};

const programs = ['All Programs', 'Toddler Explorers', 'Nursery Stars', 'Pre-K Adventurers', 'Kindergarten Ready'];

export default function Attendance() {
  const [students, setStudents] = useState<StudentAttendance[]>(initialStudents);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [programFilter, setProgramFilter] = useState('All Programs');

  const markAll = (status: AttendanceStatus) => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const toggleStatus = (id: string, status: AttendanceStatus) => {
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  };

  const filtered = programFilter === 'All Programs' ? students : students.filter((s) => s.program === programFilter);

  const counts = {
    present: students.filter((s) => s.status === 'present').length,
    absent: students.filter((s) => s.status === 'absent').length,
    late: students.filter((s) => s.status === 'late').length,
    total: students.length,
  };

  const attendanceRate = Math.round((counts.present / counts.total) * 100);

  const changeDate = (offset: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + offset);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-secondary-500" />
          Attendance
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Track daily student attendance</p>
      </div>

      {/* Date & Stats Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Date Selector */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3">
          <button onClick={() => changeDate(-1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-sm font-bold text-gray-800 dark:text-white bg-transparent border-none focus:outline-none cursor-pointer"
            />
            <div className="text-xs text-gray-400 mt-0.5">
              {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          </div>
          <button onClick={() => changeDate(1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stat Cards */}
        {[
          { label: 'Present', value: counts.present, color: 'text-secondary-500 bg-secondary-50 dark:bg-secondary-900/30' },
          { label: 'Absent', value: counts.absent, color: 'text-red-500 bg-red-50 dark:bg-red-900/30' },
          { label: 'Late', value: counts.late, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/30' },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 text-center">
            <div className={`text-2xl font-extrabold font-display ${s.color.split(' ')[0]}`}>{s.value}</div>
            <div className="text-xs font-semibold text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Attendance Rate Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Overall Attendance Rate</span>
          <span className={`text-2xl font-extrabold font-display ${attendanceRate >= 80 ? 'text-secondary-500' : attendanceRate >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
            {attendanceRate}%
          </span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              attendanceRate >= 80 ? 'bg-gradient-to-r from-secondary-400 to-secondary-500' :
              attendanceRate >= 60 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
              'bg-gradient-to-r from-red-400 to-red-500'
            }`}
            style={{ width: `${attendanceRate}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white w-auto"
        >
          {programs.map((p) => <option key={p}>{p}</option>)}
        </select>
        <div className="flex gap-2">
          <button onClick={() => markAll('present')} className="px-3 py-1.5 text-xs font-semibold bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-lg hover:bg-secondary-100 transition-colors">
            All Present
          </button>
          <button onClick={() => markAll('absent')} className="px-3 py-1.5 text-xs font-semibold bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition-colors">
            All Absent
          </button>
        </div>
      </div>

      {/* Student Roster */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {filtered.map((student) => (
            <div key={student.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="w-9 h-9 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800 dark:text-white truncate">{student.name}</p>
                <p className="text-xs text-gray-400 truncate">{student.program}</p>
              </div>

              <div className="flex gap-2">
                {(['present', 'absent', 'late'] as AttendanceStatus[]).map((status) => {
                  if (!status) return null;
                  const cfg = statusConfig[status];
                  const isActive = student.status === status;
                  return (
                    <button
                      key={status}
                      onClick={() => toggleStatus(student.id, isActive ? null : status)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isActive
                          ? `${cfg.bg} ${cfg.color} border-current`
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-400 border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <cfg.icon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
