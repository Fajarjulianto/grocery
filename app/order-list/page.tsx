import { IoIosArrowBack } from "react-icons/io";
import OrderList from "@/components/order-list/OrderList";
import type { Order } from "@/components/order-list/OrderList";

// Dummy data
export const orders: Order[] = [
  {
    id: 1,
    orderNumber: "#27890765356",
    image: "/images/product1.png",
    address: "4517 Washington Ave...",
    itemCount: 10,
    status: "Upcoming",
    date: "10 Apr 2023 at 07:45 PM",
    price: 22,
  },
  {
    id: 2,
    orderNumber: "#89012399098",
    image: "/images/product2.png",
    address: "4517 Washington Ave...",
    itemCount: 15,
    status: "Delivered",
    date: "10 Apr 2023 at 07:45 PM",
    price: 50,
  },
  {
    id: 3,
    orderNumber: "#33098890165",
    image: "/images/product3.png",
    address: "4517 Washington Ave...",
    itemCount: 5,
    status: "Delivered",
    date: "10 Apr 2023 at 07:45 PM",
    price: 45,
  },
  {
    id: 4,
    orderNumber: "#45678901234",
    image: "/images/product2.png", // Ganti dengan path gambar Anda
    address: "1234 Sunset Blvd...",
    itemCount: 2,
    status: "Upcoming",
    date: "12 Aug 2025 at 10:00 AM",
    price: 89,
  },
];

export default function MyOrderPage() {
  // const orders = await fetch('https://api.example.com/orders').then(res => res.json());

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
          {/* OrderList adalah Client Component yang menerima data sebagai props */}
          <OrderList initialOrders={orders} />
        </main>
      </div>
    </div>
  );
}
