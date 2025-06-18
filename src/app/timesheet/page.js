"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { RiPencilFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt, FaSearch } from "react-icons/fa";

export default function Timesheet() {
  const [activePage, setActivePage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Leasie",
      email: "alikhan@example.com",
      role: "Project Manager",
      designation: "Website",
      type: "Office",
      check: "11:10",
      status: "On Time",
    },
    {
      id: 2,
      name: "John",
      role: "Developer",
      designation: "Mobile App",
      type: "Remote",
      check: "10:10",
      status: "Off Time",
    },
    {
      id: 3,
      name: "Sarah",
      role: "Designer",
      designation: "UI/UX",
      type: "Office",
      check: "10:50",
      status: "On Time",
    },
    {
      id: 4,
      name: "Mike",
      role: "QA Engineer",
      designation: "Testing",
      type: "Remote",
      check: "09:30",
      status: "On Time",
    },
    {
      id: 5,
      name: "Emily",
      role: "Product Manager",
      designation: "Website",
      type: "Office",
      check: "09:00",
      status: "On Time",
    },
    {
      id: 6,
      name: "David",
      role: "Backend Developer",
      designation: "API",
      type: "Remote",
      check: "10:15",
      status: "Off Time",
    },
    {
      id: 7,
      name: "Lisa",
      role: "Frontend Developer",
      designation: "Website",
      type: "Office",
      check: "09:45",
      status: "On Time",
    },
    {
      id: 8,
      name: "Robert",
      role: "DevOps",
      designation: "Infrastructure",
      type: "Remote",
      check: "11:30",
      status: "Off Time",
    },
    {
      id: 9,
      name: "Anna",
      role: "Data Analyst",
      designation: "Reports",
      type: "Office",
      check: "10:00",
      status: "On Time",
    }
  ]);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [type, setType] = useState("");
  const [check, setCheck] = useState("");
  const [status, setStatus] = useState("On Time");
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Pagination settings
  const recordsPerPage = 3;
  const totalPages = Math.ceil(clients.length / recordsPerPage);
  const startIndex = (activePage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentClients = clients.slice(startIndex, endIndex);

  const resetForm = () => {
    setName("");
    setDesignation("");
    setType("");
    setCheck("");
    setStatus("On Time");
    setEditingId(null);
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const newClient = {
      id: Date.now(),
      name,
      email: `${name.toLowerCase().replace(/\s+/g, "")}@example.com`,
      role: "Project Manager",
      designation,
      type,
      check,
      status,
    };
    setClients((prev) => [...prev, newClient]);
    resetForm();
    setShowAddModal(false);
    // If adding a new client causes a new page to be needed, go to that page
    if (clients.length % recordsPerPage === 0) {
      setActivePage(Math.ceil((clients.length + 1) / recordsPerPage));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setClients((prev) =>
      prev.map((client) =>
        client.id === editingId
          ? { ...client, name, designation, type, check, status }
          : client
      )
    );
    resetForm();
  };

  const handleEditClient = (client) => {
    setEditingId(client.id);
    setName(client.name);
    setDesignation(client.designation);
    setType(client.type);
    setCheck(client.check);
    setStatus(client.status);
  };

  const handleDeleteClient = () => {
    // Check if deleting the last item on the current page
    const isLastItemOnPage = currentClients.length === 1;
    const isNotFirstPage = activePage > 1;
    
    setClients((prev) =>
      prev.filter((client) => client.id !== deleteTarget.id)
    );
    
    // If we deleted the last item on the page and we're not on the first page, go back a page
    if (isLastItemOnPage && isNotFirstPage) {
      setActivePage(prev => prev - 1);
    }
    
    setDeleteTarget(null);
  };

  return (
    <div className="flex">
      <aside className="w-[15%] hidden md:block p-4">
        <p className="font-semibold">Sidebar</p>
      </aside>

      <main className="w-full md:w-[70%] lg:w-[73%] xl:w-[80%] 2xl:w-[82%] border-[1px] rounded-lg px-6 py-8 md:px- lg:px- xl:mx-aut mt-[100px] md:ml-26 lg:ml-26 xl:ml-12 2xl:ml-6">
        {!selectedClient ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full sm:w-1/2 mb-4">
                <div className="bg-white border-[1px] border-gray-200 p-4 rounded-xl">
                  <div className="relative mb-4">
                    <FaSearch className="absolute top-4 left-3 text-gray-400 text-sm md:text-sm" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-sm md:text-lg"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="bg-[#192232] text-white px-4 py-2 rounded-lg hover:bg-[#192443] transition"
              >
                Add TimeSheet
              </button>
            </div>
            

            {showAddModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl">
                <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
                  <h2 className="text-lg font-semibold mb-4">Add New Client</h2>
                  <form onSubmit={handleAddClient} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Client Name"
                      className="border p-2 rounded w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Designation"
                      className="border p-2 rounded w-full"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Type"
                      className="border p-2 rounded w-full"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Check"
                      className="border p-2 rounded w-full"
                      value={check}
                      onChange={(e) => setCheck(e.target.value)}
                      required
                    />
                    <select
                      className="border p-2 rounded w-full"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>On Time</option>
                      <option>Off Time</option>
                    </select>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setShowAddModal(false);
                        }}
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#192443] text-white px-4 py-2 rounded hover:bg-[#192443]"
                      >
                        Save Client
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {deleteTarget && (
              <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl">
                <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[400px] text-center">
                  <h2 className="text-lg font-semibold mb-4">Delete Client</h2>
                  <p className="mb-6">
                    Are you sure you want to delete{" "}
                    <strong>{deleteTarget.name}</strong> profile?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setDeleteTarget(null)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteClient}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-gray-10">
                  <tr>
                    <th className="p-3 border-b">Sr. No.</th>
                    <th className="p-3 border-b">Employee Name</th>
                    <th className="p-3 border-b">Designation</th>
                    <th className="p-3 border-b">Type</th>
                    <th className="p-3 border-b">CheckIn Time</th>
                    <th className="p-3 border-b">Status</th>
                    <th className="p-3 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentClients.map((client, index) => (
                    <tr key={client.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border-b">{startIndex + index + 1}</td>
                      {editingId === client.id ? (
                        <>
                          <td className="p-3 border-b">
                            <input
                              type="text"
                              className="border p-1 rounded w-full"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </td>
                          <td className="p-3 border-b">
                            <input
                              type="text"
                              className="border p-1 rounded w-full"
                              value={designation}
                              onChange={(e) => setDesignation(e.target.value)}
                            />
                          </td>
                          <td className="p-3 border-b">
                            <input
                              type="text"
                              className="border p-1 rounded w-full"
                              value={type}
                              onChange={(e) => setType(e.target.value)}
                            />
                          </td>
                          <td className="p-3 border-b">
                            <input
                              type="time"
                              className="border p-1 rounded w-full"
                              value={check}
                              onChange={(e) => setCheck(e.target.value)}
                            />
                          </td>
                          <td className="p-3 border-b">
                            <select
                              className="border p-1 rounded w-full"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              <option>On Time</option>
                              <option>Off Time</option>
                            </select>
                          </td>
                          <td className="p-3 border-b flex gap-2">
                            <button
                              onClick={handleEditSubmit}
                              className="bg-[#192443] text-white px-3 py-2 rounded hover:bg-[#0f1a31] flex items-center gap-1"
                            >
                              <Check size={16} />
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 border-b">{client.name}</td>
                          <td className="p-3 border-b">{client.designation}</td>
                          <td className="p-3 border-b">{client.type}</td>
                          <td className="p-3 border-b">{client.check}</td>
                          <td className="p-3 border-b">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                client.status === "On Time"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {client.status}
                            </span>
                          </td>
                          <td className="p-3 border-b">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditClient(client)}
                                className="text-[#192232] hover:text-[#192443]"
                              >
                                <RiPencilFill />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(client)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm md:text-md">Showing</p>
                <select className="w-16 p-1 text-sm md:text-md outline-0 border border-gray-300 rounded-md bg-[#ebebeb]">
                  {[10, 9, 8, 7].map((num) => (
                    <option key={num}>{num}</option>
                  ))}
                </select>
              </div>

              <p className="text-sm md:text-md">
                Showing {startIndex + 1} to {Math.min(endIndex, clients.length)} of {clients.length} records
              </p>

              <div className="flex items-center gap-2 text-sm md:text-sm">
                <FaChevronLeft
                  className={`cursor-pointer ${activePage === 1 ? "opacity-50" : ""}`}
                  onClick={() => {
                    if (activePage > 1) setActivePage(prev => prev - 1);
                  }}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setActivePage(num)}
                    className={`px-3 py-1 rounded-sm ${
                      num === activePage
                        ? "border border-[#7152F3] text-[#7152F3] font-bold"
                        : "text-black"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <FaChevronRight
                  className={`cursor-pointer ${activePage === totalPages ? "opacity-50" : ""}`}
                  onClick={() => {
                    if (activePage < totalPages) setActivePage(prev => prev + 1);
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            <button
              onClick={() => setSelectedClient(null)}
              className="mb-4 text-blue-600 underline"
            >
              ← Back to Clients
            </button>
          </div>
        )}
      </main>
    </div>
  );
}