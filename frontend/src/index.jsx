import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import leoProfanity from "leo-profanity";
import { Provider as RollbarProvider } from "@rollbar/react";
import React from "react";
import "./i18n.js";

leoProfanity.loadDictionary("en");
const ruWords = leoProfanity.getDictionary("ru");
leoProfanity.add(ruWords);

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: "production",
  captureUncaught: true,
  captureUnhandledRejections: true,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <RollbarProvider config={rollbarConfig}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </RollbarProvider>,
);
