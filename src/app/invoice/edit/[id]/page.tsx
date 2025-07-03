/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// import { toast } from "react-toastify";


// interface LineItem {
//   project: string;
//   quantity: number;
//   rate: number;
// }

// interface InvoiceData {
//   _id: string;
//   invoiceNumber: string;
//   billTo: string;
//   shipTo: string;
//   date: string;
//   paymentTerms: string;
//   dueDate: string;
//   poNumber: string;
//   tax: string;
//   amountPaid: string;
//   notes: string;
//   terms: string;
//   items: LineItem[];
//   status?: string;
//   subtotal?: number;
//   total?: number;
// }

// export default function EditInvoicePage() {
//   const router = useRouter();
//   const params = useParams();
//   const invoiceId = params.id;
//   const [data, setData] = useState<InvoiceData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch invoice data from API
//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const response = await fetch(`/api/invoice/get/${invoiceId}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const result = await response.json();
//         setData(result.invoice);
//       } catch (err) {
//         console.error("Failed to fetch invoice:", err);
//         setError("Failed to load invoice data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (invoiceId) {
//       fetchInvoice();
//     }
//   }, [invoiceId]);

//   const handleChange = (field: keyof InvoiceData, value: any) => {
//     if (!data) return;
//     setData({ ...data, [field]: value });
//   };

//   const handleItemChange = (index: number, field: keyof LineItem, value: any) => {
//     if (!data) return;
//     const updatedItems = [...data.items];
//     updatedItems[index] = { ...updatedItems[index], [field]: value };
//     setData({ ...data, items: updatedItems });
//   };

//   const calculateAmount = (rate: number, quantity: number) => rate * quantity;
  
//   const calculateSubtotal = () =>
//     data?.items.reduce((acc, item) => acc + item.rate * item.quantity, 0) || 0;
  
//   const calculateTotal = () => {
//     const subtotal = calculateSubtotal();
//     const taxAmount = parseFloat(data?.tax || "0");
//     return subtotal + (subtotal * taxAmount) / 100;
//   };

//   const handleSave = async () => {
//     if (!data) return;

//     try {
//       const response = await fetch(`/api/invoice/update/${data._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...data,
//           subtotal: calculateSubtotal(),
//           total: calculateTotal(),
//           tax: data.tax,
//           amountPaid: Number(data.amountPaid),
//           items: data.items.map((item) => ({
//             ...item,
//             quantity: Number(item.quantity),
//             rate: Number(item.rate),
//           })),
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//       toast.success("Client updated successfully!");
//         router.push("/invoice");
//       } else {
//         alert("Error updating invoice: " + (result.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update client");
//     }
//   };

//   if (loading) return <div className="p-10 text-center">Loading invoice...</div>;
//   if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
//   if (!data) return <div className="p-10 text-center">No invoice data found.</div>;

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-10 mt-12 ml-52">
//       <div className="max-w-5xl mx-auto border shadow-md rounded-md p-6">
//         <div className="flex justify-between mb-6">
//           <div>
//             <Image src="/logo1.png" alt="Logo" width={80} height={80} />
//             <p className="text-sm mt-2 text-gray-600">
//               CINQDEV, office 25 Block E Phase 1 Johar Town,
//               <br />
//               Lahore, Pakistan
//             </p>
//           </div>
//           <div className="text-right">
//             <h1 className="text-3xl font-bold">EDIT INVOICE</h1>
//             <input
//               type="text"
//               value={data.invoiceNumber}
//               onChange={(e) => handleChange("invoiceNumber", e.target.value)}
//               className="mt-2 text-right border p-1"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="font-semibold text-gray-700">Bill To</label>
//             <input
//               value={data.billTo}
//               onChange={(e) => handleChange("billTo", e.target.value)}
//               className="mt-1 w-full border p-2"
//             />
//           </div>
//           <div>
//             <label className="font-semibold text-gray-700">Ship To</label>
//             <input
//               value={data.shipTo}
//               onChange={(e) => handleChange("shipTo", e.target.value)}
//               className="mt-1 w-full border p-2"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
//           <div>
//             <label className="font-semibold text-gray-700">Date</label>
//             <input
//               type="date"
//               value={data.date}
//               onChange={(e) => handleChange("date", e.target.value)}
//               className="w-full border p-2"
//             />
//           </div>
//           <div>
//             <label className="font-semibold text-gray-700">Payment Terms</label>
//             <input
//               value={data.paymentTerms}
//               onChange={(e) => handleChange("paymentTerms", e.target.value)}
//               className="w-full border p-2"
//             />
//           </div>
//           <div>
//             <label className="font-semibold text-gray-700">Due Date</label>
//             <input
//               type="date"
//               value={data.dueDate}
//               onChange={(e) => handleChange("dueDate", e.target.value)}
//               className="w-full border p-2"
//             />
//           </div>
//           <div>
//             <label className="font-semibold text-gray-700">PO Number</label>
//             <input
//               value={data.poNumber}
//               onChange={(e) => handleChange("poNumber", e.target.value)}
//               className="w-full border p-2"
//             />
//           </div>
//         </div>

