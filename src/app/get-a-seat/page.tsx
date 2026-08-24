"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Heart,
  GraduationCap,
  Building2,
  HandHeart,
  ArrowRight,
  ChevronDown,
  Minus,
  Plus,
} from "lucide-react";
import Spinner from "@/components/Spinner";

// Landscape campaign photos — drop the files in public/get-a-seat/
const slides = [
  {
    image: "/get-a-seat/slide1.webp",
    title: "Walk In Their Shoes",
    text: "A nationwide initiative restoring access to learning for out-of-school children in Nigeria.",
  },
  {
    image: "/get-a-seat/slide2.webp",
    title: "500+ Children Sponsored",
    text: "Full sponsorship from basic to tertiary education since 2022.",
  },
  {
    image: "/get-a-seat/slide3.webp",
    title: "Removing Barriers",
    text: "Support covers tuition, learning materials, and feeding.",
  },
  {
    image: "/get-a-seat/slide4.webp",
    title: "Transparent Crowdfunding",
    text: "Connecting individuals and organisations directly to children in need.",
  },
  {
    image: "/get-a-seat/slide5.webp",
    title: "Expanding Access",
    text: "Safe, inclusive, and sustainable education pathways across underserved communities.",
  },
];

const corporateAmounts = [
  { label: "\u20A61,000,000", amount: 1_000_000 },
  { label: "\u20A62,000,000", amount: 2_000_000 },
  { label: "\u20A63,000,000", amount: 3_000_000 },
  { label: "\u20A65,000,000", amount: 5_000_000 },
  { label: "\u20A610,000,000", amount: 10_000_000 },
];

const csrDescription =
  "Align your organisation\u2019s social impact goals with initiatives that improve education access and create opportunities for underserved children and young people.";

const SCHOOL_DAY_PRICE = 1000;

