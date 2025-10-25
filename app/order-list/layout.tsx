// Font
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});

// Components
import OrderList from "@/components/order-list/OrderList";
import OrderTabs from "@/components/order-list/OrderTabs";
import Navigator from "../../components/order-list/Navigator";

export default async function MyOrderPage() {
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
