// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { FaUser } from "react-icons/fa";
// import { MdShoppingBag } from "react-icons/md";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { CiLock } from "react-icons/ci";
// import { useEmployeeForm } from "@/contexts/EmployeeFormContext";

// export default function Document() {
//   const router = useRouter();
//   const { formData, setFormData } = useEmployeeForm();
//   const documents = formData.documents;

//   const allUploaded = Object.values(documents).every(Boolean);

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         documents: {
//           ...prev.documents,
//           [type]: file,
//         },
//       }));
//     }
//   };

//   const goToNext = () => {
//     if (allUploaded) {
//       router.push("/developers/account");
//     }
//   };

//   return (
//     <div className="relative overflow-x-hidden left-28 lg:left-2 md:pl-[200px] lg:pl-0 bg-[#ffff] w-full md:mt-20 mt-20 ml-[-120px] lg:ml-[-2px]">
//       <div className="justify-items-center-safe pt-17">
//         <div className="lg:w-[75%] xl:w-[80%] w-[100%] md:w-[100%] lg:ml-60 bg-[#ffff] border-2 border-[silver] p-3 rounded-xl">
//           {/* Navigation Tabs */}
//           <div className="grid grid-cols-2 sm:flex gap-3 mb-4">
//             <Link href="/developers/personal">
//               <div className="flex items-center sm:p-0 p-1 rounded">
//                 <FaUser className="md:size-4 lg:size-4 size-4 text-black" />
//                 <h1 className="text-xs md:text-xs lg:text-sm text-black">
//                   Personal Information
//                 </h1>
//               </div>
//             </Link>
//             <Link href="/developers/professional">
//               <h1 className="text-[#16151C] flex gap-1">
//                 <MdShoppingBag className="md:size-4 lg:size-4 size-6 text-black" />
//                 <span className="text-black text-md md:text-xs lg:text-sm">
//                   Professional Information
//                 </span>
//               </h1>
//             </Link>
//             <Link href="/developers/document">
//               <h1 className="flex gap-1">
//                 <IoDocumentTextOutline className="md:size-4 text-[#7152F3] lg:size-4 size-4" />
//                 <span className="text-[#7152F3] text-xs md:text-xs lg:text-sm">
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

//           <hr className="border-[silver]" />

//           {/* Upload Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//             {[
//               { label: "Appointment Letter", key: "appointment" },
//               { label: "Salary Slips", key: "salarySlip" },
//               { label: "CV", key: "cv" },
//               { label: "Experience Letter", key: "experience" },
//             ].map(({ label, key }) => (
//               <div key={key}>
//                 <p className="text-xl md:text-lg lg:text-sm text-[#16151C]">
//                   Upload {label}
//                 </p>
//                 <div className="w-[95%] border-dotted border-2 border-[#192443] py-5 text-sm mt-4 justify-items-center-safe space-y-1">
//                   <Image
//                     src="/assets/documents.jpg"
//                     alt={label}
//                     width={200}
//                     height={200}
//                     className="bg-[#7152F3] p-2.5 md:ml-2 xl:ml-36 rounded-md text-center"
//                   />
//                   <input
//                     type="file"
//                     accept=".jpg,.jpeg,.pdf"
//                     onChange={(e) => handleFileChange(e, key)}
//                     className="text-sm mt-2"
//                   />
//                   <p className="text-[#A2A1A8] text-sm">
//                     Supported formats: jpeg, pdf
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 mt-6 justify-end mx-2">
//             <button className="text-gray-400 px-4 py-2 border-2 rounded-md text-sm">
//               Cancel
//             </button>
//             <button
//               onClick={goToNext}
//               disabled={!allUploaded}
//               className={`px-5 py-2 rounded-md text-sm text-white ${
//                 allUploaded ? "bg-[#7152F3]" : "bg-gray-400 cursor-not-allowed"
//               }`}
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
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useEmployeeForm } from "@/contexts/EmployeeFormContext";

export default function Document() {
  const router = useRouter();
  const { formData, setFormData } = useEmployeeForm();
  const documents = formData.documents;

  const allUploaded = Object.values(documents).every(Boolean);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [type]: file,
        },
      }));
    }
  };

  const goToNext = () => {
    if (allUploaded) {
      router.push("/employees/account");
    }
  };

  return (
    <div className="relative overflow-x-hidden left-28 lg:left-2 md:pl-[200px] lg:pl-0 bg-[#ffff] w-full md:mt-20 mt-20 ml-[-120px] lg:ml-[-2px]">
      <div className="justify-items-center-safe pt-17">
        <div className="lg:w-[75%] xl:w-[80%] w-[100%] md:w-[100%] lg:ml-60 bg-[#ffff] border-2 border-[silver] p-3 rounded-xl">
          {/* Navigation Tabs */}
          <div className="grid grid-cols-2 sm:flex gap-3 mb-4">
            <Link href="/employees/personal">
              <div className="flex items-center sm:p-0 p-1 rounded">
                <FaUser className="md:size-4 lg:size-4 size-4 text-black" />
                <h1 className="text-xs md:text-xs lg:text-sm text-black">
                  Personal Information
                </h1>
              </div>
            </Link>
            <Link href="/employees/professional">
              <h1 className="text-[#16151C] flex gap-1">
                <MdShoppingBag className="md:size-4 lg:size-4 size-6 text-black" />
                <span className="text-black text-md md:text-xs lg:text-sm">
                  Professional Information
                </span>
              </h1>
            </Link>
            <Link href="/employees/document">
              <h1 className="flex gap-1">
                <IoDocumentTextOutline className="md:size-4 text-[#7152F3] lg:size-4 size-4" />
                <span className="text-[#7152F3] text-xs md:text-xs lg:text-sm">
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

          <hr className="border-[silver]" />

          {/* Upload Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 font-bold">
            {[
              { label: "Appointment Letter", key: "appointment" },
              { label: "Salary Slips", key: "salarySlip" },
              { label: "CV", key: "cv" },
              { label: "Experience Letter", key: "experience" },
            ].map(({ label, key }) => (
              <div key={key}>
                <p className="text-xl md:text-lg lg:text-sm text-[#16151C]">
                  Upload {label}
                </p>
                <div className="  w-[95%] border-dotted border-2 border-[#192443] py-5 text-sm mt-4 justify-items-center-safe space-y-1">
                  <Image
                    src="/assets/documents.jpg"
                    alt={label}
                    width={200}
                    height={200}
                    className="bg-[#7152F3] p-2.5 rounded-md mx-auto"
                  />

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.pdf"
                    onChange={(e) => handleFileChange(e, key)}
                    className="text-sm mt-2 p-1"
                  />
                  <p className="text-[#A2A1A8] text-sm p-2">
                    Supported formats: jpeg, pdf
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6 justify-end mx-2">
            <button className="text-gray-400 px-4 py-2 border-2 rounded-md text-sm">
              Cancel
            </button>
            <button
              onClick={goToNext}
              disabled={!allUploaded}
              className={`px-5 py-2 rounded-md text-sm text-white ${allUploaded ? "bg-[#7152F3]" : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}