"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, BookOpen, Heart, GraduationCap } from "lucide-react";
import Spinner from "@/components/Spinner";

const walkForGroups = [
  {
    title: "The girl child",
    description:
      "Girls pushed out of school by poverty, early marriage, or family duties — the most displaced group in our context.",
    Icon: User,
  },
  {
    title: "Almajiri kids",
    description:
      "Children in informal Qur'anic education with limited access to formal schooling or a path to self-sufficiency.",
    Icon: BookOpen,
  },
  {
    title: "Displaced children",
    description:
      "Children in IDP camps and conflict-affected communities whose classrooms, safety, and routines have been stripped away.",
    Icon: Heart,
  },
  {
    title: "Out-of-school adolescents",
    description:
      "Young people who never started or were forced to stop — waiting for a seat, a scholarship, and a second chance to finish.",
    Icon: GraduationCap,
  },
];

type SeatKey = string; // "row-column"

type TakenSeat = { row: number; column: number; full_name: string };

type SeatsResponse = {
  rows: number;
  columns: number;
  price: number;
  taken: TakenSeat[];
};

const keyOf = (row: number, column: number): SeatKey => `${row}-${column}`;

export default function GetASeatPage() {
  const [rows, setRows] = useState(5);
  const [columns, setColumns] = useState(10);
  const [price, setPrice] = useState(500);
  const [taken, setTaken] = useState<Set<SeatKey>>(new Set());
  const [takenNames, setTakenNames] = useState<Record<SeatKey, string>>({});
  const [selected, setSelected] = useState<Set<SeatKey>>(new Set());
  const [loading, setLoading] = useState(true);

  const [showPayment, setShowPayment] = useState(false);
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await fetch("/api/seats");
        if (!res.ok) return;
        const data: SeatsResponse = await res.json();
        setRows(data.rows);
        setColumns(data.columns);
        setPrice(data.price);
        setTaken(new Set(data.taken.map((s) => keyOf(s.row, s.column))));
        const names: Record<SeatKey, string> = {};
        data.taken.forEach((s) => {
          names[keyOf(s.row, s.column)] = s.full_name;
        });
        setTakenNames(names);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, []);

  const toggleSeat = (row: number, column: number) => {
    const key = keyOf(row, column);
    if (taken.has(key)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const openPayment = () => {
    setError("");
    setSuccessMsg("");
    setShowPayment(true);
  };

  const formatCardNumber = (value: string) =>
    value
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPaying(true);

    try {
      const seats = [...selected].map((key) => {
        const [row, column] = key.split("-").map(Number);
        return { row, column };
      });

      const res = await fetch("/api/seats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, cardNumber, expiry, cvv, seats }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409 && Array.isArray(data.taken)) {
          const nowTaken: { row: number; column: number }[] = data.taken;
          setTaken((prev) => {
            const next = new Set(prev);
            nowTaken.forEach((s) => next.add(keyOf(s.row, s.column)));
            return next;
          });
          setSelected((prev) => {
            const next = new Set(prev);
            nowTaken.forEach((s) => next.delete(keyOf(s.row, s.column)));
            return next;
          });
        }
        setError(data.message || "Payment failed. Please try again.");
        return;
      }

      setTaken((prev) => {
        const next = new Set(prev);
        selected.forEach((key) => next.add(key));
        return next;
      });
      setTakenNames((prev) => {
        const next = { ...prev };
        selected.forEach((key) => {
          next[key] = fullName.trim();
        });
        return next;
      });
      setSelected(new Set());
      setShowPayment(false);
      setFullName("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setSuccessMsg(
        `Payment successful! Thank you for supporting a child's education.`
      );
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  const total = selected.size * price;

  return (
    <section className="py-16 px-4 md:px-8 bg-[#F9F8F3] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#0B1F3A] mb-4"
        >
          Get a Seat
        </motion.h2>
        <p className="text-center text-gray-600 mb-10">
          Sponsor a seat for {"\u20A6"}
          {price.toLocaleString()} and it turns golden in your honour. Choose
          one or more seats below.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm text-gray-700">
          <span className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 rounded bg-gray-300" />
            Available
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 rounded bg-[#53CAE9]" />
            Selected
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 rounded bg-gradient-to-br from-yellow-300 to-amber-500" />
            Taken
          </span>
        </div>

        {successMsg && (
          <p className="text-center text-green-600 font-medium mb-6">
            {successMsg}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size={4} color="#53CAE9" />
          </div>
        ) : (
          <>
            {/* Seat grid */}
            <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-8 pb-10 md:pb-12 overflow-x-auto overflow-y-visible">
              <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
                {Array.from({ length: rows }, (_, row) => (
                  <div
                    key={row}
                    className="flex justify-center gap-1.5 sm:gap-2 md:gap-3"
                  >
                    {Array.from({ length: columns }, (_, column) => {
                      const key = keyOf(row, column);
                      const isTaken = taken.has(key);
                      const isSelected = selected.has(key);
                      const payerName = takenNames[key];
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleSeat(row, column)}
                          aria-disabled={isTaken}
                          title={isTaken && payerName ? payerName : undefined}
                          aria-label={
                            isTaken && payerName
                              ? `Seat row ${row + 1}, column ${column + 1}, sponsored by ${payerName}`
                              : `Seat row ${row + 1}, column ${column + 1}${
                                  isTaken ? " (taken)" : ""
                                }`
                          }
                          className={`relative group w-6 h-6 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded sm:rounded-md transition transform ${
                            isTaken
                              ? "bg-gradient-to-br from-yellow-300 to-amber-500 shadow-inner cursor-default"
                              : isSelected
                              ? "bg-[#53CAE9] scale-105 shadow"
                              : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
                          }`}
                        >
                          {isTaken && payerName && (
                            <span
                              role="tooltip"
                              className="pointer-events-none absolute top-full left-1/2 z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0B1F3A] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                            >
                              {payerName}
                              <span className="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent border-b-[#0B1F3A]" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary bar */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow p-5">
              <p className="text-gray-700">
                {selected.size === 0
                  ? "No seats selected"
                  : `${selected.size} seat${selected.size > 1 ? "s" : ""} selected — Total: \u20A6${total.toLocaleString()}`}
              </p>
              <button
                onClick={openPayment}
                disabled={selected.size === 0}
                className="bg-[#C9A227] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#b8911f] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pay {"\u20A6"}
                {total.toLocaleString()}
              </button>
            </div>
          </>
        )}

        {/* Impact section — under the seat grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 border-l-4 border-[#C9A227] pl-5 md:pl-6"
        >
          <p className="text-[#0B1F3A] text-lg md:text-xl leading-relaxed">
            <span className="font-bold">
              27% of Nigerian children are out of school.
            </span>{" "}
            That&apos;s not an abstraction — it&apos;s an empty desk in a
            classroom near you. ICF is working to change that, one child at a
            time, with deliberate placement in safer communities and a
            dual-pathway model that meets every child where they are.
          </p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-gray-200">
          <div className="text-center md:px-6">
            <p className="text-4xl md:text-5xl font-bold text-[#0B1F3A]">500</p>
            <p className="mt-2 text-sm text-gray-500">
              Children waiting for a sponsor this year
            </p>
          </div>
          <div className="text-center md:px-6">
            <p className="text-4xl md:text-5xl font-bold text-[#0B1F3A]">
              {"\u20A6"}50M
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Campaign goal — education, protection, and materials
            </p>
          </div>
          <div className="text-center md:px-6">
            <p className="text-4xl md:text-5xl font-bold text-[#0B1F3A]">
              {"\u20A6"}500
            </p>
            <p className="mt-2 text-sm text-gray-500">
              The cost of one school day for one named child
            </p>
          </div>
        </div>

        <div className="mt-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A227] mb-3">
            Who we walk for
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-[#0B1F3A] mb-3">
            The children behind the empty seats
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Our 2026 campaign focuses on four groups most often pushed to the
            margins of education in Nigeria.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {walkForGroups.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="bg-[#F0EEE6] rounded-xl p-5 md:p-6 flex gap-4"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-[#0B1F3A] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C9A227]" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-bold text-[#0B1F3A] text-lg mb-1">
                    {title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Three ways to give */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 bg-[#0B1F3A] rounded-2xl p-6 md:p-10"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A227] mb-3">
            Three ways to give
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-[#C9A227] mb-3">
            Pick the arm that fits how you give
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl">
            Every option leads to the same outcome: a child&apos;s seat filled.
            Choose the giving style that works for you.
          </p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-300 mb-4">
                Arm 1 &middot; Everyday giving
              </p>
              <h4 className="font-bold text-white text-lg mb-2">
                Buy a school day
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Break sponsorship into daily units. Give {"\u20A6"}500 and see
                exactly what it buys — one funded school day for one named
                child.
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-auto self-start bg-[#C9A227] text-[#0B1F3A] text-sm font-bold px-5 py-2.5 rounded-md hover:bg-[#e0b52e] transition"
              >
                {"\u20A6"}500 / day
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-300 mb-4">
                Arm 2 &middot; Peer-to-peer
              </p>
              <h4 className="font-bold text-white text-lg mb-2">
                Donate your birthday
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Ask friends and family to give to a child&apos;s education
                instead of sending you gifts. One supporter can reach 50+ new
                donors.
              </p>
              <a
                href="/contact"
                className="mt-auto self-start border border-[#C9A227] text-[#C9A227] text-sm font-bold px-5 py-2.5 rounded-md hover:bg-[#C9A227] hover:text-[#0B1F3A] transition"
              >
                Create your page {"\u2192"}
              </a>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 flex flex-col">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-300 mb-4">
                Arm 3 &middot; Moment-based
              </p>
              <h4 className="font-bold text-white text-lg mb-2">
                Do more with happiness
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Promotion. New baby. Exam results. Convert your good news into
                a school day for a child who needs one.
              </p>
              <a
                href="/contact"
                className="mt-auto self-start border border-[#C9A227] text-[#C9A227] text-sm font-bold px-5 py-2.5 rounded-md hover:bg-[#C9A227] hover:text-[#0B1F3A] transition"
              >
                Share your moment {"\u2192"}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Two pathways */}
        <div className="mt-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A227] mb-3">
            Two pathways
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-[#0B1F3A] mb-3">
            Sponsorship that flexes around the child
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Formal school isn&apos;t the only door we open. This year we
            introduce a second equally valid pathway — for children and
            families who need a different kind of start.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            <div className="bg-[#F0EEE6] rounded-xl p-5 md:p-6">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#C9A227] mb-3">
                Pathway 1
              </p>
              <h4 className="font-bold text-[#0B1F3A] text-lg mb-2">
                Formal schooling
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                A classroom seat in a registered school — fees, uniforms,
                books, and daily meals covered so the only thing a child has
                to think about is learning.
              </p>
            </div>

            <div className="bg-[#F0EEE6] rounded-xl p-5 md:p-6">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#C9A227] mb-3">
                Pathway 2
              </p>
              <h4 className="font-bold text-[#0B1F3A] text-lg mb-2">
                Skills &amp; vocational training
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                For older children and those outside the formal system — a
                trade, an apprenticeship, and the literacy and numeracy that
                turn a skill into a livelihood.
              </p>
            </div>
          </div>
        </div>

        {/* Campaign CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 bg-[#C9A227] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-8"
        >
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0B1F3A]">
              Help us reach {"\u20A6"}50 million
            </h3>
            <p className="mt-1 text-[#0B1F3A]/80">
              500 seats. 500 children. One campaign window.
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-[#0B1F3A] leading-none">
              {rows * columns - taken.size}
            </p>
            <p className="text-sm font-semibold text-[#0B1F3A]/80">
              seats to fill
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="self-start md:self-center bg-[#0B1F3A] text-white text-sm font-bold px-6 py-3 rounded-md hover:bg-[#132c50] transition"
          >
            Fill a seat now
          </button>
        </motion.div>
      </div>

      {/* Payment modal (simulated) */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => !paying && setShowPayment(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-[#53CAE9] mb-1">
                Payment Details
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                {selected.size} seat{selected.size > 1 ? "s" : ""} — {"\u20A6"}
                {total.toLocaleString()} (simulated payment, no real charge)
              </p>

              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Adaeze Okafor"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      inputMode="numeric"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      placeholder="123"
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPayment(false)}
                    disabled={paying}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={paying}
                    className="flex-1 bg-[#C9A227] text-white font-semibold py-3 rounded-lg hover:bg-[#b8911f] transition disabled:opacity-60"
                  >
                    {paying ? "Processing..." : `Pay \u20A6${total.toLocaleString()}`}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
