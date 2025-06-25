

"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaSearch, FaRegTrashAlt, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Timesheet() {
  const [activePage, setActivePage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [timesheetEntries, setTimesheetEntries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Form states
  const [employeeId, setEmployeeId] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState("Present");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Pagination settings
  const recordsPerPage = 10;
  const startIndex = (activePage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  // Fetch employees and timesheet entries
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch employees
        const empResponse = await fetch('/api/employee/list');
        if (!empResponse.ok) throw new Error("Failed to fetch employees");
        const empData = await empResponse.json();
        
        // Fetch timesheet entries
        const timesheetResponse = await fetch('/api/timesheet/list');
        if (!timesheetResponse.ok) throw new Error("Failed to fetch timesheet entries");
        const timesheetData = await timesheetResponse.json();
        
        setEmployees(empData.employees || []);
        setTimesheetEntries(timesheetData.timesheets || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error(err.message);
      }
    };

    fetchData();
  }, []);

  // Filter timesheet entries based on search term and date filter
  const filteredEntries = timesheetEntries.filter((entry) => {
    const search = searchTerm.toLowerCase();
    const employee = typeof entry.employeeId === 'object' 
      ? entry.employeeId 
      : employees.find(emp => emp._id === entry.employeeId);
    
    const employeeName = employee 
      ? `${employee.firstName || ''} ${employee.lastName || ''}`.trim() 
      : 'Unknown';
    
    // Check if the entry matches the date filter (if any)
    const matchesDate = dateFilter 
      ? entry.date === dateFilter 
      : true;
    
    // Check if the entry matches the search term (if any)
    const matchesSearch = searchTerm 
      ? (
          employeeName.toLowerCase().includes(search) ||
          (entry.checkInTime?.toLowerCase() || '').includes(search) ||
          (entry.checkOutTime?.toLowerCase() || '').includes(search) ||
          (entry.status?.toLowerCase() || '').includes(search)
        )
      : true;
    
    return matchesDate && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / recordsPerPage));
  const currentEntries = filteredEntries.slice(startIndex, endIndex);

  const resetForm = () => {
    setEmployeeId("");
    setCheckInTime("");
    setCheckOutTime("");
    setDate(new Date().toISOString().split('T')[0]);
    setStatus("Present");
  };

  const handleAddTimesheet = async (e) => {
    e.preventDefault();
    
    if (!employeeId || !checkInTime || !date || !status) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch('/api/timesheet/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          checkInTime: `${date}T${checkInTime}`,
          checkOutTime: checkOutTime ? `${date}T${checkOutTime}` : undefined,
          date,
          status
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create timesheet entry");

      setTimesheetEntries(prev => [...prev, data.entry]);
      resetForm();
      setShowAddModal(false);
      toast.success("Timesheet entry created successfully");

      if (timesheetEntries.length % recordsPerPage === 0) {
        setActivePage(Math.ceil((timesheetEntries.length + 1) / recordsPerPage));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteEntry = async () => {
    if (!deleteTarget) return;

    try {
      const response = await fetch(`/api/timesheet/delete/${deleteTarget._id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete timesheet entry");
      }

      setTimesheetEntries(prev => prev.filter(entry => entry._id !== deleteTarget._id));
      setDeleteTarget(null);
      toast.success("Timesheet entry deleted successfully");

      // Adjust page if we deleted the last item on the current page
      if (currentEntries.length === 1 && activePage > 1) {
        setActivePage(prev => prev - 1);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Present': 'bg-green-100 text-green-800',
      'Absent': 'bg-red-100 text-red-800',
      'Late': 'bg-yellow-100 text-yellow-800',
      'On Leave': 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative w-full sm:w-1/2 mb-4">
              <div className="bg-white border-gray-200 p-4 rounded-xl">
                <div className="relative mb-4">
                  <FaSearch className="absolute top-4 left-3 text-gray-400 text-sm md:text-sm" />
                  <input
                    type="text"
                    placeholder="Search by name or status"
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
            <div className="relative w-full sm:w-1/2 mb-4">
              <div className="bg-white border-gray-200 p-4 rounded-xl">
                <div className="relative mb-4">
                  <FaCalendarAlt className="absolute top-4 left-3 text-gray-400 text-sm md:text-sm" />
                  <input
                    type="date"
                    placeholder="Filter by date"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-sm md:text-lg"
                    value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value);
                      setActivePage(1);
                    }}
                  />
                </div>
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
            Add Timesheet
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
              <h2 className="text-lg font-semibold mb-4">Add New Timesheet Entry</h2>
              <form onSubmit={handleAddTimesheet} className="space-y-4">
                <select
                  className="border p-2 rounded w-full"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-in Time</label>
                    <input
                      type="time"
                      className="border p-2 rounded w-full"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Check-out Time</label>
                    <input
                      type="time"
                      className="border p-2 rounded w-full"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                    />
                  </div>
                </div>

                <select
                  className="border p-2 rounded w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="On Leave">On Leave</option>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[400px] text-center">
              <h2 className="text-lg font-semibold mb-4">Delete Timesheet Entry</h2>
              <p className="mb-6">
                Are you sure you want to delete this timesheet entry?
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
                <th className="p-3 border-b">Checkout Time</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.length > 0 ? (
                currentEntries.map((entry, index) => {
                  const employee = typeof entry.employeeId === 'object' 
                    ? entry.employeeId 
                    : employees.find(emp => emp._id === entry.employeeId);
                  
                  const employeeName = employee 
                    ? `${employee.firstName || ''} ${employee.lastName || ''}`.trim() 
                    : 'Unknown';

                  return (
                    <tr key={entry._id || index} className="hover:bg-gray-50 transition">
                      <td className="p-3 border-b">{startIndex + index + 1}</td>
                      <td className="p-3 border-b">{employeeName}</td>
                      <td className="p-3 border-b">{formatTime(entry.checkInTime)}</td>
                      <td className="p-3 border-b">{formatTime(entry.checkOutTime)}</td>
                      <td className="p-3 border-b">{entry.date}</td>
                      <td className="p-3 border-b">
                        {getStatusBadge(entry.status)}
                      </td>
                      <td className="p-3 border-b">
                        <button
                          onClick={() => setDeleteTarget(entry)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="p-4 text-center">
                    No timesheet entries found
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
      </main>
    </div>
  );
}