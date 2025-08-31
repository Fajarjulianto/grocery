// Types
import type { Users } from "@/types/user";

class UserAPI {
  public static async getUserProfile(token: string): Promise<Users | null> {
    const response = await fetch("http://localhost:3001/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    // if (response.status !== 200) {
    //   return null;
    // }

    const data = await response.json();
    console.log(data);
    return data as Users;
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
}

export default UserAPI;
