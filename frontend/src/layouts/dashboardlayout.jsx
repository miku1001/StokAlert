import { Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <MobileSidebar />

      <SidebarInset className='bg-zinc-100'>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}