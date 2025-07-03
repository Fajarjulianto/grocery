export const PromoBanner = () => (
  <div className="bg-green-50 rounded-2xl p-6 my-6 flex items-center justify-between overflow-hidden relative">
    <div className="z-10">
      <h2 className="text-xl font-bold text-gray-800">World Food Festival,</h2>
      <p className="text-lg font-medium text-gray-700 mb-4">Bring the world to your Kitchen!</p>
      <button className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors">
        Shop Now
      </button>
    </div>
    <div className="absolute right-0 top-0 h-full w-1/2 opacity-80 md:opacity-100">
       PromoBaner
    </div>
  </div>
);