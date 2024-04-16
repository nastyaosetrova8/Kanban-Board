export interface GetIssuesThunkArgs {
  owner: string;
  repoName: string;
}

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

export type RepoInfoProp = {
  repoInfo: {
    html_url: string;
    clone_url: string;
    name: string;
    owner: {
      login: string;
      html_url: string;
    };
    stargazers_count: number;
  };
};

export type Props = {
  issues: Issue[];
  repoInfo: {
    html_url: string;
    clone_url: string;
    name: string;
    owner: {
      login: string;
      html_url: string;
    };
    stargazers_count: number;
  };
};
