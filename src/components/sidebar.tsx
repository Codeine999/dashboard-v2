import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import { useTheme } from "@/components/context/themeProvider"

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

import NextIcons from "@/assets/nexticon.svg"
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
    url: "../",
    icon: Search,
  },

];

const sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string>("");

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="flex start">
              <Link to="/">
                <div className="-mx-1.5 flex items-center gap-3">
                  {theme === "dark" ? (
                    <img src={NextIcons} alt="logo" className="w-7 h-7" />
                  ) : (
                    <img src={NextIcon} alt="logo" className="w-7 h-7" />
                  )}
                  <span className="md:text-md text-lg text-color font-normal">Sasom</span>
                </div>
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
                    isActive={
                      item.url === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(item.url)
                    }
                  >
                    <NavLink to={item.url}>
                      <p className="font-normal flex items-center gap-2">
                        <item.icon className="w-5 h-5" />
                        {item.title}
                      </p>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="cursor-pointer">
                      Ai Work Flow
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
                              Ai Chat Bot
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





