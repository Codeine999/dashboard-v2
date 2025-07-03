import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MoneyChart from '../components/widgets/MoneyChart';
import {
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

import { ordernotic } from "@/data/order.data"
import {
  SquarePen,
  Ellipsis,
  Wallet,
  User,
  CreditCard,
  ChartSpline,
  ChevronDown,
  ArrowUp
} from "lucide-react";
import ViewChart from "@/components/widgets/ViewChart";
import ViewPieChart from "@/components/widgets/ViewPieChart";



const home = () => {
  const [position, setPosition] = React.useState("Weekly")
  const [viewPosition, setViewPosition] = React.useState("Weekly")
  return (
    <div className="2xl:px-28 max-w-8xl mx-auto mb-12">
      <div className="flex justify-between lg:gap-4 md:gap-12 gap-6">
        <div className="mt-2 text-color">
          <h1 className="xl:text-[30px] text-normal md:text-[35px] md:flex gap-2 text-[30px]">
            Welcome, Codeiner
          </h1>
          <p className="text-[14px] whitespace-nowrap text-secondary">
            Overview dashboard
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">

        <div className="bg-background p-4 px-6 h-[110px] rounded-lg border-1 shadow-sm">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-normal">Total Revenue</CardTitle>
              <p className="mt-1 text-[20px] text-normal font-medium">฿45,231.89</p>
              <CardDescription className="mt-1 text-sm absolute whitespace-nowrap">
                <span className="text-green-500 mr-1">
                  +20.1%
                </span>
                from last month
              </CardDescription>
            </div>
            <Wallet className="mt-1 w-5 h-5 text-icons" />
          </div>
        </div>

        <div className="bg-background p-4 px-6 h-[110px] rounded-lg border-1 shadow-sm">
          <div className="flex justify-between">
            <div className=" relative">
              <CardTitle className="text-normal">Subscriptions</CardTitle>
              <p className="mt-1 text-[20px] text-normal font-medium">+2,350</p>
              <CardDescription className="mt-1 text-sm absolute whitespace-nowrap">
                <span className="text-green-500 mr-1">
                  +180.1%
                </span>
                from last month
              </CardDescription>
            </div>
            <User className="mt-1 w-5 h-5 text-icons" />
          </div>
        </div>

        <div className="bg-background p-4 px-6 h-[110px] rounded-lg border-1 shadow-sm">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-normal">Sales</CardTitle>
              <p className="mt-1 text-[20px] text-normal font-medium">+12,234</p>
              <CardDescription className="mt-1 text-sm absolute whitespace-nowrap">
                <span className="text-green-500 mr-1">
                  +19%
                </span>
                from last month
              </CardDescription>
            </div>
            <CreditCard className="mt-1 w-5 h-5 text-icons" />
          </div>
        </div>

        <div className="bg-background p-4 px-6 h-[110px] rounded-lg border-1 shadow-sm">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-normal">Active now</CardTitle>
              <p className="mt-1 text-[20px] text-normal font-medium">+573</p>
              <CardDescription className="mt-1 text-sm absolute whitespace-nowrap">
                <span className="text-green-500 mr-1">
                  +201
                </span>
                since last hour
              </CardDescription>
            </div>
            <ChartSpline className="mt-1 w-5 h-5 text-icons" />
          </div>
        </div>

      </div>

      {/* chart */}
      <div className="mt-5 grid lg:grid-cols-[60%_39%] gap-4">
        {/* left side */}
        <div className="bg-background border-1 h-[380px] rounded-2xl  shadow-sm">
          <div className="p-6 px-6">
            <div className="flex justify-between">
              <CardTitle className="text-[20px]">{position} Money</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer">
                    <span className="flex items-center text-color text-[15px]">
                      {position}
                      <ChevronDown className="!w-5 !h-4" />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 p-2">
                  <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="Weekly">Weekly</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Monthly">Monthly</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Yearly">Yearly</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <MoneyChart selected={position} />
          </div>
        </div>

        {/* left side */}
        <div className="bg-background md:h-[380px] h-[400px] rounded-2xl border-1 shadow-sm overflow-auto">
          <div className="p-6 px-6">
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>You made 265 sales this month.</CardDescription>
              </div>
              <Ellipsis className="cursor-pointer" />
            </div>

            <div className="mt-2 overflow-auto md:max-h-[280px] max-h-[400px]">
              {ordernotic.map((item) => (
                <div
                  key={item.orderID}
                  className="flex justify-between mt-4 border-b pb-2 "
                >
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    <p className="mt-1">{item.username}</p>
                  </div>
                  <div className="mt-1 text-sm">
                    <p className="">Paid</p>
                  </div>
                  <div className="mt-1 text-[15px]">
                    + 1,620
                  </div>
                  <Button variant="ghost" className="text-yellow-500 p-1">
                    <SquarePen className="!w-6 !h-6" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* bottom left */}
      <div className="mt-4 grid md:grid-cols-[49%_50%] gap-4">
        <div className="bg-background border-1 h-[375px] rounded-lg shadow-sm">
          <div className="flex justify-between p-6 items-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                <div>
                  <CardTitle className="text-md ">Ai Chat Bot</CardTitle>
                  <CardDescription className="text-xs">model from chat gpt</CardDescription>

                </div>
              </div>
            </div>
            <Ellipsis className="text-color cursor-pointer" />
          </div>
          {/* Chat Window */}
          <div className="p-6 flex flex-col space-y-3 overflow-y-auto">
            {/* User Message */}
            <div className="flex justify-start">
              <div className="bg-gray-100 p-2.5 rounded-lg text-sm text-secondary">
                Hey, I'm having trouble with my account.
              </div>
            </div>
            {/* Bot Message */}
            <div className="flex justify-end">
              <div className="bg-gray-700 text-white p-2.5 rounded-lg text-sm">
                What seems to be the problem?
              </div>
            </div>
            {/* User Response */}
            <div className="flex justify-start">
              <div className="bg-gray-100 p-2.5 rounded-lg text-sm text-secondary">
                I can't log in.
              </div>
            </div>
          </div>
          <div className="p-4 py-6 flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full h-10 p-2 rounded-lg border focus:outline-none placeholder:text-sm"
            />
            <Button
              variant="ghost"
              className="ml-2 !w-10 !h-10 border-1 rounded-full text-white bg-gray-600
             hover:bg-gray-700"
            >
              <ArrowUp />
            </Button>
          </div>
        </div>


        <div className="bg-background border-1 h-[375px] rounded-lg shadow-sm">
          <div className="p-6 px-6">
            <div className="flex justify-between">
              <CardTitle className="text-[20px]">{viewPosition} Views</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer">
                    <span className="flex items-center text-color text-[15px]">
                      {viewPosition}
                      <ChevronDown className="!w-5 !h-4" />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 p-2">
                  <DropdownMenuRadioGroup value={viewPosition} onValueChange={setViewPosition}>
                    <DropdownMenuRadioItem value="Weekly">Weekly</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Monthly">Monthly</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Yearly">Yearly</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <ViewChart selected={viewPosition} />
        </div>

      </div>
    </div>
  );
};

export default home;
