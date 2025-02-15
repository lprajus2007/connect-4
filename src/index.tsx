import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import routes from "./routes";

import "@assets/styles/index.scss";

const router = createBrowserRouter(routes);

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <App>
    <RouterProvider router={router} fallbackElement={null} />
  </App>
);
