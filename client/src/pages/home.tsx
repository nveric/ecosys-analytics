import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Database, Plus } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="metabase-content">
      <div className="metabase-dashboard-header">
        <div>
          <h1 className="text-2xl font-semibold text-[#2E3B52]">Welcome to Superset</h1>
          <p className="text-sm text-[#606984] mt-1">Your data visualization platform</p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="metabase" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-1.5" />
            Create Dashboard
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/dashboards">
                <div className="flex items-center p-3 bg-blue-50 text-[#509EE3] rounded-lg hover:bg-blue-100 transition-colors">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-medium">View Dashboards</div>
                    <div className="text-sm text-[#606984]">Check your existing dashboards</div>
                  </div>
                </div>
              </Link>
              
              <Link href="/charts">
                <div className="flex items-center p-3 bg-green-50 text-[#88BF4D] rounded-lg hover:bg-green-100 transition-colors">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-medium">Create Chart</div>
                    <div className="text-sm text-[#606984]">Make a new visualization</div>
                  </div>
                </div>
              </Link>
              
              <Link href="/datasets">
                <div className="flex items-center p-3 bg-purple-50 text-[#A989C5] rounded-lg hover:bg-purple-100 transition-colors">
                  <Database className="h-5 w-5 mr-3" />
                  <div>
                    <div className="font-medium">Connect Data</div>
                    <div className="text-sm text-[#606984]">Set up a new data source</div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Dashboards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/dashboards/sales">
                <div className="block p-3 border border-[#E3E8EE] rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-[#2E3B52]">Sales Dashboard</div>
                  <div className="text-sm text-[#606984] mt-1">Last viewed 2 hours ago</div>
                </div>
              </Link>
              
              <Link href="/dashboards/marketing">
                <div className="block p-3 border border-[#E3E8EE] rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-[#2E3B52]">Marketing Dashboard</div>
                  <div className="text-sm text-[#606984] mt-1">Last viewed yesterday</div>
                </div>
              </Link>
              
              <Link href="/dashboards/performance">
                <div className="block p-3 border border-[#E3E8EE] rounded-lg hover:bg-gray-50">
                  <div className="font-medium text-[#2E3B52]">Performance Metrics</div>
                  <div className="text-sm text-[#606984] mt-1">Last viewed 3 days ago</div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href="https://superset.apache.org/docs/intro" target="_blank" rel="noopener noreferrer" className="block p-3 border border-[#E3E8EE] rounded-lg hover:bg-gray-50">
                <div className="font-medium text-[#2E3B52]">Documentation</div>
                <div className="text-sm text-[#606984] mt-1">Learn how to use Superset</div>
              </a>
              
              <a href="https://superset.apache.org/docs/installation/installing-superset-using-docker-compose" target="_blank" rel="noopener noreferrer" className="block p-3 border border-[#E3E8EE] rounded-lg hover:bg-gray-50">
                <div className="font-medium text-[#2E3B52]">Installation Guide</div>
                <div className="text-sm text-[#606984] mt-1">Setup Superset locally</div>
              </a>
              
              <a href="https://github.com/apache/superset" target="_blank" rel="noopener noreferrer" className="block p-3 border border-[#E3E8EE] rounded-lg hover:bg-gray-50">
                <div className="font-medium text-[#2E3B52]">GitHub Repository</div>
                <div className="text-sm text-[#606984] mt-1">Contribute to Superset</div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
