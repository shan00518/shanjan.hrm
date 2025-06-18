"use client";
import React, { createContext, useContext, useState } from "react";

const EmployeeFormContext = createContext(null);

export function EmployeeFormProvider({ children }) {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    employeeId: "",
    username: "",
    dateOfJoining: "",
    employeeType: "",
    department: "",
    designation: "",
    workingDays: 0,
    branch: "",
    avatar: { publicId: "", url: "" },
    documents: {
      appointmentLetter: { publicId: "", url: "" },
      salarySlips: { publicId: "", url: "" },
      experienceLetter: { publicId: "", url: "" },
      cv: { publicId: "", url: "" },
    },
    slackId: "",
    githubId: "",
    linkedInId: "",
    isActive: true,
  };

  const [formData, setFormData] = useState(initialFormState);

  const resetForm = () => setFormData(initialFormState);

  return (
    <EmployeeFormContext.Provider value={{ formData, setFormData, resetForm }}>
      {children}
    </EmployeeFormContext.Provider>
  );
}

export function useEmployeeForm() {
  const context = useContext(EmployeeFormContext);
  if (!context) {
    throw new Error("useEmployeeForm must be used within EmployeeFormProvider");
  }
  return context;
}
