/**
 * Represents a user's profile information.
 */
interface Users {
  id: string;
  username: string;
  email: string;
  profile_picture: string;
  mobile: string;
  created_at: string; // or Date if you plan to parse it
}

interface Address {
  id: string;
  address: string;
}

/**
 * Represents the complete user data structure, including profile and addresses.
 * It's a tuple containing the user object and an array of address strings.
 */
type UserProfileData = [Users, Address[]];

export type { Users, UserProfileData, Address };
