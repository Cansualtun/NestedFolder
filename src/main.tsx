import { createRoot } from "react-dom/client";
import routes from "./routes/index.tsx";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
