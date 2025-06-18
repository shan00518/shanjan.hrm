// src/app/components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "../navbar/navbar";
import Sidebar from "../sideBar/sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNav = pathname === "/login";

  return (
    <>
      {!hideNav && <Navbar />}
      <div className="flex">
        {!hideNav && <Sidebar />}
        <main className={`flex-1 p-4 ${!hideNav ? "ml-0 lg:ml-2 md:ml-6" : ""}`}>
          {children}
        </main>
      </div>
    </>
  );
}
