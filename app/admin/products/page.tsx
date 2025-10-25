// app/admin/product/add/page.tsx
import { Toaster } from "react-hot-toast";
import { AddProductForm } from "@/components/admin/products/AddProductForm";
export default function AddProductPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Add New Product
        </h1>
        <Toaster position="top-center" />
        <AddProductForm />
      </div>
    </main>
  );
}