//         <div>
//           <div className="grid grid-cols-5 gap-2 font-semibold text-white bg-gray-800 px-2 py-1 rounded-t-md text-xs sm:text-sm">
//             <div className="col-span-2">Item</div>
//             <div>Qty</div>
//             <div>Rate</div>
//             <div>Amount</div>
//           </div>

//           {data.items.map((item, idx) => (
//             <div key={idx} className="grid grid-cols-5 gap-2 items-center border-t p-2 text-sm">
//               <input
//                 className="col-span-2 border p-1"
//                 value={item.project}
//                 onChange={(e) => handleItemChange(idx, "project", e.target.value)}
//               />
//               <input
//                 type="number"
//                 className="border p-1"
//                 value={item.quantity}
//                 onChange={(e) => handleItemChange(idx, "quantity", +e.target.value)}
//                 min="1"
//               />
//               <input
//                 type="number"
//                 className="border p-1"
//                 value={item.rate}
//                 onChange={(e) => handleItemChange(idx, "rate", +e.target.value)}
//                 min="0"
//                 step="0.01"
//               />
//               <div>${calculateAmount(item.rate, item.quantity).toFixed(2)}</div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 grid md:grid-cols-5 gap-4">
//           <div className="md:col-span-3 text-sm">
//             <label className="font-semibold text-gray-700">Notes</label>
//             <textarea
//               value={data.notes}
//               onChange={(e) => handleChange("notes", e.target.value)}
//               className="w-full border p-2 mb-4"
//               rows={3}
//             />
//             <label className="font-semibold text-gray-700">Terms</label>
//             <textarea
//               value={data.terms}
//               onChange={(e) => handleChange("terms", e.target.value)}
//               className="w-full border p-2"
//               rows={3}
//             />
//           </div>

