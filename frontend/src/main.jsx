import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// <!DOCTYPE html>
// <html lang="en" class="dark">
//   <head>
//     <meta charset="UTF-8" />
//     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Vite + React</title>
//     <base href="." />
//     <link rel="stylesheet" type="text/css" href="output.css" />
//     <script type="module" crossorigin src="./assets/index-e6b84dc4.js"></script>
//     <link rel="stylesheet" type="text/css" href="./assets/index-d0688a0e.css" />
//   </head>
//   <body class="bg-white dark:bg-black">
//     <div id="root"></div>
//   </body>
// </html>
