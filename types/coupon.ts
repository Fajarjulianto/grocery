type Coupon = {
  coupon_code: string;
  discount_percentage: number;
  expired_on: string;
  redeemed: boolean | null;
}[];

type SelectedCoupon = {
  coupon_code: string;
  discount_percentage: number;
  expired_on: string;
  redeemed: boolean | null;
};

export type { Coupon, SelectedCoupon };
