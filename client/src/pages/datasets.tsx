import React, { useState } from "react";
import { Plus, Search, ChevronDown, Database, Filter, MoreVertical } from "lucide-react";
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
import { formatDate } from "@/lib/utils";

// Mock data for datasets
const mockDatasets = [
  {
    id: "ds1",
    name: "Customer Data",
    source: "PostgreSQL",
    schema: "public",
    lastRefreshed: new Date("2023-05-10T08:30:00"),
    owner: "John Doe",
    rows: 24589,
    type: "Table",
  },
  {
    id: "ds2",
    name: "Products",
    source: "MySQL",
    schema: "shop",
    lastRefreshed: new Date("2023-05-09T14:20:00"),
    owner: "Jane Smith",
    rows: 1254,
    type: "Table",
  },
  {
    id: "ds3",
    name: "Sales Transactions",
    source: "PostgreSQL",
    schema: "sales",
    lastRefreshed: new Date("2023-05-10T10:15:00"),
    owner: "John Doe",
    rows: 1458962,
    type: "Table",
  },
  {
    id: "ds4",
    name: "Marketing Campaign",
    source: "BigQuery",
    schema: "marketing",
    lastRefreshed: new Date("2023-05-08T16:45:00"),
    owner: "Alice Johnson",
    rows: 546,
    type: "View",
  },
  {
    id: "ds5",
    name: "Website Analytics",
    source: "Snowflake",
    schema: "web_analytics",
    lastRefreshed: new Date("2023-05-10T09:30:00"),
    owner: "Bob Miller",
    rows: 85462,
    type: "Table",
  },
];

export default function DatasetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [datasetsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter datasets based on search query
  const filteredDatasets = mockDatasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastDataset = currentPage * datasetsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - datasetsPerPage;
  const currentDatasets = filteredDatasets.slice(
    indexOfFirstDataset,
    indexOfLastDataset
  );

  // Format row count with commas
  const formatRows = (rows: number) => {
    return rows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="metabase-content">
      {/* Page Header */}
      <div className="metabase-dashboard-header">
        <div>
          <h1 className="text-2xl font-semibold text-[#2E3B52]">Datasets</h1>
          <p className="text-sm text-[#606984] mt-1">
            Connect and manage your data sources
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="metabase" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-1.5" />
            New Dataset
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#949AAB]" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-[#E3E8EE] rounded-lg text-sm placeholder-[#949AAB]"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-3">
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
                <DropdownMenuItem>By Owner</DropdownMenuItem>
                <DropdownMenuItem>By Source</DropdownMenuItem>
                <DropdownMenuItem>By Type</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Recently Updated</DropdownMenuItem>
                <DropdownMenuItem>Most Used</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="metabase-light"
                  size="sm"
                  className="flex items-center"
                >
                  <span>Source: All</span>
                  <ChevronDown className="h-4 w-4 ml-1.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>All Sources</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>PostgreSQL</DropdownMenuItem>
                <DropdownMenuItem>MySQL</DropdownMenuItem>
                <DropdownMenuItem>BigQuery</DropdownMenuItem>
                <DropdownMenuItem>Snowflake</DropdownMenuItem>
                <DropdownMenuItem>Redshift</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Datasets Table */}
      <Card>
        <CardHeader className="py-4">
          <div className="flex justify-between w-full">
            <CardTitle>All Datasets</CardTitle>
            <div className="text-sm text-[#606984]">
              {filteredDatasets.length} results
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-t border-[#E3E8EE] bg-[#F9FBFC]">
                <TableHead className="metabase-table-header">Name</TableHead>
                <TableHead className="metabase-table-header">Source</TableHead>
                <TableHead className="metabase-table-header">Schema</TableHead>
                <TableHead className="metabase-table-header">Type</TableHead>
                <TableHead className="metabase-table-header">Rows</TableHead>
                <TableHead className="metabase-table-header">Owner</TableHead>
                <TableHead className="metabase-table-header">
                  Last Refreshed
                </TableHead>
                <TableHead className="metabase-table-header w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentDatasets.map((dataset) => (
                <TableRow key={dataset.id} className="hover:bg-gray-50">
                  <TableCell className="metabase-table-cell font-medium text-[#2E3B52] flex items-center">
                    <Database className="h-4 w-4 mr-2 text-[#509EE3]" />
                    {dataset.name}
                  </TableCell>
                  <TableCell className="metabase-table-cell text-[#606984]">
                    {dataset.source}
                  </TableCell>
                  <TableCell className="metabase-table-cell text-[#606984]">
                    {dataset.schema}
                  </TableCell>
                  <TableCell className="metabase-table-cell text-[#606984]">
                    {dataset.type}
                  </TableCell>
                  <TableCell className="metabase-table-cell text-[#606984]">
                    {formatRows(dataset.rows)}
                  </TableCell>
                  <TableCell className="metabase-table-cell text-[#606984]">
                    {dataset.owner}
                  </TableCell>
                  <TableCell className="metabase-table-cell text-[#606984]">
                    {formatDate(dataset.lastRefreshed)}
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
                        <DropdownMenuItem>Edit Dataset</DropdownMenuItem>
                        <DropdownMenuItem>Refresh Data</DropdownMenuItem>
                        <DropdownMenuItem>View Data</DropdownMenuItem>
                        <DropdownMenuItem>Query Dataset</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Remove Dataset
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDatasets.length > 0 ? (
            <div className="py-4 px-6 border-t border-[#E3E8EE]">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((old) => Math.max(old - 1, 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive>
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((old) =>
                          Math.min(
                            old + 1,
                            Math.ceil(
                              filteredDatasets.length / datasetsPerPage
                            )
                          )
                        )
                      }
                      className={
                        currentPage >=
                        Math.ceil(filteredDatasets.length / datasetsPerPage)
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Database className="h-8 w-8 text-[#949AAB]" />
              </div>
              <h3 className="text-lg font-medium text-[#2E3B52]">
                No datasets found
              </h3>
              <p className="text-sm text-[#606984] mt-1 max-w-md mx-auto">
                Try adjusting your search or filter criteria, or create a new
                dataset.
              </p>
              <Button
                variant="metabase"
                size="sm"
                className="mt-4 flex items-center mx-auto"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                New Dataset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}