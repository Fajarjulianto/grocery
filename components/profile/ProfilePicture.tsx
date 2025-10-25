"use client";

import React, { JSX } from "react";
import Image from "next/image";

// Components
import { FiEdit2 } from "react-icons/fi";

// Types
import type { Users } from "@/types/user";

// API
import UserAPI from "@/lib/userAPI";

// Custom hooks
import { useApiWithAuth } from "@/hooks/auth";

export default function ProfilePicture(): JSX.Element {
  const [userData, setUserData] = React.useState<Users[] | null>(null);
  const ApiWithAuth = useApiWithAuth();

  React.useEffect(() => {
    // Jangan jalankan fetch jika ApiWithAuth belum siap
    if (!ApiWithAuth) return;

    async function fetchUserData() {
      try {
        const response = (await ApiWithAuth(UserAPI.getUserProfile)) as
          | Users[]
          | null;
        // console.log(response);
        if (response !== null) {
          setUserData(response);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Anda bisa mengatur state error di sini jika perlu
      }
    }

    fetchUserData();
  }, [ApiWithAuth]);

  // 1. Skelaton loading state
  if (!userData) {
    return (
      <section className="bg-green-500 p-6 rounded-b-3xl text-white relative animate-pulse">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Placeholder untuk gambar profil */}
            <div className="w-[72px] h-[72px] bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            {/* Placeholder untuk nama dan email */}
            <div className="h-7 w-40 bg-green-400 rounded-md mb-2"></div>
            <div className="h-4 w-48 bg-green-400 rounded-md"></div>
          </div>
        </div>
      </section>
    );
  }

  // Tampilkan UI sebenarnya jika userData sudah ada
  return (
    <section className="bg-green-500 p-6 rounded-b-3xl text-white relative">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            // 2. Gunakan optional chaining (?.) sebagai pengaman
            src={userData[0].profile_picture || "/images/profile.png"}
            alt={userData[0].username || "User profile picture"}
            width={72}
            height={72}
            className="rounded-full object-cover border-2 border-white"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/72x72/ffffff/a3e635?text=SM";
            }}
          />
          <button className="absolute bottom-0 right-0 bg-white text-green-600 rounded-full p-1.5 border-2 border-green-500">
            <FiEdit2 size={14} />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold">
            {userData[0].username || "Username"}
          </h2>
          <p className="text-green-100">{userData[0].email || "Email"}</p>
        </div>
      </div>
    </section>
  );
}
