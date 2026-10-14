import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'Recommendation',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('success');
    setForm({ name: '', email: '', subject: 'Recommendation', message: '' });
  };

  return (
    <>
      <SEOHead
        title="Contact & Reader Letters — Kiroku"
        description="Get in touch with Kiroku Editorial. Share stationery recommendations, reader letters, and editorial inquiries."
        canonicalPath="/contact"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block">
            Correspondence
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-light text-[#292824] tracking-tight">
            Letters to the Desk
          </h1>
          <p className="text-[15px] text-[#77736D] leading-relaxed">
            Have a rare Japanese notebook you cherish, a question about fountain pen ink compatibility, or an editorial inquiry? We read every letter with care.
          </p>
        </div>

        <div className="bg-[#FAF9F6] border border-[#DDD8CF] p-8 sm:p-12">
          {status === 'success' ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-[#F2EFE8] text-[#292824] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#A85F4B]" />
              </div>
              <h2 className="text-2xl font-serif font-light text-[#292824]">
                Thank you for your letter
              </h2>
              <p className="text-sm text-[#77736D] max-w-md mx-auto leading-relaxed">
                Your message has been received at the Kiroku desk. We respond thoughtfully to all reader inquiries and stationery recommendations.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-6 px-6 py-2.5 bg-[#292824] text-[#FAF9F6] text-[11px] uppercase tracking-[0.16em] font-medium hover:bg-[#3D3A35] transition-colors cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.14em] text-[#77736D] font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Haruto Tanaka"
                    className="w-full px-4 py-3 bg-white border border-[#DDD8CF] text-sm text-[#292824] placeholder-[#77736D] focus:outline-none focus:border-[#292824]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.14em] text-[#77736D] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-white border border-[#DDD8CF] text-sm text-[#292824] placeholder-[#77736D] focus:outline-none focus:border-[#292824]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[11px] uppercase tracking-[0.14em] text-[#77736D] font-medium mb-2">
                  Subject / Topic
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CF] text-sm text-[#292824] focus:outline-none focus:border-[#292824]"
                >
                  <option value="Recommendation">Stationery Recommendation / Tip</option>
                  <option value="Question">Paper / Pen Compatibility Question</option>
                  <option value="Editorial">Editorial Feedback / Correction</option>
                  <option value="Press">Brand Sample / Press Inquiry</option>
                  <option value="Other">General Reader Letter</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] uppercase tracking-[0.14em] text-[#77736D] font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share your thoughts, notebook discoveries, or questions..."
                  className="w-full px-4 py-3 bg-white border border-[#DDD8CF] text-sm text-[#292824] placeholder-[#77736D] focus:outline-none focus:border-[#292824]"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-[#FAF9F6] border border-[#A85F4B] text-xs text-[#A85F4B]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#292824] hover:bg-[#3D3A35] text-[#FAF9F6] text-[11px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Letter</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
