import { ProjectDataSource as ProjectDataSource } from "./ProjectDataSource.tsx";
import data from "./projects.json";
import dataSkill from "./skills.json";

import { Project, Skill } from "./Interfaces.tsx";

const fakeProjectDataSource: ProjectDataSource = {
  async fetchMany(): Promise<Project[]> {
    return data;
  },

  async fetchOne(projectId: string): Promise<Project | undefined> {
    return data.find((project) => project.id === projectId);
  },

  async fetchManySkill(): Promise<Skill[]> {
    return dataSkill;
  },
};



export default fakeProjectDataSource;
