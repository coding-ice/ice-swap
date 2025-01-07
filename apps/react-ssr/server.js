import express, { json } from "express";
import { renderToString } from "react-dom/server";
import path from "path";
import fs from "fs";

const app = express();

// 1. 手动返回字符串给浏览器解析
// app.get("/", (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>React SSR</title>
//       </head>
//       <body>
//         <div id="root">
//           <h1>Hello World</h1>
//         </div>
//       </body>
//     </html>
//   `);
// });

// 2. 使用 react-dom/server 返回字符串给浏览器解析，但是没有水合，也就是没有事件绑定
// const content = renderToString(<App />);
// app.get("/", (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>React SSR</title>
//       </head>
//       <body>
//         <div id="root">
//           ${content}
//         </div>
//       </body>
//     </html>
//   `);
// });

// 3. 最终渲染
// const content = renderToString(<App />);
// app.use(express.static("public"));
// app.get("/", async (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>React SSR</title>
//       </head>
//       <body>
//         <div id="root">
//           ${content}
//         </div>
//         <script src="/index.js"></script>
//       </body>
//     </html>
//   `);
// });

// 4. 使用 getServerSideProps 获取数据, __INITIAL_DATA__ -> 需要给客户端注入相同的数据
// app.get("/", async (req, res) => {
//   const file = await import("./pages/cat.js");
//   let propsObj = {};
//   if (file.getServerSideProps) {
//     const { props } = await file.getServerSideProps();
//     propsObj = props;
//   }

//   const Component = file.default;
//   const content = renderToString(<Component {...propsObj} />);

//   res.send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>React SSR</title>
//       </head>
//       <body>
//         <div id="root">${content}</div>
//         <script>window.__INITIAL_DATA__ = ${JSON.stringify(propsObj)}</script>
//         <script src="/index.js" />
//       </body>
//     </html>
//   `);
// });

// 5. 利用文件系统实现路由的切换，渲染对应的组建
app.use(express.static("public"));

const pagesDir = path.join(process.cwd() + "/pages");
const pages = fs.readdirSync(pagesDir).map((page) => page.replace(".js", ""));

app.get(/.*/, async (req, res) => {
  const path = req.path.replace("/", "");
  const page = path ? path : "index";

  if (pages.includes(page)) {
    const file = await import(`./pages/${page}.js`);
    const Component = file.default;
    let propsObj = {};

    if (file.getServerSideProps) {
      const { props } = await file.getServerSideProps();
      propsObj = props;
    }

    const content = renderToString(<Component {...propsObj} />);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>React SSR</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>window.__INITIAL_DATA__ = ${JSON.stringify({
            props: propsObj,
            page,
          })}</script>
          <script src="/index.client.js"></script>
        </body>
      </html>
    `);
  } else {
    res.send(`<h1>404</h1>`);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
