import { SectionHeader } from './SectionHeader';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

const bestDealsProducts: Product[] = [ 
    { id: '1', name: 'Surf Excel Easy Wash Detergent Power', detail: '500 ml', price: 12,  image: '/images/surf.png' },
    { id: '2', name: 'Fortune Arhar Dal (Toor Dal)', detail: '1 kg', price: 10,  image: '/images/fortune.png' },
    { id: '3', name: 'Fresh Red Apples', detail: '1 kg', price: 8,  image: '/images/apple.png' },
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