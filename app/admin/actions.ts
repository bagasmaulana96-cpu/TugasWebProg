"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") throw new Error("Forbidden");
  return supabase;
}

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  file: File,
) {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("package-images")
    .upload(fileName, file, { contentType: file.type });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("package-images").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function createPackage(formData: FormData) {
  const supabase = await requireAdmin();

  const imageFile = formData.get("image") as File;
  const image_url = await uploadImage(supabase, imageFile);

  const { error } = await supabase.from("packages").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    image_url,
    whatsapp_message: (formData.get("whatsapp_message") as string) || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function updatePackage(id: string, formData: FormData) {
  const supabase = await requireAdmin();

  const imageFile = formData.get("image") as File;
  const newImageUrl = await uploadImage(supabase, imageFile);

  const updateData: Record<string, unknown> = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    whatsapp_message: (formData.get("whatsapp_message") as string) || null,
  };

  // Hanya update image_url kalau ada file baru diupload
  if (newImageUrl) updateData.image_url = newImageUrl;

  const { error } = await supabase.from("packages").update(updateData).eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/packages/${id}`);
  redirect("/admin");
}

export async function deletePackage(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/");
}