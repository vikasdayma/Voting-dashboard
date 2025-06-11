"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImportCSV from "@/components/ImportCsv";
import ExportCSV from "@/components/ExportCsv";

export default function Admin() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setChecking(false); 
      }
    }, 2500); 
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Checking login status...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImportCSV />
        <ExportCSV />
      </div>
    </div>
  );
}
