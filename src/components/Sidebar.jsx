

'use client';
import React, { useState } from 'react';
import { Home, Users, Menu, ArrowLeftCircle } from 'lucide-react';
import { ArrowRightCircle } from "lucide-react";
import Link from 'next/link';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/voters', label: 'Voters', icon: Users },
];

const Sidebar = ({ className }) => {
  const [activeLink, setActiveLink] = useState('/admin');
  const [collapsed, setCollapsed] = useState(false); 
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div
      className={`${className} ${
        collapsed ? 'w-20' : 'w-56'
      } bg-black p-3 pt-0 sticky top-0 h-screen border-r border-white/20 transition-all duration-300`}
    >
      <aside className="h-full">
      

        <div className={` px-4 py-2 transition-all duration-1000    ${collapsed ? 'w-52' :'w-full flex justify-end px- py-1'}       `}>
        { collapsed ?
        <ArrowRightCircle onClick={()=>{setCollapsed(!collapsed)}}  />
        :
        <ArrowLeftCircle onClick={()=>{setCollapsed(!collapsed)}}  />
        }
        </div>
       
        <div className="flex justify-between items-center px-4 py-4">
          {!collapsed && <h2 className="text-2xl font-bold">Admin</h2>}
          <button onClick={toggleSidebar} className="text-white">
           
          </button>
         
        </div>
        
      
        <nav className="grid gap-4 text-md pt-4">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setActiveLink(href)}
              className={`flex justify-start h-8 items-center px-4 gap-2 rounded-lg  transition-colors ${
                activeLink === href
                  ? 'bg-green-500 text-white'
                  : 'hover:bg-gray-800 hover:text-white text-white'
              }   ${collapsed ? 'w-fit' :'w-52'}`  }
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span className=''>{label}</span>}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
