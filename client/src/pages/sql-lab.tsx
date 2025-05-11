import React, { useState } from "react";
import { Play, Save, Download, Table, Database, ChevronDown, Copy, Maximize2, MoreVertical, Plus, X } from "lucide-react";
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
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function SQLLabPage() {
  const [activeTab, setActiveTab] = useState("query1");
  const [selectedDatabase, setSelectedDatabase] = useState("PostgreSQL");
  const [query, setQuery] = useState(
    "SELECT\n  products.id,\n  products.name,\n  products.price,\n  categories.name as category\nFROM\n  products\nJOIN\n  categories ON products.category_id = categories.id\nWHERE\n  products.price > 50\nORDER BY\n  products.price DESC\nLIMIT 100;"
  );
  const [isResultExpanded, setIsResultExpanded] = useState(false);

  // Mock schemas and tables
  const schemas = [
    {
      name: "public",
      tables: [
        { name: "products", type: "table" },
        { name: "categories", type: "table" },
        { name: "orders", type: "table" },
        { name: "customers", type: "table" },
        { name: "revenue_by_category", type: "view" },
      ],
    },
    {
      name: "sales",
      tables: [
        { name: "transactions", type: "table" },
        { name: "revenue", type: "table" },
        { name: "sales_reps", type: "table" },
        { name: "monthly_summary", type: "view" },
      ],
    },
  ];

  // Mock query results
  const queryResults = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 249.99,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Ergonomic Office Chair",
      price: 199.95,
      category: "Furniture",
    },
    {
      id: 3,
      name: "Ultra HD Smart TV - 55\"",
      price: 699.99,
      category: "Electronics",
    },
    {
      id: 4,
      name: "Professional Chef Knife Set",
      price: 129.99,
      category: "Kitchen",
    },
    {
      id: 5,
      name: "Leather Messenger Bag",
      price: 159.95,
      category: "Accessories",
    },
    {
      id: 6,
      name: "Bluetooth Wireless Speaker",
      price: 89.99,
      category: "Electronics",
    },
    {
      id: 7,
      name: "Premium Coffee Maker",
      price: 149.99,
      category: "Kitchen",
    },
  ];

  // Query tabs
  const queryTabs = [
    { id: "query1", name: "Query 1" },
    { id: "query2", name: "Query 2" },
  ];

  const toggleResultExpansion = () => {
    setIsResultExpanded(!isResultExpanded);
  };

  return (
    <div className="metabase-content">
      {/* Page Header */}
      <div className="metabase-dashboard-header">
        <div>
          <h1 className="text-2xl font-semibold text-[#2E3B52]">SQL Lab</h1>
          <p className="text-sm text-[#606984] mt-1">
            Write custom SQL queries and explore your data
          </p>
        </div>

        <div className="flex space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="metabase-light"
                size="sm"
                className="flex items-center"
              >
                <Database className="h-4 w-4 mr-1.5" />
                <span>{selectedDatabase}</span>
                <ChevronDown className="h-4 w-4 ml-1.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setSelectedDatabase("PostgreSQL")}>
                PostgreSQL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDatabase("MySQL")}>
                MySQL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDatabase("BigQuery")}>
                BigQuery
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedDatabase("Snowflake")}>
                Snowflake
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="metabase" size="sm" className="flex items-center">
            <Play className="h-4 w-4 mr-1.5" />
            Run Query
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Database Schema Browser */}
        <Card className="md:col-span-1 overflow-hidden">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-medium">Schema Browser</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-250px)]">
              {schemas.map((schema) => (
                <div key={schema.name} className="mb-3">
                  <div className="px-4 py-2 text-xs font-medium text-[#949AAB] uppercase tracking-wider">
                    {schema.name}
                  </div>
                  <div>
                    {schema.tables.map((table) => (
                      <div
                        key={table.name}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="w-4 h-4 mr-2">
                          {table.type === "table" ? (
                            <Table className="h-4 w-4 text-[#509EE3]" />
                          ) : (
                            <Table className="h-4 w-4 text-[#A989C5]" />
                          )}
                        </div>
                        <div className="flex-1 text-sm text-[#606984]">
                          {table.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* SQL Editor and Results */}
        <div className={`flex flex-col ${isResultExpanded ? "md:col-span-3" : "md:col-span-3"}`}>
          {/* Query Tabs */}
          <div className="bg-white rounded-t-lg border border-[#E3E8EE] overflow-hidden mb-1">
            <div className="flex items-center border-b border-[#E3E8EE]">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="flex items-center">
                  <TabsList className="bg-transparent h-auto p-0">
                    {queryTabs.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-[#509EE3] rounded-none data-[state=active]:text-[#509EE3] min-w-[100px] text-center"
                      >
                        {tab.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 ml-2"
                  >
                    <Plus className="h-4 w-4 text-[#606984]" />
                  </Button>
                </div>
              </Tabs>
            </div>

            {/* SQL Editor */}
            <div className="p-4">
              <div className="border border-[#E3E8EE] rounded-lg overflow-hidden">
                <div className="bg-[#F9FBFC] px-3 py-2 border-b border-[#E3E8EE] flex items-center justify-between">
                  <div className="text-xs font-medium text-[#606984]">SQL</div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3 text-[#606984]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0"
                    >
                      <Maximize2 className="h-3 w-3 text-[#606984]" />
                    </Button>
                  </div>
                </div>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-48 p-3 font-mono text-sm text-[#2E3B52] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Query Results */}
          <Card className="flex-1">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Query Results</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="text-xs text-[#606984]">
                  7 rows in 45ms
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0"
                  onClick={toggleResultExpansion}
                >
                  <Maximize2 className="h-3 w-3 text-[#606984]" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-0"
                    >
                      <Download className="h-3 w-3 text-[#606984]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>Download as CSV</DropdownMenuItem>
                    <DropdownMenuItem>Download as Excel</DropdownMenuItem>
                    <DropdownMenuItem>Download as JSON</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-500px)]">
                <TableComponent>
                  <TableHeader>
                    <TableRow className="border-t border-[#E3E8EE] bg-[#F9FBFC]">
                      <TableHead className="metabase-table-header">id</TableHead>
                      <TableHead className="metabase-table-header">name</TableHead>
                      <TableHead className="metabase-table-header">price</TableHead>
                      <TableHead className="metabase-table-header">category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queryResults.map((row) => (
                      <TableRow key={row.id} className="hover:bg-gray-50">
                        <TableCell className="metabase-table-cell text-[#606984]">
                          {row.id}
                        </TableCell>
                        <TableCell className="metabase-table-cell text-[#606984]">
                          {row.name}
                        </TableCell>
                        <TableCell className="metabase-table-cell text-[#606984]">
                          ${row.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="metabase-table-cell text-[#606984]">
                          {row.category}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableComponent>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}