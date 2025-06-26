import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const mainLayout = () => {
  return (
    <div>
      <SidebarProvider>
        <Sidebar /> 
        {/* bg-[#f4f6f8 */}
        <main className="w-full bg-background-main">
          <Navbar />
          <div className="xl:px-10 md:px-6 px-4">
            <Outlet /> 
          </div>
        </main>
      </SidebarProvider>
    </div>
  )
}

export default mainLayout
