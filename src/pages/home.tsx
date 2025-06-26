import React, {useState} from "react";
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
  ChevronDown
} from "lucide-react";
import ViewChart from "@/components/widgets/ViewChart";
import ViewPieChart from "@/components/widgets/ViewPieChart";



const home = () => {
  const [position, setPosition] = React.useState("Weekly")
  return (
    <div className="mt-2 mb-12">
      <div className="flex justify-between lg:gap-4 md:gap-12 gap-6">
        <div className="mt-2 text-color">
          <h1 className="xl:text-[30px] md:text-[35px] md:flex gap-2 text-[30px]">
            Welcome, Codeiner
          </h1>
          <p className="text-[14px] whitespace-nowrap text-gray-500">
            Overview dashboard
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">

        <div className="bg-background p-4 px-6 h-[110px] rounded-lg border-1 shadow-sm">
          <div className="flex justify-between">
            <div>
              <CardTitle>Total Revenue</CardTitle>
              <p className="mt-1 text-[20px] font-semibold">$45,231.89</p>
              <CardDescription className="mt-1">
                <span className="text-green-600 mr-1">
                  +20.1%
                </span>
                from last month
              </CardDescription>
            </div>
            <Wallet className="mt-1 w-5 h-5 text-violet-700" />
          </div>
        </div>

        <div className="bg-background p-4 px-6 h-[110px] rounded-lg border-1 shadow-sm">
          <div className="flex justify-between">
            <div>
              <CardTitle>Subscriptions</CardTitle>
              <p className="mt-1 text-[20px] font-semibold">+2,350</p>
              <CardDescription className="mt-1">
                <span className="text-green-600 mr-1">
                  +180.1%
                </span>
                from last month
              </CardDescription>
            </div>
            <User className="mt-1 w-5 h-5 text-violet-700" />
          </div>
        </div>

        <div className="bg-background p-4 px-6 h-[110px] rounded-lg border-1 shadow-sm">
          <div className="flex justify-between">
            <div>
              <CardTitle>Sales</CardTitle>
              <p className="mt-1 text-[20px] font-semibold">+12,234</p>
              <CardDescription className="mt-1">
                <span className="text-green-600 mr-1">
                  +19%
                </span>
                from last month
              </CardDescription>
            </div>
            <CreditCard className="mt-1 w-5 h-5 text-violet-700" />
          </div>
        </div>

        <div className="bg-background p-4 px-6 h-[110px] rounded-lg border-1 shadow-sm">
          <div className="flex justify-between">
            <div>
              <CardTitle>Active now</CardTitle>
              <p className="mt-1 text-[20px] font-semibold">+573</p>
              <CardDescription className="mt-1">
                <span className="text-green-600 mr-1">
                  +201
                </span>
                since last hour
              </CardDescription>
            </div>
            <ChartSpline className="mt-1 w-5 h-5 text-violet-700" />
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
                  <Button className="bg-background shadow-xs">
                    <span className="flex items-center text-color text-[15px]"> 
                      {position}
                      <ChevronDown className="!w-5 !h-4" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 p-2">
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="Daily">Daily</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Weekly">Weekly</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Monthly">Monthly</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Year">Yearly</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <MoneyChart />
          </div>
        </div>

        {/* left side */}
        <div className="bg-background md:h-[380px] h-[500px] rounded-2xl border-1 shadow-sm overflow-auto">
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
                      <button className="text-slate-400 hover:bg-red-400 p-1 rounded-sm">
                        <SquarePen className="w-6 h-6" />
                      </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bottom left */}
        <div className="mt-2 grid grid-cols-[40%_40%_83%] gap-4">
          <div className="bg-background border-1 h-[380px] rounded-lg shadow-sm">
            <div className="p-6 px-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-[18px] font-semibold">Top salse</p>
                </div>
                ...

              </div>
          

            </div>
          </div>

          <div className="bg-background border-1 h-[380px] rounded-lg shadow-sm">
            <ViewPieChart />
          </div>

          <div className="bg-background border-1 h-[380px] rounded-lg shadow-sm">
            <div className="p-6 px-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-[18px] font-semibold">View Weekend</p>
                </div>
                Week

              </div>
              <ViewChart />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default home;
