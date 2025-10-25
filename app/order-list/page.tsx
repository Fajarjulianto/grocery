import { IoIosArrowBack } from "react-icons/io";
import OrderList from "@/components/order-list/OrderList";

export default function MyOrderPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto bg-white border border-gray-200">
        {/* Header */}
        <header className="flex items-center justify-center p-4 relative border-b">
          <button className="absolute left-4">
            <IoIosArrowBack size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold">My Order</h1>
        </header>

        <main className="p-4">
          <OrderList />
        </main>
      </div>
    </div>
  );
}
