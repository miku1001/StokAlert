import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Calendar,
  Settings,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"

import { Link } from "react-router-dom"

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex gap-2 pl-5 pt-5">
        <div className="w-3 h-3 rounded-full bg-rose-800"></div>
        <div className="w-3 h-3 rounded-full bg-amber-600"></div>
        <div className="w-3 h-3 rounded-full bg-teal-600"></div>
      </div>
      <h1 className="px-5 py-3 text-2xl font-semibold">Stokalerto</h1>
      <Separator className='mb-2'/>

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupContent>

            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link
                    to={item.url}
                    className="
                      flex items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-medium
                      transition-colors
                      hover:bg-green-100
                      hover:text-green-700
                    "
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}