import App from "./App";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"

import blogReducer from "./reducers/blogReducer"
import { createStore } from "redux";

const store = createStore(blogReducer)

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
