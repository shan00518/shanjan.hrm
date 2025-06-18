// "use client";

// import React from "react";
// import { FaUser } from "react-icons/fa";
// import { MdShoppingBag } from "react-icons/md";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { CiLock } from "react-icons/ci";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEmployeeForm } from "../../../contexts/EmployeeFormContext";

// export default function ProfessionalInfor() {
//   const { formData, setFormData } = useEmployeeForm();
//   const router = useRouter();
//   const handleNext = () => {
//     router.push("/developers/document");
//   };
//   return (
//     <div className="relative left-40 lg:left-0 md:pl-52 lg:pl-2 bg-[#ffff] w-full lg:ml-[0px] ml-[-200px] mt-20 md:mt-20 lg:mt-20">
//       <div className="justify-items-center-safe pt-17">
//         <div className="lg:w-[75%] w-[105%] md:w-[102%] xl:w-[80%] lg:ml-60 ml-8 bg-[#ffff] border-2 border-[silver] p-3 rounded-xl">
//           {/* Tabs */}
//           <div className="grid grid-cols-2 sm:flex gap-3">
//             <Link href="/developers/personal">
//               <div className="flex items-center sm:p-0 p-1 rounded">
//                 <FaUser className="md:size-4 lg:size-4 size-4 text-black" />
//                 <h1 className="text-xs md:text-xs lg:text-sm text-black">
//                   Personal Information
//                 </h1>
//               </div>
//             </Link>
//             <Link href="/developers/professional">
//               <h1 className="text-[#16151C] flex gap-1 ">
//                 <MdShoppingBag className="md:size-4 lg:size-4 size-6 text-[#7152F3]" />
//                 <span className="text-[#7152F3] text-md  md:text-xs lg:text-sm ">
//                   Professional Information
//                 </span>
//               </h1>
//             </Link>
//             <Link href="/developers/document">
//               <h1 className="text-[black] flex gap-1">
//                 <IoDocumentTextOutline className="md:size-4 lg:size-4 size-4" />
//                 <span className="text-black text-xs md:text-xs lg:text-sm">
//                   Documents
//                 </span>
//               </h1>
//             </Link>
//             <Link href="/developers/account">
//               <h1 className="text-[#16151C] flex gap-1">
//                 <CiLock className="md:size-4 lg:size-4 size-4" />
//                 <span className="text-[#16151C] text-xs md:text-xs lg:text-sm">
//                   Account Access
//                 </span>
//               </h1>
//             </Link>
//           </div>
//           <hr className="text-[#16151C] border-[silver]" />

//           <div className="grid grid-cols-2 gap-4 mt-5 ">
//             <input
//               type="text"
//               placeholder="Employee ID"
//               className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%]"
//               value={formData.employeeId}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, employeeId: e.target.value }))
//               }
//             />
//             <input
//               type="text"
//               placeholder="User Name"
//               className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%] "
//               value={formData.username}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, username: e.target.value }))
//               }
//             />

//             <select
//               className="sm:p-2 p-1 w-[95%] border-2 text-xs md:text-md lg:text-sm rounded-md outline-0 border-[#A2A1A8CC] text-[#A2A1A8CC]"
//               value={formData.employeeType}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   employeeType: e.target.value,
//                 }))
//               }
//             >
//               <option value="" className="text-[#A2A1A8CC]">
//                 Select Employee Type
//               </option>
//               <option value="educated" className="text-[#A2A1A8CC]">
//                 Educated
//               </option>
//               <option value="uneducated" className="text-[#A2A1A8CC]">
//                 Un Educated
//               </option>
//             </select>

//             <input
//               type="text"
//               placeholder="Email Address"
//               className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%]"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, email: e.target.value }))
//               }
//             />

//             <select
//               className="sm:p-2 p-1 w-[95%] text-xs md:text-md lg:text-sm border-2 rounded-md outline-0 border-[#A2A1A8CC] text-[#A2A1A8CC]"
//               value={formData.department}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, department: e.target.value }))
//               }
//             >
//               <option value="" className="text-[#A2A1A8CC]">
//                 Select Department
//               </option>
//               <option value="mba" className="text-[#A2A1A8CC]">
//                 MBA
//               </option>
//               <option value="bscs" className="text-[#A2A1A8CC]">
//                 BsCs
//               </option>
//             </select>

