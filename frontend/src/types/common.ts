/* eslint-disable no-unused-vars */
export type Option = {
  label: string;
  value: Action;
};

export enum Action {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  COPY = 'COPY',
}
