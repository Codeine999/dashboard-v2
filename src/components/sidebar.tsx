import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  Plus,
  Projector,
} from "lucide-react";
import NextIcon from "@/assets/next-icon.svg"


const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Product",
    url: "/product",
    icon: Inbox,
  },
  {
    title: "Order",
    url: "/order",
    icon: Calendar,
  },
  {
    title: "Users",
    url: "/users",
    icon: Search,
  },
  {
    title: "Overview",
    url: "/admin",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/setting",
    icon: Settings,
  },
];

const sidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string>("");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="flex start">
              <Link to="">
                <img src={NextIcon} alt="logo" className="w-8 h-8" />
                <span className="text-[16px]">Wake Up</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="rounded-2xl">
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="cursor-pointer">
                       Web Site
                      <ChevronDown
                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180
                          cursor-pointer"
                      />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <NavLink to="/#">
                              <Projector />
                              Meta Tags
                            </NavLink>
                            
                            
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default sidebar;





