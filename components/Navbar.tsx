"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };
  return (
    <nav className="bg-navy shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-white text-xl font-bold tracking-wide">
          Desa Wisata
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-soft-blue hover:text-white text-sm transition">
            Beranda
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-soft-blue text-sm hidden sm:block">{user.email}</span>
              <button onClick={handleLogout} className="bg-white text-navy text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-ice-white transition">
                Keluar
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-white text-navy text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-ice-white transition">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}