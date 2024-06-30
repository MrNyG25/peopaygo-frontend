"use client"

import { Sidebar } from "./components/Sidebar";
import useAuthStore from "../stores/AuthStore";

export default function page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <Sidebar />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </>
  );
}
