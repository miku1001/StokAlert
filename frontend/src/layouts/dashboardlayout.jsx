import { Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="p-6">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}