//           <div className="md:col-span-2 text-sm space-y-2">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>${calculateSubtotal().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Tax (%)</span>
//               <input
//                 type="number"
//                 value={data.tax}
//                 onChange={(e) => handleChange("tax", e.target.value)}
//                 className="border px-2 py-1 w-20 text-right"
//                 min="0"
//                 max="100"
//               />
//             </div>
//             <div className="flex justify-between font-semibold border-t pt-2">
//               <span>Total</span>
//               <span>${calculateTotal().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span>Amount Paid</span>
//               <input
//                 type="number"
//                 value={data.amountPaid}
//                 onChange={(e) => handleChange("amountPaid", e.target.value)}
//                 className="border px-2 py-1 w-20 text-right"
//                 min="0"
//                 step="0.01"
//               />
//             </div>
//             <div className="flex justify-between">
//               <span>Remaining</span>
//               <span>
//                 ${(calculateTotal() - parseFloat(data.amountPaid || "0")).toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center mt-4">
//               <span>Status</span>
//               <select
//                 value={data.status || "Pending"}
//                 onChange={(e) => handleChange("status", e.target.value)}
//                 className="border px-2 py-1"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 flex justify-between">
//           <button
//             onClick={() => router.push("/invoice")}
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//           >
//             ← Back
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-[#1A2331] text-white rounded "
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

interface LineItem {
  project: string;
  quantity: number;
  rate: number;
}

interface InvoiceData {
  _id: string;
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
  status?: string;
  subtotal?: number;
  total?: number;
}

interface ProjectOption {
  id: string;
  name: string;
  price: number;
}

interface ClientOption {
  id: string;
  name: string;
}

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = params.id;
  const [data, setData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectOptions, setProjectOptions] = useState<ProjectOption[]>([]);
  const [clientOptions, setClientOptions] = useState<ClientOption[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingClients, setLoadingClients] = useState(true);

  // Fetch projects and clients
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/project/fetch');
        const result = await response.json();
        if (response.ok) {
          setProjectOptions(result.projects || []);
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch('/api/client/fetch');
        const result = await response.json();
        if (response.ok) {
          setClientOptions(result.clients || []);
        }
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      } finally {
        setLoadingClients(false);
      }
    };

    fetchProjects();
    fetchClients();
  }, []);

  // Fetch invoice data
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`/api/invoice/get/${invoiceId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.invoice);
      } catch (err) {
        console.error("Failed to fetch invoice:", err);
        setError("Failed to load invoice data.");
      } finally {
        setLoading(false);
      }
    };

    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  const handleChange = (field: keyof InvoiceData, value: any) => {
    if (!data) return;
    setData({ ...data, [field]: value });
  };

  const handleItemChange = async (index: number, field: keyof LineItem, value: any) => {
    if (!data) return;
    const updatedItems = [...data.items];
    
    if (field === "project") {
      try {
        // Fetch rate for the selected project
        const response = await fetch(`/api/project/get-rate/${value}`);
        const result = await response.json();
        
        if (response.ok && result.rate) {
          updatedItems[index] = {
            ...updatedItems[index],
            project: value,
            rate: parseFloat(result.rate) || 0
          };
        } else {
          throw new Error('Failed to fetch rate');
        }
      } catch (err) {
        console.error("Error fetching project rate:", err);
        updatedItems[index] = {
          ...updatedItems[index],
          project: value,
          rate: 0
        };
      }
    } else if (field === "quantity") {
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: Math.max(1, parseInt(value) || 1)
      };
    } else if (field === "rate") {
      updatedItems[index] = {
        ...updatedItems[index],
        rate: Math.max(0, parseFloat(value) || 0)
      };
    }
    
    setData({ ...data, items: updatedItems });
  };

  const addItem = () => {
    if (!data) return;
    setData({
      ...data,
      items: [...data.items, { project: "", quantity: 1, rate: 0 }]
    });
  };

  const removeItem = (index: number) => {
    if (!data || data.items.length <= 1) return;
    const updatedItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: updatedItems });
  };

  const calculateAmount = (rate: number, quantity: number) => rate * quantity;
  
  const calculateSubtotal = () =>
    data?.items.reduce((acc, item) => acc + item.rate * item.quantity, 0) || 0;
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = parseFloat(data?.tax || "0");
    return subtotal + (subtotal * taxAmount) / 100;
  };

  const handleSave = async () => {
    if (!data) return;

    try {
      const response = await fetch(`/api/invoice/update/${data._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          subtotal: calculateSubtotal(),
          total: calculateTotal(),
          tax: data.tax,
          amountPaid: Number(data.amountPaid),
          items: data.items.map((item) => ({
            ...item,
            quantity: Number(item.quantity),
            rate: Number(item.rate),
          })),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Invoice updated successfully!");
        router.push("/invoice");
      } else {
        toast.error("Error updating invoice: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update invoice");
    }
  };

  if (loading || loadingProjects || loadingClients) {
    return <div className="p-10 text-center">Loading invoice...</div>;
  }
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-10 text-center">No invoice data found.</div>;

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 mt-12 ml-52">
      <div className="max-w-5xl mx-auto border shadow-md rounded-md p-6">
        <div className="flex justify-between mb-6">
          <div>
            <Image src="/logo1.png" alt="Logo" width={80} height={80} />
            <p className="text-sm mt-2 text-gray-600">
              CINQDEV, office 25 Block E Phase 1 Johar Town,
              <br />
              Lahore, Pakistan
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold">EDIT INVOICE</h1>
            <input
              type="text"
              value={data.invoiceNumber}
              onChange={(e) => handleChange("invoiceNumber", e.target.value)}
              className="mt-2 text-right border p-1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="font-semibold text-gray-700">Bill To*</label>
            <select
              value={data.billTo}
              onChange={(e) => handleChange("billTo", e.target.value)}
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
              value={data.shipTo}
              onChange={(e) => handleChange("shipTo", e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="(optional)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-sm">
          <div>
            <label className="font-semibold text-gray-700">Date</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Payment Terms</label>
            <input
              value={data.paymentTerms}
              onChange={(e) => handleChange("paymentTerms", e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Due Date</label>
            <input
              type="date"
              value={data.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="w-full border p-2"
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">PO Number</label>
            <input
              value={data.poNumber}
              onChange={(e) => handleChange("poNumber", e.target.value)}
              className="w-full border p-2"
            />
          </div>
        </div>

        <div>
          <div className="grid grid-cols-5 gap-2 font-semibold text-white bg-gray-800 px-2 py-1 rounded-t-md text-xs sm:text-sm">
            <div className="col-span-2">Project*</div>
            <div>Qty*</div>
            <div>Rate*</div>
            <div>Amount</div>
          </div>

          {data.items.map((item, idx) => (
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
              />
              <div className="p-1 border rounded-md bg-gray-100">
                ${calculateAmount(item.rate, item.quantity).toFixed(2)}
              </div>
              {data.items.length > 1 && (
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

        <div className="mt-6 grid md:grid-cols-5 gap-4">
          <div className="md:col-span-3 text-sm">
            <label className="font-semibold text-gray-700">Notes</label>
            <textarea
              value={data.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full border p-2 mb-4"
              rows={3}
            />
            <label className="font-semibold text-gray-700">Terms</label>
            <textarea
              value={data.terms}
              onChange={(e) => handleChange("terms", e.target.value)}
              className="w-full border p-2"
              rows={3}
            />
          </div>

          <div className="md:col-span-2 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Tax (%)</span>
              <input
                type="number"
                value={data.tax}
                onChange={(e) => handleChange("tax", e.target.value)}
                className="border px-2 py-1 w-20 text-right"
                min="0"
                max="100"
              />
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Amount Paid</span>
              <input
                type="number"
                value={data.amountPaid}
                onChange={(e) => handleChange("amountPaid", e.target.value)}
                className="border px-2 py-1 w-20 text-right"
                min="0"
                step="0.01"
              />
            </div>
            <div className="flex justify-between">
              <span>Remaining</span>
              <span>
                ${(calculateTotal() - parseFloat(data.amountPaid || "0")).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Status</span>
              <select
                value={data.status || "Pending"}
                onChange={(e) => handleChange("status", e.target.value)}
                className="border px-2 py-1"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => router.push("/invoice")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Back
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#1A2331] text-white rounded "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}