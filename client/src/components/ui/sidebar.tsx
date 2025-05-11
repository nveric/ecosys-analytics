import React from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  BarChart3, 
  Database, 
  Scale, 
  Settings
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="metabase-sidebar">
      <div className="flex items-center px-4 h-14 border-b border-[#E3E8EE]">
        <div className="flex items-center">
          {/* Metabase-style logo */}
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
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
          <span className="ml-2 font-semibold text-lg text-[#2E3B52]">Metabase</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 mb-4">
          <div className="text-xs font-medium text-[#949AAB] uppercase tracking-wider mb-2 px-3">Home</div>
          <Link href="/">
            <div className={`nav-item ${location === "/" ? "active" : "text-[#606984]"}`}>
              <Home className="h-4 w-4 mr-3" />
              <span>Home</span>
            </div>
          </Link>
          <Link href="/dashboards">
            <div className={`nav-item ${location === "/dashboards" ? "active" : "text-[#606984]"}`}>
              <BarChart3 className="h-4 w-4 mr-3" />
              <span>Dashboards</span>
            </div>
          </Link>
        </div>
        
        <div className="px-3 mb-4">
          <div className="text-xs font-medium text-[#949AAB] uppercase tracking-wider mb-2 px-3">Data</div>
          <Link href="/charts">
            <div className={`nav-item ${location === "/charts" ? "active" : "text-[#606984]"}`}>
              <BarChart3 className="h-4 w-4 mr-3" />
              <span>Charts</span>
            </div>
          </Link>
          <Link href="/datasets">
            <div className={`nav-item ${location === "/datasets" ? "active" : "text-[#606984]"}`}>
              <Database className="h-4 w-4 mr-3" />
              <span>Datasets</span>
            </div>
          </Link>
          <Link href="/sql-lab">
            <div className={`nav-item ${location === "/sql-lab" ? "active" : "text-[#606984]"}`}>
              <Scale className="h-4 w-4 mr-3" />
              <span>SQL Lab</span>
            </div>
          </Link>
        </div>
        
        <div className="px-3 mb-4">
          <div className="text-xs font-medium text-[#949AAB] uppercase tracking-wider mb-2 px-3">Settings</div>
          <Link href="/settings">
            <div className={`nav-item ${location === "/settings" ? "active" : "text-[#606984]"}`}>
              <Settings className="h-4 w-4 mr-3" />
              <span>Settings</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
