import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X, UserCheck, Mail, Phone } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  role: string;
  speciality: string;
  email: string;
  phone: string;
  experience: number;
  status: 'active' | 'on_leave';
}

const mockTeachers: Teacher[] = [
  { id: '1', name: 'Ms. Sarah Williams', role: 'Head Teacher & Director', speciality: 'Child Development', email: 'sarah.w@littlesteps.edu', phone: '(555) 101-0001', experience: 15, status: 'active' },
  { id: '2', name: 'Mr. James Torres', role: 'Pre-K Lead Educator', speciality: 'STEM & Technology', email: 'james.t@littlesteps.edu', phone: '(555) 101-0002', experience: 8, status: 'active' },
  { id: '3', name: 'Ms. Maya Patel', role: 'Arts & Music Educator', speciality: 'Creative Arts', email: 'maya.p@littlesteps.edu', phone: '(555) 101-0003', experience: 6, status: 'active' },
  { id: '4', name: 'Ms. Lisa Kim', role: 'Toddler Program Lead', speciality: 'Early Development', email: 'lisa.k@littlesteps.edu', phone: '(555) 101-0004', experience: 10, status: 'active' },
  { id: '5', name: 'Mr. David Brown', role: 'Nursery Teacher', speciality: 'Language Arts', email: 'david.b@littlesteps.edu', phone: '(555) 101-0005', experience: 4, status: 'on_leave' },
];

const statusColors: Record<string, string> = {
  active: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300',
  on_leave: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [form, setForm] = useState<Partial<Teacher>>({
    name: '', role: '', speciality: '', email: '', phone: '', experience: 1, status: 'active',
  });

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.role.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingTeacher(null);
    setForm({ name: '', role: '', speciality: '', email: '', phone: '', experience: 1, status: 'active' });
    setShowModal(true);
  };

  const openEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setForm(teacher);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editingTeacher) {
      setTeachers((prev) => prev.map((t) => t.id === editingTeacher.id ? { ...t, ...form } as Teacher : t));
    } else {
      setTeachers((prev) => [{ ...form as Teacher, id: Date.now().toString() }, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Remove this teacher?')) setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-secondary-500" />
            Teachers
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage teaching staff</p>
        </div>
        <button onClick={openAdd} className="btn-secondary text-sm">
          <Plus className="w-4 h-4" />
          Add Teacher
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search teachers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white max-w-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((teacher) => (
          <div key={teacher.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {teacher.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-gray-800 dark:text-white text-sm">{teacher.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{teacher.role}</div>
                </div>
              </div>
              <span className={`badge ${statusColors[teacher.status]} text-xs capitalize`}>
                {teacher.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                {teacher.phone}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-xs font-semibold bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 px-2 py-0.5 rounded-full">{teacher.speciality}</span>
                <div className="text-xs text-gray-400 mt-1">{teacher.experience} yrs experience</div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(teacher)} className="p-1.5 rounded-lg text-gray-400 hover:text-secondary-500 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(teacher.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-extrabold font-display text-gray-800 dark:text-white">
                {editingTeacher ? 'Edit Teacher' : 'Add Teacher'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Ms. Jane Smith' },
                { key: 'role', label: 'Role / Title', type: 'text', placeholder: 'Lead Educator' },
                { key: 'speciality', label: 'Speciality', type: 'text', placeholder: 'Arts & Music' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'teacher@littlesteps.edu' },
                { key: 'phone', label: 'Phone', type: 'tel', placeholder: '(555) 000-0000' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    value={(form as Record<string, unknown>)[field.key] as string || ''}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Years of Experience</label>
                  <input type="number" min="0" value={form.experience || ''} onChange={(e) => setForm({ ...form, experience: parseInt(e.target.value) })} className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
                  <select value={form.status || 'active'} onChange={(e) => setForm({ ...form, status: e.target.value as Teacher['status'] })} className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 btn-secondary justify-center text-sm py-2.5">{editingTeacher ? 'Save Changes' : 'Add Teacher'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
