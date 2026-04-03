"use client";

import { useState, useEffect} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import sanitizeHtml from "sanitize-html";

type Scholarship = {
  id: number;
  title: string;
  content: string;
  slug: string;
  image_path?: string; // <-- updated
  imageFile?: File;
  date?: string;
};

export default function AdminScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [formState, setFormState] = useState<Partial<Scholarship>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preventDelete, setPreventDelete] = useState(false);

  useEffect(() => {
   const fetchScholarships = async () => {
     try {
        setFetching(true);
       const res = await fetch("/api/scholarships", { credentials: "include" });
       if (!res.ok) throw new Error("Failed to fetch scholarships");
       const data = await res.json();
       setScholarships(data);
     } catch (error) {
       console.error("Error fetching scholarships:", error);
     }finally {
      setFetching(false);
    }
   };
   fetchScholarships();
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
  const url = editingId ? `/api/scholarships/${editingId}` : "/api/scholarships";

  try {
    const res = await fetch(url, {
      method,
      body: formDataToSend,
      credentials: "include", // sends cookies if token is stored there
    });

    if (!res.ok) {
      const errorData = await res.json();
      return alert(errorData.message || "Error creating scholarship");
    }

    const newScholarship = await res.json();

    //  Update local state with API response
    if (editingId !== null) {
      setScholarships((prev) =>
        prev.map((s) => (s.id === editingId ? { ...s, ...newScholarship } : s))
      );
      setEditingId(null);
    } else {
      setScholarships((prev) => [newScholarship, ...prev]); // add new scholarship at the top
    }

    setFormState({});
  } catch (error) {
    console.error("Error submitting scholarship:", error);
    alert("Something went wrong");
  }finally {
      setLoading(false); // stop loading
      setPreventDelete(false);
    }
};

  const handleEdit = (scholarship: Scholarship) => {
    setFormState(scholarship);
    setEditingId(scholarship.id);
  };

  const handleDelete = async (id: number) => {
  // Ask for confirmation first
  if (!confirm("Are you sure you want to delete this scholarship?")) return;

  // Optimistically remove the scholarship from UI
  const previousScholarships = [...scholarships];
  setScholarships((prev) => prev.filter((s) => s.id !== id));

  try {
    const res = await fetch(`/api/scholarships/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete scholarship");

    // Optional: you can show a success toast here
  } catch (error) {
    console.error("Error deleting scholarship:", error);
    alert("Error deleting scholarship. Restoring it.");
    
    // Rollback: restore previous scholarship list
    setScholarships(previousScholarships);
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
        className="bg-white rounded-xl shadow p-4 flex-1 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Scholarship" : "Create Scholarship"}</h2>
        
        <input
          type="text"
          name="title"
          placeholder="Scholarship title"
          value={formState.title || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />

        {/* Rich text editor + button wrapper */}
        <div className="flex flex-col gap-4 w-full">
          <div className="relative w-full overflow-visible pb-2">
            <div className="min-h-[300px] block w-full">
              <RichTextEditor
                value={formState.content || ""}
                onChange={(val) => setFormState({ ...formState, content: val })}
                folder="scholarships"
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
                "Update Scholarship"
              ) : (
                "Create Scholarship"
              )}
            </button>
          </div>
        </div>
        
      </motion.div>

      {/* Right: Scholarship List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 overflow-y-auto"
      >
        {fetching ? ( //  show spinner while fetching
          <div className="flex justify-center items-center h-40">
            <Spinner size={4} color="#53CAE9" />
          </div>) :
          scholarships.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No scholarships yet</p>
          ) : (
          <div className="flex flex-col gap-4">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4"
              >
                {scholarship.image_path && (
                  <div className="w-full md:w-48 h-32 relative flex-shrink-0">
                    <Image
                      src={scholarship.image_path}
                      alt={scholarship.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg">{scholarship.title}</h3>
                  <p
                    className="text-gray-700 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html:
                        sanitizeHtml(stripHtml(scholarship.content)).substring(0, 200) +
                        "...",
                    }}
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(scholarship)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>

                    <Link
                      href={`/scholarships/${scholarship.slug}`}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(scholarship.id)}
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
