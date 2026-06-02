import { Link } from "react-router-dom";
import { Calendar, BookOpen, Users, Package, ArrowRight, TrendingUp, Clock } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminOverview() {
  const { bookings, posts, clientAlbums, services } = useAdmin();
  const pending = bookings.filter(b => b.status === "pending");
  const confirmed = bookings.filter(b => b.status === "confirmed");

  const stats = [
    { label: "Pending Bookings", value: pending.length, icon: Calendar, color: "text-amber-400", link: "/admin/bookings" },
    { label: "Confirmed Bookings", value: confirmed.length, icon: TrendingUp, color: "text-green-400", link: "/admin/bookings" },
    { label: "Journal Posts", value: posts.length, icon: BookOpen, color: "text-blue-400", link: "/admin/blog" },
    { label: "Client Galleries", value: clientAlbums.length, icon: Users, color: "text-purple-400", link: "/admin/clients" },
    { label: "Service Packages", value: services.length, icon: Package, color: "text-white/60", link: "/admin/services" },
  ];

  return (
    <div className="p-8 md:p-10" data-testid="page-admin-overview">
      <div className="mb-10">
        <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Dashboard</p>
        <h1 className="font-serif text-4xl text-white">Overview</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 mb-10">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <Link key={s.label} to={s.link}
              className="bg-[#0a0a0a] p-6 hover:bg-white/3 transition-colors group"
              data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <Icon size={16} className={`${s.color} mb-4`} />
              <p className="font-serif text-3xl text-white mb-1">{s.value}</p>
              <p className="text-white/35 text-[10px] tracking-[0.15em] uppercase">{s.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="border border-white/8 p-6" data-testid="widget-recent-bookings">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase">Recent Bookings</p>
            <Link to="/admin/bookings" className="text-white/25 hover:text-white/60 text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1">
              View all <ArrowRight size={10} />
            </Link>
          </div>
          <div className="space-y-4">
            {bookings.slice(0, 4).map(b => (
              <div key={b.id} className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm truncate">{b.name}</p>
                  <p className="text-white/30 text-xs">{b.service} — {b.date}</p>
                </div>
                <span className={`shrink-0 text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border ${
                  b.status === "confirmed" ? "border-green-500/30 text-green-400"
                  : b.status === "pending" ? "border-amber-500/30 text-amber-400"
                  : "border-red-500/20 text-red-400/60"
                }`}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="border border-white/8 p-6" data-testid="widget-recent-posts">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase">Journal Posts</p>
            <Link to="/admin/blog" className="text-white/25 hover:text-white/60 text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1">
              View all <ArrowRight size={10} />
            </Link>
          </div>
          <div className="space-y-4">
            {posts.map(p => (
              <div key={p.id} className="flex items-center gap-4">
                <div className="w-10 h-10 overflow-hidden shrink-0">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm truncate">{p.title}</p>
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <Clock size={10} />
                    <span>{p.date}</span>
                    <span>·</span>
                    <span>{p.readTime} min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Galleries */}
        <div className="border border-white/8 p-6" data-testid="widget-client-galleries">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase">Client Galleries</p>
            <Link to="/admin/clients" className="text-white/25 hover:text-white/60 text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1">
              View all <ArrowRight size={10} />
            </Link>
          </div>
          <div className="space-y-4">
            {clientAlbums.map(a => {
              const days = Math.max(0, Math.ceil((new Date(a.expiryDate).getTime() - Date.now()) / 86400000));
              return (
                <div key={a.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 overflow-hidden shrink-0">
                      <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/80 text-sm truncate">{a.clientName}</p>
                      <p className="text-white/30 text-xs">{a.photos.length} photos</p>
                    </div>
                  </div>
                  <span className={`text-[9px] tracking-wider uppercase px-2 py-1 border shrink-0 ${
                    days < 30 ? "border-amber-500/30 text-amber-400/80" : "border-white/15 text-white/35"
                  }`}>
                    {days}d left
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <div className="border border-white/8 p-6" data-testid="widget-quick-links">
          <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-6">Quick Actions</p>
          <div className="space-y-2">
            {[
              { to: "/admin/blog", label: "Write a new post" },
              { to: "/admin/bookings", label: "Review pending bookings" },
              { to: "/admin/services", label: "Update service pricing" },
              { to: "/admin/clients", label: "Manage client galleries" },
              { to: "/", label: "Preview live site ↗", target: "_blank" },
            ].map(item => (
              <Link key={item.to} to={item.to} target={item.target}
                className="flex items-center justify-between py-3 border-b border-white/5 text-white/50 hover:text-white transition-colors text-sm group">
                <span>{item.label}</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
