import React, { useState } from "react";
import { 
  Menu, 
  Search, 
  Bell,
  User,
  ChevronDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="metabase-header">
      <div className="md:hidden flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="p-1 rounded text-[#606984] hover:bg-gray-100"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 ml-2"
        >
          <rect width="32" height="32" rx="4" fill="#509EE3" />
          <path
            d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 11C18.761 11 21 13.239 21 16C21 18.761 18.761 21 16 21C13.239 21 11 18.761 11 16C11 13.239 13.239 11 16 11Z"
            fill="white"
          />
        </svg>
      </div>
      
      <div className="relative hidden md:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[#949AAB]" />
        </div>
        <input 
          type="text" 
          className="block w-full pl-10 pr-3 py-1.5 border border-[#E3E8EE] rounded-lg text-sm placeholder-[#949AAB]" 
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="p-1.5 rounded-full text-[#606984] hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1 p-0">
              <div className="w-8 h-8 rounded-full bg-[#509EE3] flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <ChevronDown className="h-4 w-4 text-[#606984]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
