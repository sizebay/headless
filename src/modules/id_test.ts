import { assertNotEquals } from "@std/assert";
import getUserId from "./id.ts";

Deno.test("getId", async () => {
  const id = await getUserId();

  assertNotEquals(id, "");
});
