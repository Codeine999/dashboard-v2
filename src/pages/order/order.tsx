import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderList } from "@/data/order.data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Wrapper, Header, ButtonAdd } from "@/components/Components";
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  RotateCcw,
  Trash,
  Star,
  Ellipsis,
  Search,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const order = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [allOrder, setAllOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(allOrder.length / itemsPerPage) || 1;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setAllOrder(orderList.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, orderList]);

  const maxLength = () =>
    windowWidth < 768
      ? 40
      : windowWidth < 1000
      ? 55
      : windowWidth <= 1100
      ? 75
      : 80;

  const cutText = (text, maxLength) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + "..";

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    console.log("currentPage:", currentPage);
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    console.log(currentPage);
  };

  return (
    <Wrapper>
      <div className="bg-white flex flex-col w-full 2xl:h-[1000px] md:h-[670px] h-[824px] border border-[#e8eaed] rounded-2xl shadow-sm">
        <div className="md:flex md:justify-between grid grid-cols-1 gap-2.5 p-5">
          <div className="flex justify-end gap-2">
            <div className="bg-white w-[90px] h-[40px]">
              <p className="p-2">Pending</p>
            </div>

            <div className="bg-white w-[40px] h-[40px] border border-[#e5e7eb] rounded-lg shadow-xs">
              <div className="flex mt-2 justify-center items-center">
                <Sheet>
                  <SheetTrigger>
                    <Trash className="text-xl text-[#667085] cursor-pointer" />
                  </SheetTrigger>
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
              </div>
            </div>

            <div className="bg-white w-[40px] h-[40px] border border-[#e5e7eb] rounded-lg shadow-xs">
              <div className="flex mt-2 justify-center items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis className="text-xl text-[#667085] cursor-pointer" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="mt-2 mx-14 w-50 bg-white border-0 shadow-[0_0.5px_2px_rgba(0,0,0,0.3)]">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>shipping</DropdownMenuItem>
                      <DropdownMenuItem>succuse</DropdownMenuItem>
                      <DropdownMenuItem>cancal</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div
            className="md:w-[270px] w-full h-[40px] bg-white border border-[#E5E7EB] 
              rounded-lg shadow-xs focus-within:ring-1 focus-within:ring-[#9369db] transition"
          >
            <div className="flex px-3 mt-2 items-center">
              <Search className="mr-2 text-[#667085]" />
              <input
                placeholder="Search..."
                className="bg-transparent outline-none"
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
        <div className="-mt-1 w-full border-[0.5px] border-[#e5e7eb]" />
        <div className="md:block hidden flex-1 overflow-y-auto">
          {allOrder.map((allOrder) => (
            <Link to={`/order/confirm/${allOrder.orderID}`} key={allOrder.orderID}>
              <div className="flex justify-center items-center gap-2 p-4 -my-[1.2px] hover:bg-[#f1f3f9]">
                <div className="mr-auto flex md:gap-6 gap-2 items-center">
                  <div className="xl:w-[140px] lg:w-[140px] w-[130px]">
                    <div className="flex gap-6 items-center">
                      <Checkbox id="terms" />
                      <h1 className="text-md text-gray-500">
                        {cutText(allOrder.name, maxLength())}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 whitespace-nowrap 2xl:w-[900px] mx-a xl:w-[700px] lg:w-[600px] w-[450px]">
                  <h1 className="text-md text-gray-500">
                    {cutText(allOrder.detail, maxLength())}
                  </h1>
                  <h1 className="text-sm text-gray-500">Status</h1>
                </div>

                <div className="ml-auto">
                  <p className="text-sm text-gray-500">{allOrder.time}</p>
                </div>
              </div>
              <div className=" w-full border-[0.5px] border-[#e5e7eb]" />
            </Link>
          ))}
        </div>

        <div className="md:block hidden">
          <div className="flex justify-between p-2 px-4">
            <div className="mt-1">
              <p className="text-sm">showing 1 of 59</p>
            </div>
            <div className="flex gap-2 px-2">
              <Button
                variant="arrow"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="!w-10 !h-5 text-[#667085]" />
              </Button>
              <Button
                variant="arrow"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="!w-10 !h-5 text-[#667085]" />
              </Button>
            </div>
          </div>
        </div>

        <div className="md:hidden block overflow-y-auto h-[656px]">
          {orderList.map((allOrder) => (
             <Link to={`/order/confirm/${allOrder.orderID}`} key={allOrder.orderID}>
              <div className="flex justify-center items-center gap-2 p-4 md:my-[0.9px] my-1">
                <div className="mr-auto flex gap-4 items-center">
                  <Checkbox id="terms" />
                  <div>
                    <h1 className="text-md text-gray-500 font-bold">
                      {cutText(allOrder.name, maxLength())}
                    </h1>
                    <h1 className="text-sm text-gray-500">
                      {cutText(allOrder.detail, maxLength())}
                    </h1>
                  </div>
                </div>

                <div className="md:block hidden mr-auto">
                  <h1 className="text-sm text-gray-500">Status</h1>
                </div>

                <div className="-mt-1">
                  <p className="text-sm mb-1 text-gray-500">{allOrder.time}</p>
                  <Star className="mx-4 h-4.5 text-[#888e9b]" />
                </div>
              </div>
              <div className="-mt-1 w-full border-[0.5px] border-[#e5e7eb]" />
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
