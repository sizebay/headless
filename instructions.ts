import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./src/sizebay.ts"],
  outDir: "./npm",
  typeCheck: false,
  scriptModule: "umd",
  shims: {
    deno: true,
  },
  test: false,
  package: {
    name: "@sizebay/headless",
    private: false,
    version: Deno.args[0],
    description:
      "Sizebay Headless Package. The concept of Headless indicates that all the availability of the Virtual Fitting Room will be concentrated only in the methods and calls to Sizebay services, while the client/developer will be responsible for the layout.",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/sizebay/headless.git",
    },
    bugs: {
      url: "https://github.com/sizebay/headless/issues",
    },
    homepage: "https://github.com/sizebay/headless",
    keywords: [
      "sizebay",
      "virtual fitting room",
      "sizebay virtual fitting room",
      "sizebay fitting room",
      "sizebay head",
      "sizebay headless",
      "sizebay sdk",
      "sdk",
      "headless",
      "head",
    ],
  },
});
