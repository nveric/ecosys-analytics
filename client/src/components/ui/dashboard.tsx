import React from "react";
import { Share2, Plus, RefreshCw, Filter, MoreVertical, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DashboardProps = {
  title: string;
  lastUpdated: string;
};

export default function Dashboard({ title, lastUpdated }: DashboardProps) {
  return (
    <div className="metabase-content">
      {/* Dashboard Header */}
      <div className="metabase-dashboard-header">
        <div>
          <h1 className="text-xl font-bold text-[#2E3B52]">{title}</h1>
          <p className="text-xs text-[#949AAB] mt-1">Last updated {lastUpdated}</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="metabase-light" size="sm" className="flex items-center">
            <Share2 className="h-4 w-4 mr-1.5" />
            Share
          </Button>
          
          <Button variant="metabase-light" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Chart
          </Button>
          
          <Button variant="metabase" size="sm" className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Refresh
          </Button>
        </div>
      </div>
      
      {/* Filter Bar */}
      <div className="metabase-filter-bar">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="metabase-light" size="sm" className="flex items-center">
              <span>Time Range: Last 30 days</span>
              <ChevronDown className="h-4 w-4 ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Today</DropdownMenuItem>
            <DropdownMenuItem>Yesterday</DropdownMenuItem>
            <DropdownMenuItem>Last 7 days</DropdownMenuItem>
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>This month</DropdownMenuItem>
            <DropdownMenuItem>Last month</DropdownMenuItem>
            <DropdownMenuItem>Custom range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="metabase-light" size="sm" className="flex items-center">
              <span>Region: All</span>
              <ChevronDown className="h-4 w-4 ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>North America</DropdownMenuItem>
            <DropdownMenuItem>Europe</DropdownMenuItem>
            <DropdownMenuItem>Asia-Pacific</DropdownMenuItem>
            <DropdownMenuItem>Latin America</DropdownMenuItem>
            <DropdownMenuItem>Middle East & Africa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="metabase-light" size="sm" className="flex items-center">
              <span>Product Category: All</span>
              <ChevronDown className="h-4 w-4 ml-1.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Electronics</DropdownMenuItem>
            <DropdownMenuItem>Wearables</DropdownMenuItem>
            <DropdownMenuItem>Computers</DropdownMenuItem>
            <DropdownMenuItem>Audio</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="metabase-outline" size="sm" className="flex items-center">
          <Plus className="h-4 w-4 mr-1.5" />
          Add Filter
        </Button>
      </div>
      
      {/* Dashboard Grid */}
      <div className="metabase-dashboard-grid">
        {/* KPI Cards */}
        <Card>
          <CardHeader>
            <div className="flex justify-between w-full">
              <CardTitle>Total Revenue</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#606984] hover:text-[#2E3B52] p-1">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold text-[#606984]">$1,452,389</div>
            <div className="mt-2 flex items-center text-[#88BF4D]">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">12.5% from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between w-full">
              <CardTitle>Average Order Value</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#606984] hover:text-[#2E3B52] p-1">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold text-[#606984]">$124.35</div>
            <div className="mt-2 flex items-center text-[#88BF4D]">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">3.2% from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between w-full">
              <CardTitle>Conversion Rate</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#606984] hover:text-[#2E3B52] p-1">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-semibold text-[#606984]">4.8%</div>
            <div className="mt-2 flex items-center text-[#EF8C8C]">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">0.5% from last period</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Line Chart */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <div className="flex justify-between w-full">
              <CardTitle>Revenue Over Time</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#606984] hover:text-[#2E3B52] p-1">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-72">
            <div className="w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#509EE3] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <div className="text-[#606984] text-sm mt-2">Revenue Time Series Chart</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <div className="flex justify-between w-full">
              <CardTitle>Revenue by Product Category</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#606984] hover:text-[#2E3B52] p-1">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-72">
            <div className="w-full h-full bg-gradient-to-r from-green-50 to-teal-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#88BF4D] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="text-[#606984] text-sm mt-2">Bar Chart</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Pie Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between w-full">
              <CardTitle>Revenue by Region</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#606984] hover:text-[#2E3B52] p-1">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-72">
            <div className="flex flex-col md:flex-row w-full h-full">
              <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#A989C5] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                  <div className="text-[#606984] text-sm mt-2">Pie Chart</div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 h-full p-4 overflow-y-auto">
                <div className="flex items-center justify-between py-2 border-b border-[#E3E8EE]">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#509EE3] mr-2"></div>
                    <span className="text-sm text-[#2E3B52]">North America</span>
                  </div>
                  <div className="text-sm font-medium text-[#2E3B52]">42%</div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-[#E3E8EE]">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#88BF4D] mr-2"></div>
                    <span className="text-sm text-[#2E3B52]">Europe</span>
                  </div>
                  <div className="text-sm font-medium text-[#2E3B52]">28%</div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-[#E3E8EE]">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#A989C5] mr-2"></div>
                    <span className="text-sm text-[#2E3B52]">Asia-Pacific</span>
                  </div>
                  <div className="text-sm font-medium text-[#2E3B52]">18%</div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-[#E3E8EE]">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#F9CF48] mr-2"></div>
                    <span className="text-sm text-[#2E3B52]">Latin America</span>
                  </div>
                  <div className="text-sm font-medium text-[#2E3B52]">8%</div>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#EF8C8C] mr-2"></div>
                    <span className="text-sm text-[#2E3B52]">Middle East & Africa</span>
                  </div>
                  <div className="text-sm font-medium text-[#2E3B52]">4%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Table */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between w-full">
              <CardTitle>Top Products by Revenue</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#606984] hover:text-[#2E3B52] p-1">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="metabase-table">
              <thead>
                <tr>
                  <th className="metabase-table-header">Product Name</th>
                  <th className="metabase-table-header">Category</th>
                  <th className="metabase-table-header">Revenue</th>
                  <th className="metabase-table-header">Orders</th>
                  <th className="metabase-table-header">Growth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E3E8EE]">
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="metabase-table-cell font-medium text-[#2E3B52]">Premium Headphones X3</td>
                  <td className="metabase-table-cell text-[#606984]">Electronics</td>
                  <td className="metabase-table-cell text-[#2E3B52]">$245,120</td>
                  <td className="metabase-table-cell text-[#606984]">1,245</td>
                  <td className="metabase-table-cell">
                    <div className="flex items-center text-[#88BF4D]">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">18.2%</span>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="metabase-table-cell font-medium text-[#2E3B52]">Smartphone Pro 12</td>
                  <td className="metabase-table-cell text-[#606984]">Electronics</td>
                  <td className="metabase-table-cell text-[#2E3B52]">$198,450</td>
                  <td className="metabase-table-cell text-[#606984]">842</td>
                  <td className="metabase-table-cell">
                    <div className="flex items-center text-[#88BF4D]">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">12.5%</span>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="metabase-table-cell font-medium text-[#2E3B52]">Smart Watch Series 5</td>
                  <td className="metabase-table-cell text-[#606984]">Wearables</td>
                  <td className="metabase-table-cell text-[#2E3B52]">$154,780</td>
                  <td className="metabase-table-cell text-[#606984]">1,653</td>
                  <td className="metabase-table-cell">
                    <div className="flex items-center text-[#88BF4D]">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">9.8%</span>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="metabase-table-cell font-medium text-[#2E3B52]">Laptop Pro 16"</td>
                  <td className="metabase-table-cell text-[#606984]">Computers</td>
                  <td className="metabase-table-cell text-[#2E3B52]">$142,350</td>
                  <td className="metabase-table-cell text-[#606984]">421</td>
                  <td className="metabase-table-cell">
                    <div className="flex items-center text-[#EF8C8C]">
                      <TrendingDown className="h-4 w-4 mr-1" />
                      <span className="text-sm">2.1%</span>
                    </div>
                  </td>
                </tr>
                
                <tr className="hover:bg-gray-50 cursor-pointer">
                  <td className="metabase-table-cell font-medium text-[#2E3B52]">Wireless Earbuds Pro</td>
                  <td className="metabase-table-cell text-[#606984]">Audio</td>
                  <td className="metabase-table-cell text-[#2E3B52]">$98,760</td>
                  <td className="metabase-table-cell text-[#606984]">2,184</td>
                  <td className="metabase-table-cell">
                    <div className="flex items-center text-[#88BF4D]">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm">24.6%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <CardFooter>
            <div className="text-sm text-[#606984]">Showing 5 of 254 products</div>
            <div className="flex space-x-2">
              <Button variant="metabase-light" size="sm">Previous</Button>
              <Button variant="metabase-light" size="sm">Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
