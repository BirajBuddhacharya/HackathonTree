import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, ShoppingCart, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const dashboardLinks = [
  {
    title: "Dashboard",
    url: "/startup",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/startup/order",
    icon: ShoppingCart,
  },
]

const productLinks = [
  {
    title: "Products",
    url: "/startup/product",
    icon: List,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3">
          <Image
            src="/image/Logo.png"
            alt="Startup Logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="font-bold text-lg">Startup Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon size={16} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Products</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {productLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon size={16} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 px-4 py-3">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Sam Admin</span>
            <span className="text-xs text-gray-500">admin@startup.com</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}