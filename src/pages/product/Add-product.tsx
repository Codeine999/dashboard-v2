// src/pages/AddProduct.tsx

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
import { PlusCircle, UploadCloud } from "lucide-react";
import { OrderItemIn } from "@/interfaces/productInter";

export default function AddProductPage() {
  const [orderItems, setOrderItems] = useState<OrderItemIn[]>([
    { size: "", quantity: 0, sku: "" },
  ]);
  const [images, setImages] = useState<File[]>([]);

  const handleOrderItemChange = (
    index: number,
    field: keyof OrderItemIn,
    value: string | number
  ) => {
    const updated = [...orderItems];
    updated[index][field] = value as never;
    setOrderItems(updated);
  };

  const handleAddOrderItem = () => {
    setOrderItems([...orderItems, { size: "", quantity: 0, sku: "" }]);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      setImages([...images, ...Array.from(files)]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto md:mt-2 mt-3 mb-6">
      <div className="px-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/product" className="text-xs">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs">Add Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Card className="md:mt-4 mt-10 w-full">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription className="text-gray-500">Fill in product information below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2.5">
              <Label>Name</Label>
              <Input className="!bg-gray-50" placeholder="Product name" />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label>Category</Label>
              <Input className="!bg-gray-50" placeholder="Category" />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label>Price</Label>
              <Input className="!bg-gray-50" type="number" placeholder="Price" />
            </div>
            <div className="flex flex-col gap-2.5 md:col-span-2">
              <Label>Description</Label>
              <Textarea className="!bg-gray-50" placeholder="Product description..." />
            </div>
          </div>

          {/* Order Items */}
          <div className="flex flex-col gap-2.5">
            <Label>Order Items</Label>
            <div className="space-y-2">
              {orderItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 border p-3 rounded-md bg-gray-100"
                >
                  <Input
                    placeholder="Size"
                    value={item.size}
                    onChange={(e) =>
                      handleOrderItemChange(index, "size", e.target.value)
                    }
                    className="!bg-gray-50"
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleOrderItemChange(index, "quantity", Number(e.target.value))
                    }
                    className="!bg-gray-50"
                  />
                  <Input
                    placeholder="SKU"
                    value={item.sku}
                    onChange={(e) =>
                      handleOrderItemChange(index, "sku", e.target.value)
                    }
                    className="!bg-gray-50"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOrderItem}
                className="mt-4  flex text-green-600 items-center shadow-none cursor-pointer text-sm"
              >
                <PlusCircle className="h-3 w-3 mr-2 cursor-pointer" />
                More Item
              </button>
            </div>
          </div>

          {/* Upload Images */}
          <div className="flex flex-col gap-2">
            <Label>Upload Images</Label>

            <Input
              type="file"
              multiple
              onChange={(e) => handleImageUpload(e.target.files)}
              className="w-28 cursor-pointer"
            />


            {images.length > 0 && (
              <ul className="list-disc ml-6 mt-2 text-sm text-muted-foreground">
                {images.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button className="w-full">
              <UploadCloud className="h-4 w-4 mr-2" />
              Save Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
