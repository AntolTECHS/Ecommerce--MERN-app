import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import API from "../utils/api";

export default function STKModal({ open, onClose, amount, onPaid }) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handlePay = async () => {
    try {
      setStatus("Processing...");
      setError("");
      await API.post("/mpesa/stk", { phone, amount });
      setStatus("Prompt sent! Check your phone to complete payment by entering the Mpesa Pin.");
      onPaid && onPaid();
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
      setStatus("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Pay via M-Pesa STK Push</DialogTitle>
        <DialogDescription>Enter your M-Pesa phone number to receive payment prompt</DialogDescription>
        <input
          type="text"
          placeholder="2547XXXXXXXX"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full border p-2 rounded my-2"
        />
        {status && <div className="text-green-500">{status}</div>}
        {error && <div className="text-red-500">{error}</div>}
        <DialogFooter>
          <button
            onClick={handlePay}
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={!phone}
          >
            Pay {amount} KES
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
