'use client'
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import VoterPage from "@/components/VoterPage";


export default function AdminLayout({ children }) {


  return (
    <div className="flex min-h-screen  bg-black text-white">
 
     <VoterPage></VoterPage>
    </div>
  );
}
