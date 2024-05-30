import { ProjectDataSource as ProjectDataSource } from "./ProjectDataSource.tsx";
import data from "./projects.json";
import { Project } from "./Project.tsx";

const fakeProjectDataSource: ProjectDataSource = {
  async fetchMany(): Promise<Project[]> {
    return data;
  },

  async fetchOne(projectId: string): Promise<Project | undefined> {
    return data.find((project) => project.id === projectId);
  },

};

export default fakeProjectDataSource;