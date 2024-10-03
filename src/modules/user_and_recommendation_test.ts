import { assertEquals } from "@std/assert";
import { sendUser, type SizebayProfile, SizebayBodyShapes } from "./user.ts";
import getRecommendation, {
  type SizebayRecommendation,
} from "./recommendation.ts";
import parseBodyShape from "../utils/parse-body-shape.ts";
import init from "./init.ts";

const USER: SizebayProfile = {
  height: 190,
  weight: 91,
  age: 27,
  gender: "m",
  bodyShapeChest: parseBodyShape(SizebayBodyShapes.Normal),
  bodyShapeWaist: parseBodyShape(SizebayBodyShapes.Normal),
  bodyShapeHip: parseBodyShape(SizebayBodyShapes.Normal),
};

const EXPECTED_RECOMMENDED_SIZE = "L";

Deno.test("setUser", async () => {
  await init({ tenantId: 1039 });

  const user = await sendUser(USER);

  const foundUser = {
    height: user!.height,
    weight: user!.weight,
    age: user!.age,
    gender: user!.gender.toLowerCase(),
    bodyShapeChest: user!.bodyShapeChest,
    bodyShapeWaist: user!.bodyShapeWaist,
    bodyShapeHip: user!.bodyShapeHip,
  };

  assertEquals(foundUser, USER);
});

Deno.test("getRecommendation", async () => {
  const PRODUCT_ID = 6834318;
  const TENANT_ID = 1039;

  const recommendation = await getRecommendation(PRODUCT_ID, TENANT_ID);

  const r = recommendation as SizebayRecommendation;

  assertEquals(r.recommendedSize, EXPECTED_RECOMMENDED_SIZE);
});
