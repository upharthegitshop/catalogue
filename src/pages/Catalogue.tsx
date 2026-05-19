import { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import type { Product } from '../types';
import emptyPage from '../assets/on-product-found.png';
import { fetchProducts as getProducts, fetchTags } from '../lib/products';

const Catalogue = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, tagsData] = await Promise.all([
          getProducts(),
          fetchTags()
        ]);
        setProducts(productsData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by tag first
    if (selectedTag) {
      filtered = filtered.filter(
        (product) => product.tags?.includes(selectedTag)
      );
    }
    
    // Then filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [products, searchTerm, selectedTag]);

  return (
    <>
      <Header />
      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm}
            tags={tags}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
          />

          {loading ? (
            <Loading />
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <img src={emptyPage} alt="No products found" className="w-40 h-40 object-contain mb-6 opacity-80" />
              <p className="text-gray-500">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Catalogue;
