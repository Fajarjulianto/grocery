"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

// Types
import type { Message } from "@/types/Message";
import type { Token } from "@/types/product";

// API
import ProductAPI from "@/lib/api";

const useApiWithAuth = () => {
  const router = useRouter();

  return useCallback(
    async (
      apiCall: (
        token: string,
        ...args: any[]
      ) => Promise<false | Message | any>,
      ...args: any[]
    ): Promise<false | Message | any> => {
      try {
        let token = localStorage.getItem("access_token") as string;
        let response = await apiCall(token, ...args);

        // If first call fails, try to refresh token
        if (!Array.isArray(response) || !response) {
          const newToken: false | Token = await ProductAPI.getRefreshToken();

          if (!Array.isArray(newToken) || !newToken) {
            router.push("/login");
            return false;
          }

          localStorage.setItem("access_token", newToken[0].access_token);
          response = await apiCall(newToken[0].access_token, ...args);
        }

        return response;
      } catch (error) {
        console.error("API call failed:", error);
        return false;
      }
    },
    [router]
  );
};

export { useApiWithAuth };
