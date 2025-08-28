"use client";
import React, { JSX } from "react";

// Icons
import {
  FiChevronRight,
  FiChevronDown,
  FiPercent,
  FiTag,
} from "react-icons/fi";

// Context
import { useCartContext } from "@/app/context/cartContext";

// Types
import type { Coupon, SelectedCoupon } from "@/types/coupon";

// Auth
import { useApiWithAuth } from "@/hooks/auth";

// API
import ProductAPI from "@/lib/api";

export default function CouponSelection(): JSX.Element {
  // Local state
  const [coupons, setCoupons] = React.useState<Coupon>([]);
  const [selectedCoupon, setSelectedCoupon] =
    React.useState<SelectedCoupon | null>();
  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  // Context to update item total
  const { itemTotal, updateDiscount, updateCouponCode } = useCartContext();

  // Auth
  const apiWithAuth = useApiWithAuth();

  React.useEffect(() => {
    /**
     * Fetches coupons using the auth-aware API hook.
     */
    async function fetchCoupons() {
      try {
        setLoading(true);

        const response = (await apiWithAuth(ProductAPI.getCoupons)) as Coupon;

        if (response && Array.isArray(response)) {
          setCoupons(response);
        } else {
          setMessage("There are no coupons available.");
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching coupons:", err);
        setMessage("Failed to fetch coupons.");
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCoupons();
  }, [apiWithAuth]);

  // Function to update selected coupon
  const handleCouponSelect = (index: number) => {
    const selected = coupons[index];

    // Update the state with the selected coupon
    setSelectedCoupon(selected);
    updateCouponCode(selected.coupon_code);
    setIsOpen(false);

    // Calculating the discount value
    const discountValue: number =
      (selected.discount_percentage * itemTotal) / 100;
    updateDiscount(discountValue);
  };

  const handleClearCoupon = () => {
    setSelectedCoupon(null); // Reset selected coupon
    updateCouponCode("");
    updateDiscount(null);
    setIsOpen(false); // Close dropdown
    console.log("Coupon cleared"); // Log action instead of discount value
    return;
  };

  const toggleDropdown = () => {
    if (!loading && !error && coupons.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <div
        className={`flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
          loading || error || coupons.length === 0
            ? "cursor-not-allowed opacity-60"
            : ""
        }`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <FiPercent className="text-green-600 text-xs" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {selectedCoupon
                ? selectedCoupon.coupon_code || "COUPON APPLIED"
                : "APPLY COUPON"}
            </span>
            {selectedCoupon && (
              <span className="text-xs text-gray-500">
                {`${selectedCoupon.discount_percentage || 0}% off`}
              </span>
            )}
            {loading && (
              <span className="text-xs text-gray-500">Loading coupons...</span>
            )}
            {error && <span className="text-xs text-red-500">{message}</span>}
            {!loading && !error && coupons.length === 0 && (
              <span className="text-xs text-gray-500">
                No coupons available
              </span>
            )}
          </div>
        </div>
        {!loading && !error && coupons.length > 0 && (
          <div className="transition-transform duration-200">
            {isOpen ? (
              <FiChevronDown className="text-gray-400" />
            ) : (
              <FiChevronRight className="text-gray-400" />
            )}
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && !loading && !error && coupons.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {/* Clear Selection Option */}
          {selectedCoupon && (
            <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 text-sm">X</span>
              </div>
              <div
                onClick={() => {
                  handleClearCoupon();
                }}
                className="flex-1"
              >
                <div className="text-sm font-medium text-gray-700">
                  Remove Coupon
                </div>
                <div className="text-xs text-gray-500">
                  Clear selected coupon
                </div>
              </div>
            </div>
          )}

          {/* Coupon Options */}
          {coupons.map((coupon, index) => (
            <div
              key={`${coupon.coupon_code}-${index}`}
              className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedCoupon?.coupon_code === coupon.coupon_code
                  ? "bg-green-50 border-l-4 border-green-500"
                  : ""
              } ${coupon.redeemed ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !coupon.redeemed && handleCouponSelect(index)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  coupon.redeemed ? "bg-gray-100" : "bg-green-100"
                }`}
              >
                <FiTag
                  className={`text-sm ${
                    coupon.redeemed ? "text-gray-400" : "text-green-600"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div
                  className={`text-sm font-medium ${
                    coupon.redeemed ? "text-gray-500" : "text-gray-900"
                  }`}
                >
                  {coupon.coupon_code}
                  {coupon.redeemed && (
                    <span className="ml-2 text-xs">(Used)</span>
                  )}
                </div>
                <div
                  className={`text-xs ${
                    coupon.redeemed ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {coupon.discount_percentage}% discount
                </div>
                <div
                  className={`text-xs ${
                    coupon.redeemed ? "text-gray-400" : "text-gray-400"
                  }`}
                >
                  Expires: {new Date(coupon.expired_on).toLocaleDateString()}
                </div>
              </div>
              <div
                className={`text-sm font-bold ${
                  coupon.redeemed ? "text-gray-400" : "text-green-600"
                }`}
              >
                -{coupon.discount_percentage}%
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
