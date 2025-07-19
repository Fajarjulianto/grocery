import { type Product, type ErrorMessage } from "@/types/product";

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

  public async getWishList(user_id: string, token: string) {
    const response = await fetch(
      `http://localhost/3001/wishlist?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          authorization: token,
        },
      }
    );

    const data = await response.json();
    return data;
  }
}

export default new ProductAPI();
