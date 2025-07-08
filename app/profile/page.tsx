'use client'

import Image from 'next/image'
import Link from 'next/link'    
import { BottomNavBar } from '@/components/ui/BottomNavbar'
import {
    FiEdit,
    FiLock,
    FiCreditCard,
    FiBox,
    FiShield,
    FiLogOut,
    FiFileText,
    FiChevronRight,
    FiEdit2
} from 'react-icons/fi'
import { IconType } from 'react-icons'

interface MenuItem {
    name: string;
    href: string;
    icon: IconType;
}

const menuItems: MenuItem[] = [
    { icon: FiEdit, name: 'Edit Profile', href: '/profile/edit' },
  { icon: FiLock, name: 'Change Password', href: '/profile/change-password' },
  { icon: FiCreditCard, name: 'Payment Method', href: '/profile/payment' },
  { icon: FiBox, name: 'My Orders', href: '/profile/orders' },
  { icon: FiShield, name: 'Privacy Policy', href: '/profile/privacy' },
  { icon: FiFileText, name: 'Terms & Conditions', href: '/profile/terms' },
]


const user = {
  name: 'Smith Mate',
  email: 'smithmate@example.com',
  imageUrl: '/images/profile.png', 
};

export default function ProfilePage() {
  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-lg">
        <header className="bg-white sticky top-0 z-10 border-b border-gray-200">
          <h1 className="text-xl font-bold text-center py-4">My Profile</h1>
        </header>

        <main className="pb-24">
          <section className="bg-green-500 p-6 rounded-b-3xl text-white relative">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  width={72}
                  height={72}
                  className="rounded-full object-cover border-2 border-white"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/72x72/ffffff/a3e635?text=SM'; }}
                />
                <button className="absolute bottom-0 right-0 bg-white text-green-600 rounded-full p-1.5 border-2 border-green-500">
                  <FiEdit2 size={14} />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-green-100">{user.email}</p>
              </div>
            </div>
          </section>

          <section className="p-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="text-gray-600" size={22} />
                  <span className="font-semibold text-gray-800">{item.name}</span>
                </div>
                <FiChevronRight className="text-gray-400" size={20} />
              </Link>
            ))}
          </section>
          <div className="p-4 mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-green-100 text-green-600 font-bold py-4 rounded-lg hover:bg-green-200 transition-colors"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </main>
        <BottomNavBar />
      </div>
    </div>
  );
}