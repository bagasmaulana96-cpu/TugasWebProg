import { createSupabaseServerClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PackageDetail({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single();

  if (!pkg || error) return notFound();

  const price = Number(pkg.price);
  const whatsappMessage = encodeURIComponent(
    pkg.whatsapp_message ||
      `Halo Admin, saya ingin memesan paket wisata "${pkg.title}" seharga Rp ${price.toLocaleString("id-ID")}. Mohon informasinya lebih lanjut.`,
  );

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Gambar */}
      <div className="rounded-2xl overflow-hidden h-72 w-full mb-8">
        <Image
          src={pkg.image_url || "https://placehold.co/800x400?text=Desa+Anjay"}
          alt={pkg.title}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Konten */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <span className="bg-soft-blue text-navy text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
          Paket Wisata
        </span>
        <h1 className="text-4xl font-bold text-navy mt-4">{pkg.title}</h1>
        <p className="text-gray-500 mt-4 text-lg leading-relaxed">
          {pkg.description}
        </p>

        {/* Harga */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-gray-400">Harga mulai dari</p>
            <p className="text-3xl font-bold text-navy">
              Rp {price.toLocaleString("id-ID")}
            </p>
          </div>
          {/* Tombol WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy text-white font-bold px-8 py-4 rounded-full hover:bg-soft-blue hover:text-navy transition text-lg"
          >
            Pesan via WhatsApp
          </a>
        </div>
      </div>

      {/* Kembali */}
      <div className="mt-6">
        <a href="/" className="text-navy font-semibold hover:underline">
          ← Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
