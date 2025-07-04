






"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Image from "next/image";
import { useEffect } from "react";

import { RiPencilFill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Employees() {
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState("Add New Employee");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const router = useRouter();

  const options = [
    {
      label: "Personal Information",
      icon: "/assets/user.png",
      path: "/employees/personal",
    },
    {
      label: "Professional Information",
      icon: "/assets/briefcase05.png",
      path: "/employees/professional",
    },
    {
      label: "Documents",
      icon: "/assets/document.png",
      path: "/employees/document",
    },
    {
      label: "Account Access",
      icon: "/assets/lock.png",
      path: "/employees/account",
    },
  ];

  
const [employees, setEmployees] = useState([]);    

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employee/list");
      if (!res.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await res.json(); 
      console.log("Fetched employees:", data.employees);

      setEmployees(data.employees); 
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  fetchEmployees();
}, []);





 
const handleEdit = (employee) => {
  console.log("azam", employee)
  setCurrentEmployee(employee); // Populate modal
  setEditModalOpen(true);       // Show modal
};


const id ="685868f8ec837daef4c5a049"

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    
    formData.append('firstName', currentEmployee.firstName);
    formData.append('lastName', currentEmployee.lastName);
    formData.append('employeeCode', currentEmployee.employeeCode);
    formData.append('department', currentEmployee.department);
    formData.append('designation', currentEmployee.designation);
    formData.append('isActive', currentEmployee.isActive);
    
    
    const res = await fetch(`/api/employee/update/${id}`, {
      method: "PUT",
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update");

    // Update local state
    setEmployees(prev => 
      prev.map(emp => 
        emp._id === currentEmployee._id ? data.employee : emp
      )
    );
    setEditModalOpen(false);
    
    // Show success message
    toast.success("Employee updated successfully");
  } catch (error) {
    console.error("Error updating:", error);
    toast.error("Failed to update employee");
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCurrentEmployee((prevEmployee) => ({
    ...prevEmployee,
    [name]: name === "isActive" ? value === "true" : value,
  }));
};


  const handleDelete = (emp) => {
    setDeleteTarget(emp);
  };

 const confirmDelete = async () => {
  if (!deleteTarget) return;

  try {
    const res = await fetch(`/api/employee/delete/${deleteTarget._id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete employee");
    }

    // Remove from local state after successful deletion
    setEmployees((prev) => prev.filter((e) => e._id !== deleteTarget._id));
    setDeleteTarget(null);
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};


console.log("currentEmployee", currentEmployee)

  return (
    <section className="w-[10] md:w-full min-h-screen bg-white pt-20 px-4 md:px-6 lg:pl-64 lg:pt-20">
      <div className=" absolute w-[100%] md:w-[69%] lg:w-[73%] xl:w-[78%]   p-4 rounded-xl bg-white  ml-[-20px] md:left-[250px] lg:mt-3 lg:left-72 ">
        <div className="border border-gray-200 p-4 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="relative w-full md:w-1/3">
              <FaSearch className="absolute top-3 left-3 text-gray-400 size-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-48">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full flex justify-between items-center bg-[#1F2937] text-white px-4 py-2 rounded-lg text-sm  transition"
                >
                  {selected}
                  <span className="ml-2">▼</span>
                </button>

                {open && (
                  <div className="absolute mt-1 w-full sm:w-56 bg-white border rounded-lg shadow z-10">
                    {options.map((option, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelected(option.label);
                          setOpen(false);
                          router.push(option.path);
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Image
                          src={option.icon}
                          alt={option.label}
                          width={24}
                          height={24}
                          className="size-4"
                        />
                        <span className="text-sm text-gray-800">
                          {option.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

           
            </div>
          </div>

          <div className="overflow-x-auto w-full rounded-lg mt-4">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-black border-b border-black text-sm font-semibold">
                  <th className="p-3">Employee Name</th>
                  <th className="p-3">employeeCode</th>
                  <th className="p-3 hidden sm:table-cell">Department</th>
                  <th className="p-3 hidden md:table-cell">Designation</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {console.log("employees", employees)}
                {employees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-b border-gray-200 text-sm hover:bg-gray-50"
                  >
                    <td className="p-3">{emp.firstName} {emp.lastName}</td>
                    <td className="p-3">{emp.employeeCode}</td>
                    <td className="p-3 hidden sm:table-cell">
                      {emp.department}
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      {emp.designation}
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-semibold ${
                          emp.isActive === true
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        { emp.isActive === true
                            ? "Active"
                            : "Leve"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="text-gray-600 hover:text-gray-900"
                          aria-label="Edit"
                        >
                          <RiPencilFill />
                        </button>
                        <button
                          onClick={() => handleDelete(emp)}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Delete"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {editModalOpen && currentEmployee && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
      <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={currentEmployee.firstName || ''}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={currentEmployee.lastName || ''}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeCode"
            value={currentEmployee.employeeCode || ''}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={currentEmployee.department || ''}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={currentEmployee.designation || ''}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="isActive"
            value={currentEmployee.isActive ? "true" : "false"}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="true">Active</option>
            <option value="false">Leave</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => setEditModalOpen(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#1F2937] text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

          {/* Delete Confirmation Modal */}
          {deleteTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-center">
                <h2 className="text-lg font-semibold mb-4">Delete Employee</h2>
                <p className="mb-6">
                  Are you sure you want to delete{" "}
                  <strong>{deleteTarget.name}</strong>'s record?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


