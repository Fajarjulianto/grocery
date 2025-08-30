// components/forms/EditProfileForm.tsx

"use client";

import React, { JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import { InputField } from "@/components/ui/InputField";
import { ProfileFormSkeleton } from "./ProfileFormSkelaton";

// Define a type for the user data for better type safety.
import type { Users, UserProfileData } from "@/types/user";

// API
import UserAPI from "@/lib/userAPI";

// Custom hooks
import { useApiWithAuth } from "@/hooks/auth";

export function EditProfileForm(): JSX.Element {
  const router = useRouter();
  const apiWithAuth = useApiWithAuth();

  // State untuk data dan status loading
  const [formData, setFormData] = React.useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true); // Mulai loading
      try {
        const response = (await apiWithAuth(
          UserAPI.getUserProfile
        )) as UserProfileData | null;

        if (response) {
          setFormData(response);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setFormData(null); // Set ke null jika ada error
      } finally {
        setIsLoading(false); // Selesai loading, baik sukses maupun gagal
      }
    }

    fetchUserData();
  }, [apiWithAuth]);

  /**
   * Handles changes in the input fields and updates the form state.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Pastikan data sebelumnya ada dan bukan null
      if (!prev) return null;

      // Buat salinan objek user yang akan diupdate
      const updatedUser: Users = { ...prev[0], [name]: value };

      // Kembalikan tuple dengan user yang sudah diupdate
      return [updatedUser, prev[1]];
    });
  };

  /**
   * Handles the form submission.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated data:", formData);
    // Di sini Anda akan mengirim data ke API
    // await apiWithAuth(UserAPI.updateUserProfile(formData));
    router.back();
  };

  // Tampilkan SKELETON jika sedang loading
  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  // Tampilkan pesan jika data tidak ditemukan setelah loading selesai
  if (!formData) {
    return (
      <div className="text-center text-gray-500">
        Failed to load the user's profile.
      </div>
    );
  }

  // Tampilkan FORM jika data sudah ada
  const [user, addresses] = formData; // Destructuring for cleaner access

  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Image
            src={user.profile_picture || "/images/profile.png"}
            alt={user.username || "Profile Picture"}
            width={100}
            height={100}
            className="rounded-full object-cover border-2 border-gray-200"
            priority
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/100x100/e2e8f0/94a3b8?text=SM";
            }}
          />
          <button
            type="button"
            className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition-colors"
          >
            <FiEdit2 size={16} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          id="username"
          name="username" // <-- Tambahkan `name` agar `handleChange` berfungsi
          label="Name"
          type="text"
          value={user.username}
          onChange={handleChange}
        />
        <InputField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <InputField
          id="mobile"
          name="mobile"
          label="Mobile Number"
          type="tel"
          value={String(user.mobile) || ""}
          onChange={handleChange}
        />
        {formData[1].map((address, index) => (
          <InputField
            id="address"
            name="address"
            label="Enter Address"
            type="text"
            key={index}
            value={address || ""}
            onChange={handleChange}
          />
        ))}

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors text-lg"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
