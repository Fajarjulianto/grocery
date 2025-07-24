import { type Product, type ErrorMessage } from "@/types/product";
import type { Token } from "@/types";

class ProductAPI {
  async getProductById(id: string): Promise<Product | String> {
    const response = await fetch(
      `http://localhost:3001/api/product-by-id?productID=${id}`
    );

    const result: Product | ErrorMessage = await response.json();

    if (response.status !== 200) {
      console.warn("API error:", (result as ErrorMessage)[0].message);
      return (result as ErrorMessage)[0].message;
    }

    return result as Product;
  }

  public async getWishList(token: string) {
    console.log("token", token);
    const response = await fetch(`http://localhost:3001/api/wishlist`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (!Array.isArray(data)) {
      return false;
    }

    return data;
  }

  // Fetching refresh token from server
  public async getRefreshToken(): Promise<Token | boolean> {
    const response = await fetch("http://localhost:3001/api/token", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    // console.log(data);

    if (!Array.isArray(data)) {
      return false;
    }

    return data as Token;
  }

  public async getBestDeals(): Promise<Product | boolean> {
    const response = await fetch("http://localhost:3001/api/best-deal", {
      method: "GET",
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.warn("API error:", data[0].message as string);
      return false;
    }

    return data as Product;
  }

  public async getPopularProducts(): Promise<Product | boolean> {
    const response = await fetch("http://localhost:3001/api/popular-products", {
      method: "GET",
    });

    const data = await response.json();

    if (response.status !== 200) {
      console.warn("API error:", data[0].message as string);
      return false;
    }

    return data as Product;
  }

  public async addToCart(
    product_id: string,
    token: string
  ): Promise<string | boolean> {
    const response = await fetch("http://localhost:3001/api/add-to-cart", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    });

    const data = await response.json();
    if (response.status !== 201) {
      return false;
    }

    return data[0].message as string;
  }
}

export default new ProductAPI();
