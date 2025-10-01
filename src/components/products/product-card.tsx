import { Product } from "@/types/products";
import { DollarSign, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}
export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <div
      key={`${product.nombre}-${index}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {product.nombre}
              </h3>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <DollarSign className="h-5 w-5 text-green-600" />
          <span className="text-2xl font-bold text-green-600">
            {product.precio.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
