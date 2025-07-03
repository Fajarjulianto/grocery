import { SectionHeader } from './SectionHeader';
import { ProductCard, Product } from './ProductCard';

// Data ini nantinya akan datang dari API Express.js Anda
const bestDealsProducts: Product[] = [
    { id: '1', name: 'Surf Excel Easy Wash Detergent Power', weight: '500 ml', price: 12, originalPrice: 14, imageUrl: 'https://placehold.co/150x150/a5b4fc/4f46e5?text=Surf' },
    { id: '2', name: 'Fortune Arhar Dal (Toor Dal)', weight: '1 kg', price: 10, originalPrice: 12, imageUrl: 'https://placehold.co/150x150/6ee7b7/059669?text=Dal' },
    { id: '3', name: 'Fresh Red Apples', weight: '1 kg', price: 8, originalPrice: 10, imageUrl: 'https://placehold.co/150x150/fca5a5/b91c1c?text=Apples' },
];

export const BestDeals = () => (
  <section>
    <SectionHeader title="Best Deal" />
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
      {/* -mx-4 dan px-4 digunakan untuk membuat scrollbar tidak memotong shadow card */}
      {bestDealsProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);