import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Dashboard() {
    return (
    <SidebarProvider>

      <AppSidebar />

      <main className="flex-1 p-6">
        Dashboard Content
      </main>

    </SidebarProvider>
  )
}