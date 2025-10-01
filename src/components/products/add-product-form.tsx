"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema, ProductInput } from "@/schemas/product.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Loader } from "lucide-react";
import { addProduct } from "@/services/products.service";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

export default function AddProductForm() {
  const queryClient = useQueryClient();

  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nombre: "",
      precio: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      form.reset();
    },
  });

  const onSubmit = (data: ProductInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Agregar Nuevo Producto
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Producto</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent outline-none transition"
                    placeholder="Ej: Laptop Dell"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent outline-none transition"
                    placeholder="0.00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {mutation.isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {mutation.error.message}
            </div>
          )}

          {mutation.isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              Producto agregado exitosamente
            </div>
          )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Agregando...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                Agregar Producto
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
