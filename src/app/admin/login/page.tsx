"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      showError("Username and Password are required");
      return;
    }

    try {
      // Example login API call
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        showError(data.message || "Invalid login credentials");
        return;
      }

      // Redirect on success (replace with your dashboard route)
      window.location.href = "/admin/dashboard";
    } catch (err) {
      showError("Something went wrong. Please try again.");
    }
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 3000); // Hide after 3s
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-[#53CAE9] mb-6">
          Admin Login
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-white bg-[#F15D69] animate-fadeIn">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#53CAE9]"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F15D69]"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#53CAE9] hover:bg-[#FDBB3E] text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ICF Admin
        </p>
      </div>
    </div>
  );
}
