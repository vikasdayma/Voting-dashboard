'use client'
import Link from "next/link";
import Sidebar from "@/components/Sidebar";


export default function AdminLayout({ children }) {


  return (
    <div className="flex min-h-screen bg-black text-white">
 
      <Sidebar className='hidden md:flex'/>
 
      <div className="flex-1 p-4 w-fit">{children}</div>
    </div>
  );
}
