import { randomAlphanumericString } from "../utils/string.ts";

import { emptyDirSync, init, transform } from "../deps.ts";

await init();

const publicBuildPath = `./public/build`;
const htmlPath = `./src/public/index.html`;
const cssPath = `./src/public/styles/styles.css`;
const html = await Deno.readTextFile(htmlPath);
const css = await Deno.readTextFile(cssPath);

emptyDirSync(`${publicBuildPath}/styles`);

const randomHash = randomAlphanumericString(8);

const processedHtml = html.replace(
  "[GENERATED-CSS-STYLES]",
  `styles-${randomHash}`,
);

await Deno.writeTextFile(`${publicBuildPath}/index.html`, processedHtml);

const { code } = transform({
  filename: "styles.css",
  code: new TextEncoder().encode(css),
  minify: true,
});

const processedCss = new TextDecoder().decode(code);

await Deno.writeTextFile(
  `${publicBuildPath}/styles/styles-${randomHash}.css`,
  processedCss,
);
