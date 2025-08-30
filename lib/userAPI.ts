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
}

export default UserAPI;
