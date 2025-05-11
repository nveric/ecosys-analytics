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
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
        >
          <rect width="32" height="32" rx="4" fill="#509EE3" />
          <path
            d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 11C18.761 11 21 13.239 21 16C21 18.761 18.761 21 16 21C13.239 21 11 18.761 11 16C11 13.239 13.239 11 16 11Z"
            fill="white"
          />
        </svg>
        <span className="ml-2 font-semibold text-lg text-[#2E3B52]">Superset</span>
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
