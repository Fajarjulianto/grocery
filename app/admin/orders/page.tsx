import { BiCheckCircle, BiSync, BiTime } from "react-icons/bi"; // <-- Perubahan di sini

// Data dummy untuk contoh, ganti dengan data asli dari API Anda
const mockOrders = [
  {
    id: "#89124",
    customer: "Budi Santoso",
    email: "budi.s@example.com",
    date: "5 Sep 2025",
    productCount: 3,
    total: "Rp 750.000",
    status: "Completed",
  },
  {
    id: "#89123",
    customer: "Citra Lestari",
    email: "citra.l@example.com",
    date: "5 Sep 2025",
    productCount: 5,
    total: "Rp 1.250.000",
    status: "Processing",
  },
  {
    id: "#89122",
    customer: "Agus Wijaya",
    email: "agus.w@example.com",
    date: "4 Sep 2025",
    productCount: 1,
    total: "Rp 200.000",
    status: "Pending",
  },
  {
    id: "#89121",
    customer: "Dewi Anggraini",
    email: "dewi.a@example.com",
    date: "3 Sep 2025",
    productCount: 8,
    total: "Rp 3.400.000",
    status: "Completed",
  },
];

// Komponen untuk menampilkan badge status agar lebih dinamis
const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses =
    "inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold";

  // -- Ikon dari react-icons digunakan di bawah ini --
  if (status === "Completed") {
    return (
      <span className={`${baseClasses} bg-green-100 text-green-700`}>
        <BiCheckCircle className="h-4 w-4" /> Selesai
      </span>
    );
  }
  if (status === "Processing") {
    return (
      <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>
        <BiSync className="h-4 w-4" /> Diproses
      </span>
    );
  }
  return (
    <span className={`${baseClasses} bg-gray-100 text-gray-700`}>
      <BiTime className="h-4 w-4" /> Pending
    </span>
  );
};

export default function OrdersPage() {
  return (
    <main className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Judul Halaman */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manajemen Pesanan
          </h1>
          <p className="text-gray-500 mt-1">
            Lacak dan kelola semua pesanan pelanggan.
          </p>
        </div>

        {/* Ringkasan Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-gray-500">
              Total Pesanan
            </h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">150</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-gray-500">
              Total Produk Terjual
            </h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">1.234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-gray-500">
              Total Pendapatan
            </h3>
            <p className="text-4xl font-bold text-green-600 mt-2">Rp 42.5Jt</p>
          </div>
        </div>

        {/* Tabel Daftar Pesanan */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Daftar Pesanan Terbaru
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID Pesanan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Pelanggan
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Jumlah Produk
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Bayar
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-xs text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-bold text-blue-600 text-base">
                        {order.productCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4 font-semibold">{order.total}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        Lihat Detail
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination (Opsional) */}
          <div className="p-4 border-t flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Menampilkan 1-4 dari 150 pesanan
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100">
                Sebelumnya
              </button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
