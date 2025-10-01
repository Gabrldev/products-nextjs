"use client";
import { getProducts } from "@/services/products.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Package, DollarSign } from "lucide-react";
import ProductCard from "./product-card";
import ProductEmpty from "./product-empty";

function Products() {
  const { data } = useSuspenseQuery(getProducts);

  if (!data?.data || data.data.length === 0) return <ProductEmpty />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.data.map((product, index) => (
        <ProductCard key={product.nombre} product={product} index={index} />
      ))}
    </div>
  );
}
export default Products;
