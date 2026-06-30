"use client";

import { deletePackage } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = () => {
    if (confirm("Yakin ingin menghapus paket ini?")) {
      deletePackage(id);
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      Hapus
    </button>
  );
}