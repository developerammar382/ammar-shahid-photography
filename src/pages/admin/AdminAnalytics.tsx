import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { TrendingUp, Download, Eye, DollarSign, Calendar } from "lucide-react";
import { getAnalyticsData } from "@/data/index";

const COLORS = ["#ffffff", "#ffffff88", "#ffffff55", "#ffffff33"];

function StatCard({ label, value, sub, icon: Icon, trend }: {
  label: string; value: string; sub?: string; icon: typeof TrendingUp; trend?: number;
}) {
  return (
    <div className="bg-[#0a0a0a] border border-white/6 p-6" data-testid={`stat-card-${label.toLowerCase().replace(/\s/g,"-")}`}>
      <div className="flex items-start justify-between mb-4">
        <Icon size={16} className="text-white/30" />
        {trend !== undefined && (
          <span className={`text-[10px] tracking-wider px-2 py-0.5 ${trend >= 0 ? "text-green-400/70 bg-green-400/8" : "text-red-400/70 bg-red-400/8"}`}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <p className="font-serif text-3xl text-white mb-1">{value}</p>
      <p className="text-white/35 text-[10px] tracking-[0.18em] uppercase">{label}</p>
      {sub && <p className="text-white/20 text-xs mt-1">{sub}</p>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black border border-white/12 px-4 py-3 text-xs">
      <p className="text-white/50 mb-2">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-white">{p.name}: <span className="text-white/70">{p.value}</span></p>
      ))}
    </div>
  );
};

export default function AdminAnalytics() {
  const data = getAnalyticsData();
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalBookings = data.reduce((s, d) => s + d.bookings, 0);
  const totalViews = data.reduce((s, d) => s + d.galleryViews, 0);
  const totalDownloads = data.reduce((s, d) => s + d.downloads, 0);

  const categoryData = [
    { name: "Weddings", value: 42 },
    { name: "Editorial", value: 22 },
    { name: "Commercial", value: 18 },
    { name: "Portraits", value: 18 },
  ];

  return (
    <div className="p-8 md:p-10" data-testid="page-admin-analytics">
      <div className="mb-10">
        <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Admin</p>
        <h1 className="font-serif text-4xl text-white">Analytics</h1>
        <p className="text-white/30 text-xs mt-2">12-month overview — dummy data for demonstration</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-10">
        <StatCard label="Total Revenue" value={`$${(totalRevenue / 1000).toFixed(0)}k`} sub="This year" icon={DollarSign} trend={14} />
        <StatCard label="Total Bookings" value={String(totalBookings)} sub="Confirmed & pending" icon={Calendar} trend={8} />
        <StatCard label="Gallery Views" value={`${(totalViews / 1000).toFixed(1)}k`} sub="Across all clients" icon={Eye} trend={22} />
        <StatCard label="Downloads" value={String(totalDownloads)} sub="By all clients" icon={Download} trend={17} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/6 p-6" data-testid="chart-revenue">
          <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-6">Monthly Revenue</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#ffffff60" strokeWidth={1.5}
                fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Booking breakdown pie */}
        <div className="bg-[#0a0a0a] border border-white/6 p-6" data-testid="chart-categories">
          <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-6">Revenue by Category</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" cx="50%" cy="50%"
                innerRadius={45} outerRadius={70} strokeWidth={0}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none" style={{ background: COLORS[i] }} />
                  <span className="text-white/50">{cat.name}</span>
                </div>
                <span className="text-white/40">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Bookings bar chart */}
        <div className="bg-[#0a0a0a] border border-white/6 p-6" data-testid="chart-bookings">
          <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-6">Monthly Bookings</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="bookings" name="Bookings" fill="#ffffff30" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gallery views + downloads line chart */}
        <div className="bg-[#0a0a0a] border border-white/6 p-6" data-testid="chart-engagement">
          <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-6">Gallery Engagement</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="month" tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff30", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="galleryViews" name="Views" stroke="#ffffff60" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="downloads" name="Downloads" stroke="#ffffff30" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="w-5 h-px bg-white/60" /> Views
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="w-5 h-px border-t border-dashed border-white/30" /> Downloads
            </div>
          </div>
        </div>
      </div>

      {/* Monthly breakdown table */}
      <div className="bg-[#0a0a0a] border border-white/6 overflow-hidden mb-2" data-testid="table-monthly">
        <div className="px-6 py-4 border-b border-white/6">
          <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase">Monthly Breakdown</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/5">
                {["Month", "Bookings", "Gallery Views", "Downloads", "Revenue"].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-white/25 tracking-[0.15em] uppercase font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {data.map(row => (
                <tr key={row.month} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-3.5 text-white/70">{row.month}</td>
                  <td className="px-6 py-3.5 text-white/50">{row.bookings}</td>
                  <td className="px-6 py-3.5 text-white/50">{row.galleryViews.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-white/50">{row.downloads}</td>
                  <td className="px-6 py-3.5 text-white/70">${row.revenue.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="border-t border-white/10 bg-white/2">
                <td className="px-6 py-3.5 text-white/40 text-[10px] tracking-wider uppercase">Total</td>
                <td className="px-6 py-3.5 text-white font-medium">{totalBookings}</td>
                <td className="px-6 py-3.5 text-white font-medium">{totalViews.toLocaleString()}</td>
                <td className="px-6 py-3.5 text-white font-medium">{totalDownloads}</td>
                <td className="px-6 py-3.5 text-white font-medium">${totalRevenue.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
