"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ secretKey: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "✅ Login successful.");
        router.push("/");
      } else {
        setMessage(data.message || "❌ Login failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input    
            type="password"
            name="secretKey"
            placeholder="Enter Secret Key"
            className="w-full p-3 border border-gray-300 rounded-lg "
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#182131] text-white font-semibold p-3 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {message && (
            <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
