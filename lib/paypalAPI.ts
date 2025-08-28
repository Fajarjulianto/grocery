// Types
import type { OrderData } from "@/types/orders";
import type { OrderResponse } from "@/types/orders";

class PaypalCheckout {
  public static async createOrder(
    token: string,
    couponCode: string | null,
    address_id: string
  ): Promise<OrderResponse | false> {
    try {
      const response = await fetch(
        "http://localhost:3001/api/paypal/create-order",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coupon_code: couponCode,
            address_id,
          }),
        }
      );

      if (response.status !== 200) {
        return false;
      }

      const data = await response.json();
      console.log(data);
      return data as OrderResponse;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public static async getOrderDetailsByPayPalId(
    token: string,
    order_id: string
  ): Promise<OrderData | null> {
    try {
      const response = await fetch(
        `http://localhost:3001/api/get-order-details?order_id=${order_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.status !== 200) {
        return null;
      }

      return data as OrderData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public static async capturePayment(
    token: string,
    captureUrl: string,
    order_id: string
  ): Promise<any | false> {
    try {
      const response = await fetch(
        "http://localhost:3001/api/paypal/capture-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ url: captureUrl, order_id }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        return false;
      }

      return result;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export default PaypalCheckout;
