import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  childAge: string;
}

const contactInfo = [
  { icon: MapPin, title: 'Address', value: '123 Sunshine Lane, Maplewood, CA 90210', color: 'text-primary-500 bg-primary-50' },
  { icon: Phone, title: 'Phone', value: '(555) 123-4567', color: 'text-secondary-500 bg-secondary-50' },
  { icon: Mail, title: 'Email', value: 'hello@littlesteps.edu', color: 'text-accent-500 bg-accent-50' },
  { icon: Clock, title: 'Hours', value: 'Mon–Fri: 7AM–6PM | Sat: 8AM–12PM', color: 'text-warm-500 bg-warm-50' },
];

const subjects = [
  'General Inquiry',
  'Enrollment / Admissions',
  'Schedule a Tour',
  'Program Information',
  'After School Care',
  'Billing & Payments',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    childAge: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const parts = form.name.split(' ');
      const firstName = parts[0];
      const lastName = parts.slice(1).join(' ') || ' ';
      
      const payloadMessage = form.childAge 
        ? `${form.message}\n\nChild's Age: ${form.childAge}` 
        : form.message;

      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email,
          phone: form.phone || 'N/A',
          subject: form.subject,
          message: payloadMessage,
          type: 'general'
        })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Error submitting contact form');
      
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '', childAge: '' });
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-50 dark:bg-accent-900/30 rounded-full px-4 py-1.5 mb-6">
            <MessageSquare className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-semibold text-accent-600 dark:text-accent-400">Get In Touch</span>
          </div>
          <h1 className="section-title dark:text-white mb-6">
            We had Love to{' '}
            <span className="text-gradient">Hear From You</span>
          </h1>
          <p className="section-subtitle dark:text-gray-400 mx-auto">
            Have questions? Want to schedule a tour? Our friendly team is here to help every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info) => (
              <div key={info.title} className="card p-6 dark:bg-gray-800 hover:-translate-y-1 transition-all">
                <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                  <info.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-1">{info.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{info.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="card p-8 dark:bg-gray-800">
              <h2 className="text-2xl font-extrabold font-display text-gray-800 dark:text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
                We typically respond within 24 hours on business days.
              </p>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-secondary-50 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-secondary-500" />
                  </div>
                  <h3 className="text-xl font-extrabold font-display text-gray-800 dark:text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Thank you for reaching out. We'll get back to you very soon!
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-primary text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Smith"
                        className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                        className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Child's Age
                      </label>
                      <input
                        type="text"
                        name="childAge"
                        value={form.childAge}
                        onChange={handleChange}
                        placeholder="e.g., 3 years old"
                        className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="input-field dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="card overflow-hidden dark:bg-gray-800 h-72">
                <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex flex-col items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mx-auto">
                      <MapPin className="w-8 h-8 text-primary-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 dark:text-gray-200">123 Sunshine Lane</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Maplewood, CA 90210</p>
                    </div>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                  {/* Grid pattern */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }} />
                </div>
              </div>

              {/* FAQ */}
              <div className="card p-6 dark:bg-gray-800 space-y-4">
                <h3 className="font-extrabold font-display text-gray-800 dark:text-white">Frequently Asked</h3>
                {[
                  { q: 'When can I schedule a tour?', a: 'Tours are available Monday–Friday between 9 AM and 3 PM. Call or email us to book.' },
                  { q: 'What is the enrollment process?', a: 'Complete our online form, attend a tour, then submit enrollment documents. Spots fill quickly!' },
                  { q: 'Is there a waitlist?', a: 'Yes, we maintain a waitlist for popular programs. Apply early to secure your spot.' },
                ].map((faq) => (
                  <div key={faq.q} className="border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                    <p className="font-semibold text-sm text-gray-800 dark:text-white mb-1">{faq.q}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
