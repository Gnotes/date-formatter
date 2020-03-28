import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import banner from "bannerjs";

import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "core/index.min.js",
        format: "umd",
        name: "formatter",
        banner: banner.onebanner(),
      },
    ],

    plugins: [
      typescript({
        clean: true,
        rollupCommonJSResolveHack: true,
        exclude: ["*.d.ts", "**/*.d.ts"],
      }),
      terser({
        include: [/^.+\.min\.js$/],
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.cjs,
        format: "cjs",
        name: "formatter",
        banner: banner.multibanner(),
        // sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
        name: "formatter",
        banner: banner.multibanner(),
        // sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      typescript({
        clean: true,
        rollupCommonJSResolveHack: true,
        exclude: ["*.d.ts", "**/*.d.ts"],
      }),
      commonjs(),
    ],
  },
];
