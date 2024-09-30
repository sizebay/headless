import api from "../api/index.ts";

export interface Product {
  ageGroup: string;
  categoryName: string;
  clothesType: string;
  coverImage: string;
  feedProductId: string | null;
  genderTheWearWasDesignedFor: string;
  id: number;
  isShoe: boolean;
  isShoeAccessory?: boolean;
  measures: any;
  modelingName: string;
  name: string;
  permalink: string;
  sizeType: string | null;
}

export interface ProductNotFound {
  message: string;
  status: number;
}

export default async function product(
  permalink: string
): Promise<Product | ProductNotFound> {
  try {
    const foundProductRes = await api.get(
      `/plugin/my-product-id?permalink=${permalink}`
    );

    // Once the product is found, we can get the product id and finally get the product
    const productId = foundProductRes.data.id;
    const productParsedUrl = `/plugin/product/${productId}`;

    const { data: product } = await api.get<Product>(productParsedUrl);
    return product;
  } catch (err) {
    return { message: "Product not found", status: 404 };
  }
}
