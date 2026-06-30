export default function Footer() {
  return (
    <footer className="bg-navy text-soft-blue mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-white font-bold text-lg">ðŸ”ï¸ Desa Wisata</p>
          <p className="text-sm mt-1">
            Temukan keindahan alam yang autentik bersama kami.
          </p>
        </div>
        <p className="text-sm text-soft-blue">
          © {new Date().getFullYear()} Desa Wisata. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

