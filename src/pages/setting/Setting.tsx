import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Setting = () => {
  return (
    <div className="flex flex-col p-8 mt-8 px-12 bg-background rounded-lg border-1">
      <CardTitle className="text-xl">Account & Settings</CardTitle>
      <div className="p-4 flex gap-6">
        <p>Profile</p>
        <p>Password</p>

      </div>

      <div className="border-[0.1px]" />

      <div className="flex justify-between">
        <div className="p-8 flex">
          <div className="flex-col">
            <div className="bg-gray-300 w-[100px] h-[100px] rounded-full" />
            <Button className="mt-4 mx-2 !w-20 !h-7 text-[10px]">Change</Button>
          </div>

          <div className="p-2 px-16 ">
            <div className="flex gap-4">
              <div className="flex-col flex gap-1">
                <label className="text-gray-700">First name</label>
                <input
                  type="text"
                  value="Value"
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="flex-col flex gap-1">
                <label className="text-gray-700">Last name</label>
                <input
                  type="text"
                  value="Value"
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            <div className="mt-2 flex-col flex gap-1">
              <label className="text-gray-700">Phone</label>
              <input
                type="email"
                value="Email"
                className="w-full border rounded-md p-2"
              />
            </div>


            <div className="mt-2 flex-col flex gap-1">
              <label className="text-gray-700">Address</label>
              <Textarea
                placeholder="Type your address here."
                className="h-[100px]"
              />
            </div>
            <div className="mt-8">
              <button className="w-full text-black border border-black py-2 rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>


        <div className="border-[0.1px]" />


        <div className="mr-auto p-8 px-12">
          <div className="flex flex-col gap-4">
            <div className="flex gap-10 items-center">
              <span>Language</span>
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="apple">Thai</SelectItem>
                    <SelectItem value="banana">Chinese</SelectItem>
                    <SelectItem value="blueberry">India</SelectItem>
                    <SelectItem value="grapes">Law</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-10 items-center">
              <span>Currency</span>
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Thai Bath" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    <SelectItem value="apple">USD</SelectItem>
                    <SelectItem value="banana">GBP</SelectItem>
                    <SelectItem value="blueberry">CNY</SelectItem>
                    <SelectItem value="grapes">Yen</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <span>Notification</span>
            <span className="text-red-500 cursor-pointer">Delete Account</span>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Setting
