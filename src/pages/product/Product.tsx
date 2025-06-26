import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import {
  Check,
  CirclePlus,
  CircleMinus,
  SquarePen,
  Trash,
  ShoppingCart,
  ListFilter,
  Download,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

import { Wrapper, Header, ButtonAdd } from "@/components/Components";
import { Stock, ProductData } from "@/data/product.data";
import { clsx } from 'clsx';

const icons = [
  <ShoppingCart className="text-[30px] mt-1.5 text-[#603de1]" />,
  <ShoppingCart className="text-[30px] mt-1.5 text-[#603de1]" />,
  <ShoppingCart className="text-[30px] mt-1.5 text-[#603de1]" />,
  <ShoppingCart className="text-[30px] mt-1.5 text-[#603de1]" />,
];

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const Product = () => {
  const navigate = useNavigate();
  const totalProduct = Stock[0].TotalProduct;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [productStatus, setProductStatus] = useState({});
  const itemsPerPage = 6;

  const [productStock, setProductStock] = useState(
    ProductData.reduce((acc, product) => {
      acc[product.id] = product.stock;
      return acc;
    }, {})
  );

  const totalPages = Math.ceil(ProductData.length / itemsPerPage) || 1;

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(ProductData.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, ProductData]);

  const handleStatusChange = (id, newValue) => {
    setProductStatus((prevStatus) => ({
      ...prevStatus,
      [id]: newValue.charAt(0).toUpperCase() + newValue.slice(1),
    }));
  };

  const handleStockChange = (id, newValue) => {
    const parsedValue = Number(newValue);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setProductStock((prevStock) => ({
        ...prevStock,
        [id]: parsedValue,
      }));
    }
  };

  const handleIncrease = (id) => {
    setProductStock((prevStock) => ({
      ...prevStock,
      [id]: (Number(prevStock[id]) || 0) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setProductStock((prevStock) => ({
      ...prevStock,
      [id]: Math.max((Number(prevStock[id]) || 0) - 1, 0),
    }));
  };

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

  const handleAddProduct = () => {
    navigate("/dashboard/add-product");
  };

  const handleEdit = (item) => {
    navigate(`/dashboard/edit-product/${item.id}`);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h1></h1>
        <div className="w-[140px]">
          <ButtonAdd onClick={handleAddProduct} title="Add Product +" />
        </div>
      </div>

      <div className="mt-5">
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-4 gap-2">
          {Stock.map((item, index) => (
            <div
              key={index}
              className="bg-background w-full h-[125px] rounded-lg border-1"
            >
              <div className="px-4 mt-3">
                <div
                  className="pt-0.5 w-[55px] h-[45px] border-[1px]
                             rounded-md flex justify-center"
                >
                  {icons[index]}
                </div>
                <div className="mt-2 px-4">
                  <h1 className="text-[20px]">
                    {"avilableProduct" in item && item.count
                      ? `${item.avilableProduct} / ${totalProduct}`
                      : Object.values(item)[0]}
                  </h1>
                  <p className="text-[13px] ml-[-10px] text-color">
                    {Object.keys(item)[0]
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* shadow-[0_0_2px_rgba(0,0,0,0.3)] */}
      </div>

      <div className="relative md:mt-14 mt-10 z-10 flex justify-between">

        <div className="absolute top-4 md:right-6 right-10">

        </div>
      </div>
      <Table className="bg-background rounded-3xl overflow-hidden border-1">
        <TableHeader className="w-full h-[85px] border-[0.5px]">
          <TableRow>
            <TableHead className="w-[120px] px-6 text-[#879da7] align-bottom pb-2">
              Picture
            </TableHead>
            <TableHead className="w-[150px] px-4 text-[#879da7] align-bottom pb-2">
              Name
            </TableHead>
            <TableHead className="w-[150px] px-12 text-[#879da7] align-bottom pb-2">
              Status
            </TableHead>
            <TableHead className="w-[120px] px-[6px] text-[#879da7] align-bottom pb-2">
              Price
            </TableHead>
            <TableHead className="w-[120px] text-center text-[#879da7] align-bottom pb-2">
              Stock
            </TableHead>
            <TableHead className="w-[100px] px-[75px] text-center text-[#879da7] align-bottom pb-2">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-background border-1">
          {currentItems.map((items, index) => (
            <TableRow
              key={items.id || `row-${index}`}
              className="rounded-3xl "
            >
              <TableCell className="font-medium  p-3 px-5">
                <img
                  src={items.img}
                  alt="img"
                  className="w-[68px] h-[68px] object-contain rounded-md"
                />
              </TableCell>
              <TableCell className="">{items.name}</TableCell>

              <TableCell>
                <Select
                  value={productStatus[items.id] || items.status}
                  onValueChange={(newValue) =>
                    handleStatusChange(items.id, newValue)
                  }
                >
                  <SelectTrigger
                    className={`!h-[25px] px-5.5 mx-6 focus-visible:ring-0 border-0 rounded-xl
                                ${productStatus[items.id] === "Unavailable"
                        ? "!bg-[#627c87]"
                        : "!bg-green-500"
                      }`}
                  >
                    <div
                      className={`text-white mx-[-10px] text-[12px] 
                                ${productStatus[items.id] === "Unavailable"
                          ? "text-[12px] mx-[-15px]"
                          : ""
                        } }`}
                    >
                      {productStatus[items.id] || items.status}
                    </div>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="available" className="cursor-pointer">
                        Available
                      </SelectItem>
                      <SelectItem
                        value="unavailable"
                        className="cursor-pointer"
                      >
                        Unavailable
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell className="text-[18px] font-bold">
                {items.price}
              </TableCell>

              <TableCell>
                <div className="flex justify-center items-center gap-0.5 ">
                  <button
                    onClick={() => handleDecrease(items.id)}
                    className="cursor-pointer"
                  >
                    <CircleMinus className="w-5" />
                  </button>
                  <div className="bg-background border-[0.5px] w-[60px] h-[25px] rounded-sm flex items-center justify-center">
                    <input
                      type="number"
                      value={productStock[items.id] || 0}
                      onChange={(e) =>
                        handleStockChange(items.id, e.target.value)
                      }
                      className="w-full h-full text-center bg-transparent border-0 focus:outline-1
                        focus:outline-[#7b7b7b] focus:rounded-md ml-3
                      "
                    />
                  </div>
                  <button
                    onClick={() => handleIncrease(items.id)}
                    className="cursor-pointer"
                  >
                    <CirclePlus className="w-5" />
                  </button>
                </div>
              </TableCell>

              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(items)}
                    className="bg-[#e9b959] text-white px-3 h-7 rounded-sm hover:bg-yellow-400 cursor-pointer"
                  >
                    <SquarePen className="w-4" />
                  </button>
                  <button
                    // onClick={() => handleDelete(items)}
                    className="bg-[#db4a4a] text-white px-3 h-7 rounded-sm hover:bg-red-400 cursor-pointer"
                  >
                    <Trash className="w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="bg-background border-1 bw-full h-[115px] -mt-15 mb-10 rounded-md shadow-sm">
        <div className="flex justify-end items-center">
          <div className="flex m-6 mt-17.5">
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
    </div>
  );
};

export default Product;
