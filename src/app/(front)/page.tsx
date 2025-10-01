import Products from "@/components/products/products";
import AddProductForm from "@/components/products/add-product-form";
import { getQueryClient } from "@/services/getQueryClient";
import { getProducts } from "@/services/products.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import ProductsLoader from "@/components/productLoader";

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getProducts);
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-800">
              Gestión de Productos
            </h1>
          </div>
          <p className="text-gray-600">
            Administra tu catálogo de productos de forma simple y eficiente
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="lg:col-span-1">
            <AddProductForm />
          </div>

          {/* Lista de Productos */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Catálogo de Productos
              </h2>
              <p className="text-gray-600 text-sm">
                Lista de todos los productos disponibles.
              </p>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense fallback={<ProductsLoader />}>
                <Products />
              </Suspense>
            </HydrationBoundary>
          </div>
        </div>
      </div>
    </main>
  );
}
