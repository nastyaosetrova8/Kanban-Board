// import { ListIssueType } from "./enums";

// export interface IssueModel {
//   id: string;
//   title: string;
//   text: string;
//   column: ListIssueType;
//   color: string;
// }

// export interface DragItem {
//   index: number;
//   id: IssueModel["id"];
//   from: ListIssueType;
// }

// -----------------------------------
// export type Status = "open" | "in progress" | "closed";

// export interface Data {
//   id: number;
//   comments: number;
//   status: Status;
// }
// -----------------------------------

export type Id = string | number;
export type columnId = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Issue = {
  id: Id;
  // columnId: Id;
  title: string;
  number: number;
  created_at: string;
  user: {
    login: string;
  };
  state: columnId;
  comments: number;
};
