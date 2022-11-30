/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import createVuePlugin from "@vitejs/plugin-vue2";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
function pathResolve(dir: string, isGlob = false) {
  return resolve(process.cwd(), ".", dir) + (isGlob ? "/" : "");
}

const utils = {
  pathResolve,
};
export default defineConfig(() => {
  return {
    logLevel: "info",
    resolve: {
      alias: {
        lodash: "lodash-es",
        "/src/*": utils.pathResolve("./src", true),
        "/src/": utils.pathResolve("./index.ts"),
        "@ant-design/icons/lib/dist": "@ant-design/icons/lib/index.es.js",
        "vue-demi": utils.pathResolve("./node_modules/vue-demi", true),
        "~ant-design-vue": utils.pathResolve("./node_modules/ant-design-vue"),
        "@yuyi919/vue-jsx-factory/jsx-runtime":
          "@yuyi919/vue-jsx-factory/jsx-runtime-es",
      },
    },
    root: utils.pathResolve("./playground"),
    build: {
      minify: false,
      sourcemap: true,
      target: "es2020",
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          declaration: true,
          jsx: "react-jsx",
          jsxImportSource: "@yuyi919/vue-jsx-factory",
          module: "esnext",
          target: "es2020",
          useDefineForClassFields: false,
        },
      },
    },
    plugins: [
      createVuePlugin({}),
      tsconfigPaths({}),
      // vitePluginImp({
      //   libList: [
      //     {
      //       libName: "ant-design-vue",
      //       libDirectory: "es",
      //       camel2DashComponentName: true,
      //       style: (name) => {
      //         return false; //`ant-design-vue/es/${name}/style`;
      //       },
      //     },
      //   ],
      // }) as any,
    ],
    optimizeDeps: {
      exclude: ["@yuyi919-vue/jss", "vue-demi"],
      include: ["tslib", "lodash-es", "vue", "ant-design-vue/es/style.js"],
    },
    css: {
      modules: {
        scopeBehaviour: "global",
        exportGlobals: true,
        localsConvention: "camelCaseOnly",
      },
      preprocessorOptions: {
        less: {
          modifyVars: {
            /* less 变量覆盖，用于自定义 ant design 主题 */
            /*
            'primary-color': '#F5222D',
            'link-color': '#F5222D',
            'border-radius-base': '40px',
            */
          },
          javascriptEnabled: true,
        },
      },
    },
  };
});
