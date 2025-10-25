import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { TbSmartHome } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { FiMail } from "react-icons/fi";

const navItems = [
  { href: "/", icon: TbSmartHome, label: "Home", active: true },
  { href: "/wishlist", icon: CiHeart, label: "Wishlist", active: true },
  { href: "/chat", icon: FiMail, label: "Chat", active: false },
  { href: "/profile", icon: CiUser, label: "Profile", active: true },
];

export const BottomNavBar = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-start z-50">
    {navItems.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className={`flex flex-col items-center gap-1 w-16 transition-colors ${
          item.active ? "text-primary" : "text-gray-500 hover:text-green-500"
        }`}
      >
        <item.icon
          className="w-6 h-6 text-primary"
          fill={item.active ? "currentColor" : "none"}
        />
      </Link>
    ))}
  </nav>
);
