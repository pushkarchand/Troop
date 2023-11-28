import { User } from './user';

export type CreatePayload = {
  name: string;
  description: string;
};

export type ProjectResponse = CreatePayload & {
  _id: string;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  sections: Section[];
  localId: string;
  createdAt: string;
  updatedAt: string;
};

export type Section = {
  _id: string;
  name: string;
  description: string;
  projectId: string;
  pages: any[];
  localId: string;
  createdAt: string;
  updatedAt: string;
};

export type Page = {
  _id: string;
  name: string;
  description: string;
  user: User;
  sectionId: String;
  subPages: SubPage[];
  localId: string;
  createdAt: string;
  updatedAt: string;
};

export type SubPage = {
  _id: string;
  name: string;
  pageId: string;
  localId: string;
  createdAt: string;
  updatedAt: string;
};
