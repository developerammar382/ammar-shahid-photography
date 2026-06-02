import { useState } from "react";
import { Check, X, Clock, Mail, MessageSquare, ChevronDown } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { Booking } from "@/data/index";

const STATUS_COLORS: Record<Booking["status"], string> = {
  pending: "border-amber-500/30 text-amber-400",
  confirmed: "border-green-500/30 text-green-400",
  declined: "border-red-500/20 text-red-400/60",
};

export default function AdminBookings() {
  const { bookings, updateBookingStatus } = useAdmin();
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.status === filter);

  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    declined: bookings.filter(b => b.status === "declined").length,
  };

  return (
    <div className="p-8 md:p-10" data-testid="page-admin-bookings">
      <div className="mb-10">
        <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">Admin</p>
        <h1 className="font-serif text-4xl text-white">Bookings</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-0 border-b border-white/8 mb-8">
        {(["all", "pending", "confirmed", "declined"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-3 text-xs tracking-[0.18em] uppercase transition-colors border-b-2 -mb-px ${
              filter === f ? "border-white text-white" : "border-transparent text-white/30 hover:text-white/60"
            }`} data-testid={`filter-${f}`}>
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Bookings list */}
      <div className="divide-y divide-white/5" data-testid="bookings-list">
        {filtered.map(b => (
          <div key={b.id} className="py-5" data-testid={`booking-${b.id}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <p className="text-white font-medium">{b.name}</p>
                  <span className={`text-[9px] tracking-[0.15em] uppercase px-2.5 py-1 border ${STATUS_COLORS[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-white/35 text-xs flex-wrap">
                  <span className="flex items-center gap-1.5"><Mail size={10} />{b.email}</span>
                  <span className="flex items-center gap-1.5"><Clock size={10} />{b.date}</span>
                  <span>{b.service}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {b.status === "pending" && (
                  <>
                    <button onClick={() => updateBookingStatus(b.id, "confirmed")}
                      className="flex items-center gap-1.5 px-3 py-2 bg-green-500/15 border border-green-500/30 text-green-400 text-[10px] uppercase tracking-wider hover:bg-green-500/25 transition-colors"
                      data-testid={`button-confirm-${b.id}`}>
                      <Check size={11} /> Confirm
                    </button>
                    <button onClick={() => updateBookingStatus(b.id, "declined")}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400/70 text-[10px] uppercase tracking-wider hover:bg-red-500/20 transition-colors"
                      data-testid={`button-decline-${b.id}`}>
                      <X size={11} /> Decline
                    </button>
                  </>
                )}
                {b.status !== "pending" && (
                  <button onClick={() => updateBookingStatus(b.id, "pending")}
                    className="text-white/25 hover:text-white/50 text-[10px] uppercase tracking-wider transition-colors px-3 py-2 border border-white/10"
                    data-testid={`button-reset-${b.id}`}>
                    Reset
                  </button>
                )}
                <button onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                  className="p-2 text-white/30 hover:text-white/60 transition-colors"
                  data-testid={`button-expand-${b.id}`}>
                  <ChevronDown size={14} className={`transition-transform ${expanded === b.id ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {expanded === b.id && (
              <div className="mt-4 ml-0 border-l-2 border-white/8 pl-5" data-testid={`booking-detail-${b.id}`}>
                <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                  <MessageSquare size={10} /> Message
                </p>
                <p className="text-white/60 text-sm leading-relaxed">{b.message}</p>
                <p className="text-white/20 text-[10px] mt-3">
                  Received {new Date(b.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-white/25 py-12 text-center text-sm">No {filter === "all" ? "" : filter} bookings.</p>
        )}
      </div>
    </div>
  );
}
