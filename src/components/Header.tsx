import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  {
    to: "/portfolio",
    label: "Work",
    sub: [
      { to: "/portfolio", label: "All Work" },
      { to: "/journal", label: "Journal" },
      { to: "/press", label: "Press & Awards" },
    ],
  },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/client", label: "Client Login" },
  { to: "/contact", label: "Contact" },
];

const MOBILE_NAV = [
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Booking" },
  { to: "/journal", label: "Journal" },
  { to: "/press", label: "Press" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/client", label: "Client Login" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuRef.current || !menuOpen) return;
    gsap.fromTo(mobileMenuRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(mobileMenuRef.current.querySelectorAll("a"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: "power2.out", delay: 0.1 }
    );
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/92 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
        data-testid="header"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl tracking-wider text-white hover:text-white/80 transition-colors" data-testid="link-logo">
            AMMAR SHAHID
          </Link>

          <nav className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {NAV_LINKS.map((link) => (
              link.sub ? (
                <div key={link.to} className="relative"
                  onMouseEnter={() => setDropdownOpen(link.to)}
                  onMouseLeave={() => setDropdownOpen(null)}>
                  <Link to={link.to}
                    className={`flex items-center gap-1 text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                      location.pathname.startsWith(link.to) ? "text-white" : "text-white/50 hover:text-white/90"
                    }`}>
                    {link.label}
                    <ChevronDown size={11} className={`transition-transform duration-200 ${dropdownOpen === link.to ? "rotate-180" : ""}`} />
                  </Link>
                  {dropdownOpen === link.to && (
                    <div className="absolute top-full left-0 mt-2 bg-black border border-white/10 min-w-[160px] py-1.5">
                      {link.sub.map(sub => (
                        <Link key={sub.to} to={sub.to}
                          className="block px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase text-white/45 hover:text-white hover:bg-white/5 transition-colors">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.to} to={link.to}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                    location.pathname === link.to ? "text-white" : "text-white/50 hover:text-white/90"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/faq"
              className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/60 transition-colors">
              FAQ
            </Link>
            <Link to="/booking"
              className="text-[10px] tracking-[0.25em] uppercase px-5 py-2.5 border border-white/20 text-white/60 hover:text-white hover:border-white/50 transition-all"
              data-testid="link-nav-book">
              Book Now
            </Link>
          </div>

          <button className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" data-testid="button-menu-toggle">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div ref={mobileMenuRef} className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-7" data-testid="nav-mobile">
          {MOBILE_NAV.map((link) => (
            <Link key={link.to} to={link.to}
              className="font-serif text-3xl text-white/80 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
          <Link to="/booking"
            className="mt-4 px-8 py-3 border border-white/25 text-white/60 text-xs tracking-[0.2em] uppercase hover:text-white hover:border-white/50 transition-all">
            Book Now
          </Link>
        </div>
      )}
    </>
  );
}
