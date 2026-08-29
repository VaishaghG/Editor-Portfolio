import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AdminLogin: React.FC = () => {
  const { user, signIn, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    const res = await signIn(email, password);
    setIsLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 selection:bg-[#E50914] selection:text-white font-sans relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0f0f0f] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#E50914]/10 border border-[#E50914]/30 text-[#E50914] mb-4 shadow-[0_0_20px_rgba(229,9,20,0.3)]">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-bebas text-3xl sm:text-4xl tracking-wide text-white">
            ADMIN <span className="text-[#E50914]">CONTROL PANEL</span>
          </h1>
          <p className="font-mono-code text-xs text-[#9E9B93] mt-1">
            VAISHAGH G. // PRIVATE CMS LOGIN
          </p>
        </div>

        {/* Status notice */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono-code text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>SUPABASE CONFIGURATION NOTICE</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              To connect your real backend, add your <code className="bg-black/50 px-1 py-0.5 rounded text-white">VITE_SUPABASE_URL</code> and <code className="bg-black/50 px-1 py-0.5 rounded text-white">VITE_SUPABASE_ANON_KEY</code> to the <code className="bg-black/50 px-1 py-0.5 rounded text-white">.env</code> file and run <code className="bg-black/50 px-1 py-0.5 rounded text-white">supabase/schema.sql</code>.
            </p>
            <div className="pt-1">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-white font-bold underline hover:text-[#E50914]"
              >
                <span>Enter CMS in Preview Mode</span> &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono-code text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono-code text-xs">
          <div>
            <label className="block text-[#9E9B93] uppercase tracking-wider text-[10px] mb-1.5 font-medium">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6862]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vaishagh.com"
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded-lg py-3 pl-10 pr-3.5 text-white placeholder-white/20 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#9E9B93] uppercase tracking-wider text-[10px] mb-1.5 font-medium">
              PASSWORD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6862]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#161616] border border-white/10 focus:border-[#E50914] rounded-lg py-3 pl-10 pr-10 text-white placeholder-white/20 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B6862] hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#E50914] hover:bg-[#FF2A2A] active:scale-98 text-white font-bebas text-xl tracking-wider rounded-lg transition-all shadow-[0_0_25px_rgba(229,9,20,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>SIGN IN TO DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-[#6B6862]">
          <Link to="/" className="hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
          <span>VG-CMS 2026</span>
        </div>

      </div>
    </div>
  );
};
