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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wrapper, Header, ButtonAdd } from "@/components/Components";

import { MessageSquareText, SquarePen, Search } from "lucide-react";

import { users } from "@/data/users.data";

const User = () => {
  return (
    <div className="mt-6 mb-5">
      <div className="flex justify-between items-center">
        <div className="px-4">
          <div className="flex gap-4">
            <button className="cursor-pointer text-color text-md">All</button>
            <span className="text-color">|</span>
            <button className="cursor-pointer text-color text-md">Admin</button>
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
              <Search className="mr-2 text-[#667085]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full"
              // onChange={handleSearchChange}
              />
              <div
                className="ml-auto w-[32px] h-[22px] bg-[#f9fafb] border border-[#e6e7eb]
               flex justify-center items-center rounded-sm"
              >
                <p className="text-xs text-[#667085]">
                  ⌘<span className="ml-[2px]">K</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4">
          export
        </div>

      </div>


      <div className="mt-3 bg-background rounded-2xl border-1 overflow-hidden">
        <div className="sticky overflow-x-auto">
          <Table className="min-w-[900px] table-fixed">
            <TableHeader className="h-[55px]">
              <TableRow>
                <TableHead className="w-[100px] px-6 text-[#879da7] pt-2">
                  Picture
                </TableHead>
                <TableHead className="w-[150px] px-4 text-[#879da7] pt-2">
                  Username
                </TableHead>
                <TableHead className="w-[150px] px-6 text-[#879da7] pt-2">
                  First Name
                </TableHead>
                <TableHead className="w-[180px] px-[6px] text-[#879da7] pt-2">
                  Email
                </TableHead>
                <TableHead className="w-[120px] text-center text-[#879da7] pt-2">
                  Role
                </TableHead>
                <TableHead className="w-[120px] text-center text-[#879da7] pt-2">
                  Status
                </TableHead>
                <TableHead className="w-[120px] text-center text-[#879da7] pt-2">
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
                  <TableCell className="w-[100px] px-6 py-1 pb-4">
                    <img
                      src={items.image}
                      alt="img"
                      className="w-[35px] h-[35px] object-contain rounded-full"
                    />
                  </TableCell>
                  <TableCell className="w-[150px] text-sm px-4 font-semibold whitespace-nowrap overflow-hidden truncate">
                    {items.username}
                  </TableCell>
                  <TableCell className="w-[150px] text-sm  px-6 whitespace-nowrap overflow-hidden truncate">
                    {items.firstName}
                  </TableCell>
                  <TableCell className="w-[180px] text-sm  text-left whitespace-nowrap overflow-hidden truncate">
                    {items.email}
                  </TableCell>
                  <TableCell className="w-[120px] text-center whitespace-nowrap">
                    user
                  </TableCell>
                  <TableCell className="w-[120px] text-center whitespace-nowrap">
                    VIP
                  </TableCell>
                  <TableCell className="w-[120px] text-center">
                    <div className="flex justify-center gap-2">
                      <button className="text-slate-400 hover:bg-red-400 p-1 rounded-sm">
                        <MessageSquareText className="w-6 h-6" />
                      </button>
                      <button className="text-slate-400 hover:bg-red-400 p-1 rounded-sm">
                        <SquarePen className="w-6 h-6" />
                      </button>
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
