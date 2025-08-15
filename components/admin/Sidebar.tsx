"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaStore,
} from "react-icons/fa";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { href: "/admin/products", label: "Produk", icon: FaBoxOpen },
  { href: "/admin/orders", label: "Pesanan", icon: FaShoppingCart },
  { href: "/admin/customers", label: "Pelanggan", icon: FaUsers },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <Link
          href="/admin/dashboard"
          className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center"
        >
          <FaStore className="mr-2" />
          Toko Kelontong
        </Link>
        <ul className="mt-6">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li className="relative px-6 py-3" key={item.label}>
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                )}
                <Link
                  href={item.href}
                  className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    isActive ? "text-gray-800 dark:text-gray-100" : ""
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="ml-4">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
