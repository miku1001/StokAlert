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
      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>

                  <SidebarMenuButton asChild>

                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>

                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}