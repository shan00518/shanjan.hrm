// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { CiLock } from "react-icons/ci";
// import { FaCamera, FaUser } from "react-icons/fa";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { MdShoppingBag } from "react-icons/md";
// import { useEmployeeForm } from "../../../contexts/EmployeeFormContext";

// export default function PersonalInfo() {
//   const { formData, setFormData } = useEmployeeForm();
//   const router = useRouter();
//   const handleNext = () => {
//       router.push("/developers/professional");
//   };
//   return (
//     <div className="bg-white w-full lg:mt-20 mt-16 pl-40 md:pl-[370px] lg:pl-0">
//       <div className="justify-items-center pt-17">
//         <div className="lg:w-[75%] md:w-[155%]  w-[155%] xl:w-[80%] lg:ml-60 ml-[-170px] bg-white border-2 border-silver p-3 rounded-xl">
//           <div className="grid grid-cols-2 sm:flex gap-3">
//             <Link href="/developers/personal">
//               <div className="flex items-center sm:p-0 p-1  rounded">
//                 <FaUser className="md:size-4 lg:size-4 size-4 text-[#7152F3]" />
//                 <h1 className="text-xs md:text-xs lg:text-sm text-[#7152F3]">
//                   Personal Information
//                 </h1>
//               </div>
//             </Link>

//             <Link href="/developers/professional">
//               <h1 className="text-[#16151C] flex gap-1 ">
//                 <MdShoppingBag className="md:size-4 lg:size-4 size-6 text-black" />
//                 <span className="text-black text-xs md:text-xs lg:text-sm ">
//                   Professional Information
//                 </span>
//               </h1>
//             </Link>

//             <Link href="/developers/document">
//               <h1 className="text-[black] flex gap-1">
//                 <IoDocumentTextOutline className="md:size-4 lg:size-4 size-4" />
//                 <span className="text-[black] text-xs md:text-xs lg:text-sm">
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

//           <hr className="text-[#16151C] border-silver" />

//           <div className="my-4">
//             <FaCamera className="w-6 h-6 border-silver border-2 rounded-md text-gray-700" />
//           </div>

//           <div className="grid grid-cols-2 gap-2">
//             <input
//               name="name"
//               type="text"
//               placeholder="First Name"
//               className="text-black text-xs md:text-sm outline-none border-silver border-2 p-2 rounded-md w-[95%]"
//               value={formData.firstName}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, firstName: e.target.value }))
//               }
//             />

//             <input
//               name="lastName"
//               type="text"
//               placeholder="Last Name"
//               className="text-black outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[95%]"
//               value={formData.lastName}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, lastName: e.target.value }))
//               }
//             />

//             <input
//               name="mobile"
//               type="text"
//               placeholder="Mobile Number"
//               className="text-black outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[95%]"
//               value={formData.mobile}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, mobile: e.target.value }))
//               }
//             />

//             <input
//               name="email"
//               type="text"
//               placeholder="Email Address"
//               className="text-black outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[95%]"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, email: e.target.value }))
//               }
//             />

//             <input
//               name="dateOfBirth"
//               type="date"
//               placeholder="Date of Birth"
//               className="text-gray-400 outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[95%]"
//               value={formData.dateOfBirth}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   dateOfBirth: e.target.value,
//                 }))
//               }
//             />

//             {/* Dropdowns */}
//             <select
//               className="p-2 w-[95%] text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
//               value={formData.maritalStatus}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   maritalStatus: e.target.value,
//                 }))
//               }
//             >
//               <option value="">Marital Status</option>
//               <option value="Single">Single</option>
//               <option value="Married">Married</option>
//             </select>

//             <select
//               className="p-2 w-[95%] text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
//               value={formData.gender}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, gender: e.target.value }))
//               }
//             >
//               <option value="">Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>

//             <select
//               className="p-2 w-[95%] text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
//               value={formData.nationality}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   nationality: e.target.value,
//                 }))
//               }
//             >
//               <option value="">Nationality</option>
//               <option value="Pakistani">Pakistani</option>
//               <option value="United States">United States</option>
//               <option value="Dubai">Dubai</option>
//             </select>
//           </div>

//           <div className="grid grid-cols-1 my-5">
//             <input
//               name="address"
//               type="text"
//               placeholder="Address"
//               className="text-black outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[98%]"
//               value={formData.address}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, address: e.target.value }))
//               }
//             />
//           </div>

//           <div className="grid grid-cols-3 sm:gap-4">
//             <select
//               className="p-2 w-[94%] text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
//               value={formData.city}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, city: e.target.value }))
//               }
//             >
//               <option value="">City</option>
//               <option value="LHR">LHR</option>
//               <option value="Multan">Multan</option>
//               <option value="ISD">ISD</option>
//             </select>

//             <select
//               className="sm:p-2 sm:w-[94%] w-[90%] p-1 text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
//               value={formData.state}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, state: e.target.value }))
//               }
//             >
//               <option value="">State</option>
//               <option value="Punjab">Punjab</option>
//               <option value="Sindh">Sindh</option>
//             </select>

//             <select
//               className="sm:p-2 sm:w-[94%] w-[95%]  text-gray-400 text-xs md:text-sm border-2 rounded-md outline-0 border-silver"
//               value={formData.zipCode}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
//               }
//             >
//               <option value="">Zip Code</option>
//               <option value="5400">5400</option>
//               <option value="6700">6700</option>
//               <option value="7600">7600</option>
//             </select>
//           </div>

