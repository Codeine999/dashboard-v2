import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Wrapper, Header, ButtonAdd } from "@/components/Components";

import {
  MessageSquareText,
  SquarePen,
  Search,
  Download,
  Trash2
}
  from "lucide-react";

import { users } from "@/data/users.data";

const User = () => {
  return (
    <div className="mt-10 2xl:px-28 max-w-8xl mx-auto mb-12">
      <div className="flex justify-between items-center">
        <div className="px-4">
          <div className="flex gap-4 items-center">
            <button className="cursor-pointer text-color text-sm">All</button>
            <span className="text-normal text-sm">|</span>
            <button className="cursor-pointer text-normal text-sm">Admin</button>
          </div>
        </div>
        <div>
          <ButtonAdd onClick={''} title="Add User +" />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <div
            className="w-full h-[40px] bg-background border-1 rounded-lg
            focus-within:ring-1 focus-within:ring-[#9369db] transition"
          >
            <div className="flex px-3 items-center h-full">
              <Search className="mr-2 text-[#879da7]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full"
              // onChange={handleSearchChange}
              />
              <div
                className="ml-auto w-[32px] h-[22px]  border
               flex justify-center items-center rounded-sm"
              >
                <p className="text-xs text-[#879da7] p-1">
                  ⌘<span className="ml-[2px]">K</span>
                </p>
              </div>
            </div>
          </div>
        </div>


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="filter">
              <div className="flex items-center gap-1 text-[#879da7] ">
                Export
                <Download className="!w-4 !h-3.6" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <img
                  src="/icon/excel.png"
                  className="w-5 h-5"
                />
                Excel
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <img
                  src="/icon/excel.png"
                  className="w-5 h-5"
                />
                Excel
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <img
                  src="/icon/excel.png"
                  className="w-5 h-5"
                />
                Excel
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

            </DropdownMenuGroup>
          </DropdownMenuContent>

        </DropdownMenu>


      </div>


      <div className="mt-3 bg-background rounded-2xl border-1 overflow-hidden">
        <div className="sticky overflow-x-auto">
          <Table className="min-w-[900px] table-fixed">
            <TableHeader className="h-[55px]">
              <TableRow>
                <TableHead className="w-[100px] px-6 text-[#879da7] font-semibold">
                  Picture
                </TableHead>
                <TableHead className="w-[150px] px-4 text-[#879da7] font-semibold">
                  Username
                </TableHead>
                <TableHead className="w-[150px] px-6 text-[#879da7] font-semibold">
                  First Name
                </TableHead>
                <TableHead className="w-[180px] px-[6px] text-[#879da7] font-semibold">
                  Email
                </TableHead>
                <TableHead className="w-[120px] text-center text-[#879da7] font-semibold">
                  Role
                </TableHead>
                <TableHead className="w-[120px] text-center text-[#879da7] font-semibold">
                  Status
                </TableHead>
                <TableHead className="w-[120px] text-center text-[#879da7] font-semibold">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        <div className="lg:h-[600px] h-[550px] overflow-auto">
          <Table className="table-fixed">
            <TableBody>
              {users.map((items, index) => (
                <TableRow key={index}>
                  <TableCell className="w-[100px] px-6 py-2.5">
                    <img
                      src={items.image}
                      alt="img"
                      className="w-[34px] h-[34px] object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell className="w-[150px] text-sm px-4 font-medium whitespace-nowrap overflow-hidden text-normal">
                    {items.username}
                  </TableCell>
                  <TableCell className="w-[150px] text-sm px-6 font-medium  whitespace-nowrap overflow-hidden text-normal">
                    {items.firstName}
                  </TableCell>
                  <TableCell className="w-[180px] text-sm text-left font-medium whitespace-nowrap overflow-hidden text-normal">
                    {items.email}
                  </TableCell>
                  <TableCell className="w-[120px] text-center font-medium  whitespace-nowrap text-normal">
                    user
                  </TableCell>
                  <TableCell className="w-[120px] text-center font-medium  whitespace-nowrap text-normal">
                    VIP
                  </TableCell>
                  <TableCell className="w-[110px]">
                    <div className="flex justify-center items-center">

                      <Button variant="ghost" className="text-slate-400  cursor-pointer -mx-2">
                        <MessageSquareText className="!w-5.5 !h-5.5" />
                      </Button>

                      <Button variant="ghost" className="text-yellow-500 cursor-pointer">
                        <SquarePen className="!w-5.5 !h-5.5" />
                      </Button>

                      <Button variant="ghost" className="text-red-400 cursor-pointer -mx-2">
                        <Trash2 className="!w-5.5 !h-5.5" />
                      </Button>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default User;
