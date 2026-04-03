// components/RichTextEditor.tsx

"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useMemo, useRef } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Props = {
  value: string;
  onChange: (val: string) => void;
  folder?: string;
  preventDelete?: boolean;
};

export default function RichTextEditor({ value, onChange, folder = "blogs", preventDelete = false }: Props) {
  const prevValueRef = useRef(value);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: async function (this: any) {
            const quill = this.quill;
            const range = quill.getSelection();

            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";

            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;

              if (file.size > 1024 * 500) {
                alert("Image too large. Max size: 500KB.");
                return;
              }

              const formData = new FormData();
              formData.append("file", file);
              formData.append("folder", folder);

              try {
                const res = await fetch("/api/upload-image", {
                  method: "POST",
                  body: formData,
                });

                const data = await res.json();
                if (!res.ok || !data.url) {
                  alert(data.message || "Image upload failed. Try again.");
                  return;
                }

                quill.insertEmbed(range.index, "image", data.url);
              } catch (err) {
                console.error("Upload error:", err);
                alert("Something went wrong while uploading.");
              }
            };

            input.click();
          },
        },
      },
    }),
    [folder]
  );

  // Track deletions
  const handleChange = (newValue: string) => {
    // ✅ if preventDelete is true, skip deletion logic entirely
    if (preventDelete) {
      prevValueRef.current = newValue;
      onChange(newValue);
      return;
    }
    const prevValue = prevValueRef.current;

    // Find deleted images
    const prevImages = Array.from(prevValue.matchAll(/<img[^>]+src="([^">]+)"/g)).map(m => m[1]);
    const newImages = Array.from(newValue.matchAll(/<img[^>]+src="([^">]+)"/g)).map(m => m[1]);

    const deleted = prevImages.filter(url => !newImages.includes(url));

    if (deleted.length > 0) {
      deleted.forEach(async (url) => {
        try {
          await fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
          });
        } catch (err) {
          console.error("Failed to delete image:", err);
        }
      });
    }

    prevValueRef.current = newValue;
    onChange(newValue);
  };

  return (
    <div className="w-full">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        className="h-64 mb-4"
        placeholder="Write your content here..."
      />

      <style jsx global>{`
        .ql-editor img {
          max-width: 100%;
          height: auto;
          max-height: 400px;
          border-radius: 8px;
          margin: 1rem 0;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}