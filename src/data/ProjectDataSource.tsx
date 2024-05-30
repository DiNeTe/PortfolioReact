import { Project } from "./Project.tsx";
// définit un contrat et sert d'abstraction pour gérer la source des donnée
export interface AccomodationDataSource {
  fetchMany(): Promise<Project[]>;
  fetchOne(projectId: string): Promise<Project | undefined>;}