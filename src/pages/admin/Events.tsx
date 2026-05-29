import { useState } from 'react';
import { Plus, CalendarDays, Trash2, Edit2, X, Clock, MapPin } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

const EVENT_TYPES = ['Event', 'Meeting', 'Field Trip', 'Ceremony', 'Workshop', 'Holiday'];

const typeColors: Record<string, string> = {
  Event: 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  Meeting: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-300',
  'Field Trip': 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
  Ceremony: 'bg-warm-100 text-warm-700 dark:bg-warm-900/40 dark:text-warm-300',
  Workshop: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  Holiday: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

const mockEvents: Event[] = [
  { id: '1', title: 'Spring Concert', description: 'Annual spring music showcase featuring all classes', date: '2025-05-30', time: '10:00 AM', location: 'Main Hall', type: 'Ceremony' },
  { id: '2', title: 'Parent-Teacher Day', description: 'Individual meetings to discuss student progress', date: '2025-06-05', time: '8:00 AM - 4:00 PM', location: 'Classrooms', type: 'Meeting' },
  { id: '3', title: 'Museum of Natural History', description: 'Field trip for Pre-K and Kindergarten students', date: '2025-06-12', time: '9:00 AM', location: 'City Museum', type: 'Field Trip' },
  { id: '4', title: 'Art & Science Fair', description: 'Students showcase their creative projects and science experiments', date: '2025-06-19', time: '11:00 AM', location: 'School Grounds', type: 'Event' },
  { id: '5', title: 'Year-End Graduation', description: 'Celebrating our Kindergarten Ready graduates', date: '2025-06-28', time: '2:00 PM', location: 'Auditorium', type: 'Ceremony' },
];

export default function Events() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<Partial<Event>>({
    title: '', description: '', date: '', time: '', location: '', type: 'Event',
  });

  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const openAdd = () => {
    setEditingEvent(null);
    setForm({ title: '', description: '', date: '', time: '', location: '', type: 'Event' });
    setShowModal(true);
  };

  const openEdit = (event: Event) => {
    setEditingEvent(event);
    setForm(event);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.date) return;
    if (editingEvent) {
      setEvents((prev) => prev.map((e) => e.id === editingEvent.id ? { ...e, ...form } as Event : e));
    } else {
      setEvents((prev) => [...prev, { ...form as Event, id: Date.now().toString() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this event?')) setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const upcoming = sorted.filter((e) => new Date(e.date) >= new Date());
  const past = sorted.filter((e) => new Date(e.date) < new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-accent-500" />
            Events
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Manage school events and activities</p>
        </div>
        <button onClick={openAdd} className="bg-accent-500 hover:bg-accent-600 text-white font-semibold px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-2 shadow-md text-sm">
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-lg font-extrabold font-display text-gray-800 dark:text-white mb-4">
          Upcoming Events ({upcoming.length})
        </h2>
        <div className="space-y-4">
          {upcoming.map((event) => {
            const d = new Date(event.date);
            return (
              <div key={event.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex gap-5 hover:shadow-md transition-all">
                {/* Date Badge */}
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="bg-accent-50 dark:bg-accent-900/30 rounded-xl p-2">
                    <div className="text-xs font-bold text-accent-500 uppercase">{d.toLocaleDateString('en-US', { month: 'short' })}</div>
                    <div className="text-2xl font-extrabold font-display text-gray-800 dark:text-white">{d.getDate()}</div>
                    <div className="text-xs text-gray-400">{d.getFullYear()}</div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold font-display text-gray-800 dark:text-white">{event.title}</h3>
                        <span className={`badge ${typeColors[event.type] || 'bg-gray-100 text-gray-600'} text-xs`}>{event.type}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.description}</p>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3.5 h-3.5" /> {event.time}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin className="w-3.5 h-3.5" /> {event.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => openEdit(event)} className="p-1.5 rounded-lg text-gray-400 hover:text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-900/30 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {upcoming.length === 0 && (
            <div className="text-center py-10 text-gray-400">No upcoming events scheduled.</div>
          )}
        </div>
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h2 className="text-lg font-extrabold font-display text-gray-500 dark:text-gray-500 mb-4">
            Past Events ({past.length})
          </h2>
          <div className="space-y-3">
            {past.map((event) => (
              <div key={event.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 px-5 py-3 flex items-center justify-between opacity-60 hover:opacity-80 transition-opacity">
                <div>
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{event.title}</span>
                  <span className="text-xs text-gray-400 ml-2">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <button onClick={() => handleDelete(event.id)} className="p-1.5 rounded-lg text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-extrabold font-display text-gray-800 dark:text-white">
                {editingEvent ? 'Edit Event' : 'Add Event'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Event Title</label>
                <input type="text" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Spring Concert" className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Description</label>
                <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Date</label>
                  <input type="date" value={form.date || ''} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Time</label>
                  <input type="text" value={form.time || ''} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="10:00 AM" className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Location</label>
                  <input type="text" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Main Hall" className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Type</label>
                  <select value={form.type || 'Event'} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                    {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-full py-2.5 text-sm transition-colors">{editingEvent ? 'Save' : 'Add Event'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
