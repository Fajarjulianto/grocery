import Image from "next/image";
export const PromoBanner = () => (
  <div className="bg-green-50 rounded-2xl p-4 sm:p-6 my-6 flex items-center justify-between overflow-hidden relative">
    <div className="z-10">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800">World Food Festival,</h2>
      <p className="text-base sm:text-lg font-medium text-gray-700 mb-4">Bring the world to your Kitchen!</p>
      <button className="bg-green-500 text-white font-semibold py-2 px-5 sm:px-6 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base">
        Shop Now
      </button>
    </div>
    <div className="absolute right-0 top-0 h-full w-1/2 opacity-80 md:opacity-100">
       <Image
        src="/images/cta.png"
        alt="Promo Banner"
        fill
        className="object-contain"
      />
    </div>
  </div>
);