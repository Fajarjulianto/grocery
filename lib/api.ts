import { type Product } from "@/types/product";
import type { Message } from "@/types/Message";
import type { Token } from "@/types";
import type { Cart } from "@/types/cart";
import type { Coupon } from "@/types/coupon";

/**
 * ProductAPI class provides methods for interacting with product-related endpoints.
 * Handles product retrieval, wishlist management, authentication tokens, and cart operations.
 */
class ProductAPI {
  /**
   * Retrieves a product by its ID.
   *
   * @param id - The unique identifier for the product
   * @returns Promise resolving to Product object on success, or error message string on failure
   * @throws Will log API errors to console and return error message
   *
   * @example
   * ```typescript
   * const product = await ProductAPI.getProductById("123");
   * if (typeof product === "string") {
   *   console.error("Error:", product);
   * } else {
   *   console.log("Product:", product.name);
   * }
   * ```
   */
  async getProductById(id: string): Promise<Product | String> {
    const response = await fetch(
      `http://localhost:3001/api/product-by-id?productID=${id}`
    );

    const result: Product | Message = await response.json();

    if (response.status !== 200) {
      console.warn("API error:", (result as Message)[0].message);
      return (result as Message)[0].message;
    }

    return result as Product;
  }

  /**
   * Retrieves the user's wishlist items.
   *
   * @param token - Bearer authentication token
   * @returns Promise resolving to array of wishlist items on success, or false on failure
   *
   * @example
   * ```typescript
   * const wishlist = await ProductAPI.getWishList(userToken);
   * if (wishlist && Array.isArray(wishlist)) {
   *   console.log(`Found ${wishlist.length} items in wishlist`);
   * }
   * ```
   */
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

  /**
   * Fetches a refresh token from the server using HTTP-only cookies.
   *
   * @returns Promise resolving to Token object on success, or false on failure
   * @note Uses credentials: "include" to send HTTP-only cookies
   *
   * @example
   * ```typescript
   * const token = await ProductAPI.getRefreshToken();
   * if (token) {
   *   console.log("Token refreshed successfully");
   * }
   * ```
   */
  public async getRefreshToken(): Promise<Token | false> {
    const response = await fetch("http://localhost:3001/api/token", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    // console.log(data);

    if (!Array.isArray(data) || response.status !== 200) {
      return false;
    }

    return data as Token;
  }

  /**
   * Retrieves products marked as best deals.
   *
   * @returns Promise resolving to Product object on success, or false on failure
   * @throws Will log API errors to console when status is not 200
   *
   * @example
   * ```typescript
   * const deals = await ProductAPI.getBestDeals();
   * if (deals) {
   *   console.log("Best deals loaded");
   * }
   * ```
   */
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

  /**
   * Retrieves a list of popular products.
   *
   * @returns Promise resolving to Product object on success, or false on failure
   * @throws Will log API errors to console when status is not 200
   *
   * @example
   * ```typescript
   * const popular = await ProductAPI.getPopularProducts();
   * if (popular) {
   *   console.log("Popular products loaded");
   * }
   * ```
   */
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

  /**
   * Adds a product to the user's shopping cart.
   *
   * @param product_id - The unique identifier of the product to add
   * @param token - Bearer authentication token
   * @returns Promise resolving to success message string on success (201), or false on failure
   *
   * @example
   * ```typescript
   * const result = await ProductAPI.addToCart("product123", userToken);
   * if (result) {
   *   console.log("Success:", result);
   * } else {
   *   console.error("Failed to add item to cart");
   * }
   * ```
   */
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

  public async getCartItems(token: string): Promise<Cart | false> {
    const response = await fetch("http://localhost:3001/api/shopping-cart", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!Array.isArray(data)) {
      return false;
    }

    return data as Cart;
  }
  public async getCoupons(token: string): Promise<Coupon | false> {
    const response = await fetch("http://localhost:3001/api/coupons", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200 || data.length === 0) {
      console.warn("API error:", data);
      return false;
    }

    return data as Coupon;
  }

  public async removeCartItem(
    token: string,
    product_id: string
  ): Promise<false | Message> {
    const response = await fetch("http://localhost:3001/api/delete-cart-item", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    });

    const message = await response.json();

    console.log("product_id", product_id);
    console.log(message);

    if (response.status !== 200) {
      return false;
    }

    return message as Message;
  }
}

export default new ProductAPI();
