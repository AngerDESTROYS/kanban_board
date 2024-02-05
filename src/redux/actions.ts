import { Issue } from "./reducers";

export const setRepo = (repoData: any) => ({
  type: 'SET_REPO',
  payload: { repoData},
})

export const setIssues = (issues: Issue[]) => ({
  type: 'SET_ISSUES',
  payload: { issues },
});

export const setIssuesToDo = (issues: Issue[]) => ({
  type: 'SET_ISSUES_TODO',
  payload: { issues },
});

export const setIssuesInProgress = (issues: Issue[]) => ({
  type: 'SET_ISSUES_IN_PROGRESS',
  payload: { issues },
});

export const setIssuesDone = (issues: Issue[]) => ({
  type: 'SET_ISSUES_DONE',
  payload: { issues },
});