


"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { useEmployeeForm } from "../../../contexts/EmployeeFormContext";



export default function Account() {
  const { formData, setFormData, resetForm } = useEmployeeForm();
  const [loading, setLoading] = useState();

  const handleSave = async () => {
    setLoading(true);
    try {
      const form = new FormData();

      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      form.append("mobile", formData.mobile);
      form.append("employeeCode", formData.employeeCode);
      form.append("username", formData.username);
      form.append("dateOfJoining", formData.dateOfJoining);
      form.append("employeeType", formData.employeeType);
      form.append("department", formData.department);
      form.append("designation", formData.designation);
      form.append("workingDays", formData.workingDays.toString());
      form.append("branch", formData.branch);
      form.append("slackId", formData.slackId);
      form.append("githubId", formData.githubId);
      form.append("linkedInId", formData.linkedInId);
      form.append("isActive", formData.isActive.toString());

      // Append documents (must be File objects if sending as multipart/form-data)
      form.append(
        "documents[appointmentLetter][url]",
        formData.documents.appointmentLetter.url
      );
      form.append(
        "documents[salarySlips][url]",
        formData.documents.salarySlips.url
      );
      form.append(
        "documents[experienceLetter][url]",
        formData.documents.experienceLetter.url
      );
      form.append("documents[cv][url]", formData.documents.cv.url);

      // Append avatar
      form.append("avatar[url]", formData.avatar.url);
      form.append("avatar[publicId]", formData.avatar.publicId);

      const res = await fetch("/api/employee/create", {
        method: "POST",
        body: form,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to create");
      alert("Employee saved successfully!");
      resetForm();
    } catch (error) {
      alert("Error saving employee");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative left-40 lg:left-[10px] lg:pl-0 md:pl-56 bg-[#ffff] w-full lg:ml-[0px] ml-[-200px] mt-20 lg:mt-20">
      <div className="justify-items-center-safe pt-17">
        <div className=" lg:w-[75%] w-[100%]  md:w-[100%] xl:w-[80%] lg:ml-60 ml-10 bg-[#ffff] border-2 border-[silver] p-3 rounded-xl">
          <div className="grid grid-cols-2 sm:flex gap-3">
            <Link href="/employees/personal">
              <div className="flex items-center sm:p-0 p-1  rounded">
                <FaUser className="md:size-4 lg:size-4 size-4" />
                <h1 className="text-xs md:text-xs lg:text-sm">
                  Personal Information
                </h1>
              </div>
            </Link>

            <Link href="/employees/professional">
              <h1 className="text-[#16151C] flex gap-1 ">
                <MdShoppingBag className="md:size-4 lg:size-4 size-4 text-black" />
                <span className="text-black text-xs md:text-xs lg:text-sm">
                  Professional Information
                </span>
              </h1>
            </Link>

            <Link href="/employees/document">
              <h1 className="text-black flex gap-1">
                <IoDocumentTextOutline className="md:size-4 lg:size-4 size-4" />
                <span className="text-black text-xs md:text-xs lg:text-sm">
                  Documents
                </span>
              </h1>
            </Link>

            <Link href="/employees/account">
              <h1 className="flex gap-1">
                <CiLock className="md:size-4 lg:size-4 size-4 text-[#7152F3]" />
                <span className="text-xs md:text-xs lg:text-sm text-[#7152F3]">
                  Account Access
                </span>
              </h1>
            </Link>
          </div>

          <hr className="text-[#16151C] border-[silver]" />

          <div className="grid grid-cols-2 gap-4 mt-5">
            <input
              type="text"
              name="slack"
              placeholder="Enter Slack ID"
              className="text-[#A2A1A8CC] text-xs md:text-xs lg:text-sm outline-none border-[#A2A1A8CC] border-2 p-2 rounded-md w-[95%]"
              value={formData.slackId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slackId: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Enter LinkedinIn ID"
              className="text-[#A2A1A8CC] text-xs md:text-xs lg:text-sm outline-none border-[#A2A1A8CC] border-2 p-2 rounded-md w-[95%]"
              value={formData.linkedInId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, linkedInId: e.target.value }))
              }
            />
            <input
              type="text"
              name="github"
              placeholder="Enter GitHub ID"
              className="text-[#A2A1A8CC] text-xs md:text-xs lg:text-sm outline-none border-[#A2A1A8CC] border-2 p-2 rounded-md w-[95%]"
              value={formData.githubId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, githubId: e.target.value }))
              }
            />
          </div>

          <div className="flex gap-3 mt-3 justify-end mx-1 md:mx-2 lg:mx-3">
            <button className="text-gray-400 lg:px-4 lg:py-2 border-2 p-2 rounded-md text-sm sm:text-sm">
              Cancel
            </button>
            <button
              className={`text-white border-2 lg:px-5 lg:py-2 md:px-4 py-2 px-4 md:py-3 rounded-md sm:text-sm text-sm ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#7152F3]"
              }`}
              disabled={loading}
              onClick={handleSave}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}