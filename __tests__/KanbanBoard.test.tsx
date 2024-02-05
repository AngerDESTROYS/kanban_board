// __tests__/KanbanBoard.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import KanbanBoard from "../src/components/KanbanBoard";
import rootReducer from "../src/redux/reducers";
import {
  setIssuesToDo,
  setIssuesInProgress,
  setIssuesDone,
} from "../src/redux/actions";

const store = configureStore({ reducer: rootReducer });

const mockIssues = [
  {
    id: 1,
    title: "Issue 1",
    number: 1,
    created_at: "2022-02-02",
    user: {
      login: "user1",
    },
    comments: 3,
  },
  {
    id: 2,
    title: "Issue 2",
    number: 2,
    created_at: "2022-02-03",
    user: {
      login: "user2",
    },
    comments: 2,
  },
  {
    id: 3,
    title: "Issue 3",
    number: 3,
    created_at: "2022-02-04",
    user: {
      login: "user3",
    },
    comments: 5,
  },
];

test("renders Issue 1 in ToDo column", async () => {
  store.dispatch(setIssuesToDo([mockIssues[0]]));
  render(
    <Provider store={store}>
      <KanbanBoard />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText("ToDo")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Issue 1")).toBeInTheDocument();
  });
});

test("renders Issue 2 in In Progress column", async () => {
  store.dispatch(setIssuesInProgress([mockIssues[1]]));
  render(
    <Provider store={store}>
      <KanbanBoard />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Issue 2")).toBeInTheDocument();
  });
});

test("renders Issue 3 in Done column", async () => {
  store.dispatch(setIssuesDone([mockIssues[2]]));
  render(
    <Provider store={store}>
      <KanbanBoard />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Issue 3")).toBeInTheDocument();
  });
});
