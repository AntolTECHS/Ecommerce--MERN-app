import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import API from "../utils/api";

export default function AuthModal({ open, onClose, onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(isLogin ? "/auth/login" : "/auth/register", form);
      onAuth(res.data);
      setError("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
        <DialogDescription>
          {isLogin ? "Login to your account" : "Create an account"}
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full border p-2 rounded"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            className="w-full border p-2 rounded"
            required
          />
          {error && <div className="text-red-500">{error}</div>}
          <DialogFooter>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              {isLogin ? "Login" : "Register"}
            </button>
            <button type="button" onClick={() => setIsLogin(x => !x)} className="text-sm underline">
              {isLogin ? "Need an account?" : "Already have an account?"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
