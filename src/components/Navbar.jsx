
 
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const data = useSelector((state) => state.voters.value);

  // Check login status on load
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!loginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/voters", label: "Voters" },
  ];

  return (
    <nav className="bg-black p-4 flex flex-col w-full shadow-md border-b border-white/20">
      <div className="container md:mx-auto flex justify-between items-center">
        <div className="text-green-500 text-xl font-bold">Voting Dashboard</div>

        <button
          className="md:hidden text-green-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-green-500 hover:text-gray-300 px-3 py-2 text-sm font-medium"
            >
              {label}
            </Link>
          ))}

          {/* {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-300 px-3 py-2 text-sm font-medium border border-red-500 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-green-500 hover:text-green-300   w-20 md:w-fit px-3 py-2 text-sm font-medium border border-green-500 rounded"
            >
              Login
            </Link>
          )} */}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2 px-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-green-500 hover:text-gray-300 text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="block text-red-500 hover:text-red-300 text-sm font-medium border border-red-500 px-3 py-2 w-full text-left rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="block text-green-500 hover:text-green-300 text-sm font-medium border border-green-500 px-3 py-2 w-full text-left rounded"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
