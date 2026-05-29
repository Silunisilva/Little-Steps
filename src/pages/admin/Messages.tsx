import { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Clock, ChevronRight, X, Reply } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  child_age: string | null;
  created_at: string;
}

const mockMessages: ContactMessage[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '(555) 001-0001', subject: 'Schedule a Tour', message: "Hi, I'd love to schedule a tour of the preschool for my daughter Emma. She's 4 years old and we're looking for a Pre-K program starting in September.", child_age: '4 years', created_at: '2025-05-28T09:00:00Z' },
  { id: '2', name: 'Michael Torres', email: 'm.torres@email.com', phone: null, subject: 'Enrollment / Admissions', message: "Hello, I'd like to inquire about the enrollment process for my son Marcus who is 2 years old. We're interested in the Toddler program.", child_age: '2 years', created_at: '2025-05-27T14:30:00Z' },
  { id: '3', name: 'Linda Park', email: 'l.park@email.com', phone: '(555) 003-0003', subject: 'Billing & Payments', message: 'I have a question about the monthly payment schedule and whether you offer any sibling discounts.', child_age: null, created_at: '2025-05-26T11:15:00Z' },
  { id: '4', name: 'David Kim', email: 'd.kim@email.com', phone: '(555) 004-0004', subject: 'General Inquiry', message: 'What is the ratio of teachers to students in your Pre-K program? Also, do you have any openings for this fall semester?', child_age: '3 years', created_at: '2025-05-25T08:45:00Z' },
];

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setMessages(data?.length ? data : mockMessages);
      } catch {
        setMessages(mockMessages);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = diff / (1000 * 60 * 60);
    if (hours < 24) return `${Math.floor(hours)}h ago`;
    if (hours < 48) return 'Yesterday';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-accent-500" />
          Messages
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Contact form submissions from families</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-3">
          {loading ? (
            <div className="py-10 flex justify-center">
              <div className="w-8 h-8 border-2 border-accent-200 border-t-accent-500 rounded-full animate-spin" />
            </div>
          ) : messages.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelected(msg)}
              className={`w-full text-left bg-white dark:bg-gray-900 rounded-2xl border p-4 hover:shadow-md transition-all ${
                selected?.id === msg.id
                  ? 'border-accent-300 dark:border-accent-700 bg-accent-50 dark:bg-accent-900/20'
                  : 'border-gray-100 dark:border-gray-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {msg.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-800 dark:text-white truncate">{msg.name}</p>
                    <p className="text-xs text-gray-400 truncate">{msg.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {formatDate(msg.created_at)}
                </div>
              </div>
              <p className="text-xs font-semibold text-accent-600 dark:text-accent-400 mb-1">{msg.subject}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{msg.message}</p>
              <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-1" />
            </button>
          ))}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white font-bold">
                    {selected.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-extrabold font-display text-gray-800 dark:text-white">{selected.name}</h3>
                    <p className="text-sm text-gray-500">{selected.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 lg:hidden">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-accent-50 dark:bg-accent-900/20 rounded-xl p-4">
                  <p className="text-xs font-bold text-accent-500 uppercase tracking-wide mb-1">Subject</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{selected.subject}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4 text-accent-400" />
                      {selected.phone}
                    </div>
                  )}
                  {selected.child_age && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Child's age: <strong>{selected.child_age}</strong>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    {new Date(selected.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Message</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selected.message}</p>
                </div>
              </div>

              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="btn-primary text-sm inline-flex"
              >
                <Reply className="w-4 h-4" />
                Reply via Email
              </a>
            </div>
          ) : (
            <div className="hidden lg:flex bg-gray-50 dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 h-64 items-center justify-center">
              <div className="text-center">
                <Mail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
