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
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center">
        <div className="md:hidden mr-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="p-1 rounded text-[#606984] hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="relative mx-6 md:mx-8 w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-[#949AAB]" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-10 pr-3 py-1.5 border border-[#E3E8EE] bg-[#F9FBFC] rounded-lg text-sm placeholder-[#949AAB] focus:outline-none focus:ring-1 focus:ring-[#509EE3] focus:border-transparent transition-colors" 
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="p-1.5 rounded-full text-[#606984] hover:bg-[#F9FBFC] transition-colors">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1 p-1 hover:bg-[#F9FBFC] rounded-md transition-colors">
              <div className="w-7 h-7 rounded-full bg-[#509EE3] flex items-center justify-center text-white text-xs font-medium">
                JD
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-[#949AAB]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
