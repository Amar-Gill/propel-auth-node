import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import peerDepsExternal from "rollup-plugin-peer-deps-external"

const packageJson = require("./package.json")

const extensions = [".js", ".ts"]

const globals = {
    ...packageJson.devDependencies,
}

export default {
    input: "src/index.ts",
    output: {
        exports: "named",
        format: "es",
        file: "dist/index.mjs",
        sourcemap: true,
    },
    plugins: [
        peerDepsExternal(),
        resolve({
            extensions,
            exportConditions: ["browser", "worker"],
            browser: true,
        }),
        commonjs(),
        typescript(),
    ],
    external: Object.keys(globals),
}
