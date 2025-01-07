import express from "express";
import { renderToString } from "react-dom/server";
import App from "./page/index";

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

// 3. 渲染两遍，第一次返回字符串，第二次返回水合后的内容， 服务端/客户端 各自一次
const content = renderToString(<App />);
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">
          ${content}
        </div>
        <script src="/index.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
