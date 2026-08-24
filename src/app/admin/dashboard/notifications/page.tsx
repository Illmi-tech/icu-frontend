"use client";

import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

type Sponsor = {
  id: number;
  category: string;
  amount: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  organization_name: string | null;
  celebration: string | null;
  school_days: number | null;
  seats_count: number | null;
  is_read: boolean;
  created_at: string;
};

const categoryLabels: Record<string, string> = {
  csr: "CSR",
  general_sponsorship: "General Sponsorship",
  school_day: "Pay a School Day",
  happiness: "Do More With Happiness",
  seat: "Get a Seat",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function SponsorNotificationsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [selected, setSelected] = useState<Sponsor | null>(null);
  const [updating, setUpdating] = useState(false);

  const loadNotifications = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/sponsorships?unread=true", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setSponsors(data.sponsors || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (sponsor: Sponsor) => {
    setSelected(sponsor);
    if (sponsor.is_read) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/sponsorships/${sponsor.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: true }),
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      setSponsors((prev) => prev.filter((item) => item.id !== sponsor.id));
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setSelected({ ...sponsor, is_read: true });
    } catch (error) {
      console.error(error);
      alert("Could not mark notification as read.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Sponsor Notifications
          </h2>
          <p className="text-gray-600 mt-1">
            New sponsorship payments appear here until reviewed.
          </p>
        </div>
        <span className="rounded-full bg-[#0B1F3A] px-3 py-1 text-sm font-semibold text-white">
          {unreadCount} unread
        </span>
      </div>

      {fetching ? (
        <div className="flex justify-center py-16">
          <Spinner size={4} color="#53CAE9" />
        </div>
      ) : sponsors.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 shadow text-center text-gray-500">
          No new sponsor notifications.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            {sponsors.map((sponsor) => (
              <button
                key={sponsor.id}
                type="button"
                onClick={() => markAsRead(sponsor)}
                className={`w-full rounded-2xl bg-white p-5 text-left shadow transition hover:shadow-md border ${
                  selected?.id === sponsor.id
                    ? "border-[#C9A227]"
                    : "border-transparent"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#C9A227]">
                      {categoryLabels[sponsor.category] || sponsor.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-gray-800">
                      {sponsor.organization_name || sponsor.full_name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(sponsor.created_at)}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-[#0B1F3A]">
                    {"\u20A6"}
                    {sponsor.amount.toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow min-h-[280px]">
            {selected ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#C9A227]">
                    {categoryLabels[selected.category] || selected.category}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-gray-800">
                    Payment details
                  </h3>
                  {updating && (
                    <p className="mt-1 text-sm text-gray-500">Marking as read…</p>
                  )}
                </div>

                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-gray-500">Name</dt>
                    <dd className="font-semibold text-gray-800">
                      {selected.full_name}
                    </dd>
                  </div>
                  {selected.organization_name && (
                    <div>
                      <dt className="text-gray-500">Organisation</dt>
                      <dd className="font-semibold text-gray-800">
                        {selected.organization_name}
                      </dd>
                    </div>
                  )}
                  {selected.email && (
                    <div>
                      <dt className="text-gray-500">Email</dt>
                      <dd className="font-semibold text-gray-800">
                        {selected.email}
                      </dd>
                    </div>
                  )}
                  {selected.phone && (
                    <div>
                      <dt className="text-gray-500">Phone</dt>
                      <dd className="font-semibold text-gray-800">
                        {selected.phone}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-gray-500">Amount paid</dt>
                    <dd className="font-semibold text-gray-800">
                      {"\u20A6"}
                      {selected.amount.toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Category</dt>
                    <dd className="font-semibold text-gray-800">
                      {categoryLabels[selected.category] || selected.category}
                    </dd>
                  </div>
                  {selected.school_days != null && (
                    <div>
                      <dt className="text-gray-500">School days</dt>
                      <dd className="font-semibold text-gray-800">
                        {selected.school_days}
                      </dd>
                    </div>
                  )}
                  {selected.seats_count != null && (
                    <div>
                      <dt className="text-gray-500">Seats</dt>
                      <dd className="font-semibold text-gray-800">
                        {selected.seats_count}
                      </dd>
                    </div>
                  )}
                  {selected.celebration && (
                    <div>
                      <dt className="text-gray-500">Celebration</dt>
                      <dd className="font-semibold text-gray-800">
                        {selected.celebration}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-gray-500">Date</dt>
                    <dd className="font-semibold text-gray-800">
                      {formatDate(selected.created_at)}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="text-gray-500">
                Select a notification to see who paid, the amount, and the
                sponsorship category.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
