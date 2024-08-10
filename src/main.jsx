import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="170361542626-memfm0l0djodrue17r3v9bfhh6k5l80q.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);
