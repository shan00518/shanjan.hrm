"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LineItem {
  project: string;
  quantity: number;
  rate: number;
}

interface InvoiceData {
  invoiceNumber: string;
  billTo: string;
  shipTo: string;
  date: string;
  paymentTerms: string;
  dueDate: string;
  poNumber: string;
  tax: string;
  amountPaid: string;
  notes: string;
  terms: string;
  items: LineItem[];
}

export default function Invoice() {
  const router = useRouter();
  const [data, setData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    // Simulated backend fetch
    const fetchInvoice = async () => {
      const invoice: InvoiceData = {
        invoiceNumber: "INV-1001",
        billTo: "Mr. Azam Ali",
        shipTo: "Lahore, Pakistan",
        date: "2025-06-01",
        paymentTerms: "Net 15",
        dueDate: "2025-06-16",
        poNumber: "PO-4567",
        tax: "10%",
        amountPaid: "400",
        notes: "The project has been completed from our side.",
        terms: "Payment due within 15 days of invoice.",
        items: [
          { project: "Chatbot Project", quantity: 1, rate: 100 },
          { project: "AI Model", quantity: 2, rate: 200 },
        ],
      };
      setData(invoice);
    };

    fetchInvoice();
  }, []);

  const calculateAmount = (rate: number, quantity: number) => rate * quantity;
  const calculateTotal = () => data?.items.reduce((acc, item) => acc + item.rate * item.quantity, 0) || 0;

  if (!data) return <div className="p-10 text-center">Loading invoice...</div>;

  return (
    <div className="min-h-screen ml-30 bg-white p-4 md:p-10 mt-12">
      <div className="max-w-5xl md:ml-[220px] mx-auto border shadow-md rounded-md p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <Image src="/logo1.png" alt="Logo" width={80} height={80} />
            <p className="text-sm mt-2 text-gray-600">
              CINQDEV, office 25 Block E Phase 1 Johar Town,<br />
              Lahore, Pakistan
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold">INVOICE</h1>
            <p className="mt-2 text-gray-600 text-right">{data.invoiceNumber}</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="font-semibold text-gray-700">Bill To</label>
            <p className="mt-1">{data.billTo}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Ship To</label>
            <p className="mt-1">{data.shipTo}</p>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Payment Terms:</strong> {data.paymentTerms}</p>
          <p><strong>Due Date:</strong> {data.dueDate}</p>
          <p><strong>PO Number:</strong> {data.poNumber}</p>
        </div>

        {/* Line Items */}
        <div>
          <div className="grid grid-cols-5 gap-2 font-semibold text-white bg-gray-800 px-2 py-1 rounded-t-md text-xs sm:text-sm">
            <div className="col-span-2">Item</div>
            <div>Qty</div>
            <div>Rate</div>
            <div>Amount</div>
          </div>

          {data.items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-2 items-center border-t p-2 text-sm">
              <div className="col-span-2">{item.project}</div>
              <div>{item.quantity}</div>
              <div>${item.rate.toFixed(2)}</div>
              <div>${calculateAmount(item.rate, item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Notes and Summary */}
        <div className="mt-6 grid md:grid-cols-5 gap-4">
          <div className="md:col-span-3 text-sm">
            <div className="mb-4">
              <label className="font-semibold text-gray-700">Notes</label>
              <p className="mt-1">{data.notes}</p>
            </div>
            <div>
              <label className="font-semibold text-gray-700">Terms</label>
              <p className="mt-1">{data.terms}</p>
            </div>
          </div>

          <div className="md:col-span-2 text-sm">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax</span>
              <span>{data.tax}</span>
            </div>
            <div className="flex justify-between font-semibold py-2 border-t">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Amount Paid</span>
              <span>${data.amountPaid}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Remaining</span>
              <span>${(calculateTotal() - parseFloat(data.amountPaid || "0")).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ← Back
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 bg-[#1F2937] text-white rounded">
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
