

"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { RiPencilFill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function ClientsPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key state

  // Fetch invoices from API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/invoice/list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInvoices(data.invoices || []);
      } catch (err) {
        console.error("Failed to fetch invoices:", err);
        setError("Failed to load invoices.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [refreshKey]); // Add refreshKey as dependency

  const handleDeleteClient = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/invoice/delete/${deleteTarget._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete invoice");

      setInvoices((prev) =>
        prev.filter((invoice) => invoice._id !== deleteTarget._id)
      );

      setDeleteTarget(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Error deleting invoice:", err);
      alert("Failed to delete invoice. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      day: 'numeric'
    });
  };
  
  return (
    <div className="flex">
      <aside className="w-[15%] hidden md:block p-4">
      month: 'short',
        <p className="font-semibold">Sidebar</p>
      </aside>

      <main className="w-full md:w-[70%] lg:w-[73%] xl:w-[80%] 2xl:w-[82%] border-[1px] ml-12 rounded-lg px-6 py-8 mt-[100px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Invoice Table</h1>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/invoice/add")}
              className="bg-[#192232] text-white px-4 py-2 rounded-lg hover:bg-[#192443] transition"
            >
              Add Invoice
            </button>
            <button className="flex bg-[#192232] text-white px-4 py-2 rounded-lg hover:bg-[#192443] transition">
              <BiExport className="mr-2 text-lg" />
              Export
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading invoices...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : invoices.length === 0 ? (
          <p>No invoices found.</p>
        ) : (
          <div className="overflow-x-auto max-h-[calc(100vh-200px)] overflow-y-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 border-b">Invoice #</th>
                  {/* <th className="p-3 border-b">Client ID</th> */}
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Items</th>
                  <th className="p-3 border-b">Subtotal</th>
                  {/* <th className="p-3 border-b">Tax</th> */}
                  <th className="p-3 border-b">Total</th>
                  <th className="p-3 border-b">Amount Paid</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border-b">{invoice.invoiceNumber || '-'}</td>
                    {/* <td className="p-3 border-b">{invoice.billTo || '-'}</td> */}
                    <td className="p-3 border-b">{formatDate(invoice.dueDate)}</td>
                    <td className="p-3 border-b">
                      {invoice.items?.length || 0} items
                    </td>
                    <td className="p-3 border-b">${invoice.subtotal?.toFixed(2) || '0.00'}</td>
                    {/* <td className="p-3 border-b">${invoice.taxAmount?.toFixed(2) || '0.00'}</td> */}
                    <td className="p-3 border-b">${invoice.total?.toFixed(2) || '0.00'}</td>
                    <td className="p-3 border-b">${invoice.amountPaid?.toFixed(2) || '0.00'}</td>
                    <td className="p-3 border-b">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          invoice.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {invoice.status || 'Pending'}
                      </span>
                    </td>
                    <td className="p-3 border-b">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/invoice/edit/${invoice._id}`)}
                          className="text-[#192232] hover:text-[#192443]"
                        >
                          <RiPencilFill />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteTarget(invoice);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaRegTrashAlt />
                        </button>
                        <button
onClick={() => router.push("/invoice/view")}
                          className="text-green-600 hover:text-green-800"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete invoice {deleteTarget?.invoiceNumber}?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleDeleteClient}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}