// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3, { resolve as resolve3 } from "path";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// utils/manifest-parser/index.ts
var ManifestParser = class {
  constructor() {
  }
  static convertManifestToString(manifest2) {
    return JSON.stringify(manifest2, null, 2);
  }
};
var manifest_parser_default = ManifestParser;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname = "/Users/sebastian/web/hook-createor/utils/plugins";
var { resolve } = path;
var outDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function makeManifest(manifest2) {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, "manifest.json");
      fs.writeFileSync(
        manifestPath,
        manifest_parser_default.convertManifestToString(manifest2)
      );
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// utils/plugins/custom-dynamic-import.ts
function customDynamicImport() {
  return {
    name: "custom-dynamic-import",
    renderDynamicImport() {
      return {
        left: `
        {
          const dynamicImport = (path) => import(path);
          dynamicImport(
          `,
        right: ")}"
      };
    }
  };
}

// utils/plugins/add-hmr.ts
import * as path2 from "path";
import { readFileSync } from "fs";
var __vite_injected_original_dirname2 = "/Users/sebastian/web/hook-createor/utils/plugins";
var isDev = process.env.__DEV__ === "true";
var DUMMY_CODE = `export default function(){};`;
function getInjectionCode(fileName) {
  return readFileSync(
    path2.resolve(__vite_injected_original_dirname2, "..", "reload", "injections", fileName),
    { encoding: "utf8" }
  );
}
function addHmr(config) {
  const { background = false, view = true } = config || {};
  const idInBackgroundScript = "virtual:reload-on-update-in-background-script";
  const idInView = "virtual:reload-on-update-in-view";
  const scriptHmrCode = isDev ? getInjectionCode("script.js") : DUMMY_CODE;
  const viewHmrCode = isDev ? getInjectionCode("view.js") : DUMMY_CODE;
  return {
    name: "add-hmr",
    resolveId(id) {
      if (id === idInBackgroundScript || id === idInView) {
        return getResolvedId(id);
      }
    },
    load(id) {
      if (id === getResolvedId(idInBackgroundScript)) {
        return background ? scriptHmrCode : DUMMY_CODE;
      }
      if (id === getResolvedId(idInView)) {
        return view ? viewHmrCode : DUMMY_CODE;
      }
    }
  };
}
function getResolvedId(id) {
  return "\0" + id;
}

// package.json
var package_default = {
  name: "chrome-extension-hook-creator",
  version: "0.0.1",
  description: "Chrome extension to send data via webhook in a specific format",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/SebastianWesolowski/chrome-extension-hook-creator.git"
  },
  scripts: {
    build: "tsc --noEmit && vite build",
    "build:hmr": "rollup --config utils/reload/rollup.config.ts",
    wss: "node utils/reload/initReloadServer.js",
    dev: "npm run build:hmr && (npm run wss & nodemon)",
    test: "jest"
  },
  type: "module",
  dependencies: {
    react: "18.2.0",
    "react-dom": "18.2.0"
  },
  devDependencies: {
    "@rollup/plugin-typescript": "^8.5.0",
    "@testing-library/react": "13.4.0",
    "@types/chrome": "0.0.197",
    "@types/jest": "29.0.3",
    "@types/node": "18.7.23",
    "@types/react": "18.0.21",
    "@types/react-dom": "18.0.6",
    "@types/ws": "^8.5.3",
    "@typescript-eslint/eslint-plugin": "5.38.1",
    "@typescript-eslint/parser": "5.38.1",
    "@vitejs/plugin-react": "2.1.0",
    autoprefixer: "^10.4.13",
    chokidar: "^3.5.3",
    eslint: "8.24.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-react": "7.31.8",
    "fs-extra": "10.1.0",
    jest: "29.0.3",
    "jest-environment-jsdom": "29.0.3",
    nodemon: "2.0.20",
    postcss: "^8.4.19",
    prettier: "2.7.1",
    rollup: "2.79.1",
    sass: "1.55.0",
    tailwindcss: "^3.2.4",
    "ts-jest": "29.0.2",
    "ts-loader": "9.4.1",
    typescript: "4.8.3",
    vite: "3.1.3",
    ws: "8.9.0"
  }
};

// manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.name,
  version: package_default.version,
  description: package_default.description,
  options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.js" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png"
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle.chunk.css"]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  permissions: ["storage"],
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-128.png",
        "icon-34.png"
      ],
      matches: ["*://*/*"]
    }
  ]
};
var manifest_default = manifest;

// vite.config.ts
var __vite_injected_original_dirname3 = "/Users/sebastian/web/hook-createor";
var root = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir2 = resolve3(__vite_injected_original_dirname3, "dist");
var publicDir = resolve3(__vite_injected_original_dirname3, "public");
var isDev2 = process.env.__DEV__ === "true";
var enableHmrInBackgroundScript = true;
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    makeManifest(manifest_default),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true })
  ],
  publicDir,
  build: {
    outDir: outDir2,
    sourcemap: isDev2,
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        content: resolve3(pagesDir, "content", "index.ts"),
        background: resolve3(pagesDir, "background", "index.ts"),
        contentStyle: resolve3(pagesDir, "content", "style.scss"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html")
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev2 ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path3.parse(assetInfo.name);
          const assetFolder = getLastElement(dir.split("/"));
          const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${name}.chunk.[ext]`;
        }
      }
    }
  }
});
function getLastElement(array) {
  const length = array.length;
  const lastIndex = length - 1;
  return array[lastIndex];
}
function firstUpperCase(str) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJ1dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHMiLCAidXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHMiLCAidXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzIiwgIm1hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NlYmFzdGlhbi93ZWIvaG9vay1jcmVhdGVvclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NlYmFzdGlhbi93ZWIvaG9vay1jcmVhdGVvci92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IG1ha2VNYW5pZmVzdCBmcm9tIFwiLi91dGlscy9wbHVnaW5zL21ha2UtbWFuaWZlc3RcIjtcbmltcG9ydCBjdXN0b21EeW5hbWljSW1wb3J0IGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvY3VzdG9tLWR5bmFtaWMtaW1wb3J0XCI7XG5pbXBvcnQgYWRkSG1yIGZyb20gXCIuL3V0aWxzL3BsdWdpbnMvYWRkLWhtclwiO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gXCIuL21hbmlmZXN0XCI7XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIik7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgXCJwYWdlc1wiKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpO1xuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljXCIpO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiO1xuXG4vLyBFTkFCTEUgSE1SIElOIEJBQ0tHUk9VTkQgU0NSSVBUXG5jb25zdCBlbmFibGVIbXJJbkJhY2tncm91bmRTY3JpcHQgPSB0cnVlO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQHNyY1wiOiByb290LFxuICAgICAgXCJAYXNzZXRzXCI6IGFzc2V0c0RpcixcbiAgICAgIFwiQHBhZ2VzXCI6IHBhZ2VzRGlyLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1ha2VNYW5pZmVzdChtYW5pZmVzdCksXG4gICAgY3VzdG9tRHluYW1pY0ltcG9ydCgpLFxuICAgIGFkZEhtcih7IGJhY2tncm91bmQ6IGVuYWJsZUhtckluQmFja2dyb3VuZFNjcmlwdCwgdmlldzogdHJ1ZSB9KSxcbiAgXSxcbiAgcHVibGljRGlyLFxuICBidWlsZDoge1xuICAgIG91dERpcixcbiAgICBzb3VyY2VtYXA6IGlzRGV2LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGRldnRvb2xzOiByZXNvbHZlKHBhZ2VzRGlyLCBcImRldnRvb2xzXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgcGFuZWw6IHJlc29sdmUocGFnZXNEaXIsIFwicGFuZWxcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCBcImNvbnRlbnRcIiwgXCJpbmRleC50c1wiKSxcbiAgICAgICAgYmFja2dyb3VuZDogcmVzb2x2ZShwYWdlc0RpciwgXCJiYWNrZ3JvdW5kXCIsIFwiaW5kZXgudHNcIiksXG4gICAgICAgIGNvbnRlbnRTdHlsZTogcmVzb2x2ZShwYWdlc0RpciwgXCJjb250ZW50XCIsIFwic3R5bGUuc2Nzc1wiKSxcbiAgICAgICAgcG9wdXA6IHJlc29sdmUocGFnZXNEaXIsIFwicG9wdXBcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICBuZXd0YWI6IHJlc29sdmUocGFnZXNEaXIsIFwibmV3dGFiXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgb3B0aW9uczogcmVzb2x2ZShwYWdlc0RpciwgXCJvcHRpb25zXCIsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IFwic3JjL3BhZ2VzL1tuYW1lXS9pbmRleC5qc1wiLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogaXNEZXZcbiAgICAgICAgICA/IFwiYXNzZXRzL2pzL1tuYW1lXS5qc1wiXG4gICAgICAgICAgOiBcImFzc2V0cy9qcy9bbmFtZV0uW2hhc2hdLmpzXCIsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBkaXIsIG5hbWU6IF9uYW1lIH0gPSBwYXRoLnBhcnNlKGFzc2V0SW5mby5uYW1lKTtcbiAgICAgICAgICBjb25zdCBhc3NldEZvbGRlciA9IGdldExhc3RFbGVtZW50KGRpci5zcGxpdChcIi9cIikpO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBhc3NldEZvbGRlciArIGZpcnN0VXBwZXJDYXNlKF9uYW1lKTtcbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy9bZXh0XS8ke25hbWV9LmNodW5rLltleHRdYDtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuXG5mdW5jdGlvbiBnZXRMYXN0RWxlbWVudDxUPihhcnJheTogQXJyYXlMaWtlPFQ+KTogVCB7XG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgY29uc3QgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGFycmF5W2xhc3RJbmRleF07XG59XG5cbmZ1bmN0aW9uIGZpcnN0VXBwZXJDYXNlKHN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IGZpcnN0QWxwaGFiZXQgPSBuZXcgUmVnRXhwKC8oIHxeKVthLXpdLywgXCJnXCIpO1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZShmaXJzdEFscGhhYmV0LCAoTCkgPT4gTC50b1VwcGVyQ2FzZSgpKTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NlYmFzdGlhbi93ZWIvaG9vay1jcmVhdGVvci91dGlscy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGNvbG9yTG9nIGZyb20gXCIuLi9sb2dcIjtcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgTWFuaWZlc3RQYXJzZXIgZnJvbSBcIi4uL21hbmlmZXN0LXBhcnNlclwiO1xuXG5jb25zdCB7IHJlc29sdmUgfSA9IHBhdGg7XG5cbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwiLi5cIiwgXCJwdWJsaWNcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VNYW5pZmVzdChcbiAgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjNcbik6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJtYWtlLW1hbmlmZXN0XCIsXG4gICAgYnVpbGRFbmQoKSB7XG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMob3V0RGlyKSkge1xuICAgICAgICBmcy5ta2RpclN5bmMob3V0RGlyKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFuaWZlc3RQYXRoID0gcmVzb2x2ZShvdXREaXIsIFwibWFuaWZlc3QuanNvblwiKTtcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyhcbiAgICAgICAgbWFuaWZlc3RQYXRoLFxuICAgICAgICBNYW5pZmVzdFBhcnNlci5jb252ZXJ0TWFuaWZlc3RUb1N0cmluZyhtYW5pZmVzdClcbiAgICAgICk7XG5cbiAgICAgIGNvbG9yTG9nKGBNYW5pZmVzdCBmaWxlIGNvcHkgY29tcGxldGU6ICR7bWFuaWZlc3RQYXRofWAsIFwic3VjY2Vzc1wiKTtcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3V0aWxzL2xvZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3V0aWxzL2xvZy50c1wiO3R5cGUgQ29sb3JUeXBlID0gXCJzdWNjZXNzXCIgfCBcImluZm9cIiB8IFwiZXJyb3JcIiB8IFwid2FybmluZ1wiIHwga2V5b2YgdHlwZW9mIENPTE9SUztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JMb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogQ29sb3JUeXBlKSB7XG4gIGxldCBjb2xvcjogc3RyaW5nID0gdHlwZSB8fCBDT0xPUlMuRmdCbGFjaztcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwic3VjY2Vzc1wiOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdHcmVlbjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJpbmZvXCI6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiZXJyb3JcIjpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnUmVkO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIndhcm5pbmdcIjpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnWWVsbG93O1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBjb25zb2xlLmxvZyhjb2xvciwgbWVzc2FnZSk7XG59XG5cbmNvbnN0IENPTE9SUyA9IHtcbiAgUmVzZXQ6IFwiXFx4MWJbMG1cIixcbiAgQnJpZ2h0OiBcIlxceDFiWzFtXCIsXG4gIERpbTogXCJcXHgxYlsybVwiLFxuICBVbmRlcnNjb3JlOiBcIlxceDFiWzRtXCIsXG4gIEJsaW5rOiBcIlxceDFiWzVtXCIsXG4gIFJldmVyc2U6IFwiXFx4MWJbN21cIixcbiAgSGlkZGVuOiBcIlxceDFiWzhtXCIsXG4gIEZnQmxhY2s6IFwiXFx4MWJbMzBtXCIsXG4gIEZnUmVkOiBcIlxceDFiWzMxbVwiLFxuICBGZ0dyZWVuOiBcIlxceDFiWzMybVwiLFxuICBGZ1llbGxvdzogXCJcXHgxYlszM21cIixcbiAgRmdCbHVlOiBcIlxceDFiWzM0bVwiLFxuICBGZ01hZ2VudGE6IFwiXFx4MWJbMzVtXCIsXG4gIEZnQ3lhbjogXCJcXHgxYlszNm1cIixcbiAgRmdXaGl0ZTogXCJcXHgxYlszN21cIixcbiAgQmdCbGFjazogXCJcXHgxYls0MG1cIixcbiAgQmdSZWQ6IFwiXFx4MWJbNDFtXCIsXG4gIEJnR3JlZW46IFwiXFx4MWJbNDJtXCIsXG4gIEJnWWVsbG93OiBcIlxceDFiWzQzbVwiLFxuICBCZ0JsdWU6IFwiXFx4MWJbNDRtXCIsXG4gIEJnTWFnZW50YTogXCJcXHgxYls0NW1cIixcbiAgQmdDeWFuOiBcIlxceDFiWzQ2bVwiLFxuICBCZ1doaXRlOiBcIlxceDFiWzQ3bVwiLFxufSBhcyBjb25zdDtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NlYmFzdGlhbi93ZWIvaG9vay1jcmVhdGVvci91dGlscy9tYW5pZmVzdC1wYXJzZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zZWJhc3RpYW4vd2ViL2hvb2stY3JlYXRlb3IvdXRpbHMvbWFuaWZlc3QtcGFyc2VyL2luZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zZWJhc3RpYW4vd2ViL2hvb2stY3JlYXRlb3IvdXRpbHMvbWFuaWZlc3QtcGFyc2VyL2luZGV4LnRzXCI7dHlwZSBNYW5pZmVzdCA9IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjM7XG5cbmNsYXNzIE1hbmlmZXN0UGFyc2VyIHtcbiAgLyoqIFNJTkdMRVRPTiAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxuXG4gIHN0YXRpYyBjb252ZXJ0TWFuaWZlc3RUb1N0cmluZyhtYW5pZmVzdDogTWFuaWZlc3QpOiBzdHJpbmcge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShtYW5pZmVzdCwgbnVsbCwgMik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFuaWZlc3RQYXJzZXI7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zZWJhc3RpYW4vd2ViL2hvb2stY3JlYXRlb3IvdXRpbHMvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NlYmFzdGlhbi93ZWIvaG9vay1jcmVhdGVvci91dGlscy9wbHVnaW5zL2N1c3RvbS1keW5hbWljLWltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3V0aWxzL3BsdWdpbnMvY3VzdG9tLWR5bmFtaWMtaW1wb3J0LnRzXCI7aW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3VzdG9tRHluYW1pY0ltcG9ydCgpOiBQbHVnaW5PcHRpb24ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiY3VzdG9tLWR5bmFtaWMtaW1wb3J0XCIsXG4gICAgcmVuZGVyRHluYW1pY0ltcG9ydCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IGBcbiAgICAgICAge1xuICAgICAgICAgIGNvbnN0IGR5bmFtaWNJbXBvcnQgPSAocGF0aCkgPT4gaW1wb3J0KHBhdGgpO1xuICAgICAgICAgIGR5bmFtaWNJbXBvcnQoXG4gICAgICAgICAgYCxcbiAgICAgICAgcmlnaHQ6IFwiKX1cIixcbiAgICAgIH07XG4gICAgfSxcbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NlYmFzdGlhbi93ZWIvaG9vay1jcmVhdGVvci91dGlscy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3V0aWxzL3BsdWdpbnMvYWRkLWhtci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2ViYXN0aWFuL3dlYi9ob29rLWNyZWF0ZW9yL3V0aWxzL3BsdWdpbnMvYWRkLWhtci50c1wiO2ltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwiZnNcIjtcblxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSBcInRydWVcIjtcblxuY29uc3QgRFVNTVlfQ09ERSA9IGBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpe307YDtcblxuZnVuY3Rpb24gZ2V0SW5qZWN0aW9uQ29kZShmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJlYWRGaWxlU3luYyhcbiAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uXCIsIFwicmVsb2FkXCIsIFwiaW5qZWN0aW9uc1wiLCBmaWxlTmFtZSksXG4gICAgeyBlbmNvZGluZzogXCJ1dGY4XCIgfVxuICApO1xufVxuXG50eXBlIENvbmZpZyA9IHtcbiAgYmFja2dyb3VuZD86IGJvb2xlYW47XG4gIHZpZXc/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkSG1yKGNvbmZpZz86IENvbmZpZyk6IFBsdWdpbk9wdGlvbiB7XG4gIGNvbnN0IHsgYmFja2dyb3VuZCA9IGZhbHNlLCB2aWV3ID0gdHJ1ZSB9ID0gY29uZmlnIHx8IHt9O1xuICBjb25zdCBpZEluQmFja2dyb3VuZFNjcmlwdCA9IFwidmlydHVhbDpyZWxvYWQtb24tdXBkYXRlLWluLWJhY2tncm91bmQtc2NyaXB0XCI7XG4gIGNvbnN0IGlkSW5WaWV3ID0gXCJ2aXJ0dWFsOnJlbG9hZC1vbi11cGRhdGUtaW4tdmlld1wiO1xuXG4gIGNvbnN0IHNjcmlwdEhtckNvZGUgPSBpc0RldiA/IGdldEluamVjdGlvbkNvZGUoXCJzY3JpcHQuanNcIikgOiBEVU1NWV9DT0RFO1xuICBjb25zdCB2aWV3SG1yQ29kZSA9IGlzRGV2ID8gZ2V0SW5qZWN0aW9uQ29kZShcInZpZXcuanNcIikgOiBEVU1NWV9DT0RFO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJhZGQtaG1yXCIsXG4gICAgcmVzb2x2ZUlkKGlkKSB7XG4gICAgICBpZiAoaWQgPT09IGlkSW5CYWNrZ3JvdW5kU2NyaXB0IHx8IGlkID09PSBpZEluVmlldykge1xuICAgICAgICByZXR1cm4gZ2V0UmVzb2x2ZWRJZChpZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBsb2FkKGlkKSB7XG4gICAgICBpZiAoaWQgPT09IGdldFJlc29sdmVkSWQoaWRJbkJhY2tncm91bmRTY3JpcHQpKSB7XG4gICAgICAgIHJldHVybiBiYWNrZ3JvdW5kID8gc2NyaXB0SG1yQ29kZSA6IERVTU1ZX0NPREU7XG4gICAgICB9XG5cbiAgICAgIGlmIChpZCA9PT0gZ2V0UmVzb2x2ZWRJZChpZEluVmlldykpIHtcbiAgICAgICAgcmV0dXJuIHZpZXcgPyB2aWV3SG1yQ29kZSA6IERVTU1ZX0NPREU7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVzb2x2ZWRJZChpZDogc3RyaW5nKSB7XG4gIHJldHVybiBcIlxcMFwiICsgaWQ7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zZWJhc3RpYW4vd2ViL2hvb2stY3JlYXRlb3JcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zZWJhc3RpYW4vd2ViL2hvb2stY3JlYXRlb3IvbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3NlYmFzdGlhbi93ZWIvaG9vay1jcmVhdGVvci9tYW5pZmVzdC50c1wiO2ltcG9ydCBwYWNrYWdlSnNvbiBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcblxuY29uc3QgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMgPSB7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IHBhY2thZ2VKc29uLm5hbWUsXG4gIHZlcnNpb246IHBhY2thZ2VKc29uLnZlcnNpb24sXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcbiAgb3B0aW9uc19wYWdlOiBcInNyYy9wYWdlcy9vcHRpb25zL2luZGV4Lmh0bWxcIixcbiAgYmFja2dyb3VuZDogeyBzZXJ2aWNlX3dvcmtlcjogXCJzcmMvcGFnZXMvYmFja2dyb3VuZC9pbmRleC5qc1wiIH0sXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcbiAgICBkZWZhdWx0X2ljb246IFwiaWNvbi0zNC5wbmdcIixcbiAgfSxcbiAgY2hyb21lX3VybF9vdmVycmlkZXM6IHtcbiAgICBuZXd0YWI6IFwic3JjL3BhZ2VzL25ld3RhYi9pbmRleC5odG1sXCIsXG4gIH0sXG4gIGljb25zOiB7XG4gICAgXCIxMjhcIjogXCJpY29uLTEyOC5wbmdcIixcbiAgfSxcbiAgY29udGVudF9zY3JpcHRzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogW1wiaHR0cDovLyovKlwiLCBcImh0dHBzOi8vKi8qXCIsIFwiPGFsbF91cmxzPlwiXSxcbiAgICAgIGpzOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC5qc1wiXSxcbiAgICAgIGNzczogW1wiYXNzZXRzL2Nzcy9jb250ZW50U3R5bGUuY2h1bmsuY3NzXCJdLFxuICAgIH0sXG4gIF0sXG4gIGRldnRvb2xzX3BhZ2U6IFwic3JjL3BhZ2VzL2RldnRvb2xzL2luZGV4Lmh0bWxcIixcbiAgcGVybWlzc2lvbnM6IFtcInN0b3JhZ2VcIl0sXG4gIHdlYl9hY2Nlc3NpYmxlX3Jlc291cmNlczogW1xuICAgIHtcbiAgICAgIHJlc291cmNlczogW1xuICAgICAgICBcImFzc2V0cy9qcy8qLmpzXCIsXG4gICAgICAgIFwiYXNzZXRzL2Nzcy8qLmNzc1wiLFxuICAgICAgICBcImljb24tMTI4LnBuZ1wiLFxuICAgICAgICBcImljb24tMzQucG5nXCIsXG4gICAgICBdLFxuICAgICAgbWF0Y2hlczogW1wiKjovLyovKlwiXSxcbiAgICB9LFxuICBdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbWFuaWZlc3Q7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdSLFNBQVMsb0JBQW9CO0FBQ3JULE9BQU8sV0FBVztBQUNsQixPQUFPQSxTQUFRLFdBQUFDLGdCQUFlOzs7QUNGd1MsWUFBWSxRQUFRO0FBQzFWLFlBQVksVUFBVTs7O0FDQ1AsU0FBUixTQUEwQixTQUFpQixNQUFrQjtBQUNsRSxNQUFJLFFBQWdCLFFBQVEsT0FBTztBQUVuQyxVQUFRLE1BQU07QUFBQSxJQUNaLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLElBQ0YsS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsSUFDRixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLEVBQ0o7QUFFQSxVQUFRLElBQUksT0FBTyxPQUFPO0FBQzVCO0FBRUEsSUFBTSxTQUFTO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsRUFDTCxZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEs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LENBQUM7QUFBQSxFQUNoRTtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQUFEO0FBQUEsSUFDQSxXQUFXQztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsVUFBVUgsU0FBUSxVQUFVLFlBQVksWUFBWTtBQUFBLFFBQ3BELE9BQU9BLFNBQVEsVUFBVSxTQUFTLFlBQVk7QUFBQSxRQUM5QyxTQUFTQSxTQUFRLFVBQVUsV0FBVyxVQUFVO0FBQUEsUUFDaEQsWUFBWUEsU0FBUSxVQUFVLGNBQWMsVUFBVTtBQUFBLFFBQ3RELGNBQWNBLFNBQVEsVUFBVSxXQUFXLFlBQVk7QUFBQSxRQUN2RCxPQUFPQSxTQUFRLFVBQVUsU0FBUyxZQUFZO0FBQUEsUUFDOUMsUUFBUUEsU0FBUSxVQUFVLFVBQVUsWUFBWTtBQUFBLFFBQ2hELFNBQVNBLFNBQVEsVUFBVSxXQUFXLFlBQVk7QUFBQSxNQUNwRDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCRyxTQUNaLHdCQUNBO0FBQUEsUUFDSixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGdCQUFNLEVBQUUsS0FBSyxNQUFNLE1BQU0sSUFBSUMsTUFBSyxNQUFNLFVBQVUsSUFBSTtBQUN0RCxnQkFBTSxjQUFjLGVBQWUsSUFBSSxNQUFNLEdBQUcsQ0FBQztBQUNqRCxnQkFBTSxPQUFPLGNBQWMsZUFBZSxLQUFLO0FBQy9DLGlCQUFPLGdCQUFnQjtBQUFBLFFBQ3pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQztBQUVELFNBQVMsZUFBa0IsT0FBd0I7QUFDakQsUUFBTSxTQUFTLE1BQU07QUFDckIsUUFBTSxZQUFZLFNBQVM7QUFDM0IsU0FBTyxNQUFNO0FBQ2Y7QUFFQSxTQUFTLGVBQWUsS0FBYTtBQUNuQyxRQUFNLGdCQUFnQixJQUFJLE9BQU8sY0FBYyxHQUFHO0FBQ2xELFNBQU8sSUFBSSxZQUFZLEVBQUUsUUFBUSxlQUFlLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQztBQUN4RTsiLAogICJuYW1lcyI6IFsicGF0aCIsICJyZXNvbHZlIiwgIm1hbmlmZXN0IiwgIm1hbmlmZXN0IiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUiLCAicmVzb2x2ZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJvdXREaXIiLCAiaXNEZXYiLCAicGF0aCJdCn0K
