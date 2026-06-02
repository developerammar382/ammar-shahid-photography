import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Calendar, Package, Users, Image,
  LogOut, ChevronRight, BarChart2, Settings, Menu, X,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/bookings", label: "Bookings", icon: Calendar },
  { to: "/admin/clients", label: "Client Galleries", icon: Users },
  { to: "/admin/portfolio", label: "Portfolio", icon: Image },
  { to: "/admin/blog", label: "Journal", icon: BookOpen },
  { to: "/admin/services", label: "Services", icon: Package },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin/login");
  }, [isAuthenticated, navigate]);

  useEffect(() => setMobileOpen(false), [pathname]);

  if (!isAuthenticated) return null;

  const isActive = (nav: typeof NAV[0]) =>
    nav.exact ? pathname === nav.to : pathname.startsWith(nav.to + "/") || pathname === nav.to;

  const SidebarContent = () => (
    <>
      <div className="px-6 py-6 border-b border-white/6">
        <p className="font-serif text-lg text-white">Admin</p>
        <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mt-0.5">Ammar Shahid Photography</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto" data-testid="admin-nav">
        <div className="mb-2 px-5 pt-2">
          <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase">Management</p>
        </div>
        {NAV.slice(0, 6).map(item => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link key={item.to} to={item.to}
              className={`flex items-center gap-3 px-5 py-2.5 text-xs tracking-[0.13em] uppercase transition-colors ${
                active ? "text-white bg-white/6 border-r-2 border-white" : "text-white/35 hover:text-white/70 hover:bg-white/2"
              }`}
              data-testid={`nav-admin-${item.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}

        <div className="mb-2 px-5 pt-5">
          <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase">Insights</p>
        </div>
        {NAV.slice(6).map(item => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link key={item.to} to={item.to}
              className={`flex items-center gap-3 px-5 py-2.5 text-xs tracking-[0.13em] uppercase transition-colors ${
                active ? "text-white bg-white/6 border-r-2 border-white" : "text-white/35 hover:text-white/70 hover:bg-white/2"
              }`}
              data-testid={`nav-admin-${item.label.toLowerCase()}`}>
              <Icon size={14} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/6 px-5 py-4">
        <Link to="/" target="_blank"
          className="flex items-center gap-2 text-white/25 hover:text-white/55 text-[10px] uppercase tracking-wider transition-colors mb-3"
          data-testid="link-view-site">
          <ChevronRight size={11} /> View live site
        </Link>
        <button onClick={() => { logout(); navigate("/admin/login"); }}
          className="flex items-center gap-2 text-white/25 hover:text-red-400/60 text-[10px] uppercase tracking-wider transition-colors"
          data-testid="button-logout">
          <LogOut size={11} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground flex" data-testid="admin-layout">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 bg-black border-r border-white/6 flex-col fixed top-0 bottom-0 left-0 z-40"
        data-testid="admin-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/8 px-5 py-4 flex items-center justify-between">
        <p className="font-serif text-lg text-white">Admin</p>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/40 hover:text-white transition-colors">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black flex flex-col pt-16">
          <SidebarContent />
        </div>
      )}

      {/* Main */}
      <main className="flex-1 md:ml-56 pt-14 md:pt-0 min-h-screen overflow-auto" data-testid="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
