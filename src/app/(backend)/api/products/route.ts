import { productSchema } from "@/schemas/product.schema";
import { Product } from "@/types/products";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const PRODUCTS: Product[] = [];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      data: PRODUCTS,
      message: "List of products",
      success: true,
    });
  } catch (error) {
    console.error("Error in GET /products:", error);
    return NextResponse.json(
      {
        message: "Error retrieving products",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const product = productSchema.parse(body);

    // verificamos si el producto ya existe
    const existingProduct = PRODUCTS.find((p) => p.nombre === product.nombre);

    if (existingProduct) {
      return NextResponse.json(
        {
          message: "Product already exists",
          success: false,
          error: "Product already exists",
        },
        { status: 400 }
      );
    }

    PRODUCTS.push(product);

    return NextResponse.json(
      {
        data: product,
        message: "Product added successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          success: false,
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          message: "Invalid JSON format",
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    console.error("Error in POST /products:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
