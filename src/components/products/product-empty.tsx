import { Package } from "lucide-react";

function ProductEmpty() {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <p className="text-gray-500 text-lg">No hay productos disponibles</p>
      <p className="text-gray-400 text-sm mt-2">
        Agrega tu primer producto usando el formulario
      </p>
    </div>
  );
}
export default ProductEmpty;
