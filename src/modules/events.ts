import api from "../api/index.ts";

export async function cart(payload: SizebayCart, referer: string) {
  try {
    const sid = window.SizebaySDK.userId;
    const data = await api.post(`/plugin/new/cart?sid=${sid}`, payload, {
      headers: { referer },
    });

    if (data.status !== 404) {
      const eventMessage = new MessageEvent("szb:add-to-cart", {
        data: "szb:add-to-cart",
      });
      window.dispatchEvent(eventMessage);

      return;
    }
  } catch (_error) {
    console.log(_error);
  }
}

export async function order(payload: SizebayOrder) {
  try {
    const sid = window.SizebaySDK.userId;
    const data = await api.post(`/plugin/new/ordered?sid=${sid}`, payload);

    if (data.status !== 404) {
      const eventMessage = new MessageEvent("szb:ordered", {
        data: "szb:ordered",
      });

      window.dispatchEvent(eventMessage);

      return;
    }
  } catch (_error) {
    console.log(_error);
  }
}

export async function open(product: string, referer: string) {
  try {
    const sid = window.SizebaySDK.userId;
    const data = await api.get(`/plugin/opened?sid=${sid}&product=${product}`, {
      headers: { referer },
    });

    if (data.status !== 404) {
      const eventMessage = new MessageEvent("szb:opened", {
        data: "szb:opened",
      });

      window.dispatchEvent(eventMessage);

      return;
    }
  } catch (_error) {
    console.log(_error);
  }
}

export interface SizebayOrder {
  tenantId: number; // Contact Sizebay to retrieve your tenantId.
  currency: string;
  orderId: string; // Must be filled in with the order code generated as soon as the purchase is made. It is with this information that we will be able to track this shopping experience in case of a future exchanged/returned product.
  items: {
    permalink: string; // Product URL. It must be the same used in the shopping cart
    price: number; // Product price (e.g 70)
    quantity: number; // How many items were bought (e.g 4)
    size: string; // Which size was selected (e.g XL | GG)
    feedProductId: string | null;
    sku: string; // Your SKU
  }[];
}

export interface SizebayCart {
  tenantId: number; // Contact Sizebay to retrieve your tenantId.
  products: {
    permalink: string; // Product URL. It must be the same used in the shopping cart
  }[];
}
