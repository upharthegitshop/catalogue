import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card block bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 no-underline border-2 border-transparent hover:border-[var(--primary)]"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5 pb-6 bg-gradient-to-b from-white to-[var(--primary-light)]/30">
        <h3 className="font-display text-lg font-semibold text-[var(--charcoal)] mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
