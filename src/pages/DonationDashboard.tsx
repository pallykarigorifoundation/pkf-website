/**
 * DonationDashboard.tsx  — Razorpay integration
 *
 * How it works:
 *  1. User picks an amount and clicks "Donate"
 *  2. Razorpay's payment popup opens (card / UPI / netbanking)
 *  3. On success, we save the donation record to Supabase
 *  4. A thank-you message is shown
 *
 * Setup needed before this works:
 *  - Add VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxx to your .env file
 *  - Get your key from https://dashboard.razorpay.com → Settings → API Keys
 */

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../hooks/useAuth";

// Tell TypeScript that window.Razorpay exists (loaded via CDN script tag)
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  prefill?: { name?: string; email?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
}
interface RazorpayResponse {
  razorpay_payment_id: string;
}
interface RazorpayInstance {
  open: () => void;
}

const PRESET_AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

// Loads the Razorpay JS SDK from their CDN (only once)
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.querySelector('script[src*="razorpay"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function DonationDashboard() {
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [donated, setDonated] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [error, setError] = useState("");

  const finalAmount = customAmount ? Number(customAmount) : amount;

  const handleDonate = async () => {
    setError("");
    if (!finalAmount || finalAmount < 1) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setError("Could not load payment gateway. Check your internet connection.");
      setLoading(false);
      return;
    }

    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: finalAmount * 100,   // Razorpay takes paise (₹1 = 100 paise)
      currency: "INR",
      name: "Pally Karigori Foundation",
      description: "Support PKF's mission",
      image: "/single.png",
      prefill: {
        email: user?.email ?? "",
      },
      theme: { color: "#5c7a29" },   // your lime/olive color
      handler: async (response: RazorpayResponse) => {
        // Payment succeeded — save to Supabase
        const { error: dbError } = await supabase.from("donations").insert({
          user_id: user?.id ?? null,
          email: user?.email ?? null,
          amount: finalAmount,
          currency: "INR",
          payment_id: response.razorpay_payment_id,
          created_at: new Date().toISOString(),
        });

        if (dbError) {
          console.error("DB error:", dbError);
          // Payment went through, so still show success to user
        }

        setPaymentId(response.razorpay_payment_id);
        setDonated(true);
        setLoading(false);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  // ── Thank you screen ──────────────────────────────────────────────
  if (donated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-black px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🌱</div>
          <h1 className="font-display text-3xl font-semibold text-olive dark:text-lime-light mb-4">
            Thank you for your support!
          </h1>
          <p className="text-text-muted mb-2">
            Your donation of <strong className="text-olive dark:text-white">₹{finalAmount.toLocaleString("en-IN")}</strong> will help rural youth build skills and shape their future.
          </p>
          <p className="text-xs text-text-muted mb-8">
            Payment ID: <code className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">{paymentId}</code>
          </p>
          <button
            onClick={() => { setDonated(false); setCustomAmount(""); setAmount(500); }}
            className="px-8 py-3 rounded-xl bg-lime text-white font-bold hover:bg-olive transition-colors"
          >
            Donate again
          </button>
        </div>
      </div>
    );
  }

  // ── Donation form ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream dark:bg-black py-20 px-8 lg:px-16">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <p className="text-[0.72rem] font-bold tracking-widest text-lime uppercase mb-4">
          Support PKF
        </p>
        <h1 className="font-display text-4xl font-semibold text-olive dark:text-lime-light leading-tight mb-3">
          Empower a rural youth<br />
          <span className="text-lime">with your donation</span>
        </h1>
        <p className="text-text-muted mb-10">
          100% of your donation goes toward skill training, resources, and opportunities for rural youth across India.
        </p>

        {/* Preset amounts */}
        <p className="text-xs font-semibold tracking-widest text-text-muted uppercase mb-3">
          Select amount
        </p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {PRESET_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => { setAmount(a); setCustomAmount(""); }}
              className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                amount === a && !customAmount
                  ? "border-lime bg-lime text-white"
                  : "border-black/15 dark:border-white/15 text-olive dark:text-white hover:border-lime"
              }`}
            >
              ₹{a.toLocaleString("en-IN")}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="mb-8">
          <label className="text-xs font-semibold tracking-widest text-text-muted uppercase block mb-2">
            Or enter custom amount (₹)
          </label>
          <input
            type="number"
            min="1"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="e.g. 1500"
            className="w-full px-4 py-3 rounded-xl border border-black/15 dark:border-white/15 bg-white dark:bg-zinc-800 text-olive dark:text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-lime transition"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Donate button */}
        <button
          onClick={handleDonate}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-lime text-white font-bold text-base tracking-wide hover:bg-olive transition-colors disabled:opacity-60 shadow-lg shadow-lime/20"
        >
          {loading
            ? "Opening payment…"
            : `Donate ₹${finalAmount.toLocaleString("en-IN")}`}
        </button>

        <p className="text-xs text-text-muted text-center mt-4">
          Secured by Razorpay · UPI, Cards, Net Banking accepted
        </p>
      </div>
    </div>
  );
}
