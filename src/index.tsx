import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Root } from "./components/routes";
import { AuthContextProvider } from "./contexts/auth/AuthContext";
import { FriendsContextProvider } from "./contexts/friends/FriendsContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <FriendsContextProvider>
        <Layout>
          <Root />
        </Layout>
      </FriendsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
