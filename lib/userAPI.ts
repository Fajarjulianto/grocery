// Types
import type { Users } from "@/types/user";

class UserAPI {
  public static async getUserProfile(token: string): Promise<Users[] | null> {
    const response = await fetch("http://localhost:3001/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      return null;
    }

    const data = await response.json();
    console.log(data);
    return data as Users[];
  }

  public static async editUserProfile(
    token: string,
    username: string,
    email: string,
    mobile: string
  ): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3001/api/edit-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          email,
          mobile,
        }),
      });

      if (response.status !== 200) {
        return false;
      }

      const data = await response.json();
      console.log(data);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public static async removeAddress(
    token: string,
    address_id: string
  ): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3001/api/delete-address", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address_id }),
      });

      const data = await response.json();
      console.log(data);

      if (response.status !== 200) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public static async logout(token: string): Promise<boolean> {
    try {
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.status !== 200) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public static async requestResetPassword(
    email: string
  ): Promise<string | false> {
    try {
      const response = await fetch(
        "http://localhost:3001/api/request-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      console.log(data);

      return data[0].message as string;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  public static async changePassword(
    token: string,
    password: string
  ): Promise<string | false> {
    try {
      const response = await fetch("http://localhost:3001/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reset_password: password }),
      });

      // if (response.status !== 200) {
      //   return false;
      // }

      const data = await response.json();
      console.log(data);
      return data[0].message as string;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default UserAPI;
