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
          <rect width="32" height="32" rx="8" fill="#509EE3" />
          <path 
            d="M24 16C24 20.4183 20.4183 24 16 24C11.5817 24 8 20.4183 8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16Z" 
            stroke="white" 
            strokeWidth="3"
          />
          <path 
            d="M19 16C19 17.6569 17.6569 19 16 19C14.3431 19 13 17.6569 13 16C13 14.3431 14.3431 13 16 13C17.6569 13 19 14.3431 19 16Z" 
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
