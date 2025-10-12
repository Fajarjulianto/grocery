import Link from "next/link";

// Components
import ProfilePicture from "@/components/profile/ProfilePicture";
import { BottomNavBar } from "@/components/ui/BottomNavbar";
import {
  FiEdit,
  FiLock,
  // FiCreditCard,
  FiBox,
  FiShield,
  FiFileText,
  FiChevronRight,
} from "react-icons/fi";
import { IconType } from "react-icons";
import ProfileNavigator from "@/components/profile/ProfileNavigator";
import LogoutButton from "@/components/profile/Logout";

interface MenuItem {
  name: string;
  href: string;
  icon: IconType;
}

const menuItems: MenuItem[] = [
  { icon: FiEdit, name: "Edit Profile", href: "/profile/edit" },
  { icon: FiLock, name: "Change Password", href: "/forget-password" },
  // { icon: FiCreditCard, name: "Payment Method", href: "/profile/payment" },
  { icon: FiBox, name: "My Orders", href: "/order-list" },
  { icon: FiShield, name: "Privacy Policy", href: "/profile/privacy" },
  { icon: FiFileText, name: "Terms & Conditions", href: "/profile/terms" },
];

export default function ProfilePage() {
  // const handleLogout = () => {
  //   console.log("User logged out");
  // };

  return (
    <div className="w-full bg-gray-100 flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-lg">
        <ProfileNavigator />
        {/* Profile Header */}
        <ProfilePicture />
        <main className="pb-24">
          <section className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="text-gray-600" size={22} />
                  <span className="font-semibold text-gray-800">
                    {item.name}
                  </span>
                </div>
                <FiChevronRight className="text-gray-400" size={20} />
              </Link>
            ))}
          </section>
          <LogoutButton />
        </main>
        <BottomNavBar />
      </div>
    </div>
  );
}
