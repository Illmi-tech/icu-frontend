"use client";

import { useState, useEffect} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import Link from "next/link";

type Report = {
  id: number;
  title: string;
  slug: string;
  image_path?: string;
  pdf_path?: string;
  imageFile?: File;
  pdfFile?: File;
};

const MB = 1024 * 1024;
const MAX_PDF_BYTES = 50 * MB;
// Vercel rejects request bodies over 4.5 MB, and the thumbnail still goes through the API.
const MAX_IMAGE_BYTES = 4 * MB;

const formatMB = (bytes: number) => `${(bytes / MB).toFixed(1)} MB`;

async function readErrorMessage(res: Response, fallback: string) {
  if (res.status === 413) return "The file is too large to upload.";
  if (res.status === 401) return "Your session has expired. Please log in again.";
  try {
    const data = await res.json();
    return data.message || data.error || fallback;
  } catch {
    return `${fallback} (error ${res.status})`;
  }
}

async function uploadPdf(file: File): Promise<string> {
  const urlRes = await fetch("/api/reports/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size }),
  });
  if (!urlRes.ok) throw new Error(await readErrorMessage(urlRes, "Could not prepare the PDF upload"));
  const { uploadUrl, path } = await urlRes.json();

  const body = new FormData();
  body.append("cacheControl", "3600");
  body.append("", file);
  const uploadRes = await fetch(uploadUrl, { method: "PUT", body });
  if (!uploadRes.ok) throw new Error(await readErrorMessage(uploadRes, "PDF upload failed"));

  return path;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [formState, setFormState] = useState<Partial<Report>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
   const fetchReports = async () => {
     try {
        setFetching(true);
       const res = await fetch("/api/reports", { credentials: "include" });
       if (!res.ok) throw new Error("Failed to fetch reports");
       const data = await res.json();
       setReports(data);
     } catch (error) {
       console.error("Error fetching reports:", error);
     }finally {
      setFetching(false);
    }
   };
   fetchReports();
 }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormState({ ...formState, imageFile: e.target.files[0] });
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormState({ ...formState, pdfFile: e.target.files[0] });
  };

  const handleSubmit = async () => {
  if (!formState.title) {
    return alert("Title is required");
  }

  // PDF is required only when creating a new report
  if (!editingId && !formState.pdfFile) {
    return alert("PDF file is required");
  }

  const { imageFile, pdfFile } = formState;
  if (imageFile && imageFile.size > MAX_IMAGE_BYTES) {
    return alert(
      `The thumbnail image is too large (${formatMB(imageFile.size)}). Please use an image under ${formatMB(MAX_IMAGE_BYTES)}.`
    );
  }
  if (pdfFile && pdfFile.size > MAX_PDF_BYTES) {
    return alert(
      `The PDF is too large (${formatMB(pdfFile.size)}). The maximum is ${formatMB(MAX_PDF_BYTES)}. Please compress it and try again.`
    );
  }

  setLoading(true);

  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `/api/reports/${editingId}` : "/api/reports";

  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formState.title);
    if (imageFile) formDataToSend.append("image", imageFile);
    if (pdfFile) {
      setStatus(`Uploading PDF (${formatMB(pdfFile.size)})...`);
      formDataToSend.append("pdfPath", await uploadPdf(pdfFile));
    }

    setStatus("Saving report...");
    const res = await fetch(url, {
      method,
      body: formDataToSend,
      credentials: "include",
    });

    if (!res.ok) {
      return alert(await readErrorMessage(res, editingId ? "Error updating report" : "Error creating report"));
    }

    const newReport = await res.json();

    if (editingId !== null) {
      setReports((prev) =>
        prev.map((b) => (b.id === editingId ? { ...b, ...newReport } : b))
      );
      setEditingId(null);
    } else {
      setReports((prev) => [newReport, ...prev]);
    }

    setFormState({});
  } catch (error) {
    console.error("Error submitting report:", error);
    alert(error instanceof Error ? error.message : "Something went wrong");
  }finally {
      setLoading(false);
      setStatus("");
    }
};

  const handleEdit = (report: Report) => {
    setFormState(report);
    setEditingId(report.id);
  };

  const handleDelete = async (id: number) => {
  if (!confirm("Are you sure you want to delete this report?")) return;

  const previousReports = [...reports];
  setReports((prev) => prev.filter((b) => b.id !== id));

  try {
    const res = await fetch(`/api/reports/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete report");

  } catch (error) {
    console.error("Error deleting report:", error);
    alert("Error deleting report. Restoring it.");
    setReports(previousReports);
  }
};

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left: Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-4 flex-1"
      >
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Report" : "Create Report"}</h2>
        
        <input
          type="text"
          name="title"
          placeholder="Report title"
          value={formState.title || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Thumbnail Image
        </label>
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Report PDF (required)
        </label>
        <input
          type="file"
          name="pdfFile"
          accept="application/pdf"
          onChange={handlePdfChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <Spinner size={2} color="#FFFFFF" /> : editingId ? "Update Report" : "Create Report"}
          {loading && <span className="ml-2">{status || "Uploading..."}</span>}
        </button>
      </motion.div>

      {/* Right: Report List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 overflow-y-auto"
      >
        {fetching ? (
          <div className="flex justify-center items-center h-40">
            <Spinner size={4} color="#53CAE9" />
          </div>) :
          reports.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No reports yet</p>
          ) : (
          <div className="flex flex-col gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4"
              >
                {report.image_path && (
                  <div className="w-full md:w-48 h-32 relative flex-shrink-0">
                    <Image
                      src={report.image_path}
                      alt={report.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg">{report.title}</h3>
                  {report.pdf_path && (
                    <Link
                      href={report.pdf_path}
                      target="_blank"
                      className="text-blue-500 underline mt-1"
                    >
                      View PDF
                    </Link>
                  )}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(report)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    {report.pdf_path && (
                      <Link
                        href={report.pdf_path}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        View
                      </Link>
                    )}
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
