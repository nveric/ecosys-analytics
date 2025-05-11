import React, { useState } from "react";
import { Plus, Search, ChevronDown, Database, Filter, MoreVertical, Loader2 } from "lucide-react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Types based on our database schema
interface Dataset {
  id: number;
  name: string;
  description: string | null;
  sourceType: 'database' | 'csv' | 'api';
  sourceConfig: any;
  createdBy: number | null;
  createdAt: string;
  updatedAt: string;
  rowCount: number | null;
  isFavorite: boolean;
}

// Sample converter for sourceConfig to display values
const getSourceDetails = (dataset: Dataset) => {
  const config = dataset.sourceConfig || {};
  return {
    source: dataset.sourceType || 'Unknown',
    schema: config.schema || 'default',
    type: config.type || 'Table'
  };
};

export default function DatasetsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [datasetsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDatasetName, setNewDatasetName] = useState("");
  const [newDatasetDescription, setNewDatasetDescription] = useState("");
  const [newDatasetSource, setNewDatasetSource] = useState<'database' | 'csv' | 'api'>('database');
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch datasets from API
  const { 
    data: datasets = [], 
    isLoading,
    isError 
  } = useQuery({
    queryKey: ['/api/datasets'],
    retry: 1
  });
  
  // Create dataset mutation
  const createDatasetMutation = useMutation({
    mutationFn: async (newDataset: { 
      name: string; 
      description: string;
      sourceType: 'database' | 'csv' | 'api';
      sourceConfig: any;
    }) => {
      return await apiRequest('/api/datasets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDataset),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/datasets'] });
      setIsCreateDialogOpen(false);
      setNewDatasetName("");
      setNewDatasetDescription("");
      toast({
        title: "Dataset created",
        description: "Your dataset has been created successfully.",
      });
    },
    onError: (error) => {
      console.error('Failed to create dataset:', error);
      toast({
        title: "Failed to create dataset",
        description: "There was an error creating your dataset. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Toggle favorite mutation
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (datasetId: number) => {
      return await apiRequest(`/api/datasets/${datasetId}/favorite`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/datasets'] });
    }
  });
  
  // Delete dataset mutation
  const deleteDatasetMutation = useMutation({
    mutationFn: async (datasetId: number) => {
      return await apiRequest(`/api/datasets/${datasetId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/datasets'] });
      toast({
        title: "Dataset removed",
        description: "The dataset has been removed successfully.",
      });
    },
    onError: (error) => {
      console.error('Failed to delete dataset:', error);
      toast({
        title: "Failed to remove dataset",
        description: "There was an error removing this dataset. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle create dataset
  const handleCreateDataset = () => {
    if (!newDatasetName.trim()) {
      toast({
        title: "Validation Error",
        description: "Dataset name is required.",
        variant: "destructive",
      });
      return;
    }
    
    createDatasetMutation.mutate({
      name: newDatasetName,
      description: newDatasetDescription,
      sourceType: newDatasetSource,
      sourceConfig: {
        schema: 'public',
        type: 'Table'
      }
    });
  };
  
  // Filter datasets based on search query
  const filteredDatasets = datasets.filter((dataset: Dataset) =>
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.sourceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastDataset = currentPage * datasetsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - datasetsPerPage;
  const currentDatasets = filteredDatasets.slice(
    indexOfFirstDataset,
    indexOfLastDataset
  );

  // Format row count with commas
  const formatRows = (rows: number | null) => {
    if (rows === null) return "0";
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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="metabase" size="sm" className="flex items-center">
                <Plus className="h-4 w-4 mr-1.5" />
                New Dataset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Dataset</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm">
                    Name
                  </label>
                  <input
                    id="name"
                    className="col-span-3 h-9 rounded-md border border-[#E3E8EE] px-3 py-1"
                    value={newDatasetName}
                    onChange={(e) => setNewDatasetName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="description" className="text-right text-sm">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="col-span-3 rounded-md border border-[#E3E8EE] px-3 py-1"
                    value={newDatasetDescription}
                    onChange={(e) => setNewDatasetDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="source" className="text-right text-sm">
                    Source Type
                  </label>
                  <select
                    id="source"
                    className="col-span-3 h-9 rounded-md border border-[#E3E8EE] px-3 py-1"
                    value={newDatasetSource}
                    onChange={(e) => setNewDatasetSource(e.target.value as 'database' | 'csv' | 'api')}
                  >
                    <option value="database">Database</option>
                    <option value="csv">CSV</option>
                    <option value="api">API</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="metabase" 
                  onClick={handleCreateDataset}
                  disabled={createDatasetMutation.isPending}
                >
                  {createDatasetMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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