import CategoryView from '@/components/views/CategoryView';
import type { CategoryData } from '@/components/views/CategoryView';

async function getCategoryData(slug: string): Promise<CategoryData> {
  const API_ENDPOINT = `http://localhost:3001/api/products?category=${slug}`;
  try {
    const res = await fetch(API_ENDPOINT, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Gagal mengambil data dari server');
    }
    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { products: [], subCategories: [] };
  }
}

export default async function CategoryPage({ params: { slug } }: { params: { slug: string } }) {
  
  const categoryData = await getCategoryData(slug);
  const pageTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & ');

  return <CategoryView initialData={categoryData} pageTitle={pageTitle} />;
}
