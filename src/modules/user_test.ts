import { assertEquals } from "@std/assert";
import { Cookie, setCookie } from "@std/http/cookie";
import { sendUser, type SizebayProfile, SizebayBodyShapes } from "./user.ts";
import parseBodyShape from "../utils/parse-body-shape.ts";

const USER: SizebayProfile = {
  height: 190,
  weight: 91,
  age: 27,
  gender: "m",
  bodyShapeChest: parseBodyShape(SizebayBodyShapes.Normal),
  bodyShapeWaist: parseBodyShape(SizebayBodyShapes.Normal),
  bodyShapeHip: parseBodyShape(SizebayBodyShapes.Normal),
};

Deno.test("setUser", async () => {
  // We need to mock the SID cookie to get the product.
  const headers = new Headers();
  const sid: Cookie = { name: "sid", value: "michaeljackson" };

  setCookie(headers, sid);

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
