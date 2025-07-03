import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderList } from "@/data/order.data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Wrapper, Header, ButtonAdd } from "@/components/Components";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"

import {
  RotateCcw,
  Trash2,
  Star,
  Ellipsis,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";

const order = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [rawOrder, setRawOrder] = useState(orderList);
  const [currentPage, setCurrentPage] = useState(1);
  const [position, setPosition] = React.useState("All")
  const itemsPerPage = 10;

  const filteredOrder = position === "All"
    ? rawOrder
    : rawOrder.filter((item) => item.status === position);

  const totalPages = Math.ceil(filteredOrder.length / itemsPerPage) || 1;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setRawOrder(orderList);
  }, [orderList]);

  useEffect(() => {
    setCurrentPage(1);
  }, [position]);


  const maxLength = () => {
    if (windowWidth < 400) return 90;
    if (windowWidth >= 700 && windowWidth <= 1200) return 120;
    return 120;
  };

  const cutText = (text, maxLength) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + "..";

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };


  const currentItems = filteredOrder.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Wrapper>
      <div
        className="mt-6 bg-background flex flex-col w-full 2xl:h-[1000px] md:h-[680px] h-[824px] 
         rounded-2xl shadow-sm"
      >
        <div className="md:flex md:justify-between  grid grid-cols-1 gap-2.5 p-5">
          <div className="flex justify-between md:gap-6 gap-2 not-hover: ">
            <div className="flex justify-start items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="border-0 bg-background shadow-none hover:bg-transparent">
                    <span className="flex items-center text-gray-500 text-lg border-0 gap-1">
                      {position}
                      <ChevronDown className="!w-5 !h-5" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 p-2">
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="All" className="border-0">
                      All
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Pending">Pending</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Paid">Paid</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Cancel">Cancel</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
          </div>

          <div className="flex gap-2 item-center">
            <div className="w-[40px] md:h-[40px]">
              <div className="flex md:mt-2 md:justify-end items-center">
                <Sheet>
                  <Button variant="ghost">
                    <Trash2 className="!w-5.5 !h-5.5 text-red-400 cursor-pointer" />
                  </Button>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Are you absolutely sure?</SheetTitle>
                      <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </SheetDescription>
                      <div className="flex gap-4 mt-5">
                        <Button
                          variant="confirm"
                          className="bg-black text-white"
                        >
                          Confirm
                        </Button>
                        <Button variant="confirm" className="shadow-sm">
                          Cancel
                        </Button>
                      </div>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Ellipsis className="text-[#667085]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-2 mx-14 w-50 ">
                    {/* <DropdownMenuGroup>
                      <DropdownMenuItem>shipping</DropdownMenuItem>
                      <DropdownMenuItem>succuse</DropdownMenuItem>
                      <DropdownMenuItem>cancal</DropdownMenuItem>
                    </DropdownMenuGroup> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-t-1" />
        <div className="md:block hidden flex-1">
          {currentItems.map((allOrder) => (
            <Link key={allOrder.orderID} to={`/order/confirm/${allOrder.orderID}`} >
              <div className="flex justify-center items-center gap-2 p-4 -my-[1.2px] hover:bg-[#f1f3f9]">
                <div className="mr-auto flex md:gap-6 gap-2 items-center">
                  <div className="xl:w-[140px] lg:w-[140px] w-[130px]">
                    <div className="flex gap-6 items-center">
                      <Checkbox id="terms" />
                      <p className="text-md text-color">
                        {cutText(allOrder.name, maxLength())}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 whitespace-nowrap 2xl:w-[900px] mx-a xl:w-[700px] lg:w-[600px] w-[450px]">
                  <p className="text-md text-gray-500">
                    {cutText(allOrder.detail, maxLength())}
                  </p>
                  <Button
                    className={cn(
                      "px-3 h-[20px] rounded-3xl text-xs text-white",
                      allOrder.status === "Paid" && "bg-gray-400",
                      allOrder.status === "Pending" && "bg-[#6d88f3]",
                      allOrder.status === "Cancel" && "bg-[#fe8080]"
                    )}
                  >
                    {allOrder.status}
                  </Button>
                </div>

                <div className="ml-auto">
                  <p className="text-sm text-gray-500">{allOrder.time}</p>
                </div>
              </div>
              <div className=" w-full border-b-1" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex justify-end items-center mb-2 px-2">
          <div className="flex">
            <Button
              variant="ghost"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="!w-10 !h-5" />
            </Button>
            <div className="mt-1.5 bg-background border-[0.5px] w-[60px] h-[26px] rounded-full shadow-xs">
              <span className="ml-4.5 text-[12px]">
                {currentPage} / {totalPages}
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="!w-10 !h-5" />
            </Button>
          </div>
        </div>

        <div className="md:hidden block overflow-y-auto h-[656px]">
          {currentItems.map((allOrder) => (
            <Link to={`/order/confirm/${allOrder.orderID}`} key={allOrder.orderID}>
              <div className="flex justify-center items-center gap-2 p-4">
                <div className="mr-auto flex gap-4 items-center">
                  <Checkbox id="terms" />
                  <div className="flex flex-col">
                    <div className="flex gap-4">

                      <p className="text-md text-color font-bold">
                        {cutText(allOrder.name, maxLength())}
                      </p>
                      <Button
                        className={cn(
                          "px-2 h-[20px] rounded-3xl text-xs text-white",
                          allOrder.status === "Paid" && "bg-gray-400",
                          allOrder.status === "Pending" && "bg-[#6d88f3]",
                          allOrder.status === "Cancel" && "bg-[#fe8080]"
                        )}
                      >
                        {allOrder.status}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {cutText(allOrder.detail, maxLength())}
                    </p>
                  </div>
                </div>

                <div className="md:block hidden mr-auto">
                  <h1 className="text-sm text-gray-500">Status</h1>
                </div>

                <div className="-mt-1">
                  <p className="text-sm mb-1 text-gray-500">{allOrder.time}</p>
                </div>
              </div>
              <div className="-mt-1 w-full border-1" />
            </Link>
          ))}
        </div>

        <div className="block md:hidden">
          <div className="flex justify-between -mt-1 p-2 px-4">
            <p className="text-sm">showing 1 of 88</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default order;
