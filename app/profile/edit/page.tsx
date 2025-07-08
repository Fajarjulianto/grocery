"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiEdit2 } from 'react-icons/fi';
import { InputField } from '@/components/ui/InputField';

const initialUserData = {
  name: 'Smith Mate',
  email: 'smithmate@example.com',
  mobile: '(205) 555-0100',
  address: '8502 Preston Rd. Inglewood, USA',
  imageUrl: '/images/profile.png', 
};

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialUserData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Updated data:', formData);
    router.back(); 
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-lg">
        <header className="bg-white sticky top-0 z-10 p-4 border-b border-gray-200 flex items-center">
          <button onClick={() => router.back()} className="text-gray-700">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-center flex-grow">Edit Profile</h1>
          <div className="w-6"></div>
        </header>

        <main className="p-4 sm:p-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src={formData.imageUrl}
                alt={formData.name}
                width={100}
                height={100}
                className="rounded-full object-cover border-2 border-gray-200"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/e2e8f0/94a3b8?text=SM'; }}
              />
              <button className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-2">
                <FiEdit2 size={16} />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              id="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              id="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              id="mobile"
              label="Mobile Number"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
            />
            <InputField
              id="address"
              label="Enter Address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors text-lg"
              >
                Update
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}