import { createSupabaseServerClient } from "@/lib/supabase-server";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Kelola Paket Wisata</h1>
        <Link
          href="/admin/packages/new"
          className="bg-navy text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          + Tambah Paket
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-soft-blue/20 text-navy text-left">
            <tr>
              <th className="px-4 py-3">Judul</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Dibuat</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {packages?.map((pkg) => (
              <tr key={pkg.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-navy">{pkg.title}</td>
                <td className="px-4 py-3">
                  Rp {Number(pkg.price).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(pkg.created_at).toLocaleDateString("id-ID")}
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <Link href={`/admin/packages/${pkg.id}/edit`} className="text-navy hover:underline">
                    Edit
                  </Link>
                  <DeleteButton id={pkg.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {packages?.length === 0 && (
          <p className="text-center text-gray-400 py-10">Belum ada paket.</p>
        )}
      </div>
    </div>
  );
}