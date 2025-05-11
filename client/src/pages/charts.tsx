import React, { useState } from "react";
import { Plus, Search, ChevronDown, Filter, MoreVertical, BarChart, LineChart, PieChart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

// Mock charts data
const mockCharts = [
  {
    id: "chart1",
    name: "Monthly Revenue",
    type: "line",
    createdAt: new Date("2023-05-01T09:30:00"),
    createdBy: "John Doe",
    lastViewed: new Date("2023-05-09T16:20:00"),
    collection: "Sales Analytics",
  },
  {
    id: "chart2",
    name: "Product Category Distribution",
    type: "pie",
    createdAt: new Date("2023-04-20T11:15:00"),
    createdBy: "Jane Smith",
    lastViewed: new Date("2023-05-08T10:05:00"),
    collection: "Product Insights",
  },
  {
    id: "chart3",
    name: "Weekly User Registrations",
    type: "bar",
    createdAt: new Date("2023-05-05T14:45:00"),
    createdBy: "John Doe",
    lastViewed: new Date("2023-05-10T09:30:00"),
    collection: "User Analytics",
  },
  {
    id: "chart4",
    name: "Regional Sales Comparison",
    type: "bar",
    createdAt: new Date("2023-04-15T16:30:00"),
    createdBy: "Alice Johnson",
    lastViewed: new Date("2023-05-02T13:25:00"),
    collection: "Sales Analytics",
  },
  {
    id: "chart5",
    name: "Customer Satisfaction Trend",
    type: "line",
    createdAt: new Date("2023-05-02T10:20:00"),
    createdBy: "Bob Miller",
    lastViewed: new Date("2023-05-10T11:15:00"),
    collection: "Customer Insights",
  },
  {
    id: "chart6",
    name: "Marketing Campaign ROI",
    type: "bar",
    createdAt: new Date("2023-04-28T09:50:00"),
    createdBy: "Jane Smith",
    lastViewed: new Date("2023-05-07T15:40:00"),
    collection: "Marketing Analytics",
  },
];

// Mock suggested visualizations
const suggestedVisualizations = [
  {
    id: "suggestion1",
    title: "Revenue by Region",
    description: "Compare revenue across different geographical regions",
    type: "bar",
    dataset: "Sales Data",
  },
  {
    id: "suggestion2",
    title: "User Growth Over Time",
    description: "Track user acquisition and growth trends",
    type: "line",
    dataset: "User Data",
  },
  {
    id: "suggestion3",
    title: "Product Category Distribution",
    description: "See the breakdown of products by category",
    type: "pie",
    dataset: "Product Data",
  },
];

export default function ChartsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [chartsPerPage] = useState(6);

  // Get chart icon based on type
  const getChartIcon = (type: string) => {
    switch (type) {
      case "line":
        return <LineChart className="h-full w-full text-[#509EE3]" />;
      case "bar":
        return <BarChart className="h-full w-full text-[#88BF4D]" />;
      case "pie":
        return <PieChart className="h-full w-full text-[#A989C5]" />;
      default:
        return <Activity className="h-full w-full text-[#F9CF48]" />;
    }
  };

  // Filter charts based on search query and active tab
  const filteredCharts = mockCharts.filter(
    (chart) =>
      chart.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeTab === "all" || chart.collection.toLowerCase().includes(activeTab.toLowerCase()))
  );

  // Calculate pagination
  const indexOfLastChart = currentPage * chartsPerPage;
  const indexOfFirstChart = indexOfLastChart - chartsPerPage;
  const currentCharts = filteredCharts.slice(indexOfFirstChart, indexOfLastChart);

  return (
    <div className="metabase-content">
      {/* Page Header */}
      <div className="metabase-dashboard-header">
        <div>
          <h1 className="text-2xl font-semibold text-[#2E3B52]">Charts</h1>
          <p className="text-sm text-[#606984] mt-1">
            Create and manage your visualizations
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="metabase" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-1.5" />
            New Chart
          </Button>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-[#E3E8EE]">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-[#F9FBFC] p-1">
              <TabsTrigger value="all" className="text-xs">All Charts</TabsTrigger>
              <TabsTrigger value="Sales Analytics" className="text-xs">Sales Analytics</TabsTrigger>
              <TabsTrigger value="User Analytics" className="text-xs">User Analytics</TabsTrigger>
              <TabsTrigger value="Marketing Analytics" className="text-xs">Marketing</TabsTrigger>
              <TabsTrigger value="Product Insights" className="text-xs">Products</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="p-4 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#949AAB]" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-[#E3E8EE] rounded-lg text-sm placeholder-[#949AAB]"
              placeholder="Search charts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-3">
            <RadioGroup
              defaultValue="grid"
              value={viewMode}
              onValueChange={setViewMode}
              className="flex items-center space-x-2"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value="grid"
                  id="grid"
                  className="h-3.5 w-3.5"
                />
                <Label
                  htmlFor="grid"
                  className="text-xs font-medium text-[#606984]"
                >
                  Grid
                </Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem
                  value="list"
                  id="list"
                  className="h-3.5 w-3.5"
                />
                <Label
                  htmlFor="list"
                  className="text-xs font-medium text-[#606984]"
                >
                  List
                </Label>
              </div>
            </RadioGroup>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="metabase-light"
                  size="sm"
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-1.5" />
                  <span>Filter</span>
                  <ChevronDown className="h-4 w-4 ml-1.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>By Creator</DropdownMenuItem>
                <DropdownMenuItem>By Chart Type</DropdownMenuItem>
                <DropdownMenuItem>By Collection</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Recently Created</DropdownMenuItem>
                <DropdownMenuItem>Recently Viewed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        // Grid View
        <>
          {currentCharts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {currentCharts.map((chart) => (
                <Card key={chart.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                    <div className="w-16 h-16 opacity-60">
                      {getChartIcon(chart.type)}
                    </div>
                  </div>
                  <CardHeader className="pt-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{chart.name}</CardTitle>
                        <p className="text-xs text-[#606984] mt-1">
                          {chart.type.charAt(0).toUpperCase() + chart.type.slice(1)} • {chart.collection}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-1.5 text-[#606984]"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>Edit Chart</DropdownMenuItem>
                          <DropdownMenuItem>Move to Collection</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Add to Dashboard</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Remove Chart
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <div className="flex justify-between text-xs text-[#949AAB]">
                      <div>Created by {chart.createdBy}</div>
                      <div>Last viewed {formatDate(chart.lastViewed)}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-8 w-8 text-[#949AAB]" />
              </div>
              <h3 className="text-lg font-medium text-[#2E3B52]">
                No charts found
              </h3>
              <p className="text-sm text-[#606984] mt-1 max-w-md mx-auto">
                Try adjusting your search or filter criteria, or create a new
                chart.
              </p>
              <Button
                variant="metabase"
                size="sm"
                className="mt-4 flex items-center mx-auto"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                New Chart
              </Button>
            </div>
          )}
        </>
      ) : (
        // List View
        <Card>
          <CardHeader className="py-4">
            <div className="flex justify-between w-full">
              <CardTitle>All Charts</CardTitle>
              <div className="text-sm text-[#606984]">
                {filteredCharts.length} results
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-t border-[#E3E8EE] bg-[#F9FBFC]">
                  <TableHead className="metabase-table-header">Name</TableHead>
                  <TableHead className="metabase-table-header">Type</TableHead>
                  <TableHead className="metabase-table-header">Collection</TableHead>
                  <TableHead className="metabase-table-header">Created By</TableHead>
                  <TableHead className="metabase-table-header">Created On</TableHead>
                  <TableHead className="metabase-table-header">Last Viewed</TableHead>
                  <TableHead className="metabase-table-header w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCharts.map((chart) => (
                  <TableRow key={chart.id} className="hover:bg-gray-50">
                    <TableCell className="metabase-table-cell font-medium text-[#2E3B52] flex items-center">
                      <div className="w-5 h-5 mr-2 flex items-center justify-center">
                        {chart.type === "line" && <LineChart className="h-4 w-4 text-[#509EE3]" />}
                        {chart.type === "bar" && <BarChart className="h-4 w-4 text-[#88BF4D]" />}
                        {chart.type === "pie" && <PieChart className="h-4 w-4 text-[#A989C5]" />}
                      </div>
                      {chart.name}
                    </TableCell>
                    <TableCell className="metabase-table-cell text-[#606984] capitalize">
                      {chart.type}
                    </TableCell>
                    <TableCell className="metabase-table-cell text-[#606984]">
                      {chart.collection}
                    </TableCell>
                    <TableCell className="metabase-table-cell text-[#606984]">
                      {chart.createdBy}
                    </TableCell>
                    <TableCell className="metabase-table-cell text-[#606984]">
                      {formatDate(chart.createdAt)}
                    </TableCell>
                    <TableCell className="metabase-table-cell text-[#606984]">
                      {formatDate(chart.lastViewed)}
                    </TableCell>
                    <TableCell className="metabase-table-cell p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 text-[#606984]"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem>Edit Chart</DropdownMenuItem>
                          <DropdownMenuItem>Move to Collection</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Add to Dashboard</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Remove Chart
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {filteredCharts.length > chartsPerPage && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((old) =>
                      Math.min(
                        old + 1,
                        Math.ceil(filteredCharts.length / chartsPerPage)
                      )
                    )
                  }
                  className={
                    currentPage >=
                    Math.ceil(filteredCharts.length / chartsPerPage)
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Suggested Visualizations */}
      <div className="mt-10">
        <h2 className="text-lg font-medium text-[#2E3B52] mb-4">
          Suggested Visualizations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedVisualizations.map((suggestion) => (
            <Card
              key={suggestion.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardHeader className="pt-4 pb-2">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    {suggestion.type === "line" && (
                      <LineChart className="h-5 w-5 text-[#509EE3]" />
                    )}
                    {suggestion.type === "bar" && (
                      <BarChart className="h-5 w-5 text-[#88BF4D]" />
                    )}
                    {suggestion.type === "pie" && (
                      <PieChart className="h-5 w-5 text-[#A989C5]" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{suggestion.title}</CardTitle>
                    <p className="text-xs text-[#606984] mt-1">
                      Based on {suggestion.dataset}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-[#606984]">
                  {suggestion.description}
                </p>
                <Button
                  variant="metabase-light"
                  size="sm"
                  className="mt-4 w-full"
                >
                  Create Visualization
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}