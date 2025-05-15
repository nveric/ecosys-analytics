import React from "react";
import { 
  Users, 
  Database, 
  Code, 
  Mail, 
  Shield, 
  Globe, 
  HardDrive,
  Settings as SettingsIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="metabase-content">
      <div className="metabase-dashboard-header">
        <div>
          <h1 className="text-2xl font-semibold text-[#2E3B52]">Settings</h1>
          <p className="text-sm text-[#606984] mt-1">
            Configure your Ecosys Analytics instance
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <div className="py-3 px-4 text-xs font-medium text-[#949AAB] uppercase tracking-wider">
                  Settings
                </div>
                <div className="border-t border-[#E3E8EE]">
                  <a
                    href="#setup"
                    className="flex items-center py-2.5 px-4 text-sm text-[#509EE3] bg-blue-50 border-l-2 border-[#509EE3]"
                  >
                    <SettingsIcon className="h-4 w-4 mr-3" />
                    <span>Setup</span>
                  </a>
                  <a
                    href="#users"
                    className="flex items-center py-2.5 px-4 text-sm text-[#606984] hover:bg-gray-50"
                  >
                    <Users className="h-4 w-4 mr-3" />
                    <span>Users & Groups</span>
                  </a>
                  <a
                    href="#databases"
                    className="flex items-center py-2.5 px-4 text-sm text-[#606984] hover:bg-gray-50"
                  >
                    <Database className="h-4 w-4 mr-3" />
                    <span>Databases</span>
                  </a>
                  <a
                    href="#email"
                    className="flex items-center py-2.5 px-4 text-sm text-[#606984] hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4 mr-3" />
                    <span>Email</span>
                  </a>
                  <a
                    href="#authentication"
                    className="flex items-center py-2.5 px-4 text-sm text-[#606984] hover:bg-gray-50"
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    <span>Authentication</span>
                  </a>
                  <a
                    href="#localization"
                    className="flex items-center py-2.5 px-4 text-sm text-[#606984] hover:bg-gray-50"
                  >
                    <Globe className="h-4 w-4 mr-3" />
                    <span>Localization</span>
                  </a>
                  <a
                    href="#customization"
                    className="flex items-center py-2.5 px-4 text-sm text-[#606984] hover:bg-gray-50"
                  >
                    <Code className="h-4 w-4 mr-3" />
                    <span>Customization</span>
                  </a>
                  <a
                    href="#maintenance"
                    className="flex items-center py-2.5 px-4 text-sm text-[#606984] hover:bg-gray-50"
                  >
                    <HardDrive className="h-4 w-4 mr-3" />
                    <span>Maintenance</span>
                  </a>
                </div>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings content */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="license">License</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-medium mb-2 text-[#2E3B52]">
                        Site Name
                      </h3>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-[#E3E8EE] rounded-lg text-sm"
                        placeholder="Superset"
                        defaultValue="Superset"
                      />
                      <p className="text-xs text-[#949AAB] mt-1">
                        The name of your Superset instance.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-medium mb-2 text-[#2E3B52]">
                        Site URL
                      </h3>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-[#E3E8EE] rounded-lg text-sm"
                        placeholder="https://example.com"
                        defaultValue="http://localhost:5000"
                      />
                      <p className="text-xs text-[#949AAB] mt-1">
                        The base URL of your Superset instance, excluding path.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-medium mb-2 text-[#2E3B52]">
                        Report Timezone
                      </h3>
                      <select
                        className="w-full px-3 py-2 border border-[#E3E8EE] rounded-lg text-sm bg-white"
                        defaultValue="UTC"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                      </select>
                      <p className="text-xs text-[#949AAB] mt-1">
                        The timezone used for displaying dates in the application.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-medium mb-2 text-[#2E3B52]">
                        Custom Branding
                      </h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-16 w-16 bg-white border border-[#E3E8EE] rounded-lg flex items-center justify-center overflow-hidden">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="32" height="32" rx="4" fill="#509EE3" />
                            <path
                              d="M16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6ZM16 11C18.761 11 21 13.239 21 16C21 18.761 18.761 21 16 21C13.239 21 11 18.761 11 16C11 13.239 13.239 11 16 11Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                        <Button variant="metabase-light" size="sm">
                          Change Logo
                        </Button>
                      </div>
                      <p className="text-xs text-[#949AAB]">
                        Upload a custom logo (SVG or PNG, max 2MB).
                      </p>
                    </div>

                    <div className="pt-4">
                      <Button variant="metabase">Save Changes</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="updates" className="pt-6">
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-[#509EE3] rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-[#509EE3] rounded-full p-1">
                          <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-[#2E3B52]">
                            You're running the latest version
                          </h3>
                          <div className="mt-1 text-sm text-[#606984]">
                            <p>Superset v2.1.0</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-medium mb-2 text-[#2E3B52]">
                        Update Channel
                      </h3>
                      <select
                        className="w-full px-3 py-2 border border-[#E3E8EE] rounded-lg text-sm bg-white"
                        defaultValue="stable"
                      >
                        <option value="stable">Stable releases</option>
                        <option value="beta">Beta releases</option>
                        <option value="alpha">Alpha releases</option>
                      </select>
                      <p className="text-xs text-[#949AAB] mt-1">
                        Choose which update channel to use.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-medium mb-2 text-[#2E3B52]">
                        Automatic Updates
                      </h3>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="auto-updates"
                          className="rounded border-[#E3E8EE] text-[#509EE3] focus:ring-[#509EE3]"
                          defaultChecked={true}
                        />
                        <label
                          htmlFor="auto-updates"
                          className="ml-2 text-sm text-[#606984]"
                        >
                          Check for updates automatically
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button variant="metabase">Check for Updates Now</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="license" className="pt-6">
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-green-500 rounded-full p-1">
                          <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-[#2E3B52]">
                            Apache License 2.0
                          </h3>
                          <div className="mt-1 text-sm text-[#606984]">
                            <p>
                              Superset is licensed under the Apache License 2.0.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-medium mb-2 text-[#2E3B52]">
                        License Information
                      </h3>
                      <p className="text-sm text-[#606984]">
                        Apache Superset is licensed under the Apache License 2.0, a permissive open source license. You are free to use, modify, and distribute this software, subject to the terms of the license.
                      </p>
                    </div>

                    <div>
                      <Button variant="metabase-light">View License</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}