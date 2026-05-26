"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem("rexon_admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "rexon2026";

      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("rexon_admin_token", `rexon_admin_${Date.now()}`);
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#89B036]/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-md rounded-3xl p-8 border border-slate-800 shadow-2xl relative z-10"
      >
        {/* Shield Icon header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#89B036]/20 text-[#89B036] rounded-2xl flex items-center justify-center mb-4 border border-[#89B036]/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Rexon Admin Panel</h1>
          <p className="text-xs text-slate-400 mt-1">Authorized access only — enter your password.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-red-950/40 border border-red-900/50 text-red-400 p-4 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Password input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-widest mb-2">
              Admin Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-white placeholder-slate-600 transition-all"
              />
            </div>
          </div>

          {/* Submit login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center px-6 py-3.5 font-semibold text-sm text-white bg-[#89B036] rounded-xl hover:bg-[#546622] transition-all duration-300 shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <ArrowRight className="w-4 h-4 mr-2" />
            )}
            Access Dashboard
          </button>
        </form>
      </motion.div>
    </main>
  );
}
