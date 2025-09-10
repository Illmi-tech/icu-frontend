"use client";

import { useState, useEffect} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import Link from "next/link";

type Career = {
  id: number;
  title: string;
  content: string;
  slug: string;
  image_path?: string; // <-- updated
  imageFile?: File;
};

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [formState, setFormState] = useState<Partial<Career>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
   const fetchCareers = async () => {
     try {
        setFetching(true);
       const res = await fetch("/api/careers", { credentials: "include" });
       if (!res.ok) throw new Error("Failed to fetch careers");
       const data = await res.json();
       setCareers(data);
     } catch (error) {
       console.error("Error fetching careers:", error);
     }finally {
      setFetching(false);
    }
   };
   fetchCareers();
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

  setLoading(true);

  const formDataToSend = new FormData();
  formDataToSend.append("title", formState.title);
  formDataToSend.append("content", formState.content);
  if (formState.imageFile) formDataToSend.append("image", formState.imageFile);

  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `/api/careers/${editingId}` : "/api/careers";

  try {
    const res = await fetch(url, {
      method,
      body: formDataToSend,
      credentials: "include", // sends cookies if token is stored there
    });

    if (!res.ok) {
      const errorData = await res.json();
      return alert(errorData.message || "Error creating career");
    }

    const newCareer = await res.json();

    //  Update local state with API response
    if (editingId !== null) {
      setCareers((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...newCareer } : c))
      );
      setEditingId(null);
    } else {
      setCareers((prev) => [newCareer, ...prev]); // add new career at the top
    }

    setFormState({});
  } catch (error) {
    console.error("Error submitting career:", error);
    alert("Something went wrong");
  }finally {
      setLoading(false); // stop loading
    }
};

  const handleEdit = (career: Career) => {
    setFormState(career);
    setEditingId(career.id);
  };

  const handleDelete = async (id: number) => {
  // Ask for confirmation first
  if (!confirm("Are you sure you want to delete this career?")) return;

  // Optimistically remove the career from UI
  const previousCareers = [...careers];
  setCareers((prev) => prev.filter((c) => c.id !== id));

  try {
    const res = await fetch(`/api/careers/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete career");

    // Optional: you can show a success toast here
  } catch (error) {
    console.error("Error deleting career:", error);
    alert("Error deleting career. Restoring it.");
    
    // Rollback: restore previous career list
    setCareers(previousCareers);
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
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Career" : "Add Career"}</h2>
        
        <input
          type="text"
          name="title"
          placeholder="Career title"
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

        <textarea
          name="content"
          placeholder="About Career"
          value={formState.content || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 h-32 resize-none"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <Spinner size={2} color="#FFFFFF" /> : editingId ? "Update Career" : "Add Career"}
          {loading && <span className="ml-2">Uploading...</span>}
        </button>
      </motion.div>

      {/* Right: Career List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 overflow-y-auto"
      >
        {fetching ? ( //  show spinner while fetching
          <div className="flex justify-center items-center h-40">
            <Spinner size={4} color="#53CAE9" />
          </div>) :
          careers.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No careers yet</p>
          ) : (
          <div className="flex flex-col gap-4">
            {careers.map((career) => (
              <div
                key={career.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4"
              >
                {career.image_path && (
                  <div className="w-full md:w-48 h-32 relative flex-shrink-0">
                    <Image
                      src={career.image_path}
                      alt={career.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg">{career.title}</h3>
                  <p className="text-gray-700 line-clamp-3">{career.content}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(career)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>

                    <Link
                      href={`/opportunities/careers/${career.slug}`}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(career.id)}
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
