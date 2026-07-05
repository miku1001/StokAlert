import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Calendar,
  Settings,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react"

import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"

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

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("access_token")
    navigate("/")
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-green-600 p-2 text-white shadow-lg transition hover:bg-green-700"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Sidebar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-0 top-0 flex h-full w-64 flex-col bg-white shadow-xl transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="border-b">
            <div className="flex items-start justify-between p-5">
              <div>
                <div className="mb-3 flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-800" />
                  <div className="h-3 w-3 rounded-full bg-amber-600" />
                  <div className="h-3 w-3 rounded-full bg-teal-600" />
                </div>

                <h1 className="text-2xl text-black font-semibold">
                  Stokalerto
                </h1>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
            {items.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-l-4 border-green-600 bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-green-100 hover:text-green-700"
                  }`
                }
              >
                <item.icon className="h-6 w-6" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-semibold">
                M
              </div>

              <div>
                <p className="font-medium">Mark</p>
                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-green-100 hover:text-green-700">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}