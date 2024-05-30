import { createContext, useContext } from "react";
import { AppDependencies } from "./dependencies";

// utilise les dépendances définies dans dependencies.ts
export const AppDependenciesContext = createContext<AppDependencies | null>(
  null
);

// utilisé pour gérer et injecter les dépendances dans les composants
export const useAppDependencies = () => {
  const context = useContext(AppDependenciesContext);

  if (!context) {
    throw new Error(
      "useAppDependencies must be used within a AppDependenciesContext"
    );
  }

  return context;
};
