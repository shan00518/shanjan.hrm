"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLaptop, FaFileInvoiceDollar } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { ImStatsDots } from "react-icons/im";
import { RiDashboard3Line } from "react-icons/ri";
import { IoSettingsOutline, IoPeopleSharp } from "react-icons/io5";
import { GoProjectSymlink } from "react-icons/go";

const Sidebar = () => {
  const [isOpen, setIsopen] = useState(false);

  const toggleSidebar = () => setIsopen(!isOpen);

  const navItems = [
    { href: "/", label: "Dashboard", icon: RiDashboard3Line },
    { href: "/client", label: "Client", icon: IoPeopleSharp },
   { href: "/projects", label: "Project", icon: GoProjectSymlink
 },

    { href: "/employee", label: "Employees", icon: FaLaptop },
    { href: "/invoice", label: "Invoice", icon: FaFileInvoiceDollar },
    { href: "/timesheet", label: "Timesheet", icon: IoMdTime },
    { href: "/reports", label: "Reports", icon: ImStatsDots },
    { href: "/setting", label: "Settings", icon: IoSettingsOutline },
  ];

  return (
    <div className="relative z-50">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4  md:hidden text-black z-50"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <svg
            className="w-8 h-8 invert"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      

      <aside
        className={`fixed top-0 left-0 w-56 h-full overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-8 pt-24 transform transition-transform duration-300 ease-in-out shadow-xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:fixed`}
      >
        <div className="flex items-center gap-3 mb-12 md:mt-[-80px] mt-[-20px] ml-[-10px] md:ml-0">
          <Image src="/assets/logo.png" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-bold  hidden md:block ">HRMS</h1>
        </div>

        <ul className="space-y-4 ml-[-15px] md:ml-0 ">
          {navItems.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href}>
                <div
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setIsopen(false);
                    }
                  }}
                  className="flex items-center gap-3 hover:bg-white hover:text-black px-3 py-2 rounded-lg transition-all cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                  <span className=" text-sm font-medium">
                    {label}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
