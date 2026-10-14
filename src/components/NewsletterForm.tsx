import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setMessage('Thank you for subscribing to Letters from Kiroku.');
    setEmail('');
  };

  return (
    <section className="bg-[#F2EFE8] p-10 sm:p-16 border border-[#DDD8CF] my-16">
      <div className="max-w-xl mx-auto text-center space-y-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block">
          Occasional Dispatch
        </span>
        
        <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#292824] tracking-tight">
          Letters from Kiroku
        </h2>
        
        <p className="text-[14px] sm:text-[15px] text-[#77736D] leading-relaxed">
          A quiet note on newly discovered paper mills, ink shades, and mindful stationery culture.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Your email address..."
              aria-label="Email address for newsletter"
              className="flex-1 px-4 py-3 bg-[#FAF9F6] border border-[#DDD8CF] text-sm text-[#292824] placeholder-[#77736D] focus:outline-none focus:border-[#292824]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#292824] hover:bg-[#3D3A35] text-[#FAF9F6] text-[11px] uppercase tracking-[0.16em] font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              Subscribe
            </button>
          </div>

          {status === 'error' && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#A85F4B] pt-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="p-3 bg-[#FAF9F6] border border-[#DDD8CF] text-xs text-[#292824] text-center mt-3">
              <div className="flex items-center justify-center gap-1.5 font-medium text-[#292824]">
                <CheckCircle2 className="w-4 h-4 text-[#A85F4B]" />
                <span>{message}</span>
              </div>
            </div>
          )}

          <p className="text-[11px] uppercase tracking-[0.12em] text-[#77736D] pt-3">
            Pure analog reflections. No spam, ever.
          </p>
        </form>
      </div>
    </section>
  );
}
