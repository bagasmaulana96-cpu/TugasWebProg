import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-ice-white flex">
      <aside className="w-64 bg-navy text-white flex flex-col">
        <div className="p-6 border-b border-soft-blue/20">
          <p className="font-bold text-lg">Admin Panel</p>
          <p className="text-soft-blue text-xs mt-1">{profile.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-soft-blue/10 text-sm">
            Dashboard
          </Link>
          <Link href="/admin/packages/new" className="block px-4 py-2 rounded-lg hover:bg-soft-blue/10 text-sm">
            Tambah Paket
          </Link>
          <Link href="/" className="block px-4 py-2 rounded-lg hover:bg-soft-blue/10 text-sm text-soft-blue">
            ← Kembali ke Situs
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}