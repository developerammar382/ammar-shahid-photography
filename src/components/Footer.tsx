import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/8 py-16 px-6 md:px-10" data-testid="footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <p className="font-serif text-2xl text-white mb-2">Ammar Shahid</p>
          <p className="text-white/35 text-xs tracking-[0.15em] uppercase mb-4">Photography & Visual Storytelling</p>
          <p className="text-white/25 text-xs leading-relaxed">Based in Lahore, Pakistan<br />Available Nationwide & Abroad</p>
        </div>

        {/* Work links */}
        <div>
          <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-4">Work</p>
          <nav className="flex flex-col gap-2.5">
            {[
              { to: "/portfolio", label: "Portfolio" },
              { to: "/journal", label: "Journal" },
              { to: "/press", label: "Press & Awards" },
              { to: "/services", label: "Services" },
            ].map(link => (
              <Link key={link.to} to={link.to}
                className="text-xs tracking-[0.12em] uppercase text-white/35 hover:text-white/70 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Info links */}
        <div>
          <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-4">Info</p>
          <nav className="flex flex-col gap-2.5">
            {[
              { to: "/about", label: "About" },
              { to: "/booking", label: "Book a Session" },
              { to: "/faq", label: "FAQ" },
              { to: "/contact", label: "Contact" },
              { to: "/client", label: "Client Login" },
            ].map(link => (
              <Link key={link.to} to={link.to}
                className="text-xs tracking-[0.12em] uppercase text-white/35 hover:text-white/70 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase mb-4">Contact</p>
          <div className="flex flex-col gap-2.5 text-xs text-white/35">
            <a href="mailto:hello@ammarshahid.pk" className="hover:text-white/65 transition-colors">
              hello@ammarshahid.pk
            </a>
            <span>+92 300 123 4567</span>
            <span className="mt-2 text-white/20">Booking Nov 2025 – Feb 2026</span>
          </div>
          <div className="flex gap-4 mt-5">
            {["Instagram", "Behance", "LinkedIn"].map(s => (
              <a key={s} href="#"
                className="text-white/20 hover:text-white/55 transition-colors uppercase tracking-wider text-[9px]">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/15 text-[10px] tracking-wider">
          &copy; {year} Ammar Shahid Photography. All rights reserved.
        </p>
        <Link to="/admin" className="text-white/10 hover:text-white/25 transition-colors text-[9px] tracking-widest uppercase">
          Admin
        </Link>
      </div>
    </footer>
  );
}
