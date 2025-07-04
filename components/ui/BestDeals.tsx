import { SectionHeader } from './SectionHeader';
import { ProductCard, Product } from './ProductCard';

const bestDealsProducts: Product[] = [
    { id: '1', name: 'Surf Excel Easy Wash Detergent Power', weight: '500 ml', price: 12, originalPrice: 14, imageUrl: '/images/surf.png' },
    { id: '2', name: 'Fortune Arhar Dal (Toor Dal)', weight: '1 kg', price: 10, originalPrice: 12, imageUrl: '/images/fortune.png' },
    { id: '3', name: 'Fresh Red Apples', weight: '1 kg', price: 8, originalPrice: 10, imageUrl: '/images/apple.png' },
];

export const BestDeals = () => (
  <section>
    <SectionHeader title="Best Deal" />
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
      {bestDealsProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);