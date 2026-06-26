import { useState, useEffect } from 'react';
import { ClipboardList, Search, CheckCircle, XCircle, Clock, Eye, X } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Admission {
  id: string;
  child_name: string;
  child_age: number;
  program: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

const mockAdmissions: Admission[] = [
  { id: '1', child_name: 'Emily Parker', child_age: 4, program: 'Pre-K Adventurers', parent_name: 'Robert Parker', parent_email: 'r.parker@email.com', parent_phone: '(555) 201-0001', message: 'Emily is very sociable and loves to paint. Looking forward to enrollment.', status: 'pending', created_at: '2025-05-26T10:00:00Z' },
  { id: '2', child_name: 'Ethan Nguyen', child_age: 3, program: 'Nursery Stars', parent_name: 'Linda Nguyen', parent_email: 'l.nguyen@email.com', parent_phone: '(555) 201-0002', message: 'Ethan is a curious and energetic boy. Would love for him to start in September.', status: 'pending', created_at: '2025-05-25T09:00:00Z' },
  { id: '3', child_name: 'Sophie Chen', child_age: 5, program: 'Kindergarten Ready', parent_name: 'Angela Chen', parent_email: 'a.chen@email.com', parent_phone: '(555) 201-0003', message: 'Sophie has been reading for a year and loves science experiments.', status: 'approved', created_at: '2025-05-20T14:00:00Z' },
  { id: '4', child_name: 'Marcus Bell', child_age: 2, program: 'Toddler Explorers', parent_name: 'Sandra Bell', parent_email: 's.bell@email.com', parent_phone: '(555) 201-0004', message: 'Looking for a warm environment for Marcus.', status: 'rejected', created_at: '2025-05-18T11:00:00Z' },
];

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  approved: { label: 'Approved', icon: CheckCircle, color: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' },
};

export default function Admissions() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Admission | null>(null);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/admissions`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        setAdmissions(json.data?.length ? json.data : mockAdmissions);
      } catch {
        setAdmissions(mockAdmissions);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissions();
  }, []);

  const updateStatus = (id: string, status: Admission['status']) => {
    setAdmissions((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const filtered = admissions.filter((a) => {
    const matchSearch = a.child_name.toLowerCase().includes(search.toLowerCase()) ||
      a.parent_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: admissions.length,
    pending: admissions.filter((a) => a.status === 'pending').length,
    approved: admissions.filter((a) => a.status === 'approved').length,
    rejected: admissions.filter((a) => a.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-warm-500" />
          Admissions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Review and manage admission requests</p>
      </div>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(counts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              statusFilter === key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300'
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${statusFilter === key ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search admissions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : filtered.map((admission) => {
          const status = statusConfig[admission.status];
          return (
            <div key={admission.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-warm-400 to-warm-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {admission.child_name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-800 dark:text-white">{admission.child_name}</h3>
                      <span className={`badge ${status.color} text-xs`}>
                        <status.icon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      Age {admission.child_age} • {admission.program}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Parent: {admission.parent_name} • {admission.parent_email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Applied {new Date(admission.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSelected(admission)}
                    className="p-2 rounded-xl text-gray-400 hover:text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/30 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {admission.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(admission.id, 'approved')}
                        className="p-2 rounded-xl text-gray-400 hover:text-secondary-500 hover:bg-secondary-50 dark:hover:bg-secondary-900/30 transition-colors"
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateStatus(admission.id, 'rejected')}
                        className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-extrabold font-display text-gray-800 dark:text-white">Admission Details</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Child Name', value: selected.child_name },
                { label: 'Age', value: `${selected.child_age} years old` },
                { label: 'Program Applied', value: selected.program },
                { label: 'Parent Name', value: selected.parent_name },
                { label: 'Email', value: selected.parent_email },
                { label: 'Phone', value: selected.parent_phone },
              ].map((field) => (
                <div key={field.label}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{field.label}</p>
                  <p className="text-sm text-gray-800 dark:text-white mt-0.5">{field.value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Message</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">{selected.message}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Status</p>
                <span className={`badge ${statusConfig[selected.status].color} text-xs mt-1`}>
                  {statusConfig[selected.status].label}
                </span>
              </div>
            </div>

            {selected.status === 'pending' && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => { updateStatus(selected.id, 'rejected'); setSelected(null); }} className="flex-1 py-2.5 rounded-xl border border-red-200 dark:border-red-800 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  Reject
                </button>
                <button onClick={() => { updateStatus(selected.id, 'approved'); setSelected(null); }} className="flex-1 btn-secondary justify-center text-sm py-2.5">
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
