import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"

import { LogOut, Moon, Sun, Settings, User, Bell } from "lucide-react";
import { useTheme } from "@/components/context/themeProvider";
import { SidebarTrigger } from "./ui/sidebar";
import Profile from "@/assets/profile.jpeg";

const navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // เปลี่ยนธีมใน body
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };
  return (
    <nav className="md:p-4 p-2 mt-2 flex items-center justify-between">

      <div className="flex gap-2">
        <SidebarTrigger />
      </div>

      <div className="flex items-center">
        <div className="flex md:gap-4 gap-2 md:mx-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="nav">
                <div className="flex gap-1">
                  <Bell className="text-[#6f7d9a] w-10 h-5" />
                  <p className="text-xs text-[#6f7d9a]">+4</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="nav" size="icon" onClick={toggleTheme}>
            <Sun className={`!w-10 !h-5 transition-all duration-300 
              ${theme === "dark" ? "rotate-0 scale-0" : "rotate-0 scale-100"}`}
            />
            <Moon
              className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 
                ${theme === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>

        </div>

        <div className="mx-6">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10">
                <AvatarImage src={Profile} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="!w-5 !h-5 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="!w-5 !h-5 mr-2" />
                Setting
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="!w-5 !h-5 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
