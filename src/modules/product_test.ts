import { assertEquals, assert } from "@std/assert";
import { Cookie, setCookie } from "@std/http/cookie";
import getProduct, { Product } from "./product.ts";

const PERMALINK =
  "https://store.sizebay.com/products/nylon-bomber-jacket-in-stone";

Deno.test("getProduct", async () => {
  const product = await getProduct(PERMALINK);

  const p = product as Product;

  // We need to mock the SID cookie to get the product.
  const headers = new Headers();
  const sid: Cookie = { name: "sid", value: "michaeljackson" };

  setCookie(headers, sid);

  const baseProduct = {
    id: 6834318,
    ageGroup: "adult",
    name: "Nylon Bomber Jacket in Stone",
    permalink:
      "https://store.sizebay.com/products/nylon-bomber-jacket-in-stone",
    genderTheWearWasDesignedFor: "M",
    feedProductId: null,
    coverImage:
      "https://cdn.shopify.com/s/files/1/0458/5524/4439/products/foto-05_740x.png?v=1601062306",
    isShoe: false,
    isShoeAccessory: undefined,
    categoryName: "SUPERIOR",
    modelingName: "TOPS E RTW  (M) - 7FAM",
    clothesType: "TOP",
    sizeType: null,
  };

  const foundProduct = {
    id: p.id,
    ageGroup: p.ageGroup,
    name: p.name,
    permalink: p.permalink,
    genderTheWearWasDesignedFor: p.genderTheWearWasDesignedFor,
    feedProductId: p.feedProductId,
    coverImage: p.coverImage,
    isShoe: p.isShoe,
    isShoeAccessory: p.isShoeAccessory,
    categoryName: p.categoryName,
    modelingName: p.modelingName,
    clothesType: p.clothesType,
    sizeType: p.sizeType,
  };

  assertEquals(foundProduct, baseProduct);

  const productNotFound = await getProduct("product-not-found");

  assertEquals(productNotFound, { message: "Product not found", status: 404 });
});
