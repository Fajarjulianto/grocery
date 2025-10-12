// Font
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});

// Components
import OrderList from "@/components/order-list/OrderList";
import OrderTabs from "@/components/order-list/OrderTabs";
import Navigator from "./Navigator";
// Types
import type { Order } from "@/types/orders";

async function getOrders(): Promise<Order[]> {
  const orders: Order[] = [
    {
      id: "3s2x",
      order_id: "#27890765356",
      imageUrl: "/nescafe.png",
      itemCount: 10,
      address: "4517 Washington Ave...",
      date: "10 Apr 2023 at 07:45 PM",
      price: 22,
      status: "Delivered",
    },
    {
      id: "789hn8",
      order_id: "#89012399098",
      imageUrl: "/fortune-oil.png",
      itemCount: 15,
      address: "4517 Washington Ave...",
      date: "10 Apr 2023 at 07:45 PM",
      price: 50,
      status: "Delivered",
    },
    {
      id: "9081nxm2",
      order_id: "#33098890165",
      imageUrl: "/basmati-rice.png",
      itemCount: 5,
      address: "4517 Washington Ave...",
      date: "10 Apr 2023 at 07:45 PM",
      price: 45,
      status: "Delivered",
    },
  ];
  return orders;
}

export default async function MyOrderPage() {
  const orders = await getOrders();

  return (
    <div
      className={`w-screen flex justify-center bg-secondary ${inter.className}`}
    >
      <div className="bg-gray-50 min-h-screen w-screen md:w-full md:max-w-2xl font-sans">
        <Navigator />
        <main className="p-4">
          <OrderTabs />
          <OrderList />
        </main>
      </div>
    </div>
  );
}