//           <div className="flex gap-3 mt-3 justify-end mx-1 md:mx-2 lg:mx-3">
//             <button className="text-black lg:px-4 lg:py-2 border-2 p-2 rounded-md text-sm sm:text-sm">
//               Cancel
//             </button>
//             <button
//               onClick={handleNext}
//               className="text-white border-2 lg:px-5 lg:py-2 md:px-4 py-2 px-4 md:py-3 rounded-md sm:text-sm text-sm bg-[#7152F3]"
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

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiLock } from "react-icons/ci";
import { FaCamera, FaUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";
import { useEmployeeForm } from "../../../contexts/EmployeeFormContext";

export default function PersonalInfo() {
  const { formData, setFormData } = useEmployeeForm();
  const router = useRouter();
  const handleNext = () => {
      router.push("/employees/professional");
  };
  return (
    <div className="bg-white w-full lg:mt-20 mt-16 pl-40 md:pl-[370px] lg:pl-0">
      <div className="justify-items-center pt-17">
        <div className=" lg:w-[75%] md:w-[155%]  w-[155%] xl:w-[80%] lg:ml-60 ml-[-170px] bg-white border-2 border-silver p-3 rounded-xl">
          <div className="grid grid-cols-2 sm:flex gap-3">
            <Link href="/employees/personal">
              <div className="flex items-center gap-1    rounded">
                <FaUser className=" md:size-4 lg:size-4 size- text-[#7152F3]" />
                <h1 className="text-xs md:text-xs lg:text-sm text-[#7152F3]">
                  Personal Information
                </h1>
              </div>
            </Link>

            <Link href="/employees/professional">
              <h1 className="text-[#16151C] flex gap-1 ">
                <MdShoppingBag className="md:size-4 lg:size-4 size-6 text-black" />
                <span className="text-black text-xs md:text-xs lg:text-sm ">
                  Professional Information
                </span>
              </h1>
            </Link>

            <Link href="/employees/document">
              <h1 className="text-[black] flex gap-1">
                <IoDocumentTextOutline className="md:size-4 lg:size-4 size-4" />
                <span className="text-[black] text-xs md:text-xs lg:text-sm">
                  Documents
                </span>
              </h1>
            </Link>

            <Link href="/employees/account">
              <h1 className="text-[#16151C] flex gap-1">
                <CiLock className="md:size-4 lg:size-4 size-4" />
                <span className="text-[#16151C] text-xs md:text-xs lg:text-sm">
                  Account Access
                </span>
              </h1>
            </Link>
          </div>

          <hr className="text-[#16151C] border-silver" />

          <div className="my-4">
            <FaCamera className="w-6 h-6 border-silver border-2 rounded-md text-gray-700" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              name="name"
              type="text"
              placeholder="First Name"
              className="text-black text-xs md:text-sm outline-none border-silver border-2 p-2 rounded-md w-[95%]"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
            />

            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="text-black outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[95%]"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
            />

            <input
              name="mobile"
              type="text"
              placeholder="Mobile Number"
              className="text-black outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[95%]"
              value={formData.mobile}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, mobile: e.target.value }))
              }
            />

            <input
              name="email"
              type="text"
              placeholder="Email Address"
              className="text-black outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[95%]"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <input
              name="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              className="text-gray-400 outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[95%]"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }))
              }
            />

            {/* Dropdowns */}
            <select
              className="p-2 w-[95%] text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
              value={formData.maritalStatus}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  maritalStatus: e.target.value,
                }))
              }
            >
              <option value="">Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>

            <select
              className="p-2 w-[95%] text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
              value={formData.gender}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              className="p-2 w-[95%] text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
              value={formData.nationality}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  nationality: e.target.value,
                }))
              }
            >
              <option value="">Nationality</option>
              <option value="Pakistani">Pakistani</option>
              <option value="United States">United States</option>
              <option value="Dubai">Dubai</option>
            </select>
          </div>

          <div className="grid grid-cols-1 my-5">
            <input
              name="address"
              type="text"
              placeholder="Address"
              className="text-black outline-none text-xs md:text-sm border-silver border-2 p-2 rounded-md w-[98%]"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-3 sm:gap-4">
            <select
              className="p-2 w-[94%] text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, city: e.target.value }))
              }
            >
              <option value="">City</option>
              <option value="LHR">LHR</option>
              <option value="Multan">Multan</option>
              <option value="ISD">ISD</option>
            </select>

            <select
              className="sm:p-2 sm:w-[94%] w-[90%] p-1 text-xs md:text-sm border-2 rounded-md outline-0 border-silver text-gray-400"
              value={formData.state}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, state: e.target.value }))
              }
            >
              <option value="">State</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
            </select>

            <select
              className="sm:p-2 sm:w-[94%] w-[95%]  text-gray-400 text-xs md:text-sm border-2 rounded-md outline-0 border-silver"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
              }
            >
              <option value="">Zip Code</option>
              <option value="5400">5400</option>
              <option value="6700">6700</option>
              <option value="7600">7600</option>
            </select>
          </div>

          <div className="flex gap-3 mt-3 justify-end mx-1 md:mx-2 lg:mx-3">
            <button className="text-black lg:px-4 lg:py-2 border-2 p-2 rounded-md text-sm sm:text-sm">
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="text-white border-2 lg:px-5 lg:py-2 md:px-4 py-2 px-4 md:py-3 rounded-md sm:text-sm text-sm bg-[#7152F3]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}