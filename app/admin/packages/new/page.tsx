import { createPackage } from "../../actions";

export default function NewPackagePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-navy mb-6">Tambah Paket Wisata</h1>
      <form action={createPackage} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Judul</label>
          <input name="title" required className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Deskripsi</label>
          <textarea name="description" rows={3} className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Harga (Rp)</label>
          <input name="price" type="number" required className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Gambar Paket</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-navy file:text-white file:text-sm file:cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Pesan WhatsApp Kustom (opsional)</label>
          <textarea name="whatsapp_message" rows={2} className="w-full border border-soft-blue rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy" />
        </div>
        <button type="submit" className="bg-navy text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-opacity-90 transition">
          Simpan
        </button>
      </form>
    </div>
  );
}