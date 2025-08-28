import { BottomNavBar } from "@/components/ui/BottomNavbar";
import { staticCategories } from "@/data/mockData";
import HomeView from "@/components/views/HomeViews";

export default function HomePage() {
  return (
    <div className="w-full bg-secondary flex justify-center font-inter">
      <div className="relative bg-white max-w-screen-lg mx-auto shadow-lg">
        <main className="px-4 pb-24">
          <HomeView staticCategories={staticCategories} />
        </main>
        <BottomNavBar />
      </div>
    </div>
  );
}
