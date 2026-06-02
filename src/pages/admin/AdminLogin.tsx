import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(".admin-login-el",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login(username.trim(), password);
      if (ok) {
        navigate("/admin");
      } else {
        setLoading(false);
        setError("Invalid credentials. Try admin / admin123");
        if (cardRef.current) {
          gsap.fromTo(cardRef.current, { x: 0 }, { x: [-8, 8, -6, 6, -3, 3, 0] as any, duration: 0.5 });
        }
      }
    }, 700);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6" data-testid="page-admin-login">
      <div ref={cardRef} className="w-full max-w-sm">
        <div className="admin-login-el text-center mb-10">
          <div className="inline-flex items-center justify-center w-11 h-11 border border-white/15 mb-5">
            <Lock size={15} className="text-white/50" />
          </div>
          <h1 className="font-serif text-3xl text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/35 text-xs tracking-wider">Ammar Shahid Photography</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-admin-login">
          <div className="admin-login-el">
            <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-2.5">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full bg-white/5 border border-white/12 px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors"
              data-testid="input-admin-username" />
          </div>
          <div className="admin-login-el">
            <label className="block text-[10px] tracking-[0.25em] uppercase text-white/35 mb-2.5">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/12 px-4 py-3.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/35 transition-colors pr-11"
                data-testid="input-admin-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {error && <p className="mt-2 text-red-400/80 text-xs" data-testid="text-admin-error">{error}</p>}
          </div>
          <div className="admin-login-el pt-1">
            <button type="submit" disabled={!username || !password || loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-all disabled:opacity-40"
              data-testid="button-admin-submit">
              {loading
                ? <span className="flex items-center gap-2"><span className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />Signing in...</span>
                : <>Sign In <ArrowRight size={13} /></>}
            </button>
          </div>
        </form>

        <p className="admin-login-el text-center text-white/15 text-[10px] mt-8 tracking-wider">
          Use <span className="font-mono text-white/25">admin</span> / <span className="font-mono text-white/25">admin123</span>
        </p>
      </div>
    </main>
  );
}
