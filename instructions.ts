import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/sizebay.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "@sizebay/headless",
    version: Deno.args[0],
    author: "Luiz Nickel <vaporwavie>",
    description:
      "SDK to interact with Sizebay API. Sizebay is a platform that helps fashion brands to reduce returns and increase sales by providing a size recommendation tool.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/sizebay/headless.git",
    },
    bugs: {
      url: "https://github.com/sizebay/headless/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
