import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { getClientAlbums } from "@/data/index";

export default function ClientLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(".login-el",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const album = getClientAlbums(password.trim());
      if (album) {
        navigate(`/client/${album.id}`);
      } else {
        setLoading(false);
        setError("Invalid access code. Please check your email for the correct password.");
        if (cardRef.current) {
          gsap.fromTo(cardRef.current,
            { x: 0 },
            { x: [-8, 8, -6, 6, -4, 4, 0] as any, duration: 0.5, ease: "power2.out" }
          );
        }
      }
    }, 600);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 pt-16" data-testid="page-client-login">
      <div className="w-full max-w-md">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/[0.02] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        <div ref={cardRef} className="relative">
          <div className="login-el text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-white/15 mb-6">
              <Lock size={16} className="text-white/50" />
            </div>
            <h1 className="font-serif text-4xl text-white mb-3">Client Access</h1>
            <p className="text-white/40 text-sm leading-relaxed">
              Enter the access code sent to you<br />after your session was delivered.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-login">
            <div className="login-el">
              <label className="block text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3">
                Access Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your access code"
                  className="w-full bg-white/5 border border-white/15 px-5 py-4 text-white placeholder-white/20 text-sm focus:outline-none focus:border-white/40 transition-colors pr-12"
                  data-testid="input-password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && (
                <p className="mt-3 text-red-400/80 text-xs leading-relaxed" data-testid="text-error">
                  {error}
                </p>
              )}
            </div>

            <div className="login-el">
              <button
                type="submit"
                disabled={!password.trim() || loading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white text-black text-xs tracking-[0.2em] uppercase font-medium transition-all hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed"
                data-testid="button-submit-login"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <>
                    Access Gallery <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="login-el mt-10 pt-8 border-t border-white/8 text-center">
            <p className="text-white/25 text-xs leading-relaxed">
              Don&apos;t have an access code?<br />
              <a href="mailto:hello@ammarshahid.pk" className="text-white/40 hover:text-white/70 transition-colors underline underline-offset-4" data-testid="link-contact-email">
                Contact us
              </a>
            </p>
            <p className="text-white/15 text-[10px] tracking-wider uppercase mt-6">
              Try: <span className="font-mono text-white/25">client2024</span> or <span className="font-mono text-white/25">demo123</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
