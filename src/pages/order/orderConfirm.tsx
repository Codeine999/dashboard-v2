import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { orderdetail, ordernotic } from "@/data/order.data"
import {
  AArrowDown,
  Trash,
  ChevronDown,
  Layers2,
  CreditCard,
  PackageSearch,
  Truck,
  Download,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Trash2
} from 'lucide-react';
import { Header, HeadText, SubText, ButtonAdd } from "@/components/Components";
import Spinner from "@/assets/spin.svg";



const steps = ["Order ", "Payment", "Processing", "Shipping"];
const icons = [
  <Layers2 className="text-[28px] text-[#603de1]" />,
  <CreditCard className="text-[28px] text-[#603de1]" />,
  <PackageSearch className="text-[28px] text-[#603de1]" />,
  <Truck className="text-[28px] text-[#603de1]" />,
];


const orderConfirm = () => {

  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [status, setStatus] = useState('Pending');


  const totalPages = Math.ceil(orderdetail.length / itemsPerPage) || 1;


  useEffect(() => {
    const order = ordernotic.find(order => order.orderID === id);
    console.log("Received ID from URL:", order);
    setOrderData(order);
    setLoading(false);
  }, [id]);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        setItemsPerPage(5);
      } else {
        setItemsPerPage(5);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (progress[currentIndex] < 100) {
      const timer = setTimeout(() => {
        setProgress((prevProgress) => {
          const newProgress = [...prevProgress];
          newProgress[currentIndex] += 20;
          return newProgress;
        });
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (currentIndex < steps.length - 1) {
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
        }, 500);
      }
    }
  }, [progress, currentIndex]);


  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(orderdetail.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage, orderdetail]);


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

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);  // เปลี่ยนสถานะตามที่ผู้ใช้เลือก
  };

  return (
    <div className='max-w-6xl mx-auto mt-2 mb-6'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/order" className="text-xs">Order</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs">Confirm Order</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='mt-2 flex justify-start'>
        <div className="mt-2 px-2">
          <p className="text-md">Order Number {id}</p>
        </div>
      </div>

      {/* Process Shipping */}
      <div className="md:flex 2xl:gap-8 gap-4 mt-4">
        <div
          className="bg-background shadow-[1px_1px_1px_1px_rgba(0,0,0,0.1)] xl:w-[70%] md:w-[68%] md:h-[200px]
            w-full h-[180px] rounded-lg"
        >
          <div className='md:px-6 px-4 mt-4'>
            <div className="flex justify-between">
              <div className="md:mt-0 mt-2">
                <HeadText title="Process" />
                <SubText title="Check items already to shipping" />
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex cursor-pointer md:mt-2 mt-4">
                      <span className="text-color whitespace-nowrap text-sm">
                        {status}
                      </span>
                      <ChevronDown className="md:w-4.5 w-4 h-4 mt-0.5 text-color "
                        style={{ strokeWidth: 3 }} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => handleChangeStatus('Pending')}
                        className={status === 'Pending' ? 'font-bold text-blue-gray-500' : 'text-gray-700'}
                      >
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleChangeStatus('Paid')}
                        className={status === 'Paid' ? 'font-bold text-blue-gray-500' : 'text-gray-700'}
                      >
                        Paid
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleChangeStatus('Cancell Order')}
                        className="text-gray-700"
                      >
                        Cancell Order
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className='mt-2 md:px-6'>
              <div className='bg-background-main w-full h-[95px] rounded-lg'>

                <div className='p-2 flex justify-center md:gap-4 gap-2'>
                  {steps.map((label, index) => (
                    <div key={index} className='bg-background w-[130px] h-[80px] rounded-lg'>
                      <div className='mt-2 px-2'>
                        {icons[index]}
                        <p className='2xl:text-sm text-xs mt-1.5 text-color'>{label}</p>
                        <div
                          className="h-1 mt-2 bg-green-500 rounded-full transition-all duration-1000 ease-in-out"
                          style={{ width: `${progress[index]}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


      <div className="bg-background shadow-md md:mt-0 mt-4 3xl:h-[280px] md:w-[30%] 
          h-[265px] rounded-lg border-1"
        >
          <div className="p-4">
            <div className="flex justify-between">
              <div>
                <HeadText title="Payments" />
                <SubText title="Final price" />
              </div>
              <div className="flex ml-auto items-center gap-2">
                <Download className="w-4 h-5 text-[#7794ca]" />
                <button className="text-xs text-[#7990bb] cursor-pointer">Download invoice</button>
              </div>
            </div>
          </div>

          <div className="mx-4">
            <div className="bg-background-main w-full 3xl:h-[170px] h-[160px] rounded-lg p-4">
              <div className="flex justify-between mt-[-4px]">
                <div className="3xl:text-[18px] text-[15px]">
                  Subtotal
                </div>
                <div className="3xl:text-[18px] text-[15px]">
                  13900
                </div>
              </div>

              <div className="flex justify-between">
                <div className="3xl:text-[18px] text-[15px]">
                  Discount
                </div>
                <div className="3xl:text-[18px] text-[15px]">
                  350
                </div>
              </div>
              <div className="flex justify-between">
                <div className="3xl:text-[18px] text-[15px]">
                  shipping
                </div>
                <div className="3xl:text-[18px] text-[15px]">
                  100
                </div>
              </div>

              <div className="flex justify-between">
                <div className="3xl:text-[18px] text-[15px]">
                  Pay by
                </div>
                <div className="3xl:text-[18px] text-[15px] font-bold text-[#683acd]">
                  sprits
                </div>
              </div>
              <div className="border-1 w-full 3xl:mt-[8px] mt-3 mb-2" />

              <div className="flex justify-between">
                <div className="3xl:text-[20px] text-[18px]">
                  total
                </div>
                <div className="3xl:text-[20px] text-[18px] font-semibold">
                  14500
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Product Order */}
      <div className="md:flex 3xl:mt-[-20px] md:mt-[-10px] mt-4 2xl:gap-8 gap-4">
        <div
          className="bg-background border xl:h-[520px] md:w-[70%]
           md:h-[510px] h-[708px] w-full md:mt-[-40px] mt-1.5 rounded-lg shadow-sm relative"
        >

          <div className="flex justify-between mt-2.5 mb-1 border-b-1">
            <p className="text-[#879da7] font-semibold mx-4 mb-2">Products</p>
          </div>

          <div className="relative rounded-lg md:h-[400px] h-[605px]">
            <div className="w-full table-fixed text-sm">
              <div>
                {currentItems.map((product, index) => (
                  <div key={index} className="border-b-1">
                    <div className="flex justify-between">
                      <div className="lg:m-2 m-2 mx-6 flex">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="md:mt-2 mt-6 w-[70px] h-[45px] object-contain"
                        />
                        <div className="mt-1 mx-5 ">
                          <p className="w-[140px] text-normal">{product.name}</p>
                          <div className="flex md:flex-row flex-col md:gap-4 text-gray-500">
                            <p className="whitespace-nowrap">Sku: sku-01vdvd</p>
                            <p>Size Xs</p>
                            <p>quantity 1</p>
                          </div>
                        </div>
                      </div>
                      <div className="mx-6 flex gap-4">
                        <div className="flex items-center md:gap-8 gap-4">
                          <p className="text-[15px] text-normal font-medium">
                            ฿ 16,200
                          </p>
                          <button
                            // onClick={() => handleDelete(items)}
                            className="cursor-pointer text-red-400"
                          >
                            <Trash2 className="w-5.5 h-5.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center px-4 md:mt-4 mt-2">
            <div className="flex">
              <Button
                variant="arrow"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="!w-10 !h-5 text-[#667085]" />
              </Button>
              <div className="mt-1.5 bg-background border-[0.5px] w-[60px] h-[26px] rounded-full mx-2 shadow-xs">
                <span className="ml-4.5 text-[12px]">
                  {currentPage} / {totalPages}
                </span>
              </div>
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

        <div
          className="bg-background shadow-sm 2xl:mt-10 mt-6  md:w-[30.5%] w-full h-[420px] 
            rounded-lg border-t-4 border-[#8a9bfa]"
        >

          {/* เนื้อหาฝั่งขวา */}
          <div className="p-4">
            <HeadText title="Customer" />
            <SubText title="Infomation Detail" />
          </div>

          <div className="p-2 mx-2">
            <div className="border-t-1 mt-[-10px]" />
          </div>

          <div className="xl:mx-3 mx-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="bg-gray-600 w-[42px] 2xl:w-[50px] 2xl:h-[50px] h-[42px] rounded-full" />
                <div className="flex flex-col mt-1 justify-center">
                  <p className="text-md">Test User</p>
                  <p className="text-sm text-secondary">Petunda911@gmail.com</p>
                </div>
              </div>
              <div className="flex justify-end px-4">
                <MessageSquare className="text-slate-550" />
              </div>
            </div>
          </div>
          <div className="p-2 mx-2 mt-2">
            <div className="border-t-1" />
          </div>
          <div>
          </div>

          <div className="mt-2 md:mx-4 mx-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg text-color">Contact</p>
              </div>
              <div>
                <p className="text-[12px]">Copy</p>
              </div>
            </div>

            <div className="mx-2">
              <div className="flex gap-2">
                <p className="text-md text-secondary">Petunda</p>
                <p className="text-md text-secondary">Paksa</p>
              </div>
              <p className="text-secondary text-md">0988323099</p>
            </div>

            <div className="p-2 mt-4 w-full">
              <div className="border-t-1 mt-[-10px]" />
            </div>

            <div className="mx-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg text-color text-blue-gray-600">Shipping Adress</p>
                </div>
                <div>
                  <p className="text-[12px]">Copy</p>
                </div>
              </div>
              <div className="mt-2 w-[200px]">
                <p className="text-md text-secondary">22/66 mock-up address my, bangkok 13432</p>
              </div>
            </div>

          </div>



        </div>
      </div>



    </div>
  )
}

export default orderConfirm
