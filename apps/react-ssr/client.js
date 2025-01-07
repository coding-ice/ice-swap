import { createRoot } from "react-dom/client";
import App from "./page/index";

// 1. 该方法会渲染两遍，第一次返回字符串，第二次返回水合后的内容， 服务端/客户端 各自一次
// const root = createRoot(document.getElementById("root"));
// root.render(<App />);

// 2. hydrateRoot水合，不会重新渲染
hydrateRoot(document.getElementById("root"), <App />);
