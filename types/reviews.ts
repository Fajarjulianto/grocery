type Review = {
  id: string;
  created_at: string;
  product_id: string;
  user_id: string;
  comment: string;
  rating: number;
  username: string;
  profile_picture: string;
  message?: string;
};

export type { Review };
