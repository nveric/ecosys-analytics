import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DashboardPage from "@/pages/dashboard";
import DatasetsPage from "@/pages/datasets";
import ChartsPage from "@/pages/charts";
import SQLLabPage from "@/pages/sql-lab";
import Settings from "@/pages/settings";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboards/sales" component={DashboardPage} />
      <Route path="/dashboards/marketing" component={DashboardPage} />
      <Route path="/dashboards/performance" component={DashboardPage} />
      <Route path="/dashboards" component={DashboardPage} />
      <Route path="/datasets" component={DatasetsPage} />
      <Route path="/charts" component={ChartsPage} />
      <Route path="/sql-lab" component={SQLLabPage} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex h-screen w-full overflow-hidden bg-[#F9FBFC]">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center bg-white h-14 border-b border-[#E3E8EE] px-4 flex-shrink-0">
              <Header toggleSidebar={toggleSidebar} />
            </div>
            <Router />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
