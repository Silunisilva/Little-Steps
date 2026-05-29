import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, ChevronDown, Users, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Student {
  id: string;
  name: string;
  age: number;
  program: string;
  guardian_name: string;
  guardian_phone: string;
  guardian_email: string;
  enrollment_date: string;
  status: 'active' | 'inactive';
}

const PROGRAMS = ['Toddler Explorers', 'Nursery Stars', 'Pre-K Adventurers', 'Kindergarten Ready'];

const statusColors: Record<string, string> = {
  active: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300',
  inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
};

const mockStudents: Student[] = [
  { id: '1', name: 'Emma Johnson', age: 4, program: 'Pre-K Adventurers', guardian_name: 'Sarah Johnson', guardian_phone: '(555) 001-0001', guardian_email: 'sarah.j@email.com', enrollment_date: '2024-09-01', status: 'active' },
  { id: '2', name: 'Lucas Chen', age: 3, program: 'Nursery Stars', guardian_name: 'Michael Chen', guardian_phone: '(555) 002-0002', guardian_email: 'm.chen@email.com', enrollment_date: '2024-09-01', status: 'active' },
  { id: '3', name: 'Aanya Patel', age: 5, program: 'Kindergarten Ready', guardian_name: 'Priya Patel', guardian_phone: '(555) 003-0003', guardian_email: 'priya.p@email.com', enrollment_date: '2024-09-01', status: 'active' },
  { id: '4', name: 'Noah Williams', age: 2, program: 'Toddler Explorers', guardian_name: 'James Williams', guardian_phone: '(555) 004-0004', guardian_email: 'j.williams@email.com', enrollment_date: '2025-01-15', status: 'active' },
  { id: '5', name: 'Sofia Martinez', age: 4, program: 'Pre-K Adventurers', guardian_name: 'Carlos Martinez', guardian_phone: '(555) 005-0005', guardian_email: 'c.martinez@email.com', enrollment_date: '2024-09-01', status: 'inactive' },
];

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form, setForm] = useState<Partial<Student>>({
    name: '', age: 3, program: PROGRAMS[0], guardian_name: '', guardian_phone: '', guardian_email: '', status: 'active',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase.from('students').select('*').order('name');
      if (error) throw error;
      setStudents(data?.length ? data : mockStudents);
    } catch {
      setStudents(mockStudents);
    } finally {
      setLoading(false);
    }
  };

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.guardian_name.toLowerCase().includes(search.toLowerCase());
    const matchProgram = programFilter === 'All' || s.program === programFilter;
    return matchSearch && matchProgram;
  });

  const openAdd = () => {
    setEditingStudent(null);
    setForm({ name: '', age: 3, program: PROGRAMS[0], guardian_name: '', guardian_phone: '', guardian_email: '', status: 'active' });
    setShowModal(true);
  };

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    setForm(student);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.guardian_name) return;
    if (editingStudent) {
      setStudents((prev) => prev.map((s) => s.id === editingStudent.id ? { ...s, ...form } as Student : s));
    } else {
      const newStudent: Student = {
        ...form as Student,
        id: Date.now().toString(),
        enrollment_date: new Date().toISOString().split('T')[0],
      };
      setStudents((prev) => [newStudent, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this student?')) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-500" />
            Students
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage enrolled students</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search students or guardians..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-9 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
        <div className="relative">
          <select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="input-field pr-9 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white appearance-none"
          >
            <option>All</option>
            {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">Student</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide hidden md:table-cell">Program</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide hidden lg:table-cell">Guardian</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide hidden lg:table-cell">Enrolled</th>
                  <th className="text-left px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3.5 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr key={student.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-white">{student.name}</div>
                          <div className="text-xs text-gray-400">Age {student.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-gray-600 dark:text-gray-400">{student.program}</td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <div className="text-gray-700 dark:text-gray-300">{student.guardian_name}</div>
                      <div className="text-xs text-gray-400">{student.guardian_email}</div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-gray-500 dark:text-gray-400">
                      {new Date(student.enrollment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`badge ${statusColors[student.status]} text-xs capitalize`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(student)} className="p-1.5 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(student.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="text-xs text-gray-400">{filtered.length} student{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold font-display text-gray-800 dark:text-white">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Student Name</label>
                  <input type="text" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Age</label>
                  <input type="number" min="1" max="6" value={form.age || ''} onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) })} className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Program</label>
                  <select value={form.program || ''} onChange={(e) => setForm({ ...form, program: e.target.value })} className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    {PROGRAMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Guardian Name</label>
                  <input type="text" value={form.guardian_name || ''} onChange={(e) => setForm({ ...form, guardian_name: e.target.value })} placeholder="Parent / guardian name" className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Phone</label>
                  <input type="tel" value={form.guardian_phone || ''} onChange={(e) => setForm({ ...form, guardian_phone: e.target.value })} placeholder="(555) 000-0000" className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Email</label>
                  <input type="email" value={form.guardian_email || ''} onChange={(e) => setForm({ ...form, guardian_email: e.target.value })} placeholder="email@example.com" className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
                  <select value={form.status || 'active'} onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })} className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="flex-1 btn-primary justify-center text-sm py-2.5">
                {editingStudent ? 'Save Changes' : 'Add Student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
