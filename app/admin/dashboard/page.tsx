const DashboardPage = () => {
  return (
    <>
      <h2 className="my-2 text-2xl font-semibold text-gray-700">Dashboard</h2>
      {/* Statistik Card */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"></div>
      <div className="w-full p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">
          Grafik Penjualan (Placeholder)
        </h3>
        <div className="mt-4 h-64 flex items-center justify-center text-gray-400">
          Chart akan ditampilkan di sini
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
