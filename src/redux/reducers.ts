import { combineReducers } from "redux";

interface Issue {
  id: number;
  title: string;
  number: number;
  created_at: string;
  user: { login: string } | null;
  comments: number;
}

interface RootState {
  issues: Issue[];
  repoData:  RepoData | null;
  issuesToDo: Issue[];
  issuesInProgress: Issue[];
  issuesDone: Issue[];
}

interface RepoData {
  allow_forking: boolean;
  clone_url: string;
  description: string;
  forks: number;
  full_name: string;
  html_url: string;
  id: number;
  name: string;
  owner: {
    login: string;
    html_url: string;
  };
  stargazers_count: number;
  topics: string[];
}


const issuesReducer = (state: RootState["issues"] = [], action: any) => {
  switch (action.type) {
    case "SET_ISSUES":
      return action.payload.issues;

    default:
      return state;
  }
};

const repoDataReducer = (
  state: RootState["repoData"] = null,
  action: any
): RootState["repoData"] => {
  switch (action.type) {
    case "SET_REPO":
      return action.payload.repoData;

    default:
      return state;
  }
};

const issuesToDoReducer = (
  state: RootState["issuesToDo"] = [],
  action: any
) => {
  switch (action.type) {
    case "SET_ISSUES_TODO":
      return action.payload.issues;

    default:
      return state;
  }
};

const issuesInProgressReducer = (
  state: RootState["issuesInProgress"] = [],
  action: any
) => {
  switch (action.type) {
    case "SET_ISSUES_IN_PROGRESS":
      return action.payload.issues;

    default:
      return state;
  }
};

const issuesDoneReducer = (
  state: RootState["issuesDone"] = [],
  action: any
) => {
  switch (action.type) {
    case "SET_ISSUES_DONE":
      return action.payload.issues;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  issues: issuesReducer,
  repoData: repoDataReducer,
  issuesToDo: issuesToDoReducer,
  issuesInProgress: issuesInProgressReducer,
  issuesDone: issuesDoneReducer,
});

export type { RootState, Issue };
export default rootReducer;