//             <input
//               type="text"
//               placeholder="Enter Designation"
//               className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%]"
//               value={formData.designation}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   designation: e.target.value,
//                 }))
//               }
//             />

//             <select
//               className="sm:p-2 p-1 w-[95%] text-xs md:text-md lg:text-sm border-2 rounded-md outline-0 border-[#A2A1A8CC] text-[#A2A1A8CC]"
//               value={formData.workingDays}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   workingDays: e.target.value,
//                 }))
//               }
//             >
//               <option value="" className="text-[#A2A1A8CC]">
//                 Select Working Days
//               </option>
//               <option value="7" className="text-[#A2A1A8CC]">
//                 Seven Days
//               </option>
//               <option value="10" className="text-[#A2A1A8CC]">
//                 Ten Days
//               </option>
//             </select>

//             <input
//               type="Date"
//               placeholder="Select Joining Date"
//               className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%]"
//               value={formData.dateOfJoining}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   dateOfJoining: e.target.value,
//                 }))
//               }
//             />
//           </div>

//           <div className="grid grid-cols-1 my-5 ">
//             <select
//               className="sm:p-2 p-1 w-[full] border-2 text-xs md:text-md lg:text-sm rounded-md outline-0 border-[#A2A1A8CC] text-[#A2A1A8CC]"
//               value={formData.branch}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, branch: e.target.value }))
//               }
//             >
//               <option value="" className="text-[#A2A1A8CC]">
//                 Select Office Location
//               </option>
//               <option value="Fasial Town" className="text-[#A2A1A8CC]">
//                 Fasial Town
//               </option>
//               <option value="Model Town" className="text-[#A2A1A8CC]">
//                 Model Town
//               </option>
//             </select>
//           </div>

//           <div className="flex gap-3 mt-3 justify-end mx-1 md:mx-2 lg:mx-3">
//             <button className="text-gray-400 lg:px-4 lg:py-2 border-2 p-2 rounded-md text-sm sm:text-sm">
//               Cancel
//             </button>
//             <button
//               onClick={handleNext}
//               className="text-white border-2 lg:px-5 lg:py-2 md:px-4 py-2 px-4 md:py-1 rounded-md sm:text-sm text-sm bg-[#7152F3] cursor-pointer"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import React from "react";
import { FaUser } from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEmployeeForm } from "../../../contexts/EmployeeFormContext";

