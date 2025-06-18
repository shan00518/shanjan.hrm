
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { RiPencilFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt, FaSearch } from "react-icons/fa";
// import Page1 from './page1'; 

export default function Reports() {

  const [showAddModal, setShowAddModal] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      date:"jan 1,2002",
      email: "alikhan@example.com",
      role: "Project Manager",
      day:"Monday",
      holiday:"New year",
      status: "Off",
    },
    {
       id: 2,
      date: "Nov 9,2002",
      email: "alikhan@example.com",
      role: "Project Manager",
      day: "Tuesdat",
      holiday: "New year",
      status: "Off",
    },
    {
        id: 3,
      date: "jan 12,2022",
      // email: "alikhan@example.com",
      // role: "Project Manager",
      day: "Sunday",
      holiday: "New year",
      status: "Off",
    },
  ]);
  const [date, setDate] = useState("");
  const [ day, setDay] = useState("");
   const [holiday, setHoliday] = useState("");
  const [status, setStatus] = useState("On");
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const resetForm = () => {
    setDay("");
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

  return (
    <div className="flex w-[10] md:w-full ">
      <aside className="w-[15%]  hidden md:block p-4">
        <p className="font-semibold">Sidebar</p>
      </aside>

      <main className="w-[300] md:w-[70%] lg:w-[73%] xl:w-[80%] 2xl:w-[82%] border-[1px] rounded-lg  px-6  py-8 md:px- lg:px- xl: mx-aut mt-[100px] md:mt-16 md:ml-28 lg:ml-26 xl:ml-12 2xl:ml-6 ">
        {!selectedClient ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              {/* Search Input */}
        <div className="relative w-full sm:w-1/2 mb-4">
          <FaSearch className="absolute top-4 left-3 text-gray-400 text-sm md:text-sm" />
          <input
            type="text"
             placeholder="Search"
             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 text-sm md:text-lg"
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
              <div className="fixed inset-0 z-50 flex items-center justify-center shadow-2xl">
                <div className="bg-white p-6 rounded-lg shadow-2xl w-[90%] md:w-[500px]">
                  <h2 className="text-lg font-semibold mb-4">Add New Client</h2>
                  <form onSubmit={handleAddClient} className="space-y-4">
                    <input
                      type="date"
                      placeholder="Date"
                      className="border p-2 rounded w-full"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                    <input
                      type="day"
                      placeholder="Day"
                      className="border p-2 rounded w-full"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Holiday"
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
                     
                      <option>On </option>
                      <option>Off </option>
                    </select>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          resetForm();
                          setShowAddModal(false);
                        }}
                        className="px-4 py-2 border rounded hover:bg-gray-10"
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
                    <th className="p-3 border-b">Date</th>
                    <th className="p-3 border-b">Day</th>
                    <th className="p-3 border-b">Holiday</th>
                    <th className="p-3 border-b">Status</th>
                    <th className="p-3 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => (
                    <tr key={client.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border-b">{index + 1}</td>
                      {editingId === client.id ? (
                        <>
                          <td className="p-3 border-b">
                            <input
                              type="date"
                              className="border p-1 rounded w-full"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </td>
                          <td className="p-3 border-b">
                            <input
                              type="day"
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
                            
                              <option>On </option>
                              <option>Off </option>
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
                                client.status === "On Time"
                                  ? "bg-blue-100 text-[blue]"
                                  : client.status === "Off Time"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-blue-100 text-blue-600"
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
                              {/* <button
                                onClick={() => setSelectedClient(client)}
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                              >
                                View Profile
                              </button> */}
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>
            {/* <button
              onClick={() => setSelectedClient(null)}
              className="mb-4 text-blue-600 underline"
            >
              ← Back to Clients
            </button> */}
            {/* <Page1 client={selectedClient} /> */}
          </div>
        )}

         <div className="flex  gap-2 mt-4 text-sm">
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


// 'use client';
// import React from "react";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";

// export default function Reports() {
//   return (
//     <>
//       {/* SM and above view - Original (no changes) */}
//       <section className="hidden sm:block bg-white w-[1100px] md:w-[1200px] lg:w-[1200px] ml-10  md:mt-5  lg:mt-5 ">
//         <div className="relative sm:absolute    mt-[50px] left-10 xl:left-[290px] md:left-[275px] lg:left-[290px] 2xl:left-[285px]  overflow-x-hidden">
//           <div className=" pt-2">
//             <div className=" w-[1100px]  md:w-[1000px] lg:w-[960px] xl:w-[1115px] 2xl:w-[1275px] bg-white border-[1px]  border-gray-200 border-silver p-3 rounded-xl ">
//               {/* Search and Button */}
//               <div className="sm:flex justify-between my-1 ">
//                 <div className="relative w-full md:w-1/3 ml-1 ">
//                   <FaSearch className="absolute md:top-[14px] md:left-5 text-gray-400 size-8 md:size-5 lg:size-4 left-2 top-3 lg:left-5 lg:top-[11px]" />
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 md:rounded-lg focus:outline-none focus:ring-1 text-4xl rounded-xl md:text-xl lg:text-sm"
//                   />
//                 </div>
//                 <div>
//                   <Link href="/">
//                     <button className="flex gap-2 bg-[#7152F3] px-3 sm:px-3 py-2 rounded-lg text-white mt-6 lg:mt-[-2px]">
//                       <IoIosAddCircleOutline className="md:size-6 size-12 lg:size-6" />
//                       <span className="md:text-sm mt-[2px] text-4xl lg:text-sm">
//                         Add New Holiday
//                       </span>
//                     </button>
//                   </Link>
//                 </div>
//               </div>

//               {/* Table */}
//               <table className="w-full h-12 mt-4">
//                 <thead>
//                   <tr className="text-black border-b font-semibold text-2xl md:text-lg lg:text-sm">
//                     <td className="p-3">Date</td>
//                     <td className="p-3">Day</td>
//                     <td className="p-3">Holidays</td>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Array.from({ length: 5 }).map((_, index) => (
//                     <tr key={index} className="text-black border-b text-2xl md:text-lg lg:text-sm">
//                       <td className="p-3">Jan 1, 2023</td>
//                       <td className="p-3">Monday</td>
//                       <td className="p-3">New Year</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Radio Filters */}
//               <div className="flex gap-2 my-2 text-2xl md:text-2xl lg:text-lg">
//                 <div className="flex gap-3 mt-[8px]">
//                   <input type="radio" name="radio" className="size-7 md:size-4 md:mt-2 lg:mt-1" />
//                   <p>Upcoming</p>
//                 </div>
//                 <div className="flex gap-2 ml-6 mt-[8px]">
//                   <input type="radio" name="radio" className="size-7 md:size-4 md:mt-2 lg:mt-1" />
//                   <p>Past Holidays</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mobile View: Visible only below sm */}
//       <section className="block sm:hidden p-4 pt- mt-16">
//         <div className="bg-white border border-gray-200 rounded-xl p-4">
//           {/* Search and Button */}
//           <div className="flex flex-col gap-3 mb-4">
//             <div className="relative w-full">
//               <FaSearch className="absolute top-3 left-3 text-gray-400 text-base" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
//               />
//             </div>
//             <Link href="/">
//               <button className="flex items-center justify-center gap-2 bg-[#7152F3] text-white text-sm py-2 px-2 rounded-md">
//                 <IoIosAddCircleOutline className="text-lg" />
//                 Add New Holiday
//               </button>
//             </Link>
//           </div>

//           {/* Table view for mobile */}
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b font-semibold text-gray-700">
//                 <th className="py-2">Date</th>
//                 <th className="py-2">Day</th>
//                 <th className="py-2">Holiday</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Array.from({ length: 5 }).map((_, index) => (
//                 <tr key={index} className="border-b">
//                   <td className="py-2">Jan 1, 2023</td>
//                   <td className="py-2">Monday</td>
//                   <td className="py-2">New Year</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

          {/* Radio Filters */}
 // <div className="flex flex-col gap-2 mt-4 text-sm">
 //   <label className="flex items-center gap-2">
 //     <input type="radio" name="holidayMobile" />
 //     Upcoming
//   </label>
//   <label className="flex items-center gap-2">
 //     <input type="radio" name="holidayMobile" />
//     Past Holidays
 //   </label>
 // </div>
//         </div>
//       </section>
//     </>
//   );
// }


// 'use client';
// import React from "react";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";

// export default function Reports() {
//   return (
//     <section className="bg-white w-[1100px]  md:w-[1200px] lg:w-[1200px]  ml-10  md:mt-5 mt-10   lg:mt-5 xl:mt- ">
//       <div className="absolute left-10  xl:left-[290px] md:left-[275px] lg:left-[290px] 2xl:left-[285px]   overflow-x-hidden">
//         <div className="pt-17">
//           <div className="w-[1100px] md:w-[1000px] lg:w-[960px] xl:w-[1115px]  2xl:w-[1275px]  bg-white border-[1px] border-gray-200 border-silver p-3 rounded-xl">
//             {/* Search and Button */}
//             <div className="sm:flex justify-between  my-1 ">
//               <div className="relative w-full md:w-1/3 ml-1 ">
//                 <FaSearch className="absolute md:top-[14px] md:left-5 text-gray-400 size-8 md:size-5 lg:size-4 left-2 top-3 lg:left-5 lg:top-[11px]" />
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 md:rounded-lg focus:outline-none focus:ring-1 text-4xl rounded-xl md:text-xl lg:text-sm"
//                 />
//               </div>
//               <div>
//                 <Link href="/">
//                   <button className="flex gap-2 bg-[#7152F3] px-3 sm:px-3 py-2 rounded-lg text-white mt-6 lg:mt-[-2px]">
//                     <IoIosAddCircleOutline className="md:size-6 size-12 lg:size-6" />
//                     <span className="md:text-sm mt-[2px] text-4xl lg:text-sm">
//                       Add New Holiday
//                     </span>
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* Table */}
//             <table className="w-full h-12 mt-4">
//               <thead>
//                 <tr className="text-black border-b font-semibold  text-2xl md:text-lg lg:text-sm">
//                   <td className="p-3">Date</td>
//                   <td className="p-3">Day</td>
//                   <td className="p-3">Holidays</td>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   <tr key={index} className="text-black border-b text-2xl md:text-lg lg:text-sm">
//                     <td className="p-3">Jan 1, 2023</td>
//                     <td className="p-3">Monday</td>
//                     <td className="p-3">New Year</td>
//                   </tr>
                  
//                 ))}
//               </tbody>
//             </table>

//             {/* Radio Filters */}
//             <div className="flex gap-2 my-2 text-2xl md:text-2xl lg:text-lg">
//               <div className="flex gap-3 mt-[8px]">
//                 <input type="radio" name="radio" className="size-7 md:size-4 md:mt-2 mt- lg:mt-1" />
//                 <p >Upcoming</p>
//               </div>
//               <div className="flex gap-2 ml-6 mt-[8px]">
//                 <input type="radio" name="radio" className="size-7 md:size-4 md:mt-2 mt- lg:mt-1" />
//                 <p>Past Holidays</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
