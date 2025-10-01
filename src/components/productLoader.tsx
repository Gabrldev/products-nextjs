function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 animate-pulse">
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-2"></div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 p-3 rounded-lg">
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-300 rounded w-32 mb-1"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <div className="h-5 w-5 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

function ProductsLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

export default ProductsLoader;