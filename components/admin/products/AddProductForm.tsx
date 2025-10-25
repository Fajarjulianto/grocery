// app/admin/product/add/_components/AddProductForm.tsx
"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import type { ProductFormData } from "@/types/productFormData";
import { ProductImageUploader } from "./ProductImageUploader"; // Komponen dari jawaban sebelumnya

// State awal untuk form
const initialFormState: ProductFormData = {
  name: "",
  description: "",
  category: "",
  price: 0,
  offerPrice: 0,
};

// Mockup fungsi API - Ini bisa menjadi fungsi fetch atau axios
async function addProductAPI(data: ProductFormData) {
  /**
   * Submits product data to the server.
   * @param {ProductFormData} data - The product data from the form.
   * @returns {Promise<any>} - The server response.
   */
  console.log("Submitting to API:", data);
  // Simulasi delay jaringan
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulasi error (uncomment untuk tes)
  // if (Math.random() > 0.5) {
  //   throw new Error("Failed to add product! Server returned an error.");
  // }

  return { success: true, message: "Product added successfully!" };
}

export function AddProductForm() {
  const [formData, setFormData] = useState<ProductFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [isLoading, setIsLoading] = useState(false); // State khusus untuk loading

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev: ProductFormData) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};
    if (formData.name.length < 3) newErrors.name = "Product name is too short.";
    if (formData.description.length < 10)
      newErrors.description = "Description is too short.";
    if (!formData.category) newErrors.category = "Please select a category.";
    if (formData.price <= 0) alert("Price must be greater than zero.");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsLoading(true); // Mulai loading
    try {
      const response = await addProductAPI(formData);
      toast.success(response.message);
      setFormData(initialFormState); // Reset form setelah sukses
      setErrors({}); // Bersihkan error
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Selesaikan loading, baik sukses maupun gagal
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-lg shadow"
    >
      <ProductImageUploader />

      {/* Product Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
            errors.name ? "border-red-500" : ""
          }`}
          placeholder="Type here"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Product Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Product Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
            errors.description ? "border-red-500" : ""
          }`}
          placeholder="Type here"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
            errors.category ? "border-red-500" : ""
          }`}
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="groceries">Groceries</option>
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      {/* Prices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="offerPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Offer Price
          </label>
          <input
            type="number"
            id="offerPrice"
            name="offerPrice"
            value={formData.offerPrice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-8 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Adding..." : "ADD"}
        </button>
      </div>
    </form>
  );
}
