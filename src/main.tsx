import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Importation des dépendances de l'application
import { AppDependencies } from "./app/dependencies.ts";
 // Source de données des projets et skills
import fakeProjectDataSource from "./data/fakeProjectDataSource.tsx";
// Contexte des dépendances de l'application
import { AppDependenciesContext } from "./app/context.ts";

import App from "./App.tsx";

// Enregistrer le Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Initialisation des dépendances de l'application
const appDependencies: AppDependencies = {
  projectDataSource: fakeProjectDataSource,
};

// Rendu de l'application React
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppDependenciesContext.Provider value={appDependencies}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppDependenciesContext.Provider>
  </React.StrictMode>
);
