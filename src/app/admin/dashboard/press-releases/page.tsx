"use client";

import { useState, useEffect} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import sanitizeHtml from "sanitize-html";

type PressRelease = {
  id: number;
  title: string;
  content: string;
  slug: string;
  image_path?: string; // <-- updated
  imageFile?: File;
  date?: string;
};

export default function AdminPressReleasesPage() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [formState, setFormState] = useState<Partial<PressRelease>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preventDelete, setPreventDelete] = useState(false);

  useEffect(() => {
   const fetchPressReleases = async () => {
     try {
        setFetching(true);
       const res = await fetch("/api/press-releases", { credentials: "include" });
       if (!res.ok) throw new Error("Failed to fetch press releases");
       const data = await res.json();
       setPressReleases(data);
     } catch (error) {
       console.error("Error fetching press releases:", error);
     }finally {
      setFetching(false);
    }
   };
   fetchPressReleases();
 }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormState({ ...formState, imageFile: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (!formState.title || !formState.content) {
      return alert("Title and content are required");
    }

    setPreventDelete(true);
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formState.title);
    formDataToSend.append("content", formState.content);
    if (formState.imageFile) formDataToSend.append("image", formState.imageFile);

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/press-releases/${editingId}` : "/api/press-releases";

    try {
      const res = await fetch(url, {
        method,
        body: formDataToSend,
        credentials: "include", // sends cookies if token is stored there
      });

      if (!res.ok) {
        const errorData = await res.json();
        return alert(errorData.message || "Error creating press releases");
      }

      const newPressRelease = await res.json();

      //  Update local state with API response
      if (editingId !== null) {
        setPressReleases((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...newPressRelease } : p))
        );
        setEditingId(null);
      } else {
        setPressReleases((prev) => [newPressRelease, ...prev]); // add new press release at the top
      }

      setFormState({});
    } catch (error) {
      console.error("Error submitting press release:", error);
      alert("Something went wrong");
    }finally {
      setLoading(false); // stop loading
      setPreventDelete(false);
    }
  };

  const handleEdit = (pressRelease: PressRelease) => {
    setFormState(pressRelease);
    setEditingId(pressRelease.id);
  };

  const handleDelete = async (id: number) => {
  // Ask for confirmation first
  if (!confirm("Are you sure you want to delete this press release?")) return;

  // Optimistically remove the press release from UI
  const previousPressReleases = [...pressReleases];
  setPressReleases((prev) => prev.filter((p) => p.id !== id));

  try {
    const res = await fetch(`/api/press-releases/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete press release");

    // Optional: you can show a success toast here
  } catch (error) {
    console.error("Error deleting press release:", error);
    alert("Error deleting press release. Restoring it.");
    
    // Rollback: restore previous press release list
    setPressReleases(previousPressReleases);
  }
};

const stripHtml = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};


  return (
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold">
            {editingId ? "Edit Press Release" : "Press Release"}
          </h2>
  
          <input
            type="text"
            name="title"
            placeholder="Press release title"
            value={formState.title || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
  
          {/* Show existing header image */}
          {formState.image_path && (
            <div className="w-full h-40 relative rounded overflow-hidden">
              <Image
                src={formState.image_path}
                alt="Current Press Release Image"
                fill
                className="object-cover"
              />
            </div>
          )}
  
          {/* Header image upload */}
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
  
          {/* Rich text editor + button wrapper */}
          <div className="flex flex-col gap-4 w-full">
            <div className="relative w-full overflow-visible pb-2">
              <div className="min-h-[300px] block w-full">
                <RichTextEditor
                  value={formState.content || ""}
                  onChange={(val) => setFormState({ ...formState, content: val })}
                  folder="press-releases"
                  preventDelete={preventDelete}
                />
              </div>
            </div>
                  
            {/* Reduced margin to bring button closer */}
            <div className="self-start mt-2 clear-both relative z-10">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={loading || fetching}
              >
                {loading ? (
                  <>
                    <Spinner size={2} color="#FFFFFF" />
                    <span className="ml-2">Uploading...</span>
                  </>
                ) : editingId ? (
                  "Update Press Release"
                ) : (
                  "Create Press Release"
                )}
              </button>
            </div>
          </div>
        </motion.div>
  
        {/* Right: Press Release List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 overflow-y-auto"
        >
          {fetching ? (
            <div className="flex justify-center items-center h-40">
              <Spinner size={4} color="#53CAE9" />
            </div>
          ) : pressReleases.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No Press Releases yet</p>
          ) : (
            <div className="flex flex-col gap-4">
              {pressReleases.map((pressRelease) => (
                <div
                  key={pressRelease.id}
                  className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4"
                >
                  {pressRelease.image_path && (
                    <div className="w-full md:w-48 h-32 relative flex-shrink-0 rounded overflow-hidden">
                      <Image
                        src={pressRelease.image_path}
                        alt={pressRelease.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-between">
                    <h3 className="font-semibold text-lg">{pressRelease.title}</h3>
                    <p
                      className="text-gray-700 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html:
                          sanitizeHtml(stripHtml(pressRelease.content)).substring(0, 200) +
                          "...",
                      }}
                    />
                    {pressRelease.date && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(pressRelease.date).toDateString()}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(pressRelease)}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Edit
                      </button>
  
                      <Link
                        href={`/resources/press-releases/${pressRelease.slug}`}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        View
                      </Link>
  
                      <button
                        onClick={() => handleDelete(pressRelease.id)}
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
