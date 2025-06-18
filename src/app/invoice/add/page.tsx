






'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type InvoiceItem = {
  project: string;
  quantity: number;
  rate: number;
};

type ProjectOption = {
  [x: string]: string;
  id: string;
  name: string;
  price: number;
};

type ClientOption = {
  id: string;
  name: string;
};

export default function Invoice() {
  const router = useRouter();

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [billTo, setBillTo] = useState("");
  const [shipTo, setShipTo] = useState("");
  const [date, setDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [tax, setTax] = useState("0");
  const [amountPaid, setAmountPaid] = useState("0");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    { project: "", quantity: 1, rate: 0 },
  ]);

  const [projectOptions, setProjectOptions] = useState<ProjectOption[]>([]);
  const [clientOptions, setClientOptions] = useState<ClientOption[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingClients, setLoadingClients] = useState(true);

  // Fetch projects and clients on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/project/fetch');
        const data = await response.json();
        if (response.ok) {
          setProjectOptions(data.projects || []);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch('/api/client/fetch');
        const data = await response.json();
        if (response.ok) {
          setClientOptions(data.clients || []);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoadingClients(false);
      }
    };

    fetchProjects();
    fetchClients();
  }, []);

  const addItem = () => {
    setItems([...items, { project: "", quantity: 1, rate: 0 }]);
  };

  const handleItemChange = async (index: number, field: keyof InvoiceItem, value: string) => {
    const updatedItems = [...items];
    
    if (field === "project") {
      try {
        // Fetch rate for the selected project
        const response = await fetch(`/api/project/get-rate/${value}`);
        const data = await response.json();
        
        if (response.ok && data.rate) {
          updatedItems[index] = {
            project: value,
            quantity: updatedItems[index].quantity,
            rate: parseFloat(data.rate) || 0
          };
        } else {
          throw new Error('Failed to fetch rate');
        }
      } catch (error) {
        console.error("Error fetching project rate:", error);
        updatedItems[index] = {
          project: value,
          quantity: updatedItems[index].quantity,
          rate: 0
        };
      }
    } else if (field === "quantity") {
      updatedItems[index].quantity = Math.max(1, parseInt(value) || 1);
    } else if (field === "rate") {
      updatedItems[index].rate = Math.max(0, parseFloat(value) || 0);
    }
    
    setItems(updatedItems);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((acc, item) => acc + item.rate * item.quantity, 0);
  const taxPercent = parseFloat(tax);
  const taxAmount = subtotal * (isNaN(taxPercent) ? 0 : taxPercent / 100);
  const total = subtotal + taxAmount;

  const handleSaveInvoice = async () => {
    if (!invoiceNumber.trim() || !billTo.trim()) {
      alert("Please fill in required fields: Invoice Number and Bill To");
      return;
    }

    if (items.some(item => !item.project.trim() || item.quantity < 1)) {
      alert("Each item must have a valid project and quantity.");
      return;
    }

    const invoiceData = {
      invoiceNumber: invoiceNumber.trim(),
      billTo: billTo.trim(),
      shipTo: shipTo.trim(),
      date: date || null,
      paymentTerms: paymentTerms.trim(),
      dueDate: dueDate || null,
      poNumber: poNumber.trim(),
      items: items.map(i => ({
        project: i.project.trim(),
        quantity: i.quantity,
        rate: i.rate,
      })),
      tax: taxPercent || 0,
      amountPaid: parseFloat(amountPaid) || 0,
      notes: notes.trim(),
      terms: terms.trim(),
      subtotal,
      taxAmount,
      total,
    };

    try {
      const response = await fetch('/api/invoice/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Invoice save failed');
      }

   alert("Invoice saved successfully!");
console.log("Redirecting to /invoice...");
router.push("/invoice");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert("Error saving invoice: " + error.message);
    }
  };

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
            <input
              type="text"
              placeholder="# Enter invoice number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="mt-2 text-gray-600 text-right border-b border-gray-300 focus:outline-none bg-transparent"
              required
            />
          </div>
        </div>

        {/* Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="font-semibold text-gray-700">Bill To*</label>
            <select
              value={billTo}
              onChange={(e) => setBillTo(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md bg-white"
              required
              disabled={loadingClients}
            >
              <option value="">Select Client</option>
              {clientOptions.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-gray-700">Ship To</label>
            <input
              type="text"
              value={shipTo}
              onChange={(e) => setShipTo(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="(optional)"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Payment Terms"
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="PO Number"
            value={poNumber}
            onChange={(e) => setPoNumber(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>

        {/* Items */}
        <div>
          <div className="grid grid-cols-5 gap-2 font-semibold text-white bg-gray-800 px-2 py-1 rounded-t-md text-xs sm:text-sm">
            <div className="col-span-2">Project*</div>
            <div>Qty*</div>
            <div>Rate*</div>
            <div>Amount</div>
          </div>

          {items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-2 items-center border-t p-2 text-sm relative">
              <select
                value={item.project}
                onChange={(e) => handleItemChange(idx, "project", e.target.value)}
                className="col-span-2 p-1 border rounded-md bg-white"
                required
                disabled={loadingProjects}
              >
                <option value="">Select Project</option>
                {projectOptions.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                className="p-1 border rounded-md"
                min="1"
                required
              />
              <input
                type="number"
                value={item.rate}
                onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                className="p-1 border rounded-md"
                step="0.01"
                min="0"
                required
                readOnly
              />
              <input
                type="text"
                value={(item.quantity * item.rate).toFixed(2)}
                readOnly
                className="p-1 border rounded-md bg-gray-100"
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="absolute top-1 right-1 text-red-600 font-bold"
                  title="Remove item"
                >
                  ×
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>

        {/* Summary */}
        <div className="mt-6 max-w-md ml-auto p-4 border rounded-md">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <label htmlFor="tax" className="mr-2">Tax %:</label>
            <input
              id="tax"
              type="number"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              className="w-20 p-1 border rounded-md"
              min="0"
              step="0.01"
            />
            <span className="ml-auto">${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <label htmlFor="amountPaid" className="mr-2">Amount Paid:</label>
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="w-24 p-1 border rounded-md"
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Notes and Terms */}
        <div className="mt-6">
          <label className="block font-semibold mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border p-2 rounded-md"
            rows={3}
            placeholder="Add any notes here..."
          />
        </div>

        <div className="mt-4">
          <label className="block font-semibold mb-1">Terms</label>
          <textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            className="w-full border p-2 rounded-md"
            rows={3}
            placeholder="Add payment terms here..."
          />
        </div>

        {/* Save button */}
        <div className="mt-6 text-right">
          <button
            onClick={handleSaveInvoice}
            className="px-6 py-2 bg-[#1A2331] text-white rounded "
            disabled={loadingProjects || loadingClients}
          >
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}