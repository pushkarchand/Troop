export type Project = {
  name: string;
  description: string;
};

export type ProjectResponse = Project & {
  _id: string;
};
