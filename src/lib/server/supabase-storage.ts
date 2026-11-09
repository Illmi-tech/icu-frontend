import { randomUUID } from "crypto";

export const PDF_BUCKET = "pdfs";
export const MAX_PDF_BYTES = 50 * 1024 * 1024;

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }
  return { url, key };
}

// New-style secret keys (sb_secret_...) are only accepted in the apikey header;
// legacy service_role keys are JWTs and also go in Authorization.
function authHeaders(key: string): Record<string, string> {
  const headers: Record<string, string> = { apikey: key };
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  return headers;
}

async function ensureBucket() {
  const { url, key } = getConfig();
  const res = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: { ...authHeaders(key), "Content-Type": "application/json" },
    body: JSON.stringify({
      id: PDF_BUCKET,
      name: PDF_BUCKET,
      public: true,
      file_size_limit: MAX_PDF_BYTES,
      allowed_mime_types: ["application/pdf"],
    }),
  });
  if (!res.ok && res.status !== 409) {
    const text = await res.text();
    if (!/already exists/i.test(text)) {
      throw new Error(`Failed to create storage bucket: ${res.status} ${text}`);
    }
  }
}

export async function createPdfUploadUrl(folder: string) {
  const { url, key } = getConfig();
  const path = `${folder}/${Date.now()}-${randomUUID()}.pdf`;

  const request = () =>
    fetch(`${url}/storage/v1/object/upload/sign/${PDF_BUCKET}/${path}`, {
      method: "POST",
      headers: authHeaders(key),
    });

  let res = await request();
  if (!res.ok) {
    const text = await res.text();
    if (!/bucket not found/i.test(text)) {
      throw new Error(`Failed to create upload URL: ${res.status} ${text}`);
    }
    await ensureBucket();
    res = await request();
    if (!res.ok) {
      throw new Error(`Failed to create upload URL: ${res.status} ${await res.text()}`);
    }
  }

  const data = (await res.json()) as { url: string };
  return { path, uploadUrl: `${url}/storage/v1${data.url}` };
}

export function isValidPdfPath(path: string, folder: string) {
  return new RegExp(`^${folder}/\\d+-[0-9a-f-]{36}\\.pdf$`).test(path);
}

export function getPdfPublicUrl(path: string) {
  const { url } = getConfig();
  return `${url}/storage/v1/object/public/${PDF_BUCKET}/${path}`;
}

export function isSupabasePdfUrl(pdfUrl: string) {
  const base = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  return !!base && pdfUrl.startsWith(`${base}/storage/`);
}

export async function pdfExists(path: string) {
  const res = await fetch(getPdfPublicUrl(path), { method: "HEAD", cache: "no-store" });
  return res.ok;
}

export async function deletePdf(path: string) {
  const { url, key } = getConfig();
  const res = await fetch(`${url}/storage/v1/object/${PDF_BUCKET}`, {
    method: "DELETE",
    headers: { ...authHeaders(key), "Content-Type": "application/json" },
    body: JSON.stringify({ prefixes: [path] }),
  });
  if (!res.ok) {
    throw new Error(`Failed to delete PDF: ${res.status} ${await res.text()}`);
  }
}
