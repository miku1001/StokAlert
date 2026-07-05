import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Calendar,
  Settings,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { LogOut, User } from "lucide-react";

import { Separator } from "@/components/ui/separator"

import { NavLink } from "react-router-dom"

import { useNavigate } from "react-router-dom";

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
  const {state} = useSidebar();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/");
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {state === "expanded" && (
          <>
            <div className="flex gap-2 pl-5 pt-5">
              <div className="w-3 h-3 rounded-full bg-rose-800"></div>
              <div className="w-3 h-3 rounded-full bg-amber-600"></div>
              <div className="w-3 h-3 rounded-full bg-teal-600"></div>
            </div>
            <div className="flex gap-20">
              <h1 className="px-5 py-3 text-2xl font-semibold">Stokalerto</h1>
              <SidebarTrigger/>
            </div>
          </>
        )}
        {state !== "expanded" &&(
          <SidebarTrigger className="py-4"/>
        )}
        <Separator className='mb-2'/>
      </SidebarHeader>


      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupContent>

            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({isActive}) =>`
                      flex items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      text-sm
                      font-medium
                      transition-colors
                      hover:bg-pink-100
                      hover:text-pink-700
                      ${isActive ? "bg-pink-50 text-pink-700 border-l-4 border-pink-600":"hover:bg-gray-100"}`
                  }
                  >
                    <item.icon className="h-6 w-6" />
                    {state === "expanded" && (
                      <span>{item.title}</span>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex w-full items-center justify-between rounded-lg p-3 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-white">
                  M
                </div>

                <div className="text-left">
                  <p className="font-medium">Mark</p>
                  <p className="text-xs text-gray-500">
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="end">

            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>
      </SidebarFooter>
      
    </Sidebar>
  )
}