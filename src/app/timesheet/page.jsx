


"use client";

import { useState, useEffect } from "react";
import { RiPencilFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt, FaSearch } from "react-icons/fa";

export default function Timesheet() {
  const [activePage, setActivePage] = useState(1);
  const [employeeId, setEmployeeId] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states (simplified to focus on time)
  const [name, setName] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [status, setStatus] = useState("On Time");
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);

  // Pagination settings
  const recordsPerPage = 10;
  const startIndex = (activePage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;




  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employee/list');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();

      if (!data.employees || !Array.isArray(data.employees)) {
        throw new Error('Invalid data format received from API');
      }

      // Store employees in state for select dropdown
      setEmployees(data.employees);

      // Optional: also prepare default timesheet view
      const entries = data.employees.map(employee => ({
        id: employee._id,
        name: `${employee.firstName} ${employee.lastName}`,
        checkInTime: "09:00",
        status: "On Time",
      }));

      setTimesheetEntries(entries);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  fetchEmployees();
}, []);


  // Filter timesheet entries based on search term
  const filteredEntries = timesheetEntries.filter((entry, index) => {
    const srNo = index + 1;
    const search = searchTerm.toLowerCase();
    return (
      (entry.name && entry.name.toLowerCase().includes(search)) ||
      (entry.checkInTime && entry.checkInTime.toLowerCase().includes(search)) ||
      (entry.status && entry.status.toLowerCase().includes(search)) ||
      srNo.toString().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredEntries.length / recordsPerPage);
  const currentEntries = filteredEntries.slice(startIndex, endIndex);

  const resetForm = () => {
    setName("");
    setCheckInTime("");
    setStatus("On Time");
    setEditingId(null);
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      name,
      checkInTime,
      status,
    };
    setTimesheetEntries((prev) => [...prev, newEntry]);
    resetForm();
    setShowAddModal(false);
    if (timesheetEntries.length % recordsPerPage === 0) {
      setActivePage(Math.ceil((timesheetEntries.length + 1) / recordsPerPage));
    }
  };

  

  const handleEditEntry = (entry) => {
    setEditingId(entry.id);
    setName(entry.name);
    setCheckInTime(entry.checkInTime);
    setStatus(entry.status);
  };

  const handleDeleteEntry = () => {
    const isLastItemOnPage = currentEntries.length === 1;
    const isNotFirstPage = activePage > 1;

    setTimesheetEntries((prev) =>
      prev.filter((entry) => entry.id !== deleteTarget.id)
    );

    if (isLastItemOnPage && isNotFirstPage) {
      setActivePage(prev => prev - 1);
    }

    setDeleteTarget(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading timesheet data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <aside className="md:w-[31%] lg:w-[15%] hidden md:block p-4">
        <p className="font-semibold">Sidebar</p>
      </aside>

      <main className="w-full md:w-[67%] lg:w-[73%] xl:w-[80%] 2xl:w-[82%] lg:ml-28 border-[1px] rounded-lg px-6 py-8 md:px- lg:px- xl:mx-aut mt-[100px] md:ml-26 lg:ml-26 xl:ml-12 2xl:ml-6">
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full sm:w-1/2 mb-4">
              <div className="bg-white border-gray-200 p-4 rounded-xl">
                <div className="relative mb-4">
                  <FaSearch className="absolute top-4 left-3 text-gray-400 text-sm md:text-sm" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-sm md:text-lg"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value.toLowerCase());
                      setActivePage(1);
                    }}
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
              Add Time 
            </button>
          </div>

          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl">
              <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
                <h2 className="text-lg font-semibold mb-4">Add New Time Entry</h2>
                <form onSubmit={handleAddEntry} className="space-y-4">
        <select
  className="border p-2 rounded w-full"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
>
  <option value="">Employees ID</option>
  {employees.map((emp) => (
    <option key={emp._id} value={`${emp.firstName} ${emp.lastName}`}>
      {emp.firstName} {emp.lastName}
    </option>
  ))}
</select>


                  <input
                    type="time"
                    placeholder="Check-in Time"
                    className="border p-2 rounded w-full"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
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
                      Save Entry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {deleteTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl">
              <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[400px] text-center">
                <h2 className="text-lg font-semibold mb-4">Delete Time Entry</h2>
                <p className="mb-6">
                  Are you sure you want to delete the time entry for{" "}
                  <strong>{deleteTarget.name}</strong>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteEntry}
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
                  <th className="p-3 border-b">CheckIn Time</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((entry, index) => (
                    <tr key={entry.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border-b">{startIndex + index + 1}</td>
                      {editingId === entry.id ? (
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
                              type="time"
                              className="border p-1 rounded w-full"
                              value={checkInTime}
                              onChange={(e) => setCheckInTime(e.target.value)}
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
                              Save
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 border-b">{entry.name}</td>
                          <td className="p-3 border-b">{entry.checkInTime || "N/A"}</td>
                          <td className="p-3 border-b">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                entry.status === "On Time"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {entry.status || "N/A"}
                            </span>
                          </td>
                          <td className="p-3 border-b">
                            <div className="flex items-center gap-2">
                              
                              <button
                                onClick={() => setDeleteTarget(entry)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <FaRegTrashAlt />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center">
                      No time entries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <p className="text-sm md:text-md">
              Showing {filteredEntries.length > 0 ? startIndex + 1 : 0} to{" "}
              {Math.min(endIndex, filteredEntries.length)} of{" "}
              {filteredEntries.length} records
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
      </main>
    </div>
  );
}



