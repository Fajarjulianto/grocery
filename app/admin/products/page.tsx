// import ProductAPI from "@/lib/api";
// import AdminDashboard from "@/components/admin/AdminDashboard";
// import { Product } from "@/types/product";

// /**
//  * Halaman untuk Manajemen Produk (Server Component).
//  * Bertanggung jawab untuk fetching data awal di sisi server dan
//  * kemudian menyerahkan rendering dan interaktivitas ke Client Component (AdminDashboard).
//  */
// export default async function ProductsPage() {
//   const initialProductsResult = await ProductAPI.getAllProducts();

//   // Menangani kasus jika terjadi error saat mengambil data dari API.
//   // Menampilkan pesan error yang informatif di UI.
//   if (typeof initialProductsResult === "string") {
//     return (
//       <main className="p-4 md:p-8 bg-slate-700 min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-bold text-white mb-6">
//             Product Management
//           </h1>
//           <div
//             className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
//             role="alert"
//           >
//             <strong className="font-bold">Failed to load products:</strong>
//             <span className="block sm:inline ml-2">
//               {initialProductsResult}
//             </span>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   // Jika data berhasil didapat, teruskan ke Client Component.
//   const initialProducts: Product[] = initialProductsResult;

//   return (
//     <main className="p-4 md:p-8 bg-slate-700 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         {/* Melewatkan data awal sebagai props ke AdminDashboard */}
//         <AdminDashboard initialProducts={initialProducts} />
//       </div>
//     </main>
//   );
// }
