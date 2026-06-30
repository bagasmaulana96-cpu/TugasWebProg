import { createSupabaseServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { updatePackage } from "../../../actions";
import Image from "next/image";

type Props = { params: Promise<{ id: string }> };

export default async function EditPackagePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: pkg } = await supabase.from("packages").select("*").eq("id", id).single();

  if (!pkg) return notFound();

  const updateWithId = updatePackage.bind(null, id);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-navy mb-6">Edit Paket Wisata</h1>
      <form action={updateWithId} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Judul</label>
          <input name="title" defaultValue={pkg.title} required className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Deskripsi</label>
          <textarea name="description" defaultValue={pkg.description ?? ""} rows={3} className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Harga (Rp)</label>
          <input name="price" type="number" defaultValue={pkg.price} required className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Gambar Saat Ini</label>
          {pkg.image_url && (
            <Image
              src={pkg.image_url}
              alt={pkg.title}
              width={200}
              height={120}
              className="rounded-lg mb-2 object-cover"
            />
          )}
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-navy file:text-white file:text-sm file:cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-1">Kosongkan jika tidak ingin mengganti gambar.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Pesan WhatsApp Kustom</label>
          <textarea name="whatsapp_message" defaultValue={pkg.whatsapp_message ?? ""} rows={2} className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
        </div>
        <button type="submit" className="bg-navy text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-opacity-90 transition">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}