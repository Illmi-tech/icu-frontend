"use client";

import { useState, useEffect} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  content: string;
  slug: string;
  image_path?: string; // <-- updated
  imageFile?: File;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [formState, setFormState] = useState<Partial<Blog>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
   const fetchBlogs = async () => {
     try {
        setFetching(true);
       const res = await fetch("/api/blogs", { credentials: "include" });
       if (!res.ok) throw new Error("Failed to fetch blogs");
       const data = await res.json();
       setBlogs(data);
     } catch (error) {
       console.error("Error fetching blogs:", error);
     }finally {
      setFetching(false);
    }
   };
   fetchBlogs();
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
  const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";

  try {
    const res = await fetch(url, {
      method,
      body: formDataToSend,
      credentials: "include", // sends cookies if token is stored there
    });

    if (!res.ok) {
      const errorData = await res.json();
      return alert(errorData.message || "Error creating blog");
    }

    const newBlog = await res.json();

    //  Update local state with API response
    if (editingId !== null) {
      setBlogs((prev) =>
        prev.map((b) => (b.id === editingId ? { ...b, ...newBlog } : b))
      );
      setEditingId(null);
    } else {
      setBlogs((prev) => [newBlog, ...prev]); // add new blog at the top
    }

    setFormState({});
  } catch (error) {
    console.error("Error submitting blog:", error);
    alert("Something went wrong");
  }finally {
      setLoading(false); // stop loading
    }
};

  const handleEdit = (blog: Blog) => {
    setFormState(blog);
    setEditingId(blog.id);
  };

  const handleDelete = async (id: number) => {
  // Ask for confirmation first
  if (!confirm("Are you sure you want to delete this blog?")) return;

  // Optimistically remove the blog from UI
  const previousBlogs = [...blogs];
  setBlogs((prev) => prev.filter((b) => b.id !== id));

  try {
    const res = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete blog");

    // Optional: you can show a success toast here
  } catch (error) {
    console.error("Error deleting blog:", error);
    alert("Error deleting blog. Restoring it.");
    
    // Rollback: restore previous blog list
    setBlogs(previousBlogs);
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
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Blog" : "Create Blog"}</h2>
        
        <input
          type="text"
          name="title"
          placeholder="Blog title"
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
          placeholder="Blog content"
          value={formState.content || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 h-32 resize-none"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <Spinner size={2} color="#FFFFFF" /> : editingId ? "Update Blog" : "Create Blog"}
          {loading && <span className="ml-2">Uploading...</span>}
        </button>
      </motion.div>

      {/* Right: Blog List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 overflow-y-auto"
      >
        {fetching ? ( //  show spinner while fetching
          <div className="flex justify-center items-center h-40">
            <Spinner size={4} color="#53CAE9" />
          </div>) :
          blogs.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No blogs yet</p>
          ) : (
          <div className="flex flex-col gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row gap-4"
              >
                {blog.image_path && (
                  <div className="w-full md:w-48 h-32 relative flex-shrink-0">
                    <Image
                      src={blog.image_path}
                      alt={blog.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>

                    <Link
                      href={`/resources/blogs/${blog.slug}`}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
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