const individualOptions = [
  {
    id: "school-day" as const,
    title: "Pay a School Day",
    description: `Fund one school day for a named child at \u20A6${SCHOOL_DAY_PRICE.toLocaleString()}.`,
  },
  {
    id: "happiness" as const,
    title: "Do More With Happiness",
    description:
      "Turn a celebration or milestone into a gift of education.",
  },
];

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

  const [showCorporatePayment, setShowCorporatePayment] = useState(false);
  const [corporateAmount, setCorporateAmount] = useState(0);
  const [isCustomCorporateAmount, setIsCustomCorporateAmount] = useState(false);
  const [customAmountInput, setCustomAmountInput] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgPhone, setOrgPhone] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgCardNumber, setOrgCardNumber] = useState("");
  const [orgExpiry, setOrgExpiry] = useState("");
  const [orgCvv, setOrgCvv] = useState("");
  const [corporatePaying, setCorporatePaying] = useState(false);
  const [corporateError, setCorporateError] = useState("");
  const [corporateSuccessMsg, setCorporateSuccessMsg] = useState("");
  const [csrExpanded, setCsrExpanded] = useState(false);

  const [showSchoolDayPayment, setShowSchoolDayPayment] = useState(false);
  const [schoolDays, setSchoolDays] = useState(1);
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorCardNumber, setDonorCardNumber] = useState("");
  const [donorExpiry, setDonorExpiry] = useState("");
  const [donorCvv, setDonorCvv] = useState("");
  const [schoolDayPaying, setSchoolDayPaying] = useState(false);
  const [schoolDayError, setSchoolDayError] = useState("");
  const [schoolDaySuccessMsg, setSchoolDaySuccessMsg] = useState("");

  const [showHappinessPayment, setShowHappinessPayment] = useState(false);
  const [celebration, setCelebration] = useState("");
  const [happinessAmountInput, setHappinessAmountInput] = useState("");
  const [happinessName, setHappinessName] = useState("");
  const [happinessPhone, setHappinessPhone] = useState("");
  const [happinessEmail, setHappinessEmail] = useState("");
  const [happinessCardNumber, setHappinessCardNumber] = useState("");
  const [happinessExpiry, setHappinessExpiry] = useState("");
  const [happinessCvv, setHappinessCvv] = useState("");
  const [happinessPaying, setHappinessPaying] = useState(false);
  const [happinessError, setHappinessError] = useState("");
  const [happinessSuccessMsg, setHappinessSuccessMsg] = useState("");

  const [slideIndex, setSlideIndex] = useState(0);

  // Auto-advance the banner slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const openCorporatePayment = (amount?: number) => {
    setCorporateError("");
    setCorporateSuccessMsg("");
    const custom = amount == null;
    setIsCustomCorporateAmount(custom);
    setCorporateAmount(custom ? 0 : amount);
    setCustomAmountInput("");
    setOrgName("");
    setOrgPhone("");
    setOrgEmail("");
    setOrgCardNumber("");
    setOrgExpiry("");
    setOrgCvv("");
    setShowCorporatePayment(true);
  };

  const openSchoolDayPayment = () => {
    setSchoolDayError("");
    setSchoolDaySuccessMsg("");
    setSchoolDays(1);
    setDonorName("");
    setDonorPhone("");
    setDonorEmail("");
    setDonorCardNumber("");
    setDonorExpiry("");
    setDonorCvv("");
    setShowSchoolDayPayment(true);
  };

  const openHappinessPayment = () => {
    setHappinessError("");
    setHappinessSuccessMsg("");
    setCelebration("");
    setHappinessAmountInput("");
    setHappinessName("");
    setHappinessPhone("");
    setHappinessEmail("");
    setHappinessCardNumber("");
    setHappinessExpiry("");
    setHappinessCvv("");
    setShowHappinessPayment(true);
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

  const formatPhone = (value: string) =>
    value.replace(/[^\d+\s()-]/g, "").slice(0, 20);

  const formatAmountInput = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 12);
    if (!digits) return "";
    return Number(digits).toLocaleString();
  };

  const handleCorporatePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setCorporateError("");

    const name = orgName.trim();
    const phone = orgPhone.trim();
    const email = orgEmail.trim();
    const card = orgCardNumber.replace(/\s/g, "");
    const exp = orgExpiry.trim();
    const cvvValue = orgCvv.trim();
    const amount = isCustomCorporateAmount
      ? Number(customAmountInput.replace(/\D/g, ""))
      : corporateAmount;

    if (isCustomCorporateAmount && (!amount || amount < 1)) {
      setCorporateError("Enter the amount you want to pay.");
      return;
    }
    if (!name) {
      setCorporateError("Organisation name is required.");
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      setCorporateError("Enter a valid phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCorporateError("Enter a valid email address.");
      return;
    }
    if (!/^\d{13,19}$/.test(card)) {
      setCorporateError("Enter a valid card number.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
      setCorporateError("Invalid expiry date (use MM/YY).");
      return;
    }
    if (!/^\d{3,4}$/.test(cvvValue)) {
      setCorporateError("Enter a valid CVV.");
      return;
    }

    setCorporatePaying(true);
    try {
      const res = await fetch("/api/sponsorships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: isCustomCorporateAmount ? "general_sponsorship" : "csr",
          amount,
          fullName: name,
          organizationName: name,
          email,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCorporateError(data.message || "Payment failed. Please try again.");
        return;
      }
      setShowCorporatePayment(false);
      setOrgName("");
      setOrgPhone("");
      setOrgEmail("");
      setOrgCardNumber("");
      setOrgExpiry("");
      setOrgCvv("");
      setCustomAmountInput("");
      setCorporateSuccessMsg(
        `Payment successful! Thank you, ${name}, for sponsoring \u20A6${amount.toLocaleString()}.`
      );
    } catch {
      setCorporateError("Something went wrong. Please try again.");
    } finally {
      setCorporatePaying(false);
    }
  };

  const schoolDayTotal = schoolDays * SCHOOL_DAY_PRICE;

  const handleSchoolDayPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setSchoolDayError("");

    const name = donorName.trim();
    const phone = donorPhone.trim();
    const email = donorEmail.trim();
    const card = donorCardNumber.replace(/\s/g, "");
    const exp = donorExpiry.trim();
    const cvvValue = donorCvv.trim();

    if (!Number.isInteger(schoolDays) || schoolDays < 1) {
      setSchoolDayError("Select at least 1 school day.");
      return;
    }
    if (!name) {
      setSchoolDayError("Full name is required.");
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      setSchoolDayError("Enter a valid phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSchoolDayError("Enter a valid email address.");
      return;
    }
    if (!/^\d{13,19}$/.test(card)) {
      setSchoolDayError("Enter a valid card number.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
      setSchoolDayError("Invalid expiry date (use MM/YY).");
      return;
    }
    if (!/^\d{3,4}$/.test(cvvValue)) {
      setSchoolDayError("Enter a valid CVV.");
      return;
    }

    setSchoolDayPaying(true);
    try {
      const res = await fetch("/api/sponsorships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "school_day",
          amount: schoolDayTotal,
          fullName: name,
          email,
          phone,
          schoolDays,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSchoolDayError(data.message || "Payment failed. Please try again.");
        return;
      }
      setShowSchoolDayPayment(false);
      setSchoolDays(1);
      setDonorName("");
      setDonorPhone("");
      setDonorEmail("");
      setDonorCardNumber("");
      setDonorExpiry("");
      setDonorCvv("");
      setSchoolDaySuccessMsg(
        `Payment successful! Thank you, ${name}, for funding ${schoolDays} school day${
          schoolDays > 1 ? "s" : ""
        } (\u20A6${schoolDayTotal.toLocaleString()}).`
      );
    } catch {
      setSchoolDayError("Something went wrong. Please try again.");
    } finally {
      setSchoolDayPaying(false);
    }
  };

  const happinessAmount = Number(happinessAmountInput.replace(/\D/g, "") || 0);

  const handleHappinessPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setHappinessError("");

    const occasion = celebration.trim();
    const name = happinessName.trim();
    const phone = happinessPhone.trim();
    const email = happinessEmail.trim();
    const card = happinessCardNumber.replace(/\s/g, "");
    const exp = happinessExpiry.trim();
    const cvvValue = happinessCvv.trim();

    if (!occasion) {
      setHappinessError("Tell us what you are celebrating.");
      return;
    }
    if (!happinessAmount || happinessAmount < 1) {
      setHappinessError("Enter the amount you want to pay.");
      return;
    }
    if (!name) {
      setHappinessError("Full name is required.");
      return;
    }
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      setHappinessError("Enter a valid phone number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setHappinessError("Enter a valid email address.");
      return;
    }
    if (!/^\d{13,19}$/.test(card)) {
      setHappinessError("Enter a valid card number.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
      setHappinessError("Invalid expiry date (use MM/YY).");
      return;
    }
    if (!/^\d{3,4}$/.test(cvvValue)) {
      setHappinessError("Enter a valid CVV.");
      return;
    }

    setHappinessPaying(true);
    try {
      const res = await fetch("/api/sponsorships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "happiness",
          amount: happinessAmount,
          fullName: name,
          email,
          phone,
          celebration: occasion,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHappinessError(data.message || "Payment failed. Please try again.");
        return;
      }
      setShowHappinessPayment(false);
      setCelebration("");
      setHappinessAmountInput("");
      setHappinessName("");
      setHappinessPhone("");
      setHappinessEmail("");
      setHappinessCardNumber("");
      setHappinessExpiry("");
      setHappinessCvv("");
      setHappinessSuccessMsg(
        `Payment successful! Thank you, ${name}, for celebrating "${occasion}" with \u20A6${happinessAmount.toLocaleString()}.`
      );
    } catch {
      setHappinessError("Something went wrong. Please try again.");
    } finally {
      setHappinessPaying(false);
    }
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
    <section className="bg-[#F9F8F3] min-h-screen">
      {/* Walk in Their Shoes banner slideshow */}
      <div className="relative w-full overflow-hidden bg-[#0B1F3A] text-white">
        <div className="hidden">
          {slides.map((slide) => (
            <Image
              key={slide.image}
              src={slide.image}
              alt=""
              width={1}
              height={1}
              quality={70}
              priority={false}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[slideIndex].image}
              alt={slides[slideIndex].title}
              fill
              className="object-cover"
              quality={80}
              priority={slideIndex === 0}
            />
            <div className="absolute inset-0 bg-black/45" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <motion.div
            key={`text-${slideIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#C9A227] mb-4">
              ICF Campaign {"\u00B7"} Since 2022
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {slides[slideIndex].title}
            </h1>
            <p className="text-base md:text-xl text-gray-100 max-w-2xl mx-auto">
              {slides[slideIndex].text}
            </p>
            <div className="mt-8 h-1 w-24 mx-auto rounded-full bg-[#C9A227]" />
          </motion.div>

          <div className="mt-8 flex justify-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === slideIndex
                    ? "w-6 bg-[#C9A227]"
                    : "w-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#0B1F3A] leading-snug max-w-2xl mx-auto">
            Help us reach 500 Children in need of quality education through
            this scholarship
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-gray-200">
            <div className="text-center md:px-6">
              <p className="text-4xl md:text-5xl font-bold text-[#0B1F3A]">
                500
              </p>
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
                {"\u20A6"}1,000
              </p>
              <p className="mt-2 text-sm text-gray-500">
                The cost of one school day for one named child
              </p>
            </div>
          </div>
        </motion.div>

        <motion.h2
          id="get-a-seat"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#0B1F3A] mb-4 scroll-mt-24"
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

        {/* Sponsorship options */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A227] mb-3">
            Sponsorship
          </p>
          <h3 className="text-2xl md:text-4xl font-bold text-[#0B1F3A] mb-3">
            Choose how you want to give
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Whether you give as an organisation or as an individual, every
            contribution helps fill an empty seat.
          </p>

          {corporateSuccessMsg && (
            <p className="mb-6 text-center text-green-600 font-medium">
              {corporateSuccessMsg}
            </p>
          )}
          {schoolDaySuccessMsg && (
            <p className="mb-6 text-center text-green-600 font-medium">
              {schoolDaySuccessMsg}
            </p>
          )}
          {happinessSuccessMsg && (
            <p className="mb-6 text-center text-green-600 font-medium">
              {happinessSuccessMsg}
            </p>
          )}

          <div
            className={`grid md:grid-cols-2 gap-5 md:gap-6 ${
              csrExpanded ? "md:items-start" : "md:items-stretch"
            }`}
          >
            {/* Corporate */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="flex items-center gap-3 px-5 md:px-6 py-5 border-b border-gray-100 bg-[#0B1F3A]">
                <div className="w-10 h-10 rounded-lg bg-[#C9A227]/15 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#C9A227]" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Corporate</h4>
                  <p className="text-xs text-gray-300">
                    Organisation &amp; CSR giving
                  </p>
                </div>
              </div>

              <ul className="p-3 md:p-4 space-y-1.5 flex-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setCsrExpanded((prev) => !prev)}
                    aria-expanded={csrExpanded}
                    className="group flex w-full items-start justify-between gap-3 rounded-xl px-4 py-4 text-left text-[#0B1F3A] hover:bg-[#F0EEE6] transition"
                  >
                    <div>
                      <span className="font-semibold">CSR</span>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                        {csrDescription}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 mt-0.5 shrink-0 text-gray-400 transition-transform duration-200 ${
                        csrExpanded ? "rotate-180 text-[#C9A227]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {csrExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-2 mt-1 space-y-1"
                      >
                        {corporateAmounts.map((tier) => (
                          <li key={tier.label}>
                            <button
                              type="button"
                              onClick={() => openCorporatePayment(tier.amount)}
                              className="group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-[#0B1F3A] hover:bg-[#F0EEE6] transition"
                            >
                              <span className="font-semibold">{tier.label}</span>
                              <ArrowRight className="w-4 h-4 shrink-0 text-gray-300 group-hover:text-[#C9A227] transition" />
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              </ul>

              <div className="px-3 md:px-4 pb-4 mt-auto">
                <button
                  type="button"
                  onClick={() => openCorporatePayment()}
                  className="group flex w-full items-start justify-between gap-3 rounded-xl border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-4 text-left text-[#0B1F3A] hover:bg-[#C9A227]/20 transition"
                >
                  <div>
                    <span className="font-bold text-[#C9A227]">
                      General Sponsorship
                    </span>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      Support children and young people to access education and
                      stay on track to complete their learning journey.
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-[#C9A227]" />
                </button>
              </div>
            </div>

            {/* Individual Donation */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="flex items-center gap-3 px-5 md:px-6 py-5 border-b border-gray-100 bg-[#0B1F3A]">
                <div className="w-10 h-10 rounded-lg bg-[#C9A227]/15 flex items-center justify-center">
                  <HandHeart className="w-5 h-5 text-[#C9A227]" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Individual Donation
                  </h4>
                  <p className="text-xs text-gray-300">
                    Personal giving options
                  </p>
                </div>
              </div>

              <ul className="p-3 md:p-4 space-y-1.5 flex-1 flex flex-col">
                {individualOptions.map((option) => (
                  <li key={option.id} className="flex-1">
                    <button
                      type="button"
                      onClick={
                        option.id === "school-day"
                          ? openSchoolDayPayment
                          : openHappinessPayment
                      }
                      className="group flex h-full w-full items-start justify-between gap-3 rounded-xl px-4 py-4 text-left text-[#0B1F3A] hover:bg-[#F0EEE6] transition"
                    >
                      <div>
                        <p className="font-semibold">{option.title}</p>
                        <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-gray-300 group-hover:text-[#C9A227] transition" />
                    </button>
                  </li>
                ))}
              </ul>
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

      {/* Payment modal */}
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
                {total.toLocaleString()}
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

      {/* Corporate Paystack modal */}
      <AnimatePresence>
        {showCorporatePayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => !corporatePaying && setShowCorporatePayment(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1F3A]">
                    {isCustomCorporateAmount
                      ? "General Sponsorship"
                      : "Corporate Sponsorship"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {isCustomCorporateAmount
                      ? "Enter any amount to sponsor"
                      : `\u20A6${corporateAmount.toLocaleString()}`}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-[#0A2540] px-2.5 py-1 text-xs font-bold tracking-wide text-white">
                  Paystack
                </span>
              </div>

              <form
                onSubmit={handleCorporatePay}
                className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
              >
                {isCustomCorporateAmount && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount ({"\u20A6"})
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={customAmountInput}
                      onChange={(e) =>
                        setCustomAmountInput(formatAmountInput(e.target.value))
                      }
                      placeholder="e.g. 250,000"
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organisation Name
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Acme Nigeria Ltd"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={orgPhone}
                    onChange={(e) => setOrgPhone(formatPhone(e.target.value))}
                    placeholder="e.g. 0803 123 4567"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    placeholder="e.g. csr@company.com"
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
                    value={orgCardNumber}
                    onChange={(e) =>
                      setOrgCardNumber(formatCardNumber(e.target.value))
                    }
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
                      value={orgExpiry}
                      onChange={(e) => setOrgExpiry(formatExpiry(e.target.value))}
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
                      value={orgCvv}
                      onChange={(e) =>
                        setOrgCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      placeholder="123"
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                    />
                  </div>
                </div>

                {corporateError && (
                  <p className="text-sm text-red-600 font-medium">
                    {corporateError}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCorporatePayment(false)}
                    disabled={corporatePaying}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={corporatePaying}
                    className="flex-1 bg-[#0A2540] text-white font-semibold py-3 rounded-lg hover:bg-[#123556] transition disabled:opacity-60"
                  >
                    {corporatePaying
                      ? "Processing..."
                      : `Pay \u20A6${(
                          isCustomCorporateAmount
                            ? Number(customAmountInput.replace(/\D/g, "") || 0)
                            : corporateAmount
                        ).toLocaleString()}`}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* School day Paystack modal */}
      <AnimatePresence>
        {showSchoolDayPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => !schoolDayPaying && setShowSchoolDayPayment(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1F3A]">
                    Pay a School Day
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {"\u20A6"}
                    {SCHOOL_DAY_PRICE.toLocaleString()} per day
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-[#0A2540] px-2.5 py-1 text-xs font-bold tracking-wide text-white">
                  Paystack
                </span>
              </div>

              <form
                onSubmit={handleSchoolDayPay}
                className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of school days
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSchoolDays((prev) => Math.max(1, prev - 1))
                      }
                      aria-label="Decrease days"
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-[#0B1F3A] hover:bg-gray-50 transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={365}
                      value={schoolDays}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!Number.isFinite(value)) return;
                        setSchoolDays(Math.min(365, Math.max(1, Math.floor(value))));
                      }}
                      className="w-full border border-gray-300 rounded-lg p-3 text-center font-semibold focus:ring-2 focus:ring-[#53CAE9] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSchoolDays((prev) => Math.min(365, prev + 1))
                      }
                      aria-label="Increase days"
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-[#0B1F3A] hover:bg-gray-50 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Total:{" "}
                    <span className="font-semibold text-[#0B1F3A]">
                      {"\u20A6"}
                      {schoolDayTotal.toLocaleString()}
                    </span>
                    {" "}({schoolDays} × {"\u20A6"}
                    {SCHOOL_DAY_PRICE.toLocaleString()})
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Adaeze Okafor"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(formatPhone(e.target.value))}
                    placeholder="e.g. 0803 123 4567"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="e.g. you@email.com"
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
                    value={donorCardNumber}
                    onChange={(e) =>
                      setDonorCardNumber(formatCardNumber(e.target.value))
                    }
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
                      value={donorExpiry}
                      onChange={(e) =>
                        setDonorExpiry(formatExpiry(e.target.value))
                      }
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
                      value={donorCvv}
                      onChange={(e) =>
                        setDonorCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      placeholder="123"
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                    />
                  </div>
                </div>

                {schoolDayError && (
                  <p className="text-sm text-red-600 font-medium">
                    {schoolDayError}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSchoolDayPayment(false)}
                    disabled={schoolDayPaying}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={schoolDayPaying}
                    className="flex-1 bg-[#0A2540] text-white font-semibold py-3 rounded-lg hover:bg-[#123556] transition disabled:opacity-60"
                  >
                    {schoolDayPaying
                      ? "Processing..."
                      : `Pay \u20A6${schoolDayTotal.toLocaleString()}`}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Do More With Happiness Paystack modal */}
      <AnimatePresence>
        {showHappinessPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => !happinessPaying && setShowHappinessPayment(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1F3A]">
                    Do More With Happiness
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Celebrate by giving
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-[#0A2540] px-2.5 py-1 text-xs font-bold tracking-wide text-white">
                  Paystack
                </span>
              </div>

              <form
                onSubmit={handleHappinessPay}
                className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    What are you celebrating?
                  </label>
                  <textarea
                    value={celebration}
                    onChange={(e) => setCelebration(e.target.value)}
                    placeholder="e.g. New baby, promotion, birthday, exam results..."
                    required
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount ({"\u20A6"})
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={happinessAmountInput}
                    onChange={(e) =>
                      setHappinessAmountInput(formatAmountInput(e.target.value))
                    }
                    placeholder="e.g. 25,000"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={happinessName}
                    onChange={(e) => setHappinessName(e.target.value)}
                    placeholder="e.g. Adaeze Okafor"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={happinessPhone}
                    onChange={(e) =>
                      setHappinessPhone(formatPhone(e.target.value))
                    }
                    placeholder="e.g. 0803 123 4567"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={happinessEmail}
                    onChange={(e) => setHappinessEmail(e.target.value)}
                    placeholder="e.g. you@email.com"
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
                    value={happinessCardNumber}
                    onChange={(e) =>
                      setHappinessCardNumber(formatCardNumber(e.target.value))
                    }
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
                      value={happinessExpiry}
                      onChange={(e) =>
                        setHappinessExpiry(formatExpiry(e.target.value))
                      }
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
                      value={happinessCvv}
                      onChange={(e) =>
                        setHappinessCvv(
                          e.target.value.replace(/\D/g, "").slice(0, 4)
                        )
                      }
                      placeholder="123"
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#53CAE9] outline-none"
                    />
                  </div>
                </div>

                {happinessError && (
                  <p className="text-sm text-red-600 font-medium">
                    {happinessError}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowHappinessPayment(false)}
                    disabled={happinessPaying}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={happinessPaying}
                    className="flex-1 bg-[#0A2540] text-white font-semibold py-3 rounded-lg hover:bg-[#123556] transition disabled:opacity-60"
                  >
                    {happinessPaying
                      ? "Processing..."
                      : `Pay \u20A6${happinessAmount.toLocaleString()}`}
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