export default function ProfessionalInfor() {
  const { formData, setFormData } = useEmployeeForm();
  const router = useRouter();
  const handleNext = () => {
    router.push("/developers/document");
  };
  return (
    <div className="relative left-40 lg:left-0 md:pl-52 lg:pl-2 bg-[#ffff] w-full lg:ml-[0px] ml-[-200px] mt-20 md:mt-20 lg:mt-20">
      <div className="justify-items-center-safe pt-17">
        <div className="lg:w-[75%] w-[105%] md:w-[102%] xl:w-[80%] lg:ml-60 ml-8 bg-[#ffff] border-2 border-[silver] p-3 rounded-xl">
          {/* Tabs */}
          <div className="grid grid-cols-2 sm:flex gap-3">
            <Link href="/developers/personal">
              <div className="flex items-center sm:p-0 p-1 rounded">
                <FaUser className="md:size-4 lg:size-4 size-4 text-black" />
                <h1 className="text-xs md:text-xs lg:text-sm text-black">
                  Personal Information
                </h1>
              </div>
            </Link>
            <Link href="/developers/professional">
              <h1 className="text-[#16151C] flex gap-1 ">
                <MdShoppingBag className="md:size-4 lg:size-4 size-6 text-[#7152F3]" />
                <span className="text-[#7152F3] text-md  md:text-xs lg:text-sm ">
                  Professional Information
                </span>
              </h1>
            </Link>
            <Link href="/developers/document">
              <h1 className="text-[black] flex gap-1">
                <IoDocumentTextOutline className="md:size-4 lg:size-4 size-4" />
                <span className="text-black text-xs md:text-xs lg:text-sm">
                  Documents
                </span>
              </h1>
            </Link>
            <Link href="/developers/account">
              <h1 className="text-[#16151C] flex gap-1">
                <CiLock className="md:size-4 lg:size-4 size-4" />
                <span className="text-[#16151C] text-xs md:text-xs lg:text-sm">
                  Account Access
                </span>
              </h1>
            </Link>
          </div>
          <hr className="text-[#16151C] border-[silver]" />

          <div className="grid grid-cols-2 gap-4 mt-5 ">
            <input
              type="text"
              placeholder="Employee ID"
              className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%]"
              value={formData.employeeId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, employeeId: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="User Name"
              className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%] "
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
            />

            <select
              className="sm:p-2 p-1 w-[95%] border-2 text-xs md:text-md lg:text-sm rounded-md outline-0 border-[#A2A1A8CC] text-[#A2A1A8CC]"
              value={formData.employeeType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  employeeType: e.target.value,
                }))
              }
            >
              <option value="" className="text-[#A2A1A8CC]">
                Select Employee Type
              </option>
              <option value="educated" className="text-[#A2A1A8CC]">
                Educated
              </option>
              <option value="uneducated" className="text-[#A2A1A8CC]">
                Un Educated
              </option>
            </select>

            <input
              type="text"
              placeholder="Email Address"
              className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%]"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <select
              className="sm:p-2 p-1 w-[95%] text-xs md:text-md lg:text-sm border-2 rounded-md outline-0 border-[#A2A1A8CC] text-[#A2A1A8CC]"
              value={formData.department}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, department: e.target.value }))
              }
            >
              <option value="" className="text-[#A2A1A8CC]">
                Select Department
              </option>
              <option value="mba" className="text-[#A2A1A8CC]">
                MBA
              </option>
              <option value="bscs" className="text-[#A2A1A8CC]">
                BsCs
              </option>
            </select>

            <input
              type="text"
              placeholder="Enter Designation"
              className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%]"
              value={formData.designation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  designation: e.target.value,
                }))
              }
            />

            <select
              className="sm:p-2 p-1 w-[95%] text-xs md:text-md lg:text-sm border-2 rounded-md outline-0 border-[#A2A1A8CC] text-[#A2A1A8CC]"
              value={formData.workingDays}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  workingDays: e.target.value,
                }))
              }
            >
              <option value="" className="text-[#A2A1A8CC]">
                Select Working Days
              </option>
              <option value="7" className="text-[#A2A1A8CC]">
                Seven Days
              </option>
              <option value="10" className="text-[#A2A1A8CC]">
                Ten Days
              </option>
            </select>

            <input
              type="Date"
              placeholder="Select Joining Date"
              className="text-[#A2A1A8CC] text-xs md:text-md lg:text-sm outline-none border-[#A2A1A8CC] border-2 sm:p-2 p-1 rounded-md w-[95%]"
              value={formData.dateOfJoining}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dateOfJoining: e.target.value,
                }))
              }
            />
          </div>

          <div className="grid grid-cols-1 my-5 ">
            <select
              className="sm:p-2 p-1 w-[full] border-2 text-xs md:text-md lg:text-sm rounded-md outline-0 border-[#A2A1A8CC] text-[#A2A1A8CC]"
              value={formData.branch}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, branch: e.target.value }))
              }
            >
              <option value="" className="text-[#A2A1A8CC]">
                Select Office Location
              </option>
              <option value="Fasial Town" className="text-[#A2A1A8CC]">
                Fasial Town
              </option>
              <option value="Model Town" className="text-[#A2A1A8CC]">
                Model Town
              </option>
            </select>
          </div>

          <div className="flex gap-3 mt-3 justify-end mx-1 md:mx-2 lg:mx-3">
            <button className="text-gray-400 lg:px-4 lg:py-2 border-2 p-2 rounded-md text-sm sm:text-sm">
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="text-white border-2 lg:px-5 lg:py-2 md:px-4 py-2 px-4 md:py-1 rounded-md sm:text-sm text-sm bg-[#7152F3] cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

