import { assertEquals } from "@std/assert";
import { init } from "../sizebay.ts";

import {
  cart,
  open,
  order,
  type SizebayCart,
  type SizebayOrder,
} from "./events.ts";

const REFERER = "https://store.sizebay.com";
const PERMALINK =
  "https://store.sizebay.com/products/nylon-bomber-jacket-in-stone";

const CART = {
  tenantId: 1039,
  products: [
    {
      permalink: PERMALINK,
    },
  ],
} as SizebayCart;

const ORDER = {
  tenantId: 1039,
  currency: "BRL",
  orderId: "123456789",
  items: [
    {
      permalink: PERMALINK,
      price: 70,
      quantity: 1,
      size: "L",
      feedProductId: null,
      sku: "123456789",
    },
  ],
} as SizebayOrder;

Deno.test("open", async () => {
  await init({ tenantId: 1039 });
  await open(PERMALINK, REFERER);

  const listenerEvent = "message" as keyof WindowEventMap;
  window.addEventListener(listenerEvent, (event) => {
    if (event instanceof MessageEvent) {
      assertEquals(event.data, "szb:opened");
    }
  });
});

Deno.test("cart", async () => {
  await init({ tenantId: 1039 });
  await cart(CART, REFERER);

  const listenerEvent = "message" as keyof WindowEventMap;
  window.addEventListener(listenerEvent, (event) => {
    if (event instanceof MessageEvent) {
      assertEquals(event.data, "szb:add-to-cart");
    }
  });
});

Deno.test("order", async () => {
  await init({ tenantId: 1039 });
  await order(ORDER);

  const listenerEvent = "message" as keyof WindowEventMap;
  window.addEventListener(listenerEvent, (event) => {
    if (event instanceof MessageEvent) {
      assertEquals(event.data, "szb:ordered");
    }
  });
});
