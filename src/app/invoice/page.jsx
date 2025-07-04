

"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { RiPencilFill } from "react-icons/ri";
import { FaRegTrashAlt, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

export default function ClientsPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key state
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/invoice/list");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInvoices(data.invoices || []);
                toast.success("Invoices loaded successfully!");

      } catch (err) {
        console.error("Failed to fetch invoices:", err);
        setError("Failed to load invoices.");
        toast.error("Error loading invoices.");

      } finally {
        setIsLoading(false);
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
            toast.success("Invoice deleted successfully.");

    } catch (err) {
      console.error("Error deleting invoice:", err);
      toast.error("Failed to delete invoice.");
    }
  };

  const formatDate = (dateString) => {

    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      date: 'numeric',
      // day: 'numeric'
    });
  };
  const pageSize = 8;
  const startIndex = (activePage - 1) * pageSize;

  const search = searchTerm.toLowerCase();
  const filteredInvoices = invoices
    .map((inv, index) => ({ ...inv, originalIndex: index })) // Add original index
    .filter((inv) => {
      return (
        inv.invoiceNumber?.toString().toLowerCase().includes(search) ||
        //  inv.amountPaid?.toString().toLowerCase().includes(search) ||
        inv.status?.toLowerCase().includes(search) ||
        (inv.originalIndex + 1).toString() === search
      );
    });



  // const startIndex = (activePage - 1) * pageSize;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredInvoices.length / pageSize);


  return (
    <div className="flex">
      <aside className="md:w-[25%] lg:w-[15%]  hidden md:block p-4">

        {isLoading && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/30 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4">
              {/* Dual Ring Spinner */}
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin-slow shadow-lg"></div>
                <div className="absolute inset-3 rounded-full border-4 border-indigo-500 border-b-transparent animate-spin-fast shadow-inner"></div>
              </div>

              {/* Optional Logo or Icon */}
              {/* <img src="/logo.svg" alt="Logo" className="w-10 h-10 opacity-80" /> */}

              {/* Loading Text */}
              <p className="text-lg font-medium text-gray-800 tracking-wide animate-pulse">
                Loading Invoce...
              </p>
            </div>
          </div>
        )}


        month: 'short',
        <p className="font-semibold">Sidebar</p>
      </aside>

      <main className="w-full md:w-[70%] lg:w-[73%] xl:w-[80%]  2xl:w-[82%] 2xl:ml-6 xl:ml-12 border-[1px]   lg:ml-24 m-auto rounded-lg px-6 py-8 mt-[100px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4  ">
          {/* <h1 className="text-2xl font-bold">Invoice Table</h1> */}

          <div className="relative mb-4">
            <FaSearch className="absolute top-4 left-3 text-gray-400 text-sm md:text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-sm md:text-lg"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActivePage(1); // Reset pagination
              }}
            />


          </div>
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


        <div className="overflow-x-auto max-h-[calc(100vh-200px)] overflow-y-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-3 border-b">Invoice #</th>
                {/* <th className="p-3 border-b">Client ID</th> */}
                <th className="p-3 border-b">Date</th>
                {/* <th className="p-3 border-b">Items</th> */}
                <th className="p-3 border-b">Subtotal</th>
                {/* <th className="p-3 border-b">Tax</th> */}
                <th className="p-3 border-b">Total</th>
                <th className="p-3 border-b">Amount Paid</th>
                <th className="p-3 border-b">Due Amount </th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedInvoices.map((invoice, i) => (

                <tr key={invoice._id} className="hover:bg-gray-50 transition">
                  {/* <td className="p-3 border-b">{invoice.invoiceNumber || '-'}</td> */}
                  <td className="p-3 border-b">{invoice.originalIndex + 1}</td>
                  {/* <td className="p-3 border-b">{invoice.billTo || '-'}</td> */}
                  <td className="p-3 border-b">{formatDate(invoice.dueDate)}</td>
                  {/* <td className="p-3 border-b">{formatDate(invoice.date)}</td> */}
                  {/* <td className="p-3 border-b">
                      {invoice.items?.length || 0} items
                    </td> */}
                  <td className="p-3 border-b">${invoice.subTotal?.toFixed(2) || '0.00'}</td>
                  {/* <td className="p-3 border-b">${invoice.taxAmount?.toFixed(2) || '0.00'}</td> */}
                  <td className="p-3 border-b">${invoice.total?.toFixed(2) || '0.00'}</td>
                  <td className="p-3 border-b">${invoice.amountPaid?.toFixed(2) || '0.00'}</td>
                  <td className="p-3 border-b">
                    ${invoice.dueAmount?.toFixed(2) ||
                      ((invoice.total || 0) - (invoice.amountPaid || 0)).toFixed(2)}
                  </td>
                  <td className="p-3 border-b">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${invoice.status === "Completed"
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


        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <p className="text-sm md:text-md">
            Showing {filteredInvoices.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + pageSize, filteredInvoices.length)} out of{" "}
            {filteredInvoices.length} records
          </p>

          <div className="flex items-center gap-2 text-sm md:text-sm">
            <FaChevronLeft
              className="cursor-pointer"
              onClick={() => setActivePage((prev) => Math.max(prev - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setActivePage(num)}
                className={`px-3 py-1 rounded-sm ${num === activePage
                    ? "border border-[#7152F3] text-[#7152F3] font-bold"
                    : "text-black"
                  }`}
              >
                {num}
              </button>
            ))}
            <FaChevronRight
              className="cursor-pointer"
              onClick={() => setActivePage((prev) => Math.min(prev + 1, totalPages))}
            />
          </div>
        </div>

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