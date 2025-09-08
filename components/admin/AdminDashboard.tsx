// "use client";

// import { useState, FormEvent } from "react";
// import { Product, NewProductData, UpdateProductData } from "@/types/product";
// import ProductAPI from "@/lib/api";
// import ProductForm from "./ProductForm";

// interface AdminDashboardProps {
//   initialProducts: Product[];
// }

// export default function AdminDashboard({
//   initialProducts,
// }: AdminDashboardProps) {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [feedbackMessage, setFeedbackMessage] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const showFeedback = (type: "success" | "error", message: string) => {
//     setFeedbackMessage({ type, message });
//     setTimeout(() => setFeedbackMessage(null), 3000);
//   };

//   const handleAddClick = () => {
//     setCurrentProduct(null);
//     setIsModalOpen(true);
//   };

//   const handleEditClick = (product: Product) => {
//     setCurrentProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setCurrentProduct(null);
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const productData = {
//       name: formData.get("name") as string,
//       sku: formData.get("sku") as string,
//       price: parseFloat(formData.get("price") as string),
//       category: formData.get("category") as string,
//       detail: formData.get("detail") as string,
//       image: formData.get("image") as string,
//     };

//     const isAdding = !currentProduct;

//     if (isAdding) {
//       const result = await ProductAPI.addProduct(
//         productData as unknown as NewProductData
//       );
//       if (typeof result === "string") {
//         showFeedback("error", result);
//       } else {
//         setProducts([...products, result as Product]);
//         showFeedback("success", "Product added successfully!");
//         handleCloseModal();
//       }
//     } else {
//       const result = await ProductAPI.updateProduct(
//         currentProduct.id,
//         productData as UpdateProductData
//       );
//       if (typeof result === "string") {
//         showFeedback("error", result);
//       } else {
//         setProducts(
//           products.map((p) =>
//             p.id === currentProduct.id ? (result as Product) : p
//           )
//         );
//         showFeedback("success", "Product updated successfully!");
//         handleCloseModal();
//       }
//     }
//     setIsLoading(false);
//   };

//   const handleDelete = async (id: string) => {
//     if (confirm("Are you sure you want to delete this product?")) {
//       setIsLoading(true);
//       const result = await ProductAPI.deleteProduct(id);
//       if (result.toLowerCase().includes("successfully")) {
//         setProducts(products.filter((p) => p.id !== id));
//         showFeedback("success", result);
//       } else {
//         showFeedback("error", result);
//       }
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-slate-700 shadow-md rounded-lg p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-700">Product List</h2>
//         <button
//           onClick={handleAddClick}
//           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
//         >
//           Add Product
//         </button>
//       </div>

//       {feedbackMessage && (
//         <div
//           className={`p-4 mb-4 rounded-lg ${
//             feedbackMessage.type === "success"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {feedbackMessage.message}
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 SKU
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {product.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {product.sku}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   Rp {product.price.toLocaleString("id-ID")}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {product.category}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <button
//                     onClick={() => handleEditClick(product)}
//                     className="text-indigo-600 hover:text-indigo-900 mr-4"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product.id)}
//                     className="text-red-600 hover:text-red-900"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isModalOpen && (
//         <ProductForm
//           initialData={currentProduct}
//           isLoading={isLoading}
//           onSubmit={handleSubmit}
//           onCancel={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// }
