import { createSupabaseServerClient } from "@/lib/supabase-server";
import PackageCard from "@/components/PackageCard";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-navy text-white py-28 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="bg-soft-blue text-navy text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
            Destinasi Pilihan
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-5 leading-tight">
            Selamat Datang di <br />
            <span className="text-soft-blue">Desa Anjay</span>
          </h1>
          <p className="text-soft-blue mt-4 text-lg max-w-xl mx-auto">
            Paket wisata autentik dengan pemandu lokal berpengalaman. Alam
            terjaga, kenangan tak terlupakan.
          </p>
          <a
            href="#packages"
            className="inline-block mt-8 bg-white text-navy font-bold px-8 py-3 rounded-full hover:bg-ice-white transition"
          >
            Lihat Paket Wisata
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-soft-blue py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-navy">12+</p>
            <p className="text-sm text-navy mt-1">Paket Wisata</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-navy">500+</p>
            <p className="text-sm text-navy mt-1">Wisatawan Puas</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-navy">4.9</p>
            <p className="text-sm text-navy mt-1">Rating Rata-rata</p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="bg-soft-blue text-navy text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
            Pilihan Paket
          </span>
          <h2 className="text-3xl font-bold text-navy mt-4">
            Paket Wisata Kami
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto">
            Pilih pengalaman yang paling sesuai dengan keinginan Anda
          </p>
        </div>
        {error ? (
          <p className="text-center text-red-500">Gagal memuat paket wisata.</p>
        ) : packages && packages.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada paket tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages?.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Siap Berwisata?</h2>
          <p className="text-soft-blue mt-3 text-lg">
            Hubungi kami dan rencanakan perjalanan impian Anda bersama Desa
            Anjay.
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-white text-navy font-bold px-8 py-3 rounded-full hover:bg-ice-white transition"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

