import { ProjectDataSource } from "../data/ProjectDataSource";

// agit comme un contrat pour les dépendances, indique quelle dépendance et de quel type doit être fourni 
export type AppDependencies = {
  projectDataSource: ProjectDataSource;}