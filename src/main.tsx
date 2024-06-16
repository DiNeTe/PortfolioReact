import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AppDependencies } from "./app/dependencies.ts";
import fakeProjectDataSource from "./data/fakeProjectDataSource.tsx";
import { AppDependenciesContext } from "./app/context.ts";

import App from "./App.tsx";

const appDependencies: AppDependencies = {
  projectDataSource: fakeProjectDataSource,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppDependenciesContext.Provider value={appDependencies}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppDependenciesContext.Provider>
  </React.StrictMode>
);
