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
  ChevronLeft
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
 <div className='mt-[27px] mb-10'>
      <div className='flex justify-between'>
        <div className="mt-2">
          <h1 className="text-[22px]">Order Number {id}</h1>
          <p className="text-[16px] text-gray-600">order from {orderData?.username}</p>
        </div>
        <div className="mt-2">
          <ButtonAdd onClick={console.log()} title="Add Product +" />
        </div>
      </div>

      {/* Process Shipping */}
      <div className="md:flex gap-4 mt-4">
        <div 
          className="bg-white shadow-[1px_1px_1px_1px_rgba(0,0,0,0.1)] xl:w-[70%] md:w-[68%] md:h-[200px]
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
                      <div className="text-blue-gray-500 font-sans whitespace-nowrap md:text-[16px] text-[14px]">
                        {status}
                      </div>
                      <ChevronDown className="md:w-5 w-4 h-5  text-blue-gray-500 md:mt-[6px] pt-1"
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
              <div className='bg-gray-200 w-full h-[95px] rounded-lg'>

                <div className='p-2 flex justify-center md:gap-4 gap-2'>
                  {steps.map((label, index) => (
                    <div key={index} className='bg-[#feffff] w-[130px] h-[80px] rounded-lg'>
                      <div className='mt-2 px-2'>
                        {icons[index]}
                        <p className='md:text-[14px] text-[13px] mt-1'>{label}</p>
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


        <div className="bg-white shadow-md md:mt-0 mt-4 3xl:h-[280px] md:w-[30%] 
          h-[265px] rounded-lg"
        >
          <div className="p-4">
            <div className="flex justify-between">
              <div>
                <HeadText title="Payments" />
                <SubText title="Final price" />
              </div>
              <div className="flex mt-[-25px] gap-1">
                <Download className="3xl:mt-[32px] xl:mt-[26px] mt-[28px] w-4 h-5" />
                <button className="text-[14px] text-[#7990bb]">Download invoice</button>
              </div>
            </div>
          </div>

          <div className="mx-4">
            <div className="bg-[#f2f2f2] w-full 3xl:h-[170px] h-[160px] rounded-lg p-4">
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
              <div className="bg-gray-300 w-full h-[0.8px] 3xl:mt-[8px] mt-3 mb-2" />

              <div className="flex justify-between">
                <div className="3xl:text-[20px] text-[18px]">
                  total
                </div>
                <div className="3xl:text-[20px] text-[18px] font-bold">
                  14500
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Product Order */}
      <div className="md:flex 3xl:mt-[-20px] md:mt-[-10px] mt-4 gap-4">
        <div className="bg-white border 3xl:h-[600px] md:w-[70%]  
          h-[490px] w-full md:mt-[-40px] mt-1.5 rounded-lg relative">
          <div>
            <div className="flex justify-between mt-3 mx-7">
              <div>
                <p className="3xl:text-[18px] text-[#879da7] font-bold">Product</p>
              </div>
              <div>
                <img src={Spinner} alt="Loading..." className="w-12 h-9 mt-0" />
                {/* {status === 'Paid' ? (
                  <Status status={status} className="" />
                ) : (
                  <img src={Spinner} alt="Loading..." className="w-12 h-9 mt-0" />
                )} */}
              </div>
            </div>
          </div>

          <div className="relative sm:rounded-lg">
            <div className="w-full table-fixed  text-gray-700 text-sm">
              <div>
                {currentItems.map((product, index) => (
                  <div key={index} className="  ">

                    <div className="flex justify-between">
                      <div className="lg:m-2 m-2 mx-6 flex">
                        <img src={product.img} className="w-[70px] h-[45px] object-contain" alt="Product" />
                        <div className="mt-1 mx-5 ">
                          <h1 className="w-[140px]">{product.name}</h1>
                          <div className="flex gap-5 text-gray-500">
                            <h2>Size Xs</h2>
                            <h3>quantity 1</h3>
                          </div>
                        </div>
                      </div>
                      <div className="mx-6 mt-5 flex gap-4">
                        <p className="mt-0.5 text-[15px] font-bold">1,620 THB</p>
                        <Button
                          // onClick={() => handleDelete(items)}
                          className="bg-[#db4a4a] text-white w-6 h-6 rounded-sm hover:bg-red-400"
                          
                        >
                          <Trash className="3xl:mx-1 mx-[2.5px] 3xl:text-[16px] text-[12px]" />
                        </Button>
                      </div>
                    </div>
                    <div className="px-10">
                      <div className="bg-gray-100 w-full h-[1px]" />
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 right-4 flex justify-end gap-2 ">
            <div>
            <Button
              variant="arrow"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="!w-10 !h-5 text-[#667085]" />
            </Button>
            </div>
            <div className='bg-white w-[50px] h-[25px] rounded-full mx-1'>
              <span className='ml-3 text-[12px]'>
                {currentPage} / {totalPages}
              </span>
            </div>
            <div>
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

        <div className="bg-white shadow-md md:mt-7 mt-4 3xl:mt-[40px] 3xl:h-[515px] xl:w-[30%] md:w-[31%] w-full h-[418px]
          rounded-lg border-t-4 border-[#182361] "
        >
          {/* เนื้อหาฝั่งขวา */}
          <div className="3xl:p-6 p-4 mx-2">
            <HeadText title="Customer" />
            <SubText title="Infomation Detail" />
          </div>

          <div className="p-2 mx-4">
            <div className="border-t-[1px] border-gray-200 mt-[-10px]" />
          </div>

          <div className="3xl:mx-7 2xl:mx-5 md:mx-4">
            <div className="grid grid-cols-3">
              <div>
                <div className="bg-gray-600 3xl:w-[65px] 3xl:h-[65px] 2xl:w-[50px] 2xl:h-[50px]
                    w-[45px] h-[45px] rounded-full"
                />
              </div>
              <div className="flex flex-col mt-1 justify-center 3xl:mx-[-40px] 2xl:mx-[-35px] md:mx-[-35px]">
                <p className="3xl:text-[25px] xl:text-[18px]">Codeine</p>
                <p className="3xl:text-[15px] xl:text-[13px] lg:text-[11px] text-gray-500">Petunda911@gmail.com</p>
              </div>
              <div className="flex justify-end px-4 mt-4">
                <MessageSquare className="3xl:text-[30px] text-[20px]" />
              </div>
            </div>
          </div>
        <div>
      </div>

          <div className="mx-8">
            <div className="mt-8">
              <div className="flex justify-between">
                <div>
                  <p className="3xl:text-[22px] text-[18px] text-blue-gray-600">Contact</p>
                </div>
                <div>
                  <p className="text-[12px]">Coppy</p>
                </div>
              </div>
            </div>

            <div className="mx-2">
              <div className="flex gap-2">
                <p className="3xl:text-[20px] xl:text-[18px] text-[15px]">Petunda</p>
                <p className="3xl:text-[20px] xl:text-[18px] text-[15px]">Paksa</p>
              </div>
              <p className="text-gray-700 3xl:text-[20px] text-[16px]">0988323099</p>
            </div>

            <div className="p-2 mt-4 w-full">
              <div className="border-t-[1px] border-gray-200 mt-[-10px]" />
            </div>

            <div className="">
              <div className="flex justify-between">
                <div className="flex-col">
                  <p className="3xl:text-[22px] xl:text-[18px] text-[18px] text-blue-gray-600">Shipping Address</p>
                  <div className="mx-2 3xl:text-[20px] text-[16px] mt-2">
                    <p>20/12 Pruksa village 5 Bangyai nonthaburi 11140</p>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] grid">Coppy</p>
                </div>
              </div>
            </div>

          </div>



        </div>
      </div>



    </div>
  )
}

export default orderConfirm
