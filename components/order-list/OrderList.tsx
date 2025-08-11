"use client";

import { useState } from "react";
import Image from "next/image";
// 1. Impor ikon baru untuk rating dan reorder
import { BsChatDots } from "react-icons/bs";
import { LiaPhoneSolid } from "react-icons/lia";
import { IoStarOutline } from "react-icons/io5";
import { IoRefresh } from "react-icons/io5";

// 2. Ubah status dari 'Received' menjadi 'Delivered'
export type Order = {
  id: number;
  orderNumber: string;
  image: string;
  address: string;
  itemCount: number;
  status: "Upcoming" | "Delivered"; // Diperbarui
  date: string;
  price: number;
};

type OrderCardProps = {
  order: Order;
};

function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      {/* Bagian Atas Kartu (Tidak Berubah) */}
      <div className="flex gap-4">
        <Image
          src={order.image}
          alt="Product Image"
          width={60}
          height={60}
          className="rounded-md object-cover"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-gray-800">{order.orderNumber}</p>
              <p className="text-sm text-gray-500">{order.address}</p>
              <p className="text-xs text-gray-400 mt-1">
                {order.itemCount} Items
              </p>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                order.status === "Delivered"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">{order.date}</p>
        <p className="text-xl font-bold text-gray-800">${order.price}</p>
      </div>

      {/* 3. PERUBAHAN UTAMA: Tampilkan bagian bawah kartu secara kondisional */}
      <div className="mt-4">
        {order.status === "Delivered" ? (
          // Tampilan Baru untuk status 'Delivered'
          <div className="flex justify-between items-center">
            {/* Rating Bintang */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
                >
                  <span className="text-sm">{rating}</span>
                  <IoStarOutline />
                </button>
              ))}
            </div>
            {/* Tombol Reorder */}
            <button className="flex items-center justify-center gap-2 py-2.5 px-6 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600 transition-colors">
              <IoRefresh size={20} />
              Reorder
            </button>
          </div>
        ) : (
          // Tampilan Lama untuk status 'Upcoming'
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-green-500 rounded-lg text-green-500 font-semibold hover:bg-green-50 transition-colors">
              <BsChatDots size={18} />
              Message
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600 transition-colors">
              <LiaPhoneSolid size={20} />
              Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

type OrderListProps = {
  initialOrders: readonly Order[]; // Gunakan readonly untuk data dari 'as const'
};

export default function OrderList({ initialOrders }: OrderListProps) {
  // Atur tab aktif default ke 'Previous' agar sesuai gambar
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Delivered">(
    "Delivered"
  );

  const filteredOrders = initialOrders.filter(
    (order) => order.status === activeTab
  );

  return (
    <div>
      {/* 4. Perbarui gaya tombol toggle */}
      <div className="flex bg-gray-200 p-1 rounded-full mb-4">
        <button
          onClick={() => setActiveTab("Delivered")}
          className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeTab === "Delivered"
              ? "bg-green-500 text-white"
              : "text-gray-500"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setActiveTab("Upcoming")}
          className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeTab === "Upcoming"
              ? "bg-green-500 text-white"
              : "text-gray-500"
          }`}
        >
          Upcoming
        </button>
      </div>

      <div>
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
