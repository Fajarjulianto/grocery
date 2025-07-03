import CategoryCard from './CategoryCard'; 
type Category = {
  id: number;
  name: string;
  imageUrl: string;
  href: string;
};

const categories : Category[] = [
  { id: 1, name: 'Vegetables & Fruits', imageUrl: '/images/fruit.png', href: '/categories/vegetables' },
  { id: 2, name: 'Dairy & Breakfast', imageUrl: '/images/cookie.png', href: '/categories/dairy' },
  { id: 3, name: 'Cold Drinks & Juices', imageUrl: '/images/colddrink.png', href: '/categories/drinks' },
  { id: 4, name: 'Instant & Frozen Food', imageUrl: '/images/instanfood.png', href: '/categories/frozen' },
  { id: 5, name: 'Tea & Coffee', imageUrl: '/images/teaandcoffe.png', href: '/categories/tea-coffee' },
  { id: 6, name: 'Atta, Rice & Dal', imageUrl: '/images/attarice.png', href: '/categories/grains' },
  { id: 7, name: 'Masala, Oil & Dry Fruits', imageUrl: '/images/masalaoil.png', href: '/categories/spices' },
  { id: 8, name: 'Chicken, Meat & Fish', imageUrl: '/images/meatandfish.png', href: '/categories/meat' },
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4"> {/* Layout grid responsif */}
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryGrid;