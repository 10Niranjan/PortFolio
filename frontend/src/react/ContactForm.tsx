import { useState, type FormEvent } from 'react';

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email me directly.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#3f3f46]/50 text-zinc-200 
                     placeholder:text-zinc-600 focus:outline-none focus:border-[#c4a0ff]/50 focus:ring-1 focus:ring-[#c4a0ff]/20
                     transition-all duration-300 text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#3f3f46]/50 text-zinc-200 
                     placeholder:text-zinc-600 focus:outline-none focus:border-[#c4a0ff]/50 focus:ring-1 focus:ring-[#c4a0ff]/20
                     transition-all duration-300 text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-[#0a0a0b] border border-[#3f3f46]/50 text-zinc-200 
                     placeholder:text-zinc-600 focus:outline-none focus:border-[#c4a0ff]/50 focus:ring-1 focus:ring-[#c4a0ff]/20
                     transition-all duration-300 text-sm resize-none"
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 
                   bg-gradient-to-r from-[#c4a0ff]/20 to-violet-500/20 border border-[#c4a0ff]/30 text-[#c4a0ff]
                   hover:from-[#c4a0ff]/30 hover:to-violet-500/30 hover:border-[#c4a0ff]/50
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
        style={{ boxShadow: '0 0 20px rgba(196, 160, 255, 0.1)' }}
      >
        {status === 'sending' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
