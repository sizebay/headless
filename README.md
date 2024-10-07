# @sizebay/headless
Sizebay Headless Package. The concept of Headless indicates that all the availability of the Virtual Fitting Room will be concentrated only in the methods and calls to Sizebay services, while the client/developer will be responsible for the layout.

# Installation
```sh
  npm i @sizebay/headless # for NPM
  yarn add @sizebay/headless # for Yarn
  pnpm i @sizebay/headless # for PNPM
  bun add @sizebay/headless # for Bun
```

# API
### `getProduct(permalink: string): SizebayProduct`

## Type

```ts
interface SizebayProduct {
  ageGroup: string
  categoryName: string
  clothesType: string
  coverImage: string
  feedProductId: string
  genderTheWearWasDesignedFor: string
  id: number
  isShoe: boolean
  isShoeAccessory: boolean
  measures: MeasuresList
  modelingName: string
  name: string
  permalink: string
  sizeType: string
}
```

## Example
```tsx
import Sizebay, { type SizebayProduct } from "@sizebay/headless";
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

function useSizebayProduct(permalink: string) {
  const [product, setProduct] = useState<SizebayProduct | null>(null)

  useEffect(() => {
    (async () => {
      const szbProduct = await Sizebay.getProduct(permalink)

      if (szbProduct.ok) {
        setProduct(szbProduct)
      }
    })()

    return () => setProduct(null)
  }, [permalink])

  return product
}

export default function Page() {
  const router = useRouter()
  const product = useSizebayProduct(router.query.permalink)

  return <span>{product?.genderTheWearWasDesignedFor}</span>
}
```

### `createUser(payload: SizebayUser)`

## Type

```ts
enum BodyShapes {
  Loose = 5,
  Slighter = 4,
  Normal = 3,
  Tight = 2,
  Tighter = 1,
}

interface SizebayUser {
  height: number;
  weight: number;
  age: number;
  gender: 'f' | 'm' | 'u'
  bodyShapeChest: BodyShapes
  bodyShapeWaist: BodyShapes
  bodyShapeHip: BodyShapes
}
```

## Example
```tsx
import Sizebay from "@sizebay/headless";

function YourComponent() {
  function createSizebayUser(payload) {
    Sizebay.createUser(payload);
  }

  return <SomethingElse onClick={createSizebayUser} />
}
```

### `updateUser(payload: SizebayUser)`

## Type

```ts
enum BodyShapes {
  Loose = 5,
  Slighter = 4,
  Normal = 3,
  Tight = 2,
  Tighter = 1,
}

interface SizebayUser {
  height: number;
  weight: number;
  age: number;
  gender: 'f' | 'm' | 'u'
  bodyShapeChest: BodyShapes
  bodyShapeWaist: BodyShapes
  bodyShapeHip: BodyShapes
}
```

## Example
```tsx
import Sizebay from "@sizebay/headless";

function YourComponent() {
  function updateSizebayUser(newPayload) {
    Sizebay.updateUser(newPayload);
  }

  return <SomethingElse onClick={updateSizebayUser} />
}
```

### `getRecommendation(): SizebayRecommendation`

## Type

```ts
interface Analysis {
  [key: SizeName]: MeasuresList & {
    suitable: boolean
    rate: number
  }
}

interface SizebayRecommendation {
  analysis: Analysis
  recommendedSize: string
  recommendedForProfile: string
}
```

## Example
```tsx
import Sizebay from "@sizebay/headless";

function Page() {
  const sizebayRecommendation = Sizebay.getRecommendation()

  return (
    <span>{sizebayRecommendation.recommendedSize}</span>
  )
}
```

### `events.order(payload: SizebayOrder)`
### `events.cart(payload: SizebayCart)`

## Type

```ts
interface SizebayOrder {
  country: string // Country running plugin (ex: BR, US, MX, DE)
  device: "DESKTOP" | "MOBILE" | "TABLET" | "APP"
  tenantId: number // Contact Sizebay to retrieve your tenantId.
  referer: string // The domain of your store.
  payload: {
    products: { tenantId: string, products: string[], permalink: string }[]
  }
}

interface SizebayCart {
  country: string // Country running plugin (ex: BR, US, MX, DE)
  device: "DESKTOP" | "MOBILE" | "TABLET" | "APP"
  tenantId: number // Contact Sizebay to retrieve your tenantId.
  referer: string // The domain of your store.
  payload: {
    orderId: string // Must be filled in with the order code generated as soon as the purchase is made. It is with this information that we will be able to track this shopping experience in case of a future exchanged/returned product.
   items: {
    permalink: string // Product URL. It must be the same used in the shopping cart 
    price: number // Product price (e.g 70)
    quantity: number // How many items were bought (e.g 4)
    size: string // Which size was selected (e.g XL | GG) 
    sku: string // Your SKU
   }[]
  }
}

```

## Example
```tsx
import Sizebay from "@sizebay/headless";

function YourComponent() {
  function createSizebayEvent(event, payload) {
	Sizebay.events[event](payload)
  }

  return <SomethingElse onClick={createSizebayEvent} />
}
```


# Bug Reporting
If you found any issues during the integration of this lib, you can open an issue for it [here](https://github.com/sizebay/headless/issues)

# Roadmap
You can check the details on what is being worked [here](https://github.com/sizebay/headless/issues)


# Recommended Module Order
1. `getProduct`: first, fetch the product data to check if the Virtual Fitting Room is compatible with that session.
2. `createUser`: creates the user based on the data provided in the UI. You don't need to fetch the user again, as this method's return already includes the updated signature.
3. `getRecommendation`: returns the recommendation based on the active user profile.
4. `updateUser`: if the user changes measurements, gender, or body shape data. You don't need to fetch the user again, as this method's return already includes the updated signature.

# Best Practices
1. Always use the assisted types from the library (e.g., import { type SizebayProduct } from '@sizebay/headless') to keep your object signatures consistent.
2. If custom hooks are created around these methods, remember to use useMemo and useCallback correctly to avoid memory drains and excessive computing.
3. Remember that the headless package offers no UI. The aim is to expand the integration of Sizebay with any platform interested in integrating our systems and recommendation algorithm.
4. If you plan to perform stress testing with the library or its resources, contact Sizebay beforehand and share the scheduling of this stress test so we can monitor the metrics on our side.
