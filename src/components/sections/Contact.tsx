import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Phone, Copy, Check, Send, ArrowUpRight, Clock, Loader2, AlertCircle } from 'lucide-react';
import { InstagramIcon } from '@/components/common/Icons';
import { useMagnetic } from '@/hooks/useMagnetic';
import { usePortfolio } from '@/context/PortfolioContext';

interface ContactProps {
  initialService?: string;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  onMouseEnterProject?: (text: string) => void;
  onMouseLeave?: () => void;
  playClick?: () => void;
  playHover?: () => void;
}

export const Contact: React.FC<ContactProps> = ({
  initialService = '',
  playClick,
  playHover,
}) => {
  const { profile } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: initialService || 'Commercial / Brand Film',
    timeline: 'Within 1 - 2 Weeks',
    details: '',
  });
  const [botField, setBotField] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync initialService when updated (e.g. from modal "Request Similar Edit")
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, projectType: initialService }));
    }
  }, [initialService]);

  const magneticBtnRef = useMagnetic<HTMLButtonElement>(0.4);

  const emailToUse = profile?.email || 'vaishagh.cut@gmail.com';
  const phoneToUse = profile?.phone || '+91 98765 43210';
  const instaHandle = profile?.instagram_handle || '@vaish.aep';
  const instaUrl = profile?.instagram_url || `https://instagram.com/${profile?.instagram_handle?.replace('@', '') || 'vaish.aep'}`;

  const handleCopyEmail = () => {
    playClick?.();
    navigator.clipboard.writeText(emailToUse);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick?.();

    // Spam honeypot trap
    if (botField) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (import.meta.env.DEV) {
        // In local development, simulate successful transmission without Netlify backend
        console.info('[DEV] Netlify form simulated submission:', formData);
        await new Promise((resolve) => setTimeout(resolve, 800));
      } else {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'contact',
            name: formData.name,
            email: formData.email,
            projectType: formData.projectType,
            timeline: formData.timeline,
            details: formData.details,
          }).toString(),
        });

        if (!response.ok) {
          throw new Error(`Submission failed with status: ${response.status}`);
        }
      }

      setSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#E50914', '#F2F0EC', '#FF2A2A', '#ffffff'],
      });
    } catch (err: any) {
      console.error('Netlify form submission error:', err);
      setErrorMessage(
        'Submission could not be delivered automatically. Please retry or click below to open your email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-10 sm:py-16 md:py-24 lg:py-36 bg-[#080808] overflow-hidden">

      {/* Background Red Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E50914]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">

        {/* Giant Editorial Header */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-[#E50914] font-mono-code text-[10px] sm:text-xs tracking-widest uppercase mb-2 sm:mb-4 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-[#E50914]/10 rounded-full border border-[#E50914]/30">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E50914] animate-pulse-red" />
            DIRECT COMMISSIONS &bull; 2026
          </div>

          <h2 className="font-bebas text-[clamp(2.8rem,11vw,10rem)] tracking-tight leading-[0.85] text-[#F2F0EC] uppercase select-none">
            HAVE A PROJECT? <br />
            <span className="text-[#E50914]">LET'S CUT IT.</span>
          </h2>

          <p className="font-space text-xs sm:text-lg md:text-xl text-[#9E9B93] max-w-xl mx-auto mt-2 sm:mt-5">
            Available for freelance video editing, viral short-form systems, commercials, and creative post-production worldwide.
          </p>
        </div>

        {/* Interactive Contact & Inquiry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-start max-w-5xl mx-auto">

          {/* Left: Quick Direct Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-4 font-mono-code text-xs">

            {/* Email Card with 1-Click Copy */}
            <div className="p-3.5 sm:p-5 rounded-xl bg-[#0f0f0f] border border-white/10 flex flex-col gap-1.5 sm:gap-3">
              <span className="text-[#6B6862] uppercase tracking-widest text-[9px] sm:text-[10px]">DIRECT INQUIRY</span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#F2F0EC] truncate">{emailToUse}</span>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={playHover}
                  className="min-h-[40px] min-w-[40px] sm:min-h-[44px] sm:min-w-[44px] p-2 rounded bg-white/5 hover:bg-[#E50914] active:bg-[#E50914] text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copiedEmail && (
                <span className="text-[10px] text-emerald-400 animate-fade-in font-bold">
                  ✓ EMAIL COPIED TO CLIPBOARD
                </span>
              )}
            </div>

            {/* Instagram */}
            <a
              href={instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              className="min-h-[46px] sm:min-h-[52px] p-3.5 sm:p-5 rounded-xl bg-[#0f0f0f] border border-white/10 hover:border-[#E50914] flex items-center justify-between transition-all group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E50914] shrink-0" />
                <div>
                  <span className="text-[#6B6862] block text-[9px] sm:text-[10px] uppercase">INSTAGRAM DM</span>
                  <span className="text-xs sm:text-sm text-[#F2F0EC] group-hover:text-white font-bold">{instaHandle}</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#6B6862] group-hover:text-[#E50914] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Direct Phone / WhatsApp */}
            <div className="p-3.5 sm:p-5 rounded-xl bg-[#0f0f0f] border border-white/10 flex items-center justify-between min-h-[46px] sm:min-h-[52px]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#E50914] shrink-0" />
                <div>
                  <span className="text-[#6B6862] block text-[9px] sm:text-[10px] uppercase">PHONE / WHATSAPP</span>
                  <span className="text-xs sm:text-sm text-[#F2F0EC] font-bold">{phoneToUse}</span>
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#6B6862] bg-white/5 px-2 py-0.5 rounded shrink-0">IST</span>
            </div>

            {/* Guarantee / Turnaround Stamp */}
            <div className="p-3 sm:p-4 rounded-xl bg-[#E50914]/10 border border-[#E50914]/25 flex items-center gap-2.5 sm:gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E50914] shrink-0" />
              <div className="text-[10px] sm:text-[11px] text-[#F2F0EC]">
                <span className="font-bold text-[#E50914] block">RAPID FIRST DRAFT GUARANTEE</span>
                <span>Initial cut review in 24–48 hours for urgent projects.</span>
              </div>
            </div>

          </div>

          {/* Right: Interactive Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0e0e0e] border border-white/15 rounded-xl p-4 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8 sm:py-12 space-y-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center mx-auto text-[#E50914]">
                  <Check className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-bebas text-2xl sm:text-4xl text-[#F2F0EC] tracking-wide">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="font-space text-xs sm:text-sm text-[#9E9B93] max-w-md mx-auto">
                  Thank you for reaching out. I'll review your project details and respond with a timeline &amp; quote within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="min-h-[40px] mt-3 px-5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono-code uppercase tracking-wider text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-3 sm:space-y-4 font-mono-code text-xs"
              >
                {/* Netlify form identification and honeypot */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden" aria-hidden="true">
                  <label>
                    Don't fill this out if you're human:{' '}
                    <input
                      name="bot-field"
                      tabIndex={-1}
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />
                  </label>
                </p>

                <div className="border-b border-white/10 pb-2 flex justify-between items-center text-[#6B6862]">
                  <span>START A PROJECT // COMMISSION BRIEF</span>
                  <span className="text-[#E50914] font-bold">● READY</span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded bg-red-950/70 border border-[#E50914] text-white text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#E50914] shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                    <a
                      href={`mailto:${emailToUse}?subject=${encodeURIComponent('Project Inquiry: ' + formData.projectType)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nTimeline: ${formData.timeline}\nDetails: ${formData.details}`)}`}
                      className="px-3 py-1 bg-[#E50914] hover:bg-[#FF2A2A] rounded text-[10px] font-mono-code font-bold uppercase tracking-wider text-white shrink-0"
                    >
                      Direct Email &rarr;
                    </a>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-1">
                  <div>
                    <label className="block text-[#6B6862] text-[9px] sm:text-[10px] uppercase mb-1 font-medium">YOUR NAME</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full min-h-[44px] bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 sm:p-3 text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B6862] text-[9px] sm:text-[10px] uppercase mb-1 font-medium">YOUR EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. alex@brand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full min-h-[44px] bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 sm:p-3 text-white placeholder-white/20 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className="block text-[#6B6862] text-[9px] sm:text-[10px] uppercase mb-1 font-medium">PROJECT TYPE</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full min-h-[44px] bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 sm:p-3 text-white outline-none transition-colors"
                    >
                      {!['Commercial / Brand Film', 'Viral Short-Form Reels Package', 'Kinetic Motion Graphics / Titles', 'Event / Conference Recap', 'Color Grading & Sound Polish', 'Full YouTube Retainer'].includes(formData.projectType) && (
                        <option value={formData.projectType}>{formData.projectType}</option>
                      )}
                      <option>Commercial / Brand Film</option>
                      <option>Viral Short-Form Reels Package</option>
                      <option>Kinetic Motion Graphics / Titles</option>
                      <option>Event / Conference Recap</option>
                      <option>Color Grading &amp; Sound Polish</option>
                      <option>Full YouTube Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#6B6862] text-[9px] sm:text-[10px] uppercase mb-1 font-medium">TIMELINE</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full min-h-[44px] bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 sm:p-3 text-white outline-none transition-colors"
                    >
                      <option>Urgent (Within 48h - 3 Days)</option>
                      <option>Within 1 - 2 Weeks</option>
                      <option>Flexible / Next Month</option>
                      <option>Ongoing Monthly Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#6B6862] text-[9px] sm:text-[10px] uppercase mb-1 font-medium">PROJECT DETAILS / FOOTAGE LINKS</label>
                  <textarea
                    rows={2}
                    name="details"
                    placeholder="Tell me about your footage, duration, reference styles, or goals..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded p-2.5 sm:p-3 text-white placeholder-white/20 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  ref={magneticBtnRef}
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={playHover}
                  className="w-full min-h-[48px] py-3 sm:py-4 bg-[#E50914] hover:bg-[#FF2A2A] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bebas text-lg sm:text-2xl tracking-wider rounded transition-all shadow-[0_0_25px_rgba(229,9,20,0.5)] flex items-center justify-center gap-2.5 cursor-pointer mt-2 sm:mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>TRANSMITTING BRIEF...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT PROJECT BRIEF</span>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
