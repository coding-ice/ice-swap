import { existsSync, readdirSync, mkdirSync, writeFileSync } from "fs";
import { renderToString } from "react-dom/server";
import React, { createElement } from "react";
import { join } from "path";

const pagesDir = join(process.cwd(), "/pages");
const pages = readdirSync(pagesDir).map((page) => page.split(".")[0]);

if (!existsSync("output")) {
  mkdirSync("output");
}

pages.forEach(async (page) => {
  try {
    const file = await import(`./pages/${page}.js`);
    const Component = file.default;

    let propsObj = {};
    if (file.getServerSideProps) {
      const { props } = await file.getServerSideProps();
      propsObj = props;
    }

    const content = renderToString(createElement(Component, propsObj));

    writeFileSync(
      `output/${page}.html`,
      `    <html>
      <head>
          <title>Tiny React SSR</title>
      </head>
      <body>
       <div id='root'>${content}</div>
       <script>
         window.__INITIAL_DATA__ = ${JSON.stringify({
           props: propsObj,
           page: page,
         })}
       </script>
       <script src="../public/index.client.js"></script>
      </body>
   </html>`
    );
  } catch (e) {
    console.log(e);
  }
});
