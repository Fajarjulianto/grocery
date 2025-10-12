"use client";
import React, { JSX } from "react";
import { useRouter } from "next/navigation";

// Components
import { FiLogOut } from "react-icons/fi";
import Alert from "../utils/Alert";

// API
import UserAPI from "@/lib/userAPI";

// Custom hook
import { useApiWithAuth } from "@/hooks/auth";

// Context store
import { useWishlistStore } from "@/store/WishlistStore";
import { useCartStore } from "@/store/CartStore";
import { useAddressStore } from "@/store/addressStore";

export default function LogoutButton(): JSX.Element {
  // states
  const [message, setMessage] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(false);

  // auth hook
  const apiWithAuth = useApiWithAuth();

  // router
  const router = useRouter();

  // Context
  const { clearWishlist } = useWishlistStore();
  const { clearCart } = useCartStore();
  const { clearCache } = useAddressStore();

  async function handleLogout(event: React.FormEvent) {
    event.preventDefault();
    const response: boolean = (await apiWithAuth(
      UserAPI.logout
    )) as unknown as boolean;

    if (!response) {
      setMessage("Server error, failed to signout");
      setAlert(true);
      return;
    }

    clearWishlist();
    clearCart();
    clearCache();
    console.log("Logout success");
    // router.push("/login");
  }
  return (
    <>
      <Alert
        message={message}
        isOpen={alert}
        onConfirm={() => setAlert(false)}
      />
      <form
        className="flex w-full justify-center mt-20"
        onSubmit={(event) => {
          handleLogout(event);
        }}
      >
        <button className="bg-red-500 hover:bg-red-600 flex justify-center gap-4 w-[50%] px-4 py-3 text-white font-semibold rounded-lg">
          <FiLogOut size={20} />
          Logout
        </button>
      </form>
    </>
  );
}
