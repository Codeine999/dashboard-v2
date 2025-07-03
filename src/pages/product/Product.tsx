import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import {
  Check,
  CirclePlus,
  CircleMinus,
  SquarePen,
  ShoppingCart,
  ListFilter,
  Download,
  ChevronRight,
  ChevronLeft,
  Search,
  Trash2
} from "lucide-react";

import { Wrapper, Header, ButtonAdd } from "@/components/Components";
import { Stock, ProductData } from "@/data/product.data";
import { useTheme } from "@/components/context/themeProvider";

const icons = [
  <ShoppingCart className="text-[30px] mt-1.5 text-[#603de1]" />,
  <ShoppingCart className="text-[30px] mt-1.5 text-[#603de1]" />,
  <ShoppingCart className="text-[30px] mt-1.5 text-[#603de1]" />,
  <ShoppingCart className="text-[30px] mt-1.5 text-[#603de1]" />,
];


const Product = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const totalProduct = Stock[0].TotalProduct;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [productStatus, setProductStatus] = useState({});
  const itemsPerPage = 7;

  const [productStock, setProductStock] = useState(
    ProductData.reduce((acc, product) => {
      acc[product.id] = product.stock;
      return acc;
    }, {})
  );

  const totalPages = Math.ceil(ProductData.length / itemsPerPage) || 1;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    navigate("/product/add-product");
  };

  const handleEdit = (item: { id: string }) => {
    navigate(`/product/edit-product/${item.id}`);
  };

  const maxLength = () => {
    if (windowWidth < 490) return 20;
    if (windowWidth >= 500 && windowWidth <= 1200) return 20;
    return 90;
  };

    const cutText = (text, maxLength) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + "..";

  return (
    <div className="mt-10 2xl:px-28 max-w-8xl mx-auto mb-12">
      <div className="flex justify-between">
        <div />
        <div className="w-[140px]">
          <ButtonAdd onClick={handleAddProduct} title="Add Product +" />
        </div>
      </div>

      {/* STOCK OVERVIEW */}
      <div className="mt-5 grid md:grid-cols-4 grid-cols-1 md:gap-4 gap-2">
        {Stock.map((item, index) => (
          <div
            key={index}
            className="bg-background w-full h-[125px] rounded-lg border-1"
          >
            <div className="px-4 mt-3">
              <div className={`pt-0.5 w-[55px] h-[45px] rounded-md flex justify-center
                ${theme == "dark" ? "!border-1 border-gray-600" : "border-1"}`}>
                {icons[index]}
              </div>
              <div className="mt-2 px-4">
                <h1 className="text-[20px]">
                  {"avilableProduct" in item && item.count
                    ? `${item.avilableProduct} / ${totalProduct}`
                    : Object.values(item)[0]}
                </h1>
                <p className="text-[13px] ml-[-10px] text-color">
                  {Object.keys(item)[0].replace(/([A-Z])/g, " $1").trim()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
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

      {/* PRODUCT TABLE */}
      <div className="mt-3 bg-background rounded-2xl border-1 overflow-hidden">
        <div className="lg:h-[600px] h-[550px] overflow-auto">
          <Table className="min-w-full table-fixed">
            <TableHeader className="h-[85px] border-b border-gray-300 bg-background ">
              <TableRow>
                <TableHead className="w-[100px] px-5 text-[#879da7] font-semibold">Picture</TableHead>
                <TableHead className="w-[200px] text-[#879da7] font-semibold">Name</TableHead>
                <TableHead className="w-[150px] text-[#879da7] font-semibold">Status</TableHead>
                <TableHead className="w-[100px] text-[#879da7] font-semibold">Price</TableHead>
                <TableHead className="w-[150px] text-[#879da7] text-center font-semibold">Stock</TableHead>
                <TableHead className="w-[120px] text-[#879da7] text-center font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems.map((items, index) => (
                <TableRow key={items.id || `row-${index}`}>
                  <TableCell className="p-3 px-5">
                    <img
                      src={items.img}
                      alt="img"
                      className="w-[55px] h-[55px] object-contain rounded-md"
                    />
                  </TableCell>
                  <TableCell className="text-normal font-medium">{cutText(items.name, maxLength())}</TableCell>
                  <TableCell>
                    <Select
                      value={productStatus[items.id] || items.status}
                      onValueChange={(val) => handleStatusChange(items.id, val)}
                    >
                      <SelectTrigger
                        className={`!h-[25px] px-3 border-0 rounded-xl ${(productStatus[items.id] || items.status) === "Unavailable"
                          ? "!bg-[#627c87]"
                          : "!bg-green-600"
                          }`}
                      >
                        <div className="text-white text-[12px]">
                          {productStatus[items.id] || items.status}
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-[15px] text-normal font-medium">
                    ฿{items.price}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-0.5">
                      <button onClick={() => handleDecrease(items.id)}>
                        <CircleMinus className="w-5 cursor-pointer text-slate-500" />
                      </button>
                      <div className="border w-[60px] h-[25px] flex items-center justify-center rounded-sm">
                        <input
                          type="number"
                          value={productStock[items.id] || 0}
                          onChange={(e) =>
                            handleStockChange(items.id, e.target.value)
                          }
                          className="w-full h-full text-center bg-transparent border-0 focus:outline-1 focus:outline-[#7b7b7b] focus:rounded-md"
                        />
                      </div>
                      <button onClick={() => handleIncrease(items.id)}>
                        <CirclePlus className="w-5 cursor-pointer text-slate-500" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Button variant="ghost" className="text-yellow-500 cursor-pointer">
                        <SquarePen className="!w-5.5 !h-5.5" />
                      </Button>
                      <Button variant="ghost" className="text-red-400">
                        <Trash2 className="!w-5.5 !h-5.5 cursor-pointer" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end items-center mb-2 px-4">
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
      </div>

    </div>
  );
};

export default Product;
