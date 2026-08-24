"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [fetching, setFetching] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        setFetching(true);
        const res = await fetch("/api/sponsorships", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch sponsors");
        const data = await res.json();
        setSponsors(data.sponsors || []);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    loadSponsors();
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sponsors.filter((sponsor) => {
      const matchesCategory =
        categoryFilter === "all" || sponsor.category === categoryFilter;
      const haystack = [
        sponsor.full_name,
        sponsor.organization_name,
        sponsor.email,
        sponsor.phone,
        categoryLabels[sponsor.category],
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [sponsors, categoryFilter, search]);

  const totalAmount = filtered.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Sponsors</h2>
        <p className="text-gray-600 mt-1">
          Full list of people and organisations who have sponsored through Get a
          Seat.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">Sponsors shown</p>
          <p className="mt-1 text-3xl font-bold text-[#0B1F3A]">
            {filtered.length}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow">
          <p className="text-sm text-gray-500">Total amount</p>
          <p className="mt-1 text-3xl font-bold text-[#0B1F3A]">
            {"\u20A6"}
            {totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, organisation, email..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#53CAE9]"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#53CAE9] bg-white"
        >
          <option value="all">All categories</option>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {fetching ? (
        <div className="flex justify-center py-16">
          <Spinner size={4} color="#53CAE9" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 shadow text-center text-gray-500">
          No sponsors found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Sponsor</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Details</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sponsor) => (
                <tr
                  key={sponsor.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">
                      {sponsor.organization_name || sponsor.full_name}
                    </p>
                    {sponsor.organization_name && (
                      <p className="text-gray-500">{sponsor.full_name}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {categoryLabels[sponsor.category] || sponsor.category}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#0B1F3A]">
                    {"\u20A6"}
                    {sponsor.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <div className="space-y-0.5">
                      {sponsor.email && <p>{sponsor.email}</p>}
                      {sponsor.phone && <p>{sponsor.phone}</p>}
                      {!sponsor.email && !sponsor.phone && (
                        <p className="text-gray-400">—</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {sponsor.school_days != null && (
                      <p>{sponsor.school_days} school day(s)</p>
                    )}
                    {sponsor.seats_count != null && (
                      <p>{sponsor.seats_count} seat(s)</p>
                    )}
                    {sponsor.celebration && <p>{sponsor.celebration}</p>}
                    {sponsor.school_days == null &&
                      sponsor.seats_count == null &&
                      !sponsor.celebration && (
                        <p className="text-gray-400">—</p>
                      )}
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {formatDate(sponsor.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
