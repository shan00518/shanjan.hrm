"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { RiPencilFill } from "react-icons/ri";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";

export default function Reports() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      date: "Jan 1, 2002",
      email: "alikhan@example.com",
      role: "Project Manager",
      day: "Monday",
      holiday: "New Year",
      status: "Off",
    },
    {
      id: 2,
      date: "Nov 9, 2002",
      email: "alikhan@example.com",
      role: "Project Manager",
      day: "Tuesday",
      holiday: "New Year",
      status: "Off",
    },
    {
      id: 3,
      date: "Jan 12, 2022",
      day: "Sunday",
      holiday: "New Year",
      status: "Off",
    },
  ]);
  
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [holiday, setHoliday] = useState("");
  const [status, setStatus] = useState("On");
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const resetForm = () => {
    setDate("");
    setDay("");
    setHoliday("");
    setStatus("Off");
    setEditingId(null);
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const newClient = {
      id: Date.now(),
      date,
      email: `${date.toLowerCase().replace(/\s+/g, "")}@example.com`,
      role: "Project Manager",
      day,
      holiday,
      status,
    };
    setClients((prev) => [...prev, newClient]);
    resetForm();
    setShowAddModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setClients((prev) =>
      prev.map((client) =>
        client.id === editingId
          ? { ...client, date, day, holiday, status }
          : client
      )
    );
    resetForm();
  };

  const handleEditClient = (client) => {
    setEditingId(client.id);
    setDate(client.date);
    setDay(client.day);
    setHoliday(client.holiday);
    setStatus(client.status);
  };

  const handleDeleteClient = () => {
    setClients((prev) =>
      prev.filter((client) => client.id !== deleteTarget.id)
    );
    setDeleteTarget(null);
  };

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-[] md:w-full">
      <aside className="w-[15%] hidden md:block p-4">
        <p className="font-semibold">Sidebar</p>
      </aside>

      <main className="sm:w-[100%] md:w-[70%] lg:w-[73%] xl:w-[80%] 2xl:w-[82%] border-[1px] rounded-lg px-6 py-8 xl:mx-auto mt-[100px] md:mt-16 md:ml-28 lg:ml-26 xl:ml-12 2xl:ml-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-1/2 mb-4">
            <FaSearch className="absolute top-4 left-3 text-gray-400 text-sm md:text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-sm md:text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="bg-[#192232] text-white px-4 py-2 rounded-lg hover:bg-[#192443] transition"
          >
            Add New Holiday
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
              <h2 className="text-lg font-semibold mb-4">Add New Holiday</h2>
              <form onSubmit={handleAddClient} className="space-y-4">
                <input
                  type="text"
                  placeholder="Date (e.g. Jan 1, 2023)"
                  className="border p-2 rounded w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Day (e.g. Monday)"
                  className="border p-2 rounded w-full"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Holiday Name"
                  className="border p-2 rounded w-full"
                  value={holiday}
                  onChange={(e) => setHoliday(e.target.value)}
                  required
                />
                <select
                  className="border p-2 rounded w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>On</option>
                  <option>Off</option>
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
                    Save Holiday
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[400px] text-center">
              <h2 className="text-lg font-semibold mb-4">Delete Holiday</h2>
              <p className="mb-6">
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.holiday}</strong>?
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
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Sr. No.</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Day</th>
                <th className="p-3 border-b">Holiday</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <tr key={client.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border-b">{index + 1}</td>
                  {editingId === client.id ? (
                    <>
                      <td className="p-3 border-b">
                        <input
                          type="text"
                          className="border p-1 rounded w-full"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </td>
                      <td className="p-3 border-b">
                        <input
                          type="text"
                          className="border p-1 rounded w-full"
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                        />
                      </td>
                      <td className="p-3 border-b">
                        <input
                          type="text"
                          className="border p-1 rounded w-full"
                          value={holiday}
                          onChange={(e) => setHoliday(e.target.value)}
                        />
                      </td>
                      <td className="p-3 border-b">
                        <select
                          className="border p-1 rounded w-full"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option>On</option>
                          <option>Off</option>
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
                      <td className="p-3 border-b">{client.date}</td>
                      <td className="p-3 border-b">{client.day}</td>
                      <td className="p-3 border-b">{client.holiday}</td>
                      <td className="p-3 border-b">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            client.status === "On"
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

        <div className="flex gap-2 mt-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="holidayMobile" />
            Upcoming
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="holidayMobile" />
            Past Holidays
          </label>
        </div>
      </main>
    </div>
  );
}