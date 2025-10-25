// app/admin/product/add/_components/ProductImageUploader.tsx
import { FaUpload } from "react-icons/fa"; // Menggunakan ikon dari React Icons

export function ProductImageUploader() {
  const placeholders = Array.from({ length: 4 });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Image
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {placeholders.map((_, index) => (
          <div
            key={index}
            className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <FaUpload size={22} />
            <span className="mt-2 text-xs">Upload</span>
          </div>
        ))}
      </div>
    </div>
  );
}
