"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import Link from "next/link";

type NewsletterIssue = {
  id: number;
  title: string;
  slug: string;
  image_path?: string;
  pdf_path?: string;
  imageFile?: File;
  pdfFile?: File;
};

export default function AdminNewsletterPage() {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [formState, setFormState] = useState<Partial<NewsletterIssue>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setFetching(true);
        const res = await fetch("/api/newsletter-issues", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch newsletter issues");
        const data = await res.json();
        setIssues(data);
      } catch (error) {
        console.error("Error fetching newsletter issues:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchIssues();
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

    if (!editingId && !formState.pdfFile) {
      return alert("PDF file is required");
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formState.title);
    if (formState.imageFile) formDataToSend.append("image", formState.imageFile);
    if (formState.pdfFile) formDataToSend.append("pdf", formState.pdfFile);

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/newsletter-issues/${editingId}`
      : "/api/newsletter-issues";

    try {
      const res = await fetch(url, {
        method,
        body: formDataToSend,
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return alert(errorData.message || "Error saving newsletter issue");
      }

      const saved = await res.json();

      if (editingId !== null) {
        setIssues((prev) =>
          prev.map((item) => (item.id === editingId ? { ...item, ...saved } : item))
        );
        setEditingId(null);
      } else {
        setIssues((prev) => [saved, ...prev]);
      }

      setFormState({});
    } catch (error) {
      console.error("Error submitting newsletter issue:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (issue: NewsletterIssue) => {
    setFormState(issue);
    setEditingId(issue.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this newsletter issue?")) return;

    const previous = [...issues];
    setIssues((prev) => prev.filter((item) => item.id !== id));

    try {
      const res = await fetch(`/api/newsletter-issues/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete newsletter issue");
    } catch (error) {
      console.error("Error deleting newsletter issue:", error);
      alert("Error deleting newsletter issue. Restoring it.");
      setIssues(previous);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow p-4 flex-1"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Newsletter Issue" : "Create Newsletter Issue"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Newsletter title"
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
          Newsletter PDF (required for new issues)
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
          {loading ? <Spinner size={2} color="#FFFFFF" /> : editingId ? "Update" : "Create"}
          {loading && <span className="ml-2">Uploading...</span>}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 overflow-y-auto"
      >
        {fetching ? (
          <div className="flex justify-center items-center h-40">
            <Spinner size={4} color="#53CAE9" />
          </div>
        ) : issues.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No newsletter issues yet</p>
        ) : (
          <div className="flex flex-col gap-4">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4"
              >
                {issue.image_path && (
                  <div className="w-full md:w-48 h-32 relative flex-shrink-0">
                    <Image
                      src={issue.image_path}
                      alt={issue.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg">{issue.title}</h3>
                  {issue.pdf_path && (
                    <Link
                      href={issue.pdf_path}
                      target="_blank"
                      className="text-blue-500 underline mt-1"
                    >
                      View PDF
                    </Link>
                  )}
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(issue)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    {issue.pdf_path && (
                      <Link
                        href={issue.pdf_path}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        View
                      </Link>
                    )}
                    <button
                      onClick={() => handleDelete(issue.id)}
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
