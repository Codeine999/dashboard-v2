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

import { LogOut, Moon, Sun, Settings, User, Bell, MailWarning } from "lucide-react";
import { useTheme } from "@/components/context/themeProvider";
import { SidebarTrigger } from "./ui/sidebar";
import Profile from "@/assets/profile.jpeg";

const notifications = [
  { id: 1, user: 'Service', action: 'You got some new order now', time: '5 mins ago', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, user: 'Service', action: 'You got some new order now', time: '21 mins ago', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 3, user: 'Dave Wood', action: 'You got some new order now ', time: '2hrs ago', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: 4, user: 'Kate Young', action: 'Liked your photo: Daily UI Challenge 049', time: '3hrs ago', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 5, user: 'Anna Lee', action: 'You got some new order now', time: '1 day ago', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
];

const navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

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
                  <Bell className="w-10 h-5" />
                  <p className="text-xs">+0</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className={`w-74 h-[320px] bg-background rounded-lg shadow-lg
              ${theme == "dark" ? "!border-1 border-gray-750" : ""}`}
            >
              <div className="p-2 flex justify-center">
                <p className="text-[#6f7d9a] font-semibold">Notification</p>
              </div>
              <div className="w-full px-1 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center space-x-3 py-1">
                    <DropdownMenuItem className="w-full">
                      <div
                        // src={notification.image}
                        // alt={notification.user}
                        className="-mt-2 w-10 h-10 bg-gray-300 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#6f7d9a]">{notification.user}</span>
                        <span className="text-sm text-gray-500">{notification.action}</span>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>

                    </DropdownMenuItem>
                  </div>
                ))}
              </div>
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
