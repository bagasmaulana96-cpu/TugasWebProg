"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

    router.push(profile?.role === "admin" ? "/admin" : "/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-ice-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy">Desa Wisata</h1>
          <p className="text-soft-blue mt-1 text-sm">Masuk ke akun Anda</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password Anda"
              className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white font-semibold py-2.5 rounded-lg hover:bg-opacity-90 transition disabled:opacity-60 mt-2"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-navy font-semibold hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>

  );
}

