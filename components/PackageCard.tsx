import Link from "next/link";
import Image from "next/image";

type Package = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  whatsapp_message?: string;
};

export default function PackageCard({ pkg }: { pkg: Package }) {
  const whatsappMessage = encodeURIComponent(
    pkg.whatsapp_message ||
      `Halo Admin, saya ingin memesan paket wisata "${pkg.title}" seharga Rp ${pkg.price.toLocaleString("id-ID")}. Mohon informasinya lebih lanjut.`,
  );

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group">
      <div className="overflow-hidden h-48">
        <Image
          src={pkg.image_url || "https://placehold.co/600x400?text=Desa+Anjay"}
          alt={pkg.title}
          width={600}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="text-navy font-bold text-lg">{pkg.title}</h3>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {pkg.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-navy font-bold text-xl">
            Rp {pkg.price.toLocaleString("id-ID")}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/packages/${pkg.id}`}
              className="bg-navy text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-soft-blue hover:text-navy transition"
            >
              Detail
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              Pesan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
