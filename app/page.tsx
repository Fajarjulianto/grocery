import { LocationHeader } from "@/components/ui/LocationHeader";
import { SearchFilter } from "@/components/ui/SearchFilter";
import CategoryGrid  from "@/components/ui/CategoryGrid";
import { PromoBanner } from "@/components/ui/PromoBaner";
import { BestDeals } from "@/components/ui/BestDeals";
import { BottomNavBar } from "@/components/ui/BottomNavbar";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function HomePage() {
  return (
      <div className="bg-gray-100 min-h-screen font-sans">
      <div className="relative bg-white max-w-screen-lg mx-auto shadow-lg">
        <main className="px-4 pb-24">
          <header className="py-4 flex justify-between items-center">
            <LocationHeader />
            <button className="relative text-gray-600">
              <HiOutlineShoppingBag className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </button>
          </header>
          <SearchFilter />
          <div className="space-y-8">
            <CategoryGrid />
            <PromoBanner />
            <BestDeals />
          </div>
          </main>
        <BottomNavBar />
      </div>
    </div>
  );
}
