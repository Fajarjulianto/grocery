// components/forms/EditProfileForm.tsx

"use client";

import React, { JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components
import { FaTrash } from "react-icons/fa";
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
      setIsLoading(true);
      try {
        const response = (await apiWithAuth(
          UserAPI.getUserProfile
        )) as UserProfileData | null;

        if (response) {
          setFormData(response);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setFormData(null);
      } finally {
        setIsLoading(false);
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
      if (!prev) return null;

      const updatedUser: Users = { ...prev[0], [name]: value };
      // console.log(updatedUser);
      // console.log([updatedUser, prev[1]]);
      return [updatedUser, prev[1]];
    });
  };

  /**
   * Handles the form submission.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Updated data:", formData);

    // Send updated data to the server
    if (!formData) return;

    const response = (await apiWithAuth(
      UserAPI.editUserProfile,
      formData[0].username,
      formData[0].email,
      formData[0].mobile
    )) as boolean;

    if (response) {
      router.back();
    } else {
      router.refresh();
    }
  };

  // Display the skelaton loading
  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  // Display error message if formData is null after loading
  if (!formData) {
    return (
      <div className="text-center text-gray-500">
        Failed to load the user's profile.
      </div>
    );
  }

  const [user, addresses] = formData; // Destructuring for cleaner access

  return (
    <form onSubmit={handleSubmit}>
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

      <div className="space-y-5">
        <InputField
          id="username"
          name="username"
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
          <span
            className="flex justify-between items-center w-full mb-2"
            key={index}
          >
            <div className="w-9/10">
              <InputField
                id={`address-${index}`}
                name="address"
                label={`Address ${index + 1}`}
                type="text"
                value={address || ""}
                disabled={true}
                onChange={() => {}}
              />
            </div>

            <button type="button" className="flex justify-center items-center">
              <FaTrash className="text-red-500 ml-4 cursor-pointer hover:text-red-600" />
            </button>
          </span>
        ))}

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-colors text-lg"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
